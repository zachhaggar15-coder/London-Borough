import {
  ROOM_AREA_OVERRIDES_GBP,
  ROOM_REGION_AVERAGE_GBP,
  ROOM_SOURCE,
  rentRegionForArea,
} from "@/lib/data/rent-market";
import type { Neighbourhood, RentBasis, RentProfile } from "@/lib/types";

export const RENT_BASIS_LABELS: Record<RentBasis, string> = {
  houseShareLowerEnd: "Room in house share lower end",
  flatShareUpperEnd: "Room in flat share upper end",
  oneBedFlat: "One bed flat",
  twoBedFlat: "Two bed flat",
};

export const RENT_BASIS_SHORT_LABELS: Record<RentBasis, string> = {
  houseShareLowerEnd: "house share lower",
  flatShareUpperEnd: "flat share upper",
  oneBedFlat: "one bed",
  twoBedFlat: "two bed",
};

export const RENT_BASIS_OPTIONS: RentBasis[] = [
  "houseShareLowerEnd",
  "flatShareUpperEnd",
  "oneBedFlat",
  "twoBedFlat",
];

export function rentProfileFor(neighbourhood: Neighbourhood): RentProfile {
  const oneBedMedianGbp = roundToNearest(neighbourhood.rent.oneBedMedianGbp, 25);
  const flatshareRoomAverageGbp = estimateFlatshareRoomAverage(neighbourhood);

  return {
    houseShareLowerEndGbp: roundToNearest(flatshareRoomAverageGbp * 0.82, 25),
    flatShareUpperEndGbp: roundToNearest(flatshareRoomAverageGbp * 1.12, 25),
    oneBedFlatGbp: oneBedMedianGbp,
    twoBedFlatGbp: neighbourhood.rent.twoBedMedianGbp,
    roomSource: ROOM_SOURCE,
    oneBedSource: neighbourhood.rent,
  };
}

export function selectedRentGbp(
  neighbourhood: Neighbourhood,
  basis: RentBasis,
): number {
  const profile = rentProfileFor(neighbourhood);
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

export function rentBasisLabel(basis: RentBasis): string {
  return RENT_BASIS_LABELS[basis];
}

export function rentBasisShortLabel(basis: RentBasis): string {
  return RENT_BASIS_SHORT_LABELS[basis];
}

function estimateFlatshareRoomAverage(neighbourhood: Neighbourhood): number {
  const override = ROOM_AREA_OVERRIDES_GBP[neighbourhood.id];
  if (override != null) return override;

  const region = rentRegionForArea(neighbourhood.id, neighbourhood.centroid);
  const base = ROOM_REGION_AVERAGE_GBP[region];
  const relativeToLondonOneBed = (neighbourhood.rent.oneBedMedianGbp - 1750) * 0.18;
  return roundToNearest(Math.max(725, base + relativeToLondonOneBed), 25);
}

function roundToNearest(value: number, nearest: number): number {
  return Math.round(value / nearest) * nearest;
}
