import { GENEVA_RENT_REVIEW_AS_OF } from "@/lib/geneva/data/rent-market";
import type { GenevaRoomDistrict } from "@/lib/geneva/data/rent-market";
import type { Neighbourhood } from "@/lib/types";

/**
 * Geneva and the cross-border basin.
 *
 * Written for someone arriving from Britain, which shapes what each
 * entry says. A Geneva flat search is not really a search for a
 * neighbourhood — the canton is small enough to cross in half an hour —
 * it is a search for a *jurisdiction*. Live in Vernier and you are a
 * Swiss resident paying Swiss health insurance; live twenty minutes
 * away in Annemasse and you are a French resident with a G permit, half
 * the rent, French healthcare and an annual tax declaration in two
 * countries. Both are completely normal and the trade-offs are entirely
 * different, so both are here.
 *
 * Rents are advertised-market estimates in Swiss francs, converted from
 * euros for the French communes. See data/rent-market.ts for why the
 * published OCSTAT average is not used as the headline.
 */

const AS_OF = GENEVA_RENT_REVIEW_AS_OF;

export type GenevaNeighbourhood = Neighbourhood & {
  roomDistrict: GenevaRoomDistrict;
};

export const GENEVA_NEIGHBOURHOODS: GenevaNeighbourhood[] = [
  // ── Ville de Genève ────────────────────────────────────────────────
  {
    id: "cite-centre",
    name: "Cité & Rues Basses",
    borough: "Ville de Genève",
    centroid: { lat: 46.2020, lng: 6.1460 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 2300, twoBedMedianGbp: 3100, source: "market_review", asOf: AS_OF },
    roomDistrict: "geneve-centre",
    mainStations: [
      { name: "Genève-Cornavin", lines: ["CFF", "Léman Express"] },
      { name: "Bel-Air", lines: ["TPG tram 12", "TPG tram 18", "TPG bus"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 4, nightlife: 6, cafeDensity: 8, gymDensity: 6,
      walkability: 10, foodScene: 8, youngProfessionalDensity: 7, safety: 8, connectivity: 10,
    },
    summary:
      "The medieval old town on the hill and the shopping streets below it, with every tram line in the canton passing through Bel-Air. It is the most walkable address in Geneva and the one where you are most likely to be paying a great deal for very little floor area.",
    strengths: [
      "Every tram and bus route in the canton converges here",
      "Walk to the banking district, the old town and the lake",
      "Genuinely good food at every price point",
      "No need for a car, and nowhere to put one anyway",
    ],
    tradeoffs: [
      "The highest rents in the canton per square metre",
      "Old-town flats are small, dark and rarely renovated",
      "Almost no green space that is not the Bastions",
      "Dead on a Sunday, like most of Switzerland",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "paquis",
    name: "Pâquis",
    borough: "Ville de Genève",
    centroid: { lat: 46.2130, lng: 6.1490 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 1950, twoBedMedianGbp: 2600, source: "market_review", asOf: AS_OF },
    roomDistrict: "geneve-centre",
    mainStations: [
      { name: "Genève-Cornavin", lines: ["CFF", "Léman Express"] },
      { name: "Pâquis", lines: ["TPG bus 1", "TPG bus 25"] },
    ],
    lifestyle: {
      livelyVsQuiet: 9, greenSpace: 4, nightlife: 9, cafeDensity: 9, gymDensity: 5,
      walkability: 10, foodScene: 9, youngProfessionalDensity: 8, safety: 5, connectivity: 10,
    },
    summary:
      "The one part of Geneva that behaves like a city rather than a very clean office park. Pâquis is the red-light district, the immigrant quarter and the best eating in the canton simultaneously, wedged between the station and the lake, and it divides opinion more sharply than anywhere else here.",
    strengths: [
      "By far the best and cheapest food in Geneva",
      "Two minutes' walk from Cornavin station",
      "Bains des Pâquis on the lake, open year-round",
      "The only genuinely late nightlife in the canton",
    ],
    tradeoffs: [
      "Street prostitution and drug dealing are visible and constant",
      "Noisy at night in a way nowhere else in Geneva is",
      "Old, poorly insulated buildings",
      "The reputation follows the postcode when you tell people",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "eaux-vives",
    name: "Eaux-Vives",
    borough: "Ville de Genève",
    centroid: { lat: 46.2030, lng: 6.1620 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 2200, twoBedMedianGbp: 2950, source: "market_review", asOf: AS_OF },
    roomDistrict: "geneve-rive-gauche",
    mainStations: [
      { name: "Genève-Eaux-Vives", lines: ["Léman Express"] },
      { name: "Rive", lines: ["TPG tram 12", "TPG bus 2", "TPG bus 6"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 7, nightlife: 6, cafeDensity: 9, gymDensity: 7,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 8, safety: 8, connectivity: 9,
    },
    summary:
      "Left bank, lakeside, and the address most arriving professionals end up wanting. The Léman Express station opened underneath it in 2019 and turned a pleasant quarter into the best-connected one in the canton — Annemasse in fifteen minutes, the airport in twenty.",
    strengths: [
      "Léman Express to France, the airport and Coppet",
      "Parc La Grange and the lake at the end of the street",
      "Rue des Eaux-Vives for restaurants and small shops",
      "Walk to the centre in fifteen minutes",
    ],
    tradeoffs: [
      "Expensive, and the new-build around the station more so",
      "Very little available at any price",
      "The quai is a traffic corridor",
      "Skews international and transient",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "plainpalais",
    name: "Plainpalais",
    borough: "Ville de Genève",
    centroid: { lat: 46.1970, lng: 6.1400 },
    travelBand: "central",
    rent: { oneBedMedianGbp: 2050, twoBedMedianGbp: 2750, source: "market_review", asOf: AS_OF },
    roomDistrict: "geneve-centre",
    mainStations: [
      { name: "Plainpalais", lines: ["TPG tram 12", "TPG tram 15", "TPG tram 18"] },
      { name: "Genève-Cornavin", lines: ["CFF", "Léman Express"] },
    ],
    lifestyle: {
      livelyVsQuiet: 7, greenSpace: 6, nightlife: 7, cafeDensity: 9, gymDensity: 6,
      walkability: 10, foodScene: 8, youngProfessionalDensity: 8, safety: 7, connectivity: 9,
    },
    summary:
      "The university quarter, built around a vast gravel diamond that is a flea market on Wednesdays and Saturdays and a skate park the rest of the time. Younger, scruffier and more alive than Geneva generally manages, and the closest the city has to a student district.",
    strengths: [
      "The plaine itself — market, food trucks, festivals, space",
      "University and hospital both walkable",
      "The densest tram interchange outside Bel-Air",
      "Cheaper than Eaux-Vives for a comparable location",
    ],
    tradeoffs: [
      "Busy and noisy around the plaine at weekends",
      "Student turnover in the cheaper blocks",
      "Traffic on the boulevards is heavy",
      "Very little family-sized stock",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "jonction",
    name: "Jonction",
    borough: "Ville de Genève",
    centroid: { lat: 46.1990, lng: 6.1290 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1900, twoBedMedianGbp: 2500, source: "market_review", asOf: AS_OF },
    roomDistrict: "geneve-rive-gauche",
    mainStations: [
      { name: "Jonction", lines: ["TPG tram 14", "TPG tram 15"] },
      { name: "Genève-Lancy-Pont-Rouge", lines: ["Léman Express"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 7, nightlife: 6, cafeDensity: 8, gymDensity: 5,
      walkability: 9, foodScene: 7, youngProfessionalDensity: 7, safety: 7, connectivity: 8,
    },
    summary:
      "Where the Rhône and the Arve meet, one brown and one blue, and the point where Geneva's alternative scene concentrated after the squats of the 1990s were cleared. Still the least corporate part of the city, and the best value inside the ring.",
    strengths: [
      "The pointe de la Jonction and both riverbanks",
      "Artamis and the surviving cultural spaces",
      "Cheaper than anywhere comparable on the left bank",
      "Quick tram to the centre and the station",
    ],
    tradeoffs: [
      "Industrial edges and the ring road",
      "Fewer shops than the numbers suggest",
      "Rougher after dark near the river",
      "Redevelopment is steadily raising prices",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "servette",
    name: "Servette & Petit-Saconnex",
    borough: "Ville de Genève",
    centroid: { lat: 46.2160, lng: 6.1330 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1850, twoBedMedianGbp: 2450, source: "market_review", asOf: AS_OF },
    roomDistrict: "geneve-rive-droite",
    mainStations: [
      { name: "Servette", lines: ["TPG tram 14", "TPG bus 3", "TPG bus 22"] },
      { name: "Genève-Cornavin", lines: ["CFF", "Léman Express"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 6, nightlife: 4, cafeDensity: 7, gymDensity: 6,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 6, safety: 7, connectivity: 8,
    },
    summary:
      "Right bank, residential, and the most ordinary place in central Geneva — which after a week of looking at Eaux-Vives prices starts to feel like a virtue. Good tram links, a real local high street and families who have been there for generations.",
    strengths: [
      "Genuinely local shops rather than international chains",
      "Ten minutes to Cornavin by tram",
      "Close to the international organisations quarter",
      "Better value per square metre than the left bank",
    ],
    tradeoffs: [
      "Little to do in the evening",
      "1960s blocks dominate parts of it",
      "Not lakeside, and it knows it",
      "Parking is contested",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "champel",
    name: "Champel",
    borough: "Ville de Genève",
    centroid: { lat: 46.1900, lng: 6.1520 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 2150, twoBedMedianGbp: 2900, source: "market_review", asOf: AS_OF },
    roomDistrict: "geneve-rive-gauche",
    mainStations: [
      { name: "Genève-Champel", lines: ["Léman Express"] },
      { name: "Hôpital", lines: ["TPG bus 1", "TPG bus 5", "TPG bus 7"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 2, cafeDensity: 6, gymDensity: 6,
      walkability: 8, foodScene: 6, youngProfessionalDensity: 5, safety: 9, connectivity: 8,
    },
    summary:
      "Belle époque apartment blocks above the Arve gorge, the university hospital, and the quietest well-connected address in the city. Champel is where Geneva's doctors and diplomats live, and it is as calm and as costly as that implies.",
    strengths: [
      "Its own Léman Express station since 2019",
      "The Bois de la Bâtie and the Arve gorge paths",
      "Walk to the hospital, which employs a great many people",
      "Among the safest and quietest parts of the city",
    ],
    tradeoffs: [
      "Very little happens here after seven",
      "Expensive and slow to come available",
      "Skews considerably older",
      "Not much in the way of shops",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "saint-jean",
    name: "Saint-Jean & Charmilles",
    borough: "Ville de Genève",
    centroid: { lat: 46.2100, lng: 6.1250 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1800, twoBedMedianGbp: 2400, source: "market_review", asOf: AS_OF },
    roomDistrict: "geneve-rive-droite",
    mainStations: [
      { name: "Charmilles", lines: ["TPG tram 14", "TPG tram 18"] },
      { name: "Genève-Cornavin", lines: ["CFF", "Léman Express"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 6, nightlife: 4, cafeDensity: 7, gymDensity: 5,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 6, safety: 6, connectivity: 8,
    },
    summary:
      "Above the Rhône on the right bank, mixing 1930s workers' housing with newer blocks and a growing set of small restaurants. It is the cheapest part of the Ville de Genève and the one changing fastest.",
    strengths: [
      "Cheapest rents inside the city proper",
      "The Rhône path and the Bois de la Bâtie opposite",
      "Two tram lines into the centre",
      "A genuine neighbourhood feel",
    ],
    tradeoffs: [
      "Mixed housing stock, much of it dated",
      "The rail viaduct and ring road cut it up",
      "Fewer amenities than the left bank",
      "Some blocks have real social problems",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Canton communes ────────────────────────────────────────────────
  {
    id: "carouge",
    name: "Carouge",
    borough: "Carouge",
    centroid: { lat: 46.1830, lng: 6.1390 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1950, twoBedMedianGbp: 2600, source: "market_review", asOf: AS_OF },
    roomDistrict: "carouge-lancy",
    mainStations: [
      { name: "Marché (Carouge)", lines: ["TPG tram 12", "TPG tram 18"] },
      { name: "Genève-Lancy-Pont-Rouge", lines: ["Léman Express"] },
    ],
    lifestyle: {
      livelyVsQuiet: 6, greenSpace: 6, nightlife: 7, cafeDensity: 9, gymDensity: 5,
      walkability: 9, foodScene: 9, youngProfessionalDensity: 7, safety: 8, connectivity: 8,
    },
    summary:
      "Built by the King of Sardinia in the eighteenth century as a rival to Calvin's Geneva, and it still feels like a different city — low Italianate houses, courtyards, artisans and by some distance the best bar and restaurant scene in the canton.",
    strengths: [
      "Genuinely charming, and unlike anywhere else in Switzerland",
      "The best nightlife and independent retail in the canton",
      "Its own commune, with a strong local identity",
      "Tram 12 and 18 straight into the centre",
    ],
    tradeoffs: [
      "Prices now rival the left bank of Geneva",
      "Old buildings with the problems that brings",
      "Very little comes up to rent",
      "Busy and noisy around the market square",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "lancy",
    name: "Lancy",
    borough: "Lancy",
    centroid: { lat: 46.1830, lng: 6.1130 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1750, twoBedMedianGbp: 2300, source: "market_review", asOf: AS_OF },
    roomDistrict: "carouge-lancy",
    mainStations: [
      { name: "Genève-Lancy-Pont-Rouge", lines: ["Léman Express", "CFF"] },
      { name: "Lancy-Bachet", lines: ["Léman Express", "TPG tram 15"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 3, cafeDensity: 6, gymDensity: 6,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 6, safety: 7, connectivity: 9,
    },
    summary:
      "The Pont-Rouge development turned a suburban commune into the canton's second business district, and the Léman Express station under it makes Lancy one of the best-connected addresses in Geneva. It is also, so far, one of the least interesting.",
    strengths: [
      "Two Léman Express stations and a tram line",
      "New, energy-efficient housing stock",
      "Noticeably cheaper than the city",
      "Quick to the airport and to France",
    ],
    tradeoffs: [
      "Very little character; much of it is a building site",
      "Motorway and rail noise in parts",
      "Amenities have not caught up with the housing",
      "Nothing to walk to in the evening",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "vernier",
    name: "Vernier",
    borough: "Vernier",
    centroid: { lat: 46.2170, lng: 6.0850 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1650, twoBedMedianGbp: 2150, source: "market_review", asOf: AS_OF },
    roomDistrict: "vernier-meyrin",
    mainStations: [
      { name: "Vernier", lines: ["Léman Express"] },
      { name: "Châtelaine", lines: ["TPG tram 14", "TPG bus 6"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 6, nightlife: 3, cafeDensity: 5, gymDensity: 5,
      walkability: 6, foodScene: 5, youngProfessionalDensity: 5, safety: 5, connectivity: 8,
    },
    summary:
      "The canton's second-largest commune and its most working-class, built around the Avanchets and Libellules estates. It has the cheapest Swiss-side rents within reach of the centre and the social problems that come with being the place people move to when they cannot afford anywhere else.",
    strengths: [
      "The lowest rents on the Swiss side of the border",
      "Léman Express and tram both serve it",
      "The Rhône and the Bois de la Grille for green space",
      "Close to the airport and the industrial zone",
    ],
    tradeoffs: [
      "Recorded crime is the highest in the canton",
      "Large 1960s and 70s estates in variable condition",
      "Motorway and airport noise",
      "Little in the way of shops or restaurants",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "meyrin",
    name: "Meyrin",
    borough: "Meyrin",
    centroid: { lat: 46.2320, lng: 6.0790 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1700, twoBedMedianGbp: 2200, source: "market_review", asOf: AS_OF },
    roomDistrict: "vernier-meyrin",
    mainStations: [
      { name: "Meyrin", lines: ["TPG tram 14", "TPG tram 18"] },
      { name: "Genève-Aéroport", lines: ["CFF", "Léman Express"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 2, cafeDensity: 5, gymDensity: 6,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 6, safety: 7, connectivity: 8,
    },
    summary:
      "Switzerland's first satellite town, built in the 1960s, and now defined by what sits on its northern edge: CERN. A large share of the commune works there or at the airport, and the international scientific community gives it a character no other Geneva suburb has.",
    strengths: [
      "Walk or cycle to CERN and the airport",
      "Purpose-built with generous green space between blocks",
      "Two tram lines to the centre",
      "Strongly international and used to new arrivals",
    ],
    tradeoffs: [
      "Aircraft noise is constant",
      "Modernist planning has aged unevenly",
      "Almost nothing open in the evening",
      "Far from the lake and the old city",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "chene-bougeries",
    name: "Chêne-Bougeries",
    borough: "Chêne-Bougeries",
    centroid: { lat: 46.1970, lng: 6.1840 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 2000, twoBedMedianGbp: 2700, source: "market_review", asOf: AS_OF },
    roomDistrict: "chenes",
    mainStations: [
      { name: "Chêne-Bougeries", lines: ["TPG tram 12", "TPG tram 17"] },
      { name: "Chêne-Bourg", lines: ["Léman Express"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 2, cafeDensity: 6, gymDensity: 5,
      walkability: 7, foodScene: 6, youngProfessionalDensity: 4, safety: 9, connectivity: 8,
    },
    summary:
      "Leafy, expensive and full of international-school families, on the tram line out towards the French border. It is the commune with one of the lowest tax multipliers in the canton, which matters more to a high earner here than the rent does.",
    strengths: [
      "One of the lowest communal tax rates in the canton",
      "Large gardens and mature trees throughout",
      "Tram 12 and the Léman Express both close",
      "Several international schools within reach",
    ],
    tradeoffs: [
      "Expensive, and family houses rarely come to market",
      "Very quiet in the evening",
      "Route de Chêne is a heavy traffic corridor",
      "Little for anyone without children",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "grand-saconnex",
    name: "Le Grand-Saconnex",
    borough: "Le Grand-Saconnex",
    centroid: { lat: 46.2310, lng: 6.1200 },
    travelBand: "inner",
    rent: { oneBedMedianGbp: 1800, twoBedMedianGbp: 2400, source: "market_review", asOf: AS_OF },
    roomDistrict: "versoix-saconnex",
    mainStations: [
      { name: "Genève-Aéroport", lines: ["CFF", "Léman Express"] },
      { name: "Nations", lines: ["TPG tram 15", "TPG bus 5"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 2, cafeDensity: 5, gymDensity: 6,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 6, safety: 8, connectivity: 9,
    },
    summary:
      "The international quarter: the UN, the WTO, the Red Cross and a hundred missions and NGOs sit on or beside it, and so does the airport. If you have moved to Geneva for one of those organisations this is the obvious place to look, and the commune knows it.",
    strengths: [
      "Walk to the UN and the international organisations",
      "Airport on the doorstep for the constant travel",
      "Tram 15 and excellent bus links",
      "Very used to short-term international arrivals",
    ],
    tradeoffs: [
      "Aircraft noise, and a lot of it",
      "Transient population and little community",
      "Expensive for a suburb",
      "Almost nothing to do locally",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "versoix",
    name: "Versoix",
    borough: "Versoix",
    centroid: { lat: 46.2830, lng: 6.1650 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1700, twoBedMedianGbp: 2250, source: "market_review", asOf: AS_OF },
    roomDistrict: "versoix-saconnex",
    mainStations: [
      { name: "Versoix", lines: ["Léman Express", "CFF"] },
      { name: "Versoix-Bourg", lines: ["TPG bus V", "TPG bus 50"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 9, nightlife: 2, cafeDensity: 5, gymDensity: 4,
      walkability: 7, foodScene: 5, youngProfessionalDensity: 4, safety: 9, connectivity: 7,
    },
    summary:
      "Lakeside, ten minutes up the shore from the city on a train that runs every quarter of an hour, with a public beach, a chocolate factory and the International School of Geneva's La Châtaigneraie campus. The most liveable of the outer communes if you have children.",
    strengths: [
      "Its own lake beach and harbour",
      "Fifteen minutes to Cornavin by train",
      "Strong schools including an international campus",
      "Genuinely quiet and safe",
    ],
    tradeoffs: [
      "Twenty-five minutes from anything to do at night",
      "The lakeside road carries heavy traffic",
      "Skews older and wealthier",
      "Limited rental stock",
    ],
    dataQuality: "sourceBacked",
  },

  // ── Canton de Vaud ─────────────────────────────────────────────────
  {
    id: "nyon",
    name: "Nyon",
    borough: "Canton de Vaud",
    centroid: { lat: 46.3830, lng: 6.2390 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 1600, twoBedMedianGbp: 2100, source: "market_review", asOf: AS_OF },
    roomDistrict: "vaud-nyon",
    mainStations: [
      { name: "Nyon", lines: ["CFF", "Léman Express", "NStCM"] },
      { name: "Nyon-Gare", lines: ["TPN bus"] },
    ],
    lifestyle: {
      livelyVsQuiet: 4, greenSpace: 8, nightlife: 3, cafeDensity: 7, gymDensity: 5,
      walkability: 8, foodScene: 7, youngProfessionalDensity: 5, safety: 9, connectivity: 8,
    },
    summary:
      "A Roman town on the lake twenty-five kilometres up the shore, in a different canton with materially lower taxes and a fast train into Geneva. It is the standard answer for people who want Swiss residency, a real town centre and a smaller tax bill than the canton of Geneva charges.",
    strengths: [
      "Vaud's income tax is meaningfully lower than Geneva's",
      "Twenty minutes to Cornavin on frequent trains",
      "A proper historic town centre with a castle and market",
      "The lake on one side and the Jura on the other",
    ],
    tradeoffs: [
      "A different canton means different rules and schools",
      "Peak trains into Geneva are extremely crowded",
      "Rents have risen sharply as Geneva has spilled over",
      "Forty minutes door to door in practice",
    ],
    dataQuality: "sourceBacked",
  },

  // ── France voisine ─────────────────────────────────────────────────
  {
    id: "annemasse",
    name: "Annemasse",
    borough: "France voisine",
    centroid: { lat: 46.1940, lng: 6.2360 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 900, twoBedMedianGbp: 1200, source: "market_review", asOf: AS_OF },
    roomDistrict: "france-annemasse",
    mainStations: [
      { name: "Annemasse", lines: ["Léman Express", "SNCF TER"] },
      { name: "Annemasse Chablais-Parc", lines: ["Tango tram 17"] },
    ],
    lifestyle: {
      livelyVsQuiet: 5, greenSpace: 6, nightlife: 4, cafeDensity: 7, gymDensity: 5,
      walkability: 8, foodScene: 8, youngProfessionalDensity: 6, safety: 5, connectivity: 9,
    },
    summary:
      "A French town of forty thousand that functions as Geneva's cheapest suburb. The Léman Express reaches Eaux-Vives in fifteen minutes and Cornavin in twenty, and a two-bed here costs less than half what it costs across the border — which is why so many people who work in Geneva live in France.",
    strengths: [
      "Roughly half the rent for a fifteen-minute commute",
      "Léman Express and the tram both cross the border",
      "French supermarkets, markets and restaurant prices",
      "A real town centre rather than a Swiss dormitory",
    ],
    tradeoffs: [
      "You become a French resident with French tax obligations",
      "Cross-border commuters need a G permit from a Swiss employer",
      "Recorded crime is higher than on the Swiss side",
      "Border queues by car are severe at peak",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "saint-julien",
    name: "Saint-Julien-en-Genevois",
    borough: "France voisine",
    centroid: { lat: 46.1440, lng: 6.0830 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 950, twoBedMedianGbp: 1250, source: "market_review", asOf: AS_OF },
    roomDistrict: "france-annemasse",
    mainStations: [
      { name: "Saint-Julien-en-Genevois", lines: ["SNCF TER"] },
      { name: "Perly douane", lines: ["TPG bus D", "TPG bus 22"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 7, nightlife: 2, cafeDensity: 5, gymDensity: 4,
      walkability: 6, foodScene: 6, youngProfessionalDensity: 5, safety: 7, connectivity: 6,
    },
    summary:
      "Immediately south of the border, with the Salève rising behind it and a TPG bus that runs into Geneva as though the frontier were not there. Smaller and quieter than Annemasse, and the standard choice for people working in the Plan-les-Ouates life-sciences cluster.",
    strengths: [
      "French prices ten minutes from Swiss employers",
      "TPG buses run across the border on Swiss timetables",
      "The Salève and the Jura for walking and skiing",
      "Quieter and safer than Annemasse",
    ],
    tradeoffs: [
      "Rail links to Geneva are poor; the bus is the real option",
      "The A40 and the border crossing queue badly",
      "Limited amenities for its size",
      "French residency and tax obligations follow",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "ferney-voltaire",
    name: "Ferney-Voltaire & the Pays de Gex",
    borough: "France voisine",
    centroid: { lat: 46.2560, lng: 6.1080 },
    travelBand: "outer",
    rent: { oneBedMedianGbp: 1000, twoBedMedianGbp: 1300, source: "market_review", asOf: AS_OF },
    roomDistrict: "france-gex",
    mainStations: [
      { name: "Ferney-Voltaire", lines: ["TPG bus F", "TPG bus 66"] },
      { name: "Genève-Aéroport", lines: ["CFF", "Léman Express"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 8, nightlife: 2, cafeDensity: 6, gymDensity: 4,
      walkability: 7, foodScene: 7, youngProfessionalDensity: 5, safety: 8, connectivity: 7,
    },
    summary:
      "Voltaire's town, a mile from Geneva airport and the same distance from CERN, under the Jura. The Pays de Gex is the most anglophone part of France voisine — a great many CERN and UN families live here — and it has the school places and the bilingual services to match.",
    strengths: [
      "Minutes from CERN, the airport and the UN quarter",
      "The most established anglophone community in France voisine",
      "The Jura for skiing and hiking from the doorstep",
      "French prices with Swiss salaries",
    ],
    tradeoffs: [
      "Border traffic in the morning is genuinely bad",
      "No railway; buses and car only",
      "Rents are the highest on the French side",
      "Housing supply has not kept up with demand",
    ],
    dataQuality: "sourceBacked",
  },
  {
    id: "thonon",
    name: "Thonon-les-Bains",
    borough: "France voisine",
    centroid: { lat: 46.3710, lng: 6.4790 },
    travelBand: "fringe",
    rent: { oneBedMedianGbp: 800, twoBedMedianGbp: 1050, source: "market_review", asOf: AS_OF },
    roomDistrict: "france-annemasse",
    mainStations: [
      { name: "Thonon-les-Bains", lines: ["Léman Express", "SNCF TER"] },
      { name: "Thonon port", lines: ["CGN lake ferry"] },
    ],
    lifestyle: {
      livelyVsQuiet: 3, greenSpace: 9, nightlife: 3, cafeDensity: 6, gymDensity: 4,
      walkability: 7, foodScene: 7, youngProfessionalDensity: 4, safety: 8, connectivity: 5,
    },
    summary:
      "A French spa town on the south shore of the lake, forty minutes out, with the Alps immediately behind it and the cheapest rents anywhere in this section. The Léman Express reaches Geneva directly, and the lake ferry to Lausanne is a genuine commuting option.",
    strengths: [
      "The lowest rents covered here by a wide margin",
      "Direct Léman Express trains into Geneva",
      "The lake in front and the Alps behind",
      "A proper French town with markets and real prices",
    ],
    tradeoffs: [
      "Forty to fifty minutes each way, every day",
      "Trains are hourly outside the peak",
      "Long way from anything Swiss you might need",
      "Winter road conditions on the alpine side",
    ],
    dataQuality: "sourceBacked",
  },
];
