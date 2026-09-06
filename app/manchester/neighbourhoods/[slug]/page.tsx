import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  commuteTimesFor,
  getAllManchesterSlugs,
  getManchesterNeighbourhood,
  manchesterPath,
  manchesterRentMedians,
  manchesterRoomRentFor,
  manchesterUrl,
  oneBedRentPercentile,
  ordinal,
  relatedManchesterComparisons,
  rentVsBoroughBaseline,
  similarManchesterAreas,
  topPersonalitiesFor,
} from "@/lib/manchester/seo-data";
import { boroughSlug } from "@/lib/manchester/boroughs";
import {
  TRAVEL_BAND_LABELS,
} from "@/lib/travel-band";
import {
  TRAVEL_BAND_DESCRIPTIONS,
} from "@/lib/manchester/travel-band";
import {
  MANCHESTER_RENT_SOURCES,
  ONS_RENT_REFERENCE_MONTH,
} from "@/lib/manchester/data/rent-market";
import {
  BAND_D_BY_BOROUGH,
  MANCHESTER_COUNCIL_TAX_YEAR,
} from "@/lib/manchester/data/council-tax";
import { PERSONALITIES } from "@/lib/personalities";
import { formatApproxMinutes } from "@/lib/format";
import {
  AreaCard,
  Breadcrumbs,
  DataNote,
  LifestyleBars,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllManchesterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = getManchesterNeighbourhood(slug);
  if (!n) return {};

  const title = `Living in ${n.name}: rent, commute and what it is actually like`;
  const description = `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()} a month. ${TRAVEL_BAND_LABELS[n.travelBand]} ${n.borough}. Commute times, lifestyle scores and the trade-offs, laid out.`;

  return {
    title,
    description,
    alternates: { canonical: manchesterUrl(`/neighbourhoods/${slug}`) },
    openGraph: {
      title,
      description,
      url: manchesterUrl(`/neighbourhoods/${slug}`),
      type: "article",
    },
  };
}

