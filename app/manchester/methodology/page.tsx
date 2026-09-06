import type { Metadata } from "next";
import Link from "next/link";
import { CITIES } from "@/lib/cities";
import {
  getAllManchesterSlugs,
  getManchesterCompareSlugs,
  manchesterPath,
  manchesterUrl,
} from "@/lib/manchester/seo-data";
import { GM_BOROUGHS } from "@/lib/manchester/boroughs";
import { MANCHESTER_DESTINATIONS } from "@/lib/manchester/data/destinations";
import {
  MANCHESTER_RENT_REVIEW_AS_OF,
  MANCHESTER_RENT_SOURCES,
  ONS_RENT_REFERENCE_MONTH,
} from "@/lib/manchester/data/rent-market";
import {
  GM_FIRE_ELEMENT_BAND_D,
  GM_MAYORAL_PRECEPT_BAND_D,
  GM_MAYORAL_PRECEPT_BREAKDOWN,
  MANCHESTER_COUNCIL_TAX_AS_OF,
  MANCHESTER_COUNCIL_TAX_SOURCES,
  MANCHESTER_COUNCIL_TAX_YEAR,
} from "@/lib/manchester/data/council-tax";
import { GM_TRANSIT_KMH } from "@/lib/manchester/commute";
import {
  TRAVEL_BANDS,
  TRAVEL_BAND_DESCRIPTIONS,
  TRAVEL_BAND_DISTANCE_KM,
  TRAVEL_BAND_LABELS,
} from "@/lib/manchester/travel-band";
import { LIFESTYLE_KEYS, LIFESTYLE_LABELS } from "@/lib/types";
import {
  Breadcrumbs,
  PageShell,
  Section,
} from "@/components/manchester/Pieces";

export const metadata: Metadata = {
  title: "How the Greater Manchester figures are worked out",
  description:
    "Sources and method behind the Greater Manchester rent, commute, council tax and lifestyle figures — including what the data cannot tell you.",
  alternates: { canonical: manchesterUrl("/methodology") },
};

