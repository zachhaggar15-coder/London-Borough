import type { Neighbourhood } from "@/lib/types";
import { TRAVEL_BAND_LABELS } from "@/lib/travel-band";

/**
 * Reading centrality across two cities that measure it differently.
 *
 * London areas carry `transportZones` (1-6); Greater Manchester areas
 * carry a `travelBand`. Both fields are optional on Neighbourhood so a
 * single type can serve both, and this module is where that optionality
 * is resolved — so no render path has to remember which city it is
 * looking at, and no London page ever has to null-check a field it has
 * always had.
 */

/** London travel zones for an area, or [] for a city that has none. */
export function zonesOf(n: Pick<Neighbourhood, "transportZones">): number[] {
  return n.transportZones ?? [];
}

/**
 * A short label for how central an area is, in whichever vocabulary its
 * city actually uses. "Zone 2", "Zones 2 & 3", or "Inner".
 */
export function centralityLabel(
  n: Pick<Neighbourhood, "transportZones" | "travelBand">,
): string {
  const zones = zonesOf(n);
  if (zones.length === 1) return `Zone ${zones[0]}`;
  if (zones.length > 1) return `Zones ${zones.join(" & ")}`;
  if (n.travelBand) return TRAVEL_BAND_LABELS[n.travelBand];
  return "";
}

/**
 * A sort key running centre-outwards, comparable within a city but not
 * across them. Areas with neither field sort last.
 */
export function centralityRank(
  n: Pick<Neighbourhood, "transportZones" | "travelBand">,
): number {
  const zones = zonesOf(n);
  if (zones.length > 0) return Math.min(...zones);
  switch (n.travelBand) {
    case "central":
      return 1;
    case "inner":
      return 2;
    case "outer":
      return 3;
    case "fringe":
      return 4;
    default:
      return Number.POSITIVE_INFINITY;
  }
}
