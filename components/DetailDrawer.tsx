/**
 * DetailDrawer - slides up from the bottom of the map when a neighbourhood
 * is selected. Shows match score breakdown, transport, rent vs budget,
 * lifestyle scores, strengths, tradeoffs.
 */

"use client";

import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { NEIGHBOURHOODS_BY_ID } from "@/lib/data/neighbourhoods";
import { LIFESTYLE_KEYS, LIFESTYLE_LABELS } from "@/lib/types";
import { gbp } from "@/lib/affordability";
import { commuteRouteSummary } from "@/lib/commute-details";
import { formatApproxMinutes } from "@/lib/format";
import { strengthInsights, tradeoffInsights } from "@/lib/insights";
import { rentProfileFor } from "@/lib/rent";
import {
  matchScoreHex,
  scoreNeighbourhood,
  shortlistReason,
  suitsWho,
} from "@/lib/scoring";
import { provenanceLabel } from "@/lib/provenance";

export default function DetailDrawer() {
  const selectedId = useStore((s) => s.selectedNeighbourhoodId);
  const selectNeighbourhood = useStore((s) => s.selectNeighbourhood);
  const shortlistedIds = useStore((s) => s.shortlistedNeighbourhoodIds);
  const toggleShortlist = useStore((s) => s.toggleShortlist);
  const query = useStore((s) => s.query);
  const commute = useStore((s) => s.commute);
  const commuteSources = useStore((s) => s.commuteSources);

  const data = useMemo(() => {
    if (!selectedId) return null;
    const n = NEIGHBOURHOODS_BY_ID[selectedId];
    if (!n) return null;
    return scoreNeighbourhood(n, commute[n.id] ?? null, query);
  }, [selectedId, commute, query]);

  if (!data) return null;

  const {
    neighbourhood: n,
    commuteMinutes,
    matchScore,
    isExcluded,
  } = data;
  const rentProfile = rentProfileFor(n);
  const strengths = strengthInsights(data, query);
  const tradeoffs = tradeoffInsights(data, query);
  const route = commuteRouteSummary(n, query, commuteSources[n.id]);
  const isCompared = shortlistedIds.includes(n.id);

  return (
    <div className="absolute inset-x-0 bottom-0 z-10 max-h-[76%] overflow-y-auto rounded-t-2xl border-t border-slate-800 bg-slate-950/95 px-4 py-4 shadow-2xl backdrop-blur md:max-h-[70%] md:px-6 md:py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-base font-bold text-white shadow"
            style={{ backgroundColor: matchScoreHex(matchScore, isExcluded) }}
          >
            {isExcluded ? "-" : (matchScore * 10).toFixed(1)}
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-xl font-semibold">{n.name}</h2>
              <span className="text-xs text-slate-500">
                {n.borough} · Zone {n.transportZones.join("/")}
              </span>
            </div>
            <div className="mt-0.5 text-xs text-slate-400">{n.summary}</div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => toggleShortlist(n.id)}
                className={[
                  "rounded-full border px-2 py-0.5 font-medium",
                  isCompared
                    ? "border-sky-400 bg-sky-500/20 text-sky-100"
                    : "border-slate-700 bg-slate-900 text-slate-300 hover:border-sky-500 hover:text-sky-100",
                ].join(" ")}
              >
                {isCompared ? "In compare" : "Add to compare"}
              </button>
              <span className="rounded-full bg-sky-900/60 px-2 py-0.5 text-sky-200">
                Why shortlisted: {shortlistReason(data, query)}
              </span>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-slate-300">
                Suits: {suitsWho(n)}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => selectNeighbourhood(null)}
          className="text-sm text-slate-400 hover:text-white"
          aria-label="Close"
        >
          x
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-6">
        <Stat
          label="Commute"
          value={formatApproxMinutes(commuteMinutes)}
          hint={
            commuteMinutes != null
              ? commuteMinutes <= query.maxCommuteMinutes
                ? `Under your ${query.maxCommuteMinutes}-min cap · by public transport`
                : `Over your ${query.maxCommuteMinutes}-min cap`
              : "Choose a destination"
          }
          tone={
            commuteMinutes == null
              ? "neutral"
              : commuteMinutes <= query.maxCommuteMinutes
              ? "good"
              : "bad"
          }
        />
        <Stat
          label="House share lower"
          value={`${gbp(rentProfile.houseShareLowerEndGbp)}/mo`}
          hint={provenanceLabel(rentProfile.roomSource)}
          tone="neutral"
        />
        <Stat
          label="Flat share upper"
          value={`${gbp(rentProfile.flatShareUpperEndGbp)}/mo`}
          hint={provenanceLabel(rentProfile.roomSource)}
          tone="neutral"
        />
        <Stat
          label="One bed flat"
          value={`${gbp(rentProfile.oneBedFlatGbp)}/mo`}
          hint={provenanceLabel(rentProfile.oneBedSource)}
          tone="neutral"
        />
        <Stat
          label="Two bed flat"
          value={`${gbp(rentProfile.twoBedFlatGbp)}/mo`}
          hint={provenanceLabel(rentProfile.oneBedSource)}
          tone="neutral"
        />
        <Stat
          label="Match score"
          value={isExcluded ? "Excluded" : `${(matchScore * 10).toFixed(1)} / 10`}
          hint={
            isExcluded
              ? "Commute exceeds your cap"
              : "Affordability + lifestyle, weighted equally"
          }
          tone={isExcluded ? "bad" : "good"}
        />
      </div>

      <Section title="Transport">
        <div className="mb-3 rounded-md border border-slate-800 bg-slate-900/60 p-3">
          <div className="text-sm font-medium text-slate-100">{route.primary}</div>
          <div className="mt-1 text-[11px] text-slate-500">
            {route.durationSourceLabel}: {route.methodology}
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {route.routeOptions.map((option) => (
              <div
                key={option.label}
                className="rounded-md border border-slate-800 bg-slate-950/50 p-3"
              >
                <div className="text-[10px] uppercase tracking-wider text-slate-500">
                  {option.label}
                </div>
                <ol className="mt-2 space-y-1 pl-4 text-xs text-slate-300">
                  {option.legs.map((leg, index) => (
                    <li key={`${option.label}-${leg.mode}-${index}`} className="list-decimal">
                      <span className="mr-1 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-slate-400">
                        {leg.service ?? leg.mode}
                      </span>
                      {leg.instruction}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          {route.destinationLines.length > 0 && (
            <div className="mt-2 text-[11px] text-slate-500">
              Destination station lines: {route.destinationLines.join(", ")}
            </div>
          )}
          {route.warnings.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {route.warnings.map((warning) => (
                <span
                  key={warning}
                  className="rounded-full bg-amber-900/30 px-2 py-0.5 text-[11px] text-amber-200"
                >
                  {warning}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {n.mainStations.map((s) => (
            <div
              key={s.name}
              className="rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs"
            >
              <span className="font-medium text-slate-100">{s.name}</span>
              <span className="ml-1 text-slate-400">· {s.lines.join(", ")}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Lifestyle">
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {LIFESTYLE_KEYS.map((key) => (
            <div key={key} className="flex items-center gap-3">
              <div className="w-36 shrink-0 text-xs text-slate-300">
                {LIFESTYLE_LABELS[key]}
              </div>
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="absolute inset-y-0 left-0 bg-sky-500"
                  style={{ width: `${n.lifestyle[key] * 10}%` }}
                />
              </div>
              <div className="w-8 shrink-0 text-right text-xs text-slate-500">
                {n.lifestyle[key]}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Section title="Strengths" inline>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
            {strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Section>
        <Section title="Tradeoffs" inline>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
            {tradeoffs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="mt-3 text-[10px] uppercase tracking-wider text-slate-600">
        Sources: TfL journey data, ONS rent baseline, listing samples, and curated area review
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone: "good" | "bad" | "neutral";
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
      <div className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-slate-100">{value}</div>
      <div
        className={[
          "mt-0.5 text-xs",
          tone === "good"
            ? "text-emerald-300"
            : tone === "bad"
            ? "text-red-300"
            : "text-slate-500",
        ].join(" ")}
      >
        {hint}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  inline,
}: {
  title: string;
  children: React.ReactNode;
  inline?: boolean;
}) {
  return (
    <div className={inline ? "" : "mt-5"}>
      <div className="mb-2 text-xs uppercase tracking-wider text-slate-400">
        {title}
      </div>
      {children}
    </div>
  );
}
