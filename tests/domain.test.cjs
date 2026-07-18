const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const Module = require("node:module");

const root = path.resolve(__dirname, "..");
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function resolveAlias(request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    return originalResolveFilename.call(
      this,
      path.join(root, request.slice(2)),
      parent,
      isMain,
      options,
    );
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};

const jiti = require("jiti")(__filename);

const {
  affordabilityScore,
  defaultMonthlyRentBudgetGbp,
} = jiti("../lib/affordability.ts");
const {
  approximateIsochrone,
  LONDON_TRANSIT_KMH,
} = jiti("../lib/isochrone.ts");
const {
  DESTINATIONS,
  DESTINATIONS_BY_ID,
} = jiti("../lib/data/destinations.ts");
const {
  isCommuteMinuteCap,
  isLondonLatLng,
  MAX_FALLBACK_REACHABLE,
  parseFallbackReachable,
} = jiti("../lib/validation.ts");
const {
  checkRateLimit,
} = jiti("../lib/rate-limit.ts");
const {
  lifestyleScore,
  scoreAll,
  scoreNeighbourhood,
} = jiti("../lib/scoring.ts");
const {
  comparisonDecision,
  personalResultsSummary,
  recommendationExplanation,
} = jiti("../lib/decision.ts");
const {
  similarAreasFor,
} = jiti("../lib/similarity.ts");
const {
  rankCouplesNeighbourhoods,
} = jiti("../lib/couples.ts");
const {
  decodeShareState,
  encodeShareState,
} = jiti("../lib/share-state.ts");
const {
  selectedRentGbp,
} = jiti("../lib/rent.ts");
const {
  strengthInsights,
  tradeoffInsights,
} = jiti("../lib/insights.ts");
const {
  boroughCoverage,
  commuteSourceLabel,
  commuteRouteSummary,
  displayCommuteMinutes,
  routeSummaryUsesOnlySupportedServices,
} = jiti("../lib/commute-details.ts");
const {
  commuteMinutesFromEstimates,
} = jiti("../lib/commute.ts");
const {
  boroughSummaries,
} = jiti("../lib/boroughs.ts");
const {
  BOROUGH_BOUNDARY_SOURCE_URL,
} = jiti("../lib/data/borough-boundaries.ts");
const {
  NEIGHBOURHOODS,
} = jiti("../lib/data/neighbourhoods.ts");
const {
  londonSampleGrid,
} = jiti("../lib/sample-grid.ts");
const {
  polygonForNeighbourhood,
} = jiti("../lib/data/polygons.ts");
const {
  RENT_MARKET_SOURCES,
} = jiti("../lib/data/rent-market.ts");
const {
  SITE_URL,
  absoluteUrl,
  getAllBoroughSlugs,
  getAllCommuteSlugs,
  getAllNeighbourhoodSlugs,
  getCompareIndexSections,
  getCompareStaticParams,
  getFeaturedCompareSlugs,
  getIndexableCompareSlugs,
  getIndexableRoutes,
  isIndexableCompareSlug,
  LIFESTYLE_PAGES,
  SALARY_LEVELS,
} = jiti("../lib/seo-data.ts");
const {
  MONETISATION_PROVIDERS,
  activeProvidersForSlot,
} = jiti("../lib/monetisation.ts");
const {
  AMAZON_ASSOCIATE_TAG,
  AMAZON_LINK_CODE,
  AMAZON_LINK_ID,
  AMAZON_REF,
  AMAZON_STORE_URL,
  MEALPREP_ORG_URL,
  amazonUkProductUrl,
  getRenterEssentialPosts,
  getRenterEssentialSlugs,
} = jiti("../lib/renter-essentials.ts");

const query = {
  destination: { id: "test", label: "Test", centroid: { lat: 51.5, lng: -0.1 } },
  maxCommuteMinutes: 45,
  monthlyRentBudgetGbp: 1500,
  annualSalaryGbp: null,
  rentBasis: "oneBedFlat",
  rentBudgetShareOfTakeHome: 0.35,
  personality: null,
  lifestyleWeights: {},
};

function distanceKm(a, b) {
  const radiusKm = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * radiusKm * Math.asin(Math.sqrt(x));
}