export default async function ManchesterNeighbourhoodPage({ params }: Props) {
  const { slug } = await params;
  const n = getManchesterNeighbourhood(slug);
  if (!n) notFound();

  const commutes = commuteTimesFor(n);
  const fastest = commutes[0];
  const roomRent = manchesterRoomRentFor(n);
  const { oneBed: gmMedianOneBed, count } = manchesterRentMedians();
  const vsBaseline = rentVsBoroughBaseline(n);
  const percentile = oneBedRentPercentile(n.rent.oneBedMedianGbp);
  const similar = similarManchesterAreas(n);
  const comparisons = relatedManchesterComparisons(n.id);
  const personalities = topPersonalitiesFor(n).map(
    (key) => PERSONALITIES.find((p) => p.key === key)?.label ?? key,
  );
  const allLines = [...new Set(n.mainStations.flatMap((s) => s.lines))];
  const bandD = BAND_D_BY_BOROUGH[n.borough];

  const vsGm = n.rent.oneBedMedianGbp - gmMedianOneBed;
  const expensiveAnswer =
    vsGm === 0
      ? `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()} a month, exactly the median across the ${count} Greater Manchester areas covered here.`
      : vsGm > 0
        ? `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()} a month — about £${vsGm.toLocaleString()} above the £${gmMedianOneBed.toLocaleString()} median across the ${count} areas covered here, putting it around the ${ordinal(percentile)} percentile. On rent alone it is a dearer than average place to live in Greater Manchester.`
        : `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()} a month — about £${Math.abs(vsGm).toLocaleString()} below the £${gmMedianOneBed.toLocaleString()} median across the ${count} areas covered here, putting it around the ${ordinal(percentile)} percentile. On rent alone it is a cheaper than average place to live in Greater Manchester.`;

  // A 2% band counts as "level". Chorlton's £1,000 against Manchester's
  // £998 is a rounding artefact, and printing "0% above" reads as broken.
  const baselineAnswer =
    Math.abs(vsBaseline.percent) < 2
      ? `That is effectively level with the ONS average of £${vsBaseline.baseline.toLocaleString()} for ${n.borough} as a whole — ${n.name} sits right on its borough's going rate.`
      : vsBaseline.difference > 0
        ? `That is about ${vsBaseline.percent}% above the ONS average of £${vsBaseline.baseline.toLocaleString()} for ${n.borough} as a whole, which is the premium the area itself commands over its borough.`
        : `That is about ${Math.abs(vsBaseline.percent)}% below the ONS average of £${vsBaseline.baseline.toLocaleString()} for ${n.borough} as a whole — ${n.name} is one of the cheaper parts of its borough.`;

  // Thresholds sit at 8 and 4 rather than 7 and 4: a 7 is Chorlton, which
  // is sociable but closes at eleven, and calling it "busy and loud" put
  // the sentence at odds with the area's own summary two paragraphs up.
  const vibe =
    n.lifestyle.livelyVsQuiet >= 8
      ? "busy and loud"
      : n.lifestyle.livelyVsQuiet >= 6
        ? "sociable without being raucous"
        : n.lifestyle.livelyVsQuiet <= 4
          ? "quiet and residential"
          : "a mix of busy and quiet depending which street you are on";

  const whatIsItLike = `${n.name} is ${vibe}, scoring ${n.lifestyle.nightlife}/10 for nightlife, ${n.lifestyle.greenSpace}/10 for green space and ${n.lifestyle.connectivity}/10 for transport. It sits in ${n.borough}, ${TRAVEL_BAND_LABELS[n.travelBand].toLowerCase()} on the travel bands used here, and suits ${personalities.join(" and ").toLowerCase()} renters best.`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Manchester", item: manchesterUrl("/") },
      { "@type": "ListItem", position: 2, name: "Neighbourhoods", item: manchesterUrl("/neighbourhoods") },
      { "@type": "ListItem", position: 3, name: n.name, item: manchesterUrl(`/neighbourhoods/${n.id}`) },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${n.name} like to live in?`,
        acceptedAnswer: { "@type": "Answer", text: whatIsItLike },
      },
      {
        "@type": "Question",
        name: `Is ${n.name} expensive?`,
        acceptedAnswer: { "@type": "Answer", text: `${expensiveAnswer} ${baselineAnswer}` },
      },
      {
        "@type": "Question",
        name: `How long is the commute from ${n.name} into Manchester?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: fastest
            ? `The quickest of the ten destinations tracked here is ${fastest.label}, at roughly ${fastest.minutes} minutes door to door on a weekday morning. Manchester Piccadilly is about ${commutes.find((c) => c.id === "piccadilly")?.minutes ?? fastest.minutes} minutes.`
            : "No reviewed commute estimate is available for this area.",
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

      <PageShell>
        <Breadcrumbs
          trail={[
            { label: "Manchester", href: manchesterPath("/") },
            { label: "Neighbourhoods", href: manchesterPath("/neighbourhoods") },
            { label: n.name },
          ]}
        />

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Living in {n.name}
        </h1>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
          <Link
            href={manchesterPath(`/boroughs/${boroughSlug(n.borough)}`)}
            className="transition-colors hover:text-white"
          >
            {n.borough}
          </Link>
          <span aria-hidden="true">·</span>
          <span>{TRAVEL_BAND_LABELS[n.travelBand]}</span>
          <span aria-hidden="true">·</span>
          <span>{allLines.slice(0, 3).join(", ")}</span>
        </p>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200">
          {n.summary}
        </p>

        <Section title="What it costs">
          <dl className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Room in a share", value: roomRent },
              { label: "One-bed flat", value: n.rent.oneBedMedianGbp },
              { label: "Two-bed flat", value: n.rent.twoBedMedianGbp },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3"
              >
                <dt className="text-xs uppercase tracking-wide text-slate-500">
                  {row.label}
                </dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums">
                  £{row.value.toLocaleString()}
                  <span className="ml-1 text-sm font-normal text-slate-500">
                    /month
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 max-w-3xl text-slate-300">
            {expensiveAnswer} {baselineAnswer}
          </p>
          <p className="mt-3 max-w-3xl text-slate-300">
            Council tax in {n.borough} is £{bandD.toLocaleString()} at Band D
            for {MANCHESTER_COUNCIL_TAX_YEAR}, including the Greater Manchester
            Mayoral precept. Most housing in the borough sits below Band D, so
            the bill on a typical flat will be lower than that headline —
            check the band for the specific address before you budget against
            it.
          </p>
        </Section>

        <Section
          title="Getting to work"
          lead="Typical door-to-door times on a weekday morning: walking to the stop, waiting, riding, and walking off at the other end."
        >
          <div className="-mx-6 overflow-x-auto px-6">
            <table className="w-full min-w-[28rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th scope="col" className="py-2 pr-4 font-medium">Destination</th>
                  <th scope="col" className="py-2 font-medium">Typical journey</th>
                </tr>
              </thead>
              <tbody>
                {commutes.map((c) => (
                  <tr key={c.id} className="border-b border-slate-900">
                    <td className="py-2.5 pr-4">
                      <Link
                        href={manchesterPath(`/commute/${c.id}`)}
                        className="transition-colors hover:text-emerald-400"
                      >
                        {c.label}
                      </Link>
                    </td>
                    <td className="py-2.5 tabular-nums text-slate-300">
                      {formatApproxMinutes(c.minutes)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-3xl text-slate-300">
            Stations and stops: {n.mainStations.map((s) => s.name).join(", ")}.
            Lines: {allLines.join(", ")}.
          </p>
        </Section>

        <Section title="What you get and what you give up">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-400">
                In its favour
              </h3>
              <ul className="space-y-2 text-slate-300">
                {n.strengths.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span aria-hidden="true" className="text-emerald-500">+</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-400">
                Against it
              </h3>
              <ul className="space-y-2 text-slate-300">
                {n.tradeoffs.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span aria-hidden="true" className="text-amber-500">−</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section
          title="Lifestyle scores"
          lead="Ten measures, each 0–10 and comparable across every area covered here."
        >
          <LifestyleBars scores={n.lifestyle} />
          <p className="mt-6 max-w-3xl text-slate-300">{whatIsItLike}</p>
        </Section>

        <Section
          title={`How ${TRAVEL_BAND_LABELS[n.travelBand].toLowerCase()} works`}
        >
          <p className="max-w-3xl text-slate-300">
            {TRAVEL_BAND_DESCRIPTIONS[n.travelBand]}
          </p>
        </Section>

        {similar.length > 0 && (
          <Section
            title={`If you like ${n.name}`}
            lead="Areas that score similarly on lifestyle and sit in a comparable price bracket."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {similar.map((s) => (
                <AreaCard
                  key={s.neighbourhood.id}
                  neighbourhood={s.neighbourhood}
                  note={s.reason}
                />
              ))}
            </div>
          </Section>
        )}

        {comparisons.length > 0 && (
          <Section title="Side by side">
            <div className="flex flex-wrap gap-3">
              {comparisons.map((slug) => (
                <Link
                  key={slug}
                  href={manchesterPath(`/compare/${slug}`)}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm capitalize transition-colors hover:border-slate-600"
                >
                  {slug.replace(/-vs-/g, " vs ").replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </Section>
        )}

        <DataNote>
          Rent figures are reviewed market estimates for {n.name}, anchored on
          the ONS average for {n.borough} in {ONS_RENT_REFERENCE_MONTH} (
          £{vsBaseline.baseline.toLocaleString()} for a one-bed) and adjusted
          for the local premium or discount. Sources:{" "}
          {MANCHESTER_RENT_SOURCES.join("; ")}. Journey times are reviewed
          estimates, not timetable times, and no live journey planner sits
          behind them.
        </DataNote>
      </PageShell>
    </>
  );
}
