import { LEEDS_RENT_REVIEW_AS_OF } from "@/lib/leeds/data/rent-market";
import type { LeedsRoomDistrict } from "@/lib/leeds/data/rent-market";
import type { Neighbourhood } from "@/lib/types";

/**
 * West Yorkshire neighbourhoods.
 *
 * Every entry is written out in full rather than generated from a
 * compact profile. This is a region of one large commercial city and a
 * ring of Victorian textile towns that were rich, then were not, and are
 * now each doing something different about it. Hebden Bridge and
 * Castleford have nothing in common beyond a fire authority.
 *
 * Rent figures are reviewed market estimates anchored on the ONS borough
 * averages in data/rent-market.ts, adjusted for the local premium or
 * discount. They are for narrowing a shortlist, not for valuing a flat,
 * and are rounded to the nearest £25 accordingly.
 */

const AS_OF = LEEDS_RENT_REVIEW_AS_OF;

export type LeedsNeighbourhood = Neighbourhood & {
  roomDistrict: LeedsRoomDistrict;
};

export const LEEDS_NEIGHBOURHOODS: LeedsNeighbourhood[] = [
  // ── Leeds: central ─────────────────────────────────────────────────
  {
    id: "city-centre",
    name: "Leeds city centre",
    borough: "Leeds",
    centroid: { lat: 53.7965, lng: -1.5478 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1025, twoBedMedianGbp: 1300, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls1-ls2",
    mainStations: [
      { name: "Leeds", lines: ["Northern", "TransPennine Express", "LNER", "CrossCountry"] },
      { name: "Leeds City bus station", lines: ["First Bus", "Arriva Yorkshire"] },
    ],
    lifestyle: {
      livelyVsQuiet: 9, greenSpace: 3, nightlife: 9, cafeDensity: 9, gymDensity: 9,
      walkability: 10, foodScene: 9, youngProfessionalDensity: 9, safety: 6, connectivity: 10,
    },
    summary:
      "Leeds built more city-centre flats in the last twenty years than anywhere in England outside London, and the result is a dense, walkable core with the third-busiest station in the country at its heart. The Victorian arcades and the glass towers coexist better than they have any right to.",
    strengths: [
      "Leeds station reaches most of the north in under an hour",
      "Walk to every city-centre job",
      "The arcades, Kirkgate Market and the Corn Exchange",
      "The largest concentration of bars and restaurants in Yorkshire",
    ],
    tradeoffs: [
      "The highest rents in West Yorkshire by a distance",
      "Almost no green space inside the loop road",
      "Weekend noise is relentless around Call Lane",
      "New-build service charges and thin walls",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "holbeck",
    name: "Holbeck & South Bank",
    borough: "Leeds",
    centroid: { lat: 53.7885, lng: -1.5580 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 900, twoBedMedianGbp: 1150, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls1-ls2",
    mainStations: [
      { name: "Leeds", lines: ["Northern", "TransPennine Express", "LNER"] },
      { name: "Holbeck", lines: ["First Bus 5", "First Bus 51"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 4, nightlife: 5, cafeDensity: 7, gymDensity: 7,
      walkability: 9, foodScene: 6, youngProfessionalDensity: 8, safety: 5, connectivity: 9,
    },
    summary:
      "Holbeck Urban Village turned a set of derelict flax mills into the city's tech and creative quarter, and the South Bank regeneration behind it is the largest of its kind in Europe. It is a construction site that happens to be ten minutes' walk from the station.",
    strengths: [
      "Ten minutes' walk to Leeds station",
      "Cheaper than the city centre for the same access",
      "Temple Works, the Round Foundry and a real industrial fabric",
      "Channel 4 and the tech cluster on the doorstep",
    ],
    tradeoffs: [
      "Building sites will be a feature for another decade",
      "Very little in the way of shops or everyday amenity",
      "Parts of Holbeck have long-standing deprivation and it shows",
      "Almost no green space",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Leeds: inner ───────────────────────────────────────────────────
  {
    id: "headingley",
    name: "Headingley",
    borough: "Leeds",
    centroid: { lat: 53.8180, lng: -1.5800 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 800, twoBedMedianGbp: 1000, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls6",
    mainStations: [
      { name: "Headingley", lines: ["Northern"] },
      { name: "Otley Road", lines: ["First Bus 1", "First Bus 6", "First Bus 28"] },
    ],
    lifestyle: {
      livelyVsQuiet: 8, greenSpace: 6, nightlife: 8, cafeDensity: 8, gymDensity: 6,
      walkability: 9, foodScene: 7, youngProfessionalDensity: 8, safety: 6, connectivity: 8,
    },
    summary:
      "The best-known student suburb in Britain, and a place that is slowly becoming something else as the purpose-built blocks in the city centre pull undergraduates away. The cricket ground, the Arndale and a genuinely good run of pubs give it a centre most Leeds suburbs lack.",
    strengths: [
      "Its own station and buses every few minutes into town",
      "The best pub density outside the city centre",
      "Headingley Stadium for cricket and rugby",
      "Big Victorian houses, so shares work well",
    ],
    tradeoffs: [
      "Overwhelmingly student in term time",
      "Housing stock is tired and much of it is HMO-converted",
      "Otley Road traffic is constant",
      "Rents are high for what you get",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "hyde-park",
    name: "Hyde Park & Woodhouse",
    borough: "Leeds",
    centroid: { lat: 53.8090, lng: -1.5680 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 725, twoBedMedianGbp: 900, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls6",
    mainStations: [
      { name: "Burley Park", lines: ["Northern"] },
      { name: "Hyde Park Corner", lines: ["First Bus 1", "First Bus 6"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 6, nightlife: 6, cafeDensity: 7, gymDensity: 5,
      walkability: 9, foodScene: 6, youngProfessionalDensity: 7, safety: 4, connectivity: 8,
    },
    summary:
      "Between the two universities and the Headingley terraces, with Hyde Park itself, the Hyde Park Picture House and a density of back-to-back housing that exists almost nowhere else in England. Cheap, central and rough around the edges.",
    strengths: [
      "Walk to both universities in fifteen minutes",
      "The cheapest rents this close to the centre",
      "Hyde Park Picture House and Woodhouse Moor",
      "Burley Park station a few minutes away",
    ],
    tradeoffs: [
      "Recorded burglary is among the highest in the city",
      "Back-to-backs are small, dark and poorly insulated",
      "Very heavy student turnover",
      "Little that is open outside term",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "burley",
    name: "Burley",
    borough: "Leeds",
    centroid: { lat: 53.8110, lng: -1.5790 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 750, twoBedMedianGbp: 925, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls4-ls5",
    mainStations: [
      { name: "Burley Park", lines: ["Northern"] },
      { name: "Kirkstall Road", lines: ["First Bus 33", "First Bus 34"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 6, nightlife: 5, cafeDensity: 6, gymDensity: 6,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 7, safety: 5, connectivity: 8,
    },
    summary:
      "The strip between Kirkstall Road and Headingley, with a station, the river and a rapidly growing set of converted mills. Less studenty than Hyde Park, cheaper than Headingley, and the closest thing inner north-west Leeds has to a compromise.",
    strengths: [
      "Burley Park station, five minutes to Leeds",
      "Cheaper than Headingley for similar access",
      "The Kirkstall Road corridor for retail and gyms",
      "Mill conversions offer better stock than the terraces",
    ],
    tradeoffs: [
      "Kirkstall Road is a dual carriageway and feels like one",
      "Little in the way of an independent high street",
      "Flooding has hit the Kirkstall corridor before",
      "Still a substantial student presence",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "kirkstall",
    name: "Kirkstall",
    borough: "Leeds",
    centroid: { lat: 53.8215, lng: -1.6050 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 725, twoBedMedianGbp: 900, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls4-ls5",
    mainStations: [
      { name: "Headingley", lines: ["Northern"] },
      { name: "Kirkstall Abbey", lines: ["First Bus 33", "First Bus 33A"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 8, nightlife: 4, cafeDensity: 6, gymDensity: 6,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 6, safety: 6, connectivity: 7,
    },
    summary:
      "A twelfth-century Cistercian abbey, a large park along the Aire and a retail park, which is a combination you would struggle to find anywhere else. Kirkstall is where the student belt gives out and ordinary Leeds begins.",
    strengths: [
      "Kirkstall Abbey and the river valley on the doorstep",
      "Cheap for houses with gardens this close in",
      "The Leeds–Liverpool canal towpath into the centre",
      "Good bus frequency down Kirkstall Road",
    ],
    tradeoffs: [
      "No station of its own",
      "The retail park dominates the middle of it",
      "Aire flooding is a real and recent risk",
      "Little going on in the evening",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "chapel-allerton",
    name: "Chapel Allerton",
    borough: "Leeds",
    centroid: { lat: 53.8280, lng: -1.5420 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 850, twoBedMedianGbp: 1050, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls7-ls8",
    mainStations: [
      { name: "Chapel Allerton", lines: ["First Bus 2", "First Bus 3", "First Bus 91"] },
      { name: "Leeds", lines: ["Northern", "LNER", "TransPennine Express"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 7, nightlife: 6, cafeDensity: 9, gymDensity: 6,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 8, safety: 7, connectivity: 7,
    },
    summary:
      "Leeds's most convincing village-in-a-city: a short high street with more independent restaurants per metre than anywhere else in the region, a green at one end and Victorian villas behind. It has been the fashionable answer for fifteen years and the rents show it.",
    strengths: [
      "Genuinely excellent independent food and drink",
      "A real village centre you can walk around",
      "Potternewton Park and Gledhow Valley Woods",
      "Frequent buses into the centre",
    ],
    tradeoffs: [
      "No station; buses only, and they queue on Chapeltown Road",
      "Rents are the highest outside the city centre",
      "Parking is a permanent argument",
      "Very little stock at the cheaper end",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "meanwood",
    name: "Meanwood",
    borough: "Leeds",
    centroid: { lat: 53.8320, lng: -1.5620 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 800, twoBedMedianGbp: 1000, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls16-ls17",
    mainStations: [
      { name: "Meanwood Road", lines: ["First Bus 51", "First Bus 52"] },
      { name: "Headingley", lines: ["Northern"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 9, nightlife: 3, cafeDensity: 7, gymDensity: 5,
      walkability: 7, foodScene: 7, youngProfessionalDensity: 6, safety: 8, connectivity: 6,
    },
    summary:
      "A wooded valley running north from the city, with the Meanwood Valley Trail following it out to the countryside. The greenest inner suburb in Leeds and the one most likely to make people forget they are three miles from a major city centre.",
    strengths: [
      "The Meanwood Valley Trail runs from here to the moors",
      "Genuinely leafy, with woods rather than parks",
      "A short parade of good independents",
      "Low crime and a settled family population",
    ],
    tradeoffs: [
      "No station and the buses are slow",
      "Steep in every direction",
      "Little nightlife of any kind",
      "Family houses dominate; less choice for single renters",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "armley",
    name: "Armley",
    borough: "Leeds",
    centroid: { lat: 53.7960, lng: -1.5880 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 625, twoBedMedianGbp: 775, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls12-ls13",
    mainStations: [
      { name: "Armley Town Street", lines: ["First Bus 14", "First Bus 16", "First Bus 42"] },
      { name: "Leeds", lines: ["Northern", "TransPennine Express"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 6, nightlife: 3, cafeDensity: 5, gymDensity: 4,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 5, safety: 4, connectivity: 7,
    },
    summary:
      "Two miles from the centre and among the cheapest places in the region to rent, with the Industrial Museum in Armley Mills and Gotts Park behind it. It has long-standing problems and it also has the shortest commute of anywhere at this price.",
    strengths: [
      "Among the lowest rents anywhere this close to a city centre",
      "Fifteen minutes into town on frequent buses",
      "Gotts Park and Armley Park for green space",
      "Back-to-backs and terraces mean plenty of cheap stock",
    ],
    tradeoffs: [
      "Recorded crime is well above the Leeds average",
      "Town Street has struggled for a long time",
      "Housing stock is old and often poorly maintained",
      "Little that is open in the evening",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "beeston",
    name: "Beeston",
    borough: "Leeds",
    centroid: { lat: 53.7770, lng: -1.5620 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 625, twoBedMedianGbp: 775, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls9-ls11",
    mainStations: [
      { name: "Cottingley", lines: ["Northern"] },
      { name: "Dewsbury Road", lines: ["First Bus 12", "First Bus 13"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 3, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 5, safety: 5, connectivity: 7,
    },
    summary:
      "South Leeds, up the hill from the station, with Elland Road at the bottom of it and Cross Flatts Park in the middle. Cheap, close in, and the part of the city most likely to be transformed by the South Bank development happening just below it.",
    strengths: [
      "Two miles from the station, and walkable at a push",
      "Cross Flatts Park is a good, well-used park",
      "Among the cheapest rents in Leeds",
      "Cottingley station for the Wakefield line",
    ],
    tradeoffs: [
      "Deprivation is significant in parts",
      "Match days at Elland Road affect everything",
      "The M621 cuts it off from the centre on foot",
      "Little independent retail",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "harehills",
    name: "Harehills",
    borough: "Leeds",
    centroid: { lat: 53.8110, lng: -1.5170 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 600, twoBedMedianGbp: 750, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls9-ls11",
    mainStations: [
      { name: "Harehills Lane", lines: ["First Bus 12", "First Bus 49", "First Bus 50"] },
      { name: "Leeds", lines: ["Northern", "LNER"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 5, nightlife: 3, cafeDensity: 6, gymDensity: 4,
      walkability: 8, foodScene: 8, youngProfessionalDensity: 4, safety: 3, connectivity: 7,
    },
    summary:
      "The most diverse part of Leeds and the best place in the region to buy food you cannot get anywhere else. It is also among the most deprived neighbourhoods in England, and any honest description has to hold both of those facts at once.",
    strengths: [
      "Extraordinary food shopping and eating for the price",
      "The lowest rents in the city",
      "Fifteen minutes into the centre by bus",
      "Roundhay Park is a twenty-minute walk uphill",
    ],
    tradeoffs: [
      "Among the highest recorded crime rates in Leeds",
      "Very high housing density and poor stock condition",
      "Significant and long-standing deprivation",
      "Overcrowding and HMO pressure are real problems",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Leeds: outer ───────────────────────────────────────────────────
  {
    id: "roundhay",
    name: "Roundhay",
    borough: "Leeds",
    centroid: { lat: 53.8395, lng: -1.5000 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 850, twoBedMedianGbp: 1075, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls7-ls8",
    mainStations: [
      { name: "Roundhay Park", lines: ["First Bus 2", "First Bus 12"] },
      { name: "Cross Gates", lines: ["Northern", "TransPennine Express"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 10, nightlife: 3, cafeDensity: 7, gymDensity: 6,
      walkability: 7, foodScene: 7, youngProfessionalDensity: 5, safety: 9, connectivity: 6,
    },
    summary:
      "Seven hundred acres of park, a lake, two golf courses and Tropical World, with large Edwardian houses arranged around all of it. Roundhay is the address Leeds families aim for and it is priced accordingly, though less steeply than an equivalent in most cities.",
    strengths: [
      "Roundhay Park is one of the largest urban parks in Europe",
      "Very low crime and strong schools",
      "Street Lane has a decent run of independents",
      "Substantial houses with gardens and parking",
    ],
    tradeoffs: [
      "No station within walking distance",
      "Buses into the centre take a while at peak",
      "Little for a single renter under thirty",
      "The dearest part of Leeds outside the centre",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "horsforth",
    name: "Horsforth",
    borough: "Leeds",
    centroid: { lat: 53.8390, lng: -1.6390 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 800, twoBedMedianGbp: 1000, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls18-ls20",
    mainStations: [
      { name: "Horsforth", lines: ["Northern"] },
      { name: "Town Street", lines: ["First Bus 33", "First Bus X84"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 8, nightlife: 4, cafeDensity: 7, gymDensity: 6,
      walkability: 7, foodScene: 7, youngProfessionalDensity: 5, safety: 8, connectivity: 7,
    },
    summary:
      "A township rather than a suburb — it has its own town council, its own high street and a station on the Harrogate line. Close enough to the airport to be convenient and far enough from the flightpath to be quiet.",
    strengths: [
      "Station with direct trains to Leeds and Harrogate",
      "A proper high street with independents and pubs",
      "Hall Park and the Aire valley close by",
      "Ten minutes from Leeds Bradford Airport",
    ],
    tradeoffs: [
      "Trains are half-hourly outside peak",
      "Expensive for how far out it is",
      "Skews older and more settled",
      "Airport noise on some approaches",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "guiseley",
    name: "Guiseley & Yeadon",
    borough: "Leeds",
    centroid: { lat: 53.8750, lng: -1.7100 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 725, twoBedMedianGbp: 900, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls18-ls20",
    mainStations: [
      { name: "Guiseley", lines: ["Northern"] },
      { name: "Yeadon High Street", lines: ["First Bus 33", "First Bus 97"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 3, cafeDensity: 6, gymDensity: 5,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 4, safety: 8, connectivity: 6,
    },
    summary:
      "The Aireborough towns at the edge of Leeds, where the city runs out and Wharfedale begins. Guiseley has the station and the original Harry Ramsden's; Yeadon has the airport and the tarn. Both are quiet, well-kept and a long way from the centre.",
    strengths: [
      "Guiseley station serves Leeds, Bradford and Ilkley",
      "Open moorland and Wharfedale immediately north",
      "Family housing at well below Horsforth prices",
      "The airport is five minutes away",
    ],
    tradeoffs: [
      "Twenty-five minutes into Leeds on the train, longer by road",
      "Airport noise is real in Yeadon",
      "Very little going on in the evening",
      "A car is useful, though not essential in Guiseley",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "cross-gates",
    name: "Cross Gates",
    borough: "Leeds",
    centroid: { lat: 53.8080, lng: -1.4560 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 675, twoBedMedianGbp: 850, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls15-ls25",
    mainStations: [
      { name: "Cross Gates", lines: ["Northern", "TransPennine Express"] },
      { name: "Cross Gates Road", lines: ["First Bus 4", "First Bus 19"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 2, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 4, youngProfessionalDensity: 4, safety: 7, connectivity: 8,
    },
    summary:
      "Interwar semis, a shopping centre and a station that puts Leeds nine minutes away — which is the whole argument, and a strong one. East Leeds is the least glamorous quarter of the city and the best value for anyone who commutes by train.",
    strengths: [
      "Nine minutes to Leeds by train, several times an hour",
      "Cheap houses with gardens and parking",
      "Temple Newsam estate a short walk south",
      "Well placed for the Thorpe Park business parks",
    ],
    tradeoffs: [
      "Almost nothing to do locally",
      "The shopping centre is dated",
      "No character to speak of",
      "The East Leeds Orbital road has changed the area's edges",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "garforth",
    name: "Garforth",
    borough: "Leeds",
    centroid: { lat: 53.7920, lng: -1.3820 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 675, twoBedMedianGbp: 850, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls15-ls25",
    mainStations: [
      { name: "Garforth", lines: ["Northern", "TransPennine Express"] },
      { name: "Main Street", lines: ["First Bus 163", "First Bus 64"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 2, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 4, youngProfessionalDensity: 4, safety: 8, connectivity: 7,
    },
    summary:
      "A former mining town on the eastern edge of Leeds, with a station, a decent high street and open country immediately beyond. Twelve minutes from Leeds by train and considerably cheaper than anywhere at a comparable journey time to the north or west.",
    strengths: [
      "Twelve minutes to Leeds and thirty to York by train",
      "A real high street with everything day to day",
      "Open countryside on three sides",
      "Strong schools and low crime",
    ],
    tradeoffs: [
      "Quiet to the point of dull for some",
      "The A63 and M1 dominate the approaches",
      "Little in the way of eating out",
      "Trains are busy at peak",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "morley",
    name: "Morley",
    borough: "Leeds",
    centroid: { lat: 53.7460, lng: -1.6000 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 675, twoBedMedianGbp: 850, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls27",
    mainStations: [
      { name: "Morley", lines: ["Northern", "TransPennine Express"] },
      { name: "Queen Street", lines: ["First Bus 51", "First Bus 52"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 3, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 4, safety: 7, connectivity: 8,
    },
    summary:
      "A textile town that Leeds absorbed in 1974 and that has never quite accepted the fact — it still has its own town council, town hall and strong local identity. The rebuilt station puts Leeds ten minutes away and Huddersfield twenty.",
    strengths: [
      "Ten minutes to Leeds on a rebuilt station",
      "Genuinely independent town identity and high street",
      "Well placed for both Leeds and the M62 corridor",
      "White Rose centre and business park nearby",
    ],
    tradeoffs: [
      "The M62 and M621 both run close",
      "Town centre retail has thinned out",
      "Little nightlife beyond pubs",
      "Air quality along the motorway corridor",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "otley",
    name: "Otley",
    borough: "Leeds",
    centroid: { lat: 53.9050, lng: -1.6920 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 750, twoBedMedianGbp: 925, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls21-ls22",
    mainStations: [
      { name: "Otley bus station", lines: ["First Bus X84", "First Bus 97"] },
      { name: "Menston", lines: ["Northern"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 9, nightlife: 4, cafeDensity: 7, gymDensity: 4,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 3, safety: 9, connectivity: 4,
    },
    summary:
      "A Wharfedale market town with a genuine Friday market, an unusual number of good pubs for its size and the Chevin rising straight out of the back of it. The station closed in 1965 and the X84 has been carrying the load ever since.",
    strengths: [
      "A real market town with real independents",
      "Otley Chevin and Wharfedale immediately outside",
      "Excellent pubs for a town of twelve thousand",
      "Very low crime",
    ],
    tradeoffs: [
      "No railway station; Menston is the nearest",
      "Fifty minutes into Leeds by bus",
      "Expensive relative to the rest of the region",
      "A car is close to essential",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "wetherby",
    name: "Wetherby",
    borough: "Leeds",
    centroid: { lat: 53.9280, lng: -1.3860 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 750, twoBedMedianGbp: 950, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls21-ls22",
    mainStations: [
      { name: "Wetherby bus station", lines: ["First Bus 7", "Harrogate Bus 780"] },
      { name: "Leeds", lines: ["Northern", "LNER"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 9, nightlife: 3, cafeDensity: 6, gymDensity: 4,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 3, safety: 9, connectivity: 3,
    },
    summary:
      "A Georgian coaching town on the Wharfe, equidistant from Leeds, York and Harrogate and connected properly to none of them. The racecourse, the riverside and a well-kept high street make it pleasant; the absence of a railway makes it car-dependent.",
    strengths: [
      "An attractive Georgian town centre on the river",
      "Equidistant from Leeds, York and Harrogate by road",
      "Very low crime and strong schools",
      "Open Wharfedale countryside on all sides",
    ],
    tradeoffs: [
      "No railway station at all",
      "Buses to Leeds take fifty minutes",
      "Among the dearest rents in West Yorkshire",
      "Effectively requires a car",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Bradford ───────────────────────────────────────────────────────
  {
    id: "bradford-centre",
    name: "Bradford city centre",
    borough: "Bradford",
    centroid: { lat: 53.7938, lng: -1.7523 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 600, twoBedMedianGbp: 750, source: "market_review", asOf: AS_OF },
    roomDistrict: "bd1-bd8",
    mainStations: [
      { name: "Bradford Interchange", lines: ["Northern", "Grand Central"] },
      { name: "Bradford Forster Square", lines: ["Northern"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 5, nightlife: 5, cafeDensity: 6, gymDensity: 6,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 5, safety: 4, connectivity: 8,
    },
    summary:
      "A city of half a million people with a Victorian centre built on wool money, the National Science and Media Museum, and the best South Asian food in Britain by a margin nobody seriously disputes. It is also the cheapest large city centre in England to rent in.",
    strengths: [
      "The lowest city-centre rents anywhere in this region",
      "Genuinely outstanding food, especially around Great Horton Road",
      "Two stations, with Leeds twenty minutes away",
      "Grand Victorian architecture and the City Park",
    ],
    tradeoffs: [
      "Long-standing deprivation and above-average recorded crime",
      "Retail in the centre has struggled badly",
      "The two stations do not connect to each other",
      "Fewer professional jobs than the size suggests",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "saltaire",
    name: "Saltaire & Shipley",
    borough: "Bradford",
    centroid: { lat: 53.8380, lng: -1.7900 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 700, twoBedMedianGbp: 875, source: "market_review", asOf: AS_OF },
    roomDistrict: "bd17-bd18",
    mainStations: [
      { name: "Saltaire", lines: ["Northern"] },
      { name: "Shipley", lines: ["Northern"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 8, nightlife: 3, cafeDensity: 7, gymDensity: 5,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 5, safety: 7, connectivity: 8,
    },
    summary:
      "A UNESCO World Heritage model village built by a Victorian mill owner for his workers, now with Salts Mill, a Hockney collection and the Leeds–Liverpool canal running through it. Shipley next door supplies the station junction and the shops.",
    strengths: [
      "World Heritage streets you can actually rent in",
      "Salts Mill, the canal and Shipley Glen",
      "Shipley junction reaches Leeds, Bradford and Skipton",
      "Cheap for somewhere this distinctive",
    ],
    tradeoffs: [
      "Conservation rules limit what can be changed",
      "Shipley town centre is tired",
      "Aire flooding has hit the valley floor before",
      "Twenty-five minutes to Leeds, longer at peak",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "bingley",
    name: "Bingley",
    borough: "Bradford",
    centroid: { lat: 53.8480, lng: -1.8380 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 675, twoBedMedianGbp: 850, source: "market_review", asOf: AS_OF },
    roomDistrict: "bd16",
    mainStations: [
      { name: "Bingley", lines: ["Northern"] },
      { name: "Main Street", lines: ["First Bus 662", "Keighley Bus 760"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 9, nightlife: 2, cafeDensity: 5, gymDensity: 4,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 3, safety: 8, connectivity: 6,
    },
    summary:
      "An Aire valley town with the Five Rise Locks at one end and St Ives estate at the other, and a station on the Airedale line that reaches Leeds in half an hour. Quiet, green and considerably cheaper than the equivalent in the Leeds direction.",
    strengths: [
      "Airedale line to Leeds, Bradford and Skipton",
      "Five Rise Locks and the St Ives estate",
      "Cheap family housing with moorland behind",
      "Low crime and a settled population",
    ],
    tradeoffs: [
      "The bypass took the life out of the town centre",
      "Half an hour to Leeds and it feels it",
      "Very little going on in the evening",
      "Flood risk along the valley floor",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "ilkley",
    name: "Ilkley",
    borough: "Bradford",
    centroid: { lat: 53.9250, lng: -1.8220 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 825, twoBedMedianGbp: 1050, source: "market_review", asOf: AS_OF },
    roomDistrict: "ls29",
    mainStations: [
      { name: "Ilkley", lines: ["Northern"] },
      { name: "The Grove", lines: ["First Bus X84", "Keighley Bus 962"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 10, nightlife: 2, cafeDensity: 7, gymDensity: 4,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 3, safety: 10, connectivity: 5,
    },
    summary:
      "A Victorian spa town under the moor that gave Yorkshire its anthem, with a branch line to both Leeds and Bradford and the highest rents in the Bradford district by a wide margin. It is in West Yorkshire administratively and belongs to the Dales in every other sense.",
    strengths: [
      "Ilkley Moor and the Cow and Calf straight from the town",
      "Direct trains to both Leeds and Bradford",
      "The Grove has genuinely good independents",
      "The lowest crime of anywhere covered here",
    ],
    tradeoffs: [
      "The dearest rents in the Bradford district",
      "Thirty-five minutes to Leeds",
      "Skews much older",
      "Very little rental stock at any price",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "keighley",
    name: "Keighley",
    borough: "Bradford",
    centroid: { lat: 53.8680, lng: -1.9060 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 575, twoBedMedianGbp: 725, source: "market_review", asOf: AS_OF },
    roomDistrict: "bd20-bd21",
    mainStations: [
      { name: "Keighley", lines: ["Northern", "Keighley & Worth Valley Railway"] },
      { name: "Cavendish Street", lines: ["Keighley Bus 662", "Keighley Bus 500"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 2, cafeDensity: 4, gymDensity: 4,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 3, safety: 5, connectivity: 6,
    },
    summary:
      "A working Airedale mill town at the head of the valley, with Haworth and the Worth Valley behind it and some of the lowest rents in England. Forty minutes from Leeds on a line that runs every half hour.",
    strengths: [
      "Among the cheapest rents anywhere covered on this site",
      "Airedale line to Leeds, Bradford and Skipton",
      "Haworth, the Brontë country and the moors on the doorstep",
      "A real town with its own hospital and college",
    ],
    tradeoffs: [
      "Significant deprivation and above-average crime",
      "Forty minutes to Leeds at best",
      "The town centre has struggled for decades",
      "Limited professional employment locally",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Wakefield ──────────────────────────────────────────────────────
  {
    id: "wakefield-centre",
    name: "Wakefield city centre",
    borough: "Wakefield",
    centroid: { lat: 53.6830, lng: -1.4990 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 650, twoBedMedianGbp: 800, source: "market_review", asOf: AS_OF },
    roomDistrict: "wf1-wf2",
    mainStations: [
      { name: "Wakefield Westgate", lines: ["LNER", "Northern", "Grand Central"] },
      { name: "Wakefield Kirkgate", lines: ["Northern"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 6, nightlife: 5, cafeDensity: 6, gymDensity: 6,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 5, safety: 5, connectivity: 9,
    },
    summary:
      "A cathedral city of eighty thousand with the Hepworth gallery on the river, a direct London train from Westgate and Leeds fourteen minutes up the line. It has more connectivity than any comparable town in the north and rents well below what that suggests.",
    strengths: [
      "Direct LNER trains to London in under two hours",
      "Fourteen minutes to Leeds, several times an hour",
      "The Hepworth Wakefield and the Yorkshire Sculpture Park nearby",
      "Cheap for a place this well connected",
    ],
    tradeoffs: [
      "Retail in the centre has thinned considerably",
      "Above-average recorded crime in parts",
      "The two stations are a walk apart",
      "Fewer professional jobs than the connections imply",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "horbury",
    name: "Horbury & Sandal",
    borough: "Wakefield",
    centroid: { lat: 53.6620, lng: -1.5490 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 675, twoBedMedianGbp: 850, source: "market_review", asOf: AS_OF },
    roomDistrict: "wf4",
    mainStations: [
      { name: "Sandal & Agbrigg", lines: ["Northern"] },
      { name: "Horbury Bridge", lines: ["Arriva 126", "Arriva 232"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 3, cafeDensity: 6, gymDensity: 5,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 4, safety: 8, connectivity: 6,
    },
    summary:
      "The comfortable side of Wakefield: a Georgian church at the centre of Horbury, Sandal Castle above the valley and the best schools in the district. It is where Wakefield's professionals live, and it is still cheaper than outer Leeds.",
    strengths: [
      "Strong schools and very low crime",
      "Sandal & Agbrigg station for Leeds and Wakefield",
      "Horbury has a genuine small high street",
      "Pugin's church and the Calder valley walks",
    ],
    tradeoffs: [
      "Quiet in the evening to the point of empty",
      "The M1 runs close to the eastern edge",
      "Trains are half-hourly",
      "Little rental stock beyond family houses",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "castleford",
    name: "Castleford",
    borough: "Wakefield",
    centroid: { lat: 53.7250, lng: -1.3540 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 575, twoBedMedianGbp: 725, source: "market_review", asOf: AS_OF },
    roomDistrict: "wf10",
    mainStations: [
      { name: "Castleford", lines: ["Northern"] },
      { name: "Carlton Street", lines: ["Arriva 148", "Arriva 189"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 3, cafeDensity: 4, gymDensity: 5,
      walkability: 7, foodScene: 4, youngProfessionalDensity: 3, safety: 5, connectivity: 7,
    },
    summary:
      "A former mining and glassmaking town at the confluence of the Aire and Calder, best known now for rugby league and the Xscape complex on its edge. Among the lowest rents in the region, twenty-five minutes from Leeds by train.",
    strengths: [
      "Very low rents with a direct Leeds train",
      "Xscape and Junction 32 for retail and leisure",
      "The riverside and Fairburn Ings nature reserve",
      "A strong, well-defined local identity",
    ],
    tradeoffs: [
      "Long-standing post-industrial deprivation",
      "Town centre retail has struggled",
      "Above-average recorded crime",
      "Limited employment beyond distribution and retail",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Kirklees ───────────────────────────────────────────────────────
  {
    id: "huddersfield-centre",
    name: "Huddersfield town centre",
    borough: "Kirklees",
    centroid: { lat: 53.6458, lng: -1.7850 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 625, twoBedMedianGbp: 775, source: "market_review", asOf: AS_OF },
    roomDistrict: "hd1-hd3",
    mainStations: [
      { name: "Huddersfield", lines: ["TransPennine Express", "Northern"] },
      { name: "Huddersfield bus station", lines: ["First Bus", "Arriva Yorkshire"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 6, nightlife: 5, cafeDensity: 6, gymDensity: 6,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 5, safety: 5, connectivity: 8,
    },
    summary:
      "The railway station is one of the finest in Britain and John Betjeman called the town centre a splendid example of Victorian confidence. Huddersfield has a large university, cheap rents and a direct TransPennine line to both Leeds and Manchester.",
    strengths: [
      "Direct trains to both Leeds and Manchester in half an hour",
      "One of the best station buildings in the country",
      "Cheap rents with a large university population",
      "The Pennines start at the edge of town",
    ],
    tradeoffs: [
      "Town centre retail has declined sharply",
      "Above-average recorded crime in parts",
      "TransPennine services are unreliable",
      "Less going on than the population suggests",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "marsh-lindley",
    name: "Marsh & Lindley",
    borough: "Kirklees",
    centroid: { lat: 53.6510, lng: -1.8130 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 650, twoBedMedianGbp: 800, source: "market_review", asOf: AS_OF },
    roomDistrict: "hd1-hd3",
    mainStations: [
      { name: "Huddersfield", lines: ["TransPennine Express", "Northern"] },
      { name: "Lidget Street", lines: ["First Bus 370", "First Bus 371"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 7, nightlife: 3, cafeDensity: 7, gymDensity: 5,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 5, safety: 7, connectivity: 6,
    },
    summary:
      "The comfortable west side of Huddersfield, with the university on one side and the Royal Infirmary on the other. Marsh has a short parade of good independents and Lindley has the clock tower and the better houses.",
    strengths: [
      "Walk to the university and the hospital",
      "Marsh has a genuinely good little high street",
      "Substantial stone houses at low prices",
      "Beaumont Park and the Colne valley close by",
    ],
    tradeoffs: [
      "No station of its own",
      "Traffic on the New Hey Road corridor",
      "Very quiet in the evening",
      "The hills are steep in every direction",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "holmfirth",
    name: "Holmfirth",
    borough: "Kirklees",
    centroid: { lat: 53.5720, lng: -1.7860 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 700, twoBedMedianGbp: 875, source: "market_review", asOf: AS_OF },
    roomDistrict: "hd9",
    mainStations: [
      { name: "Brockholes", lines: ["Northern"] },
      { name: "Holmfirth bus station", lines: ["First Bus 310", "First Bus 314"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 10, nightlife: 3, cafeDensity: 7, gymDensity: 3,
      walkability: 7, foodScene: 7, youngProfessionalDensity: 3, safety: 9, connectivity: 4,
    },
    summary:
      "A Holme valley town of stone terraces stacked up the hillside, with the Peak District National Park beginning immediately south of it. The Last of the Summer Wine tourism has faded and left behind a genuinely good independent food and drink scene.",
    strengths: [
      "The Peak District starts at the edge of town",
      "A strong run of independent shops, cafés and pubs",
      "Very low crime and striking stone architecture",
      "Brockholes station on the Penistone line",
    ],
    tradeoffs: [
      "The Penistone line is hourly and slow",
      "An hour to Leeds on public transport",
      "Expensive for Kirklees",
      "Effectively car-dependent",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "dewsbury",
    name: "Dewsbury",
    borough: "Kirklees",
    centroid: { lat: 53.6910, lng: -1.6300 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 575, twoBedMedianGbp: 725, source: "market_review", asOf: AS_OF },
    roomDistrict: "wf12-wf13",
    mainStations: [
      { name: "Dewsbury", lines: ["TransPennine Express", "Northern"] },
      { name: "Dewsbury bus station", lines: ["Arriva 268", "First Bus 253"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 3, cafeDensity: 5, gymDensity: 4,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 3, safety: 4, connectivity: 8,
    },
    summary:
      "A heavy woollen town between Leeds, Bradford and Huddersfield, on the TransPennine main line with direct trains to Leeds in fifteen minutes and Manchester in fifty. Rents are among the lowest in the region and the town centre is in the middle of a long regeneration.",
    strengths: [
      "Fifteen minutes to Leeds on the main line",
      "Among the lowest rents in West Yorkshire",
      "Equidistant from Leeds, Bradford and Huddersfield",
      "Good South Asian food around Savile Town",
    ],
    tradeoffs: [
      "Significant deprivation and above-average crime",
      "The town centre has struggled for a long time",
      "TransPennine reliability is poor",
      "Limited professional employment locally",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Calderdale ─────────────────────────────────────────────────────
  {
    id: "halifax",
    name: "Halifax",
    borough: "Calderdale",
    centroid: { lat: 53.7220, lng: -1.8590 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 550, twoBedMedianGbp: 700, source: "market_review", asOf: AS_OF },
    roomDistrict: "hx1-hx3",
    mainStations: [
      { name: "Halifax", lines: ["Northern", "Grand Central"] },
      { name: "Halifax bus station", lines: ["First Bus 501", "First Bus 576"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 7, nightlife: 4, cafeDensity: 6, gymDensity: 5,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 4, safety: 5, connectivity: 7,
    },
    summary:
      "The Piece Hall is the only surviving Georgian cloth hall in the world and its restoration turned Halifax from a town people left into one they visit. The rents are the lowest of any town covered here, and Leeds is forty minutes away.",
    strengths: [
      "The lowest rents anywhere in this region",
      "The Piece Hall, the Minster and Dean Clough",
      "Direct trains to Leeds, Manchester and London",
      "Ogden Water and the Calder valley on the doorstep",
    ],
    tradeoffs: [
      "Deprivation and recorded crime above the regional average",
      "Forty minutes to Leeds and it is not a fast forty",
      "Retail outside the Piece Hall has struggled",
      "Steep hills throughout",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "hebden-bridge",
    name: "Hebden Bridge",
    borough: "Calderdale",
    centroid: { lat: 53.7420, lng: -2.0140 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 675, twoBedMedianGbp: 850, source: "market_review", asOf: AS_OF },
    roomDistrict: "hx6-hx7",
    mainStations: [
      { name: "Hebden Bridge", lines: ["Northern"] },
      { name: "St George's Square", lines: ["First Bus 590", "First Bus 592"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 10, nightlife: 4, cafeDensity: 8, gymDensity: 3,
      walkability: 9, foodScene: 8, youngProfessionalDensity: 5, safety: 8, connectivity: 6,
    },
    summary:
      "A Calder valley mill town that reinvented itself completely — independent everything, one of the highest concentrations of artists and writers in the country, and a station with direct trains to both Leeds and Manchester. The valley floor floods, and everyone who lives there knows it.",
    strengths: [
      "Direct trains to Leeds and Manchester in under an hour",
      "Outstanding independent shops, cafés and music",
      "Hardcastle Crags and the moors from the doorstep",
      "Walkable, distinctive and genuinely unlike anywhere else",
    ],
    tradeoffs: [
      "Serious and repeated flooding on the valley floor",
      "Dearest rents in Calderdale",
      "Very little level ground for anything",
      "Limited local employment",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "sowerby-bridge",
    name: "Sowerby Bridge",
    borough: "Calderdale",
    centroid: { lat: 53.7080, lng: -1.9080 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 575, twoBedMedianGbp: 725, source: "market_review", asOf: AS_OF },
    roomDistrict: "hx6-hx7",
    mainStations: [
      { name: "Sowerby Bridge", lines: ["Northern"] },
      { name: "Wharf Street", lines: ["First Bus 592", "First Bus 563"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 8, nightlife: 4, cafeDensity: 6, gymDensity: 4,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 4, safety: 6, connectivity: 7,
    },
    summary:
      "Where the Rochdale and Calder and Hebble canals meet, three miles down the valley from Hebden Bridge and roughly a hundred pounds a month cheaper. A good station, a decent run of pubs and a growing set of mill conversions.",
    strengths: [
      "Station on the Calder valley line to Leeds and Manchester",
      "Substantially cheaper than Hebden Bridge",
      "The canal basin and towpath",
      "Mill conversions give better stock than the terraces",
    ],
    tradeoffs: [
      "Flood risk along the valley floor",
      "The A58 runs straight through the middle",
      "Less going on than Hebden Bridge",
      "Forty-five minutes to Leeds",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "brighouse",
    name: "Brighouse",
    borough: "Calderdale",
    centroid: { lat: 53.7000, lng: -1.7830 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 600, twoBedMedianGbp: 750, source: "market_review", asOf: AS_OF },
    roomDistrict: "hd6",
    mainStations: [
      { name: "Brighouse", lines: ["Northern"] },
      { name: "Commercial Street", lines: ["First Bus 549", "Arriva 363"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 7, nightlife: 3, cafeDensity: 6, gymDensity: 5,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 4, safety: 7, connectivity: 7,
    },
    summary:
      "A canal town at the junction of everything: five minutes from the M62, twenty from Huddersfield, half an hour from both Leeds and Bradford. Brighouse does not have a strong identity of its own, and its usefulness is precisely that.",
    strengths: [
      "Five minutes from the M62 in both directions",
      "Station with trains to Leeds, Bradford and Halifax",
      "A tidy town centre with a canal basin",
      "Well placed for a household split across the region",
    ],
    tradeoffs: [
      "M62 noise and air quality on the southern edge",
      "Trains are hourly on some services",
      "Little character or nightlife",
      "Quiet in the evening",
    ],
    dataQuality: "sourceBacked",
  },
];
