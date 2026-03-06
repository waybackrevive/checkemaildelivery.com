import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "What is DMARC? Complete Guide to Setup & Policies (2026)",
  description:
    "Learn what DMARC is, how it works with SPF and DKIM, and how to set up DMARC records to protect your domain and improve email deliverability.",
  keywords: [
    "what is DMARC",
    "DMARC setup",
    "DMARC policy",
    "DMARC record",
    "email authentication",
    "DMARC p=none",
    "DMARC p=quarantine",
    "DMARC p=reject",
  ],
  alternates: { canonical: "/blog/what-is-dmarc" },
  openGraph: {
    title: "What is DMARC? Complete Guide to Setup & Policies",
    description:
      "Everything you need to know about DMARC — how it works, why you need it, and how to set it up.",
    url: "https://checkemaildelivery.com/blog/what-is-dmarc",
    type: "article",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is DMARC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DMARC (Domain-based Message Authentication, Reporting & Conformance) is an email authentication protocol that tells receiving servers what to do when email fails SPF or DKIM checks. It protects your domain from spoofing.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need DMARC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Since February 2024, Gmail and Yahoo require DMARC for all senders. Even for light senders, DMARC improves deliverability and protects your domain from being spoofed.",
      },
    },
    {
      "@type": "Question",
      name: "What DMARC policy should I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with p=none to monitor without affecting delivery. After reviewing reports for 2-4 weeks, move to p=quarantine, then eventually p=reject for full protection.",
      },
    },
  ],
};