const neighbourhood = {
  id: "test-area",
  name: "Test Area",
  borough: "Test",
  centroid: { lat: 51.52, lng: -0.12 },
  transportZones: [2],
  rent: {
    oneBedMedianGbp: 1500,
    twoBedMedianGbp: 2000,
    source: "market_review",
    asOf: "2026-01-01",
  },
  mainStations: [],
  lifestyle: {
    livelyVsQuiet: 8,
    greenSpace: 6,
    nightlife: 7,
    cafeDensity: 9,
    gymDensity: 7,
    walkability: 8,
    foodScene: 8,
    youngProfessionalDensity: 7,
    safety: 6,
    connectivity: 9,
  },
  summary: "",
  strengths: [],
  tradeoffs: [],
  dataQuality: "sourceBacked",
};

test("affordability scoring rewards in-budget rent and tapers over budget", () => {
  assert.equal(affordabilityScore(1200, 1500), 1);
  assert.equal(affordabilityScore(1500, 1500), 1);
  assert.equal(affordabilityScore(2250, 1500), 0.5);
  assert.equal(affordabilityScore(3000, 1500), 0);
  assert.ok(defaultMonthlyRentBudgetGbp(50_000) > 1000);
  assert.ok(defaultMonthlyRentBudgetGbp(50_000, 0.4) > defaultMonthlyRentBudgetGbp(50_000, 0.35));
});

test("lifestyle scoring averages scores without a personality or manual weights", () => {
  const score = lifestyleScore(neighbourhood.lifestyle, query);
  assert.ok(score > 0.7 && score < 0.8);
});

test("advanced weights override personality and strongly demote weak matches", () => {
  const advancedQuery = {
    ...query,
    personality: "balanced",
    lifestyleWeights: { greenSpace: 1 },
  };
  const strong = {
    ...neighbourhood,
    lifestyle: { ...neighbourhood.lifestyle, greenSpace: 10 },
  };
  const weak = {
    ...neighbourhood,
    lifestyle: { ...neighbourhood.lifestyle, greenSpace: 4 },
  };

  const strongScore = scoreNeighbourhood(strong, 30, advancedQuery);
  const weakScore = scoreNeighbourhood(weak, 30, advancedQuery);

  assert.ok(strongScore.lifestyleScore > 0.95);
  assert.ok(weakScore.lifestyleScore < 0.15);
  assert.ok(strongScore.matchScore - weakScore.matchScore > 0.3);
});

test("commute cap excludes neighbourhoods beyond the user threshold", () => {
  const included = scoreNeighbourhood(neighbourhood, 30, query);
  const excluded = scoreNeighbourhood(neighbourhood, 60, query);
  assert.equal(included.isExcluded, false);
  assert.equal(excluded.isExcluded, true);
  assert.equal(excluded.matchScore, 0);
});

test("recommendation score strongly penalises material rent over budget", () => {
  const affordable = {
    ...neighbourhood,
    id: "affordable-area",
    rent: { ...neighbourhood.rent, oneBedMedianGbp: 1300 },
    lifestyle: { ...neighbourhood.lifestyle, greenSpace: 6 },
  };
  const overBudget = {
    ...neighbourhood,
    id: "over-budget-area",
    rent: { ...neighbourhood.rent, oneBedMedianGbp: 1900 },
    lifestyle: { ...neighbourhood.lifestyle, greenSpace: 10 },
  };
  const budgetQuery = {
    ...query,
    monthlyRentBudgetGbp: 1400,
    lifestyleWeights: { greenSpace: 1 },
  };

  const affordableScore = scoreNeighbourhood(affordable, 30, budgetQuery);
  const overBudgetScore = scoreNeighbourhood(overBudget, 30, budgetQuery);

  assert.ok(overBudgetScore.rentVsBudget > 1.25);
  assert.ok(affordableScore.matchScore > overBudgetScore.matchScore);
});

