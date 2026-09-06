import { GM_BOROUGHS, GM_BOROUGH_ONS_CODES } from "@/lib/manchester/boroughs";

export const MANCHESTER_BOROUGH_NAME_FIELD = "LAD24NM";

/**
 * The ten Greater Manchester districts, selected by their ONS codes.
 *
 * The London layer selects on `LAD24CD LIKE 'E09%'`, which works because
 * every London borough shares that prefix. Greater Manchester's ten are
 * E08000001 to E08000010, but E08 also covers the other metropolitan
 * districts — Merseyside, South Yorkshire, the West Midlands and the rest
 * — so a prefix match would drag in thirty-six authorities. They are
 * listed explicitly instead, from the same codes the rent baselines are
 * keyed on, so the two cannot drift apart.
 */
const CODE_LIST = GM_BOROUGHS.map((b) => `'${GM_BOROUGH_ONS_CODES[b]}'`).join(",");

const BOROUGH_WHERE = `LAD24CD IN (${CODE_LIST})`;

export const MANCHESTER_BOROUGH_BOUNDARY_SOURCE_URL =
  "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/" +
  "Local_Authority_Districts_May_2024_Boundaries_UK_BUC/FeatureServer/0/query" +
  `?where=${encodeURIComponent(BOROUGH_WHERE)}` +
  `&outFields=${encodeURIComponent(`LAD24CD,${MANCHESTER_BOROUGH_NAME_FIELD}`)}` +
  "&returnGeometry=true" +
  "&outSR=4326" +
  "&f=geojson";

export const MANCHESTER_BOROUGH_BOUNDARY_SOURCE_LABEL =
  "ONS Local Authority Districts May 2024, ultra-generalised clipped boundaries";

export const MANCHESTER_BOROUGH_BOUNDARY_ATTRIBUTION =
  "Contains OS data Crown copyright and database right 2025; ONS licensed under OGL v3.";

export const MANCHESTER_BOROUGH_FILTER_NAMES = [...GM_BOROUGHS];
