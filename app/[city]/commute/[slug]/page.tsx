import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { money } from "@/lib/currency";
import {
  CONTENT_CITY_IDS,
  getCityContent,
  isContentCityId,
} from "@/lib/city-registry";
import { centralityLabel } from "@/lib/centrality";
import {
  CityBreadcrumbs,
  DataNote,
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
      .commuteSlugs()
      .map((slug) => ({ city, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, slug } = await params;
  if (!isContentCityId(city)) return {};
  const content = getCityContent(city);
  const data = content.getCommutePageData(slug);
  if (!data) return {};

  const { destination, ranked } = data;
  const title = `Best areas for commuting to ${destination.label}`;
  const description = `Where to live if you work at ${destination.label}: ${ranked.length} ${content.copy.regionLabel} areas ranked by journey time, with rents. Quickest is ${ranked[0].area.name} at about ${ranked[0].minutes} minutes.`;

  return {
    title,
    description,
    alternates: { canonical: content.url(`/commute/${slug}`) },
    openGraph: {
      title,
      description,
      url: content.url(`/commute/${slug}`),
      type: "article",
    },
  };
}

export default async function CityCommutePage({ params }: Props) {
  const { city, slug } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);
  const currency = content.input.currency;
  const data = content.getCommutePageData(slug);
  if (!data) notFound();

  const { input, copy } = content;
  const { destination, ranked } = data;
  const others = input.destinations.filter((d) => d.id !== slug);
  const councilNoun =
    input.councilNoun.singular.charAt(0).toUpperCase() +
    input.councilNoun.singular.slice(1);

  const under30 = ranked.filter((r) => r.minutes <= 30);

  // The pick worth making: cheapest area still inside half an hour. A pure
  // journey-time ranking always puts the centre first, which is true and
  // useless — everyone already knows the centre is close to the centre.
  const valuePick = [...under30].sort(
    (a, b) => a.area.rent.oneBedMedianGbp - b.area.rent.oneBedMedianGbp,
  )[0];

  const anyEstimated = ranked.some((r) => !r.reviewed);

  // Driving times where the city models them. The comparison is the whole
  // point on an orbital destination: the rail networks in these regions
  // were built to reach a centre, so the car often wins going round.
  const driveByArea = new Map(
    ranked.map((r) => [r.area.id, content.driveMinutes(r.area, slug)]),
  );
  const anyDrive = [...driveByArea.values()].some((v) => v != null);
  const carWins = ranked.filter((r) => {
    const drive = driveByArea.get(r.area.id);
    return drive != null && drive <= r.minutes - 15;
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: content.city.name, item: content.url("/") },
      { "@type": "ListItem", position: 2, name: "Commute", item: content.url("/commute") },
      {
        "@type": "ListItem",
        position: 3,
        name: destination.label,
        item: content.url(`/commute/${slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageShell>
        <CityBreadcrumbs
          content={content}
          trail={[
            { label: "Commute", href: content.path("/commute") },
            { label: destination.label },
          ]}
        />

        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          Best areas for commuting to {destination.label}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          {ranked.length} {copy.regionLabel} areas ranked by how long it takes
          to reach {destination.label} on a weekday morning, door to door.{" "}
          {under30.length} of them come in at half an hour or under.
          {carWins.length > 0 && (
            <>
              {" "}
              For {carWins.length} of them driving is at least a quarter of an
              hour quicker than the bus or train, which is worth knowing before
              you rule an area out on its public transport alone.
            </>
          )}
          {valuePick && (
            <>
              {" "}
              The one worth a second look is {valuePick.area.name}: about{" "}
              {valuePick.minutes} minutes, at{" "}
              {money(valuePick.area.rent.oneBedMedianGbp, currency)} a month
              for a one-bed — the cheapest area inside that window.
            </>
          )}
        </p>

        <Section
          title="Ranked by journey time"
          lead="Ties are broken by rent, so the cheaper of two equally quick areas comes first."
        >
          <ScrollTable minWidth="38rem">
            <TableHead
              cells={[
                "Area",
                "Public transport",
                ...(anyDrive ? ["Driving"] : []),
                "1-bed",
                councilNoun,
                "Band",
              ]}
            />
            <tbody>
              {ranked.map((row) => (
                <tr
                  key={row.area.id}
                  className="border-b border-slate-900 transition-colors hover:bg-slate-900/60"
                >
                  <td className="py-2.5 pr-4">
                    <Link
                      href={content.path(`/neighbourhoods/${row.area.id}`)}
                      className="font-medium transition-colors hover:text-emerald-400"
                    >
                      {row.area.name}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                    {row.minutes} min
                    {!row.reviewed && (
                      <span className="ml-1 text-xs text-slate-600">est.</span>
                    )}
                  </td>
                  {anyDrive && (
                    <td className="py-2.5 pr-4 tabular-nums text-slate-400">
                      {driveByArea.get(row.area.id) != null
                        ? `${driveByArea.get(row.area.id)} min`
                        : "—"}
                    </td>
                  )}
                  <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                    {money(row.area.rent.oneBedMedianGbp, currency)}
                  </td>
                  <td className="py-2.5 pr-4 text-slate-400">
                    <Link
                      href={content.councilPath(row.area.borough)}
                      className="transition-colors hover:text-slate-200"
                    >
                      {row.area.borough}
                    </Link>
                  </td>
                  <td className="py-2.5 text-xs text-slate-500">
                    {centralityLabel(row.area)}
                  </td>
                </tr>
              ))}
            </tbody>
          </ScrollTable>
        </Section>

        <Section title="Other destinations">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((d) => (
              <Link
                key={d.id}
                href={content.path(`/commute/${d.id}`)}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm transition-colors hover:border-slate-600"
              >
                Commuting to {d.label}
              </Link>
            ))}
          </div>
        </Section>

        <DataNote>
          These are typical weekday-morning door-to-door times including the
          walk at each end and a realistic wait, not timetable times.
          {anyEstimated
            ? " Rows marked “est.” fall back to straight-line distance at an assumed average speed because that pairing is not in the reviewed matrix; treat them as a rough upper bound."
            : " Every figure on this page comes from the reviewed matrix."}{" "}
          They will be wrong for you if you cycle or travel outside the peak.
          Treat a five-minute difference between two areas as noise.
          {anyDrive
            ? " Driving times are modelled rather than reviewed: road distance at a regional peak speed, plus an arrival penalty for traffic and parking at this destination. They assume you have somewhere to park, which in several of these places is the harder problem."
            : ""}
        </DataNote>
      </PageShell>
    </>
  );
}
