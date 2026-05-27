/**
 * UK postcode lookup via postcodes.io.
 *
 * postcodes.io is a free public API maintained by Ideal Postcodes — no
 * key, no signup, generous rate limits, CORS-enabled. Perfect for an
 * MVP that needs to convert "SW1A 1AA" into a lat/lng without owning
 * a geocoder.
 *
 * https://postcodes.io
 *
 * We intentionally call this from the browser, not from a Next.js API
 * route. Reasons:
 *   - No secret to hide (it's a public API)
 *   - One less network hop
 *   - Easier to show loading + error states inline
 */

/** Greater London bounding box (slightly generous). */
const LONDON_BBOX = {
  west: -0.6,
  east: 0.4,
  south: 51.25,
  north: 51.75,
};

export type PostcodeResult = {
  /** Normalised postcode, e.g. "SW1A 1AA" */
  postcode: string;
  /** A short human label of the area, e.g. "Westminster" */
  area: string;
  lat: number;
  lng: number;
};

export type PostcodeError =
  | { kind: "invalid_format" }
  | { kind: "not_found" }
  | { kind: "outside_london" }
  | { kind: "network" };

export type PostcodeLookup =
  | { ok: true; result: PostcodeResult }
  | { ok: false; error: PostcodeError };

/** Loose UK-postcode regex. Postcodes.io is the real validator;
 *  this just catches obvious junk before we make the network call. */
const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export async function lookupPostcode(input: string): Promise<PostcodeLookup> {
  const trimmed = input.trim();
  if (!UK_POSTCODE_RE.test(trimmed)) {
    return { ok: false, error: { kind: "invalid_format" } };
  }

  // postcodes.io accepts the postcode with or without spaces.
  const encoded = encodeURIComponent(trimmed);

  let res: Response;
  try {
    res = await fetch(`https://api.postcodes.io/postcodes/${encoded}`);
  } catch {
    return { ok: false, error: { kind: "network" } };
  }

  if (res.status === 404) {
    return { ok: false, error: { kind: "not_found" } };
  }
  if (!res.ok) {
    return { ok: false, error: { kind: "network" } };
  }

  const data = (await res.json()) as {
    status: number;
    result: {
      postcode: string;
      latitude: number;
      longitude: number;
      admin_district?: string | null;
      admin_ward?: string | null;
      parish?: string | null;
      region?: string | null;
    } | null;
  };

  if (data.status !== 200 || !data.result) {
    return { ok: false, error: { kind: "not_found" } };
  }

  const r = data.result;
  // Greater London check — better to fail fast than show a useless map.
  if (
    r.longitude < LONDON_BBOX.west ||
    r.longitude > LONDON_BBOX.east ||
    r.latitude < LONDON_BBOX.south ||
    r.latitude > LONDON_BBOX.north
  ) {
    return { ok: false, error: { kind: "outside_london" } };
  }

  // Prefer the smallest meaningful area name.
  const area =
    r.admin_ward ||
    r.parish ||
    r.admin_district ||
    r.region ||
    "London";

  return {
    ok: true,
    result: {
      postcode: r.postcode,
      area,
      lat: r.latitude,
      lng: r.longitude,
    },
  };
}

/** Human-readable message for an error case. Used by the UI. */
export function describePostcodeError(error: PostcodeError): string {
  switch (error.kind) {
    case "invalid_format":
      return "That doesn't look like a UK postcode.";
    case "not_found":
      return "Postcode not found.";
    case "outside_london":
      return "That postcode is outside Greater London.";
    case "network":
      return "Couldn't reach the postcode service. Try again.";
  }
}
