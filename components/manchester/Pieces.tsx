import Link from "next/link";
import { LIFESTYLE_KEYS, LIFESTYLE_LABELS } from "@/lib/types";
import type { LifestyleScores } from "@/lib/types";
import { TRAVEL_BAND_LABELS } from "@/lib/manchester/travel-band";
import type { ManchesterNeighbourhood } from "@/lib/manchester/types";
import { boroughSlug } from "@/lib/manchester/boroughs";
import { manchesterPath } from "@/lib/manchester/seo-data";

/**
 * Small presentational pieces shared by the Manchester pages.
 *
 * Kept together rather than split one-per-file because none of them is
 * more than a few elements, and the Manchester routes are the only
 * consumers. They are all server components — nothing here needs state.
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

export function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>
  );
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

export function BandPill({ neighbourhood }: { neighbourhood: ManchesterNeighbourhood }) {
  return (
    <span className="rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-400">
      {TRAVEL_BAND_LABELS[neighbourhood.travelBand]}
    </span>
  );
}

export function AreaCard({
  neighbourhood: n,
  note,
}: {
  neighbourhood: ManchesterNeighbourhood;
  note?: string;
}) {
  return (
    <Link
      href={manchesterPath(`/neighbourhoods/${n.id}`)}
      className="block rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition-colors hover:border-slate-600"
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-medium">{n.name}</p>
        <p className="shrink-0 text-sm text-slate-400">
          £{n.rent.oneBedMedianGbp.toLocaleString()}
        </p>
      </div>
      <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
        <Link
          href={manchesterPath(`/boroughs/${boroughSlug(n.borough)}`)}
          className="transition-colors hover:text-slate-300"
        >
          {n.borough}
        </Link>
        <BandPill neighbourhood={n} />
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
 * A scrollable table. Every wide block on the Manchester pages goes
 * through this so the page body never scrolls sideways on a phone.
 */
export function ScrollTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-6 overflow-x-auto px-6">
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        {children}
      </table>
    </div>
  );
}

export function DataNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 text-xs leading-relaxed text-slate-500">
      {children}
    </p>
  );
}
