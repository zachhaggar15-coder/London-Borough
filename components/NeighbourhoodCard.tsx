/**
 * One row in the ranked list. Renders score, name, borough, commute,
 * and a tiny rent indicator. Compact mode used for the excluded list.
 */

"use client";

import type { ScoredNeighbourhood } from "@/lib/types";
import { gbp } from "@/lib/affordability";
import { commuteRouteSummary } from "@/lib/commute-details";
import { formatApproxMinutes } from "@/lib/format";
import { rentBasisShortLabel } from "@/lib/rent";
import { matchScoreHex, shortlistReason, suitsWho } from "@/lib/scoring";
import { useStore } from "@/lib/store";

type Props = {
  scored: ScoredNeighbourhood;
  isSelected: boolean;
  onClick: () => void;
  compact?: boolean;
};

export default function NeighbourhoodCard({
  scored,
  isSelected,
  onClick,
  compact,
}: Props) {
  const query = useStore((s) => s.query);
  const {
    neighbourhood: n,
    commuteMinutes,
    matchScore,
    isExcluded,
    rentVsBudget,
    selectedRentGbp,
  } = scored;
  const colour = matchScoreHex(matchScore, isExcluded);
  const scoreOutOf10 = Math.round(matchScore * 10 * 10) / 10;
  const reason = shortlistReason(scored, query);
  const suits = suitsWho(n);
  const route = commuteRouteSummary(n, query);

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group block w-full rounded-md border px-3 py-2 text-left transition-colors",
        isSelected
          ? "border-sky-400 bg-slate-800 shadow-[0_0_0_1px_rgba(56,189,248,0.35)]"
          : "border-slate-800 bg-slate-900 hover:border-slate-600 hover:bg-slate-800",
        compact ? "py-1.5" : "",
        isExcluded ? "opacity-60" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        {/* Score chip */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white shadow"
          style={{ backgroundColor: colour }}
        >
          {isExcluded ? "—" : scoreOutOf10.toFixed(1)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <div className="truncate text-sm font-semibold text-slate-100">
              {n.name}
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              {isSelected && (
                <span className="rounded bg-sky-500/15 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-sky-200">
                  Selected
                </span>
              )}
              <div className="text-[10px] uppercase tracking-wider text-slate-500">
                Zone {n.transportZones.join("/")}
              </div>
            </div>
          </div>

          {!compact && (
            <>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-400">
                <span>{formatApproxMinutes(commuteMinutes)}</span>
                <span className="text-slate-600">•</span>
                <span>
                  {gbp(selectedRentGbp)}/mo ({rentBasisShortLabel(query.rentBasis)})
                </span>
                {rentVsBudget != null && (
                  <span
                    className={[
                      "ml-auto rounded px-1.5 py-0.5 text-[10px] font-medium",
                      rentVsBudget <= 1
                        ? "bg-emerald-900/60 text-emerald-200"
                        : rentVsBudget <= 1.2
                        ? "bg-amber-900/60 text-amber-200"
                        : "bg-red-900/60 text-red-200",
                    ].join(" ")}
                  >
                    {rentVsBudget <= 1
                      ? `${Math.round((1 - rentVsBudget) * 100)}% under`
                      : `${Math.round((rentVsBudget - 1) * 100)}% over`}
                  </span>
                )}
              </div>
              {/* Why it's shortlisted */}
              <div className="mt-1.5 text-[11px] leading-snug text-sky-300/90">
                {reason}
              </div>
              <div className="mt-0.5 truncate text-[11px] leading-snug text-slate-400">
                Route: {route.primary} · {route.legs[1]?.instruction ?? route.legs[0]?.instruction}
              </div>
              {/* Key tradeoff — first item from the neighbourhood's tradeoffs.
                  Keeps the decision honest: the card always shows one reason
                  this place might not work. */}
              {n.tradeoffs[0] && (
                <div className="mt-0.5 text-[11px] leading-snug text-amber-300/80">
                  Tradeoff: {n.tradeoffs[0]}
                </div>
              )}
              {/* Who it suits */}
              <div className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-500">
                Suits: {suits}
              </div>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
