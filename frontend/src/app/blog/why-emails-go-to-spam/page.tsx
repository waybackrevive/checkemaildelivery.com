import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Why Are My Emails Going to Spam? (12 Real Reasons + Fixes) 2026",
  description:
    "Emails landing in spam? Here are the 12 real reasons — SPF failures, DKIM missing, DMARC, blacklists, content triggers — with exact step-by-step fixes for each.",
  keywords: [
    "why are my emails going to spam",
    "emails going to spam fix",
    "email deliverability",
    "email landing in spam folder",
    "stop emails going to spam",
    "fix spam filter",
  ],
  alternates: { canonical: "/blog/why-emails-go-to-spam" },
  openGraph: {
    title: "Why Are My Emails Going to Spam? 12 Real Reasons + Fixes",
    description:
      "Every reason your email lands in spam — explained in plain English with step-by-step fixes.",
    url: "https://checkemaildelivery.com/blog/why-emails-go-to-spam",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Are My Emails Going to Spam? 12 Reasons + Fixes",
  },
};

// JSON-LD Schema
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Are My Emails Going to Spam? 12 Real Reasons and Fixes",
  description:
    "A complete guide to every reason emails land in spam, with step-by-step fixes for each.",
  datePublished: "2025-01-15",
  dateModified: "2026-03-01",
  author: { "@type": "Organization", name: "CheckEmailDelivery" },
  publisher: {
    "@type": "Organization",
    name: "CheckEmailDelivery",
    url: "https://checkemaildelivery.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://checkemaildelivery.com/blog/why-emails-go-to-spam",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why are my emails going to spam even though I know the person?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This happens because spam filters look at technical signals — SPF, DKIM, DMARC records, IP reputation — not just who you know. Even a friendly email from a misconfigured domain can land in spam.",
      },
    },
    {
      "@type": "Question",
      name: "How do I stop my emails from going to spam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Set up SPF, DKIM, and DMARC records on your domain, warm up your domain gradually, avoid spam trigger words in your content, and check that your IP is not on any blacklists.",
      },
    },
    {
      "@type": "Question",
      name: "Does subject line affect spam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Subject lines with ALL CAPS, excessive exclamation marks, and words like FREE, GUARANTEED, ACT NOW are heavily penalized by spam filters including Gmail and SpamAssassin.",
      },
    },
  ],
};

// Reason card component
function ReasonCard({
  number,
  title,
  impact,
  children,
}: {
  number: string;
  title: string;
  impact: "critical" | "high" | "medium";
  children: React.ReactNode;
}) {
  const impactStyles = {
    critical: "before:bg-danger",
    high: "before:bg-warn",
    medium: "before:bg-[#60a5fa]",
  };
  const badgeStyles = {
    critical: "bg-danger/15 text-danger",
    high: "bg-warn/15 text-warn",
    medium: "bg-[#60a5fa]/15 text-[#60a5fa]",
  };
  const impactLabels = {
    critical: "CRITICAL IMPACT",
    high: "HIGH IMPACT",
    medium: "MEDIUM IMPACT",
  };

  return (
    <div
      className={`bg-white/[0.03] border border-white/10 rounded-xl p-6 my-6 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-[3px] before:h-full ${impactStyles[impact]}`}
    >
      <span className="font-mono text-[11px] text-muted-light uppercase tracking-wider block mb-2">
        {number}
      </span>
      <h3 className="font-display text-white text-xl mb-2">{title}</h3>
      <span
        className={`inline-block font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded mb-3 ${badgeStyles[impact]}`}
        style={{ letterSpacing: "0.1em" }}
      >
        {impactLabels[impact]}
      </span>
      <div className="text-[#c8d5e8] text-[14.5px]">{children}</div>
    </div>
  );
}

// Fix box component
function FixBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-brand/[0.07] border border-brand/20 rounded-lg p-5 mt-4">
      <span className="font-mono text-[11px] font-medium text-brand uppercase tracking-wider block mb-2">
        ✅ How to Fix It
      </span>
      <div className="text-[#a0bda0] text-sm">{children}</div>
    </div>
  );
}

// Callout component
function Callout({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3.5 bg-brand/[0.07] border border-brand/20 rounded-xl p-5 my-7">
      <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
      <div className="text-[#a5cdb5] text-[14.5px]">{children}</div>
    </div>
  );
}

