/**
 * Single source of truth for the site's identity and contact details.
 * Used by the About / Contact / Privacy / Terms pages, the footer and
 * the Organization JSON-LD in the root layout.
 */

export const CONTACT_EMAIL = "dojostack@proton.me";

export const SITE_NAME = "Where in London";

/** Shown on /about and /privacy so readers know who is behind the site. */
export const PUBLISHER_DESCRIPTION =
  "Where in London is an independent, self-funded project run by a single developer in the UK. It is not affiliated with Transport for London, the Greater London Authority, any London borough council, or any letting agent or property portal.";

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
