import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — CheckEmailDelivery.com",
  description:
    "Why we built CheckEmailDelivery.com — a free, open tool to help everyone fix email deliverability. Our mission, values, and the community behind it.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <SiteHeader />

      {/* Hero */}
      <section className="pt-20 pb-16 px-6 text-center">
        <span
          className="inline-block font-mono text-[11px] font-semibold text-brand uppercase mb-4"
          style={{ letterSpacing: "2px" }}
        >
          About us
        </span>
        <h1
          className="font-display text-navy mb-5"
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-1px",
          }}
        >
          We believe every email <br />
          <em className="italic text-brand">deserves</em> to reach the inbox
        </h1>
        <p
          className="text-muted max-w-[600px] mx-auto"
          style={{ fontSize: "17px", lineHeight: 1.7 }}
        >
          CheckEmailDelivery.com is a free, community-first tool that helps
          freelancers, startups, marketers, and developers diagnose why their
          emails land in spam — and shows them exactly how to fix it, in plain
          English.
        </p>
      </section>

      {/* Why We Built This */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="font-display text-navy mb-6"
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 400,
              letterSpacing: "-0.5px",
            }}
          >
            Why we built this —{" "}
            <em className="italic text-brand">and why it&apos;s free</em>
          </h2>

          <div className="space-y-6 text-[15px] text-muted" style={{ lineHeight: 1.8 }}>
            <p>
              Millions of emails silently die in spam folders every day. The
              sender never knows. They just wonder why nobody replies.
            </p>
            <p>
              Existing deliverability tools either cost $30–$100/month, require
              complex setup, or give you raw data like{" "}
              <code className="bg-border-soft px-1.5 py-0.5 rounded text-navy text-[13px]">
                SPF: PASS
              </code>{" "}
              without explaining what it means or what to do about it.
            </p>
            <p>
              <strong className="text-navy">
                We built CheckEmailDelivery.com to change that.
              </strong>{" "}
              One test. One report. Plain English. Every issue comes with a
              clear explanation of <em>why</em> it matters, <em>how</em> to
              fix it, and the <em>impact</em> on your delivery rate.
            </p>
            <p>
              This tool is — and always will be —{" "}
              <strong className="text-navy">free for everyone</strong>. No
              subscription. No credit card. No signup wall. We believe email
              deliverability should be accessible to every person who sends
              an email, not just companies with big budgets.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-6" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-[800px] mx-auto">
          <span
            className="inline-block font-mono text-[11px] font-semibold text-brand uppercase mb-3"
            style={{ letterSpacing: "2px" }}
          >
            Our values
          </span>
          <h2
            className="font-display text-navy mb-10"
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 400,
              letterSpacing: "-0.5px",
            }}
          >
            What we stand for
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: "🌍",
                title: "Free Forever",
                desc: "We don't believe in paywalling email health checks. This tool is free — today, tomorrow, always. We sustain it through community support and future premium features for teams.",
              },
              {
                icon: "🔒",
                title: "Privacy First",
                desc: "We never read your email content. All test data is automatically deleted within 1 hour. We don't track you, and we never sell data.",
              },
              {
                icon: "💡",
                title: "Plain English, Not Jargon",
                desc: "Technical reports are useless if you can't understand them. Every issue in our reports includes a human-readable explanation and a step-by-step fix.",
              },
              {
                icon: "🤝",
                title: "Community First",
                desc: "We're building this in public, for the community. Your feedback shapes every feature. We're in this together — your support makes it sustainable.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-border rounded-xl p-7"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-base font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p
                  className="text-[13px] text-muted"
                  style={{ lineHeight: 1.7 }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Stage Note */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <div
            className="rounded-2xl p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(14,166,110,0.06), rgba(14,166,110,0.02))",
              border: "1.5px solid rgba(14,166,110,0.2)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🚀</span>
              <span
                className="font-mono text-[11px] font-semibold text-brand uppercase"
                style={{ letterSpacing: "1.5px" }}
              >
                Early Stage — Beta
              </span>
            </div>
            <p
              className="text-[15px] text-navy mb-4"
              style={{ lineHeight: 1.7 }}
            >
              <strong>We&apos;re in early stages</strong>, and we&apos;re transparent
              about it. Right now, we run on limited infrastructure which means
              we cap usage at{" "}
              <strong>5 free tests per person per day</strong>.
            </p>
            <p
              className="text-[15px] text-muted mb-5"
              style={{ lineHeight: 1.7 }}
            >
              As we grow — with your support and feedback — we&apos;ll expand
              capacity and add more features. Every piece of feedback you share
              helps us build the tool you actually need.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg no-underline hover:opacity-90 transition-all"
            >
              💬 Share Your Feedback
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-[600px] mx-auto text-center">
          <h2
            className="font-display text-navy mb-4"
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 400,
              letterSpacing: "-0.5px",
            }}
          >
            Ready to check your email?
          </h2>
          <p className="text-muted text-[15px] mb-7" style={{ lineHeight: 1.7 }}>
            Run your free deliverability test now — takes less than 60 seconds.
          </p>
          <Link
            href="/"
            className="inline-flex bg-navy text-white text-[15px] font-semibold px-8 py-3.5 rounded-xl no-underline hover:bg-navy-soft transition-all"
          >
            Run Free Test →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
