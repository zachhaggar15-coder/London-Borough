"use client";

import { useEffect, useMemo, useState } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { gbp } from "@/lib/affordability";
import { rankCouplesNeighbourhoods } from "@/lib/couples";
import { DESTINATIONS } from "@/lib/data/destinations";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { formatApproxMinutes } from "@/lib/format";
import { PERSONALITIES } from "@/lib/personalities";
import { RENT_BASIS_OPTIONS, rentBasisLabel } from "@/lib/rent";
import type { CommuteEstimate, PersonalityKey, RentBasis, UserQuery } from "@/lib/types";

type CommuteMap = Record<string, number | undefined>;

export default function CouplesClient() {
  const [destinationAId, setDestinationAId] = useState("canary-wharf");
  const [destinationBId, setDestinationBId] = useState("kings-cross");
  const [maxA, setMaxA] = useState(45);
  const [maxB, setMaxB] = useState(45);
  const [budget, setBudget] = useState<number | null>(1_900);
  const [rentBasis, setRentBasis] = useState<RentBasis>("oneBedFlat");
  const [personality, setPersonality] = useState<PersonalityKey>("balanced");
  const [commuteState, setCommuteState] = useState<{
    key: string;
    commuteA: CommuteMap;
    commuteB: CommuteMap;
  }>({ key: "", commuteA: {}, commuteB: {} });

  const destinationA = DESTINATIONS.find((item) => item.id === destinationAId)!;
  const destinationB = DESTINATIONS.find((item) => item.id === destinationBId)!;
  const commuteRequestKey = `${destinationAId}:${destinationBId}`;

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetchCommute(destinationAId),
      fetchCommute(destinationBId),
    ])
      .then(([a, b]) => {
        if (cancelled) return;
        setCommuteState({ key: commuteRequestKey, commuteA: a, commuteB: b });
        trackEvent(ANALYTICS_EVENTS.finderCompleted, {
          surface: "couples",
          destination_a: destinationAId,
          destination_b: destinationBId,
        });
      });
    return () => {
      cancelled = true;
    };
  }, [commuteRequestKey, destinationAId, destinationBId]);

  const commuteA = useMemo(
    () => (commuteState.key === commuteRequestKey ? commuteState.commuteA : {}),
    [commuteRequestKey, commuteState],
  );
  const commuteB = useMemo(
    () => (commuteState.key === commuteRequestKey ? commuteState.commuteB : {}),
    [commuteRequestKey, commuteState],
  );
  const loading = commuteState.key !== commuteRequestKey;

  const sharedQuery: UserQuery = useMemo(
    () => ({
      destination: destinationA,
      maxCommuteMinutes: Math.max(maxA, maxB),
      monthlyRentBudgetGbp: budget,
      annualSalaryGbp: null,
      rentBasis,
      rentBudgetShareOfTakeHome: 0.35,
      personality,
      lifestyleWeights: {},
    }),
    [destinationA, maxA, maxB, budget, rentBasis, personality],
  );

  const ranked = useMemo(
    () =>
      rankCouplesNeighbourhoods(NEIGHBOURHOODS, {
        commuteA,
        commuteB,
        maxCommuteA: maxA,
        maxCommuteB: maxB,
        monthlyRentBudgetGbp: budget,
        rentBasis,
        sharedQuery,
      }),
    [commuteA, commuteB, maxA, maxB, budget, rentBasis, sharedQuery],
  );

  const visible = ranked.filter((item) => !item.isExcluded).slice(0, 8);

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <aside className="rounded-lg border border-slate-800 bg-slate-900 p-5">
        <h2 className="mb-4 text-lg font-semibold">Two-person priorities</h2>
        <div className="space-y-4">
          <PersonControl
            label="Person A works near"
            destinationId={destinationAId}
            max={maxA}
            onDestination={setDestinationAId}
            onMax={setMaxA}
          />
          <PersonControl
            label="Person B works near"
            destinationId={destinationBId}
            max={maxB}
            onDestination={setDestinationBId}
            onMax={setMaxB}
          />
          <Field label="Shared monthly rent budget">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">£</span>
              <input
                type="number"
                value={budget ?? ""}
                min={0}
                step={50}
                onChange={(event) =>
                  setBudget(
                    event.target.value === "" ? null : Number(event.target.value),
                  )
                }
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              />
            </div>
          </Field>
          <Field label="Housing type">
            <select
              value={rentBasis}
              onChange={(event) => setRentBasis(event.target.value as RentBasis)}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            >
              {RENT_BASIS_OPTIONS.map((basis) => (
                <option key={basis} value={basis}>
                  {rentBasisLabel(basis)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Shared area style">
            <select
              value={personality}
              onChange={(event) => setPersonality(event.target.value as PersonalityKey)}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm capitalize"
            >
              {PERSONALITIES.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </aside>

      <section>
        <div className="mb-5">
          <p className="text-sm uppercase tracking-wide text-emerald-400">
            Balanced commute ranking
          </p>
          <h2 className="mt-1 text-2xl font-semibold">
            Best compromise areas for both of you
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Ranked by worst commute, total commute burden, affordability and
            shared lifestyle fit. A one-sided 15/75-minute split is penalised
            heavily even if the average looks acceptable.
          </p>
        </div>

        {loading && (
          <div className="mb-4 rounded-md border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-400">
            Updating commute estimates...
          </div>
        )}

        <div className="grid gap-4">
          {visible.map((item, index) => (
            <article
              key={item.neighbourhood.id}
              className="rounded-lg border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    #{index + 1} compromise pick
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">
                    {item.neighbourhood.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {item.neighbourhood.borough} · {gbp(item.selectedRentGbp)}/mo
                  </p>
                </div>
                <div className="rounded-md bg-emerald-600/20 px-3 py-2 text-sm font-semibold text-emerald-200">
                  {(item.matchScore * 10).toFixed(1)}/10
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Metric
                  label="Person A"
                  value={formatApproxMinutes(item.commuteA)}
                  hint={destinationA.label}
                />
                <Metric
                  label="Person B"
                  value={formatApproxMinutes(item.commuteB)}
                  hint={destinationB.label}
                />
                <Metric
                  label="Balance"
                  value={`${Math.round(item.balanceScore * 100)}%`}
                  hint="Worst commute + fairness"
                />
              </div>
              <p className="mt-4 text-sm text-slate-300">{item.explanation}</p>
              <p className="mt-2 text-sm text-amber-200">{item.tradeoff}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function PersonControl({
  label,
  destinationId,
  max,
  onDestination,
  onMax,
}: {
  label: string;
  destinationId: string;
  max: number;
  onDestination: (id: string) => void;
  onMax: (minutes: number) => void;
}) {
  return (
    <div className="rounded-md border border-slate-800 bg-slate-950/60 p-3">
      <Field label={label}>
        <select
          value={destinationId}
          onChange={(event) => onDestination(event.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        >
          {DESTINATIONS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </Field>
      <div className="mt-3">
        <div className="mb-1 flex justify-between text-xs text-slate-400">
          <span>Max commute</span>
          <span>{max} min</span>
        </div>
        <input
          type="range"
          min={20}
          max={90}
          step={5}
          value={max}
          onChange={(event) => onMax(Number(event.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-md border border-slate-800 bg-slate-950/60 p-3">
      <div className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-slate-100">{value}</div>
      <div className="text-xs text-slate-500">{hint}</div>
    </div>
  );
}

async function fetchCommute(destinationId: string): Promise<CommuteMap> {
  const response = await fetch("/api/commute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destinationId }),
  });
  if (!response.ok) return {};
  const data = (await response.json()) as {
    commute?: Record<string, number>;
    estimates?: Record<string, CommuteEstimate>;
  };
  if (data.commute) return data.commute;
  return Object.fromEntries(
    Object.entries(data.estimates ?? {}).map(([id, estimate]) => [
      id,
      estimate.minutes,
    ]),
  );
}
