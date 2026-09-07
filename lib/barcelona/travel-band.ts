import type { TravelBand } from "@/lib/travel-band";
import type { CityLifestylePage } from "@/lib/city-content";

export const BARCELONA_TRAVEL_BAND_DESCRIPTIONS: Record<TravelBand, string> = {
  central:
    "Ciutat Vella and the Eixample — the old city and Cerdà's grid around it. You walk to most things and the metro covers the rest, and this is where the tourist pressure and the short-let argument are at their sharpest.",
  inner:
    "Gràcia, Poble-sec, Sants, Poblenou and Sant Gervasi: one to four kilometres out, all on the metro, and where most of the city actually lives. Fifteen to twenty-five minutes to the centre.",
  outer:
    "Four to eight kilometres out, up the hill towards Collserola or out along the coast — Sarrià, Horta, El Clot, Nou Barris — plus L'Hospitalet, which adjoins the city so closely that the boundary is invisible on the ground.",
  fringe:
    "The wider metropolitan area: Badalona along the coast and the towns beyond Collserola. Cheaper again, on the metro or the Rodalies, and thirty-five minutes or more from the centre.",
};

export const BARCELONA_TRAVEL_BAND_DISTANCE_KM: Record<TravelBand, string> = {
  central: "0–1.5 km",
  inner: "1.5–4 km",
  outer: "4–8 km",
  fringe: "8 km+",
};

export const BARCELONA_TRAVEL_BAND_RATIONALE =
  "Barcelona's transport is zonal on paper — the ATM divides the region into six rings — but zone 1 covers the entire city and most of the metropolitan area, so essentially every address covered here is in the same zone and pays the same fare. That makes the zone number useless as a measure of centrality, which is why this section describes how far out you are directly instead.";

/**
 * Lifestyle cuts for Barcelona. Two are shaped by things specific to
 * this city: the beach, which changes what a neighbourhood is for in a
 * way no British city has to consider, and the tourism pressure, which
 * makes "quiet" a question about short-let density as much as traffic.
 */
