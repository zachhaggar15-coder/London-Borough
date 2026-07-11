import { createHash } from "node:crypto";

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
  globalLimit?: number;
  windowMs: number;
  maxEntries?: number;
};

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number };

const DEFAULT_MAX_ENTRIES = 2_000;
const buckets = new Map<string, Bucket>();

function clientKey(headers: HeadersLike): string {
  const forwarded = forwardedClientHint(headers.get("x-forwarded-for"));
  const realIp = headers.get("x-real-ip")?.trim();
  const vercelId = headers.get("x-vercel-id")?.trim();
  const userAgent = headers.get("user-agent")?.slice(0, 160).trim();
  const keyMaterial = [forwarded, realIp, vercelId, userAgent]
    .filter(Boolean)
    .join("|");

  return createHash("sha256")
    .update(keyMaterial || "anonymous")
    .digest("hex")
    .slice(0, 32);
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

  const keys = [
    ...(options.globalLimit
      ? [{ key: `${options.scope}:global`, limit: options.globalLimit }]
      : []),
    { key: `${options.scope}:client:${clientKey(headers)}`, limit: options.limit },
  ];

  for (const { key, limit } of keys) {
    const retryAfterSeconds = retryAfterSecondsFor(key, limit, now);
    if (retryAfterSeconds) {
      return { ok: false, retryAfterSeconds };
    }
  }

  for (const { key } of keys) {
    incrementBucket(key, now, options.windowMs);
  }

  return { ok: true };
}

function retryAfterSecondsFor(
  key: string,
  limit: number,
  now: number,
): number | undefined {
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now || existing.count < limit) {
    return undefined;
  }

  return Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
}

function incrementBucket(key: string, now: number, windowMs: number): void {
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  existing.count += 1;
}

function forwardedClientHint(value: string | null): string | undefined {
  const parts = value
    ?.split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (!parts?.length) return undefined;
  return parts[parts.length - 1];
}
