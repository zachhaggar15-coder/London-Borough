import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LIFESTYLE_PAGES,
  getLifestylePageData,
  SITE_URL,
} from "@/lib/seo-data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return LIFESTYLE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = getLifestylePageData(slug);
  if (!result) return {};

  const { page } = result;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `${SITE_URL}/lifestyle/${slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE_URL}/lifestyle/${slug}`,
      type: "article",
    },
  };
}

export default async function LifestylePage({ params }: Props) {
  const { slug } = await params;
  const result = getLifestylePageData(slug);
  if (!result) notFound();

  const { page, ranked } = result;
  const top10 = ranked.slice(0, 10);
  const rest = ranked.slice(10, 30);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Lifestyle guides",
        item: `${SITE_URL}/lifestyle`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.h1,
        item: `${SITE_URL}/lifestyle/${slug}`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.h1,
    description: page.metaDescription,
    itemListElement: top10.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.neighbourhood.name,
      description: e.neighbourhood.summary,
    })),
  };

  const otherLifestyles = LIFESTYLE_PAGES.filter((p) => p.slug !== slug).slice(0, 5);

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
            <span className="text-slate-200">Lifestyle guides</span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          <header className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {page.h1}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">{page.intro}</p>
          </header>

          {/* Top 10 */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">
              Top-ranked neighbourhoods
            </h2>
            <div className="space-y-4">
              {top10.map((entry) => {
                const n = entry.neighbourhood;
                return (
                  <div
                    key={n.id}
                    className="flex gap-4 rounded-lg bg-slate-900 border border-slate-800 p-5"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                      {entry.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-white">
                            {n.name}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {n.borough} · Zone{n.transportZones.length > 1 ? "s" : ""}{" "}
                            {n.transportZones.join("/")} · £
                            {n.rent.oneBedMedianGbp.toLocaleString()}/mo 1-bed
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <span className="text-lg font-bold text-emerald-400">
                            {entry.score}
                          </span>
                          <p className="text-xs text-slate-400">score</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 mb-3">
                        {n.summary}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {n.strengths.slice(0, 2).map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-slate-800 text-emerald-300 px-2 py-0.5 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {n.mainStations
                          .flatMap((s) => s.lines)
                          .slice(0, 3)
                          .map((line) => (
                            <span
                              key={line}
                              className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded"
                            >
                              {line}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Positions 11–30 as a compact table */}
          {rest.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6">
                Other strong options (#{top10.length + 1}–
                {top10.length + rest.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-left text-slate-400">
                      <th className="pb-3 font-medium w-8">#</th>
                      <th className="pb-3 font-medium">Neighbourhood</th>
                      <th className="pb-3 font-medium">Borough</th>
                      <th className="pb-3 font-medium text-right">Score</th>
                      <th className="pb-3 font-medium text-right">
                        1-bed rent
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rest.map((entry) => (
                      <tr
                        key={entry.neighbourhood.id}
                        className="border-b border-slate-800/50"
                      >
                        <td className="py-2.5 text-slate-500">
                          {entry.rank}
                        </td>
                        <td className="py-2.5 font-medium">
                          {entry.neighbourhood.name}
                        </td>
                        <td className="py-2.5 text-slate-400">
                          {entry.neighbourhood.borough}
                        </td>
                        <td className="py-2.5 text-right text-emerald-400 tabular-nums">
                          {entry.score}
                        </td>
                        <td className="py-2.5 text-right tabular-nums">
                          £
                          {entry.neighbourhood.rent.oneBedMedianGbp.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Other lifestyle pages */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">
              Other lifestyle guides
            </h2>
            <div className="flex flex-wrap gap-3">
              {otherLifestyles.map((p) => (
                <Link
                  key={p.slug}
                  href={`/lifestyle/${p.slug}`}
                  className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors"
                >
                  {p.h1.replace("Best London neighbourhoods for ", "").replace("Best ", "")}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Find your neighbourhood match
            </h2>
            <p className="text-slate-300 mb-6">
              Add your commute destination, salary and rent budget to get a
              personalised ranking.
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
