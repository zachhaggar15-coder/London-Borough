import type { ContentCityId } from "@/lib/cities";
import type { CityMapConfig } from "@/lib/city-data";
import { GM_BOROUGH_ONS_CODES } from "@/lib/manchester/boroughs";
import {
  WEST_OF_ENGLAND_BOUNDARY_NAMES,
  WEST_OF_ENGLAND_ONS_CODES,
} from "@/lib/bristol/councils";
import { WEST_YORKSHIRE_ONS_CODES } from "@/lib/leeds/councils";
import { LOTHIAN_ONS_CODES } from "@/lib/edinburgh/councils";
import { GM_TRANSIT_KMH } from "@/lib/manchester/commute";
import { WEST_OF_ENGLAND_TRANSIT_KMH } from "@/lib/bristol/commute";
import { WEST_YORKSHIRE_TRANSIT_KMH } from "@/lib/leeds/commute";
import { EDINBURGH_TRANSIT_KMH } from "@/lib/edinburgh/commute";

/**
 * The map viewport, corridor geometry and journey narrative for each
 * generated city.
 *
 * The corridor bearings are rough compass headings for how each transport
 * line actually leaves the centre. They are what elongates an area's
 * footprint along its line instead of drawing it as a circle, which is
 * the difference between a map that looks like a transport network and
 * one that looks like a scatter of dots.
 */
