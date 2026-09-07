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

/**
 * The content layer, exercised for every generated city.
 *
 * This file replaced the Manchester-specific half of the old suite. The
 * point of the factory is that a bug in one city's pages is a bug in all
 * of them, so every invariant below runs four times rather than once —
 * and a new city inherits the whole suite by being added to the registry.
 */
const { CONTENT_CITY_IDS, getCityContent, allCityContent } = jiti(
  "../lib/city-registry.ts",
);
const { getIndexableRoutes } = jiti("../lib/seo-data.ts");
const { ordinal, COUNCIL_TAX_BANDS } = jiti("../lib/city-content.ts");
const { TRAVEL_BANDS } = jiti("../lib/travel-band.ts");
const { rukTakeHomeMonthly, scotlandTakeHomeMonthly } = jiti("../lib/tax.ts");
const { CITY_MAP_CONFIGS } = jiti("../lib/city-maps.ts");

const CITIES = CONTENT_CITY_IDS.map((id) => [id, getCityContent(id)]);

// ── Dataset integrity, per city ───────────────────────────────────────

for (const [id, content] of CITIES) {
  const areas = content.areas;
  const destinationIds = content.input.destinations.map((d) => d.id);

  test(`${id}: every area id is unique`, () => {
    const ids = areas.map((a) => a.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  test(`${id}: every area names a real council`, () => {
    for (const a of areas) {
      assert.ok(
        content.councils.includes(a.borough),
        `${a.id} names ${a.borough}`,
      );
    }
  });

  test(`${id}: every council has at least one area`, () => {
    const covered = new Set(areas.map((a) => a.borough));
    const missing = content.councils.filter((c) => !covered.has(c));
    assert.deepEqual(missing, [], `councils with no area: ${missing}`);
  });

  test(`${id}: every area carries a valid travel band`, () => {
    for (const a of areas) {
      assert.ok(TRAVEL_BANDS.includes(a.travelBand), `${a.id}: ${a.travelBand}`);
    }
  });

  test(`${id}: every travel band is used by at least one area`, () => {
    const used = new Set(areas.map((a) => a.travelBand));
    for (const band of TRAVEL_BANDS) {
      assert.ok(used.has(band), `no area in the ${band} band`);
    }
  });

  test(`${id}: lifestyle scores are all 0-10 integers`, () => {
    for (const a of areas) {
      for (const [key, value] of Object.entries(a.lifestyle)) {
        assert.ok(
          Number.isInteger(value) && value >= 0 && value <= 10,
          `${a.id}.${key} = ${value}`,
        );
      }
    }
  });

  test(`${id}: a two-bed always costs more than a one-bed`, () => {
    for (const a of areas) {
      assert.ok(
        a.rent.twoBedMedianGbp > a.rent.oneBedMedianGbp,
        `${a.id}: ${a.rent.twoBedMedianGbp} vs ${a.rent.oneBedMedianGbp}`,
      );
    }
  });

  test(`${id}: every area has strengths, tradeoffs and a summary`, () => {
    for (const a of areas) {
      assert.ok(a.summary.length > 60, `${a.id} summary is too short`);
      assert.ok(a.strengths.length >= 3, `${a.id} has ${a.strengths.length} strengths`);
      assert.ok(a.tradeoffs.length >= 3, `${a.id} has ${a.tradeoffs.length} tradeoffs`);
      assert.ok(a.mainStations.length >= 1, `${a.id} has no station`);
    }
  });

  test(`${id}: no two areas share a summary`, () => {
    // The failure mode this guards against is templated prose. Two areas
    // with the same summary means the profiles were generated, not
    // written, which is exactly what gets a cluster pulled in review.
    const summaries = areas.map((a) => a.summary);
    assert.equal(new Set(summaries).size, summaries.length);
  });

  test(`${id}: the commute matrix covers every area and destination`, () => {
    for (const a of areas) {
      const row = content.input.commuteTimes[a.id];
      assert.ok(row, `${a.id} has no commute row`);
      for (const destinationId of destinationIds) {
        assert.ok(
          typeof row[destinationId] === "number",
          `${a.id} has no reviewed time for ${destinationId}`,
        );
      }
    }
  });

  test(`${id}: the commute matrix has no rows for unknown areas`, () => {
    const ids = new Set(areas.map((a) => a.id));
    for (const key of Object.keys(content.input.commuteTimes)) {
      assert.ok(ids.has(key), `commute row for unknown area ${key}`);
    }
  });

  test(`${id}: destination ids are unique`, () => {
    assert.equal(new Set(destinationIds).size, destinationIds.length);
  });

  test(`${id}: every area maps to a room district with a price`, () => {
    for (const a of areas) {
      const group = content.input.rent.roomDistrictForArea[a.id];
      assert.ok(group, `${a.id} names no room district`);
      assert.ok(
        typeof content.input.rent.roomAverages[group] === "number",
        `${a.id} names unpriced district ${group}`,
      );
      assert.ok(
        content.input.rent.roomLabels[group],
        `${group} has no reader-facing label`,
      );
    }
  });

  test(`${id}: every council maps to a published rent baseline`, () => {
    for (const council of content.councils) {
      const key = content.input.rent.baselineForCouncil[council];
      assert.ok(key, `${council} maps to no baseline`);
      const baseline = content.input.rent.baselines[key];
      assert.ok(baseline, `${council} maps to missing baseline ${key}`);
      assert.ok(baseline.oneBed > 0 && baseline.twoBed > baseline.oneBed);
    }
  });

  test(`${id}: every council has a Band D charge`, () => {
    for (const council of content.councils) {
      const bandD = content.input.councilTax.bandD[council];
      assert.ok(typeof bandD === "number" && bandD > 0, `${council}: ${bandD}`);
    }
  });

  test(`${id}: council tax band charges rise monotonically from A to H`, () => {
    for (const council of content.councils) {
      let previous = 0;
      for (const band of COUNCIL_TAX_BANDS) {
        const charge = content.bandCharge(council, band);
        assert.ok(charge > previous, `${council} band ${band} = ${charge}`);
        previous = charge;
      }
    }
  });

  test(`${id}: the map config names every council's ONS code`, () => {
    const config = CITY_MAP_CONFIGS[id];
    for (const council of content.councils) {
      assert.ok(config.onsCodes[council], `${council} has no ONS code`);
    }
  });
}

// ── Routing and content, per city ─────────────────────────────────────

for (const [id, content] of CITIES) {
  test(`${id}: paths are namespaced and never end in a slash`, () => {
    assert.equal(content.path("/"), `/${id}`);
    assert.equal(content.path("/commute"), `/${id}/commute`);
    for (const route of content.indexableRoutes()) {
      assert.ok(route.path.startsWith(`/${id}`), route.path);
      assert.ok(!route.path.endsWith("/"), route.path);
    }
  });

  test(`${id}: every indexable route is unique`, () => {
    const paths = content.indexableRoutes().map((r) => r.path);
    assert.equal(new Set(paths).size, paths.length);
  });

  test(`${id}: comparison pages stay a curated set, not every pair`, () => {
    const slugs = content.compareSlugs();
    // Thirty areas would allow over four hundred pairs. A cluster of
    // interchangeable pages is what got earlier clusters pulled in
    // AdSense review, so this cap is deliberate rather than incidental.
    assert.ok(slugs.length > 20, `too few comparisons: ${slugs.length}`);
    assert.ok(
      slugs.length < content.areas.length * 3,
      `comparison cluster has grown to ${slugs.length}`,
    );
  });

  test(`${id}: every comparison slug resolves to two distinct areas`, () => {
    for (const slug of content.compareSlugs()) {
      const data = content.getComparePageData(slug);
      assert.ok(data, `${slug} does not resolve`);
      assert.notEqual(data.a.id, data.b.id);
    }
  });

  test(`${id}: every council page resolves with a rank in range`, () => {
    for (const slug of content.councilSlugs()) {
      const data = content.getCouncilPageData(slug);
      assert.ok(data, `${slug} does not resolve`);
      assert.ok(
        data.bandDRank >= 1 && data.bandDRank <= content.councils.length,
        `${slug} rank ${data.bandDRank}`,
      );
      assert.ok(data.areas.length > 0, `${slug} has no areas`);
    }
    assert.equal(content.getCouncilPageData("camden"), null);
  });

  test(`${id}: every commute page ranks all areas fastest first`, () => {
    for (const slug of content.commuteSlugs()) {
      const data = content.getCommutePageData(slug);
      assert.ok(data, `${slug} does not resolve`);
      assert.equal(data.ranked.length, content.areas.length, slug);
      for (let i = 1; i < data.ranked.length; i += 1) {
        assert.ok(
          data.ranked[i - 1].minutes <= data.ranked[i].minutes,
          `${slug} unsorted at ${i}`,
        );
      }
    }
  });

  test(`${id}: every lifestyle page ranks and sorts correctly`, () => {
    for (const page of content.input.lifestylePages) {
      const ranked = content.rankByLifestyle(page, 15);
      assert.equal(ranked.length, 15, page.slug);
      for (let i = 1; i < ranked.length; i += 1) {
        assert.ok(
          ranked[i - 1].score >= ranked[i].score,
          `${page.slug} unsorted at ${i}`,
        );
      }
    }
  });

  test(`${id}: the value ranking is not simply the cheapest areas`, () => {
    // Dividing by rent outright sorts by cheapest, which contradicts the
    // page's own intro and duplicates the rent index.
    const page = content.getLifestylePage("value");
    assert.ok(page, "no value page");
    const top = content.rankByLifestyle(page, 5).map((r) => r.area.id);
    const cheapest = [...content.areas]
      .sort((a, b) => a.rent.oneBedMedianGbp - b.rent.oneBedMedianGbp)
      .slice(0, 5)
      .map((a) => a.id);
    assert.notDeepEqual(top, cheapest);
  });

  test(`${id}: similar areas never include the area itself`, () => {
    for (const a of content.areas) {
      for (const similar of content.similarAreas(a)) {
        assert.notEqual(similar.area.id, a.id);
      }
    }
  });

  test(`${id}: every guide has a unique slug and real content`, () => {
    const slugs = content.input.guides.map((g) => g.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    for (const guide of content.input.guides) {
      assert.ok(content.getGuide(guide.slug), `${guide.slug} does not resolve`);
      assert.ok(guide.intro.length >= 2, `${guide.slug} intro is thin`);
      assert.ok(guide.sections.length >= 3, `${guide.slug} has few sections`);
      assert.ok(guide.faqs.length >= 3, `${guide.slug} has few FAQs`);
    }
  });

  test(`${id}: every guide's related links point somewhere real`, () => {
    const known = new Set([
      ...content.indexableRoutes().map((r) => r.path),
      ...getIndexableRoutes().map((r) => r.path),
    ]);
    for (const guide of content.input.guides) {
      for (const link of guide.related) {
        assert.ok(known.has(link.href), `${guide.slug} links to ${link.href}`);
      }
    }
  });

  test(`${id}: the salary ladder produces distinct verdicts`, () => {
    // The London pages once told a £150,000 reader they could afford
    // Romford, because every top rung hit the same branch. A ladder whose
    // last rungs all say "rent is not the constraint" is padding.
    const saturated = content.input.salaryLevels.filter((salary) => {
      const data = content.getSalaryPageData(salary);
      return data.comfortable.length >= content.areas.length * 0.85;
    });
    assert.ok(
      saturated.length <= 2,
      `${saturated.length} salary pages are saturated: ${saturated}`,
    );
  });

  test(`${id}: the cheapest salary rung is genuinely constrained`, () => {
    const lowest = content.input.salaryLevels[0];
    const data = content.getSalaryPageData(lowest);
    assert.ok(
      data.comfortable.length < content.areas.length * 0.5,
      `£${lowest} already fits ${data.comfortable.length} of ${content.areas.length} areas`,
    );
  });

  test(`${id}: copy fields are filled in, not placeholders`, () => {
    const copy = content.copy;
    assert.ok(copy.homeIntro.length > 100, "homeIntro is thin");
    assert.ok(copy.commuteIntro.length > 100, "commuteIntro is thin");
    assert.ok(copy.councilsIntro.length > 100, "councilsIntro is thin");
    assert.ok(copy.lifestyleIntro.length > 100, "lifestyleIntro is thin");
    assert.ok(copy.couplesIntro.length >= 2, "couplesIntro needs two paragraphs");
    assert.ok(copy.homeFaqs.length >= 2, "homeFaqs is thin");
    assert.ok(copy.rentMethod.length >= 1, "rentMethod is empty");
    assert.ok(copy.commuteMethod.length >= 1, "commuteMethod is empty");
    assert.ok(copy.councilTaxMethod.length >= 1, "councilTaxMethod is empty");
  });
}

// ── Cross-city invariants ─────────────────────────────────────────────

test("no city route collides with London's, or with another city's", () => {
  const seen = new Map();
  for (const route of getIndexableRoutes()) seen.set(route.path, "london");
  for (const [id, content] of CITIES) {
    for (const route of content.indexableRoutes()) {
      const existing = seen.get(route.path);
      assert.ok(!existing, `${id} collides with ${existing} on ${route.path}`);
      seen.set(route.path, id);
    }
  }
});

test("no two cities share a base path", () => {
  const paths = allCityContent().map((c) => c.city.basePath);
  assert.equal(new Set(paths).size, paths.length);
});

test("no two cities share prose", () => {
  // The whole point of the copy block is that the four sections do not
  // read as one section with the nouns swapped.
  for (const field of ["homeIntro", "commuteIntro", "councilsIntro", "lifestyleIntro", "compareIntro"]) {
    const values = allCityContent().map((c) => c.copy[field]);
    assert.equal(
      new Set(values).size,
      values.length,
      `two cities share their ${field}`,
    );
  }
});

test("Edinburgh uses the Scottish tax and band models, and nobody else does", () => {
  const edinburgh = getCityContent("edinburgh");
  assert.equal(edinburgh.input.takeHomeMonthly, scotlandTakeHomeMonthly);
  // Scotland uplifted bands E to H in 2017; the English ninths would
  // understate every large Scottish property on the site.
  assert.ok(
    edinburgh.input.councilTax.ratios.H > 18 / 9,
    "Edinburgh is using the English band H ratio",
  );
  for (const [id, content] of CITIES) {
    if (id === "edinburgh") continue;
    assert.equal(content.input.takeHomeMonthly, rukTakeHomeMonthly, id);
    assert.equal(content.input.councilTax.ratios.H, 18 / 9, id);
  }
});

test("Edinburgh's rent baselines are keyed to BRMAs, not councils", () => {
  // Scotland publishes by Broad Rental Market Area, and Edinburgh, East
  // Lothian and Midlothian share the single Lothian row. Keying these to
  // councils would mean inventing three figures that do not exist.
  const edinburgh = getCityContent("edinburgh");
  const map = edinburgh.input.rent.baselineForCouncil;
  assert.equal(map["City of Edinburgh"], "Lothian");
  assert.equal(map["East Lothian"], "Lothian");
  assert.equal(map["Midlothian"], "Lothian");
  assert.equal(map["West Lothian"], "West Lothian");
  assert.ok(
    edinburgh.input.rent.note,
    "Edinburgh must carry the BRMA and new-lets caveat",
  );
});

test("no city section explains itself by reference to another city", () => {
  // A standing product rule: each section stands on its own. A Manchester
  // page that explains itself by reference to London is the failure mode
  // this guards against.
  //
  // Naming another city as a destination is fine and often necessary —
  // "direct trains to London every twenty minutes" is a fact about the
  // station, not a comparison. What is banned is the comparative
  // construction, so that is what the pattern matches.
  const OTHERS = "London|Manchester|Bristol|Leeds|Edinburgh";
  const COMPARISONS = [
    new RegExp(`\b(than|versus|vs\.?|unlike|compared (?:to|with)|against)\s+(?:${OTHERS})\b`, "i"),
    new RegExp(`\b(?:${OTHERS})\s+(prices|rents|equivalent|standards|money)\b`, "i"),
    new RegExp(`\bcheaper|dearer|pricier\b[^.]{0,40}\b(?:${OTHERS})\b`, "i"),
  ];

  for (const [id, content] of CITIES) {
    const own = new RegExp(`\b${content.city.name}\b`, "i");
    const prose = [
      ...content.areas.flatMap((a) => [a.summary, ...a.strengths, ...a.tradeoffs]),
      content.copy.homeIntro,
      content.copy.commuteIntro,
      content.copy.councilsIntro,
      content.copy.lifestyleIntro,
      content.copy.compareIntro,
      ...content.copy.couplesIntro,
      ...content.input.lifestylePages.map((p) => p.intro),
    ];

    for (const text of prose) {
      for (const pattern of COMPARISONS) {
        const match = text.match(pattern);
        if (!match) continue;
        assert.ok(
          own.test(match[0]),
          `${id} compares itself to another city: "${match[0]}"`,
        );
      }
    }
  }
});

test("ordinal suffixes are correct, including the teens", () => {
  const cases = {
    1: "1st", 2: "2nd", 3: "3rd", 4: "4th", 11: "11th", 12: "12th",
    13: "13th", 21: "21st", 82: "82nd", 100: "100th", 111: "111th",
  };
  for (const [input, expected] of Object.entries(cases)) {
    assert.equal(ordinal(Number(input)), expected);
  }
});
