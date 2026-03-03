import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Blacklist Removal Guide — CheckEmailDelivery.com",
  description:
    "How to check if your IP or domain is blacklisted and step-by-step instructions to get delisted for better email deliverability.",
};

export default function BlacklistRemovalPage() {
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
            Blacklist Removal Guide
          </h1>
          <p
            className="text-muted text-[17px] mb-12"
            style={{ lineHeight: 1.7 }}
          >
            If your IP address or domain has been blacklisted, your emails are
            likely being blocked or sent to spam. Here&apos;s how to identify
            the problem and get delisted.
          </p>

          <div
            className="space-y-10 text-[15px] text-muted"
            style={{ lineHeight: 1.8 }}
          >
            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                What is an Email Blacklist?
              </h2>
              <p>
                Email blacklists (also called blocklists or DNSBLs) are
                databases of IP addresses and domains known to send spam. Major
                inbox providers check these lists when deciding whether to
                deliver your email. If you&apos;re on one, your emails may be
                silently dropped or sent to spam.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                How to Check if You&apos;re Blacklisted
              </h2>
              <p className="mb-3">
                The fastest way is to run a test on{" "}
                <Link href="/" className="text-brand underline">
                  CheckEmailDelivery.com
                </Link>
                . Your report will show IP and domain blacklist status
                automatically. You can also check directly:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-navy">Spamhaus</strong> — The most
                  influential blacklist. Check at{" "}
                  <span className="text-navy">check.spamhaus.org</span>
                </li>
                <li>
                  <strong className="text-navy">Barracuda</strong> — Common
                  enterprise filter. Check at{" "}
                  <span className="text-navy">barracudacentral.org/lookups</span>
                </li>
                <li>
                  <strong className="text-navy">SORBS</strong> — Checks for
                  open relays and spam sources
                </li>
                <li>
                  <strong className="text-navy">SpamCop</strong> — Based on user
                  spam complaints
                </li>
                <li>
                  <strong className="text-navy">MXToolbox</strong> — Checks
                  against 100+ blacklists at once
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Why You Got Blacklisted
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-navy">Spam complaints:</strong>{" "}
                  Recipients marked your email as spam.
                </li>
                <li>
                  <strong className="text-navy">Spam traps:</strong> You
                  emailed an address that exists solely to catch spammers
                  (often from purchased lists).
                </li>
                <li>
                  <strong className="text-navy">Compromised account:</strong>{" "}
                  Someone hacked your email or server and sent spam.
                </li>
                <li>
                  <strong className="text-navy">Shared IP:</strong> If you
                  use shared hosting, another user on the same IP may have
                  caused the listing.
                </li>
                <li>
                  <strong className="text-navy">High bounce rate:</strong>{" "}
                  Sending to many invalid addresses signals poor list hygiene.
                </li>
                <li>
                  <strong className="text-navy">Missing authentication:</strong>{" "}
                  No SPF/DKIM/DMARC makes you look like a spammer.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Step-by-Step Removal Process
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-navy mb-1">
                    1. Fix the Root Cause
                  </h3>
                  <p>
                    Before requesting removal, fix what caused the listing.
                    Clean your email list, secure your server, set up SPF/DKIM/DMARC,
                    and stop sending to purchased lists.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-navy mb-1">
                    2. Find Which Blacklists You&apos;re On
                  </h3>
                  <p>
                    Run a test on CheckEmailDelivery.com or use MXToolbox to
                    identify exactly which lists have you flagged. Each list
                    has its own removal process.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-navy mb-1">
                    3. Request Delisting
                  </h3>
                  <p>Most major blacklists have a self-service removal form:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1.5">
                    <li>
                      <strong className="text-navy">Spamhaus:</strong> Submit a
                      removal request at their website. They require evidence
                      that the issue is resolved.
                    </li>
                    <li>
                      <strong className="text-navy">Barracuda:</strong>{" "}
                      Self-service removal form — usually processed within
                      12-24 hours.
                    </li>
                    <li>
                      <strong className="text-navy">SORBS:</strong> Some
                      listings auto-expire; others require a removal request.
                    </li>
                    <li>
                      <strong className="text-navy">SpamCop:</strong>{" "}
                      Listings auto-expire within 24-48 hours if complaints
                      stop.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-navy mb-1">
                    4. Wait &amp; Monitor
                  </h3>
                  <p>
                    Removal can take 24-72 hours depending on the list. Run
                    another test on CheckEmailDelivery.com after a day to
                    confirm you&apos;re clean.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-navy mb-3">
                Preventing Future Blacklisting
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-navy">Never buy email lists.</strong>{" "}
                  Only send to people who opted in.
                </li>
                <li>
                  <strong className="text-navy">Clean your list regularly.</strong>{" "}
                  Remove bounced addresses and inactive subscribers.
                </li>
                <li>
                  <strong className="text-navy">Set up authentication.</strong>{" "}
                  SPF, DKIM, and DMARC are non-negotiable.
                </li>
                <li>
                  <strong className="text-navy">Make unsubscribing easy.</strong>{" "}
                  A visible one-click unsubscribe prevents spam complaints.
                </li>
                <li>
                  <strong className="text-navy">Monitor regularly.</strong>{" "}
                  Run periodic tests to catch issues early before they affect
                  deliverability.
                </li>
                <li>
                  <strong className="text-navy">Use a dedicated IP</strong>{" "}
                  if you send high volume — shared IPs mean shared reputation.
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-white text-[15px] font-semibold transition-all hover:brightness-110"
              style={{ background: "var(--color-brand)" }}
            >
              Check Your Blacklist Status
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
