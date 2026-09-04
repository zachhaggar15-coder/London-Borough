import { NextResponse } from "next/server";
import { absoluteUrl, getIndexableRoutes } from "@/lib/seo-data";

// Deterministic: every entry carries a real content-review date, so the
// sitemap can be statically generated and refreshed on deploy.
export const revalidate = 86400;

function sitemapEntry(
  path: string,
  priority: number,
  changefreq: string,
  lastmod: string,
): string {
  return [
    "<url>",
    `<loc>${absoluteUrl(path)}</loc>`,
    `<lastmod>${lastmod}</lastmod>`,
    `<changefreq>${changefreq}</changefreq>`,
    `<priority>${priority}</priority>`,
    "</url>",
  ].join("");
}

export async function GET() {
  const entries = getIndexableRoutes().map((entry) =>
    sitemapEntry(entry.path, entry.priority, entry.changefreq, entry.lastmod),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
