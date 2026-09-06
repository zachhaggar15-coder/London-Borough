import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { LONDON_CENTRE } from "@/lib/geo";
import { createPolygonIndex, type CorridorFamily } from "@/lib/polygon-engine";

/**
 * London neighbourhood footprints.
 *
 * The geometry lives in lib/polygon-engine.ts, which is shared with
 * Manchester. This file is only the London configuration: which areas,
 * where the centre is, and how the tube lines run.
 */

/**
 * Corridor bearings for the London network. Areas stretch along whichever
 * of these their stations most strongly match, which is what stops a
 * Piccadilly-line suburb from being drawn as a circle when in practice it
 * is a ribbon along one road.
 */
const LONDON_CORRIDORS: CorridorFamily[] = [
  { pattern: /victoria|northern|piccadilly|bakerloo/i, rotation: -0.72, stretch: 0.12 },
  { pattern: /central|district|elizabeth|metropolitan/i, rotation: 0.08, stretch: 0.14 },
  { pattern: /jubilee/i, rotation: 0.52, stretch: 0.1 },
  { pattern: /overground|dlr|national rail|thameslink|tramlink/i, rotation: "radial", stretch: 0.1 },
];

export const polygonForNeighbourhood = createPolygonIndex({
  neighbourhoods: NEIGHBOURHOODS,
  centre: LONDON_CENTRE,
  corridorFamilies: LONDON_CORRIDORS,
});