test("decision utilities explain shortlist trade-offs without new data", () => {
  const scored = scoreAll(NEIGHBOURHOODS, {}, query).filter((item) => !item.isExcluded);
  const explanation = recommendationExplanation(scored[0], scored.slice(1), query);
  const comparison = comparisonDecision(scored.slice(0, 3), query);
  const summary = personalResultsSummary(scored, query);

  assert.ok(explanation.bestFeature.length > 0);
  assert.ok(explanation.tradeoff.length > 0);
  assert.ok(comparison.bestFor.length >= 2);
  assert.ok(comparison.recommendation.length > 0);
  assert.ok(summary.priorityBullets.length > 0);
  assert.ok(summary.keyDecision.length > 0);
});

test("similarity engine groups alternatives by more than rent alone", () => {
  const expensiveArea = NEIGHBOURHOODS.reduce((best, area) =>
    area.rent.oneBedMedianGbp > best.rent.oneBedMedianGbp ? area : best,
  );
  const groups = similarAreasFor(expensiveArea);

  assert.ok(groups.mostSimilar.length > 0);
  assert.ok(groups.cheaper.length > 0);
  assert.ok(
    groups.mostSimilar.every(
      (item) =>
        item.neighbourhood.id !== expensiveArea.id &&
        item.reason.length > 0 &&
        item.score > 0,
    ),
  );
  assert.ok(
    groups.cheaper.every(
      (item) =>
        item.neighbourhood.rent.oneBedMedianGbp <=
        expensiveArea.rent.oneBedMedianGbp - 100,
    ),
  );
});

test("couples mode prefers balanced two-person commutes", () => {
  const candidates = ["stratford", "brixton"]
    .map((id) => NEIGHBOURHOODS.find((area) => area.id === id))
    .filter(Boolean);
  assert.equal(candidates.length, 2);

  const ranked = rankCouplesNeighbourhoods(candidates, {
    commuteA: { stratford: 15, brixton: 35 },
    commuteB: { stratford: 75, brixton: 40 },
    maxCommuteA: 45,
    maxCommuteB: 45,
    monthlyRentBudgetGbp: 2600,
    rentBasis: "twoBedFlat",
    sharedQuery: { ...query, monthlyRentBudgetGbp: 2600, rentBasis: "twoBedFlat" },
  });

  assert.equal(ranked[0].neighbourhood.id, "brixton");
  assert.ok(ranked[0].matchScore > ranked[1].matchScore);
  assert.equal(ranked[1].isExcluded, true);
});

test("share state preserves decision inputs but omits salary", () => {
  const state = encodeShareState(
    {
      ...query,
      annualSalaryGbp: 85_000,
      monthlyRentBudgetGbp: 2125,
      personality: "social",
      lifestyleWeights: { greenSpace: 0.6 },
    },
    ["brixton", "stratford"],
  );
  const decoded = decodeShareState(state);

  assert.ok(decoded);
  assert.equal(decoded.query.annualSalaryGbp, null);
  assert.equal(decoded.query.monthlyRentBudgetGbp, 2100);
  assert.equal(decoded.query.personality, "social");
  assert.deepEqual(decoded.topIds, ["brixton", "stratford"]);
});

test("commute display never falls back to unknown when a destination exists", () => {
  assert.equal(
    displayCommuteMinutes(neighbourhood, null, query) > 0,
    true,
  );
  const route = commuteRouteSummary(neighbourhood, query);
  assert.ok(route.primary.includes("Test"));
  assert.ok(route.legs.length >= 3);
  assert.ok(route.legs.every((leg) => leg.instruction.length > 0));
});

test("known destination route summaries include named services", () => {
  const brixton = NEIGHBOURHOODS.find((n) => n.id === "brixton");
  assert.ok(brixton);
  const route = commuteRouteSummary(
    brixton,
    {
      ...query,
      destination: {
        id: "victoria",
        label: "Victoria",
        centroid: { lat: 51.4952, lng: -0.1441 },
      },
    },
  );
  assert.ok(route.destinationLines.includes("Victoria"));
  assert.ok(route.legs.some((leg) => leg.service?.includes("Victoria")));
  assert.ok(route.routeOptions.length >= 1);
  assert.ok(route.routeOptions[0].label.includes("Best"));
  assert.ok(Array.isArray(route.warnings));
});

