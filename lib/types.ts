/**
 * Shared domain types — the single source of truth for shapes used across
 * the app. Don't redeclare these in components; import from here.
 *
 * Designed so that lifestyle scores are flat (easy to feed into scoring +
 * radar charts) and provenance (source + asOf) is captured per metric.
 */

export type LatLng = { lat: number; lng: number };

/**
 * A piece of launch data with metadata about where it came from.
 */
export type Provenance = {
  source:
    | "ons"
    | "listing_sample"
    | "market_review"
    | "osm"
    | "police"
    | "census"
    | "tfl"
    | "manual_review";
  asOf: string; // ISO date (yyyy-mm-dd is fine)
};

/**
 * Lifestyle scores. All 0..10, comparable across neighbourhoods.
 * Keep this object flat — the scoring + radar UIs assume it.
 */
export type LifestyleScores = {
  livelyVsQuiet: number;              // 0 = very quiet, 10 = very lively
  greenSpace: number;
  nightlife: number;
  cafeDensity: number;
  gymDensity: number;
  walkability: number;
  foodScene: number;
  youngProfessionalDensity: number;
  safety: number;                     // higher = safer
  connectivity: number;               // transport options & reach
};

export const LIFESTYLE_KEYS: (keyof LifestyleScores)[] = [
  "livelyVsQuiet",
  "greenSpace",
  "nightlife",
  "cafeDensity",
  "gymDensity",
  "walkability",
  "foodScene",
  "youngProfessionalDensity",
  "safety",
  "connectivity",
];

export const LIFESTYLE_LABELS: Record<keyof LifestyleScores, string> = {
  livelyVsQuiet: "Lively",
  greenSpace: "Green space",
  nightlife: "Nightlife",
  cafeDensity: "Café density",
  gymDensity: "Gym density",
  walkability: "Walkability",
  foodScene: "Food scene",
  youngProfessionalDensity: "Young professionals",
  safety: "Safety",
  connectivity: "Transport",
};

export type Station = {
  name: string;
  lines: string[]; // e.g. ["Northern", "Overground"]
};

export type Rent = {
  oneBedMedianGbp: number;
  twoBedMedianGbp: number;
} & Provenance;

export type RentBasis =
  | "houseShareLowerEnd"
  | "flatShareUpperEnd"
  | "oneBedFlat"
  | "twoBedFlat";

export type RentProfile = {
  houseShareLowerEndGbp: number;
  flatShareUpperEndGbp: number;
  oneBedFlatGbp: number;
  twoBedFlatGbp: number;
  roomSource: Provenance;
  oneBedSource: Provenance;
};

export type Neighbourhood = {
  // Identity
  id: string;          // slug, e.g. "tooting"
  name: string;
  borough: string;

  // Geography
  centroid: LatLng;
  /** Optional area polygon. If absent, the map generates a deterministic
   *  display polygon from the curated centroid. */
  polygon?: GeoJSON.Polygon;
  transportZones: number[];

  // Affordability
  rent: Rent;

  // Transport
  mainStations: Station[];

  // Lifestyle
  lifestyle: LifestyleScores;

  // Editorial
  summary: string;
  strengths: string[];
  tradeoffs: string[];

  // Data quality flag for the whole neighbourhood
  dataQuality: "sourceBacked" | "full";
};

/**
 * A popular destination — typically an office. Used both as a quick-select
 * dropdown and to look up static commute-time estimates when needed.
 */
export type Destination = {
  id: string;
  label: string;
  centroid: LatLng;
};

/**
 * Personality archetypes — the user picks one (or none) to describe the
 * kind of area they're looking for. Each archetype maps deterministically
 * to a scoring function over the existing LifestyleScores (see
 * lib/personalities.ts). Why archetypes and not weights? Weights can only
 * express "more is better"; archetypes can express "I want LESS nightlife"
 * for Chill, which a slider can't.
 */
export type PersonalityKey =
  | "lively"
  | "chill"
  | "sporty"
  | "social"
  | "professional"
  | "balanced";

/**
 * The user's current query. Lives in the Zustand store. Every component that
 * reacts to user input subscribes to a slice of this.
 */
export type UserQuery = {
  destination: Destination | null;
  maxCommuteMinutes: number;
  monthlyRentBudgetGbp: number | null;
  annualSalaryGbp: number | null;
  rentBasis: RentBasis;
  rentBudgetShareOfTakeHome: number; // 0..1, defaults to 0.35

  /** Primary archetype the user picked. Null = no personality preference. */
  personality: PersonalityKey | null;

  /** Granular per-dimension weights. Used only when personality is null
   *  AND the user has opened the advanced section. */
  lifestyleWeights: Partial<Record<keyof LifestyleScores, number>>; // 0..1
};

/**
 * A result row — a neighbourhood scored against the current query.
 * Computed reactively in the store; rendered by the list and the map.
 */
export type ScoredNeighbourhood = {
  neighbourhood: Neighbourhood;
  commuteMinutes: number | null;       // null if unknown
  isExcluded: boolean;                  // commute > threshold
  affordabilityScore: number;           // 0..1
  lifestyleScore: number;               // 0..1
  matchScore: number;                   // 0..1 final
  rentVsBudget: number | null;          // ratio; <1 = under budget
  selectedRentGbp: number;
};
