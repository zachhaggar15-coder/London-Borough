import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONTENT_CITY_IDS, getCityContent, isContentCityId } from "@/lib/city-registry";
import { CITIES } from "@/lib/cities";
import {
  CouncilsIndexPage,
  councilsIndexMetadata,
} from "@/components/city/CouncilPages";

type Props = { params: Promise<{ city: string }> };

export const dynamicParams = false;

/**
 * Only the cities that call their authorities "communes" build here.
 * The others answer on the sibling segment, and this one 404s for them.
 */
export async function generateStaticParams() {
  return CONTENT_CITY_IDS.filter(
    (city) => CITIES[city].councilSegment === "communes",
  ).map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  if (!isContentCityId(city)) return {};
  return councilsIndexMetadata(getCityContent(city));
}

export default async function Page({ params }: Props) {
  const { city } = await params;
  if (!isContentCityId(city) || CITIES[city].councilSegment !== "communes") {
    notFound();
  }
  return <CouncilsIndexPage content={getCityContent(city)} />;
}
