# CheckEmailDelivery.com

**Free email deliverability diagnostic tool + AI-powered email writer.** 

Diagnose why emails go to spam, learn best practices via our blog, and polish your emails with AI while checking spam risk in real-time.

---

## Features

### 🔍 Test Email Analyzer
- Get a unique test email address (5 free tests/day, UTC reset)
- Send a real email from any provider (Gmail, Outlook, etc.)
- Backend analyzes: SPF, DKIM, DMARC, blacklists, spam words, SpamAssassin
- Receive a 0-100 deliverability score with actionable fixes

### ✍️ AI Email Writer
- Transform rough drafts into polished emails (10 free writes/day, UTC reset)
- 6 tone options: Professional, Warm, Concise, Formal, Casual, Persuasive
- Real-time spam detection with severity scoring (High/Medium)
- Regenerate feature if spam words detected
- Clear UTC reset timing for daily credit limits

### 📚 Deliverability Blog
- In-depth guides: SPF, DKIM, DMARC, cold email best practices, spam triggers, blacklist removal
- Consistent, readable design with sidebar CTA cards
- Integrated into main navigation (visible on homepage + all pages)

---

## User Flow

### Testing Flow
1. Visit homepage → click **"Start Free Test"**
2. Copy unique test email address (5 per day limit shows UTC reset)
3. Send real email from Gmail/Outlook/etc. to that address
4. Watch auto-detection of incoming email on analyzer page
5. View detailed deliverability report with score + action plan

### AI Writing Flow
1. Navigate to **"AI Email Writer"** from header
2. Select tone (Professional, Warm, etc.)
3. Paste email draft
4. Click **"Polish with AI"**
5. AI generates polished version
6. System checks for spam words (severity shown)
7. If spam detected: review and use **"Regenerate"** button
8. Copy polished email and send
9. See remaining daily writes with UTC reset time

### Learning Flow
1. Click **"Blog"** in header (available on all pages)
2. Browse email deliverability guides
3. Each article has consistent sidebar CTA directing back to test/write tools

---

## Rate Limiting (Production-Ready)

The app uses **UTC-anchored daily buckets** for production safety across multi-instance deployments:

- **Test Bucket:** 5 tests/day per IP, resets daily at **00:00 UTC**
- **AI Bucket:** 10 generations/day per IP, resets daily at **00:00 UTC**
- **Storage:** Redis (Upstash) with automatic TTL expiration at next UTC midnight
- **Reset Communication:** All endpoints return `reset_at_utc` ISO timestamp so frontend can display accurate countdown

### Architecture Detail
- Old approach: In-memory Python dict (unsafe for multi-instance deployments, lost on restart)
- New approach: Redis-backed UTC day-keys (e.g., `rate:ai:192.168.1.1:2026-03-07`) with TTL
- Sync across all backend instances automatically
- Users see clear "Resets at [HH:MM] UTC" messaging on homepage and AI writer page

---

## Project Structure

