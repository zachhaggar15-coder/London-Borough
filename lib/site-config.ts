/**
 * Single source of truth for the site's identity and contact details.
 * Used by the About / Contact / Privacy / Terms pages, the footer and
 * the Organization JSON-LD in the root layout.
 */

export const CONTACT_EMAIL = "dojostack@proton.me";

export const SITE_NAME = "Where in London";

/** Shown on /about and /privacy so readers know who is behind the site. */
export const PUBLISHER_DESCRIPTION =
  "This is an independent, self-funded project run by a single developer in the UK. It is not affiliated with Transport for London, Transport for Greater Manchester, the Greater London Authority, the Greater Manchester Combined Authority, any local council, or any letting agent or property portal.";

/**
 * The cities the site covers.
 *
 * Single source of truth for the shared pages — /about, /privacy, /terms
 * and the Organization schema — which describe the site as a whole rather
 * than one city. The per-city brands live in lib/cities.ts; this is the
 * neutral description that has to be true of both.
 */
export const CITIES_COVERED = ["London", "Greater Manchester"] as const;

/** How the site describes itself when it cannot lead with one city. */
export const NETWORK_DESCRIPTION =
  "An independent, data-driven guide to choosing where to live in London and Greater Manchester, by commute, rent and lifestyle.";

/** Last substantive review of the Privacy Policy and Terms. */
export const POLICY_LAST_UPDATED = "2026-08-30";

/**
 * The year used in year-stamped page titles ("… (2026 guide)").
 *
 * Derived from the build date and defined once, because eight lifestyle
 * titles previously hardcoded the year independently and drifted a full
 * year out of date. Any deploy refreshes every title that uses it.
 */
export const CONTENT_YEAR = new Date().getFullYear();
