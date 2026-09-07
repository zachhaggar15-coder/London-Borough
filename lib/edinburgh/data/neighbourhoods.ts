import { EDINBURGH_RENT_REVIEW_AS_OF } from "@/lib/edinburgh/data/rent-market";
import type { EdinburghRoomDistrict } from "@/lib/edinburgh/data/rent-market";
import type { Neighbourhood } from "@/lib/types";

/**
 * Edinburgh and Lothian neighbourhoods.
 *
 * Every entry is written out in full rather than generated from a
 * compact profile. Edinburgh is a small, tightly bounded city where two
 * areas half a mile apart can differ by £300 a month and by two hundred
 * years of building history, and the Lothians beyond it are a mix of
 * commuter towns, former mining villages and a coastline that has
 * nothing to do with the city at all.
 *
 * Rent figures are reviewed market estimates anchored on the BRMA
 * baselines in data/rent-market.ts, adjusted for the local premium or
 * discount. Those baselines measure newly advertised lets rather than
 * the whole stock, which is worth remembering when comparing them with
 * what a sitting tenant pays.
 */

const AS_OF = EDINBURGH_RENT_REVIEW_AS_OF;

export type EdinburghNeighbourhood = Neighbourhood & {
  roomDistrict: EdinburghRoomDistrict;
};

