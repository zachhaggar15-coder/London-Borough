import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/seo-data";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Where in London — find your perfect neighbourhood",
    template: "%s | Where in London",
  },
  description:
    "Find London neighbourhoods that match your commute, salary and lifestyle. Compare areas, check rent budgets, and discover where to live in London.",
  keywords: [
    "where to live in London",
    "best London neighbourhoods",
    "London area guide",
    "London rent guide",
    "best areas London young professionals",
  ],
  authors: [{ name: "Where in London" }],
  creator: "Where in London",
  publisher: "Where in London",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Where in London",
    title: "Where in London — find your perfect neighbourhood",
    description:
      "Find London neighbourhoods that match your commute, salary and lifestyle. Compare areas, check rent budgets, and discover where to live in London.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Where in London — find your perfect neighbourhood",
    description:
      "Find London neighbourhoods that match your commute, salary and lifestyle.",
    creator: "@whereinlondon",
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
