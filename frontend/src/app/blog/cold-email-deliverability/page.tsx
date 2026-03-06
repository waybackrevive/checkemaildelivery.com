import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Cold Email Deliverability: 15 Tips to Land in the Inbox (2026)",
  description:
    "Proven strategies to improve cold email deliverability. Domain warmup, authentication, content tips, and avoiding spam filters for outbound sales.",
  keywords: [
    "cold email deliverability",
    "cold email tips",
    "cold outreach",
    "improve email deliverability",
    "domain warmup",
    "cold email spam",
    "outbound email",
    "sales email deliverability",
  ],
  alternates: { canonical: "/blog/cold-email-deliverability" },
  openGraph: {
    title: "Cold Email Deliverability: 15 Tips to Land in the Inbox",
    description:
      "Proven strategies for cold email success — warmup, authentication, and content optimization.",
    url: "https://checkemaildelivery.com/blog/cold-email-deliverability",
    type: "article",
  },
};

function TipCard({
  number,
  title,
  category,
  children,
}: {
  number: number;
  title: string;
  category: "setup" | "content" | "strategy";
  children: React.ReactNode;
}) {
  const categoryStyles = {
    setup: { badge: "bg-brand/15 text-brand", label: "SETUP" },
    content: { badge: "bg-[#60a5fa]/15 text-[#60a5fa]", label: "CONTENT" },
    strategy: { badge: "bg-warn/15 text-warn", label: "STRATEGY" },
  };

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 my-5">
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-brand/20 text-brand font-mono text-lg font-bold rounded-lg">
          {number}
        </span>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-display text-white text-lg">{title}</h3>
            <span
              className={`font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded ${categoryStyles[category].badge}`}
              style={{ letterSpacing: "0.1em" }}
            >
              {categoryStyles[category].label}
            </span>
          </div>
          <div className="text-[#c8d5e8] text-[14.5px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function ColdEmailDeliverabilityPage() {
  return (
    <div className="min-h-screen bg-navy">
      <SiteHeader />

      <div className="max-w-[1100px] mx-auto px-6 py-12 grid lg:grid-cols-[1fr_280px] gap-14 items-start">
        <article>
          <nav className="flex items-center gap-2 font-mono text-xs text-muted-light mb-6">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/70">Cold Email Deliverability</span>
          </nav>

          <span className="inline-block bg-warn/10 border border-warn/25 text-warn font-mono text-[11px] font-medium uppercase px-3 py-1 rounded-full mb-4" style={{ letterSpacing: "0.1em" }}>
            📤 Outreach
          </span>

          <h1 className="font-display text-white mb-5" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, lineHeight: 1.25 }}>
            Cold Email Deliverability:<br />
            <em className="italic text-brand">15 Tips</em> to Land in the Inbox
          </h1>

          <div className="flex items-center gap-5 flex-wrap mb-8 pb-6 border-b border-white/10">
            <span className="font-mono text-muted-light text-[11.5px]">📅 Updated March 2026</span>
            <span className="font-mono text-muted-light text-[11.5px]">⏱ 10 min read</span>
            <span className="font-mono text-muted-light text-[11.5px]">📊 For Sales & Marketing</span>
          </div>

          <div className="article-content text-[#c8d5e8]" style={{ lineHeight: 1.8 }}>
            <p className="mb-5">
              Cold email is hard. Even if you write the perfect message, poor deliverability means
              your prospects never see it. This guide covers the{" "}
              <strong className="text-white">15 most effective strategies</strong> to ensure your
              cold emails reach the inbox.
            </p>

            <div className="bg-danger/[0.07] border border-danger/20 rounded-xl p-5 my-7">
              <span className="text-xl mr-2">⚠️</span>
              <span className="text-[#ffb4b4]">
                <strong className="text-white">Reality check:</strong> Cold email deliverability is
                harder than ever. Gmail and Microsoft have tightened filters significantly since
                2024. Following these tips is no longer optional — it&apos;s survival.
              </span>
            </div>

            <h2 id="setup" className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10">
              Part 1: Technical Setup
            </h2>

            <TipCard number={1} title="Use a Dedicated Sending Domain" category="setup">
              <p>
                Never send cold email from your main domain. Use a separate domain (e.g.,
                <code className="bg-white/10 px-1 mx-1 rounded">getacme.com</code> if your main is
                <code className="bg-white/10 px-1 mx-1 rounded">acme.com</code>). If the sending
                domain gets burned, your main domain stays clean.
              </p>
            </TipCard>

            <TipCard number={2} title="Set Up SPF, DKIM, and DMARC" category="setup">
              <p>
                All three authentication records are <strong className="text-white">mandatory</strong>.
                Without them, Gmail and Microsoft will send your emails straight to spam. See our
                guides for{" "}
                <Link href="/blog/spf-record-guide" className="text-brand underline">SPF</Link>,{" "}
                <Link href="/blog/how-to-fix-dkim" className="text-brand underline">DKIM</Link>, and{" "}
                <Link href="/blog/what-is-dmarc" className="text-brand underline">DMARC</Link>.
              </p>
            </TipCard>

            <TipCard number={3} title="Warm Up Your Domain" category="setup">
              <p>
                New domains have zero reputation. If you blast 1,000 emails on day one, you&apos;ll
                be flagged immediately. Instead:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Week 1: 10–20 emails/day to engaged recipients</li>
                <li>Week 2–3: 30–50 emails/day</li>
                <li>Week 4+: Gradually increase to your target volume</li>
                <li>Wait at least 2–4 weeks before cold outreach</li>
              </ul>
            </TipCard>

            <TipCard number={4} title="Use a Quality Email Infrastructure" category="setup">
              <p>
                Shared IPs from cheap email services are often pre-burned. Use dedicated IPs or
                reputable services with good deliverability track records. Popular options:
                Google Workspace, Microsoft 365, or dedicated services like Instantly, Smartlead.
              </p>
            </TipCard>

            <TipCard number={5} title="Check Blacklists Regularly" category="setup">
              <p>
                Monitor your sending IP and domain on major blacklists. Use{" "}
                <Link href="/" className="text-brand underline">CheckEmailDelivery.com</Link> to
                scan 40+ blacklists instantly. Getting blacklisted destroys deliverability overnight.
              </p>
            </TipCard>

            <h2 id="content" className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10">
              Part 2: Email Content
            </h2>

            <TipCard number={6} title="Avoid Spam Trigger Words" category="content">
              <p>
                Words like &quot;FREE&quot;, &quot;GUARANTEED&quot;, &quot;ACT NOW&quot;, &quot;LIMITED
                TIME&quot;, &quot;CLICK HERE&quot; trigger spam filters. See our full list in the{" "}
                <Link href="/blog/spam-trigger-words" className="text-brand underline">spam trigger words guide</Link>.
              </p>
            </TipCard>

            <TipCard number={7} title="Keep It Plain Text (Or Minimal HTML)" category="content">
              <p>
                Heavy HTML, lots of images, and fancy formatting scream &quot;marketing email&quot; to
                spam filters. Use plain text or minimal HTML. One-to-one emails should look like
                one-to-one emails.
              </p>
            </TipCard>

            <TipCard number={8} title="Use Your Real Name" category="content">
              <p>
                &quot;John from Acme&quot; outperforms &quot;Acme Sales Team&quot;. Human sender
                names improve both deliverability and open rates.
              </p>
            </TipCard>

            <TipCard number={9} title="Personalize Beyond First Name" category="content">
              <p>
                Spam filters can detect mail-merge patterns. Include unique details: company name,
                recent news, specific pain points. This also improves replies, which boosts your
                sender reputation.
              </p>
            </TipCard>

            <TipCard number={10} title="No URL Shorteners" category="content">
              <p>
                bit.ly, tinyurl, and t.co are heavily penalized. Always use full URLs to your own
                domain. Spammers abuse shorteners, so filters flag them aggressively.
              </p>
            </TipCard>

            <h2 id="strategy" className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10">
              Part 3: Sending Strategy
            </h2>

            <TipCard number={11} title="Verify Email Addresses First" category="strategy">
              <p>
                Sending to invalid addresses causes bounces. High bounce rates (&gt;2%) damage your
                reputation quickly. Use an email verification service before every campaign.
              </p>
            </TipCard>

            <TipCard number={12} title="Spread Sends Throughout the Day" category="strategy">
              <p>
                Don&apos;t blast 500 emails in 10 minutes. Space them out naturally — 2–3 minute gaps
                between sends. This mimics human behavior and avoids rate limiting.
              </p>
            </TipCard>

            <TipCard number={13} title="Monitor Engagement Metrics" category="strategy">
              <p>
                High open rates and replies signal to email providers that recipients want your
                email. Low engagement = spam folder. If open rates drop below 20%, pause and
                reassess your list quality.
              </p>
            </TipCard>

            <TipCard number={14} title="Remove Unengaged Contacts" category="strategy">
              <p>
                If someone hasn&apos;t opened your last 5 emails, stop emailing them. Continuing
                to send damages your reputation. Quality over quantity always wins.
              </p>
            </TipCard>

            <TipCard number={15} title="Handle Replies Promptly" category="strategy">
              <p>
                Positive engagement (opens, replies, clicks) improves your sender score. Handle
                replies quickly — it signals you&apos;re a legitimate sender maintaining real
                conversations.
              </p>
            </TipCard>

            <h2 id="checklist" className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10">
              Quick Checklist
            </h2>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 my-6">
              <ul className="space-y-2">
                {[
                  "Using a dedicated sending domain (not main domain)",
                  "SPF, DKIM, and DMARC all configured and passing",
                  "Domain is warmed up (2–4 weeks minimum)",
                  "Sending IP/domain not on any blacklists",
                  "Email addresses verified before sending",
                  "No spam trigger words in subject or body",
                  "Plain text or minimal HTML formatting",
                  "No URL shorteners",
                  "Personalized content beyond {first_name}",
                  "Sends spread throughout the day",
                  "Unengaged contacts removed",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-brand mt-0.5">☐</span>
                    <span className="text-[#c8d5e8]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-brand/[0.07] border border-brand/20 rounded-xl p-5 my-7">
              <span className="text-xl mr-2">🎯</span>
              <span className="text-[#a5cdb5]">
                <strong className="text-white">Check your setup:</strong> Run a free deliverability
                test at{" "}
                <Link href="/" className="text-brand underline">CheckEmailDelivery.com</Link> before
                launching your cold email campaign.
              </span>
            </div>
          </div>
        </article>

        <aside className="lg:sticky lg:top-24">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-5">
            <h3 className="font-mono text-[11px] text-muted-light uppercase tracking-wider mb-4">
              On This Page
            </h3>
            <ul className="space-y-2">
              {[
                { href: "#setup", label: "Technical Setup" },
                { href: "#content", label: "Email Content" },
                { href: "#strategy", label: "Sending Strategy" },
                { href: "#checklist", label: "Quick Checklist" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-muted-light text-[13.5px] hover:text-brand transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(14,166,110,0.1), rgba(17,34,64,0.8))",
              border: "1px solid rgba(14,166,110,0.2)",
            }}
          >
            <h3 className="font-display text-white text-xl mb-2">Pre-Campaign Check</h3>
            <p className="text-muted-light text-[13px] mb-4">
              Test your email setup before sending.
            </p>
            <Link
              href="/"
              className="block bg-brand text-white text-[13px] font-semibold py-3 px-4 rounded-lg hover:bg-brand-dark transition-colors"
            >
              Run Free Test →
            </Link>
          </div>
        </aside>
      </div>

      <section className="max-w-[1100px] mx-auto px-6 pb-16">
        <h2 className="font-display text-white text-xl mb-5">Related Guides</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { href: "/blog/spam-trigger-words", category: "CONTENT", title: "Spam Trigger Words to Avoid" },
            { href: "/blog/why-emails-go-to-spam", category: "DELIVERABILITY", title: "Why Emails Go to Spam" },
            { href: "/blog/email-blacklist-removal", category: "REPUTATION", title: "Blacklist Removal Guide" },
          ].map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-brand/30 hover:-translate-y-0.5 transition-all"
            >
              <span className="font-mono text-[10px] text-brand uppercase block mb-2" style={{ letterSpacing: "0.1em" }}>
                {article.category}
              </span>
              <span className="font-display text-white text-base">{article.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
