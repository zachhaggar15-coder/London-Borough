import type { Metadata } from "next";
import Link from "next/link";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { londonRentMedians, SITE_URL } from "@/lib/seo-data";
import {
  RENT_MARKET_REVIEW_AS_OF,
  RENT_MARKET_SOURCES,
} from "@/lib/data/rent-market";
import RentIndexTable, {
  type RentIndexRow,
} from "@/components/RentIndexTable";

export const metadata: Metadata = {
  title: "London Rent Index — median 1-bed & 2-bed rent by area",
  description:
    "A sortable index of median one-bed and two-bed asking rents across every London neighbourhood we track, with the review date and sources.",
  alternates: { canonical: `${SITE_URL}/london-rent-index` },
  openGraph: {
    title: "London Rent Index — median 1-bed & 2-bed rent by area",
    description:
      "Sortable median one-bed and two-bed rents across London neighbourhoods.",
    url: `${SITE_URL}/london-rent-index`,
    type: "article",
  },
};

export default function LondonRentIndexPage() {
  const { oneBed, twoBed, count } = londonRentMedians();

  const rows: RentIndexRow[] = NEIGHBOURHOODS.map((n) => ({
    id: n.id,
    name: n.name,
    borough: n.borough,
    zoneLabel: n.transportZones.join("/"),
    zoneSort: Math.min(...n.transportZones),
    oneBed: n.rent.oneBedMedianGbp,
    twoBed: n.rent.twoBedMedianGbp,
  }));

  const citation = `Where in London, “London Rent Index” (median asking rents, reviewed ${RENT_MARKET_REVIEW_AS_OF}). ${SITE_URL}/london-rent-index`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "London Rent Index",
        item: `${SITE_URL}/london-rent-index`,
      },
    ],
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "London Rent Index",
    description: `Median one-bed and two-bed asking rents across ${count} London neighbourhoods.`,
    url: `${SITE_URL}/london-rent-index`,
    creator: { "@type": "Organization", name: "Where in London", url: SITE_URL },
    dateModified: RENT_MARKET_REVIEW_AS_OF,
    temporalCoverage: RENT_MARKET_REVIEW_AS_OF,
    variableMeasured: ["Median 1-bed asking rent (GBP/month)", "Median 2-bed asking rent (GBP/month)"],
    isAccessibleForFree: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Where in London
            </Link>
            <span>/</span>
            <span className="text-slate-200">London Rent Index</span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              London Rent Index
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              Median one-bed and two-bed asking rents across all {count} London
              neighbourhoods we track. Click any column heading to sort — by
              rent, borough or zone.
            </p>
          </header>

          {/* Headline medians */}
          <section className="grid grid-cols-2 gap-4 sm:max-w-md mb-8">
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
              <p className="text-xs text-slate-400 mb-1">London median 1-bed</p>
              <p className="text-2xl font-semibold">
                £{oneBed.toLocaleString()}
                <span className="text-sm text-slate-400 font-normal">/mo</span>
              </p>
            </div>
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
              <p className="text-xs text-slate-400 mb-1">London median 2-bed</p>
              <p className="text-2xl font-semibold">
                £{twoBed.toLocaleString()}
                <span className="text-sm text-slate-400 font-normal">/mo</span>
              </p>
            </div>
          </section>

          <section className="mb-10">
            <RentIndexTable rows={rows} />
          </section>

          {/* Methodology note + citation */}
          <section className="rounded-lg bg-slate-900 border border-slate-800 p-6 mb-10">
            <h2 className="text-lg font-semibold mb-2">
              About this data
            </h2>
            <p className="text-sm text-slate-300 mb-3">
              Figures are median asking rents reviewed on{" "}
              <time dateTime={RENT_MARKET_REVIEW_AS_OF}>
                {RENT_MARKET_REVIEW_AS_OF}
              </time>
              , compiled from {RENT_MARKET_SOURCES[1]} with{" "}
              {RENT_MARKET_SOURCES[2].toLowerCase()}. They are area-level
              estimates for orientation, not property-level valuations. Full{" "}
              <Link
                href="/methodology"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                methodology
              </Link>
              .
            </p>
            <div className="rounded-md bg-slate-950/60 border border-slate-800 p-3">
              <p className="text-xs text-slate-400 mb-1">Cite this page</p>
              <p className="text-sm text-slate-200">{citation}</p>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Find where you can afford
            </h2>
            <p className="text-slate-300 mb-6">
              Enter your salary and lifestyle to rank these areas by budget fit
              and commute.
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-medium transition-colors"
            >
              Open the discovery tool →
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
