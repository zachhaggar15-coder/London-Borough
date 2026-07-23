import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllNeighbourhoodSlugs,
  getNeighbourhoodPageData,
  boroughSlug,
  londonRentMedians,
  oneBedRentPercentile,
  SITE_URL,
} from "@/lib/seo-data";
import { LIFESTYLE_LABELS, type Neighbourhood } from "@/lib/types";
import {
  RENT_MARKET_REVIEW_AS_OF,
  RENT_MARKET_SOURCES,
} from "@/lib/data/rent-market";
import type { SimilarArea } from "@/lib/similarity";
import { provenanceLabel } from "@/lib/provenance";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllNeighbourhoodSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getNeighbourhoodPageData(slug);
  if (!data) return {};

  const { neighbourhood: n } = data;
  const zoneStr =
    n.transportZones.length > 1
      ? `Zones ${n.transportZones.join("–")}`
      : `Zone ${n.transportZones[0]}`;
  const title = `Living in ${n.name}: rent & is it worth it? (2026)`;
  const description = `Living in ${n.name}? One-bed rent averages £${n.rent.oneBedMedianGbp.toLocaleString()}/month, ${zoneStr}. Is ${n.name} a nice place to live? See transport, lifestyle scores and the verdict.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/neighbourhoods/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/neighbourhoods/${slug}`,
      type: "article",
    },
  };
}

