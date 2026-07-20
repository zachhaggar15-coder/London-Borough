import TrackedAffiliateLink from "@/components/TrackedAffiliateLink";
import {
  pickTrackingId,
  pickUrl,
  resolveCompareSegment,
  UNIVERSAL_PICKS,
  type ComparePick,
} from "@/lib/compare-affiliates";
import { AMAZON_DISCLOSURE } from "@/lib/monetisation";
import type { Neighbourhood } from "@/lib/types";

type CompareAffiliatePicksProps = {
  a: Neighbourhood;
  b: Neighbourhood;
  className?: string;
};

function PickCard({
  pick,
  location,
}: {
  pick: ComparePick;
  location: string;
}) {
  return (
    <TrackedAffiliateLink
      href={pickUrl(pick)}
      asin={pickTrackingId(pick)}
      location={location}
      productLabel={pick.label}
      className="group rounded-lg border border-slate-800 bg-slate-950/40 p-4 transition-colors hover:border-emerald-700/50"
    >
      <p className="mb-1 text-sm font-medium text-white group-hover:text-emerald-300">
        {pick.label}
      </p>
      <p className="text-xs leading-relaxed text-slate-400">{pick.fit}</p>
    </TrackedAffiliateLink>
  );
}

export default function CompareAffiliatePicks({
  a,
  b,
  className = "mb-10",
}: CompareAffiliatePicksProps) {
  const segment = resolveCompareSegment(a, b);
  const location = `compare:${segment.id}`;

  return (
    <section className={className}>
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold">{segment.heading}</h2>
          <span className="text-[11px] uppercase tracking-wide text-slate-500">
            Affiliate links
          </span>
        </div>

        <p className="mb-4 max-w-2xl text-sm text-slate-400">{segment.intro}</p>

        <div className="grid gap-3 sm:grid-cols-3">
          {segment.picks.map((pick) => (
            <PickCard key={pick.label} pick={pick} location={location} />
          ))}
        </div>

        {/* Section E — shown on every compare page, kept deliberately small. */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-800 pt-4">
          <span className="text-xs text-slate-500">Moving either way:</span>
          {UNIVERSAL_PICKS.map((pick) => (
            <TrackedAffiliateLink
              key={pick.label}
              href={pickUrl(pick)}
              asin={pickTrackingId(pick)}
              location={`${location}:universal`}
              productLabel={pick.label}
              className="text-xs text-slate-300 underline decoration-slate-700 underline-offset-4 transition-colors hover:text-emerald-300 hover:decoration-emerald-600"
            >
              {pick.label}
            </TrackedAffiliateLink>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-slate-600">{AMAZON_DISCLOSURE}</p>
      </div>
    </section>
  );
}
