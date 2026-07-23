import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCommuteSlugs,
  getCommutePageData,
  SITE_URL,
} from "@/lib/seo-data";

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

  const {
    destinationLabel,
    bands,
    topPicks,
    decisionPicks,
    valueTradeOff,
  } = data;
  const allTimedNeighbourhoods = bands.flatMap((band) => band.neighbourhoods);
  const commuteCategories = [
    {
      label: "Fastest under 30 minutes",
      description: "Best starting points when commute time is non-negotiable.",
      neighbourhoods: allTimedNeighbourhoods
        .filter((n) => n.minutes <= 30)
        .slice(0, 3),
    },
    {
      label: "Cheapest under 45 minutes",
      description: "Lower rents while keeping the commute broadly practical.",
      neighbourhoods: [...allTimedNeighbourhoods]
        .filter((n) => n.minutes <= 45)
        .sort((a, b) => a.oneBedRent - b.oneBedRent || a.minutes - b.minutes)
        .slice(0, 3),
    },
    {
      label: "Lower-uncertainty routes",
      description: "Areas backed by the reviewed commute matrix first.",
      neighbourhoods: allTimedNeighbourhoods
        .filter((n) => n.source === "staticMatrix")
        .slice(0, 3),
    },
  ].filter((category) => category.neighbourhoods.length > 0);

  const under30 = bands
    .filter((b) => b.maxMinutes <= 30)
    .flatMap((b) => b.neighbourhoods);

  // Single source for FAQ so visible copy and JSON-LD stay in sync.
  const faqItems: { question: string; answer: string }[] = [
    {
      question: `Where is the best place to live for commuting to ${destinationLabel}?`,
      answer:
        topPicks.length > 0
          ? `${topPicks
              .slice(0, 3)
              .map((n) => n.name)
              .join(", ")} all offer fast commutes to ${destinationLabel}. The quickest is ${topPicks[0].name} at approximately ${topPicks[0].minutes} minutes.`
          : `Several areas offer good commute access to ${destinationLabel}.`,
    },
    {
      question: `What London areas are within 30 minutes of ${destinationLabel}?`,
      answer:
        under30.length > 0
          ? `Areas within about 30 minutes of ${destinationLabel} include ${under30
              .slice(0, 4)
              .map((n) => n.name)
              .join(", ")}.`
          : `Commute times to ${destinationLabel} vary by area and transport connection.`,
    },
    {
      question: `How do I balance commute time and rent near ${destinationLabel}?`,
      answer: `Areas closest to ${destinationLabel} tend to carry a rent premium. For most people the sweet spot is the 25–35 minute band — a few more minutes on the tube in exchange for meaningfully cheaper rent and more space.`,
    },
  ];

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
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
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
              neighbourhoods ranked by estimated typical commute time to{" "}
              {destinationLabel}, with rent prices and transport options for
              each.{" "}
              <Link
                href="/methodology"
                className="text-emerald-300 hover:text-emerald-200"
              >
                See how estimates are calculated.
              </Link>
            </p>
          </header>

          {decisionPicks.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6">
                Decision shortlist for {destinationLabel}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {decisionPicks.map((pick) => (
                  <Link
                    key={`${pick.label}-${pick.neighbourhood.id}`}
                    href={`/neighbourhoods/${pick.neighbourhood.id}`}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-5 hover:border-slate-600 transition-colors"
                  >
                    <p className="text-xs uppercase tracking-wide text-emerald-400 mb-2">
                      {pick.label}
                    </p>
                    <h3 className="font-semibold text-white mb-2">
                      {pick.neighbourhood.name}
                    </h3>
                    <p className="text-sm text-slate-300 mb-3">
                      ~{pick.neighbourhood.minutes} min · £
                      {pick.neighbourhood.oneBedRent.toLocaleString()}/mo
                    </p>
                    <p className="text-xs text-slate-500">{pick.reason}</p>
                  </Link>
                ))}
              </div>
              {valueTradeOff && (
                <p className="mt-5 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
                  You could save approximately{" "}
                  <strong className="text-white">
                    £{valueTradeOff.monthlySaving.toLocaleString()}/month
                  </strong>{" "}
                  by choosing {valueTradeOff.cheaperArea.name} instead of{" "}
                  {valueTradeOff.fasterArea.name}
                  {valueTradeOff.extraMinutes > 0
                    ? ` for an estimated ${valueTradeOff.extraMinutes} extra minutes.`
                    : " with no longer commute in this dataset."}
                </p>
              )}
            </section>
          )}

          {/* Top picks */}
          {topPicks.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6">
                Fastest commutes to {destinationLabel}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {topPicks.map((n) => (
                  <Link
                    key={n.id}
                    href={`/neighbourhoods/${n.id}`}
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
                    <p className="mt-3 text-[11px] text-slate-500">
                      {n.sourceLabel}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {commuteCategories.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6">
                Choose by commute priority
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {commuteCategories.map((category) => (
                  <div
                    key={category.label}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-5"
                  >
                    <h3 className="font-semibold text-white">
                      {category.label}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {category.description}
                    </p>
                    <div className="mt-4 space-y-3">
                      {category.neighbourhoods.map((n) => (
                        <Link
                          key={n.id}
                          href={`/neighbourhoods/${n.id}`}
                          className="block rounded-md border border-slate-800 bg-slate-950 px-3 py-2 hover:border-slate-600 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-white">
                              {n.name}
                            </span>
                            <span className="text-xs text-emerald-300 tabular-nums">
                              ~{n.minutes} min
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-400">
                            GBP {n.oneBedRent.toLocaleString()}/mo 1-bed
                          </p>
                        </Link>
                      ))}
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
                        <td className="py-3 font-medium">
                          <Link
                            href={`/neighbourhoods/${n.id}`}
                            className="hover:text-emerald-400 transition-colors"
                          >
                            {n.name}
                          </Link>
                        </td>
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
                          <div className="text-[10px] text-slate-500">
                            {n.sourceLabel}
                          </div>
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

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="font-medium text-white mb-2">
                    {item.question}
                  </h3>
                  <p className="text-slate-300">{item.answer}</p>
                </div>
              ))}
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