export default async function NeighbourhoodPage({ params }: Props) {
  const { slug } = await params;
  const data = getNeighbourhoodPageData(slug);
  if (!data) notFound();

  const {
    neighbourhood: n,
    commuteTimes,
    bestDestination,
    topPersonalities,
    similarNeighbourhoods,
    similarAreaGroups,
    relatedComparisonSlugs,
  } = data;

  const zoneStr =
    n.transportZones.length > 1
      ? `Zones ${n.transportZones.join(" & ")}`
      : `Zone ${n.transportZones[0]}`;

  const primaryBorough = n.borough.split("/")[0].trim();
  const bSlug = boroughSlug(primaryBorough);

  const allLines = [...new Set(n.mainStations.flatMap((s) => s.lines))];
  const decisionWatchout = getDecisionWatchout(n);

  const lifestyleValues = Object.values(n.lifestyle);
  const avgLifestyle =
    Math.round(
      (lifestyleValues.reduce((sum, v) => sum + v, 0) / lifestyleValues.length) * 10,
    ) / 10;
  const topStrengthsPhrase = n.strengths.slice(0, 2).join(" and ").toLowerCase();
  const primaryTradeoff = n.tradeoffs[0]
    ? n.tradeoffs[0].toLowerCase()
    : "the usual London trade-offs on price and space";
  const niceToLiveAnswer = `Yes — ${n.name} is well-regarded for ${topStrengthsPhrase}. The main trade-off is ${primaryTradeoff}. Average lifestyle scores sit at ${avgLifestyle}/10, and a 1-bed flat costs around £${n.rent.oneBedMedianGbp.toLocaleString()}/month, making it a solid choice for most renters in ${primaryBorough}.`;

  const vibeDescriptor =
    n.lifestyle.livelyVsQuiet >= 7
      ? "a lively, buzzing character"
      : n.lifestyle.livelyVsQuiet <= 4
      ? "a calm, quiet character"
      : "a balanced mix of lively and quiet streets";
  const whoItSuits = topPersonalities[0] ?? "a wide range of renters";
  const whatIsItLikeAnswer = `${n.name} has ${vibeDescriptor}, scoring ${n.lifestyle.nightlife}/10 for nightlife and ${n.lifestyle.greenSpace}/10 for green space. It's particularly well-suited to ${whoItSuits}, and sits in ${zoneStr} of ${n.borough}.`;

  // "Is it expensive?" — rent vs the London-wide median across tracked areas.
  const { oneBed: londonMedianOneBed, count: trackedCount } = londonRentMedians();
  const rentVsMedian = n.rent.oneBedMedianGbp - londonMedianOneBed;
  const expensiveAnswer =
    rentVsMedian === 0
      ? `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()}/month — right on the London-wide median of £${londonMedianOneBed.toLocaleString()} across the ${trackedCount} areas we track. So on rent, ${n.name} is about average for London.`
      : rentVsMedian > 0
      ? `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()}/month — about £${rentVsMedian.toLocaleString()} above the London-wide median of £${londonMedianOneBed.toLocaleString()} (across ${trackedCount} tracked areas). On rent alone, ${n.name} is more expensive than the typical London neighbourhood.`
      : `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()}/month — about £${Math.abs(rentVsMedian).toLocaleString()} below the London-wide median of £${londonMedianOneBed.toLocaleString()} (across ${trackedCount} tracked areas). On rent alone, ${n.name} is cheaper than the typical London neighbourhood.`;

  // "Is it posh?" — stated as a transparent proxy, not an editorial claim.
  const rentPercentile = oneBedRentPercentile(n.rent.oneBedMedianGbp);
  const poshVerdict =
    rentPercentile >= 70 && n.lifestyle.safety >= 7 && n.lifestyle.greenSpace >= 6
      ? `On that basis it reads as an affluent, quieter residential area.`
      : rentPercentile <= 40
      ? `On that basis it reads as more affordable and less exclusive than London's priciest districts.`
      : `On that basis it sits mid-table — comfortable, but not among London's most exclusive addresses.`;
  const poshAnswer = `"Posh" isn't something we measure directly, so as a transparent proxy we combine rent level with a couple of lifestyle scores. ${n.name}'s one-bed rent sits around the ${rentPercentile}th percentile of tracked London areas (higher = pricier), with safety ${n.lifestyle.safety}/10, green space ${n.lifestyle.greenSpace}/10 and nightlife ${n.lifestyle.nightlife}/10. ${poshVerdict}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Neighbourhoods",
        item: `${SITE_URL}/neighbourhoods`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: n.name,
        item: `${SITE_URL}/neighbourhoods/${slug}`,
      },
    ],
  };

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: n.name,
    description: n.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: n.name,
      addressRegion: n.borough,
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: n.centroid.lat,
      longitude: n.centroid.lng,
    },
  };

  // Extra FAQ items rendered below the two intent H2s. Kept as one source so
  // the visible copy and the JSON-LD never drift apart (Google drops FAQ
  // schema whose answer text isn't visible on the page).
  const bankCommute = commuteTimes.find((c) => c.destinationId === "bank");
  const rentAnswer = `The average 1-bedroom flat in ${n.name} costs around £${n.rent.oneBedMedianGbp.toLocaleString()} per month. A 2-bedroom flat costs around £${n.rent.twoBedMedianGbp.toLocaleString()} per month (market review estimate).`;
  const commuteAnswer = bestDestination
    ? `The fastest commute from ${n.name} is to ${bestDestination.destinationLabel} at approximately ${bestDestination.minutes} minutes by public transport.${bankCommute ? ` The commute to Bank/City is around ${bankCommute.minutes} minutes.` : ""}`
    : `${n.name} is in ${zoneStr} and is served by ${n.mainStations[0]?.name ?? "local public transport"}.`;
  const goodPlaceAnswer =
    topPersonalities.length > 0
      ? `${n.name} is in ${n.borough}, ${zoneStr}. It's particularly well-suited to ${topPersonalities[0]}. ${n.tradeoffs[0] ? `The main trade-off is: ${n.tradeoffs[0].toLowerCase()}.` : ""}`
      : `${n.name} is a ${n.borough} neighbourhood in ${zoneStr}. ${n.summary}`;

  const extraFaqItems: { question: string; answer: string }[] = [
    { question: `What is the average rent in ${n.name}?`, answer: rentAnswer },
    ...(bestDestination
      ? [
          {
            question: `How long is the commute from ${n.name}?`,
            answer: commuteAnswer,
          },
        ]
      : []),
    {
      question: `Is ${n.name} a good place to live?`,
      answer: goodPlaceAnswer,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${n.name} a nice place to live?`,
        acceptedAnswer: { "@type": "Answer", text: niceToLiveAnswer },
      },
      {
        "@type": "Question",
        name: `What is ${n.name} like to live in?`,
        acceptedAnswer: { "@type": "Answer", text: whatIsItLikeAnswer },
      },
      {
        "@type": "Question",
        name: `Is ${n.name} expensive?`,
        acceptedAnswer: { "@type": "Answer", text: expensiveAnswer },
      },
      {
        "@type": "Question",
        name: `Is ${n.name} posh?`,
        acceptedAnswer: { "@type": "Answer", text: poshAnswer },
      },
      ...extraFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100">
        {/* Nav */}
        <nav className="border-b border-slate-800 px-6 py-4">
          <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Where in London
            </Link>
            <span>/</span>
            <Link
              href="/neighbourhoods"
              className="hover:text-white transition-colors"
            >
              Neighbourhoods
            </Link>
            <span>/</span>
            <span className="text-slate-200">{n.name}</span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-12">
          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {n.borough}
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {zoneStr}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Living in {n.name}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">{n.summary}</p>
            <p className="mt-4 text-sm text-slate-500 max-w-2xl">
              Rent and commute figures are decision-support estimates, not live
              property listings or guaranteed routes.{" "}
              <Link
                href="/methodology"
                className="text-emerald-300 hover:text-emerald-200"
              >
                Read the methodology.
              </Link>
            </p>
          </header>

          {/* Quick stats */}
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-12">
            {[
              {
                label: "Est. 1-bed rent",
                value: `£${n.rent.oneBedMedianGbp.toLocaleString()}/mo`,
              },
              {
                label: "Est. 2-bed rent",
                value: `£${n.rent.twoBedMedianGbp.toLocaleString()}/mo`,
              },
              { label: "Transport zone", value: zoneStr },
              {
                label: "Fastest estimate",
                value: bestDestination
                  ? `~${bestDestination.minutes} min`
                  : "—",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg bg-slate-900 border border-slate-800 p-4"
              >
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <p className="text-xl font-semibold">{value}</p>
              </div>
            ))}
          </section>

          {/* Data provenance line */}
          <p className="-mt-8 mb-12 text-xs text-slate-500">
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

          {/* Query-matched intent sections */}
          <section className="mb-12 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Is {n.name} a nice place to live?
              </h2>
              <p className="text-slate-300">{niceToLiveAnswer}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">
                What is {n.name} like to live in?
              </h2>
              <p className="text-slate-300">{whatIsItLikeAnswer}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Is {n.name} expensive?
              </h2>
              <p className="text-slate-300">{expensiveAnswer}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">Is {n.name} posh?</h2>
              <p className="text-slate-300">{poshAnswer}</p>
            </div>
          </section>

          {/* Transport */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">
              Transport from {n.name}
            </h2>
            <div className="space-y-3 mb-4">
              {n.mainStations.map((s) => (
                <div
                  key={s.name}
                  className="flex items-start gap-3 rounded-lg bg-slate-900 border border-slate-800 px-4 py-3"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{s.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {s.lines.map((l) => (
                        <span
                          key={l}
                          className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {allLines.length > 0 && (
              <p className="text-sm text-slate-400">
                {n.name} is served by the{" "}
                {allLines.slice(0, -1).join(", ")}
                {allLines.length > 1 ? " and " : ""}
                {allLines[allLines.length - 1]}.
              </p>
            )}
          </section>

          {/* Commute times */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-2">
              Commute times from {n.name}
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Estimated typical commute times to major London destinations by
              public transport. Exact routes and interchange patterns can vary
              by time of day.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-left text-slate-400">
                    <th className="pb-3 font-medium">Destination</th>
                    <th className="pb-3 font-medium text-right">
                      Commute time
                    </th>
                    <th className="pb-3 font-medium text-right hidden sm:table-cell">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commuteTimes.map((c) => (
                    <tr
                      key={c.destinationId}
                      className="border-b border-slate-800/50"
                    >
                      <td className="py-3 font-medium">
                        <Link
                          href={`/commute/${c.destinationId}`}
                          className="hover:text-emerald-400 transition-colors"
                        >
                          {c.destinationLabel}
                        </Link>
                      </td>
                      <td className="py-3 text-right tabular-nums">
                        <span className="text-emerald-400 font-mono">
                          ~{c.minutes} min
                        </span>
                      </td>
                      <td className="py-3 text-right text-slate-500 text-xs hidden sm:table-cell">
                        {c.sourceLabel}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Lifestyle profile */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">
              {n.name} lifestyle profile
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {(
                Object.entries(n.lifestyle) as [
                  keyof typeof LIFESTYLE_LABELS,
                  number,
                ][]
              )
                .sort(([, a], [, b]) => b - a)
                .map(([key, score]) => (
                  <div
                    key={key}
                    className="rounded-lg bg-slate-900 border border-slate-800 p-3"
                  >
                    <p className="text-xs text-slate-400 mb-2">
                      {LIFESTYLE_LABELS[key]}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${score * 10}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium tabular-nums">
                        {score}/10
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Strengths + Tradeoffs */}
          <section className="grid sm:grid-cols-2 gap-6 mb-12">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {n.name} strengths
              </h2>
              <ul className="space-y-2">
                {n.strengths.map((s) => (
                  <li key={s} className="flex gap-2 text-slate-300">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Trade-offs</h2>
              <ul className="space-y-2">
                {n.tradeoffs.map((t) => (
                  <li key={t} className="flex gap-2 text-slate-300">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">
                      →
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-12 rounded-lg bg-slate-900 border border-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Decision guide for {n.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <DecisionCard
                label="Best reason"
                title="Why it makes the shortlist"
                body={n.strengths[0] ?? `${n.name} has a balanced profile.`}
              />
              <DecisionCard
                label="Give up"
                title="The compromise to check"
                body={
                  n.tradeoffs[0] ??
                  "Compare your exact commute and viewing notes before deciding."
                }
              />
              <DecisionCard
                label="Reconsider if"
                title="Where it may fall short"
                body={decisionWatchout}
              />
            </div>
          </section>

          {/* Who it suits */}
          {topPersonalities.length > 0 && (
            <section className="mb-12 rounded-lg bg-slate-900 border border-slate-800 p-6">
              <h2 className="text-xl font-semibold mb-4">
                Who {n.name} suits best
              </h2>
              <ul className="space-y-2">
                {topPersonalities.map((p) => (
                  <li key={p} className="flex gap-2 text-slate-300 capitalize">
                    <span className="text-emerald-400 flex-shrink-0">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {extraFaqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="font-medium text-white mb-2">
                    {item.question}
                  </h3>
                  <p className="text-slate-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Compare with similar */}
          {similarAreaGroups.mostSimilar.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">
                Compare {n.name} with alternatives
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {similarAreaGroups.mostSimilar.map(({ neighbourhood: other }) => {
                  if (!other) return null;
                  return (
                    <Link
                      key={other.id}
                      href={`/neighbourhoods/${other.id}`}
                      className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 hover:border-slate-600 transition-colors"
                    >
                      <p className="font-medium text-sm">
                        {n.name} vs {other.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {other.borough} · £
                        {other.rent.oneBedMedianGbp.toLocaleString()}/mo 1-bed
                      </p>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-5 grid lg:grid-cols-2 gap-5">
                <SimilarGroup
                  title="Cheaper options"
                  items={similarAreaGroups.cheaper}
                  targetName={n.name}
                />
                <SimilarGroup
                  title="Livelier options"
                  items={similarAreaGroups.livelier}
                  targetName={n.name}
                />
                <SimilarGroup
                  title="Quieter options"
                  items={similarAreaGroups.quieter}
                  targetName={n.name}
                />
                <SimilarGroup
                  title="Greener options"
                  items={similarAreaGroups.greener}
                  targetName={n.name}
                />
                <SimilarGroup
                  title="More central options"
                  items={similarAreaGroups.moreCentral}
                  targetName={n.name}
                />
              </div>
            </section>
          )}

          {/* Commuting from this area */}
          {relatedComparisonSlugs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">
                Commuting from {n.name}
              </h2>
              <div className="flex flex-wrap gap-3">
                {relatedComparisonSlugs.map((compSlug, i) => {
                  const other = similarNeighbourhoods[i];
                  if (!other) return null;
                  const pairSlug = compSlug.replace("-vs-", "-to-");
                  return (
                    <Link
                      key={pairSlug}
                      href={`/commute/route/${pairSlug}`}
                      className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors"
                    >
                      {n.name} to {other.name}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Rent guide + borough links */}
          <section className="mb-12 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/rent-guide/${n.id}`}
              className="flex items-center justify-between rounded-lg bg-slate-900 border border-slate-800 px-5 py-4 hover:border-slate-600 transition-colors"
            >
              <div>
                <p className="font-medium">What&apos;s rent worth in {n.name}?</p>
                <p className="text-sm text-slate-400">
                  Room, 1-bed &amp; 2-bed rent guide →
                </p>
              </div>
            </Link>
            <Link
              href={`/boroughs/${bSlug}`}
              className="flex items-center justify-between rounded-lg bg-slate-900 border border-slate-800 px-5 py-4 hover:border-slate-600 transition-colors"
            >
              <div>
                <p className="font-medium">
                  {n.name} is in {primaryBorough}
                </p>
                <p className="text-sm text-slate-400">
                  See all neighbourhoods in this borough →
                </p>
              </div>
            </Link>
          </section>

          <section className="mb-12 rounded-lg bg-slate-900 border border-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-3">
              Data context
            </h2>
            <p className="text-sm text-slate-300">
              Rent estimates use {provenanceLabel(n.rent)}. Commute estimates
              combine reviewed static journey times for common destinations with
              distance-based fallback estimates where no reviewed pair exists.
            </p>
          </section>

          {/* CTA */}
          <section className="rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">
              Find out if {n.name} is right for you
            </h2>
            <p className="text-slate-300 mb-6">
              Enter your commute destination, salary and lifestyle to get a
              personalised neighbourhood ranking that includes {n.name}.
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

function DecisionCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-emerald-300">
        {label}
      </p>
      <h3 className="mt-2 font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{body}</p>
    </div>
  );
}

