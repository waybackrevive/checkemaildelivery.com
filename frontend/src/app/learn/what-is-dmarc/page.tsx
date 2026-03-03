import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "What is DMARC? — CheckEmailDelivery.com",
  description:
    "Learn what DMARC is, how it protects your domain from spoofing, and how to set it up for better email deliverability.",
};

export default function WhatIsDmarcPage() {
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
            What is DMARC?
          </h1>
          <p
            className="text-muted text-[17px] mb-12"
            style={{ lineHeight: 1.7 }}
          >
            DMARC (Domain-based Message Authentication, Reporting &amp;
            Conformance) tells receiving mail servers what to do when an email
            fails SPF or DKIM checks. It&apos;s the final piece of the email
            authentication puzzle.
          </p>

          <div
            className="space-y-10 text-[15px] text-muted"
            style={{ lineHeight: 1.8 }}
          >
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                How DMARC Works
              </h2>
              <p>DMARC builds on top of SPF and DKIM. Here&apos;s the flow:</p>
              <ol className="list-decimal pl-6 mt-3 space-y-2">
                <li>You send an email from your domain.</li>
                <li>
                  The receiving server checks SPF (is the sending IP
                  authorized?) and DKIM (is the signature valid?).
                </li>
                <li>
                  The receiving server looks up your DMARC DNS record to see
                  your policy: <strong className="text-navy">none</strong>,{" "}
                  <strong className="text-navy">quarantine</strong>, or{" "}
                  <strong className="text-navy">reject</strong>.
                </li>
                <li>
                  If SPF or DKIM fails and DMARC policy says &quot;reject&quot;,
                  the email is blocked.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                DMARC Policies Explained
              </h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-white p-4">
                  <p className="font-mono text-[13px] text-brand font-semibold mb-1">
                    p=none
                  </p>
                  <p>
                    Monitor only. Failed emails are still delivered. Use this
                    when you&apos;re first setting up DMARC to see what&apos;s
                    happening without breaking anything.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                  <p className="font-mono text-[13px] text-warn font-semibold mb-1">
                    p=quarantine
                  </p>
                  <p>
                    Failed emails go to spam/junk. A good middle ground while
                    you verify all your sending sources pass SPF and DKIM.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                  <p className="font-mono text-[13px] text-danger font-semibold mb-1">
                    p=reject
                  </p>
                  <p>
                    Failed emails are blocked entirely. The strongest
                    protection — only use this once you&apos;re confident your
                    legitimate email always passes authentication.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Setting Up DMARC
              </h2>
              <p className="mb-3">
                Add a TXT record to your domain&apos;s DNS:
              </p>
              <div className="font-mono text-[12px] bg-navy text-brand rounded-lg px-4 py-3 overflow-x-auto">
                <p className="text-muted-light mb-1"># Start with monitoring</p>
                <p>
                  <span className="text-white">Host:</span> _dmarc.yourdomain.com
                </p>
                <p>
                  <span className="text-white">Type:</span> TXT
                </p>
                <p>
                  <span className="text-white">Value:</span>{" "}
                  v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
                </p>
              </div>
              <p className="mt-4">
                The <code className="font-mono text-[13px] text-navy bg-bg px-1.5 py-0.5 rounded">rua</code> tag
                tells mail servers where to send aggregate reports so you can see
                who&apos;s sending email on behalf of your domain.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Recommended Rollout Path
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong className="text-navy">Set up SPF and DKIM</strong>{" "}
                  first — DMARC depends on them.
                </li>
                <li>
                  <strong className="text-navy">Start with p=none</strong> —
                  monitor for 2-4 weeks to see who&apos;s sending email from
                  your domain.
                </li>
                <li>
                  <strong className="text-navy">Move to p=quarantine</strong>{" "}
                  — this catches unauthorized senders while still delivering
                  legitimate email.
                </li>
                <li>
                  <strong className="text-navy">Graduate to p=reject</strong>{" "}
                  — once you&apos;re confident all legitimate sources pass
                  authentication.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Why Gmail &amp; Yahoo Require DMARC
              </h2>
              <p>
                Since February 2024, Gmail and Yahoo require bulk senders
                (5,000+ messages/day) to have a DMARC record. Even if you
                send fewer emails, having DMARC significantly improves your
                deliverability and protects your brand from spoofing.
              </p>
            </section>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-white text-[15px] font-semibold transition-all hover:brightness-110"
              style={{ background: "var(--color-brand)" }}
            >
              Check Your DMARC Now
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
