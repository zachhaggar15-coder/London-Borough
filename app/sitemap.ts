import type { MetadataRoute } from "next";
import {
  SITE_URL,
  getAllBoroughSlugs,
  getAllCommuteSlugs,
  getCompareStaticParams,
  SALARY_LEVELS,
  LIFESTYLE_PAGES,
} from "@/lib/seo-data";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const static_routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const boroughRoutes: MetadataRoute.Sitemap = getAllBoroughSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/boroughs/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const commuteRoutes: MetadataRoute.Sitemap = getAllCommuteSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/commute/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const salaryRoutes: MetadataRoute.Sitemap = SALARY_LEVELS.map((amount) => ({
    url: `${SITE_URL}/salary/${amount}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const lifestyleRoutes: MetadataRoute.Sitemap = LIFESTYLE_PAGES.map((p) => ({
    url: `${SITE_URL}/lifestyle/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const compareRoutes: MetadataRoute.Sitemap = getCompareStaticParams().map(
    (slug) => ({
      url: `${SITE_URL}/compare/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [
    ...static_routes,
    ...boroughRoutes,
    ...commuteRoutes,
    ...salaryRoutes,
    ...lifestyleRoutes,
    ...compareRoutes,
  ];
}