function SimilarGroup({
  title,
  items,
  targetName,
}: {
  title: string;
  items: SimilarArea[];
  targetName: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-lg bg-slate-900 border border-slate-800 p-4">
      <h3 className="font-semibold text-white mb-3">{title}</h3>
      <div className="space-y-3">
        {items.slice(0, 3).map((item) => (
          <Link
            key={item.neighbourhood.id}
            href={`/neighbourhoods/${item.neighbourhood.id}`}
            className="block rounded-md border border-slate-800 bg-slate-950 px-3 py-3 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-sm text-white">
                  {item.neighbourhood.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {item.neighbourhood.borough} - GBP{" "}
                  {item.neighbourhood.rent.oneBedMedianGbp.toLocaleString()}/mo
                  1-bed
                </p>
              </div>
              <span className="text-xs text-slate-400">
                {Math.round(item.score * 100)}%
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2">{item.reason}</p>
            <p className="text-xs text-emerald-300 mt-2">
              Compare against {targetName}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function getDecisionWatchout(neighbourhood: Neighbourhood): string {
  const { lifestyle } = neighbourhood;

  if (lifestyle.greenSpace <= 5) {
    return "You want parks and open space to be the deciding factor.";
  }
  if (lifestyle.nightlife <= 5 && lifestyle.livelyVsQuiet <= 5) {
    return "You want a strong late-night or high-energy social scene.";
  }
  if (lifestyle.nightlife >= 8 || lifestyle.livelyVsQuiet >= 8) {
    return "You are prioritising very quiet evenings and low street noise.";
  }
  if (lifestyle.connectivity <= 6) {
    return "You need multiple fast routes across London rather than one main line.";
  }
  if (lifestyle.safety <= 6) {
    return "Perceived safety and calm streets are your highest priority.";
  }
  return (
    neighbourhood.tradeoffs[1] ??
    "Your commute test comes out materially worse than nearby alternatives."
  );
}
