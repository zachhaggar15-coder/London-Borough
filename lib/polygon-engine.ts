import {
  KM_PER_DEG_LAT,
  kmPerDegLngAtLat,
} from "@/lib/geo";
import { centralityRank } from "@/lib/centrality";
import type { LatLng, Neighbourhood } from "@/lib/types";

/**
 * Deterministic neighbourhood footprints, for any city.
 *
 * Vernacular neighbourhood names are not official boundary units in
 * London or in Greater Manchester, and no open dataset draws them. Until
 * one does, the map needs shapes that are defensible rather than
 * arbitrary, so each footprint is derived:
 *   1. build a local walk-shed around the curated centre, sized by how
 *      central the area is and how many lines serve it,
 *   2. orient it along the strongest transit corridor,
 *   3. clip it against nearby neighbours so adjacent areas share edges
 *      instead of overlapping into bubbles.
 *
 * The geometry is city-agnostic; everything that differs between cities
 * lives in FootprintConfig. What actually changes is small — the corridor
 * patterns are named after local lines, and the projection needs the
 * city's own latitude, which is a four per cent difference in longitude
 * scaling between London and Manchester and visible at this zoom.
 */

export type CorridorFamily = {
  /** Matched against station line names, e.g. /victoria|northern/i. */
  pattern: RegExp;
  /** Fixed bearing in radians, or "radial" to point away from the centre. */
  rotation: number | "radial";
  stretch: number;
};

export type FootprintConfig = {
  neighbourhoods: Neighbourhood[];
  centre: LatLng;
  corridorFamilies: CorridorFamily[];
};

type ProjectedPoint = { x: number; y: number };

type FootprintSeed = {
  neighbourhood: Neighbourhood;
  center: ProjectedPoint;
  radiusXKm: number;
  radiusYKm: number;
  rotation: number;
  weight: number;
};

const MIN_USABLE_AREA_KM2 = 0.18;

function buildFootprints(config: FootprintConfig): Map<string, GeoJSON.Polygon> {
  const seeds = config.neighbourhoods.map((n) => seedFor(n, config));
  const out = new Map<string, GeoJSON.Polygon>();

  for (const seed of seeds) {
    out.set(seed.neighbourhood.id, footprintFor(seed, seeds, config));
  }

  return out;
}

function seedFor(
  neighbourhood: Neighbourhood,
  config: FootprintConfig,
): FootprintSeed {
  const zone = centralityFor(neighbourhood);
  const lineCount = new Set(
    neighbourhood.mainStations.flatMap((station) => station.lines),
  ).size;
  const [baseX, baseY] = baseRadiiForZone(zone);
  const connectivityStretch = Math.min(0.42, Math.max(0, lineCount - 1) * 0.06);
  const corridor = dominantCorridor(neighbourhood, config);
  const corridorStretch = corridor?.stretch ?? 0.04;
  const rotation = rotationFor(neighbourhood, corridor, config);

  return {
    neighbourhood,
    center: project(neighbourhood.centroid.lng, neighbourhood.centroid.lat, config),
    radiusXKm: baseX * (1.08 + connectivityStretch + corridorStretch),
    radiusYKm: baseY * (1 - Math.min(0.18, connectivityStretch * 0.45)),
    rotation,
    weight: ((baseX + baseY) / 2) ** 2,
  };
}

/**
 * How central an area is, on a 1-and-up scale.
 *
 * London gives its lowest travel zone; Greater Manchester gives its travel
 * band rank (central 1 … fringe 4). The two happen to line up well enough
 * that one radius table below serves both: a band-1 city-centre footprint
 * should be about as tight as a Zone 1 one, and a fringe town about as
 * loose as Zone 4. Areas with neither fall back to 3.
 */
function centralityFor(neighbourhood: Neighbourhood): number {
  const rank = centralityRank(neighbourhood);
  return Number.isFinite(rank) ? rank : 3;
}

function baseRadiiForZone(zone: number): [number, number] {
  if (zone <= 1) return [0.72, 0.5];
  if (zone === 2) return [0.96, 0.72];
  if (zone === 3) return [1.14, 0.86];
  if (zone <= 5) return [1.36, 1.02];
  return [1.55, 1.16];
}

