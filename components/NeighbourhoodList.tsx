/**
 * NeighbourhoodList — curated shortlist below the inputs.
 *
 * Shows the top-N best-fit neighbourhoods (N is user-controlled via
 * chips in the header — 5 / 10 / 20). The map respects the same N so
 * the canvas doesn't get congested.
 *
 * "Show all matches" expands beyond N up to the full reachable set.
 * Excluded items (outside commute window) live under a separate
 * disclosure.
 */

"use client";

import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { scoreAll } from "@/lib/scoring";
import NeighbourhoodCard from "@/components/NeighbourhoodCard";

const TOP_N_OPTIONS = [5, 10, 20];

export default function NeighbourhoodList() {
  const query = useStore((s) => s.query);
  const commute = useStore((s) => s.commute);
  const selected = useStore((s) => s.selectedNeighbourhoodId);
  const selectNeighbourhood = useStore((s) => s.selectNeighbourhood);
  const topN = useStore((s) => s.topN);
  const setTopN = useStore((s) => s.setTopN);

  const [showAll, setShowAll] = useState(false);

  const scored = useMemo(
    () => scoreAll(NEIGHBOURHOODS, commute, query),
    [commute, query],
  );

  const included = scored.filter((s) => !s.isExcluded);
  const excluded = scored.filter((s) => s.isExcluded);

  const visible = showAll ? included : included.slice(0, topN);
  const hiddenCount = Math.max(0, included.length - topN);

  return (
    <div className="px-5 py-4">
      {/* Header: shortlist size selector */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="text-xs uppercase tracking-wider text-slate-400">
          {included.length === 0
            ? "No matches"
            : showAll
            ? `${included.length} matches`
            : `Top ${Math.min(topN, included.length)} of ${included.length}`}
        </div>
        <div className="flex gap-1">
          {TOP_N_OPTIONS.map((n) => {
            const isActive = topN === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setTopN(n);
                  setShowAll(false);
                }}
                className={[
                  "rounded px-2 py-0.5 text-[11px] font-medium",
                  isActive
                    ? "bg-sky-500/20 text-sky-200 ring-1 ring-sky-500/50"
                    : "text-slate-400 hover:text-white",
                ].join(" ")}
              >
                Top {n}
              </button>
            );
          })}
        </div>
      </div>

      {included.length === 0 ? (
        <div className="rounded-md border border-dashed border-slate-700 px-3 py-4 text-center text-xs text-slate-400">
          No neighbourhoods match these filters. Try increasing your commute
          window or relaxing the budget.
        </div>
      ) : (
        <div className="space-y-2">
          {visible.map((s) => (
            <NeighbourhoodCard
              key={s.neighbourhood.id}
              scored={s}
              isSelected={s.neighbourhood.id === selected}
              onClick={() => selectNeighbourhood(s.neighbourhood.id)}
              allScored={scored}
            />
          ))}
        </div>
      )}

      {/* Show-all toggle for the rest of the included matches */}
      {!showAll && hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-3 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:border-slate-600 hover:text-white"
        >
          Show {hiddenCount} more match{hiddenCount === 1 ? "" : "es"}
        </button>
      )}
      {showAll && included.length > topN && (
        <button
          type="button"
          onClick={() => setShowAll(false)}
          className="mt-3 w-full rounded-md border border-slate-800 px-3 py-2 text-xs text-slate-400 hover:text-slate-200"
        >
          Show top {topN} only
        </button>
      )}

      {/* Excluded — outside the commute window */}
      {excluded.length > 0 && (
        <details className="mt-4 text-xs text-slate-500">
          <summary className="cursor-pointer hover:text-slate-300">
            Hidden ({excluded.length}) — exceeded commute threshold
          </summary>
          <div className="mt-2 space-y-1.5">
            {excluded.map((s) => (
              <NeighbourhoodCard
                key={s.neighbourhood.id}
                scored={s}
                isSelected={s.neighbourhood.id === selected}
                onClick={() => selectNeighbourhood(s.neighbourhood.id)}
                allScored={scored}
                compact
              />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
