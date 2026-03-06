import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Email Writer - Write Spam-Free Emails | CheckEmailDelivery",
  description:
    "Free AI email writer that transforms your thoughts into polished, professional emails. Built-in spam detection ensures your emails reach the inbox.",
  keywords: [
    "AI email writer",
    "email generator",
    "spam-free email",
    "email writing tool",
    "professional email writer",
    "email deliverability",
    "free email tool",
  ],
  alternates: { canonical: "/tools/email-writer" },
  openGraph: {
    title: "AI Email Writer - Write Spam-Free Emails",
    description:
      "Transform your thoughts into polished, professional emails with AI. Built-in spam detection.",
    url: "https://checkemaildelivery.com/tools/email-writer",
    type: "website",
  },
};

export default function EmailWriterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