test("commute source labels and estimate conversion expose provenance", () => {
  assert.equal(commuteSourceLabel("tflJourneyPlanner"), "TfL duration");
  assert.equal(commuteSourceLabel("staticMatrix"), "reviewed estimate");
  assert.equal(commuteSourceLabel("distanceHeuristic"), "distance estimate");
  assert.equal(commuteSourceLabel(undefined), "typical estimate");

  assert.deepEqual(
    commuteMinutesFromEstimates({
      brixton: { minutes: 18, source: "staticMatrix" },
      stratford: { minutes: 14, source: "tflJourneyPlanner" },
    }),
    { brixton: 18, stratford: 14 },
  );
});

test("route summaries avoid unsupported line-by-line instructions", () => {
  for (const area of NEIGHBOURHOODS) {
    for (const destination of DESTINATIONS) {
      const route = commuteRouteSummary(
        area,
        { ...query, destination },
        "staticMatrix",
      );
      const legs = route.routeOptions.flatMap((option) => option.legs);

      assert.ok(routeSummaryUsesOnlySupportedServices(route, area, destination));
      assert.ok(legs.every((leg) => leg.instruction.length > 0));
      assert.ok(legs.every((leg) => !/^Change at /.test(leg.instruction)));
      assert.ok(
        legs.every(
          (leg) =>
            !/^Take .+ from .+ to .+$/.test(leg.instruction) || Boolean(leg.line),
        ),
      );
    }
  }
});

test("bus-first areas surface transport watch-outs", () => {
  const camberwell = NEIGHBOURHOODS.find((n) => n.id === "camberwell");
  assert.ok(camberwell);
  const route = commuteRouteSummary(
    camberwell,
    {
      ...query,
      destination: {
        id: "london-bridge",
        label: "London Bridge",
        centroid: { lat: 51.505, lng: -0.0865 },
      },
    },
  );
  assert.ok(route.routeOptions.some((option) => option.label === "Backup route"));
  assert.ok(route.warnings.some((warning) => warning.includes("Bus-first")));
});

test("neighbourhood model covers every London borough", () => {
  const coverage = boroughCoverage(NEIGHBOURHOODS);
  assert.deepEqual(coverage.missing, []);
  assert.equal(coverage.covered.length, 32);
});

test("borough search summaries cover every borough with a best card", () => {
  const scored = scoreAll(NEIGHBOURHOODS, {}, query);
  const boroughs = boroughSummaries(scored);
  assert.equal(boroughs.length, 32);
  assert.ok(boroughs.every((borough) => borough.bestMatch.neighbourhood.id));
  assert.ok(boroughs.every((borough) => borough.scored.length >= 1));
  assert.ok(boroughs.every((borough) => borough.minSelectedRentGbp <= borough.maxSelectedRentGbp));
  assert.ok(boroughs.every((borough) => borough.topStrengths.length > 0));
});

test("borough boundary source targets official London LAD features", () => {
  assert.ok(BOROUGH_BOUNDARY_SOURCE_URL.includes("FeatureServer/0/query"));
  assert.ok(BOROUGH_BOUNDARY_SOURCE_URL.includes("LAD24CD"));
  assert.ok(BOROUGH_BOUNDARY_SOURCE_URL.includes("E09"));
});

test("launch neighbourhood footprints cover every modelled area", () => {
  for (const area of NEIGHBOURHOODS) {
    const polygon = polygonForNeighbourhood(area.id);
    assert.equal(polygon.type, "Polygon");
    const ring = polygon.coordinates[0];
    assert.ok(ring.length >= 8);
    assert.deepEqual(ring[0], ring[ring.length - 1]);
  }
});

test("selected rent basis can score rooms below one-bed averages", () => {
  const roomQuery = { ...query, rentBasis: "houseShareLowerEnd" };
  const oneBedQuery = { ...query, rentBasis: "oneBedFlat" };
  const room = scoreNeighbourhood(neighbourhood, 30, roomQuery);
  const oneBed = scoreNeighbourhood(neighbourhood, 30, oneBedQuery);
  assert.ok(selectedRentGbp(neighbourhood, "houseShareLowerEnd") < selectedRentGbp(neighbourhood, "oneBedFlat"));
  assert.ok(room.affordabilityScore >= oneBed.affordabilityScore);
});

