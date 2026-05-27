"use client";

import { useMemo, useState } from "react";
import type { BoroughSummary } from "@/lib/boroughs";
import { matchScoreHex } from "@/lib/scoring";

type Props = {
  boroughs: BoroughSummary[];
  onSelect: (borough: BoroughSummary) => void;
};

export default function BoroughSearch({ boroughs, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return boroughs.slice(0, 8);
    return boroughs
      .filter((borough) => {
        const areaNames = borough.scored
          .map((s) => s.neighbourhood.name)
          .join(" ")
          .toLowerCase();
        return (
          borough.name.toLowerCase().includes(term) ||
          areaNames.includes(term)
        );
      })
      .slice(0, 8);
  }, [boroughs, search]);

  function choose(borough: BoroughSummary) {
    setSearch(borough.name);
    setIsOpen(false);
    onSelect(borough);
  }

  return (
    <div className="absolute left-2 right-2 top-2 z-30 text-slate-100 md:left-auto md:right-4 md:top-4 md:w-[360px]">
      <div className="rounded-md border border-slate-700 bg-slate-950/90 shadow-xl backdrop-blur">
        <div className="border-b border-slate-800 px-3 py-2">
          <div className="mb-1 flex items-center justify-between gap-2">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-sky-300">
              Borough
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">
              {boroughs.length} London boroughs
            </div>
          </div>
          <div className="relative">
            <input
              type="search"
              aria-label="Search boroughs"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setIsOpen(false);
                  event.currentTarget.blur();
                }
              }}
              placeholder="Search borough"
              className="h-9 w-full rounded-md border border-slate-700 bg-slate-900 px-3 pr-9 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setIsOpen(false);
                }}
                className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-xs text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                aria-label="Clear borough search"
              >
                x
              </button>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="max-h-72 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-3 text-xs text-slate-500">
                No borough matches
              </div>
            ) : (
              filtered.map((borough) => {
                const best = borough.bestMatch;
                const score = (best.matchScore * 10).toFixed(1);
                return (
                  <button
                    key={borough.id}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => choose(borough)}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-slate-800"
                  >
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-white/70"
                      style={{
                        backgroundColor: matchScoreHex(
                          best.matchScore,
                          best.isExcluded,
                        ),
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">
                        {borough.name}
                      </div>
                      <div className="truncate text-[11px] text-slate-500">
                        Best: {best.neighbourhood.name} - {score}/10
                      </div>
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500">
                      {borough.scored.length} areas
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
