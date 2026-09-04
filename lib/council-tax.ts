/**
 * Council tax helpers.
 *
 * Everything here derives from the Band D figures in lib/data/council-tax.ts
 * plus the statutory band ratios, so there is one number stored per borough
 * and no chance of the bands drifting out of step with each other.
 */

import {
  BAND_D_BY_BOROUGH,
  BAND_RATIOS,
  BAND_VALUE_RANGES,
  CITY_OF_LONDON_BAND_D,
  COUNCIL_TAX_BANDS,
  GLA_PRECEPT_BAND_D,
  type CouncilTaxBand,
} from "@/lib/data/council-tax";

export type BandAmount = {
  band: CouncilTaxBand;
  /** Annual charge for this band, rounded to the nearest pound. */
  annualGbp: number;
  /** Charge spread over the 10 instalments most London councils bill by default. */
  monthlyOverTenGbp: number;
  valueRange: string;
};

export type BoroughCouncilTax = {
  borough: string;
  bandDGbp: number;
  /** The borough's own element, i.e. Band D less the GLA precept. */
  boroughElementGbp: number;
  glaPreceptGbp: number;
  bands: BandAmount[];
  /** 1 = cheapest of the 32 boroughs. */
  rank: number;
  totalRanked: number;
  /** Difference from the 32-borough median, negative = cheaper than median. */
  vsMedianGbp: number;
};

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Band D charge for a borough, or null if the name is not one of the 32. */
export function bandDFor(borough: string): number | null {
  return BAND_D_BY_BOROUGH[borough] ?? null;
}

/** Every band's annual charge, derived from a Band D figure. */
export function bandAmounts(bandD: number): BandAmount[] {
  return COUNCIL_TAX_BANDS.map((band) => {
    const annual = bandD * BAND_RATIOS[band];
    return {
      band,
      annualGbp: Math.round(annual),
      monthlyOverTenGbp: Math.round(annual / 10),
      valueRange: BAND_VALUE_RANGES[band],
    };
  });
}

/** Boroughs sorted cheapest Band D first. */
export function boroughsByBandD(): Array<{ borough: string; bandDGbp: number }> {
  return Object.entries(BAND_D_BY_BOROUGH)
    .map(([borough, bandDGbp]) => ({ borough, bandDGbp }))
    .sort((a, b) => a.bandDGbp - b.bandDGbp);
}

export function medianBandD(): number {
  const values = boroughsByBandD().map((b) => b.bandDGbp);
  const mid = Math.floor(values.length / 2);
  return values.length % 2 === 0
    ? round2((values[mid - 1] + values[mid]) / 2)
    : values[mid];
}

export function cheapestBorough(): { borough: string; bandDGbp: number } {
  return boroughsByBandD()[0];
}

export function priciestBorough(): { borough: string; bandDGbp: number } {
  const ranked = boroughsByBandD();
  return ranked[ranked.length - 1];
}

/** Full council tax picture for one borough, or null if unknown. */
export function councilTaxForBorough(borough: string): BoroughCouncilTax | null {
  const bandDGbp = bandDFor(borough);
  if (bandDGbp === null) return null;

  const ranked = boroughsByBandD();
  const rank = ranked.findIndex((b) => b.borough === borough) + 1;

  return {
    borough,
    bandDGbp,
    boroughElementGbp: round2(bandDGbp - GLA_PRECEPT_BAND_D),
    glaPreceptGbp: GLA_PRECEPT_BAND_D,
    bands: bandAmounts(bandDGbp),
    rank,
    totalRanked: ranked.length,
    vsMedianGbp: Math.round(bandDGbp - medianBandD()),
  };
}

/**
 * Plain-English placement of a borough against the rest of London — used in
 * prose and FAQ answers so the phrasing stays consistent across pages.
 */
export function bandDStanding(borough: string): string | null {
  const data = councilTaxForBorough(borough);
  if (!data) return null;

  const { rank, totalRanked, vsMedianGbp } = data;
  if (rank <= 3) return "one of the cheapest in London";
  if (rank >= totalRanked - 2) return "one of the most expensive in London";
  if (Math.abs(vsMedianGbp) <= 75) return "close to the London median";
  return vsMedianGbp < 0 ? "below the London median" : "above the London median";
}

/** "£1,028.21" — pounds with thousands separators and exact pence. */
export function formatPounds(value: number): string {
  return `£${value.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export { CITY_OF_LONDON_BAND_D, GLA_PRECEPT_BAND_D };
