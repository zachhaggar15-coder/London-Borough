/**
 * Median rent per London borough, for the map's rent explorer.
 *
 * There is no borough-level London rent table in the repo, so each
 * borough's figure is the median of its local-area rents: the one-bed and
 * two-bed medians of every neighbourhood in that borough, pooled. It is a
 * consistent comparison across the 31 boroughs, not an ONS borough figure.
 */

import { boroughNamesFor } from "@/lib/boroughs";
import { LONDON_BOROUGHS } from "@/lib/commute-details";
import type { LatLng, Neighbourhood } from "@/lib/types";

export type BoroughRent = {
  /** Name as the site writes it, e.g. "Hammersmith & Fulham". */
  name: string;
  /** Name as the ONS boundary data writes it, e.g. "Hammersmith and Fulham". */
  boundaryName: string;
  medianGbp: number;
  areaCount: number;
  centroid: LatLng;
};

/** Five colours from cheapest to dearest. Matched by RENT_BAND_BREAKS. */
export const RENT_BAND_COLOURS = [
  "#2dd4bf",
  "#a3e635",
  "#facc15",
  "#fb923c",
  "#f43f5e",
] as const;

export function boundaryNameFor(name: string): string {
  return name.replace(" & ", " and ");
}

export function londonBoroughRents(
  neighbourhoods: Neighbourhood[],
): BoroughRent[] {
  return LONDON_BOROUGHS.map((name) => {
    const areas = neighbourhoods.filter((n) =>
      boroughNamesFor(n.borough).includes(name),
    );
    const rents = areas
      .flatMap((a) => [a.rent.oneBedMedianGbp, a.rent.twoBedMedianGbp])
      .sort((a, b) => a - b);

    return {
      name,
      boundaryName: boundaryNameFor(name),
      medianGbp: roundToNearest(median(rents), 25),
      areaCount: areas.length,
      centroid: averageCentroid(areas.map((a) => a.centroid)),
    };
  });
}

/**
 * Upper edges of the four breaks between the five colour bands. Quintiles
 * of the borough medians, so each colour covers roughly a fifth of London.
 */
export function rentBandBreaks(rents: BoroughRent[]): number[] {
  const sorted = rents.map((r) => r.medianGbp).sort((a, b) => a - b);
  return [1, 2, 3, 4].map((i) =>
    roundToNearest(sorted[Math.floor((i * sorted.length) / 5)], 25),
  );
}

export function rentBandIndex(medianGbp: number, breaks: number[]): number {
  return breaks.filter((b) => medianGbp >= b).length;
}

function median(sorted: number[]): number {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function averageCentroid(points: LatLng[]): LatLng {
  return {
    lat: points.reduce((sum, p) => sum + p.lat, 0) / points.length,
    lng: points.reduce((sum, p) => sum + p.lng, 0) / points.length,
  };
}

function roundToNearest(value: number, nearest: number): number {
  return Math.round(value / nearest) * nearest;
}
