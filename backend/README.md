# CheckEmailDelivery.com — Backend API

FastAPI + SpamAssassin backend that receives emails via Resend inbound webhook, runs full deliverability analysis (SPF, DKIM, DMARC, blacklists, content, SpamAssassin), and returns a plain-English report.

---

## Architecture

```
┌────────────────────────────────────────────────┐
│  Docker Compose                                │
│                                                │
│  ┌──────────────────┐  ┌────────────────────┐  │
│  │  FastAPI (api)   │  │  SpamAssassin      │  │
│  │  Port 8000       │──│  Port 783          │  │
│  └──────────────────┘  └────────────────────┘  │
│          │                                     │
│          ├── Upstash Redis (cloud)             │
│          └── Resend Webhook (inbound email)    │
└────────────────────────────────────────────────┘
```

---

## Quick Start (Local Dev)

> **Do Phase 1 (external services) in the root README first!**

### 1. Configure Environment

```bash
cd backend
cp ".env copy.example" .env
```

Open `.env` and fill in your values:

```dotenv
MAIL_DOMAIN=checkemaildelivery.com
UPSTASH_REDIS_URL=https://your-db.upstash.io
UPSTASH_REDIS_TOKEN=your-token-here
RESEND_WEBHOOK_SECRET=whsec_your-secret-here   # optional in dev
SPAMASSASSIN_HOST=spamassassin                  # or localhost without Docker
SPAMASSASSIN_PORT=783
FRONTEND_URL=http://localhost:3000
```

### 2. Run the Server

**Option A — Docker (recommended, includes SpamAssassin):**
```bash
docker-compose up --build
```

**Option B — Without Docker (SpamAssassin skipped, everything else works):**
```bash
pip install -r requirements.txt python-dotenv
cd ..
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

> Without SpamAssassin, the SA section returns a neutral 0.0 score. All other analysis (SPF, DKIM, DMARC, blacklists, content) works fully.

### 3. Verify

```bash
curl http://localhost:8000/health
# → {"status":"ok"}

# Swagger docs:
# http://localhost:8000/docs
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/test/create` | Create a test session → returns test email address |
| GET | `/api/test/{id}/status` | Poll for email arrival (frontend calls every 5s) |
| POST | `/api/webhook/resend` | Resend posts inbound emails here |
| GET | `/api/report/{id}` | Get the full analysis report |
| GET | `/health` | Health check |
| GET | `/docs` | Swagger UI (auto-generated) |

### How the Flow Works

```
1. POST /api/test/create
   → { id: "7a2b4f8e", email: "test-7a2b4f8e@checkemaildelivery.com" }

2. User sends email to test-7a2b4f8e@checkemaildelivery.com

3. Resend receives it (via MX records) → POSTs to /api/webhook/resend
   → Runs SPF, DKIM, DMARC, blacklists, content, SpamAssassin
   → Saves report to Redis, sets status to "ready"

4. Frontend polls GET /api/test/7a2b4f8e/status every 5s
   → { status: "waiting" | "received" | "processing" | "ready" }

5. When "ready" → GET /api/report/7a2b4f8e → full report JSON
```

---

## Project Structure

```
backend/
├── main.py                     # FastAPI app entry point
├── config.py                   # Settings from environment variables
├── Dockerfile                  # Python 3.11 container
├── docker-compose.yml          # API + SpamAssassin
├── requirements.txt            # Python dependencies
├── .env                        # Your local env (DO NOT COMMIT)
├── .env copy.example           # Template for .env
│
├── api/routes/
│   ├── test.py                 # POST /api/test/create, GET /api/test/{id}/status
│   ├── webhook.py              # POST /api/webhook/resend
│   └── report.py               # GET /api/report/{id}
│
├── services/
│   ├── email_generator.py      # Generates test IDs and email addresses
│   ├── header_parser.py        # SPF, DKIM, DMARC checks
│   ├── content_analyzer.py     # Spam words, image ratio, links, content scoring
│   ├── blacklist_checker.py    # IP & domain blacklist DNS lookups
│   ├── spamassassin.py         # TCP client for SpamAssassin daemon
│   ├── score_calculator.py     # Weighted score (Auth 35%, Rep 25%, SA 25%, Content 15%)
│   └── report_builder.py       # Builds report with action plan (WHY + HOW + IMPACT)
│
├── models/
│   └── schemas.py              # Pydantic models (data contract with frontend)
│
├── storage/
│   └── redis_client.py         # Upstash Redis wrapper
│
└── data/
    ├── spam_words.json          # 80+ trigger words in 6 categories
    └── blacklists.json          # IP blacklists (12 RBLs) + domain blacklists (8 DBLs)
```

---

## Testing Locally with ngrok

Resend needs a public URL to deliver webhooks. Use ngrok during local dev:

```bash
ngrok http 8000
# → https://abc123.ngrok.io
# Set this in Resend dashboard → Webhooks:
#   Endpoint: https://abc123.ngrok.io/api/webhook/resend
#   Events: email.received
```

---

## Production Deployment (Railway)

### 1. Deploy to Railway

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**
2. Select your repo → set root directory to `backend`
3. Add a **SpamAssassin service**:
   - Click **+ New** → **Docker Image** → `instantlinux/spamassassin:latest`
   - Note the internal hostname (e.g., `spamassassin.railway.internal`)

### 2. Set Environment Variables

| Variable | Value |
|----------|-------|
| `MAIL_DOMAIN` | `checkemaildelivery.com` |
| `UPSTASH_REDIS_URL` | `https://your-db.upstash.io` |
| `UPSTASH_REDIS_TOKEN` | `your-token` |
| `RESEND_WEBHOOK_SECRET` | `whsec_your-secret` |
| `SPAMASSASSIN_HOST` | `spamassassin.railway.internal` |
| `SPAMASSASSIN_PORT` | `783` |
| `FRONTEND_URL` | `https://checkemaildelivery.com` |

### 3. Update Resend Webhook

In Resend dashboard → Webhooks → change endpoint to:
```
https://your-api.up.railway.app/api/webhook/resend
```

### 4. Cost

| Service | Cost |
|---------|------|
| Railway (API) | ~$5/mo |
| SpamAssassin | included in Railway |
| Upstash Redis | Free (10K req/day) |
| Resend | Free (100 emails/day) |

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MAIL_DOMAIN` | No | `checkemaildelivery.com` | Domain for test email addresses |
| `UPSTASH_REDIS_URL` | **Yes** | — | Upstash Redis REST API URL |
| `UPSTASH_REDIS_TOKEN` | **Yes** | — | Upstash Redis auth token |
| `RESEND_WEBHOOK_SECRET` | No | — | Webhook signing secret (skip in dev) |
| `SPAMASSASSIN_HOST` | No | `spamassassin` | SA host (Docker) or `localhost` (no Docker) |
| `SPAMASSASSIN_PORT` | No | `783` | SpamAssassin spamd port |
| `FRONTEND_URL` | No | `http://localhost:3000` | CORS allowed origin |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Connection refused` on port 783 | SpamAssassin not running. Use Docker or set `SPAMASSASSIN_HOST=localhost` (graceful fallback) |
| Redis errors | Check `UPSTASH_REDIS_URL` and `UPSTASH_REDIS_TOKEN` in `.env` |
| Webhook not receiving emails | Check Resend webhook URL + MX records. Use ngrok for local dev |
| Rate limit hit (429) | Max 3 tests/day per IP. Wait 24h or clear Redis |
| CORS errors in browser | Check `FRONTEND_URL` matches your frontend origin exactly |
| Docker build fails on Windows | Make sure Docker Desktop is running with WSL2 backend |
