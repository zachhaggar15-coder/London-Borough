/**
 * City registry.
 *
 * The site began as a London-only tool and every London route still lives
 * at the root (`/neighbourhoods`, `/boroughs`, …) because those URLs are
 * indexed. Manchester is namespaced under `/manchester` instead of moving
 * London under `/london`, so no existing URL changes and no redirect chain
 * is introduced.
 *
 * Each city owns its own datasets — boroughs, neighbourhoods, rents,
 * council tax, commute matrix — because the two are not comparable in the
 * dimensions that matter. London measures centrality in tube zones; Greater
 * Manchester has no equivalent system that spans tram, heavy rail and bus,
 * so it uses travel bands (see lib/manchester/travel-band.ts). Sharing a
 * schema across the two would have meant forcing one city's vocabulary
 * onto the other.
 */

export type CityId = "london" | "manchester";

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
};

export const CITIES: Record<CityId, City> = {
  london: {
    id: "london",
    name: "London",
    brand: "Where in London",
    basePath: "",
    transitAuthority: "Transport for London",
    centralityLabel: "travel zone",
  },
  manchester: {
    id: "manchester",
    name: "Manchester",
    brand: "Where in Manchester",
    basePath: "/manchester",
    transitAuthority: "Transport for Greater Manchester",
    centralityLabel: "travel band",
  },
};

export const CITY_LIST: City[] = [CITIES.london, CITIES.manchester];

/** Build a path within a city's namespace: cityPath(CITIES.manchester, "/boroughs"). */
export function cityPath(city: City, path: string): string {
  if (path === "/") return city.basePath === "" ? "/" : city.basePath;
  return `${city.basePath}${path}`;
}

/**
 * Whether a pathname belongs to a city. Used by the header to mark the
 * active tab. Longest base path wins, so "/manchester/boroughs" resolves
 * to Manchester rather than falling through to London's root.
 */
export function cityForPath(pathname: string): City {
  if (pathname === "/manchester" || pathname.startsWith("/manchester/")) {
    return CITIES.manchester;
  }
  return CITIES.london;
}
