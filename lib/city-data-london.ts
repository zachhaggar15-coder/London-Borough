import { CITIES } from "@/lib/cities";
import { NEIGHBOURHOODS, NEIGHBOURHOODS_BY_ID } from "@/lib/data/neighbourhoods";
import { DESTINATIONS } from "@/lib/data/destinations";
import { LONDON_CENTRE } from "@/lib/geo";
import { LONDON_SCOPE } from "@/lib/postcodes";
import { polygonForNeighbourhood } from "@/lib/data/polygons";
import { boroughSummaries } from "@/lib/boroughs";
import {
  BOROUGH_BOUNDARY_ATTRIBUTION,
  BOROUGH_BOUNDARY_SOURCE_URL,
  BOROUGH_FILTER_NAMES,
  BOROUGH_NAME_FIELD,
} from "@/lib/data/borough-boundaries";
import { commuteRouteSummary } from "@/lib/commute-details";
import { rentProfileFor, selectedRentGbp } from "@/lib/rent";
import type { CityData } from "@/components/CityDataProvider";
import type { CommuteEstimate, Destination } from "@/lib/types";

/**
 * London's binding of the interactive tool.
 *
 * Everything here already existed as module-level singletons; this only
 * collects them so the shared components can read one object instead of
 * importing London directly.
 */
export const LONDON_CITY_DATA: CityData = {
  city: CITIES.london,

  neighbourhoods: NEIGHBOURHOODS,
  neighbourhoodsById: NEIGHBOURHOODS_BY_ID,
  destinations: DESTINATIONS,

  bounds: [
    [-0.6, 51.25],
    [0.4, 51.75],
  ],
  centre: LONDON_CENTRE,
  initialZoom: 9.4,

  geoScope: LONDON_SCOPE,

  polygonFor: polygonForNeighbourhood,
  boroughSummaries,

  boroughBoundary: {
    sourceUrl: BOROUGH_BOUNDARY_SOURCE_URL,
    nameField: BOROUGH_NAME_FIELD,
    filterNames: BOROUGH_FILTER_NAMES,
    attribution: BOROUGH_BOUNDARY_ATTRIBUTION,
  },

  scoringAdapters: { selectedRent: selectedRentGbp },
  rentProfileFor,
  commuteRouteSummary,

  /**
   * London posts to /api/commute, which can reach the TfL Journey
   * Planner when ROUTING_PROVIDER is set to "tfl". The key never reaches
   * the browser, which is why this is a request rather than a local
   * computation.
   */
  async fetchCommute(destination: Destination) {
    const response = await fetch("/api/commute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinationLatLng: destination.centroid }),
    });
    if (!response.ok) throw new Error(`Commute API ${response.status}`);
    const data: {
      commute?: Record<string, number>;
      estimates?: Record<string, CommuteEstimate>;
    } = await response.json();

    return {
      commute: data.commute ?? {},
      sources: Object.fromEntries(
        Object.entries(data.estimates ?? {}).map(([id, estimate]) => [
          id,
          estimate.source,
        ]),
      ),
    };
  },

  async fetchIsochrone(destination, maxMinutes, commute) {
    const reachable = NEIGHBOURHOODS.filter(
      (n) => (commute[n.id] ?? Infinity) <= maxMinutes,
    ).map((n) => ({ centroid: n.centroid, commuteMinutes: commute[n.id] }));

    const response = await fetch("/api/isochrone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destinationLatLng: destination.centroid,
        maxMinutes,
        fallbackReachable: reachable,
      }),
    });
    if (!response.ok) throw new Error(`Isochrone API ${response.status}`);
    const data: { feature?: GeoJSON.Feature<GeoJSON.Polygon> } =
      await response.json();
    return data.feature ?? null;
  },

  labels: {
    panelTitle: "Find where to live in London",
    panelSubtitle: "Compare neighbourhoods by commute, rent and everyday life.",
    boroughNoun: "London boroughs",
    boroughSearchLabel: "Search borough",
    shareTitle: "My best places to live in London",
    shareText: "Here are my Where in London results.",
    destinationPlaceholder: "e.g. SW1A 1AA · King's Cross · Tooting",
  },

  links: {
    areaGuides: "/neighbourhoods",
    compare: "/compare",
    rentIndex: "/london-rent-index",
    methodology: "/methodology",
    areaHref: (id) => `/neighbourhoods/${id}`,
  },
};
