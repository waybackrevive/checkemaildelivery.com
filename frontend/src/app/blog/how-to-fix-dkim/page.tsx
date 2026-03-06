import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "How to Fix DKIM: Complete Setup Guide for Every Provider (2026)",
  description:
    "Step-by-step DKIM setup guide for Google Workspace, Microsoft 365, Zoho, Mailchimp, SendGrid, and more. Fix your DKIM authentication in 30 minutes.",
  keywords: [
    "fix DKIM",
    "DKIM setup",
    "DKIM not working",
    "DKIM authentication failed",
    "how to add DKIM record",
    "DKIM DNS record",
    "Google Workspace DKIM",
    "Microsoft 365 DKIM",
  ],
  alternates: { canonical: "/blog/how-to-fix-dkim" },
  openGraph: {
    title: "How to Fix DKIM: Step-by-Step Setup Guide",
    description:
      "Complete DKIM setup instructions for every major email provider with troubleshooting tips.",
    url: "https://checkemaildelivery.com/blog/how-to-fix-dkim",
    type: "article",
  },
};

// JSON-LD HowTo Schema
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Fix DKIM Authentication",
  description:
    "A step-by-step guide to setting up DKIM for any email provider",
  totalTime: "PT30M",
  step: [
    {
      "@type": "HowToStep",
      name: "Access your email provider's admin console",
      text: "Log into your email provider (Google Workspace Admin, Microsoft 365, etc.) and find the DKIM settings under Email Authentication or Security.",
    },
    {
      "@type": "HowToStep",
      name: "Generate your DKIM key pair",
      text: "Click 'Generate DKIM Key' or similar. Your provider will create a public/private key pair.",
    },
    {
      "@type": "HowToStep",
      name: "Copy the DNS TXT record",
      text: "Copy the TXT record value (starts with v=DKIM1;). Note the selector name.",
    },
    {
      "@type": "HowToStep",
      name: "Add the record to your domain DNS",
      text: "In your domain registrar, add a new TXT record with name [selector]._domainkey and the copied value.",
    },
    {
      "@type": "HowToStep",
      name: "Activate DKIM signing",
      text: "Return to your email provider and click 'Start Authentication' or 'Enable DKIM'.",
    },
    {
      "@type": "HowToStep",
      name: "Verify with a test email",
      text: "Send a test email and check the headers for DKIM=pass, or use CheckEmailDelivery.com.",
    },
  ],
};

