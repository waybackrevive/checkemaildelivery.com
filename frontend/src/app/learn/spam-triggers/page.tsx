import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Email Spam Triggers to Avoid — CheckEmailDelivery.com",
  description:
    "Common words, patterns, and mistakes that cause emails to land in spam. Learn what to avoid for better deliverability.",
};

export default function SpamTriggersPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <SiteHeader />

      <article className="py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <span
            className="inline-block font-mono text-[11px] font-semibold text-brand uppercase mb-4"
            style={{ letterSpacing: "2px" }}
          >
            Learn
          </span>
          <h1
            className="font-display text-navy mb-4"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400,
              letterSpacing: "-0.8px",
            }}
          >
            Email Spam Triggers
          </h1>
          <p
            className="text-muted text-[17px] mb-12"
            style={{ lineHeight: 1.7 }}
          >
            Spam filters use hundreds of rules to decide whether your email
            reaches the inbox or gets buried. Here are the most common
            triggers and how to avoid them.
          </p>

          <div
            className="space-y-10 text-[15px] text-muted"
            style={{ lineHeight: 1.8 }}
          >
            {/* Subject line */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                🔤 Subject Line Triggers
              </h2>
              <p className="mb-3">Your subject line is the first thing spam filters evaluate.</p>
              <div className="rounded-xl border border-border bg-white overflow-hidden">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-4 py-2.5 text-navy font-semibold">Avoid</th>
                      <th className="text-left px-4 py-2.5 text-navy font-semibold">Why</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr><td className="px-4 py-2">ALL CAPS SUBJECT</td><td className="px-4 py-2">Looks aggressive; SpamAssassin adds 1-2 points</td></tr>
                    <tr><td className="px-4 py-2">🔥🔥🔥 Emoji overuse</td><td className="px-4 py-2">Excessive emojis trigger spam rules</td></tr>
                    <tr><td className="px-4 py-2">&quot;FREE&quot;, &quot;ACT NOW&quot;, &quot;URGENT&quot;</td><td className="px-4 py-2">Classic spam phrases flagged by most filters</td></tr>
                    <tr><td className="px-4 py-2">Re: or Fw: (fake)</td><td className="px-4 py-2">Misleading — filters detect fake reply/forward prefixes</td></tr>
                    <tr><td className="px-4 py-2">Excessive punctuation!!!</td><td className="px-4 py-2">Multiple exclamation marks increase spam scores</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Content triggers */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                📝 Content Triggers
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-navy">Spam words in body:</strong>{" "}
                  &quot;Buy now&quot;, &quot;Click here&quot;, &quot;Limited
                  time offer&quot;, &quot;No obligation&quot;, &quot;Risk
                  free&quot;, &quot;Winner&quot;, &quot;Congratulations&quot;.
                </li>
                <li>
                  <strong className="text-navy">Image-only emails:</strong>{" "}
                  Emails with mostly images and little text look like
                  promotional spam. Aim for a healthy text-to-image ratio.
                </li>
                <li>
                  <strong className="text-navy">Hidden text:</strong> White text
                  on white background or tiny font sizes are classic spam
                  techniques that filters detect.
                </li>
                <li>
                  <strong className="text-navy">URL shorteners:</strong>{" "}
                  bit.ly, tinyurl, etc. are often used by spammers to hide
                  malicious links. Use full URLs instead.
                </li>
                <li>
                  <strong className="text-navy">Too many links:</strong>{" "}
                  Having dozens of links in a single email raises red flags.
                </li>
                <li>
                  <strong className="text-navy">Attachments:</strong>{" "}
                  Executable files (.exe, .bat) are almost always blocked.
                  Even PDFs and ZIPs can trigger filters from new senders.
                </li>
              </ul>
            </section>

            {/* Technical triggers */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                ⚙️ Technical Triggers
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-navy">Missing SPF / DKIM / DMARC:</strong>{" "}
                  The #1 reason emails go to spam. Set up all three. See our{" "}
                  <Link href="/learn/fix-dkim" className="text-brand underline">DKIM guide</Link>{" "}
                  and{" "}
                  <Link href="/learn/what-is-dmarc" className="text-brand underline">DMARC guide</Link>.
                </li>
                <li>
                  <strong className="text-navy">Blacklisted IP / domain:</strong>{" "}
                  If your sending IP or domain is on a blacklist, most of your
                  emails will be blocked. See our{" "}
                  <Link href="/learn/blacklist-removal" className="text-brand underline">blacklist removal guide</Link>.
                </li>
                <li>
                  <strong className="text-navy">No reverse DNS (PTR):</strong>{" "}
                  Your sending IP should have a valid PTR record that matches
                  your domain.
                </li>
                <li>
                  <strong className="text-navy">New domain:</strong> Domains
                  less than 30 days old have low reputation. Start slow and
                  build trust gradually.
                </li>
                <li>
                  <strong className="text-navy">Missing unsubscribe link:</strong>{" "}
                  Required by law (CAN-SPAM, GDPR) and flagged by spam filters
                  if missing in marketing emails.
                </li>
              </ul>
            </section>

            {/* Sending behaviour */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                📈 Sending Behavior Triggers
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-navy">Sudden volume spikes:</strong>{" "}
                  Going from 10 emails/day to 10,000 overnight looks like a
                  compromised account. Warm up gradually.
                </li>
                <li>
                  <strong className="text-navy">High bounce rate:</strong>{" "}
                  Sending to invalid addresses damages your sender reputation.
                  Clean your list regularly.
                </li>
                <li>
                  <strong className="text-navy">Low engagement:</strong> If
                  recipients never open your emails, inbox providers take note
                  and start filtering.
                </li>
                <li>
                  <strong className="text-navy">Spam complaints:</strong> Even a
                  0.3% complaint rate can trigger filtering. Make unsubscribing
                  easy.
                </li>
              </ul>
            </section>

            {/* SpamAssassin */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                🛡️ SpamAssassin Score Guide
              </h2>
              <p className="mb-3">
                SpamAssassin scores your email on a point system. The higher
                the score, the more likely it&apos;s spam:
              </p>
              <div className="rounded-xl border border-border bg-white overflow-hidden">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-4 py-2.5 text-navy font-semibold">Score</th>
                      <th className="text-left px-4 py-2.5 text-navy font-semibold">Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr><td className="px-4 py-2 text-brand font-semibold">0 – 2.9</td><td className="px-4 py-2">Clean — very likely to reach inbox</td></tr>
                    <tr><td className="px-4 py-2 text-warn font-semibold">3.0 – 4.9</td><td className="px-4 py-2">Borderline — may be flagged by some providers</td></tr>
                    <tr><td className="px-4 py-2 text-danger font-semibold">5.0+</td><td className="px-4 py-2">Spam — will likely be filtered or rejected</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-white text-[15px] font-semibold transition-all hover:brightness-110"
              style={{ background: "var(--color-brand)" }}
            >
              Test Your Email Now
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
