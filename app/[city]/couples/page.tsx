import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CouplesClient from "@/components/CouplesClient";
import {
  CONTENT_CITY_IDS,
  getCityContent,
  isContentCityId,
} from "@/lib/city-registry";
import {
  CityBreadcrumbs,
  DataNote,
  PageShell,
} from "@/components/city/Pieces";

type Props = { params: Promise<{ city: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return CONTENT_CITY_IDS.map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  if (!isContentCityId(city)) return {};
  const content = getCityContent(city);
  const region = content.copy.regionLabel;

  const title = `Where to live as a couple or flatmates in ${region}`;
  const description = `Two people, two commutes, one shared budget. Compare ${region} areas that work for both of you rather than only for whoever has the easier journey.`;

  return {
    title,
    description,
    alternates: { canonical: content.url("/couples") },
    openGraph: {
      title,
      description,
      url: content.url("/couples"),
      type: "website",
    },
  };
}

export default async function CityCouplesPage({ params }: Props) {
  const { city } = await params;
  if (!isContentCityId(city)) notFound();
  const content = getCityContent(city);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: content.city.name, item: content.url("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Couples and flatmates",
        item: content.url("/couples"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageShell>
        <CityBreadcrumbs
          content={content}
          trail={[{ label: "Couples and flatmates" }]}
        />

        <p className="mb-3 text-sm uppercase tracking-wide text-emerald-400">
          Two commutes, one shortlist
        </p>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          Where should we live as a couple or flatmates?
        </h1>
        {content.copy.couplesIntro.map((paragraph, index) => (
          <p
            key={paragraph}
            className={
              index === 0
                ? "mt-4 max-w-3xl text-lg leading-relaxed text-slate-300"
                : "mt-4 max-w-3xl text-slate-300"
            }
          >
            {paragraph}
          </p>
        ))}

        <div className="mt-10">
          <CouplesClient city={city} />
        </div>

        <DataNote>
          Journey times are reviewed door-to-door estimates for a weekday
          morning, drawn from the same matrix as the rest of this section — see
          the{" "}
          <Link
            href={content.path("/methodology")}
            className="underline underline-offset-2 hover:text-slate-300"
          >
            methodology
          </Link>
          . The shared budget is the total for the household, and rents shown
          are for the rent type you pick rather than per person.
        </DataNote>
      </PageShell>
    </>
  );
}
