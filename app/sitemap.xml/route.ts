/**
 * Explicit sitemap route handler.
 *
 * Replaces the metadata-based app/sitemap.ts approach with a plain
 * GET handler that returns XML with explicit Content-Type and status
 * headers — avoiding any edge-caching or route-registration ambiguity
 * that can occur with Next.js's metadata sitemap generation.
 *
 * Accessible at:  /sitemap.xml
 */

import { NextResponse } from "next/server";
import {
  SITE_URL,
  getAllBoroughSlugs,
  getAllCommuteSlugs,
  getAllNeighbourhoodSlugs,
  getCompareStaticParams,
  SALARY_LEVELS,
  LIFESTYLE_PAGES,
} from "@/lib/seo-data";

export const dynamic = "force-dynamic";

function url(
  loc: string,
  priority: number,
  changefreq: string = "monthly",
): string {
  const lastmod = new Date().toISOString().split("T")[0];
  return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

export async function GET() {
  const entries: string[] = [];

  // ── Homepage + index pages ──────────────────────────────────────
  entries.push(url(SITE_URL, 1.0, "weekly"));
  entries.push(url(`${SITE_URL}/neighbourhoods`, 0.9, "weekly"));
  entries.push(url(`${SITE_URL}/boroughs`, 0.8, "weekly"));
  entries.push(url(`${SITE_URL}/commute`, 0.8, "weekly"));
  entries.push(url(`${SITE_URL}/lifestyle`, 0.8, "weekly"));
  entries.push(url(`${SITE_URL}/salary`, 0.7, "weekly"));

  // ── Neighbourhood pages (priority 0.9) ─────────────────────────
  for (const slug of getAllNeighbourhoodSlugs()) {
    entries.push(url(`${SITE_URL}/neighbourhoods/${slug}`, 0.9));
  }

  // ── Borough pages (priority 0.8) ───────────────────────────────
  for (const slug of getAllBoroughSlugs()) {
    entries.push(url(`${SITE_URL}/boroughs/${slug}`, 0.8));
  }

  // ── Commute destination pages (priority 0.8) ───────────────────
  for (const slug of getAllCommuteSlugs()) {
    entries.push(url(`${SITE_URL}/commute/${slug}`, 0.8));
  }

  // ── Salary guide pages (priority 0.7) ──────────────────────────
  for (const amount of SALARY_LEVELS) {
    entries.push(url(`${SITE_URL}/salary/${amount}`, 0.7));
  }

  // ── Lifestyle pages (priority 0.7) ─────────────────────────────
  for (const page of LIFESTYLE_PAGES) {
    entries.push(url(`${SITE_URL}/lifestyle/${page.slug}`, 0.7));
  }

  // ── Comparison pages (priority 0.6) ────────────────────────────
  for (const slug of getCompareStaticParams()) {
    entries.push(url(`${SITE_URL}/compare/${slug}`, 0.6));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
