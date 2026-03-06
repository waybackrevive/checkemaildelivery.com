import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Email Blacklist Removal: How to Delist Your IP & Domain (2026)",
  description:
    "Step-by-step removal instructions for every major email blacklist — Spamhaus, Barracuda, SpamCop, SORBS, and more. Get delisted today.",
  keywords: [
    "email blacklist removal",
    "remove IP from blacklist",
    "Spamhaus removal",
    "Barracuda delist",
    "blacklist checker",
    "email deliverability",
    "IP reputation",
  ],
  alternates: { canonical: "/blog/email-blacklist-removal" },
  openGraph: {
    title: "Email Blacklist Removal Guide - Get Delisted Fast",
    description:
      "Direct removal links and instructions for every major email blacklist.",
    url: "https://checkemaildelivery.com/blog/email-blacklist-removal",
    type: "article",
  },
};

// Blacklist card component
function BlacklistCard({
  name,
  severity,
  impact,
  autoExpiry,
  removalLink,
  children,
}: {
  name: string;
  severity: "critical" | "high" | "medium";
  impact: string;
  autoExpiry: string | null;
  removalLink: string;
  children: React.ReactNode;
}) {
  const severityStyles = {
    critical: { badge: "bg-danger/15 text-danger", border: "border-l-danger" },
    high: { badge: "bg-warn/15 text-warn", border: "border-l-warn" },
    medium: { badge: "bg-[#60a5fa]/15 text-[#60a5fa]", border: "border-l-[#60a5fa]" },
  };

  return (
    <div className={`bg-white shadow-sm border border-border ${severityStyles[severity].border} border-l-[3px] rounded-xl p-6 my-6`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-display text-navy text-xl mb-2">{name}</h3>
          <span
            className={`inline-block font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${severityStyles[severity].badge}`}
            style={{ letterSpacing: "0.1em" }}
          >
            {severity.toUpperCase()} SEVERITY
          </span>
        </div>
        <a
          href={removalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 bg-brand text-navy text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors"
        >
          Request Removal →
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="font-mono text-[10px] text-muted uppercase block mb-1" style={{ letterSpacing: "0.1em" }}>
            Impact
          </span>
          <span className="text-navy">{impact}</span>
        </div>
        <div>
          <span className="font-mono text-[10px] text-muted uppercase block mb-1" style={{ letterSpacing: "0.1em" }}>
            Auto-Expiry
          </span>
          <span className="text-navy">{autoExpiry || "Manual removal required"}</span>
        </div>
      </div>

      <div className="text-muted text-[14.5px]">{children}</div>
    </div>
  );
}

export default function BlacklistRemovalPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <SiteHeader />

      <div className="max-w-[1100px] mx-auto px-6 py-12 grid lg:grid-cols-[1fr_280px] gap-14 items-start">
        <article>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-xs text-muted mb-6">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-navy/70">Blacklist Removal</span>
          </nav>

          <span className="inline-block bg-danger/10 border border-danger/25 text-danger font-mono text-[11px] font-medium uppercase px-3 py-1 rounded-full mb-4" style={{ letterSpacing: "0.1em" }}>
            🚨 Reputation
          </span>

          <h1 className="font-display text-navy mb-5" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, lineHeight: 1.25 }}>
            Email Blacklist Removal: <br />
            <em className="italic text-danger">How to Get Delisted Fast</em>
          </h1>

          <div className="flex items-center gap-5 flex-wrap mb-8 pb-6 border-b border-border">
            <span className="font-mono text-muted text-[11.5px]">📅 Updated March 2026</span>
            <span className="font-mono text-muted text-[11.5px]">⏱ 8 min read</span>
            <span className="font-mono text-muted text-[11.5px]">🔗 Direct removal links</span>
          </div>

          <div className="article-content text-muted" style={{ lineHeight: 1.8 }}>
            <p className="mb-5">
              If your IP address or domain is on an email blacklist, your emails will be blocked
              or sent to spam by millions of mail servers worldwide. This guide gives you{" "}
              <strong className="text-navy">direct links to request removal</strong> from every
              major blacklist, plus instructions on how to stay off them.
            </p>

            <div className="bg-brand-light border border-brand/20 rounded-xl p-5 my-7">
              <span className="text-xl mr-2">🔍</span>
              <span className="text-navy/80">
                <strong className="text-navy">First:</strong> Check which blacklists you&apos;re on at{" "}
                <Link href="/" className="text-brand underline">CheckEmailDelivery.com</Link> — we
                scan 40+ blacklists instantly.
              </span>
            </div>

            {/* How Blacklists Work */}
            <h2 id="how-blacklists-work" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              How Email Blacklists Work
            </h2>

            <p className="mb-5">
              Email blacklists (also called DNSBLs or RBLs) are databases of IP addresses and
              domains that have been reported for sending spam. When you send an email, the
              receiving server checks your IP against these lists. If you&apos;re on one, your
              email is blocked or marked as spam.
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="bg-danger/[0.07] border border-danger/20 rounded-lg p-4 text-center">
                <span className="text-2xl block mb-2">🚫</span>
                <span className="text-navy text-sm font-medium">Blocked</span>
                <p className="text-muted text-xs mt-1">Spamhaus, Barracuda</p>
              </div>
              <div className="bg-warn/[0.07] border border-warn/20 rounded-lg p-4 text-center">
                <span className="text-2xl block mb-2">📥</span>
                <span className="text-navy text-sm font-medium">Spam Folder</span>
                <p className="text-muted text-xs mt-1">SpamCop, SORBS</p>
              </div>
              <div className="bg-[#60a5fa]/[0.07] border border-[#60a5fa]/20 rounded-lg p-4 text-center">
                <span className="text-2xl block mb-2">⚠️</span>
                <span className="text-navy text-sm font-medium">Lower Trust</span>
                <p className="text-muted text-xs mt-1">UCEPROTECT, JustSpam</p>
              </div>
            </div>

            {/* Major Blacklists */}
            <h2 id="major-blacklists" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              Major Blacklists & Removal Instructions
            </h2>

            <BlacklistCard
              name="Spamhaus SBL / XBL / PBL"
              severity="critical"
              impact="Blocks 95%+ of enterprise emails"
              autoExpiry={null}
              removalLink="https://www.spamhaus.org/query/ip/"
            >
              <p className="mb-3">
                Spamhaus is the most widely-used blacklist. Being listed here essentially blocks
                your email from most corporate inboxes.
              </p>
              <ol className="list-decimal ml-5 space-y-1.5 text-sm">
                <li>Go to the Spamhaus IP lookup tool</li>
                <li>Enter your IP address and click &quot;Lookup&quot;</li>
                <li>If listed, click the removal link for your specific listing</li>
                <li>Fill out the removal request form with your details</li>
                <li>Removal typically takes 24–48 hours</li>
              </ol>
            </BlacklistCard>

            <BlacklistCard
              name="Barracuda Reputation Block List"
              severity="critical"
              impact="Used by 200K+ organizations"
              autoExpiry="12 hours after removal"
              removalLink="https://barracudacentral.org/rbl/removal-request"
            >
              <p className="mb-3">
                Barracuda&apos;s BRBL is heavily used by businesses using Barracuda spam filters.
              </p>
              <ol className="list-decimal ml-5 space-y-1.5 text-sm">
                <li>Visit the Barracuda removal request page</li>
                <li>Enter your IP address</li>
                <li>Provide your email and reason for delisting</li>
                <li>Submit — removal is usually automatic within 12 hours</li>
              </ol>
            </BlacklistCard>

            <BlacklistCard
              name="SpamCop"
              severity="high"
              impact="Causes spam folder delivery"
              autoExpiry="24 hours with no new reports"
              removalLink="https://www.spamcop.net/bl.shtml"
            >
              <p className="mb-3">
                SpamCop automatically expires listings 24 hours after the last spam report.
                The best fix is to stop whatever triggered the reports.
              </p>
              <ul className="list-disc ml-5 space-y-1.5 text-sm">
                <li>No manual removal available</li>
                <li>Listings expire 24–48 hours after the last report</li>
                <li>Focus on fixing the root cause (sending to bad lists, etc.)</li>
              </ul>
            </BlacklistCard>

            <BlacklistCard
              name="SORBS"
              severity="medium"
              impact="Minor deliverability impact"
              autoExpiry="Varies by listing type"
              removalLink="http://www.sorbs.net/lookup.shtml"
            >
              <p className="mb-3">
                SORBS has multiple lists for different offense types. Some auto-expire, others
                require manual removal.
              </p>
              <ol className="list-decimal ml-5 space-y-1.5 text-sm">
                <li>Look up your IP on SORBS</li>
                <li>Identify which list you&apos;re on</li>
                <li>Follow the specific removal process for that list</li>
              </ol>
            </BlacklistCard>

            <BlacklistCard
              name="UCEPROTECT"
              severity="medium"
              impact="Level 1–3 varies in severity"
              autoExpiry="7 days for Level 1"
              removalLink="https://www.uceprotect.net/en/rblcheck.php"
            >
              <p className="mb-3">
                UCEPROTECT has three levels. Level 1 (your IP) auto-expires in 7 days. Levels
                2–3 affect IP ranges and are harder to remove.
              </p>
              <ul className="list-disc ml-5 space-y-1.5 text-sm">
                <li>Level 1: Wait 7 days or pay for express removal</li>
                <li>Level 2–3: Contact your hosting provider</li>
              </ul>
            </BlacklistCard>

            {/* Prevention */}
            <h2 id="prevention" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              How to Stay Off Blacklists
            </h2>

            <div className="bg-white shadow-sm border border-border rounded-xl p-6 my-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-brand">✓</span>
                  <span><strong className="text-navy">Set up SPF, DKIM, and DMARC</strong> — properly authenticated emails are rarely blacklisted</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand">✓</span>
                  <span><strong className="text-navy">Never buy email lists</strong> — purchased lists contain spam traps</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand">✓</span>
                  <span><strong className="text-navy">Use double opt-in</strong> — confirm subscribers actually want your email</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand">✓</span>
                  <span><strong className="text-navy">Monitor bounce rates</strong> — keep below 2%</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand">✓</span>
                  <span><strong className="text-navy">Include easy unsubscribe</strong> — reduce spam complaints</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand">✓</span>
                  <span><strong className="text-navy">Warm up new IPs slowly</strong> — don&apos;t blast 10K emails day one</span>
                </li>
              </ul>
            </div>

            <div className="bg-brand-light border border-brand/20 rounded-xl p-5 my-7">
              <span className="text-xl mr-2">🎯</span>
              <span className="text-navy/80">
                <strong className="text-navy">Check your status now:</strong> Run a free blacklist
                check at{" "}
                <Link href="/" className="text-brand underline">CheckEmailDelivery.com</Link> — we
                scan 40+ blacklists and show you exactly where you&apos;re listed.
              </span>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24">
          <div className="bg-white shadow-sm border border-border rounded-xl p-6 mb-5">
            <h3 className="font-mono text-[11px] text-muted uppercase tracking-wider mb-4">
              On This Page
            </h3>
            <ul className="space-y-2">
              {[
                { href: "#how-blacklists-work", label: "How Blacklists Work" },
                { href: "#major-blacklists", label: "Major Blacklists" },
                { href: "#prevention", label: "Prevention" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted text-[13.5px] hover:text-brand transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: "linear-gradient(145deg, rgba(14,166,110,0.08), rgba(14,166,110,0.02))",
              border: "1px solid rgba(14,166,110,0.28)",
              boxShadow: "0 8px 24px rgba(12,26,46,0.06)",
            }}
          >
            <h3 className="font-display text-navy text-xl mb-2">Blacklist Check</h3>
            <p className="text-navy/80 text-[13px] leading-relaxed mb-4">
              Scan 40+ blacklists instantly.
            </p>
            <Link
              href="/"
              className="block bg-brand text-white text-[13px] font-semibold py-3 px-4 rounded-lg hover:bg-brand/90 transition-colors"
            >
              Run Free Test →
            </Link>
          </div>
        </aside>
      </div>

      <section className="max-w-[1100px] mx-auto px-6 pb-16">
        <h2 className="font-display text-navy text-xl mb-5">Related Guides</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { href: "/blog/why-emails-go-to-spam", category: "DELIVERABILITY", title: "Why Emails Go to Spam: 12 Reasons" },
            { href: "/blog/how-to-fix-dkim", category: "AUTHENTICATION", title: "How to Fix DKIM" },
            { href: "/blog/cold-email-deliverability", category: "OUTREACH", title: "Cold Email Deliverability Tips" },
          ].map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="bg-white shadow-sm border border-border rounded-xl p-6 hover:border-brand/30 hover:-translate-y-0.5 transition-all"
            >
              <span className="font-mono text-[10px] text-brand uppercase block mb-2" style={{ letterSpacing: "0.1em" }}>
                {article.category}
              </span>
              <span className="font-display text-navy text-base">{article.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}


