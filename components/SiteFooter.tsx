import Link from "next/link";

const HUB_LINKS = [
  { href: "/neighbourhoods", label: "Neighbourhoods" },
  { href: "/compare", label: "Compare" },
  { href: "/commute", label: "Commute" },
  { href: "/rent-guide", label: "Rent guides" },
  { href: "/lifestyle", label: "Lifestyle" },
  { href: "/boroughs", label: "Boroughs" },
];

const MORE_LINKS = [
  { href: "/lifestyle/expensive", label: "Cheapest & priciest areas" },
  { href: "/lifestyle/best-for-food", label: "Best for food" },
  { href: "/london-rent-index", label: "London rent index" },
  { href: "/methodology", label: "Methodology" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 px-6 py-8 bg-slate-950">
      <div className="mx-auto max-w-5xl flex flex-col gap-4 text-sm text-slate-400">
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          {HUB_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-slate-500">
          {MORE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p>© {new Date().getFullYear()} Where in London</p>
      </div>
    </footer>
  );
}
