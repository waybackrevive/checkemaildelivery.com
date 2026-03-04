# CheckEmailDelivery.com — Backend API

FastAPI + SpamAssassin backend that receives emails via **Mailgun inbound webhook**, runs full deliverability analysis (SPF, DKIM, DMARC, blacklists, content, SpamAssassin), and returns a plain-English report.

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
│          └── Mailgun Webhook (inbound email)   │
└────────────────────────────────────────────────┘
```

### How Mailgun Integration Works

```
User sends email
      │
      ▼
Mailgun MX servers receive it
(SPF/DKIM/DMARC verified, Authentication-Results header written)
      │
      ▼
Mailgun forwards to POST /api/webhook/mailgun
(multipart/form-data with body-mime = complete raw RFC-2822 email)
      │
      ▼
Backend reads Authentication-Results header from raw email
(ground truth — real verification by Mailgun's MX server)
      │
      ▼
Runs analysis pipeline: auth + content + blacklists + SpamAssassin
      │
      ▼
Saves report to Redis → frontend polls → user sees report
```

**Key advantage:** Mailgun sends the complete raw MIME email in the `body-mime` field. No reconstruction needed — we pass it directly to the analysis pipeline. The `Authentication-Results` header written by Mailgun's MX server is the ground truth for SPF/DKIM/DMARC verification.

---

## Mailgun Setup (Step-by-Step)

### 1. Create Mailgun Account

1. Sign up at [mailgun.com](https://www.mailgun.com) (free tier: 5,000 emails/month)
2. Go to **Sending** → **Domains** → **Add New Domain**
3. Add your domain: `checkemaildelivery.com`

### 2. Verify Domain DNS Records

Mailgun will show you DNS records to add. Add these in your DNS provider (Cloudflare, Namecheap, etc.):

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| MX | `@` | `mxa.mailgun.org` (priority 10) | Route inbound email to Mailgun |
| MX | `@` | `mxb.mailgun.org` (priority 10) | Backup MX |
| TXT | `@` | `v=spf1 include:mailgun.org ~all` | SPF for sending (optional) |
| CNAME | `email.checkemaildelivery.com` | `mailgun.org` | Tracking (optional) |

> **Critical:** The MX records are what route emails to Mailgun. Without them, sent test emails won't arrive.

Wait for DNS propagation (usually 5-30 min). Mailgun dashboard will show "Verified" ✓ when ready.

### 3. Get Your Signing Key

1. Go to Mailgun Dashboard → **Settings** → **API Security** (or **API Keys**)
2. Find the **HTTP Webhook Signing Key** (starts with something like `key-...`)
3. Copy it — this goes in your `.env` as `MAILGUN_SIGNING_KEY`

> **Note:** This is NOT your API key. It's specifically the webhook signing key used for HMAC verification.

### 4. Create Inbound Route

1. Go to Mailgun Dashboard → **Receiving** → **Create Route**
2. Configure:
   - **Expression Type:** Match Recipient
   - **Expression:** `match_recipient(".*@checkemaildelivery.com")`
   - **Actions:**
     - ✅ Check **Forward** → paste your backend URL:
       - **Local dev:** `https://your-ngrok-url.ngrok.io/api/webhook/mailgun`
       - **Production:** `https://your-api.up.railway.app/api/webhook/mailgun`
     - ✅ Check **Store and Notify** (optional, helps debugging)
   - **Priority:** 0
   - **Description:** "CheckEmailDelivery inbound email processing"
3. Click **Create Route**

### 5. Webhook Signature Verification

Every Mailgun POST includes three fields for signature verification:

| Field | Description |
|-------|-------------|
| `timestamp` | Unix timestamp (string) |
| `token` | Random string |
| `signature` | HMAC-SHA256 hex digest |

Our webhook verifies like this:
```python
expected = HMAC-SHA256(key=MAILGUN_SIGNING_KEY, msg=timestamp+token)
hmac.compare_digest(expected, signature)  # timing-attack safe
```

If `MAILGUN_SIGNING_KEY` is not set in `.env`, verification is skipped (dev mode).

### 6. What Mailgun Sends

Mailgun POSTs `multipart/form-data` with these fields:

| Field | Description | Used by us? |
|-------|-------------|-------------|
| `body-mime` | **Complete raw RFC-2822 email** (headers + body) | ✅ Primary — passed to analysis pipeline |
| `recipient` | To address (e.g., `test-7a2b4f8e@checkemaildelivery.com`) | ✅ Extract test ID |
| `sender` | From address | ✅ Fallback from address |
| `subject` | Email subject | ✅ Fallback subject |
| `timestamp` | Unix timestamp | ✅ Signature verification |
| `token` | Random string | ✅ Signature verification |
| `signature` | HMAC-SHA256 digest | ✅ Signature verification |
| `stripped-text` | Plain text body (tags stripped) | ❌ Not used |
| `stripped-html` | HTML body | ❌ Not used |

---

## Quick Start (Local Dev)

> **Do Mailgun setup (above) first!**

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
MAILGUN_SIGNING_KEY=your-signing-key-here      # optional in dev
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
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

> Without SpamAssassin, the SA section shows "unavailable" with a neutral score. All other analysis (SPF, DKIM, DMARC, blacklists, content) works fully.

### 3. Verify

```bash
curl http://localhost:8000/health
# → {"status":"ok"}

# Swagger docs:
# http://localhost:8000/docs
```

---

## Testing Locally with ngrok

Mailgun needs a public URL to deliver webhooks. Use ngrok during local dev:

```bash
# 1. Start ngrok
ngrok http 8000
# → Forwarding: https://abc123.ngrok.io → http://localhost:8000

# 2. Copy the https URL

# 3. Go to Mailgun → Receiving → Create/Edit Route
#    Action: forward("https://abc123.ngrok.io/api/webhook/mailgun")

# 4. Send a test email to test-xxxx@checkemaildelivery.com
#    Watch your terminal — you'll see the webhook processing logs
```

> **Tip:** ngrok URLs change every restart (free plan). Update the Mailgun route each time, or use a paid ngrok plan for a fixed URL.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/test/create` | Create a test session → returns test email address |
| GET | `/api/test/{id}/status` | Poll for email arrival (frontend calls every 5s) |
| POST | `/api/webhook/mailgun` | Mailgun posts inbound emails here (multipart/form-data) |
| GET | `/api/report/{id}` | Get the full analysis report |
| GET | `/health` | Health check |
| GET | `/docs` | Swagger UI (auto-generated) |

### How the Flow Works

```
1. POST /api/test/create
   → { id: "7a2b4f8e", email: "test-7a2b4f8e@checkemaildelivery.com" }

2. User sends email to test-7a2b4f8e@checkemaildelivery.com

3. Mailgun receives it (MX records) → POSTs multipart/form-data to /api/webhook/mailgun
   → body-mime contains FULL raw email with Authentication-Results header
   → Backend reads auth results + runs content/blacklist/SpamAssassin checks
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
├── run.py                      # Production entry (Railway uses this)
├── config.py                   # Settings from environment variables
├── Dockerfile                  # Python 3.11 container
├── docker-compose.yml          # API + SpamAssassin
├── requirements.txt            # Python dependencies
├── .env                        # Your local env (DO NOT COMMIT)
├── .env copy.example           # Template for .env
│
├── api/routes/
│   ├── test.py                 # POST /api/test/create, GET /api/test/{id}/status
│   ├── webhook.py              # POST /api/webhook/mailgun (Mailgun inbound)
│   └── report.py               # GET /api/report/{id}
│
├── services/
│   ├── email_generator.py      # Generates test IDs and email addresses
│   ├── header_parser.py        # Reads Authentication-Results header for SPF/DKIM/DMARC
│   ├── content_analyzer.py     # Spam words, image ratio, links, content scoring
│   ├── blacklist_checker.py    # IP & domain blacklist DNS lookups (4+4 trusted RBLs)
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
    └── blacklists.json          # IP blacklists (4 RBLs) + domain blacklists (4 DBLs)
```

---

## Production Deployment (Railway)

### 1. Deploy to Railway

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**
2. Select your repo → set root directory to `backend`
3. Add a **SpamAssassin service** (optional):
   - Click **+ New** → **Docker Image** → `instantlinux/spamassassin:latest`
   - Note the internal hostname (e.g., `spamassassin.railway.internal`)

### 2. Set Environment Variables

| Variable | Value |
|----------|-------|
| `MAIL_DOMAIN` | `checkemaildelivery.com` |
| `UPSTASH_REDIS_URL` | `https://your-db.upstash.io` |
| `UPSTASH_REDIS_TOKEN` | `your-token` |
| `MAILGUN_SIGNING_KEY` | `your-signing-key` |
| `SPAMASSASSIN_HOST` | `spamassassin.railway.internal` |
| `SPAMASSASSIN_PORT` | `783` |
| `FRONTEND_URL` | `https://checkemaildelivery.com` |

### 3. Update Mailgun Inbound Route

In Mailgun dashboard → **Receiving** → Edit your route:
- Action: `forward("https://your-api.up.railway.app/api/webhook/mailgun")`

### 4. Cost

| Service | Cost |
|---------|------|
| Railway (API) | ~$5/mo |
| SpamAssassin | included in Railway |
| Upstash Redis | Free (10K req/day) |
| Mailgun | Free (5K emails/mo) |

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MAIL_DOMAIN` | No | `checkemaildelivery.com` | Domain for test email addresses |
| `UPSTASH_REDIS_URL` | **Yes** | — | Upstash Redis REST API URL |
| `UPSTASH_REDIS_TOKEN` | **Yes** | — | Upstash Redis auth token |
| `MAILGUN_SIGNING_KEY` | No | — | Mailgun webhook signing key (skip in dev) |
| `SPAMASSASSIN_HOST` | No | `spamassassin` | SA host (Docker) or `localhost` (no Docker) |
| `SPAMASSASSIN_PORT` | No | `783` | SpamAssassin spamd port |
| `FRONTEND_URL` | No | `http://localhost:3000` | CORS allowed origin |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Webhook not receiving emails | 1. Check MX records point to `mxa.mailgun.org` / `mxb.mailgun.org`. 2. Check Mailgun route expression matches your domain. 3. Check route action URL is correct. 4. Check Mailgun dashboard → Logs for delivery status. |
| 401 "Invalid webhook signature" | Verify `MAILGUN_SIGNING_KEY` in `.env` matches the key in Mailgun → Settings → API Security → HTTP Webhook Signing Key |
| 400 "Missing body-mime" | Mailgun route must have **Forward** action enabled (not just Store). The `body-mime` field contains the raw email. |
| `Connection refused` on port 783 | SpamAssassin not running. Use Docker or set `SPAMASSASSIN_HOST=localhost` (graceful fallback — SA shows "unavailable") |
| Redis errors | Check `UPSTASH_REDIS_URL` and `UPSTASH_REDIS_TOKEN` in `.env` |
| Rate limit hit (429) | Max 5 tests/day per IP. Wait 24h or clear Redis |
| CORS errors in browser | Check `FRONTEND_URL` matches your frontend origin exactly |
| Docker build fails on Windows | Make sure Docker Desktop is running with WSL2 backend |
| SPF/DKIM/DMARC all show FAIL | Check if the raw email has `Authentication-Results` header. If missing, Mailgun may not be passing it — check domain verification in Mailgun dashboard. |
