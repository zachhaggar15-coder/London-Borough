const assert = require("node:assert/strict");
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

const { GM_BOROUGHS, boroughSlug, boroughFromSlug } = jiti("../lib/manchester/boroughs.ts");
const { MANCHESTER_NEIGHBOURHOODS } = jiti("../lib/manchester/data/neighbourhoods.ts");
const { MANCHESTER_DESTINATIONS } = jiti("../lib/manchester/data/destinations.ts");
const {
  MANCHESTER_COMMUTE_TIMES,
  commuteEstimate,
  commuteMatrixGaps,
} = jiti("../lib/manchester/commute.ts");
const {
  ONS_BOROUGH_RENT_GBP,
  ROOM_DISTRICT_AVERAGE_GBP,
  ROOM_DISTRICT_LABELS,
} = jiti("../lib/manchester/data/rent-market.ts");
const {
  BAND_D_BY_BOROUGH,
  bandChargeFor,
  GM_MAYORAL_PRECEPT_BAND_D,
  GM_MAYORAL_PRECEPT_BREAKDOWN,
} = jiti("../lib/manchester/data/council-tax.ts");
const { TRAVEL_BANDS } = jiti("../lib/travel-band.ts");

const DESTINATION_IDS = MANCHESTER_DESTINATIONS.map((d) => d.id);

