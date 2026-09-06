"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CITY_LIST, cityForPath, cityPath } from "@/lib/cities";

/**
 * The city switcher.
 *
 * Two tabs, and deliberately only two things in the header: which city
 * you are looking at, and how to get to the other one. The hub links
 * (neighbourhoods, boroughs, commute …) stay in the footer where they
 * already are — putting fourteen links above the map would push the tool
 * itself below the fold on a laptop, which is the one thing the product
 * rules in STRATEGY.md say not to do.
 *
 * Each tab links to that city's root, not to the equivalent page in the
 * other city. A reader on /neighbourhoods/peckham has no Manchester
 * counterpart to be sent to, and guessing one would land them on a 404.
 */
export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const active = cityForPath(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-3">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-white transition-colors hover:text-emerald-400"
        >
          Where in
        </Link>

        <nav aria-label="Choose a city" className="flex items-center gap-1">
          {CITY_LIST.map((city) => {
            const isActive = city.id === active.id;
            return (
              <Link
                key={city.id}
                href={cityPath(city, "/")}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-medium text-white"
                    : "rounded-lg px-3 py-1.5 text-sm text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
                }
              >
                {city.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