export const BARCELONA_LIFESTYLE_PAGES: CityLifestylePage[] = [
  {
    slug: "nightlife",
    h1: "Best areas in Barcelona for going out",
    metaTitle: "Best areas in Barcelona for nightlife and going out",
    metaDescription:
      "Where to live in Barcelona if you go out: barris ranked by nightlife, food and how walkable they are late.",
    intro:
      "Barcelona goes out later than anywhere else on this site — dinner at ten, bars from midnight — and the metro runs all night on Saturdays, which changes the calculation entirely. The trade-off is that the loudest quarters are also the ones most affected by tourism, and living above a bar in the Gòtic is a decision you make once.",
    scoreFn: (s) =>
      (s.nightlife * 0.4 + s.foodScene * 0.25 + s.walkability * 0.2 + s.livelyVsQuiet * 0.15) / 10,
  },
  {
    slug: "food",
    h1: "Best areas in Barcelona for food",
    metaTitle: "Best areas in Barcelona for food, markets and eating out",
    metaDescription:
      "From Sant Antoni to Poble-sec and the Raval — Barcelona barris ranked by the quality, range and price of what you can eat locally.",
    intro:
      "The city has forty municipal markets and they are the real answer to this question — a barri with a working mercat is a different daily proposition from one without. Sant Antoni and Poble-sec have been the two most interesting places to eat for several years, and the Raval is where the best value is.",
    scoreFn: (s) => (s.foodScene * 0.55 + s.cafeDensity * 0.3 + s.walkability * 0.15) / 10,
  },
  {
    slug: "green-space",
    h1: "Greenest areas in Barcelona",
    metaTitle: "Greenest areas to live in Barcelona",
    metaDescription:
      "Collserola, Montjuïc and the Ciutadella — Barcelona barris with the best access to open space and the beach, ranked.",
    intro:
      "Barcelona is short of parks inside the grid and surrounded by extraordinary green outside it: Collserola is eight thousand hectares on the city's back, Montjuïc rises straight out of the port, and there are four kilometres of beach. Where you live decides which of those is a walk and which is a journey.",
    scoreFn: (s) => (s.greenSpace * 0.6 + s.safety * 0.2 + s.walkability * 0.2) / 10,
  },
  {
    slug: "families",
    h1: "Best areas in Barcelona for families",
    metaTitle: "Best areas in Barcelona for families and schools",
    metaDescription:
      "Space, green and safety — Barcelona barris ranked for families arriving from abroad, with rents and schooling explained.",
    intro:
      "Schooling drives this decision more than the barri does, and the choice is a real one: Catalan state schools teach in Catalan, which is a genuine adjustment for a child arriving with neither Catalan nor Spanish, while international schools are concentrated up the hill in Sarrià and beyond. That geography is why so many relocating families end up in the Zona Alta.",
    scoreFn: (s) => (s.safety * 0.4 + s.greenSpace * 0.3 + s.walkability * 0.2 + s.cafeDensity * 0.1) / 10,
    note: "This ranking captures safety, green space and walkability. It does not score schools, and in Barcelona the language of instruction matters as much as the quality: Catalan state schools teach in Catalan, and the international schools that do not are clustered in the Zona Alta and the hill towns beyond it.",
  },
  {
    slug: "young-professionals",
    h1: "Best areas in Barcelona for young professionals",
    metaTitle: "Best areas in Barcelona for young professionals and new arrivals",
    metaDescription:
      "Where new arrivals and young professionals actually live in Barcelona — ranked by transport, social scene and who else is there.",
    intro:
      "22@ in Poblenou has pulled the centre of gravity east over the last decade, and Poblenou, Sant Antoni and Gràcia are where most arriving professionals end up. The city has a very large international population, so being new is entirely normal in all three.",
    scoreFn: (s) =>
      (s.youngProfessionalDensity * 0.35 + s.connectivity * 0.25 + s.cafeDensity * 0.2 + s.nightlife * 0.2) / 10,
  },
  {
    slug: "transport",
    h1: "Best-connected areas in Barcelona",
    metaTitle: "Best-connected areas in Barcelona and the metropolitan area",
    metaDescription:
      "Metro, FGC, Rodalies and tram — Barcelona barris with the strongest connections, ranked.",
    intro:
      "Barcelona's metro is one of the best in Europe for the size of the city, and a monthly pass covering the whole of zone 1 costs less than a fifth of the London equivalent. The distinctions that matter here are interchange quality and whether you are on the FGC, which is the only quick way through Collserola to Sant Cugat.",
    scoreFn: (s) => (s.connectivity * 0.7 + s.walkability * 0.3) / 10,
  },
  {
    slug: "quiet",
    h1: "Quietest areas in Barcelona",
    metaTitle: "Quietest areas to live in Barcelona",
    metaDescription:
      "Calm, low-traffic parts of Barcelona away from the tourist pressure — ranked for anyone who wants the city nearby but not through the window.",
    intro:
      "Quiet in Barcelona is mostly a question about tourism and terraces rather than traffic. The Gòtic, the Born and Barceloneta are loud because of visitors and short lets; the Eixample is loud because of scooters and the grid. Uphill and eastward, both problems fall away sharply.",
    scoreFn: (s) =>
      ((10 - s.livelyVsQuiet) * 0.35 + s.safety * 0.35 + s.greenSpace * 0.3) / 10,
  },
  {
    slug: "value",
    h1: "Best-value areas in Barcelona",
    metaTitle: "Best-value areas to live in Barcelona and the metropolitan area",
    metaDescription:
      "Where the rent buys the most in Barcelona — barris ranked on lifestyle and transport against what a one-bed actually costs.",
    intro:
      "Value here means what you get for the rent, not simply the cheapest rent. Nou Barris and Badalona are the cheapest places covered and neither tops this list, because the saving is paid back in journey time and in how much there is to walk to.",
    scoreFn: (s) =>
      (s.connectivity * 0.3 + s.foodScene * 0.2 + s.greenSpace * 0.2 + s.safety * 0.15 + s.cafeDensity * 0.15) / 10,
    dampByRent: true,
    note: "Value here combines transport, food, green space, safety and café density, then damps the result by rent. One Barcelona caveat: rents in the city are capped under the Catalan stressed-market rules and landlords must reference the INCASÒL index for a new contract, so a listing far above the index for its area is worth questioning rather than accepting.",
  },
];
