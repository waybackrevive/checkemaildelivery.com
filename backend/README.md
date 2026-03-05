# CheckEmailDelivery.com — Backend API

FastAPI + SpamAssassin backend that receives emails via **Cloudflare Email Worker**, runs full deliverability analysis (SPF, DKIM, DMARC, blacklists, content, SpamAssassin), and returns a plain-English report.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  User sends email to test-xxxx@checkemaildelivery.com        │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────┐                 │
│  │  Cloudflare Email Routing               │                 │
│  │  (MX records → Cloudflare)              │                 │
│  │  Runs SPF/DKIM/DMARC verification       │                 │
│  │  Writes Authentication-Results header   │                 │
│  └────────────────┬────────────────────────┘                 │
│                   │                                          │
│                   ▼                                          │
│  ┌─────────────────────────────────────────┐                 │
│  │  Cloudflare Email Worker                │                 │
│  │  Reads raw email stream                 │                 │
│  │  POSTs complete RFC-2822 to backend     │                 │
│  └────────────────┬────────────────────────┘                 │
│                   │                                          │
│                   ▼                                          │
│  ┌──────────────────┐  ┌────────────────────┐               │
│  │  FastAPI (api)   │  │  SpamAssassin      │               │
│  │  Port 8000       │──│  Port 783          │               │
│  └──────────────────┘  └────────────────────┘               │
│          │                                                   │
│          └── Upstash Redis (cloud)                           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Key advantage:** Cloudflare forwards the complete raw email stream — nothing is parsed or modified. The `Authentication-Results` header written by Cloudflare's MX server is the ground truth for SPF/DKIM/DMARC verification.

---

## Cloudflare Email Setup (Step-by-Step)

### 1. Enable Email Routing

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → select your domain (`checkemaildelivery.com`)
2. Click **Email** → **Email Routing**
3. Click **Enable Email Routing**
4. Cloudflare will prompt you to add the required MX and TXT DNS records — click **Add records automatically**

The records Cloudflare adds:

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| MX | `@` | `route1.mx.cloudflare.net` (priority 69) | Route inbound email |
| MX | `@` | `route2.mx.cloudflare.net` (priority 12) | Backup MX |
| MX | `@` | `route3.mx.cloudflare.net` (priority 87) | Backup MX |
| TXT | `@` | `v=spf1 include:_spf.mx.cloudflare.net ~all` | SPF for Cloudflare routing |

> Wait for DNS propagation (usually instant on Cloudflare).

### 2. Create the Email Worker

1. Go to **Email** → **Email Routing** → **Email Workers** tab
2. Click **Create** → name it `checkemaildelivery-email-worker`
3. Paste the code from `cloudflare-worker/email-worker.js` (included in this repo)
4. Click **Save and Deploy**

### 3. Set Worker Environment Variables

In Cloudflare Dashboard → **Workers & Pages** → your worker → **Settings** → **Variables**:

| Variable | Value | Encrypt? |
|----------|-------|----------|
| `BACKEND_URL` | `https://your-api.up.railway.app` | No |
| `WORKER_SECRET` | Any random string (e.g., `ced-wk-a8f3b2c1d4e5`) | **Yes** |

> **Important:** The `WORKER_SECRET` must match `CLOUDFLARE_WORKER_SECRET` in your backend `.env`.

### 4. Create the Catch-All Route

1. Go to **Email** → **Email Routing** → **Routing rules** tab
2. Add a **Catch-all** rule: `*@checkemaildelivery.com` → **Send to Worker** → select your worker
3. Save

### 5. What Gets Sent to Your Backend

The Worker POSTs to `POST /api/webhook/cloudflare`:

| What | Where | Details |
|------|-------|---------|
| Raw email | Request body | Complete RFC-2822 (headers + body), unmodified |
| Content-Type | Header | `message/rfc822` |
| Recipient | `X-Recipient` header | e.g., `test-7a2b4f8e@checkemaildelivery.com` |
| Sender | `X-Sender` header | e.g., `user@gmail.com` |
| Secret | `X-Worker-Secret` header | Shared secret for verification |

The raw email contains `Authentication-Results`, `Received`, `DKIM-Signature`, and all other original headers.

---

## Quick Start (Local Dev)

> **Do Cloudflare setup (above) first!**

### 1. Configure Environment

```bash
cd backend
cp ".env copy.example" .env
```

Open `.env` and fill in:

```dotenv
MAIL_DOMAIN=checkemaildelivery.com
UPSTASH_REDIS_URL=https://your-db.upstash.io
UPSTASH_REDIS_TOKEN=your-token-here
CLOUDFLARE_WORKER_SECRET=same-secret-as-in-worker
SPAMASSASSIN_HOST=localhost                     # or spamassassin for Docker
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

> Without SpamAssassin, the SA section shows "unavailable" with a neutral score. All other analysis works fully.

### 3. Verify

```bash
curl http://localhost:8000/health
# → {"status":"ok"}

