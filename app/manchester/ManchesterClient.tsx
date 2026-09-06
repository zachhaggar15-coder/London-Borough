"use client";

import CityFinder from "@/components/CityFinder";
import { MANCHESTER_CITY_DATA } from "@/lib/city-data-manchester";

/**
 * The Greater Manchester tool — the same component the London homepage
 * renders, bound to Manchester's areas, destinations and commute matrix.
 */
export default function ManchesterClient() {
  return <CityFinder cityData={MANCHESTER_CITY_DATA} />;
}