export default function ManchesterMethodologyPage() {
  const areaCount = getAllManchesterSlugs().length;
  const compareCount = getManchesterCompareSlugs().length;

  return (
    <PageShell>
      <Breadcrumbs
        trail={[
          { label: "Manchester", href: manchesterPath("/") },
          { label: "Methodology" },
        ]}
      />

      <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        How the Greater Manchester figures are worked out
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
        Every number on the Manchester pages comes from one of three places: a
        published statistic, a reviewed estimate built on top of one, or an
        editorial judgement. This page says which is which, and is as specific
        as it can be about where each is weakest — a decision-support figure
        that hides its own error bars is worse than no figure at all.
      </p>

      <Section title="What is covered">
        <p className="max-w-3xl text-slate-300">
          {areaCount} areas across all {GM_BOROUGHS.length} Greater Manchester
          boroughs, {MANCHESTER_DESTINATIONS.length} employment destinations,
          and {compareCount} side-by-side comparisons. Coverage is deliberately
          uneven: the city of Manchester has more areas than Wigan because far
          more people are choosing between parts of it, not because Wigan
          matters less.
        </p>
      </Section>

      <Section title="Rent">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            The anchor is the ONS Price Index of Private Rents, which publishes
            an average monthly rent by bedroom count for each local authority.
            The figures used here are for {ONS_RENT_REFERENCE_MONTH}. That part
            is a real, sourced statistic and it is what the borough pages
            quote.
          </p>
          <p>
            Nobody rents a borough, though. Didsbury and Wythenshawe are both
            Manchester and a single Manchester figure describes neither, so
            each area carries a reviewed premium or discount against its
            borough baseline, set from visible listing samples on the major
            portals. That second step is an estimate, and it is the weakest
            link in the chain. Figures are rounded to the nearest £25 for
            exactly that reason: quoting £1,163 for a one-bed in Sale would
            imply a precision the method does not have.
          </p>
          <p>
            Room-in-a-share rents work differently again. No official series
            publishes them, so they come from listing samples keyed to postcode
            district groups. Grouping matters here more than it does in London:
            M1 and M18 are eight kilometres and roughly £300 a month apart, so
            a single M-wide average would be worthless.
          </p>
          <p className="text-slate-400">
            Sources: {MANCHESTER_RENT_SOURCES.join("; ")}. Last reviewed{" "}
            {MANCHESTER_RENT_REVIEW_AS_OF}.
          </p>
        </div>
      </Section>

      <Section title="Commute times">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            The London pages can fall back on the TfL Journey Planner, a free
            public API that will route any two points in the capital.{" "}
            {CITIES.manchester.transitAuthority} publishes no comparable open
            endpoint, so Manchester runs entirely on a reviewed static matrix:
            one figure for every one of the {areaCount} areas against every one
            of the {MANCHESTER_DESTINATIONS.length} destinations. Nothing on
            these pages calls out to a live service, and nothing claims to.
          </p>
          <p>
            The figures are typical weekday-morning door-to-door times —
            walking to the stop, waiting, riding, and walking off at the other
            end. They are not timetable times. A tram that runs Sale to St
            Peter&apos;s Square in 22 minutes is quoted here at 35, because
            nobody lives at the tram stop.
          </p>
          <p>
            Where a figure is missing the site falls back to straight-line
            distance at an assumed {GM_TRANSIT_KMH} km/h and labels the result
            a distance estimate rather than a reviewed one. That speed is
            deliberately lower than the London equivalent. Greater
            Manchester&apos;s network is radial to a degree London&apos;s is
            not: there is no orbital rail, the tram runs on street through the
            centre, and a journey like Sale to Oldham is frequently quicker by
            car than by any published public route. A London-like assumption
            would produce confidently wrong numbers for exactly the journeys
            people most need warning about.
          </p>
          <p>
            Treat a five-minute difference between two areas as noise.
          </p>
        </div>
      </Section>

      <Section title="Travel bands, and why not Metrolink zones">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            London&apos;s whole sense of how central a place is rides on travel
            zones 1–6, a single fare geography covering tube, rail, Overground
            and DLR alike. Greater Manchester has no equivalent. Metrolink runs
            zones 1–4, but they cover only the tram; heavy rail into Piccadilly
            and Victoria prices on a separate scheme, and the bus network on a
            third. Quoting a Metrolink zone for Heaton Moor, which has no tram
            at all, would be worse than useless.
          </p>
          <p>
            So centrality is described directly, in the terms someone moving
            here actually reasons in:
          </p>
          <dl className="space-y-3">
            {TRAVEL_BANDS.map((band) => (
              <div key={band} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="w-40 shrink-0 font-medium text-slate-200">
                  {TRAVEL_BAND_LABELS[band]} ({TRAVEL_BAND_DISTANCE_KM[band]})
                </dt>
                <dd className="text-slate-400">{TRAVEL_BAND_DESCRIPTIONS[band]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section title="Council tax">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            Band D charges for {MANCHESTER_COUNCIL_TAX_YEAR} are the total for
            the year: the borough&apos;s own element, including its adult
            social care precept, plus the Greater Manchester Mayoral precept of
            £{GM_MAYORAL_PRECEPT_BAND_D.toLocaleString()} that every household
            in the ten boroughs pays. That precept splits into £
            {GM_MAYORAL_PRECEPT_BREAKDOWN.police.toLocaleString()} for the
            Mayoral Police and Crime Commissioner and £
            {GM_MAYORAL_PRECEPT_BREAKDOWN.general.toLocaleString()} for general
            functions, of which about £
            {GM_FIRE_ELEMENT_BAND_D.toLocaleString()} funds fire and rescue.
            London handles the same idea as one combined GLA precept, which is
            why the two cities&apos; figures are not directly comparable
            line by line.
          </p>
          <p>
            The charges exclude parish and town council precepts. Those apply
            in only a handful of Greater Manchester places — Saddleworth in
            Oldham is the best known — and add a modest amount where they
            exist.
          </p>
          <p>
            Every other band is derived exactly from Band D using the statutory
            national ratios (Local Government Finance Act 1992, s.5), which do
            not vary by authority. Bands themselves are still based on what a
            property was worth on 1 April 1991. Most Greater Manchester housing
            sits in bands A to C, so a typical bill is well below the Band D
            headline — which is not true across much of inner London, and is
            the most common way these figures get misread.
          </p>
          <p className="text-slate-400">
            Sources: {MANCHESTER_COUNCIL_TAX_SOURCES.join("; ")}. Every figure
            was cross-checked against two independent published comparison
            tables, which agreed on all ten authorities. They remain secondary
            sources: confirm the charge for a specific address with the council
            before budgeting against it. Last reviewed{" "}
            {MANCHESTER_COUNCIL_TAX_AS_OF}.
          </p>
        </div>
      </Section>

      <Section title="Lifestyle scores">
        <div className="max-w-3xl space-y-4 text-slate-300">
          <p>
            Each area carries {LIFESTYLE_KEYS.length} scores from 0 to 10:{" "}
            {LIFESTYLE_KEYS.map((k) => LIFESTYLE_LABELS[k].toLowerCase()).join(", ")}
            . They are comparable across areas but not across cities — a 7 for
            nightlife in Greater Manchester is not a 7 for nightlife in London.
          </p>
          <p>
            These are editorial judgements, informed by transport data,
            published crime and deprivation statistics and local knowledge.
            They are not survey results and they are not derived from a
            formula. The{" "}
            <Link
              href={manchesterPath("/lifestyle")}
              className="underline underline-offset-2 hover:text-white"
            >
              lifestyle rankings
            </Link>{" "}
            combine them with different weights, which are stated on each page.
          </p>
        </div>
      </Section>

      <Section title="What this cannot tell you">
        <ul className="max-w-3xl space-y-3 text-slate-300">
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-slate-600">—</span>
            <span>
              <strong className="font-medium text-white">Schools.</strong>{" "}
              Nothing here scores them, which for families is usually the
              deciding factor. Check catchments directly.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-slate-600">—</span>
            <span>
              <strong className="font-medium text-white">
                Street-level variation.
              </strong>{" "}
              An area is not uniform. Levenshulme and Ordsall in particular
              change character sharply from one street to the next, and a
              single set of scores cannot express that.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-slate-600">—</span>
            <span>
              <strong className="font-medium text-white">
                What is available right now.
              </strong>{" "}
              These are market estimates, not listings. Nothing here is live.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="text-slate-600">—</span>
            <span>
              <strong className="font-medium text-white">
                Off-peak and non-public transport.
              </strong>{" "}
              Every journey time assumes weekday-morning public transport.
              Cycling changes the picture substantially in the inner ring, and
              driving changes it substantially everywhere else.
            </span>
          </li>
        </ul>
      </Section>

      <Section title="Corrections">
        <p className="max-w-3xl text-slate-300">
          If a figure here is wrong, it is worth telling us — particularly a
          rent estimate, which is the part most likely to drift.{" "}
          <Link
            href="/contact"
            className="underline underline-offset-2 hover:text-white"
          >
            Get in touch
          </Link>
          .
        </p>
      </Section>
    </PageShell>
  );
}
