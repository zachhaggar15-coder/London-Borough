export const AMAZON_ASSOCIATE_TAG = "amazonaff01d8-21";

export type RenterEssentialProduct = {
  asin: string;
  name: string;
  shortName: string;
  fit: string;
  reason: string;
};

export type RenterEssentialPost = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  whyItConverts: string;
  suggestedPlacements: string[];
  checklist: string[];
  products: RenterEssentialProduct[];
};

export function amazonUkProductUrl(asin: string): string {
  return `https://www.amazon.co.uk/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
}

export const RENTER_ESSENTIAL_POSTS: RenterEssentialPost[] = [
  {
    slug: "damp-laundry-kit",
    title: "Damp and indoor laundry kit for London flats",
    shortTitle: "Damp and laundry",
    metaTitle: "Damp and indoor laundry kit for London flats",
    metaDescription:
      "Amazon UK picks for dealing with condensation, damp rooms and indoor laundry in London rentals.",
    intro:
      "A lot of London flats are perfectly liveable but awkward in winter: small rooms, limited ventilation, no tumble dryer and laundry drying indoors. This kit is for renters who have found the right area but need the flat to feel easier day to day.",
    whyItConverts:
      "This matches a high-intent renter problem: people comparing London areas are usually close to viewings, offers or moving, and damp or indoor drying is a practical concern they can solve quickly.",
    suggestedPlacements: [
      "Neighbourhood pages where users are thinking about older housing stock.",
      "Salary pages where people are choosing between house shares and one-bed flats.",
      "Post-move checklist content after the user has shortlisted an area.",
    ],
    checklist: [
      "Prioritise low-noise appliances if the flat is small or open-plan.",
      "Avoid static price claims because Amazon prices and offers change frequently.",
      "Use this content around winter, indoor drying and flat-viewing decisions.",
    ],
    products: [
      {
        asin: "B09TBKCCSS",
        name: "MeacoDry Arete One 12L dehumidifier and HEPA air purifier",
        shortName: "MeacoDry Arete One 12L",
        fit: "Best for one-bed flats, house shares and rooms where condensation keeps coming back.",
        reason:
          "A higher-ticket, practical product that ties directly to London rental comfort: damp, mould risk and indoor laundry.",
      },
      {
        asin: "B07DNYMXXZ",
        name: "Lakeland Dry:Soon 3 Tier heated clothes airer",
        shortName: "Lakeland Dry:Soon heated airer",
        fit: "Best for renters without a tumble dryer or enough radiator space.",
        reason:
          "It solves the common London problem of drying washing indoors without turning the whole flat into a damp room.",
      },
    ],
  },
  {
    slug: "small-flat-storage",
    title: "Small-flat storage kit for London renters",
    shortTitle: "Small-flat storage",
    metaTitle: "Small-flat storage kit for London renters",
    metaDescription:
      "Amazon UK storage picks for London rooms, flat shares and compact one-bed rentals.",
    intro:
      "London rent often means trading space for location. These picks are for people who want the better commute or livelier neighbourhood without letting a small room or cupboard-light flat become chaos.",
    whyItConverts:
      "Storage is low-friction, affordable and relevant to almost every London renter, especially users on salary and rent-budget pages.",
    suggestedPlacements: [
      "Salary guides where users are comparing room, flat-share and one-bed budgets.",
      "Neighbourhood pages for expensive inner-London areas where space is the trade-off.",
      "House-share and first-flat content.",
    ],
    checklist: [
      "Lead with space-saving use cases rather than product specs.",
      "Use renter-safe language for products that avoid drilling or permanent changes.",
      "Keep this near rent and salary content where the space trade-off is obvious.",
    ],
    products: [
      {
        asin: "B07RSCPH4N",
        name: "Amazon Basics vacuum compression storage bags with hand pump",
        shortName: "Vacuum storage bags",
        fit: "Best for spare bedding, out-of-season clothes and suitcases under a bed.",
        reason:
          "Cheap, practical and directly tied to the small-room problem that appears when users choose central or high-rent areas.",
      },
      {
        asin: "B00DTVXGGW",
        name: "Really Useful 64 litre clear storage box",
        shortName: "Really Useful 64L box",
        fit: "Best for wardrobe overflow, under-stairs storage and shared-house belongings.",
        reason:
          "A durable storage choice that works for renters who move often and need contents to stay visible and portable.",
      },
      {
        asin: "B00LOQMCDM",
        name: "Command picture and frame hanging strips value pack",
        shortName: "Command hanging strips",
        fit: "Best for decorating a rental without nails, screws or avoidable wall damage.",
        reason:
          "Renter-safe decorating has strong conversion intent because deposits and no-drill rules are top of mind after moving.",
      },
    ],
  },
  {
    slug: "moving-and-viewing-kit",
    title: "Flat viewing and moving-day kit",
    shortTitle: "Viewing and moving",
    metaTitle: "Flat viewing and moving-day kit for London renters",
    metaDescription:
      "Amazon UK picks for London flat viewings, measuring rooms and moving into a new rental.",
    intro:
      "Once someone has a shortlist, the next job is practical: view quickly, measure properly and move without scrambling for boxes. This kit supports that moment between choosing an area and actually getting keys.",
    whyItConverts:
      "The timing is strong. Users comparing neighbourhoods are often close to viewings, and moving supplies are a near-term purchase rather than a vague lifestyle upgrade.",
    suggestedPlacements: [
      "Neighbourhood comparison pages after users have narrowed the shortlist.",
      "The main neighbourhood detail pages near the call to action.",
      "Any checklist for first-time London renters.",
    ],
    checklist: [
      "Position this as a practical next step after shortlisting, not as generic shopping.",
      "Avoid overloading the page with too many small accessories.",
      "Keep the products lightweight and useful for renters who may move again.",
    ],
    products: [
      {
        asin: "B0B3JGDY8D",
        name: "Bankers Box extra large SmoothMove cardboard moving boxes",
        shortName: "Bankers Box moving boxes",
        fit: "Best for renters who need strong boxes with handles for a flat or room move.",
        reason:
          "Moving boxes match the exact user journey after choosing an area and have clear purchase intent.",
      },
      {
        asin: "B07TFYBHBQ",
        name: "Amazon Basics self-locking tape measure, 5 m",
        shortName: "Amazon Basics tape measure",
        fit: "Best for checking bed, sofa, desk and wardrobe fit during viewings.",
        reason:
          "A small, useful flat-viewing product that helps users turn area research into a confident rental decision.",
      },
    ],
  },
  {
    slug: "commuter-kit",
    title: "London commuter kit",
    shortTitle: "Commuter kit",
    metaTitle: "London commuter kit for public transport days",
    metaDescription:
      "Amazon UK picks for London commuters: portable charging, compact rain gear and practical daily carry items.",
    intro:
      "A great neighbourhood still has to survive the weekday commute. These products fit the public-transport, walking-between-stations reality of London rather than a car-first commute.",
    whyItConverts:
      "Commute pages already have strong daily-use intent. A product should solve the small irritations of travel: battery, rain and reliability.",
    suggestedPlacements: [
      "Commute destination pages after the ranked neighbourhood table.",
      "Neighbourhood pages with strong transport sections.",
      "Lifestyle pages aimed at young professionals and frequent office commuters.",
    ],
    checklist: [
      "Keep products compact enough for a daily bag.",
      "Avoid anything car-first because the site is built around public transport.",
      "Use this content on commute pages where the user is already thinking about weekday travel.",
    ],
    products: [
      {
        asin: "B0CZ9M6X8Q",
        name: "Anker Zolo 10,000mAh 30W power bank with built-in USB-C cable",
        shortName: "Anker Zolo power bank",
        fit: "Best for long office days, tube delays and maps-heavy flat viewings.",
        reason:
          "A branded, high-demand daily-use product that makes sense for commuters and people viewing flats across London.",
      },
      {
        asin: "B081QQFDGK",
        name: "Repel compact windproof travel umbrella",
        shortName: "Repel compact umbrella",
        fit: "Best for bags, train platforms and rainy walks between stations.",
        reason:
          "A compact umbrella is a simple London commute product with broad relevance and low decision friction.",
      },
    ],
  },
];

export function getRenterEssentialSlugs(): string[] {
  return RENTER_ESSENTIAL_POSTS.map((post) => post.slug);
}

export function getRenterEssentialPost(slug: string): RenterEssentialPost | null {
  return RENTER_ESSENTIAL_POSTS.find((post) => post.slug === slug) ?? null;
}

export function getRenterEssentialPosts(slugs?: string[]): RenterEssentialPost[] {
  if (!slugs) return RENTER_ESSENTIAL_POSTS;

  const order = new Map(slugs.map((slug, index) => [slug, index]));
  return RENTER_ESSENTIAL_POSTS.filter((post) => order.has(post.slug)).sort(
    (a, b) => order.get(a.slug)! - order.get(b.slug)!,
  );
}
