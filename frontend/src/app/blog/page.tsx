import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Email Deliverability Blog — Guides, Tips & Fixes | CheckEmailDelivery",
  description:
    "Free guides on email deliverability, DKIM setup, SPF records, DMARC policies, blacklist removal, and why emails land in spam. Written for real senders.",
  keywords: [
    "email deliverability guide",
    "DKIM setup",
    "SPF record",
    "DMARC policy",
    "email blacklist removal",
    "why emails go to spam",
    "email authentication",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Email Deliverability Blog — CheckEmailDelivery",
    description:
      "Practical guides on SPF, DKIM, DMARC, and email deliverability. Written for cold emailers, founders, and marketers.",
    url: "https://checkemaildelivery.com/blog",
    type: "website",
  },
};

// Blog posts data
const featuredPost = {
  slug: "why-emails-go-to-spam",
  category: "TROUBLESHOOTING",
  categoryColor: "text-danger",
  title: "Why Are My Emails Going to Spam? (12 Real Reasons + Fixes)",
  excerpt:
    "The complete guide to every reason your emails land in spam — SPF failures, DKIM missing, blacklists, content triggers — with step-by-step fixes for each.",
  readTime: "8 min read",
  updated: "March 2026",
};

const blogPosts = [
  {
    slug: "how-to-fix-dkim",
    icon: "🔑",
    category: "AUTHENTICATION",
    categoryClass: "text-[#60a5fa]",
    title: "How to Set Up DKIM: Step-by-Step for Every Email Provider",
    excerpt:
      "Complete DKIM setup guide for Google Workspace, Microsoft 365, Zoho, Mailgun, SendGrid, and more.",
    readTime: "7 min",
  },
  {
    slug: "email-blacklist-removal",
    icon: "🚫",
    category: "REPUTATION",
    categoryClass: "text-warn",
    title: "Email Blacklist Removal: How to Delist Your Domain or IP",
    excerpt:
      "Step-by-step removal instructions for Spamhaus, Barracuda, SpamCop, and 8 other major blacklists.",
    readTime: "8 min",
  },
  {
    slug: "what-is-dmarc",
    icon: "🛡️",
    category: "AUTHENTICATION",
    categoryClass: "text-[#60a5fa]",
    title: "What is DMARC? Complete Setup Guide for 2026",
    excerpt:
      "DMARC explained in plain English — what it does, why Gmail requires it, and how to set it up in 15 minutes.",
    readTime: "6 min",
  },
  {
    slug: "spf-record-guide",
    icon: "📋",
    category: "AUTHENTICATION",
    categoryClass: "text-[#60a5fa]",
    title: "SPF Record Setup: The Complete Guide",
    excerpt:
      "How to create, test, and troubleshoot SPF records for your domain. Includes examples for all major providers.",
    readTime: "5 min",
  },
  {
    slug: "cold-email-deliverability",
    icon: "❄️",
    category: "GUIDE",
    categoryClass: "text-brand",
    title: "Cold Email Deliverability Checklist (2026)",
    excerpt:
      "Everything you need to check before sending cold emails — domain warmup, authentication, content, and more.",
    readTime: "10 min",
  },
  {
    slug: "spam-trigger-words",
    icon: "⚠️",
    category: "CONTENT",
    categoryClass: "text-danger",
    title: "100+ Spam Trigger Words to Avoid in 2026",
    excerpt:
      "The complete list of words and phrases that trigger spam filters in Gmail, Outlook, and corporate filters.",
    readTime: "4 min",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <SiteHeader />

      {/* Hero */}
      <section className="pt-20 pb-12 px-6 text-center">
        <span
          className="inline-flex items-center gap-1.5 bg-brand/10 border border-brand/25 text-brand font-mono text-[11px] font-medium uppercase px-3 py-1 rounded-full mb-5"
          style={{ letterSpacing: "0.08em" }}
        >
          📚 Knowledge Base
        </span>
        <h1 className="font-display text-navy mb-4" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400 }}>
          Email Deliverability <em className="italic text-brand">Blog</em>
        </h1>
        <p className="text-muted max-w-[520px] mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
          Practical guides on SPF, DKIM, DMARC, and getting your emails to the inbox. Written for real senders, not
          engineers.
        </p>
      </section>

      {/* Featured Post */}
      <section className="max-w-[1100px] mx-auto px-6 mb-12">
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="block bg-navy rounded-2xl overflow-hidden hover:-translate-y-0.5 transition-all shadow-lg"
        >
          <div className="grid md:grid-columns-2 min-h-[280px]" style={{ gridTemplateColumns: "1fr 420px" }}>
            {/* Visual */}
            <div
              className="p-10 flex flex-col justify-between relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(14,166,110,0.15), rgba(12,26,46,0.95))" }}
            >
              <span className="inline-flex items-center gap-1.5 bg-brand text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded w-fit" style={{ letterSpacing: "0.1em" }}>
                ⭐ Featured
              </span>
              <span
                className="absolute top-5 right-8 font-display text-brand/20"
                style={{ fontSize: "96px", lineHeight: 1 }}
              >
                12
              </span>
            </div>
            {/* Content */}
            <div className="p-10 flex flex-col justify-between bg-navy">
              <div>
                <span className={`font-mono text-[11px] font-medium uppercase mb-3 block ${featuredPost.categoryColor}`} style={{ letterSpacing: "0.08em" }}>
                  {featuredPost.category}
                </span>
                <h2 className="font-display text-white text-[26px] mb-3" style={{ lineHeight: 1.3 }}>
                  {featuredPost.title}
                </h2>
                <p className="text-white/60 text-[14px] mb-6" style={{ lineHeight: 1.7 }}>
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-white/50 text-xs">📅 {featuredPost.updated}</span>
                <span className="font-mono text-white/50 text-xs">⏱ {featuredPost.readTime}</span>
                <span className="ml-auto text-brand text-[13px] font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Read Guide →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* All Posts Grid */}
      <section className="max-w-[1100px] mx-auto px-6 pb-20">
        <h2 className="font-display text-navy text-[22px] mb-6">All Guides</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-border rounded-xl p-7 flex flex-col hover:border-brand/40 hover:-translate-y-0.5 hover:shadow-lg transition-all relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-gradient-to-r group-hover:from-brand group-hover:to-transparent transition-all"
              />
              <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center text-lg mb-4">
                {post.icon}
              </div>
              <span className={`font-mono text-[10.5px] font-medium uppercase mb-2.5 ${post.categoryClass}`} style={{ letterSpacing: "0.1em" }}>
                {post.category}
              </span>
              <h3 className="font-display text-navy text-lg mb-2.5 flex-1" style={{ lineHeight: 1.4 }}>
                {post.title}
              </h3>
              <p className="text-muted text-[13px] mb-5" style={{ lineHeight: 1.6 }}>
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-muted text-xs">⏱ {post.readTime}</span>
                <span className="text-brand text-[13px] font-semibold">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 px-6 text-center">
        <h2 className="font-display text-white text-[28px] mb-3">Ready to test your email?</h2>
        <p className="text-white/60 mb-6 max-w-[400px] mx-auto">
          Send a test email and get a full delivery audit — authentication, reputation, content, blacklists.
        </p>
        <Link
          href="/"
          className="inline-block bg-brand text-white font-semibold text-[14px] px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors"
        >
          Run Free Test →
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}


