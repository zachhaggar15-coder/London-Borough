import type { CityEditorial } from "@/lib/city-content";
import type { ContentCityId } from "@/lib/cities";
import { BRISTOL_EDITORIAL } from "@/lib/city-editorial/bristol";
import { LEEDS_EDITORIAL } from "@/lib/city-editorial/leeds";
import { EDINBURGH_EDITORIAL } from "@/lib/city-editorial/edinburgh";

/**
 * Each city's written editorial, attached to its content in the registry.
 * Kept out of lib/city-inputs so the data files stay data.
 */
export const CITY_EDITORIAL: Partial<Record<ContentCityId, CityEditorial>> = {
  bristol: BRISTOL_EDITORIAL,
  leeds: LEEDS_EDITORIAL,
  edinburgh: EDINBURGH_EDITORIAL,
};
