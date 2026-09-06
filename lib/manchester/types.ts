import type { LatLng, LifestyleScores, Rent, Station } from "@/lib/types";
import type { TravelBand } from "@/lib/travel-band";
import type { GmBorough } from "@/lib/manchester/boroughs";
import type { RoomDistrictGroup } from "@/lib/manchester/data/rent-market";

/**
 * A Greater Manchester neighbourhood.
 *
 * Deliberately its own type rather than a reuse of the London
 * `Neighbourhood`. The two differ in exactly one structural field —
 * London carries `transportZones: number[]`, Manchester carries a
 * `travelBand` — and every attempt to unify them ends up either quoting
 * a Metrolink zone for a place with no tram, or making the zone optional
 * and forcing a null check into thirty London render paths that have
 * never needed one. The lifestyle, rent and station shapes are shared
 * from lib/types.ts, so the scoring and formatting helpers still apply
 * to both.
 */
export type ManchesterNeighbourhood = {
  id: string;
  name: string;
  borough: GmBorough;

  centroid: LatLng;
  travelBand: TravelBand;

  rent: Rent;
  /** Which room-pricing district group this area is sampled against. */
  roomDistrict: RoomDistrictGroup;

  mainStations: Station[];

  lifestyle: LifestyleScores;

  summary: string;
  strengths: string[];
  tradeoffs: string[];

  dataQuality: "sourceBacked" | "full";
};
