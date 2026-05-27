/**
 * ControlPanel — the input form on the left.
 *
 * Hierarchy (intentional, in this order):
 *   1. Destination
 *   2. Max commute
 *   3. Salary  (rent override tucked under it)
 *   4. Area personality (one chip from 6 archetypes)
 *
 * Advanced: granular lifestyle sliders behind a collapsed disclosure
 * for power users who want fine-grained control.
 */

"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { DESTINATIONS } from "@/lib/data/destinations";
import {
  LIFESTYLE_KEYS,
  LIFESTYLE_LABELS,
  type Destination,
  type RentBasis,
} from "@/lib/types";
import {
  defaultMonthlyRentBudgetGbp,
  gbp,
} from "@/lib/affordability";
import { PERSONALITIES } from "@/lib/personalities";
import {
  geocode,
  describeGeocodeError,
  type GeocodeError,
  type GeocodeResult,
} from "@/lib/geocoding";
import {
  RENT_BASIS_OPTIONS,
  rentBasisLabel,
} from "@/lib/rent";

export default function ControlPanel() {
  const query = useStore((s) => s.query);
  const setDestination = useStore((s) => s.setDestination);
  const setMaxCommute = useStore((s) => s.setMaxCommute);
  const setSalary = useStore((s) => s.setSalary);
  const setRentBudget = useStore((s) => s.setRentBudget);
  const setRentBasis = useStore((s) => s.setRentBasis);
  const setRentBudgetShareOfTakeHome = useStore(
    (s) => s.setRentBudgetShareOfTakeHome,
  );
  const setPersonality = useStore((s) => s.setPersonality);
  const setLifestyleWeight = useStore((s) => s.setLifestyleWeight);
  const clearLifestyleWeights = useStore((s) => s.clearLifestyleWeights);
  const isLoadingCommute = useStore((s) => s.isLoadingCommute);

  const [showRentOverride, setShowRentOverride] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Destination search state — postcode / station / address / area
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<GeocodeError | null>(null);
  const [searchResults, setSearchResults] = useState<GeocodeResult[] | null>(
    null,
  );

  // True if the active destination came from search (not a pre-seeded one)
  const isCustomDestination =
    query.destination != null &&
    !DESTINATIONS.some((d) => d.id === query.destination!.id);

  async function runSearch() {
    if (!searchInput.trim()) return;
    setIsSearching(true);
    setSearchError(null);
    setSearchResults(null);
    const out = await geocode(searchInput);
    setIsSearching(false);
    if (!out.ok) {
      setSearchError(out.error);
      return;
    }
    if (out.results.length === 1) {
      applyResult(out.results[0]);
    } else {
      setSearchResults(out.results);
    }
  }

  function applyResult(r: GeocodeResult) {
    const dest: Destination = {
      id: `custom-${r.lat.toFixed(5)},${r.lng.toFixed(5)}`,
      label: r.label,
      centroid: { lat: r.lat, lng: r.lng },
    };
    setDestination(dest);
    setSearchResults(null);
    setSearchError(null);
    setSearchInput("");
  }

  const derivedBudget =
    query.monthlyRentBudgetGbp ??
    (query.annualSalaryGbp != null
      ? defaultMonthlyRentBudgetGbp(
          query.annualSalaryGbp,
          query.rentBudgetShareOfTakeHome,
        )
      : null);

  return (
    <div className="space-y-5 border-b border-slate-800 px-5 py-4">
      {/* 1. Destination */}
      <Field
        label="Destination"
        subtitle="Postcode, station, street address, or neighbourhood"
      >
        {/* Search input — primary entry point */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch();
          }}
        >
          <div className="flex gap-1.5">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. SW1A 1AA · King's Cross · Tooting"
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isSearching || !searchInput.trim()}
              className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200 hover:border-slate-500 hover:text-white disabled:opacity-50"
            >
              {isSearching ? "…" : "Go"}
            </button>
          </div>
        </form>

        {/* Error from search */}
        {searchError && (
          <div className="mt-1.5 text-xs text-red-400">
            {describeGeocodeError(searchError)}
          </div>
        )}

        {/* Multiple results — let the user disambiguate */}
        {searchResults && searchResults.length > 1 && (
          <div className="mt-1.5 space-y-1 rounded-md border border-slate-800 bg-slate-900/80 p-1.5">
            <div className="px-1 pb-0.5 text-[10px] uppercase tracking-wider text-slate-500">
              {searchResults.length} matches — pick one
            </div>
            {searchResults.map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => applyResult(r)}
                className="block w-full truncate rounded px-2 py-1 text-left text-xs text-slate-200 hover:bg-slate-800"
                title={r.label}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}

        {/* Active custom destination indicator + revert button */}
        {isCustomDestination && query.destination && !searchResults && (
          <div className="mt-1.5 flex items-center justify-between gap-2 rounded-md border border-sky-700/50 bg-sky-900/20 px-2.5 py-1.5 text-xs">
            <div className="min-w-0 truncate text-sky-200">
              Active: {query.destination.label}
            </div>
            <button
              type="button"
              onClick={() => setDestination(DESTINATIONS[0])}
              className="shrink-0 text-[11px] text-slate-400 hover:text-white"
              aria-label="Clear custom destination"
            >
              ✕
            </button>
          </div>
        )}

        {/* Quick-pick dropdown for common offices */}
        <div className="mt-2.5">
          <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">
            Or pick a common office
          </div>
          <select
            value={isCustomDestination ? "" : query.destination?.id ?? ""}
            onChange={(e) => {
              const dest = DESTINATIONS.find((d) => d.id === e.target.value);
              if (dest) setDestination(dest);
            }}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
          >
            {isCustomDestination && (
              <option value="" disabled>
                — (custom destination active) —
              </option>
            )}
            {DESTINATIONS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {isLoadingCommute && (
          <div className="mt-1.5 text-xs text-slate-400">
            Computing commute times…
          </div>
        )}
      </Field>

      {/* 2. Max commute */}
      <Field
        label="Max commute"
        subtitle={`${query.maxCommuteMinutes} minutes, public transport`}
      >
        <input
          type="range"
          min={15}
          max={90}
          step={5}
          value={query.maxCommuteMinutes}
          onChange={(e) => setMaxCommute(parseInt(e.target.value, 10))}
          className="w-full"
        />
        <div className="mt-1 flex justify-between text-[10px] text-slate-500">
          <span>15 min</span>
          <span>90 min</span>
        </div>
      </Field>

      {/* 3. Salary (with rent override tucked underneath) */}
      <Field
        label="Annual salary"
        subtitle={
          derivedBudget != null
            ? `Rent budget: ${gbp(derivedBudget)}/mo${
                query.monthlyRentBudgetGbp != null ? " (override)" : " (derived)"
              }`
            : "We'll derive a rent budget"
        }
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">£</span>
          <input
            type="number"
            min={0}
            step={1000}
            value={query.annualSalaryGbp ?? ""}
            onChange={(e) =>
              setSalary(e.target.value === "" ? null : parseInt(e.target.value, 10))
            }
            placeholder="50000"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
          />
        </div>

        {!showRentOverride ? (
          <button
            type="button"
            onClick={() => setShowRentOverride(true)}
            className="mt-1.5 text-[11px] text-slate-400 underline hover:text-slate-200"
          >
            Set rent budget directly
          </button>
        ) : (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">£</span>
              <input
                type="number"
                min={0}
                step={50}
                value={query.monthlyRentBudgetGbp ?? ""}
                onChange={(e) =>
                  setRentBudget(
                    e.target.value === "" ? null : parseInt(e.target.value, 10),
                  )
                }
                placeholder="override /mo"
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs focus:border-sky-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setRentBudget(null);
                  setShowRentOverride(false);
                }}
                className="text-[11px] text-slate-500 hover:text-slate-200"
                aria-label="Reset rent override"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </Field>

      <Field label="Rent type" subtitle={rentBasisLabel(query.rentBasis)}>
        <select
          value={query.rentBasis}
          onChange={(e) => setRentBasis(e.target.value as RentBasis)}
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
        >
          {RENT_BASIS_OPTIONS.map((basis) => (
            <option key={basis} value={basis}>
              {rentBasisLabel(basis)}
            </option>
          ))}
        </select>
      </Field>

      {/* 4. Area personality */}
      <Field
        label="What kind of area suits you?"
        subtitle={
          query.personality
            ? PERSONALITIES.find((p) => p.key === query.personality)?.blurb
            : "Pick one to shape the ranking"
        }
      >
        <div className="grid grid-cols-3 gap-1.5">
          {PERSONALITIES.map((p) => {
            const isActive = query.personality === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setPersonality(isActive ? null : p.key)}
                className={[
                  "rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "border-sky-500 bg-sky-500/15 text-sky-200"
                    : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-white",
                ].join(" ")}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </Field>

      {/* Advanced (collapsed by default) */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className="flex w-full items-center justify-between text-left text-xs text-slate-400 hover:text-slate-200"
        >
          <span>Advanced — per-dimension weights</span>
          <span>{showAdvanced ? "−" : "+"}</span>
        </button>
        {showAdvanced && (
          <div className="mt-3 space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Rent budget share</span>
                <span className="text-slate-500">
                  {Math.round(query.rentBudgetShareOfTakeHome * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(query.rentBudgetShareOfTakeHome * 100)}
                onChange={(e) =>
                  setRentBudgetShareOfTakeHome(parseInt(e.target.value, 10) / 100)
                }
                className="w-full"
              />
            </div>
            <div className="text-[11px] text-slate-500">
              Overrides the personality preset. Set any non-zero weight to
              switch to manual mode.
            </div>
            {LIFESTYLE_KEYS.map((key) => {
              const val = query.lifestyleWeights[key] ?? 0;
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>{LIFESTYLE_LABELS[key]}</span>
                    <span className="text-slate-500">
                      {val === 0 ? "—" : `${Math.round(val * 100)}%`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={val}
                    onChange={(e) =>
                      setLifestyleWeight(key, parseFloat(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
              );
            })}
            <button
              type="button"
              onClick={clearLifestyleWeights}
              className="text-xs text-slate-400 underline hover:text-slate-200"
            >
              Reset weights
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  subtitle,
  children,
}: {
  label: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 text-sm font-medium text-slate-200">{label}</div>
      {subtitle && <div className="mb-2 text-xs text-slate-500">{subtitle}</div>}
      {children}
    </div>
  );
}
