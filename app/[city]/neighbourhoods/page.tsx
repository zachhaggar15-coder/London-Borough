import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CONTENT_CITY_IDS,
  getCityContent,
  isContentCityId,
} from "@/lib/city-registry";
import { TRAVEL_BANDS, TRAVEL_BAND_LABELS } from "@/lib/travel-band";
import {
  CityBreadcrumbs,
  DataNote,
  PageShell,
  ScrollTable,
  Section,
  TableHead,
} from "@/components/city/Pieces";

type Props = { params: Promise<{ city: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return CONTENT_CITY_IDS.map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  if (!isContentCityId(city)) return {};
  const content = getCityContent(city);
  const region = content.copy.regionLabel;

  return {
    title: `Every ${region} neighbourhood, ranked by rent`,
    description: `All ${content.areas.length} ${region} areas with one-bed and two-bed rents, travel band and transport links.`,
    alternates: { canonical: content.url("/neighbourhoods") },
  };
}

export default async function CityNeighbourhoodsPage({ params }: Props) {
  const { city } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);
  const { input, copy } = content;

  const areas = content.areasByBand();
  const { oneBed, twoBed } = content.rentMedians();
  const councilHeading =
    input.councilNoun.singular.charAt(0).toUpperCase() +
    input.councilNoun.singular.slice(1);

  const byBand = TRAVEL_BANDS.map((band) => ({
    band,
    areas: areas.filter((n) => n.travelBand === band),
  })).filter((group) => group.areas.length > 0);

  return (
    <PageShell>
      <CityBreadcrumbs content={content} trail={[{ label: "Neighbourhoods" }]} />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        Every {copy.regionLabel} neighbourhood
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        {areas.length} areas, grouped by how far out they are rather than
        alphabetically — because the first question anyone moving here asks is
        not what a place is called but how long it takes to get to work from
        it. The median one-bed across the set is £{oneBed.toLocaleString()} a
        month and the median two-bed £{twoBed.toLocaleString()}.
      </p>

      {byBand.map(({ band, areas: bandAreas }) => (
        <Section
          key={band}
          title={`${TRAVEL_BAND_LABELS[band]} — ${input.travelBands.distances[band]}`}
          lead={input.travelBands.descriptions[band]}
        >
          <ScrollTable minWidth="34rem">
            <TableHead
              cells={["Area", councilHeading, "1-bed", "2-bed", "Main lines"]}
            />
            <tbody>
              {bandAreas.map((n) => (
                <tr
                  key={n.id}
                  className="border-b border-slate-900 transition-colors hover:bg-slate-900/60"
                >
                  <td className="py-2.5 pr-4">
                    <Link
                      href={content.path(`/neighbourhoods/${n.id}`)}
                      className="font-medium transition-colors hover:text-emerald-400"
                    >
                      {n.name}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4 text-slate-400">
                    <Link
                      href={content.councilPath(n.borough)}
                      className="transition-colors hover:text-slate-200"
                    >
                      {n.borough}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                    £{n.rent.oneBedMedianGbp.toLocaleString()}
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                    £{n.rent.twoBedMedianGbp.toLocaleString()}
                  </td>
                  <td className="py-2.5 text-xs text-slate-500">
                    {[...new Set(n.mainStations.flatMap((s) => s.lines))]
                      .slice(0, 2)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </ScrollTable>
        </Section>
      ))}

      <DataNote>
        Rents are reviewed market estimates anchored on the ONS Price Index of
        Private Rents for {input.rent.referenceMonth}, adjusted for the local
        premium or discount against the {input.councilNoun.singular} average.
        They are rounded because the method does not support more precision
        than that. See the{" "}
        <Link
          href={content.path("/methodology")}
          className="underline underline-offset-2 hover:text-slate-300"
        >
          methodology
        </Link>{" "}
        for how each figure is arrived at.
      </DataNote>
    </PageShell>
  );
}
