import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "SPF Record Guide: Setup, Syntax & Common Mistakes (2026)",
  description:
    "Learn how to set up SPF records correctly. Includes SPF syntax explained, common mistakes, provider-specific includes, and troubleshooting tips.",
  keywords: [
    "SPF record",
    "SPF setup",
    "SPF syntax",
    "SPF include",
    "email authentication",
    "SPF failing",
    "SPF softfail",
    "SPF hardfail",
  ],
  alternates: { canonical: "/blog/spf-record-guide" },
  openGraph: {
    title: "SPF Record Setup Guide - Syntax & Common Mistakes",
    description:
      "Complete guide to SPF records: syntax, setup, and avoiding the 10 DNS lookup limit.",
    url: "https://checkemaildelivery.com/blog/spf-record-guide",
    type: "article",
  },
};

export default function SPFRecordGuidePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <SiteHeader />

      <div className="max-w-[1100px] mx-auto px-6 py-12 grid lg:grid-cols-[1fr_280px] gap-14 items-start">
        <article>
          <nav className="flex items-center gap-2 font-mono text-xs text-muted mb-6">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-navy/70">SPF Record Guide</span>
          </nav>

          <span className="inline-block bg-brand/10 border border-brand/25 text-brand font-mono text-[11px] font-medium uppercase px-3 py-1 rounded-full mb-4" style={{ letterSpacing: "0.1em" }}>
            🔐 Authentication
          </span>

          <h1 className="font-display text-navy mb-5" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, lineHeight: 1.25 }}>
            <em className="italic text-brand">SPF Record</em> Guide:<br />
            Setup, Syntax & Mistakes to Avoid
          </h1>

          <div className="flex items-center gap-5 flex-wrap mb-8 pb-6 border-b border-border">
            <span className="font-mono text-muted text-[11.5px]">📅 Updated March 2026</span>
            <span className="font-mono text-muted text-[11.5px]">⏱ 7 min read</span>
            <span className="font-mono text-muted text-[11.5px]">📋 Technical Guide</span>
          </div>

          <div className="article-content text-muted" style={{ lineHeight: 1.8 }}>
            <p className="mb-5">
              SPF (Sender Policy Framework) is a DNS record that tells the world which servers are
              allowed to send email on behalf of your domain. Without SPF, receiving servers have
              no way to verify your emails are legitimate.
            </p>

            <div className="bg-brand-light border border-brand/20 rounded-xl p-5 my-7">
              <span className="text-xl mr-2">💡</span>
              <span className="text-navy/80">
                <strong className="text-navy">Quick check:</strong> Run a test at{" "}
                <Link href="/" className="text-brand underline">CheckEmailDelivery.com</Link> to
                see if your SPF is working correctly.
              </span>
            </div>

            <h2 id="what-is-spf" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              What is an SPF Record?
            </h2>

            <p className="mb-5">
              An SPF record is a TXT record in your domain&apos;s DNS that lists all the servers
              and services authorized to send email from your domain. Here&apos;s a basic example:
            </p>

            <pre className="bg-navy/5 border border-border rounded-lg px-5 py-4 font-mono text-sm text-brand overflow-x-auto mb-6">
              v=spf1 include:_spf.google.com ~all
            </pre>

            <p className="mb-5">This record says:</p>
            <ul className="list-disc ml-6 space-y-1 mb-6">
              <li><code className="bg-navy/10 px-1 rounded">v=spf1</code> — This is an SPF version 1 record</li>
              <li><code className="bg-navy/10 px-1 rounded">include:_spf.google.com</code> — Google Workspace servers are authorized</li>
              <li><code className="bg-navy/10 px-1 rounded">~all</code> — Softfail anything not listed (mark as suspicious)</li>
            </ul>

            <h2 id="syntax" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              SPF Syntax Explained
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-navy/5">
                    <th className="text-left px-4 py-3 text-muted font-mono text-[11px] uppercase tracking-wider border-b border-border">Mechanism</th>
                    <th className="text-left px-4 py-3 text-muted font-mono text-[11px] uppercase tracking-wider border-b border-border">Example</th>
                    <th className="text-left px-4 py-3 text-muted font-mono text-[11px] uppercase tracking-wider border-b border-border">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-mono text-brand">include:</td>
                    <td className="px-4 py-3"><code className="text-navy/80">include:_spf.google.com</code></td>
                    <td className="px-4 py-3 text-muted">Include another domain&apos;s SPF</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-mono text-brand">ip4:</td>
                    <td className="px-4 py-3"><code className="text-navy/80">ip4:192.0.2.0/24</code></td>
                    <td className="px-4 py-3 text-muted">Authorize an IPv4 address/range</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-mono text-brand">ip6:</td>
                    <td className="px-4 py-3"><code className="text-navy/80">ip6:2001:db8::/32</code></td>
                    <td className="px-4 py-3 text-muted">Authorize an IPv6 address/range</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-mono text-brand">a</td>
                    <td className="px-4 py-3"><code className="text-navy/80">a:mail.example.com</code></td>
                    <td className="px-4 py-3 text-muted">Authorize the A record&apos;s IP</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-mono text-brand">mx</td>
                    <td className="px-4 py-3"><code className="text-navy/80">mx</code></td>
                    <td className="px-4 py-3 text-muted">Authorize all MX servers</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-navy text-lg font-medium mt-8 mb-3">Qualifiers (the ending)</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-brand-light border border-brand/20 rounded-lg p-4">
                <code className="text-brand font-mono text-lg">-all</code>
                <span className="text-navy font-medium ml-2">Hard Fail</span>
                <p className="text-muted text-sm mt-1">Reject emails from unlisted servers. Strictest.</p>
              </div>
              <div className="bg-warn/[0.07] border border-warn/20 rounded-lg p-4">
                <code className="text-warn font-mono text-lg">~all</code>
                <span className="text-navy font-medium ml-2">Soft Fail</span>
                <p className="text-muted text-sm mt-1">Mark as suspicious but accept. Most common.</p>
              </div>
              <div className="bg-[#60a5fa]/[0.07] border border-[#60a5fa]/20 rounded-lg p-4">
                <code className="text-[#60a5fa] font-mono text-lg">?all</code>
                <span className="text-navy font-medium ml-2">Neutral</span>
                <p className="text-muted text-sm mt-1">No policy. Not recommended.</p>
              </div>
              <div className="bg-white shadow-sm border border-border rounded-lg p-4">
                <code className="text-muted font-mono text-lg">+all</code>
                <span className="text-navy font-medium ml-2">Pass All</span>
                <p className="text-muted text-sm mt-1">Allow anyone. Never use this!</p>
              </div>
            </div>

            <h2 id="common-includes" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              Common Provider Includes
            </h2>

            <p className="mb-5">
              Here are the SPF includes for popular email services. Add these to your SPF record
              if you use them:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-navy/5">
                    <th className="text-left px-4 py-3 text-muted font-mono text-[11px] uppercase border-b border-border">Provider</th>
                    <th className="text-left px-4 py-3 text-muted font-mono text-[11px] uppercase border-b border-border">SPF Include</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Google Workspace", "include:_spf.google.com"],
                    ["Microsoft 365", "include:spf.protection.outlook.com"],
                    ["SendGrid", "include:sendgrid.net"],
                    ["Mailchimp", "include:servers.mcsv.net"],
                    ["Amazon SES", "include:amazonses.com"],
                    ["Zoho", "include:zoho.com"],
                    ["Mailgun", "include:mailgun.org"],
                    ["Postmark", "include:spf.mtasv.net"],
                  ].map(([provider, include]) => (
                    <tr key={provider} className="border-b border-border">
                      <td className="px-4 py-3">{provider}</td>
                      <td className="px-4 py-3"><code className="text-brand">{include}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="mistakes" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              Common SPF Mistakes
            </h2>

            <div className="space-y-4 mb-6">
              <div className="bg-danger/[0.07] border border-danger/20 rounded-lg p-4">
                <strong className="text-navy block mb-1">❌ Too many DNS lookups (10 limit)</strong>
                <p className="text-muted text-sm">
                  SPF allows only 10 DNS lookups total. Each <code className="bg-navy/10 px-1 rounded">include:</code>,{" "}
                  <code className="bg-navy/10 px-1 rounded">a</code>, <code className="bg-navy/10 px-1 rounded">mx</code>,{" "}
                  and <code className="bg-navy/10 px-1 rounded">redirect</code> counts. If you hit this limit, SPF fails entirely.
                </p>
                <p className="text-brand text-sm mt-2">
                  <strong>Fix:</strong> Flatten includes into IP addresses, or use an SPF flattening service.
                </p>
              </div>

              <div className="bg-danger/[0.07] border border-danger/20 rounded-lg p-4">
                <strong className="text-navy block mb-1">❌ Multiple SPF records</strong>
                <p className="text-muted text-sm">
                  You can only have ONE SPF record per domain. Two records = both fail.
                </p>
                <p className="text-brand text-sm mt-2">
                  <strong>Fix:</strong> Combine all includes into a single TXT record.
                </p>
              </div>

              <div className="bg-warn/[0.07] border border-warn/20 rounded-lg p-4">
                <strong className="text-navy block mb-1">⚠️ Using +all</strong>
                <p className="text-muted text-sm">
                  This allows anyone to send email as your domain. Never use <code className="bg-navy/10 px-1 rounded">+all</code>.
                </p>
              </div>

              <div className="bg-warn/[0.07] border border-warn/20 rounded-lg p-4">
                <strong className="text-navy block mb-1">⚠️ Forgetting third-party services</strong>
                <p className="text-muted text-sm">
                  If you use Mailchimp, SendGrid, etc., you need their include in your SPF.
                </p>
              </div>
            </div>

            <h2 id="example-records" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              Example SPF Records
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <span className="font-mono text-[10px] text-muted uppercase block mb-1">Google Workspace Only</span>
                <pre className="bg-navy/5 border border-border rounded-lg px-5 py-4 font-mono text-sm text-brand overflow-x-auto">
                  v=spf1 include:_spf.google.com ~all
                </pre>
              </div>
              <div>
                <span className="font-mono text-[10px] text-muted uppercase block mb-1">Microsoft 365 + SendGrid</span>
                <pre className="bg-navy/5 border border-border rounded-lg px-5 py-4 font-mono text-sm text-brand overflow-x-auto">
                  v=spf1 include:spf.protection.outlook.com include:sendgrid.net ~all
                </pre>
              </div>
              <div>
                <span className="font-mono text-[10px] text-muted uppercase block mb-1">Multiple Services</span>
                <pre className="bg-navy/5 border border-border rounded-lg px-5 py-4 font-mono text-sm text-brand overflow-x-auto">
                  v=spf1 include:_spf.google.com include:servers.mcsv.net include:amazonses.com ~all
                </pre>
              </div>
            </div>

            <div className="bg-brand-light border border-brand/20 rounded-xl p-5 my-7">
              <span className="text-xl mr-2">🎯</span>
              <span className="text-navy/80">
                <strong className="text-navy">Test your SPF:</strong> Run a free email test at{" "}
                <Link href="/" className="text-brand underline">CheckEmailDelivery.com</Link> to
                verify your SPF is configured correctly.
              </span>
            </div>
          </div>
        </article>

        <aside className="lg:sticky lg:top-24">
          <div className="bg-white shadow-sm border border-border rounded-xl p-6 mb-5">
            <h3 className="font-mono text-[11px] text-muted uppercase tracking-wider mb-4">
              On This Page
            </h3>
            <ul className="space-y-2">
              {[
                { href: "#what-is-spf", label: "What is SPF?" },
                { href: "#syntax", label: "SPF Syntax" },
                { href: "#common-includes", label: "Provider Includes" },
                { href: "#mistakes", label: "Common Mistakes" },
                { href: "#example-records", label: "Example Records" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-muted text-[13.5px] hover:text-brand transition-colors">
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
            <h3 className="font-display text-navy text-xl mb-2">Check Your SPF</h3>
            <p className="text-muted text-[13px] mb-4">
              Verify your SPF record is correct.
            </p>
            <Link
              href="/"
              className="block bg-brand text-navy text-[13px] font-semibold py-3 px-4 rounded-lg hover:bg-brand-dark transition-colors"
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
            { href: "/blog/how-to-fix-dkim", category: "AUTHENTICATION", title: "How to Fix DKIM" },
            { href: "/blog/what-is-dmarc", category: "AUTHENTICATION", title: "What is DMARC?" },
            { href: "/blog/why-emails-go-to-spam", category: "DELIVERABILITY", title: "Why Emails Go to Spam" },
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
