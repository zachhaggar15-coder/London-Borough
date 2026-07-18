import { DESTINATIONS, DESTINATIONS_BY_ID } from "@/lib/data/destinations";
import type { Destination, LifestyleScores, RentBasis, UserQuery } from "@/lib/types";

type SharePayload = {
  d?: string;
  dl?: string;
  lat?: number;
  lng?: number;
  m?: number;
  b?: number;
  r?: RentBasis;
  p?: UserQuery["personality"];
  w?: Partial<Record<keyof LifestyleScores, number>>;
  top?: string[];
};

export function encodeShareState(query: UserQuery, topIds: string[] = []): string {
  const knownDestination = query.destination
    ? DESTINATIONS.find((destination) => destination.id === query.destination?.id)
    : null;
  const payload: SharePayload = {
    d: knownDestination?.id,
    dl: !knownDestination ? query.destination?.label : undefined,
    lat: !knownDestination ? roundedCoord(query.destination?.centroid.lat) : undefined,
    lng: !knownDestination ? roundedCoord(query.destination?.centroid.lng) : undefined,
    m: query.maxCommuteMinutes,
    b:
      query.monthlyRentBudgetGbp == null
        ? undefined
        : Math.round(query.monthlyRentBudgetGbp / 100) * 100,
    r: query.rentBasis,
    p: query.personality,
    w: compactWeights(query.lifestyleWeights),
    top: topIds.slice(0, 6),
  };

  return toBase64Url(JSON.stringify(payload));
}

export function decodeShareState(state: string | null): {
  query: UserQuery;
  topIds: string[];
} | null {
  if (!state) return null;
  try {
    const payload = JSON.parse(fromBase64Url(state)) as SharePayload;
    const destination = destinationFromPayload(payload);
    return {
      query: {
        destination,
        maxCommuteMinutes: boundedNumber(payload.m, 15, 90, 45),
        monthlyRentBudgetGbp:
          typeof payload.b === "number" && payload.b > 0 ? payload.b : null,
        annualSalaryGbp: null,
        rentBasis: payload.r ?? "houseShareLowerEnd",
        rentBudgetShareOfTakeHome: 0.35,
        personality: payload.p ?? "balanced",
        lifestyleWeights: payload.w ?? {},
      },
      topIds: Array.isArray(payload.top) ? payload.top.slice(0, 6) : [],
    };
  } catch {
    return null;
  }
}

export function shareUrlForState(
  origin: string,
  query: UserQuery,
  topIds: string[],
): string {
  return `${origin}/results?state=${encodeURIComponent(encodeShareState(query, topIds))}`;
}

function destinationFromPayload(payload: SharePayload): Destination | null {
  if (payload.d && DESTINATIONS_BY_ID[payload.d]) {
    return DESTINATIONS_BY_ID[payload.d];
  }
  if (
    typeof payload.lat === "number" &&
    typeof payload.lng === "number" &&
    payload.dl
  ) {
    return {
      id: `shared-${payload.lat.toFixed(5)},${payload.lng.toFixed(5)}`,
      label: payload.dl,
      centroid: { lat: payload.lat, lng: payload.lng },
    };
  }
  return DESTINATIONS_BY_ID.marylebone;
}

function compactWeights(
  weights: UserQuery["lifestyleWeights"],
): Partial<Record<keyof LifestyleScores, number>> | undefined {
  const entries = Object.entries(weights).filter(([, value]) => (value ?? 0) > 0);
  if (entries.length === 0) return undefined;
  return Object.fromEntries(entries) as Partial<Record<keyof LifestyleScores, number>>;
}

function roundedCoord(value: number | undefined): number | undefined {
  return typeof value === "number" ? Number(value.toFixed(5)) : undefined;
}

function boundedNumber(
  value: unknown,
  min: number,
  max: number,
  fallback: number,
): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(min, Math.min(max, Math.round(value)))
    : fallback;
}

function toBase64Url(value: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf8").toString("base64url");
  }
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "base64url").toString("utf8");
  }
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    Math.ceil(value.length / 4) * 4,
    "=",
  );
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
