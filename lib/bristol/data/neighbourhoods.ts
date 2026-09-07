import { BRISTOL_RENT_REVIEW_AS_OF } from "@/lib/bristol/data/rent-market";
import type { BristolRoomDistrict } from "@/lib/bristol/data/rent-market";
import type { Neighbourhood } from "@/lib/types";

/**
 * West of England neighbourhoods.
 *
 * Every entry is written out in full rather than generated from a
 * compact profile, for the same reason the Manchester set is: a region
 * built out of a port city, a Georgian spa town, an aerospace belt and
 * four seaside and market towns has almost nothing that generalises.
 * Portishead and Easton share a police force and very little else.
 *
 * Rent figures are reviewed market estimates anchored on the ONS
 * authority averages in data/rent-market.ts, adjusted for the local
 * premium or discount. They are for narrowing a shortlist, not for
 * valuing a flat, and are rounded to the nearest £25 accordingly.
 */

const AS_OF = BRISTOL_RENT_REVIEW_AS_OF;

export type BristolNeighbourhood = Neighbourhood & {
  roomDistrict: BristolRoomDistrict;
};

export const BRISTOL_NEIGHBOURHOODS: BristolNeighbourhood[] = [
  // ── Bristol ────────────────────────────────────────────────────────
  {
    id: "harbourside",
    name: "Harbourside",
    borough: "Bristol",
    centroid: { lat: 51.4491, lng: -2.5989 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1450, twoBedMedianGbp: 1850, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs1-bs2",
    mainStations: [
      { name: "Bristol Temple Meads", lines: ["GWR", "CrossCountry", "South Western Railway"] },
      { name: "The Centre", lines: ["First Bus m1", "First Bus m2", "MetroBus"] },
    ],
    lifestyle: {
      livelyVsQuiet: 8, greenSpace: 4, nightlife: 8, cafeDensity: 9, gymDensity: 8,
      walkability: 10, foodScene: 8, youngProfessionalDensity: 9, safety: 6, connectivity: 9,
    },
    summary:
      "The Floating Harbour is the one part of Bristol that reads as a waterfront city rather than a hill town, and two decades of conversion have turned its warehouses and dock sheds into the densest flat stock in the region. You pay for the water and the ten-minute walk to everything.",
    strengths: [
      "Walk to Temple Meads, the centre and the Old City",
      "Waterfront bars, the Arnolfini and Watershed on the doorstep",
      "Almost no reason to own a car",
      "New-build stock means modern insulation and lifts",
    ],
    tradeoffs: [
      "The highest rents in the West of England",
      "Weekend noise carries across the water",
      "Service charges on the converted warehouses are steep",
      "Very little green space that is not a quayside",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "old-market",
    name: "Old Market",
    borough: "Bristol",
    centroid: { lat: 51.4562, lng: -2.5787 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1150, twoBedMedianGbp: 1450, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs1-bs2",
    mainStations: [
      { name: "Bristol Temple Meads", lines: ["GWR", "CrossCountry", "South Western Railway"] },
      { name: "Old Market", lines: ["MetroBus m3", "First Bus"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 3, nightlife: 8, cafeDensity: 7, gymDensity: 6,
      walkability: 9, foodScene: 7, youngProfessionalDensity: 7, safety: 5, connectivity: 9,
    },
    summary:
      "Bristol's oldest surviving high street, cut in half by the 1960s ring road and slowly recovering ever since. It holds the city's queer nightlife, a stretch of genuinely fine Georgian frontages, and rents noticeably below the harbour for a shorter walk to Temple Meads.",
    strengths: [
      "Five minutes' walk from Temple Meads",
      "Cheaper than anywhere else this central",
      "The city's best-established LGBTQ+ scene",
      "Georgian and Victorian stock rather than new build",
    ],
    tradeoffs: [
      "The ring road severs it from the centre on foot",
      "Street drinking and rough sleeping are visible",
      "Traffic noise on the main frontages",
      "Very little to buy beyond a corner shop",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "stokes-croft",
    name: "Stokes Croft & Kingsdown",
    borough: "Bristol",
    centroid: { lat: 51.4634, lng: -2.5893 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1225, twoBedMedianGbp: 1525, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs1-bs2",
    mainStations: [
      { name: "Stokes Croft", lines: ["First Bus m1", "First Bus 70s"] },
      { name: "Bristol Temple Meads", lines: ["GWR", "CrossCountry"] },
    ],
    lifestyle: {
      livelyVsQuiet: 9, greenSpace: 4, nightlife: 9, cafeDensity: 9, gymDensity: 6,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 8, safety: 5, connectivity: 8,
    },
    summary:
      "The half-mile of Stokes Croft did more to shape Bristol's self-image than any other street — murals, co-ops, late licences and a running argument about what the area is for. Kingsdown behind it is the opposite: steep Georgian terraces, silent by ten, with the best views in the city.",
    strengths: [
      "The densest independent food and music in Bristol",
      "Walk to the centre in fifteen minutes, downhill",
      "Kingsdown's terraces have genuine architectural quality",
      "Buses from here reach almost everywhere",
    ],
    tradeoffs: [
      "Noise on Stokes Croft itself is constant at weekends",
      "Visible drug use and street homelessness",
      "The hill is punishing on foot and worse on a bike",
      "Almost no parking, and permits are contested",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "clifton",
    name: "Clifton",
    borough: "Bristol",
    centroid: { lat: 51.4552, lng: -2.6187 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1400, twoBedMedianGbp: 1800, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs8",
    mainStations: [
      { name: "Clifton Down", lines: ["Severn Beach Line"] },
      { name: "Clifton Triangle", lines: ["First Bus m2", "First Bus 8"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 8, nightlife: 6, cafeDensity: 9, gymDensity: 8,
      walkability: 9, foodScene: 8, youngProfessionalDensity: 8, safety: 8, connectivity: 7,
    },
    summary:
      "Georgian crescents, the Suspension Bridge and four hundred acres of Downs on the doorstep. Clifton is the address most people picture when they picture Bristol, and it prices accordingly — though the student presence around the Triangle keeps it livelier and less museum-like than its architecture suggests.",
    strengths: [
      "The Downs and the Avon Gorge on your doorstep",
      "Some of the finest Georgian housing outside Bath",
      "Independent shops and restaurants along Whiteladies Road",
      "Genuinely safe at night by any Bristol standard",
    ],
    tradeoffs: [
      "Rents match or beat the harbour",
      "Getting east across the city is slow",
      "Period flats are cold and often listed, so hard to improve",
      "Parking is close to impossible without a permit",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "cotham",
    name: "Cotham",
    borough: "Bristol",
    centroid: { lat: 51.4638, lng: -2.6027 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1275, twoBedMedianGbp: 1600, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs6-bs7",
    mainStations: [
      { name: "Redland", lines: ["Severn Beach Line"] },
      { name: "Cotham Hill", lines: ["First Bus m2", "First Bus 8"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 6, nightlife: 6, cafeDensity: 9, gymDensity: 6,
      walkability: 9, foodScene: 8, youngProfessionalDensity: 8, safety: 7, connectivity: 8,
    },
    summary:
      "The slice between Clifton and the university, and effectively its overflow: large Victorian houses cut into flats, Cotham Hill's short run of restaurants, and a fifteen-minute walk to almost anything you would want. It is Clifton's amenities at a discount you pay for in slightly less grand streets.",
    strengths: [
      "Walk to the university, the Triangle and Stokes Croft",
      "Cotham Hill has an unusual density of good restaurants",
      "Cheaper than Clifton for much the same access",
      "Both Redland and Clifton Down stations within reach",
    ],
    tradeoffs: [
      "Heavily student-dominated in term time",
      "Flat conversions vary enormously in quality",
      "Steep in every direction",
      "Little green space that is not the Downs, twenty minutes away",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "redland",
    name: "Redland",
    borough: "Bristol",
    centroid: { lat: 51.4712, lng: -2.6042 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1250, twoBedMedianGbp: 1575, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs6-bs7",
    mainStations: [
      { name: "Redland", lines: ["Severn Beach Line"] },
      { name: "Chandos Road", lines: ["First Bus 1", "First Bus 72"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 7, nightlife: 4, cafeDensity: 8, gymDensity: 6,
      walkability: 8, foodScene: 8, youngProfessionalDensity: 7, safety: 8, connectivity: 7,
    },
    summary:
      "Wide Victorian villa streets, a station on the Severn Beach line and Chandos Road's cluster of restaurants and delis. Redland is where Bristol's graduates move when they stop wanting to live above a bar, and it has the settled, slightly smug feel that implies.",
    strengths: [
      "Chandos Road is a proper local high street",
      "Direct train to Clifton Down and Temple Meads",
      "Large houses, so shares and family lets both work",
      "Quiet without being isolated",
    ],
    tradeoffs: [
      "Almost nothing open after ten",
      "Severn Beach line is half-hourly and stops early",
      "Rents are close to Clifton's without the Downs",
      "Family houses are increasingly bought rather than let",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "montpelier",
    name: "Montpelier",
    borough: "Bristol",
    centroid: { lat: 51.4681, lng: -2.5872 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1175, twoBedMedianGbp: 1450, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs6-bs7",
    mainStations: [
      { name: "Montpelier", lines: ["Severn Beach Line"] },
      { name: "Picton Street", lines: ["First Bus 5", "First Bus 70s"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 6, nightlife: 7, cafeDensity: 9, gymDensity: 5,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 8, safety: 6, connectivity: 8,
    },
    summary:
      "Painted terraces on impossible gradients, a station hidden in a cutting, and Picton Street doing more with fifty metres than most high streets manage with five hundred. Montpelier is the closest thing Bristol has to a village that happens to sit fifteen minutes from the centre.",
    strengths: [
      "Picton Street and the St Andrews shops are genuinely good",
      "Its own station on the Severn Beach line",
      "Walk to Stokes Croft, Gloucester Road and the centre",
      "Strong, long-settled community feel",
    ],
    tradeoffs: [
      "The hills are severe in every direction",
      "Housing stock is old and often poorly insulated",
      "Parking is a permanent argument",
      "Rents have climbed fast over the last decade",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "bishopston",
    name: "Bishopston",
    borough: "Bristol",
    centroid: { lat: 51.4790, lng: -2.5905 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1150, twoBedMedianGbp: 1425, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs6-bs7",
    mainStations: [
      { name: "Gloucester Road", lines: ["First Bus 70", "First Bus 72", "First Bus 75"] },
      { name: "Montpelier", lines: ["Severn Beach Line"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 6, nightlife: 5, cafeDensity: 9, gymDensity: 6,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 7, safety: 8, connectivity: 7,
    },
    summary:
      "Gloucester Road is the longest run of independent shops in the country and Bishopston is the neighbourhood wrapped around it — Edwardian terraces, good schools, and a weekly argument about whether a chain has ruined the street. It is Bristol's most reliable family choice inside the inner ring.",
    strengths: [
      "Gloucester Road for shopping, eating and drinking",
      "Strong primary schools and an established family market",
      "Flat by Bristol standards, so cycling actually works",
      "Frequent buses into the centre and out to the ring road",
    ],
    tradeoffs: [
      "No station of its own; buses only",
      "Terraces are narrow and gardens small",
      "Rents no longer represent much of a discount",
      "Traffic on Gloucester Road itself is heavy",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "easton",
    name: "Easton",
    borough: "Bristol",
    centroid: { lat: 51.4632, lng: -2.5663 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1000, twoBedMedianGbp: 1275, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs5",
    mainStations: [
      { name: "Stapleton Road", lines: ["Severn Beach Line", "GWR"] },
      { name: "Lawrence Hill", lines: ["Severn Beach Line", "GWR"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 5, nightlife: 6, cafeDensity: 8, gymDensity: 5,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 7, safety: 5, connectivity: 8,
    },
    summary:
      "The most genuinely mixed part of Bristol and the best-value place to live inside the inner ring. St Mark's Road alone will feed you better than most city centres, and two stations put Temple Meads four minutes away — a combination nowhere else in the city matches at this price.",
    strengths: [
      "Four minutes to Temple Meads by train",
      "St Mark's Road for food, and the city's best grocers",
      "Cheapest inner Bristol by a clear margin",
      "Flat, so cycling into the centre is easy",
    ],
    tradeoffs: [
      "Recorded crime is higher than the city average",
      "Housing stock is small and often in poor repair",
      "The M32 and railway cut it up",
      "Green space is limited to small local parks",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "southville",
    name: "Southville",
    borough: "Bristol",
    centroid: { lat: 51.4438, lng: -2.6047 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1200, twoBedMedianGbp: 1500, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs3",
    mainStations: [
      { name: "North Street", lines: ["First Bus m2", "First Bus 24"] },
      { name: "Bristol Temple Meads", lines: ["GWR", "CrossCountry"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 6, nightlife: 6, cafeDensity: 9, gymDensity: 6,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 8, safety: 7, connectivity: 8,
    },
    summary:
      "The Tobacco Factory turned a derelict bonded warehouse into a theatre, a market and the anchor of North Street, and Southville rearranged itself around it. Twenty minutes' walk from the harbour across the swing bridge, with the strongest independent high street south of the river.",
    strengths: [
      "North Street is Bristol's best-balanced high street",
      "Walk to the harbour and the centre over the bridge",
      "The Tobacco Factory theatre and Sunday market",
      "Flat, well-connected and genuinely walkable",
    ],
    tradeoffs: [
      "Rents now match much of the north of the city",
      "Terraces are tight with small yards rather than gardens",
      "No station; the MetroBus is the fast option",
      "Parking pressure is severe",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "bedminster",
    name: "Bedminster",
    borough: "Bristol",
    centroid: { lat: 51.4386, lng: -2.5975 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1100, twoBedMedianGbp: 1375, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs3",
    mainStations: [
      { name: "Bedminster", lines: ["GWR"] },
      { name: "East Street", lines: ["First Bus m2", "First Bus 75"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 5, nightlife: 5, cafeDensity: 7, gymDensity: 6,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 7, safety: 6, connectivity: 8,
    },
    summary:
      "The half of BS3 that has not been rewritten yet. East Street is still a working high street of pound shops and butchers rather than a destination, and the terraces behind it are the last inner-Bristol stock at a genuine discount — with a station, which Southville does not have.",
    strengths: [
      "Its own station, two minutes from Temple Meads",
      "Cheaper than Southville for the same postcode",
      "Upfest murals and a real neighbourhood character",
      "Walk to North Street in ten minutes",
    ],
    tradeoffs: [
      "East Street is run down and slow to change",
      "Large redevelopment sites will be building for years",
      "Terraces are small and often unmodernised",
      "Green space means a walk to Victoria Park",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "totterdown",
    name: "Totterdown",
    borough: "Bristol",
    centroid: { lat: 51.4406, lng: -2.5716 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1075, twoBedMedianGbp: 1350, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs4",
    mainStations: [
      { name: "Bristol Temple Meads", lines: ["GWR", "CrossCountry"] },
      { name: "Wells Road", lines: ["First Bus 1", "First Bus 90"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 6, nightlife: 4, cafeDensity: 7, gymDensity: 5,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 7, safety: 7, connectivity: 8,
    },
    summary:
      "The painted terraces stacked up the hill above Temple Meads are the first thing most people see arriving in Bristol by train, and living in them means a fifteen-minute walk to the station that is entirely downhill one way. Quiet, tight-knit and steep in a way that decides things for people.",
    strengths: [
      "Fifteen minutes' walk to Temple Meads",
      "Views across the whole city from the top streets",
      "Cheaper than anywhere comparable north of the river",
      "Arnos Vale and Victoria Park both close",
    ],
    tradeoffs: [
      "The gradient is genuinely severe",
      "Very little in the way of shops or bars",
      "Houses are small and the streets are narrow",
      "Traffic on the Wells Road is heavy",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "st-george",
    name: "St George",
    borough: "Bristol",
    centroid: { lat: 51.4636, lng: -2.5444 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 950, twoBedMedianGbp: 1200, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs5",
    mainStations: [
      { name: "Lawrence Hill", lines: ["Severn Beach Line", "GWR"] },
      { name: "Church Road", lines: ["First Bus m3", "First Bus 44"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 7, nightlife: 4, cafeDensity: 7, gymDensity: 5,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 6, safety: 6, connectivity: 7,
    },
    summary:
      "Church Road has quietly become one of the better places to eat in east Bristol, and St George Park gives the area a proper green centre. It is Easton without the intensity and with more space, at a price that has not yet caught up with either.",
    strengths: [
      "St George Park is a genuine local asset",
      "Church Road has good pubs and independents",
      "Larger houses and gardens than inner east Bristol",
      "MetroBus m3 runs straight into the centre",
    ],
    tradeoffs: [
      "No station of its own",
      "Church Road traffic is constant",
      "Further out than the rent difference suggests",
      "Patchy from one street to the next",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "fishponds",
    name: "Fishponds",
    borough: "Bristol",
    centroid: { lat: 51.4780, lng: -2.5384 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 925, twoBedMedianGbp: 1175, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs16",
    mainStations: [
      { name: "Fishponds Road", lines: ["First Bus 5", "First Bus 48"] },
      { name: "Bristol Parkway", lines: ["GWR", "CrossCountry"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 7, nightlife: 4, cafeDensity: 6, gymDensity: 6,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 6, safety: 6, connectivity: 6,
    },
    summary:
      "A former mill village absorbed into the city, with its own high street, a big student population from the UWE campus up the road, and the Bristol and Bath Railway Path running straight through it. The cycling is the reason to be here.",
    strengths: [
      "The Railway Path reaches the centre in 25 minutes by bike",
      "Ten minutes from UWE Frenchay",
      "Its own high street and Oldbury Court estate for green space",
      "Consistently among the cheapest houses with gardens",
    ],
    tradeoffs: [
      "No railway station despite the name of the path",
      "Buses into the centre are slow at peak",
      "Student turnover in parts",
      "Fishponds Road is a traffic corridor first",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "horfield",
    name: "Horfield",
    borough: "Bristol",
    centroid: { lat: 51.4900, lng: -2.5850 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 975, twoBedMedianGbp: 1225, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs6-bs7",
    mainStations: [
      { name: "Filton Abbey Wood", lines: ["GWR"] },
      { name: "Gloucester Road North", lines: ["First Bus 70", "First Bus 75"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 7, nightlife: 3, cafeDensity: 6, gymDensity: 6,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 6, safety: 7, connectivity: 7,
    },
    summary:
      "The northern end of the Gloucester Road corridor, where the independents thin out and the houses get bigger. Horfield Common, a station within walking distance and easy reach of both the aerospace belt and the city make it one of the more practical family choices in Bristol.",
    strengths: [
      "Filton Abbey Wood station for Parkway and the centre",
      "Horfield Common and the Ardagh sports facilities",
      "Bigger houses and gardens than inner Bristol",
      "Well placed for the Filton and Aztec West employers",
    ],
    tradeoffs: [
      "The interesting end of Gloucester Road is a long walk",
      "Little character of its own",
      "The M32 and rail corridor generate noise",
      "Buses into the centre are slow in the peak",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "henleaze",
    name: "Henleaze",
    borough: "Bristol",
    centroid: { lat: 51.4867, lng: -2.6046 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1050, twoBedMedianGbp: 1350, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs9-bs10",
    mainStations: [
      { name: "Redland", lines: ["Severn Beach Line"] },
      { name: "Henleaze Road", lines: ["First Bus 1", "First Bus 4"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 2, cafeDensity: 6, gymDensity: 6,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 4, safety: 9, connectivity: 6,
    },
    summary:
      "Interwar semis, a well-kept high street and the Downs at the end of the road. Henleaze is where Bristol families move when the terrace gets too small, and it is as quiet, safe and unexciting as that makes it sound — which for a lot of people is exactly the point.",
    strengths: [
      "Among the safest parts of the city",
      "Walking distance to the Downs and Badock's Wood",
      "Strong schools and a settled family market",
      "Proper houses with off-street parking",
    ],
    tradeoffs: [
      "Almost nothing happens after six",
      "No station within walking distance",
      "Expensive for how far out it is",
      "Very little rental stock that is not a family house",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "westbury-on-trym",
    name: "Westbury-on-Trym",
    borough: "Bristol",
    centroid: { lat: 51.4930, lng: -2.6210 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1000, twoBedMedianGbp: 1300, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs9-bs10",
    mainStations: [
      { name: "Sea Mills", lines: ["Severn Beach Line"] },
      { name: "Westbury village", lines: ["First Bus 1", "First Bus 2"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 2, cafeDensity: 6, gymDensity: 5,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 4, safety: 9, connectivity: 6,
    },
    summary:
      "A village that kept its centre — a green, a medieval church, a run of independent shops — and was then surrounded by the city. It is the most self-contained place in Bristol, which is either its great appeal or the reason you would not live there.",
    strengths: [
      "A real village centre with independent shops",
      "Blaise Castle Estate ten minutes away",
      "Very low crime and strong schools",
      "Quick access to the M5 and the north fringe",
    ],
    tradeoffs: [
      "Getting into the centre takes a while at any hour",
      "Skews much older than the rest of the city",
      "Nightlife means two pubs",
      "Little that is affordable for a single renter",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "knowle",
    name: "Knowle",
    borough: "Bristol",
    centroid: { lat: 51.4318, lng: -2.5697 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 900, twoBedMedianGbp: 1150, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs4",
    mainStations: [
      { name: "Wells Road", lines: ["First Bus 1", "First Bus 90"] },
      { name: "Bristol Temple Meads", lines: ["GWR", "CrossCountry"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 7, nightlife: 3, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 5, safety: 6, connectivity: 6,
    },
    summary:
      "Up the hill from Totterdown, with long views north across the city and a mix of interwar semis and terraces that still represents one of the better value-per-square-foot deals in Bristol. Redcatch Park gives it a centre; the Wells Road gives it traffic.",
    strengths: [
      "Real houses with gardens at inner-city distances",
      "Redcatch Park and the community garden",
      "Frequent buses down the Wells Road",
      "Noticeably cheaper than anything north of the river",
    ],
    tradeoffs: [
      "Wells Road traffic and air quality",
      "Very little to walk to in the evening",
      "The hill again",
      "Knowle West nearby has real deprivation and it shows",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "brislington",
    name: "Brislington",
    borough: "Bristol",
    centroid: { lat: 51.4380, lng: -2.5424 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 900, twoBedMedianGbp: 1150, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs4",
    mainStations: [
      { name: "Brislington park & ride", lines: ["First Bus m1", "First Bus 36"] },
      { name: "Keynsham", lines: ["GWR"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 7, nightlife: 3, cafeDensity: 5, gymDensity: 5,
      walkability: 6, foodScene: 5, youngProfessionalDensity: 5, safety: 6, connectivity: 6,
    },
    summary:
      "The A4 corridor out towards Bath, with the MetroBus running down it and Nightingale Valley and the Avon on its southern edge. Practical rather than charming, and one of the few parts of Bristol where a car is genuinely useful rather than a liability.",
    strengths: [
      "MetroBus m1 into the centre on its own lane",
      "Straight run to Bath on the A4",
      "Larger houses, gardens and off-street parking",
      "Nightingale Valley and the river path",
    ],
    tradeoffs: [
      "The A4 dominates the area",
      "Amenities are strip-retail rather than a high street",
      "Little sense of a centre",
      "Poor walking access to anywhere else",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "hengrove",
    name: "Hengrove & Whitchurch",
    borough: "Bristol",
    centroid: { lat: 51.4145, lng: -2.5764 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 850, twoBedMedianGbp: 1075, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs13-bs14",
    mainStations: [
      { name: "Hengrove Park", lines: ["First Bus m2", "First Bus 51"] },
      { name: "Bristol Temple Meads", lines: ["GWR", "CrossCountry"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 2, cafeDensity: 4, gymDensity: 6,
      walkability: 6, foodScene: 4, youngProfessionalDensity: 4, safety: 6, connectivity: 6,
    },
    summary:
      "The southern edge of the city, built around the old Whitchurch airfield and now around a leisure park, a hospital and a very large amount of new housing. The cheapest way into Bristol proper, with the MetroBus doing more heavy lifting than any other single route in the city.",
    strengths: [
      "The lowest rents anywhere inside Bristol",
      "MetroBus m2 runs a direct segregated route to the centre",
      "South Bristol hospital and Hengrove Park on the doorstep",
      "New-build stock with modern efficiency",
    ],
    tradeoffs: [
      "A long way out for a city this size",
      "Very little in the way of shops or eating out",
      "Car-oriented layout throughout",
      "Building sites will be a feature for years",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "shirehampton",
    name: "Shirehampton & Sea Mills",
    borough: "Bristol",
    centroid: { lat: 51.4838, lng: -2.6698 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 875, twoBedMedianGbp: 1100, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs11",
    mainStations: [
      { name: "Shirehampton", lines: ["Severn Beach Line"] },
      { name: "Sea Mills", lines: ["Severn Beach Line"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 2, cafeDensity: 5, gymDensity: 4,
      walkability: 7, foodScene: 4, youngProfessionalDensity: 4, safety: 7, connectivity: 6,
    },
    summary:
      "Two stations on the Severn Beach line, the Avon Gorge on one side and Blaise on the other, and rents that belong to a different city. The catch is the line itself — half-hourly, and it stops running early enough to shape your evenings.",
    strengths: [
      "Two stations with a direct run to Clifton and the centre",
      "The Gorge, Blaise Castle and the river path",
      "Cheap for houses with gardens",
      "Two minutes from Avonmouth for anyone working there",
    ],
    tradeoffs: [
      "Severn Beach line is half-hourly and finishes early",
      "Very little local amenity beyond the basics",
      "Industrial Avonmouth on the doorstep",
      "Feels detached from the rest of the city",
    ],
    dataQuality: "sourceBacked",
  },

  // ── South Gloucestershire ──────────────────────────────────────────
  {
    id: "filton",
    name: "Filton",
    borough: "South Gloucestershire",
    centroid: { lat: 51.5090, lng: -2.5760 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 975, twoBedMedianGbp: 1250, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs34-bs32",
    mainStations: [
      { name: "Filton Abbey Wood", lines: ["GWR"] },
      { name: "Bristol Parkway", lines: ["GWR", "CrossCountry"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 3, cafeDensity: 5, gymDensity: 6,
      walkability: 6, foodScene: 5, youngProfessionalDensity: 6, safety: 7, connectivity: 8,
    },
    summary:
      "Bristol's aerospace town, built around the airfield that made Concorde and now around Airbus, Rolls-Royce and GKN. Two stations and a straight run to Parkway make it the best-connected place in the region for anyone whose job is in the north fringe.",
    strengths: [
      "Walk or cycle to the aerospace employers",
      "Two stations, including Parkway for London",
      "Cheaper than equivalent north Bristol",
      "The Mall and Cribbs Causeway ten minutes away",
    ],
    tradeoffs: [
      "Almost no character or centre",
      "Aircraft and ring-road noise",
      "Little to do in the evening",
      "Rents track Bristol despite the setting",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "bradley-stoke",
    name: "Bradley Stoke",
    borough: "South Gloucestershire",
    centroid: { lat: 51.5346, lng: -2.5432 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1000, twoBedMedianGbp: 1275, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs34-bs32",
    mainStations: [
      { name: "Bristol Parkway", lines: ["GWR", "CrossCountry"] },
      { name: "Bradley Stoke Way", lines: ["MetroBus m1", "First Bus 73"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 2, cafeDensity: 5, gymDensity: 7,
      walkability: 6, foodScene: 4, youngProfessionalDensity: 5, safety: 8, connectivity: 7,
    },
    summary:
      "Built from nothing in the 1980s and 90s, and still the largest new settlement in Europe by that measure. Modern housing, good schools, very low crime and a total absence of anything older than the residents — which is precisely what people move here for.",
    strengths: [
      "Bristol Parkway for London in 80 minutes",
      "Modern, efficient housing with parking",
      "Very low crime and strong schools",
      "Walkable to the Aztec West and Parkway employers",
    ],
    tradeoffs: [
      "No high street or centre to speak of",
      "Entirely car-dependent for anything beyond the estate",
      "Nothing to do in the evening",
      "Rents match Bristol without Bristol's amenities",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "kingswood",
    name: "Kingswood",
    borough: "South Gloucestershire",
    centroid: { lat: 51.4620, lng: -2.5077 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 875, twoBedMedianGbp: 1125, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs15",
    mainStations: [
      { name: "Kingswood High Street", lines: ["First Bus m3", "First Bus 42"] },
      { name: "Bristol Temple Meads", lines: ["GWR", "CrossCountry"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 3, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 5, safety: 6, connectivity: 6,
    },
    summary:
      "A former coal and boot-making town that has never quite decided whether it is part of Bristol. It has a proper high street, the Railway Path on its northern edge, and the cheapest houses with gardens within a half-hour bus of the centre.",
    strengths: [
      "A real high street with everything you need day to day",
      "The Bristol and Bath Railway Path for cycling",
      "Good value for family houses",
      "MetroBus m3 gives a fast run to the centre",
    ],
    tradeoffs: [
      "No station",
      "The high street has struggled for a decade",
      "Feels neither city nor town",
      "Buses are slow outside the MetroBus corridor",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "yate",
    name: "Yate",
    borough: "South Gloucestershire",
    centroid: { lat: 51.5405, lng: -2.4118 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 825, twoBedMedianGbp: 1050, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs37",
    mainStations: [
      { name: "Yate", lines: ["GWR"] },
      { name: "Chipping Sodbury", lines: ["First Bus 84", "First Bus Y1"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 2, cafeDensity: 4, gymDensity: 5,
      walkability: 6, foodScene: 4, youngProfessionalDensity: 4, safety: 7, connectivity: 6,
    },
    summary:
      "A post-war new town with a station that reaches Temple Meads in under half an hour, which is the whole argument for it. Chipping Sodbury next door supplies the market-town charm Yate itself was never designed to have.",
    strengths: [
      "Direct train to Temple Meads in 25 minutes",
      "Chipping Sodbury's high street on the doorstep",
      "Among the cheapest family housing in the region",
      "Open countryside immediately to the east",
    ],
    tradeoffs: [
      "The town centre is a 1960s shopping precinct",
      "Trains are hourly off-peak",
      "Almost nothing to do locally",
      "A long way from anywhere in Bristol that is not the centre",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "thornbury",
    name: "Thornbury",
    borough: "South Gloucestershire",
    centroid: { lat: 51.6098, lng: -2.5237 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 850, twoBedMedianGbp: 1075, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs35",
    mainStations: [
      { name: "Thornbury High Street", lines: ["First Bus T1", "First Bus 78"] },
      { name: "Bristol Parkway", lines: ["GWR", "CrossCountry"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 2, cafeDensity: 5, gymDensity: 4,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 3, safety: 9, connectivity: 4,
    },
    summary:
      "A genuine market town with a castle, a medieval high street and an unusually strong independent retail scene for its size. It is also the least well-connected place covered here — the railway closed in 1944 and nothing has replaced it.",
    strengths: [
      "A proper high street with real independents",
      "Very low crime and strong schools",
      "Open Severn Vale countryside on all sides",
      "Quick to the M5 and the north",
    ],
    tradeoffs: [
      "No railway station at all",
      "Buses to Bristol take over an hour",
      "Effectively requires a car",
      "Skews much older than the region",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Bath and North East Somerset ───────────────────────────────────
  {
    id: "bath-central",
    name: "Bath city centre",
    borough: "Bath and North East Somerset",
    centroid: { lat: 51.3811, lng: -2.3590 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 1350, twoBedMedianGbp: 1725, source: "market_review", asOf: AS_OF },
    roomDistrict: "ba1-ba2",
    mainStations: [
      { name: "Bath Spa", lines: ["GWR"] },
      { name: "Bath bus station", lines: ["First Bus", "National Express"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 7, nightlife: 6, cafeDensity: 9, gymDensity: 7,
      walkability: 10, foodScene: 8, youngProfessionalDensity: 6, safety: 8, connectivity: 8,
    },
    summary:
      "A World Heritage city of about ninety thousand people, which means the entire centre is walkable in twenty minutes and every one of those minutes is spent looking at Bath stone. The rents reflect that, and so does the tourist volume.",
    strengths: [
      "Everything within a twenty-minute walk",
      "Direct trains to Bristol in 12 minutes and London in 85",
      "Georgian architecture on a scale nowhere else matches",
      "Strong food, theatre and music for a city this size",
    ],
    tradeoffs: [
      "The highest rents in the region",
      "Tourist crowds year-round",
      "Listed buildings are cold and cannot be altered",
      "Very little modern or accessible stock",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "oldfield-park",
    name: "Oldfield Park",
    borough: "Bath and North East Somerset",
    centroid: { lat: 51.3766, lng: -2.3792 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 1100, twoBedMedianGbp: 1400, source: "market_review", asOf: AS_OF },
    roomDistrict: "ba1-ba2",
    mainStations: [
      { name: "Oldfield Park", lines: ["GWR"] },
      { name: "Moorland Road", lines: ["First Bus 6", "First Bus 20"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 6, nightlife: 4, cafeDensity: 8, gymDensity: 5,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 7, safety: 7, connectivity: 7,
    },
    summary:
      "Bath's Victorian terraces rather than its Georgian crescents, and the city's student and young-professional quarter as a result. Moorland Road is a working local high street and the station puts Bristol twenty minutes away, at rents a long way below the centre.",
    strengths: [
      "Its own station with fast trains both ways",
      "Moorland Road for day-to-day shopping",
      "Substantially cheaper than central Bath",
      "Twenty minutes' walk to the Royal Crescent",
    ],
    tradeoffs: [
      "Very heavily studented in term time",
      "Terraces are small and often HMO-converted",
      "Trains from here are busy at peak",
      "Little green space nearby",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "bathwick",
    name: "Bathwick & Widcombe",
    borough: "Bath and North East Somerset",
    centroid: { lat: 51.3789, lng: -2.3479 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 1275, twoBedMedianGbp: 1625, source: "market_review", asOf: AS_OF },
    roomDistrict: "ba1-ba2",
    mainStations: [
      { name: "Bath Spa", lines: ["GWR"] },
      { name: "Widcombe Parade", lines: ["First Bus 1", "First Bus 4"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 9, nightlife: 3, cafeDensity: 7, gymDensity: 5,
      walkability: 9, foodScene: 7, youngProfessionalDensity: 5, safety: 9, connectivity: 7,
    },
    summary:
      "Across the Avon from the centre, with Widcombe's small parade of shops, the canal towpath and the climb up to Bathwick Hill and the university. Five minutes from Bath Spa station and considerably quieter than anywhere on the other bank.",
    strengths: [
      "Five minutes' walk to Bath Spa station",
      "The Kennet and Avon towpath for running and cycling",
      "Widcombe Parade is a proper little high street",
      "Sydney Gardens and the Skyline walk",
    ],
    tradeoffs: [
      "Expensive, and the good stock rarely comes up",
      "Bathwick Hill is a serious climb",
      "University traffic up and down the hill",
      "Quiet to the point of dull for some",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "keynsham",
    name: "Keynsham",
    borough: "Bath and North East Somerset",
    centroid: { lat: 51.4152, lng: -2.4977 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 950, twoBedMedianGbp: 1200, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs31",
    mainStations: [
      { name: "Keynsham", lines: ["GWR"] },
      { name: "Keynsham High Street", lines: ["First Bus 349", "First Bus 37"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 2, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 4, safety: 8, connectivity: 7,
    },
    summary:
      "Exactly halfway between Bristol and Bath, on the line that serves both, which makes it the obvious answer for a household split between the two cities. A pleasant if unremarkable town in its own right, with the Avon and the Chew running through it.",
    strengths: [
      "Trains to Bristol in 10 minutes and Bath in 8",
      "The only sensible answer for a Bristol–Bath couple",
      "Riverside parks and the Chew valley",
      "Cheaper than either city",
    ],
    tradeoffs: [
      "The high street is quiet and getting quieter",
      "Very little going on in the evening",
      "Trains are half-hourly off-peak",
      "New estates have outpaced the amenities",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "midsomer-norton",
    name: "Midsomer Norton & Radstock",
    borough: "Bath and North East Somerset",
    centroid: { lat: 51.2836, lng: -2.4820 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 725, twoBedMedianGbp: 925, source: "market_review", asOf: AS_OF },
    roomDistrict: "ba3",
    mainStations: [
      { name: "Midsomer Norton High Street", lines: ["First Bus 172", "First Bus 178"] },
      { name: "Bath Spa", lines: ["GWR"] },
    ],
    lifestyle: {
      livelyVsQuiet: 2, greenSpace: 8, nightlife: 2, cafeDensity: 4, gymDensity: 4,
      walkability: 6, foodScene: 4, youngProfessionalDensity: 3, safety: 8, connectivity: 3,
    },
    summary:
      "The old Somerset coalfield, ten miles south of Bath and a world away from it. The cheapest rents anywhere in this region by a wide margin, on the Mendip fringe, and with no railway — the line closed in 1966 and the bus takes fifty minutes to Bath.",
    strengths: [
      "By far the lowest rents in the region",
      "Mendip Hills walking straight from the door",
      "Real market-town high streets",
      "Strong sense of local community",
    ],
    tradeoffs: [
      "No railway station",
      "Fifty minutes to Bath by bus, longer to Bristol",
      "Very limited employment locally",
      "A car is not optional",
    ],
    dataQuality: "sourceBacked",
  },

  // ── North Somerset ─────────────────────────────────────────────────
  {
    id: "portishead",
    name: "Portishead",
    borough: "North Somerset",
    centroid: { lat: 51.4840, lng: -2.7639 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 900, twoBedMedianGbp: 1150, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs20",
    mainStations: [
      { name: "Portishead Marina", lines: ["First Bus X4", "First Bus X5"] },
      { name: "Bristol Temple Meads", lines: ["GWR", "CrossCountry"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 8, nightlife: 3, cafeDensity: 6, gymDensity: 6,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 5, safety: 9, connectivity: 4,
    },
    summary:
      "A power-station town rebuilt as a marina, and now the fastest-growing settlement in the region — twenty thousand people with no railway. The rail link has been promised for two decades and construction has started; until it opens, the A369 into Bristol decides your morning.",
    strengths: [
      "Marina, lido and coastal path on the Severn estuary",
      "Modern housing and very low crime",
      "Strong schools and a young family population",
      "The reopened rail line is under construction",
    ],
    tradeoffs: [
      "No station yet, and the A369 queues badly",
      "Bus into Bristol takes 45 minutes at peak",
      "Little to do beyond the marina",
      "Effectively car-dependent for now",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "nailsea",
    name: "Nailsea & Backwell",
    borough: "North Somerset",
    centroid: { lat: 51.4302, lng: -2.7570 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 850, twoBedMedianGbp: 1075, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs48",
    mainStations: [
      { name: "Nailsea & Backwell", lines: ["GWR"] },
      { name: "Nailsea town centre", lines: ["First Bus X6", "First Bus 82"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 2, cafeDensity: 5, gymDensity: 5,
      walkability: 6, foodScene: 5, youngProfessionalDensity: 4, safety: 9, connectivity: 6,
    },
    summary:
      "A station on the Bristol–Weston line and a well-regarded secondary school are the two things that bring people here. Nailsea itself is a 1960s expansion of an old glassmaking village; Backwell next door is the older and prettier half.",
    strengths: [
      "Direct trains to Temple Meads in 15 minutes",
      "Backwell School is among the region's strongest",
      "Cheap for family houses with gardens",
      "Tickenham Ridge and the Levels for walking",
    ],
    tradeoffs: [
      "The town centre is a dated precinct",
      "Trains are hourly off-peak",
      "The station is a walk from most of Nailsea",
      "Little for anyone without a family",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "clevedon",
    name: "Clevedon",
    borough: "North Somerset",
    centroid: { lat: 51.4380, lng: -2.8560 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 825, twoBedMedianGbp: 1050, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs21",
    mainStations: [
      { name: "Clevedon seafront", lines: ["First Bus X6", "First Bus 20"] },
      { name: "Yatton", lines: ["GWR"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 3, cafeDensity: 6, gymDensity: 4,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 4, safety: 9, connectivity: 4,
    },
    summary:
      "A Victorian seaside town that never went downmarket — the pier is Grade I listed, Hill Road has genuine independents, and the seafront is a working promenade rather than an arcade strip. The price is that the nearest station is in Yatton, four miles inland.",
    strengths: [
      "Genuinely attractive Victorian seafront and pier",
      "Hill Road's independent shops and cafés",
      "Very low crime and a strong community",
      "Poet's Walk and the coastal path",
    ],
    tradeoffs: [
      "No station; Yatton is a drive or a bus",
      "Over an hour into Bristol on public transport",
      "Skews older and quieter",
      "Limited employment locally",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "weston-super-mare",
    name: "Weston-super-Mare",
    borough: "North Somerset",
    centroid: { lat: 51.3458, lng: -2.9770 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 700, twoBedMedianGbp: 900, source: "market_review", asOf: AS_OF },
    roomDistrict: "bs22-bs23",
    mainStations: [
      { name: "Weston-super-Mare", lines: ["GWR", "CrossCountry"] },
      { name: "Worle", lines: ["GWR"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 7, nightlife: 4, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 4, youngProfessionalDensity: 3, safety: 5, connectivity: 6,
    },
    summary:
      "A large Victorian resort of eighty thousand people with two stations, three miles of beach and the cheapest rents anywhere in the region. It has the problems that go with a seaside town whose season ended decades ago, and it is honest about them.",
    strengths: [
      "The lowest rents covered here by a clear margin",
      "Two stations with direct trains to Bristol and beyond",
      "Three miles of beach and the Mendips behind",
      "A real town with its own hospital, college and centre",
    ],
    tradeoffs: [
      "Deprivation and recorded crime are well above the regional average",
      "Fifty minutes into Bristol even by train",
      "Seasonal economy with limited year-round work",
      "Large HMO stock of very variable quality",
    ],
    dataQuality: "sourceBacked",
  },
];
