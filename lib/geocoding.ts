/**
 * Geocoding — turn user-typed strings into lat/lng.
 *
 * Handles four input shapes:
 *   1. UK postcode      ("SW1A 1AA")        → postcodes.io
 *   2. Street address   ("221b Baker St")   → Nominatim
 *   3. Station name     ("King's Cross")    → Nominatim
 *   4. Neighbourhood    ("Tooting Bec")     → Nominatim
 *
 * Strategy:
 *   - If the input looks like a UK postcode, prefer postcodes.io (more
 *     accurate, faster, no rate-limit politeness needed).
 *   - Otherwise, fall back to Nominatim, scoped to GB and constrained to
 *     the Greater London viewbox so we don't return matches in Leeds.
 *
 * Both providers are free, key-less, CORS-enabled, and good enough for
 * an MVP. If usage ever exceeds Nominatim's polite-use cap (1 req/sec),
 * upgrade to MapTiler or Mapbox geocoding behind the same function.
 */

import { lookupPostcode } from "@/lib/postcodes";

/** Loose UK postcode regex — used to route between the two providers. */
const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

/** Greater London bounding box (slightly generous). */
const LONDON_BBOX = { west: -0.6, east: 0.4, south: 51.25, north: 51.75 };

/** Nominatim viewbox order: left, top, right, bottom. */
const NOMINATIM_VIEWBOX = `${LONDON_BBOX.west},${LONDON_BBOX.north},${LONDON_BBOX.east},${LONDON_BBOX.south}`;

export type GeocodeResult = {
  /** Short human label, e.g. "King's Cross Station, Camden" */
  label: string;
  /** Smallest meaningful area name */
  area: string;
  lat: number;
  lng: number;
  source: "postcodes_io" | "nominatim";
};

export type GeocodeError =
  | { kind: "empty" }
  | { kind: "not_found" }
  | { kind: "outside_london" }
  | { kind: "network" };

export type GeocodeLookup =
  | { ok: true; results: GeocodeResult[] }
  | { ok: false; error: GeocodeError };

function inLondon(lat: number, lng: number): boolean {
  return (
    lng >= LONDON_BBOX.west &&
    lng <= LONDON_BBOX.east &&
    lat >= LONDON_BBOX.south &&
    lat <= LONDON_BBOX.north
  );
}

/** Shorten a Nominatim display_name to the first 3 comma-separated parts. */
function shortenLabel(displayName: string): string {
  return displayName.split(",").slice(0, 3).join(",").trim();
}

type NominatimHit = {
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
  class?: string;
  address?: {
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    county?: string;
    city_district?: string;
    quarter?: string;
  };
};

async function geocodeViaNominatim(query: string): Promise<GeocodeLookup> {
  const url =
    "https://nominatim.openstreetmap.org/search" +
    `?q=${encodeURIComponent(query)}` +
    "&format=json" +
    "&limit=5" +
    "&countrycodes=gb" +
    "&addressdetails=1" +
    `&viewbox=${NOMINATIM_VIEWBOX}` +
    "&bounded=1";

  let res: Response;
  try {
    res = await fetch(url, { headers: { Accept: "application/json" } });
  } catch {
    return { ok: false, error: { kind: "network" } };
  }
  if (!res.ok) return { ok: false, error: { kind: "network" } };

  const data = (await res.json()) as NominatimHit[];

  const inBox = data
    .map((d) => ({ ...d, latNum: parseFloat(d.lat), lngNum: parseFloat(d.lon) }))
    .filter((d) => inLondon(d.latNum, d.lngNum));

  if (inBox.length === 0) return { ok: false, error: { kind: "not_found" } };

  return {
    ok: true,
    results: inBox.slice(0, 5).map((d) => {
      const area =
        d.address?.neighbourhood ??
        d.address?.suburb ??
        d.address?.quarter ??
        d.address?.city_district ??
        d.address?.city ??
        "London";
      return {
        label: shortenLabel(d.display_name),
        area,
        lat: d.latNum,
        lng: d.lngNum,
        source: "nominatim" as const,
      };
    }),
  };
}

/** Top-level geocoder. Routes between postcodes.io and Nominatim. */
export async function geocode(input: string): Promise<GeocodeLookup> {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: { kind: "empty" } };

  if (UK_POSTCODE_RE.test(trimmed)) {
    const pc = await lookupPostcode(trimmed);
    if (pc.ok) {
      return {
        ok: true,
        results: [
          {
            label: `${pc.result.postcode} · ${pc.result.area}`,
            area: pc.result.area,
            lat: pc.result.lat,
            lng: pc.result.lng,
            source: "postcodes_io" as const,
          },
        ],
      };
    }
    // For outside_london / network, surface directly. For not_found and
    // invalid_format, fall through to Nominatim — postcodes.io can be
    // strict about formatting, and the user may have typed something
    // that *almost* looks like a postcode.
    if (pc.error.kind === "outside_london")
      return { ok: false, error: { kind: "outside_london" } };
    if (pc.error.kind === "network")
      return { ok: false, error: { kind: "network" } };
  }

  return geocodeViaNominatim(trimmed);
}

export function describeGeocodeError(error: GeocodeError): string {
  switch (error.kind) {
    case "empty":
      return "";
    case "not_found":
      return "Couldn't find that in London. Try a postcode, station, or area name.";
    case "outside_london":
      return "That location is outside Greater London.";
    case "network":
      return "Couldn't reach the search service. Try again.";
  }
}
