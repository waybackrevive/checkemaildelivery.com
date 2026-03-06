"""
Redis client using Upstash REST-based Redis.
All test data auto-expires with TTL — no cleanup needed.
"""

import json
from datetime import datetime, timedelta, timezone
from typing import Any, Optional

from upstash_redis import Redis

from config import settings


# Singleton connection — initialized once, reused everywhere
_redis: Optional[Redis] = None


def get_redis() -> Redis:
    """Get or create the Upstash Redis connection."""
    global _redis
    if _redis is None:
        _redis = Redis(
            url=settings.UPSTASH_REDIS_URL,
            token=settings.UPSTASH_REDIS_TOKEN,
        )
    return _redis


# ---------------------------------------------------------------------------
# Test session helpers
# ---------------------------------------------------------------------------

def save_test_session(test_id: str, data: dict, ttl: int = settings.TEST_TTL_SECONDS) -> None:
    """Save a test session to Redis with auto-expire TTL."""
    r = get_redis()
    r.setex(f"test:{test_id}", ttl, json.dumps(data))


def get_test_session(test_id: str) -> Optional[dict]:
    """Get a test session from Redis. Returns None if expired or missing."""
    r = get_redis()
    raw = r.get(f"test:{test_id}")
    if raw is None:
        return None
    if isinstance(raw, dict):
        return raw
    return json.loads(raw)


def update_test_session(test_id: str, data: dict) -> None:
    """Update test session data, preserving the existing TTL."""
    r = get_redis()
    ttl = r.ttl(f"test:{test_id}")
    if ttl and ttl > 0:
        r.setex(f"test:{test_id}", ttl, json.dumps(data))


# ---------------------------------------------------------------------------
# Report helpers
# ---------------------------------------------------------------------------

def save_report(test_id: str, report: dict, ttl: int = settings.TEST_TTL_SECONDS) -> None:
    """Save a generated report. Same TTL as the test session."""
    r = get_redis()
    r.setex(f"report:{test_id}", ttl, json.dumps(report))


def get_report(test_id: str) -> Optional[dict]:
    """Get a report by test ID."""
    r = get_redis()
    raw = r.get(f"report:{test_id}")
    if raw is None:
        return None
    if isinstance(raw, dict):
        return raw
    return json.loads(raw)


# ---------------------------------------------------------------------------
# Rate limiting helpers
# ---------------------------------------------------------------------------

def _current_utc_day() -> str:
    """Return current UTC day in YYYY-MM-DD format."""
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def _next_utc_midnight() -> datetime:
    """Return the next UTC midnight datetime."""
    now = datetime.now(timezone.utc)
    tomorrow = now + timedelta(days=1)
    return datetime(tomorrow.year, tomorrow.month, tomorrow.day, tzinfo=timezone.utc)


def _daily_rate_key(ip: str, bucket: str) -> str:
    """Build a UTC-day scoped rate-limit key."""
    return f"rate:{bucket}:{ip}:{_current_utc_day()}"


def _seconds_until_next_utc_midnight() -> int:
    """TTL for current UTC day key, with a small buffer."""
    now = datetime.now(timezone.utc)
    reset_at = _next_utc_midnight()
    return int((reset_at - now).total_seconds()) + 60


def get_rate_limit_count(ip: str, bucket: str = "test") -> int:
    """Get current UTC-day usage count for a bucket."""
    r = get_redis()
    key = _daily_rate_key(ip, bucket)
    count = r.get(key)
    if count is None:
        return 0
    return int(count)


def get_rate_limit_remaining(ip: str, limit: int, bucket: str = "test") -> int:
    """Get remaining requests for the current UTC day."""
    used = get_rate_limit_count(ip, bucket)
    return max(0, limit - used)


def get_rate_limit_reset_utc_iso() -> str:
    """Return reset time as ISO string at next UTC midnight."""
    return _next_utc_midnight().isoformat()

def check_rate_limit(ip: str) -> bool:
    """Check if an IP has exceeded the daily test limit. Returns True if allowed."""
    return get_rate_limit_count(ip, bucket="test") < settings.MAX_TESTS_PER_DAY


def increment_rate_limit(ip: str) -> None:
    """Increment the daily test count for an IP."""
    r = get_redis()
    key = _daily_rate_key(ip, bucket="test")
    count = r.incr(key)
    if count == 1:
        # First request for this UTC day — expire shortly after UTC midnight
        r.expire(key, _seconds_until_next_utc_midnight())


def check_ai_rate_limit(ip: str) -> bool:
    """Check if an IP can use AI for the current UTC day."""
    return get_rate_limit_count(ip, bucket="ai") < settings.AI_MAX_REQUESTS_PER_DAY


def increment_ai_rate_limit(ip: str) -> None:
    """Increment AI usage for the current UTC day."""
    r = get_redis()
    key = _daily_rate_key(ip, bucket="ai")
    count = r.incr(key)
    if count == 1:
        r.expire(key, _seconds_until_next_utc_midnight())
