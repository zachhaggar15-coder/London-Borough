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
const {
  rukTakeHomeMonthly,
  scotlandTakeHomeMonthly,
  genevaTakeHomeMonthly,
  franceTakeHomeMonthly,
  cataloniaTakeHomeMonthly,
} = jiti("../lib/tax.ts");
const { GBP, CHF, EUR } = jiti("../lib/currency.ts");
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

  test(`${id}: the recurring-cost model is complete, whichever it uses`, () => {
    // The UK sections levy council tax on the occupier. None of the
    // international ones does - Switzerland has no occupier property
    // tax at all, France abolished taxe d habitation on main
    // residences in 2023, and Spain IBI falls on the owner. Every city
    // must carry one model or the other; a city with neither would be
    // silently telling a reader that living there costs only rent.
    const hasCouncilTax = Boolean(content.councilTax);
    assert.ok(
      hasCouncilTax || Boolean(content.localCosts),
      `${id} explains neither council tax nor what replaces it`,
    );

    if (hasCouncilTax) {
      for (const council of content.councils) {
        const bandD = content.councilTax.bandD[council];
        assert.ok(typeof bandD === "number" && bandD > 0, `${council}: ${bandD}`);
      }
    } else {
      assert.ok(
        content.localCosts.rows.length >= 3,
        `${id} has no council tax and a thin local-costs table`,
      );
      for (const row of content.localCosts.rows) {
        assert.ok(row.note.length > 40, `${row.label} has no explanation`);
      }
    }
  });

  test(`${id}: council tax band charges rise monotonically from A to H`, () => {
    if (!content.councilTax) {
      // Nothing to check: bandCharge returns null for a city with no
      // occupier property tax, and the pages render the local-costs
      // table in place of the band table.
      assert.equal(content.bandCharge(content.councils[0], "D"), null);
      return;
    }
    for (const council of content.councils) {
      let previous = 0;
      for (const band of COUNCIL_TAX_BANDS) {
        const charge = content.bandCharge(council, band);
        assert.ok(charge > previous, `${council} band ${band} = ${charge}`);
        previous = charge;
      }
    }
  });

  test(`${id}: the boundary layer is complete or absent, never partial`, () => {
    // The ONS ArcGIS service covers UK local authorities only, so the
    // international sections draw no council outline at all. A city
    // naming some codes but not others would render a map with holes.
    const config = CITY_MAP_CONFIGS[id];
    if (!config.onsCodes) return;
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
    // London was cut to 24 pairs for 95 areas after two AdSense
    // rejections for low-value content. Every other city is now held to
    // roughly the same ratio: a comparison earns a page when it is a
    // decision somebody is making, not because two areas are adjacent.
    assert.ok(slugs.length >= 8, `too few comparisons: ${slugs.length}`);
    assert.ok(
      slugs.length <= content.areas.length * 0.45,
      `comparison cluster has grown to ${slugs.length} for ` +
        `${content.areas.length} areas`,
    );
  });

  test(`${id}: every comparison sits in a themed section on the index`, () => {
    const sectioned = content
      .compareSections()
      .flatMap((section) => section.slugs);
    assert.deepEqual(
      [...new Set(sectioned)].sort(),
      content.compareSlugs(),
      "compare slugs and the index sections have drifted apart",
    );
    for (const section of content.compareSections()) {
      assert.ok(section.title.length > 0);
      assert.ok(section.description.length > 30, section.title);
    }
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
      if (content.councilTax) {
        assert.ok(
          data.bandDRank >= 1 && data.bandDRank <= content.councils.length,
          `${slug} rank ${data.bandDRank}`,
        );
      } else {
        // No council tax means no ranking on it, and the page must not
        // print a rank it does not have.
        assert.equal(data.bandDRank, null, `${slug} has a spurious rank`);
        assert.equal(data.bandD, null, `${slug} has a spurious Band D`);
      }
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

test("every city uses its own jurisdiction tax model", () => {
  // Income tax is the thing most likely to be silently wrong when a city
  // is copied from another, and the thing a reader is least able to
  // check. Each of these is a different statutory regime.
  const EXPECTED = {
    manchester: rukTakeHomeMonthly,
    bristol: rukTakeHomeMonthly,
    leeds: rukTakeHomeMonthly,
    edinburgh: scotlandTakeHomeMonthly,
    geneva: genevaTakeHomeMonthly,
    paris: franceTakeHomeMonthly,
    barcelona: cataloniaTakeHomeMonthly,
  };
  for (const [id, content] of CITIES) {
    assert.equal(content.input.takeHomeMonthly, EXPECTED[id], id);
    assert.ok(
      content.taxRegimeLabel.length > 80,
      `${id} does not explain its tax model`,
    );
  }
});

test("Edinburgh uses the Scottish council tax bands and no English city does", () => {
  const edinburgh = getCityContent("edinburgh");
  // Scotland uplifted bands E to H in 2017; the English ninths would
  // understate every large Scottish property on the site.
  assert.ok(
    edinburgh.councilTax.ratios.H > 18 / 9,
    "Edinburgh is using the English band H ratio",
  );
  for (const [id, content] of CITIES) {
    if (id === "edinburgh" || !content.councilTax) continue;
    assert.equal(content.councilTax.ratios.H, 18 / 9, id);
  }
});

test("each city prices in its own currency", () => {
  // Nobody is ever quoted a Geneva flat in sterling. A city showing the
  // wrong symbol would be quietly wrong on every figure it prints.
  const EXPECTED = {
    manchester: GBP, bristol: GBP, leeds: GBP, edinburgh: GBP,
    geneva: CHF, paris: EUR, barcelona: EUR,
  };
  for (const [id, content] of CITIES) {
    assert.equal(content.input.currency, EXPECTED[id], id);
  }
});

test("driving times are modelled for every city except London", () => {
  for (const [id, content] of CITIES) {
    const area = content.areas[0];
    const destination = content.input.destinations[0];
    const minutes = content.driveMinutes(area, destination.id);
    assert.ok(
      typeof minutes === "number" && minutes >= 5,
      `${id} models no driving time`,
    );
  }
});

test("the car wins where the rail network is thin, and loses in Paris", () => {
  // The point of modelling driving at all is the orbital journeys these
  // networks handle badly: built to bring people into a centre, not to
  // move them around an edge. Where that is true the car should win
  // somewhere.
  //
  // Paris is the deliberate exception and a useful control. It has the
  // densest metro in Europe and a decade of policy removing parking, so
  // if the model ever shows the car winning there, the arrival penalties
  // have been mis-set rather than the city having changed.
  const carShouldWin = ["manchester", "bristol", "leeds", "edinburgh", "geneva", "barcelona"];

  for (const [id, content] of CITIES) {
    let carWins = 0;
    for (const area of content.areas) {
      for (const destination of content.input.destinations) {
        const transit = content.commuteMinutes(area, destination.id);
        const drive = content.driveMinutes(area, destination.id);
        if (transit && drive != null && drive <= transit.minutes - 15) {
          carWins += 1;
        }
      }
    }

    if (carShouldWin.includes(id)) {
      assert.ok(carWins > 0, `${id}: driving never beats transit anywhere`);
    } else {
      assert.equal(
        carWins,
        0,
        `${id}: driving beats transit ${carWins} times, which for a city with this transit network means the drive model is wrong`,
      );
    }
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
