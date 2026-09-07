import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CONTENT_CITY_IDS,
  getCityContent,
  isContentCityId,
} from "@/lib/city-registry";
import { ordinal } from "@/lib/city-content";
import { centralityLabel } from "@/lib/centrality";
import { PERSONALITIES } from "@/lib/personalities";
import { formatApproxMinutes } from "@/lib/format";
import {
  AreaCard,
  CityBreadcrumbs,
  DataNote,
  LifestyleBars,
  PageShell,
  ScrollTable,
  Section,
  TableHead,
} from "@/components/city/Pieces";

type Props = { params: Promise<{ city: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return CONTENT_CITY_IDS.flatMap((city) =>
    getCityContent(city)
      .areaSlugs()
      .map((slug) => ({ city, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, slug } = await params;
  if (!isContentCityId(city)) return {};
  const content = getCityContent(city);
  const n = content.getArea(slug);
  if (!n) return {};

  const title = `Living in ${n.name}: rent, commute and what it is actually like`;
  const description = `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()} a month. ${centralityLabel(n)} ${n.borough}. Commute times, lifestyle scores and the trade-offs, laid out.`;

  return {
    title,
    description,
    alternates: { canonical: content.url(`/neighbourhoods/${slug}`) },
    openGraph: {
      title,
      description,
      url: content.url(`/neighbourhoods/${slug}`),
      type: "article",
    },
  };
}

export default async function CityNeighbourhoodPage({ params }: Props) {
  const { city, slug } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);
  const n = content.getArea(slug);
  if (!n) notFound();

  const { input, copy } = content;
  const region = copy.regionLabel;

  const commutes = content.commuteTimesFor(n);
  const fastest = commutes[0];
  const roomRent = content.roomRentFor(n);
  const { oneBed: regionMedianOneBed, count } = content.rentMedians();
  const vsBaseline = content.rentVsBaseline(n);
  const percentile = content.oneBedPercentile(n.rent.oneBedMedianGbp);
  const similar = content.similarAreas(n);
  const comparisons = content.relatedComparisons(n.id);
  const personalities = content
    .topPersonalities(n)
    .map((key) => PERSONALITIES.find((p) => p.key === key)?.label ?? key);
  const allLines = [...new Set(n.mainStations.flatMap((s) => s.lines))];
  const bandD = input.councilTax.bandD[n.borough];
  const band = centralityLabel(n);

  const vsRegion = n.rent.oneBedMedianGbp - regionMedianOneBed;
  const expensiveAnswer =
    vsRegion === 0
      ? `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()} a month, exactly the median across the ${count} ${region} areas covered here.`
      : vsRegion > 0
        ? `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()} a month — about £${vsRegion.toLocaleString()} above the £${regionMedianOneBed.toLocaleString()} median across the ${count} areas covered here, putting it around the ${ordinal(percentile)} percentile. On rent alone it is a dearer than average place to live in ${region}.`
        : `A one-bed in ${n.name} averages £${n.rent.oneBedMedianGbp.toLocaleString()} a month — about £${Math.abs(vsRegion).toLocaleString()} below the £${regionMedianOneBed.toLocaleString()} median across the ${count} areas covered here, putting it around the ${ordinal(percentile)} percentile. On rent alone it is a cheaper than average place to live in ${region}.`;

  // A 2% gap counts as "level". An area at £1,000 against a baseline of
  // £998 is a rounding artefact, and printing "0% above" reads as broken.
  const baselineAnswer =
    Math.abs(vsBaseline.percent) < 2
      ? `That is effectively level with the ONS average of £${vsBaseline.baseline.toLocaleString()} for ${n.borough} as a whole — ${n.name} sits right on its ${input.councilNoun.singular}'s going rate.`
      : vsBaseline.difference > 0
        ? `That is about ${vsBaseline.percent}% above the ONS average of £${vsBaseline.baseline.toLocaleString()} for ${n.borough} as a whole, which is the premium the area itself commands.`
        : `That is about ${Math.abs(vsBaseline.percent)}% below the ONS average of £${vsBaseline.baseline.toLocaleString()} for ${n.borough} as a whole — ${n.name} is one of the cheaper parts of its ${input.councilNoun.singular}.`;

  // Thresholds sit at 8 and 4 rather than 7 and 4: a 7 is somewhere
  // sociable that still closes at eleven, and calling that "busy and
  // loud" puts the sentence at odds with the area's own summary above.
  const vibe =
    n.lifestyle.livelyVsQuiet >= 8
      ? "busy and loud"
      : n.lifestyle.livelyVsQuiet >= 6
        ? "sociable without being raucous"
        : n.lifestyle.livelyVsQuiet <= 4
          ? "quiet and residential"
          : "a mix of busy and quiet depending which street you are on";

  const whatIsItLike = `${n.name} is ${vibe}, scoring ${n.lifestyle.nightlife}/10 for nightlife, ${n.lifestyle.greenSpace}/10 for green space and ${n.lifestyle.connectivity}/10 for transport. It sits in ${n.borough}, ${band.toLowerCase()} on the travel bands used here, and suits ${personalities.join(" and ").toLowerCase()} renters best.`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: content.city.name, item: content.url("/") },
      { "@type": "ListItem", position: 2, name: "Neighbourhoods", item: content.url("/neighbourhoods") },
      { "@type": "ListItem", position: 3, name: n.name, item: content.url(`/neighbourhoods/${n.id}`) },
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
        acceptedAnswer: {
          "@type": "Answer",
          text: `${expensiveAnswer} ${baselineAnswer}`,
        },
      },
      {
        "@type": "Question",
        name: `How long is the commute from ${n.name} into ${content.city.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: fastest
            ? `The quickest of the ${input.destinations.length} destinations tracked here is ${fastest.label}, at roughly ${fastest.minutes} minutes door to door on a weekday morning.`
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
        <CityBreadcrumbs
          content={content}
          trail={[
            { label: "Neighbourhoods", href: content.path("/neighbourhoods") },
            { label: n.name },
          ]}
        />

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Living in {n.name}
        </h1>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
          <Link
            href={content.councilPath(n.borough)}
            className="transition-colors hover:text-white"
          >
            {n.borough}
          </Link>
          <span aria-hidden="true">·</span>
          <span>{band}</span>
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
            for {input.councilTax.year}. Most housing here sits below Band D,
            so the bill on a typical flat will be lower than that headline —
            check the band for the specific address before you budget against
            it.
          </p>
        </Section>

        <Section
          title="Getting to work"
          lead="Typical door-to-door times on a weekday morning: walking to the stop, waiting, riding, and walking off at the other end."
        >
          <ScrollTable minWidth="28rem">
            <TableHead cells={["Destination", "Typical journey"]} />
            <tbody>
              {commutes.map((c) => (
                <tr key={c.id} className="border-b border-slate-900">
                  <td className="py-2.5 pr-4">
                    <Link
                      href={content.path(`/commute/${c.id}`)}
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
          </ScrollTable>
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

        {n.travelBand && (
          <Section title={`How ${band.toLowerCase()} works`}>
            <p className="max-w-3xl text-slate-300">
              {input.travelBands.descriptions[n.travelBand]}
            </p>
          </Section>
        )}

        {similar.length > 0 && (
          <Section
            title={`If you like ${n.name}`}
            lead="Areas that score similarly on lifestyle and sit in a comparable price bracket."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {similar.map((s) => (
                <AreaCard
                  key={s.area.id}
                  content={content}
                  area={s.area}
                  note={s.reason}
                />
              ))}
            </div>
          </Section>
        )}

        {comparisons.length > 0 && (
          <Section title="Side by side">
            <div className="flex flex-wrap gap-3">
              {comparisons.map((compareSlug) => (
                <Link
                  key={compareSlug}
                  href={content.path(`/compare/${compareSlug}`)}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm capitalize transition-colors hover:border-slate-600"
                >
                  {compareSlug.replace(/-vs-/g, " vs ").replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </Section>
        )}

        <DataNote>
          Rent figures are reviewed market estimates for {n.name}, anchored on
          the ONS average for {n.borough} in {input.rent.referenceMonth} (£
          {vsBaseline.baseline.toLocaleString()} for a one-bed) and adjusted
          for the local premium or discount. Sources:{" "}
          {input.rent.sources.join("; ")}. Journey times are reviewed
          estimates, not timetable times, and no live journey planner sits
          behind them.
        </DataNote>
      </PageShell>
    </>
  );
}