export const EDINBURGH_NEIGHBOURHOODS: EdinburghNeighbourhood[] = [
  // ── City of Edinburgh: central ─────────────────────────────────────
  {
    id: "old-town",
    name: "Old Town",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9490, lng: -3.1900 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1250, twoBedMedianGbp: 1650, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh1-eh3",
    mainStations: [
      { name: "Edinburgh Waverley", lines: ["ScotRail", "LNER", "CrossCountry", "Avanti West Coast"] },
      { name: "Royal Mile", lines: ["Lothian Buses 35", "Lothian Buses 300"] },
    ],
    lifestyle: {
      livelyVsQuiet: 9, greenSpace: 5, nightlife: 9, cafeDensity: 8, gymDensity: 6,
      walkability: 10, foodScene: 8, youngProfessionalDensity: 7, safety: 6, connectivity: 10,
    },
    summary:
      "A medieval street plan on a volcanic ridge, entirely within a World Heritage Site, with Waverley station at the bottom of it. Living here means living inside the thing everyone else has come to look at, which is remarkable for about a year and then becomes a logistics problem every August.",
    strengths: [
      "Waverley station and the bus network at your feet",
      "Walk to essentially every city-centre job",
      "Arthur's Seat and Holyrood Park five minutes away",
      "Tenement flats with genuine architectural quality",
    ],
    tradeoffs: [
      "The Festival makes August unliveable for a lot of residents",
      "Tourist volume year-round on the Royal Mile",
      "Listed buildings are cold and cannot be altered",
      "Very high rents and a large short-let sector competing for stock",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "new-town",
    name: "New Town",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9560, lng: -3.1980 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1350, twoBedMedianGbp: 1800, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh1-eh3",
    mainStations: [
      { name: "Edinburgh Waverley", lines: ["ScotRail", "LNER", "CrossCountry"] },
      { name: "St Andrew Square tram", lines: ["Edinburgh Trams"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 6, nightlife: 6, cafeDensity: 9, gymDensity: 7,
      walkability: 10, foodScene: 9, youngProfessionalDensity: 8, safety: 8, connectivity: 10,
    },
    summary:
      "The most complete piece of Georgian town planning in Europe, and — unlike Bath's — a working commercial district rather than a museum. The financial quarter, the tram and the best restaurants in the city are all inside it, and so are the highest rents in Scotland.",
    strengths: [
      "The tram, Waverley and the whole bus network converge here",
      "Walk to the entire financial and government district",
      "Georgian flats with proportions nothing modern matches",
      "Genuinely excellent food and drink at every price point",
    ],
    tradeoffs: [
      "The highest rents anywhere covered on this site outside London",
      "Georgian flats are cold and expensive to heat",
      "Almost no parking, and permits are heavily oversubscribed",
      "Very little stock under £1,200 for a one-bed",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "tollcross",
    name: "Tollcross & Lauriston",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9430, lng: -3.2030 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1175, twoBedMedianGbp: 1525, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh1-eh3",
    mainStations: [
      { name: "Tollcross", lines: ["Lothian Buses 10", "Lothian Buses 11", "Lothian Buses 27"] },
      { name: "Edinburgh Haymarket", lines: ["ScotRail", "Edinburgh Trams"] },
    ],
    lifestyle: {
      livelyVsQuiet: 8, greenSpace: 6, nightlife: 8, cafeDensity: 8, gymDensity: 7,
      walkability: 10, foodScene: 8, youngProfessionalDensity: 8, safety: 6, connectivity: 9,
    },
    summary:
      "Five roads meeting at a clock, with the Meadows on one side, the art college on another and more late licences than anywhere outside the Cowgate. Tollcross is where the Old Town's noise gives way to somewhere people actually live.",
    strengths: [
      "The Meadows, Bruntsfield Links and Arthur's Seat within reach",
      "Cheaper than the New Town for the same walk to work",
      "Cameo cinema, the King's and the Lyceum on the doorstep",
      "Almost every Lothian bus route passes through",
    ],
    tradeoffs: [
      "Traffic and noise at the junction itself",
      "Student-heavy, with the art college and the university close",
      "Old tenement stock with variable insulation",
      "Festival crowds spill over from the Old Town in August",
    ],
    dataQuality: "sourceBacked",
  },

  // ── City of Edinburgh: inner ───────────────────────────────────────
  {
    id: "leith",
    name: "Leith",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9760, lng: -3.1720 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1075, twoBedMedianGbp: 1400, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh6",
    mainStations: [
      { name: "The Shore tram", lines: ["Edinburgh Trams"] },
      { name: "Ocean Terminal", lines: ["Lothian Buses 11", "Lothian Buses 22", "Lothian Buses 35"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 5, nightlife: 8, cafeDensity: 9, gymDensity: 6,
      walkability: 9, foodScene: 10, youngProfessionalDensity: 8, safety: 6, connectivity: 9,
    },
    summary:
      "A separate burgh until 1920 and it has never quite conceded the point. The Shore has more Michelin stars than the rest of Scotland put together, the tram extension finally arrived in 2023, and the argument about what Leith is becoming has been running for thirty years without resolution.",
    strengths: [
      "The best food in Scotland, by a margin",
      "The tram runs to the New Town and the airport",
      "The Water of Leith walkway and the shore itself",
      "A genuinely distinct identity, not a suburb of anywhere",
    ],
    tradeoffs: [
      "Rents have risen faster here than anywhere in the city",
      "Very little green space beyond Leith Links",
      "Parts remain among the more deprived in Edinburgh",
      "The Shore is a long walk from the Old Town uphill",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "leith-walk",
    name: "Leith Walk & Pilrig",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9660, lng: -3.1800 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1025, twoBedMedianGbp: 1325, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh7",
    mainStations: [
      { name: "Balfour Street tram", lines: ["Edinburgh Trams"] },
      { name: "Leith Walk", lines: ["Lothian Buses 7", "Lothian Buses 10", "Lothian Buses 14"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 4, nightlife: 7, cafeDensity: 9, gymDensity: 6,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 8, safety: 6, connectivity: 9,
    },
    summary:
      "The mile of road connecting the New Town to Leith, and the densest concentration of independent shops, cafés and small restaurants in the city. The tram works now, which after eight years of construction is still slightly surprising to everyone who lives there.",
    strengths: [
      "The tram to the New Town, Haymarket and the airport",
      "Extraordinary density of independents along the Walk",
      "Cheaper than both the New Town and the Shore",
      "Walk to the city centre in twenty minutes, downhill one way",
    ],
    tradeoffs: [
      "Traffic and noise the length of the Walk",
      "Almost no green space at all",
      "Tenement stock is old and often poorly insulated",
      "Some streets remain rough at night",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "marchmont",
    name: "Marchmont & Bruntsfield",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9370, lng: -3.1950 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1150, twoBedMedianGbp: 1500, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh8-eh9",
    mainStations: [
      { name: "Marchmont Road", lines: ["Lothian Buses 24", "Lothian Buses 41"] },
      { name: "Bruntsfield Place", lines: ["Lothian Buses 11", "Lothian Buses 16"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 8, nightlife: 4, cafeDensity: 9, gymDensity: 6,
      walkability: 9, foodScene: 8, youngProfessionalDensity: 7, safety: 8, connectivity: 7,
    },
    summary:
      "High Victorian tenements in blond and red sandstone, arranged around the Meadows and Bruntsfield Links. It is the most sought-after student and postgraduate area in Scotland, and the flats are large enough that a share here is genuinely comfortable rather than merely cheap.",
    strengths: [
      "The Meadows and Bruntsfield Links on the doorstep",
      "Very large tenement flats, ideal for sharing",
      "Walk to the university and the Old Town in fifteen minutes",
      "Bruntsfield Place is an excellent local high street",
    ],
    tradeoffs: [
      "Heavily student in term time",
      "No station and buses that queue on Melville Drive",
      "Expensive for what is technically inner suburb",
      "Almost no parking",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "newington",
    name: "Newington & Sciennes",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9380, lng: -3.1780 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1125, twoBedMedianGbp: 1450, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh8-eh9",
    mainStations: [
      { name: "Newington", lines: ["Lothian Buses 3", "Lothian Buses 7", "Lothian Buses 8"] },
      { name: "Edinburgh Waverley", lines: ["ScotRail", "LNER"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 8, nightlife: 5, cafeDensity: 8, gymDensity: 6,
      walkability: 9, foodScene: 8, youngProfessionalDensity: 7, safety: 8, connectivity: 8,
    },
    summary:
      "South of the Meadows with Arthur's Seat behind it and the university's main campus at its northern end. Newington is the most practical inner-city choice in Edinburgh: everything walkable, every bus route, and slightly less student pressure than Marchmont.",
    strengths: [
      "Arthur's Seat and the Meadows both within ten minutes",
      "Almost every south-side bus route passes through",
      "Walk to the university, the Old Town and the Royal Infirmary buses",
      "Good tenement stock at a slight discount to Marchmont",
    ],
    tradeoffs: [
      "Traffic on the South Clerk Street corridor",
      "Heavy student presence in term time",
      "Festival venues make August loud",
      "Little stock at the cheaper end",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "stockbridge",
    name: "Stockbridge",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9590, lng: -3.2100 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1225, twoBedMedianGbp: 1600, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh4",
    mainStations: [
      { name: "Stockbridge", lines: ["Lothian Buses 24", "Lothian Buses 29", "Lothian Buses 42"] },
      { name: "Edinburgh Waverley", lines: ["ScotRail", "LNER"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 9, nightlife: 5, cafeDensity: 9, gymDensity: 6,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 7, safety: 9, connectivity: 7,
    },
    summary:
      "Down the hill from the New Town on the Water of Leith, with the Botanics at one end, Inverleith Park behind and a Sunday market on the green. Stockbridge has been the city's most desirable village for forty years and shows no sign of stopping.",
    strengths: [
      "The Royal Botanic Garden and Inverleith Park",
      "The Water of Leith walkway runs through it",
      "Outstanding independent food shops and delis",
      "Ten minutes' walk to the New Town",
    ],
    tradeoffs: [
      "Second only to the New Town on rent",
      "No station and the hill back up is real",
      "Very little at the affordable end",
      "The Sunday market brings the whole city in",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "morningside",
    name: "Morningside",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9280, lng: -3.2090 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1150, twoBedMedianGbp: 1500, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh10",
    mainStations: [
      { name: "Morningside Road", lines: ["Lothian Buses 5", "Lothian Buses 11", "Lothian Buses 23"] },
      { name: "Edinburgh Haymarket", lines: ["ScotRail", "Edinburgh Trams"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 8, nightlife: 4, cafeDensity: 8, gymDensity: 6,
      walkability: 8, foodScene: 8, youngProfessionalDensity: 5, safety: 9, connectivity: 7,
    },
    summary:
      "A mile of high street with a Dominion cinema at one end and Blackford Hill behind it, surrounded by the largest and best-kept Victorian villas in the city. Morningside is the address Edinburgh families aim for and it has the accent to prove it.",
    strengths: [
      "Excellent independent high street the full length of the road",
      "Blackford Hill, the Hermitage and the Braid Burn",
      "Among the safest parts of the city with the best schools",
      "Large flats and villas for families and shares alike",
    ],
    tradeoffs: [
      "Expensive and getting more so",
      "No station; the buses are frequent but slow at peak",
      "Very quiet in the evening",
      "Skews older and more settled",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "gorgie-dalry",
    name: "Gorgie & Dalry",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9400, lng: -3.2270 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 950, twoBedMedianGbp: 1225, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh11",
    mainStations: [
      { name: "Edinburgh Haymarket", lines: ["ScotRail", "Edinburgh Trams"] },
      { name: "Gorgie Road", lines: ["Lothian Buses 3", "Lothian Buses 33", "Lothian Buses 38"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 4, nightlife: 5, cafeDensity: 7, gymDensity: 6,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 7, safety: 5, connectivity: 9,
    },
    summary:
      "The cheapest tenements within walking distance of the city centre, with Haymarket at one end and Tynecastle in the middle. Gorgie and Dalry are where people move when they want Edinburgh and cannot pay New Town prices, which is most people.",
    strengths: [
      "Haymarket station and the tram at the eastern end",
      "The cheapest inner-city tenements in Edinburgh",
      "Walk to the West End in fifteen minutes",
      "Dalry Road has a growing run of good independents",
    ],
    tradeoffs: [
      "Recorded crime above the Edinburgh average",
      "Very little green space",
      "Match days at Tynecastle affect the whole area",
      "Traffic on Gorgie Road is constant",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "abbeyhill",
    name: "Abbeyhill & Meadowbank",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9560, lng: -3.1690 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1000, twoBedMedianGbp: 1300, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh7",
    mainStations: [
      { name: "Edinburgh Waverley", lines: ["ScotRail", "LNER"] },
      { name: "London Road", lines: ["Lothian Buses 4", "Lothian Buses 5", "Lothian Buses 26"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 8, nightlife: 4, cafeDensity: 7, gymDensity: 7,
      walkability: 9, foodScene: 7, youngProfessionalDensity: 7, safety: 7, connectivity: 8,
    },
    summary:
      "Tucked between Calton Hill, Holyrood Park and the railway, ten minutes' walk from Waverley and considerably quieter than anywhere at a comparable distance. The rebuilt Meadowbank sports centre anchors the eastern end.",
    strengths: [
      "Ten minutes' walk to Waverley and the Old Town",
      "Holyrood Park and Calton Hill both immediately adjacent",
      "Meadowbank sports centre and the London Road playing fields",
      "Cheaper than the New Town for a shorter walk to the station",
    ],
    tradeoffs: [
      "Railway noise in the cutting",
      "London Road is a heavy traffic corridor",
      "Little in the way of a high street",
      "Colonies and tenement flats are small",
    ],
    dataQuality: "sourceBacked",
  },

  // ── City of Edinburgh: outer ───────────────────────────────────────
  {
    id: "portobello",
    name: "Portobello",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9540, lng: -3.1130 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1000, twoBedMedianGbp: 1300, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh15",
    mainStations: [
      { name: "Brunstane", lines: ["ScotRail"] },
      { name: "Portobello High Street", lines: ["Lothian Buses 15", "Lothian Buses 26", "Lothian Buses 45"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 8, nightlife: 4, cafeDensity: 8, gymDensity: 5,
      walkability: 8, foodScene: 8, youngProfessionalDensity: 6, safety: 8, connectivity: 7,
    },
    summary:
      "Edinburgh has a beach, and this is it — two miles of sand, a Victorian promenade and a genuine Turkish baths, twenty-five minutes from Waverley on the bus. Portobello has become the city's most fashionable outer suburb without losing the seaside-town feel that made it one.",
    strengths: [
      "A real beach and promenade within the city boundary",
      "Excellent independent high street and food",
      "Strong, active community and good schools",
      "Frequent buses, plus Brunstane station nearby",
    ],
    tradeoffs: [
      "Rents have caught up with much of the inner city",
      "No station in Portobello itself",
      "Twenty-five to thirty minutes into the centre",
      "The beach brings the whole city on hot days",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "corstorphine",
    name: "Corstorphine",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9420, lng: -3.2830 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 925, twoBedMedianGbp: 1200, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh12",
    mainStations: [
      { name: "Edinburgh Gateway", lines: ["ScotRail", "Edinburgh Trams"] },
      { name: "St John's Road", lines: ["Lothian Buses 12", "Lothian Buses 26", "Lothian Buses 31"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 8, nightlife: 3, cafeDensity: 6, gymDensity: 6,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 5, safety: 8, connectivity: 8,
    },
    summary:
      "An old village absorbed by the city, with Corstorphine Hill and the zoo behind it and the tram running past the end of the road. It is the obvious answer for anyone working at Edinburgh Park, the Gyle or the airport, and priced well below the equivalent on the south side.",
    strengths: [
      "The tram serves Edinburgh Park, the Gyle and the airport",
      "Corstorphine Hill and the Water of Leith walkway",
      "Substantial interwar houses with gardens and parking",
      "Cheaper than any comparable south-side suburb",
    ],
    tradeoffs: [
      "St John's Road has some of the worst air quality in Scotland",
      "Little going on in the evening",
      "Twenty-five minutes into the centre",
      "Aircraft noise on some approaches",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "granton",
    name: "Granton & Newhaven",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9800, lng: -3.2200 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 875, twoBedMedianGbp: 1125, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh5",
    mainStations: [
      { name: "Newhaven tram", lines: ["Edinburgh Trams"] },
      { name: "Granton Square", lines: ["Lothian Buses 16", "Lothian Buses 19", "Lothian Buses 47"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 3, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 6, safety: 6, connectivity: 8,
    },
    summary:
      "The waterfront north of the city, and the largest regeneration site in Scotland — the tram terminus arrived at Newhaven in 2023 and several thousand homes are being built behind it. Cheap, changing fast, and with a view across the Forth to Fife.",
    strengths: [
      "The tram terminus at Newhaven reaches the centre in twenty minutes",
      "Among the cheapest rents inside the city boundary",
      "The Forth shore and the Granton waterfront walk",
      "New-build stock with modern efficiency",
    ],
    tradeoffs: [
      "Building sites will be a feature for another decade",
      "Parts of Granton have long-standing deprivation",
      "Exposed to the wind off the Forth",
      "Limited amenity until the regeneration matures",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "cramond",
    name: "Cramond & Davidson's Mains",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9750, lng: -3.2950 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1050, twoBedMedianGbp: 1350, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh4",
    mainStations: [
      { name: "Davidson's Mains", lines: ["Lothian Buses 41", "Lothian Buses 47"] },
      { name: "Edinburgh Gateway", lines: ["ScotRail", "Edinburgh Trams"] },
    ],
    lifestyle: {
      livelyVsQuiet: 2, greenSpace: 10, nightlife: 2, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 3, safety: 10, connectivity: 5,
    },
    summary:
      "A Roman fort, a tidal island you can walk to twice a day and the Forth on your doorstep. Cramond is the quietest and safest part of Edinburgh, and Davidson's Mains next door supplies the shops it does not have.",
    strengths: [
      "The Forth shore, Cramond Island and the Almond walkway",
      "The lowest crime rate in the city",
      "Large houses with gardens and parking",
      "Strong schools and a very settled population",
    ],
    tradeoffs: [
      "Thirty-five minutes into the centre by bus",
      "Almost nothing to do in the evening",
      "Skews much older",
      "Expensive for how far out it is",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "colinton",
    name: "Colinton & Oxgangs",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9080, lng: -3.2450 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 950, twoBedMedianGbp: 1225, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh13-eh14",
    mainStations: [
      { name: "Colinton Village", lines: ["Lothian Buses 10", "Lothian Buses 45"] },
      { name: "Edinburgh Haymarket", lines: ["ScotRail", "Edinburgh Trams"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 9, nightlife: 2, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 4, safety: 8, connectivity: 6,
    },
    summary:
      "A village in a wooded dell with the Water of Leith running through it, and the Pentland Hills rising directly behind. Colinton is the greenest part of Edinburgh; Oxgangs beside it is the plainer and considerably cheaper half.",
    strengths: [
      "The Pentlands begin at the end of the road",
      "Colinton Dell and the Water of Leith walkway",
      "Substantial houses with gardens at outer-suburb prices",
      "Good schools and low crime",
    ],
    tradeoffs: [
      "Thirty minutes into the centre by bus",
      "Very little in the way of shops or eating out",
      "Oxgangs and Colinton are markedly different in character",
      "A car is useful for anything beyond the local shops",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "liberton",
    name: "Liberton & Gilmerton",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9130, lng: -3.1500 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 875, twoBedMedianGbp: 1125, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh16-eh17",
    mainStations: [
      { name: "Liberton Brae", lines: ["Lothian Buses 3", "Lothian Buses 7", "Lothian Buses 37"] },
      { name: "Edinburgh Waverley", lines: ["ScotRail", "LNER"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 2, cafeDensity: 5, gymDensity: 5,
      walkability: 6, foodScene: 4, youngProfessionalDensity: 4, safety: 7, connectivity: 7,
    },
    summary:
      "South Edinburgh on the way to Midlothian, with the Royal Infirmary and the BioQuarter close and a great deal of new housing going up around them. Ordinary, well-connected and among the cheapest places left inside the city.",
    strengths: [
      "Ten minutes from the Royal Infirmary and the BioQuarter",
      "Frequent buses down the Liberton and Gilmerton roads",
      "Cheap houses with gardens inside the city boundary",
      "The Braid Hills and Craigmillar Castle Park nearby",
    ],
    tradeoffs: [
      "Little sense of a centre",
      "Constant construction on the southern edge",
      "Thirty minutes into town at peak",
      "Very little independent retail",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "craigmillar",
    name: "Craigmillar & Niddrie",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9310, lng: -3.1290 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 800, twoBedMedianGbp: 1025, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh16-eh17",
    mainStations: [
      { name: "Brunstane", lines: ["ScotRail"] },
      { name: "Niddrie Mains Road", lines: ["Lothian Buses 2", "Lothian Buses 14", "Lothian Buses 21"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 7, nightlife: 2, cafeDensity: 4, gymDensity: 5,
      walkability: 6, foodScene: 4, youngProfessionalDensity: 4, safety: 4, connectivity: 7,
    },
    summary:
      "The cheapest rents in Edinburgh, and twenty years into a regeneration programme that has rebuilt most of the housing stock. The Royal Infirmary and the BioQuarter are next door, which is the single largest employment site in the south of the city.",
    strengths: [
      "The lowest rents anywhere inside Edinburgh",
      "Walk to the Royal Infirmary and the BioQuarter",
      "Craigmillar Castle Park and the new town centre",
      "Largely new or rebuilt housing stock",
    ],
    tradeoffs: [
      "Long-standing deprivation and above-average recorded crime",
      "Reputation lags well behind the physical change",
      "Limited retail and eating out",
      "Twenty-five minutes into the city centre",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "sighthill",
    name: "Sighthill & Broomhouse",
    borough: "City of Edinburgh",
    centroid: { lat: 55.9280, lng: -3.2790 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 800, twoBedMedianGbp: 1025, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh11-west",
    mainStations: [
      { name: "Edinburgh Park", lines: ["ScotRail", "Edinburgh Trams"] },
      { name: "Calder Road", lines: ["Lothian Buses 2", "Lothian Buses 22", "Lothian Buses 30"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 6, nightlife: 2, cafeDensity: 4, gymDensity: 5,
      walkability: 6, foodScene: 4, youngProfessionalDensity: 4, safety: 5, connectivity: 8,
    },
    summary:
      "West Edinburgh, built around an industrial estate and a college, with the tram and Edinburgh Park station at the western end. It is plain and it is cheap, and for anyone working at Edinburgh Park or the Gyle it is the shortest commute in the city.",
    strengths: [
      "Tram and rail at Edinburgh Park, minutes away",
      "Walk or cycle to the Edinburgh Park and Gyle employers",
      "Among the cheapest rents in the city",
      "Quick access to the bypass and the M8",
    ],
    tradeoffs: [
      "Almost no character or centre",
      "Above-average recorded crime in parts",
      "Industrial estates dominate the surroundings",
      "Little to do locally",
    ],
    dataQuality: "sourceBacked",
  },

  // ── East Lothian ───────────────────────────────────────────────────
  {
    id: "musselburgh",
    name: "Musselburgh",
    borough: "East Lothian",
    centroid: { lat: 55.9430, lng: -3.0540 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 900, twoBedMedianGbp: 1150, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh21",
    mainStations: [
      { name: "Musselburgh", lines: ["ScotRail"] },
      { name: "Musselburgh High Street", lines: ["Lothian Buses 26", "Lothian Buses 44"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 8, nightlife: 3, cafeDensity: 6, gymDensity: 5,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 5, safety: 8, connectivity: 8,
    },
    summary:
      "The Honest Toun, six miles east of Edinburgh with its own racecourse, its own high street and the Esk running through it. Close enough to be a suburb, old enough not to behave like one, and cheaper than any part of Edinburgh at a comparable journey time.",
    strengths: [
      "Station with trains to Edinburgh in eight minutes",
      "A genuine town high street and the Esk riverside",
      "The beach, the racecourse and the golf links",
      "Cheaper than Portobello for a shorter journey",
    ],
    tradeoffs: [
      "Trains are half-hourly outside peak",
      "The A199 through the middle carries heavy traffic",
      "Less to do in the evening than the city",
      "New estates on the edge have outpaced the amenities",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "prestonpans",
    name: "Prestonpans & Cockenzie",
    borough: "East Lothian",
    centroid: { lat: 55.9580, lng: -2.9880 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 775, twoBedMedianGbp: 975, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh32",
    mainStations: [
      { name: "Prestonpans", lines: ["ScotRail"] },
      { name: "High Street", lines: ["Lothian Buses 26", "East Coast Buses 124"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 2, cafeDensity: 5, gymDensity: 4,
      walkability: 7, foodScene: 4, youngProfessionalDensity: 4, safety: 7, connectivity: 7,
    },
    summary:
      "A former mining and salt-panning town on the Forth, with a station that reaches Edinburgh in twelve minutes and rents that belong to a different region. The old power station site next door is being redeveloped, which will change the town's edge substantially.",
    strengths: [
      "Twelve minutes to Edinburgh by train",
      "Among the cheapest rents with a fast city commute",
      "The Forth shore and the John Muir Way",
      "A real town with its own shops and schools",
    ],
    tradeoffs: [
      "Post-industrial and it looks it in places",
      "Trains are half-hourly off-peak",
      "Limited employment locally",
      "Little in the way of eating out",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "haddington",
    name: "Haddington",
    borough: "East Lothian",
    centroid: { lat: 55.9570, lng: -2.7740 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 850, twoBedMedianGbp: 1075, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh41",
    mainStations: [
      { name: "Haddington bus station", lines: ["East Coast Buses X6", "East Coast Buses 104"] },
      { name: "Drem", lines: ["ScotRail"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 9, nightlife: 2, cafeDensity: 6, gymDensity: 4,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 3, safety: 9, connectivity: 4,
    },
    summary:
      "The county town of East Lothian, a well-preserved market town on the Tyne with more listed buildings per head than almost anywhere in Scotland. The railway closed in 1949 and the X6 has been carrying the load ever since.",
    strengths: [
      "A genuinely handsome market town with real independents",
      "Very low crime and strong schools",
      "The Lammermuirs and the East Lothian coast close by",
      "Drem station a short drive away for the Edinburgh train",
    ],
    tradeoffs: [
      "No railway station of its own",
      "Fifty minutes to Edinburgh by bus",
      "Expensive for East Lothian",
      "A car is close to essential",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "north-berwick",
    name: "North Berwick",
    borough: "East Lothian",
    centroid: { lat: 56.0580, lng: -2.7200 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 1000, twoBedMedianGbp: 1275, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh39",
    mainStations: [
      { name: "North Berwick", lines: ["ScotRail"] },
      { name: "High Street", lines: ["East Coast Buses X5", "East Coast Buses 120"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 10, nightlife: 2, cafeDensity: 7, gymDensity: 4,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 3, safety: 10, connectivity: 5,
    },
    summary:
      "A Victorian seaside town with two beaches, the Bass Rock offshore and a branch line to Edinburgh. It is the most expensive place in East Lothian by a wide margin and one of the most desirable small towns in Scotland, which are the same fact stated twice.",
    strengths: [
      "Two beaches, the Law and the Scottish Seabird Centre",
      "Direct trains to Edinburgh in thirty-five minutes",
      "Excellent independent high street for a town of seven thousand",
      "The lowest crime of anywhere covered here",
    ],
    tradeoffs: [
      "The dearest rents outside central Edinburgh",
      "Trains are hourly and the journey is thirty-five minutes",
      "Very heavy summer tourism",
      "Skews much older and very little rental stock",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "dunbar",
    name: "Dunbar",
    borough: "East Lothian",
    centroid: { lat: 56.0020, lng: -2.5150 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 800, twoBedMedianGbp: 1025, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh42",
    mainStations: [
      { name: "Dunbar", lines: ["ScotRail", "LNER"] },
      { name: "High Street", lines: ["East Coast Buses X7", "Borders Buses 253"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 9, nightlife: 2, cafeDensity: 6, gymDensity: 4,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 3, safety: 9, connectivity: 5,
    },
    summary:
      "The sunniest town in Scotland by recorded hours, with a working harbour, John Muir's birthplace and a station on the East Coast Main Line — which means a direct train to London as well as a twenty-five-minute run into Edinburgh.",
    strengths: [
      "Twenty-five minutes to Edinburgh on the main line",
      "Direct LNER services to Newcastle and London",
      "John Muir Country Park and the harbour",
      "Cheaper than anywhere comparable on the coast",
    ],
    tradeoffs: [
      "Thirty miles out; it is a town, not a suburb",
      "Local trains are hourly",
      "Limited employment beyond the cement works and tourism",
      "Exposed to the North Sea weather",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Midlothian ─────────────────────────────────────────────────────
  {
    id: "dalkeith",
    name: "Dalkeith",
    borough: "Midlothian",
    centroid: { lat: 55.8950, lng: -3.0680 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 800, twoBedMedianGbp: 1025, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh22",
    mainStations: [
      { name: "Eskbank", lines: ["ScotRail Borders Railway"] },
      { name: "Dalkeith High Street", lines: ["Lothian Buses 3", "Lothian Buses 30"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 2, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 4, safety: 7, connectivity: 7,
    },
    summary:
      "Midlothian's county town, with Dalkeith Country Park behind the palace and Eskbank station on the Borders Railway a short walk away. The reopened line in 2015 changed this town's relationship with Edinburgh completely.",
    strengths: [
      "Eskbank station reaches Edinburgh in twenty minutes",
      "Dalkeith Country Park and the two Esks",
      "A real town centre with everything day to day",
      "Cheap for a twenty-minute city commute",
    ],
    tradeoffs: [
      "Midlothian has the region's highest council tax",
      "The town centre has struggled",
      "Borders Railway trains are half-hourly and busy",
      "A lot of new estate building on the edges",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "bonnyrigg",
    name: "Bonnyrigg & Lasswade",
    borough: "Midlothian",
    centroid: { lat: 55.8720, lng: -3.1030 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 825, twoBedMedianGbp: 1050, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh19",
    mainStations: [
      { name: "Eskbank", lines: ["ScotRail Borders Railway"] },
      { name: "Bonnyrigg High Street", lines: ["Lothian Buses 31", "Lothian Buses 49"] },
    ],
    lifestyle: {
      livelyVsQuiet: 2, greenSpace: 8, nightlife: 2, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 4, youngProfessionalDensity: 4, safety: 8, connectivity: 6,
    },
    summary:
      "One of the fastest-growing towns in Scotland, built out steadily since the Borders Railway reopened. Quiet, safe, comprehensively residential, and the standard answer for families priced out of south Edinburgh.",
    strengths: [
      "Twenty-five minutes to Edinburgh via Eskbank",
      "Strong schools and very low crime",
      "The Esk valley and Rosslynlee woods",
      "New family housing at well below city prices",
    ],
    tradeoffs: [
      "Almost nothing to do locally",
      "Growth has outpaced the road network",
      "The station is a walk or a bus away",
      "Midlothian's council tax is the highest of the four",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "penicuik",
    name: "Penicuik",
    borough: "Midlothian",
    centroid: { lat: 55.8270, lng: -3.2230 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 800, twoBedMedianGbp: 1025, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh26",
    mainStations: [
      { name: "Penicuik bus station", lines: ["Lothian Buses 15", "Lothian Buses 37", "Lothian Buses 101"] },
      { name: "Eskbank", lines: ["ScotRail Borders Railway"] },
    ],
    lifestyle: {
      livelyVsQuiet: 2, greenSpace: 10, nightlife: 2, cafeDensity: 5, gymDensity: 4,
      walkability: 7, foodScene: 4, youngProfessionalDensity: 3, safety: 8, connectivity: 5,
    },
    summary:
      "A former papermaking town at the foot of the Pentlands, ten miles south of Edinburgh with the hills rising immediately behind it. The railway closed in 1967 and the bus down the A701 has carried it ever since.",
    strengths: [
      "The Pentland Hills straight from the edge of town",
      "Frequent Lothian Buses service into Edinburgh",
      "Cheap family housing with real countryside",
      "Penicuik Estate and the North Esk walkways",
    ],
    tradeoffs: [
      "No railway station",
      "Forty-five minutes into Edinburgh by bus",
      "Very little going on locally",
      "Midlothian's council tax is the highest of the four",
    ],
    dataQuality: "sourceBacked",
  },

  // ── West Lothian ───────────────────────────────────────────────────
  {
    id: "linlithgow",
    name: "Linlithgow",
    borough: "West Lothian",
    centroid: { lat: 55.9770, lng: -3.6010 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 800, twoBedMedianGbp: 1000, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh49",
    mainStations: [
      { name: "Linlithgow", lines: ["ScotRail"] },
      { name: "High Street", lines: ["First Bus F45", "First Bus X38"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 9, nightlife: 3, cafeDensity: 6, gymDensity: 4,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 4, safety: 9, connectivity: 8,
    },
    summary:
      "A royal burgh with a ruined palace on a loch, a canal and one of the best rail positions in Scotland — twenty minutes to Edinburgh in one direction and twenty-five to Glasgow in the other. It is the obvious answer for a household split between the two cities.",
    strengths: [
      "Twenty minutes to Edinburgh and twenty-five to Glasgow",
      "The palace, the loch and the Union Canal",
      "A handsome high street with real independents",
      "Very low crime and strong schools",
    ],
    tradeoffs: [
      "The dearest town in West Lothian",
      "Trains are busy in both directions at peak",
      "Limited local employment",
      "Very little rental stock comes up",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "livingston",
    name: "Livingston",
    borough: "West Lothian",
    centroid: { lat: 55.8830, lng: -3.5170 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 700, twoBedMedianGbp: 900, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh54",
    mainStations: [
      { name: "Livingston North", lines: ["ScotRail"] },
      { name: "Livingston South", lines: ["ScotRail"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 3, cafeDensity: 5, gymDensity: 6,
      walkability: 6, foodScene: 5, youngProfessionalDensity: 5, safety: 7, connectivity: 8,
    },
    summary:
      "Scotland's fourth new town, designed in the 1960s around a shopping centre and a set of self-contained villages, and now the largest town in the Lothians outside Edinburgh. Two stations, a large employment base of its own and rents a third below the city.",
    strengths: [
      "Two stations serving both Edinburgh and Glasgow",
      "A substantial local employment base",
      "Among the cheapest rents in the region",
      "Almondvale centre and Howden Park for amenities",
    ],
    tradeoffs: [
      "New-town layout is car-oriented and hard to navigate on foot",
      "No town centre in the traditional sense",
      "Thirty minutes to Edinburgh by train",
      "Little architectural character",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "bathgate",
    name: "Bathgate",
    borough: "West Lothian",
    centroid: { lat: 55.9020, lng: -3.6430 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 650, twoBedMedianGbp: 825, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh48",
    mainStations: [
      { name: "Bathgate", lines: ["ScotRail"] },
      { name: "Bathgate town centre", lines: ["First Bus X18", "First Bus 22"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 2, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 4, youngProfessionalDensity: 4, safety: 6, connectivity: 8,
    },
    summary:
      "A former shale-oil and motor-manufacturing town on the Edinburgh–Glasgow line, with four trains an hour to each city and the lowest rents covered anywhere in this section. The economy has never fully replaced what closed in the 1980s.",
    strengths: [
      "Four trains an hour to Edinburgh and Glasgow",
      "The lowest rents anywhere in the Lothians",
      "A real town centre with everything day to day",
      "The Bathgate Hills and Beecraigs immediately north",
    ],
    tradeoffs: [
      "Post-industrial deprivation in parts",
      "Thirty-five minutes to Edinburgh",
      "Town centre retail has struggled",
      "Limited professional employment locally",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "broxburn",
    name: "Broxburn & Uphall",
    borough: "West Lothian",
    centroid: { lat: 55.9350, lng: -3.4720 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 650, twoBedMedianGbp: 825, source: "market_review", asOf: AS_OF },
    roomDistrict: "eh52",
    mainStations: [
      { name: "Uphall", lines: ["ScotRail"] },
      { name: "Broxburn Main Street", lines: ["First Bus X18", "Lothian Country 600"] },
    ],
    lifestyle: {
      livelyVsQuiet: 2, greenSpace: 7, nightlife: 2, cafeDensity: 4, gymDensity: 4,
      walkability: 6, foodScene: 4, youngProfessionalDensity: 4, safety: 7, connectivity: 7,
    },
    summary:
      "Two shale-oil villages that grew together, closer to Edinburgh than anywhere else in West Lothian and half an hour from the airport by bus. Plain, cheap and better positioned than its profile suggests.",
    strengths: [
      "The closest West Lothian town to Edinburgh",
      "Uphall station and the Lothian Country bus to the city",
      "Very low rents with a twenty-five-minute commute",
      "The Union Canal and the shale bings for walking",
    ],
    tradeoffs: [
      "Little in the way of a town centre",
      "The M8 and the A89 dominate the surroundings",
      "Almost nothing to do locally",
      "Uphall station is a walk from most of Broxburn",
    ],
    dataQuality: "sourceBacked",
  },
];