// Provider card component
function ProviderCard({
  name,
  icon,
  difficulty,
  time,
  children,
}: {
  name: string;
  icon: string;
  difficulty: "Easy" | "Medium";
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 my-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="font-display text-white text-xl">{name}</h3>
          <div className="flex gap-3 mt-1">
            <span
              className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded ${
                difficulty === "Easy"
                  ? "bg-brand/15 text-brand"
                  : "bg-warn/15 text-warn"
              }`}
              style={{ letterSpacing: "0.1em" }}
            >
              {difficulty}
            </span>
            <span className="font-mono text-[10px] text-muted-light uppercase" style={{ letterSpacing: "0.05em" }}>
              ⏱ {time}
            </span>
          </div>
        </div>
      </div>
      <div className="text-[#c8d5e8] text-[14.5px]">{children}</div>
    </div>
  );
}

// Step component
function Step({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-4 my-4">
      <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-brand/20 text-brand font-mono text-sm font-bold rounded-full">
        {number}
      </span>
      <div className="text-[#c8d5e8] text-sm pt-0.5">{children}</div>
    </li>
  );
}

// Code block
function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="my-4">
      {label && (
        <span className="font-mono text-[10px] text-muted-light uppercase block mb-1.5" style={{ letterSpacing: "0.1em" }}>
          {label}
        </span>
      )}
      <pre className="bg-black/30 border border-white/10 rounded-lg px-5 py-4 font-mono text-sm text-brand overflow-x-auto">
        {children}
      </pre>
    </div>
  );
}

export default function HowToFixDKIMPage() {
  return (
    <div className="min-h-screen bg-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <SiteHeader />

      <div className="max-w-[1100px] mx-auto px-6 py-12 grid lg:grid-cols-[1fr_280px] gap-14 items-start">
        <article>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-xs text-muted-light mb-6">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/70">Fix DKIM</span>
          </nav>

          <span className="inline-block bg-brand/10 border border-brand/25 text-brand font-mono text-[11px] font-medium uppercase px-3 py-1 rounded-full mb-4" style={{ letterSpacing: "0.1em" }}>
            🔐 Authentication
          </span>

          <h1 className="font-display text-white mb-5" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, lineHeight: 1.25 }}>
            How to Fix <em className="italic text-brand">DKIM</em>: Complete Setup Guide
          </h1>

          <div className="flex items-center gap-5 flex-wrap mb-8 pb-6 border-b border-white/10">
            <span className="font-mono text-muted-light text-[11.5px]">📅 Updated March 2026</span>
            <span className="font-mono text-muted-light text-[11.5px]">⏱ 7 min read</span>
            <span className="font-mono text-muted-light text-[11.5px]">📋 Step-by-Step</span>
          </div>

          <div className="article-content text-[#c8d5e8]" style={{ lineHeight: 1.8 }}>
            <p className="mb-5">
              DKIM (DomainKeys Identified Mail) is a cryptographic signature that proves your email
              actually came from your domain. Without it, Gmail, Outlook, and Yahoo will almost
              certainly send your email to spam.
            </p>

            <p className="mb-5">
              This guide shows you exactly how to set up DKIM for{" "}
              <strong className="text-white">every major email provider</strong>, with screenshots
              and troubleshooting tips.
            </p>

            <div className="bg-brand/[0.07] border border-brand/20 rounded-xl p-5 my-7">
              <span className="text-xl mr-2">💡</span>
              <span className="text-[#a5cdb5]">
                <strong className="text-white">First:</strong> Run a test at{" "}
                <Link href="/" className="text-brand underline">CheckEmailDelivery.com</Link> to
                confirm DKIM is actually your problem. It takes 60 seconds.
              </span>
            </div>

            {/* What is DKIM */}
            <h2 id="what-is-dkim" className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10">
              What is DKIM?
            </h2>

            <p className="mb-5">
              When you send an email, your server attaches a cryptographic signature to the message
              header. The receiving server then looks up your public key (stored as a DNS TXT
              record) and verifies the signature matches. If it does, the email passes DKIM.
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 text-center">
                <span className="text-2xl block mb-2">🔑</span>
                <span className="text-white text-sm font-medium">Private Key</span>
                <p className="text-muted-light text-xs mt-1">Stays on your email server</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 text-center">
                <span className="text-2xl block mb-2">📝</span>
                <span className="text-white text-sm font-medium">Public Key</span>
                <p className="text-muted-light text-xs mt-1">Published in DNS TXT record</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 text-center">
                <span className="text-2xl block mb-2">✅</span>
                <span className="text-white text-sm font-medium">Verification</span>
                <p className="text-muted-light text-xs mt-1">Receiving server checks match</p>
              </div>
            </div>

            {/* Provider Instructions */}
            <h2 id="providers" className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10">
              Setup Instructions by Provider
            </h2>

            <ProviderCard name="Google Workspace" icon="📧" difficulty="Easy" time="15 min">
              <ol className="list-none pl-0 space-y-0">
                <Step number={1}>
                  Go to <strong className="text-white">admin.google.com</strong> → Apps →
                  Google Workspace → Gmail → Authenticate Email
                </Step>
                <Step number={2}>
                  Select your domain and click <strong className="text-white">Generate New Record</strong>
                </Step>
                <Step number={3}>
                  Choose a DKIM key length (2048-bit recommended)
                </Step>
                <Step number={4}>
                  Copy the TXT record value that appears
                </Step>
                <Step number={5}>
                  In your DNS provider, add a TXT record:
                  <CodeBlock label="Record Name">google._domainkey</CodeBlock>
                  <CodeBlock label="Record Value">v=DKIM1; k=rsa; p=MIGfMA0GCS...</CodeBlock>
                </Step>
                <Step number={6}>
                  Wait 24–48 hours for DNS propagation, then click{" "}
                  <strong className="text-white">Start Authentication</strong> in Google Admin
                </Step>
              </ol>
            </ProviderCard>

            <ProviderCard name="Microsoft 365" icon="📬" difficulty="Medium" time="20 min">
              <ol className="list-none pl-0 space-y-0">
                <Step number={1}>
                  Go to <strong className="text-white">admin.microsoft.com</strong> → Settings →
                  Domains → Select your domain
                </Step>
                <Step number={2}>
                  Click <strong className="text-white">DNS records</strong> and find the DKIM CNAME records
                </Step>
                <Step number={3}>
                  Add both CNAME records to your DNS:
                  <CodeBlock label="CNAME 1">
{`selector1._domainkey → selector1-yourdomain-com._domainkey.yourdomain.onmicrosoft.com`}
                  </CodeBlock>
                  <CodeBlock label="CNAME 2">
{`selector2._domainkey → selector2-yourdomain-com._domainkey.yourdomain.onmicrosoft.com`}
                  </CodeBlock>
                </Step>
                <Step number={4}>
                  Go to Microsoft 365 Defender → Email & Collaboration → Policies → DKIM
                </Step>
                <Step number={5}>
                  Select your domain and toggle <strong className="text-white">Sign messages with DKIM</strong> to On
                </Step>
              </ol>
            </ProviderCard>

            <ProviderCard name="Zoho Mail" icon="✉️" difficulty="Easy" time="10 min">
              <ol className="list-none pl-0 space-y-0">
                <Step number={1}>
                  Go to <strong className="text-white">mailadmin.zoho.com</strong> → Domains
                </Step>
                <Step number={2}>
                  Click your domain → <strong className="text-white">Email Configuration</strong> → DKIM
                </Step>
                <Step number={3}>
                  Click <strong className="text-white">Add Selector</strong> and generate a key
                </Step>
                <Step number={4}>
                  Copy the TXT record and add it to your DNS
                </Step>
                <Step number={5}>
                  Click <strong className="text-white">Verify</strong> in Zoho once DNS propagates
                </Step>
              </ol>
            </ProviderCard>

            {/* Troubleshooting */}
            <h2 id="troubleshooting" className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10">
              Common DKIM Problems
            </h2>

            <div className="space-y-4 mb-6">
              <div className="bg-danger/[0.07] border border-danger/20 rounded-lg p-4">
                <strong className="text-white block mb-1">DKIM=neutral (no signature)</strong>
                <p className="text-sm text-muted-light">
                  Your email provider is not signing emails. Go back to your provider&apos;s admin
                  console and enable DKIM signing.
                </p>
              </div>

              <div className="bg-danger/[0.07] border border-danger/20 rounded-lg p-4">
                <strong className="text-white block mb-1">DKIM=fail (bad signature)</strong>
                <p className="text-sm text-muted-light">
                  The DNS record doesn&apos;t match. Check for typos in the TXT record or try
                  regenerating the key.
                </p>
              </div>

              <div className="bg-warn/[0.07] border border-warn/20 rounded-lg p-4">
                <strong className="text-white block mb-1">DKIM=temperror (DNS timeout)</strong>
                <p className="text-sm text-muted-light">
                  The receiving server couldn&apos;t reach your DNS. This usually resolves itself.
                  If persistent, check your DNS provider&apos;s status.
                </p>
              </div>
            </div>

            {/* Verification */}
            <h2 id="verify" className="font-display text-white text-2xl mt-12 mb-4 pt-3 border-t border-white/10">
              Verify Your Setup
            </h2>

            <p className="mb-5">
              After setting up DKIM, wait 24–48 hours for DNS propagation, then verify:
            </p>

            <ol className="list-decimal ml-5 space-y-2 mb-6">
              <li>
                Run a test at{" "}
                <Link href="/" className="text-brand underline">CheckEmailDelivery.com</Link> — we check
                DKIM automatically
              </li>
              <li>
                Send a test email to Gmail and check the headers (click the three dots → &quot;Show
                original&quot;) — look for <code className="bg-white/10 px-1.5 rounded">dkim=pass</code>
              </li>
              <li>
                Use a DNS lookup tool to verify your TXT record exists at{" "}
                <code className="bg-white/10 px-1.5 rounded">[selector]._domainkey.yourdomain.com</code>
              </li>
            </ol>

            <div className="bg-brand/[0.07] border border-brand/20 rounded-xl p-5 my-7">
              <span className="text-xl mr-2">🎯</span>
              <span className="text-[#a5cdb5]">
                <strong className="text-white">Need help?</strong> If you&apos;re still having
                trouble, run a test at{" "}
                <Link href="/" className="text-brand underline">CheckEmailDelivery.com</Link> and
                we&apos;ll show you exactly what&apos;s wrong.
              </span>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-5">
            <h3 className="font-mono text-[11px] text-muted-light uppercase tracking-wider mb-4">
              On This Page
            </h3>
            <ul className="space-y-2">
              {[
                { href: "#what-is-dkim", label: "What is DKIM?" },
                { href: "#providers", label: "Provider Instructions" },
                { href: "#troubleshooting", label: "Troubleshooting" },
                { href: "#verify", label: "Verify Setup" },
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

          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(14,166,110,0.1), rgba(17,34,64,0.8))",
              border: "1px solid rgba(14,166,110,0.2)",
            }}
          >
            <h3 className="font-display text-white text-xl mb-2">Check Your DKIM</h3>
            <p className="text-muted-light text-[13px] mb-4">
              Is your DKIM working? Test it instantly.
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
            { href: "/blog/why-emails-go-to-spam", category: "DELIVERABILITY", title: "Why Emails Go to Spam: 12 Reasons" },
            { href: "/blog/spf-record-guide", category: "AUTHENTICATION", title: "SPF Record Setup Guide" },
            { href: "/blog/what-is-dmarc", category: "AUTHENTICATION", title: "What is DMARC? Complete Guide" },
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