function footprintFor(
  seed: FootprintSeed,
  allSeeds: FootprintSeed[],
  config: FootprintConfig,
): GeoJSON.Polygon {
  const initial = organicWalkshed(seed);
  const clipped = clipAgainstNeighbours(seed, initial, allSeeds);
  const polygon =
    polygonAreaKm2(clipped) >= MIN_USABLE_AREA_KM2 ? clipped : initial;
  const ring = polygon.map((point) => {
    const coord = unproject(point, config);
    return [roundCoord(coord.lng), roundCoord(coord.lat)];
  });

  ring.push(ring[0]);

  return {
    type: "Polygon",
    coordinates: [ring],
  };
}

function organicWalkshed(seed: FootprintSeed): ProjectedPoint[] {
  const points: ProjectedPoint[] = [];
  const idSeed = hash01(seed.neighbourhood.id);
  const pointCount = 20;
  const cos = Math.cos(seed.rotation);
  const sin = Math.sin(seed.rotation);

  for (let i = 0; i < pointCount; i++) {
    const angle = (Math.PI * 2 * i) / pointCount;
    const wobble =
      1 +
      0.13 * Math.sin(angle * 3 + idSeed * Math.PI * 2) +
      0.08 * Math.cos(angle * 5 + idSeed * Math.PI * 4);
    const pinch = 1 - 0.08 * Math.sin(angle * 2 + idSeed * Math.PI);
    const x = Math.cos(angle) * seed.radiusXKm * wobble;
    const y = Math.sin(angle) * seed.radiusYKm * wobble * pinch;
    const xr = x * cos - y * sin;
    const yr = x * sin + y * cos;

    points.push({
      x: seed.center.x + xr,
      y: seed.center.y + yr,
    });
  }

  return points;
}

function clipAgainstNeighbours(
  seed: FootprintSeed,
  polygon: ProjectedPoint[],
  allSeeds: FootprintSeed[],
): ProjectedPoint[] {
  let clipped = polygon;
  const ownInfluence = influenceRadius(seed);

  const neighbours = allSeeds
    .filter((other) => other.neighbourhood.id !== seed.neighbourhood.id)
    .map((other) => ({
      seed: other,
      distance: distance(seed.center, other.center),
    }))
    .filter(({ seed: other, distance: d }) => {
      return d < ownInfluence + influenceRadius(other) + 0.45;
    })
    .sort((a, b) => a.distance - b.distance);

  for (const { seed: other } of neighbours) {
    clipped = clipToPowerBisector(seed, other, clipped);
    if (clipped.length < 3 || polygonAreaKm2(clipped) < MIN_USABLE_AREA_KM2) {
      return polygon;
    }
  }

  return clipped;
}

function clipToPowerBisector(
  own: FootprintSeed,
  other: FootprintSeed,
  polygon: ProjectedPoint[],
): ProjectedPoint[] {
  const dx = other.center.x - own.center.x;
  const dy = other.center.y - own.center.y;
  const distanceSq = dx * dx + dy * dy;
  if (distanceSq < 0.0001) return polygon;

  const a = 2 * dx;
  const b = 2 * dy;
  const c =
    other.center.x * other.center.x +
    other.center.y * other.center.y -
    own.center.x * own.center.x -
    own.center.y * own.center.y +
    own.weight * 0.22 -
    other.weight * 0.22;

  return clipPolygonByHalfPlane(polygon, a, b, c);
}

function clipPolygonByHalfPlane(
  polygon: ProjectedPoint[],
  a: number,
  b: number,
  c: number,
): ProjectedPoint[] {
  const result: ProjectedPoint[] = [];

  for (let i = 0; i < polygon.length; i++) {
    const current = polygon[i];
    const previous = polygon[(i + polygon.length - 1) % polygon.length];
    const currentInside = isInside(current, a, b, c);
    const previousInside = isInside(previous, a, b, c);

    if (currentInside !== previousInside) {
      const intersection = intersectSegmentWithLine(previous, current, a, b, c);
      if (intersection) result.push(intersection);
    }

    if (currentInside) result.push(current);
  }

  return removeNearDuplicatePoints(result);
}