export default function WhyEmailsGoToSpamPage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteHeader />

      <div className="max-w-[1100px] mx-auto px-6 py-12 grid lg:grid-cols-[1fr_280px] gap-14 items-start">
        {/* Article */}
        <article>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-xs text-muted-light mb-6">
            <Link href="/" className="hover:text-brand transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-white/70">Why Emails Go to Spam</span>
          </nav>

          {/* Category */}
          <span className="inline-block bg-danger/10 border border-danger/25 text-danger font-mono text-[11px] font-medium uppercase px-3 py-1 rounded-full mb-4" style={{ letterSpacing: "0.1em" }}>
            📧 Spam & Deliverability
          </span>

          {/* Title */}
          <h1 className="font-display text-white mb-5" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, lineHeight: 1.25 }}>
            Why Are My Emails Going to <em className="italic text-danger">Spam?</em>
            <br />
            12 Real Reasons + Exact Fixes
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-5 flex-wrap mb-8 pb-6 border-b border-white/10">
            <span className="font-mono text-muted-light text-[11.5px]">📅 Updated March 2026</span>
            <span className="font-mono text-muted-light text-[11.5px]">⏱ 9 min read</span>
            <span className="font-mono text-muted-light text-[11.5px]">📊 Covers Gmail, Outlook, Yahoo</span>
          </div>

          {/* Content */}
          <div className="article-content text-[#c8d5e8]" style={{ lineHeight: 1.8 }}>
            <p className="mb-5">
              You wrote a perfectly good email. The person knows you. But it went straight to spam.
              Why?
            </p>

            <p className="mb-5">
              The answer is almost never about the words you used. It is almost always about{" "}
              <strong className="text-white">
                technical signals your domain sends before a single word is read
              </strong>
              . Spam filters make their decision in milliseconds — based on your DNS records, your
              IP reputation, your sending history — before your subject line is ever evaluated.
            </p>

            <p className="mb-5">
              This guide covers all 12 reasons, ordered by how often they cause problems. Each one
              has a direct fix.
            </p>

            <Callout icon="🧪">
              <p>
                <strong className="text-white">Before you read:</strong> Run a free test on{" "}
                <Link href="/" className="text-brand underline underline-offset-2">
                  CheckEmailDelivery.com
                </Link>{" "}
                first. It will tell you exactly which of these 12 issues apply to your email — in
                under 60 seconds. Then come back to fix the ones flagged.
              </p>
            </Callout>

            {/* Summary Table */}
            <h2 className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10">
              Quick Summary: All 12 Reasons
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse my-6">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left px-4 py-3 text-muted-light font-mono text-[11px] uppercase tracking-wider border-b border-white/10">
                      #
                    </th>
                    <th className="text-left px-4 py-3 text-muted-light font-mono text-[11px] uppercase tracking-wider border-b border-white/10">
                      Reason
                    </th>
                    <th className="text-left px-4 py-3 text-muted-light font-mono text-[11px] uppercase tracking-wider border-b border-white/10">
                      Impact
                    </th>
                    <th className="text-left px-4 py-3 text-muted-light font-mono text-[11px] uppercase tracking-wider border-b border-white/10">
                      Fix Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["1", "Missing or broken DKIM signature", "critical", "30 min"],
                    ["2", "SPF record missing or failing", "critical", "15 min"],
                    ["3", "No DMARC policy", "high", "10 min"],
                    ["4", "IP on a blacklist", "critical", "varies"],
                    ["5", "Domain on a blacklist", "critical", "varies"],
                    ["6", "New domain (under 30 days old)", "high", "time only"],
                    ["7", "Spam trigger words in content", "medium", "5 min"],
                    ["8", "ALL CAPS in subject line", "medium", "1 min"],
                    ["9", "Too many images, not enough text", "medium", "10 min"],
                    ["10", "URL shorteners in links", "medium", "5 min"],
                    ["11", "High spam complaint rate", "critical", "strategic"],
                    ["12", "Sending to unverified or old lists", "high", "medium"],
                  ].map(([num, reason, impact, time]) => (
                    <tr
                      key={num}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3">{num}</td>
                      <td className="px-4 py-3">{reason}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-mono text-xs font-bold ${
                            impact === "critical"
                              ? "text-danger"
                              : impact === "high"
                              ? "text-warn"
                              : "text-brand"
                          }`}
                        >
                          {impact.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-light">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reason 1: DKIM */}
            <h2
              id="dkim"
              className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10"
            >
              Reason 1: Missing or Broken DKIM Signature
            </h2>

            <ReasonCard number="Reason 01 / 12" title="DKIM Not Set Up" impact="critical">
              <p>
                DKIM (DomainKeys Identified Mail) is a cryptographic signature your email provider
                adds to every outgoing email. Gmail, Outlook, and Yahoo use it to verify the email
                actually came from you and was not tampered with in transit.
              </p>
            </ReasonCard>

            <p className="mb-4">
              Google made DKIM{" "}
              <strong className="text-white">mandatory for all bulk senders in 2024</strong>.
              Without DKIM, Gmail automatically places your email in spam — not sometimes, always.
            </p>

            <p className="mb-4">
              Even for non-bulk senders, the absence of DKIM is a major negative signal. Spam
              filters give your email a significantly lower trust score the moment they see no DKIM
              signature.
            </p>

            <FixBox>
              <ol className="list-decimal ml-5 space-y-1.5">
                <li>Log into your email provider (Google Workspace, Zoho, Outlook 365, etc.)</li>
                <li>Find the DKIM settings — usually under &quot;Email Authentication&quot;</li>
                <li>Click &quot;Generate DKIM Key&quot;</li>
                <li>
                  Copy the TXT record (looks like:{" "}
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-brand">
                    v=DKIM1; k=rsa; p=MIGf...
                  </code>
                  )
                </li>
                <li>
                  Add it to your domain DNS as a TXT record with the selector they specify
                </li>
                <li>Activate DKIM in your provider settings</li>
                <li>
                  Wait 24–48 hours, then{" "}
                  <Link href="/" className="text-brand underline">
                    test again here
                  </Link>
                </li>
              </ol>
            </FixBox>

            {/* Reason 2: SPF */}
            <h2
              id="spf"
              className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10"
            >
              Reason 2: SPF Record Missing or Failing
            </h2>

            <ReasonCard number="Reason 02 / 12" title="SPF Not Configured" impact="critical">
              <p>
                SPF (Sender Policy Framework) tells the world which servers are allowed to send email
                on behalf of your domain. Without it, receiving servers have no way to verify your
                email is legitimate.
              </p>
            </ReasonCard>

            <p className="mb-4">An SPF record is a DNS TXT record that looks like this:</p>
            <pre className="bg-black/30 border border-white/10 rounded-lg px-5 py-4 font-mono text-sm text-brand overflow-x-auto mb-4">
              v=spf1 include:_spf.google.com ~all
            </pre>

            <FixBox>
              <ol className="list-decimal ml-5 space-y-1.5">
                <li>Go to your domain registrar (Cloudflare, GoDaddy, Namecheap, etc.)</li>
                <li>
                  Add a TXT record: Name = <code className="bg-white/10 px-1 rounded">@</code>,
                  Value ={" "}
                  <code className="bg-white/10 px-1 rounded">
                    v=spf1 include:[YOUR_PROVIDER] -all
                  </code>
                </li>
                <li>
                  Common SPF includes: Google Workspace →{" "}
                  <code className="bg-white/10 px-1 rounded">include:_spf.google.com</code>
                </li>
                <li>Never have more than 10 DNS lookups in one SPF record</li>
              </ol>
            </FixBox>

            {/* Reason 3: DMARC */}
            <h2
              id="dmarc"
              className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10"
            >
              Reason 3: No DMARC Policy
            </h2>

            <ReasonCard number="Reason 03 / 12" title="DMARC Record Missing" impact="high">
              <p>
                DMARC ties your SPF and DKIM together and tells receiving servers what to do when
                your email fails authentication. Since February 2024, Gmail and Yahoo require DMARC
                for all senders above 5,000 emails/day.
              </p>
            </ReasonCard>

            <FixBox>
              <ol className="list-decimal ml-5 space-y-1.5">
                <li>
                  Add a DNS TXT record: Name ={" "}
                  <code className="bg-white/10 px-1 rounded">_dmarc</code>
                </li>
                <li>
                  Start with:{" "}
                  <code className="bg-white/10 px-1 rounded">
                    v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
                  </code>
                </li>
                <li>After 2 weeks, upgrade to p=quarantine</li>
                <li>Eventually move to p=reject for maximum protection</li>
              </ol>
            </FixBox>

            {/* Reason 4-6: Blacklists and New Domain */}
            <h2
              id="blacklist"
              className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10"
            >
              Reason 4–5: Your IP or Domain is Blacklisted
            </h2>

            <ReasonCard number="Reason 04–05 / 12" title="IP or Domain Blacklisted" impact="critical">
              <p>
                Email blacklists (RBLs) are databases of IPs and domains known to send spam. Major
                providers check these lists before accepting any email. Being on Spamhaus alone can
                block you from 95% of enterprise inboxes.
              </p>
            </ReasonCard>

            <FixBox>
              <ol className="list-decimal ml-5 space-y-1.5">
                <li>
                  Run our{" "}
                  <Link href="/" className="text-brand underline">
                    free email test
                  </Link>{" "}
                  to see which blacklists you&apos;re on
                </li>
                <li>Spamhaus: Submit removal at spamhaus.org/query/ip/</li>
                <li>Barracuda: Self-service at barracudacentral.org/rbl/removal-request</li>
                <li>SpamCop: Auto-expires after 24h with no new reports</li>
              </ol>
            </FixBox>

            <h2
              id="new-domain"
              className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10"
            >
              Reason 6: New Domain (Under 30 Days Old)
            </h2>

            <ReasonCard
              number="Reason 06 / 12"
              title="New Domain — No History"
              impact="high"
            >
              <p>
                Spam filters treat newly registered domains with automatic suspicion. If your domain
                is under 30 days old, some filters will flag your email by default.
              </p>
            </ReasonCard>

            <FixBox>
              <ol className="list-decimal ml-5 space-y-1.5">
                <li>Set up SPF, DKIM, DMARC immediately</li>
                <li>Start with 10–20 emails per day to engaged recipients</li>
                <li>Gradually increase volume over 4–6 weeks</li>
                <li>Do not send cold outreach until the domain is 90+ days old</li>
              </ol>
            </FixBox>

            {/* Content reasons 7-10 */}
            <h2
              id="content"
              className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10"
            >
              Reasons 7–10: Content Issues
            </h2>

            <div className="space-y-4 mb-6">
              <p>
                <strong className="text-white">7. Spam Trigger Words:</strong> Words like FREE,
                GUARANTEED, ACT NOW, LIMITED TIME, CLICK HERE trigger filters heavily.
              </p>
              <p>
                <strong className="text-white">8. ALL CAPS Subject Line:</strong> Using more than
                1-2 capitalized words in a subject line is a major spam signal.
              </p>
              <p>
                <strong className="text-white">9. Too Many Images:</strong> Keep a 60/40 text-to-image
                ratio. Emails that are mostly images look like spam.
              </p>
              <p>
                <strong className="text-white">10. URL Shorteners:</strong> bit.ly, tinyurl, t.co are
                all flagged. Always use full, direct URLs.
              </p>
            </div>

            {/* Reasons 11-12: Reputation */}
            <h2
              id="reputation"
              className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10"
            >
              Reasons 11–12: Sender Reputation
            </h2>

            <p className="mb-4">
              <strong className="text-white">11. High Spam Complaint Rate:</strong> Gmail&apos;s
              threshold is 0.1% — if more than 1 in 1,000 recipients marks you as spam, you&apos;re
              in the danger zone. Above 0.3%, delivery is severely impacted.
            </p>

            <p className="mb-4">
              <strong className="text-white">12. Unverified Email Lists:</strong> Old, unverified
              lists contain inactive addresses that bounce. High bounce rates (above 2%) damage your
              reputation. Some addresses become spam traps that instantly blacklist you.
            </p>

            <FixBox>
              <ol className="list-decimal ml-5 space-y-1.5">
                <li>Add a clear unsubscribe link to every marketing email</li>
                <li>Only email people who genuinely opted in</li>
                <li>Use email verification services before campaigns</li>
                <li>Remove unengaged subscribers after 90 days</li>
                <li>Never buy email lists</li>
              </ol>
            </FixBox>

            {/* Final CTA */}
            <Callout icon="🎯">
              <p>
                <strong className="text-white">Ready to check your email?</strong> Run a free
                deliverability test at{" "}
                <Link href="/" className="text-brand underline">
                  CheckEmailDelivery.com
                </Link>{" "}
                — we&apos;ll check all 12 of these issues automatically and show you exactly
                what&apos;s wrong.
              </p>
            </Callout>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24">
          {/* TOC */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-5">
            <h3 className="font-mono text-[11px] text-muted-light uppercase tracking-wider mb-4">
              On This Page
            </h3>
            <ul className="space-y-2">
              {[
                { href: "#dkim", label: "1. DKIM Missing" },
                { href: "#spf", label: "2. SPF Failing" },
                { href: "#dmarc", label: "3. No DMARC" },
                { href: "#blacklist", label: "4–5. Blacklists" },
                { href: "#new-domain", label: "6. New Domain" },
                { href: "#content", label: "7–10. Content" },
                { href: "#reputation", label: "11–12. Reputation" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted-light text-[13.5px] hover:text-brand transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Card */}
          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(14,166,110,0.1), rgba(17,34,64,0.8))",
              border: "1px solid rgba(14,166,110,0.2)",
            }}
          >
            <h3 className="font-display text-white text-xl mb-2">Check Your Email</h3>
            <p className="text-muted-light text-[13px] mb-4">
              Run a free deliverability test and see which issues affect you.
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

      {/* Related Articles */}
      <section className="max-w-[1100px] mx-auto px-6 pb-16">
        <h2 className="font-display text-white text-xl mb-5">Related Guides</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              href: "/blog/how-to-fix-dkim",
              category: "AUTHENTICATION",
              title: "How to Set Up DKIM: Step-by-Step",
            },
            {
              href: "/blog/email-blacklist-removal",
              category: "REPUTATION",
              title: "Email Blacklist Removal Guide",
            },
            {
              href: "/blog/what-is-dmarc",
              category: "AUTHENTICATION",
              title: "What is DMARC? Complete Guide",
            },
          ].map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-brand/30 hover:-translate-y-0.5 transition-all"
            >
              <span
                className="font-mono text-[10px] text-brand uppercase block mb-2"
                style={{ letterSpacing: "0.1em" }}
              >
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
