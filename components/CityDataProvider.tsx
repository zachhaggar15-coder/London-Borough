"use client";

import { createContext, useContext } from "react";
import type { City } from "@/lib/cities";
import type { BoroughSummary } from "@/lib/boroughs";
import type { ScoringAdapters } from "@/lib/scoring";
import type { GeoScope } from "@/lib/postcodes";
import type { CommuteRouteSummary } from "@/lib/commute-details";
import type {
  CommuteEstimateSource,
  Destination,
  Neighbourhood,
  RentProfile,
  ScoredNeighbourhood,
  UserQuery,
} from "@/lib/types";

/**
 * Everything the interactive tool needs that differs between cities.
 *
 * The map, control panel, list, drawer and shortlist were all written
 * against London's module-level singletons — `NEIGHBOURHOODS`,
 * `DESTINATIONS`, `LONDON_BOUNDS`. Reading them from a context instead
 * means one implementation serves both cities, so a fix to the drawer is
 * a fix in both places rather than a fix and a forgotten twin.
 *
 * Everything here is data or a pure function. No component needs to know
 * which city it is rendering; it asks the context for the pieces.
 */
export type CityData = {
  city: City;

  neighbourhoods: Neighbourhood[];
  neighbourhoodsById: Record<string, Neighbourhood>;
  destinations: Destination[];

  /** Map viewport constraints: [[west, south], [east, north]]. */
  bounds: [[number, number], [number, number]];
  centre: { lat: number; lng: number };
  /** Initial zoom. Greater Manchester is smaller, so it starts closer in. */
  initialZoom: number;

  /** Bounds and area noun for postcode/address search. */
  geoScope: GeoScope;

  polygonFor: (id: string) => GeoJSON.Polygon | null;
  boroughSummaries: (scored: ScoredNeighbourhood[]) => BoroughSummary[];

  /** ArcGIS boundary layer for this city's local authorities. */
  boroughBoundary: {
    sourceUrl: string;
    nameField: string;
    filterNames: string[];
    attribution: string;
  };

  scoringAdapters: ScoringAdapters;
  rentProfileFor: (n: Neighbourhood) => RentProfile;
  commuteRouteSummary: (
    n: Neighbourhood,
    query: UserQuery,
    source?: CommuteEstimateSource | null,
  ) => CommuteRouteSummary;

  /**
   * How this city gets its commute times.
   *
   * London posts to /api/commute, which can reach the TfL Journey
   * Planner. Greater Manchester has no equivalent open endpoint, so it
   * resolves its reviewed matrix locally and never makes a request.
   */
  fetchCommute: (destination: Destination) => Promise<{
    commute: Record<string, number>;
    sources: Record<string, CommuteEstimateSource>;
  }>;

  /**
   * The reachable-area overlay. London asks the server; Manchester
   * computes it in the browser from the same reviewed times.
   */
  fetchIsochrone: (
    destination: Destination,
    maxMinutes: number,
    commute: Record<string, number>,
  ) => Promise<GeoJSON.Feature<GeoJSON.Polygon> | null>;

  /** User-facing strings that name the city. */
  labels: {
    panelTitle: string;
    panelSubtitle: string;
    boroughNoun: string;
    boroughSearchLabel: string;
    shareTitle: string;
    shareText: string;
    /** Example postcode / station / area for the destination search box. */
    destinationPlaceholder: string;
  };

  /** Where the tool's own hub links point. */
  links: {
    areaGuides: string;
    compare: string;
    rentIndex: string;
    methodology: string;
    areaHref: (id: string) => string;
  };
};

const CityDataContext = createContext<CityData | null>(null);

export function CityDataProvider({
  value,
  children,
}: {
  value: CityData;
  children: React.ReactNode;
}) {
  return (
    <CityDataContext.Provider value={value}>{children}</CityDataContext.Provider>
  );
}

export function useCityData(): CityData {
  const value = useContext(CityDataContext);
  if (!value) {
    throw new Error(
      "useCityData must be used inside a CityDataProvider. The interactive " +
        "tool is city-specific and has no sensible default.",
    );
  }
  return value;
}
