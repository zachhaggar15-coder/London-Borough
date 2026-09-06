import type { Metadata } from "next";
import Link from "next/link";
import { manchesterPath, manchesterUrl, neighbourhoodsInBorough } from "@/lib/manchester/seo-data";
import { GM_BOROUGHS, boroughSlug } from "@/lib/manchester/boroughs";
import {
  ONS_BOROUGH_RENT_GBP,
  ONS_RENT_REFERENCE_MONTH,
} from "@/lib/manchester/data/rent-market";
import {
  BAND_D_BY_BOROUGH,
  GM_MAYORAL_PRECEPT_BAND_D,
  MANCHESTER_COUNCIL_TAX_YEAR,
} from "@/lib/manchester/data/council-tax";
import {
  Breadcrumbs,
  DataNote,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

export const metadata: Metadata = {
  title: "The ten Greater Manchester boroughs compared",
  description:
    "Rent and council tax across all ten Greater Manchester boroughs — Bolton, Bury, Manchester, Oldham, Rochdale, Salford, Stockport, Tameside, Trafford and Wigan.",
  alternates: { canonical: manchesterUrl("/boroughs") },
};

export default function ManchesterBoroughsPage() {
  const rows = GM_BOROUGHS.map((borough) => ({
    borough,
    oneBed: ONS_BOROUGH_RENT_GBP[borough].oneBed,
    twoBed: ONS_BOROUGH_RENT_GBP[borough].twoBed,
    bandD: BAND_D_BY_BOROUGH[borough],
    areas: neighbourhoodsInBorough(borough).length,
  })).sort((a, b) => a.oneBed - b.oneBed);

  const cheapestRent = rows[0];
  const priciestRent = rows[rows.length - 1];
  const byTax = [...rows].sort((a, b) => a.bandD - b.bandD);

  return (
    <PageShell>
      <Breadcrumbs
        trail={[
          { label: "Manchester", href: manchesterPath("/") },
          { label: "Boroughs" },
        ]}
      />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        The ten Greater Manchester boroughs
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        Greater Manchester is ten metropolitan boroughs, and the city of
        Manchester is one of them rather than a container for the other nine —
        a distinction almost every guide written from outside the region gets
        wrong. What follows is what each one costs to rent in and what each one
        charges in council tax, which are the two numbers that most often
        decide the question.
      </p>

      <Section
        title="Rent and council tax, side by side"
        lead="Sorted cheapest to rent in. Rent figures are the published ONS averages for the borough as a whole; individual areas inside each borough vary widely."
      >
        <div className="-mx-6 overflow-x-auto px-6">
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
                <th scope="col" className="py-2 pr-4 font-medium">Borough</th>
                <th scope="col" className="py-2 pr-4 font-medium">1-bed (ONS)</th>
                <th scope="col" className="py-2 pr-4 font-medium">2-bed (ONS)</th>
                <th scope="col" className="py-2 pr-4 font-medium">Band D</th>
                <th scope="col" className="py-2 font-medium">Areas covered</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.borough}
                  className="border-b border-slate-900 transition-colors hover:bg-slate-900/60"
                >
                  <td className="py-2.5 pr-4">
                    <Link
                      href={manchesterPath(`/boroughs/${boroughSlug(row.borough)}`)}
                      className="font-medium transition-colors hover:text-emerald-400"
                    >
                      {row.borough}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                    £{row.oneBed.toLocaleString()}
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                    £{row.twoBed.toLocaleString()}
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                    £{row.bandD.toLocaleString()}
                  </td>
                  <td className="py-2.5 tabular-nums text-slate-500">{row.areas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="What the table shows">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            Rent varies by nearly a factor of two across the conurbation.{" "}
            {priciestRent.borough} averages £
            {priciestRent.oneBed.toLocaleString()} for a one-bed against £
            {cheapestRent.oneBed.toLocaleString()} in {cheapestRent.borough} — a
            gap of £{(priciestRent.oneBed - cheapestRent.oneBed).toLocaleString()} a
            month across an area you can cross in under an hour.
          </p>
          <p>
            Council tax does not follow rent. {byTax[byTax.length - 1].borough}{" "}
            charges the most at Band D (£
            {byTax[byTax.length - 1].bandD.toLocaleString()}) despite sitting
            mid-table on rent, while {byTax[0].borough} is cheapest on both. If
            you are weighing two boroughs with similar rents, the council tax
            difference can run to several hundred pounds a year and is worth
            checking before you sign.
          </p>
          <p>
            Every one of the ten sits above £2,150 at Band D, and the spread
            between the cheapest and dearest is over £460 a year. Band D is
            also a high reference point for the region: most housing here sits
            in bands A to C, so the bill on a typical flat comes in
            meaningfully below the headline figures above.
          </p>
        </div>
      </Section>

      <DataNote>
        Rent figures are ONS Price Index of Private Rents averages for{" "}
        {ONS_RENT_REFERENCE_MONTH}. Council tax figures are the total Band D
        charge for {MANCHESTER_COUNCIL_TAX_YEAR}, comprising the borough
        element plus the Greater Manchester Mayoral precept of £
        {GM_MAYORAL_PRECEPT_BAND_D.toLocaleString()}, cross-checked against two
        independent published comparison tables. They exclude parish and town
        council precepts, which apply in a handful of places — Saddleworth in
        Oldham most notably — and add a small amount where they do. Most
        housing in Greater Manchester sits below Band D, so a typical bill will
        be lower than the figures above.
      </DataNote>
    </PageShell>
  );
}
