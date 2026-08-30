import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { GOOGLE_ADSENSE_CLIENT_ID } from "@/lib/monetisation";
import { SITE_URL } from "@/lib/seo-data";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";

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
  other: {
    "google-adsense-account": GOOGLE_ADSENSE_CLIENT_ID,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "An independent, data-driven guide to choosing a London neighbourhood by commute, rent and lifestyle.",
  logo: `${SITE_URL}/opengraph-image`,
  email: CONTACT_EMAIL,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: CONTACT_EMAIL,
    availableLanguage: "English",
  },
  areaServed: { "@type": "City", name: "London" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {children}
        <SiteFooter />
        {/*
          The AdSense tag is intentionally not rendered here. CookieConsent
          injects it only after the visitor accepts advertising cookies, so
          declining means no advertising script and no ad cookies at all.
          AdSense site verification uses the google-adsense-account meta tag
          above, which is unaffected by the consent state.
        */}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
