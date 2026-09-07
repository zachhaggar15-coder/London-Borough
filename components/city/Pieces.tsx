import Link from "next/link";
import { LIFESTYLE_KEYS, LIFESTYLE_LABELS } from "@/lib/types";
import type { LifestyleScores, Neighbourhood } from "@/lib/types";
import { centralityLabel } from "@/lib/centrality";
import type { CityContent } from "@/lib/city-content";
import { money, moneyWithGbp } from "@/lib/currency";

/**
 * Small presentational pieces shared by every generated city section.
 *
 * These began as Manchester-only components and are now city-agnostic:
 * anything that needs a URL takes the city's CityContent and asks it,
 * rather than importing a city-specific path helper. Nothing here holds
 * state, so they are all server components.
 */

export function Breadcrumbs({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((crumb, index) => (
          <li key={crumb.label} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="transition-colors hover:text-white">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-slate-300">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The city name, then the page trail beneath it. */
export function CityBreadcrumbs({
  content,
  trail,
}: {
  content: CityContent;
  trail: { label: string; href?: string }[];
}) {
  return (
    <Breadcrumbs
      trail={[{ label: content.city.name, href: content.path("/") }, ...trail]}
    />
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>;
}

export function Section({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 border-t border-slate-800 pt-10 first:mt-0 first:border-0 first:pt-0">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {lead && <p className="mt-2 max-w-3xl text-slate-400">{lead}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function BandPill({ area }: { area: Neighbourhood }) {
  return (
    <span className="rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-400">
      {centralityLabel(area)}
    </span>
  );
}

export function AreaCard({
  content,
  area,
  note,
}: {
  content: CityContent;
  area: Neighbourhood;
  note?: string;
}) {
  return (
    <Link
      href={content.path(`/neighbourhoods/${area.id}`)}
      className="block rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-medium">{area.name}</p>
        <p className="shrink-0 text-sm text-slate-400">
          {money(area.rent.oneBedMedianGbp, content.input.currency)}
        </p>
      </div>
      {/*
        The council is plain text, not a link. The whole card is already an
        anchor to the area page, and an <a> inside an <a> is invalid HTML —
        React refuses to hydrate it, which once took out every page that
        renders a card. The council is linked from the area page and the
        council index instead.
      */}
      <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
        <span>{area.borough}</span>
        <BandPill area={area} />
      </p>
      {note && <p className="mt-2 text-sm text-slate-400">{note}</p>}
    </Link>
  );
}

export function LifestyleBars({ scores }: { scores: LifestyleScores }) {
  return (
    <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {LIFESTYLE_KEYS.map((key) => (
        <div key={key} className="flex items-center gap-3">
          <dt className="w-36 shrink-0 text-sm text-slate-400">
            {LIFESTYLE_LABELS[key]}
          </dt>
          <dd className="flex flex-1 items-center gap-3">
            <div
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800"
              role="img"
              aria-label={`${LIFESTYLE_LABELS[key]}: ${scores[key]} out of 10`}
            >
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${scores[key] * 10}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-sm tabular-nums text-slate-300">
              {scores[key]}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * A scrollable table. Every wide block goes through this so the page body
 * never scrolls sideways on a phone.
 */
export function ScrollTable({
  minWidth = "36rem",
  children,
}: {
  minWidth?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="-mx-6 overflow-x-auto px-6">
      <table
        className="w-full border-collapse text-sm"
        style={{ minWidth }}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({ cells }: { cells: string[] }) {
  return (
    <thead>
      <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wide text-slate-500">
        {cells.map((cell) => (
          <th key={cell} scope="col" className="py-2 pr-4 font-medium">
            {cell}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function DataNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 text-xs leading-relaxed text-slate-500">
      {children}
    </p>
  );
}

/**
 * What a household here pays beyond rent.
 *
 * This is the table that replaces council tax for cities that do not
 * levy one on tenants, and supplements it where they do. It exists
 * because the honest answer to "what does living here cost" is different
 * in each country: a Paris tenant pays no residence tax at all, a Geneva
 * one pays more for compulsory health insurance than a Londoner pays in
 * council tax, and a British reader will assume neither.
 */
export function LocalCostsTable({ content }: { content: CityContent }) {
  const costs = content.localCosts;
  if (!costs) return null;
  const currency = content.input.currency;

  return (
    <>
      <ScrollTable minWidth="34rem">
        <TableHead cells={["What", "Per month", "Who pays, and what to know"]} />
        <tbody>
          {costs.rows.map((row) => (
            <tr key={row.label} className="border-b border-slate-900">
              <td className="py-2.5 pr-4 font-medium">{row.label}</td>
              <td className="py-2.5 pr-4 tabular-nums text-slate-300">
                {row.monthly == null ? "Varies" : money(row.monthly, currency)}
              </td>
              <td className="py-2.5 text-slate-400">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </ScrollTable>
      <p className="mt-4 max-w-3xl text-sm text-slate-500">
        Total of the fixed rows above:{" "}
        {moneyWithGbp(
          costs.rows.reduce((sum, row) => sum + (row.monthly ?? 0), 0),
          currency,
        )}{" "}
        a month, on top of rent. Sources: {costs.sources.join("; ")}.
      </p>
    </>
  );
}
