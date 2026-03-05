import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy — CheckEmailDelivery.com",
  description:
    "How CheckEmailDelivery.com handles your data. We never read your email content and delete all test data within 1 hour.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-muted text-sm mb-10">
            Last updated: March 3, 2026
          </p>

          <div className="space-y-10 text-[15px] text-muted" style={{ lineHeight: 1.8 }}>
            {/* 1 */}
            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                1. What We Collect
              </h2>
              <p>
                When you use CheckEmailDelivery.com, we process the following
                data solely to generate your deliverability report:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1.5">
                <li>
                  <strong className="text-navy">Email headers</strong> — sender
                  domain, IP address, SPF/DKIM/DMARC authentication results.
                </li>
                <li>
                  <strong className="text-navy">Email metadata</strong> —
                  subject line, number of links, image count, content structure.
                </li>
                <li>
                  <strong className="text-navy">IP address</strong> — your
                  visitor IP, used only for rate limiting (5 tests/day).
                </li>
              </ul>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                2. What We Do NOT Collect
              </h2>
              <ul className="list-disc pl-6 space-y-1.5">
                <li>We <strong className="text-navy">never read</strong> the body/content of your email.</li>
                <li>We do <strong className="text-navy">not</strong> store email addresses.</li>
                <li>We do <strong className="text-navy">not</strong> require signup, login, or personal information.</li>
                <li>We do <strong className="text-navy">not</strong> use cookies for tracking or advertising.</li>
                <li>We do <strong className="text-navy">not</strong> sell, share, or monetize any data.</li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                3. Data Retention
              </h2>
              <p>
                All test session data — including email headers, analysis
                results, and reports — is{" "}
                <strong className="text-navy">
                  automatically deleted within 1 hour
                </strong>{" "}
                of creation. We use automatic expiration on all stored data.
                There are no backups or archives of your test data.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                4. Rate Limiting
              </h2>
              <p>
                We store a counter tied to your IP address to enforce a limit of
                5 tests per 24-hour period. This counter is stored temporarily
                and automatically expires after 24 hours. We do not log or
                retain IP addresses beyond this window.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                5. Third-Party Services
              </h2>
              <p>
                To deliver the service, we use trusted third-party
                infrastructure providers for email processing, temporary data
                storage, and website hosting. These providers are bound by
                their own privacy policies and process data only as necessary
                to operate our service. We do not share your data with any
                third party for marketing, analytics, or advertising purposes.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                6. Your Rights
              </h2>
              <p>
                Since we don&apos;t collect personal data or require accounts,
                there is no personal data to request, modify, or delete. Your
                test data is automatically purged within 1 hour.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                7. Changes to This Policy
              </h2>
              <p>
                We may update this policy as our service evolves. Any changes
                will be reflected on this page with an updated date. We
                encourage you to review this page periodically.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                8. Contact
              </h2>
              <p>
                Questions about this policy? Reach out at{" "}
                <a
                  href="mailto:connect@checkemaildelivery.com"
                  className="text-brand underline"
                >
                  connect@checkemaildelivery.com
                </a>{" "}
                or visit our{" "}
                <a href="/contact" className="text-brand underline">
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
