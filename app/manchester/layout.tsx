import type { Metadata } from "next";
import { CITIES } from "@/lib/cities";
import { manchesterUrl } from "@/lib/manchester/seo-data";

const CITY = CITIES.manchester;

/**
 * Per-city metadata.
 *
 * The root layout sets a "%s | Where in London" title template, which is
 * correct for every page at the root and wrong for every page under
 * /manchester. A nested layout overrides the template for this subtree
 * without touching the London titles, all of which are already indexed.
 */
export const metadata: Metadata = {
  title: {
    default: "Where to live in Greater Manchester",
    template: `%s | ${CITY.brand}`,
  },
  openGraph: {
    siteName: CITY.brand,
    locale: "en_GB",
    type: "website",
    url: manchesterUrl("/"),
  },
};

export default function ManchesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
