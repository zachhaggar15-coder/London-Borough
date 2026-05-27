type HeadersLike = {
  get(name: string): string | null;
};

type Bucket = {
  count: number;
  resetAt: number;
};

export type RateLimitOptions = {
  scope: string;
  limit: number;
  windowMs: number;
  maxEntries?: number;
};

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number };

const DEFAULT_MAX_ENTRIES = 2_000;
const buckets = new Map<string, Bucket>();

function cleanClientKey(value: string | null | undefined): string {
  const cleaned = (value ?? "unknown")
    .trim()
    .replace(/[^a-zA-Z0-9:._-]/g, "")
    .slice(0, 80);
  return cleaned || "unknown";
}

function clientKey(headers: HeadersLike): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0];
  const realIp = headers.get("x-real-ip");
  return cleanClientKey(forwarded || realIp);
}

function pruneExpired(now: number, maxEntries: number): void {
  if (buckets.size <= maxEntries) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
    if (buckets.size <= maxEntries) return;
  }
  while (buckets.size > maxEntries) {
    const oldestKey = buckets.keys().next().value;
    if (oldestKey == null) return;
    buckets.delete(oldestKey);
  }
}

export function checkRateLimit(
  headers: HeadersLike,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const maxEntries = options.maxEntries ?? DEFAULT_MAX_ENTRIES;
  pruneExpired(now, maxEntries);

  const key = `${options.scope}:${clientKey(headers)}`;
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return { ok: true };
  }

  if (existing.count >= options.limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000),
      ),
    };
  }

  existing.count += 1;
  return { ok: true };
}
