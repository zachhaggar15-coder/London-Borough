#!/usr/bin/env node
/**
 * Refresh the Greater Manchester ONS rent baselines.
 *
 * The figures in lib/manchester/data/rent-market.ts are the anchor for
 * every rent number in the Manchester section, and ONS republishes them
 * monthly. Without a documented path this becomes archaeology in six
 * months: you would have to rediscover which series, which ten local
 * authority codes, and which of the four bedroom counts.
 *
 * This script does NOT write the file. It fetches the current figures,
 * diffs them against what is committed, and prints the block to paste.
 * That is deliberate — the neighbourhood-level premiums are hand-set
 * against these baselines, so a baseline that has moved 8% needs a human
 * deciding whether the per-area estimates still hold, not a silent
 * overwrite that leaves 57 areas quietly wrong.
 *
 *   node scripts/refresh-manchester-ons.cjs
 *   node scripts/refresh-manchester-ons.cjs --json
 *
 * Exits 1 if any baseline has moved by more than DRIFT_WARN_PCT, so it can
 * be wired into a monthly check if that is ever wanted.
 */

const path = require("node:path");
const Module = require("node:module");

const root = path.resolve(__dirname, "..");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function resolveAlias(request, parent, isMain, opts) {
  if (request.startsWith("@/")) {
    return originalResolve.call(this, path.join(root, request.slice(2)), parent, isMain, opts);
  }
  return originalResolve.call(this, request, parent, isMain, opts);
};

const jiti = require("jiti")(__filename);
const { GM_BOROUGHS, GM_BOROUGH_ONS_CODES } = jiti("../lib/manchester/boroughs.ts");
const { ONS_BOROUGH_RENT_GBP, ONS_RENT_REFERENCE_MONTH } = jiti(
  "../lib/manchester/data/rent-market.ts",
);

/** Percentage move in a baseline that means the per-area premiums need review. */
const DRIFT_WARN_PCT = 5;

/**
 * The ONS local housing visualisation, which is where the bedroom-level
 * borough averages are published in a scrapeable form. The bulletin PDFs
 * carry the same numbers but not per-authority and not by bedroom count.
 */
const SOURCE = (code) =>
  `https://www.ons.gov.uk/visualisations/housingpriceslocal/${code}/`;

const BEDROOM_LABELS = {
  oneBed: "One bedroom",
  twoBed: "Two bedrooms",
  threeBed: "Three bedrooms",
};

function parsePounds(text, label) {
  // The page renders these as "One bedroom: £998" inside its data tables.
  const pattern = new RegExp(`${label}[^£]{0,40}£\\s*([\\d,]+)`, "i");
  const match = pattern.exec(text);
  return match ? Number(match[1].replace(/,/g, "")) : null;
}

function parseReferenceMonth(text) {
  const match =
    /average monthly private rent[^.]*?was\s+£[\d,]+\s+in\s+([A-Z][a-z]+ \d{4})/i.exec(text) ||
    /rose to an average of\s+£[\d,]+\s+in\s+([A-Z][a-z]+ \d{4})/i.exec(text);
  return match ? match[1] : null;
}

async function fetchBorough(borough) {
  const code = GM_BOROUGH_ONS_CODES[borough];
  const response = await fetch(SOURCE(code), {
    headers: { "User-Agent": "where-in-manchester-refresh/1.0" },
  });
  if (!response.ok) {
    return { borough, code, error: `HTTP ${response.status}` };
  }
  const text = (await response.text()).replace(/<[^>]+>/g, " ");

  const fetched = {};
  for (const [key, label] of Object.entries(BEDROOM_LABELS)) {
    fetched[key] = parsePounds(text, label);
  }

  const missing = Object.entries(fetched)
    .filter(([, value]) => value == null)
    .map(([key]) => key);

  return {
    borough,
    code,
    fetched,
    referenceMonth: parseReferenceMonth(text),
    error: missing.length ? `could not parse: ${missing.join(", ")}` : null,
  };
}

function pct(from, to) {
  return from === 0 ? 0 : ((to - from) / from) * 100;
}

function pad(value, width) {
  return String(value).padEnd(width);
}

async function main() {
  const asJson = process.argv.includes("--json");
  const results = [];

  // Sequential rather than parallel: ten requests against a public ONS
  // endpoint is not worth being impolite about.
  for (const borough of GM_BOROUGHS) {
    results.push(await fetchBorough(borough));
  }

  if (asJson) {
    console.log(JSON.stringify({ committed: ONS_BOROUGH_RENT_GBP, results }, null, 2));
  }

  const failures = results.filter((r) => r.error);
  const drifted = [];

  if (!asJson) {
    console.log(`\nCommitted reference month: ${ONS_RENT_REFERENCE_MONTH}\n`);
    console.log(
      `${pad("Borough", 12)} ${pad("1-bed", 16)} ${pad("2-bed", 16)} ${pad("3-bed", 16)} Month`,
    );
    console.log("-".repeat(78));

    for (const result of results) {
      if (result.error) {
        console.log(`${pad(result.borough, 12)} ${result.error}`);
        continue;
      }
      const before = ONS_BOROUGH_RENT_GBP[result.borough];
      const cells = ["oneBed", "twoBed", "threeBed"].map((key) => {
        const was = before[key];
        const now = result.fetched[key];
        const change = pct(was, now);
        if (Math.abs(change) >= DRIFT_WARN_PCT) {
          drifted.push(`${result.borough} ${key}: ${was} → ${now} (${change.toFixed(1)}%)`);
        }
        return pad(now === was ? `${now}` : `${was} → ${now}`, 16);
      });
      console.log(
        `${pad(result.borough, 12)} ${cells.join(" ")} ${result.referenceMonth ?? "?"}`,
      );
    }

    console.log("\n─── paste into lib/manchester/data/rent-market.ts ───\n");
    for (const result of results) {
      if (result.error) continue;
      const { oneBed, twoBed, threeBed } = result.fetched;
      const all = ONS_BOROUGH_RENT_GBP[result.borough].allProperties;
      console.log(
        `  ${pad(result.borough + ":", 12)}{ oneBed: ${oneBed}, twoBed: ${twoBed}, threeBed: ${threeBed}, allProperties: ${all} },`,
      );
    }
    console.log(
      "\nNote: allProperties is carried over — this script does not parse it.\n",
    );

    if (drifted.length > 0) {
      console.log("Baselines that moved by 5% or more:\n");
      for (const line of drifted) console.log(`  ${line}`);
      console.log(
        "\nThe per-area premiums in data/neighbourhoods.ts are hand-set against\n" +
          "these baselines. Review the affected boroughs' areas before updating,\n" +
          "and move MANCHESTER_RENT_REVIEW_AS_OF when you do.\n",
      );
    }
  }

  if (failures.length > 0) {
    console.error(
      `\n${failures.length} of ${results.length} boroughs could not be read. ` +
        "The ONS page structure may have changed — check one by hand before trusting the rest.\n",
    );
    process.exit(1);
  }

  process.exit(drifted.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
