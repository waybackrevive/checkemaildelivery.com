# Production Deployment Guide

Complete step-by-step guide to deploy CheckEmailDelivery.com to Render.com (backend) + Vercel (frontend).

---

## Prerequisites

Before you start, you need:

- [x] GitHub repo with your code
- [x] Upstash Redis account → [upstash.com/redis](https://upstash.com)
- [x] Cloudflare account with your domain → [cloudflare.com](https://cloudflare.com)
- [x] Render account → [render.com](https://render.com) (free, no credit card required)
- [x] Vercel account → [vercel.com](https://vercel.com)
- [x] Domain on Cloudflare DNS (required for Email Routing)

---

## PART 1: Deploy Backend to Render

> ⚠️ **Render free tier note:** Services sleep after 15 minutes of inactivity. The first request after sleep takes ~35-60 seconds (container wakeup + SpamAssassin init). For low-traffic usage this is fine. To prevent sleep, add your backend health check URL to [UptimeRobot](https://uptimerobot.com) (free) with a 14-minute ping interval.

### 1.1 Create Render Web Service

1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub account and select repo: `checkemaildelivery.com`
3. Configure the service:
   - **Name**: `checkemaildelivery-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Docker`
   - **Instance Type**: `Free`
4. Render auto-detects the `Dockerfile` — click **Create Web Service**

> **Tip:** Alternatively, use the `render.yaml` at the repo root for one-click deploy:
> In Render Dashboard → **New** → **Blueprint** → select your repo

### 1.2 Set Environment Variables

Go to your Render service → **Environment** tab → Add these:

| Variable | Value | Example |
|----------|-------|---------|
| `MAIL_DOMAIN` | Your domain | `checkemaildelivery.com` |
| `UPSTASH_REDIS_URL` | From Upstash dashboard | `https://your-db.upstash.io` |
| `UPSTASH_REDIS_TOKEN` | From Upstash dashboard | `AXqtACQ...` |
| `CLOUDFLARE_WORKER_SECRET` | Random secret you generate | `my-super-secret-key-123` |
| `SPAMASSASSIN_HOST` | SpamAssassin runs in the same container | `127.0.0.1` |
| `SPAMASSASSIN_PORT` | SpamAssassin port | `783` |
| `FRONTEND_URL` | Your frontend URLs (comma-separated) | See below ⬇️ |
| `GROQ_API_KEY` | From console.groq.com (free) | `gsk_...` |

**For `FRONTEND_URL`, use comma-separated list:**
```
https://checkemaildelivery.vercel.app,https://checkemaildelivery.com,http://localhost:3000
```
👆 Replace `checkemaildelivery.vercel.app` with your actual Vercel URL

### 1.3 Get Render Backend URL

After deployment completes (usually 3-5 min for first build):
1. Go to your service dashboard
2. Copy the URL shown at the top (e.g., `https://checkemaildelivery-backend.onrender.com`)
3. **Save this URL** — you'll need it for Vercel and Cloudflare Worker!

### 1.4 Test Backend Health

```bash
curl https://checkemaildelivery-backend.onrender.com/health
# Should return: {"status":"ok"}
```

> 💡 First request may be slow if the service is waking from sleep. Wait 45 seconds and retry if needed.

---

## PART 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Project

1. Go to [vercel.com](https://vercel.com) → **Add New...** → **Project**
2. Import your GitHub repo: `checkemaildelivery.com`
3. **Root Directory**: `frontend`
4. **Framework Preset**: Next.js (auto-detected)

### 2.2 Set Environment Variable

Before clicking **Deploy**, add this environment variable:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | Your Render backend URL from step 1.3 |

👆 Example: `https://checkemaildelivery-backend.onrender.com`

⚠️ **CRITICAL REQUIREMENTS:**
- ✅ **MUST start with `https://`** — Do not omit the protocol!
- ✅ **No trailing slash** at the end
- ❌ Wrong: `checkemaildelivery-backend.onrender.com` (missing https://)
- ❌ Wrong: `https://checkemaildelivery-backend.onrender.com/` (trailing slash)
- ✅ Correct: `https://checkemaildelivery-backend.onrender.com`

### 2.3 Deploy

Click **Deploy** → Wait 1-2 minutes → ✅ Done!

### 2.4 Get Vercel URL

After deployment:
1. Copy the Vercel URL (e.g., `https://checkemaildelivery-production.vercel.app`)
2. **Go back to Render** → Environment → Update `FRONTEND_URL` to include this URL

---

## PART 3: Configure Cloudflare Email Routing + Worker

### 3.1 Enable Email Routing

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Select your domain
2. Click **Email** → **Email Routing** in the sidebar
3. Click **Enable Email Routing**
4. Cloudflare will auto-add the required MX and TXT records

### 3.2 Deploy the Email Worker

1. Install Wrangler CLI (if not already):
   ```bash
   npm install -g wrangler
   ```
2. Authenticate:
   ```bash
   wrangler login
   ```
3. Deploy the worker from the `cloudflare-worker/` directory:
   ```bash
   cd cloudflare-worker
   wrangler deploy
   ```

### 3.3 Set Worker Secrets

In Cloudflare Dashboard → **Workers & Pages** → Select `checkemaildelivery-email-worker`:

1. Go to **Settings** → **Variables and Secrets**
2. Add these environment variables:

| Variable | Value |
|----------|-------|
| `BACKEND_URL` | Your Render backend URL (e.g., `https://checkemaildelivery-backend.onrender.com`) |
| `WORKER_SECRET` | Same secret you set as `CLOUDFLARE_WORKER_SECRET` in Render |

Or via Wrangler CLI:
```bash
wrangler secret put BACKEND_URL
# Enter: https://checkemaildelivery-backend.onrender.com

wrangler secret put WORKER_SECRET
# Enter: same value as CLOUDFLARE_WORKER_SECRET in Render
```

### 3.4 Create Email Routing Rule

1. Go to **Email** → **Email Routing** → **Routing rules**
2. Click **Create rule** or set up **Catch-all**:
   - **Action**: Send to a Worker
   - **Worker**: Select `checkemaildelivery-email-worker`
3. Save the rule

Now all emails to `*@checkemaildelivery.com` will be processed by the Worker → forwarded to your backend.

---

## PART 4: Configure Domain (Optional)

### 4.1 Point Domain to Vercel

If you have a custom domain (e.g., from Hostinger):

**In Cloudflare DNS:**
| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `76.76.19.21` | Auto |
| CNAME | www | `cname.vercel-dns.com` | Auto |

**In Vercel Dashboard:**
1. Go to your project → **Settings** → **Domains**
2. Add `checkemaildelivery.com`
3. Add `www.checkemaildelivery.com`
4. Vercel will auto-verify and provision SSL (takes 5-10 min)

> **Note:** Since your domain is already on Cloudflare, the MX records for Email Routing are managed automatically. No need to configure email DNS separately.

---

## PART 5: Verification Checklist

### ✅ Backend (Render)

- [ ] Health check works: `curl https://checkemaildelivery-backend.onrender.com/health`
- [ ] Swagger docs accessible: `https://checkemaildelivery-backend.onrender.com/docs`
- [ ] All environment variables set (8 total)
- [ ] CORS includes all frontend URLs
- [ ] (Optional) UptimeRobot pinging `/health` every 14 min to prevent sleep

### ✅ Frontend (Vercel)

- [ ] Site loads: `https://your-site.vercel.app`
- [ ] `NEXT_PUBLIC_API_URL` environment variable set
- [ ] Console shows no CORS errors
- [ ] "Run Free Test" button creates test email

### ✅ Cloudflare

- [ ] Email Routing enabled (green status)
- [ ] MX records auto-configured by Cloudflare
- [ ] Email Worker deployed and active
- [ ] Worker secrets set (BACKEND_URL + WORKER_SECRET)
- [ ] Routing rule points to worker (catch-all or specific)
- [ ] Test email arrives at backend (check Render logs for POST `/api/webhook/cloudflare`)

### ✅ Custom Domain (if applicable)

- [ ] DNS records added (A + CNAME) in Cloudflare
- [ ] Domain added in Vercel
- [ ] SSL certificate issued
- [ ] `FRONTEND_URL` in Render updated with custom domain

---

## Troubleshooting

### "405 Method Not Allowed" or URL concatenation error

**Problem:** Console shows URLs like `https://yoursite.vercel.app/yourbackend.onrender.com/api/...`

**Cause:** `NEXT_PUBLIC_API_URL` in Vercel is missing the `https://` protocol prefix.

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Find `NEXT_PUBLIC_API_URL`
3. Make sure it starts with `https://`:
   - ❌ Wrong: `checkemaildelivery-backend.onrender.com`
   - ✅ Correct: `https://checkemaildelivery-backend.onrender.com`
4. Save and **Redeploy**

**Note:** Our code now auto-adds `https://` if missing, but it's best to set it correctly.

### "Something went wrong" error on frontend

**Problem:** Frontend can't reach backend or CORS error.

**Check:**
1. Open browser DevTools → Console tab
2. Look for errors like:
   - `Failed to fetch` → Backend URL wrong or backend crashed
   - `CORS policy` → `FRONTEND_URL` not set correctly in Render
3. Verify `NEXT_PUBLIC_API_URL` in Vercel matches Render backend URL

**Fix:**
1. Go to Render → Environment → Check `FRONTEND_URL` includes your Vercel URL
2. Go to Vercel → Settings → Environment Variables → Check `NEXT_PUBLIC_API_URL`
3. Redeploy both services

### Backend crashes on Render

**Check logs:**
Render Dashboard → your service → **Logs** tab

**Common issues:**
- Missing environment variables → Add them in **Environment** tab
- Memory pressure from SpamAssassin → Add `--max-children=1` flag in `start.sh` if OOM
- Port binding error → Render provides `$PORT` env var (our code handles this automatically)
- Redis connection failed → Check `UPSTASH_REDIS_URL` and `UPSTASH_REDIS_TOKEN`
- Service sleeping → First request after 15 min idle takes ~45 sec, this is normal

### Webhook not receiving emails

**Check:**
1. Cloudflare Dashboard → Email → Email Routing → Check status is active
2. Workers & Pages → Select worker → Check it's deployed and active
3. Worker logs: Workers & Pages → your worker → Logs → Real-time
4. Send test email → Check Render logs for POST `/api/webhook/cloudflare`
5. Verify `WORKER_SECRET` in Cloudflare matches `CLOUDFLARE_WORKER_SECRET` in Render
6. Verify `BACKEND_URL` in worker points to correct Render URL

### Domain not working

**Check:**
1. DNS propagation (can take up to 24h, usually 5-10 min)
2. Use [dnschecker.org](https://dnschecker.org) to verify records
3. Vercel → Settings → Domains → Check status

---

## Cost Summary

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Render | Free forever | **$0** |
| Vercel | Hobby | $0 |
| Upstash Redis | Free | $0 (10K requests/day) |
| Cloudflare Email Routing | Free forever | $0 (unlimited) |
| Cloudflare Workers | Free | $0 (100K requests/day) |
| Domain | Annual | ~$10/year |
| **TOTAL** | | **$0/mo** |

---

## Environment Variables Quick Reference

### Render (Backend) — 8 variables

```bash
MAIL_DOMAIN=checkemaildelivery.com
UPSTASH_REDIS_URL=https://your-db.upstash.io
UPSTASH_REDIS_TOKEN=AXqtACQ...
CLOUDFLARE_WORKER_SECRET=your-random-secret-here
SPAMASSASSIN_HOST=127.0.0.1
SPAMASSASSIN_PORT=783
FRONTEND_URL=https://yourdomain.vercel.app,https://yourdomain.com
GROQ_API_KEY=gsk_...
```

### Vercel (Frontend) — 1 variable

```bash
NEXT_PUBLIC_API_URL=https://checkemaildelivery-backend.onrender.com
```

### Cloudflare Worker — 2 variables

```bash
BACKEND_URL=https://checkemaildelivery-backend.onrender.com
WORKER_SECRET=your-random-secret-here  # Must match CLOUDFLARE_WORKER_SECRET in Render
```

---

## Need Help?

If deployment fails:
1. Check Render logs (Dashboard → your service → Logs tab)
2. Check Vercel logs (Deployments → Function Logs)
3. Check Cloudflare Worker logs (Workers & Pages → Logs → Real-time)
4. Check browser console (F12 → Console tab)
5. Verify all environment variables are set correctly
6. Make sure no trailing slashes in URLs
7. Confirm CORS origins match exactly (https vs http, www vs non-www)
