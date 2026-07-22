import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  boroughSlug,
  getCommutePairPageData,
  getCommutePairStaticParams,
  SITE_URL,
} from "@/lib/seo-data";
import type { Neighbourhood } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getCommutePairStaticParams().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getCommutePairPageData(slug);
  if (!data) return {};

  const { a, b, minutes } = data;
  const title = `${a.name} to ${b.name} commute: time & route (2026)`;
  const description = `How long is the commute from ${a.name} to ${b.name}? Roughly ${minutes} minutes by public transport. Compare zones, lines, rent and nearby areas.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/commute/route/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/commute/route/${slug}`,
      type: "article",
    },
  };
}

function zoneLabel(n: Neighbourhood): string {
  return n.transportZones.length > 1
    ? `Zones ${n.transportZones.join(" & ")}`
    : `Zone ${n.transportZones[0]}`;
}

function linesFor(n: Neighbourhood): string[] {
  return [...new Set(n.mainStations.flatMap((s) => s.lines))];
}

function stationsFor(n: Neighbourhood): string[] {
  return n.mainStations.map((s) => s.name);
}

function listWords(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export default async function CommutePairPage({ params }: Props) {
  const { slug } = await params;
  const data = getCommutePairPageData(slug);
  if (!data) notFound();

  const { a, b, minutes, distanceKm, sharedLines, compareSlug, relatedPairSlugs } =
    data;

  const cheaper =
    a.rent.oneBedMedianGbp <= b.rent.oneBedMedianGbp ? a : b;
  const dearer = cheaper.id === a.id ? b : a;
  const rentGap = Math.abs(
    a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp,
  );

  const routeSentence =
    sharedLines.length > 0
      ? `Both areas sit on the ${listWords(sharedLines)} ${
          sharedLines.length > 1 ? "lines" : "line"
        }, so the trip can often be made without changing.`
      : `${a.name} and ${b.name} are not on a shared line, so the quickest route usually involves at least one change.`;

  // Single source for the FAQ so visible copy and JSON-LD stay in sync.
  const faqItems: { question: string; answer: string }[] = [
    {
      question: `How long is the commute from ${a.name} to ${b.name}?`,
      answer: `The journey from ${a.name} to ${b.name} is roughly ${minutes} minutes by public transport (a straight-line estimate over about ${distanceKm.toFixed(
        1,
      )} km — journeys with interchanges can take longer). ${routeSentence}`,
    },
    {
      question: `What is the fastest route from ${a.name} to ${b.name}?`,
      answer:
        sharedLines.length > 0
          ? `${a.name} (${zoneLabel(a)}) is served by ${listWords(
              stationsFor(a),
            )} and ${b.name} (${zoneLabel(b)}) by ${listWords(
              stationsFor(b),
            )}. Both connect via the ${listWords(sharedLines)} ${
              sharedLines.length > 1 ? "lines" : "line"
            }, usually the quickest option.`
          : `${a.name} (${zoneLabel(a)}) is served by ${listWords(
              stationsFor(a),
            )} and ${b.name} (${zoneLabel(b)}) by ${listWords(
              stationsFor(b),
            )}. With no shared line, expect at least one interchange en route.`,
    },
    {
      question: `Is it cheaper to live in ${a.name} or ${b.name}?`,
      answer:
        rentGap === 0
          ? `${a.name} and ${b.name} have near-identical average rents — about £${a.rent.oneBedMedianGbp.toLocaleString()}/month for a one-bed flat in both.`
          : `${cheaper.name} is cheaper — a one-bed averages £${cheaper.rent.oneBedMedianGbp.toLocaleString()}/month versus £${dearer.rent.oneBedMedianGbp.toLocaleString()}/month in ${dearer.name}, a difference of about £${rentGap.toLocaleString()}/month.`,
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
        name: `${a.name} to ${b.name}`,
        item: `${SITE_URL}/commute/route/${slug}`,
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
            <Link href="/commute" className="hover:text-white transition-colors">
              Commute
            </Link>
            <span>/</span>
            <span className="text-slate-200">
              {a.name} to {b.name}
            </span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {a.name} to {b.name}: commute time &amp; route
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              The trip from {a.name} to {b.name} takes roughly{" "}
              <strong className="text-white">{minutes} minutes</strong> by
              public transport. {routeSentence} Below: the lines and zones for
              each area, how rents compare, and full guides for both.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Commute time is a straight-line estimate over about{" "}
              {distanceKm.toFixed(1)} km using an average transit speed — real
              journeys with interchanges may take longer.
            </p>
          </header>

          {/* Route & stations */}
          <section className="mb-12 grid sm:grid-cols-2 gap-4">
            {[a, b].map((n) => (
              <div
                key={n.id}
                className="rounded-lg bg-slate-900 border border-slate-800 p-5"
              >
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-semibold">
                    <Link
                      href={`/neighbourhoods/${n.id}`}
                      className="hover:text-emerald-300 transition-colors"
                    >
                      {n.name}
                    </Link>
                  </h2>
                  <span className="text-xs text-slate-400">{zoneLabel(n)}</span>
                </div>
                <p className="text-sm text-slate-400 mb-3">
                  Served by {listWords(stationsFor(n))}.
                </p>
                <div className="flex flex-wrap gap-1">
                  {linesFor(n).map((l) => (
                    <span
                      key={l}
                      className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded"
                    >
                      {l}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  One-bed rent about £
                  {n.rent.oneBedMedianGbp.toLocaleString()}/month.
                </p>
              </div>
            ))}
          </section>

          {/* Read next — full guides + comparison */}
          <section className="mb-12 flex flex-wrap gap-3">
            <Link
              href={`/neighbourhoods/${a.id}`}
              className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium transition-colors"
            >
              Living in {a.name}
            </Link>
            <Link
              href={`/neighbourhoods/${b.id}`}
              className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium transition-colors"
            >
              Living in {b.name}
            </Link>
            <Link
              href={`/compare/${compareSlug}`}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              {a.name} vs {b.name} compared
            </Link>
            <Link
              href={`/boroughs/${boroughSlug(a.borough.split("/")[0].trim())}`}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              {a.borough.split("/")[0].trim()} borough guide
            </Link>
          </section>

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

          {/* Related routes */}
          {relatedPairSlugs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Related routes</h2>
              <div className="flex flex-wrap gap-3">
                {relatedPairSlugs.map((pairSlug) => {
                  const rel = getCommutePairPageData(pairSlug);
                  if (!rel) return null;
                  return (
                    <Link
                      key={pairSlug}
                      href={`/commute/route/${pairSlug}`}
                      className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors"
                    >
                      {rel.a.name} to {rel.b.name}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Comparing areas for a move?
            </h2>
            <p className="text-slate-300 mb-6">
              Enter your workplace, salary and lifestyle to rank every London
              neighbourhood by commute, budget and fit.
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
