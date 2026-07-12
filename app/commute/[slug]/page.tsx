import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCommuteSlugs,
  getCommutePageData,
  SITE_URL,
} from "@/lib/seo-data";
import EssentialsPreview from "@/components/EssentialsPreview";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCommuteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getCommutePageData(slug);
  if (!data) return {};

  const title = `Best areas to live for commuting to ${data.destinationLabel}`;
  const description = `The best London neighbourhoods for commuting to ${data.destinationLabel}. Ranked by commute time, with rent prices and transport options.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/commute/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/commute/${slug}`,
      type: "article",
    },
  };
}

export default async function CommutePage({ params }: Props) {
  const { slug } = await params;
  const data = getCommutePageData(slug);
  if (!data) notFound();

  const { destinationLabel, bands, topPicks } = data;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Commute guides",
        item: `${SITE_URL}/commute`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: destinationLabel,
        item: `${SITE_URL}/commute/${slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Where is the best place to live for commuting to ${destinationLabel}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            topPicks.length > 0
              ? `The best areas for commuting to ${destinationLabel} include ${topPicks
                  .slice(0, 3)
                  .map((n) => n.name)
                  .join(
                    ", ",
                  )}, with commute times of approximately ${topPicks[0].minutes} to ${topPicks[2]?.minutes ?? topPicks[0].minutes} minutes.`
              : `Several areas offer good commute access to ${destinationLabel}.`,
        },
      },
      {
        "@type": "Question",
        name: `What London areas are within 30 minutes of ${destinationLabel}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: (() => {
            const under30 = bands
              .filter((b) => b.maxMinutes <= 30)
              .flatMap((b) => b.neighbourhoods);
            return under30.length > 0
              ? `Areas within 30 minutes of ${destinationLabel} include ${under30
                  .slice(0, 4)
                  .map((n) => n.name)
                  .join(", ")}.`
              : `Commute times to ${destinationLabel} vary by area and transport connection.`;
          })(),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Where in London
            </Link>
            <span>/</span>
            <span className="text-slate-200">
              Commuting to {destinationLabel}
            </span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          <header className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Best areas to live for commuting to {destinationLabel}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              {bands.flatMap((b) => b.neighbourhoods).length} London
              neighbourhoods ranked by commute time to {destinationLabel},
              with rent prices and transport options for each.
            </p>
          </header>

          {/* Top picks */}
          {topPicks.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6">
                Fastest commutes to {destinationLabel}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {topPicks.map((n) => (
                  <div
                    key={n.id}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-5"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{n.name}</h3>
                        <p className="text-xs text-slate-400">{n.borough}</p>
                      </div>
                      <span className="text-emerald-400 font-mono text-sm font-semibold">
                        ~{n.minutes} min
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                      {n.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>£{n.oneBedRent.toLocaleString()}/mo</span>
                      <div className="flex gap-1">
                        {n.transportLines.slice(0, 2).map((l) => (
                          <span
                            key={l}
                            className="bg-slate-800 px-2 py-0.5 rounded"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Banded list */}
          {bands.map((band) => (
            <section key={band.label} className="mb-12">
              <h2 className="text-xl font-semibold mb-2">{band.label}</h2>
              <p className="text-sm text-slate-400 mb-6">
                {band.neighbourhoods.length}{" "}
                {band.neighbourhoods.length === 1 ? "area" : "areas"} with
                commute times in this range
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-left text-slate-400">
                      <th className="pb-3 font-medium">Neighbourhood</th>
                      <th className="pb-3 font-medium">Borough</th>
                      <th className="pb-3 font-medium text-right">
                        Commute
                      </th>
                      <th className="pb-3 font-medium text-right">
                        1-bed rent
                      </th>
                      <th className="pb-3 font-medium hidden sm:table-cell">
                        Transport
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {band.neighbourhoods.map((n) => (
                      <tr
                        key={n.id}
                        className="border-b border-slate-800/50 hover:bg-slate-900/50 transition-colors"
                      >
                        <td className="py-3 font-medium">{n.name}</td>
                        <td className="py-3 text-slate-400">{n.borough}</td>
                        <td className="py-3 text-right tabular-nums">
                          <span className="text-emerald-400">
                            ~{n.minutes} min
                          </span>
                          {n.isEstimate && (
                            <span className="text-slate-500 text-xs ml-1">
                              est.
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-right tabular-nums">
                          £{n.oneBedRent.toLocaleString()}
                        </td>
                        <td className="py-3 hidden sm:table-cell">
                          <div className="flex gap-1">
                            {n.transportLines.slice(0, 2).map((l) => (
                              <span
                                key={l}
                                className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded"
                              >
                                {l}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}

          <EssentialsPreview
            slugs={["commuter-kit"]}
            title={`Useful kit for commuting to ${destinationLabel}`}
            description="Compact Amazon UK picks for public-transport days, rainy station walks and long office commutes."
          />

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-white mb-2">
                  Where is the best place to live for commuting to{" "}
                  {destinationLabel}?
                </h3>
                <p className="text-slate-300">
                  {topPicks[0] && (
                    <>
                      {topPicks
                        .slice(0, 3)
                        .map((n) => n.name)
                        .join(", ")}{" "}
                      all offer fast commutes to {destinationLabel}. The
                      quickest is {topPicks[0].name} at approximately{" "}
                      {topPicks[0].minutes} minutes.
                    </>
                  )}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">
                  How should I balance commute time and rent near{" "}
                  {destinationLabel}?
                </h3>
                <p className="text-slate-300">
                  Areas closest to {destinationLabel} tend to carry a rent
                  premium. The sweet spot for most people is the 25–35 minute
                  band — you trade a few extra minutes on the tube for
                  meaningfully cheaper rent and more living space.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Get a personalised neighbourhood match
            </h2>
            <p className="text-slate-300 mb-6">
              Factor in your salary, rent budget, and lifestyle preferences —
              not just commute time.
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
