import Link from "next/link";

const HUB_LINKS = [
  { href: "/neighbourhoods", label: "Neighbourhoods" },
  { href: "/compare", label: "Compare" },
  { href: "/commute", label: "Commute" },
  { href: "/rent-guide", label: "Rent guides" },
  { href: "/lifestyle", label: "Lifestyle" },
  { href: "/boroughs", label: "Boroughs" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 px-6 py-8 bg-slate-950">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} Where in London</p>
        <nav className="flex flex-wrap gap-4">
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
      </div>
    </footer>
  );
}
