import { MANCHESTER_NEIGHBOURHOODS } from "@/lib/manchester/data/neighbourhoods";
import { MANCHESTER_CENTRE } from "@/lib/manchester/geo";
import { createPolygonIndex, type CorridorFamily } from "@/lib/polygon-engine";

/**
 * Greater Manchester neighbourhood footprints.
 *
 * Same engine as London, different corridors. The bearings below are
 * rough compass headings for how each line actually leaves the city
 * centre, which is what gives an area its elongation on the map.
 */
const MANCHESTER_CORRIDORS: CorridorFamily[] = [
  // South-west along the Mersey corridor: Old Trafford, Sale, Altrincham.
  { pattern: /metrolink altrincham|metrolink trafford/i, rotation: -0.95, stretch: 0.13 },
  // Due south through Withington and Didsbury.
  { pattern: /metrolink east didsbury|metrolink airport/i, rotation: -1.35, stretch: 0.12 },
  // North through Cheetham Hill, Prestwich and Whitefield to Bury.
  { pattern: /metrolink bury/i, rotation: 1.4, stretch: 0.12 },
  // North-east over Oldham to Rochdale.
  { pattern: /metrolink rochdale/i, rotation: 0.75, stretch: 0.13 },
  // Due west along the ship canal to the Quays and Eccles.
  { pattern: /metrolink eccles/i, rotation: 0.02, stretch: 0.14 },
  // East to Ashton.
  { pattern: /metrolink ashton/i, rotation: -0.05, stretch: 0.12 },
  // Heavy rail and the busway fan out in every direction, so they point
  // away from the centre rather than along a fixed bearing.
  { pattern: /northern rail|transpennine|avanti|busway|bee network/i, rotation: "radial", stretch: 0.11 },
];

export const polygonForManchesterArea = createPolygonIndex({
  neighbourhoods: MANCHESTER_NEIGHBOURHOODS,
  centre: MANCHESTER_CENTRE,
  corridorFamilies: MANCHESTER_CORRIDORS,
});