test("rent model has a maintainable source list", () => {
  assert.ok(RENT_MARKET_SOURCES.length >= 3);
  assert.ok(RENT_MARKET_SOURCES.some((source) => source.includes("ONS")));
});

test("detail insights add query-aware strengths and tradeoffs", () => {
  const scored = scoreNeighbourhood(
    {
      ...neighbourhood,
      strengths: ["Existing strength"],
      tradeoffs: ["Existing tradeoff"],
      dataQuality: "sourceBacked",
    },
    42,
    {
      ...query,
      maxCommuteMinutes: 45,
      monthlyRentBudgetGbp: 1200,
      rentBasis: "oneBedFlat",
      lifestyleWeights: { greenSpace: 1 },
    },
  );

  const strengths = strengthInsights(scored, query);
  const tradeoffs = tradeoffInsights(scored, {
    ...query,
    maxCommuteMinutes: 45,
    monthlyRentBudgetGbp: 1200,
    lifestyleWeights: { greenSpace: 1 },
  });

  assert.ok(strengths.includes("Existing strength"));
  assert.ok(tradeoffs.includes("Existing tradeoff"));
  assert.ok(tradeoffs.some((item) => item.includes("over your current budget")));
  assert.ok(tradeoffs.some((item) => item.includes("Green space")));
});

test("API validation accepts only sane London coordinates and commute caps", () => {
  assert.equal(isLondonLatLng({ lat: 51.5, lng: -0.1 }), true);
  assert.equal(isLondonLatLng({ lat: 55, lng: -0.1 }), false);
  assert.equal(isLondonLatLng({ lat: "51.5", lng: -0.1 }), false);
  assert.equal(isCommuteMinuteCap(45), true);
  assert.equal(isCommuteMinuteCap(4), false);
  assert.equal(isCommuteMinuteCap(45.5), false);
});

test("fallback reachable parser rejects malformed isochrone shaping input", () => {
  const parsed = parseFallbackReachable([
    { centroid: { lat: 51.5, lng: -0.1 }, commuteMinutes: 20 },
  ]);
  assert.deepEqual(parsed, [
    { centroid: { lat: 51.5, lng: -0.1 }, commuteMinutes: 20 },
  ]);
  assert.equal(parseFallbackReachable([{ centroid: { lat: 10, lng: 10 }, commuteMinutes: 20 }]), null);
  assert.equal(parseFallbackReachable([{ centroid: { lat: 51.5, lng: -0.1 }, commuteMinutes: -1 }]), null);
  const oversized = Array.from({ length: MAX_FALLBACK_REACHABLE + 1 }, () => ({
    centroid: { lat: 51.5, lng: -0.1 },
    commuteMinutes: 20,
  }));
  assert.equal(parseFallbackReachable(oversized), null);
});

test("rate limiter blocks repeated requests per client and scope", () => {
  const scope = `test:${Date.now()}:${Math.random()}`;
  const headers = { get: (name) => (name === "x-forwarded-for" ? "203.0.113.10" : null) };
  const options = { scope, limit: 2, windowMs: 60_000 };

  assert.deepEqual(checkRateLimit(headers, options), { ok: true });
  assert.deepEqual(checkRateLimit(headers, options), { ok: true });
  const third = checkRateLimit(headers, options);
  assert.equal(third.ok, false);
  assert.ok(third.retryAfterSeconds > 0);

  const otherClientHeaders = { get: (name) => (name === "x-forwarded-for" ? "203.0.113.11" : null) };
  assert.deepEqual(checkRateLimit(otherClientHeaders, options), { ok: true });
});

test("rate limiter applies a global cap across rotated forwarding headers", () => {
  const scope = `test:global:${Date.now()}:${Math.random()}`;
  const options = { scope, limit: 50, globalLimit: 2, windowMs: 60_000 };
  const headersFor = (ip) => ({
    get: (name) => {
      if (name === "x-forwarded-for") return ip;
      if (name === "user-agent") return "node-test";
      return null;
    },
  });

  assert.deepEqual(checkRateLimit(headersFor("203.0.113.10"), options), { ok: true });
  assert.deepEqual(checkRateLimit(headersFor("203.0.113.11"), options), { ok: true });
  const rotated = checkRateLimit(headersFor("203.0.113.12"), options);
  assert.equal(rotated.ok, false);
  assert.ok(rotated.retryAfterSeconds > 0);
});

