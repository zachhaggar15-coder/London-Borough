import type { Metadata } from "next";
import Link from "next/link";
import { DESTINATIONS } from "@/lib/data/destinations";
import {
  getCommutePairPageData,
  getFeaturedCompareSlugs,
  SITE_URL,
} from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "Best London areas by commute destination",
  description:
    "Find London neighbourhoods for commuting to major office locations. Ranked by estimated typical commute time, with rent and transport options.",
  alternates: { canonical: `${SITE_URL}/commute` },
  openGraph: {
    title: "Best London areas by commute destination",
    description:
      "Find London neighbourhoods by estimated commute time to major office locations.",
    url: `${SITE_URL}/commute`,
    type: "website",
  },
};

export default function CommuteIndexPage() {
  const featuredRoutes = getFeaturedCompareSlugs(12)
    .map((slug) => getCommutePairPageData(slug.replace("-vs-", "-to-")))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Where in London
          </Link>
          <span>/</span>
          <span className="text-slate-200">Commute guides</span>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Best London areas by commute destination
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Neighbourhoods ranked by estimated typical commute time to each
            major London destination, with rent prices and transport options.{" "}
            <Link
              href="/methodology"
              className="text-emerald-300 hover:text-emerald-200"
            >
              Methodology
            </Link>
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.id}
              href={`/commute/${d.id}`}
              className="rounded-lg bg-slate-900 border border-slate-800 p-5 hover:border-slate-600 transition-colors"
            >
              <h2 className="font-semibold text-white mb-1">
                Best areas for commuting to {d.label}
              </h2>
              <p className="text-sm text-slate-400">
                All neighbourhoods ranked by commute estimate →
              </p>
            </Link>
          ))}
        </div>

        {featuredRoutes.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Point-to-point commute guides
            </h2>
            <p className="text-slate-400 mb-8">
              Estimated travel time and route between two London areas.
            </p>
            <div className="flex flex-wrap gap-3">
              {featuredRoutes.map((route) => {
                if (!route) return null;
                return (
                  <Link
                    key={route.slug}
                    href={`/commute/route/${route.slug}`}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors"
                  >
                    {route.a.name} to {route.b.name}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section className="mt-16 rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Not seeing your office?
          </h2>
          <p className="text-slate-300 mb-6">
            Use the discovery tool to enter any London address or postcode and
            get commute estimates to all 95+ tracked neighbourhoods.
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-emerald-600 hover:bg-emerald-500 px-6 py-3 font-medium transition-colors"
          >
            Open the discovery tool →
          </Link>
        </section>
      </main>
    </div>
  );
}
