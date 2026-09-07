import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONTENT_CITY_IDS, getCityContent, isContentCityId } from "@/lib/city-registry";
import { CITIES } from "@/lib/cities";
import {
  CouncilDetailPage,
  councilDetailMetadata,
} from "@/components/city/CouncilPages";

type Props = { params: Promise<{ city: string; slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return CONTENT_CITY_IDS.filter(
    (city) => CITIES[city].councilSegment === "councils",
  ).flatMap((city) =>
    getCityContent(city)
      .councilSlugs()
      .map((slug) => ({ city, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, slug } = await params;
  if (!isContentCityId(city)) return {};
  return councilDetailMetadata(getCityContent(city), slug);
}

export default async function Page({ params }: Props) {
  const { city, slug } = await params;
  if (!isContentCityId(city) || CITIES[city].councilSegment !== "councils") {
    notFound();
  }
  return <CouncilDetailPage content={getCityContent(city)} slug={slug} />;
}
