import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import {
  boroughSlug,
  comparisonSlugFor,
  getComparePageData,
  getCompareStaticParams,
  isCompareSlug,
  relatedComparisons,
  SITE_URL,
} from "@/lib/seo-data";
import { LIFESTYLE_LABELS } from "@/lib/types";
import {
  RENT_MARKET_REVIEW_AS_OF,
  RENT_MARKET_SOURCES,
} from "@/lib/data/rent-market";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getCompareStaticParams().map((slug) => ({ slug }));
}

// Curated pairs are prerendered; any other slug is resolved on demand so that
// a non-canonical ordering (e.g. `streatham-vs-walthamstow` when the canonical
// page is `walthamstow-vs-streatham`) 308-redirects to the canonical URL
// instead of 404ing. Non-curated pairs still 404.
export const dynamicParams = true;

/** Resolve a slug to its canonical curated form, or null if it isn't one. */
function canonicalCompareSlug(slug: string): string | null {
  const data = getComparePageData(slug);
  if (!data) return null;
  const canonical = comparisonSlugFor(data.a.id, data.b.id);
  return isCompareSlug(canonical) ? canonical : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparePageData(slug);
  if (!data) return {};

  const { a, b } = data;
  // Point canonical/OG at the canonical URL even when reached via a reversed slug.
  const canonicalSlug = canonicalCompareSlug(slug) ?? slug;
  const title = `${a.name} vs ${b.name} (2026): rent, transport & lifestyle`;
  const description = `${a.name} vs ${b.name} (2026): one-bed rents £${a.rent.oneBedMedianGbp.toLocaleString()} vs £${b.rent.oneBedMedianGbp.toLocaleString()}/mo, plus transport, green space, nightlife and safety compared — and who each area suits.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/compare/${canonicalSlug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/compare/${canonicalSlug}`,
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

function primaryBoroughName(borough: string): string {
  return borough.split("/")[0].trim();
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const data = getComparePageData(slug);
  if (!data) notFound();

  // Canonicalise ordering: a non-curated pair 404s; a reversed ordering of a
  // curated pair 308-redirects to the canonical URL.
  const canonicalSlug = canonicalCompareSlug(slug);
  if (!canonicalSlug) notFound();
  if (canonicalSlug !== slug) permanentRedirect(`/compare/${canonicalSlug}`);

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

  const related = relatedComparisons(a.id, 5)
    .filter((s) => s !== slug)
    .slice(0, 4);
  const relatedData = related
    .map((s) => getComparePageData(s))
    .filter(Boolean);
  const exploreAreas = relatedData
    .map((item) => (item!.a.id === a.id ? item!.b : item!.a))
    .filter((n, i, arr) => arr.findIndex((x) => x.id === n.id) === i);
  const aBorough = primaryBoroughName(a.borough);
  const bBorough = primaryBoroughName(b.borough);
  const rentSummary =
    rentDiff === 0
      ? `${a.name} and ${b.name} have similar average 1-bed rents.`
      : rentDiff > 0
      ? `${a.name} is cheaper by about £${Math.abs(rentDiff).toLocaleString()} per month.`
      : `${b.name} is cheaper by about £${Math.abs(rentDiff).toLocaleString()} per month.`;
  const lifestyleArea = lifestyleWinner === a.id ? a.name : b.name;
  const transportWinner =
    connectivityWinner === a.id ? a.name : b.name;
  const greenSpaceWinner = greenWinner === a.id ? a.name : b.name;
  const nightlifeArea = nightlifeWinner === a.id ? a.name : b.name;
  const safetyArea = safetyWinner === a.id ? a.name : b.name;

  // ── Data-driven copy (unique per pair, no fabricated numbers) ──────
  const rentGap = Math.abs(rentDiff);
  const cheaperN = rentWinner === a.id ? a : b;
  const dearerN = rentWinner === a.id ? b : a;

  const zoneLabel = (n: typeof a): string =>
    n.transportZones.length > 1
      ? `Zones ${n.transportZones.join(" & ")}`
      : `Zone ${n.transportZones[0]}`;

  const linesFor = (n: typeof a): string[] => [
    ...new Set(n.mainStations.flatMap((s) => s.lines)),
  ];
  const stationsFor = (n: typeof a): string[] =>
    n.mainStations.map((s) => s.name);
  const listWords = (items: string[]): string =>
    items.length <= 1
      ? items.join("")
      : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

  // Dimension where each area most out-scores the other → "who suits" copy.
  const CONTRAST_DIMS: [keyof typeof LIFESTYLE_LABELS, string][] = [
    ["connectivity", "fast transport"],
    ["nightlife", "nightlife"],
    ["greenSpace", "green space"],
    ["safety", "a safer, quieter feel"],
    ["foodScene", "its food scene"],
    ["youngProfessionalDensity", "a young professional crowd"],
  ];
  const edgeFor = (
    x: typeof a,
    y: typeof a,
  ): string => {
    let best = CONTRAST_DIMS[0];
    let bestGap = -Infinity;
    for (const dim of CONTRAST_DIMS) {
      const gap = x.lifestyle[dim[0]] - y.lifestyle[dim[0]];
      if (gap > bestGap) {
        bestGap = gap;
        best = dim;
      }
    }
    return best[1];
  };
  const aEdge = edgeFor(a, b);
  const bEdge = edgeFor(b, a);

  // Winner sentence — collapses when one area leads several dimensions so the
  // copy doesn't repeat the same name three times.
  const dimSweep =
    transportWinner === greenSpaceWinner && greenSpaceWinner === nightlifeArea;
  const winnerSentence = dimSweep
    ? `${transportWinner} leads on transport, green space and nightlife`
    : `${transportWinner} has the stronger transport score, ${greenSpaceWinner} the better green space and ${nightlifeArea} the livelier nights`;

  // Unique intro — structure varies by whether rents diverge.
  const introParagraph =
    rentGap >= 100
      ? `Choosing between ${a.name} and ${b.name} usually comes down to rent versus lifestyle. ${cheaperN.name} is the cheaper of the two, with a one-bed averaging about £${rentGap.toLocaleString()}/month less. ${winnerSentence}. ${a.name} leans towards ${aEdge}, while ${b.name} is stronger on ${bEdge}. In short, ${overallRecommendation}`
      : `${a.name} and ${b.name} sit at almost the same price — within £${rentGap.toLocaleString()}/month on a one-bed — so the choice is really about character. ${winnerSentence}. ${a.name} leans towards ${aEdge}, whereas ${b.name} is stronger on ${bEdge}. ${overallRecommendation}`;

  // Largest lifestyle gap → dynamic "which is better for X" question.
  const QUESTION_DIMS: [keyof typeof LIFESTYLE_LABELS, string][] = [
    ["connectivity", "transport"],
    ["nightlife", "nightlife"],
    ["greenSpace", "green space"],
    ["safety", "safety"],
  ];
  let bestDim = QUESTION_DIMS[0];
  let bestDimGap = -1;
  for (const dim of QUESTION_DIMS) {
    const gap = Math.abs(a.lifestyle[dim[0]] - b.lifestyle[dim[0]]);
    if (gap > bestDimGap) {
      bestDimGap = gap;
      bestDim = dim;
    }
  }
  const dimKey = bestDim[0];
  const dimLabel = bestDim[1];
  const dimWinner = a.lifestyle[dimKey] >= b.lifestyle[dimKey] ? a : b;
  const dimLoser = a.lifestyle[dimKey] >= b.lifestyle[dimKey] ? b : a;

  // Single source of truth for FAQ — visible copy and JSON-LD stay in sync.
  const faqItems: { question: string; answer: string }[] = [
    {
      question: `Is ${a.name} or ${b.name} cheaper to rent?`,
      answer:
        rentDiff === 0
          ? `${a.name} and ${b.name} have near-identical average rents — about £${a.rent.oneBedMedianGbp.toLocaleString()}/month for a one-bed flat in both.`
          : `${cheaperN.name} is cheaper. A one-bed flat averages £${cheaperN.rent.oneBedMedianGbp.toLocaleString()}/month in ${cheaperN.name} versus £${dearerN.rent.oneBedMedianGbp.toLocaleString()}/month in ${dearerN.name} — a difference of about £${rentGap.toLocaleString()}/month.`,
    },
    {
      question: `Which is better for ${dimLabel}, ${a.name} or ${b.name}?`,
      answer:
        a.lifestyle[dimKey] === b.lifestyle[dimKey]
          ? `${a.name} and ${b.name} score the same for ${dimLabel} (${a.lifestyle[dimKey]}/10 each in the area model).`
          : `${dimWinner.name} scores higher for ${dimLabel} — ${dimWinner.lifestyle[dimKey]}/10 versus ${dimLoser.lifestyle[dimKey]}/10 for ${dimLoser.name} in the area model.`,
    },
    {
      question: `Should I live in ${a.name} or ${b.name}?`,
      answer: `${overallRecommendation} Pick ${a.name} for ${aEdge}, or ${b.name} for ${bEdge}.`,
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
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
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
            <Link href="/compare" className="hover:text-white transition-colors">
              Compare
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
            <p className="text-lg text-slate-300 max-w-2xl">{introParagraph}</p>
          </header>

          {/* Living in A and B — prominent links into the full area guides */}
          <section className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { neighbourhood: a, borough: aBorough },
              { neighbourhood: b, borough: bBorough },
            ].map(({ neighbourhood, borough }) => (
              <Link
                key={neighbourhood.id}
                href={`/neighbourhoods/${neighbourhood.id}`}
                className="block rounded-lg bg-slate-900 border border-slate-800 p-5 hover:border-emerald-700/60 transition-colors"
              >
                <p className="text-xs text-slate-400 mb-2">
                  {borough} · Zone{neighbourhood.transportZones.length > 1 ? "s" : ""}{" "}
                  {neighbourhood.transportZones.join("/")}
                </p>
                <p className="font-semibold text-emerald-400">
                  Living in {neighbourhood.name} — full area guide
                </p>
                <p className="text-sm text-slate-300 mt-2">
                  {neighbourhood.summary}
                </p>
              </Link>
            ))}
          </section>

          {/* Recommendation callout */}
          <section className="mb-10 rounded-lg border border-emerald-700/40 bg-emerald-950/30 p-5">
            <p className="text-sm text-emerald-400 font-medium mb-1">
              Quick verdict
            </p>
            <p className="text-white mb-4">{overallRecommendation}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Rent", rentSummary],
                ["Transport", `${transportWinner} has the stronger transport score.`],
                ["Lifestyle", `${lifestyleArea} has the stronger overall lifestyle profile.`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg bg-slate-950/50 border border-emerald-700/20 p-3"
                >
                  <p className="text-xs text-emerald-300 mb-1">{label}</p>
                  <p className="text-sm text-slate-200">{value}</p>
                </div>
              ))}
            </div>
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
                      <Link
                        href={`/neighbourhoods/${n.id}`}
                        className="hover:text-emerald-300 transition-colors"
                      >
                        {n.name}
                      </Link>
                      <Winner isWinner={n.id === rentWinner} />
                    </h3>
                    <Link
                      href={`/boroughs/${boroughSlug(
                        primaryBoroughName(n.borough),
                      )}`}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      {n.borough}
                    </Link>
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
            <p className="mt-2 text-xs text-slate-500">
              Rent data as of{" "}
              <time dateTime={RENT_MARKET_REVIEW_AS_OF}>
                {RENT_MARKET_REVIEW_AS_OF}
              </time>
              , sourced from {RENT_MARKET_SOURCES[1]}.{" "}
              <Link
                href="/methodology"
                className="text-slate-400 hover:text-white underline transition-colors"
              >
                Methodology
              </Link>
              .
            </p>
          </section>

          {/* How they compare on transport */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">
              How they compare on transport
            </h2>
            <p className="text-slate-300">
              {a.name} sits in {zoneLabel(a)} and is served by{" "}
              {listWords(stationsFor(a))}
              {linesFor(a).length > 0
                ? `, giving access to the ${listWords(linesFor(a))} ${
                    linesFor(a).length > 1 ? "lines" : "line"
                  }`
                : ""}
              . {b.name} sits in {zoneLabel(b)} and is served by{" "}
              {listWords(stationsFor(b))}
              {linesFor(b).length > 0
                ? `, giving access to the ${listWords(linesFor(b))} ${
                    linesFor(b).length > 1 ? "lines" : "line"
                  }`
                : ""}
              .{" "}
              {a.lifestyle.connectivity === b.lifestyle.connectivity
                ? `Both score ${a.lifestyle.connectivity}/10 for overall connectivity in the area model.`
                : `${transportWinner} has the higher overall connectivity score of the two (${Math.max(
                    a.lifestyle.connectivity,
                    b.lifestyle.connectivity,
                  )}/10 vs ${Math.min(
                    a.lifestyle.connectivity,
                    b.lifestyle.connectivity,
                  )}/10).`}
            </p>
          </section>

          {/* Borough guide links */}
          <section className="flex flex-wrap gap-3 mb-10">
            {[...new Set([aBorough, bBorough])].map((borough) => (
              <Link
                key={borough}
                href={`/boroughs/${boroughSlug(borough)}`}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                {borough} borough guide
              </Link>
            ))}
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

          <section className="mb-10 rounded-lg bg-slate-900 border border-slate-800 p-5">
            <h2 className="text-xl font-semibold mb-4">
              Which area suits which priorities?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-medium text-white mb-2">
                  Choose {a.name} if...
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {a.strengths.slice(0, 3).map((strength) => (
                    <li key={strength} className="flex gap-2">
                      <span className="text-emerald-400">-</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">
                  Choose {b.name} if...
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {b.strengths.slice(0, 3).map((strength) => (
                    <li key={strength} className="flex gap-2">
                      <span className="text-emerald-400">-</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-400">
              For green space, {greenSpaceWinner} scores better. For nightlife,
              {nightlifeArea} has the edge. On safety, {safetyArea} scores
              higher in the current model.
            </p>
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

          {/* Related comparisons */}
          {relatedData.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">
                Compare {a.name} with similar areas
              </h2>
              <div className="flex flex-wrap gap-3">
                {relatedData.map((item) => {
                  if (!item) return null;
                  return (
                    <Link
                      key={item.slug}
                      href={`/compare/${item.slug}`}
                      className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors capitalize"
                    >
                      {item.a.name} vs {item.b.name}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Explore these areas — sends equity into the neighbourhood pages */}
          {exploreAreas.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">
                Explore these areas
              </h2>
              <div className="flex flex-wrap gap-3">
                {exploreAreas.map((n) => (
                  <Link
                    key={n.id}
                    href={`/neighbourhoods/${n.id}`}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-emerald-700/60 transition-colors"
                  >
                    Living in {n.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mb-12 rounded-lg bg-slate-900 border border-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-3">
              Data sources and review date
            </h2>
            <p className="text-sm text-slate-300 mb-4">
              This comparison uses the same area model as the discovery tool.
              Rent data was last reviewed on{" "}
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
          </section>

          {/* CTA */}
          <section className="rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Still deciding? Try the discovery tool
            </h2>
            <p className="text-slate-300 mb-6">
              Enter your commute, salary and lifestyle preferences to get a
              personalised neighbourhood ranking.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-block rounded-lg bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-medium transition-colors"
              >
                Open the discovery tool →
              </Link>
              <Link
                href="/compare"
                className="inline-block rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-300 hover:text-white transition-colors"
              >
                More comparisons
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