function isInside(point: ProjectedPoint, a: number, b: number, c: number) {
  return a * point.x + b * point.y <= c + 0.000001;
}

function intersectSegmentWithLine(
  start: ProjectedPoint,
  end: ProjectedPoint,
  a: number,
  b: number,
  c: number,
): ProjectedPoint | null {
  const startValue = a * start.x + b * start.y;
  const endValue = a * end.x + b * end.y;
  const denominator = endValue - startValue;
  if (Math.abs(denominator) < 0.000001) return null;

  const t = (c - startValue) / denominator;
  return {
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t,
  };
}

function removeNearDuplicatePoints(points: ProjectedPoint[]) {
  return points.filter((point, index) => {
    const previous = points[(index + points.length - 1) % points.length];
    return distance(point, previous) > 0.025;
  });
}

function influenceRadius(seed: FootprintSeed) {
  return Math.max(seed.radiusXKm, seed.radiusYKm);
}

function rotationFor(
  neighbourhood: Neighbourhood,
  corridor: CorridorFamily | null,
  config: FootprintConfig,
): number {
  if (corridor) {
    if (corridor.rotation !== "radial") return corridor.rotation;
    const fromCentre = Math.atan2(
      neighbourhood.centroid.lat - config.centre.lat,
      neighbourhood.centroid.lng - config.centre.lng,
    );
    return fromCentre + 0.22;
  }
  return (hash01(neighbourhood.id) - 0.5) * 1.2;
}

function dominantCorridor(
  neighbourhood: Neighbourhood,
  config: FootprintConfig,
): CorridorFamily | null {
  let best:
    | {
        family: CorridorFamily;
        count: number;
        firstStation: number;
        firstLine: number;
      }
    | null = null;

  for (const family of config.corridorFamilies) {
    let count = 0;
    let firstStation = Number.POSITIVE_INFINITY;
    let firstLine = Number.POSITIVE_INFINITY;

    neighbourhood.mainStations.forEach((station, stationIndex) => {
      station.lines.forEach((line, lineIndex) => {
        if (!family.pattern.test(line)) return;
        count += 1;
        if (
          stationIndex < firstStation ||
          (stationIndex === firstStation && lineIndex < firstLine)
        ) {
          firstStation = stationIndex;
          firstLine = lineIndex;
        }
      });
    });

    if (count === 0) continue;
    if (
      !best ||
      count > best.count ||
      (count === best.count && firstStation < best.firstStation) ||
      (count === best.count &&
        firstStation === best.firstStation &&
        firstLine < best.firstLine)
    ) {
      best = { family, count, firstStation, firstLine };
    }
  }

  return best?.family ?? null;
}

function project(lng: number, lat: number, config: FootprintConfig): ProjectedPoint {
  return {
    x: lng * kmPerDegLngAtLat(config.centre.lat),
    y: lat * KM_PER_DEG_LAT,
  };
}

function unproject(point: ProjectedPoint, config: FootprintConfig): { lng: number; lat: number } {
  return {
    lng: point.x / kmPerDegLngAtLat(config.centre.lat),
    lat: point.y / KM_PER_DEG_LAT,
  };
}

function distance(a: ProjectedPoint, b: ProjectedPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function polygonAreaKm2(points: ProjectedPoint[]): number {
  if (points.length < 3) return 0;
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    area += current.x * next.y - next.x * current.y;
  }
  return Math.abs(area) / 2;
}

function hash01(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function roundCoord(value: number): number {
  return Math.round(value * 100000) / 100000;
}

/**
 * Build a lazily-computed polygon lookup for one city.
 *
 * Footprints are expensive to derive (every area is clipped against every
 * nearby neighbour) and completely deterministic, so each index computes
 * once on first access and is then reused for the life of the process.
 */
export function createPolygonIndex(
  config: FootprintConfig,
): (id: string) => GeoJSON.Polygon | null {
  let cache: Map<string, GeoJSON.Polygon> | null = null;
  return (id: string) => {
    if (!cache) cache = buildFootprints(config);
    return cache.get(id) ?? null;
  };
}
