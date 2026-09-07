import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";
import { allCityContent } from "@/lib/city-registry";

const LONDON_LINKS = [
  { href: "/guides", label: "Guides" },
  { href: "/neighbourhoods", label: "Neighbourhoods" },
  { href: "/compare", label: "Compare" },
  { href: "/commute", label: "Commute" },
  { href: "/lifestyle", label: "Lifestyle" },
  { href: "/salary", label: "Salary" },
  { href: "/boroughs", label: "Boroughs" },
];

/**
 * The per-city hub rows, one nav per city rather than one merged list.
 *
 * Merging them would give five adjacent links labelled "Neighbourhoods"
 * with five different destinations, which is confusing to read and worse
 * to navigate with a screen reader. Each row is labelled with its city
 * and each link is relative to that city's base path.
 */
const CITY_SECTIONS = [
  { path: "/neighbourhoods", label: "Areas" },
  { path: "/commute", label: "Commute" },
  { path: "/lifestyle", label: "Lifestyle" },
  { path: "/guides", label: "Guides" },
  { path: "/salary", label: "Salary" },
  { path: "/couples", label: "Couples" },
  { path: "/rent-index", label: "Rent index" },
];

const MORE_LINKS = [
  { href: "/guides/how-much-do-i-need-to-earn-to-live-in-london", label: "What salary do you need?" },
  { href: "/guides/london-council-tax-explained", label: "Council tax by borough" },
  { href: "/lifestyle/expensive", label: "Cheapest & priciest areas" },
  { href: "/london-rent-index", label: "London rent index" },
  { href: "/methodology", label: "Methodology" },
];

const POLICY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy & cookies" },
  { href: "/terms", label: "Terms" },
];

export default function SiteFooter() {
  const cities = allCityContent();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 text-sm text-slate-400">
        <nav aria-label="London guides" className="flex flex-wrap gap-x-4 gap-y-2">
          <span className="text-slate-500">London:</span>
          {LONDON_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {cities.map((content) => (
          <nav
            key={content.city.id}
            aria-label={`${content.city.name} guides`}
            className="flex flex-wrap gap-x-4 gap-y-2"
          >
            <span className="text-slate-500">{content.city.name}:</span>
            <Link
              href={content.path("/")}
              className="transition-colors hover:text-white"
            >
              Overview
            </Link>
            <Link
              href={content.path(`/${content.city.councilSegment}`)}
              className="capitalize transition-colors hover:text-white"
            >
              {content.input.councilNoun.plural}
            </Link>
            {CITY_SECTIONS.map((section) => (
              <Link
                key={section.path}
                href={content.path(section.path)}
                className="transition-colors hover:text-white"
              >
                {section.label}
              </Link>
            ))}
          </nav>
        ))}

        <nav
          aria-label="More London guides"
          className="flex flex-wrap gap-x-4 gap-y-2 text-slate-500"
        >
          {MORE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav
          aria-label="Site information"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-800 pt-4 text-slate-500"
        >
          {POLICY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <CookieSettingsLink />
        </nav>

        <div className="space-y-2 text-slate-500">
          {/*
            Each city links to its own methodology, because they genuinely
            differ — travel bands against tube zones, Broad Rental Market
            Areas against local authorities, Scottish income tax against
            the UK-wide bands, and no live journey planner behind any of
            the non-London times.
          */}
          <p>
            An independent guide to choosing where to live across{" "}
            {cities.length + 1} British city regions. Rent and commute
            figures are decision-support estimates, not live listings or
            guaranteed journey times — see the{" "}
            <Link
              href="/methodology"
              className="underline underline-offset-2 transition-colors hover:text-white"
            >
              London methodology
            </Link>
            {cities.map((content, index) => (
              <span key={content.city.id}>
                {index === cities.length - 1 ? " or the " : ", the "}
                <Link
                  href={content.path("/methodology")}
                  className="underline underline-offset-2 transition-colors hover:text-white"
                >
                  {content.city.name} methodology
                </Link>
              </span>
            ))}
            .
          </p>
          <p>
            © {new Date().getFullYear()} {SITE_NAME} ·{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline underline-offset-2 transition-colors hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
