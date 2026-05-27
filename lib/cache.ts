/**
 * Tiny in-memory TTL cache with rough LRU eviction.
 *
 * Lives in the Next.js server module — persists across requests within
 * the same server process, gets wiped on cold start. Good enough to
 * keep us inside Travel Time API's free-tier quota when the user
 * toggles between the same destinations or slides back to commute
 * values they've used before.
 *
 * For production scale, swap for Redis or persist in Convex.
 */

type Entry<T> = { value: T; expires: number };

export class TtlCache<T> {
  private readonly map = new Map<string, Entry<T>>();

  constructor(
    private readonly ttlMs: number,
    private readonly maxEntries: number = 200,
  ) {}

  get(key: string): T | undefined {
    const entry = this.map.get(key);
    if (!entry) return undefined;
    if (entry.expires < Date.now()) {
      this.map.delete(key);
      return undefined;
    }
    // Refresh insertion order for LRU semantics — re-set the entry.
    this.map.delete(key);
    this.map.set(key, entry);
    return entry.value;
  }

  set(key: string, value: T): void {
    if (this.map.has(key)) this.map.delete(key);
    if (this.map.size >= this.maxEntries) {
      // Drop the oldest entry. Map iteration is insertion-ordered.
      const oldestKey = this.map.keys().next().value;
      if (oldestKey != null) this.map.delete(oldestKey);
    }
    this.map.set(key, { value, expires: Date.now() + this.ttlMs });
  }
}

/** Round lat/lng so near-identical destinations share a cache slot. */
export function coordKey(lat: number, lng: number): string {
  return `${lat.toFixed(5)},${lng.toFixed(5)}`;
}
