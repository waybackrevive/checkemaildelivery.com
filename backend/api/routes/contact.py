"""
Contact Form API — Handle user inquiries
"""

import logging
from datetime import datetime
import html

import httpx

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

from config import settings

router = APIRouter(prefix="/api", tags=["contact"])
logger = logging.getLogger(__name__)


class ContactRequest(BaseModel):
    """Contact form submission."""
    name: str
    email: EmailStr
    contactType: str  # "feedback" | "complaint" | "buy-report" | "other"
    message: str


class ContactResponse(BaseModel):
    """Contact form response."""
    success: bool
    error: str | None = None


def get_contact_type_emoji(contact_type: str) -> str:
    """Get emoji for contact type."""
    emoji_map = {
        "feedback": "💬",
        "complaint": "⚠️",
        "buy-report": "📊",
        "other": "✉️",
    }
    return emoji_map.get(contact_type, "✉️")


def _build_contact_payload(name: str, email: str, contact_type: str, message: str) -> dict:
    """
    Build sanitized contact payload for Cloudflare Worker relay.
    """
    safe_name = html.escape(name)
    safe_email = html.escape(email)
    safe_message = html.escape(message).replace("\n", "<br>")
    emoji = get_contact_type_emoji(contact_type)
    subject = f"{emoji} Contact Form: {contact_type.replace('-', ' ').title()} from {name}"

    html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset=\"UTF-8\">
</head>
<body style=\"font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;\">
  <h2 style=\"margin:0 0 12px 0;color:#0c1a2e;\">New Contact Form Submission</h2>
  <p><strong>Contact Type:</strong> {emoji} {contact_type.replace('-', ' ').title()}</p>
  <p><strong>Name:</strong> {safe_name}</p>
  <p><strong>Email:</strong> <a href=\"mailto:{safe_email}\">{safe_email}</a></p>
  <p><strong>Message:</strong><br>{safe_message}</p>
  <p><strong>Submitted:</strong> {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC</p>
  <hr>
  <p style=\"font-size:12px;color:#6b7280;\">Sent from CheckEmailDelivery.com contact form</p>
</body>
</html>
"""

    text_body = f"""
New Contact Form Submission

Contact Type: {emoji} {contact_type.replace("-", " ").title()}
Name: {name}
Email: {email}
Message:
{message}

Submitted: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC
"""

    return {
        "to_email": settings.CONTACT_EMAIL,
        "from_name": "CheckEmailDelivery Contact",
        "reply_to": email,
        "subject": subject,
        "text": text_body,
        "html": html_body,
    }


async def send_contact_email_via_mailchannels(name: str, email: str, contact_type: str, message: str) -> None:
    """
    Send contact form email directly via MailChannels API.
    
    No worker relay needed - simple, direct, and reliable.
    Right approach: eliminate extra hops, go straight to MailChannels.
    """
    payload = _build_contact_payload(name, email, contact_type, message)
    
    # Extract fields from payload
    to_email = payload["to_email"]
    subject = payload["subject"]
    text = payload["text"]
    html = payload["html"]
    from_name = payload["from_name"]
    reply_to = payload["reply_to"]
    
    # Build MailChannels payload following their API spec
    mailchannels_payload = {
        "personalizations": [
            {
                "to": [{"email": to_email}],
            }
        ],
        "from": {
            "email": "noreply@checkemaildelivery.com",
            "name": from_name,
        },
        "subject": subject,
        "content": [
            {"type": "text/plain", "value": text},
            {"type": "text/html", "value": html},
        ],
    }
    
    # Add reply-to if provided
    if reply_to:
        mailchannels_payload["reply_to"] = {"email": reply_to}
    
    # Log the attempt
    logger.info(f"Sending contact email to {to_email} via MailChannels")
    
    # Send to MailChannels API
    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.post(
            "https://api.mailchannels.net/tx/v1/send",
            json=mailchannels_payload,
            headers={"Content-Type": "application/json"},
        )
    
    # Log response
    logger.info(f"MailChannels response: {response.status_code}")
    
    # Only accept 2xx responses
    if response.status_code < 200 or response.status_code >= 300:
        try:
            resp_body = response.json()
        except:
            resp_body = response.text
        logger.error(f"MailChannels error: {response.status_code} {resp_body}")
        raise Exception(f"MailChannels API failed: {response.status_code} {resp_body}")
    
    logger.info("✅ Contact email sent successfully to %s (%s)", to_email, contact_type)


@router.post("/contact", response_model=ContactResponse)
async def handle_contact_form(body: ContactRequest) -> ContactResponse:
    """
    Handle contact form submission.
    
    Sends email to CONTACT_EMAIL with form details.
    """
    try:
        # Validate contact type
        valid_types = ["feedback", "complaint", "buy-report", "other"]
        if body.contactType not in valid_types:
            return ContactResponse(
                success=False,
                error=f"Invalid contact type. Must be one of: {', '.join(valid_types)}"
            )
        
        # Basic validation
        if len(body.message.strip()) < 10:
            return ContactResponse(
                success=False,
                error="Message is too short. Please provide more details."
            )
        
        # Send email directly via MailChannels (no worker relay needed)
        await send_contact_email_via_mailchannels(
            name=body.name.strip(),
            email=body.email,
            contact_type=body.contactType,
            message=body.message.strip()
        )
        
        logger.info(
            f"Contact form submitted: {body.contactType} from {body.name} <{body.email}>"
        )
        
        return ContactResponse(success=True)
        
    except Exception as e:
        logger.error(f"Contact form error: {e}", exc_info=True)
        return ContactResponse(
            success=False,
            error="Failed to send message. Please try again or email us directly at connect@checkemaildelivery.com"
        )
