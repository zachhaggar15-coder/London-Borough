import type { Metadata } from "next";
import Link from "next/link";
import {
  getCompareIndexSections,
  getComparePageData,
  getCompareStaticParams,
  getFeaturedCompareSlugs,
  SITE_URL,
} from "@/lib/seo-data";
import {
  RENT_MARKET_REVIEW_AS_OF,
  RENT_MARKET_SOURCES,
} from "@/lib/data/rent-market";

export const metadata: Metadata = {
  title: "Compare London neighbourhoods — rent, transport & lifestyle",
  description:
    "Side-by-side London neighbourhood comparisons for rent, transport, safety, green space, nightlife and overall liveability.",
  alternates: { canonical: `${SITE_URL}/compare` },
  openGraph: {
    title: "Compare London neighbourhoods — rent, transport & lifestyle",
    description:
      "Head-to-head London area guides that compare rent, transport, safety, green space, nightlife and overall liveability.",
    url: `${SITE_URL}/compare`,
    type: "website",
  },
};

function ComparisonCard({ slug }: { slug: string }) {
  const data = getComparePageData(slug);
  if (!data) return null;

  const { a, b, rentDiff, rentWinner, overallRecommendation } = data;
  const cheaper = rentWinner === a.id ? a : b;
  const rentSummary =
    rentDiff === 0
      ? `Both average about £${a.rent.oneBedMedianGbp.toLocaleString()}/month for a 1-bed.`
      : `${cheaper.name} is cheaper by about £${Math.abs(rentDiff).toLocaleString()}/month.`;

  return (
    <Link
      href={`/compare/${slug}`}
      className="rounded-lg bg-slate-900 border border-slate-800 p-5 hover:border-slate-600 transition-colors"
    >
      <p className="text-xs text-slate-400 mb-2">Area comparison</p>
      <h3 className="font-semibold text-white mb-3">
        {a.name} vs {b.name}
      </h3>
      <p className="text-sm text-slate-300 mb-3">{rentSummary}</p>
      <p className="text-sm text-slate-400 line-clamp-3">
        {overallRecommendation}
      </p>
    </Link>
  );
}

export default function CompareIndexPage() {
  const sections = getCompareIndexSections();
  const featured = getFeaturedCompareSlugs(18)
    .map((slug) => getComparePageData(slug))
    .filter(Boolean);
  const comparisonCount = getCompareStaticParams().length;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare neighbourhoods",
        item: `${SITE_URL}/compare`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured London neighbourhood comparisons",
    itemListElement: featured.map((data, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${data!.a.name} vs ${data!.b.name}`,
      url: `${SITE_URL}/compare/${data!.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Where in London
            </Link>
            <span>/</span>
            <span className="text-slate-200">Compare</span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          <header className="mb-12">
            <p className="text-sm text-emerald-400 font-medium mb-3">
              {comparisonCount.toLocaleString()} London area matchups
            </p>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Compare London neighbourhoods
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl">
              Side-by-side guides for deciding between London areas, with rent,
              transport, lifestyle scores, safety, green space and plain-English
              recommendations.
            </p>
          </header>

          <section className="grid gap-4 sm:grid-cols-3 mb-14">
            {[
              ["Rent", "1-bed and 2-bed monthly rent comparisons"],
              ["Transport", "Zone, station and connectivity trade-offs"],
              ["Lifestyle", "Nightlife, quietness, food, parks and safety"],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-lg bg-slate-900 border border-slate-800 p-5"
              >
                <h2 className="font-semibold text-white mb-2">{title}</h2>
                <p className="text-sm text-slate-400">{body}</p>
              </div>
            ))}
          </section>

          <div className="space-y-14">
            {sections.map((section) => (
              <section key={section.title}>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    {section.title}
                  </h2>
                  <p className="text-slate-400 max-w-2xl">
                    {section.description}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.slugs.map((slug) => (
                    <ComparisonCard key={slug} slug={slug} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-16 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-6">
              <h2 className="text-xl font-semibold mb-3">
                How to use these comparisons
              </h2>
              <p className="text-slate-300 mb-4">
                Start with the area you already know, then compare it with a
                similar-rent or nearby alternative. Each guide links back to the
                full neighbourhood profiles so you can check the underlying rent,
                transport and lifestyle data before shortlisting places to view.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/neighbourhoods"
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium transition-colors"
                >
                  Browse neighbourhoods
                </Link>
                <Link
                  href="/boroughs"
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Browse boroughs
                </Link>
              </div>
            </div>

            <aside className="rounded-lg bg-slate-900 border border-slate-800 p-6">
              <h2 className="text-xl font-semibold mb-3">Data freshness</h2>
              <p className="text-sm text-slate-300 mb-4">
                Rent and area data was last reviewed on{" "}
                <time dateTime={RENT_MARKET_REVIEW_AS_OF}>
                  {RENT_MARKET_REVIEW_AS_OF}
                </time>
                .
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                {RENT_MARKET_SOURCES.map((source) => (
                  <li key={source} className="flex gap-2">
                    <span className="text-emerald-400">-</span>
                    {source}
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </main>
      </div>
    </>
  );
}
