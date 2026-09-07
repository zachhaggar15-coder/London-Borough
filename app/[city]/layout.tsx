import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityContent, isContentCityId } from "@/lib/city-registry";

type Props = {
  params: Promise<{ city: string }>;
  children: React.ReactNode;
};

/**
 * Per-city metadata.
 *
 * The root layout sets a "%s | Where in London" title template, which is
 * correct for every page at the root and wrong for every page under a
 * city prefix. A nested layout overrides the template for the whole
 * subtree without touching the London titles, all of which are indexed.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  if (!isContentCityId(city)) return {};
  const content = getCityContent(city);

  return {
    title: {
      default: content.copy.homeH1,
      template: `%s | ${content.city.brand}`,
    },
    openGraph: {
      siteName: content.city.brand,
      locale: "en_GB",
      type: "website",
      url: content.url("/"),
    },
  };
}

export default async function CityLayout({ params, children }: Props) {
  const { city } = await params;
  if (!isContentCityId(city)) notFound();
  return <>{children}</>;
}
