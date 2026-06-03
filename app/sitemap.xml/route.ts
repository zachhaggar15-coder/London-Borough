import { NextResponse } from "next/server";
import { absoluteUrl, getIndexableRoutes } from "@/lib/seo-data";

export const dynamic = "force-dynamic";

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
  const lastmod = new Date().toISOString().split("T")[0];
  const entries = getIndexableRoutes().map((entry) =>
    sitemapEntry(entry.path, entry.priority, entry.changefreq, lastmod),
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