# Swagger docs: http://localhost:8000/docs
```

---

## Testing Locally with ngrok

For local dev, the Cloudflare Worker needs to reach your machine:

```bash
# 1. Start ngrok
ngrok http 8000
# → https://abc123.ngrok.io

# 2. Update Worker env variable:
#    BACKEND_URL = https://abc123.ngrok.io

# 3. Send a test email — Worker will POST to your local backend
```

> **Tip:** ngrok URLs change on restart (free plan). Update the Worker's `BACKEND_URL` each time.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/test/create` | Create a test session → returns test email address |
| GET | `/api/test/{id}/status` | Poll for email arrival (frontend calls every 5s) |
| POST | `/api/webhook/cloudflare` | Cloudflare Worker posts raw email here |
| GET | `/api/report/{id}` | Get the full analysis report |
| GET | `/health` | Health check |
| GET | `/docs` | Swagger UI (auto-generated) |

### How the Flow Works

```
1. POST /api/test/create
   → { id: "7a2b4f8e", email: "test-7a2b4f8e@checkemaildelivery.com" }

2. User sends email to test-7a2b4f8e@checkemaildelivery.com

3. Cloudflare receives it (MX records) → Email Worker runs
   → Worker POSTs raw RFC-2822 email to /api/webhook/cloudflare
   → Backend reads Authentication-Results + runs full analysis
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
│   ├── webhook.py              # POST /api/webhook/cloudflare (Email Worker)
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

cloudflare-worker/
├── email-worker.js             # Cloudflare Email Worker (deploy to Cloudflare)
└── wrangler.toml               # Worker config for wrangler CLI
```

---

## Production Deployment (Railway)

### 1. Deploy to Railway

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**
2. Select your repo → set root directory to `backend`
3. (Optional) Add a **SpamAssassin service**:
   - Click **+ New** → **Docker Image** → `instantlinux/spamassassin:latest`
   - Note the internal hostname (e.g., `spamassassin.railway.internal`)

### 2. Set Environment Variables

| Variable | Value |
|----------|-------|
| `MAIL_DOMAIN` | `checkemaildelivery.com` |
| `UPSTASH_REDIS_URL` | `https://your-db.upstash.io` |
| `UPSTASH_REDIS_TOKEN` | `your-token` |
| `CLOUDFLARE_WORKER_SECRET` | Same secret as in Worker settings |
| `SPAMASSASSIN_HOST` | `spamassassin.railway.internal` |
| `SPAMASSASSIN_PORT` | `783` |
| `FRONTEND_URL` | `https://checkemaildelivery.com` |

### 3. Update Worker BACKEND_URL

After deploying to Railway, update the Worker env variable:
- `BACKEND_URL` = `https://your-api.up.railway.app`

### 4. Cost

| Service | Cost |
|---------|------|
| Railway (API) | ~$5/mo |
| SpamAssassin | included in Railway |
| Upstash Redis | Free (10K req/day) |
| Cloudflare Email Routing | **Free forever** |

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MAIL_DOMAIN` | No | `checkemaildelivery.com` | Domain for test email addresses |
| `UPSTASH_REDIS_URL` | **Yes** | — | Upstash Redis REST API URL |
| `UPSTASH_REDIS_TOKEN` | **Yes** | — | Upstash Redis auth token |
| `CLOUDFLARE_WORKER_SECRET` | No | — | Shared secret with Worker (skip in dev) |
| `SPAMASSASSIN_HOST` | No | `spamassassin` | SA host (Docker) or `localhost` (no Docker) |
| `SPAMASSASSIN_PORT` | No | `783` | SpamAssassin spamd port |
| `FRONTEND_URL` | No | `http://localhost:3000` | CORS allowed origin |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Webhook not receiving emails | 1. Check MX records point to `routeN.mx.cloudflare.net`. 2. Check Email Routing is enabled and catch-all routes to Worker. 3. Check Worker `BACKEND_URL` is correct. |
| 403 "Forbidden" on webhook | `CLOUDFLARE_WORKER_SECRET` in backend `.env` doesn't match `WORKER_SECRET` in Worker settings. They must be identical. |
| Empty email body | Worker may not be reading `message.raw` correctly. Check Worker logs in Cloudflare dashboard. |
| `Connection refused` on port 783 | SpamAssassin not running. Use Docker or set `SPAMASSASSIN_HOST=localhost` (graceful fallback). |
| Redis errors | Check `UPSTASH_REDIS_URL` and `UPSTASH_REDIS_TOKEN` in `.env`. |
| Rate limit hit (429) | Max 5 tests/day per IP. Wait 24h or clear Redis. |
| CORS errors in browser | Check `FRONTEND_URL` matches your frontend origin exactly. |
| SPF/DKIM/DMARC all FAIL | Check if raw email has `Authentication-Results` header. Cloudflare should add it automatically when Email Routing is enabled. |