export default function WhatIsDMARCPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SiteHeader />

      <div className="max-w-[1100px] mx-auto px-6 py-12 grid lg:grid-cols-[1fr_280px] gap-14 items-start">
        <article>
          <nav className="flex items-center gap-2 font-mono text-xs text-muted mb-6">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-navy/70">What is DMARC</span>
          </nav>

          <span className="inline-block bg-brand/10 border border-brand/25 text-brand font-mono text-[11px] font-medium uppercase px-3 py-1 rounded-full mb-4" style={{ letterSpacing: "0.1em" }}>
            🔐 Authentication
          </span>

          <h1 className="font-display text-navy mb-5" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, lineHeight: 1.25 }}>
            What is <em className="italic text-brand">DMARC</em>?<br />
            Complete Setup Guide
          </h1>

          <div className="flex items-center gap-5 flex-wrap mb-8 pb-6 border-b border-border">
            <span className="font-mono text-muted text-[11.5px]">📅 Updated March 2026</span>
            <span className="font-mono text-muted text-[11.5px]">⏱ 6 min read</span>
            <span className="font-mono text-muted text-[11.5px]">📋 Beginner-Friendly</span>
          </div>

          <div className="article-content text-muted" style={{ lineHeight: 1.8 }}>
            <p className="mb-5">
              DMARC (Domain-based Message Authentication, Reporting & Conformance) ties your SPF
              and DKIM together and tells receiving mail servers what to do when authentication
              fails. It&apos;s the final piece of the email authentication puzzle.
            </p>

            <div className="bg-brand-light border border-brand/20 rounded-xl p-5 my-7">
              <span className="text-xl mr-2">⚠️</span>
              <span className="text-navy/80">
                <strong className="text-navy">Required since 2024:</strong> Gmail and Yahoo now
                require DMARC for all senders sending over 5,000 emails per day. Even lighter
                senders benefit from better deliverability.
              </span>
            </div>

            <h2 id="how-it-works" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              How DMARC Works
            </h2>

            <p className="mb-5">
              When someone receives an email claiming to be from your domain, their mail server:
            </p>

            <ol className="list-decimal ml-6 space-y-2 mb-6">
              <li>Checks if the email passes <strong className="text-navy">SPF</strong> (is it from an authorized server?)</li>
              <li>Checks if the email passes <strong className="text-navy">DKIM</strong> (is the signature valid?)</li>
              <li>Looks up your <strong className="text-navy">DMARC record</strong> to see what to do if either fails</li>
              <li>Optionally sends you a <strong className="text-navy">report</strong> about the authentication result</li>
            </ol>

            <div className="bg-white shadow-sm border border-border rounded-xl p-6 my-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-3xl block mb-2">📋</span>
                  <span className="text-navy font-medium block">SPF</span>
                  <span className="text-muted text-sm">Who can send</span>
                </div>
                <div>
                  <span className="text-3xl block mb-2">🔑</span>
                  <span className="text-navy font-medium block">DKIM</span>
                  <span className="text-muted text-sm">Signature verification</span>
                </div>
                <div>
                  <span className="text-3xl block mb-2">🛡️</span>
                  <span className="text-navy font-medium block">DMARC</span>
                  <span className="text-muted text-sm">Policy + reporting</span>
                </div>
              </div>
            </div>

            <h2 id="policies" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              DMARC Policies Explained
            </h2>

            <p className="mb-5">
              The <code className="bg-navy/10 px-1.5 rounded">p=</code> tag in your DMARC record
              tells receiving servers what to do with emails that fail authentication:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-[#60a5fa]/[0.07] border border-[#60a5fa]/20 rounded-lg p-4">
                <code className="text-[#60a5fa] font-mono">p=none</code>
                <span className="text-navy font-medium ml-2">— Monitor Only</span>
                <p className="text-muted text-sm mt-1">
                  Don&apos;t change delivery, just send reports. Start here to see what&apos;s happening.
                </p>
              </div>

              <div className="bg-warn/[0.07] border border-warn/20 rounded-lg p-4">
                <code className="text-warn font-mono">p=quarantine</code>
                <span className="text-navy font-medium ml-2">— Send to Spam</span>
                <p className="text-muted text-sm mt-1">
                  Failed emails go to spam folder. Good middle ground after monitoring.
                </p>
              </div>

              <div className="bg-danger/[0.07] border border-danger/20 rounded-lg p-4">
                <code className="text-danger font-mono">p=reject</code>
                <span className="text-navy font-medium ml-2">— Block Completely</span>
                <p className="text-muted text-sm mt-1">
                  Failed emails are rejected entirely. Maximum protection against spoofing.
                </p>
              </div>
            </div>

            <h2 id="setup" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              How to Set Up DMARC
            </h2>

            <p className="mb-5">
              DMARC is a DNS TXT record. Here&apos;s how to add it:
            </p>

            <ol className="space-y-4 mb-6">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-brand/20 text-brand font-mono text-sm font-bold rounded-full">1</span>
                <div>
                  <strong className="text-navy block">Make sure SPF and DKIM are working</strong>
                  <span className="text-muted text-sm">DMARC depends on these. Test at <Link href="/" className="text-brand underline">CheckEmailDelivery.com</Link> first.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-brand/20 text-brand font-mono text-sm font-bold rounded-full">2</span>
                <div>
                  <strong className="text-navy block">Go to your DNS provider</strong>
                  <span className="text-muted text-sm">Cloudflare, GoDaddy, Namecheap, Route53, etc.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-brand/20 text-brand font-mono text-sm font-bold rounded-full">3</span>
                <div>
                  <strong className="text-navy block">Add a new TXT record</strong>
                  <div className="mt-2">
                    <span className="font-mono text-[10px] text-muted uppercase block mb-1">Record Name</span>
                    <code className="bg-navy/5 border border-border rounded px-3 py-2 font-mono text-sm text-brand block">_dmarc</code>
                  </div>
                  <div className="mt-3">
                    <span className="font-mono text-[10px] text-muted uppercase block mb-1">Record Value (Start Here)</span>
                    <code className="bg-navy/5 border border-border rounded px-3 py-2 font-mono text-sm text-brand block overflow-x-auto">
                      v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
                    </code>
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-brand/20 text-brand font-mono text-sm font-bold rounded-full">4</span>
                <div>
                  <strong className="text-navy block">Wait and review reports</strong>
                  <span className="text-muted text-sm">After 2–4 weeks of monitoring, upgrade to <code className="bg-navy/10 px-1 rounded">p=quarantine</code>, then <code className="bg-navy/10 px-1 rounded">p=reject</code>.</span>
                </div>
              </li>
            </ol>

            <h2 id="example-records" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              Example DMARC Records
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <span className="font-mono text-[10px] text-muted uppercase block mb-1">Basic (Monitoring Only)</span>
                <pre className="bg-navy/5 border border-border rounded-lg px-5 py-4 font-mono text-sm text-brand overflow-x-auto">
                  v=DMARC1; p=none; rua=mailto:dmarc@example.com
                </pre>
              </div>
              <div>
                <span className="font-mono text-[10px] text-muted uppercase block mb-1">Intermediate (Quarantine)</span>
                <pre className="bg-navy/5 border border-border rounded-lg px-5 py-4 font-mono text-sm text-brand overflow-x-auto">
                  v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc@example.com
                </pre>
              </div>
              <div>
                <span className="font-mono text-[10px] text-muted uppercase block mb-1">Strict (Full Protection)</span>
                <pre className="bg-navy/5 border border-border rounded-lg px-5 py-4 font-mono text-sm text-brand overflow-x-auto">
                  v=DMARC1; p=reject; pct=100; rua=mailto:dmarc@example.com; ruf=mailto:forensics@example.com
                </pre>
              </div>
            </div>

            <div className="bg-brand-light border border-brand/20 rounded-xl p-5 my-7">
              <span className="text-xl mr-2">🎯</span>
              <span className="text-navy/80">
                <strong className="text-navy">Test your DMARC:</strong> Run a free email test at{" "}
                <Link href="/" className="text-brand underline">CheckEmailDelivery.com</Link> to
                verify your DMARC record is set up correctly.
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
                { href: "#how-it-works", label: "How DMARC Works" },
                { href: "#policies", label: "DMARC Policies" },
                { href: "#setup", label: "Setup Guide" },
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
            <h3 className="font-display text-navy text-xl mb-2">Check Your DMARC</h3>
            <p className="text-muted text-[13px] mb-4">
              Verify your DMARC setup is correct.
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
            { href: "/blog/spf-record-guide", category: "AUTHENTICATION", title: "SPF Record Setup Guide" },
            { href: "/blog/how-to-fix-dkim", category: "AUTHENTICATION", title: "How to Fix DKIM" },
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
