import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllManchesterSlugs,
  manchesterPath,
  manchesterRentMedians,
  manchesterUrl,
  neighbourhoodsByBand,
} from "@/lib/manchester/seo-data";
import { boroughSlug } from "@/lib/manchester/boroughs";
import {
  TRAVEL_BANDS,
  TRAVEL_BAND_LABELS,
} from "@/lib/travel-band";
import {
  TRAVEL_BAND_DESCRIPTIONS,
  TRAVEL_BAND_DISTANCE_KM,
} from "@/lib/manchester/travel-band";
import { ONS_RENT_REFERENCE_MONTH } from "@/lib/manchester/data/rent-market";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

export const metadata: Metadata = {
  title: "Every Greater Manchester neighbourhood, ranked by rent",
  description:
    "All 57 Greater Manchester areas with one-bed and two-bed rents, travel band and transport links — from the city centre out to Ramsbottom and Wigan.",
  alternates: { canonical: manchesterUrl("/neighbourhoods") },
};

export default function ManchesterNeighbourhoodsPage() {
  const areas = neighbourhoodsByBand();
  const { oneBed, twoBed } = manchesterRentMedians();
  const count = getAllManchesterSlugs().length;

  const byBand = TRAVEL_BANDS.map((band) => ({
    band,
    areas: areas.filter((n) => n.travelBand === band),
  }));

  return (
    <PageShell>
      <Breadcrumbs
        trail={[
          { label: "Manchester", href: manchesterPath("/") },
          { label: "Neighbourhoods" },
        ]}
      />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        Every Greater Manchester neighbourhood
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        {count} areas, grouped by how far out they are rather than
        alphabetically — because the first question anyone moving here asks is
        not what a place is called but how long it takes to get to work from
        it. The median one-bed across the set is £{oneBed.toLocaleString()} a
        month and the median two-bed £{twoBed.toLocaleString()}.
      </p>

      {byBand.map(({ band, areas: bandAreas }) => (
        <Section
          key={band}
          title={`${TRAVEL_BAND_LABELS[band]} — ${TRAVEL_BAND_DISTANCE_KM[band]}`}
          lead={TRAVEL_BAND_DESCRIPTIONS[band]}
        >
          <div className="-mx-6 overflow-x-auto px-6">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th scope="col" className="py-2 pr-4 font-medium">Area</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Borough</th>
                  <th scope="col" className="py-2 pr-4 font-medium">1-bed</th>
                  <th scope="col" className="py-2 pr-4 font-medium">2-bed</th>
                  <th scope="col" className="py-2 font-medium">Main lines</th>
                </tr>
              </thead>
              <tbody>
                {bandAreas.map((n) => (
                  <tr
                    key={n.id}
                    className="border-b border-slate-900 transition-colors hover:bg-slate-900/60"
                  >
                    <td className="py-2.5 pr-4">
                      <Link
                        href={manchesterPath(`/neighbourhoods/${n.id}`)}
                        className="font-medium transition-colors hover:text-emerald-400"
                      >
                        {n.name}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-4 text-slate-400">
                      <Link
                        href={manchesterPath(`/boroughs/${boroughSlug(n.borough)}`)}
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
            </table>
          </div>
        </Section>
      ))}

      <DataNote>
        Rents are reviewed market estimates anchored on the ONS Price Index of
        Private Rents for {ONS_RENT_REFERENCE_MONTH}, adjusted for the local
        premium or discount against the borough average. They are rounded
        because the method does not support more precision than that. See the{" "}
        <Link
          href={manchesterPath("/methodology")}
          className="underline underline-offset-2 hover:text-slate-300"
        >
          methodology
        </Link>{" "}
        for how each figure is arrived at.
      </DataNote>
    </PageShell>
  );
}
