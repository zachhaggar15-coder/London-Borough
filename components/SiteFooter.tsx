import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";

const HUB_LINKS = [
  { href: "/guides", label: "Guides" },
  { href: "/neighbourhoods", label: "Neighbourhoods" },
  { href: "/compare", label: "Compare" },
  { href: "/commute", label: "Commute" },
  { href: "/lifestyle", label: "Lifestyle" },
  { href: "/salary", label: "Salary" },
  { href: "/boroughs", label: "Boroughs" },
];

const MORE_LINKS = [
  { href: "/guides/how-much-do-i-need-to-earn-to-live-in-london", label: "What salary do you need?" },
  { href: "/guides/london-council-tax-explained", label: "Council tax by borough" },
  { href: "/lifestyle/expensive", label: "Cheapest & priciest areas" },
  { href: "/lifestyle/best-for-food", label: "Best for food" },
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
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 text-sm text-slate-400">
        <nav aria-label="Guides" className="flex flex-wrap gap-x-4 gap-y-2">
          {HUB_LINKS.map((link) => (
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
          aria-label="More guides"
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
          <p>
            {SITE_NAME} is an independent guide to choosing a London
            neighbourhood. Rent and commute figures are decision-support
            estimates, not live listings or guaranteed journey times — see the{" "}
            <Link
              href="/methodology"
              className="underline underline-offset-2 transition-colors hover:text-white"
            >
              methodology
            </Link>
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
