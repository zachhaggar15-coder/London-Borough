// CommonJS config file: require is the only way to read JSON here.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const CITY_SECTIONS = require("./lib/published-city-sections.json");

/**
 * Unpublished city sections 308 to their city hub. The same JSON drives
 * the sitemap and which pages are built, so a section cannot be linked,
 * listed and redirected at once. See lib/city-sections.ts for why most
 * of them are off.
 */
function unpublishedCitySectionRedirects() {
  const cities = CITY_SECTIONS.cities.join("|");
  // Index-only sections keep their index and send detail pages to it,
  // whether or not everything else is being previewed.
  const indexOnly = CITY_SECTIONS.indexOnly.map((section) => ({
    source: `/:city(${cities})/${section}/:rest+`,
    destination: `/:city/${section}`,
    permanent: true,
  }));
  if (process.env.NEXT_PUBLIC_PREVIEW_ALL_CITY_SECTIONS === "1") return indexOnly;
  const sections = CITY_SECTIONS.sections
    .filter((section) => !CITY_SECTIONS.published.includes(section))
    .join("|");
  if (!sections) return indexOnly;
  return [
    ...indexOnly,
    {
      source: `/:city(${cities})/:section(${sections})`,
      destination: "/:city",
      permanent: true,
    },
    {
      source: `/:city(${cities})/:section(${sections})/:rest*`,
      destination: "/:city",
      permanent: true,
    },
  ];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      ...unpublishedCitySectionRedirects(),
      // "best-for-food" ranked the same scores as "foodies" with slightly
      // different weights, and the two pages were 91% the same text.
      {
        source: "/lifestyle/best-for-food",
        destination: "/lifestyle/foodies",
        permanent: true,
      },
      // Salary pages were one template with a different number in it (79%
      // shared text). The hub carries every level in one table instead.
      {
        source: "/salary/:amount",
        destination: "/salary",
        permanent: true,
      },
      // Retired thin clusters. /rent-guide/[slug] duplicated the neighbourhood
      // page for the same area (its room-rate figure now lives there), and
      // /commute/route/[slug] covered the same curated pairs as /compare
      // (its journey-time content is now a section on the compare page).
      {
        source: "/rent-guide",
        destination: "/neighbourhoods",
        permanent: true,
      },
      {
        source: "/rent-guide/:slug",
        destination: "/neighbourhoods/:slug",
        permanent: true,
      },
      // Note: /commute/route/[slug] → /compare/[slug] is handled by a route
      // handler rather than here, because splitting `a-to-b` into two params
      // is not expressible reliably in a path-to-regexp source pattern.
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
