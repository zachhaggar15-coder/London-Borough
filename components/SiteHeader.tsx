"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CITY_LIST, cityForPath, cityPath } from "@/lib/cities";

/**
 * The city switcher.
 *
 * Deliberately only two things live up here: which city you are looking at,
 * and how to reach another one. The hub links (neighbourhoods, boroughs,
 * commute …) stay in the footer — fourteen links above the map would push
 * the tool itself below the fold on a laptop, which the product rules in
 * STRATEGY.md rule out.
 *
 * Built to take more cities than the two it currently has. The strip maps
 * over CITY_LIST rather than hardcoding tabs, and scrolls horizontally
 * rather than wrapping, so adding Birmingham or Leeds to lib/cities.ts is
 * the whole change — the bar keeps its height and the tool below it does
 * not move down a row. Past roughly six cities this wants to become a
 * dropdown instead; the seam to change is this component alone.
 *
 * Each tab links to that city's root, not to the equivalent page in the
 * other city. Someone reading /neighbourhoods/peckham has no Manchester
 * counterpart to be sent to, and guessing one would land them on a 404.
 */
export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const active = cityForPath(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex h-11 max-w-5xl items-center gap-4 px-6">
        <Link
          href="/"
          className="shrink-0 text-xs font-semibold uppercase tracking-widest text-slate-500 transition-colors hover:text-white"
        >
          Where in
        </Link>

        <nav
          aria-label="Choose a city"
          // No wrap: an extra row here would shift the map down on every
          // page. Overflowing cities scroll instead.
          className="-mx-1 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CITY_LIST.map((city) => {
            const isActive = city.id === active.id;
            return (
              <Link
                key={city.id}
                href={cityPath(city, "/")}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "shrink-0 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-white"
                    : "shrink-0 rounded-md px-2.5 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
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
