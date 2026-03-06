"""
Blacklist Checker — v2 FIXED
============================

CRITICAL FIXES:
1. Skip major email provider domains (gmail.com, outlook.com, etc.)
2. Properly interpret Spamhaus response codes (127.255.x.x = error, not listed)
3. Add timeout handling
4. Only flag as listed if we get a valid listing response

Why gmail.com was showing as "listed":
- Spamhaus blocks queries from cloud providers (Railway, AWS, etc.)
- When blocked, it returns 127.255.255.x (error code)
- Old code interpreted ANY response as "listed"
"""

import json
import logging
import os
import socket
from datetime import datetime
from typing import List, Optional

import dns.resolver

from models.schemas import BlacklistEntry, CheckStatus, ReputationResult

logger = logging.getLogger(__name__)

# Major email providers - NEVER blacklisted, skip checking
TRUSTED_DOMAINS = {
    "gmail.com", "googlemail.com",
    "outlook.com", "hotmail.com", "live.com", "msn.com",
    "yahoo.com", "yahoo.co.uk", "ymail.com",
    "icloud.com", "me.com", "mac.com",
    "aol.com", "proton.me", "protonmail.com",
    "zoho.com", "fastmail.com", "tutanota.com",
}

# Load blacklists config
_BLACKLISTS_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "blacklists.json")
_blacklists_db: dict = {}


def _load_blacklists() -> dict:
    """Load blacklist DNS server configurations."""
    global _blacklists_db
    if not _blacklists_db:
        try:
            with open(_BLACKLISTS_PATH, "r", encoding="utf-8") as f:
                _blacklists_db = json.load(f)
        except FileNotFoundError:
            _blacklists_db = {
                "ip_blacklists": [],
                "domain_blacklists": [],
            }
    return _blacklists_db


def _reverse_ip(ip: str) -> str:
    """Reverse an IP address for DNSBL lookup. 1.2.3.4 -> 4.3.2.1"""
    parts = ip.split(".")
    return ".".join(reversed(parts))


def _is_valid_listing_response(ip_response: str) -> bool:
    """
    Check if a DNS response indicates an actual blacklist listing.
    
    Spamhaus and other RBLs use specific response codes:
    - 127.0.0.2 to 127.0.0.11 = Actually listed (various categories)
    - 127.255.255.252-255 = Error/rate limited/query blocked
    
    We ONLY consider 127.0.0.x (where x < 128) as actual listings.
    """
    try:
        parts = ip_response.split(".")
        if len(parts) != 4:
            return False
        
        # Must be 127.0.0.x for valid listing
        if parts[0] == "127" and parts[1] == "0" and parts[2] == "0":
            last_octet = int(parts[3])
            # 2-127 = valid listing codes
            # 255 = error/rate limited
            return 2 <= last_octet <= 127
        
        # 127.255.x.x = error codes, NOT a listing
        if parts[0] == "127" and parts[1] == "255":
            return False
            
        return False
    except (ValueError, IndexError):
        return False


def check_ip_blacklists(ip: str) -> List[BlacklistEntry]:
    """
    Check if an IP is listed on any DNS-based blacklist.
    """
    if not ip:
        return []

    db = _load_blacklists()
    reversed_ip = _reverse_ip(ip)
    results: List[BlacklistEntry] = []

    # Configure resolver with short timeout
    resolver = dns.resolver.Resolver()
    resolver.timeout = 3
    resolver.lifetime = 5

    for rbl in db.get("ip_blacklists", []):
        query = f"{reversed_ip}.{rbl['dns']}"
        listed = False
        
        try:
            answers = resolver.resolve(query, "A")
            # Check if ANY response is a valid listing (not an error code)
            for rdata in answers:
                if _is_valid_listing_response(str(rdata)):
                    listed = True
                    break
        except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer, dns.resolver.NoNameservers):
            listed = False
        except dns.resolver.Timeout:
            logger.debug(f"Blacklist query timeout: {rbl['name']}")
            listed = False
        except Exception as e:
            logger.debug(f"Blacklist query error for {rbl['name']}: {e}")
            listed = False

        results.append(BlacklistEntry(
            list_name=rbl["name"],
            listed=listed,
        ))

    return results


