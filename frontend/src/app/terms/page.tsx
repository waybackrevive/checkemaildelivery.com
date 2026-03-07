import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Terms of Service — CheckEmailDelivery.com",
  description:
    "Terms of Service for CheckEmailDelivery.com — a free email deliverability testing tool.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <SiteHeader />

      <section className="py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <span
            className="inline-block font-mono text-[11px] font-semibold text-brand uppercase mb-4"
            style={{ letterSpacing: "2px" }}
          >
            Legal
          </span>
          <h1
            className="font-display text-navy mb-3"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400,
              letterSpacing: "-0.8px",
            }}
          >
            Terms of Service
          </h1>
          <p className="text-muted text-sm mb-10">
            Last updated: March 3, 2026
          </p>

          <div className="space-y-10 text-[15px] text-muted" style={{ lineHeight: 1.8 }}>
            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                1. Service Description
              </h2>
              <p>
                CheckEmailDelivery.com (&quot;the Service&quot;) is a free email
                deliverability diagnostic tool. It allows you to send a test
                email and receive a report analyzing your email&apos;s
                authentication, reputation, content, and spam score.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                2. Acceptable Use
              </h2>
              <p>By using this Service, you agree to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1.5">
                <li>Use it only for legitimate email deliverability testing.</li>
                <li>Not send malicious, harmful, or illegal content through the test system.</li>
                <li>Not attempt to circumvent the rate limit (5 tests per IP per day).</li>
                <li>Not use automated scripts or bots to create excessive test sessions.</li>
                <li>Not use the service to test emails you don&apos;t own or have permission to send.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                3. Free Service &amp; Availability
              </h2>
              <p>
                This tool is provided <strong className="text-navy">free of charge</strong> and{" "}
                <strong className="text-navy">&quot;as is&quot;</strong>. We do
                our best to keep it running and accurate, but we cannot
                guarantee 100% uptime or that every analysis result is perfect.
              </p>
              <p className="mt-3">
                We are currently in <strong className="text-navy">early beta</strong>.
                We may modify, suspend, or discontinue features as we grow and
                improve the service.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                4. Rate Limiting
              </h2>
              <p>
                To keep the service fair and sustainable for everyone, each IP
                address is limited to <strong className="text-navy">5 tests per 24-hour period</strong>.
                This limit may increase as we expand our infrastructure. Attempts
                to bypass this limit may result in temporary access restrictions.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                5. Data &amp; Privacy
              </h2>
              <p>
                All test data is automatically deleted within 1 hour. We do not
                store personal information, require accounts, or use tracking
                cookies. For full details, see our{" "}
                <a href="/privacy" className="text-brand underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                6. Disclaimer
              </h2>
              <p>
                The deliverability report is for informational purposes only. We
                do not guarantee that following our recommendations will result
                in inbox placement. Email delivery depends on many factors
                beyond our control, including recipient mail server policies.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                7. Limitation of Liability
              </h2>
              <p>
                CheckEmailDelivery.com is not liable for any direct, indirect,
                or consequential damages arising from the use of this service.
                You use this tool at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                8. Changes to Terms
              </h2>
              <p>
                We may update these terms as the service evolves. Continued use
                of the service after changes are posted constitutes acceptance
                of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                9. Contact
              </h2>
              <p>
                Questions about these terms? Contact us at{" "}
                <a
                  href="mailto:connect@checkemaildelivery.com"
                  className="text-brand underline"
                >
                  connect@checkemaildelivery.com
                </a>{" "}
                or visit our{" "}
                 <a href="/contact-us" className="text-brand underline">
                  Contact page
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
