"""
Webhook route — Mailgun inbound email
======================================

Mailgun sends a multipart/form-data POST with `body-mime` containing
the COMPLETE raw RFC-2822 email.  No reconstruction needed — we pass
the raw MIME directly to the analysis pipeline.

Signature verification uses HMAC-SHA256:
  sign = HMAC(key=MAILGUN_SIGNING_KEY, msg=timestamp+token)
  compare with `signature` field using hmac.compare_digest()
"""

import re
import hmac
import hashlib
import logging
from email import message_from_string
from typing import Optional

from fastapi import APIRouter, Request, HTTPException

from config import settings
from models.schemas import TestStatus, CheckStatus
from storage.redis_client import (
    get_test_session,
    update_test_session,
    save_report,
)
from services.header_parser import parse_headers
from services.content_analyzer import analyze_content
from services.blacklist_checker import check_reputation
from services.spamassassin import check_spam
from services.report_builder import build_report

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/webhook", tags=["webhook"])


# ── Helpers ────────────────────────────────────────────────────────────────────

def _extract_test_id(recipient: str) -> Optional[str]:
    """Extract test ID from: test-7a2b4f8e@checkemaildelivery.com → 7a2b4f8e"""
    match = re.match(r"test-([a-f0-9]+)@", recipient)
    return match.group(1) if match else None


def _verify_mailgun_signature(timestamp: str, token: str, signature: str) -> bool:
    """
    Verify Mailgun webhook signature.

    Mailgun signs every webhook POST:
      expected = HMAC-SHA256(key=MAILGUN_SIGNING_KEY, msg=timestamp+token)
    We compare the hex digest with the provided `signature` field.
    """
    signing_key = settings.MAILGUN_SIGNING_KEY
    if not signing_key:
        logger.warning("MAILGUN_SIGNING_KEY not set — skipping verification (dev mode)")
        return True

    try:
        expected = hmac.new(
            signing_key.encode("utf-8"),
            f"{timestamp}{token}".encode("utf-8"),
            hashlib.sha256,
        ).hexdigest()
        return hmac.compare_digest(expected, signature)
    except Exception as e:
        logger.error(f"Mailgun signature verification error: {e}")
        return False


def _extract_sender_ip(raw_email: str) -> Optional[str]:
    """
    Extract the originating sender IP from Received headers.

    The LAST 'Received' header (bottom of the chain) is the one written
    by the first MTA that received the message — it contains the real
    sender IP in square brackets like [1.2.3.4].
    """
    try:
        msg = message_from_string(raw_email)
        received_headers = msg.get_all("Received") or []
        if not received_headers:
            return None

        # Last header = first hop = sender's IP
        last_received = received_headers[-1]
        ip_match = re.search(r"\[(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]", last_received)
        return ip_match.group(1) if ip_match else None
    except Exception as e:
        logger.warning(f"Could not extract sender IP from Received headers: {e}")
        return None


# ── Webhook endpoint ──────────────────────────────────────────────────────────

@router.post("/mailgun")
async def receive_mailgun_webhook(request: Request):
    """
    Mailgun Inbound Email webhook (multipart/form-data).

    Flow:
    1. Parse form data — extract body-mime, recipient, signature fields
    2. Verify HMAC-SHA256 signature
    3. Extract test ID from recipient address
    4. Pass raw MIME email directly to analysis pipeline
    5. Build + save report
    6. Update test status to "ready"
    """
    try:
        form = await request.form()

        # ── Extract fields ────────────────────────────────────────────────
        raw_email   = form.get("body-mime", "")
        recipient   = form.get("recipient", "")
        sender      = form.get("sender", "")
        subject     = form.get("subject", "")
        timestamp   = form.get("timestamp", "")
        token       = form.get("token", "")
        signature   = form.get("signature", "")

        # Ensure raw_email is a string
        if hasattr(raw_email, "read"):
            raw_email = (await raw_email.read()).decode("utf-8", errors="replace")
        raw_email = str(raw_email)

        if not raw_email:
            logger.warning("Mailgun webhook received with empty body-mime")
            raise HTTPException(status_code=400, detail="Missing body-mime")

        # ── Signature verification ────────────────────────────────────────
        if not _verify_mailgun_signature(str(timestamp), str(token), str(signature)):
            logger.warning("Invalid Mailgun webhook signature")
            raise HTTPException(status_code=401, detail="Invalid webhook signature")

        # ── Extract test ID ───────────────────────────────────────────────
        recipient = str(recipient)
        if not recipient:
            raise HTTPException(status_code=400, detail="Missing recipient")

        test_id = _extract_test_id(recipient)
        if not test_id:
            logger.warning(f"No test ID in recipient: {recipient}")
            raise HTTPException(status_code=400, detail="Invalid recipient address")

        session = get_test_session(test_id)
        if session is None:
            logger.warning(f"Session not found: {test_id}")
            raise HTTPException(status_code=404, detail="Test session not found or expired")

        # ── Update session ────────────────────────────────────────────────
        from_addr = str(sender)
        subj      = str(subject)

        session["status"]       = TestStatus.PROCESSING.value
        session["raw_email"]    = raw_email
        session["from_address"] = from_addr
        session["subject"]      = subj
        update_test_session(test_id, session)

        # ── Run analysis pipeline ─────────────────────────────────────────

        # 1. Authentication (SPF/DKIM/DMARC from Authentication-Results header)
        auth_result, parsed_from, from_domain, sending_ip, parsed_subject = parse_headers(raw_email)

        # If header_parser didn't find an IP, try extracting from Received headers
        if not sending_ip:
            sending_ip = _extract_sender_ip(raw_email)

        # 2. Content analysis
        content_result = analyze_content(raw_email)

        # 3. Reputation (blacklists + domain age)
        reputation_result = check_reputation(sending_ip, from_domain)

        # 4. SpamAssassin
        sa_result = check_spam(raw_email)

        # Update content with SpamAssassin data
        content_result.spamassassin_score  = sa_result.score if sa_result.available else 0.0
        content_result.spamassassin_status = sa_result.status

        # 5. Build report
        report = build_report(
            test_id       = test_id,
            raw_email     = raw_email,
            auth          = auth_result,
            reputation    = reputation_result,
            content       = content_result,
            spamassassin  = sa_result,
            from_address  = parsed_from or from_addr,
            from_domain   = from_domain,
            subject       = parsed_subject or subj,
        )

        # 6. Save report
        save_report(test_id, report.model_dump(mode="json"))

        # 7. Mark ready
        session["status"] = TestStatus.READY.value
        update_test_session(test_id, session)

        logger.info(f"Report ready: test={test_id} score={report.final_score} risk={report.risk_level}")
        return {"status": "ok", "test_id": test_id, "score": report.final_score}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")
