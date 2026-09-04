import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES, GUIDE_CATEGORIES, guidesByRecency } from "@/lib/data/guides";
import { SITE_URL } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "London living guides — money, renting, transport & moving",
  description:
    "Practical guides to living in London: what salary you need, how renting works under the 2026 rules, what council tax costs by borough, and how the travel zones work.",
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: {
    title: "London living guides — money, renting, transport & moving",
    description:
      "Practical guides to living in London: salaries, renting, council tax and transport, written for people moving to or within the city.",
    url: `${SITE_URL}/guides`,
  },
};

const CATEGORY_BLURBS: Record<string, string> = {
  Money: "What things cost, and what salary supports them.",
  Renting: "How the process works, and what the law says.",
  Transport: "Zones, fares, and what a commute really costs.",
  Moving: "Getting here and getting set up.",
};

export default function GuidesHubPage() {
  const guides = guidesByRecency();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${SITE_URL}/guides`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "London living guides",
    description:
      "Practical guides to the cost, process and logistics of living in London.",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.h1,
      description: g.summary,
      url: `${SITE_URL}/guides/${g.slug}`,
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
            <span className="text-slate-200">Guides</span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          <header className="mb-12 max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Guides to living in London
            </h1>
            <p className="text-lg text-slate-300">
              The rest of this site helps you work out{" "}
              <em className="not-italic text-slate-100">which area</em>. These
              guides cover everything that comes before that — what London
              actually costs, how renting works now that the rules have changed,
              and what to sort out in which order.
            </p>
          </header>

          {GUIDE_CATEGORIES.map((category) => {
            const inCategory = guides.filter((g) => g.category === category);
            if (inCategory.length === 0) return null;

            return (
              <section key={category} className="mb-14">
                <div className="mb-6 border-b border-slate-800 pb-3">
                  <h2 className="text-xl font-semibold">{category}</h2>
                  <p className="text-sm text-slate-400">
                    {CATEGORY_BLURBS[category]}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {inCategory.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="flex flex-col rounded-lg border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-slate-600"
                    >
                      <h3 className="font-semibold text-white mb-2">
                        {guide.h1}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-slate-300">
                        {guide.summary}
                      </p>
                      <p className="mt-4 text-xs text-slate-500">
                        {guide.readMinutes} min read
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          <section className="rounded-xl border border-slate-700 bg-slate-900 p-8">
            <h2 className="text-xl font-semibold mb-2">
              Ready to narrow down an area?
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl">
              Once you know your budget, the discovery tool ranks{" "}
              {GUIDES.length > 0 ? "London neighbourhoods" : "areas"} against
              your commute, rent budget and lifestyle preferences.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-emerald-500"
              >
                Open the discovery tool →
              </Link>
              <Link
                href="/neighbourhoods"
                className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium transition-colors hover:border-slate-500"
              >
                Browse all neighbourhoods
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
