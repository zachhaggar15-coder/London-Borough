import { amazonUkProductUrl, amazonUkSearchUrl } from "@/lib/monetisation";
import type { Neighbourhood } from "@/lib/types";

/**
 * Contextual Amazon picks for the /compare/[slug] pages.
 *
 * Compare pages are generated from a single template across ~2,500 slugs, so
 * products cannot be hand-picked per page. Instead each pair resolves to one
 * segment based on the lifestyle scores and rent already in the neighbourhood
 * data, and that segment supplies the picks.
 *
 * Picks carry either an `asin` (direct product link) or a `search` term
 * (tagged Amazon UK search). Search terms are placeholders for categories that
 * do not yet have a confirmed ASIN — replace `search` with `asin` as products
 * are chosen. See docs/affiliate-segments.md.
 */

export type CompareSegmentId = "prime" | "central" | "leafy" | "outer";

export type ComparePick = {
  label: string;
  fit: string;
  /** Confirmed product. Takes precedence over `search`. */
  asin?: string;
  /** Category fallback until an ASIN is confirmed. */
  search?: string;
};

export type CompareSegment = {
  id: CompareSegmentId;
  /** Shown above the picks, with area names interpolated by the component. */
  heading: string;
  intro: string;
  picks: ComparePick[];
};

/** Shown on every compare page regardless of segment (section E). */
export const UNIVERSAL_PICKS: ComparePick[] = [
  {
    label: "Moving boxes",
    fit: "Strong double-walled boxes with handles",
    asin: "B0B3JGDY8D",
  },
  {
    label: "Tape measure",
    fit: "Check bed, sofa and wardrobe fit at viewings",
    asin: "B07TFYBHBQ",
  },
  {
    label: "Damp meter",
    fit: "Spot condensation problems before you sign",
    search: "digital humidity meter damp tester",
  },
];

const SEGMENTS: Record<CompareSegmentId, CompareSegment> = {
  // Section B — prime central. Higher basket value, no budget framing.
  prime: {
    id: "prime",
    heading: "Kit for a prime central flat",
    intro:
      "Both areas sit at the top of the London rental market, where the practical problems are air quality, security and making a period flat feel finished.",
    picks: [
      {
        label: "Air purifier",
        fit: "Central London air quality, especially on busier roads",
        search: "HEPA air purifier home",
      },
      {
        label: "Smart video doorbell",
        fit: "Parcel security in mansion blocks and shared entrances",
        search: "video doorbell wireless",
      },
      {
        label: "Cabin luggage",
        fit: "Hard-wearing carry-on for a travel-heavy schedule",
        search: "cabin suitcase hard shell",
      },
    ],
  },

  // Section C — central and lively. Highest-traffic cluster on the site.
  central: {
    id: "central",
    heading: "Kit for a lively, central flat",
    intro:
      "These are busy, well-connected areas where the trade-off is noise and space. The kit that matters most is what makes a small flat quieter and better organised.",
    picks: [
      {
        label: "Reusable earplugs",
        fit: "Late-night street and pub noise without blocking your alarm",
        search: "reusable noise reduction earplugs sleep",
      },
      {
        label: "Blackout blind",
        fit: "No-drill blackout for streetlights and early summer mornings",
        search: "no drill blackout blind",
      },
      {
        label: "Vacuum storage bags",
        fit: "Reclaim wardrobe space in a small central flat",
        asin: "B07RSCPH4N",
      },
    ],
  },

  // Section A — leafy and suburban. Space over centrality.
  leafy: {
    id: "leafy",
    heading: "Kit for a greener, quieter area",
    intro:
      "Both areas trade nightlife for green space and calm. The useful kit is built around getting outdoors and handling a slightly longer walk to the shops.",
    picks: [
      {
        label: "Waterproof walking boots",
        fit: "Commons, parks and towpaths in winter",
        search: "waterproof walking boots",
      },
      {
        label: "Folding shopping trolley",
        fit: "Bigger weekly shops when you are further from the station",
        search: "folding shopping trolley wheels",
      },
      {
        label: "Dehumidifier",
        fit: "Older housing stock and damp winter rooms",
        asin: "B09TBKCCSS",
      },
    ],
  },

  // Section D — outer London and longer commutes.
  outer: {
    id: "outer",
    heading: "Kit for a longer commute",
    intro:
      "Both areas trade journey time for lower rent and more space. The kit that pays off is whatever makes a longer daily journey and an older flat easier to live with.",
    picks: [
      {
        label: "Noise-cancelling headphones",
        fit: "The single best upgrade for a 45-minute-plus commute",
        search: "noise cancelling headphones over ear",
      },
      {
        label: "Insulated food flask",
        fit: "Hot lunches without hunting for an office microwave",
        asin: "B00DGPPY20",
      },
      {
        label: "Heated clothes airer",
        fit: "Indoor drying without turning the flat into a damp room",
        asin: "B07DNYMXXZ",
      },
    ],
  },
};

/**
 * Resolve a compare pair to one segment.
 *
 * Ordered — first match wins — so every pair lands in exactly one bucket.
 * The pair is judged on its combined profile: the most expensive of the two
 * areas decides "prime", the liveliest decides "central", and so on.
 */
export function resolveCompareSegment(
  a: Neighbourhood,
  b: Neighbourhood,
): CompareSegment {
  const maxRent = Math.max(a.rent.oneBedMedianGbp, b.rent.oneBedMedianGbp);
  const minRent = Math.min(a.rent.oneBedMedianGbp, b.rent.oneBedMedianGbp);
  const maxNightlife = Math.max(a.lifestyle.nightlife, b.lifestyle.nightlife);
  const maxYoungPro = Math.max(
    a.lifestyle.youngProfessionalDensity,
    b.lifestyle.youngProfessionalDensity,
  );
  const maxGreen = Math.max(a.lifestyle.greenSpace, b.lifestyle.greenSpace);
  const minConnectivity = Math.min(
    a.lifestyle.connectivity,
    b.lifestyle.connectivity,
  );

  if (maxRent >= 2400) return SEGMENTS.prime;
  if (maxNightlife >= 8 || maxYoungPro >= 9) return SEGMENTS.central;
  if (maxGreen >= 8 && maxNightlife <= 5) return SEGMENTS.leafy;
  if (minConnectivity <= 6 || minRent <= 1500) return SEGMENTS.outer;

  // Remaining pairs are mid-market and well-connected; the commute-and-storage
  // angle is the safest default.
  return SEGMENTS.outer;
}

/** Resolve a pick to its tagged Amazon UK URL. */
export function pickUrl(pick: ComparePick): string {
  if (pick.asin) return amazonUkProductUrl(pick.asin);
  return amazonUkSearchUrl(pick.search ?? "");
}

/** Stable identifier for analytics, whether the pick is an ASIN or a search. */
export function pickTrackingId(pick: ComparePick): string {
  return pick.asin ?? `search:${pick.search ?? "unknown"}`;
}

export const COMPARE_SEGMENTS = SEGMENTS;
