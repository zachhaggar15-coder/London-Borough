"use client";

import { useState } from "react";
import Link from "next/link";

export type RentIndexRow = {
  id: string;
  name: string;
  borough: string;
  zoneLabel: string;
  zoneSort: number;
  oneBed: number;
  twoBed: number;
};

type SortKey = "name" | "borough" | "zoneSort" | "oneBed" | "twoBed";
type SortDir = "asc" | "desc";

const COLUMNS: { key: SortKey; label: string; numeric: boolean }[] = [
  { key: "name", label: "Neighbourhood", numeric: false },
  { key: "borough", label: "Borough", numeric: false },
  { key: "zoneSort", label: "Zone", numeric: true },
  { key: "oneBed", label: "1-bed median", numeric: true },
  { key: "twoBed", label: "2-bed median", numeric: true },
];

export default function RentIndexTable({ rows }: { rows: RentIndexRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("oneBed");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = [...rows].sort((a, b) => {
    let cmp: number;
    if (sortKey === "name" || sortKey === "borough") {
      cmp = a[sortKey].localeCompare(b[sortKey]);
    } else {
      cmp = a[sortKey] - b[sortKey];
    }
    return sortDir === "asc" ? cmp : -cmp;
  });

  function toggleSort(key: SortKey, numeric: boolean) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      // Numbers usually most useful high-to-low; text A-to-Z.
      setSortDir(numeric ? "desc" : "asc");
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800 text-left text-slate-400">
            {COLUMNS.map((col) => {
              const active = col.key === sortKey;
              return (
                <th
                  key={col.key}
                  className={`pb-3 font-medium ${col.numeric ? "text-right" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key, col.numeric)}
                    className={`inline-flex items-center gap-1 hover:text-white transition-colors ${
                      active ? "text-white" : ""
                    }`}
                    aria-sort={
                      active
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    {col.label}
                    <span className="text-xs text-emerald-400 w-2">
                      {active ? (sortDir === "asc" ? "▲" : "▼") : ""}
                    </span>
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr
              key={row.id}
              className="border-b border-slate-800/50 hover:bg-slate-900/50 transition-colors"
            >
              <td className="py-2.5 font-medium">
                <Link
                  href={`/neighbourhoods/${row.id}`}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {row.name}
                </Link>
              </td>
              <td className="py-2.5 text-slate-400">{row.borough}</td>
              <td className="py-2.5 text-right tabular-nums text-slate-400">
                {row.zoneLabel}
              </td>
              <td className="py-2.5 text-right tabular-nums">
                £{row.oneBed.toLocaleString()}
              </td>
              <td className="py-2.5 text-right tabular-nums">
                £{row.twoBed.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
