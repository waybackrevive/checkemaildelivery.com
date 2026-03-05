import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact & Feedback — CheckEmailDelivery.com",
  description:
    "Get in touch with the CheckEmailDelivery.com team. Share feedback, report issues, or request features.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <SiteHeader />

      <section className="py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <span
            className="inline-block font-mono text-[11px] font-semibold text-brand uppercase mb-4"
            style={{ letterSpacing: "2px" }}
          >
            Get in Touch
          </span>
          <h1
            className="font-display text-navy mb-4"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400,
              letterSpacing: "-0.8px",
            }}
          >
            Contact &amp; Feedback
          </h1>
          <p className="text-muted text-[17px] mb-12" style={{ lineHeight: 1.7 }}>
            We&apos;re a small team building this tool for the community. Your
            feedback helps us decide what to build next and keeps us motivated.
          </p>

          {/* Feedback card */}
          <div
            className="rounded-2xl border p-8 mb-10"
            style={{
              background: "white",
              borderColor: "rgba(14, 166, 110, 0.15)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(14, 166, 110, 0.08)" }}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="text-brand"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  Get in Touch
                </h3>
                <p className="text-muted text-[15px] mb-4" style={{ lineHeight: 1.7 }}>
                  Found a bug? Have a feature idea? Want partnerships or just
                  want to say hello? We read every message.
                </p>
                <a
                  href="mailto:connect@checkemaildelivery.com?subject=Feedback%20for%20CheckEmailDelivery"
                  className="inline-flex items-center gap-2 text-brand font-semibold text-[15px] hover:underline"
                >
                  connect@checkemaildelivery.com
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
                </a>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2
              className="font-display text-navy mb-6"
              style={{ fontSize: "24px", fontWeight: 400 }}
            >
              Common Questions
            </h2>
            <div className="space-y-6 text-[15px]" style={{ lineHeight: 1.7 }}>
              <div>
                <h3 className="font-semibold text-navy mb-1">
                  I hit the daily test limit. Can I get more?
                </h3>
                <p className="text-muted">
                  We&apos;re in early beta and currently limit each user to 5
                  tests per day to keep the service running smoothly for
                  everyone. This limit will increase as we grow. If you need
                  more tests for a specific reason, email us and we&apos;ll see
                  how we can help.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1">
                  Is the report accurate?
                </h3>
                <p className="text-muted">
                  We use industry-standard spam scoring engines and real DNS
                  lookups to generate your report. While no tool can guarantee
                  inbox placement, our checks cover the same criteria most
                  inbox providers use to filter email.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1">
                  Will this tool always be free?
                </h3>
                <p className="text-muted">
                  Yes. The core deliverability test will always be free. We
                  believe email diagnostics should be accessible to everyone —
                  solo founders, small businesses, and developers alike.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1">
                  How do I report a bug?
                </h3>
                <p className="text-muted">
                  Send an email to{" "}
                  <a
                    href="mailto:connect@checkemaildelivery.com?subject=Bug%20Report"
                    className="text-brand underline"
                  >
                    connect@checkemaildelivery.com
                  </a>{" "}
                  with a description of what happened. Screenshots help a lot!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
