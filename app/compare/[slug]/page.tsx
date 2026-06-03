import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getComparePageData,
  getCompareStaticParams,
  relatedComparisons,
  SITE_URL,
} from "@/lib/seo-data";
import { LIFESTYLE_LABELS } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getCompareStaticParams().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparePageData(slug);
  if (!data) return {};

  const { a, b } = data;
  const title = `${a.name} vs ${b.name} — which is better to live in?`;
  const description = `Comparing ${a.name} and ${b.name}: rent, transport, lifestyle, safety and overall recommendation. ${data.overallRecommendation}`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/compare/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/compare/${slug}`,
      type: "article",
    },
  };
}

function ScoreBar({ value, max = 10 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      <span className="text-sm font-medium tabular-nums w-6 text-right">
        {value}
      </span>
    </div>
  );
}

function Winner({ isWinner }: { isWinner: boolean }) {
  if (!isWinner) return null;
  return (
    <span className="ml-2 text-xs bg-emerald-600/30 text-emerald-400 px-2 py-0.5 rounded-full">
      winner
    </span>
  );
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const data = getComparePageData(slug);
  if (!data) notFound();

  const {
    a,
    b,
    rentDiff,
    rentWinner,
    lifestyleWinner,
    connectivityWinner,
    safetyWinner,
    greenWinner,
    nightlifeWinner,
    overallRecommendation,
  } = data;

  const related = relatedComparisons(a.id, 4);

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
      {
        "@type": "ListItem",
        position: 3,
        name: `${a.name} vs ${b.name}`,
        item: `${SITE_URL}/compare/${slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${a.name} or ${b.name} better to live in?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: overallRecommendation,
        },
      },
      {
        "@type": "Question",
        name: `Is ${a.name} cheaper than ${b.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            rentDiff > 0
              ? `${a.name} is cheaper. The average 1-bed rent in ${a.name} is £${a.rent.oneBedMedianGbp.toLocaleString()}/month vs £${b.rent.oneBedMedianGbp.toLocaleString()}/month in ${b.name} — a difference of £${Math.abs(rentDiff).toLocaleString()}/month.`
              : rentDiff < 0
              ? `${b.name} is cheaper. The average 1-bed rent in ${b.name} is £${b.rent.oneBedMedianGbp.toLocaleString()}/month vs £${a.rent.oneBedMedianGbp.toLocaleString()}/month in ${a.name} — a difference of £${Math.abs(rentDiff).toLocaleString()}/month.`
              : `${a.name} and ${b.name} have similar average rents at £${a.rent.oneBedMedianGbp.toLocaleString()}/month for a 1-bed flat.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the difference between ${a.name} and ${b.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${a.name}: ${a.summary} ${b.name}: ${b.summary}`,
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
              {a.name} vs {b.name}
            </span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {a.name} vs {b.name}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              A side-by-side comparison of rent, transport, lifestyle and
              overall liveability.
            </p>
          </header>

          {/* Recommendation callout */}
          <section className="mb-10 rounded-lg border border-emerald-700/40 bg-emerald-950/30 p-5">
            <p className="text-sm text-emerald-400 font-medium mb-1">
              Our recommendation
            </p>
            <p className="text-white">{overallRecommendation}</p>
          </section>

          {/* Rent comparison */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Rent comparison</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[a, b].map((n) => (
                <div
                  key={n.id}
                  className={`rounded-lg border p-5 ${
                    n.id === rentWinner
                      ? "border-emerald-700/60 bg-emerald-950/20"
                      : "border-slate-800 bg-slate-900"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold">
                      {n.name}
                      <Winner isWinner={n.id === rentWinner} />
                    </h3>
                    <span className="text-xs text-slate-400">
                      {n.borough}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">1-bed flat</span>
                      <span className="font-medium">
                        £{n.rent.oneBedMedianGbp.toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">2-bed flat</span>
                      <span className="font-medium">
                        £{n.rent.twoBedMedianGbp.toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Zone(s)</span>
                      <span>{n.transportZones.join(", ")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {rentDiff !== 0 && (
              <p className="mt-3 text-sm text-slate-400">
                {rentDiff > 0 ? b.name : a.name} is{" "}
                <strong className="text-white">
                  £{Math.abs(rentDiff).toLocaleString()}/month cheaper
                </strong>{" "}
                on a 1-bed flat.
              </p>
            )}
          </section>

          {/* Lifestyle comparison */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-6">
              Lifestyle comparison
            </h2>
            <div className="space-y-4">
              {(
                Object.entries(LIFESTYLE_LABELS) as [
                  keyof typeof LIFESTYLE_LABELS,
                  string,
                ][]
              ).map(([key, label]) => {
                const aVal = a.lifestyle[key];
                const bVal = b.lifestyle[key];
                const aWins = aVal > bVal;
                const bWins = bVal > aVal;
                return (
                  <div key={key} className="rounded-lg bg-slate-900 border border-slate-800 p-4">
                    <p className="text-sm text-slate-400 mb-3">{label}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium">
                            {a.name}
                            {aWins && (
                              <span className="ml-2 text-xs text-emerald-400">
                                ↑
                              </span>
                            )}
                          </span>
                        </div>
                        <ScoreBar value={aVal} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium">
                            {b.name}
                            {bWins && (
                              <span className="ml-2 text-xs text-emerald-400">
                                ↑
                              </span>
                            )}
                          </span>
                        </div>
                        <ScoreBar value={bVal} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Strengths / tradeoffs */}
          <section className="grid sm:grid-cols-2 gap-6 mb-10">
            {[a, b].map((n) => (
              <div key={n.id}>
                <h2 className="text-xl font-semibold mb-4">{n.name}</h2>
                <p className="text-slate-300 text-sm mb-4">{n.summary}</p>
                <ul className="space-y-2 mb-4">
                  {n.strengths.map((s) => (
                    <li key={s} className="flex gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {n.tradeoffs.map((t) => (
                    <li key={t} className="flex gap-2 text-sm text-slate-400">
                      <span className="text-amber-400">→</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-white mb-2">
                  Is {a.name} or {b.name} better to live in?
                </h3>
                <p className="text-slate-300">{overallRecommendation}</p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">
                  Is {a.name} cheaper than {b.name}?
                </h3>
                <p className="text-slate-300">
                  {rentDiff > 0
                    ? `${a.name} is cheaper — average 1-bed rent is £${a.rent.oneBedMedianGbp.toLocaleString()} vs £${b.rent.oneBedMedianGbp.toLocaleString()} in ${b.name}, a saving of £${Math.abs(rentDiff).toLocaleString()}/month.`
                    : rentDiff < 0
                    ? `${b.name} is cheaper — average 1-bed rent is £${b.rent.oneBedMedianGbp.toLocaleString()} vs £${a.rent.oneBedMedianGbp.toLocaleString()} in ${a.name}, a saving of £${Math.abs(rentDiff).toLocaleString()}/month.`
                    : `${a.name} and ${b.name} have similar rents — both around £${a.rent.oneBedMedianGbp.toLocaleString()}/month for a 1-bed flat.`}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">
                  Which has better transport — {a.name} or {b.name}?
                </h3>
                <p className="text-slate-300">
                  {a.lifestyle.connectivity > b.lifestyle.connectivity
                    ? `${a.name} scores higher for transport (${a.lifestyle.connectivity}/10 vs ${b.lifestyle.connectivity}/10). `
                    : a.lifestyle.connectivity < b.lifestyle.connectivity
                    ? `${b.name} scores higher for transport (${b.lifestyle.connectivity}/10 vs ${a.lifestyle.connectivity}/10). `
                    : `${a.name} and ${b.name} score equally on transport (${a.lifestyle.connectivity}/10). `}
                  {a.name} is served by{" "}
                  {a.mainStations.slice(0, 2).map((s) => s.name).join(" and ")}
                  {". "}
                  {b.name} is served by{" "}
                  {b.mainStations.slice(0, 2).map((s) => s.name).join(" and")}
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Related comparisons */}
          {related.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">
                Compare {a.name} with similar areas
              </h2>
              <div className="flex flex-wrap gap-3">
                {related.map((s) => {
                  const parts = s.split("-vs-");
                  const otherSlug = parts[1];
                  return (
                    <Link
                      key={s}
                      href={`/compare/${s}`}
                      className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors capitalize"
                    >
                      {a.name} vs {otherSlug.replace(/-/g, " ")}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Still deciding? Try the discovery tool
            </h2>
            <p className="text-slate-300 mb-6">
              Enter your commute, salary and lifestyle preferences to get a
              personalised neighbourhood ranking.
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
