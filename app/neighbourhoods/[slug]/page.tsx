import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBoroughSlugs,
  getAllNeighbourhoodSlugs,
  getCommutePairPageData,
  getNeighbourhoodPageData,
  boroughSlug,
  londonRentMedians,
  lifestyleStanding,
  roomRentFor,
  SITE_URL,
} from "@/lib/seo-data";
import { LIFESTYLE_LABELS } from "@/lib/types";
import {
  RENT_MARKET_REVIEW_AS_OF,
  RENT_MARKET_SOURCE_DETAILS,
  RENT_MARKET_SOURCES,
} from "@/lib/data/rent-market";
import { provenanceLabel } from "@/lib/provenance";
import { CONTENT_YEAR } from "@/lib/site-config";
import { councilTaxForBorough, formatPounds } from "@/lib/council-tax";
import { COUNCIL_TAX_YEAR } from "@/lib/data/council-tax";
import { zonesOf } from "@/lib/centrality";
import { COMMUTE_MODEL_REVIEW_AS_OF } from "@/lib/commute-details";

type Props = { params: Promise<{ slug: string }> };

const SEARCH_INTENT_TITLES: Record<string, string> = {
  archway: `Living in Archway: rent, Tube & area guide (${CONTENT_YEAR})`,
  bermondsey: `Living in Bermondsey: rent, commute & area guide (${CONTENT_YEAR})`,
  chiswick: `Living in Chiswick: rent, transport & area guide (${CONTENT_YEAR})`,
  putney: `Living in Putney: rent, transport & area guide (${CONTENT_YEAR})`,
};

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
    zonesOf(n).length > 1
      ? `Zones ${zonesOf(n).join("–")}`
      : `Zone ${zonesOf(n)[0]}`;
  const title =
    SEARCH_INTENT_TITLES[slug] ??
    `Living in ${n.name}: rent, transport & area guide (${CONTENT_YEAR})`;
  const description = `What living in ${n.name} is actually like: one-bed rent around £${n.rent.oneBedMedianGbp.toLocaleString()}/month, ${zoneStr}, commute times, council tax and the trade-offs.`;

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
    similarAreaGroups,
    relatedComparisonSlugs,
  } = data;

  const zoneStr =
    zonesOf(n).length > 1
      ? `Zones ${zonesOf(n).join(" & ")}`
      : `Zone ${zonesOf(n)[0]}`;

  const primaryBorough = n.borough.split("/")[0].trim();
  const bSlug = boroughSlug(primaryBorough);
  // The City of London is not one of the 32 borough pages.
  const hasBoroughPage = getAllBoroughSlugs().includes(bSlug);
  const allLines = [...new Set(n.mainStations.flatMap((s) => s.lines))];

  // Typical room-in-a-share cost, so the page answers the sharer's budget
  // question alongside the one- and two-bed figures.
  const roomRent = roomRentFor(n);

  // "Is it expensive?" — rent vs the London-wide median across tracked areas.
  const { oneBed: londonMedianOneBed, count: trackedCount } = londonRentMedians();
  const rentVsMedian = n.rent.oneBedMedianGbp - londonMedianOneBed;
  const expensiveAnswer =
    rentVsMedian === 0
      ? `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()}/month — right on the London-wide median of £${londonMedianOneBed.toLocaleString()} across the ${trackedCount} areas we track. So on rent, ${n.name} is about average for London.`
      : rentVsMedian > 0
      ? `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()}/month — about £${rentVsMedian.toLocaleString()} above the London-wide median of £${londonMedianOneBed.toLocaleString()} (across ${trackedCount} tracked areas). On rent alone, ${n.name} is more expensive than the typical London neighbourhood.`
      : `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()}/month — about £${Math.abs(rentVsMedian).toLocaleString()} below the London-wide median of £${londonMedianOneBed.toLocaleString()} (across ${trackedCount} tracked areas). On rent alone, ${n.name} is cheaper than the typical London neighbourhood.`;

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
  const rentAnswer = `The average 1-bedroom flat in ${n.name} costs around £${n.rent.oneBedMedianGbp.toLocaleString()} per month and a 2-bedroom around £${n.rent.twoBedMedianGbp.toLocaleString()} per month. If you are sharing, a room in a shared flat runs about £${roomRent.toLocaleString()} per month (market review estimates).`;
  const commuteAnswer = bestDestination
    ? `The fastest commute from ${n.name} is to ${bestDestination.destinationLabel} at approximately ${bestDestination.minutes} minutes by public transport.${bankCommute ? ` The commute to Bank/City is around ${bankCommute.minutes} minutes.` : ""}`
    : `${n.name} is in ${zoneStr} and is served by ${n.mainStations[0]?.name ?? "local public transport"}.`;
  // Safety is one of the highest-volume questions asked about any London
  // area. We answer it from our own composite lifestyle score and say so
  // plainly — this is a curated review score, not police recorded-crime
  // data, and the copy must not imply otherwise.
  const safetyStanding = lifestyleStanding("safety", n.lifestyle.safety);
  const safetyBand =
    n.lifestyle.safety >= 8
      ? "which is among the areas that review most consistently well on this"
      : n.lifestyle.safety >= 7
        ? "which is a little above the middle of that range"
        : n.lifestyle.safety >= 6
          ? "which is around the middle of that range"
          : "which is at the lower end of that range";
  const safetyCaveat = n.tradeoffs.find((t) =>
    /night|edgy|safe|crime/i.test(t),
  );
  const safetyAnswer = `${n.name} scores ${n.lifestyle.safety} out of 10 on our safety measure. Across the ${safetyStanding.total} London areas we track that measure runs from ${safetyStanding.min} to ${safetyStanding.max}, ${safetyBand}: ${safetyStanding.higher} of the areas we cover score higher. That score is a curated review of how an area is generally regarded, not police recorded-crime data, so treat it as a starting point rather than a verdict. ${safetyCaveat ? `The caveat most often raised about ${n.name} is: ${safetyCaveat.toLowerCase()}.` : `Like anywhere in London it varies street by street, and feels different at 11pm than at 11am.`} For official figures, check the Metropolitan Police crime map for the specific postcode, and walk the route from the station to any flat you are considering after dark before you sign.`;

  const boroughTax = councilTaxForBorough(n.borough.split("/")[0].trim());
  const councilTaxAnswer = boroughTax
    ? `${n.name} is in ${boroughTax.borough}, where council tax is ${formatPounds(boroughTax.bandDGbp)} a year at Band D for ${COUNCIL_TAX_YEAR} — about £${boroughTax.bands[3].monthlyOverTenGbp} a month over the usual 10 instalments. That ranks ${boroughTax.rank} of ${boroughTax.totalRanked} London boroughs from cheapest to most expensive. A room in a house share here usually includes it; a flat on your own tenancy will not. Living alone, you can claim a 25% single-person discount.`
    : null;

  const extraFaqItems: { question: string; answer: string }[] = [
    { question: `What is the average rent in ${n.name}?`, answer: rentAnswer },
    ...(councilTaxAnswer
      ? [
          {
            question: `How much is council tax in ${n.name}?`,
            answer: councilTaxAnswer,
          },
        ]
      : []),
    ...(bestDestination
      ? [
          {
            question: `How long is the commute from ${n.name}?`,
            answer: commuteAnswer,
          },
        ]
      : []),
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${n.name} expensive?`,
        acceptedAnswer: { "@type": "Answer", text: expensiveAnswer },
      },
      {
        "@type": "Question",
        name: `Is ${n.name} safe?`,
        acceptedAnswer: { "@type": "Answer", text: safetyAnswer },
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
        <nav className="border-b border-slate-800 px-4 py-4 sm:px-6">
          <div className="mx-auto flex max-w-5xl min-w-0 flex-wrap items-center gap-2 text-sm text-slate-400">
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
            <span className="min-w-0 break-words text-slate-200">{n.name}</span>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
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
            <h1 className="mb-4 break-words text-3xl font-bold tracking-tight sm:text-4xl">
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
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-5 mb-12">
            {[
              {
                label: "Est. room in a share",
                value: `£${roomRent.toLocaleString()}/mo`,
              },
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

          {/*
            The written profile is the part of this page that is not derived
            from the dataset — the reason it exists as a page at all. The two
            questions below it are computed, and say so.
          */}
          {n.profile && n.profile.length > 0 && (
            <section className="mb-12 max-w-3xl">
              <h2 className="text-xl font-semibold mb-3">
                What living in {n.name} is like
              </h2>
              <div className="space-y-4">
                {n.profile.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-slate-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          )}

          <section className="mb-12 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Is {n.name} expensive?
              </h2>
              <p className="text-slate-300">{expensiveAnswer}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">Is {n.name} safe?</h2>
              <p className="text-slate-300">{safetyAnswer}</p>
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

          {/* Similar areas — one block, not five overlapping ones. */}
          {similarAreaGroups.mostSimilar.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">
                Similar areas to {n.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {similarAreaGroups.mostSimilar.map(({ neighbourhood: other, reason }) => (
                  <Link
                    key={other.id}
                    href={`/neighbourhoods/${other.id}`}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 hover:border-slate-600 transition-colors"
                  >
                    <p className="font-medium text-sm">{other.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {other.borough} · £
                      {other.rent.oneBedMedianGbp.toLocaleString()}/mo 1-bed
                    </p>
                    <p className="text-xs text-slate-300 mt-2">{reason}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Travel from this area to the curated comparison pairs. Points at
              /compare, which now carries the journey-time content that used to
              live on the separate (and near-duplicate) /commute/route pages. */}
          {relatedComparisonSlugs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">
                Getting from {n.name} to nearby areas
              </h2>
              <div className="flex flex-wrap gap-3">
                {relatedComparisonSlugs.map((compSlug) => {
                  const pairData = getCommutePairPageData(
                    compSlug.replace("-vs-", "-to-"),
                  );
                  if (!pairData) return null;
                  const other =
                    pairData.a.id === n.id ? pairData.b : pairData.a;
                  return (
                    <Link
                      key={compSlug}
                      href={`/compare/${compSlug}`}
                      className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors"
                    >
                      {n.name} to {other.name}
                      <span className="ml-2 text-slate-400 tabular-nums">
                        ~{pairData.minutes} min
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Borough link */}
          {hasBoroughPage && (
            <section className="mb-12 grid gap-3 sm:grid-cols-2">
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
          )}

          <section className="mb-12 rounded-lg bg-slate-900 border border-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-3">
              Data context
            </h2>
            <p className="text-sm text-slate-300">
              Rent estimates use {provenanceLabel(n.rent)}. Commute estimates
              combine reviewed static journey times for common destinations with
              distance-based fallback estimates where no reviewed pair exists.
              The commute method was last audited on{" "}
              <time dateTime={COMMUTE_MODEL_REVIEW_AS_OF}>{COMMUTE_MODEL_REVIEW_AS_OF}</time>.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-400">
              {RENT_MARKET_SOURCE_DETAILS.map((source) => (
                <li key={source.label}>
                  <a
                    href={source.url}
                    target={source.url.startsWith("http") ? "_blank" : undefined}
                    rel={source.url.startsWith("http") ? "noopener noreferrer nofollow" : undefined}
                    className="underline decoration-slate-700 underline-offset-2 hover:text-white"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://tfl.gov.uk/plan-a-journey/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-3 inline-block text-xs text-sky-300 underline underline-offset-2 hover:text-sky-100"
            >
              Verify an exact journey with TfL
            </a>
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
              href={`/?source=neighbourhood&compare=${n.id}#finder`}
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
