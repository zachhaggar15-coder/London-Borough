#!/usr/bin/env node
/**
 * Thin-content audit, run against a running site.
 *
 *   npm run audit:content -- http://localhost:3000
 *   npm run audit:content -- https://london-borough.vercel.app
 *
 * AdSense rejected this site three times for "Low value content". Each
 * time the cause was the same: pages generated from one template with a
 * few numbers swapped, which unit tests cannot see because every page is
 * technically unique. This measures what a reviewer sees instead — the
 * rendered <main> text of every URL in the sitemap — and fails when a
 * cluster of pages is mostly the same words.
 *
 * Method (identical to the September 2026 diagnosis, so figures compare):
 *   1. Group sitemap URLs into clusters by replacing the last path
 *      segment with `*` (/neighbourhoods/clapham -> /neighbourhoods/*).
 *   2. Normalise each page: mask numbers and capitalised words (so place
 *      names and figures do not count as difference), lower-case, split
 *      into 5-word shingles.
 *   3. Per cluster, report the median pairwise overlap (shared shingles
 *      over the smaller page's shingles) and each page's unique words —
 *      approximated from the shingles that appear on no other page in
 *      its cluster.
 *
 * It also checks that every internal link inside <main> resolves with a
 * 200, not a redirect or a 404: a link into a switched-off section is a
 * dead end for a reader and a signal for a reviewer.
 *
 * Thresholds are deliberately not tuned to pass. If a cluster fails, the
 * fix is writing, not a lower number here.
 */

const MAX_MEDIAN_OVERLAP = 0.6;
const MIN_UNIQUE_WORDS = 200;
/** Clusters smaller than this are hubs and one-offs, not templates. */
const MIN_CLUSTER_SIZE = 3;
const SHINGLE = 5;
const CONCURRENCY = 8;

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

async function fetchText(url, init) {
  const res = await fetch(url, { redirect: "manual", ...init });
  return { status: res.status, location: res.headers.get("location"), body: res.status === 200 ? await res.text() : "" };
}

async function pool(items, worker) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < items.length) {
        const index = next++;
        results[index] = await worker(items[index], index);
      }
    }),
  );
  return results;
}

function mainHtml(html) {
  const match = html.match(/<main[\s\S]*<\/main>/);
  return (match ? match[0] : html)
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ");
}

function visibleText(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shingles(text) {
  const words = text
    .replace(/[£€$]?\d[\d,.]*%?/g, "N")
    .replace(/\b[A-Z][a-zà-ÿ'’-]+\b/g, "X")
    .toLowerCase()
    .split(/[^a-zn]+/)
    .filter(Boolean);
  const set = new Set();
  for (let i = 0; i + SHINGLE <= words.length; i++) {
    set.add(words.slice(i, i + SHINGLE).join(" "));
  }
  return set;
}

function overlap(a, b) {
  let shared = 0;
  for (const s of a) if (b.has(s)) shared++;
  return shared / Math.max(1, Math.min(a.size, b.size));
}

function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((x, y) => x - y);
  return sorted[Math.floor(sorted.length / 2)];
}

function clusterOf(path) {
  const parts = path.split("/").filter(Boolean);
  if (parts.length <= 1) return `/${parts.join("/")}`;
  return `/${parts.slice(0, -1).join("/")}/*`;
}

async function main() {
  const sitemap = await fetchText(`${base}/sitemap.xml`);
  if (sitemap.status !== 200) throw new Error(`sitemap returned ${sitemap.status}`);
  const paths = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    new URL(m[1]).pathname.replace(/\/$/, "") || "/",
  );
  console.log(`${paths.length} URLs in the sitemap at ${base}\n`);

  const pages = await pool(paths, async (path) => {
    const res = await fetchText(`${base}${path}`);
    const html = res.status === 200 ? mainHtml(res.body) : "";
    const text = visibleText(html);
    const links = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1] || "/");
    return { path, status: res.status, text, words: text.split(" ").length, shingles: shingles(text), links };
  });

  const failures = [];

  for (const page of pages) {
    if (page.status !== 200) failures.push(`${page.path} is in the sitemap but returns ${page.status}`);
  }

  // ── Template overlap ────────────────────────────────────────────
  const clusters = new Map();
  for (const page of pages) {
    const key = clusterOf(page.path);
    if (!clusters.has(key)) clusters.set(key, []);
    clusters.get(key).push(page);
  }

  const rows = [];
  for (const [key, members] of clusters) {
    if (members.length < MIN_CLUSTER_SIZE) continue;
    const overlaps = [];
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        overlaps.push(overlap(members[i].shingles, members[j].shingles));
      }
    }
    const counts = new Map();
    for (const member of members) {
      for (const s of member.shingles) counts.set(s, (counts.get(s) ?? 0) + 1);
    }
    let thinnest = null;
    for (const member of members) {
      // Approximate unique words: unique shingles contribute their span,
      // so a run of k unique shingles is k + 4 words, not 5k.
      const uniqueShingles = [...member.shingles].filter((s) => counts.get(s) === 1).length;
      member.uniqueWords = uniqueShingles === 0 ? 0 : uniqueShingles + SHINGLE - 1;
      if (!thinnest || member.uniqueWords < thinnest.uniqueWords) thinnest = member;
    }
    const med = median(overlaps);
    rows.push({ key, size: members.length, med, thinnest });
    if (med > MAX_MEDIAN_OVERLAP) {
      failures.push(`${key}: median overlap ${(med * 100).toFixed(0)}% exceeds ${MAX_MEDIAN_OVERLAP * 100}%`);
    }
    for (const member of members) {
      if (member.uniqueWords < MIN_UNIQUE_WORDS) {
        failures.push(`${member.path}: only ~${member.uniqueWords} words not shared with its cluster (floor ${MIN_UNIQUE_WORDS})`);
      }
    }
  }

  rows.sort((a, b) => b.med - a.med);
  console.log("cluster".padEnd(34), "pages", "median overlap", "  thinnest page (unique words)");
  for (const row of rows) {
    console.log(
      row.key.padEnd(34),
      String(row.size).padStart(5),
      `${(row.med * 100).toFixed(0)}%`.padStart(14),
      `  ${row.thinnest.path} (${row.thinnest.uniqueWords})`,
    );
  }

  // ── Internal links ──────────────────────────────────────────────
  const linkTargets = [...new Set(pages.flatMap((p) => p.links))];
  const linkStatus = new Map(
    await pool(linkTargets, async (href) => [href, (await fetchText(`${base}${href}`, { method: "HEAD" })).status]),
  );
  const broken = new Map();
  for (const page of pages) {
    for (const href of page.links) {
      const status = linkStatus.get(href);
      if (status !== 200) {
        const key = `${href} (${status})`;
        if (!broken.has(key)) broken.set(key, []);
        broken.get(key).push(page.path);
      }
    }
  }
  // Links first: they are few, and each one is a concrete fix.
  failures.unshift(
    ...[...broken].map(
      ([target, from]) => `link to ${target} from ${from.length} page(s), e.g. ${from[0]}`,
    ),
  );
  console.log(`\n${linkTargets.length} distinct internal links checked`);

  if (failures.length > 0) {
    console.log(`\n✖ ${failures.length} problem(s):`);
    for (const failure of failures.slice(0, 80)) console.log(`  - ${failure}`);
    if (failures.length > 80) console.log(`  … and ${failures.length - 80} more`);
    process.exit(1);
  }
  console.log("\n✔ no cluster over the overlap ceiling, no thin pages, no dead links");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
