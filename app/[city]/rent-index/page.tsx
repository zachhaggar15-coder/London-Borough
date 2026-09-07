import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

type Props = { params: Promise<{ city: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return CONTENT_CITY_IDS.map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  if (!isContentCityId(city)) return {};
  const content = getCityContent(city);

  return {
    title: `${content.copy.regionLabel} rent index`,
    description: `Every ${content.copy.regionLabel} area ranked by rent — room, one-bed and two-bed figures for ${content.areas.length} areas.`,
    alternates: { canonical: content.url("/rent-index") },
  };
}

export default async function CityRentIndexPage({ params }: Props) {
  const { city } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);
  const { input, copy } = content;

  const rows = [...content.areas]
    .map((n) => ({ n, room: content.roomRentFor(n) }))
    .sort((a, b) => a.n.rent.oneBedMedianGbp - b.n.rent.oneBedMedianGbp);

  const { oneBed, twoBed, count } = content.rentMedians();
  const cheapest = rows[0];
  const priciest = rows[rows.length - 1];
  const councilHeading =
    input.councilNoun.singular.charAt(0).toUpperCase() +
    input.councilNoun.singular.slice(1);

  return (
    <PageShell>
      <CityBreadcrumbs content={content} trail={[{ label: "Rent index" }]} />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        {copy.regionLabel} rent index
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        All {count} areas ranked by what a one-bed costs, cheapest first. The
        median across the set is £{oneBed.toLocaleString()} a month for a
        one-bed and £{twoBed.toLocaleString()} for a two-bed. The range runs
        from {cheapest.n.name} at £
        {cheapest.n.rent.oneBedMedianGbp.toLocaleString()} to {priciest.n.name}{" "}
        at £{priciest.n.rent.oneBedMedianGbp.toLocaleString()} — a factor of{" "}
        {(
          priciest.n.rent.oneBedMedianGbp / cheapest.n.rent.oneBedMedianGbp
        ).toFixed(1)}{" "}
        across a region you can cross in about an hour.
      </p>

      <Section title="Every area by rent">
        <ScrollTable minWidth="44rem">
          <TableHead
            cells={[
              "Area",
              "Room",
              "1-bed",
              "2-bed",
              councilHeading,
              "Band",
            ]}
          />
          <tbody>
            {rows.map(({ n, room }) => (
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
                <td className="py-2.5 pr-4 tabular-nums text-slate-400">
                  £{room.toLocaleString()}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-200">
                  £{n.rent.oneBedMedianGbp.toLocaleString()}
                </td>
                <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                  £{n.rent.twoBedMedianGbp.toLocaleString()}
                </td>
                <td className="py-2.5 pr-4 text-slate-400">
                  <Link
                    href={content.councilPath(n.borough)}
                    className="transition-colors hover:text-slate-200"
                  >
                    {n.borough}
                  </Link>
                </td>
                <td className="py-2.5 text-xs text-slate-500">
                  {centralityLabel(n)}
                </td>
              </tr>
            ))}
          </tbody>
        </ScrollTable>
      </Section>

      <Section
        title="How rooms are priced"
        lead="Room rents are keyed to postcode district groups rather than derived from the flat figures."
      >
        <div className="max-w-3xl space-y-4 text-slate-300">
          {copy.roomMethod.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            Each area names the district group it is sampled against. The
            groups in use are: {Object.values(input.rent.roomLabels).join("; ")}
            .
          </p>
        </div>
      </Section>

      <DataNote>
        One- and two-bed figures are reviewed market estimates anchored on the
        ONS Price Index of Private Rents {input.councilNoun.singular} averages
        for {input.rent.referenceMonth}, adjusted for each area&apos;s premium
        or discount. Room figures come from visible listing samples, because no
        official series publishes room-level rents. Sources:{" "}
        {input.rent.sources.join("; ")}. Figures are rounded because the method
        does not support more precision than that; use them to narrow a
        shortlist, not to value a specific flat.
      </DataNote>
    </PageShell>
  );
}
