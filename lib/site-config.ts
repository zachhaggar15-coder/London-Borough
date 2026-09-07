/**
 * Single source of truth for the site's identity and contact details.
 * Used by the About / Contact / Privacy / Terms pages, the footer and
 * the Organization JSON-LD in the root layout.
 */

export const CONTACT_EMAIL = "dojostack@proton.me";

export const SITE_NAME = "Where in London";

/** Shown on /about and /privacy so readers know who is behind the site. */
export const PUBLISHER_DESCRIPTION =
  "This is an independent, self-funded project run by a single developer in the UK. It is not affiliated with Transport for London, Transport for Greater Manchester, the West of England or West Yorkshire Combined Authorities, Transport for Edinburgh, Transport Scotland, the Greater London Authority, any local council or foreign public authority, or any letting agent or property portal. Nothing on it is immigration, legal, tax or financial advice.";

/**
 * The cities the site covers.
 *
 * Single source of truth for the shared pages — /about, /privacy, /terms
 * and the Organization schema — which describe the site as a whole rather
 * than one city. The per-city brands live in lib/cities.ts; this is the
 * neutral description that has to be true of all of them.
 */
export const CITIES_COVERED = [
  "London",
  "Greater Manchester",
  "the West of England",
  "West Yorkshire",
  "Edinburgh and the Lothians",
  "Geneva",
  "Paris",
  "Barcelona",
] as const;

/** How the site describes itself when it cannot lead with one city. */
export const NETWORK_DESCRIPTION =
  "An independent, data-driven guide to choosing where to live — five British city regions, plus Geneva, Paris and Barcelona for anyone moving abroad — by commute, rent and lifestyle.";

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
