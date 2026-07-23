"use client";

import { useMemo, useState } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { gbp } from "@/lib/affordability";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import {
  personalResultsSummary,
  recommendationExplanation,
} from "@/lib/decision";
import { formatApproxMinutes } from "@/lib/format";
import { rentBasisShortLabel } from "@/lib/rent";
import { scoreAll } from "@/lib/scoring";
import { shareUrlForState } from "@/lib/share-state";
import { useStore } from "@/lib/store";
import type { ScoredNeighbourhood } from "@/lib/types";

export default function ResultsSummaryPanel() {
  const query = useStore((s) => s.query);
  const commute = useStore((s) => s.commute);
  const selectNeighbourhood = useStore((s) => s.selectNeighbourhood);
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">("idle");

  const scored = useMemo(
    () => scoreAll(NEIGHBOURHOODS, commute, query),
    [commute, query],
  );
  const summary = useMemo(
    () => personalResultsSummary(scored, query),
    [scored, query],
  );

  const topIds = scored
    .filter((item) => !item.isExcluded)
    .slice(0, 6)
    .map((item) => item.neighbourhood.id);

  if (!summary.bestOverall) return null;

  async function shareResults() {
    const url = shareUrlForState(window.location.origin, query, topIds);
    const title = "My best places to live in London";
    const text = summary.keyDecision ?? "Here are my Where in London results.";
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        setShareState("shared");
      } else {
        await navigator.clipboard.writeText(url);
        setShareState("copied");
      }
      trackEvent(ANALYTICS_EVENTS.resultsShared, {
        top_area: summary.bestOverall?.neighbourhood.id,
      });
    } catch {
      await navigator.clipboard.writeText(url);
      setShareState("copied");
    }
  }

  return (
    <section className="border-b border-slate-800 px-5 py-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400">
            Personal result
          </div>
          <h2 className="mt-1 text-sm font-semibold text-slate-100">
            Your decision shortlist
          </h2>
        </div>
        <button
          type="button"
          onClick={shareResults}
          className="rounded-md border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 hover:border-sky-500 hover:text-sky-100"
        >
          {shareState === "copied"
            ? "Copied"
            : shareState === "shared"
            ? "Shared"
            : "Share"}
        </button>
      </div>

      {summary.priorityBullets.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {summary.priorityBullets.map((item) => (
            <span
              key={item}
              className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] text-slate-400"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      <div className="grid gap-2">
        <MiniPick
          label="Best overall"
          scored={summary.bestOverall}
          onClick={() => selectNeighbourhood(summary.bestOverall!.neighbourhood.id)}
          scoredAll={scored}
        />
        {summary.bestValue && (
          <MiniPick
            label="Best value"
            scored={summary.bestValue}
            onClick={() => selectNeighbourhood(summary.bestValue!.neighbourhood.id)}
            scoredAll={scored}
          />
        )}
        {summary.bestLifestyle && (
          <MiniPick
            label="Best lifestyle"
            scored={summary.bestLifestyle}
            onClick={() => selectNeighbourhood(summary.bestLifestyle!.neighbourhood.id)}
            scoredAll={scored}
          />
        )}
      </div>

      {summary.keyDecision && (
        <p className="mt-3 rounded-md border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs leading-relaxed text-slate-300">
          {summary.keyDecision}
        </p>
      )}

      {summary.surprisingAlternative && (
        <button
          type="button"
          onClick={() =>
            selectNeighbourhood(summary.surprisingAlternative!.neighbourhood.id)
          }
          className="mt-2 w-full rounded-md border border-emerald-900/60 bg-emerald-950/20 px-3 py-2 text-left text-xs text-emerald-100 hover:border-emerald-600"
        >
          You may not have considered{" "}
          <strong>{summary.surprisingAlternative.neighbourhood.name}</strong>: it
          stays competitive while saving about{" "}
          {gbp(
            summary.bestOverall.selectedRentGbp -
              summary.surprisingAlternative.selectedRentGbp,
          )}
          /mo.
        </button>
      )}
    </section>
  );
}

function MiniPick({
  label,
  scored,
  onClick,
  scoredAll,
}: {
  label: string;
  scored: ScoredNeighbourhood;
  onClick: () => void;
  scoredAll: ScoredNeighbourhood[];
}) {
  const query = useStore((s) => s.query);
  const explanation = recommendationExplanation(scored, scoredAll, query);

  return (
    <button
      type="button"
      onClick={() => {
        trackEvent(ANALYTICS_EVENTS.recommendationClicked, {
          area: scored.neighbourhood.id,
          surface: "results_summary",
        });
        onClick();
      }}
      className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-left hover:border-slate-600"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-wider text-sky-300">
          {label}
        </span>
        <span className="text-[11px] text-slate-500">
          {(scored.matchScore * 10).toFixed(1)}/10
        </span>
      </div>
      <div className="mt-1 text-sm font-medium text-slate-100">
        {scored.neighbourhood.name}
      </div>
      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-400">
        <span>{formatApproxMinutes(scored.commuteMinutes)}</span>
        <span>
          {gbp(scored.selectedRentGbp)}/mo {rentBasisShortLabel(query.rentBasis)}
        </span>
      </div>
      <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-500">
        {explanation.bestFeature}
      </p>
    </button>
  );
}
