import type { CityEditorial } from "@/lib/city-content";
import type { ContentCityId } from "@/lib/cities";
import { MANCHESTER_EDITORIAL } from "@/lib/city-editorial/manchester";
import { BRISTOL_EDITORIAL } from "@/lib/city-editorial/bristol";
import { LEEDS_EDITORIAL } from "@/lib/city-editorial/leeds";
import { EDINBURGH_EDITORIAL } from "@/lib/city-editorial/edinburgh";
import { GENEVA_EDITORIAL } from "@/lib/city-editorial/geneva";
import { PARIS_EDITORIAL } from "@/lib/city-editorial/paris";
import { BARCELONA_EDITORIAL } from "@/lib/city-editorial/barcelona";

/**
 * Each city's written editorial, attached to its content in the registry.
 * Kept out of lib/city-inputs so the data files stay data.
 */
export const CITY_EDITORIAL: Partial<Record<ContentCityId, CityEditorial>> = {
  manchester: MANCHESTER_EDITORIAL,
  bristol: BRISTOL_EDITORIAL,
  leeds: LEEDS_EDITORIAL,
  edinburgh: EDINBURGH_EDITORIAL,
  geneva: GENEVA_EDITORIAL,
  paris: PARIS_EDITORIAL,
  barcelona: BARCELONA_EDITORIAL,
};
