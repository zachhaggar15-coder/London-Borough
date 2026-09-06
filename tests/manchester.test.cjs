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
const { TRAVEL_BANDS } = jiti("../lib/manchester/travel-band.ts");

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
