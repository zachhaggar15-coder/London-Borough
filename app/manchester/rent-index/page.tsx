import type { Metadata } from "next";
import Link from "next/link";
import {
  manchesterPath,
  manchesterRentMedians,
  manchesterRoomRentFor,
  manchesterUrl,
} from "@/lib/manchester/seo-data";
import { MANCHESTER_NEIGHBOURHOODS } from "@/lib/manchester/data/neighbourhoods";
import { boroughSlug } from "@/lib/manchester/boroughs";
import { TRAVEL_BAND_LABELS } from "@/lib/travel-band";
import {
  MANCHESTER_RENT_SOURCES,
  ONS_RENT_REFERENCE_MONTH,
  ROOM_DISTRICT_LABELS,
} from "@/lib/manchester/data/rent-market";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

export const metadata: Metadata = {
  title: "Greater Manchester rent index",
  description:
    "Every Greater Manchester area ranked by rent — room, one-bed and two-bed figures for 57 areas from Wigan at the bottom to the city centre at the top.",
  alternates: { canonical: manchesterUrl("/rent-index") },
};

export default function ManchesterRentIndexPage() {
  const rows = [...MANCHESTER_NEIGHBOURHOODS]
    .map((n) => ({ n, room: manchesterRoomRentFor(n) }))
    .sort((a, b) => a.n.rent.oneBedMedianGbp - b.n.rent.oneBedMedianGbp);

  const { oneBed, twoBed, count } = manchesterRentMedians();
  const cheapest = rows[0];
  const priciest = rows[rows.length - 1];

  return (
    <PageShell>
      <Breadcrumbs
        trail={[
          { label: "Manchester", href: manchesterPath("/") },
          { label: "Rent index" },
        ]}
      />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        Greater Manchester rent index
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        All {count} areas ranked by what a one-bed costs, cheapest first. The
        median across the set is £{oneBed.toLocaleString()} a month for a
        one-bed and £{twoBed.toLocaleString()} for a two-bed. The range runs
        from {cheapest.n.name} at £
        {cheapest.n.rent.oneBedMedianGbp.toLocaleString()} to{" "}
        {priciest.n.name} at £{priciest.n.rent.oneBedMedianGbp.toLocaleString()}{" "}
        — a factor of {(priciest.n.rent.oneBedMedianGbp / cheapest.n.rent.oneBedMedianGbp).toFixed(1)}{" "}
        across a conurbation you can cross in about an hour.
      </p>

      <Section title="Every area by rent">
        <div className="-mx-6 overflow-x-auto px-6">
          <table className="w-full min-w-[44rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                <th scope="col" className="py-2 pr-4 font-medium">Area</th>
                <th scope="col" className="py-2 pr-4 font-medium">Room</th>
                <th scope="col" className="py-2 pr-4 font-medium">1-bed</th>
                <th scope="col" className="py-2 pr-4 font-medium">2-bed</th>
                <th scope="col" className="py-2 pr-4 font-medium">Borough</th>
                <th scope="col" className="py-2 font-medium">Band</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ n, room }) => (
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
                      href={manchesterPath(`/boroughs/${boroughSlug(n.borough)}`)}
                      className="transition-colors hover:text-slate-200"
                    >
                      {n.borough}
                    </Link>
                  </td>
                  <td className="py-2.5 text-xs text-slate-500">
                    {TRAVEL_BAND_LABELS[n.travelBand]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        title="How rooms are priced"
        lead="Room rents are keyed to postcode district groups rather than derived from the flat figures."
      >
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            No official series publishes room-level rents, so these come from
            visible listing samples. They are keyed to explicit postcode
            district groups rather than to the M prefix as a whole, because
            that prefix covers far too much ground to average: M1 in the city
            centre and M18 in Gorton are eight kilometres and roughly £300 a
            month apart, and a single M figure would describe neither.
          </p>
          <p>
            Instead each area names the district group it is sampled against.
            The groups in use are:{" "}
            {Object.values(ROOM_DISTRICT_LABELS).join("; ")}.
          </p>
        </div>
      </Section>

      <DataNote>
        One- and two-bed figures are reviewed market estimates anchored on the
        ONS Price Index of Private Rents borough averages for{" "}
        {ONS_RENT_REFERENCE_MONTH}, adjusted for each area&apos;s premium or
        discount against its borough. Room figures come from visible listing
        samples, because no official series publishes room-level rents.
        Sources: {MANCHESTER_RENT_SOURCES.join("; ")}. Figures are rounded
        because the method does not support more precision than that; use them
        to narrow a shortlist, not to value a specific flat.
      </DataNote>
    </PageShell>
  );
}
