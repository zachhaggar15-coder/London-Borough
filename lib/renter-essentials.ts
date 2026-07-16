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

export type RenterEssentialComparisonRow = {
  need: string;
  pick: string;
  why: string;
  tradeoff: string;
  productAsins: string[];
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
  comparisonRows?: RenterEssentialComparisonRow[];
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
      "Compare meal-prep containers, insulated bags and small leakproof tubs for moving week in London.",
    intro:
      "Moving week is when food planning usually collapses: the pans are packed, the fridge is half empty and the first few nights in a new area are expensive. The best meal-prep setup for a move is not the biggest set you can find. It is the right mix of stackable storage for the new kitchen, one or two genuinely leakproof tubs for sauces and breakfasts, and an insulated option for the day when food is travelling between two addresses.",
    whyItConverts:
      "This targets people with immediate moving intent. They are already buying boxes, storage and first-flat supplies, so a comparison-led meal-prep guide makes the next purchase feel practical: buy containers if the fridge and cupboards are the problem, buy an insulated bag if moving day and work lunches are the problem.",
    suggestedPlacements: [
      "The renter essentials hub as a dedicated moving-week food section.",
      "Neighbourhood pages after the moving and small-flat setup guides.",
      "Salary pages where rent pressure makes takeaway-heavy moving weeks more painful.",
    ],
    checklist: [
      "Choose nesting containers if cupboard space in the new flat is the main concern.",
      "Choose smaller leakproof tubs for sauces, breakfasts and lunches that will sit in a work bag.",
      "Choose an insulated bag if food needs to travel on moving day or through the first few office days.",
    ],
    products: [
      {
        asin: "B07FM7W3RK",
        name: "Joseph Joseph Nest Lock 5-piece leakproof food storage container set",
        shortName: "Joseph Joseph Nest Lock set",
        fit: "Best for a compact moving-week container set that nests when cupboard space is tight.",
        reason:
          "This is the most useful all-rounder if you want one container set to start the new kitchen. The nesting format keeps the cupboard calmer than a pile of mismatched tubs, while the leakproof lids make it useful for leftovers, batch-cooked dinners and packed lunches. It is less specialised than an insulated bag, but it is the better first buy if your main problem is storage and routine.",
      },
      {
        asin: "B07P1TD1LD",
        name: "Sistema Brilliance 380ml leakproof food storage container",
        shortName: "Sistema Brilliance container",
        fit: "Best for sauces, overnight oats, chopped fruit and small portions during the first week.",
        reason:
          "This smaller Sistema container is the sharper choice for high-risk food: sauces, yoghurt, overnight oats, chopped fruit or a soup portion that cannot leak in a tote bag. Compared with the Joseph Joseph set, it is not a full kitchen system; it is the container you buy because one messy lunch can ruin moving day.",
      },
      {
        asin: "B07JZJ22VB",
        name: "Prep Naturals insulated meal prep bag with reusable containers",
        shortName: "Insulated meal prep bag",
        fit: "Best for keeping moving-day lunches and first-week office meals together.",
        reason:
          "The insulated bag is the pick when food needs to leave the flat. It is bulkier than standalone containers, but that is the point: it keeps lunch, snacks and reusable tubs together while the old fridge is empty, the new fridge is not stocked, and the first commute is still unfamiliar.",
      },
    ],
    articleSections: [
      {
        heading: "What to prep before the move",
        body:
          "The useful target is two reliable dinners, two lunches and one breakfast option, not a perfect Sunday-prep grid. A chilli, curry, pasta sauce or tray bake gives you food that can survive reheating and a messy schedule. Breakfast should be even simpler: overnight oats, yoghurt pots or wraps that do not require finding every pan on the first morning.",
        bullets: [
          "Freeze one chilli, curry or pasta sauce in flat portions.",
          "Keep two lunches in a clearly labelled bag so they do not disappear into a moving box.",
          "Use smaller leakproof tubs for sauces and breakfasts, not the largest containers in the set.",
        ],
      },
      {
        heading: "Compare containers before buying",
        body:
          "For most London moves, a nesting set beats a big multipack because cupboard space is the constraint after you arrive. A small leakproof container beats a large meal box when you are carrying sauces, breakfasts or snacks. An insulated meal-prep bag beats both when the food needs to stay together outside the fridge for part of the day.",
      },
      {
        heading: "How to pack the food kit",
        body:
          "Put the containers, a fork, a tea towel, washing-up liquid and one sharp knife in a clearly labelled first-night bag. Keep the insulated lunch bag out of the main kitchen boxes if you are using one. That small setup is what lets you eat before the kitchen is unpacked, rather than ordering takeaway because the cutlery is somewhere under the duvet.",
      },
      {
        heading: "Plan the first shop before you arrive",
        body:
          "Before moving day, choose a simple UK meal plan and write a short first-shop list around the supermarket you will actually use. MealPrep.org.uk is the right next step because it can turn budget, calories and supermarket preference into a plan before you are standing in a new aisle guessing what future-you will cook.",
      },
    ],
    comparisonRows: [
      {
        need: "You need one starter set for the new kitchen",
        pick:
          "Choose the Joseph Joseph Nest Lock set if the priority is cupboard order, fridge storage and a reusable system for leftovers.",
        why:
          "It is the broadest option: more useful after the move than a single lunch box and easier to store than loose tubs.",
        tradeoff:
          "It does not solve temperature control on moving day, so pair it with an insulated bag if food will be out of the fridge.",
        productAsins: ["B07FM7W3RK"],
      },
      {
        need: "You are carrying sauce, oats or small portions",
        pick:
          "Choose the Sistema Brilliance container when leak resistance matters more than capacity.",
        why:
          "It is better for small, messy foods than a big meal box, especially when the container is going into a work bag.",
        tradeoff:
          "It is too small to be your only meal-prep storage solution for a full moving week.",
        productAsins: ["B07P1TD1LD"],
      },
      {
        need: "Food has to travel between flats or through a workday",
        pick:
          "Choose the insulated meal prep bag when you need meals, snacks and tubs kept together outside the kitchen.",
        why:
          "It is the better moving-day product because it solves carrying and cooling, not just storage.",
        tradeoff:
          "It takes more space than standalone containers and makes less sense if you only need fridge organisation.",
        productAsins: ["B07JZJ22VB"],
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
      "Compare lunch bags, food flasks and stackable containers for the first week in a new London flat.",
    intro:
      "The first week in a new flat is not the time for complicated recipes. You need a meal-prep setup that works around a half-stocked kitchen, a new commute and the reality that you may still be finding the nearest supermarket after work. The buying decision is simple: an insulated lunch box is for carrying a full day of food, a food flask is for hot meals without relying on the office microwave, and nesting containers are for making the new fridge feel organised from day one.",
    whyItConverts:
      "Searchers looking for first-week meal prep have a clear problem and a short purchase window. They need to rebuild routine quickly, so comparison copy helps them choose the product that matches the biggest friction: commute, microwave access or kitchen storage.",
    suggestedPlacements: [
      "Renter essentials pages for users who have already chosen an area.",
      "Salary guides for readers trying to keep food costs under control after a deposit and move.",
      "Commute pages where a new office journey changes packed-lunch timing.",
    ],
    checklist: [
      "Choose an insulated lunch system if the first week includes long office days.",
      "Choose a food flask if reheating at work is uncertain or queues are annoying.",
      "Choose nesting containers if the main job is organising leftovers in a small fridge.",
    ],
    products: [
      {
        asin: "B084H76VWG",
        name: "ThinkFit insulated meal prep lunch box with reusable containers",
        shortName: "ThinkFit meal prep lunch box",
        fit: "Best for carrying several first-week meals or snacks when the new commute is still unpredictable.",
        reason:
          "This is the strongest pick for someone who wants the whole workday handled: lunch, snacks, containers and cold packs in one carry system. Compared with the Thermos flask, it is less focused on one hot meal and more useful for people who leave early, go to the gym or do not know where lunch fits into the new commute yet.",
      },
      {
        asin: "B00DGPPY20",
        name: "Thermos Stainless King 470ml insulated food flask",
        shortName: "Thermos food flask",
        fit: "Best for soups, stews and hot lunches when the office microwave situation is unknown.",
        reason:
          "The Thermos flask is the comparison winner for hot food. It is not trying to organise a fridge or carry three meals; it is for soup, chilli, pasta or rice when you want lunch ready without hunting for a microwave in a new office.",
      },
      {
        asin: "B07FM7W3RK",
        name: "Joseph Joseph Nest Lock 5-piece leakproof food storage container set",
        shortName: "Joseph Joseph Nest Lock set",
        fit: "Best for portioning first-week dinners and leftovers in a small new kitchen.",
        reason:
          "The Joseph Joseph set is the better first-flat choice if the problem is the kitchen rather than the commute. It gives you a tidy container system for leftovers and batch-cooked bases, but you may still want a lunch bag or food flask if meals need to travel.",
      },
    ],
    articleSections: [
      {
        heading: "The easiest first-week formula",
        body:
          "Cook one tray or pan of food that can be eaten three ways: with rice, in a wrap and over salad. That keeps the first shop short and reduces the amount of equipment you need before everything is unpacked. If the meal will mostly live in the fridge, use stackable containers. If it is going to work, decide whether you need cold carry space or a hot-food flask before buying.",
        bullets: [
          "Buy one reliable breakfast that needs no cooking.",
          "Cook two dinners with enough leftovers for lunches.",
          "Keep one emergency freezer meal for the night the move catches up with you.",
        ],
      },
      {
        heading: "Compare the first-week products",
        body:
          "The ThinkFit lunch box is the most complete carry solution, especially if the first week includes office days, gym kit and snacks. The Thermos flask is narrower but more useful for hot food, because it removes microwave uncertainty. The Joseph Joseph set is the most useful once you are home, because it makes leftovers and fridge storage less chaotic.",
      },
      {
        heading: "Match prep to the new area",
        body:
          "If your new flat is near cheaper supermarkets, plan a bigger weekly shop and rely on containers for leftovers. If it is mostly convenience stores, prep fewer meals but keep work lunches covered so the daily spend does not creep up. For a longer commute, prioritise the carry system before buying more kitchen tubs.",
      },
      {
        heading: "Use a ready-made UK plan",
        body:
          "A ready-made UK supermarket plan is faster than building a new routine from scratch. MealPrep.org.uk is the right off-site link here because it focuses on UK supermarkets, budgets, calories and container counts, which is exactly what you need when the kitchen is new and the week is already noisy.",
      },
    ],
    comparisonRows: [
      {
        need: "You want the whole office day covered",
        pick:
          "Choose the ThinkFit lunch box if you need multiple containers, snacks and cold carry in one setup.",
        why:
          "It is the most complete first-week option for people rebuilding a weekday routine around a new commute.",
        tradeoff:
          "It is bulkier than a single container or flask, so it is not the neatest choice for a small handbag or short commute.",
        productAsins: ["B084H76VWG"],
      },
      {
        need: "You want hot lunches without microwave dependency",
        pick:
          "Choose the Thermos food flask for soups, chilli, pasta and rice when office facilities are unknown.",
        why:
          "It is more focused than a lunch bag and better suited to one dependable hot meal.",
        tradeoff:
          "It will not organise multiple meals or snacks, so it works best with separate containers at home.",
        productAsins: ["B00DGPPY20"],
      },
      {
        need: "You want the new fridge and cupboards under control",
        pick:
          "Choose the Joseph Joseph Nest Lock set if leftovers and kitchen order matter more than commute carry.",
        why:
          "The nesting design makes it a better home-base product than buying several unrelated tubs.",
        tradeoff:
          "It is not insulated, so it needs another bag if lunch will be out of the fridge for long.",
        productAsins: ["B07FM7W3RK"],
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
      "Compare food flasks, leakproof lunchboxes and insulated meal-prep bags for a new London commute.",
    intro:
      "A new area often means a new route to work, new lunch prices and less margin in the morning. The right work-lunch setup depends on the commute: a food flask wins when you want hot food without queuing for a microwave, a leakproof lunchbox wins when you need something slim and reliable in a bag, and an insulated meal-prep lunch box wins when the day is long enough to justify carrying several portions.",
    whyItConverts:
      "The page matches high-intent lunch-prep searches and the site's commute intent. Users are already weighing travel time, office days and daily costs, so a comparison article can turn those trade-offs into a concrete product choice.",
    suggestedPlacements: [
      "Commute destination pages after the ranked neighbourhood table.",
      "Neighbourhood guides with strong office-worker or young-professional intent.",
      "The renter essentials hub alongside the commuter kit.",
    ],
    checklist: [
      "Choose a food flask for hot lunches and unknown office microwave access.",
      "Choose a leakproof lunchbox for simple cold lunches in a backpack or tote.",
      "Choose an insulated meal-prep bag for long days, gym days and multiple portions.",
    ],
    products: [
      {
        asin: "B00DGPPY20",
        name: "Thermos Stainless King 470ml insulated food flask",
        shortName: "Thermos food flask",
        fit: "Best for hot lunches on office days without relying on a microwave.",
        reason:
          "The Thermos flask is the best match for soup, chilli, curry or pasta when you want lunch to be ready at your desk. Compared with a lunchbox, it is less flexible for salads and separated foods, but it solves the most annoying new-office problem: not knowing whether reheating will be easy.",
      },
      {
        asin: "B07JP7TD5T",
        name: "Sistema Brilliance leakproof food storage lunchbox",
        shortName: "Sistema Brilliance lunchbox",
        fit: "Best for packed lunches that need to survive a backpack or tote bag.",
        reason:
          "The Sistema lunchbox is the simplest commuter choice if your lunch is cold, compact and going straight into a work bag. It is not insulated like the ThinkFit bag and it will not keep soup hot like the Thermos flask, but it is the neatest choice for daily packed lunches where leakage is the main risk.",
      },
      {
        asin: "B084H76VWG",
        name: "ThinkFit insulated meal prep lunch box with reusable containers",
        shortName: "ThinkFit meal prep lunch box",
        fit: "Best for full-day office meals, gym days or long cross-London commutes.",
        reason:
          "The ThinkFit bag is for heavier meal preppers: people carrying lunch, snacks, gym-day food or multiple portions across a longer commute. It is more bag than box, so it is overkill for one sandwich, but it is the better comparison pick when the whole day needs to be planned.",
      },
    ],
    articleSections: [
      {
        heading: "Prep around the commute, not the recipe",
        body:
          "The best lunch for a new commute is the one that does not leak, smell strongly on the train or need special equipment at work. Start with two cold lunches and one hot option once you understand the office setup. If the commute is crowded, slim and leakproof matters more than capacity. If the office day is long, insulation and extra portions become more useful.",
      },
      {
        heading: "Compare flask, lunchbox and insulated bag",
        body:
          "A flask is the specialist: best for hot food, weaker for variety. A leakproof lunchbox is the everyday commuter: easiest to pack, easiest to carry, weaker for temperature control. An insulated meal-prep bag is the planner's option: best for multiple portions, but bulkier on public transport.",
      },
      {
        heading: "Keep the cost visible",
        body:
          "A London office lunch can quietly become a rent-sized leak in the budget. Prep just three lunches a week and keep Fridays flexible so the habit feels useful rather than joyless. The comparison question is not which product looks most serious; it is which one stops the lunch spend you actually struggle with.",
      },
      {
        heading: "Plan lunches from UK supermarkets",
        body:
          "MealPrep.org.uk is a useful companion because it has UK supermarket-based plans and tools for container count, shopping budget and work-lunch meal prep. Use it before buying more containers so the product choice follows the meals you will really make.",
      },
    ],
    comparisonRows: [
      {
        need: "You want hot food at work",
        pick:
          "Choose the Thermos food flask if soups, chilli, curry or pasta are the lunches you will actually eat.",
        why:
          "It removes the microwave question and keeps the setup compact for a public-transport commute.",
        tradeoff:
          "It is a one-meal product, not a full meal-prep system for salads, snacks or multiple portions.",
        productAsins: ["B00DGPPY20"],
      },
      {
        need: "You want the simplest packed lunch",
        pick:
          "Choose the Sistema Brilliance lunchbox if you need a slim, leakproof container for a bag.",
        why:
          "It is the most direct answer for cold lunches, leftovers and food that needs to arrive without mess.",
        tradeoff:
          "It does not offer insulation, so it depends on fridge access or a short enough journey.",
        productAsins: ["B07JP7TD5T"],
      },
      {
        need: "You prep several portions for a long day",
        pick:
          "Choose the ThinkFit lunch box if lunch, snacks and gym-day food all need to travel together.",
        why:
          "It is better for people who plan the full workday rather than just one lunch.",
        tradeoff:
          "It is bulkier on the tube or train, so it only makes sense if you will use the extra capacity.",
        productAsins: ["B084H76VWG"],
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
