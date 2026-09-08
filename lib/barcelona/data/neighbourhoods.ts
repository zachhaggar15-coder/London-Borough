import { BARCELONA_RENT_REVIEW_AS_OF } from "@/lib/barcelona/data/market";
import type { BarcelonaRoomDistrict } from "@/lib/barcelona/data/market";
import type { Neighbourhood } from "@/lib/types";

/**
 * Barcelona barris, written for a British reader.
 *
 * Barcelona is organised into ten districts and seventy-three barris,
 * and the barri is the unit people actually use — asking someone where
 * they live gets you "Gràcia" or "Poblenou", never a district number.
 * These are barris or tight clusters of them.
 *
 * One thing shapes this section more than any other and it is not on a
 * map: the city has spent a decade in an argument with itself about
 * tourism and housing. Rent caps, a hard limit on tourist flats, and
 * visible local hostility to short-let conversion are all live, and a
 * British arrival should understand that they are landing in the middle
 * of it rather than beside it.
 */

const AS_OF = BARCELONA_RENT_REVIEW_AS_OF;

export type BarcelonaNeighbourhood = Neighbourhood & {
  roomDistrict: BarcelonaRoomDistrict;
};

export const BARCELONA_NEIGHBOURHOODS: BarcelonaNeighbourhood[] = [
  // ── Ciutat Vella ───────────────────────────────────────────────────
  {
    id: "gotic",
    name: "Barri Gòtic",
    borough: "Ciutat Vella",
    centroid: { lat: 41.3830, lng: 2.1770 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1100, twoBedMedianGbp: 1420, source: "market_review", asOf: AS_OF },
    roomDistrict: "ciutat-vella",
    mainStations: [
      { name: "Jaume I", lines: ["Metro L4"] },
      { name: "Liceu", lines: ["Metro L3"] },
    ],
    lifestyle: {
      livelyVsQuiet: 9, greenSpace: 2, nightlife: 9, cafeDensity: 9, gymDensity: 4,
      walkability: 10, foodScene: 8, youngProfessionalDensity: 6, safety: 4, connectivity: 9,
    },
    summary:
      "Medieval streets between the cathedral and the port, and the most visited square kilometre in Spain. Living here means living inside the thing people fly in to see, which is remarkable for a season and wearing after it.",
    strengths: [
      "Walk to essentially everything in central Barcelona",
      "Extraordinary architecture and squares",
      "Every metro line within a few minutes",
      "Genuinely no need for any transport at all",
    ],
    tradeoffs: [
      "Tourist volume is constant and overwhelming",
      "Pickpocketing is a real and persistent problem",
      "Dark, narrow flats with little light and no lifts",
      "Noise until very late, every night of the week",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "born",
    name: "El Born & Sant Pere",
    borough: "Ciutat Vella",
    centroid: { lat: 41.3850, lng: 2.1830 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1120, twoBedMedianGbp: 1450, source: "market_review", asOf: AS_OF },
    roomDistrict: "ciutat-vella",
    mainStations: [
      { name: "Jaume I", lines: ["Metro L4"] },
      { name: "Arc de Triomf", lines: ["Metro L1", "Rodalies R1", "Rodalies R3"] },
    ],
    lifestyle: {
      livelyVsQuiet: 8, greenSpace: 5, nightlife: 8, cafeDensity: 9, gymDensity: 5,
      walkability: 10, foodScene: 9, youngProfessionalDensity: 7, safety: 6, connectivity: 9,
    },
    summary:
      "The old merchants' quarter, with the Santa Maria del Mar basilica at its heart and the Ciutadella park on its edge. It is the Gòtic with more light, better restaurants and slightly fewer tour groups, and it is the most liveable part of the old city.",
    strengths: [
      "Parc de la Ciutadella at the end of the street",
      "The best restaurant density in the old city",
      "Beach twenty minutes' walk away",
      "Beautiful buildings with more light than the Gòtic",
    ],
    tradeoffs: [
      "Still very touristed, particularly around Passeig del Born",
      "Expensive for the space you get",
      "Noise at night on the main passeigs",
      "Old buildings, and lifts are the exception",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "raval",
    name: "El Raval",
    borough: "Ciutat Vella",
    centroid: { lat: 41.3800, lng: 2.1680 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 950, twoBedMedianGbp: 1250, source: "market_review", asOf: AS_OF },
    roomDistrict: "ciutat-vella",
    mainStations: [
      { name: "Liceu", lines: ["Metro L3"] },
      { name: "Sant Antoni", lines: ["Metro L2"] },
    ],
    lifestyle: {
      livelyVsQuiet: 8, greenSpace: 2, nightlife: 8, cafeDensity: 8, gymDensity: 4,
      walkability: 10, foodScene: 9, youngProfessionalDensity: 6, safety: 3, connectivity: 9,
    },
    summary:
      "The most diverse district in Barcelona and the cheapest central address, with the MACBA contemporary art museum at one end and genuine deprivation at the other. It has the best and most affordable food in the city and the worst street-safety reputation, and both are earned.",
    strengths: [
      "The cheapest rents in central Barcelona",
      "Outstanding Pakistani, Filipino and North African food",
      "MACBA, the CCCB and a real cultural scene",
      "Central enough to walk everywhere",
    ],
    tradeoffs: [
      "The highest recorded street crime in the city",
      "Drug dealing is visible in parts",
      "Very dark, very small flats with poor ventilation",
      "Chronic overcrowding in the worst blocks",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Eixample ───────────────────────────────────────────────────────
  {
    id: "eixample-dreta",
    name: "Dreta de l'Eixample",
    borough: "Eixample",
    centroid: { lat: 41.3950, lng: 2.1660 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1200, twoBedMedianGbp: 1550, source: "market_review", asOf: AS_OF },
    roomDistrict: "eixample",
    mainStations: [
      { name: "Passeig de Gràcia", lines: ["Metro L2", "Metro L3", "Metro L4", "Rodalies"] },
      { name: "Girona", lines: ["Metro L4"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 4, nightlife: 5, cafeDensity: 8, gymDensity: 7,
      walkability: 9, foodScene: 8, youngProfessionalDensity: 7, safety: 8, connectivity: 10,
    },
    summary:
      "Cerdà's grid at its grandest — the Casa Batlló and La Pedrera are on Passeig de Gràcia — with high-ceilinged modernista flats behind the shopping streets. It is the most conventionally desirable address in Barcelona and the best connected.",
    strengths: [
      "Passeig de Gràcia is a four-line interchange plus mainline rail",
      "The largest and highest-ceilinged flats in the city",
      "Safe, well lit and well served",
      "Walk to the old city, Gràcia and the beach",
    ],
    tradeoffs: [
      "The most expensive rents in the city centre",
      "Very little green space in the grid",
      "Traffic and air quality on the main carrers",
      "Quiet and corporate compared with Gràcia or Born",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "esquerra-eixample",
    name: "Esquerra de l'Eixample",
    borough: "Eixample",
    centroid: { lat: 41.3860, lng: 2.1520 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1120, twoBedMedianGbp: 1450, source: "market_review", asOf: AS_OF },
    roomDistrict: "eixample",
    mainStations: [
      { name: "Universitat", lines: ["Metro L1", "Metro L2"] },
      { name: "Hospital Clínic", lines: ["Metro L5"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 4, nightlife: 6, cafeDensity: 8, gymDensity: 7,
      walkability: 9, foodScene: 8, youngProfessionalDensity: 8, safety: 8, connectivity: 9,
    },
    summary:
      "The left half of the grid: the same architecture as the Dreta at a lower price, with the university, the Hospital Clínic and the Gaixample — the city's gay quarter — inside it. It is the most practical central choice and the one most young professionals actually take.",
    strengths: [
      "Same grid, meaningfully cheaper than the Dreta",
      "Universitat and the Clínic are major employers here",
      "The Gaixample's bars and restaurants",
      "Sant Antoni market a short walk away",
    ],
    tradeoffs: [
      "Little green space and a lot of traffic",
      "The grid is repetitive and can feel anonymous",
      "Student and hospital-shift turnover in parts",
      "Interior flats can be dark despite the block courtyards",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "sant-antoni",
    name: "Sant Antoni",
    borough: "Eixample",
    centroid: { lat: 41.3790, lng: 2.1590 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1100, twoBedMedianGbp: 1420, source: "market_review", asOf: AS_OF },
    roomDistrict: "eixample",
    mainStations: [
      { name: "Sant Antoni", lines: ["Metro L2"] },
      { name: "Poble Sec", lines: ["Metro L3"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 4, nightlife: 7, cafeDensity: 9, gymDensity: 6,
      walkability: 10, foodScene: 9, youngProfessionalDensity: 8, safety: 7, connectivity: 9,
    },
    summary:
      "The restored market hall reopened in 2018 and the streets around it became the most fashionable eating quarter in Barcelona within about three years. Superilla traffic calming has pedestrianised much of it, which is why it feels so different from the rest of the grid.",
    strengths: [
      "The Mercat de Sant Antoni, and the streets around it",
      "Superilla pedestrianisation has transformed the air and noise",
      "The best new restaurants in the city open here",
      "Walk to the Raval, Poble-sec and the Eixample",
    ],
    tradeoffs: [
      "Prices have risen very fast and continue to",
      "Busy and loud around Carrer del Parlament at weekends",
      "Still very little green space",
      "The gentrification argument is loudest here",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Gràcia ─────────────────────────────────────────────────────────
  {
    id: "vila-de-gracia",
    name: "Vila de Gràcia",
    borough: "Gràcia",
    centroid: { lat: 41.4030, lng: 2.1560 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1100, twoBedMedianGbp: 1400, source: "market_review", asOf: AS_OF },
    roomDistrict: "gracia",
    mainStations: [
      { name: "Fontana", lines: ["Metro L3"] },
      { name: "Gràcia", lines: ["FGC S1", "FGC S2"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 5, nightlife: 7, cafeDensity: 10, gymDensity: 5,
      walkability: 10, foodScene: 9, youngProfessionalDensity: 8, safety: 7, connectivity: 8,
    },
    summary:
      "An independent town until 1897 and it has never behaved like a district since — narrow streets on a different grid from the Eixample, a dozen small squares each with its own bars, and the strongest neighbourhood identity in Barcelona. The default answer for anyone who wants a village inside a city.",
    strengths: [
      "A genuine village atmosphere with a dozen plaças",
      "The best independent shops and bars in the city",
      "Strong community and a famous August festival",
      "Escapes the worst of the tourist crowds",
    ],
    tradeoffs: [
      "Small flats in old buildings, often without lifts",
      "Square noise on summer evenings is significant",
      "Rents now match the Eixample",
      "Metro coverage is thinner than the grid",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "camp-den-grassot",
    name: "Camp d'en Grassot & Gràcia Nova",
    borough: "Gràcia",
    centroid: { lat: 41.4070, lng: 2.1680 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1020, twoBedMedianGbp: 1320, source: "market_review", asOf: AS_OF },
    roomDistrict: "gracia",
    mainStations: [
      { name: "Joanic", lines: ["Metro L4"] },
      { name: "Alfons X", lines: ["Metro L4"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 5, nightlife: 5, cafeDensity: 8, gymDensity: 6,
      walkability: 9, foodScene: 7, youngProfessionalDensity: 7, safety: 8, connectivity: 8,
    },
    summary:
      "The eastern half of Gràcia, on the grid rather than the village streets, and noticeably cheaper for it. It has the same metro links and much of the same character without the plaça noise or the price.",
    strengths: [
      "Cheaper than Vila de Gràcia for a five-minute walk",
      "Larger, lighter flats on the grid pattern",
      "Quiet residential streets with good local shops",
      "Metro L4 straight down to the beach",
    ],
    tradeoffs: [
      "Less charm than the old village half",
      "Fewer bars and restaurants",
      "Quiet in the evening",
      "Uphill from most of the city",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Sants-Montjuïc ─────────────────────────────────────────────────
  {
    id: "poble-sec",
    name: "Poble-sec",
    borough: "Sants-Montjuïc",
    centroid: { lat: 41.3730, lng: 2.1620 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 950, twoBedMedianGbp: 1250, source: "market_review", asOf: AS_OF },
    roomDistrict: "poble-sec",
    mainStations: [
      { name: "Poble Sec", lines: ["Metro L3"] },
      { name: "Paral·lel", lines: ["Metro L2", "Metro L3", "Funicular"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 7, nightlife: 7, cafeDensity: 9, gymDensity: 5,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 8, safety: 6, connectivity: 9,
    },
    summary:
      "Between the Paral·lel and the Montjuïc hillside, with Carrer de Blai's tapas street running through the middle of it. Central, hilly, still affordable and, for the money, the best eating in Barcelona.",
    strengths: [
      "Carrer de Blai and the best-value tapas in the city",
      "Montjuïc's parks and museums directly above",
      "Two metro lines and walking distance to the centre",
      "Cheaper than anywhere comparable this central",
    ],
    tradeoffs: [
      "Steep, and it matters carrying shopping",
      "The Paral·lel is a heavy traffic corridor",
      "Some blocks remain rough at night",
      "Rising quickly as the Raval and Sant Antoni push people out",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "sants",
    name: "Sants & Hostafrancs",
    borough: "Sants-Montjuïc",
    centroid: { lat: 41.3750, lng: 2.1370 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 900, twoBedMedianGbp: 1180, source: "market_review", asOf: AS_OF },
    roomDistrict: "sants",
    mainStations: [
      { name: "Sants Estació", lines: ["Metro L3", "Metro L5", "Rodalies", "AVE"] },
      { name: "Plaça de Sants", lines: ["Metro L1", "Metro L5"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 5, nightlife: 4, cafeDensity: 7, gymDensity: 6,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 6, safety: 7, connectivity: 10,
    },
    summary:
      "A former mill town absorbed by the city, built around Spain's busiest railway station. It has a strong working-class identity, an active co-operative tradition and the best long-distance connections in Barcelona — the AVE reaches Madrid in two and a half hours.",
    strengths: [
      "Sants Estació for AVE, Rodalies and two metro lines",
      "Genuinely local, with almost no tourism",
      "Among the cheapest well-connected rents in the city",
      "A real market and high street",
    ],
    tradeoffs: [
      "The station and the rail corridor dominate",
      "Less attractive than the old city or Gràcia",
      "Little nightlife",
      "Some monotonous post-war blocks",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Sarrià-Sant Gervasi ────────────────────────────────────────────
  {
    id: "sant-gervasi",
    name: "Sant Gervasi & Galvany",
    borough: "Sarrià-Sant Gervasi",
    centroid: { lat: 41.3980, lng: 2.1420 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1300, twoBedMedianGbp: 1700, source: "market_review", asOf: AS_OF },
    roomDistrict: "sarria",
    mainStations: [
      { name: "Muntaner", lines: ["FGC S1", "FGC S2"] },
      { name: "Diagonal", lines: ["Metro L3", "Metro L5", "FGC"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 3, cafeDensity: 7, gymDensity: 8,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 5, safety: 9, connectivity: 8,
    },
    summary:
      "Uphill and expensive, with the international schools, the private hospitals and most of Barcelona's old money. It is the standard corporate-relocation address and it is as safe, as quiet and as unexciting as that description suggests.",
    strengths: [
      "Among the safest and quietest parts of the city",
      "Most of the international schools are here or above",
      "Larger flats with terraces and parking",
      "FGC trains are fast and rarely crowded",
    ],
    tradeoffs: [
      "The most expensive rents in Barcelona",
      "A long way uphill from the beach and the old city",
      "Very little happens in the evening",
      "Skews older and considerably wealthier",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "sarria",
    name: "Sarrià",
    borough: "Sarrià-Sant Gervasi",
    centroid: { lat: 41.3990, lng: 2.1210 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1250, twoBedMedianGbp: 1650, source: "market_review", asOf: AS_OF },
    roomDistrict: "sarria",
    mainStations: [
      { name: "Sarrià", lines: ["FGC S1", "FGC S2", "FGC L6"] },
      { name: "Reina Elisenda", lines: ["FGC L12"] },
    ],
    lifestyle: {
      livelyVsQuiet: 2, greenSpace: 8, nightlife: 2, cafeDensity: 6, gymDensity: 6,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 4, safety: 10, connectivity: 7,
    },
    summary:
      "Another independent town swallowed by the city, and the one that kept its village core most intact. Quiet, green, close to Collserola and the international schools, and the most obviously family-oriented address in Barcelona.",
    strengths: [
      "A genuine village centre with a market",
      "Collserola natural park directly above",
      "The lowest crime rate in the city",
      "Excellent for families and school access",
    ],
    tradeoffs: [
      "Twenty-five minutes from anything happening",
      "Expensive, and little rental stock",
      "Almost nothing open after nine",
      "You will want a car for the hill",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Sant Martí ─────────────────────────────────────────────────────
  {
    id: "poblenou",
    name: "Poblenou",
    borough: "Sant Martí",
    centroid: { lat: 41.4000, lng: 2.2000 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1050, twoBedMedianGbp: 1370, source: "market_review", asOf: AS_OF },
    roomDistrict: "poblenou",
    mainStations: [
      { name: "Poblenou", lines: ["Metro L4"] },
      { name: "Glòries", lines: ["Metro L1", "Tram T4", "Tram T5"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 7, nightlife: 6, cafeDensity: 9, gymDensity: 7,
      walkability: 9, foodScene: 8, youngProfessionalDensity: 9, safety: 8, connectivity: 8,
    },
    summary:
      "The old industrial quarter — the Catalan Manchester, as it called itself — rebuilt as the 22@ technology district while keeping the Rambla del Poblenou and a good deal of its factory architecture. It has the beach at the end of the street and the highest concentration of tech jobs in Spain.",
    strengths: [
      "The beach at the end of the Rambla del Poblenou",
      "22@ makes it the tech employment centre of the city",
      "Wide streets, light flats and converted industrial space",
      "Genuinely good local restaurants without the tourism",
    ],
    tradeoffs: [
      "Building sites are still a permanent feature",
      "Parts are corporate and lifeless after six",
      "Beach crowds in summer are considerable",
      "Rents have risen fast with the tech jobs",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "vila-olimpica",
    name: "Vila Olímpica & Barceloneta",
    borough: "Sant Martí",
    centroid: { lat: 41.3870, lng: 2.1960 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1100, twoBedMedianGbp: 1420, source: "market_review", asOf: AS_OF },
    roomDistrict: "poblenou",
    mainStations: [
      { name: "Ciutadella–Vila Olímpica", lines: ["Metro L4"] },
      { name: "Barceloneta", lines: ["Metro L4"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 7, nightlife: 6, cafeDensity: 7, gymDensity: 8,
      walkability: 9, foodScene: 7, youngProfessionalDensity: 7, safety: 6, connectivity: 8,
    },
    summary:
      "Built for the 1992 Olympics on what had been beach-front industry, and the reason Barcelona has a seafront at all. Modern blocks, marinas and the city's main beaches — with Barceloneta's older fishing quarter beside it, which is a completely different and considerably more strained place.",
    strengths: [
      "The beach and the seafront promenade on the doorstep",
      "Purpose-built, so lifts, light and modern services",
      "Parc de la Ciutadella immediately behind",
      "Fifteen minutes from the old city on foot",
    ],
    tradeoffs: [
      "Barceloneta is overwhelmed by tourism in summer",
      "The Olympic blocks are functional rather than charming",
      "Beach-front noise and crowds from June to September",
      "Short-let pressure is intense here",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "clot",
    name: "El Clot & Camp de l'Arpa",
    borough: "Sant Martí",
    centroid: { lat: 41.4090, lng: 2.1870 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 900, twoBedMedianGbp: 1170, source: "market_review", asOf: AS_OF },
    roomDistrict: "clot",
    mainStations: [
      { name: "Clot", lines: ["Metro L1", "Metro L2", "Rodalies"] },
      { name: "Sant Andreu Arenal", lines: ["Metro L1", "Rodalies"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 4, cafeDensity: 7, gymDensity: 6,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 6, safety: 7, connectivity: 9,
    },
    summary:
      "A former industrial village north-east of the centre with its own square, its own market and a park built on the old rail yards, well served by two metro lines and Rodalies and almost entirely untouched by tourism.",
    strengths: [
      "Among the cheapest rents on the metro network",
      "Two metro lines plus Rodalies at Clot",
      "A real local square and a covered market",
      "Sagrada Família and Glòries within walking distance",
    ],
    tradeoffs: [
      "Little to draw you there beyond price and transport",
      "Rail corridors cut it up",
      "Fewer restaurants and bars",
      "Twenty-five minutes from the beach and the old city",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Horta & Nou Barris ─────────────────────────────────────────────
  {
    id: "gracia-guinardo",
    name: "El Guinardó & Horta",
    borough: "Horta & Nou Barris",
    centroid: { lat: 41.4210, lng: 2.1660 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 850, twoBedMedianGbp: 1100, source: "market_review", asOf: AS_OF },
    roomDistrict: "horta",
    mainStations: [
      { name: "Guinardó–Hospital de Sant Pau", lines: ["Metro L4", "Metro L5"] },
      { name: "Horta", lines: ["Metro L5"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 3, cafeDensity: 6, gymDensity: 5,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 5, safety: 8, connectivity: 7,
    },
    summary:
      "Up the hill behind Gràcia towards Collserola, with the Park Güell on one flank and the Hospital de Sant Pau on the other. Quiet, green, steep and among the cheapest places in the city with a decent metro connection.",
    strengths: [
      "Cheap for how well connected it is",
      "Collserola and the Parc del Guinardó on the doorstep",
      "Quiet residential streets and low crime",
      "Genuinely local, with no tourism at all",
    ],
    tradeoffs: [
      "Steep enough that the hill shapes daily life",
      "Twenty-five to thirty minutes to the centre",
      "Very little going on in the evening",
      "Ageing housing stock in parts",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "nou-barris",
    name: "Nou Barris",
    borough: "Horta & Nou Barris",
    centroid: { lat: 41.4410, lng: 2.1770 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 780, twoBedMedianGbp: 1000, source: "market_review", asOf: AS_OF },
    roomDistrict: "nou-barris",
    mainStations: [
      { name: "Llucmajor", lines: ["Metro L4"] },
      { name: "Trinitat Nova", lines: ["Metro L3", "Metro L4", "Metro L11"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 6, nightlife: 2, cafeDensity: 5, gymDensity: 5,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 4, safety: 6, connectivity: 7,
    },
    summary:
      "The northern edge of the city, built rapidly in the 1960s to house workers arriving from southern Spain, and the poorest district in Barcelona. It has the lowest rents in the city, a strong tradition of neighbourhood organising, and a metro connection that most European cities would envy at this price.",
    strengths: [
      "The lowest rents anywhere inside the city",
      "Three metro lines serve it",
      "Strong, long-established community networks",
      "Collserola immediately above",
    ],
    tradeoffs: [
      "Barcelona's most deprived district by most measures",
      "Large 1960s blocks in variable condition",
      "Thirty to thirty-five minutes to the centre",
      "Very little in the way of restaurants or nightlife",
    ],
    dataQuality: "sourceBacked",
  },

  {
    id: "sagrada-familia",
    name: "Sagrada Família",
    borough: "Eixample",
    centroid: { lat: 41.4040, lng: 2.1740 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1080, twoBedMedianGbp: 1400, source: "market_review", asOf: AS_OF },
    roomDistrict: "eixample",
    mainStations: [
      { name: "Sagrada Família", lines: ["Metro L2", "Metro L5"] },
      { name: "Verdaguer", lines: ["Metro L4", "Metro L5"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 4, nightlife: 4, cafeDensity: 8, gymDensity: 6,
      walkability: 9, foodScene: 7, youngProfessionalDensity: 7, safety: 7, connectivity: 9,
    },
    summary:
      "Ordinary residential Eixample wrapped around one of the most visited buildings on earth, which is a stranger daily experience than it sounds. Two streets from the basilica the coach parties vanish entirely and it becomes a quiet grid neighbourhood at a discount to the Dreta.",
    strengths: [
      "Cheaper than the Dreta for the same grid architecture",
      "Two metro lines meeting at the basilica",
      "Genuinely residential once you leave the tourist blocks",
      "Well placed between the centre, Gràcia and Poblenou",
    ],
    tradeoffs: [
      "The blocks immediately around the basilica are a crush",
      "Construction on the towers continues and is noisy",
      "Very little green space",
      "Short-let pressure is heavy on the streets nearest the site",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "les-corts",
    name: "Les Corts",
    borough: "Les Corts",
    centroid: { lat: 41.3840, lng: 2.1300 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1180, twoBedMedianGbp: 1520, source: "market_review", asOf: AS_OF },
    roomDistrict: "les-corts",
    mainStations: [
      { name: "Les Corts", lines: ["Metro L3"] },
      { name: "Maria Cristina", lines: ["Metro L3"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 3, cafeDensity: 6, gymDensity: 7,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 6, safety: 9, connectivity: 8,
    },
    summary:
      "The Camp Nou, the university campus at Diagonal and the business towers along it, with a surviving village core behind them. Les Corts is where a lot of Barcelona works and comparatively few people think to look for a flat.",
    strengths: [
      "Walk to the Diagonal business district and the university",
      "Very low crime and quiet residential streets",
      "Larger, newer flats than the old city",
      "Metro L3 straight down to Plaça Catalunya",
    ],
    tradeoffs: [
      "Match days at the Camp Nou dominate the area",
      "Corporate and quiet in the evening",
      "Expensive for what is not a central address",
      "Little independent character outside the old core",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "pedralbes",
    name: "Pedralbes & Zona Universitària",
    borough: "Les Corts",
    centroid: { lat: 41.3880, lng: 2.1160 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1250, twoBedMedianGbp: 1620, source: "market_review", asOf: AS_OF },
    roomDistrict: "les-corts",
    mainStations: [
      { name: "Zona Universitària", lines: ["Metro L3", "Metro L9", "Tram T1"] },
      { name: "Palau Reial", lines: ["Metro L3"] },
    ],
    lifestyle: {
      livelyVsQuiet: 2, greenSpace: 8, nightlife: 2, cafeDensity: 5, gymDensity: 7,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 5, safety: 10, connectivity: 8,
    },
    summary:
      "The wealthiest residential quarter in Barcelona, on the upper slope with the Monestir de Pedralbes at its heart and the main university campuses beside it. Very green, very quiet, and the one part of the city where detached houses are normal.",
    strengths: [
      "The lowest crime and the most green space in the city",
      "Metro L9 runs direct to the airport",
      "Large flats and houses with terraces and parking",
      "The university campuses and several international schools",
    ],
    tradeoffs: [
      "Expensive, and the family houses rarely let",
      "Almost nothing to walk to in the evening",
      "A long way from the beach and the old city",
      "Skews older and considerably wealthier",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "barceloneta",
    name: "La Barceloneta",
    borough: "Ciutat Vella",
    centroid: { lat: 41.3800, lng: 2.1900 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1020, twoBedMedianGbp: 1320, source: "market_review", asOf: AS_OF },
    roomDistrict: "ciutat-vella",
    mainStations: [
      { name: "Barceloneta", lines: ["Metro L4"] },
      { name: "Ciutadella–Vila Olímpica", lines: ["Metro L4"] },
    ],
    lifestyle: {
      livelyVsQuiet: 8, greenSpace: 5, nightlife: 7, cafeDensity: 7, gymDensity: 5,
      walkability: 9, foodScene: 7, youngProfessionalDensity: 5, safety: 4, connectivity: 8,
    },
    summary:
      "The eighteenth-century fishermen's quarter, laid out on a grid of very narrow streets between the port and the beach, and the single most tourism-affected neighbourhood in Barcelona. Residents have been protesting about it for a decade and the flats are tiny.",
    strengths: [
      "The beach is at the end of every street",
      "Walk to the Born and the Gòtic in ten minutes",
      "Genuine fishing-quarter character where it survives",
      "Cheaper than the Born for a central address",
    ],
    tradeoffs: [
      "Overwhelmed by tourism from May to September",
      "Flats are famously small, often under 40 square metres",
      "Recorded petty crime is among the highest in the city",
      "Local feeling about short lets is strongest here",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "vallcarca",
    name: "Vallcarca & Park Güell",
    borough: "Gràcia",
    centroid: { lat: 41.4140, lng: 2.1490 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 950, twoBedMedianGbp: 1230, source: "market_review", asOf: AS_OF },
    roomDistrict: "gracia",
    mainStations: [
      { name: "Vallcarca", lines: ["Metro L3"] },
      { name: "Lesseps", lines: ["Metro L3"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 8, nightlife: 3, cafeDensity: 6, gymDensity: 5,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 6, safety: 7, connectivity: 7,
    },
    summary:
      "Above Gràcia on the way up to Park Güell, where the grid gives out and the streets start climbing in steps. It is the cheapest way to live within walking distance of Gràcia, and the outdoor escalators are not a joke — they are municipal infrastructure.",
    strengths: [
      "Park Güell and the Collserola paths above it",
      "Meaningfully cheaper than Vila de Gràcia below",
      "Metro L3 direct to the centre",
      "Views over the whole city",
    ],
    tradeoffs: [
      "Steep enough that the council installed escalators",
      "Tourist coaches to Park Güell clog the approaches",
      "Fewer shops and bars than Gràcia proper",
      "Ageing housing stock in parts",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "la-marina",
    name: "La Marina & Zona Franca",
    borough: "Sants-Montjuïc",
    centroid: { lat: 41.3540, lng: 2.1330 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 830, twoBedMedianGbp: 1080, source: "market_review", asOf: AS_OF },
    roomDistrict: "sants",
    mainStations: [
      { name: "Foneria", lines: ["Metro L10 Sud"] },
      { name: "Ciutat de la Justícia", lines: ["Metro L10 Sud"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 5, nightlife: 2, cafeDensity: 4, gymDensity: 5,
      walkability: 6, foodScene: 4, youngProfessionalDensity: 5, safety: 6, connectivity: 7,
    },
    summary:
      "The residential strip between Montjuïc and the port's industrial zone, reached by the newest stretch of metro in the city. It is plain, it is cheap, and for anyone working in the Zona Franca or at the Ciutat de la Justícia it is the shortest commute in Barcelona.",
    strengths: [
      "The cheapest rents inside the city boundary after Nou Barris",
      "Metro L10 Sud opened here and is fast and empty",
      "Walk or cycle to the Zona Franca employers",
      "Montjuïc directly above",
    ],
    tradeoffs: [
      "Industrial surroundings and lorry traffic",
      "Very little in the way of shops or eating out",
      "Thirty minutes to the centre",
      "Air quality near the port and the Ronda Litoral",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "sant-andreu",
    name: "Sant Andreu de Palomar",
    borough: "Sant Andreu",
    centroid: { lat: 41.4350, lng: 2.1900 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 880, twoBedMedianGbp: 1150, source: "market_review", asOf: AS_OF },
    roomDistrict: "sant-andreu",
    mainStations: [
      { name: "Sant Andreu", lines: ["Metro L1", "Rodalies R2", "Rodalies R11"] },
      { name: "Fabra i Puig", lines: ["Metro L1"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 3, cafeDensity: 7, gymDensity: 5,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 5, safety: 7, connectivity: 8,
    },
    summary:
      "An independent town until 1897 with a genuine main square, a rambla and a strong Catalan identity that has survived a century of absorption. Cheap, entirely untouristed, and the future site of the new high-speed rail station.",
    strengths: [
      "A real town centre with a square, market and rambla",
      "Metro L1 plus two Rodalies lines",
      "Among the cheapest rents on the metro",
      "Strong local identity and no tourism whatsoever",
    ],
    tradeoffs: [
      "Twenty-five to thirty minutes to the centre",
      "The rail corridor and Meridiana cut it up badly",
      "Long-running construction around the new station",
      "Few restaurants worth crossing the city for",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "sant-cugat",
    name: "Sant Cugat del Vallès",
    borough: "Àrea metropolitana",
    centroid: { lat: 41.4720, lng: 2.0850 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 1050, twoBedMedianGbp: 1380, source: "market_review", asOf: AS_OF },
    roomDistrict: "metropolitana",
    mainStations: [
      { name: "Sant Cugat", lines: ["FGC S1", "FGC S2"] },
      { name: "Volpelleres", lines: ["FGC S2"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 9, nightlife: 3, cafeDensity: 7, gymDensity: 7,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 5, safety: 10, connectivity: 6,
    },
    summary:
      "On the far side of Collserola, reached through the FGC tunnel, and the single most popular destination for families leaving Barcelona. It has a Romanesque monastery, a large business park, several international schools and the highest average income in Catalonia.",
    strengths: [
      "Several international and bilingual schools",
      "Collserola on one side and open Vallès country on the other",
      "Houses with gardens, which the city does not offer",
      "A substantial business park on the doorstep",
    ],
    tradeoffs: [
      "The FGC tunnel is the only quick way in and out",
      "Expensive — closer to city prices than suburban ones",
      "Forty-five minutes to the beach or the old city",
      "Quiet and residential to the point of dull",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "esplugues",
    name: "Esplugues & Cornellà",
    borough: "Àrea metropolitana",
    centroid: { lat: 41.3760, lng: 2.0890 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 830, twoBedMedianGbp: 1090, source: "market_review", asOf: AS_OF },
    roomDistrict: "metropolitana",
    mainStations: [
      { name: "Cornellà Centre", lines: ["Metro L5", "Rodalies R1", "Rodalies R4", "Tram T1"] },
      { name: "Can Vidalet", lines: ["Metro L5"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 6, nightlife: 2, cafeDensity: 5, gymDensity: 6,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 5, safety: 7, connectivity: 8,
    },
    summary:
      "West of the city across the Llobregat plain, with the Sant Joan de Déu children's hospital, a large office cluster and rents a third below the Eixample. Unglamorous, well connected and where a great many people who work in Barcelona actually live.",
    strengths: [
      "Metro L5, tram and two Rodalies lines",
      "Substantially cheaper than any city district",
      "Sant Joan de Déu and the Esplugues office cluster",
      "Larger, newer flats than the old city",
    ],
    tradeoffs: [
      "Post-industrial and functional in appearance",
      "Twenty-five to thirty minutes to Plaça Catalunya",
      "Very little to do locally in the evening",
      "The Ronda de Dalt and the Llobregat corridor are noisy",
    ],
    dataQuality: "sourceBacked",
  },
  // ── Àrea metropolitana ─────────────────────────────────────────────
  {
    id: "hospitalet",
    name: "L'Hospitalet de Llobregat",
    borough: "Àrea metropolitana",
    centroid: { lat: 41.3600, lng: 2.1000 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 820, twoBedMedianGbp: 1080, source: "market_review", asOf: AS_OF },
    roomDistrict: "metropolitana",
    mainStations: [
      { name: "Hospital de Bellvitge", lines: ["Metro L1"] },
      { name: "L'Hospitalet de Llobregat", lines: ["Rodalies R1", "Rodalies R4"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 5, nightlife: 3, cafeDensity: 6, gymDensity: 5,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 5, safety: 6, connectivity: 8,
    },
    summary:
      "The second-largest city in Catalonia, adjoining Barcelona so directly that the boundary is invisible on the ground, and the most densely populated municipality in the European Union. It is cheaper than anywhere inside the city and served by the same metro.",
    strengths: [
      "Cheaper than any Barcelona district on the metro",
      "Metro L1 and Rodalies straight into the centre",
      "Its own markets, hospital and town centre",
      "Fifteen minutes to Plaça Espanya",
    ],
    tradeoffs: [
      "Extraordinary density, with very little open space",
      "Post-industrial and functional in appearance",
      "Deprivation in several neighbourhoods",
      "Little that would bring you there other than price",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "badalona",
    name: "Badalona & Sant Adrià",
    borough: "Àrea metropolitana",
    centroid: { lat: 41.4500, lng: 2.2470 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 780, twoBedMedianGbp: 1020, source: "market_review", asOf: AS_OF },
    roomDistrict: "metropolitana",
    mainStations: [
      { name: "Badalona Pompeu Fabra", lines: ["Metro L2"] },
      { name: "Badalona", lines: ["Rodalies R1"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 3, cafeDensity: 6, gymDensity: 5,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 5, safety: 6, connectivity: 7,
    },
    summary:
      "Along the coast north-east of the city with its own beach, its own basketball team and a genuine town identity. It is the cheapest coastal option in the metropolitan area and the metro reaches it, which is more than most seaside towns anywhere can say.",
    strengths: [
      "Its own beach, far less crowded than Barceloneta",
      "Metro L2 and Rodalies both serve it",
      "Cheapest rents covered in this section",
      "A real town centre with a market and a rambla",
    ],
    tradeoffs: [
      "Thirty-five minutes to central Barcelona",
      "Post-industrial edges and some deprivation",
      "The Besòs corridor is not attractive",
      "Fewer amenities than the city",
    ],
    dataQuality: "sourceBacked",
  },
];
