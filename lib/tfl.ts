/**
 * TfL Journey Planner integration.
 *
 * Hits the public TfL Unified API at api.tfl.gov.uk to compute real
 * public-transport journey durations between two lat/lng points in London.
 *
 *   GET https://api.tfl.gov.uk/Journey/JourneyResults/{from}/to/{to}
 *       ?mode=tube,bus,national-rail,overground,dlr,elizabeth-line,tram
 *
 * No API key is required for the free public tier (≈500 req/min).
 * If TFL_APP_ID and TFL_APP_KEY are set as env vars, they are added to
 * each request and you get higher quotas. Optional — leave unset for
 * zero-setup operation.
 *
 * Response shape (trimmed):
 *   { journeys: [ { duration: number /* minutes *\/, legs: [...] } ] }
 *
 * We pick the journey with the smallest `duration`. If no journeys are
 * returned (TfL can't route between the two points, usually outside
 * London), we resolve null so callers can fall back to a static estimate.
 *
 * IMPORTANT: never expose the App Key to the browser. This module is
 * only imported from server routes (/api/commute), never from a
 * "use client" component.
 */

import type { LatLng } from "@/lib/types";

/**
 * Public-transport modes we want TfL to consider. We deliberately
 * exclude `cycle`, `walking` (as the sole mode), `taxi`, and
 * `private-hire` — the app is about public-transport reachability.
 */
const TFL_MODES = [
  "tube",
  "bus",
  "national-rail",
  "overground",
  "dlr",
  "elizabeth-line",
  "tram",
  "river-bus",
].join(",");

type TflJourney = {
  duration?: number;
};

type TflResponse = {
  journeys?: TflJourney[];
  // TfL returns an error envelope when no journey is found, e.g.
  // { httpStatusCode: 300, message: "Multiple results found...", ... }
  httpStatusCode?: number;
  message?: string;
};

function fmtPoint(p: LatLng): string {
  // TfL accepts "lat,lng" as a free-form point. 5 decimal places ≈ 1m.
  return `${p.lat.toFixed(5)},${p.lng.toFixed(5)}`;
}

function authParams(): string {
  const id = process.env.TFL_APP_ID;
  const key = process.env.TFL_APP_KEY;
  if (!id || !key) return "";
  return `&app_id=${encodeURIComponent(id)}&app_key=${encodeURIComponent(key)}`;
}

/**
 * Fetch the fastest public-transport journey duration (in minutes)
 * between two points. Returns null if TfL can't route between them.
 *
 * Throws on network/HTTP-5xx errors so the caller can decide whether
 * to retry or fall back.
 */
export async function tflJourneyMinutes(
  from: LatLng,
  to: LatLng,
  opts: { timeoutMs?: number } = {},
): Promise<number | null> {
  const timeoutMs = opts.timeoutMs ?? 8_000;

  const url =
    `https://api.tfl.gov.uk/Journey/JourneyResults/` +
    `${encodeURIComponent(fmtPoint(from))}/to/${encodeURIComponent(fmtPoint(to))}` +
    `?mode=${TFL_MODES}` +
    `&journeyPreference=LeastTime` +
    authParams();

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(url, {
      signal: ctrl.signal,
      // Next.js server fetch — opt out of its default route cache, we
      // do our own TtlCache layer at a higher level.
      cache: "no-store",
      headers: { accept: "application/json" },
    });
  } finally {
    clearTimeout(t);
  }

  // 300 = "disambiguation" — TfL needs us to pick a from/to from a list.
  //       In practice this happens when our coords are ambiguous; we
  //       treat it as "no direct route" and let the caller fall back.
  if (res.status === 300) return null;

  // 404 = no journey found between those points.
  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`TfL ${res.status}: ${res.statusText}`);
  }

  const data = (await res.json()) as TflResponse;
  if (!data.journeys || data.journeys.length === 0) return null;

  let best = Infinity;
  for (const j of data.journeys) {
    if (typeof j.duration === "number" && j.duration < best) {
      best = j.duration;
    }
  }
  return Number.isFinite(best) ? best : null;
}
