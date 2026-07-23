import type { Metadata } from "next";
import Link from "next/link";
import CouplesClient from "@/components/CouplesClient";
import { SITE_URL } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Best London areas for couples and flatmates with two commutes",
  description:
    "Compare London neighbourhoods for two people with different commute destinations, shared rent budget and lifestyle priorities.",
  alternates: { canonical: `${SITE_URL}/couples` },
  openGraph: {
    title: "Best London areas for couples and flatmates",
    description:
      "Find compromise London neighbourhoods for two commutes, shared affordability and lifestyle fit.",
    url: `${SITE_URL}/couples`,
    type: "website",
  },
};

export default function CouplesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Couples and flatmates",
        item: `${SITE_URL}/couples`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto flex max-w-6xl items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Where in London
            </Link>
            <span>/</span>
            <span className="text-slate-200">Couples and flatmates</span>
          </div>
        </nav>
        <main className="mx-auto max-w-6xl px-6 py-12">
          <header className="mb-10">
            <p className="mb-3 text-sm uppercase tracking-wide text-emerald-400">
              Two commutes, one shortlist
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight">
              Where should we live in London as a couple or flatmates?
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              Pick two work destinations, commute caps, a shared rent budget and
              a shared area style. The ranking favours fair compromises rather
              than one person getting a perfect commute while the other absorbs
              the pain.
            </p>
          </header>
          <CouplesClient />
        </main>
      </div>
    </>
  );
}
