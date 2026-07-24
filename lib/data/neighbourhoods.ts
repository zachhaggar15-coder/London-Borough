import { RENT_MARKET_REVIEW_AS_OF } from "@/lib/data/rent-market";
import type { Neighbourhood, LifestyleScores } from "@/lib/types";

/**
 * London neighbourhoods.
 *
 * Launch neighbourhood dataset.
 *
 * Areas are source-backed static records for fast local ranking. The rent
 * values are reviewed market estimates intended for neighbourhood discovery,
 * not property-level pricing. Room values are derived in lib/rent.ts from
 * the same launch rent baseline plus listing-sample regional averages.
 *
 * The broad-coverage entries use static launch profiles below, so every area
 * has its own summary, strengths, tradeoffs, and lifestyle tuning.
 */

const MARKET_REVIEW_AS_OF = RENT_MARKET_REVIEW_AS_OF;

const DETAILED: Neighbourhood[] = [
  // ── NORTH ───────────────────────────────────────────────────────────
  {
    id: "camden",
    name: "Camden",
    borough: "Camden",
    centroid: { lat: 51.5390, lng: -0.1426 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1900, twoBedMedianGbp: 2600, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Camden Town", lines: ["Northern"] },
      { name: "Chalk Farm", lines: ["Northern"] },
    ],
    lifestyle: {
      livelyVsQuiet: 9, greenSpace: 7, nightlife: 9, cafeDensity: 9, gymDensity: 7,
      walkability: 8, foodScene: 9, youngProfessionalDensity: 8, safety: 6, connectivity: 8,
    },
    summary: "Grubby, music-obsessed and mobbed by tourists at weekends, Camden runs on market stalls, gig venues and late nights — with Regent's Park and the canal to escape to.",
    strengths: ["Standout food, drink and live music", "Famous markets on the doorstep", "Direct Northern line into the City", "Regent's Park a short walk away"],
    tradeoffs: ["Heaving most weekends", "A few corners feel edgy after dark", "You pay for the postcode"],
    dataQuality: "sourceBacked",
  },
  {
    id: "islington",
    name: "Islington",
    borough: "Islington",
    centroid: { lat: 51.5362, lng: -0.1033 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 2000, twoBedMedianGbp: 2700, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Angel", lines: ["Northern"] },
      { name: "Highbury & Islington", lines: ["Victoria", "Overground"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 5, nightlife: 7, cafeDensity: 9, gymDensity: 8,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 9, safety: 7, connectivity: 9,
    },
    summary: "Polished and professional, with Upper Street doing the heavy lifting — one of the densest runs of restaurants and bars in the city, and easy to get out of in the morning.",
    strengths: ["A packed restaurant and bar strip", "Two fast tube lines to the City", "A big young-professional crowd", "Flat, walkable streets"],
    tradeoffs: ["Rents run high", "Little green space in the postcode itself"],
    dataQuality: "sourceBacked",
  },
  {
    id: "crouch-end",
    name: "Crouch End",
    borough: "Haringey",
    centroid: { lat: 51.5783, lng: -0.1226 },
    transportZones: [3],
    rent: { oneBedMedianGbp: 1500, twoBedMedianGbp: 1950, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Hornsey", lines: ["National Rail (Great Northern)"] },
      { name: "Crouch Hill", lines: ["Overground"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 8, nightlife: 4, cafeDensity: 8, gymDensity: 6,
      walkability: 7, foodScene: 7, youngProfessionalDensity: 6, safety: 8, connectivity: 5,
    },
    summary: "A hilltop village that never got a tube, Crouch End trades speed for calm — big skies, low-rise streets, and a creative, family-leaning crowd escaping the Zone 1 noise.",
    strengths: ["A real village atmosphere", "Parkland Walk and Alexandra Palace close by", "Strong independent shops and cafés"],
    tradeoffs: ["Overground and rail only, no tube", "Sleepy in the evenings", "A slow haul into the City"],
    dataQuality: "sourceBacked",
  },
  {
    id: "stoke-newington",
    name: "Stoke Newington",
    borough: "Hackney",
    centroid: { lat: 51.5620, lng: -0.0773 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1700, twoBedMedianGbp: 2200, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Stoke Newington", lines: ["Overground"] },
      { name: "Rectory Road", lines: ["Overground"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 7, nightlife: 5, cafeDensity: 8, gymDensity: 6,
      walkability: 8, foodScene: 8, youngProfessionalDensity: 7, safety: 7, connectivity: 6,
    },
    summary: "Church Street's independents and Clissold Park give Stokey a gentler, family-leaning rhythm than the louder Hackney postcodes around it.",
    strengths: ["Clissold Park at its heart", "Independent shops and good food", "A genuine sense of community"],
    tradeoffs: ["No tube", "The Overground packs out at peak", "Not much happening late"],
    dataQuality: "sourceBacked",
  },
  {
    id: "finsbury-park",
    name: "Finsbury Park",
    borough: "Haringey",
    centroid: { lat: 51.5642, lng: -0.1066 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1600, twoBedMedianGbp: 2050, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Finsbury Park", lines: ["Victoria", "Piccadilly", "National Rail"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 8, nightlife: 5, cafeDensity: 6, gymDensity: 6,
      walkability: 7, foodScene: 7, youngProfessionalDensity: 7, safety: 6, connectivity: 9,
    },
    summary: "Better known as somewhere to change trains, but the big park, three-line station and steadily improving food make it quietly underrated.",
    strengths: ["A large park right by the station", "Victoria, Piccadilly and rail from one stop", "Cheaper than neighbouring Islington"],
    tradeoffs: ["A hit-and-miss high street", "Can feel transient in parts"],
    dataQuality: "sourceBacked",
  },
  {
    id: "kentish-town",
    name: "Kentish Town",
    borough: "Camden",
    centroid: { lat: 51.5505, lng: -0.1409 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1750, twoBedMedianGbp: 2300, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Kentish Town", lines: ["Northern", "Thameslink"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 6, nightlife: 6, cafeDensity: 7, gymDensity: 7,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 7, safety: 7, connectivity: 8,
    },
    summary: "Camden without the crowds or the price tag — the same Northern line, a dependable run of pubs, and the Heath a short walk uphill.",
    strengths: ["Northern line and Thameslink at one station", "Hampstead Heath 15 minutes away", "A solid line-up of pubs"],
    tradeoffs: ["The high street is useful rather than charming"],
    dataQuality: "sourceBacked",
  },

  // ── EAST ────────────────────────────────────────────────────────────
  {
    id: "hackney-central",
    name: "Hackney Central",
    borough: "Hackney",
    centroid: { lat: 51.5470, lng: -0.0552 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1700, twoBedMedianGbp: 2200, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Hackney Central", lines: ["Overground"] },
      { name: "Hackney Downs", lines: ["Overground"] },
    ],
    lifestyle: {
      livelyVsQuiet: 8, greenSpace: 6, nightlife: 8, cafeDensity: 9, gymDensity: 7,
      walkability: 8, foodScene: 9, youngProfessionalDensity: 9, safety: 6, connectivity: 7,
    },
    summary: "The template for post-2010 east London: markets, breweries and design studios, and a creative crowd that put down roots and never quite left.",
    strengths: ["First-rate food and nightlife", "Independent shops and galleries", "A quick hop to Shoreditch and Dalston"],
    tradeoffs: ["Overground only, no tube", "Rents climbed fast through the 2020s"],
    dataQuality: "sourceBacked",
  },
  {
    id: "dalston",
    name: "Dalston",
    borough: "Hackney",
    centroid: { lat: 51.5462, lng: -0.0750 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1750, twoBedMedianGbp: 2300, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Dalston Junction", lines: ["Overground"] },
      { name: "Dalston Kingsland", lines: ["Overground"] },
    ],
    lifestyle: {
      livelyVsQuiet: 9, greenSpace: 4, nightlife: 10, cafeDensity: 9, gymDensity: 6,
      walkability: 8, foodScene: 9, youngProfessionalDensity: 9, safety: 6, connectivity: 7,
    },
    summary: "Ridley Road Market by day, Turkish grills and packed bars by night — young, loud and not remotely restful.",
    strengths: ["Some of London's best nightlife", "Superb food, Turkish especially", "Overground reach across the city"],
    tradeoffs: ["Noisy", "Barely any green space", "Can feel oversaturated"],
    dataQuality: "sourceBacked",
  },
  {
    id: "shoreditch",
    name: "Shoreditch",
    borough: "Hackney / Tower Hamlets",
    centroid: { lat: 51.5260, lng: -0.0780 },
    transportZones: [1],
    rent: { oneBedMedianGbp: 2300, twoBedMedianGbp: 3000, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Old Street", lines: ["Northern"] },
      { name: "Shoreditch High Street", lines: ["Overground"] },
      { name: "Liverpool Street", lines: ["Central", "Elizabeth", "Circle", "Hammersmith & City", "National Rail"] },
    ],
    lifestyle: {
      livelyVsQuiet: 10, greenSpace: 3, nightlife: 10, cafeDensity: 10, gymDensity: 8,
      walkability: 9, foodScene: 10, youngProfessionalDensity: 10, safety: 6, connectivity: 10,
    },
    summary: "Tech, finance and creatives packed into one Zone 1 postcode. Unbeatable for a night out, punishing if you actually want to sleep.",
    strengths: ["Unrivalled food, drink and nightlife", "Walking distance to the City", "About as connected as London gets"],
    tradeoffs: ["Steep rents", "Loud around the clock", "Almost no greenery"],
    dataQuality: "sourceBacked",
  },
  {
    id: "bethnal-green",
    name: "Bethnal Green",
    borough: "Tower Hamlets",
    centroid: { lat: 51.5270, lng: -0.0550 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1700, twoBedMedianGbp: 2200, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Bethnal Green", lines: ["Central"] },
      { name: "Cambridge Heath", lines: ["Overground"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 6, nightlife: 7, cafeDensity: 8, gymDensity: 7,
      walkability: 8, foodScene: 8, youngProfessionalDensity: 8, safety: 6, connectivity: 8,
    },
    summary: "The Central line and Victoria Park in one package — fast into town and the West End, without paying Shoreditch money next door.",
    strengths: ["Direct Central line to the City and West End", "Victoria Park nearby", "Cheaper than neighbouring Shoreditch"],
    tradeoffs: ["A few streets feel edgy at night", "Building quality is a mixed bag"],
    dataQuality: "sourceBacked",
  },
  {
    id: "stratford",
    name: "Stratford",
    borough: "Newham",
    centroid: { lat: 51.5417, lng: -0.0030 },
    transportZones: [2, 3],
    rent: { oneBedMedianGbp: 1600, twoBedMedianGbp: 2050, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Stratford", lines: ["Central", "Jubilee", "Elizabeth", "DLR", "Overground", "National Rail"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 8, nightlife: 5, cafeDensity: 6, gymDensity: 8,
      walkability: 6, foodScene: 6, youngProfessionalDensity: 7, safety: 7, connectivity: 10,
    },
    summary: "Olympic-legacy regeneration in full: towers, Europe's largest urban park on the doorstep, and arguably the best-connected station in London.",
    strengths: ["Six tube and rail services", "Queen Elizabeth Olympic Park", "Excellent gyms and leisure"],
    tradeoffs: ["Corporate in feel", "A thin independent food scene", "Life revolves around Westfield"],
    dataQuality: "sourceBacked",
  },
  {
    id: "walthamstow",
    name: "Walthamstow",
    borough: "Waltham Forest",
    centroid: { lat: 51.5830, lng: -0.0210 },
    transportZones: [3],
    rent: { oneBedMedianGbp: 1400, twoBedMedianGbp: 1800, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Walthamstow Central", lines: ["Victoria", "Overground"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 8, nightlife: 4, cafeDensity: 7, gymDensity: 6,
      walkability: 7, foodScene: 7, youngProfessionalDensity: 7, safety: 7, connectivity: 7,
    },
    summary: "Strong value with a fast Victoria line and Europe's longest street market — E17 has quietly become one of the more livable outer corners.",
    strengths: ["Direct Victoria line into town", "Noticeably cheaper than east Zone 2", "Plenty of green at Walthamstow Wetlands"],
    tradeoffs: ["Quiet in the evenings", "A long way from the City by transit"],
    dataQuality: "sourceBacked",
  },

  // ── SOUTH ───────────────────────────────────────────────────────────
  {
    id: "brixton",
    name: "Brixton",
    borough: "Lambeth",
    centroid: { lat: 51.4626, lng: -0.1144 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1700, twoBedMedianGbp: 2200, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Brixton", lines: ["Victoria", "National Rail"] },
    ],
    lifestyle: {
      livelyVsQuiet: 9, greenSpace: 6, nightlife: 9, cafeDensity: 8, gymDensity: 7,
      walkability: 8, foodScene: 10, youngProfessionalDensity: 8, safety: 6, connectivity: 8,
    },
    summary: "A south London institution: Brixton Village, Electric Avenue, Caribbean food and nights that run long and loud.",
    strengths: ["A world-class food and music scene", "Direct Victoria line to King's Cross", "Real character and community"],
    tradeoffs: ["Intense after dark", "Rents have climbed sharply"],
    dataQuality: "sourceBacked",
  },
  {
    id: "clapham",
    name: "Clapham",
    borough: "Lambeth",
    centroid: { lat: 51.4618, lng: -0.1383 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1800, twoBedMedianGbp: 2400, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Clapham Common", lines: ["Northern"] },
      { name: "Clapham Junction", lines: ["National Rail", "Overground"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 8, nightlife: 8, cafeDensity: 7, gymDensity: 8,
      walkability: 7, foodScene: 7, youngProfessionalDensity: 10, safety: 7, connectivity: 9,
    },
    summary: "Ground zero for London's just-out-of-uni professionals: the Common, brunch, the gym, a big Saturday night, repeat.",
    strengths: ["A huge young-professional scene", "Clapham Common", "Superb rail links via the Junction"],
    tradeoffs: ["Can feel cliquey and same-y", "Rowdy at weekends"],
    dataQuality: "sourceBacked",
  },
  {
    id: "peckham",
    name: "Peckham",
    borough: "Southwark",
    centroid: { lat: 51.4730, lng: -0.0700 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1550, twoBedMedianGbp: 2000, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Peckham Rye", lines: ["Overground", "National Rail"] },
    ],
    lifestyle: {
      livelyVsQuiet: 8, greenSpace: 6, nightlife: 9, cafeDensity: 8, gymDensity: 5,
      walkability: 7, foodScene: 9, youngProfessionalDensity: 8, safety: 5, connectivity: 6,
    },
    summary: "Rooftop bars in summer and warehouse parties year-round — creative, still relatively cheap, and polishing up fast.",
    strengths: ["A strong food and nightlife scene", "Cheaper than its north-London equivalents", "A big arts and music community"],
    tradeoffs: ["No tube", "Higher reported crime than neighbours", "Street feel shifts block to block"],
    dataQuality: "sourceBacked",
  },
  {
    id: "tooting",
    name: "Tooting",
    borough: "Wandsworth",
    centroid: { lat: 51.4275, lng: -0.1683 },
    transportZones: [3],
    rent: { oneBedMedianGbp: 1500, twoBedMedianGbp: 1900, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Tooting Broadway", lines: ["Northern"] },
      { name: "Tooting Bec", lines: ["Northern"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 8, nightlife: 5, cafeDensity: 7, gymDensity: 6,
      walkability: 7, foodScene: 9, youngProfessionalDensity: 7, safety: 7, connectivity: 7,
    },
    summary: "London's South Asian food capital, wrapped around a proper high street, a common and a lido — and cheaper than Clapham up the line.",
    strengths: ["Outstanding South Asian food", "Tooting Common and the Lido", "Zone 3 value on a direct Northern line"],
    tradeoffs: ["The Northern line is your only tube", "Thin on bars"],
    dataQuality: "sourceBacked",
  },
  {
    id: "bermondsey",
    name: "Bermondsey",
    borough: "Southwark",
    centroid: { lat: 51.4980, lng: -0.0640 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1850, twoBedMedianGbp: 2500, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Bermondsey", lines: ["Jubilee"] },
      { name: "London Bridge", lines: ["Jubilee", "Northern", "National Rail"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 5, nightlife: 6, cafeDensity: 8, gymDensity: 7,
      walkability: 8, foodScene: 8, youngProfessionalDensity: 9, safety: 7, connectivity: 9,
    },
    summary: "Warehouse conversions and the Beer Mile define this design-led stretch of riverside, a short walk from the City and London Bridge.",
    strengths: ["Walkable to London Bridge and the City", "Jubilee line", "Thames Path and Maltby Street Market"],
    tradeoffs: ["Short on large green space", "Dearer than its south-east neighbours"],
    dataQuality: "sourceBacked",
  },
  {
    id: "greenwich",
    name: "Greenwich",
    borough: "Greenwich",
    centroid: { lat: 51.4810, lng: -0.0050 },
    transportZones: [2, 3],
    rent: { oneBedMedianGbp: 1650, twoBedMedianGbp: 2100, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Greenwich", lines: ["DLR", "National Rail"] },
      { name: "Cutty Sark", lines: ["DLR"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 10, nightlife: 5, cafeDensity: 7, gymDensity: 6,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 6, safety: 8, connectivity: 7,
    },
    summary: "Royal park, observatory, covered market and river — on a clear Sunday it's the most postcard-perfect corner of London.",
    strengths: ["Greenwich Park and the Royal Observatory", "Riverside walks", "Fast DLR to Canary Wharf"],
    tradeoffs: ["A slog to the West End", "Quiet in the evenings"],
    dataQuality: "sourceBacked",
  },
  {
    id: "battersea",
    name: "Battersea / Nine Elms",
    borough: "Wandsworth",
    centroid: { lat: 51.4790, lng: -0.1490 },
    transportZones: [1, 2],
    rent: { oneBedMedianGbp: 2100, twoBedMedianGbp: 2800, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Battersea Power Station", lines: ["Northern"] },
      { name: "Battersea Park", lines: ["National Rail"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 9, nightlife: 5, cafeDensity: 7, gymDensity: 9,
      walkability: 6, foodScene: 7, youngProfessionalDensity: 8, safety: 8, connectivity: 8,
    },
    summary: "Glassy new towers around the reborn Power Station, with Battersea Park on the river — smart and well-equipped, if a little characterless.",
    strengths: ["Battersea Park", "The Northern line extension", "Modern flats with gyms and pools"],
    tradeoffs: ["Expensive for the area", "A blank-slate new-build feel", "Little independent shopping"],
    dataQuality: "sourceBacked",
  },
  {
    id: "wimbledon",
    name: "Wimbledon",
    borough: "Merton",
    centroid: { lat: 51.4214, lng: -0.2064 },
    transportZones: [3],
    rent: { oneBedMedianGbp: 1700, twoBedMedianGbp: 2200, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Wimbledon", lines: ["District", "National Rail", "Tramlink"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 10, nightlife: 4, cafeDensity: 6, gymDensity: 7,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 6, safety: 9, connectivity: 7,
    },
    summary: "Leafy, safe and family-friendly, built around one of the largest urban commons in the world, with a quick rail run into Waterloo.",
    strengths: ["Wimbledon Common", "Safe, quiet streets", "Fast trains to Waterloo"],
    tradeoffs: ["Sleepy at night", "Slow going to east London"],
    dataQuality: "sourceBacked",
  },

  // ── WEST ────────────────────────────────────────────────────────────
  {
    id: "hammersmith",
    name: "Hammersmith",
    borough: "Hammersmith & Fulham",
    centroid: { lat: 51.4927, lng: -0.2240 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1850, twoBedMedianGbp: 2450, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Hammersmith", lines: ["District", "Piccadilly", "Hammersmith & City", "Circle"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 7, nightlife: 5, cafeDensity: 7, gymDensity: 8,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 7, safety: 8, connectivity: 9,
    },
    summary: "Four tube lines, a riverside and a fast road to Heathrow make this a workhorse of a base — more practical than pretty.",
    strengths: ["Four tube lines from one station", "Thames Path and riverside pubs", "Quick to Heathrow"],
    tradeoffs: ["A dated town centre", "Less character than its east-London peers"],
    dataQuality: "sourceBacked",
  },
  {
    id: "ealing",
    name: "Ealing",
    borough: "Ealing",
    centroid: { lat: 51.5130, lng: -0.3050 },
    transportZones: [3],
    rent: { oneBedMedianGbp: 1550, twoBedMedianGbp: 2000, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Ealing Broadway", lines: ["District", "Central", "Elizabeth", "National Rail"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 9, nightlife: 4, cafeDensity: 6, gymDensity: 7,
      walkability: 6, foodScene: 6, youngProfessionalDensity: 6, safety: 8, connectivity: 9,
    },
    summary: "Green, suburban and newly quick — the Elizabeth line has cut the trip to Paddington and the City to a fraction of what it was.",
    strengths: ["The Elizabeth line is a game-changer", "Big parks in Walpole and Pitshanger", "A safer, calmer feel"],
    tradeoffs: ["Sprawling and less walkable", "Quieter than Zone 2"],
    dataQuality: "sourceBacked",
  },
  {
    id: "shepherds-bush",
    name: "Shepherd's Bush",
    borough: "Hammersmith & Fulham",
    centroid: { lat: 51.5050, lng: -0.2180 },
    transportZones: [2],
    rent: { oneBedMedianGbp: 1800, twoBedMedianGbp: 2350, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Shepherd's Bush", lines: ["Central", "Overground"] },
      { name: "Shepherd's Bush Market", lines: ["Hammersmith & City", "Circle"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 6, nightlife: 6, cafeDensity: 7, gymDensity: 7,
      walkability: 7, foodScene: 7, youngProfessionalDensity: 7, safety: 6, connectivity: 9,
    },
    summary: "Westfield, the Bush Theatre and four tube lines add up to an underrated, West-End-adjacent base.",
    strengths: ["Central line to Oxford Circus in about 15 minutes", "Major shopping and entertainment", "Several transport options"],
    tradeoffs: ["Patchy away from Westfield", "Heavy traffic"],
    dataQuality: "sourceBacked",
  },
  {
    id: "acton",
    name: "Acton",
    borough: "Ealing",
    centroid: { lat: 51.5100, lng: -0.2700 },
    transportZones: [3],
    rent: { oneBedMedianGbp: 1500, twoBedMedianGbp: 1900, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Acton Town", lines: ["District", "Piccadilly"] },
      { name: "Acton Central", lines: ["Overground"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 7, nightlife: 3, cafeDensity: 5, gymDensity: 5,
      walkability: 6, foodScene: 5, youngProfessionalDensity: 6, safety: 7, connectivity: 8,
    },
    summary: "A spread of stations and steadily improving housing make suburban Acton a quietly cheap bet for the connectivity you get.",
    strengths: ["Several tube and Overground stations", "Cheaper than the postcodes around it", "Big parks"],
    tradeoffs: ["A forgettable high street", "Little going on in the evenings"],
    dataQuality: "sourceBacked",
  },
  {
    id: "putney",
    name: "Putney",
    borough: "Wandsworth",
    centroid: { lat: 51.4613, lng: -0.2160 },
    transportZones: [2, 3],
    rent: { oneBedMedianGbp: 1850, twoBedMedianGbp: 2400, source: "market_review", asOf: MARKET_REVIEW_AS_OF },
    mainStations: [
      { name: "Putney", lines: ["National Rail"] },
      { name: "East Putney", lines: ["District"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 9, nightlife: 5, cafeDensity: 7, gymDensity: 8,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 8, safety: 8, connectivity: 7,
    },
    summary: "Rowing on the river, Richmond Park up the road and a clean South-West line to Waterloo — a slightly older, more settled professional crowd than Clapham.",
    strengths: ["Thames Path and rowing clubs", "Easy reach of Richmond Park", "A tidy residential feel"],
    tradeoffs: ["Pricey", "Slow to east London"],
    dataQuality: "sourceBacked",
  },
];

/* ────────────────────────────────────────────────────────────────────
 * Launch coverage entries - broad London coverage with static profiles.
 * Builder below materialises each into a full Neighbourhood using AREA_PROFILES.
 * ──────────────────────────────────────────────────────────────────── */

type Character =
  | "central-elite"      // Mayfair, Kensington, Chelsea, Notting Hill
  | "trendy-creative"    // Hoxton, Hackney Wick, Peckham-adj
  | "urban-busy"         // Soho, Borough, Elephant
  | "polished-pro"       // Fulham, Chiswick, Pimlico
  | "leafy-suburban"     // Balham, Forest Hill, Streatham
  | "village-quiet"      // Hampstead, Highgate, Blackheath, Richmond
  | "newbuild-corporate" // Vauxhall, Stratford-adj
  | "diverse-mixed"      // Tooting-adj, Whitechapel, Tottenham
  | "transit-hub"        // Vauxhall, Wood Green
  | "outer-affordable";  // Catford, Hendon, Edmonton, Leyton

type CompactEntry = {
  slug: string;
  name: string;
  borough: string;
  lat: number;
  lng: number;
  zones: number[];
  character: Character;
  /** [1-bed median £/mo, 2-bed median £/mo] */
  rent: [number, number];
  station: string;
  lines: string[];
};

const COMPACT: CompactEntry[] = [
  // ── NORTH / NW ───────────────────────────────────────────────────
  { slug: "hampstead",       name: "Hampstead",       borough: "Camden",    lat: 51.5557, lng: -0.1782, zones: [2, 3], character: "village-quiet",   rent: [2000, 2700], station: "Hampstead",       lines: ["Northern"] },
  { slug: "highgate",        name: "Highgate",        borough: "Haringey",  lat: 51.5731, lng: -0.1485, zones: [3],    character: "village-quiet",   rent: [1750, 2300], station: "Highgate",        lines: ["Northern"] },
  { slug: "west-hampstead",  name: "West Hampstead",  borough: "Camden",    lat: 51.5475, lng: -0.1925, zones: [2],    character: "polished-pro",    rent: [1850, 2450], station: "West Hampstead",  lines: ["Jubilee", "Overground", "Thameslink"] },
  { slug: "belsize-park",    name: "Belsize Park",    borough: "Camden",    lat: 51.5471, lng: -0.1664, zones: [2],    character: "village-quiet",   rent: [1950, 2600], station: "Belsize Park",    lines: ["Northern"] },
  { slug: "holloway",        name: "Holloway",        borough: "Islington", lat: 51.5523, lng: -0.1109, zones: [2],    character: "diverse-mixed",   rent: [1500, 1950], station: "Holloway Road",   lines: ["Piccadilly"] },
  { slug: "archway",         name: "Archway",         borough: "Islington", lat: 51.5654, lng: -0.1351, zones: [2, 3], character: "diverse-mixed",   rent: [1500, 1950], station: "Archway",         lines: ["Northern"] },
  { slug: "muswell-hill",    name: "Muswell Hill",    borough: "Haringey",  lat: 51.5933, lng: -0.1453, zones: [3],    character: "leafy-suburban",  rent: [1500, 2000], station: "Muswell Hill (bus)", lines: ["National Rail (Alexandra Palace)"] },
  { slug: "wood-green",      name: "Wood Green",      borough: "Haringey",  lat: 51.5970, lng: -0.1109, zones: [3],    character: "transit-hub",     rent: [1350, 1750], station: "Wood Green",      lines: ["Piccadilly"] },
  { slug: "tottenham",       name: "Tottenham",       borough: "Haringey",  lat: 51.5882, lng: -0.0691, zones: [3],    character: "outer-affordable",rent: [1250, 1650], station: "Tottenham Hale",  lines: ["Victoria", "National Rail"] },
  { slug: "finchley",        name: "Finchley",        borough: "Barnet",    lat: 51.5984, lng: -0.1922, zones: [3, 4], character: "leafy-suburban",  rent: [1500, 1950], station: "Finchley Central",lines: ["Northern"] },
  { slug: "hendon",          name: "Hendon",          borough: "Barnet",    lat: 51.5837, lng: -0.2261, zones: [3, 4], character: "outer-affordable",rent: [1400, 1850], station: "Hendon Central",  lines: ["Northern"] },
  { slug: "golders-green",   name: "Golders Green",   borough: "Barnet",    lat: 51.5722, lng: -0.1942, zones: [3],    character: "leafy-suburban",  rent: [1600, 2100], station: "Golders Green",   lines: ["Northern"] },
  { slug: "kilburn",         name: "Kilburn",         borough: "Brent",     lat: 51.5470, lng: -0.2046, zones: [2],    character: "diverse-mixed",   rent: [1500, 1950], station: "Kilburn",         lines: ["Jubilee", "Overground"] },
  { slug: "enfield-town",    name: "Enfield Town",    borough: "Enfield",   lat: 51.6523, lng: -0.0808, zones: [5],    character: "outer-affordable",rent: [1250, 1650], station: "Enfield Town",    lines: ["Overground"] },
  { slug: "harrow",          name: "Harrow",          borough: "Harrow",    lat: 51.5793, lng: -0.3366, zones: [5],    character: "transit-hub",     rent: [1350, 1750], station: "Harrow-on-the-Hill", lines: ["Metropolitan", "National Rail"] },
  { slug: "swiss-cottage",   name: "Swiss Cottage",   borough: "Camden",    lat: 51.5435, lng: -0.1747, zones: [2],    character: "polished-pro",    rent: [1900, 2500], station: "Swiss Cottage",   lines: ["Jubilee"] },
  { slug: "cricklewood",     name: "Cricklewood",     borough: "Brent",     lat: 51.5572, lng: -0.2118, zones: [2, 3], character: "outer-affordable",rent: [1400, 1800], station: "Cricklewood",     lines: ["Thameslink"] },

  // ── EAST ─────────────────────────────────────────────────────────
  { slug: "bow",             name: "Bow",             borough: "Tower Hamlets", lat: 51.5277, lng: -0.0260, zones: [2, 3], character: "newbuild-corporate", rent: [1500, 1950], station: "Bow Road",       lines: ["District", "Hammersmith & City"] },
  { slug: "whitechapel",     name: "Whitechapel",     borough: "Tower Hamlets", lat: 51.5177, lng: -0.0599, zones: [2],    character: "diverse-mixed",      rent: [1700, 2150], station: "Whitechapel",    lines: ["Elizabeth", "Overground", "Hammersmith & City"] },
  { slug: "aldgate",         name: "Aldgate",         borough: "City of London",lat: 51.5142, lng: -0.0758, zones: [1],    character: "urban-busy",         rent: [2100, 2800], station: "Aldgate East",   lines: ["District", "Hammersmith & City"] },
  { slug: "hoxton",          name: "Hoxton",          borough: "Hackney",       lat: 51.5331, lng: -0.0817, zones: [1, 2], character: "trendy-creative",    rent: [1900, 2500], station: "Hoxton",         lines: ["Overground"] },
  { slug: "leyton",          name: "Leyton",          borough: "Waltham Forest",lat: 51.5567, lng: -0.0118, zones: [3],    character: "outer-affordable",   rent: [1350, 1750], station: "Leyton",         lines: ["Central"] },
  { slug: "forest-gate",     name: "Forest Gate",     borough: "Newham",        lat: 51.5499, lng:  0.0244, zones: [3],    character: "diverse-mixed",      rent: [1300, 1700], station: "Forest Gate",    lines: ["Elizabeth"] },
  { slug: "barking",         name: "Barking",         borough: "Barking and Dagenham", lat: 51.5394, lng: 0.0810, zones: [4], character: "transit-hub", rent: [1250, 1650], station: "Barking", lines: ["District", "Hammersmith & City", "Overground", "National Rail"] },
  { slug: "ilford",          name: "Ilford",          borough: "Redbridge",     lat: 51.5588, lng:  0.0718, zones: [4],    character: "diverse-mixed",      rent: [1300, 1700], station: "Ilford",         lines: ["Elizabeth"] },
  { slug: "romford",         name: "Romford",         borough: "Havering",      lat: 51.5768, lng:  0.1827, zones: [6],    character: "outer-affordable",   rent: [1200, 1600], station: "Romford",        lines: ["Elizabeth", "National Rail"] },
  { slug: "mile-end",        name: "Mile End",        borough: "Tower Hamlets", lat: 51.5251, lng: -0.0337, zones: [2],    character: "diverse-mixed",      rent: [1500, 1950], station: "Mile End",       lines: ["Central", "District", "Hammersmith & City"] },
  { slug: "wapping",         name: "Wapping",         borough: "Tower Hamlets", lat: 51.5043, lng: -0.0560, zones: [2],    character: "newbuild-corporate", rent: [1850, 2450], station: "Wapping",        lines: ["Overground"] },
  { slug: "hackney-wick",    name: "Hackney Wick",    borough: "Hackney",       lat: 51.5440, lng: -0.0245, zones: [2, 3], character: "trendy-creative",    rent: [1550, 2000], station: "Hackney Wick",   lines: ["Overground"] },

  // ── SOUTH ────────────────────────────────────────────────────────
  { slug: "balham",          name: "Balham",          borough: "Wandsworth", lat: 51.4435, lng: -0.1525, zones: [3],    character: "polished-pro",     rent: [1600, 2100], station: "Balham",         lines: ["Northern", "National Rail"] },
  { slug: "borough",         name: "Borough",         borough: "Southwark",  lat: 51.5012, lng: -0.0942, zones: [1],    character: "urban-busy",       rent: [2050, 2700], station: "Borough",        lines: ["Northern"] },
  { slug: "elephant-castle", name: "Elephant & Castle",borough: "Southwark", lat: 51.4937, lng: -0.1000, zones: [1, 2], character: "newbuild-corporate",rent: [1800, 2300], station: "Elephant & Castle",lines: ["Northern", "Bakerloo", "National Rail"] },
  { slug: "camberwell",      name: "Camberwell",      borough: "Southwark",  lat: 51.4753, lng: -0.0926, zones: [2],    character: "diverse-mixed",    rent: [1500, 1950], station: "Denmark Hill",   lines: ["Overground", "Thameslink"] },
  { slug: "herne-hill",      name: "Herne Hill",      borough: "Lambeth",    lat: 51.4530, lng: -0.1024, zones: [2, 3], character: "leafy-suburban",   rent: [1600, 2050], station: "Herne Hill",     lines: ["Thameslink"] },
  { slug: "east-dulwich",    name: "East Dulwich",    borough: "Southwark",  lat: 51.4625, lng: -0.0825, zones: [2],    character: "leafy-suburban",   rent: [1650, 2150], station: "East Dulwich",   lines: ["National Rail"] },
  { slug: "streatham",       name: "Streatham",       borough: "Lambeth",    lat: 51.4274, lng: -0.1232, zones: [3],    character: "outer-affordable", rent: [1400, 1850], station: "Streatham",      lines: ["National Rail"] },
  { slug: "stockwell",       name: "Stockwell",       borough: "Lambeth",    lat: 51.4720, lng: -0.1226, zones: [2],    character: "diverse-mixed",    rent: [1600, 2050], station: "Stockwell",      lines: ["Northern", "Victoria"] },
  { slug: "vauxhall",        name: "Vauxhall",        borough: "Lambeth",    lat: 51.4861, lng: -0.1230, zones: [1, 2], character: "newbuild-corporate",rent: [1950, 2600], station: "Vauxhall",       lines: ["Victoria", "National Rail"] },
  { slug: "kennington",      name: "Kennington",      borough: "Lambeth",    lat: 51.4881, lng: -0.1132, zones: [1, 2], character: "polished-pro",     rent: [1900, 2500], station: "Kennington",     lines: ["Northern"] },
  { slug: "new-cross",       name: "New Cross",       borough: "Lewisham",   lat: 51.4762, lng: -0.0325, zones: [2],    character: "diverse-mixed",    rent: [1400, 1800], station: "New Cross",      lines: ["Overground"] },
  { slug: "deptford",        name: "Deptford",        borough: "Lewisham",   lat: 51.4795, lng: -0.0257, zones: [2],    character: "trendy-creative",  rent: [1450, 1850], station: "Deptford",       lines: ["National Rail"] },
  { slug: "lewisham",        name: "Lewisham",        borough: "Lewisham",   lat: 51.4625, lng: -0.0118, zones: [2, 3], character: "transit-hub",      rent: [1450, 1850], station: "Lewisham",       lines: ["DLR", "National Rail"] },
  { slug: "catford",         name: "Catford",         borough: "Lewisham",   lat: 51.4452, lng: -0.0223, zones: [3],    character: "outer-affordable", rent: [1300, 1700], station: "Catford",        lines: ["National Rail"] },
  { slug: "blackheath",      name: "Blackheath",      borough: "Lewisham",   lat: 51.4651, lng:  0.0098, zones: [3],    character: "village-quiet",    rent: [1700, 2200], station: "Blackheath",     lines: ["National Rail"] },
  { slug: "forest-hill",     name: "Forest Hill",     borough: "Lewisham",   lat: 51.4391, lng: -0.0530, zones: [3],    character: "leafy-suburban",   rent: [1500, 1950], station: "Forest Hill",    lines: ["Overground"] },
  { slug: "crystal-palace",  name: "Crystal Palace",  borough: "Bromley",    lat: 51.4216, lng: -0.0758, zones: [3, 4], character: "leafy-suburban",   rent: [1450, 1900], station: "Crystal Palace", lines: ["Overground", "National Rail"] },
  { slug: "bexleyheath",     name: "Bexleyheath",     borough: "Bexley",     lat: 51.4569, lng:  0.1505, zones: [5],    character: "outer-affordable", rent: [1250, 1650], station: "Bexleyheath",    lines: ["National Rail"] },
  { slug: "croydon",         name: "Croydon",         borough: "Croydon",    lat: 51.3762, lng: -0.0982, zones: [5],    character: "transit-hub",      rent: [1350, 1750], station: "East Croydon",   lines: ["National Rail", "Tramlink"] },
  { slug: "earlsfield",      name: "Earlsfield",      borough: "Wandsworth", lat: 51.4427, lng: -0.1873, zones: [3],    character: "polished-pro",     rent: [1600, 2050], station: "Earlsfield",     lines: ["National Rail"] },
  { slug: "kingston",        name: "Kingston",        borough: "Kingston upon Thames", lat: 51.4123, lng: -0.3007, zones: [6], character: "leafy-suburban", rent: [1450, 1900], station: "Kingston", lines: ["National Rail"] },
  { slug: "sutton",          name: "Sutton",          borough: "Sutton",     lat: 51.3618, lng: -0.1945, zones: [5],    character: "outer-affordable", rent: [1250, 1650], station: "Sutton",         lines: ["National Rail"] },
  { slug: "barnes",          name: "Barnes",          borough: "Richmond upon Thames", lat: 51.4779, lng: -0.2447, zones: [3], character: "village-quiet", rent: [1800, 2400], station: "Barnes", lines: ["National Rail"] },
  { slug: "richmond",        name: "Richmond",        borough: "Richmond upon Thames", lat: 51.4613, lng: -0.3037, zones: [4], character: "village-quiet", rent: [1700, 2250], station: "Richmond", lines: ["District", "Overground", "National Rail"] },
  { slug: "twickenham",      name: "Twickenham",      borough: "Richmond upon Thames", lat: 51.4476, lng: -0.3372, zones: [5], character: "leafy-suburban", rent: [1500, 1950], station: "Twickenham", lines: ["National Rail"] },

  // ── WEST ─────────────────────────────────────────────────────────
  { slug: "notting-hill",    name: "Notting Hill",    borough: "Kensington & Chelsea", lat: 51.5090, lng: -0.1971, zones: [1, 2], character: "central-elite", rent: [2200, 2900], station: "Notting Hill Gate", lines: ["Central", "Circle", "District"] },
  { slug: "kensington",      name: "Kensington",      borough: "Kensington & Chelsea", lat: 51.5018, lng: -0.1925, zones: [1],    character: "central-elite", rent: [2400, 3100], station: "High Street Kensington", lines: ["Circle", "District"] },
  { slug: "fulham",          name: "Fulham",          borough: "Hammersmith & Fulham", lat: 51.4828, lng: -0.1949, zones: [2],    character: "polished-pro",  rent: [1950, 2600], station: "Fulham Broadway",  lines: ["District"] },
  { slug: "chiswick",        name: "Chiswick",        borough: "Hounslow",            lat: 51.4925, lng: -0.2606, zones: [3],    character: "polished-pro",  rent: [1800, 2400], station: "Turnham Green",    lines: ["District", "Piccadilly"] },
  { slug: "uxbridge",        name: "Uxbridge",        borough: "Hillingdon",          lat: 51.5463, lng: -0.4786, zones: [6],    character: "outer-affordable", rent: [1250, 1650], station: "Uxbridge",      lines: ["Metropolitan", "Piccadilly"] },
  { slug: "chelsea",         name: "Chelsea",         borough: "Kensington & Chelsea", lat: 51.4875, lng: -0.1687, zones: [1],    character: "central-elite", rent: [2400, 3200], station: "Sloane Square",    lines: ["Circle", "District"] },
  { slug: "pimlico",         name: "Pimlico",         borough: "Westminster",          lat: 51.4895, lng: -0.1340, zones: [1],    character: "polished-pro",  rent: [2100, 2750], station: "Pimlico",          lines: ["Victoria"] },
  { slug: "bayswater",       name: "Bayswater",       borough: "Westminster",          lat: 51.5114, lng: -0.1880, zones: [1],    character: "urban-busy",    rent: [2050, 2700], station: "Bayswater",        lines: ["Circle", "District"] },
  { slug: "maida-vale",      name: "Maida Vale",      borough: "Westminster",          lat: 51.5295, lng: -0.1858, zones: [2],    character: "polished-pro",  rent: [1950, 2550], station: "Maida Vale",       lines: ["Bakerloo"] },
  { slug: "holland-park",    name: "Holland Park",    borough: "Kensington & Chelsea", lat: 51.5070, lng: -0.2055, zones: [1, 2], character: "central-elite", rent: [2300, 3000], station: "Holland Park",     lines: ["Central"] },

  // ── CENTRAL (residential pockets) ────────────────────────────────
  { slug: "soho",            name: "Soho",            borough: "Westminster",  lat: 51.5137, lng: -0.1325, zones: [1], character: "urban-busy",     rent: [2200, 2900], station: "Tottenham Court Road", lines: ["Central", "Northern", "Elizabeth"] },
  { slug: "fitzrovia",       name: "Fitzrovia",       borough: "Camden",       lat: 51.5193, lng: -0.1357, zones: [1], character: "urban-busy",     rent: [2150, 2800], station: "Goodge Street",        lines: ["Northern"] },
  { slug: "bloomsbury",      name: "Bloomsbury",      borough: "Camden",       lat: 51.5215, lng: -0.1268, zones: [1], character: "polished-pro",   rent: [2100, 2750], station: "Russell Square",       lines: ["Piccadilly"] },
  { slug: "mayfair",         name: "Mayfair",         borough: "Westminster",  lat: 51.5099, lng: -0.1485, zones: [1], character: "central-elite",  rent: [2600, 3500], station: "Green Park",           lines: ["Jubilee", "Piccadilly", "Victoria"] },
  { slug: "marylebone-area", name: "Marylebone Village",borough: "Westminster",lat: 51.5187, lng: -0.1505, zones: [1], character: "polished-pro",   rent: [2200, 2900], station: "Bond Street",          lines: ["Central", "Jubilee", "Elizabeth"] },
  { slug: "covent-garden",   name: "Covent Garden",   borough: "Westminster",  lat: 51.5117, lng: -0.1240, zones: [1], character: "urban-busy",     rent: [2200, 2900], station: "Covent Garden",        lines: ["Piccadilly"] },
];

/* ────────────────────────────────────────────────────────────────────
 * Character defaults used only as a baseline before per-area launch tuning.
 * ──────────────────────────────────────────────────────────────────── */

const CHARACTER_LIFESTYLE: Record<Character, LifestyleScores> = {
  "central-elite":      { livelyVsQuiet: 8, greenSpace: 6, nightlife: 8, cafeDensity: 9, gymDensity: 9, walkability: 9, foodScene: 9, youngProfessionalDensity: 7, safety: 8, connectivity: 9 },
  "trendy-creative":    { livelyVsQuiet: 9, greenSpace: 4, nightlife: 9, cafeDensity: 9, gymDensity: 6, walkability: 8, foodScene: 9, youngProfessionalDensity: 9, safety: 6, connectivity: 7 },
  "urban-busy":         { livelyVsQuiet: 9, greenSpace: 5, nightlife: 8, cafeDensity: 8, gymDensity: 7, walkability: 8, foodScene: 9, youngProfessionalDensity: 8, safety: 6, connectivity: 8 },
  "polished-pro":       { livelyVsQuiet: 7, greenSpace: 7, nightlife: 7, cafeDensity: 8, gymDensity: 8, walkability: 8, foodScene: 8, youngProfessionalDensity: 9, safety: 7, connectivity: 8 },
  "leafy-suburban":     { livelyVsQuiet: 4, greenSpace: 8, nightlife: 4, cafeDensity: 7, gymDensity: 6, walkability: 7, foodScene: 6, youngProfessionalDensity: 6, safety: 8, connectivity: 6 },
  "village-quiet":      { livelyVsQuiet: 3, greenSpace: 9, nightlife: 4, cafeDensity: 8, gymDensity: 6, walkability: 8, foodScene: 7, youngProfessionalDensity: 5, safety: 9, connectivity: 6 },
  "newbuild-corporate": { livelyVsQuiet: 6, greenSpace: 7, nightlife: 5, cafeDensity: 7, gymDensity: 9, walkability: 7, foodScene: 6, youngProfessionalDensity: 8, safety: 8, connectivity: 8 },
  "diverse-mixed":      { livelyVsQuiet: 7, greenSpace: 6, nightlife: 6, cafeDensity: 7, gymDensity: 5, walkability: 7, foodScene: 9, youngProfessionalDensity: 6, safety: 6, connectivity: 7 },
  "transit-hub":        { livelyVsQuiet: 6, greenSpace: 6, nightlife: 5, cafeDensity: 6, gymDensity: 7, walkability: 7, foodScene: 6, youngProfessionalDensity: 7, safety: 7, connectivity: 9 },
  "outer-affordable":   { livelyVsQuiet: 4, greenSpace: 7, nightlife: 4, cafeDensity: 5, gymDensity: 5, walkability: 6, foodScene: 5, youngProfessionalDensity: 5, safety: 7, connectivity: 6 },
};

export const CHARACTER_SUMMARY: Record<Character, string> = {
  "central-elite":      "Polished, expensive and central. Heritage architecture, top-tier dining, easy walks everywhere.",
  "trendy-creative":    "Bars, galleries and indie food. Loud, young, increasingly pricey.",
  "urban-busy":         "Crowded, lively, full of things to do. Less restful, more interesting.",
  "polished-pro":       "Young-professional staple. Brunch, gyms, well-kept streets, fast central commute.",
  "leafy-suburban":     "Calmer, greener, family-leaning. Trades night-time energy for a quiet evening.",
  "village-quiet":      "Village-feel London — green, safe, expensive. Slow Saturdays, no nightlife.",
  "newbuild-corporate": "Newer flats, lots of glass and gyms. Polished but less character than older areas.",
  "diverse-mixed":      "Mixed and lively. Strong food scene, busy high streets, real London energy.",
  "transit-hub":        "Built around the station — well-connected, functional, fast to anywhere.",
  "outer-affordable":   "Cheaper, quieter, further out. Worth it if your commute makes it work.",
};

export const CHARACTER_STRENGTHS: Record<Character, string[]> = {
  "central-elite":      ["Walkable central location", "World-class shopping and dining", "Top-quality housing stock"],
  "trendy-creative":    ["Excellent food and nightlife", "Creative, independent retail", "Young, social crowd"],
  "urban-busy":         ["Everything within walking distance", "Strong food and drink scene", "Fast central transport"],
  "polished-pro":       ["Young professional community", "Good gyms and brunch spots", "Reliable transport"],
  "leafy-suburban":     ["Green spaces nearby", "Quieter, calmer evenings", "Better value for space"],
  "village-quiet":      ["Village character and architecture", "Big green spaces close by", "Safe and well-kept"],
  "newbuild-corporate": ["Modern flats with amenities", "Strong transport connections", "Polished public spaces"],
  "diverse-mixed":      ["Diverse, interesting food", "Vibrant high street", "Lower rent than central"],
  "transit-hub":        ["Outstanding transit options", "Fast journeys to multiple central destinations", "Functional, no-fuss area"],
  "outer-affordable":   ["Cheaper rent for the postcode", "More space for the money", "Quieter residential streets"],
};

export const CHARACTER_TRADEOFFS: Record<Character, string[]> = {
  "central-elite":      ["Very expensive", "Tourist-heavy in places", "Limited green space"],
  "trendy-creative":    ["Noisy at night", "Rents rising fast", "Few real services beyond bars and food"],
  "urban-busy":         ["Crowded", "Limited residential character", "Loud at all hours"],
  "polished-pro":       ["Can feel cliquey", "Pricey for what you get", "Limited diversity"],
  "leafy-suburban":     ["Quieter evenings", "Slower commute to East/City", "Less of a food scene"],
  "village-quiet":      ["Expensive", "Quiet at night", "Limited nightlife and food"],
  "newbuild-corporate": ["Less character", "Limited independent retail", "Can feel anonymous"],
  "diverse-mixed":      ["Patchy high street quality", "Variable street feel", "Crime rates above average in places"],
  "transit-hub":        ["Limited residential charm", "Often busy and impersonal"],
  "outer-affordable":   ["Slower commutes", "Fewer amenities", "Quieter evening scene"],
};

/* ────────────────────────────────────────────────────────────────────
 * Per-area launch profile lookup.
 * ──────────────────────────────────────────────────────────────────── */

type AreaProfile = {
  summary: string;
  strengths: string[];
  tradeoffs: string[];
  lifestyle: Partial<LifestyleScores>;
};

const AREA_PROFILES: Record<string, AreaProfile> = {
  "hampstead": {
    summary: "Old pubs, steep village lanes and the Heath at the top of the hill — and, predictably, some of the highest rents outside Zone 1.",
    strengths: ["Hampstead Heath on the doorstep", "A proper village centre of cafés and pubs", "Northern line keeps central trips manageable"],
    tradeoffs: ["Dear for both rooms and flats", "Quiet after dark", "Hilly streets and older housing stock"],
    lifestyle: { greenSpace: 10, nightlife: 3, safety: 9, connectivity: 6 },
  },
  "highgate": {
    summary: "A hilltop village of green lanes and handsome houses, wedged between Hampstead Heath, Waterlow Park and a Northern line stop.",
    strengths: ["Green, low-rise residential streets", "The Heath and Waterlow Park on either side", "Village calm that keeps its tube link"],
    tradeoffs: ["Quieter than most young-professional areas", "The climb adds time to the station", "Premium rents for a thin market"],
    lifestyle: { greenSpace: 9, livelyVsQuiet: 3, safety: 9, connectivity: 6 },
  },
  "west-hampstead": {
    summary: "Three stations — Jubilee, Overground and Thameslink — within a couple of minutes of each other, wrapped in a busy, café-lined high street.",
    strengths: ["Three rail and tube options in one spot", "Good cafés, gyms and after-work food", "Ideal for commuting west or central"],
    tradeoffs: ["You pay for being by the stations", "A traffic-heavy high street", "Less green than nearby Hampstead"],
    lifestyle: { connectivity: 9, cafeDensity: 8, youngProfessionalDensity: 9, greenSpace: 6 },
  },
  "belsize-park": {
    summary: "A well-kept, moneyed pocket of mansion blocks between Primrose Hill and Hampstead, quiet by design.",
    strengths: ["Easy reach of Hampstead Heath and Primrose Hill", "Handsome streets and mansion blocks", "Good cafés without Camden's crowds"],
    tradeoffs: ["A lot of money for a quiet night", "The Northern line is the main tube", "Less buzz than Camden next door"],
    lifestyle: { greenSpace: 9, safety: 8, nightlife: 4, cafeDensity: 8 },
  },
  "holloway": {
    summary: "Workaday inner-north London on the Piccadilly line, with Islington's restaurants and bars next door at a lower rent.",
    strengths: ["Islington and Camden within reach for less", "A handy Piccadilly line stop", "Everything you need day to day"],
    tradeoffs: ["The Holloway Road stretch feels rough in parts", "Rougher round the edges than Islington", "Green space isn't the selling point"],
    lifestyle: { walkability: 8, foodScene: 7, safety: 6, connectivity: 7 },
  },
  "archway": {
    summary: "Northern line value at the foot of Highgate Hill — the same green on your doorstep, minus the Highgate price tag.",
    strengths: ["Northern line straight to the West End and City", "The Heath and Waterlow Park close by", "Cheaper than Highgate or Kentish Town"],
    tradeoffs: ["A big traffic junction dominates the centre", "Low-key after dark", "Some steep walks home"],
    lifestyle: { greenSpace: 8, connectivity: 7, nightlife: 4, walkability: 7 },
  },
  "muswell-hill": {
    summary: "A genuinely leafy hilltop village with Alexandra Palace on its edge — you swap the tube for space and quiet.",
    strengths: ["Alexandra Palace and good local parks", "Strong independent shops and cafés", "Calm, green residential streets"],
    tradeoffs: ["No tube in the neighbourhood", "Most commutes start with a bus or rail leg", "Quiet for nightlife"],
    lifestyle: { greenSpace: 9, nightlife: 3, safety: 8, connectivity: 4 },
  },
  "wood-green": {
    summary: "A busy Piccadilly line town centre with big shops and lower rents — more functional than the villages up the hill.",
    strengths: ["Straight onto the Piccadilly line", "Big-name retail and everyday errands sorted", "Cheaper than Crouch End or Highgate nearby"],
    tradeoffs: ["A busy, shopping-centre kind of core", "Short on the charm of its neighbours", "Evenings are functional rather than fun"],
    lifestyle: { connectivity: 8, walkability: 7, safety: 6, cafeDensity: 5 },
  },
  "tottenham": {
    summary: "A fast Victoria line out of Tottenham Hale, low rents, and a high street mid-change — improving, but still uneven from one street to the next.",
    strengths: ["Victoria line and rail from Tottenham Hale", "Among the better-value north London options", "A growing scene of food, breweries and local projects"],
    tradeoffs: ["Changes character street by street", "Rougher public spaces", "The commute lives and dies by how close you are to the station"],
    lifestyle: { connectivity: 8, youngProfessionalDensity: 6, safety: 5, foodScene: 6 },
  },
  "finchley": {
    summary: "Suburban north London where the Northern line buys you more space and a slower pace than anywhere further in.",
    strengths: ["Northern line straight through the centre", "More room for your money", "Calm residential streets"],
    tradeoffs: ["Little on offer late at night", "A thin café and bar scene", "Zone 3/4 fares add up"],
    lifestyle: { greenSpace: 8, livelyVsQuiet: 3, safety: 8, connectivity: 6 },
  },
  "hendon": {
    summary: "Outer-north value on the Northern line, with Middlesex University nearby and amenities built for use rather than show.",
    strengths: ["Affordable for north-west London", "Northern line into the centre", "Solid everyday shops and restaurants"],
    tradeoffs: ["A long way from east and south London", "Little nightlife", "Big roads make it feel car-first"],
    lifestyle: { connectivity: 6, safety: 7, cafeDensity: 5, nightlife: 3 },
  },
  "golders-green": {
    summary: "A settled, well-connected residential quarter near the Heath extension, known for its food and its early nights.",
    strengths: ["Northern line plus coach connections", "A strong local restaurant scene", "The Hampstead Heath extension nearby"],
    tradeoffs: ["Not a night-out sort of place", "Rents climb near the station", "More family than social"],
    lifestyle: { foodScene: 8, greenSpace: 8, nightlife: 3, safety: 8 },
  },
  "kilburn": {
    summary: "A long, diverse, hectic north-west high street on the Jubilee and Overground — noticeably cheaper than the smart Hampstead pockets nearby.",
    strengths: ["Jubilee line handy for central and Canary Wharf", "Better value than nearby NW areas", "Diverse food and lively pubs"],
    tradeoffs: ["The high street can feel frantic", "Quality jumps around block to block", "Rougher than West Hampstead"],
    lifestyle: { connectivity: 8, foodScene: 8, safety: 6, livelyVsQuiet: 7 },
  },
  "enfield-town": {
    summary: "A proper market town at London's northern edge — Overground links, low rents, and a pace to match.",
    strengths: ["Plenty of space for the money", "A full town-centre offer", "Quieter than inner north London"],
    tradeoffs: ["A long run into the centre", "Fewer young professionals about", "Rail-led, with little tube"],
    lifestyle: { connectivity: 5, safety: 7, nightlife: 3 },
  },
  "harrow": {
    summary: "A north-west hub built on Metropolitan line speed, with big-town shopping and rents well below inner west London.",
    strengths: ["Fast Metropolitan line into town", "A strong town-centre offer", "Better value than Zone 2 west"],
    tradeoffs: ["Outer-zone fares", "Little of the London-village charm", "Limited nightlife"],
    lifestyle: { connectivity: 8, walkability: 7, nightlife: 4, safety: 7 },
  },
  "swiss-cottage": {
    summary: "A polished Jubilee line pocket between St John's Wood, Belsize Park and the Finchley Road shops.",
    strengths: ["Jubilee line strong for central and Canary Wharf", "Regent's Park and Hampstead close by", "Quiet, professional housing stock"],
    tradeoffs: ["Dear for how little character it has", "A busy road layout at the centre", "Low-key after dark"],
    lifestyle: { connectivity: 8, safety: 8, nightlife: 4, gymDensity: 8 },
  },
  "cricklewood": {
    summary: "A practical, in-between north-west option — Thameslink out of the centre, low rents, and the Brent Cross regeneration reshaping its edges.",
    strengths: ["West Hampstead nearby for less", "Thameslink connections", "Everyday shops and local restaurants"],
    tradeoffs: ["A scruffier streetscape", "You live by the train timetable, not the tube", "Limited nightlife"],
    lifestyle: { connectivity: 6, foodScene: 6, safety: 6, nightlife: 3 },
  },
  "bow": {
    summary: "East London value in reach of Mile End, Victoria Park and the canals, with quick District and Hammersmith & City links.",
    strengths: ["Victoria Park and the canals close by", "Handy east-west tube lines", "Cheaper than Hackney or the Canary Wharf fringe"],
    tradeoffs: ["Big roads slice through in places", "A middling night-out scene", "Some streets still in transition"],
    lifestyle: { greenSpace: 8, connectivity: 8, foodScene: 6, safety: 6 },
  },
  "whitechapel": {
    summary: "East-central and ultra-connected since the Elizabeth line arrived, with a food scene to match its constant bustle.",
    strengths: ["Elizabeth line plus Overground and tube", "Superb Bangladeshi and wider food", "Minutes from the City and Canary Wharf"],
    tradeoffs: ["Hospital and market traffic all day", "Shifts quickly from one street to the next", "Never a quiet option"],
    lifestyle: { connectivity: 10, foodScene: 9, livelyVsQuiet: 8, safety: 5 },
  },
  "aldgate": {
    summary: "City-fringe living for people who want to walk to a finance desk and still have Spitalfields and Shoreditch on the other side.",
    strengths: ["Walkable to the City", "Strong food and after-work drinks", "First-rate central transport"],
    tradeoffs: ["Very expensive", "Short on residential comfort", "Tourist and office crowds"],
    lifestyle: { connectivity: 9, walkability: 9, youngProfessionalDensity: 9, greenSpace: 4 },
  },
  "hoxton": {
    summary: "Bars, studios and Columbia Road round the corner give Hoxton its creative streak, with the Overground doing the commuting.",
    strengths: ["Strong nightlife and independent food", "Shoreditch and Columbia Road on your doorstep", "A young, social crowd"],
    tradeoffs: ["No tube in the immediate area", "Loud at weekends", "No longer a cheap postcode"],
    lifestyle: { nightlife: 9, cafeDensity: 9, greenSpace: 4, safety: 6 },
  },
  "leyton": {
    summary: "Central line affordability with the Olympic Park and Hackney Marshes nearby, and a café-and-pub scene finding its feet.",
    strengths: ["Central line into the City and West End", "Olympic Park and Hackney Marshes close by", "Cheaper than Hackney or Walthamstow"],
    tradeoffs: ["A high street still coming together", "Lean too far from the Central line and the commute suffers", "Rougher than the villages nearby"],
    lifestyle: { connectivity: 7, greenSpace: 8, cafeDensity: 6, youngProfessionalDensity: 6 },
  },
  "forest-gate": {
    summary: "The Elizabeth line, open grass at Wanstead Flats, and a diverse high street — east London at a friendlier rent.",
    strengths: ["The Elizabeth line is a real commute upgrade", "Wanstead Flats on the doorstep", "Good value for east London"],
    tradeoffs: ["Quiet in the evenings", "Fewer amenities than Hackney", "Streets vary in feel"],
    lifestyle: { connectivity: 8, greenSpace: 8, foodScene: 7, nightlife: 4 },
  },
  "barking": {
    summary: "A big east London interchange with some of the lowest rents around and a town centre built for getting things done.",
    strengths: ["District, Hammersmith & City, Overground and rail", "Among the cheapest rents on the map", "A large everyday retail offer"],
    tradeoffs: ["An outer-zone feel", "Short on lifestyle polish", "A long way to west London"],
    lifestyle: { connectivity: 8, safety: 6, cafeDensity: 5 },
  },
  "ilford": {
    summary: "Elizabeth line commuting, a strong South Asian food scene, and lower rents around a busy, workaday town centre.",
    strengths: ["Elizabeth line to central London", "Excellent South Asian food", "Affordable for such a fast rail corridor"],
    tradeoffs: ["A hectic town centre", "Outer-zone fares", "Not much greenery near the station"],
    lifestyle: { connectivity: 8, foodScene: 8, safety: 6, greenSpace: 5 },
  },
  "romford": {
    summary: "Far-east value with Elizabeth line rail, a big shopping centre, and a genuine night out — rare for an outer suburb.",
    strengths: ["Elizabeth line and rail access", "Among the lowest rents on the map", "Big shopping and a real evening economy"],
    tradeoffs: ["A longer haul to central and west London", "Feels a step apart from inner London", "Car-led round the edges"],
    lifestyle: { connectivity: 7, nightlife: 6, safety: 6, youngProfessionalDensity: 5 },
  },
  "mile-end": {
    summary: "A handy three-line interchange by the canal and Victoria Park, with Queen Mary's students setting the tone nearby.",
    strengths: ["Central, District and Hammersmith & City lines", "Good parks and canal-side walks", "Quick to the City, Stratford and Canary Wharf"],
    tradeoffs: ["Busy roads ring the station", "Student-heavy in parts", "Less smart than the Victoria Park streets next door"],
    lifestyle: { connectivity: 9, greenSpace: 8, foodScene: 7, safety: 6 },
  },
  "wapping": {
    summary: "Cobbled riverside lanes and converted warehouses make Wapping far calmer than most of inner east London, the Overground its lifeline.",
    strengths: ["Thames-side walks", "A low-key residential feel", "Close to the City and Canary Wharf"],
    tradeoffs: ["Little nightlife", "The Overground is your main rail", "Can feel deserted after dark"],
    lifestyle: { greenSpace: 6, nightlife: 3, safety: 8, walkability: 7 },
  },
  "hackney-wick": {
    summary: "Canalside studios, breweries and warehouse parties on the edge of the Olympic Park — scrappy, creative and slowly gentrifying.",
    strengths: ["Superb canal and park access", "Creative venues and breweries", "A young, social crowd"],
    tradeoffs: ["An Overground-led commute", "Patchy transport late at night", "New-build prices have climbed"],
    lifestyle: { nightlife: 8, greenSpace: 8, youngProfessionalDensity: 9, connectivity: 6 },
  },
  "balham": {
    summary: "A dependable south-west base for professionals priced out of Clapham — Northern line, rail, gyms and brunch, with two commons within reach.",
    strengths: ["Tube and rail from one spot", "Plenty of gyms, cafés and pubs", "Clapham and Wandsworth commons close by"],
    tradeoffs: ["Pricey for how far out it is", "Less distinctive than the villages nearby", "Leans heavily on the Northern line"],
    lifestyle: { youngProfessionalDensity: 9, gymDensity: 8, greenSpace: 7, connectivity: 8 },
  },
  "borough": {
    summary: "Central south-bank living wrapped around Borough Market and London Bridge, a short walk from the City — with the price tag to match.",
    strengths: ["Walkable to the City and South Bank", "Some of the best food access in London", "Fast connections in every direction"],
    tradeoffs: ["High rent", "Tourist and office crowds", "Little quiet residential stock"],
    lifestyle: { foodScene: 10, walkability: 9, connectivity: 9, greenSpace: 4 },
  },
  "elephant-castle": {
    summary: "A Zone 1/2 hub mid-rebuild — new towers, three-way tube links, and one of London's best Latin American food scenes.",
    strengths: ["Northern, Bakerloo and rail options", "Fast to Waterloo and the City", "Modern flats and ongoing regeneration"],
    tradeoffs: ["Cranes and big roads dominate", "Still finding its feet as a neighbourhood", "New-build rents can run high"],
    lifestyle: { connectivity: 9, youngProfessionalDensity: 8, safety: 6, foodScene: 8 },
  },
  "camberwell": {
    summary: "Art-school energy, good pubs and a strong food scene, moved around by bus and rail rather than tube.",
    strengths: ["A lively food and pub culture", "Cheaper than neighbouring Dulwich and Brixton", "Denmark Hill rail links"],
    tradeoffs: ["No tube", "Bus times swing with the traffic", "Character shifts quickly street to street"],
    lifestyle: { foodScene: 8, nightlife: 6, connectivity: 5, safety: 6 },
  },
  "herne-hill": {
    summary: "A green, village-like pocket between Brockwell Park and Dulwich — the calm of the suburbs with Brixton a short hop away.",
    strengths: ["Brockwell Park and its lido nearby", "A good Sunday market and cafés", "Calmer than Brixton, but still close"],
    tradeoffs: ["Mostly rail for commuting", "Limited nightlife", "A small rental market"],
    lifestyle: { greenSpace: 9, safety: 8, nightlife: 4, cafeDensity: 7 },
  },
  "east-dulwich": {
    summary: "Leafy and food-led, built around Lordship Lane, with a family-and-professional mix and parks on either side.",
    strengths: ["Strong independent food and pubs", "Peckham Rye and the Dulwich parks nearby", "Attractive residential streets"],
    tradeoffs: ["No tube", "A quiet late-night scene", "High rents for rail-only access"],
    lifestyle: { foodScene: 8, greenSpace: 8, nightlife: 5, connectivity: 5 },
  },
  "streatham": {
    summary: "A long, practical stretch of better-value south London, with two commons close and a choice of rail stations along it.",
    strengths: ["Good space for the money", "Streatham and Tooting commons nearby", "A big, useful high street"],
    tradeoffs: ["No tube", "A traffic-choked main road", "Which station you're near decides your commute"],
    lifestyle: { greenSpace: 8, connectivity: 5, nightlife: 4 },
  },
  "stockwell": {
    summary: "A compact, well-placed interchange between Brixton, Vauxhall and Clapham, with both the Victoria and Northern lines.",
    strengths: ["Victoria and Northern lines together", "A strong position for south and central commutes", "Quieter than Brixton or Clapham"],
    tradeoffs: ["Not much of a destination in itself", "Some busy road edges", "Less green than the commons nearby"],
    lifestyle: { connectivity: 9, walkability: 8, greenSpace: 5, nightlife: 5 },
  },
  "vauxhall": {
    summary: "A riverside transport knot with new-build towers, a famous nightlife pocket, and the Victoria line straight into town.",
    strengths: ["Victoria line and rail interchange", "Walk or cycle to Westminster and the South Bank", "Modern flats and gyms"],
    tradeoffs: ["Roads and junctions rule the centre", "Can feel anonymous", "High prices around the new blocks"],
    lifestyle: { connectivity: 10, gymDensity: 9, nightlife: 6, safety: 6 },
  },
  "kennington": {
    summary: "A calmer Zone 1/2 pocket of Georgian terraces, with the Northern line and easy links to Waterloo and the City.",
    strengths: ["Central, but more residential than Vauxhall", "Both Northern line branches", "Good pubs and handsome streets"],
    tradeoffs: ["Little going on late", "You pay a premium for central calm", "A few road-heavy edges"],
    lifestyle: { connectivity: 8, safety: 8, nightlife: 5, walkability: 8 },
  },
  "new-cross": {
    summary: "Goldsmiths sets the tone: student and music-venue energy on the Overground, at cheaper rents than Peckham up the road.",
    strengths: ["Overground access", "A young, creative, studenty crowd", "Good value for Zone 2"],
    tradeoffs: ["A busy road layout", "Streets that run hot and cold", "Rougher than East Dulwich or Blackheath"],
    lifestyle: { nightlife: 7, youngProfessionalDensity: 7, safety: 5, connectivity: 7 },
  },
  "deptford": {
    summary: "Markets, studios and independent venues give Deptford real character, with fast rail into London Bridge and Greenwich next door.",
    strengths: ["Good food, markets and independent venues", "Quick rail to London Bridge", "Cheaper than neighbouring Greenwich"],
    tradeoffs: ["Streetscape varies a lot", "A rail-led commute", "Nightlife is lively but hit-and-miss"],
    lifestyle: { foodScene: 8, nightlife: 7, connectivity: 6, safety: 6 },
  },
  "lewisham": {
    summary: "A south-east transport hub where the DLR and rail buy fast trips to Canary Wharf and London Bridge for lower rent.",
    strengths: ["DLR and rail connections", "A lot of connectivity for the price", "A full town-centre offer"],
    tradeoffs: ["A busy interchange atmosphere", "Short on village charm", "Public spaces still catching up"],
    lifestyle: { connectivity: 9, walkability: 7, safety: 6, nightlife: 5 },
  },
  "catford": {
    summary: "Better-value south-east London with rail into town, green parks close by, and a town centre slowly finding its direction.",
    strengths: ["Cheaper than many inner south-east areas", "Rail to central London", "Ladywell Fields and Mountsfield Park nearby"],
    tradeoffs: ["A town centre still rough at the edges", "Limited nightlife", "You're tied to the train timetable"],
    lifestyle: { greenSpace: 7, connectivity: 5, safety: 6, cafeDensity: 5 },
  },
  "blackheath": {
    summary: "A handsome village beside its namesake heath, quieter and smarter than neighbouring Greenwich.",
    strengths: ["A huge open heath", "An attractive village centre", "Quiet, well-kept streets"],
    tradeoffs: ["Rail only for commuting", "Dear for south-east London", "Sleepy in the evenings"],
    lifestyle: { greenSpace: 10, safety: 9, nightlife: 3, connectivity: 5 },
  },
  "forest-hill": {
    summary: "Leafy, hilly and on the Overground, with the Horniman Museum and gardens and gentler prices than the Dulwich villages nearby.",
    strengths: ["The Horniman Museum and gardens", "An Overground connection", "Good value for green south-east London"],
    tradeoffs: ["Steep streets", "Slow going to west London", "Limited nightlife"],
    lifestyle: { greenSpace: 8, safety: 8, cafeDensity: 6, connectivity: 6 },
  },
  "crystal-palace": {
    summary: "A hilltop with a big park, a strong independent food scene and a proper village identity — worth the climb and the distance out.",
    strengths: ["Crystal Palace Park", "Good pubs, brunch and independent shops", "Characterful housing stock"],
    tradeoffs: ["Well out from central London", "Rail and Overground times vary", "The hills add friction"],
    lifestyle: { greenSpace: 9, foodScene: 8, nightlife: 5, connectivity: 5 },
  },
  "bexleyheath": {
    summary: "Outer south-east affordability built around a big town centre, with rail links running into central London.",
    strengths: ["Low rents", "A large shopping centre and everyday amenities", "More space for your money"],
    tradeoffs: ["A longer central commute", "Few young professionals about", "A firmly outer-suburban feel"],
    lifestyle: { connectivity: 5, safety: 7, cafeDensity: 5, nightlife: 4 },
  },
  "croydon": {
    summary: "A major south London hub with fast trains, its own tram network and low rents, wrapped around a big, uneven town centre.",
    strengths: ["Very fast rail to London Bridge and Victoria", "A tram network of its own", "A lot of connectivity for the money"],
    tradeoffs: ["A patchy town centre", "Well out geographically", "A mixed high-street experience"],
    lifestyle: { connectivity: 9, nightlife: 6, safety: 5, youngProfessionalDensity: 6 },
  },
  "earlsfield": {
    summary: "A quieter Wandsworth pick with quick rail to Waterloo, good local pubs, and the south-west commons within reach.",
    strengths: ["Fast rail to Waterloo", "Calmer than Clapham", "Good local pubs and gyms"],
    tradeoffs: ["No tube", "Limited nightlife", "Feels dear for rail-only access"],
    lifestyle: { safety: 8, gymDensity: 8, nightlife: 4, connectivity: 6 },
  },
  "kingston": {
    summary: "Thames-side outer south-west London with a strong town centre, river walks and room to breathe — Richmond Park on its doorstep.",
    strengths: ["Big retail and riverside amenities", "Easy reach of Richmond Park and the Thames", "More space than inner south-west London"],
    tradeoffs: ["Longer commute into central London", "Outer-zone travel", "Less useful for east London jobs"],
    lifestyle: { greenSpace: 8, safety: 8, connectivity: 5, nightlife: 5 },
  },
  "sutton": {
    summary: "Outer south London value: low rents, solid rail for the distance, and quiet residential streets.",
    strengths: ["Low rents", "Decent rail for how far out it is", "Calm residential streets"],
    tradeoffs: ["A long way into central London", "Limited nightlife", "Few young professionals about"],
    lifestyle: { safety: 8, connectivity: 5, cafeDensity: 5, nightlife: 3 },
  },
  "barnes": {
    summary: "A riverside village of commons and old pubs, charging a premium for its slow, cut-off west London rhythm.",
    strengths: ["Thames Path and Barnes Common", "Genuine village character", "Quiet, high-quality streets"],
    tradeoffs: ["Expensive", "A rail-only commute", "Barely any nightlife"],
    lifestyle: { greenSpace: 9, safety: 9, nightlife: 2, connectivity: 4 },
  },
  "richmond": {
    summary: "One of London's greenest town centres, where Richmond Park and the Thames meet a rare-for-the-suburbs mix of tube and rail.",
    strengths: ["Richmond Park and the riverside", "District, Overground and rail together", "Strong cafés, pubs and shopping"],
    tradeoffs: ["Expensive", "A long way to east London", "More settled than twenty-something"],
    lifestyle: { greenSpace: 10, safety: 9, connectivity: 7, nightlife: 5 },
  },
  "twickenham": {
    summary: "Outer south-west value by the river — good pubs, riverside walks, and a rugby crowd that descends on match days.",
    strengths: ["Better value than neighbouring Richmond", "Riverside walks", "Handy rail to Waterloo"],
    tradeoffs: ["An outer-zone commute", "Quiet away from event days", "Awkward for east London jobs"],
    lifestyle: { greenSpace: 8, safety: 8, nightlife: 4, connectivity: 5 },
  },
  "notting-hill": {
    summary: "Pastel terraces, Portobello Road and a serious food scene make Notting Hill iconic — and priced accordingly.",
    strengths: ["Central, Circle and District line access", "Superb cafés, restaurants and markets", "Walkable to Hyde Park and Holland Park"],
    tradeoffs: ["Very expensive", "Tourist crowds", "Little space for the money"],
    lifestyle: { cafeDensity: 10, foodScene: 9, safety: 8, greenSpace: 7 },
  },
  "kensington": {
    summary: "Museums, mansion blocks and Hyde Park on the doorstep, at some of the highest rents on the map — prime west London through and through.",
    strengths: ["World-class museums and Hyde Park access", "Beautiful streets and housing stock", "A central-west location"],
    tradeoffs: ["Very expensive", "Less young and social than Notting Hill nearby", "A restrained nightlife"],
    lifestyle: { safety: 9, greenSpace: 8, nightlife: 4, walkability: 9 },
  },
  "fulham": {
    summary: "A polished south-west enclave of gyms, gastropubs and riverside pockets, full of young professionals and reliant on the District line.",
    strengths: ["A big young-professional base", "Good pubs, gyms and brunch", "Riverside and park access"],
    tradeoffs: ["Pricey for a one-line area", "Can feel socially narrow", "The District line can be slow"],
    lifestyle: { youngProfessionalDensity: 9, gymDensity: 9, safety: 8, connectivity: 6 },
  },
  "chiswick": {
    summary: "Leafy, well-to-do west London built around a strong high road, with the Thames close and a calmer family-professional feel.",
    strengths: ["Good cafés, pubs and independent shops", "The Thames and Chiswick House nearby", "District and Piccadilly lines at Turnham Green"],
    tradeoffs: ["Slow to the City and east London", "Quiet nightlife", "Premium west London rents"],
    lifestyle: { greenSpace: 8, safety: 8, nightlife: 4, foodScene: 8 },
  },
  "uxbridge": {
    summary: "Far-west affordability at the end of two tube lines, with a big town centre and a student influence from nearby Brunel.",
    strengths: ["Low rents for west London", "Two tube lines from the terminus", "Big retail and student-driven amenities"],
    tradeoffs: ["A long central commute", "Feels a world apart from inner London", "Outer-zone fares"],
    lifestyle: { connectivity: 6, safety: 7, cafeDensity: 5, youngProfessionalDensity: 5 },
  },
  "chelsea": {
    summary: "King's Road, mansion flats and old money — prime south-west London at rents to match, if not quite the tube links you'd expect.",
    strengths: ["Excellent restaurants and retail", "Walkable to the Thames and Battersea Park", "High-quality streets and housing"],
    tradeoffs: ["Extremely expensive", "Weaker tube access than the price suggests", "Less diverse and youthful than east or south"],
    lifestyle: { foodScene: 9, safety: 9, connectivity: 6, youngProfessionalDensity: 6 },
  },
  "pimlico": {
    summary: "A calm, residential grid of mansion blocks in the heart of Westminster, with the Victoria line for a quick getaway.",
    strengths: ["A fast Victoria line", "Walkable to Victoria, Westminster and the Thames", "Quiet, orderly mansion-block streets"],
    tradeoffs: ["High rent", "Limited nightlife", "Less identity than Chelsea or Vauxhall nearby"],
    lifestyle: { connectivity: 8, safety: 8, nightlife: 4, walkability: 9 },
  },
  "bayswater": {
    summary: "Dense west-central living between Hyde Park, Queensway and Paddington — strong transport and diverse food, wrapped in constant bustle.",
    strengths: ["Hyde Park on the doorstep", "Central, Circle and District lines close by", "Diverse food around Queensway"],
    tradeoffs: ["Tourist and hotel traffic", "An uneven streetscape", "High rent for compact flats"],
    lifestyle: { connectivity: 8, foodScene: 8, greenSpace: 9, safety: 6 },
  },
  "maida-vale": {
    summary: "A quiet west-central retreat of mansion blocks and canal walks around Little Venice, on the Bakerloo line.",
    strengths: ["Calm, attractive streets", "Little Venice and the canals", "Good for Paddington and West End commutes"],
    tradeoffs: ["Leans on the Bakerloo line", "Quiet nightlife", "Dear for how sleepy it is"],
    lifestyle: { greenSpace: 7, safety: 8, nightlife: 3, connectivity: 6 },
  },
  "holland-park": {
    summary: "Prime west London wrapped around one of the city's finest parks — hushed, upscale and expensive.",
    strengths: ["Holland Park on the doorstep", "Beautiful residential streets", "Central line access"],
    tradeoffs: ["Very expensive", "Limited nightlife", "A small rental market"],
    lifestyle: { greenSpace: 10, safety: 9, nightlife: 3, cafeDensity: 7 },
  },
  "soho": {
    summary: "The most intense place to live in central London — peerless nightlife, food and walkability, and almost no quiet at all.",
    strengths: ["Unrivalled nightlife and food density", "Walkable to West End offices", "Elizabeth, Central and Northern lines close by"],
    tradeoffs: ["Extremely expensive", "Noisy deep into the night", "Almost no residential calm"],
    lifestyle: { nightlife: 10, foodScene: 10, walkability: 10, safety: 5 },
  },
  "fitzrovia": {
    summary: "Central, walkable and stacked with restaurants, tucked between Oxford Street, Bloomsbury and Marylebone.",
    strengths: ["Walkable to a swathe of central offices", "Excellent restaurants and cafés", "Quiet side streets with everything on the doorstep"],
    tradeoffs: ["High rent", "Little green space", "A thin rental supply"],
    lifestyle: { walkability: 10, cafeDensity: 10, greenSpace: 4, connectivity: 8 },
  },
  "bloomsbury": {
    summary: "Garden squares, museums and universities give Bloomsbury an academic, central calm, with the Piccadilly line a short walk away.",
    strengths: ["Garden squares and cultural institutions", "Walkable to King's Cross and the West End", "Good cafés and study-friendly streets"],
    tradeoffs: ["Expensive", "Student and tourist pressure", "More civilised than wild after dark"],
    lifestyle: { walkability: 9, safety: 8, nightlife: 5, cafeDensity: 8 },
  },
  "mayfair": {
    summary: "Ultra-prime central London for people who value prestige, luxury and walking distance far above their rent bill.",
    strengths: ["Walkable to the West End, Green Park and Hyde Park", "Top-end restaurants and retail", "Very strong central connectivity"],
    tradeoffs: ["The highest rents on the map", "Poor value for young renters", "Little in the way of everyday neighbourhood life"],
    lifestyle: { safety: 9, foodScene: 9, walkability: 10, youngProfessionalDensity: 5 },
  },
  "marylebone-area": {
    summary: "A polished central village built on Marylebone High Street, with Bond Street shopping close and calmer streets than Soho.",
    strengths: ["Excellent cafés, restaurants and retail", "Central, Jubilee and Elizabeth lines nearby", "Walkable to Regent's Park and the West End"],
    tradeoffs: ["Very expensive", "Small flats at big prices", "A refined rather than lively scene"],
    lifestyle: { cafeDensity: 9, safety: 8, connectivity: 9, nightlife: 5 },
  },
  "covent-garden": {
    summary: "Live in the middle of the West End — theatres and restaurants at the door, tourists year-round, and the Piccadilly line a minute away.",
    strengths: ["Unbeatable theatre and restaurant access", "A very walkable central spot", "Close to several tube lines"],
    tradeoffs: ["Tourist-heavy almost every day", "High rents for little residential calm", "Noisy streets"],
    lifestyle: { nightlife: 9, foodScene: 10, walkability: 10, safety: 6 },
  },
};

function applyLifestyleTuning(
  base: LifestyleScores,
  tuning: Partial<LifestyleScores>,
): LifestyleScores {
  return { ...base, ...tuning };
}

function buildFromCompact(c: CompactEntry): Neighbourhood {
  const profile = AREA_PROFILES[c.slug];
  if (!profile) {
    throw new Error(`Missing launch profile for ${c.slug}`);
  }

  return {
    id: c.slug,
    name: c.name,
    borough: c.borough,
    centroid: { lat: c.lat, lng: c.lng },
    transportZones: c.zones,
    rent: {
      oneBedMedianGbp: c.rent[0],
      twoBedMedianGbp: c.rent[1],
      source: "market_review",
      asOf: MARKET_REVIEW_AS_OF,
    },
    mainStations: [{ name: c.station, lines: c.lines }],
    lifestyle: applyLifestyleTuning(
      CHARACTER_LIFESTYLE[c.character],
      profile.lifestyle,
    ),
    summary: profile.summary,
    strengths: profile.strengths,
    tradeoffs: profile.tradeoffs,
    dataQuality: "sourceBacked",
  };
}

export const NEIGHBOURHOODS: Neighbourhood[] = [
  ...DETAILED,
  ...COMPACT.map(buildFromCompact),
];

export const NEIGHBOURHOODS_BY_ID: Record<string, Neighbourhood> = Object.fromEntries(
  NEIGHBOURHOODS.map((n) => [n.id, n]),
);
