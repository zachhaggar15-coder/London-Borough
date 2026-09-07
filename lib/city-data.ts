import type { CityData } from "@/components/CityDataProvider";
import type { CityContent } from "@/lib/city-content";
import { createPolygonIndex, type CorridorFamily } from "@/lib/polygon-engine";
import { approximateIsochrone } from "@/lib/isochrone";
import {
  createCommuteRouteSummary,
  type CommuteNarrativeConfig,
} from "@/lib/city-commute-details";
import { councilSummaries } from "@/lib/council-summaries";
import { haversineKm } from "@/lib/city-content";
import type {
  CommuteEstimateSource,
  Destination,
  LatLng,
  Neighbourhood,
  RentProfile,
} from "@/lib/types";

/**
 * The interactive tool's binding for a generated city.
 *
 * Manchester used to hand-write this file; Bristol, Leeds and Edinburgh
 * would each have written a near-identical copy. What actually differs
 * between them is small — the map viewport, the corridors that shape the
 * area footprints, the boundary layer's authority codes and a handful of
 * label strings — so that is all a city supplies.
 *
 * One structural note that applies to every city here and not to London:
 * nothing below talks to a server. None of these regions publishes an
 * open journey-planner API, so the reviewed matrix is the only source of
 * truth, it is already in the client bundle, and resolving it locally is
 * both faster and more honest than round-tripping to an endpoint that
 * would look the same numbers up.
 */
export type CityMapConfig = {
  centre: LatLng;
  bbox: { minLat: number; maxLat: number; minLng: number; maxLng: number };
  initialZoom: number;
  /**
   * How each transport corridor leaves the centre, as a rough compass
   * bearing. This is what elongates an area's footprint along its line
   * rather than drawing it as a circle.
   */
  corridors: CorridorFamily[];
  /** ONS local authority codes for the boundary layer, in council order. */
  onsCodes: Record<string, string>;
  /**
   * How the boundary layer spells a council's name, where it differs
   * from the name used in prose. The ONS calls Bristol "Bristol, City
   * of"; using anything else means the map outline never matches the
   * council pages.
   */
  boundaryNames?: Record<string, string>;
  /** Room-in-a-share spread around the sampled district average. */
  roomSpread?: { lower: number; upper: number };
  /** How to describe the shape of a journey, mode by mode. */
  commuteNarrative: CommuteNarrativeConfig;
  labels: {
    panelTitle: string;
    panelSubtitle: string;
    destinationPlaceholder: string;
  };
};

const BOUNDARY_ATTRIBUTION =
  "Contains OS data Crown copyright and database right 2025; ONS licensed under OGL v3.";

const BOUNDARY_NAME_FIELD = "LAD24NM";

/** A room at the cheaper end of a district, and at the dearer end. */
const DEFAULT_ROOM_SPREAD = { lower: 0.85, upper: 1.15 };

function boundaryUrl(codes: string[]): string {
  const where = `LAD24CD IN (${codes.map((c) => `'${c}'`).join(",")})`;
  return (
    "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/" +
    "Local_Authority_Districts_May_2024_Boundaries_UK_BUC/FeatureServer/0/query" +
    `?where=${encodeURIComponent(where)}` +
    `&outFields=${encodeURIComponent(`LAD24CD,${BOUNDARY_NAME_FIELD}`)}` +
    "&returnGeometry=true" +
    "&outSR=4326" +
    "&f=geojson"
  );
}

function roundTo25(value: number): number {
  return Math.round(value / 25) * 25;
}

export function createCityData(
  content: CityContent,
  config: CityMapConfig,
): CityData {
  const { city, areas, input } = content;
  const spread = config.roomSpread ?? DEFAULT_ROOM_SPREAD;

  const rentProfileFor = (n: Neighbourhood): RentProfile => {
    const room = content.roomRentFor(n);
    return {
      houseShareLowerEndGbp: roundTo25(room * spread.lower),
      flatShareUpperEndGbp: roundTo25(room * spread.upper),
      oneBedFlatGbp: n.rent.oneBedMedianGbp,
      twoBedFlatGbp: n.rent.twoBedMedianGbp,
      roomSource: { source: "listing_sample", asOf: input.rent.reviewedAsOf },
      oneBedSource: n.rent,
    };
  };

  return {
    city,

    neighbourhoods: areas,
    neighbourhoodsById: content.areasById,
    destinations: input.destinations,

    bounds: [
      [config.bbox.minLng, config.bbox.minLat],
      [config.bbox.maxLng, config.bbox.maxLat],
    ],
    centre: config.centre,
    initialZoom: config.initialZoom,

    geoScope: {
      bbox: {
        west: config.bbox.minLng,
        east: config.bbox.maxLng,
        south: config.bbox.minLat,
        north: config.bbox.maxLat,
      },
      noun: input.regionName,
    },

    polygonFor: createPolygonIndex({
      neighbourhoods: areas,
      centre: config.centre,
      corridorFamilies: config.corridors,
    }),

    boroughSummaries: (scored) => councilSummaries(input.councils, scored),

    boroughBoundary: {
      sourceUrl: boundaryUrl(
        input.councils.map((c) => config.onsCodes[c]).filter(Boolean),
      ),
      nameField: BOUNDARY_NAME_FIELD,
      filterNames: input.councils.map(
        (c) => config.boundaryNames?.[c] ?? c,
      ),
      attribution: BOUNDARY_ATTRIBUTION,
    },

    scoringAdapters: { selectedRent: content.selectedRent },
    rentProfileFor,
    commuteRouteSummary: createCommuteRouteSummary(config.commuteNarrative),

    async fetchCommute(destination: Destination) {
      const commute: Record<string, number> = {};
      const sources: Record<string, CommuteEstimateSource> = {};

      for (const n of areas) {
        const reviewed = input.commuteTimes[n.id]?.[destination.id];
        if (reviewed != null) {
          commute[n.id] = reviewed;
          sources[n.id] = "staticMatrix";
          continue;
        }
        // A destination the matrix has never seen, e.g. one the reader
        // searched for rather than picked from the list.
        const km = haversineKm(n.centroid, destination.centroid);
        commute[n.id] = Math.max(10, Math.round(km * (60 / input.transitKmh)));
        sources[n.id] = "distanceHeuristic";
      }

      return { commute, sources };
    },

    async fetchIsochrone(destination, maxMinutes, commute) {
      const reachable = areas
        .filter((n) => (commute[n.id] ?? Infinity) <= maxMinutes)
        .map((n) => ({ centroid: n.centroid, commuteMinutes: commute[n.id] }));

      return approximateIsochrone(destination.centroid, reachable, maxMinutes);
    },

    labels: {
      panelTitle: config.labels.panelTitle,
      panelSubtitle: config.labels.panelSubtitle,
      boroughNoun: `${input.regionName} ${input.councilNoun.plural}`,
      boroughSearchLabel: `Search ${input.councilNoun.singular}`,
      shareTitle: `My best places to live in ${input.regionName}`,
      shareText: `Here are my ${city.brand} results.`,
      destinationPlaceholder: config.labels.destinationPlaceholder,
    },

    links: {
      areaGuides: content.path("/neighbourhoods"),
      compare: content.path("/compare"),
      rentIndex: content.path("/rent-index"),
      methodology: content.path("/methodology"),
      areaHref: (id) => content.path(`/neighbourhoods/${id}`),
    },
  };
}