test("approximate isochrone returns a closed polygon around the destination", () => {
  const feature = approximateIsochrone(
    { lat: 51.5, lng: -0.1 },
    [{ centroid: { lat: 51.55, lng: -0.12 }, commuteMinutes: 25 }],
    45,
  );
  const ring = feature.geometry.coordinates[0];
  assert.equal(feature.geometry.type, "Polygon");
  assert.ok(ring.length > 10);
  assert.deepEqual(ring[0], ring[ring.length - 1]);
});

test("SEO inventory exposes every generated public page for sitemap discovery", () => {
  const routes = getIndexableRoutes();
  const paths = routes.map((route) => route.path);
  const expectedCount =
    9 +
    getAllNeighbourhoodSlugs().length +
    getAllBoroughSlugs().length +
    getAllCommuteSlugs().length +
    SALARY_LEVELS.length +
    LIFESTYLE_PAGES.length +
    getIndexableCompareSlugs().length +
    getRenterEssentialSlugs().length +
    1;

  assert.equal(routes.length, expectedCount);
  assert.equal(new Set(paths).size, paths.length);
  assert.ok(paths.includes("/"));
  assert.ok(paths.includes("/neighbourhoods"));
  assert.ok(paths.includes("/boroughs"));
  assert.ok(paths.includes("/commute"));
  assert.ok(paths.includes("/compare"));
  assert.ok(paths.includes("/couples"));
  assert.ok(paths.includes("/lifestyle"));
  assert.ok(paths.includes("/salary"));
  assert.ok(paths.includes("/methodology"));
  assert.ok(paths.includes("/essentials"));
  assert.ok(getRenterEssentialSlugs().every((slug) => paths.includes(`/essentials/${slug}`)));
  assert.ok(getIndexableCompareSlugs().every((slug) => paths.includes(`/compare/${slug}`)));
  assert.ok(
    getCompareStaticParams()
      .filter((slug) => !isIndexableCompareSlug(slug))
      .every((slug) => !paths.includes(`/compare/${slug}`)),
  );
  assert.ok(paths.every((path) => path === "/" || !path.endsWith("/")));
  assert.ok(paths.every((path) => absoluteUrl(path).startsWith(SITE_URL)));
  assert.ok(routes.every((route) => route.priority > 0 && route.priority <= 1));
});

test("monetisation providers are centralised and inactive slots stay hidden", () => {
  const renterProviders = activeProvidersForSlot("renterEssentials");

  assert.ok(renterProviders.some((provider) => provider.id === "amazon-uk"));
  assert.ok(
    MONETISATION_PROVIDERS.some(
      (provider) => provider.slots.includes("broadband") && !provider.active,
    ),
  );
  assert.deepEqual(activeProvidersForSlot("broadband"), []);
});

test("meal prep moving guides are routable and link to MealPrep.org.uk", () => {
  const mealPrepSlugs = [
    "meal-prep-before-moving-house",
    "first-week-meal-prep-new-flat",
    "work-lunch-meal-prep-new-commute",
  ];
  const posts = getRenterEssentialPosts(mealPrepSlugs);
  const routes = new Set(getIndexableRoutes().map((route) => route.path));

  assert.equal(posts.length, mealPrepSlugs.length);
  assert.deepEqual(posts.map((post) => post.slug), mealPrepSlugs);
  assert.ok(posts.every((post) => post.products.length >= 3));
  assert.ok(posts.every((post) => post.articleSections?.length >= 3));
  assert.ok(posts.every((post) => post.comparisonRows?.length >= 3));
  assert.ok(
    posts.every((post) => {
      const productAsins = new Set(post.products.map((product) => product.asin));
      return post.comparisonRows?.every((row) =>
        row.productAsins.every((asin) => productAsins.has(asin)),
      );
    }),
  );
  assert.ok(
    posts.every((post) =>
      post.externalLinks?.some((link) => link.href === MEALPREP_ORG_URL),
    ),
  );
  assert.ok(mealPrepSlugs.every((slug) => routes.has(`/essentials/${slug}`)));
});

