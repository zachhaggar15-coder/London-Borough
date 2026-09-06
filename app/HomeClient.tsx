"use client";

import CityFinder from "@/components/CityFinder";
import { LONDON_CITY_DATA } from "@/lib/city-data-london";

/**
 * The London tool. All the behaviour lives in CityFinder, which is shared
 * with Manchester — this only supplies the city binding.
 */
export default function HomeClient() {
  return <CityFinder cityData={LONDON_CITY_DATA} />;
}