```
ismyemailspam/
├── backend/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── ai.py              ← Email Writer API (Groq AI + spam detection)
│   │   │   ├── test.py            ← Test Analyzer API (rate-limited)
│   │   │   └── analyze.py         ← Email analysis logic (SPF/DKIM/DMARC)
│   │   └── models.py
│   ├── storage/
│   │   ├── redis_client.py        ← UTC rate-limit helpers (production-safe)
│   │   └── email_store.py
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           ← Homepage (shared header + test CTA)
│   │   │   ├── tools/
│   │   │   │   └── email-writer/  ← AI writer UI (tone selector, regenerate button)
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx       ← Blog landing page
│   │   │   │   ├── [slug]/page.tsx    ← 7 blog articles (unified sidebar design)
│   │   │   │   └── ...
│   │   ├── components/
│   │   │   ├── site-header.tsx    ← Shared nav (appears on all pages)
│   │   │   └── ...
│   │   └── globals.css            ← Blog readability typography
│   └── package.json
├── cloudflare-worker/             ← Email routing worker
└── README.md

---

## Setup Order — Do This First → Last

> **Rule:** Always set up backend FIRST, then frontend. The frontend depends on the backend.

### PHASE 1 — External Services (one-time, ~10 min)

Do these **before** touching any code:

| # | Service | What to do | You'll get |
|---|---------|-----------|------------|
| 1 | **Upstash Redis** | Create free DB at [upstash.com](https://upstash.com) | REST URL + Token |
| 2 | **Groq API** (NEW) | Sign up free at [console.groq.com](https://console.groq.com) | API Key (no credit card needed) |
| 3 | **Cloudflare** | Enable Email Routing on your domain ([dash.cloudflare.com](https://dash.cloudflare.com)) | MX records auto-added |
| 4 | **Cloudflare Worker** | Deploy `cloudflare-worker/email-worker.js` + set env vars | Email → Worker → backend |

### PHASE 2 — Backend (~5 min)

```bash
cd backend
cp ".env copy.example" .env      # Copy the template
# Open .env → paste your:
#   - Upstash Redis URL + Token
#   - Groq API Key (from console.groq.com)
#   - Cloudflare Worker secret (if using email routing)
```

**Option A — With Docker (includes SpamAssassin):**
```bash
docker-compose up --build
```

**Option B — Without Docker (SpamAssassin skipped, everything else works including AI writer):**
```bash
pip install -r requirements.txt python-dotenv
uvicorn main:app --reload --host 0.0.0.0 --port 8000
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

The Cloudflare Worker needs your backend URL.

**For local dev**, use ngrok:
```bash
ngrok http 8000
# Copy the https URL, e.g. https://abc123.ngrok.io
```

Then update the Worker's `BACKEND_URL` environment variable to your ngrok URL.

**For production**, set `BACKEND_URL` to your Render backend URL.

### PHASE 5 — Test the Full Flow

**Test Email Analyzer Path:**
1. Open `http://localhost:3000`
2. Click **"Start Free Test"** → copy the test email address
3. Send a real email to it from Gmail / Outlook
4. Watch the waiting screen auto-detect your email (~10-30 sec)
5. View your deliverability report with score + action plan

**AI Email Writer Path (NEW):**
1. Open `http://localhost:3000`
2. Click **"AI Email Writer"** in header (or navigate to `/tools/email-writer`)
3. Paste an email draft (e.g., "Hi Bob, want to partner on XYZ project?")
4. Select a tone (Professional, Warm, Concise, Formal, Casual, or Persuasive)
5. Click **"Polish with AI"**
6. AI polishes your email and displays spam risk score
7. If spam detected: review flagged words and use **"Regenerate"** to rewrite
8. Copy result and send
9. Check remaining daily writes + UTC reset time

**Blog Learning Path (NEW):**
1. Click **"Blog"** in header (visible on all pages)
2. Browse articles about SPF, DKIM, DMARC, cold email, spam triggers, etc.
3. Return to testing/writing tools via sidebar CTA cards

---

## Production Deployment

### Deployment Order

