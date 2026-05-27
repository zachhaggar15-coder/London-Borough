import { LONDON_BOROUGHS } from "@/lib/commute-details";

export const BOROUGH_NAME_FIELD = "LAD24NM";

const BOROUGH_WHERE =
  "LAD24CD LIKE 'E09%' AND LAD24NM <> 'City of London'";

export const BOROUGH_BOUNDARY_SOURCE_URL =
  "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/" +
  "Local_Authority_Districts_May_2024_Boundaries_UK_BUC/FeatureServer/0/query" +
  `?where=${encodeURIComponent(BOROUGH_WHERE)}` +
  `&outFields=${encodeURIComponent(`LAD24CD,${BOROUGH_NAME_FIELD}`)}` +
  "&returnGeometry=true" +
  "&outSR=4326" +
  "&f=geojson";

export const BOROUGH_BOUNDARY_SOURCE_LABEL =
  "ONS Local Authority Districts May 2024, ultra-generalised clipped boundaries";

export const BOROUGH_BOUNDARY_ATTRIBUTION =
  "Contains OS data Crown copyright and database right 2025; ONS licensed under OGL v3.";

export const BOROUGH_FILTER_NAMES = [...LONDON_BOROUGHS];
