/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
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
