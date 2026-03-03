import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "How to Fix DKIM — CheckEmailDelivery.com",
  description:
    "Step-by-step guide to setting up DKIM (DomainKeys Identified Mail) for your domain to improve email deliverability.",
};

export default function FixDkimPage() {
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
            How to Fix DKIM
          </h1>
          <p
            className="text-muted text-[17px] mb-12"
            style={{ lineHeight: 1.7 }}
          >
            DKIM (DomainKeys Identified Mail) lets receiving mail servers verify
            that an email was actually sent by the owner of the domain and
            hasn&apos;t been tampered with in transit. If your DKIM check failed,
            here&apos;s how to fix it.
          </p>

          <div
            className="space-y-10 text-[15px] text-muted"
            style={{ lineHeight: 1.8 }}
          >
            {/* What is DKIM */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                What is DKIM?
              </h2>
              <p>
                DKIM adds a digital signature to the headers of your outgoing
                emails. The receiving server looks up a public key in your DNS
                records and uses it to verify the signature. If it matches,
                the email passes DKIM — proving it came from you and
                wasn&apos;t altered.
              </p>
            </section>

            {/* Why it matters */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Why DKIM Matters
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gmail, Outlook, and Yahoo require DKIM for bulk senders.</li>
                <li>Failing DKIM significantly increases your spam score.</li>
                <li>DKIM is required for DMARC to work with &quot;alignment&quot;.</li>
                <li>Without DKIM, anyone can forge emails from your domain.</li>
              </ul>
            </section>

            {/* Step-by-step */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Step-by-Step Fix
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-navy mb-1">
                    1. Generate a DKIM Key Pair
                  </h3>
                  <p>
                    Most email providers (Google Workspace, Microsoft 365,
                    Resend, SendGrid, Mailgun, etc.) will generate a DKIM key
                    pair for you. Go to your email provider&apos;s admin panel
                    and look for &quot;Authentication&quot; or &quot;DKIM
                    Settings&quot;.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-navy mb-1">
                    2. Add the DNS Record
                  </h3>
                  <p className="mb-3">
                    Your provider will give you a{" "}
                    <strong className="text-navy">TXT</strong> or{" "}
                    <strong className="text-navy">CNAME</strong> record to add
                    to your domain&apos;s DNS. It typically looks like:
                  </p>
                  <div className="font-mono text-[12px] bg-navy text-brand rounded-lg px-4 py-3 overflow-x-auto">
                    <p className="text-muted-light mb-1"># Example TXT record</p>
                    <p>
                      <span className="text-white">Host:</span>{" "}
                      selector1._domainkey.yourdomain.com
                    </p>
                    <p>
                      <span className="text-white">Type:</span> TXT
                    </p>
                    <p>
                      <span className="text-white">Value:</span>{" "}
                      v=DKIM1; k=rsa; p=MIGfMA0GCS...
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-navy mb-1">
                    3. Wait for DNS Propagation
                  </h3>
                  <p>
                    DNS changes can take 15 minutes to 48 hours to propagate
                    globally. Most providers update within 1-2 hours.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-navy mb-1">
                    4. Verify with CheckEmailDelivery.com
                  </h3>
                  <p>
                    Once your DNS is propagated, run a new test on{" "}
                    <Link href="/" className="text-brand underline">
                      CheckEmailDelivery.com
                    </Link>{" "}
                    to confirm your DKIM check passes.
                  </p>
                </div>
              </div>
            </section>

            {/* Common providers */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Provider-Specific Guides
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-navy">Google Workspace:</strong>{" "}
                  Admin → Apps → Gmail → Authenticate email → Generate new
                  record.
                </li>
                <li>
                  <strong className="text-navy">Microsoft 365:</strong>{" "}
                  Defender → Email &amp; Collaboration → Policies →
                  Threat Policies → DKIM.
                </li>
                <li>
                  <strong className="text-navy">Resend / SendGrid / Mailgun:</strong>{" "}
                  Dashboard → Domains → DNS records. They usually provide
                  CNAME records to add.
                </li>
              </ul>
            </section>

            {/* Troubleshooting */}
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Troubleshooting
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-navy">Still failing after adding DNS?</strong>{" "}
                  Double-check the selector name matches exactly what your
                  provider gave you.
                </li>
                <li>
                  <strong className="text-navy">Multiple DKIM records?</strong>{" "}
                  You can have more than one DKIM record (with different
                  selectors). This is fine and common.
                </li>
                <li>
                  <strong className="text-navy">Using a forwarding service?</strong>{" "}
                  Email forwarding can break DKIM signatures. Consider setting
                  up an alias or routing rule instead.
                </li>
              </ul>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-white text-[15px] font-semibold transition-all hover:brightness-110"
              style={{ background: "var(--color-brand)" }}
            >
              Test Your DKIM Now
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
