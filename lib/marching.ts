/**
 * Marching squares — extract a contour ring from a 2D scalar field.
 *
 * Used by the isochrone builder: we evaluate a signed-distance field
 * across a fine grid (positive inside the reachable region, negative
 * outside) and then trace the zero-crossing as a polygon.
 *
 * Inputs:
 *   - field: rows × cols of numbers. Field[r][c] is the value at the
 *            grid vertex (r, c). The whole grid lies in a bbox; the
 *            caller is responsible for converting (r, c) → lat/lng.
 *   - threshold: contour level (we use 0).
 *
 * Output:
 *   Largest closed contour ring as an array of (r, c) points with
 *   fractional coordinates. The caller maps each (r, c) back to
 *   lat/lng. Returns [] if no closed contour exists.
 *
 * Implementation: classic 16-case marching-squares. Saddle cases
 * (5 and 10) are resolved by the *average* of the four corners — the
 * most common disambiguation. For non-pathological fields like a union
 * of overlapping discs this is correct.
 */

export type GridPoint = [number, number]; // [row, col], may be fractional

type Segment = [GridPoint, GridPoint];

/**
 * Linear interpolation parameter t ∈ [0, 1] where the threshold is
 * crossed between values v1 (t=0) and v2 (t=1).
 */
function lerpT(v1: number, v2: number, threshold: number): number {
  if (v2 === v1) return 0.5;
  return (threshold - v1) / (v2 - v1);
}

function marchingSquaresSegments(
  field: number[][],
  threshold: number,
): Segment[] {
  const rows = field.length;
  const cols = field[0].length;
  const segs: Segment[] = [];

  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const tl = field[r][c];
      const tr = field[r][c + 1];
      const br = field[r + 1][c + 1];
      const bl = field[r + 1][c];

      let code = 0;
      if (tl >= threshold) code |= 8;
      if (tr >= threshold) code |= 4;
      if (br >= threshold) code |= 2;
      if (bl >= threshold) code |= 1;

      // Edge crossing points (lazy):
      const top = (): GridPoint => [r, c + lerpT(tl, tr, threshold)];
      const right = (): GridPoint => [r + lerpT(tr, br, threshold), c + 1];
      const bot = (): GridPoint => [r + 1, c + lerpT(bl, br, threshold)];
      const left = (): GridPoint => [r + lerpT(tl, bl, threshold), c];

      switch (code) {
        case 0:
        case 15:
          // entirely outside / entirely inside — no contour
          break;
        case 1: // only bl inside
          segs.push([left(), bot()]);
          break;
        case 14: // bl outside, rest inside → contour is the same edge
          segs.push([bot(), left()]);
          break;
        case 2: // only br inside
          segs.push([bot(), right()]);
          break;
        case 13:
          segs.push([right(), bot()]);
          break;
        case 3: // bl + br inside
          segs.push([left(), right()]);
          break;
        case 12:
          segs.push([right(), left()]);
          break;
        case 4: // only tr inside
          segs.push([top(), right()]);
          break;
        case 11:
          segs.push([right(), top()]);
          break;
        case 6: // tr + br inside
          segs.push([top(), bot()]);
          break;
        case 9:
          segs.push([bot(), top()]);
          break;
        case 7: // tl outside, rest inside
          segs.push([top(), left()]);
          break;
        case 8: // only tl inside
          segs.push([left(), top()]);
          break;
        case 5: {
          // saddle: tl + br inside (or the opposite for 10).
          // Disambiguate by the average value of the four corners.
          const avg = (tl + tr + br + bl) / 4;
          if (avg >= threshold) {
            // "connect across" — tl-br are joined
            segs.push([left(), top()]);
            segs.push([right(), bot()]);
          } else {
            segs.push([left(), bot()]);
            segs.push([right(), top()]);
          }
          break;
        }
        case 10: {
          const avg = (tl + tr + br + bl) / 4;
          if (avg >= threshold) {
            segs.push([top(), right()]);
            segs.push([bot(), left()]);
          } else {
            segs.push([top(), left()]);
            segs.push([bot(), right()]);
          }
          break;
        }
      }
    }
  }
  return segs;
}

/**
 * Chain marching-squares segments into closed rings. Each segment has
 * two endpoints lying on a grid edge; segments that share an endpoint
 * (snap-tolerance: 1e-6) connect into the same ring.
 *
 * The output may include multiple rings — one per connected component.
 * The caller can pick the largest one.
 */
function chainSegmentsIntoRings(segs: Segment[]): GridPoint[][] {
  const TOL = 1e-5;
  const key = (p: GridPoint): string =>
    `${Math.round(p[0] / TOL)}|${Math.round(p[1] / TOL)}`;

  // Map: endpoint-key → list of segment indices touching that key.
  const endpointIndex = new Map<string, number[]>();
  segs.forEach((s, i) => {
    for (const p of s) {
      const k = key(p);
      const arr = endpointIndex.get(k);
      if (arr) arr.push(i);
      else endpointIndex.set(k, [i]);
    }
  });

  const used = new Array<boolean>(segs.length).fill(false);
  const rings: GridPoint[][] = [];

  for (let start = 0; start < segs.length; start++) {
    if (used[start]) continue;
    used[start] = true;

    const ring: GridPoint[] = [segs[start][0], segs[start][1]];
    let head = segs[start][1];

    // Walk forward until we close the loop or run out of segments.
    while (true) {
      const candidates = endpointIndex.get(key(head)) ?? [];
      let nextIdx = -1;
      while (candidates.length > 0) {
        const idx = candidates.pop()!;
        if (!used[idx]) {
          nextIdx = idx;
          break;
        }
      }
      if (candidates.length === 0) endpointIndex.delete(key(head));
      if (nextIdx === -1) break;
      used[nextIdx] = true;
      const seg = segs[nextIdx];
      // Continue out the other endpoint.
      const other = key(seg[0]) === key(head) ? seg[1] : seg[0];
      ring.push(other);
      head = other;
      if (key(head) === key(ring[0])) break; // closed loop
    }

    if (ring.length >= 4 && key(ring[ring.length - 1]) === key(ring[0])) {
      rings.push(ring);
    }
  }

  return rings;
}

/**
 * Signed area of a ring of [row, col] points, using the shoelace formula.
 * Positive means counter-clockwise in (row, col) space — but we just
 * need the magnitude here, so we take the absolute value.
 */
function ringArea(ring: GridPoint[]): number {
  let s = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    s += ring[i][1] * ring[i + 1][0] - ring[i + 1][1] * ring[i][0];
  }
  return Math.abs(s) / 2;
}

/**
 * Extract the single largest contour ring from `field` at the given
 * threshold. Returns null if no closed contour exists.
 */
export function largestContourRing(
  field: number[][],
  threshold: number,
): GridPoint[] | null {
  const segs = marchingSquaresSegments(field, threshold);
  if (segs.length === 0) return null;
  const rings = chainSegmentsIntoRings(segs);
  if (rings.length === 0) return null;
  let best = rings[0];
  let bestArea = ringArea(best);
  for (let i = 1; i < rings.length; i++) {
    const a = ringArea(rings[i]);
    if (a > bestArea) {
      best = rings[i];
      bestArea = a;
    }
  }
  return best;
}
