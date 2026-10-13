/**
 * Builds public/data/tube-lines.geojson from TfL's public Unified API.
 *
 *   node scripts/refresh-tube-lines.cjs
 *
 * Pulls the route sequence (both directions) for every tube line and writes
 * one LineString feature per direction, tagged with the line's id, display
 * name and brand colour. The output is committed, so the site never calls
 * TfL at runtime. Re-run when TfL changes a route (rare).
 *
 * No API key needed for the free public tier.
 */

const fs = require("node:fs");
const path = require("node:path");

const OUT = path.join(__dirname, "..", "public", "data", "tube-lines.geojson");
const BASE = "https://api.tfl.gov.uk";

// Brand colours from TfL's published line palette.
const LINE_COLOURS = {
  bakerloo: "#B36305",
  central: "#E32017",
  circle: "#FFD300",
  district: "#00782A",
  "hammersmith-city": "#F3A9BB",
  jubilee: "#A0A5A9",
  metropolitan: "#9B0056",
  northern: "#000000",
  piccadilly: "#003688",
  victoria: "#0098D4",
  "waterloo-city": "#95CDBA",
};

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function main() {
  const lines = await getJson(`${BASE}/Line/Mode/tube`);
  const features = [];
  // Outbound and inbound run the same track, and shared branches repeat
  // segments, so keep one feature per distinct path on each line.
  const seen = new Set();

  for (const line of lines) {
    const colour = LINE_COLOURS[line.id];
    if (!colour) throw new Error(`No colour for tube line "${line.id}"`);

    for (const direction of ["outbound", "inbound"]) {
      const seq = await getJson(
        `${BASE}/Line/${line.id}/Route/Sequence/${direction}`,
      );
      // TfL returns each branch as a JSON-encoded string of coordinate arrays.
      for (const raw of seq.lineStrings ?? []) {
        const coordinates = JSON.parse(raw)[0];
        if (coordinates.length < 2) continue;
        const forward = JSON.stringify(coordinates);
        const backward = JSON.stringify([...coordinates].reverse());
        if (seen.has(line.id + forward) || seen.has(line.id + backward)) continue;
        seen.add(line.id + forward);
        features.push({
          type: "Feature",
          properties: {
            lineId: line.id,
            lineName: line.name,
            direction,
            colour,
          },
          geometry: { type: "LineString", coordinates },
        });
      }
    }
    process.stdout.write(`${line.name}\n`);
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(
    OUT,
    JSON.stringify({ type: "FeatureCollection", features }) + "\n",
  );
  console.log(`Wrote ${features.length} line segments to ${path.relative(process.cwd(), OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
