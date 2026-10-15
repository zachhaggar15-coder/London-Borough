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

const { NEIGHBOURHOODS } = jiti("../lib/data/neighbourhoods.ts");
const { LONDON_BOROUGHS } = jiti("../lib/commute-details.ts");
const {
  londonBoroughRents,
  rentBandBreaks,
  rentBandIndex,
  boundaryNameFor,
} = jiti("../lib/london-borough-rent.ts");
const { BOROUGH_FILTER_NAMES } = jiti("../lib/data/borough-boundaries.ts");

const rents = londonBoroughRents(NEIGHBOURHOODS);

test("every London borough gets a rent figure within its areas' range", () => {
  assert.equal(rents.length, LONDON_BOROUGHS.length);
  for (const rent of rents) {
    assert.ok(rent.areaCount > 0, `${rent.name} has no areas`);
    const values = NEIGHBOURHOODS.filter((n) =>
      n.borough.split("/").map((p) => p.trim()).includes(rent.name),
    ).flatMap((n) => [n.rent.oneBedMedianGbp, n.rent.twoBedMedianGbp]);
    assert.ok(rent.medianGbp >= Math.min(...values), rent.name);
    assert.ok(rent.medianGbp <= Math.max(...values), rent.name);
    assert.equal(rent.medianGbp % 25, 0, `${rent.name} not rounded to £25`);
  }
});

test("band breaks ascend and every borough lands in a band", () => {
  const breaks = rentBandBreaks(rents);
  assert.equal(breaks.length, 4);
  assert.deepEqual([...breaks].sort((a, b) => a - b), breaks);
  for (const rent of rents) {
    const band = rentBandIndex(rent.medianGbp, breaks);
    assert.ok(band >= 0 && band <= 4, rent.name);
  }
});

test("boundary names use the ONS spelling, including the '&' boroughs", () => {
  assert.equal(boundaryNameFor("Hammersmith & Fulham"), "Hammersmith and Fulham");
  assert.ok(BOROUGH_FILTER_NAMES.includes("Kensington and Chelsea"));
  assert.ok(!BOROUGH_FILTER_NAMES.includes("Kensington & Chelsea"));
});

test("tube overlay data covers all eleven tube lines", () => {
  const geojson = JSON.parse(
    fs.readFileSync(path.join(root, "public", "data", "tube-lines.geojson"), "utf8"),
  );
  const lineIds = new Set(geojson.features.map((f) => f.properties.lineId));
  assert.equal(lineIds.size, 11);
  for (const feature of geojson.features) {
    assert.match(feature.properties.colour, /^#[0-9A-F]{6}$/i);
    assert.equal(feature.geometry.type, "LineString");
  }
});
