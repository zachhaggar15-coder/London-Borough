import { createCityContent, type CityContent, type CityInput } from "@/lib/city-content";
import type { ContentCityId } from "@/lib/cities";
import { MANCHESTER_INPUT } from "@/lib/city-inputs/manchester";
import { BRISTOL_INPUT } from "@/lib/city-inputs/bristol";
import { LEEDS_INPUT } from "@/lib/city-inputs/leeds";
import { EDINBURGH_INPUT } from "@/lib/city-inputs/edinburgh";

/**
 * Which cities have a generated section, and their content.
 *
 * This is the single list the route tree, the sitemap, the footer and the
 * tests all read. Adding a city is one entry here plus its CityInput —
 * nothing under app/[city] changes, and nothing needs to learn the new
 * city's name.
 *
 * London is absent on purpose. Its routes live at the root and predate
 * this factory; folding it in would mean changing indexed URLs for no
 * reader-facing gain.
 */
const CITY_INPUTS: Record<ContentCityId, CityInput> = {
  manchester: MANCHESTER_INPUT,
  bristol: BRISTOL_INPUT,
  leeds: LEEDS_INPUT,
  edinburgh: EDINBURGH_INPUT,
};

export const CONTENT_CITY_IDS = Object.keys(CITY_INPUTS) as ContentCityId[];

export function isContentCityId(value: string): value is ContentCityId {
  return (CONTENT_CITY_IDS as string[]).includes(value);
}

/**
 * Built once per process rather than per request. Every helper the pages
 * use closes over the city's arrays, and rebuilding them for each of the
 * several hundred static pages would be pure waste.
 */
const CONTENT_CACHE = new Map<ContentCityId, CityContent>();

export function getCityContent(id: ContentCityId): CityContent {
  let content = CONTENT_CACHE.get(id);
  if (!content) {
    content = createCityContent(CITY_INPUTS[id]);
    CONTENT_CACHE.set(id, content);
  }
  return content;
}

/** Every generated city's content, in registry order. */
export function allCityContent(): CityContent[] {
  return CONTENT_CITY_IDS.map(getCityContent);
}
