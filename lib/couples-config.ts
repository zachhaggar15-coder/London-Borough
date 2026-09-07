import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { DESTINATIONS } from "@/lib/data/destinations";
import { selectedRentGbp } from "@/lib/rent";
import { LONDON_CITY_DATA } from "@/lib/city-data-london";
import { createCityData } from "@/lib/city-data";
import { CITY_MAP_CONFIGS } from "@/lib/city-maps";
import { CONTENT_CITY_IDS, getCityContent } from "@/lib/city-registry";
import type { CouplesConfig } from "@/components/CouplesClient";
import type { CityId, ContentCityId } from "@/lib/cities";

/**
 * City bindings for the couples tool.
 *
 * The default destination pairs matter more than they look. Each is
 * chosen to sit on opposite sides of its region, because a couple whose
 * two offices are a mile apart does not need this page — the interesting
 * case is the compromise, and the defaults should show one immediately.
 */

export const LONDON_COUPLES_CONFIG: CouplesConfig = {
  neighbourhoods: NEIGHBOURHOODS,
  destinations: DESTINATIONS,
  defaultDestinationAId: "canary-wharf",
  defaultDestinationBId: "kings-cross",
  defaultBudgetGbp: 1_900,
  selectedRent: selectedRentGbp,
  areaHref: LONDON_CITY_DATA.links.areaHref,
  fetchCommute: async (destination) =>
    (await LONDON_CITY_DATA.fetchCommute(destination)).commute,
};

/**
 * The awkward pair in each region, and a realistic household budget.
 *
 * The budget field is named budgetGbp for historical reasons but is
 * always in the city's own currency — francs for Geneva, euros for Paris
 * and Barcelona. The tool formats it with the city's currency symbol, so
 * the number here must match that, not a sterling equivalent.
 */
const DEFAULTS: Record<
  ContentCityId,
  { a: string; b: string; budgetGbp: number }
> = {
  // Opposite ends of the conurbation with no orbital route between them,
  // which is exactly the problem this page exists to solve.
  manchester: { a: "mediacity", b: "stockport", budgetGbp: 1_100 },
  // The West of England's hardest split: the aerospace belt in the north
  // and Bath in the south-east, with the whole city in between.
  bristol: { a: "aztec-west", b: "bath-centre", budgetGbp: 1_500 },
  // Two cities twenty minutes apart on the same line, which makes the
  // answer a junction town rather than either centre.
  leeds: { a: "leeds-station", b: "huddersfield", budgetGbp: 950 },
  // The city's two employment clusters, at opposite ends of the tram.
  edinburgh: { a: "edinburgh-park", b: "leith-shore", budgetGbp: 1_350 },
  // Geneva's two big non-central employers, at opposite ends of the
  // canton, on a network built to connect neither to the other. Budget
  // is in francs, not pounds.
  geneva: { a: "cern", b: "plan-les-ouates", budgetGbp: 3_500 },
  // La Défense is outside the city on the RER A and the east of Paris is
  // not, which is the one genuinely hard pairing in a compact city.
  paris: { a: "la-defense", b: "gare-de-lyon", budgetGbp: 2_200 },
  // Opposite sides of Collserola: the FGC tunnel is the only quick way
  // through, which pushes the answer up the hill.
  barcelona: { a: "22at", b: "sant-cugat", budgetGbp: 1_800 },
};

function configFor(id: ContentCityId): CouplesConfig {
  const content = getCityContent(id);
  const data = createCityData(content, CITY_MAP_CONFIGS[id]);
  const defaults = DEFAULTS[id];

  return {
    neighbourhoods: content.areas,
    destinations: content.input.destinations,
    defaultDestinationAId: defaults.a,
    defaultDestinationBId: defaults.b,
    defaultBudgetGbp: defaults.budgetGbp,
    selectedRent: content.selectedRent,
    areaHref: data.links.areaHref,
    fetchCommute: async (destination) =>
      (await data.fetchCommute(destination)).commute,
  };
}

export const COUPLES_CONFIGS: Record<CityId, CouplesConfig> = {
  london: LONDON_COUPLES_CONFIG,
  ...(Object.fromEntries(
    CONTENT_CITY_IDS.map((id) => [id, configFor(id)]),
  ) as Record<ContentCityId, CouplesConfig>),
};
