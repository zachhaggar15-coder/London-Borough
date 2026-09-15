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

/**
 * Set NEXT_PUBLIC_PREVIEW_ALL_CITY_SECTIONS=1 for a local build that
 * publishes every section, so `npm run audit:content` can check city
 * pages before they go live. Never set it on Vercel. It is NEXT_PUBLIC
 * because the tool reads this module in the browser too.
 */
export const PREVIEW_ALL_CITY_SECTIONS =
  process.env.NEXT_PUBLIC_PREVIEW_ALL_CITY_SECTIONS === "1";

/**
 * Sections that publish their index but never their detail pages. City
 * salary pages were one template with a number swapped (99% shared text);
 * the index carries every level in one table instead.
 */
function isIndexOnly(section: string): boolean {
  return CITY_SECTIONS.indexOnly.includes(section);
}

/**
 * Whether a section is live. Pass "salary" for the index and
 * "salary/*" for its detail pages.
 */
export function isCitySectionPublished(section: string): boolean {
  const [base, detail] = section.split("/");
  if (detail && isIndexOnly(base)) return false;
  return PREVIEW_ALL_CITY_SECTIONS || CITY_SECTIONS.published.includes(base);
}

/**
 * Whether an internal path is live. London paths and city hubs always
 * are; a city path is live when its section is published.
 */
export function isPathPublished(path: string): boolean {
  const [first, section, ...rest] = path.split(/[?#]/)[0].split("/").filter(Boolean);
  if (!first || !section || !CITY_SECTIONS.cities.includes(first)) return true;
  return isCitySectionPublished(rest.length > 0 ? `${section}/*` : section);
}

/** The path when it is live, otherwise null so the caller hides the link. */
export function livePath(path: string): string | null {
  return isPathPublished(path) ? path : null;
}