test("every neighbourhood id is unique", () => {
  const ids = MANCHESTER_NEIGHBOURHOODS.map((n) => n.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("every borough has at least one neighbourhood", () => {
  const covered = new Set(MANCHESTER_NEIGHBOURHOODS.map((n) => n.borough));
  const missing = GM_BOROUGHS.filter((b) => !covered.has(b));
  assert.deepEqual(missing, [], `boroughs with no neighbourhood: ${missing}`);
});

test("every neighbourhood names a real Greater Manchester borough", () => {
  for (const n of MANCHESTER_NEIGHBOURHOODS) {
    assert.ok(GM_BOROUGHS.includes(n.borough), `${n.id} has borough ${n.borough}`);
  }
});

test("borough slugs round-trip", () => {
  for (const borough of GM_BOROUGHS) {
    assert.equal(boroughFromSlug(boroughSlug(borough)), borough);
  }
});

test("every centroid falls inside the Greater Manchester bounding box", () => {
  for (const n of MANCHESTER_NEIGHBOURHOODS) {
    assert.ok(n.centroid.lat > 53.3 && n.centroid.lat < 53.7, `${n.id} latitude`);
    assert.ok(n.centroid.lng > -2.75 && n.centroid.lng < -1.95, `${n.id} longitude`);
  }
});

test("every neighbourhood uses a defined travel band", () => {
  for (const n of MANCHESTER_NEIGHBOURHOODS) {
    assert.ok(TRAVEL_BANDS.includes(n.travelBand), `${n.id} band ${n.travelBand}`);
  }
});

test("every neighbourhood points at a priced room district", () => {
  for (const n of MANCHESTER_NEIGHBOURHOODS) {
    assert.ok(
      ROOM_DISTRICT_AVERAGE_GBP[n.roomDistrict] != null,
      `${n.id} room district ${n.roomDistrict} has no price`,
    );
    assert.ok(ROOM_DISTRICT_LABELS[n.roomDistrict], `${n.roomDistrict} has no label`);
  }
});

test("two-bed rent always exceeds one-bed rent", () => {
  for (const n of MANCHESTER_NEIGHBOURHOODS) {
    assert.ok(
      n.rent.twoBedMedianGbp > n.rent.oneBedMedianGbp,
      `${n.id}: ${n.rent.twoBedMedianGbp} vs ${n.rent.oneBedMedianGbp}`,
    );
  }
});

test("neighbourhood rents stay in a plausible band around the ONS borough baseline", () => {
  // Neighbourhoods legitimately sit above or below their borough average —
  // that is the whole point of having them — but a figure more than 60%
  // either side of the published borough number means a typo, not a market.
  for (const n of MANCHESTER_NEIGHBOURHOODS) {
    const baseline = ONS_BOROUGH_RENT_GBP[n.borough].oneBed;
    const ratio = n.rent.oneBedMedianGbp / baseline;
    assert.ok(
      ratio > 0.6 && ratio < 1.6,
      `${n.id} one-bed ${n.rent.oneBedMedianGbp} vs ${n.borough} baseline ${baseline} (ratio ${ratio.toFixed(2)})`,
    );
  }
});

test("lifestyle scores are all in range", () => {
  for (const n of MANCHESTER_NEIGHBOURHOODS) {
    for (const [key, value] of Object.entries(n.lifestyle)) {
      assert.ok(
        Number.isInteger(value) && value >= 0 && value <= 10,
        `${n.id}.${key} = ${value}`,
      );
    }
  }
});

test("every neighbourhood carries editorial copy", () => {
  for (const n of MANCHESTER_NEIGHBOURHOODS) {
    assert.ok(n.summary.length > 80, `${n.id} summary is too short to be useful`);
    assert.ok(n.strengths.length >= 3, `${n.id} needs at least three strengths`);
    assert.ok(n.tradeoffs.length >= 3, `${n.id} needs at least three tradeoffs`);
    assert.ok(n.mainStations.length >= 1, `${n.id} has no stations`);
  }
});

test("the commute matrix covers every neighbourhood and destination", () => {
  const gaps = commuteMatrixGaps(MANCHESTER_NEIGHBOURHOODS, DESTINATION_IDS);
  assert.deepEqual(gaps, [], `commute gaps: ${JSON.stringify(gaps)}`);
});

test("the commute matrix has no rows for neighbourhoods that do not exist", () => {
  const known = new Set(MANCHESTER_NEIGHBOURHOODS.map((n) => n.id));
  const orphans = Object.keys(MANCHESTER_COMMUTE_TIMES).filter((id) => !known.has(id));
  assert.deepEqual(orphans, [], `orphaned commute rows: ${orphans}`);
});

test("every reviewed commute time is a plausible number of minutes", () => {
  for (const [id, row] of Object.entries(MANCHESTER_COMMUTE_TIMES)) {
    for (const [dest, minutes] of Object.entries(row)) {
      assert.ok(
        Number.isInteger(minutes) && minutes >= 3 && minutes <= 120,
        `${id} → ${dest} = ${minutes}`,
      );
    }
  }
});

test("commute estimates from the matrix are labelled as reviewed", () => {
  const chorlton = MANCHESTER_NEIGHBOURHOODS.find((n) => n.id === "chorlton");
  const estimate = commuteEstimate(chorlton, "piccadilly");
  assert.equal(estimate.source, "staticMatrix");
  assert.equal(estimate.minutes, 30);
});

test("an unknown destination returns null rather than a guess", () => {
  const chorlton = MANCHESTER_NEIGHBOURHOODS.find((n) => n.id === "chorlton");
  assert.equal(commuteEstimate(chorlton, "kings-cross"), null);
});

test("council tax covers all ten boroughs", () => {
  for (const borough of GM_BOROUGHS) {
    assert.ok(BAND_D_BY_BOROUGH[borough] > 0, `${borough} has no Band D charge`);
  }
  assert.equal(Object.keys(BAND_D_BY_BOROUGH).length, GM_BOROUGHS.length);
});

test("the mayoral precept breakdown sums to the published total", () => {
  const sum =
    GM_MAYORAL_PRECEPT_BREAKDOWN.police + GM_MAYORAL_PRECEPT_BREAKDOWN.general;
  assert.equal(Math.round(sum * 100) / 100, GM_MAYORAL_PRECEPT_BAND_D);
});

test("band charges rise monotonically from A to H", () => {
  for (const borough of GM_BOROUGHS) {
    const charges = ["A", "B", "C", "D", "E", "F", "G", "H"].map((band) =>
      bandChargeFor(borough, band),
    );
    for (let i = 1; i < charges.length; i += 1) {
      assert.ok(charges[i] > charges[i - 1], `${borough} band ${i}`);
    }
  }
  assert.equal(bandChargeFor("Nowhere", "D"), null);
});

test("Band D charges are all above the mayoral precept alone", () => {
  for (const borough of GM_BOROUGHS) {
    assert.ok(
      BAND_D_BY_BOROUGH[borough] > GM_MAYORAL_PRECEPT_BAND_D,
      `${borough} total is below the precept it includes`,
    );
  }
});

test("destination ids are unique", () => {
  assert.equal(new Set(DESTINATION_IDS).size, DESTINATION_IDS.length);
});

// ── SEO / routing layer ───────────────────────────────────────────────

const seo = jiti("../lib/manchester/seo-data.ts");
const {
  MANCHESTER_GUIDES,
  getManchesterGuide,
  manchesterGuidesLastUpdated,
} = jiti("../lib/manchester/data/guides.ts");

test("manchester paths are namespaced and never end in a slash", () => {
  assert.equal(seo.manchesterPath("/"), "/manchester");
  assert.equal(seo.manchesterPath("/boroughs"), "/manchester/boroughs");
  for (const route of seo.getManchesterIndexableRoutes()) {
    assert.ok(route.path.startsWith("/manchester"), route.path);
    assert.ok(!route.path.endsWith("/"), route.path);
  }
});

test("no Manchester route collides with a London route", () => {
  const london = new Set(
    jiti("../lib/seo-data.ts")
      .getIndexableRoutes()
      .map((r) => r.path),
  );
  for (const route of seo.getManchesterIndexableRoutes()) {
    assert.ok(!london.has(route.path), `collision on ${route.path}`);
  }
});

test("every indexable route is unique", () => {
  const paths = seo.getManchesterIndexableRoutes().map((r) => r.path);
  assert.equal(new Set(paths).size, paths.length);
});

test("ordinal suffixes are correct, including the teens", () => {
  const cases = { 1: "1st", 2: "2nd", 3: "3rd", 4: "4th", 11: "11th", 12: "12th", 13: "13th", 21: "21st", 82: "82nd", 100: "100th", 111: "111th" };
  for (const [input, expected] of Object.entries(cases)) {
    assert.equal(seo.ordinal(Number(input)), expected);
  }
});

test("comparison pages stay a curated set, not every pair", () => {
  const slugs = seo.getManchesterCompareSlugs();
  // 57 areas would allow 1,596 pairs. A cluster of interchangeable pages
  // is what got earlier clusters pulled in AdSense review, so this is a
  // deliberate cap rather than an incidental number.
  assert.ok(slugs.length > 40, `too few comparisons: ${slugs.length}`);
  assert.ok(slugs.length < 150, `comparison cluster has grown to ${slugs.length}`);
});

test("every comparison slug resolves to two real areas", () => {
  for (const slug of seo.getManchesterCompareSlugs()) {
    const data = seo.getManchesterComparePageData(slug);
    assert.ok(data, `${slug} does not resolve`);
    assert.notEqual(data.a.id, data.b.id);
  }
});

test("a comparison of an area with itself is never generated", () => {
  for (const slug of seo.getManchesterCompareSlugs()) {
    const [a, b] = slug.split("-vs-");
    assert.notEqual(a, b);
  }
});

test("the value ranking is not simply the cheapest areas", () => {
  // Dividing by rent outright sorted by cheapest and put Wigan top, which
  // contradicted the page's own intro and duplicated the rent index.
  const page = seo.getManchesterLifestylePage("value");
  const top = seo.rankByLifestyle(page, 5).map((r) => r.neighbourhood.id);
  const cheapest = [...MANCHESTER_NEIGHBOURHOODS]
    .sort((a, b) => a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp)
    .slice(0, 5)
    .map((n) => n.id);
  assert.notDeepEqual(top, cheapest);
});

test("every lifestyle page ranks and returns the requested number of areas", () => {
  for (const page of seo.MANCHESTER_LIFESTYLE_PAGES) {
    const ranked = seo.rankByLifestyle(page, 15);
    assert.equal(ranked.length, 15, page.slug);
    for (let i = 1; i < ranked.length; i += 1) {
      assert.ok(ranked[i - 1].score >= ranked[i].score, `${page.slug} unsorted at ${i}`);
    }
  }
});

test("every borough page resolves and reports a rank between 1 and 10", () => {
  for (const slug of seo.getAllManchesterBoroughSlugs()) {
    const data = seo.getManchesterBoroughPageData(slug);
    assert.ok(data, `${slug} does not resolve`);
    assert.ok(data.bandDRank >= 1 && data.bandDRank <= 10, `${slug} rank ${data.bandDRank}`);
    assert.ok(data.neighbourhoods.length > 0, `${slug} has no areas`);
  }
  assert.equal(seo.getManchesterBoroughPageData("camden"), null);
});

test("every commute page ranks all areas fastest first", () => {
  for (const slug of seo.getAllManchesterCommuteSlugs()) {
    const data = seo.getManchesterCommutePageData(slug);
    assert.ok(data, `${slug} does not resolve`);
    assert.equal(data.ranked.length, MANCHESTER_NEIGHBOURHOODS.length, slug);
    for (let i = 1; i < data.ranked.length; i += 1) {
      assert.ok(
        data.ranked[i - 1].minutes <= data.ranked[i].minutes,
        `${slug} unsorted at ${i}`,
      );
    }
  }
});

test("similar areas never include the area itself", () => {
  for (const n of MANCHESTER_NEIGHBOURHOODS) {
    for (const similar of seo.similarManchesterAreas(n)) {
      assert.notEqual(similar.neighbourhood.id, n.id, n.id);
    }
  }
});

test("guide slugs are unique and every guide resolves", () => {
  const slugs = MANCHESTER_GUIDES.map((g) => g.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) {
    assert.ok(getManchesterGuide(slug), slug);
  }
  assert.equal(getManchesterGuide("nope"), null);
});

test("every guide carries sources, FAQs and real body copy", () => {
  for (const guide of MANCHESTER_GUIDES) {
    assert.ok(guide.sections.length >= 4, `${guide.slug} is too thin`);
    assert.ok(guide.faqs.length >= 3, `${guide.slug} needs more FAQs`);
    assert.ok(guide.sources && guide.sources.length > 0, `${guide.slug} has no sources`);
    assert.ok(guide.intro.length >= 2, `${guide.slug} intro is too short`);
    for (const section of guide.sections) {
      assert.ok(section.paragraphs.length >= 1, `${guide.slug}/${section.heading}`);
    }
  }
});

test("guide last-updated is the most recent of the set", () => {
  const latest = MANCHESTER_GUIDES.map((g) => g.updated).sort().pop();
  assert.equal(manchesterGuidesLastUpdated(), latest);
});

test("every guide's internal links point somewhere this site serves", () => {
  const known = new Set([
    ...seo.getManchesterIndexableRoutes().map((r) => r.path),
    ...jiti("../lib/seo-data.ts").getIndexableRoutes().map((r) => r.path),
  ]);
  for (const guide of MANCHESTER_GUIDES) {
    for (const link of guide.related) {
      assert.ok(known.has(link.href), `${guide.slug} links to ${link.href}`);
    }
  }
});

// ── Salary cluster ────────────────────────────────────────────────────

test("the salary ladder stops where the budget stops binding", () => {
  // A first draft ran to £85,000 and the top five rungs produced the same
  // page five times. The ladder must not creep back up: pages that say
  // "you can afford anywhere" are near-duplicates of each other.
  const levels = seo.MANCHESTER_SALARY_LEVELS;
  const unconstrained = levels.filter(
    (s) => seo.getManchesterSalaryPageData(s).comfortable.length >= 50,
  );
  assert.ok(
    unconstrained.length <= 2,
    `${unconstrained.length} salary pages say the budget is not the constraint: ${unconstrained}`,
  );
});

test("salary pages always have something to recommend", () => {
  for (const salary of seo.MANCHESTER_SALARY_LEVELS) {
    const data = seo.getManchesterSalaryPageData(salary);
    // Below a certain salary no one-bed fits, and that is an honest answer
    // — but the page must still offer rooms rather than an empty list.
    assert.ok(data.roomShare.length > 0, `${salary} has no room options at all`);
    assert.ok(data.cheapestOneBed, `${salary} has no cheapest one-bed`);
  }
});

test("affordability buckets are disjoint and correctly bounded", () => {
  for (const salary of seo.MANCHESTER_SALARY_LEVELS) {
    const { comfortable, stretch } = seo.getManchesterSalaryPageData(salary);
    const ids = new Set(comfortable.map((r) => r.neighbourhood.id));
    for (const row of stretch) {
      assert.ok(!ids.has(row.neighbourhood.id), `${salary}: ${row.neighbourhood.id} in both buckets`);
      assert.ok(row.shareOfTakeHome > 0.35 && row.shareOfTakeHome <= 0.45, `${salary} stretch bound`);
    }
    for (const row of comfortable) {
      assert.ok(row.shareOfTakeHome <= 0.35, `${salary} comfortable bound`);
    }
  }
});

test("take-home rises monotonically with salary", () => {
  const levels = [...seo.MANCHESTER_SALARY_LEVELS];
  for (let i = 1; i < levels.length; i += 1) {
    const prev = seo.getManchesterSalaryPageData(levels[i - 1]).takeHomeMonthly;
    const next = seo.getManchesterSalaryPageData(levels[i]).takeHomeMonthly;
    assert.ok(next > prev, `${levels[i]} take-home is not above ${levels[i - 1]}`);
  }
});

test("only real salary levels are accepted", () => {
  assert.ok(seo.isManchesterSalaryLevel(35000));
  assert.ok(!seo.isManchesterSalaryLevel(33000));
  assert.ok(!seo.isManchesterSalaryLevel(150000));
});
