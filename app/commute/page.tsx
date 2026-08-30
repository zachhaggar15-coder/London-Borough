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

        <section className="mb-10 max-w-3xl space-y-4 text-slate-300">
          <p>
            Commute is usually the constraint that decides everything else. Rent
            falls as you move out, but the saving is only real if the journey
            stays tolerable — and tolerable is less about distance than about
            whether you have a direct line. An area eight miles out on a fast
            service into your destination routinely beats one five miles out
            that needs two changes.
          </p>
          <p>
            Each destination guide below ranks every area we track by estimated
            door-to-door time to that specific place, so you can see where the
            genuine time-versus-rent trade sits rather than guessing from a
            tube map. Times are modelled estimates for a typical weekday — they
            do not account for engineering works, disruption or peak crowding,
            and you should sanity-check any shortlist against a real journey
            planner at the hour you would actually travel.
          </p>
          <p>
            Two things worth weighing that a single number hides: a
            forty-minute journey you can sit down on is a different proposition
            from a twenty-five-minute one standing on a packed platform, and a
            single-line commute is far more robust when that line goes down
            than a route that already depends on two interchanges.
          </p>
        </section>

        <h2 className="mb-4 text-xl font-semibold">Guides by destination</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.id}
              href={`/commute/${d.id}`}
              className="rounded-lg bg-slate-900 border border-slate-800 p-5 hover:border-slate-600 transition-colors"
            >
              <h3 className="font-semibold text-white mb-1">
                Best areas for commuting to {d.label}
              </h3>
              <p className="text-sm text-slate-400">
                All neighbourhoods ranked by commute estimate →
              </p>
            </Link>
          ))}
        </div>

        {featuredRoutes.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Travelling between two areas
            </h2>
            <p className="text-slate-400 mb-8">
              Estimated travel time between two London areas, alongside a full
              comparison of what it is like to live in each.
            </p>
            <div className="flex flex-wrap gap-3">
              {featuredRoutes.map((route) => {
                if (!route) return null;
                return (
                  <Link
                    key={route.slug}
                    href={`/compare/${route.compareSlug}`}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm hover:border-slate-600 transition-colors"
                  >
                    {route.a.name} to {route.b.name}
                    <span className="ml-2 text-slate-400 tabular-nums">
                      ~{route.minutes} min
                    </span>
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
