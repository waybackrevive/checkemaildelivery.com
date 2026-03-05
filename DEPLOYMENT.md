# Production Deployment Guide

Complete step-by-step guide to deploy CheckEmailDelivery.com to Railway (backend) + Vercel (frontend).

---

## Prerequisites

Before you start, you need:

- [x] GitHub repo with your code
- [x] Upstash Redis account → [upstash.com/redis](https://upstash.com)
- [x] Cloudflare account with your domain → [cloudflare.com](https://cloudflare.com)
- [x] Railway account → [railway.app](https://railway.app)
- [x] Vercel account → [vercel.com](https://vercel.com)
- [x] Domain on Cloudflare DNS (required for Email Routing)

---

## PART 1: Deploy Backend to Railway

### 1.1 Create Railway Project

1. Go to [railway.app](https://railway.app) → **New Project**
2. Select **"Deploy from GitHub repo"**
3. Choose your repo: `checkemaildelivery.com`
4. Railway will auto-detect the Dockerfile and start building

### 1.2 Set Environment Variables

Go to your Railway service → **Variables** tab → Add these:

| Variable | Value | Example |
|----------|-------|---------|
| `MAIL_DOMAIN` | Your domain | `checkemaildelivery.com` |
| `UPSTASH_REDIS_URL` | From Upstash dashboard | `https://your-db.upstash.io` |
| `UPSTASH_REDIS_TOKEN` | From Upstash dashboard | `AXqtACQ...` |
| `CLOUDFLARE_WORKER_SECRET` | Random secret you generate | `my-super-secret-key-123` |
| `SPAMASSASSIN_HOST` | Docker service name | `spamassassin` |
| `SPAMASSASSIN_PORT` | SpamAssassin port | `783` |
| `FRONTEND_URL` | Your frontend URLs (comma-separated) | See below ⬇️ |

**For `FRONTEND_URL`, use comma-separated list:**
```
https://checkemaildelivery.vercel.app,https://checkemaildelivery.com,http://localhost:3000
```
👆 Replace `checkemaildelivery.vercel.app` with your actual Vercel URL

### 1.3 Get Railway Backend URL

After deployment completes:
1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy the URL (e.g., `https://checkemaildelivery-production.up.railway.app`)
4. **Save this URL** — you'll need it for Vercel and Cloudflare Worker!

### 1.4 Test Backend Health

```bash
curl https://your-backend.up.railway.app/health
# Should return: {"status":"ok"}
```

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
| `NEXT_PUBLIC_API_URL` | Your Railway backend URL from step 1.3 |

👆 Example: `https://checkemaildelivery-production.up.railway.app`

⚠️ **CRITICAL REQUIREMENTS:**
- ✅ **MUST start with `https://`** — Do not omit the protocol!
- ✅ **No trailing slash** at the end
- ❌ Wrong: `checkemaildelivery-production.up.railway.app` (missing https://)
- ❌ Wrong: `https://checkemaildelivery-production.up.railway.app/` (trailing slash)
- ✅ Correct: `https://checkemaildelivery-production.up.railway.app`

### 2.3 Deploy

Click **Deploy** → Wait 1-2 minutes → ✅ Done!

### 2.4 Get Vercel URL

After deployment:
1. Copy the Vercel URL (e.g., `https://checkemaildelivery-production.vercel.app`)
2. **Go back to Railway** → Variables → Update `FRONTEND_URL` to include this URL

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
| `BACKEND_URL` | Your Railway backend URL (e.g., `https://checkemaildelivery-production.up.railway.app`) |
| `WORKER_SECRET` | Same secret you set as `CLOUDFLARE_WORKER_SECRET` in Railway |

Or via Wrangler CLI:
```bash
wrangler secret put BACKEND_URL
# Enter: https://your-backend.up.railway.app

wrangler secret put WORKER_SECRET
# Enter: same value as CLOUDFLARE_WORKER_SECRET in Railway
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

### ✅ Backend (Railway)

- [ ] Health check works: `curl https://your-backend.up.railway.app/health`
- [ ] Swagger docs accessible: `https://your-backend.up.railway.app/docs`
- [ ] All environment variables set (7 total)
- [ ] CORS includes all frontend URLs

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
- [ ] Test email arrives at backend (check Railway logs for POST `/api/webhook/cloudflare`)

### ✅ Custom Domain (if applicable)

- [ ] DNS records added (A + CNAME) in Cloudflare
- [ ] Domain added in Vercel
- [ ] SSL certificate issued
- [ ] `FRONTEND_URL` in Railway updated with custom domain

---

## Troubleshooting

### "405 Method Not Allowed" or URL concatenation error

**Problem:** Console shows URLs like `https://yoursite.vercel.app/yourbackend.railway.app/api/...`

**Cause:** `NEXT_PUBLIC_API_URL` in Vercel is missing the `https://` protocol prefix.

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Find `NEXT_PUBLIC_API_URL`
3. Make sure it starts with `https://`:
   - ❌ Wrong: `checkemaildelivery-production.up.railway.app`
   - ✅ Correct: `https://checkemaildelivery-production.up.railway.app`
4. Save and **Redeploy**

**Note:** Our code now auto-adds `https://` if missing, but it's best to set it correctly.

### "Something went wrong" error on frontend

**Problem:** Frontend can't reach backend or CORS error.

**Check:**
1. Open browser DevTools → Console tab
2. Look for errors like:
   - `Failed to fetch` → Backend URL wrong or backend crashed
   - `CORS policy` → `FRONTEND_URL` not set correctly in Railway
3. Verify `NEXT_PUBLIC_API_URL` in Vercel matches Railway backend URL

**Fix:**
1. Go to Railway → Variables → Check `FRONTEND_URL` includes your Vercel URL
2. Go to Vercel → Settings → Environment Variables → Check `NEXT_PUBLIC_API_URL`
3. Redeploy both services

### Backend crashes on Railway

**Check logs:**
Railway Dashboard → your service → Deployments → View Logs

**Common issues:**
- Missing environment variables → Add them in Variables tab
- Port binding error → Railway provides `$PORT` env var (our code handles this)
- Redis connection failed → Check `UPSTASH_REDIS_URL` and `UPSTASH_REDIS_TOKEN`

### Webhook not receiving emails

**Check:**
1. Cloudflare Dashboard → Email → Email Routing → Check status is active
2. Workers & Pages → Select worker → Check it's deployed and active
3. Worker logs: Workers & Pages → your worker → Logs → Real-time
4. Send test email → Check Railway logs for POST `/api/webhook/cloudflare`
5. Verify `WORKER_SECRET` in Cloudflare matches `CLOUDFLARE_WORKER_SECRET` in Railway
6. Verify `BACKEND_URL` in worker points to correct Railway URL

### Domain not working

**Check:**
1. DNS propagation (can take up to 24h, usually 5-10 min)
2. Use [dnschecker.org](https://dnschecker.org) to verify records
3. Vercel → Settings → Domains → Check status

---

## Cost Summary

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Railway | Free / Hobby | $0 - $5 |
| Vercel | Hobby | $0 |
| Upstash Redis | Free | $0 (10K requests/day) |
| Cloudflare Email Routing | Free forever | $0 (unlimited) |
| Cloudflare Workers | Free | $0 (100K requests/day) |
| Domain | Annual | ~$10/year |
| **TOTAL** | | **$0 - $5/mo** |

---

## Environment Variables Quick Reference

### Railway (Backend) — 7 variables

```bash
MAIL_DOMAIN=checkemaildelivery.com
UPSTASH_REDIS_URL=https://your-db.upstash.io
UPSTASH_REDIS_TOKEN=AXqtACQ...
CLOUDFLARE_WORKER_SECRET=your-random-secret-here
SPAMASSASSIN_HOST=spamassassin
SPAMASSASSIN_PORT=783
FRONTEND_URL=https://yourdomain.vercel.app,https://yourdomain.com
```

### Vercel (Frontend) — 1 variable

```bash
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
```

### Cloudflare Worker — 2 variables

```bash
BACKEND_URL=https://your-backend.up.railway.app
WORKER_SECRET=your-random-secret-here  # Must match CLOUDFLARE_WORKER_SECRET in Railway
```

---

## Need Help?

If deployment fails:
1. Check Railway logs (Deployments → View Logs)
2. Check Vercel logs (Deployments → Function Logs)
3. Check Cloudflare Worker logs (Workers & Pages → Logs → Real-time)
4. Check browser console (F12 → Console tab)
5. Verify all environment variables are set correctly
6. Make sure no trailing slashes in URLs
7. Confirm CORS origins match exactly (https vs http, www vs non-www)
