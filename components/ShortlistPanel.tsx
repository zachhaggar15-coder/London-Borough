"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { gbp } from "@/lib/affordability";
import { NEIGHBOURHOODS_BY_ID } from "@/lib/data/neighbourhoods";
import { comparisonDecision } from "@/lib/decision";
import { formatApproxMinutes } from "@/lib/format";
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
  const decision = useMemo(
    () => (scored.length >= 2 ? comparisonDecision(scored, query) : null),
    [scored, query],
  );

  useEffect(() => {
    if (scored.length >= 2) {
      trackEvent(ANALYTICS_EVENTS.comparisonStarted, {
        count: scored.length,
        areas: scored.map((item) => item.neighbourhood.id).join(","),
      });
    }
  }, [scored]);

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

      {decision && (
        <div className="mt-4 rounded-md border border-slate-800 bg-slate-950/60 p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="text-[11px] uppercase tracking-wider text-slate-500">
              Decision compare
            </div>
            <Link
              href="/compare"
              className="text-[11px] text-slate-500 hover:text-slate-200"
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.comparisonCompleted, {
                  surface: "shortlist_panel",
                  count: scored.length,
                })
              }
            >
              More guides
            </Link>
          </div>
          <p className="mb-3 text-xs leading-relaxed text-slate-300">
            {decision.recommendation}
          </p>
          <div className="grid gap-2">
            {decision.bestFor.map((item) => (
              <button
                key={`${item.label}-${item.neighbourhood.id}`}
                type="button"
                onClick={() => selectNeighbourhood(item.neighbourhood.id)}
                className="rounded-md border border-slate-800 bg-slate-900/70 px-2.5 py-2 text-left hover:border-slate-600"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-sky-300">
                    Best for {item.label}
                  </span>
                  <span className="truncate text-xs font-medium text-slate-100">
                    {item.neighbourhood.name}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {item.reason}
                </p>
              </button>
            ))}
          </div>
          {decision.tradeoffs.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {decision.tradeoffs.slice(0, 3).map((item) => (
                <p
                  key={item}
                  className="rounded-md bg-slate-900/70 px-2.5 py-2 text-[11px] leading-relaxed text-amber-200/90"
                >
                  {item}
                </p>
              ))}
            </div>
          )}
          <div className="mt-3 grid gap-2 text-xs">
            {scored.map((s) => (
              <button
                key={s.neighbourhood.id}
                type="button"
                onClick={() => selectNeighbourhood(s.neighbourhood.id)}
                className="flex items-center justify-between gap-2 rounded-md bg-slate-900/60 px-2.5 py-1.5 text-left hover:bg-slate-800"
              >
                <span className="font-medium text-slate-200">
                  {s.neighbourhood.name}
                </span>
                <span className="text-slate-500">
                  {formatApproxMinutes(s.commuteMinutes)} · {gbp(s.selectedRentGbp)}
                </span>
                <DataQualityBadge quality={s.neighbourhood.dataQuality} compact />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
