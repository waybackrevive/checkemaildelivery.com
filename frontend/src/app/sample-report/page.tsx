import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample Report — CheckEmailDelivery.com",
  description:
    "See what a CheckEmailDelivery.com report looks like before running your own test.",
};

/* ─── static badge helpers ─── */
function Badge({
  status,
  label,
}: {
  status: "pass" | "fail" | "warning";
  label: string;
}) {
  const m = {
    pass: "bg-brand-light border-brand/20 text-brand",
    fail: "bg-danger-light border-danger/20 text-danger",
    warning: "bg-warn-light border-warn/25 text-warn",
  };
  return (
    <span
      className={`font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${m[status]}`}
    >
      {label}
    </span>
  );
}

function Row({
  icon,
  label,
  status,
  statusLabel,
}: {
  icon: string;
  label: string;
  status: "pass" | "fail" | "warning";
  statusLabel: string;
}) {
  return (
    <div
      className={`rounded-[10px] border px-4 py-3 flex items-center justify-between ${
        status === "fail"
          ? "border-danger/20 bg-danger-light/50"
          : status === "warning"
            ? "border-warn/20 bg-warn-light/50"
            : "border-border bg-bg"
      }`}
    >
      <span className="flex items-center gap-2.5 text-[13px] font-medium text-navy">
        <span className="text-base shrink-0">{icon}</span>
        {label}
      </span>
      <Badge status={status} label={statusLabel} />
    </div>
  );
}

