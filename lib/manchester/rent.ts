import { MANCHESTER_ROOM_SOURCE, ROOM_DISTRICT_AVERAGE_GBP } from "@/lib/manchester/data/rent-market";
import type { Neighbourhood, RentBasis, RentProfile } from "@/lib/types";
import type { ManchesterNeighbourhood } from "@/lib/manchester/types";

/**
 * Rent profiles for Greater Manchester.
 *
 * The London equivalent derives a room price from the area's one-bed
 * figure, pivoting around a London-wide one-bed of £1,750. That constant
 * is meaningless here, and applying it would price a Wigan room off the
 * bottom of the scale. Manchester rooms are sampled directly by postcode
 * district group instead, so this module only has to spread that sampled
 * average into a lower and an upper end.
 */

/** A room at the cheaper end of a district: a house share, bills often on top. */
const HOUSE_SHARE_FACTOR = 0.85;
/** A room at the dearer end: a flat share, usually newer and more central. */
const FLAT_SHARE_FACTOR = 1.15;

function isManchesterArea(n: Neighbourhood): n is ManchesterNeighbourhood {
  return "roomDistrict" in n;
}

export function manchesterRentProfileFor(n: Neighbourhood): RentProfile {
  const roomAverage = isManchesterArea(n)
    ? ROOM_DISTRICT_AVERAGE_GBP[n.roomDistrict]
    : // Should not happen: every Manchester area names a district. Falling
      // back to the one-bed keeps the drawer rendering rather than showing
      // NaN if a new area is ever added without one.
      Math.round(n.rent.oneBedMedianGbp * 0.7);

  return {
    houseShareLowerEndGbp: roundTo25(roomAverage * HOUSE_SHARE_FACTOR),
    flatShareUpperEndGbp: roundTo25(roomAverage * FLAT_SHARE_FACTOR),
    oneBedFlatGbp: n.rent.oneBedMedianGbp,
    twoBedFlatGbp: n.rent.twoBedMedianGbp,
    roomSource: MANCHESTER_ROOM_SOURCE,
    oneBedSource: n.rent,
  };
}

export function manchesterSelectedRentGbp(
  n: Neighbourhood,
  basis: RentBasis,
): number {
  const profile = manchesterRentProfileFor(n);
  switch (basis) {
    case "houseShareLowerEnd":
      return profile.houseShareLowerEndGbp;
    case "flatShareUpperEnd":
      return profile.flatShareUpperEndGbp;
    case "oneBedFlat":
      return profile.oneBedFlatGbp;
    case "twoBedFlat":
      return profile.twoBedFlatGbp;
  }
}

function roundTo25(value: number): number {
  return Math.round(value / 25) * 25;
}
