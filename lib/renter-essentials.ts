export const AMAZON_ASSOCIATE_TAG = "amazonaff01d8-21";
export const AMAZON_LINK_CODE = "ll2";
export const AMAZON_LINK_ID = "33f39801ccfd3e1d63322455af2c9615";
export const AMAZON_REF = "as_li_ss_tl";
export const AMAZON_STORE_URL = `https://www.amazon.co.uk?&linkCode=${AMAZON_LINK_CODE}&tag=${AMAZON_ASSOCIATE_TAG}&linkId=${AMAZON_LINK_ID}&ref_=${AMAZON_REF}`;
export const MEALPREP_ORG_URL = "https://mealprep.org.uk";

export type RenterEssentialProduct = {
  asin: string;
  name: string;
  shortName: string;
  fit: string;
  reason: string;
};

export type RenterEssentialArticleSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type RenterEssentialExternalLink = {
  href: string;
  label: string;
  description: string;
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
  articleSections?: RenterEssentialArticleSection[];
  externalLinks?: RenterEssentialExternalLink[];
};

export function amazonUkProductUrl(asin: string): string {
  const params = new URLSearchParams({
    linkCode: AMAZON_LINK_CODE,
    tag: AMAZON_ASSOCIATE_TAG,
    linkId: AMAZON_LINK_ID,
    ref_: AMAZON_REF,
  });

  return `https://www.amazon.co.uk/dp/${asin}?${params.toString()}`;
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
    slug: "meal-prep-before-moving-house",
    title: "Meal prep before moving house in London",
    shortTitle: "Moving-week meal prep",
    metaTitle: "Meal prep before moving house: London moving-week food plan",
    metaDescription:
      "What to meal prep before moving to a new London flat, with container, lunch bag and freezer-friendly Amazon UK picks.",
    intro:
      "Moving week is when food planning usually collapses: the pans are packed, the fridge is half empty and the first few nights in a new area are expensive. A small meal-prep setup keeps the move cheaper and calmer without pretending you will batch-cook a full Sunday routine while surrounded by boxes.",
    whyItConverts:
      "This targets people with immediate moving intent. They are already buying boxes, storage and first-flat supplies, so meal-prep containers and lunch carry products are practical add-ons rather than random kitchen content.",
    suggestedPlacements: [
      "The renter essentials hub as a dedicated moving-week food section.",
      "Neighbourhood pages after the moving and small-flat setup guides.",
      "Salary pages where rent pressure makes takeaway-heavy moving weeks more painful.",
    ],
    checklist: [
      "Cook only meals that survive reheating, fridge gaps and a chaotic first evening.",
      "Keep one bag or box separate for lunches, cutlery and the first-night meal.",
      "Use a UK meal plan before the move so the first supermarket shop is not improvised.",
    ],
    products: [
      {
        asin: "B07FM7W3RK",
        name: "Joseph Joseph Nest Lock 5-piece leakproof food storage container set",
        shortName: "Joseph Joseph Nest Lock set",
        fit: "Best for a compact moving-week container set that nests when cupboard space is tight.",
        reason:
          "The nesting design makes sense for London flats where storage is limited and containers need to work for leftovers, packed lunches and fridge organisation.",
      },
      {
        asin: "B07P1TD1LD",
        name: "Sistema Brilliance 380ml leakproof food storage container",
        shortName: "Sistema Brilliance container",
        fit: "Best for sauces, overnight oats, chopped fruit and small portions during the first week.",
        reason:
          "A small leakproof container is useful when the kitchen is half-unpacked and food needs to travel between work, viewings and the new flat.",
      },
      {
        asin: "B07JZJ22VB",
        name: "Prep Naturals insulated meal prep bag with reusable containers",
        shortName: "Insulated meal prep bag",
        fit: "Best for keeping moving-day lunches and first-week office meals together.",
        reason:
          "An insulated bag is a practical bridge between the old fridge, the moving van and the first few workdays from a new location.",
      },
    ],
    articleSections: [
      {
        heading: "What to prep before the move",
        body:
          "Aim for two reliable dinners, two lunches and a breakfast option rather than a perfect week. The goal is to avoid the expensive gap between packing your old kitchen and learning the shops near the new flat.",
        bullets: [
          "Freeze one chilli, curry or pasta sauce in flat portions.",
          "Keep two lunches chilled separately so they do not disappear into a moving box.",
          "Use oats, yoghurt pots or breakfast wraps for the first two mornings.",
        ],
      },
      {
        heading: "How to pack the food kit",
        body:
          "Put the containers, a fork, a tea towel, washing-up liquid and one sharp knife in a clearly labelled first-night bag. That small kit lets you eat before the kitchen is fully unpacked.",
      },
      {
        heading: "Plan the first shop before you arrive",
        body:
          "Before moving day, choose a simple UK meal plan and write a short first-shop list around the supermarket you will actually use. MealPrep.org.uk is a useful next step because it can turn budget, calories and supermarket preference into a ready-made plan.",
      },
    ],
    externalLinks: [
      {
        href: MEALPREP_ORG_URL,
        label: "Plan the first week on MealPrep.org.uk",
        description:
          "Use the UK meal-planning tools to choose a supermarket, budget and container setup before moving day.",
      },
    ],
  },
  {
    slug: "first-week-meal-prep-new-flat",
    title: "First-week meal prep after moving into a new flat",
    shortTitle: "First-week meal prep",
    metaTitle: "First-week meal prep after moving into a new flat",
    metaDescription:
      "A practical first-week meal-prep guide for a new London flat, with simple planning tips and Amazon UK lunch-storage picks.",
    intro:
      "The first week in a new flat is not the time for complicated recipes. You need meals that work around a half-stocked kitchen, a new commute and the reality that you may still be finding the nearest supermarket after work.",
    whyItConverts:
      "Searchers looking for first-week meal prep have a clear problem and a short purchase window: they need containers, a lunch bag and a plan before routine sets in.",
    suggestedPlacements: [
      "Renter essentials pages for users who have already chosen an area.",
      "Salary guides for readers trying to keep food costs under control after a deposit and move.",
      "Commute pages where a new office journey changes packed-lunch timing.",
    ],
    checklist: [
      "Start with one protein, one carb and one veg base that can become several meals.",
      "Choose containers that stack clearly in a small fridge.",
      "Plan work lunches before dinners if the new commute is the biggest routine change.",
    ],
    products: [
      {
        asin: "B084H76VWG",
        name: "ThinkFit insulated meal prep lunch box with reusable containers",
        shortName: "ThinkFit meal prep lunch box",
        fit: "Best for carrying several first-week meals or snacks when the new commute is still unpredictable.",
        reason:
          "It combines an insulated lunch bag with containers, which suits people rebuilding routines after a move.",
      },
      {
        asin: "B00DGPPY20",
        name: "Thermos Stainless King 470ml insulated food flask",
        shortName: "Thermos food flask",
        fit: "Best for soups, stews and hot lunches when the office microwave situation is unknown.",
        reason:
          "A food flask gives new commuters a low-effort packed lunch option before they know the best local food spots.",
      },
      {
        asin: "B07FM7W3RK",
        name: "Joseph Joseph Nest Lock 5-piece leakproof food storage container set",
        shortName: "Joseph Joseph Nest Lock set",
        fit: "Best for portioning first-week dinners and leftovers in a small new kitchen.",
        reason:
          "A nested set helps avoid buying mismatched tubs while still covering lunch, dinner and leftover portions.",
      },
    ],
    articleSections: [
      {
        heading: "The easiest first-week formula",
        body:
          "Cook one tray or pan of food that can be eaten three ways: with rice, in a wrap and over salad. That keeps the first shop short and reduces the amount of equipment you need before everything is unpacked.",
        bullets: [
          "Buy one reliable breakfast that needs no cooking.",
          "Cook two dinners with enough leftovers for lunches.",
          "Keep one emergency freezer meal for the night the move catches up with you.",
        ],
      },
      {
        heading: "Match prep to the new area",
        body:
          "If your new flat is near cheaper supermarkets, plan a bigger weekly shop. If it is mostly convenience stores, prep fewer meals but keep lunches covered so the daily spend does not creep up.",
      },
      {
        heading: "Use a ready-made UK plan",
        body:
          "A ready-made UK supermarket plan is faster than building a new routine from scratch. MealPrep.org.uk is the right off-site link here because it focuses on UK supermarkets, budgets, calories and container counts.",
      },
    ],
    externalLinks: [
      {
        href: MEALPREP_ORG_URL,
        label: "Build a first-week meal plan",
        description:
          "Choose a supermarket and budget on MealPrep.org.uk before stocking the new kitchen.",
      },
    ],
  },
  {
    slug: "work-lunch-meal-prep-new-commute",
    title: "Work lunch meal prep for a new London commute",
    shortTitle: "New-commute lunches",
    metaTitle: "Work lunch meal prep for a new London commute",
    metaDescription:
      "Packed-lunch meal prep for a new London commute, with Amazon UK containers, insulated bags and hot-food flask picks.",
    intro:
      "A new area often means a new route to work, new lunch prices and less margin in the morning. Planning two or three work lunches before the first Monday makes the commute feel less improvised.",
    whyItConverts:
      "The page matches high-intent lunch-prep searches and the site's commute intent: users are already thinking about travel time, office days and daily costs.",
    suggestedPlacements: [
      "Commute destination pages after the ranked neighbourhood table.",
      "Neighbourhood guides with strong office-worker or young-professional intent.",
      "The renter essentials hub alongside the commuter kit.",
    ],
    checklist: [
      "Choose leakproof containers for train and tube bags.",
      "Use insulated carry if the commute is long or the office fridge is unreliable.",
      "Prep lunches that are good cold unless you know the microwave setup.",
    ],
    products: [
      {
        asin: "B00DGPPY20",
        name: "Thermos Stainless King 470ml insulated food flask",
        shortName: "Thermos food flask",
        fit: "Best for hot lunches on office days without relying on a microwave.",
        reason:
          "It fits the London commute use case: compact, sealed and useful for soups, chilli and leftovers.",
      },
      {
        asin: "B07JP7TD5T",
        name: "Sistema Brilliance leakproof food storage lunchbox",
        shortName: "Sistema Brilliance lunchbox",
        fit: "Best for packed lunches that need to survive a backpack or tote bag.",
        reason:
          "A leakproof lunchbox is the most direct meal-prep product for commuters carrying food on public transport.",
      },
      {
        asin: "B084H76VWG",
        name: "ThinkFit insulated meal prep lunch box with reusable containers",
        shortName: "ThinkFit meal prep lunch box",
        fit: "Best for full-day office meals, gym days or long cross-London commutes.",
        reason:
          "It gives heavier meal preppers one carry system for multiple portions, snacks and cold packs.",
      },
    ],
    articleSections: [
      {
        heading: "Prep around the commute, not the recipe",
        body:
          "The best lunch for a new commute is the one that does not leak, smell strongly on the train or need special equipment at work. Start with two cold lunches and one hot option once you understand the office setup.",
      },
      {
        heading: "Keep the cost visible",
        body:
          "A London office lunch can quietly become a rent-sized leak in the budget. Prep just three lunches a week and keep Fridays flexible so the habit feels useful rather than joyless.",
      },
      {
        heading: "Plan lunches from UK supermarkets",
        body:
          "MealPrep.org.uk is a useful companion because it has UK supermarket-based plans and tools for container count, shopping budget and work-lunch meal prep.",
      },
    ],
    externalLinks: [
      {
        href: MEALPREP_ORG_URL,
        label: "Find UK work-lunch meal prep ideas",
        description:
          "Use MealPrep.org.uk for supermarket-based plans, container guidance and weekly lunch planning.",
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
