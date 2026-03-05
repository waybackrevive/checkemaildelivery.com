/**
 * Cloudflare Email Worker — CheckEmailDelivery.com
 * =================================================
 *
 * This Worker receives inbound emails via Cloudflare Email Routing
 * and forwards the complete raw RFC-2822 email to the backend API.
 *
 * Setup:
 *   1. Cloudflare Dashboard → your domain → Email → Email Routing → Enable
 *   2. Add catch-all route: *@checkemaildelivery.com → Send to Worker
 *   3. Deploy this Worker (wrangler deploy or paste in dashboard)
 *   4. Set environment variables in Worker settings:
 *        BACKEND_URL    = https://your-api.up.railway.app
 *        WORKER_SECRET  = same value as CLOUDFLARE_WORKER_SECRET in backend .env
 */

export default {
  async email(message, env, ctx) {
    try {
      // Read the complete raw email as text
      const rawEmail = await new Response(message.raw).text();

      // Forward to FastAPI backend
      const response = await fetch(`${env.BACKEND_URL}/api/webhook/cloudflare`, {
        method: "POST",
        headers: {
          "Content-Type": "message/rfc822",
          "X-Worker-Secret": env.WORKER_SECRET,
          "X-Recipient": message.to,
          "X-Sender": message.from,
        },
        body: rawEmail,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(`Backend returned ${response.status}: ${text}`);
        message.setReject(`Backend error: ${response.status}`);
      }
    } catch (error) {
      console.error("Worker error:", error);
      message.setReject("Worker processing failed");
    }
  },
};
