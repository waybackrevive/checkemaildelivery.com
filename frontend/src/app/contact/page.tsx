import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const CONTACT_EMAIL = "connect@checkemaildelivery.com";

type ContactOption = {
  title: string;
  description: string;
  subject: string;
  icon: string;
};

const contactOptions: ContactOption[] = [
  {
    title: "General Feedback",
    description: "Share your thoughts, suggestions, or feature requests",
    subject: "Feedback",
    icon: "💬",
  },
  {
    title: "Report Issue",
    description: "Found a bug or technical problem? Let us know",
    subject: "Bug Report",
    icon: "⚠️",
  },
  {
    title: "Business Inquiry",
    description: "Partnership, custom reports, or enterprise plans",
    subject: "Business Inquiry",
    icon: "📊",
  },
  {
    title: "General Question",
    description: "Any other questions or concerns",
    subject: "General Inquiry",
    icon: "✉️",
  },
];

export default function ContactPage() {

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <SiteHeader />

      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[900px] mx-auto">
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
            Contact Us
          </h1>
          <p className="text-muted text-[17px] mb-12" style={{ lineHeight: 1.7 }}>
            Have feedback, questions, or business inquiries? Choose the option that best matches your need and we&apos;ll get back to you promptly.
          </p>

          {/* Contact Options Grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {contactOptions.map((option) => (
              <a
                key={option.subject}
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(option.subject)}`}
                className="group block rounded-xl border p-6 transition-all hover:border-brand hover:shadow-lg"
                style={{
                  background: "white",
                  borderColor: "rgba(14, 166, 110, 0.2)",
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl" role="img" aria-label={option.title}>
                    {option.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-navy text-[17px] mb-1 group-hover:text-brand transition">
                      {option.title}
                    </h3>
                    <p className="text-muted text-[14px]" style={{ lineHeight: 1.6 }}>
                      {option.description}
                    </p>
                    <div className="mt-3 text-brand text-[13px] font-medium flex items-center gap-1">
                      Send Email
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Direct Email Section */}
          <div
            className="rounded-xl border p-8 text-center"
            style={{
              background: "white",
              borderColor: "rgba(14, 166, 110, 0.15)",
            }}
          >
            <h3 className="font-semibold text-navy text-[18px] mb-2">
              Prefer to Email Directly?
            </h3>
            <p className="text-muted text-[15px] mb-4">
              Send us a message at any time
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-brand text-[17px] font-semibold hover:text-brand/80 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* FAQ Section */}
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
                  How quickly will I get a response?
                </h3>
                <p className="text-muted">
                  We typically respond within 24-48 hours on business days. For urgent technical issues, please mention &quot;URGENT&quot; in your subject line.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1">
                  I hit the daily test limit. Can I get more?
                </h3>
                <p className="text-muted">
                  We&apos;re in early beta and currently limit each user to 5 tests per day. If you need more tests for a specific reason, email us with your use case and we&apos;ll see how we can help.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1">
                  Can I get a detailed report for my business?
                </h3>
                <p className="text-muted">
                  Yes! We offer custom detailed reports and can help with ongoing deliverability monitoring. Email us using the &quot;Business Inquiry&quot; option above to discuss your needs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-1">
                  How do I report a bug?
                </h3>
                <p className="text-muted">
                  Use the &quot;Report Issue&quot; option above. Please include as many details as possible: what you were doing, what happened, and what you expected. Screenshots are extremely helpful!
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
