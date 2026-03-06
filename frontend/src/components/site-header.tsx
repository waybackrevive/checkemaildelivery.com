"use client";

import Link from "next/link";

function LogoMark() {
  return (
    <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center shrink-0">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="4" width="16" height="11" rx="2" stroke="white" strokeWidth="1.5" />
        <path d="M1 7l8 5 8-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="5" r="3" fill="#0ea66e" />
      </svg>
    </div>
  );
}

export default function SiteHeader() {
  return (
    <nav
      className="sticky top-0 z-50 animate-slideDown"
      style={{
        background: "rgba(248,249,251,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-border)",
        height: 60,
      }}
    >
      <div className="max-w-[1100px] mx-auto w-full h-full px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <LogoMark />
          <span
            className="font-mono text-sm font-semibold text-navy"
            style={{ letterSpacing: "-0.3px" }}
          >
            Check<span className="text-brand">Email</span>Delivery
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-1.5 list-none">
          <li>
            <Link
              href="/#how"
              className="text-[13px] font-medium text-muted no-underline px-3 py-1.5 rounded-md hover:text-navy hover:bg-border-soft transition-colors"
            >
              How It Works
            </Link>
          </li>
          <li>
            <Link
              href="/#checks"
              className="text-[13px] font-medium text-muted no-underline px-3 py-1.5 rounded-md hover:text-navy hover:bg-border-soft transition-colors"
            >
              What We Check
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-[13px] font-medium text-muted no-underline px-3 py-1.5 rounded-md hover:text-navy hover:bg-border-soft transition-colors"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-[13px] font-medium text-muted no-underline px-3 py-1.5 rounded-md hover:text-navy hover:bg-border-soft transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="bg-navy text-white text-[13px] font-semibold px-4 py-1.5 rounded-lg hover:bg-navy-soft transition-all cursor-pointer border-none no-underline"
            >
              Run Free Test →
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
