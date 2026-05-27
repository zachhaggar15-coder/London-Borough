"use client";

import { useMemo } from "react";
import { gbp } from "@/lib/affordability";
import { NEIGHBOURHOODS_BY_ID } from "@/lib/data/neighbourhoods";
import { formatApproxMinutes } from "@/lib/format";
import { rentBasisShortLabel } from "@/lib/rent";
import { scoreNeighbourhood } from "@/lib/scoring";
import { useStore } from "@/lib/store";
import type { ScoredNeighbourhood } from "@/lib/types";
import DataQualityBadge from "@/components/DataQualityBadge";

export default function ShortlistPanel() {
  const ids = useStore((s) => s.shortlistedNeighbourhoodIds);
  const removeFromShortlist = useStore((s) => s.removeFromShortlist);
  const clearShortlist = useStore((s) => s.clearShortlist);
  const selectNeighbourhood = useStore((s) => s.selectNeighbourhood);
  const selectedId = useStore((s) => s.selectedNeighbourhoodId);
  const query = useStore((s) => s.query);
  const commute = useStore((s) => s.commute);

  const scored = useMemo(
    () =>
      ids
        .map((id) => {
          const n = NEIGHBOURHOODS_BY_ID[id];
          return n ? scoreNeighbourhood(n, commute[n.id] ?? null, query) : null;
        })
        .filter((item): item is ScoredNeighbourhood => item != null),
    [ids, commute, query],
  );

  if (scored.length === 0) {
    return (
      <div className="border-t border-slate-800 px-5 py-4">
        <div className="text-xs uppercase tracking-wider text-slate-400">
          Compare
        </div>
        <div className="mt-2 rounded-md border border-dashed border-slate-800 px-3 py-3 text-xs text-slate-500">
          Open an area and use Add to compare to keep candidates side by side.
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-800 px-5 py-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="text-xs uppercase tracking-wider text-slate-400">
          Compare ({scored.length}/4)
        </div>
        <button
          type="button"
          onClick={clearShortlist}
          className="text-[11px] text-slate-500 hover:text-slate-200"
        >
          Clear
        </button>
      </div>

      <div className="space-y-1.5">
        {scored.map((s) => (
          <div
            key={s.neighbourhood.id}
            className={[
              "rounded-md border bg-slate-900/70 px-3 py-2",
              selectedId === s.neighbourhood.id
                ? "border-sky-500"
                : "border-slate-800",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-2">
              <button
                type="button"
                onClick={() => selectNeighbourhood(s.neighbourhood.id)}
                className="min-w-0 text-left"
              >
                <div className="truncate text-sm font-medium text-slate-100">
                  {s.neighbourhood.name}
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {formatApproxMinutes(s.commuteMinutes)} -{" "}
                  {gbp(s.selectedRentGbp)}/mo -{" "}
                  {(s.matchScore * 10).toFixed(1)}/10
                </div>
              </button>
              <button
                type="button"
                onClick={() => removeFromShortlist(s.neighbourhood.id)}
                className="shrink-0 text-xs text-slate-500 hover:text-slate-200"
                aria-label={`Remove ${s.neighbourhood.name} from compare`}
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>

      {scored.length >= 2 && (
        <div className="mt-4 rounded-md border border-slate-800 bg-slate-950/60 p-3">
          <div className="mb-2 text-[11px] uppercase tracking-wider text-slate-500">
            Side by side
          </div>
          <div className="overflow-x-auto">
            <div
              className="grid min-w-[560px] gap-2 text-xs"
              style={{
                gridTemplateColumns: `repeat(${scored.length}, minmax(130px, 1fr))`,
              }}
            >
              {scored.map((s) => (
                <button
                  key={s.neighbourhood.id}
                  type="button"
                  onClick={() => selectNeighbourhood(s.neighbourhood.id)}
                  className="min-w-0 rounded-md border border-slate-800 bg-slate-900/70 p-2 text-left hover:border-slate-600"
                >
                  <div className="truncate font-medium text-slate-200">
                    {s.neighbourhood.name}
                  </div>
                  <div className="mt-1 space-y-1 text-slate-500">
                    <div>Commute: {formatApproxMinutes(s.commuteMinutes)}</div>
                    <div>
                      {rentBasisShortLabel(query.rentBasis)}:{" "}
                      {gbp(s.selectedRentGbp)}
                    </div>
                    <div>Score: {(s.matchScore * 10).toFixed(1)}/10</div>
                    <div>Best: {s.neighbourhood.strengths[0] ?? "Balanced offer"}</div>
                    <div>Watch: {s.neighbourhood.tradeoffs[0] ?? "Few obvious tradeoffs"}</div>
                    <DataQualityBadge quality={s.neighbourhood.dataQuality} compact />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
