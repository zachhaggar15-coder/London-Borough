import CITY_SECTIONS from "@/lib/published-city-sections.json";

/**
 * Which city sections are live.
 *
 * AdSense rejected the site in September 2026 for "Low value content"
 * after the factory had taken the sitemap from 209 URLs to 869. The
 * rejected pages were the generated ones: salary pages 99% identical
 * within a city, commute pages 91%, council pages 88–95%. Each city now
 * publishes its hand-written guides and its methodology, and everything
 * else 308s to the city hub (`next.config.js` reads the same JSON). A
 * section comes back by adding it to `published` — and only once its
 * pages carry writing that is not shared with their siblings.
 *
 * The hub itself is always published and is not a section.
 *
 * Deliberately free of the city registry, which pulls in every city's
 * dataset: the interactive tool imports this on the client.
 */

export const CITY_SECTION_CONFIG = CITY_SECTIONS;

export function isCitySectionPublished(section: string): boolean {
  return CITY_SECTIONS.published.includes(section);
}

/**
 * Whether an internal path is live. London paths and city hubs always
 * are; a city path is live when its section is published.
 */
export function isPathPublished(path: string): boolean {
  const [first, section] = path.split(/[?#]/)[0].split("/").filter(Boolean);
  if (!first || !section || !CITY_SECTIONS.cities.includes(first)) return true;
  return isCitySectionPublished(section);
}

/** The path when it is live, otherwise null so the caller hides the link. */
export function livePath(path: string): string | null {
  return isPathPublished(path) ? path : null;
}