test("renter essential Amazon URLs use the configured associate link params", () => {
  const products = getRenterEssentialPosts().flatMap((post) => post.products);

  assert.ok(products.length > 0);
  assert.ok(AMAZON_STORE_URL.startsWith("https://www.amazon.co.uk?"));
  assert.ok(AMAZON_STORE_URL.includes(`tag=${AMAZON_ASSOCIATE_TAG}`));
  assert.ok(AMAZON_STORE_URL.includes(`linkCode=${AMAZON_LINK_CODE}`));
  assert.ok(AMAZON_STORE_URL.includes(`linkId=${AMAZON_LINK_ID}`));
  assert.ok(AMAZON_STORE_URL.includes(`ref_=${AMAZON_REF}`));

  for (const product of products) {
    const url = new URL(amazonUkProductUrl(product.asin));

    assert.equal(url.origin, "https://www.amazon.co.uk");
    assert.equal(url.pathname, `/dp/${product.asin}`);
    assert.equal(url.searchParams.get("tag"), AMAZON_ASSOCIATE_TAG);
    assert.equal(url.searchParams.get("linkCode"), AMAZON_LINK_CODE);
    assert.equal(url.searchParams.get("linkId"), AMAZON_LINK_ID);
    assert.equal(url.searchParams.get("ref_"), AMAZON_REF);
  }
});

test("comparison hub exposes featured crawl paths that exist in static params", () => {
  const allComparisons = new Set(getCompareStaticParams());
  const indexable = getIndexableCompareSlugs();
  const featured = getFeaturedCompareSlugs();
  const sections = getCompareIndexSections();
  const sectionSlugs = sections.flatMap((section) => section.slugs);

  assert.ok(featured.length > 0);
  assert.ok(indexable.length > 0);
  assert.ok(indexable.length < getCompareStaticParams().length);
  assert.ok(sections.length > 0);
  assert.deepEqual(indexable, sectionSlugs);
  assert.ok(featured.every((slug) => allComparisons.has(slug)));
  assert.ok(featured.every((slug) => isIndexableCompareSlug(slug)));
  assert.ok(
    sections.every((section) =>
      section.slugs.every((slug) => allComparisons.has(slug)),
    ),
  );
});

test("robots.txt allows public pages and advertises the sitemap", () => {
  const robots = fs.readFileSync(path.join(root, "public", "robots.txt"), "utf8");

  assert.match(robots, /User-agent:\s*\*/);
  assert.match(robots, /Allow:\s*\//);
  assert.match(robots, /Disallow:\s*\/api\//);
  assert.match(robots, new RegExp(`Sitemap:\\s*${SITE_URL.replace(/\./g, "\\.")}/sitemap\\.xml`));
});

test("sampled London isochrone never emits invalid polygon coordinates", () => {
  const destination = DESTINATIONS_BY_ID.marylebone.centroid;
  const minutesPerKm = 60 / LONDON_TRANSIT_KMH;
  const reachable = [
    ...londonSampleGrid().map((centroid) => ({
      centroid,
      commuteMinutes: Math.max(
        10,
        Math.round(distanceKm(centroid, destination) * minutesPerKm),
      ),
    })),
    ...NEIGHBOURHOODS.map((neighbourhood) => ({
      centroid: neighbourhood.centroid,
      commuteMinutes: Math.max(
        10,
        Math.round(distanceKm(neighbourhood.centroid, destination) * minutesPerKm),
      ),
    })),
  ];

  const feature = approximateIsochrone(destination, reachable, 90);
  const ring = feature.geometry.coordinates[0];

  assert.ok(ring.length > 100);
  assert.deepEqual(ring[0], ring[ring.length - 1]);
  assert.ok(
    ring.every(
      ([lng, lat]) =>
        Number.isFinite(lng) &&
        Number.isFinite(lat) &&
        lng >= -0.6 &&
        lng <= 0.4 &&
        lat >= 51.25 &&
        lat <= 51.75,
    ),
  );
});
