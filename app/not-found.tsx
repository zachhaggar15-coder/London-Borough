import Link from "next/link";

const DESTINATIONS = [
  { href: "/", label: "Use the neighbourhood finder" },
  { href: "/neighbourhoods", label: "Browse all area guides" },
  { href: "/compare", label: "Compare two areas" },
  { href: "/methodology", label: "Read how the data works" },
];

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-slate-950 px-6 py-20 text-slate-100">
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-400">
          Page not found
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          This London guide has moved
        </h1>
        <p className="max-w-xl text-lg text-slate-300">
          The address may be out of date, or the guide may have been combined
          with a more useful page. Choose a route below and you will be back on
          track.
        </p>

        <nav aria-label="Useful destinations" className="mt-10 grid gap-3 sm:grid-cols-2">
          {DESTINATIONS.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-4 font-medium transition-colors hover:border-emerald-500 hover:text-emerald-300"
            >
              {destination.label} →
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