def check_domain_blacklists(domain: str) -> List[BlacklistEntry]:
    """
    Check if a domain is listed on any domain-based blacklist.
    """
    if not domain:
        return []
    
    # Skip trusted email provider domains - they're NEVER blacklisted
    domain_lower = domain.lower()
    if domain_lower in TRUSTED_DOMAINS:
        logger.info(f"Skipping blacklist check for trusted domain: {domain}")
        # Return all clean results
        db = _load_blacklists()
        return [
            BlacklistEntry(list_name=dbl["name"], listed=False)
            for dbl in db.get("domain_blacklists", [])
        ]

    db = _load_blacklists()
    results: List[BlacklistEntry] = []

    # Configure resolver with short timeout
    resolver = dns.resolver.Resolver()
    resolver.timeout = 3
    resolver.lifetime = 5

    for dbl in db.get("domain_blacklists", []):
        query = f"{domain}.{dbl['dns']}"
        listed = False
        
        try:
            answers = resolver.resolve(query, "A")
            # Check if ANY response is a valid listing
            for rdata in answers:
                if _is_valid_listing_response(str(rdata)):
                    listed = True
                    break
        except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer, dns.resolver.NoNameservers):
            listed = False
        except dns.resolver.Timeout:
            logger.debug(f"Domain blacklist query timeout: {dbl['name']}")
            listed = False
        except Exception as e:
            logger.debug(f"Domain blacklist query error for {dbl['name']}: {e}")
            listed = False

        results.append(BlacklistEntry(
            list_name=dbl["name"],
            listed=listed,
        ))

    return results


def get_domain_age(domain: str) -> Optional[int]:
    """
    Get domain age in days using python-whois.
    """
    # Skip WHOIS for trusted providers - they're established
    if domain.lower() in TRUSTED_DOMAINS:
        return 9999  # Ancient/established
        
    try:
        import whois
        w = whois.whois(domain)
        creation_date = w.creation_date

        if isinstance(creation_date, list):
            creation_date = creation_date[0]

        if creation_date and isinstance(creation_date, datetime):
            age_days = (datetime.now() - creation_date).days
            return max(0, age_days)
    except Exception:
        pass

    return None


def check_reputation(sending_ip: str, from_domain: str) -> ReputationResult:
    """
    Main entry point: run all reputation checks.
    """
    logger.info(f"Checking reputation for IP={sending_ip or 'unknown'}, domain={from_domain}")
    
    # Run blacklist checks
    ip_results = check_ip_blacklists(sending_ip)
    domain_results = check_domain_blacklists(from_domain)

    ip_listed_count = sum(1 for r in ip_results if r.listed)
    domain_listed_count = sum(1 for r in domain_results if r.listed)
    
    logger.info(f"Blacklist results: IP listed on {ip_listed_count}, domain listed on {domain_listed_count}")

    # Domain age
    domain_age = get_domain_age(from_domain)

    # Domain age status
    if from_domain.lower() in TRUSTED_DOMAINS:
        age_status = CheckStatus.PASS
        age_description = "Major email provider - established reputation."
    elif domain_age is None:
        age_status = CheckStatus.WARNING
        age_description = "Could not determine domain age."
    elif domain_age < 30:
        age_status = CheckStatus.FAIL
        age_description = f"Domain is only {domain_age} days old. Very new domains are treated with high suspicion."
    elif domain_age < 90:
        age_status = CheckStatus.WARNING
        age_description = f"Domain is {domain_age} days old. Newer domains may face some deliverability challenges."
    else:
        age_status = CheckStatus.PASS
        age_description = f"Domain is {domain_age} days old. Established domain."

    # Calculate reputation score (out of 100)
    score = 100.0
    score -= ip_listed_count * 20
    score -= domain_listed_count * 20

    if domain_age is not None and domain_age < 30:
        score -= 20
    elif domain_age is not None and domain_age < 90:
        score -= 10

    score = max(0, score)

    return ReputationResult(
        ip_blacklists=ip_results,
        domain_blacklists=domain_results,
        ip_blacklist_count=ip_listed_count,
        domain_blacklist_count=domain_listed_count,
        domain_age_days=domain_age,
        domain_age_status=age_status,
        domain_age_description=age_description,
        sending_ip=sending_ip,
        score=score,
    )
