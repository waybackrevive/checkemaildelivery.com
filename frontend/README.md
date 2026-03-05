# CheckEmailDelivery.com — Frontend

Next.js 16 app with TypeScript, Tailwind CSS v4, TanStack Query. 13 pages: core tool flow + about, legal, contact, sample report, and 4 learn guides.

---

## Quick Start (Local Dev)

> **Do backend setup FIRST!** The frontend depends on the backend API.

### 1. Install Dependencies

```bash
cd frontend
npm install
```

> **Windows fix:** If you get a `lightningcss.win32-x64-msvc.node` error:
> ```bash
> Remove-Item -Recurse -Force node_modules, .next, package-lock.json
> npm install
> ```

### 2. Configure Environment

`.env.local` (create if missing):
```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Start Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Make Sure Backend Is Running

The frontend needs the backend. In a separate terminal:

```bash
# Option A: Docker
cd backend && docker-compose up

# Option B: Without Docker
cd backend
pip install -r requirements.txt python-dotenv
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## Pages

### Core Flow

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Homepage — CTA, test email, how it works |
| `/check/[id]` | `src/app/check/[id]/page.tsx` | Waiting screen — polls every 5s, auto-redirects |
| `/report/[id]` | `src/app/report/[id]/page.tsx` | Report dashboard — score, details, action plan |

### Info & Legal

| Route | File | Description |
|-------|------|-------------|
| `/about` | `src/app/about/page.tsx` | Mission, values, beta note |
| `/contact` | `src/app/contact/page.tsx` | Contact & feedback (connect@checkemaildelivery.com) |
| `/privacy` | `src/app/privacy/page.tsx` | Privacy policy |
| `/terms` | `src/app/terms/page.tsx` | Terms of service |
| `/sample-report` | `src/app/sample-report/page.tsx` | Static example report preview |

### Learn Guides

| Route | File | Description |
|-------|------|-------------|
| `/learn/fix-dkim` | `src/app/learn/fix-dkim/page.tsx` | How to fix DKIM step-by-step |
| `/learn/what-is-dmarc` | `src/app/learn/what-is-dmarc/page.tsx` | DMARC explained with setup guide |
| `/learn/spam-triggers` | `src/app/learn/spam-triggers/page.tsx` | Common spam triggers to avoid |
| `/learn/blacklist-removal` | `src/app/learn/blacklist-removal/page.tsx` | Blacklist removal guide |

### User Flow

```
Homepage (/)
    │
    ├─ Click "Start Free Test"
    │  → POST /api/test/create
    │  → Shows test email address with copy button
    │
    ├─ Click "I've Sent My Email → Check Status"
    │
    ▼
Waiting Screen (/check/[id])
    │
    ├─ Polls GET /api/test/{id}/status every 5s
    ├─ Shows pulsing envelope animation
    │
    ├─ When status = "ready" → auto-redirects ▼
    │
    ▼
Report Dashboard (/report/[id])
    │
    ├─ Score Hero (0-100 with risk badge)
    ├─ Action Plan (WHY + HOW + IMPACT)
    ├─ Authentication (SPF, DKIM, DMARC)
    ├─ Reputation (blacklists, domain age)
    ├─ Content (spam words, images, links)
    └─ SpamAssassin (rules triggered)
```

---

## Project Structure

```
frontend/
├── .env.local                       # NEXT_PUBLIC_API_URL
├── package.json
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
│
└── src/
    ├── app/
    │   ├── globals.css              # Design system + animations
    │   ├── layout.tsx               # Root layout, fonts, metadata
    │   ├── page.tsx                 # Homepage
    │   ├── about/page.tsx           # About / mission
    │   ├── contact/page.tsx         # Contact & feedback
    │   ├── privacy/page.tsx         # Privacy policy
    │   ├── terms/page.tsx           # Terms of service
    │   ├── sample-report/page.tsx   # Static example report
    │   ├── check/[id]/page.tsx      # Waiting screen
    │   ├── report/[id]/page.tsx     # Report dashboard
    │   └── learn/
    │       ├── fix-dkim/page.tsx     # DKIM guide
    │       ├── what-is-dmarc/page.tsx # DMARC guide
    │       ├── spam-triggers/page.tsx # Spam triggers guide
    │       └── blacklist-removal/page.tsx # Blacklist removal guide
    │
    ├── components/
    │   ├── site-header.tsx          # Shared nav (all pages)
    │   ├── site-footer.tsx          # Shared footer (all pages)
    │   ├── providers.tsx            # TanStack Query provider
    │   └── ui/                      # Reusable UI (alert, badge, button, card, etc.)
    │
    ├── hooks/
    │   ├── useCopyToClipboard.ts    # Copy email with feedback
    │   └── useTestPolling.ts        # TanStack Query polling (5s)
    │
    ├── lib/
    │   ├── api.ts                   # API client (createTest, getTestStatus, getReport)
    │   ├── score.ts                 # Score color/label helpers
    │   └── utils.ts                 # cn() — Tailwind class merger
    │
    └── types/
        └── report.ts                # TypeScript types (mirrors backend schemas)
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Production Deployment (Vercel)

> **Deploy backend to Railway FIRST** — you need its URL for the frontend env var.

### 1. Deploy

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo
2. Set **Root Directory** to `frontend`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-api.up.railway.app`
4. Click **Deploy**

### 2. Custom Domain (Optional)

1. Vercel → Project Settings → Domains → add `checkemaildelivery.com`
2. In Cloudflare DNS:
   - Type: `CNAME`, Name: `@`, Target: `cname.vercel-dns.com`

### 3. Update Backend CORS

After deploying, update the backend's `FRONTEND_URL` in Railway:

```
FRONTEND_URL=https://checkemaildelivery.com
```

### 4. Cost

| Service | Cost |
|---------|------|
| Vercel | Free |

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | **Yes** | `http://localhost:8000` | Backend API base URL |

> `NEXT_PUBLIC_` prefix makes it available in browser code. The API URL is not a secret.

---

## Tech Stack

| Library | Purpose |
|---------|---------|
| Next.js 16 | SSR framework |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS v4 | Utility-first styling |
| TanStack Query | Polling, caching, server state |
| Lucide React | Icons |
| Sonner | Toast notifications |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `lightningcss.win32-x64-msvc.node` not found | Delete `node_modules`, `.next`, `package-lock.json` → `npm install` |
| "Start Free Test" button fails | Backend not running. Start it first |
| CORS errors in browser | Backend `FRONTEND_URL` must match your frontend origin |
| "Report Not Found" | Report expired (1hr TTL) or test ID is invalid |
| Port 3000 in use | `Get-Process node \| Stop-Process -Force` |

---

## Local Dev Checklist

Before testing the full flow:

- [ ] Backend is running (Docker or uvicorn on port 8000)
- [ ] Frontend dev server is running (`npm run dev`)
- [ ] `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:8000`
- [ ] Backend `.env` has valid Upstash Redis credentials
- [ ] Cloudflare Email Worker is configured (use ngrok for local: `ngrok http 8000`)
- [ ] Open `http://localhost:3000` in browser

### Testing Without Cloudflare (Mock Flow)

If you don't have Cloudflare Email Worker set up yet, you can test the UI:

1. Start backend + frontend
2. Call `POST http://localhost:8000/api/test/create` in browser or Postman
3. Visit `http://localhost:3000/check/{id}` → see the waiting screen
4. Manually hit the webhook endpoint with test data to simulate an email arrival
