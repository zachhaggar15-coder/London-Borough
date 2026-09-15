import type { CityEditorial } from "@/lib/city-content";
import type { ContentCityId } from "@/lib/cities";

/**
 * Each city's written editorial, attached to its content in the registry.
 * Kept out of lib/city-inputs so the data files stay data.
 */
export const CITY_EDITORIAL: Partial<Record<ContentCityId, CityEditorial>> = {};
