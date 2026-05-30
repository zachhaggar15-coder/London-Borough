import type { Metadata } from "next";
import Link from "next/link";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { SITE_URL } from "@/lib/seo-data";

export const metadata: Metadata = {
  title: "London neighbourhoods guide — rents, transport & area profiles",
  description:
    "Area guides, rent prices and transport profiles for 95 London neighbourhoods. Find the right area for your commute, budget and lifestyle.",
  alternates: { canonical: `${SITE_URL}/neighbourhoods` },
};

const DIRECTION_GROUPS: { label: string; ids: string[] }[] = [
  {
    label: "North London",
    ids: [
      "camden", "islington", "kentish-town", "finsbury-park", "crouch-end",
      "stoke-newington", "hampstead", "highgate", "west-hampstead", "belsize-park",
      "swiss-cottage", "holloway", "archway", "muswell-hill", "wood-green",
      "tottenham", "finchley", "hendon", "golders-green", "kilburn",
      "enfield-town", "harrow", "cricklewood",
    ],
  },
  {
    label: "East London",
    ids: [
      "hackney-central", "dalston", "shoreditch", "bethnal-green", "stratford",
      "walthamstow", "hoxton", "bow", "whitechapel", "aldgate", "mile-end",
      "wapping", "hackney-wick", "leyton", "forest-gate", "barking",
      "ilford", "romford",
    ],
  },
  {
    label: "South London",
    ids: [
      "brixton", "clapham", "peckham", "tooting", "bermondsey", "greenwich",
      "battersea", "wimbledon", "putney", "balham", "borough", "elephant-castle",
      "camberwell", "herne-hill", "east-dulwich", "streatham", "stockwell",
      "vauxhall", "kennington", "new-cross", "deptford", "lewisham", "catford",
      "blackheath", "forest-hill", "crystal-palace", "bexleyheath", "croydon",
      "earlsfield", "kingston", "sutton", "barnes", "richmond", "twickenham",
    ],
  },
  {
    label: "West London",
    ids: [
      "hammersmith", "ealing", "shepherds-bush", "acton", "notting-hill",
      "kensington", "fulham", "chiswick", "uxbridge", "chelsea", "pimlico",
      "bayswater", "maida-vale", "holland-park",
    ],
  },
  {
    label: "Central London",
    ids: [
      "soho", "fitzrovia", "bloomsbury", "mayfair", "marylebone-area", "covent-garden",
    ],
  },
];

export default function NeighbourhoodsIndexPage() {
  const byId = Object.fromEntries(NEIGHBOURHOODS.map((n) => [n.id, n]));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Where in London
          </Link>
          <span>/</span>
          <span className="text-slate-200">Neighbourhoods</span>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            London neighbourhood guide
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Rent prices, transport profiles and area guides for{" "}
            {NEIGHBOURHOODS.length} London neighbourhoods — from Zone 1 to Zone
            6.
          </p>
        </header>

        <div className="space-y-12">
          {DIRECTION_GROUPS.map((group) => {
            const neighbourhoods = group.ids
              .map((id) => byId[id])
              .filter(Boolean);
            if (neighbourhoods.length === 0) return null;

            return (
              <section key={group.label}>
                <h2 className="text-xl font-semibold mb-5">{group.label}</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {neighbourhoods.map((n) => (
                    <Link
                      key={n.id}
                      href={`/neighbourhoods/${n.id}`}
                      className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-3 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate">
                            {n.name}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {n.borough} · Zone
                            {n.transportZones.length > 1 ? "s" : ""}{" "}
                            {n.transportZones.join("/")}
                          </p>
                        </div>
                        <span className="flex-shrink-0 text-sm font-medium text-white">
                          £{n.rent.oneBedMedianGbp.toLocaleString()}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-16 rounded-xl bg-slate-900 border border-slate-700 p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Find the right neighbourhood for you
          </h2>
          <p className="text-slate-300 mb-6">
            Enter your commute destination, salary and lifestyle preferences to
            get a personalised ranking across all{" "}
            {NEIGHBOURHOODS.length} areas.
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
