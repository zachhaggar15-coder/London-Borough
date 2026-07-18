"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { gbp } from "@/lib/affordability";
import { NEIGHBOURHOODS, NEIGHBOURHOODS_BY_ID } from "@/lib/data/neighbourhoods";
import { decodeShareState } from "@/lib/share-state";
import { scoreAll } from "@/lib/scoring";
import { personalResultsSummary, recommendationExplanation } from "@/lib/decision";
import { formatApproxMinutes } from "@/lib/format";
import { rentBasisShortLabel } from "@/lib/rent";
import type { CommuteEstimate } from "@/lib/types";

type Props = {
  state: string | null;
};

export default function SharedResultsClient({ state }: Props) {
  const decoded = useMemo(() => decodeShareState(state), [state]);
  const [commute, setCommute] = useState<Record<string, number | undefined>>({});

  useEffect(() => {
    if (!decoded?.query.destination) return;
    let cancelled = false;
    fetch("/api/commute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinationLatLng: decoded.query.destination.centroid }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: {
        commute?: Record<string, number>;
        estimates?: Record<string, CommuteEstimate>;
      } | null) => {
        if (cancelled || !data) return;
        setCommute(
          data.commute ??
            Object.fromEntries(
              Object.entries(data.estimates ?? {}).map(([id, estimate]) => [
                id,
                estimate.minutes,
              ]),
            ),
        );
      });
    return () => {
      cancelled = true;
    };
  }, [decoded]);

  if (!decoded) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold">Shared results unavailable</h1>
        <p className="mt-2 text-slate-400">
          This result link could not be decoded. Run a fresh search to create a
          new share link.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500"
        >
          Open the finder
        </Link>
      </div>
    );
  }

  const scored = scoreAll(NEIGHBOURHOODS, commute, decoded.query);
  const bySharedTop = decoded.topIds
    .map((id) => scored.find((item) => item.neighbourhood.id === id))
    .filter(Boolean);
  const results = (bySharedTop.length > 0 ? bySharedTop : scored).slice(0, 6);
  const summary = personalResultsSummary(scored, decoded.query);

  return (
    <div>
      <header className="mb-10">
        <p className="mb-3 text-sm uppercase tracking-wide text-emerald-400">
          Shared decision result
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight">
          My best places to live in London
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          A shared Where in London shortlist based on commute, rent budget and
          lifestyle preferences.
        </p>
      </header>

      {summary.priorityBullets.length > 0 && (
        <section className="mb-8 rounded-lg border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-3 text-lg font-semibold">Priorities</h2>
          <div className="flex flex-wrap gap-2">
            {summary.priorityBullets.map((item) => (
              <span
                key={item}
                className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
          {summary.keyDecision && (
            <p className="mt-4 text-sm text-slate-300">{summary.keyDecision}</p>
          )}
        </section>
      )}

      <section className="grid gap-4 md:grid-cols-2">
        {results.map((item, index) => {
          if (!item) return null;
          const explanation = recommendationExplanation(item, scored, decoded.query);
          const n = NEIGHBOURHOODS_BY_ID[item.neighbourhood.id];
          return (
            <Link
              key={item.neighbourhood.id}
              href={`/neighbourhoods/${item.neighbourhood.id}`}
              className="rounded-lg border border-slate-800 bg-slate-900 p-5 hover:border-slate-600"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    #{index + 1} result
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">{n.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">{n.borough}</p>
                </div>
                <span className="rounded-md bg-emerald-600/20 px-3 py-2 text-sm font-semibold text-emerald-200">
                  {(item.matchScore * 10).toFixed(1)}/10
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-400">
                <span>{formatApproxMinutes(item.commuteMinutes)}</span>
                <span>
                  {gbp(item.selectedRentGbp)}/mo{" "}
                  {rentBasisShortLabel(decoded.query.rentBasis)}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-300">
                {explanation.bestFeature}
              </p>
              <p className="mt-2 text-sm text-amber-200">
                Trade-off: {explanation.tradeoff}
              </p>
            </Link>
          );
        })}
      </section>

      <section className="mt-10 rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
        <h2 className="text-xl font-semibold">Run your own search</h2>
        <p className="mx-auto mt-2 max-w-2xl text-slate-300">
          Change the commute, budget and lifestyle settings to see how the
          shortlist changes for your situation.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-lg bg-emerald-600 px-5 py-3 text-sm font-medium hover:bg-emerald-500"
        >
          Open the finder
        </Link>
      </section>
    </div>
  );
}
