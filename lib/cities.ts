/**
 * City registry.
 *
 * The site began as a London-only tool and every London route still lives
 * at the root (`/neighbourhoods`, `/boroughs`, …) because those URLs are
 * indexed. Every other city is namespaced under its own prefix instead of
 * moving London under `/london`, so no existing URL changes and no
 * redirect chain is introduced.
 *
 * Each city owns its own datasets — councils, neighbourhoods, rents,
 * council tax, commute matrix — because they are not comparable in the
 * dimensions that matter. London measures centrality in tube zones;
 * nowhere else in the UK has a single fare geography spanning every mode,
 * so the others use travel bands (see lib/travel-band.ts). Sharing a
 * schema across all of them would have meant forcing one city's
 * vocabulary onto the rest.
 */

export type CityId =
  | "london"
  | "manchester"
  | "bristol"
  | "leeds"
  | "edinburgh";

/** Every city except London, which has its own bespoke route tree. */
export type ContentCityId = Exclude<CityId, "london">;

export type City = {
  id: CityId;
  /** Display name, used in nav and breadcrumbs. */
  name: string;
  /** Brand string for <title> suffixes and OG site names. */
  brand: string;
  /**
   * Route prefix. London is "" because it occupies the root; every other
   * city is namespaced. Never ends with a slash.
   */
  basePath: string;
  /** Transit authority, named in methodology and commute copy. */
  transitAuthority: string;
  /** How the city expresses centrality, in reader-facing words. */
  centralityLabel: string;
  /**
   * The URL segment for local-authority pages.
   *
   * Not cosmetic: Greater Manchester and West Yorkshire are made of
   * metropolitan boroughs, the West of England of unitary authorities and
   * the Lothians of council areas. Calling a Bristol page a "borough"
   * would be wrong, and Manchester's `/manchester/boroughs/*` URLs are
   * already indexed, so the segment is per city rather than shared.
   */
  councilSegment: string;
};

export const CITIES: Record<CityId, City> = {
  london: {
    id: "london",
    name: "London",
    brand: "Where in London",
    basePath: "",
    transitAuthority: "Transport for London",
    centralityLabel: "travel zone",
    councilSegment: "boroughs",
  },
  manchester: {
    id: "manchester",
    name: "Manchester",
    brand: "Where in Manchester",
    basePath: "/manchester",
    transitAuthority: "Transport for Greater Manchester",
    centralityLabel: "travel band",
    councilSegment: "boroughs",
  },
  bristol: {
    id: "bristol",
    name: "Bristol",
    brand: "Where in Bristol",
    basePath: "/bristol",
    transitAuthority: "the West of England Combined Authority",
    centralityLabel: "travel band",
    councilSegment: "councils",
  },
  leeds: {
    id: "leeds",
    name: "Leeds",
    brand: "Where in Leeds",
    basePath: "/leeds",
    transitAuthority: "the West Yorkshire Combined Authority",
    centralityLabel: "travel band",
    councilSegment: "boroughs",
  },
  edinburgh: {
    id: "edinburgh",
    name: "Edinburgh",
    brand: "Where in Edinburgh",
    basePath: "/edinburgh",
    transitAuthority: "Transport for Edinburgh",
    centralityLabel: "travel band",
    councilSegment: "councils",
  },
};

export const CITY_LIST: City[] = [
  CITIES.london,
  CITIES.manchester,
  CITIES.bristol,
  CITIES.leeds,
  CITIES.edinburgh,
];

/** Build a path within a city's namespace: cityPath(CITIES.bristol, "/councils"). */
export function cityPath(city: City, path: string): string {
  if (path === "/") return city.basePath === "" ? "/" : city.basePath;
  return `${city.basePath}${path}`;
}

/**
 * Whether a pathname belongs to a city. Used by the header to mark the
 * active tab. A namespaced city wins over London's root, so
 * "/bristol/councils" resolves to Bristol rather than falling through.
 */
export function cityForPath(pathname: string): City {
  for (const city of CITY_LIST) {
    if (city.basePath === "") continue;
    if (pathname === city.basePath || pathname.startsWith(`${city.basePath}/`)) {
      return city;
    }
  }
  return CITIES.london;
}