export default function SampleReportPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <SiteHeader />

      <section className="py-20 px-6">
        <div className="max-w-[820px] mx-auto">
          <span
            className="inline-block font-mono text-[11px] font-semibold text-brand uppercase mb-4"
            style={{ letterSpacing: "2px" }}
          >
            Example
          </span>
          <h1
            className="font-display text-navy mb-3"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400,
              letterSpacing: "-0.8px",
            }}
          >
            Sample Deliverability Report
          </h1>
          <p
            className="text-muted text-[17px] mb-12"
            style={{ lineHeight: 1.7 }}
          >
            This is what your report will look like after you send a test email.
            Every check is explained in plain English so you know exactly what to
            fix.
          </p>

          {/* Score card */}
          <div
            className="bg-white border border-border rounded-[14px] p-6 mb-6"
            style={{ boxShadow: "0 2px 12px rgba(12,26,46,0.04)" }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-muted text-[11px] font-mono uppercase mb-1">
                  Overall Score
                </p>
                <p
                  className="text-navy font-display"
                  style={{ fontSize: "48px", lineHeight: 1, fontWeight: 400 }}
                >
                  72<span className="text-muted text-2xl">/100</span>
                </p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                  style={{ background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.4)", color: "var(--color-warn)" }}>
                  ⚠️ Medium Risk
                </div>
              </div>
              <div className="flex gap-5 text-center text-[13px]">
                <div>
                  <p className="text-danger font-bold text-xl">1</p>
                  <p className="text-muted">Critical</p>
                </div>
                <div>
                  <p className="text-warn font-bold text-xl">2</p>
                  <p className="text-muted">Warnings</p>
                </div>
                <div>
                  <p className="text-brand font-bold text-xl">9</p>
                  <p className="text-muted">Passed</p>
                </div>
              </div>
            </div>
            {/* Score bar */}
            <div className="w-full h-2 rounded-full mt-5" style={{ background: "rgba(12,26,46,0.06)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: "72%",
                  background: "linear-gradient(90deg, #f59e0b, #eab308)",
                  transition: "width 1s ease",
                }}
              />
            </div>
          </div>

          {/* Authentication Section */}
          <div
            className="bg-white border border-border rounded-[14px] overflow-hidden mb-6"
            style={{ boxShadow: "0 2px 12px rgba(12,26,46,0.04)" }}
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border/60">
              <span className="text-xl">🔐</span>
              <span className="text-[15px] font-semibold text-navy">
                Authentication
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-danger-light text-danger">
                1 Issue
              </span>
            </div>
            <div className="px-6 pb-5 pt-3 flex flex-col gap-2">
              <Row icon="📧" label="SPF (Sender Policy Framework)" status="pass" statusLabel="✓ PASS" />
              <Row icon="🔏" label="DKIM (DomainKeys Identified Mail)" status="fail" statusLabel="✕ FAIL" />
              <Row icon="🛡️" label="DMARC (Domain-based Message Authentication)" status="pass" statusLabel="✓ PASS" />
              <Row icon="↩️" label="Reverse DNS (PTR Record)" status="pass" statusLabel="✓ PASS" />
            </div>
          </div>

          {/* Reputation Section */}
          <div
            className="bg-white border border-border rounded-[14px] overflow-hidden mb-6"
            style={{ boxShadow: "0 2px 12px rgba(12,26,46,0.04)" }}
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border/60">
              <span className="text-xl">📊</span>
              <span className="text-[15px] font-semibold text-navy">
                Reputation
              </span>
            </div>
            <div className="px-6 pb-5 pt-3 flex flex-col gap-2">
              <Row icon="🌐" label="IP Blacklist Check" status="pass" statusLabel="✓ Clean" />
              <Row icon="🏷️" label="Domain Blacklist Check" status="pass" statusLabel="✓ Clean" />
              <Row icon="📅" label="Domain Age" status="warning" statusLabel="⚠ 34 days" />
            </div>
          </div>

          {/* Content Section */}
          <div
            className="bg-white border border-border rounded-[14px] overflow-hidden mb-6"
            style={{ boxShadow: "0 2px 12px rgba(12,26,46,0.04)" }}
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border/60">
              <span className="text-xl">📝</span>
              <span className="text-[15px] font-semibold text-navy">
                Content Analysis
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-warn-light text-warn">
                1 Issue
              </span>
            </div>
            <div className="px-6 pb-5 pt-3 flex flex-col gap-2">
              <Row icon="📋" label="Subject Line" status="pass" statusLabel="✓ Good" />
              <Row icon="🔍" label="Spam Word Scan" status="warning" statusLabel='⚠ 2 found' />
              <Row icon="🖼️" label="Image-to-Text Ratio" status="pass" statusLabel="✓ Balanced" />
              <Row icon="🔗" label="Link Validation" status="pass" statusLabel="✓ All valid" />
              <Row icon="🔒" label="URL Shorteners" status="pass" statusLabel="✓ None found" />
              <Row icon="🛡️" label="SpamAssassin Score" status="pass" statusLabel="✓ 2.1 / 5.0" />
            </div>
          </div>

          {/* Action Plan Section */}
          <div
            className="bg-white border border-border rounded-[14px] overflow-hidden mb-12"
            style={{ boxShadow: "0 2px 12px rgba(12,26,46,0.04)" }}
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border/60">
              <span className="text-xl">🎯</span>
              <span className="text-[15px] font-semibold text-navy">
                Action Plan
              </span>
            </div>
            <div className="px-6 pb-5 pt-3 flex flex-col gap-3">
              <div className="rounded-[10px] border border-danger/20 bg-danger-light/50 px-4 py-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge status="fail" label="CRITICAL" />
                  <span className="text-[13px] font-semibold text-navy">
                    Set up DKIM signing for your domain
                  </span>
                </div>
                <p className="text-[12.5px] text-muted" style={{ lineHeight: 1.6 }}>
                  DKIM is missing. Add a DKIM TXT record to your DNS so receiving servers can verify your emails are authentic. Check our{" "}
                  <Link href="/learn/fix-dkim" className="text-brand underline">
                    DKIM setup guide
                  </Link>{" "}
                  for step-by-step instructions.
                </p>
              </div>
              <div className="rounded-[10px] border border-warn/20 bg-warn-light/50 px-4 py-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge status="warning" label="WARNING" />
                  <span className="text-[13px] font-semibold text-navy">
                    Remove spam trigger words
                  </span>
                </div>
                <p className="text-[12.5px] text-muted" style={{ lineHeight: 1.6 }}>
                  We found 2 words commonly flagged by spam filters: &quot;FREE&quot; and &quot;ACT NOW&quot;. Consider rephrasing them.
                </p>
              </div>
              <div className="rounded-[10px] border border-warn/20 bg-warn-light/50 px-4 py-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge status="warning" label="WARNING" />
                  <span className="text-[13px] font-semibold text-navy">
                    Domain is relatively new
                  </span>
                </div>
                <p className="text-[12.5px] text-muted" style={{ lineHeight: 1.6 }}>
                  Your domain is only 34 days old. New domains often have lower reputation. Continue sending quality emails consistently to build trust.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-white text-[15px] font-semibold transition-all hover:brightness-110"
              style={{ background: "var(--color-brand)" }}
            >
              Run Your Own Free Test
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
            <p className="text-muted text-sm mt-3">
              No signup required — results in 60 seconds
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
