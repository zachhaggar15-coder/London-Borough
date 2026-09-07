"use client";

import CityFinder from "@/components/CityFinder";
import { createCityData } from "@/lib/city-data";
import { getCityContent } from "@/lib/city-registry";
import { CITY_MAP_CONFIGS } from "@/lib/city-maps";

/**
 * The Greater Manchester tool — the same component every other city renders,
 * bound to this city's areas, destinations and commute matrix.
 *
 * Built once at module scope rather than per render: the CityData object
 * closes over the whole dataset, and rebuilding it on every state change
 * would rebuild the polygon index with it.
 */
const CITY_DATA = createCityData(
  getCityContent("manchester"),
  CITY_MAP_CONFIGS.manchester,
);

export default function ManchesterTool() {
  return <CityFinder cityData={CITY_DATA} />;
}
