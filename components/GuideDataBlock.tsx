/**
 * Live data tables embedded inside editorial guides.
 *
 * Guides are hand-written prose, but several of them make claims that are
 * better shown than described — what every borough charges, what each band
 * costs. Rendering those from the same datasets the rest of the site uses
 * means the guide cannot drift out of step with the neighbourhood pages.
 */

import Link from "next/link";
import {
  bandAmounts,
  boroughsByBandD,
  formatPounds,
  medianBandD,
} from "@/lib/council-tax";
import {
  COUNCIL_TAX_YEAR,
  GLA_PRECEPT_BAND_D,
} from "@/lib/data/council-tax";
import {
  boroughSlug,
  londonRentMedians,
  roomRentFor,
  SALARY_LEVELS,
  ukTakeHomeMonthly,
} from "@/lib/seo-data";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import type { GuideSection } from "@/lib/data/guides";

const money = (v: number) => `£${Math.round(v).toLocaleString()}`;

function TableShell({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-sm">{children}</table>
      </div>
      <figcaption className="mt-2 text-xs text-slate-500">{caption}</figcaption>
    </figure>
  );
}

function CouncilTaxBands() {
  // Band amounts are proportional, so any borough demonstrates the ratios.
  // The median borough keeps the illustration representative.
  const median = medianBandD();
  const bands = bandAmounts(median);

  return (
    <TableShell
      caption={`Illustrated at the London median Band D charge of ${money(median)} for ${COUNCIL_TAX_YEAR}. Band ratios are statutory, so the proportions hold in every borough — only the underlying Band D figure changes.`}
    >
      <thead>
        <tr className="border-b border-slate-800 text-left text-slate-400">
          <th className="px-4 py-3 font-medium">Band</th>
          <th className="px-4 py-3 font-medium">1991 property value</th>
          <th className="px-4 py-3 font-medium text-right">Per year</th>
          <th className="px-4 py-3 font-medium text-right">Per month (over 10)</th>
        </tr>
      </thead>
      <tbody>
        {bands.map((b) => (
          <tr
            key={b.band}
            className={
              b.band === "D"
                ? "border-b border-slate-800/50 bg-slate-900/60"
                : "border-b border-slate-800/50"
            }
          >
            <td className="px-4 py-2.5 font-semibold">
              {b.band}
              {b.band === "D" && (
                <span className="ml-2 text-xs font-normal text-emerald-400">
                  reference band
                </span>
              )}
            </td>
            <td className="px-4 py-2.5 text-slate-400">{b.valueRange}</td>
            <td className="px-4 py-2.5 text-right tabular-nums">
              {money(b.annualGbp)}
            </td>
            <td className="px-4 py-2.5 text-right tabular-nums text-slate-300">
              {money(b.monthlyOverTenGbp)}
            </td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

function CouncilTaxBoroughs() {
  const rows = boroughsByBandD();

  return (
    <TableShell
      caption={`Total Band D charge for ${COUNCIL_TAX_YEAR}, including the ${formatPounds(GLA_PRECEPT_BAND_D)} Greater London Authority precept. Confirm the figure with your borough before budgeting against it.`}
    >
      <thead>
        <tr className="border-b border-slate-800 text-left text-slate-400">
          <th className="px-4 py-3 font-medium w-10">#</th>
          <th className="px-4 py-3 font-medium">Borough</th>
          <th className="px-4 py-3 font-medium text-right">Band D / year</th>
          <th className="px-4 py-3 font-medium text-right">Per month (over 10)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.borough} className="border-b border-slate-800/50">
            <td className="px-4 py-2.5 text-slate-500 tabular-nums">{i + 1}</td>
            <td className="px-4 py-2.5 font-medium">
              <Link
                href={`/boroughs/${boroughSlug(row.borough)}`}
                className="hover:text-emerald-400 transition-colors"
              >
                {row.borough}
              </Link>
            </td>
            <td className="px-4 py-2.5 text-right tabular-nums">
              {formatPounds(row.bandDGbp)}
            </td>
            <td className="px-4 py-2.5 text-right tabular-nums text-slate-300">
              {money(row.bandDGbp / 10)}
            </td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

function SalaryLadder() {
  return (
    <TableShell caption="Take-home pay modelled on England and Wales income tax and Class 1 National Insurance, ignoring student loan repayments and pension contributions. Rent budget shown at 35% of take-home.">
      <thead>
        <tr className="border-b border-slate-800 text-left text-slate-400">
          <th className="px-4 py-3 font-medium">Salary</th>
          <th className="px-4 py-3 font-medium text-right">Take-home / month</th>
          <th className="px-4 py-3 font-medium text-right">Rent budget at 35%</th>
          <th className="px-4 py-3 font-medium text-right">See areas</th>
        </tr>
      </thead>
      <tbody>
        {SALARY_LEVELS.map((salary) => {
          const takeHome = ukTakeHomeMonthly(salary);
          return (
            <tr key={salary} className="border-b border-slate-800/50">
              <td className="px-4 py-2.5 font-medium tabular-nums">
                £{salary.toLocaleString()}
              </td>
              <td className="px-4 py-2.5 text-right tabular-nums">
                {money(takeHome)}
              </td>
              <td className="px-4 py-2.5 text-right tabular-nums text-emerald-400">
                {money(takeHome * 0.35)}
              </td>
              <td className="px-4 py-2.5 text-right">
                <Link
                  href={`/salary/${salary}`}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  £{(salary / 1000).toFixed(0)}k →
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableShell>
  );
}

function RentSpread() {
  const medians = londonRentMedians();
  const rooms = NEIGHBOURHOODS.map(roomRentFor).sort((a, b) => a - b);
  const oneBeds = NEIGHBOURHOODS.map((n) => n.rent.oneBedMedianGbp).sort(
    (a, b) => a - b,
  );

  const rows = [
    {
      label: "Room in a house share",
      low: rooms[0],
      median: rooms[Math.floor(rooms.length / 2)],
      high: rooms[rooms.length - 1],
      note: "Usually includes council tax, often bills",
    },
    {
      label: "One-bed flat",
      low: oneBeds[0],
      median: medians.oneBed,
      high: oneBeds[oneBeds.length - 1],
      note: "Bills and council tax on top",
    },
  ];

  return (
    <TableShell
      caption={`Across the ${medians.count} areas this site tracks. Figures are reviewed market estimates for comparing areas, not live listings.`}
    >
      <thead>
        <tr className="border-b border-slate-800 text-left text-slate-400">
          <th className="px-4 py-3 font-medium">Type</th>
          <th className="px-4 py-3 font-medium text-right">Cheapest</th>
          <th className="px-4 py-3 font-medium text-right">Median</th>
          <th className="px-4 py-3 font-medium text-right">Priciest</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label} className="border-b border-slate-800/50">
            <td className="px-4 py-2.5">
              <span className="font-medium">{r.label}</span>
              <span className="block text-xs text-slate-500">{r.note}</span>
            </td>
            <td className="px-4 py-2.5 text-right tabular-nums">
              {money(r.low)}
            </td>
            <td className="px-4 py-2.5 text-right tabular-nums text-emerald-400">
              {money(r.median)}
            </td>
            <td className="px-4 py-2.5 text-right tabular-nums">
              {money(r.high)}
            </td>
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}

export default function GuideDataBlock({
  block,
}: {
  block: NonNullable<GuideSection["dataBlock"]>;
}) {
  switch (block) {
    case "council-tax-bands":
      return <CouncilTaxBands />;
    case "council-tax-boroughs":
      return <CouncilTaxBoroughs />;
    case "salary-ladder":
      return <SalaryLadder />;
    case "rent-spread":
      return <RentSpread />;
  }
}
