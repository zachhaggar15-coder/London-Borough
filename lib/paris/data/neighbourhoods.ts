import { PARIS_RENT_REVIEW_AS_OF } from "@/lib/paris/data/market";
import type { ParisRoomDistrict } from "@/lib/paris/data/market";
import type { Neighbourhood } from "@/lib/types";

/**
 * Paris quartiers and the near suburbs, written for a British reader.
 *
 * Paris is dense enough that a "neighbourhood" here is smaller than
 * anywhere else on this site — the whole city fits inside the périphérique
 * at about half the area of inner London — so these are quartiers rather
 * than districts, and the distances between them are walkable in a way
 * they are not in Manchester or Leeds.
 *
 * The petite couronne entries matter more than their number suggests.
 * The city boundary is tight and the metro crosses it freely, so
 * Montreuil and Saint-Ouen are functionally inner Paris at a materially
 * lower rent, which is where a great many arriving anglophones end up.
 */

const AS_OF = PARIS_RENT_REVIEW_AS_OF;

export type ParisNeighbourhood = Neighbourhood & {
  roomDistrict: ParisRoomDistrict;
};

export const PARIS_NEIGHBOURHOODS: ParisNeighbourhood[] = [
  // ── Paris Centre ───────────────────────────────────────────────────
  {
    id: "marais",
    name: "Le Marais",
    borough: "Paris Centre (1er–4e)",
    centroid: { lat: 48.8590, lng: 2.3620 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1550, twoBedMedianGbp: 2400, source: "market_review", asOf: AS_OF },
    roomDistrict: "centre",
    mainStations: [
      { name: "Saint-Paul", lines: ["Métro 1"] },
      { name: "République", lines: ["Métro 3", "Métro 5", "Métro 8", "Métro 9", "Métro 11"] },
    ],
    lifestyle: {
      livelyVsQuiet: 8, greenSpace: 4, nightlife: 8, cafeDensity: 10, gymDensity: 6,
      walkability: 10, foodScene: 9, youngProfessionalDensity: 8, safety: 7, connectivity: 10,
    },
    summary:
      "The one part of central Paris that escaped Haussmann, so the streets are medieval and the buildings are older than the boulevards around them. It is the city's gay quarter, its historic Jewish quarter and its most concentrated run of galleries and boutiques, all in about a square kilometre.",
    strengths: [
      "Walk to almost everything in central Paris",
      "The densest café and restaurant scene in the city",
      "Place des Vosges and the Musée Picasso on the doorstep",
      "Sunday opening, which most of Paris still does not do",
    ],
    tradeoffs: [
      "Tourist volume is relentless and year-round",
      "Very expensive per square metre and the flats are small",
      "Old buildings, no lifts, and stairs that were not built for furniture",
      "Weekend noise on the main streets",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "les-halles",
    name: "Les Halles & Montorgueil",
    borough: "Paris Centre (1er–4e)",
    centroid: { lat: 48.8640, lng: 2.3470 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1450, twoBedMedianGbp: 2250, source: "market_review", asOf: AS_OF },
    roomDistrict: "centre",
    mainStations: [
      { name: "Châtelet–Les Halles", lines: ["RER A", "RER B", "RER D", "Métro 1", "Métro 4", "Métro 7", "Métro 11", "Métro 14"] },
      { name: "Sentier", lines: ["Métro 3"] },
    ],
    lifestyle: {
      livelyVsQuiet: 9, greenSpace: 3, nightlife: 8, cafeDensity: 10, gymDensity: 6,
      walkability: 10, foodScene: 9, youngProfessionalDensity: 8, safety: 6, connectivity: 10,
    },
    summary:
      "The dead centre of the transport network — Châtelet–Les Halles is the largest underground station in the world — with the pedestrianised Rue Montorgueil market street running north from it. Unbeatable for getting anywhere and relentless for living in.",
    strengths: [
      "Every RER line and eight métro lines from one station",
      "Rue Montorgueil for daily food shopping",
      "Genuinely central, with no commute to speak of",
      "The Sentier tech cluster on the doorstep",
    ],
    tradeoffs: [
      "Crowded and noisy at essentially all hours",
      "Châtelet itself is grim and can feel unsafe late",
      "Almost no green space",
      "Small flats at high prices",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Latin Quarter & Saint-Germain ──────────────────────────────────
  {
    id: "latin-quarter",
    name: "Latin Quarter",
    borough: "Latin Quarter & Saint-Germain (5e–6e)",
    centroid: { lat: 48.8480, lng: 2.3470 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1350, twoBedMedianGbp: 2100, source: "market_review", asOf: AS_OF },
    roomDistrict: "rive-gauche",
    mainStations: [
      { name: "Cluny–La Sorbonne", lines: ["Métro 10"] },
      { name: "Luxembourg", lines: ["RER B"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 7, nightlife: 6, cafeDensity: 9, gymDensity: 5,
      walkability: 10, foodScene: 8, youngProfessionalDensity: 7, safety: 8, connectivity: 9,
    },
    summary:
      "The Sorbonne, the Panthéon and the Jardin du Luxembourg, with eight hundred years of students behind it. Quieter than its reputation now that the tourist restaurants have taken the lower streets, and still the best-located place in Paris to be young and reading something.",
    strengths: [
      "Jardin du Luxembourg is the finest park in the city",
      "RER B straight to both airports",
      "Bookshops, cinemas and the university",
      "Walk across the river to almost anything",
    ],
    tradeoffs: [
      "Rue de la Huchette and the quays are pure tourism",
      "Very expensive for the space you get",
      "Student turnover in the cheaper blocks",
      "Old buildings, few lifts",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "saint-germain",
    name: "Saint-Germain-des-Prés",
    borough: "Latin Quarter & Saint-Germain (5e–6e)",
    centroid: { lat: 48.8540, lng: 2.3330 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1450, twoBedMedianGbp: 2300, source: "market_review", asOf: AS_OF },
    roomDistrict: "rive-gauche",
    mainStations: [
      { name: "Saint-Germain-des-Prés", lines: ["Métro 4"] },
      { name: "Odéon", lines: ["Métro 4", "Métro 10"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 6, nightlife: 5, cafeDensity: 9, gymDensity: 5,
      walkability: 10, foodScene: 9, youngProfessionalDensity: 6, safety: 9, connectivity: 9,
    },
    summary:
      "Once the intellectual centre of Europe and now one of its most expensive shopping districts, which is a trade most residents seem content with. Beautiful, extremely quiet after nine, and priced accordingly.",
    strengths: [
      "Among the most beautiful streets in Paris",
      "Excellent food markets on Rue de Buci and Rue Cler nearby",
      "Very safe and very quiet",
      "Walking distance to the Louvre, the Luxembourg and the river",
    ],
    tradeoffs: [
      "The highest rents on the left bank",
      "Almost nothing affordable ever comes up",
      "Little life after the shops close",
      "Skews much older and wealthier",
    ],
    dataQuality: "sourceBacked",
  },

  // ── The West ───────────────────────────────────────────────────────
  {
    id: "batignolles",
    name: "Batignolles",
    borough: "Batignolles & Montmartre (17e–18e)",
    centroid: { lat: 48.8870, lng: 2.3200 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1200, twoBedMedianGbp: 1850, source: "market_review", asOf: AS_OF },
    roomDistrict: "montmartre",
    mainStations: [
      { name: "Rome", lines: ["Métro 2"] },
      { name: "Pont Cardinet", lines: ["Transilien L"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 8, nightlife: 5, cafeDensity: 9, gymDensity: 6,
      walkability: 9, foodScene: 8, youngProfessionalDensity: 8, safety: 8, connectivity: 8,
    },
    summary:
      "A village square, a covered market and the Parc Clichy-Batignolles built on the old rail yards, which made this the most sought-after family quarter in Paris over about a decade. It is what people mean when they say a Paris neighbourhood feels like a small town.",
    strengths: [
      "A genuine village square with a weekly market",
      "The Martin Luther King park, the newest large park in Paris",
      "Excellent independent food shops",
      "Quieter than anywhere comparable this central",
    ],
    tradeoffs: [
      "Prices have risen faster here than anywhere in Paris",
      "The périphérique and the rail cutting on two sides",
      "Very family-oriented; quiet in the evening",
      "Métro 2 is the only line, and it is slow",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "passy",
    name: "Passy & Auteuil",
    borough: "The West (7e, 8e, 16e)",
    centroid: { lat: 48.8570, lng: 2.2760 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1300, twoBedMedianGbp: 2050, source: "market_review", asOf: AS_OF },
    roomDistrict: "ouest",
    mainStations: [
      { name: "La Muette", lines: ["Métro 9"] },
      { name: "Boulainvilliers", lines: ["RER C"] },
    ],
    lifestyle: {
      livelyVsQuiet: 2, greenSpace: 9, nightlife: 2, cafeDensity: 6, gymDensity: 6,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 4, safety: 10, connectivity: 8,
    },
    summary:
      "The 16th is where wealthy Paris lives, and it is as quiet, as safe and as unexciting as that suggests. The Bois de Boulogne on one side and the river on the other, large Haussmannian flats, and international schools — the standard landing spot for a corporate relocation with children.",
    strengths: [
      "The Bois de Boulogne, eight hundred hectares of it",
      "The largest flats in Paris for the money",
      "Among the safest and quietest arrondissements",
      "Several international and bilingual schools",
    ],
    tradeoffs: [
      "Almost nothing happens here, ever",
      "Expensive, and the good buildings rarely turn over",
      "A long way from the interesting half of the city",
      "Skews much older",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Grands Boulevards & Canal ──────────────────────────────────────
  {
    id: "canal-saint-martin",
    name: "Canal Saint-Martin",
    borough: "Grands Boulevards & Canal (9e–10e)",
    centroid: { lat: 48.8710, lng: 2.3630 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1250, twoBedMedianGbp: 1900, source: "market_review", asOf: AS_OF },
    roomDistrict: "canal",
    mainStations: [
      { name: "République", lines: ["Métro 3", "Métro 5", "Métro 8", "Métro 9", "Métro 11"] },
      { name: "Gare de l'Est", lines: ["Métro 4", "Métro 5", "Métro 7", "SNCF"] },
    ],
    lifestyle: {
      livelyVsQuiet: 8, greenSpace: 5, nightlife: 8, cafeDensity: 10, gymDensity: 6,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 9, safety: 6, connectivity: 9,
    },
    summary:
      "Iron footbridges, plane trees and the highest concentration of people in their twenties drinking on a kerb anywhere in Paris. The canal has been the city's fashionable quarter for fifteen years and shows no sign of stopping.",
    strengths: [
      "The canal banks themselves, closed to traffic on Sundays",
      "The best bar and small-restaurant density in the city",
      "Five métro lines at République",
      "Eurostar at Gare du Nord, ten minutes' walk",
    ],
    tradeoffs: [
      "Loud on summer evenings, and the noise carries over water",
      "The northern end towards Stalingrad has real problems",
      "Rents have climbed sharply",
      "Very little green space beyond the canal itself",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "south-pigalle",
    name: "South Pigalle & Martyrs",
    borough: "Grands Boulevards & Canal (9e–10e)",
    centroid: { lat: 48.8790, lng: 2.3390 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1250, twoBedMedianGbp: 1950, source: "market_review", asOf: AS_OF },
    roomDistrict: "canal",
    mainStations: [
      { name: "Saint-Georges", lines: ["Métro 12"] },
      { name: "Pigalle", lines: ["Métro 2", "Métro 12"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 3, nightlife: 8, cafeDensity: 10, gymDensity: 6,
      walkability: 10, foodScene: 9, youngProfessionalDensity: 8, safety: 7, connectivity: 9,
    },
    summary:
      "The slope below Montmartre, rebranded SoPi about a decade ago and genuinely transformed by it — Rue des Martyrs is the best food street in Paris and the old red-light strip above it has become cocktail bars. Central, steep and increasingly expensive.",
    strengths: [
      "Rue des Martyrs for food shopping, without equal",
      "Walk to Montmartre, Opéra and the Grands Boulevards",
      "The strongest bar scene in central Paris",
      "Beautiful nineteenth-century buildings",
    ],
    tradeoffs: [
      "The Pigalle end is still Pigalle at night",
      "Steep enough to matter with shopping",
      "Prices now rival the Marais",
      "Almost no green space",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Bastille & Bercy ───────────────────────────────────────────────
  {
    id: "oberkampf",
    name: "Oberkampf & Saint-Ambroise",
    borough: "Bastille & Bercy (11e–12e)",
    centroid: { lat: 48.8650, lng: 2.3760 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1150, twoBedMedianGbp: 1800, source: "market_review", asOf: AS_OF },
    roomDistrict: "bastille",
    mainStations: [
      { name: "Oberkampf", lines: ["Métro 5", "Métro 9"] },
      { name: "Parmentier", lines: ["Métro 3"] },
    ],
    lifestyle: {
      livelyVsQuiet: 8, greenSpace: 4, nightlife: 9, cafeDensity: 9, gymDensity: 6,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 9, safety: 7, connectivity: 9,
    },
    summary:
      "The 11th is where Paris in its thirties actually lives, and Oberkampf is its spine — bars three deep along one street, the best natural wine in the city, and enough ordinary residential streets behind it to sleep. The most reliable answer for a first flat in Paris.",
    strengths: [
      "Unmatched bar and restaurant density outside the centre",
      "Genuinely mixed rather than tourist or corporate",
      "Well connected by four métro lines",
      "Better value than the Marais for a ten-minute walk",
    ],
    tradeoffs: [
      "Rue Oberkampf itself is loud until two",
      "Very little green space",
      "Small flats in old buildings",
      "Prices no longer represent much of a discount",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "bastille",
    name: "Bastille & Faubourg Saint-Antoine",
    borough: "Bastille & Bercy (11e–12e)",
    centroid: { lat: 48.8530, lng: 2.3720 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1150, twoBedMedianGbp: 1780, source: "market_review", asOf: AS_OF },
    roomDistrict: "bastille",
    mainStations: [
      { name: "Bastille", lines: ["Métro 1", "Métro 5", "Métro 8"] },
      { name: "Ledru-Rollin", lines: ["Métro 8"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 6, nightlife: 8, cafeDensity: 9, gymDensity: 6,
      walkability: 9, foodScene: 8, youngProfessionalDensity: 8, safety: 7, connectivity: 9,
    },
    summary:
      "The old furniture-making quarter, still full of the courtyards the workshops used, with the Coulée verte running along a disused viaduct above it — the elevated park New York copied for the High Line. Central, well connected and slightly cheaper than the Marais across the road.",
    strengths: [
      "The Coulée verte, four kilometres of elevated park",
      "Marché d'Aligre, the best market in central Paris",
      "Métro 1 straight along the spine of the city",
      "Hidden courtyards and workshops throughout",
    ],
    tradeoffs: [
      "Place de la Bastille itself is a traffic island",
      "Rue de la Roquette is loud at weekends",
      "Old buildings with narrow stairs",
      "Gentrifying fast, with prices to match",
    ],
    dataQuality: "sourceBacked",
  },

  // ── The South ──────────────────────────────────────────────────────
  {
    id: "butte-aux-cailles",
    name: "Butte-aux-Cailles",
    borough: "The South (13e, 14e, 15e)",
    centroid: { lat: 48.8280, lng: 2.3500 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1080, twoBedMedianGbp: 1680, source: "market_review", asOf: AS_OF },
    roomDistrict: "sud",
    mainStations: [
      { name: "Corvisart", lines: ["Métro 6"] },
      { name: "Place d'Italie", lines: ["Métro 5", "Métro 6", "Métro 7"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 6, nightlife: 7, cafeDensity: 8, gymDensity: 5,
      walkability: 9, foodScene: 8, youngProfessionalDensity: 7, safety: 8, connectivity: 8,
    },
    summary:
      "A hill of low houses and cobbled streets that the Haussmann rebuilding missed entirely, sitting above the tower blocks of the 13th. It looks like a village, it drinks like a student quarter, and it is the best-value genuinely charming address in Paris.",
    strengths: [
      "Village streets and low houses, unique in central Paris",
      "A real bar scene without Oberkampf prices",
      "Paris's Chinatown next door for food",
      "Métro 6 runs above ground with the best views in the city",
    ],
    tradeoffs: [
      "Steep, as the name says",
      "The surrounding 13th is dominated by 1970s towers",
      "Further out than it feels on a map",
      "Small housing stock, so little comes up",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "montparnasse",
    name: "Montparnasse & Pernety",
    borough: "The South (13e, 14e, 15e)",
    centroid: { lat: 48.8340, lng: 2.3230 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1120, twoBedMedianGbp: 1720, source: "market_review", asOf: AS_OF },
    roomDistrict: "sud",
    mainStations: [
      { name: "Montparnasse–Bienvenüe", lines: ["Métro 4", "Métro 6", "Métro 12", "Métro 13", "SNCF"] },
      { name: "Pernety", lines: ["Métro 13"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 6, nightlife: 5, cafeDensity: 8, gymDensity: 6,
      walkability: 9, foodScene: 7, youngProfessionalDensity: 7, safety: 8, connectivity: 10,
    },
    summary:
      "The tower is universally disliked and the station beneath it is one of the best-connected points in France. Behind it, the 14th is quiet, residential and among the most liveable parts of central Paris — with the catacombs underneath, which is less of a problem than it sounds.",
    strengths: [
      "Four métro lines plus TGV to the whole west of France",
      "Quiet residential streets minutes from the centre",
      "Excellent value for how central it is",
      "Parc Montsouris and the Cité Universitaire nearby",
    ],
    tradeoffs: [
      "The tower and the station complex are genuinely ugly",
      "Less going on in the evening than the east",
      "Métro 13 is the most overcrowded line in Paris",
      "Some 1970s redevelopment blocks",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Montmartre ─────────────────────────────────────────────────────
  {
    id: "montmartre",
    name: "Montmartre & Abbesses",
    borough: "Batignolles & Montmartre (17e–18e)",
    centroid: { lat: 48.8860, lng: 2.3400 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1150, twoBedMedianGbp: 1780, source: "market_review", asOf: AS_OF },
    roomDistrict: "montmartre",
    mainStations: [
      { name: "Abbesses", lines: ["Métro 12"] },
      { name: "Lamarck–Caulaincourt", lines: ["Métro 12"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 6, nightlife: 6, cafeDensity: 9, gymDensity: 5,
      walkability: 8, foodScene: 8, youngProfessionalDensity: 7, safety: 6, connectivity: 8,
    },
    summary:
      "A hill with a village on it that happens to be inside Paris, and the only part of the city where you can be genuinely lost on a staircase. The north slope towards Lamarck is where people actually live; the south slope belongs to the coach parties.",
    strengths: [
      "Village streets, vineyards and the best view in Paris",
      "The north slope is quiet and residential",
      "Good markets on Rue Lepic and Rue du Poteau",
      "Cheaper than anywhere comparable in the centre",
    ],
    tradeoffs: [
      "Tourist crowds on the south slope are constant",
      "The stairs are not a novelty when carrying shopping",
      "Barbès and the eastern edge have real problems",
      "Only Métro 12, and it is slow",
    ],
    dataQuality: "sourceBacked",
  },

  // ── The North-east ─────────────────────────────────────────────────
  {
    id: "belleville",
    name: "Belleville & Ménilmontant",
    borough: "The North-east (19e–20e)",
    centroid: { lat: 48.8720, lng: 2.3870 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1000, twoBedMedianGbp: 1550, source: "market_review", asOf: AS_OF },
    roomDistrict: "nord-est",
    mainStations: [
      { name: "Belleville", lines: ["Métro 2", "Métro 11"] },
      { name: "Ménilmontant", lines: ["Métro 2"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 6, nightlife: 7, cafeDensity: 9, gymDensity: 5,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 8, safety: 5, connectivity: 8,
    },
    summary:
      "The most genuinely mixed part of Paris and the best value inside the périphérique — a Chinese and North African quarter with a large artist population layered on top, on a hill with a park at the summit and a view down the whole city.",
    strengths: [
      "The best-value central rents in Paris",
      "Outstanding Chinese and North African food",
      "Parc de Belleville and the view from the top",
      "A real neighbourhood rather than a destination",
    ],
    tradeoffs: [
      "Recorded crime is above the Paris average",
      "Boulevard de Belleville is grim in parts",
      "Housing stock is old and variable",
      "Gentrifying, with the tensions that brings",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "buttes-chaumont",
    name: "Buttes-Chaumont",
    borough: "The North-east (19e–20e)",
    centroid: { lat: 48.8800, lng: 2.3820 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1020, twoBedMedianGbp: 1580, source: "market_review", asOf: AS_OF },
    roomDistrict: "nord-est",
    mainStations: [
      { name: "Buttes Chaumont", lines: ["Métro 7bis"] },
      { name: "Jaurès", lines: ["Métro 2", "Métro 5", "Métro 7bis"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 9, nightlife: 5, cafeDensity: 8, gymDensity: 6,
      walkability: 9, foodScene: 8, youngProfessionalDensity: 8, safety: 7, connectivity: 8,
    },
    summary:
      "Wrapped around the most dramatic park in Paris — a former gypsum quarry turned into cliffs, a lake and a temple on a rock — and increasingly the answer for people who want space, greenery and a central commute without paying Batignolles prices.",
    strengths: [
      "The Parc des Buttes-Chaumont, and it is extraordinary",
      "Good value for the space and the location",
      "Rue de Mouzaïa's cottage streets are unlike anywhere else",
      "The canal and Rosa Luxemburg park nearby",
    ],
    tradeoffs: [
      "Métro 7bis is a two-stop shuttle and not much use",
      "The 19th around Stalingrad has significant problems",
      "Hilly enough to notice",
      "Fewer restaurants than the 11th",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Petite couronne ────────────────────────────────────────────────
  {
    id: "montreuil",
    name: "Montreuil",
    borough: "Petite couronne (inner suburbs)",
    centroid: { lat: 48.8620, lng: 2.4430 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 950, twoBedMedianGbp: 1450, source: "market_review", asOf: AS_OF },
    roomDistrict: "banlieue-est",
    mainStations: [
      { name: "Mairie de Montreuil", lines: ["Métro 9"] },
      { name: "Croix de Chavaux", lines: ["Métro 9"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 7, nightlife: 6, cafeDensity: 8, gymDensity: 5,
      walkability: 8, foodScene: 8, youngProfessionalDensity: 8, safety: 6, connectivity: 8,
    },
    summary:
      "Just outside the périphérique on Métro 9 and comfortably the most interesting suburb of Paris — a former market-gardening town that absorbed the artists and families the 11th priced out, and now has the bars and workshops to prove it. Widely described as the 21st arrondissement.",
    strengths: [
      "Métro 9 direct into the 11th and the centre",
      "Substantially cheaper than anywhere inside the boundary",
      "Real houses with gardens, which Paris does not have",
      "A strong independent food and cultural scene",
    ],
    tradeoffs: [
      "Parts of the town remain genuinely deprived",
      "Recorded crime above the Paris average",
      "The périphérique and the A186 cut it up",
      "Twenty-five minutes to the centre, not ten",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "saint-ouen",
    name: "Saint-Ouen",
    borough: "Petite couronne (inner suburbs)",
    centroid: { lat: 48.9110, lng: 2.3340 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 920, twoBedMedianGbp: 1400, source: "market_review", asOf: AS_OF },
    roomDistrict: "banlieue-nord",
    mainStations: [
      { name: "Mairie de Saint-Ouen", lines: ["Métro 13", "Métro 14"] },
      { name: "Garibaldi", lines: ["Métro 13"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 6, nightlife: 4, cafeDensity: 7, gymDensity: 6,
      walkability: 7, foodScene: 7, youngProfessionalDensity: 7, safety: 5, connectivity: 9,
    },
    summary:
      "The Puces de Saint-Ouen flea market, the 2024 Olympic village converted to housing, and the Métro 14 extension that put it eight minutes from Saint-Lazare. It is changing faster than anywhere else in the inner suburbs.",
    strengths: [
      "Métro 14 reaches central Paris in under ten minutes",
      "New, energy-efficient housing from the Olympic conversion",
      "The largest antiques market in the world at the weekend",
      "Meaningfully cheaper than the 17th or 18th across the boundary",
    ],
    tradeoffs: [
      "Long-standing deprivation in the older quarters",
      "Recorded crime above the regional average",
      "Still a building site in places",
      "Little charm outside the market quarter",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "boulogne",
    name: "Boulogne-Billancourt",
    borough: "Petite couronne (inner suburbs)",
    centroid: { lat: 48.8360, lng: 2.2400 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1080, twoBedMedianGbp: 1650, source: "market_review", asOf: AS_OF },
    roomDistrict: "banlieue-ouest",
    mainStations: [
      { name: "Boulogne–Jean Jaurès", lines: ["Métro 10"] },
      { name: "Marcel Sembat", lines: ["Métro 9"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 3, cafeDensity: 7, gymDensity: 7,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 6, safety: 9, connectivity: 8,
    },
    summary:
      "The largest suburb in France and effectively an extension of the 16th, with the Bois de Boulogne on its northern edge and a great many corporate headquarters inside it. Safe, well-served, expensive for a suburb and popular with relocating families.",
    strengths: [
      "Two métro lines and quick access to La Défense",
      "The Bois de Boulogne and the Île Seguin riverside",
      "Very safe, with strong schools",
      "Larger, newer flats than central Paris",
    ],
    tradeoffs: [
      "Expensive — closer to Paris prices than suburban ones",
      "Almost nothing to do in the evening",
      "Corporate and quiet in character",
      "Not on the RER, so airport journeys are awkward",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "pantin",
    name: "Pantin & Les Lilas",
    borough: "Petite couronne (inner suburbs)",
    centroid: { lat: 48.8940, lng: 2.4090 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 900, twoBedMedianGbp: 1380, source: "market_review", asOf: AS_OF },
    roomDistrict: "banlieue-est",
    mainStations: [
      { name: "Église de Pantin", lines: ["Métro 5"] },
      { name: "Hoche", lines: ["Métro 5"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 6, nightlife: 4, cafeDensity: 7, gymDensity: 5,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 7, safety: 6, connectivity: 8,
    },
    summary:
      "The canal continues north out of Paris into Pantin, and the old industrial buildings along it have become studios, offices and lofts. Hermès and the Centre National de la Danse are here; so is a good deal of ordinary social housing, and the two coexist unevenly.",
    strengths: [
      "The canal bank continues straight into the 19th",
      "Among the cheapest rents on the métro network",
      "Large converted industrial spaces",
      "Métro 5 and the RER E both serve it",
    ],
    tradeoffs: [
      "Sharp contrasts from one street to the next",
      "Recorded crime above the regional average",
      "Little green space beyond the canal",
      "The A86 and the périphérique are close",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "saint-germain-en-laye",
    name: "Saint-Germain-en-Laye",
    borough: "Petite couronne (inner suburbs)",
    centroid: { lat: 48.8980, lng: 2.0940 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 1000, twoBedMedianGbp: 1520, source: "market_review", asOf: AS_OF },
    roomDistrict: "banlieue-ouest",
    mainStations: [
      { name: "Saint-Germain-en-Laye", lines: ["RER A"] },
      { name: "Achères-Grand-Cormier", lines: ["RER A"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 10, nightlife: 3, cafeDensity: 7, gymDensity: 6,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 4, safety: 9, connectivity: 7,
    },
    summary:
      "A royal town at the western end of the RER A, with a château, a terrace overlooking the Seine and a forest of thirty-five square kilometres behind it. It has the largest established British community in Île-de-France and the schools that go with it, which is why so many corporate relocations with children land here.",
    strengths: [
      "The forest and the château terrace on the doorstep",
      "RER A direct to La Défense in fifteen minutes",
      "The most established anglophone community in the region",
      "Houses with gardens, which Paris does not offer",
    ],
    tradeoffs: [
      "Forty minutes to central Paris, and on the RER A at that",
      "Expensive for a suburb, and rising",
      "Very quiet — this is a town, not a district",
      "You will be dependent on one rail line",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "vincennes",
    name: "Vincennes & Saint-Mandé",
    borough: "Petite couronne (inner suburbs)",
    centroid: { lat: 48.8470, lng: 2.4370 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1050, twoBedMedianGbp: 1600, source: "market_review", asOf: AS_OF },
    roomDistrict: "banlieue-est",
    mainStations: [
      { name: "Château de Vincennes", lines: ["Métro 1"] },
      { name: "Vincennes", lines: ["RER A"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 10, nightlife: 3, cafeDensity: 7, gymDensity: 6,
      walkability: 9, foodScene: 7, youngProfessionalDensity: 5, safety: 9, connectivity: 9,
    },
    summary:
      "The eastern counterpart to Boulogne: a château, the largest park in Paris on its doorstep, Métro 1 and the RER A, and a small-town centre that families move out of the 11th and 12th to reach. Expensive for a suburb and consistently the most sought-after one on this side.",
    strengths: [
      "The Bois de Vincennes, nine hundred hectares",
      "Métro 1 and RER A, so both central Paris and La Défense",
      "A proper town centre with a market",
      "Very safe, with strong schools",
    ],
    tradeoffs: [
      "Prices approach central Paris levels",
      "Quiet in the evening in a way the 11th is not",
      "Skews older and more settled",
      "Little rental stock comes up",
    ],
    dataQuality: "sourceBacked",
  },
];