export const CITY_MAP_CONFIGS: Record<ContentCityId, CityMapConfig> = {
  manchester: {
    // St Peter's Square — the point every Metrolink line passes through.
    centre: { lat: 53.4779, lng: -2.2426 },
    bbox: { minLat: 53.29, maxLat: 53.72, minLng: -2.78, maxLng: -1.91 },
    // Starts closer in than London: the built-up area is smaller, and at
    // London's zoom half the viewport would be Cheshire and the Peak.
    initialZoom: 9.8,
    corridors: [
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
      // Heavy rail and the busway fan out in every direction, so they
      // point away from the centre rather than along a fixed bearing.
      { pattern: /northern rail|transpennine|avanti|busway|bee network/i, rotation: "radial", stretch: 0.11 },
    ],
    onsCodes: GM_BOROUGH_ONS_CODES,
    commuteNarrative: {
      modePatterns: [
        { pattern: /metrolink/i, mode: "tram" },
        { pattern: /bus|busway/i, mode: "bus" },
        { pattern: /rail|northern|transpennine|avanti/i, mode: "rail" },
      ],
      directHints: {
        piccadilly: /metrolink (bury|altrincham|ashton|east didsbury)|northern rail|transpennine/i,
        victoria: /metrolink (bury|rochdale|eccles)|northern rail/i,
        spinningfields: /metrolink (altrincham|eccles|airport)/i,
        mediacity: /metrolink eccles/i,
        airport: /metrolink airport|northern rail|transpennine/i,
        stockport: /northern rail|transpennine|avanti/i,
      },
      transitKmh: GM_TRANSIT_KMH,
      networkShape: "Greater Manchester's network is radial",
    },
    labels: {
      panelTitle: "Find where to live in Greater Manchester",
      panelSubtitle: "Compare areas by commute, rent and everyday life.",
      destinationPlaceholder: "e.g. M1 1AE · Piccadilly · Chorlton",
    },
  },

  bristol: {
    // The Centre — where the harbour, the Old City and the bus network meet.
    centre: { lat: 51.4536, lng: -2.5966 },
    bbox: { minLat: 51.25, maxLat: 51.68, minLng: -3.05, maxLng: -2.29 },
    initialZoom: 9.6,
    corridors: [
      // The Severn Beach line runs north-west down the Avon to Avonmouth.
      { pattern: /severn beach/i, rotation: 2.5, stretch: 0.13 },
      // The main lines east towards Bath and south towards Weston.
      { pattern: /gwr|crossCountry|south western/i, rotation: "radial", stretch: 0.12 },
      // MetroBus corridors: m1 north to Cribbs, m2 south, m3 east.
      { pattern: /metrobus m1/i, rotation: 1.5, stretch: 0.12 },
      { pattern: /metrobus m2|first bus m2/i, rotation: -1.5, stretch: 0.12 },
      { pattern: /metrobus m3|first bus m3/i, rotation: 0.05, stretch: 0.12 },
      { pattern: /first bus|metrobus/i, rotation: "radial", stretch: 0.1 },
    ],
    onsCodes: WEST_OF_ENGLAND_ONS_CODES,
    boundaryNames: WEST_OF_ENGLAND_BOUNDARY_NAMES,
    commuteNarrative: {
      modePatterns: [
        { pattern: /metrobus|first bus|bus/i, mode: "bus" },
        { pattern: /gwr|crossCountry|south western|severn beach|railway/i, mode: "rail" },
      ],
      directHints: {
        "temple-meads": /gwr|severn beach|crossCountry|south western/i,
        "city-centre": /first bus m1|first bus m2|metrobus/i,
        avonmouth: /severn beach/i,
        "bath-centre": /gwr|crossCountry/i,
      },
      transitKmh: WEST_OF_ENGLAND_TRANSIT_KMH,
      networkShape: "Bristol's network is radial and has no orbital routes at all",
    },
    labels: {
      panelTitle: "Find where to live in the West of England",
      panelSubtitle: "Compare areas by commute, rent and everyday life.",
      destinationPlaceholder: "e.g. BS1 5TR · Temple Meads · Clifton",
    },
  },

  leeds: {
    // City Square, outside the station — the point every route converges on.
    centre: { lat: 53.7955, lng: -1.5486 },
    bbox: { minLat: 53.55, maxLat: 53.97, minLng: -2.12, maxLng: -1.28 },
    initialZoom: 9.5,
    corridors: [
      // The Airedale and Wharfedale lines run north-west up the valley.
      { pattern: /northern/i, rotation: "radial", stretch: 0.12 },
      // TransPennine runs east-west through Dewsbury and Huddersfield.
      { pattern: /transpennine/i, rotation: 0.0, stretch: 0.13 },
      // LNER and Grand Central run north-south on the East Coast route.
      { pattern: /lner|grand central|crossCountry/i, rotation: 1.57, stretch: 0.12 },
      { pattern: /first bus|arriva|keighley bus|harrogate bus/i, rotation: "radial", stretch: 0.1 },
    ],
    onsCodes: WEST_YORKSHIRE_ONS_CODES,
    commuteNarrative: {
      modePatterns: [
        { pattern: /bus/i, mode: "bus" },
        { pattern: /northern|transpennine|lner|grand central|crossCountry|railway/i, mode: "rail" },
      ],
      directHints: {
        "leeds-station": /northern|transpennine|lner|grand central/i,
        "bradford-centre": /northern|grand central/i,
        huddersfield: /transpennine|northern/i,
      },
      transitKmh: WEST_YORKSHIRE_TRANSIT_KMH,
      networkShape:
        "West Yorkshire's rail network was built to link mill towns rather than to serve suburbs",
    },
    labels: {
      panelTitle: "Find where to live in West Yorkshire",
      panelSubtitle: "Compare areas by commute, rent and everyday life.",
      destinationPlaceholder: "e.g. LS1 4DY · Leeds station · Headingley",
    },
  },

  edinburgh: {
    // The Castle esplanade — the point the whole city is measured from.
    centre: { lat: 55.9486, lng: -3.1999 },
    bbox: { minLat: 55.78, maxLat: 56.09, minLng: -3.75, maxLng: -2.42 },
    // Closest zoom of the four: Edinburgh fits inside a bypass six
    // kilometres across, and at a wider zoom the city would be a dot.
    initialZoom: 10.0,
    corridors: [
      // The tram runs west from Leith through the New Town to the airport.
      { pattern: /edinburgh trams/i, rotation: 0.1, stretch: 0.13 },
      // ScotRail fans out along the Forth in both directions.
      { pattern: /scotrail|lner|crossCountry|avanti/i, rotation: "radial", stretch: 0.12 },
      // Lothian Buses reach everywhere; radial keeps them honest.
      { pattern: /lothian|east coast buses|borders buses|first bus/i, rotation: "radial", stretch: 0.1 },
    ],
    onsCodes: LOTHIAN_ONS_CODES,
    commuteNarrative: {
      modePatterns: [
        { pattern: /tram/i, mode: "tram" },
        { pattern: /bus/i, mode: "bus" },
        { pattern: /scotrail|lner|crossCountry|avanti|railway/i, mode: "rail" },
      ],
      directHints: {
        waverley: /scotrail|lner|crossCountry|lothian buses/i,
        "st-andrew-square": /edinburgh trams|lothian buses/i,
        haymarket: /edinburgh trams|scotrail/i,
        "edinburgh-park": /edinburgh trams|scotrail/i,
        "leith-shore": /edinburgh trams|lothian buses/i,
        "livingston-centre": /scotrail/i,
      },
      transitKmh: EDINBURGH_TRANSIT_KMH,
      networkShape:
        "Edinburgh's network converges on the centre and the tram is its only cross-city spine",
    },
    labels: {
      panelTitle: "Find where to live in Edinburgh and the Lothians",
      panelSubtitle: "Compare areas by commute, rent and everyday life.",
      destinationPlaceholder: "e.g. EH1 1BQ · Waverley · Leith",
    },
  },
};
