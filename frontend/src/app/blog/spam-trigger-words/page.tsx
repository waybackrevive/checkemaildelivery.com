import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Spam Trigger Words: 200+ Words to Avoid in Email (2026)",
  description:
    "Complete list of spam trigger words that hurt email deliverability. Categorized by type with safer alternatives for each. Used by Gmail, Outlook, SpamAssassin.",
  keywords: [
    "spam trigger words",
    "spam words to avoid",
    "email spam words",
    "words that trigger spam filters",
    "spam filter words",
    "email deliverability",
    "SpamAssassin trigger words",
  ],
  alternates: { canonical: "/blog/spam-trigger-words" },
  openGraph: {
    title: "200+ Spam Trigger Words to Avoid in Your Emails",
    description:
      "Complete list of words and phrases that trigger spam filters, with safer alternatives.",
    url: "https://checkemaildelivery.com/blog/spam-trigger-words",
    type: "article",
  },
};

function WordCategory({
  title,
  icon,
  severity,
  words,
}: {
  title: string;
  icon: string;
  severity: "high" | "medium" | "low";
  words: string[];
}) {
  const severityStyles = {
    high: "border-l-danger",
    medium: "border-l-warn",
    low: "border-l-[#60a5fa]",
  };

  return (
    <div className={`bg-white shadow-sm border border-border ${severityStyles[severity]} border-l-[3px] rounded-xl p-6 my-6`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-display text-navy text-xl">{title}</h3>
        <span
          className={`ml-auto font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
            severity === "high"
              ? "bg-danger/15 text-danger"
              : severity === "medium"
              ? "bg-warn/15 text-warn"
              : "bg-[#60a5fa]/15 text-[#60a5fa]"
          }`}
          style={{ letterSpacing: "0.1em" }}
        >
          {severity} risk
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {words.map((word) => (
          <span
            key={word}
            className="bg-navy/5 border border-border text-muted text-sm px-3 py-1.5 rounded-lg font-mono"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SpamTriggerWordsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <SiteHeader />

      <div className="max-w-[1100px] mx-auto px-6 py-12 grid lg:grid-cols-[1fr_280px] gap-14 items-start">
        <article>
          <nav className="flex items-center gap-2 font-mono text-xs text-muted mb-6">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-navy/70">Spam Trigger Words</span>
          </nav>

          <span className="inline-block bg-danger/10 border border-danger/25 text-danger font-mono text-[11px] font-medium uppercase px-3 py-1 rounded-full mb-4" style={{ letterSpacing: "0.1em" }}>
            📝 Content
          </span>

          <h1 className="font-display text-navy mb-5" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, lineHeight: 1.25 }}>
            <em className="italic text-danger">Spam Trigger Words</em>:<br />
            200+ Words to Avoid in Email
          </h1>

          <div className="flex items-center gap-5 flex-wrap mb-8 pb-6 border-b border-border">
            <span className="font-mono text-muted text-[11.5px]">📅 Updated March 2026</span>
            <span className="font-mono text-muted text-[11.5px]">⏱ 5 min read</span>
            <span className="font-mono text-muted text-[11.5px]">📋 Reference List</span>
          </div>

          <div className="article-content text-muted" style={{ lineHeight: 1.8 }}>
            <p className="mb-5">
              Email spam filters use word analysis as one signal to determine if your email is spam.
              While modern filters (Gmail, Outlook, SpamAssassin) consider many factors, certain
              words and phrases still trigger higher spam scores.
            </p>

            <div className="bg-warn/[0.07] border border-warn/20 rounded-xl p-5 my-7">
              <span className="text-xl mr-2">💡</span>
              <span className="text-muted">
                <strong className="text-navy">Important:</strong> Context matters. Using
                &quot;free&quot; once in a legitimate email won&apos;t kill you. But combining
                multiple trigger words with poor authentication and suspicious links? Spam folder.
              </span>
            </div>

            <h2 id="urgency" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              Urgency & Pressure Words
            </h2>

            <p className="mb-4">
              Creating artificial urgency is a classic spam tactic. These words trigger filters
              when used excessively or combined with other signals:
            </p>

            <WordCategory
              title="High-Pressure Phrases"
              icon="⚡"
              severity="high"
              words={[
                "ACT NOW",
                "URGENT",
                "IMMEDIATE ACTION",
                "LIMITED TIME",
                "EXPIRES SOON",
                "LAST CHANCE",
                "FINAL WARNING",
                "HURRY",
                "DON'T DELAY",
                "BEFORE IT'S TOO LATE",
                "NOW OR NEVER",
                "TIME SENSITIVE",
              ]}
            />

            <WordCategory
              title="Deadline Words"
              icon="⏰"
              severity="medium"
              words={[
                "Today only",
                "Ending soon",
                "While supplies last",
                "Limited availability",
                "Only X left",
                "Deadline approaching",
                "Offer expires",
                "Don't miss out",
              ]}
            />

            <h2 id="money" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              Money & Financial Words
            </h2>

            <p className="mb-4">
              Financial promises are heavily scrutinized. These words appear frequently in scam
              and phishing emails:
            </p>

            <WordCategory
              title="Free & Discount"
              icon="💰"
              severity="high"
              words={[
                "FREE",
                "FREE GIFT",
                "100% FREE",
                "ZERO COST",
                "NO COST",
                "NO OBLIGATION",
                "HUGE DISCOUNT",
                "BEST PRICE",
                "LOWEST PRICE",
                "INCREDIBLE DEAL",
                "UNBELIEVABLE SAVINGS",
              ]}
            />

            <WordCategory
              title="Money Promises"
              icon="💵"
              severity="high"
              words={[
                "Make money",
                "Earn cash",
                "Extra income",
                "Double your",
                "Million dollars",
                "Cash bonus",
                "Money back",
                "Get paid",
                "Easy money",
                "Financial freedom",
                "Get rich",
                "Income opportunity",
              ]}
            />

            <WordCategory
              title="Transaction Words"
              icon="💳"
              severity="medium"
              words={[
                "Credit card",
                "Wire transfer",
                "Direct debit",
                "Order now",
                "Buy now",
                "Purchase",
                "Invoice attached",
                "Payment required",
              ]}
            />

            <h2 id="guarantees" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              Guarantees & Promises
            </h2>

            <p className="mb-4">
              Bold promises that seem too good to be true trigger spam filters because they usually
              are too good to be true:
            </p>

            <WordCategory
              title="Absolute Claims"
              icon="✨"
              severity="high"
              words={[
                "GUARANTEED",
                "100% SUCCESS",
                "NO RISK",
                "RISK FREE",
                "SATISFACTION GUARANTEED",
                "DOUBLE YOUR MONEY",
                "PROVEN RESULTS",
                "WORKS INSTANTLY",
                "MIRACLE",
                "BREAKTHROUGH",
              ]}
            />

            <WordCategory
              title="Exaggerated Claims"
              icon="🎯"
              severity="medium"
              words={[
                "Amazing",
                "Incredible",
                "Unbelievable",
                "Revolutionary",
                "Life-changing",
                "Once in a lifetime",
                "Never before seen",
                "Exclusive offer",
                "Secret",
                "Insider",
              ]}
            />

            <h2 id="calls-to-action" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              Aggressive Calls to Action
            </h2>

            <WordCategory
              title="Pushy CTAs"
              icon="👆"
              severity="high"
              words={[
                "CLICK HERE",
                "CLICK NOW",
                "CLICK BELOW",
                "CALL NOW",
                "SIGN UP FREE",
                "JOIN NOW",
                "APPLY NOW",
                "REGISTER NOW",
                "SUBSCRIBE NOW",
                "GET STARTED NOW",
                "DOWNLOAD NOW",
              ]}
            />

            <h2 id="all-caps" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              Formatting Triggers
            </h2>

            <p className="mb-4">
              It&apos;s not just words — how you format them matters too:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-danger/[0.07] border border-danger/20 rounded-lg p-4">
                <strong className="text-navy block mb-1">❌ ALL CAPS</strong>
                <p className="text-muted text-sm">
                  Using full caps in subject lines or email body is a major spam signal.
                  SpamAssassin adds significant score for &quot;SHOUTING&quot;.
                </p>
              </div>

              <div className="bg-danger/[0.07] border border-danger/20 rounded-lg p-4">
                <strong className="text-navy block mb-1">❌ Excessive punctuation!!!</strong>
                <p className="text-muted text-sm">
                  Multiple exclamation marks, question marks, or dollar signs ($$$) trigger filters.
                </p>
              </div>

              <div className="bg-warn/[0.07] border border-warn/20 rounded-lg p-4">
                <strong className="text-navy block mb-1">⚠️ Colored/oversized text</strong>
                <p className="text-muted text-sm">
                  Large red text, unusual fonts, and excessive colors look spammy to filters.
                </p>
              </div>

              <div className="bg-warn/[0.07] border border-warn/20 rounded-lg p-4">
                <strong className="text-navy block mb-1">⚠️ Too many images</strong>
                <p className="text-muted text-sm">
                  Image-heavy emails with little text are flagged. Keep a 60/40 text-to-image ratio.
                </p>
              </div>
            </div>

            <h2 id="safer-alternatives" className="font-display text-navy text-2xl mt-12 mb-4 pt-3 border-t border-border">
              Safer Alternatives
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-navy/5">
                    <th className="text-left px-4 py-3 text-muted font-mono text-[11px] uppercase border-b border-border">Instead of</th>
                    <th className="text-left px-4 py-3 text-muted font-mono text-[11px] uppercase border-b border-border">Try this</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["FREE", "Complimentary, no charge, included"],
                    ["CLICK HERE", "Learn more, see details, read the guide"],
                    ["ACT NOW", "When you're ready, at your convenience"],
                    ["BUY NOW", "Get yours, explore options"],
                    ["GUARANTEED", "We're confident, our promise"],
                    ["LIMITED TIME", "Available until [date]"],
                    ["Don't miss out", "You might be interested in"],
                    ["URGENT", "Important update, time-sensitive"],
                  ].map(([avoid, use]) => (
                    <tr key={avoid} className="border-b border-border">
                      <td className="px-4 py-3"><span className="text-danger">{avoid}</span></td>
                      <td className="px-4 py-3 text-brand">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-brand-light border border-brand/20 rounded-xl p-5 my-7">
              <span className="text-xl mr-2">🎯</span>
              <span className="text-navy/80">
                <strong className="text-navy">Test your email:</strong> Run a spam test at{" "}
                <Link href="/" className="text-brand underline">CheckEmailDelivery.com</Link> — our
                SpamAssassin integration checks for trigger words and other spam signals.
              </span>
            </div>
          </div>
        </article>

        <aside className="lg:sticky lg:top-24">
          <div className="bg-white shadow-sm border border-border rounded-xl p-6 mb-5">
            <h3 className="font-mono text-[11px] text-muted uppercase tracking-wider mb-4">
              On This Page
            </h3>
            <ul className="space-y-2">
              {[
                { href: "#urgency", label: "Urgency Words" },
                { href: "#money", label: "Money Words" },
                { href: "#guarantees", label: "Guarantees" },
                { href: "#calls-to-action", label: "CTAs" },
                { href: "#all-caps", label: "Formatting" },
                { href: "#safer-alternatives", label: "Alternatives" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-muted text-[13.5px] hover:text-brand transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: "linear-gradient(145deg, rgba(14,166,110,0.08), rgba(14,166,110,0.02))",
              border: "1px solid rgba(14,166,110,0.28)",
              boxShadow: "0 8px 24px rgba(12,26,46,0.06)",
            }}
          >
            <h3 className="font-display text-navy text-xl mb-2">Spam Check</h3>
            <p className="text-navy/80 text-[13px] leading-relaxed mb-4">
              Test your email for spam triggers.
            </p>
            <Link
              href="/"
              className="block bg-brand text-white text-[13px] font-semibold py-3 px-4 rounded-lg hover:bg-brand/90 transition-colors"
            >
              Run Free Test →
            </Link>
          </div>
        </aside>
      </div>

      <section className="max-w-[1100px] mx-auto px-6 pb-16">
        <h2 className="font-display text-navy text-xl mb-5">Related Guides</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { href: "/blog/why-emails-go-to-spam", category: "DELIVERABILITY", title: "Why Emails Go to Spam" },
            { href: "/blog/cold-email-deliverability", category: "OUTREACH", title: "Cold Email Deliverability" },
            { href: "/blog/how-to-fix-dkim", category: "AUTHENTICATION", title: "How to Fix DKIM" },
          ].map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="bg-white shadow-sm border border-border rounded-xl p-6 hover:border-brand/30 hover:-translate-y-0.5 transition-all"
            >
              <span className="font-mono text-[10px] text-brand uppercase block mb-2" style={{ letterSpacing: "0.1em" }}>
                {article.category}
              </span>
              <span className="font-display text-navy text-base">{article.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}


