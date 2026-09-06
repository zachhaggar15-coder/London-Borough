import { CITIES } from "@/lib/cities";
import { MANCHESTER_NEIGHBOURHOODS } from "@/lib/manchester/data/neighbourhoods";
import { MANCHESTER_DESTINATIONS } from "@/lib/manchester/data/destinations";
import {
  MANCHESTER_BBOX,
  MANCHESTER_BOUNDS,
  MANCHESTER_CENTRE,
} from "@/lib/manchester/geo";
import { polygonForManchesterArea } from "@/lib/manchester/polygons";
import { manchesterBoroughSummaries } from "@/lib/manchester/borough-summaries";
import {
  MANCHESTER_BOROUGH_BOUNDARY_ATTRIBUTION,
  MANCHESTER_BOROUGH_BOUNDARY_SOURCE_URL,
  MANCHESTER_BOROUGH_FILTER_NAMES,
  MANCHESTER_BOROUGH_NAME_FIELD,
} from "@/lib/manchester/data/borough-boundaries";
import { manchesterCommuteRouteSummary } from "@/lib/manchester/commute-details";
import { manchesterRentProfileFor, manchesterSelectedRentGbp } from "@/lib/manchester/rent";
import {
  GM_TRANSIT_KMH,
  MANCHESTER_COMMUTE_TIMES,
  haversineKm,
} from "@/lib/manchester/commute";
import { approximateIsochrone } from "@/lib/isochrone";
import { manchesterPath } from "@/lib/manchester/seo-data";
import type { CityData } from "@/components/CityDataProvider";
import type { CommuteEstimateSource, Destination } from "@/lib/types";

const NEIGHBOURHOODS_BY_ID = Object.fromEntries(
  MANCHESTER_NEIGHBOURHOODS.map((n) => [n.id, n]),
);

/**
 * Greater Manchester's binding of the interactive tool.
 *
 * The one structural difference from London is that nothing here talks to
 * a server. Transport for Greater Manchester publishes no open journey
 * planner, so the reviewed matrix is the only source of truth, it is
 * already in the client bundle, and resolving it locally is both faster
 * and more honest than round-tripping to an endpoint that would only look
 * the same numbers up.
 */
export const MANCHESTER_CITY_DATA: CityData = {
  city: CITIES.manchester,

  neighbourhoods: MANCHESTER_NEIGHBOURHOODS,
  neighbourhoodsById: NEIGHBOURHOODS_BY_ID,
  destinations: MANCHESTER_DESTINATIONS,

  bounds: MANCHESTER_BOUNDS,
  centre: MANCHESTER_CENTRE,
  // Starts closer in than London: the built-up area is smaller, and at
  // London's zoom half the viewport would be Cheshire and the Peak.
  initialZoom: 9.8,

  geoScope: {
    bbox: {
      west: MANCHESTER_BBOX.minLng,
      east: MANCHESTER_BBOX.maxLng,
      south: MANCHESTER_BBOX.minLat,
      north: MANCHESTER_BBOX.maxLat,
    },
    noun: "Greater Manchester",
  },

  polygonFor: polygonForManchesterArea,
  boroughSummaries: manchesterBoroughSummaries,

  boroughBoundary: {
    sourceUrl: MANCHESTER_BOROUGH_BOUNDARY_SOURCE_URL,
    nameField: MANCHESTER_BOROUGH_NAME_FIELD,
    filterNames: MANCHESTER_BOROUGH_FILTER_NAMES,
    attribution: MANCHESTER_BOROUGH_BOUNDARY_ATTRIBUTION,
  },

  scoringAdapters: { selectedRent: manchesterSelectedRentGbp },
  rentProfileFor: manchesterRentProfileFor,
  commuteRouteSummary: manchesterCommuteRouteSummary,

  /**
   * Resolved entirely in the browser. Reviewed figures where the matrix
   * has them; a straight-line estimate at the regional average speed
   * otherwise, labelled as such so the drawer can say which it is showing.
   */
  async fetchCommute(destination: Destination) {
    const commute: Record<string, number> = {};
    const sources: Record<string, CommuteEstimateSource> = {};

    for (const n of MANCHESTER_NEIGHBOURHOODS) {
      const reviewed = MANCHESTER_COMMUTE_TIMES[n.id]?.[destination.id];
      if (reviewed != null) {
        commute[n.id] = reviewed;
        sources[n.id] = "staticMatrix";
        continue;
      }
      // A custom destination the matrix has never seen, e.g. one the user
      // searched for rather than picked from the list.
      const km = haversineKm(n.centroid, destination.centroid);
      commute[n.id] = Math.max(10, Math.round(km * (60 / GM_TRANSIT_KMH)));
      sources[n.id] = "distanceHeuristic";
    }

    return { commute, sources };
  },

  async fetchIsochrone(destination, maxMinutes, commute) {
    const reachable = MANCHESTER_NEIGHBOURHOODS.filter(
      (n) => (commute[n.id] ?? Infinity) <= maxMinutes,
    ).map((n) => ({ centroid: n.centroid, commuteMinutes: commute[n.id] }));

    return approximateIsochrone(destination.centroid, reachable, maxMinutes);
  },

  labels: {
    panelTitle: "Find where to live in Greater Manchester",
    panelSubtitle: "Compare areas by commute, rent and everyday life.",
    boroughNoun: "Greater Manchester boroughs",
    boroughSearchLabel: "Search borough",
    shareTitle: "My best places to live in Greater Manchester",
    shareText: "Here are my Where in Manchester results.",
    destinationPlaceholder: "e.g. M1 1AE · Piccadilly · Chorlton",
  },

  links: {
    areaGuides: manchesterPath("/neighbourhoods"),
    compare: manchesterPath("/compare"),
    rentIndex: manchesterPath("/rent-index"),
    methodology: manchesterPath("/methodology"),
    areaHref: (id) => manchesterPath(`/neighbourhoods/${id}`),
  },
};