| # | Component | Platform | Cost | Notes |
|---|-----------|----------|------|-------|
| 1 | Redis | Upstash | Free | Already done in Phase 1 |
| 2 | Email | Cloudflare Email Routing | **Free forever** | Already done in Phase 1 |
| 3 | Backend | [Render](https://render.com) | Free | Deploy first — frontend needs its URL |
| 4 | Frontend | [Vercel](https://vercel.com) | Free | Set `NEXT_PUBLIC_API_URL` to Render URL |
| 5 | DNS | Cloudflare | Free | Point `checkemaildelivery.com` → Vercel |

### Step-by-Step

1. **Push to GitHub** — `git push` (make sure commit includes all AI writer + rate-limit updates)
2. **Backend → Render** 
   - New Web Service → connect repo → Root Directory: `backend` → Environment: `Docker` → Plan: `Free`
   - Add env vars:
     * `UPSTASH_REDIS_URL`, `UPSTASH_REDIS_TOKEN` (from Phase 1)
     * `GROQ_API_KEY` (free from console.groq.com)
     * `MAIL_DOMAIN`, `CLOUDFLARE_WORKER_SECRET`
     * `SPAMASSASSIN_HOST=127.0.0.1`, `SPAMASSASSIN_PORT=783`
   - Ensure UTC rate-limiting logic is in production (Redis-backed)
3. **Frontend → Vercel** 
   - Import repo, set root to `frontend`
   - Add env var: `NEXT_PUBLIC_API_URL` = `https://checkemaildelivery-backend.onrender.com`
4. **Cloudflare Worker** — Update `BACKEND_URL` to your Render URL
5. **Backend CORS** — Set `FRONTEND_URL=https://checkemaildelivery.com` in Render env vars
6. **DNS** — In Cloudflare, add CNAME: `@ → cname.vercel-dns.com`

### Production Readiness Checklist

- ✅ UTC rate-limiting (Redis-backed, not in-memory) handles 5 tests/day + 10 AI writes/day per IP
- ✅ Groq API key configured (free tier sufficient for 10 writes/day per user)
- ✅ Shared SiteHeader navigation includes Blog + AI Writer links on all pages
- ✅ Blog sidebar cards have high-contrast design (readable on all devices)
- ✅ Rate-limit reset messaging shows UTC timezone on homepage and AI writer
- ✅ All API responses include `reset_at_utc` ISO timestamp for frontend countdown
- ✅ Spam detection works with explicit word list (20+ triggers)
- ✅ Regenerate button allows retry when spam detected
- ⏳ **Deploy** latest commit to Render (auto-deploys on push if GitHub connected)
- ⏳ **Verify** home page shows "Blog" and "AI Email Writer" in header
- ⏳ **Verify** AI writer page displays UTC reset time (e.g., "Resets at 14:22 UTC")
- ⏳ **Monitor** Render logs for any Groq API errors (should use `llama-3.3-70b-versatile`)

---

## Key Production Features (Deep Dive)

### 🚀 Groq AI Model Fallback Chain
The app tries multiple Groq models in order to maximize uptime:
1. `llama-3.3-70b-versatile` (Latest Llama 3.3 70B)
2. `llama-3.1-70b-versatile` (Previous generation 70B)
3. `llama-3.1-8b-instant` (Fast 8B for fallback)
4. `mixtral-8x7b-32768` (Fallback MoE model)

If first model times out or errors, next one is tried automatically. User sees polished email regardless.

### 🔐 UTC Rate-Limiting (Multi-Instance Safe)
- **Old approach:** In-memory Python dict (lost on restart, not safe for multiple instances)
- **New approach:** Redis-backed UTC day-keys + auto-expiring TTL at next UTC midnight
- **Example key:** `rate:ai:192.168.1.1:2026-03-07` (auto-deletes at 00:00 UTC)
- **Persistence:** Survives server restarts and scales across multiple backend instances
- **UX:** Users see countdown: "Resets at 14:22 UTC" (calculated from ISO `reset_at_utc` returned by API)

### 📐 Unified Navigation
- All pages (home, blog articles, AI writer) use `SiteHeader` component
- Blog and AI Writer links visible everywhere, not just "inner pages"
- Consistent styling with site theme (brand green #0ea66e, navy #0c1a2e)

### ✨ High-Contrast Blog Design
- Sidebar CTA cards: Light gradient + white text + visible border + subtle shadow
- Article body text: `#4b5f79` for better contrast than default muted color
- Special handling: `<strong>` tags force navy color to remain readable
- All 7 blog articles have matching design

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Example | Notes |
|----------|----------|---------|-------|
| `MAIL_DOMAIN` | Yes | `checkemaildelivery.com` | Domain for test email addresses |
| `UPSTASH_REDIS_URL` | **Yes** | `https://your-db.upstash.io` | UTC rate-limit storage |
| `UPSTASH_REDIS_TOKEN` | **Yes** | `your-token` | Redis auth token |
| `GROQ_API_KEY` | **Yes** | `gsk_abc123xyz...` | Groq API key for AI Email Writer |
| `CLOUDFLARE_WORKER_SECRET` | No (skip in dev) | `ced-wk-a8f3b2c1d4e5` | Webhook auth |
| `SPAMASSASSIN_HOST` | No | `spamassassin` (Docker) | For detailed spam scoring |
| `SPAMASSASSIN_PORT` | No | `783` | SpamAssassin port |
| `FRONTEND_URL` | No | `http://localhost:3000` (dev) | CORS origin |

**Groq API Setup:**
- Sign up free at [console.groq.com](https://console.groq.com)
- Get API key from dashboard
- Free tier includes: Llama 3.3 70B, Llama 3.1 70B, Llama 3.1 8B, Mixtral 8x7B
- No credit card required
- App tries 4 models in order; first to succeed returns result

### Cloudflare Worker (set in Worker Settings → Variables)

| Variable | Value | Notes |
|----------|-------|-------|
| `BACKEND_URL` | `https://checkemaildelivery-backend.onrender.com` | Where to send intercepted emails |
| `WORKER_SECRET` | Same as `CLOUDFLARE_WORKER_SECRET` in backend | Auth validation |

### Frontend (`frontend/.env.local`)

| Variable | Required | Example | Notes |
|----------|----------|---------|-------|
| `NEXT_PUBLIC_API_URL` | **Yes** | `http://localhost:8000` (dev) | Backend API endpoint |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS v4, TanStack Query | Homepage, test analyzer UI, AI writer UI, blog pages |
| **Backend** | Python 3.11+, FastAPI, Pydantic | Email analysis, AI email generation, rate-limiting |
| **AI** | Groq API (FREE) | Llama 3.3 70B, 3.1 70B/8B, Mixtral 8x7B with fallback chain |
| **Email Analysis** | Authentication-Results parsing, checkdmarc, SpamAssassin, BeautifulSoup | SPF/DKIM/DMARC, blacklist checks, spam scoring |
| **Storage** | Upstash Redis | Rate limits (UTC-buckets), email data (auto-expire 1h) |
| **Email Routing** | Cloudflare Email Routing + Worker | Free forever email routing + webhook to backend |
| **Deployment** | Render (backend, free), Vercel (frontend), Cloudflare (routing) | Production infrastructure |

---

## API Endpoints

### Test Analysis (`/api/test/*`)
- `POST /api/test/create` — Generate unique test email, check 5/day limit (UTC reset)
- `GET /api/test/{token}` — Poll for incoming email and analysis results
- Rate limit: 5 per day per IP, resets at 00:00 UTC

### AI Email Writer (`/ai/*`)
- `POST /ai/write-email` — Polish email draft with AI, includes spam detection
  - Request: `{ "email_draft": "...", "tone": "professional" | "warm" | ... }`
  - Response: `{ "success": true, "email": "...", "spam_score": 0-100, "reset_at_utc": "2026-03-08T00:00:00+00:00", "remaining_requests": 9, ... }`
- Rate limit: 10 per day per IP, resets at 00:00 UTC
- Features: 6 tones, real-time spam detection (shows which spam words found), regenerate option

## Scoring & Detection

### Email Deliverability Score (0-100)
```
Score = (Authentication × 35%) + (Reputation × 25%) + (SpamAssassin × 25%) + (Content × 15%)
```

| Score | Risk | Meaning |
|-------|------|---------|
| 80–100 | Low | Should reach inbox |
| 50–79 | Medium | May land in spam |
| 0–49 | High | Likely going to spam |

### Spam Word Detection (AI Writer)
- Real-time scanning of polished email for 20+ common spam triggers
- Severity levels:
  - **High:** Spam words that significantly impact deliverability (e.g., "click here", "FREE", "limited time")
  - **Medium:** Words that may trigger filters (e.g., "amazing", "act now")
- User-visible scores: 0-100 spam risk
- Regenerate button allows user to request AI to rewrite avoiding spam words
