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
    summary: "Loud, scruffy, music-loving and unapologetically touristy on weekends — with Regent's Park and the canal as a quieter counterweight.",
    strengths: ["Excellent food and drink scene", "Famous markets and live music", "Direct Northern line into the City", "Regent's Park on the doorstep"],
    tradeoffs: ["Very busy at weekends", "Pockets feel rough at night", "Rent premium for the postcode"],
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
    summary: "Polished, professional, and well-fed. Upper Street has more restaurants than most postcodes have houses.",
    strengths: ["Strong restaurant and bar scene", "Two fast tube lines to the City", "Lots of young professionals", "Walkable street grid"],
    tradeoffs: ["Expensive", "Limited green space within the postcode itself"],
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
    summary: "Leafy, low-rise village in disguise — popular with creatives and families fleeing the noise of Zones 1 and 2.",
    strengths: ["Genuinely village-like feel", "Parkland Walk and Alexandra Palace nearby", "Strong independent shops and cafés"],
    tradeoffs: ["No tube — overground/rail only", "Quiet evenings can feel isolated", "Slow commute to the City"],
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
    summary: "Independent shops, cafés and Clissold Park give Stokey a slower, family-leaning energy than its Hackney neighbours.",
    strengths: ["Clissold Park", "Independent retail and food", "Strong sense of community"],
    tradeoffs: ["No tube", "Overground gets crowded at peak", "Limited late-night options"],
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
    summary: "An interchange more than a destination — but excellent transport, a large park, and steadily improving food make it quietly underrated.",
    strengths: ["Finsbury Park itself (large green space)", "Three transit lines at one station", "Cheaper than neighbours like Islington"],
    tradeoffs: ["High street is patchy", "Feels transient in places"],
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
    summary: "The unflashy Camden — same Northern line, cheaper rent, fewer tourists.",
    strengths: ["Northern line + Thameslink in one station", "Hampstead Heath a 15-minute walk", "Good pubs"],
    tradeoffs: ["High street is functional rather than charming"],
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
    summary: "The post-2010 East-London archetype — markets, breweries, design studios, and a young creative crowd that never quite went home.",
    strengths: ["Excellent food and nightlife", "Independent shops and galleries", "Easy hop to Shoreditch and Dalston"],
    tradeoffs: ["No tube (overground only)", "Rents climbed fast in the 2020s"],
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
    summary: "Late nights, Turkish grills, and Ridley Road Market. Loud, young, and not especially restful.",
    strengths: ["Best-in-class nightlife", "Diverse food (especially Turkish)", "Overground to most of London"],
    tradeoffs: ["Noisy", "Limited green space", "Can feel oversaturated"],
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
    summary: "Tech, finance and creatives crammed into one postcode. Brilliant for going out, less so for sleeping.",
    strengths: ["Unmatched food, drink and nightlife density", "Walking distance to the City", "Hyper-connected"],
    tradeoffs: ["Very expensive", "Loud at all hours", "Almost no greenery"],
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
    summary: "Central line plus Victoria Park — gives you fast central access without Shoreditch prices.",
    strengths: ["Direct Central line to the City and West End", "Victoria Park", "Cheaper than Shoreditch"],
    tradeoffs: ["Some streets feel rough at night", "Mixed building quality"],
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
    summary: "Olympic legacy regen — high-rises, the largest urban park in Europe, and probably the best-connected station in London.",
    strengths: ["Six rail/tube services", "Queen Elizabeth Olympic Park", "Strong gym/leisure infrastructure"],
    tradeoffs: ["Feels corporate in places", "Limited independent food scene", "Westfield-centric"],
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
    summary: "Surprisingly good value, with a fast Victoria-line tube and the longest street market in Europe.",
    strengths: ["Direct Victoria line into central London", "Significantly cheaper than Zone 2 east", "Lots of green space (Walthamstow Wetlands)"],
    tradeoffs: ["Quiet evenings", "Far from the City by transit"],
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
    summary: "South-London icon — Brixton Village, Electric Avenue, Caribbean food and a long, loud night out.",
    strengths: ["World-class food and music scene", "Direct Victoria line to King's Cross", "Strong character and community"],
    tradeoffs: ["Can feel intense at night", "Rent has risen sharply"],
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
    summary: "The young-professionals-just-out-of-uni capital of London. Common, brunch, gym, rinse, repeat.",
    strengths: ["Big crowd of young professionals", "Clapham Common", "Brilliant rail connections via the Junction"],
    tradeoffs: ["Can feel cliquey and homogenous", "Rowdy on weekends"],
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
    summary: "Frank's Rooftop Bar in summer; everything-else-too in winter. Cheap-ish, creative, increasingly polished.",
    strengths: ["Strong food and nightlife", "Cheaper than its northern counterparts", "Big arts and music scene"],
    tradeoffs: ["No tube", "Higher reported crime than neighbours", "Variable street feel"],
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
    summary: "South Asian food capital of London, plus Tooting Common and Lido. Cheaper than Clapham, with a stronger high street.",
    strengths: ["Outstanding South Asian food", "Tooting Common and the Lido", "Cheaper Zone 3 with direct Northern line"],
    tradeoffs: ["Northern line is the only tube option", "Less of a bar scene"],
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
    summary: "Thames-side, design-led, walking distance to the City. The Bermondsey Beer Mile and warehouse conversions define it.",
    strengths: ["Walk to London Bridge / the City", "Jubilee line", "Thames Path and Maltby Street Market"],
    tradeoffs: ["Limited big green space", "Pricier than south-east neighbours"],
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
    summary: "Royal park, observatory, market, river — the most picturesque corner of London on a Sunday.",
    strengths: ["Greenwich Park and the Royal Observatory", "Riverside walks", "Quick DLR to Canary Wharf"],
    tradeoffs: ["Slower journey to West End", "Quieter evenings"],
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
    summary: "Brand-new high-rises around the Power Station, anchored by Battersea Park on the river. Polished but soulless in places.",
    strengths: ["Battersea Park", "Northern line extension", "Modern flats with gyms and pools"],
    tradeoffs: ["Expensive for the area", "Newbuild feel — limited character", "Limited independent shopping"],
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
    summary: "Suburban, leafy, family-friendly — and home to one of the biggest urban commons in the world.",
    strengths: ["Wimbledon Common", "Safe, quiet streets", "Fast rail into Waterloo"],
    tradeoffs: ["Quiet at night", "Slower journeys to East London"],
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
    summary: "Four tube lines, the river, and quick access to Heathrow. Functional more than charming.",
    strengths: ["Four tube lines from one station", "Thames Path and riverside pubs", "Quick to Heathrow"],
    tradeoffs: ["Town centre feels dated", "Less character than east-London peers"],
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
    summary: "Green, suburban West-London with the Elizabeth line cutting the commute to Paddington and the City.",
    strengths: ["Elizabeth line is transformative", "Big green spaces (Walpole Park, Pitshanger)", "Safer, calmer feel"],
    tradeoffs: ["Sprawly and less walkable", "Quieter than Zone 2"],
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
    summary: "Westfield, the Bush Theatre, and four tube lines. Underrated as a West-end-adjacent base.",
    strengths: ["Central line in 15 min to Oxford Circus", "Big shopping and entertainment", "Multiple transport options"],
    tradeoffs: ["Patchy character outside Westfield", "Traffic-heavy"],
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
    summary: "Suburban West London with multiple stations and improving stock — quietly cheap for the connectivity.",
    strengths: ["Several tube and Overground stations", "Cheaper than neighbouring postcodes", "Big parks"],
    tradeoffs: ["Bland high street", "Limited evening life"],
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
    summary: "River, Richmond Park nearby, and a clean South-West rail line to Waterloo. Slightly older professional crowd than Clapham.",
    strengths: ["Thames Path and rowing on the river", "Easy access to Richmond Park", "Clean residential feel"],
    tradeoffs: ["Pricey", "Slower to East London"],
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
    summary: "Heath-side north London with village streets, old pubs, and some of the highest rents outside Zone 1.",
    strengths: ["Hampstead Heath is the main draw", "Quiet village centre with strong cafes and pubs", "Northern line keeps central commutes manageable"],
    tradeoffs: ["Very expensive for rooms and flats", "Nightlife is limited", "Hilly streets and older housing stock"],
    lifestyle: { greenSpace: 10, nightlife: 3, safety: 9, connectivity: 6 },
  },
  "highgate": {
    summary: "Leafy hilltop living between Hampstead Heath, Waterlow Park, and the Northern line.",
    strengths: ["Green, residential streets", "Good access to the Heath and Waterlow Park", "Village feel without leaving the tube network"],
    tradeoffs: ["Quieter than most young-professional areas", "Hilltop location can add time to station walks", "Premium rents for limited stock"],
    lifestyle: { greenSpace: 9, livelyVsQuiet: 3, safety: 9, connectivity: 6 },
  },
  "west-hampstead": {
    summary: "A polished commuter base with Jubilee, Overground, and Thameslink stations clustered around a busy high street.",
    strengths: ["Three rail/tube options in one place", "Good cafes, gyms, and after-work food", "Strong fit for professionals commuting west or central"],
    tradeoffs: ["Rent premium around the stations", "High street can feel traffic-heavy", "Less green than nearby Hampstead"],
    lifestyle: { connectivity: 9, cafeDensity: 8, youngProfessionalDensity: 9, greenSpace: 6 },
  },
  "belsize-park": {
    summary: "A calmer, well-kept pocket between Primrose Hill and Hampstead, with a residential feel and premium pricing.",
    strengths: ["Excellent access to parks and Hampstead Heath", "Attractive streets and mansion blocks", "Good cafes without Camden-level crowds"],
    tradeoffs: ["High cost for limited nightlife", "Northern line is the main tube option", "Less social energy than nearby Camden"],
    lifestyle: { greenSpace: 9, safety: 8, nightlife: 4, cafeDensity: 8 },
  },
  "holloway": {
    summary: "Practical inner north London with Piccadilly line access, cheaper rents than Islington, and a busy everyday high street.",
    strengths: ["Good value near Islington and Camden", "Useful Piccadilly line connection", "Strong everyday amenities"],
    tradeoffs: ["Patchy street feel around the main road", "Less polished than neighbouring Islington", "Green space is not the headline"],
    lifestyle: { walkability: 8, foodScene: 7, safety: 6, connectivity: 7 },
  },
  "archway": {
    summary: "Northern line value at the foot of Highgate, useful for people who want green access without Highgate prices.",
    strengths: ["Northern line direct to the West End and City", "Close to Hampstead Heath and Waterlow Park", "Better value than Highgate or Kentish Town"],
    tradeoffs: ["Traffic-heavy junction dominates the centre", "Nightlife is modest", "Some walks are steep"],
    lifestyle: { greenSpace: 8, connectivity: 7, nightlife: 4, walkability: 7 },
  },
  "muswell-hill": {
    summary: "A genuinely leafy north London village with Alexandra Palace nearby, trading tube access for calm and space.",
    strengths: ["Alexandra Palace and good local parks", "Strong independent shops and cafes", "Calm residential streets"],
    tradeoffs: ["No tube station in the neighbourhood", "Bus or rail leg usually starts the commute", "Quiet for nightlife"],
    lifestyle: { greenSpace: 9, nightlife: 3, safety: 8, connectivity: 4 },
  },
  "wood-green": {
    summary: "A busy Piccadilly line hub with large shops, lower rents, and a more functional feel than village north London.",
    strengths: ["Piccadilly line access", "Large retail and everyday amenities", "Cheaper than nearby Crouch End or Highgate"],
    tradeoffs: ["Busy town-centre feel", "Less charm than neighbouring areas", "Evening scene is practical rather than polished"],
    lifestyle: { connectivity: 8, walkability: 7, safety: 6, cafeDensity: 5 },
  },
  "tottenham": {
    summary: "Fast Victoria line access at Tottenham Hale, lower rents, and a changing high street with mixed street-by-street feel.",
    strengths: ["Victoria line and rail from Tottenham Hale", "Better affordability for north London", "Improving food, breweries, and local projects"],
    tradeoffs: ["Variable street feel", "Less polished public realm", "Commutes depend heavily on station proximity"],
    lifestyle: { connectivity: 8, youngProfessionalDensity: 6, safety: 5, foodScene: 6 },
  },
  "finchley": {
    summary: "Suburban north London with Northern line access, more space, and a quieter profile than inner-city choices.",
    strengths: ["Northern line through central London", "More room for the money", "Calmer residential streets"],
    tradeoffs: ["Slower late-night social options", "Less dense cafe and nightlife scene", "Zone 3/4 travel adds cost"],
    lifestyle: { greenSpace: 8, livelyVsQuiet: 3, safety: 8, connectivity: 6 },
  },
  "hendon": {
    summary: "Outer-north value with Northern line access, Middlesex University nearby, and practical rather than fashionable amenities.",
    strengths: ["Good affordability for north-west London", "Northern line into central London", "Everyday shops and restaurants"],
    tradeoffs: ["Longer journeys to east and south London", "Less nightlife", "Main roads can feel car-led"],
    lifestyle: { connectivity: 6, safety: 7, cafeDensity: 5, nightlife: 3 },
  },
  "golders-green": {
    summary: "Residential, well-connected, and close to the Heath, with strong local food and a quieter evening rhythm.",
    strengths: ["Northern line and coach connections", "Good local restaurants", "Close to Hampstead Heath extension"],
    tradeoffs: ["Not a nightlife area", "Rents rise near the station", "More family-oriented than social"],
    lifestyle: { foodScene: 8, greenSpace: 8, nightlife: 3, safety: 8 },
  },
  "kilburn": {
    summary: "A diverse, busy north-west high street with Jubilee and Overground access and better value than neighbouring Hampstead pockets.",
    strengths: ["Jubilee line is useful for central and Canary Wharf", "Good value compared with nearby NW areas", "Diverse food and pubs"],
    tradeoffs: ["High street can feel hectic", "Street quality varies block by block", "Less polished than West Hampstead"],
    lifestyle: { connectivity: 8, foodScene: 8, safety: 6, livelyVsQuiet: 7 },
  },
  "enfield-town": {
    summary: "Outer-north market-town living with Overground links, lower rents, and a slower residential feel.",
    strengths: ["Good value for space", "Town-centre amenities", "Quieter streets than inner north London"],
    tradeoffs: ["Longer central commutes", "Less young-professional density", "Mostly rail-led rather than tube-led"],
    lifestyle: { connectivity: 5, safety: 7, nightlife: 3 },
  },
  "harrow": {
    summary: "A west/north-west hub with Metropolitan line speed, broad shopping, and more affordability than inner west London.",
    strengths: ["Fast Metropolitan line to central London", "Strong town-centre amenities", "Better value than Zone 2 west London"],
    tradeoffs: ["Outer-zone commute cost", "Less London village charm", "Nightlife is limited"],
    lifestyle: { connectivity: 8, walkability: 7, nightlife: 4, safety: 7 },
  },
  "swiss-cottage": {
    summary: "A polished Jubilee line pocket between St John's Wood, Belsize Park, and Finchley Road.",
    strengths: ["Jubilee line is strong for central and Canary Wharf", "Close to Regent's Park and Hampstead", "Quiet, professional housing stock"],
    tradeoffs: ["Expensive for the amount of character", "Road layout can feel busy", "Nightlife is low-key"],
    lifestyle: { connectivity: 8, safety: 8, nightlife: 4, gymDensity: 8 },
  },
  "cricklewood": {
    summary: "A practical north-west option with Thameslink access, lower rents, and improving links around Brent Cross.",
    strengths: ["Good value near West Hampstead", "Thameslink access", "Everyday shops and local restaurants"],
    tradeoffs: ["Less polished public realm", "Rail frequency matters more than tube access", "Limited nightlife"],
    lifestyle: { connectivity: 6, foodScene: 6, safety: 6, nightlife: 3 },
  },
  "bow": {
    summary: "East London value near Mile End, Victoria Park, canals, and quick District/Hammersmith & City links.",
    strengths: ["Good access to Victoria Park and the canals", "Useful east-west tube lines", "Better value than Hackney or Canary Wharf-adjacent areas"],
    tradeoffs: ["Main roads cut through parts of the area", "Nightlife is moderate", "Some streets feel transitional"],
    lifestyle: { greenSpace: 8, connectivity: 8, foodScene: 6, safety: 6 },
  },
  "whitechapel": {
    summary: "An ultra-connected east-central area with Elizabeth line access, strong food, and a busy urban edge.",
    strengths: ["Elizabeth line plus Overground and tube", "Excellent Bangladeshi and wider food scene", "Very quick to the City and Canary Wharf"],
    tradeoffs: ["Busy hospital and market traffic", "Street feel changes quickly", "Not a quiet choice"],
    lifestyle: { connectivity: 10, foodScene: 9, livelyVsQuiet: 8, safety: 5 },
  },
  "aldgate": {
    summary: "City-fringe living for people who want to walk to finance jobs and still be close to Spitalfields and Shoreditch.",
    strengths: ["Walkable to the City", "Strong food and after-work options", "Excellent central transport"],
    tradeoffs: ["Very expensive", "Less residential comfort", "Tourist and office crowds"],
    lifestyle: { connectivity: 9, walkability: 9, youngProfessionalDensity: 9, greenSpace: 4 },
  },
  "hoxton": {
    summary: "Creative east London with bars, studios, Columbia Road nearby, and Overground-led commuting.",
    strengths: ["Strong nightlife and independent food", "Close to Shoreditch and Columbia Road", "Young, social crowd"],
    tradeoffs: ["No tube station in the immediate area", "Noisy on weekends", "Rents are no longer cheap"],
    lifestyle: { nightlife: 9, cafeDensity: 9, greenSpace: 4, safety: 6 },
  },
  "leyton": {
    summary: "Central line affordability with Olympic Park access and a growing cafe/pub scene.",
    strengths: ["Central line into the City and West End", "Good access to Olympic Park and Hackney Marshes", "Cheaper than Hackney or Walthamstow"],
    tradeoffs: ["High street is still uneven", "Some commutes are line-dependent", "Less polished than nearby village areas"],
    lifestyle: { connectivity: 7, greenSpace: 8, cafeDensity: 6, youngProfessionalDensity: 6 },
  },
  "forest-gate": {
    summary: "Elizabeth line access, Wanstead Flats, and a diverse east London high street at a lower rent point.",
    strengths: ["Elizabeth line is a major commute advantage", "Wanstead Flats nearby", "Good value for east London"],
    tradeoffs: ["Quieter at night", "Less dense amenity scene than Hackney", "Street quality varies"],
    lifestyle: { connectivity: 8, greenSpace: 8, foodScene: 7, nightlife: 4 },
  },
  "barking": {
    summary: "A major east London interchange with some of the lowest rents in the model and a functional town-centre feel.",
    strengths: ["District, Hammersmith & City, Overground, and rail links", "Strong affordability", "Large everyday retail offer"],
    tradeoffs: ["Outer-zone feel", "Less lifestyle polish", "Longer trips to west London"],
    lifestyle: { connectivity: 8, safety: 6, cafeDensity: 5 },
  },
  "ilford": {
    summary: "Elizabeth line commuting, diverse food, and lower east London rents around a busy town centre.",
    strengths: ["Elizabeth line to central London", "Strong South Asian food scene", "Good affordability for a fast rail corridor"],
    tradeoffs: ["Town centre can feel hectic", "Outer-zone commute cost", "Limited green feel around the station"],
    lifestyle: { connectivity: 8, foodScene: 8, safety: 6, greenSpace: 5 },
  },
  "romford": {
    summary: "Far-east London value with Elizabeth line rail, a large retail centre, and more nightlife than many outer suburbs.",
    strengths: ["Elizabeth line and rail access", "Low rents for the model", "Large shopping and evening economy"],
    tradeoffs: ["Longer commute to central/west London", "Feels separate from inner London", "Car-oriented edges"],
    lifestyle: { connectivity: 7, nightlife: 6, safety: 6, youngProfessionalDensity: 5 },
  },
  "mile-end": {
    summary: "A useful east London interchange by the canal, Victoria Park, and student-heavy Queen Mary streets.",
    strengths: ["Central, District, and Hammersmith & City lines", "Good parks and canal access", "Quick to City, Stratford, and Canary Wharf"],
    tradeoffs: ["Busy roads around the station", "Student-heavy pockets", "Not as polished as neighbouring Victoria Park areas"],
    lifestyle: { connectivity: 9, greenSpace: 8, foodScene: 7, safety: 6 },
  },
  "wapping": {
    summary: "Quiet riverside streets and warehouse flats with Overground access and a calmer feel than most of inner east London.",
    strengths: ["Thames-side walks", "Low-key residential feel", "Close to the City and Canary Wharf"],
    tradeoffs: ["Limited nightlife", "Overground is the main rail option", "Can feel quiet after dark"],
    lifestyle: { greenSpace: 6, nightlife: 3, safety: 8, walkability: 7 },
  },
  "hackney-wick": {
    summary: "Canals, studios, breweries, and Olympic Park access, with a creative feel and improving transport.",
    strengths: ["Excellent canal and park access", "Creative venues and breweries", "Young social crowd"],
    tradeoffs: ["Overground-led commute", "Patchy late-night transport", "New-build pricing has risen"],
    lifestyle: { nightlife: 8, greenSpace: 8, youngProfessionalDensity: 9, connectivity: 6 },
  },
  "balham": {
    summary: "A dependable south-west professional base with Northern line, rail, gyms, brunch, and access to commons.",
    strengths: ["Tube and rail together", "Strong gyms, cafes, and pubs", "Close to Clapham and Wandsworth commons"],
    tradeoffs: ["Can feel expensive for its distance out", "Less distinctive than neighbouring villages", "Northern line reliance"],
    lifestyle: { youngProfessionalDensity: 9, gymDensity: 8, greenSpace: 7, connectivity: 8 },
  },
  "borough": {
    summary: "Central south-bank living by Borough Market, London Bridge, and the City, with prices to match.",
    strengths: ["Walkable to the City and South Bank", "Exceptional food access", "Fast central connections"],
    tradeoffs: ["High rent", "Tourist and office crowds", "Limited quiet residential stock"],
    lifestyle: { foodScene: 10, walkability: 9, connectivity: 9, greenSpace: 4 },
  },
  "elephant-castle": {
    summary: "A changing Zone 1/2 hub with new towers, quick tube links, and strong Latin American food.",
    strengths: ["Northern, Bakerloo, and rail options", "Fast to Waterloo and the City", "Modern flats and active regeneration"],
    tradeoffs: ["Construction and road-heavy public realm", "Less settled neighbourhood feel", "New-build rents can be high"],
    lifestyle: { connectivity: 9, youngProfessionalDensity: 8, safety: 6, foodScene: 8 },
  },
  "camberwell": {
    summary: "South London food, pubs, art-school energy, and good bus/rail access without a tube station.",
    strengths: ["Strong food and pub culture", "Good value compared with neighbouring Dulwich and Brixton", "Denmark Hill rail links"],
    tradeoffs: ["No tube", "Bus journeys can vary by traffic", "Street feel changes quickly"],
    lifestyle: { foodScene: 8, nightlife: 6, connectivity: 5, safety: 6 },
  },
  "herne-hill": {
    summary: "A green, village-like south London pocket between Brockwell Park and Dulwich.",
    strengths: ["Brockwell Park and lido nearby", "Good Sunday market and cafes", "Calmer than Brixton while still close"],
    tradeoffs: ["Mostly rail-led commuting", "Limited nightlife", "Small rental market"],
    lifestyle: { greenSpace: 9, safety: 8, nightlife: 4, cafeDensity: 7 },
  },
  "east-dulwich": {
    summary: "Leafy, food-led south-east London with Lordship Lane at its centre and a family/professional mix.",
    strengths: ["Strong independent food and pubs", "Good access to Peckham Rye and Dulwich parks", "Attractive residential streets"],
    tradeoffs: ["No tube", "Quieter late-night scene", "Rents are high for rail-only access"],
    lifestyle: { foodScene: 8, greenSpace: 8, nightlife: 5, connectivity: 5 },
  },
  "streatham": {
    summary: "Long, practical, and better-value south London with commons nearby and rail links from several stations.",
    strengths: ["Good value for space", "Streatham Common and Tooting Common nearby", "Large everyday high street"],
    tradeoffs: ["No tube", "Traffic-heavy main road", "Commute depends on which station you live near"],
    lifestyle: { greenSpace: 8, connectivity: 5, nightlife: 4 },
  },
  "stockwell": {
    summary: "A compact interchange between Brixton, Vauxhall, and Clapham with Victoria and Northern line access.",
    strengths: ["Victoria and Northern lines", "Very good position for south/central commutes", "Lower-key than Brixton or Clapham"],
    tradeoffs: ["Fewer destination amenities", "Some busy road edges", "Less green than neighbouring commons areas"],
    lifestyle: { connectivity: 9, walkability: 8, greenSpace: 5, nightlife: 5 },
  },
  "vauxhall": {
    summary: "A central, transport-heavy riverside area with new-build flats, nightlife pockets, and quick Victoria line access.",
    strengths: ["Victoria line and rail interchange", "Walk or cycle to Westminster and the South Bank", "Modern flats and gyms"],
    tradeoffs: ["Roads and junctions dominate the centre", "Can feel anonymous", "Prices are high around new developments"],
    lifestyle: { connectivity: 10, gymDensity: 9, nightlife: 6, safety: 6 },
  },
  "kennington": {
    summary: "A calmer Zone 1/2 pocket with Georgian streets, Northern line access, and good links to Waterloo and the City.",
    strengths: ["Central but more residential than Vauxhall", "Northern line branches", "Good pubs and local streets"],
    tradeoffs: ["Limited late-night scene", "Premium prices for central calm", "Some road-heavy edges"],
    lifestyle: { connectivity: 8, safety: 8, nightlife: 5, walkability: 8 },
  },
  "new-cross": {
    summary: "Goldsmiths-adjacent south-east London with Overground links, music venues, and cheaper rents than nearby Peckham.",
    strengths: ["Overground access", "Young creative/student energy", "Good value for Zone 2"],
    tradeoffs: ["Busy road layout", "Patchy street feel", "Less polished than East Dulwich or Blackheath"],
    lifestyle: { nightlife: 7, youngProfessionalDensity: 7, safety: 5, connectivity: 7 },
  },
  "deptford": {
    summary: "A creative riverside-adjacent area with markets, studios, and quick rail into London Bridge.",
    strengths: ["Good food, markets, and independent venues", "Quick rail to London Bridge", "Lower rents than Greenwich"],
    tradeoffs: ["Public realm varies by street", "Rail-led commute", "Nightlife is lively but uneven"],
    lifestyle: { foodScene: 8, nightlife: 7, connectivity: 6, safety: 6 },
  },
  "lewisham": {
    summary: "A south-east transport hub with DLR, rail, lower rents, and fast trips to Canary Wharf or London Bridge.",
    strengths: ["DLR and rail connections", "Good affordability for connectivity", "Large town-centre amenities"],
    tradeoffs: ["Busy interchange feel", "Less village charm", "Public realm still improving"],
    lifestyle: { connectivity: 9, walkability: 7, safety: 6, nightlife: 5 },
  },
  "catford": {
    summary: "Better-value south-east London with rail links, a changing town centre, and access to larger parks.",
    strengths: ["Lower rents than many inner south-east areas", "Rail to central London", "Close to Ladywell Fields and Mountsfield Park"],
    tradeoffs: ["Town centre is still rough-edged", "Limited nightlife", "Commutes are rail-frequency dependent"],
    lifestyle: { greenSpace: 7, connectivity: 5, safety: 6, cafeDensity: 5 },
  },
  "blackheath": {
    summary: "A village-like south-east option with the heath, handsome streets, and a calmer profile near Greenwich.",
    strengths: ["Huge open heath", "Attractive village centre", "Quiet, well-kept residential streets"],
    tradeoffs: ["Rail-only commute", "Expensive for south-east London", "Quiet evening scene"],
    lifestyle: { greenSpace: 10, safety: 9, nightlife: 3, connectivity: 5 },
  },
  "forest-hill": {
    summary: "Leafy Overground living with views, the Horniman Museum, and better value than nearby Dulwich villages.",
    strengths: ["Horniman Museum and gardens", "Overground connection", "Good value for green south-east London"],
    tradeoffs: ["Hilly streets", "Slower to west London", "Nightlife is limited"],
    lifestyle: { greenSpace: 8, safety: 8, cafeDensity: 6, connectivity: 6 },
  },
  "crystal-palace": {
    summary: "Hilltop south London with a major park, independent food, and a strong village identity.",
    strengths: ["Crystal Palace Park", "Good pubs, brunch, and independent shops", "Characterful housing stock"],
    tradeoffs: ["Further from central London", "Rail/Overground journey times vary", "Hills add friction"],
    lifestyle: { greenSpace: 9, foodScene: 8, nightlife: 5, connectivity: 5 },
  },
  "bexleyheath": {
    summary: "Outer south-east affordability with a large town centre and rail links into central London.",
    strengths: ["Lower rents", "Large shopping centre and everyday amenities", "More space for the money"],
    tradeoffs: ["Longer central commute", "Less young-professional scene", "Outer-suburban feel"],
    lifestyle: { connectivity: 5, safety: 7, cafeDensity: 5, nightlife: 4 },
  },
  "croydon": {
    summary: "A major south London hub with fast trains, trams, lower rents, and a large but uneven town centre.",
    strengths: ["Very fast rail to London Bridge and Victoria", "Tram network", "Good affordability for connectivity"],
    tradeoffs: ["Town centre can feel uneven", "Further out geographically", "High street experience is mixed"],
    lifestyle: { connectivity: 9, nightlife: 6, safety: 5, youngProfessionalDensity: 6 },
  },
  "earlsfield": {
    summary: "A quieter Wandsworth option with rail to Waterloo, local pubs, and access to south-west commons.",
    strengths: ["Quick rail to Waterloo", "Calmer than Clapham", "Good local pubs and gyms"],
    tradeoffs: ["No tube", "Limited nightlife", "Can feel expensive for rail-only access"],
    lifestyle: { safety: 8, gymDensity: 8, nightlife: 4, connectivity: 6 },
  },
  "kingston": {
    summary: "Thames-side outer south-west London with a strong town centre, river walks, and more space.",
    strengths: ["Large retail and riverside amenities", "Good access to Richmond Park and the Thames", "More space than inner south-west"],
    tradeoffs: ["Longer commute into central London", "Outer-zone travel", "Less useful for east London jobs"],
    lifestyle: { greenSpace: 8, safety: 8, connectivity: 5, nightlife: 5 },
  },
  "sutton": {
    summary: "Outer south London value with rail links, practical amenities, and a quieter residential profile.",
    strengths: ["Lower rents", "Good rail access for the distance", "Calm residential streets"],
    tradeoffs: ["Longer journeys into central London", "Limited nightlife", "Less young-professional density"],
    lifestyle: { safety: 8, connectivity: 5, cafeDensity: 5, nightlife: 3 },
  },
  "barnes": {
    summary: "Riverside village living with commons, pubs, and premium prices for a slower west London rhythm.",
    strengths: ["Thames Path and Barnes Common", "Village character", "Quiet, high-quality residential streets"],
    tradeoffs: ["Expensive", "Rail-only commute", "Very quiet nightlife"],
    lifestyle: { greenSpace: 9, safety: 9, nightlife: 2, connectivity: 4 },
  },
  "richmond": {
    summary: "One of London's greenest town centres, combining the Thames, Richmond Park, and tube/rail connections.",
    strengths: ["Richmond Park and riverside access", "District, Overground, and rail options", "Strong cafes, pubs, and shopping"],
    tradeoffs: ["Expensive", "Longer to east London", "More settled than twenty-something"],
    lifestyle: { greenSpace: 10, safety: 9, connectivity: 7, nightlife: 5 },
  },
  "twickenham": {
    summary: "Outer south-west value by the river, with rail links, pubs, and rugby-day crowds.",
    strengths: ["Good value compared with Richmond", "Riverside walks", "Useful rail to Waterloo"],
    tradeoffs: ["Outer-zone commute", "Quiet outside event days", "Less useful for east London jobs"],
    lifestyle: { greenSpace: 8, safety: 8, nightlife: 4, connectivity: 5 },
  },
  "notting-hill": {
    summary: "Iconic west London with pastel streets, Portobello Road, strong food, and very high prices.",
    strengths: ["Central/Circle/District line access", "Excellent cafes, restaurants, and markets", "Walkable to Hyde Park and Holland Park"],
    tradeoffs: ["Very expensive", "Tourist crowds", "Limited value for space"],
    lifestyle: { cafeDensity: 10, foodScene: 9, safety: 8, greenSpace: 7 },
  },
  "kensington": {
    summary: "Prime west London with museums, parks, mansion blocks, and some of the highest rents in the app.",
    strengths: ["Excellent museums and Hyde Park access", "Beautiful streets and housing stock", "Central west location"],
    tradeoffs: ["Very expensive", "Less young/social than nearby Notting Hill", "Nightlife is restrained"],
    lifestyle: { safety: 9, greenSpace: 8, nightlife: 4, walkability: 9 },
  },
  "fulham": {
    summary: "A polished south-west professional area with riverside pockets, gyms, pubs, and District line commuting.",
    strengths: ["Strong young-professional base", "Good pubs, gyms, and brunch", "Riverside and park access"],
    tradeoffs: ["Pricey for a single-line area", "Can feel socially narrow", "District line commutes can be slow"],
    lifestyle: { youngProfessionalDensity: 9, gymDensity: 9, safety: 8, connectivity: 6 },
  },
  "chiswick": {
    summary: "Leafy west London with a strong high road, riverside access, and a calmer professional/family feel.",
    strengths: ["Good cafes, pubs, and independent shops", "Close to the Thames and Chiswick House", "District/Piccadilly options at Turnham Green"],
    tradeoffs: ["Slower to the City and east London", "Quiet nightlife", "Premium west London rents"],
    lifestyle: { greenSpace: 8, safety: 8, nightlife: 4, foodScene: 8 },
  },
  "uxbridge": {
    summary: "Far-west affordability with Metropolitan/Piccadilly terminus links and a large town-centre offer.",
    strengths: ["Low rents for west London", "Two tube lines", "Large retail and student-influenced amenities"],
    tradeoffs: ["Long central commute", "Feels separate from inner London", "Outer-zone travel costs"],
    lifestyle: { connectivity: 6, safety: 7, cafeDensity: 5, youngProfessionalDensity: 5 },
  },
  "chelsea": {
    summary: "Prime south-west London with King's Road, mansion flats, and extremely high rents.",
    strengths: ["Excellent restaurants and retail", "Walkable to the Thames and Battersea Park", "High-quality streets and housing"],
    tradeoffs: ["Very expensive", "Tube access is weaker than the price suggests", "Less diverse and younger-energy than east/south options"],
    lifestyle: { foodScene: 9, safety: 9, connectivity: 6, youngProfessionalDensity: 6 },
  },
  "pimlico": {
    summary: "Central, calmer, and more residential than Westminster neighbours, with Victoria line access.",
    strengths: ["Fast Victoria line", "Walkable to Victoria, Westminster, and the Thames", "Quiet grid of mansion blocks"],
    tradeoffs: ["High rent", "Limited nightlife", "Less neighbourhood identity than nearby Chelsea or Vauxhall"],
    lifestyle: { connectivity: 8, safety: 8, nightlife: 4, walkability: 9 },
  },
  "bayswater": {
    summary: "Dense west-central living between Hyde Park, Queensway, and Paddington, with strong transport and busy streets.",
    strengths: ["Excellent Hyde Park access", "Central/Circle/District proximity nearby", "Diverse food around Queensway"],
    tradeoffs: ["Tourist and hotel traffic", "Patchy street feel", "High rent for compact flats"],
    lifestyle: { connectivity: 8, foodScene: 8, greenSpace: 9, safety: 6 },
  },
  "maida-vale": {
    summary: "A quieter west-central residential area with mansion blocks, canals, and Bakerloo line access.",
    strengths: ["Calm, attractive streets", "Little Venice and canal walks", "Good for Paddington/West End commutes"],
    tradeoffs: ["Bakerloo line reliance", "Quiet nightlife", "Expensive for limited buzz"],
    lifestyle: { greenSpace: 7, safety: 8, nightlife: 3, connectivity: 6 },
  },
  "holland-park": {
    summary: "Prime west London centred on one of the city's best parks, with high rents and a quiet upscale feel.",
    strengths: ["Holland Park on the doorstep", "Beautiful residential streets", "Central line access"],
    tradeoffs: ["Very expensive", "Limited nightlife", "Small rental market"],
    lifestyle: { greenSpace: 10, safety: 9, nightlife: 3, cafeDensity: 7 },
  },
  "soho": {
    summary: "The most intense central option: unmatched nightlife, food, and walkability, with very little quiet.",
    strengths: ["Best-in-class nightlife and food density", "Walkable to West End offices", "Elizabeth/Central/Northern access nearby"],
    tradeoffs: ["Extremely expensive", "Noisy late into the night", "Limited residential calm"],
    lifestyle: { nightlife: 10, foodScene: 10, walkability: 10, safety: 5 },
  },
  "fitzrovia": {
    summary: "Central, walkable, and food-heavy, sitting between Oxford Street, Bloomsbury, and Marylebone.",
    strengths: ["Walkable to many central offices", "Excellent restaurants and cafes", "Good balance of quiet streets and central access"],
    tradeoffs: ["High rent", "Limited green space", "Small rental supply"],
    lifestyle: { walkability: 10, cafeDensity: 10, greenSpace: 4, connectivity: 8 },
  },
  "bloomsbury": {
    summary: "Academic, central, and garden-square-led, with museums, universities, and quick Piccadilly line access.",
    strengths: ["Garden squares and cultural institutions", "Walkable to King's Cross and the West End", "Good cafes and study-friendly streets"],
    tradeoffs: ["Expensive", "Student/tourist pressure", "Nightlife is moderate rather than wild"],
    lifestyle: { walkability: 9, safety: 8, nightlife: 5, cafeDensity: 8 },
  },
  "mayfair": {
    summary: "Ultra-prime central London for people prioritising prestige, walking distance, and luxury amenities over value.",
    strengths: ["Walkable to West End, Green Park, and Hyde Park", "Top-end restaurants and retail", "Very strong central connectivity"],
    tradeoffs: ["Highest rents in the model", "Low value for young renters", "Limited everyday neighbourhood feel"],
    lifestyle: { safety: 9, foodScene: 9, walkability: 10, youngProfessionalDensity: 5 },
  },
  "marylebone-area": {
    summary: "A polished central village with Marylebone High Street, Bond Street access, and calmer streets than Soho.",
    strengths: ["Excellent cafes, restaurants, and retail", "Central/Jubilee/Elizabeth access nearby", "Walkable to Regent's Park and the West End"],
    tradeoffs: ["Very expensive", "Small flats at high prices", "Social scene is refined rather than lively"],
    lifestyle: { cafeDensity: 9, safety: 8, connectivity: 9, nightlife: 5 },
  },
  "covent-garden": {
    summary: "West End living with theatres, restaurants, tourists, and quick Piccadilly line access.",
    strengths: ["Unmatched theatre and restaurant access", "Very walkable central location", "Close to multiple tube lines"],
    tradeoffs: ["Tourist-heavy almost every day", "High rents for limited residential calm", "Noisy streets"],
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
