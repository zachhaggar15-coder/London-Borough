import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { DESTINATIONS } from "@/lib/data/destinations";
import { selectedRentGbp } from "@/lib/rent";
import { MANCHESTER_NEIGHBOURHOODS } from "@/lib/manchester/data/neighbourhoods";
import { MANCHESTER_DESTINATIONS } from "@/lib/manchester/data/destinations";
import { manchesterSelectedRentGbp } from "@/lib/manchester/rent";
import { MANCHESTER_CITY_DATA } from "@/lib/city-data-manchester";
import { LONDON_CITY_DATA } from "@/lib/city-data-london";
import type { CouplesConfig } from "@/components/CouplesClient";
import type { CityId } from "@/lib/cities";

/**
 * City bindings for the couples tool.
 *
 * The defaults matter more here than they look. Both pairs are chosen to
 * sit on opposite sides of the city, because a couple whose two offices
 * are a mile apart does not need this page — the interesting case is the
 * compromise, and the defaults should show one immediately.
 */

export const LONDON_COUPLES_CONFIG: CouplesConfig = {
  neighbourhoods: NEIGHBOURHOODS,
  destinations: DESTINATIONS,
  defaultDestinationAId: "canary-wharf",
  defaultDestinationBId: "kings-cross",
  defaultBudgetGbp: 1_900,
  selectedRent: selectedRentGbp,
  areaHref: LONDON_CITY_DATA.links.areaHref,
  fetchCommute: async (destination) =>
    (await LONDON_CITY_DATA.fetchCommute(destination)).commute,
};

export const MANCHESTER_COUPLES_CONFIG: CouplesConfig = {
  neighbourhoods: MANCHESTER_NEIGHBOURHOODS,
  destinations: MANCHESTER_DESTINATIONS,
  // MediaCityUK and Stockport are the classic Greater Manchester split:
  // opposite ends of the conurbation with no orbital route between them,
  // which is exactly the problem this page exists to solve.
  defaultDestinationAId: "mediacity",
  defaultDestinationBId: "stockport",
  defaultBudgetGbp: 1_100,
  selectedRent: manchesterSelectedRentGbp,
  areaHref: MANCHESTER_CITY_DATA.links.areaHref,
  fetchCommute: async (destination) =>
    (await MANCHESTER_CITY_DATA.fetchCommute(destination)).commute,
};

export const COUPLES_CONFIGS: Record<CityId, CouplesConfig> = {
  london: LONDON_COUPLES_CONFIG,
  manchester: MANCHESTER_COUPLES_CONFIG,
};
