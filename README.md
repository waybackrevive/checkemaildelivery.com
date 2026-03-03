# CheckEmailDelivery.com

**Free email deliverability diagnostic tool.** Send a test email → get a 0-100 score with plain-English fixes.

---

## How It Works

1. User visits homepage → gets a unique test email address
2. User sends an email to that address from Gmail / Outlook / anything
3. Backend analyzes: SPF, DKIM, DMARC, blacklists, spam words, SpamAssassin
4. User gets a report with score, risk level, and step-by-step action plan

---

## Project Structure

```
ismyemailspam/
├── backend/       ← Python FastAPI API  (see backend/README.md)
├── frontend/      ← Next.js 16 app      (see frontend/README.md)
└── README.md      ← You are here
```

---

## Setup Order — Do This First → Last

> **Rule:** Always set up backend FIRST, then frontend. The frontend depends on the backend.

### PHASE 1 — External Services (one-time, ~10 min)

Do these **before** touching any code:

| # | Service | What to do | You'll get |
|---|---------|-----------|------------|
| 1 | **Upstash Redis** | Create a free DB at [upstash.com](https://upstash.com) | REST URL + Token |
| 2 | **Resend** | Sign up at [resend.com](https://resend.com) → add your domain → verify DNS | Webhook signing secret |
| 3 | **Domain DNS** | Add MX record: `MX @ inbound-smtp.resend.com 10` | Emails route to Resend |

### PHASE 2 — Backend (~5 min)

```bash
cd backend
cp ".env copy.example" .env      # Copy the template
# Open .env → paste your Upstash URL/Token + Resend secret
```

**Option A — With Docker (includes SpamAssassin):**
```bash
docker-compose up --build
```

**Option B — Without Docker (SpamAssassin skipped, everything else works):**
```bash
pip install -r requirements.txt python-dotenv
cd ..
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Verify: open `http://localhost:8000/health` → you should see `{"status":"ok"}`

### PHASE 3 — Frontend (~3 min)

```bash
cd frontend
npm install
npm run dev
```

Verify: open `http://localhost:3000` → homepage loads with a test email address

### PHASE 4 — Connect Webhook (for receiving real emails)

Resend needs a public URL to send webhooks to your backend.

For **local dev**, use ngrok:
```bash
ngrok http 8000
# Copy the https URL, e.g. https://abc123.ngrok.io
```

Then in **Resend dashboard** → Webhooks → set endpoint to:
```
https://abc123.ngrok.io/api/webhook/resend
```
Events: select `email.received`

### PHASE 5 — Test the Full Flow

1. Open `http://localhost:3000`
2. Click **"Start Free Test"** → copy the test email address
3. Send a real email to it from Gmail / Outlook
4. Watch the waiting screen auto-detect your email
5. View your deliverability report

---

## Production Deployment

### Deployment Order

| # | Component | Platform | Cost | Notes |
|---|-----------|----------|------|-------|
| 1 | Redis | Upstash | Free | Already done in Phase 1 |
| 2 | Email | Resend | Free | Already done in Phase 1 |
| 3 | Backend | [Railway](https://railway.app) | ~$5/mo | Deploy first — frontend needs its URL |
| 4 | Frontend | [Vercel](https://vercel.com) | Free | Set `NEXT_PUBLIC_API_URL` to Railway URL |
| 5 | DNS | Cloudflare | Free | Point `checkemaildelivery.com` → Vercel |

### Step-by-Step

1. **Push to GitHub** — `git push`
2. **Backend → Railway** — Import repo, set root to `backend`, add env vars (see backend README), add SpamAssassin Docker service
3. **Frontend → Vercel** — Import repo, set root to `frontend`, add env var:
   - `NEXT_PUBLIC_API_URL` = `https://your-api.up.railway.app`
4. **Resend** — Update webhook URL to your Railway backend URL
5. **Backend CORS** — Set `FRONTEND_URL=https://checkemaildelivery.com` in Railway env vars
6. **DNS** — In Cloudflare, add CNAME: `@ → cname.vercel-dns.com`

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Example |
|----------|----------|---------|
| `MAIL_DOMAIN` | Yes | `checkemaildelivery.com` |
| `UPSTASH_REDIS_URL` | **Yes** | `https://your-db.upstash.io` |
| `UPSTASH_REDIS_TOKEN` | **Yes** | `your-token` |
| `RESEND_WEBHOOK_SECRET` | No (skip in dev) | `whsec_xxx` |
| `SPAMASSASSIN_HOST` | No | `spamassassin` (Docker) / `localhost` (no Docker) |
| `SPAMASSASSIN_PORT` | No | `783` |
| `FRONTEND_URL` | No | `http://localhost:3000` (dev) / `https://checkemaildelivery.com` (prod) |

### Frontend (`frontend/.env.local`)

| Variable | Required | Example |
|----------|----------|---------|
| `NEXT_PUBLIC_API_URL` | **Yes** | `http://localhost:8000` (dev) / `https://your-api.up.railway.app` (prod) |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS v4, TanStack Query |
| Backend | Python 3.11+, FastAPI, Pydantic |
| Analysis | dkimpy, pyspf, checkdmarc, SpamAssassin, BeautifulSoup |
| Storage | Upstash Redis (auto-expires in 1 hour) |
| Email | Resend Inbound Webhooks |

---

## Scoring

```
Score = (Authentication × 35%) + (Reputation × 25%) + (SpamAssassin × 25%) + (Content × 15%)
```

| Score | Risk | Meaning |
|-------|------|---------|
| 80–100 | Low | Should reach inbox |
| 50–79 | Medium | May land in spam |
| 0–49 | High | Likely going to spam |
