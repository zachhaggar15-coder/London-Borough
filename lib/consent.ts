"use client";

export const CONSENT_STORAGE_KEY = "wil-consent-v2";
export const LEGACY_CONSENT_STORAGE_KEY = "wil-cookie-consent";
export const OPEN_COOKIE_SETTINGS_EVENT = "wil:open-cookie-settings";

export type ConsentPreferences = {
  analytics: boolean;
  advertising: boolean;
};

const listeners = new Set<() => void>();

export function subscribeToConsent(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (
      event.key === CONSENT_STORAGE_KEY ||
      event.key === LEGACY_CONSENT_STORAGE_KEY
    ) {
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getConsentSnapshot(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function getConsentServerSnapshot(): string | null {
  return null;
}

export function parseConsentSnapshot(raw: string | null): ConsentPreferences | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<ConsentPreferences>;
    if (
      typeof value.analytics !== "boolean" ||
      typeof value.advertising !== "boolean"
    ) {
      return null;
    }
    return { analytics: value.analytics, advertising: value.advertising };
  } catch {
    return null;
  }
}

export function readConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  return parseConsentSnapshot(getConsentSnapshot());
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

export function storeConsent(preferences: ConsentPreferences): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
    window.localStorage.removeItem(LEGACY_CONSENT_STORAGE_KEY);
  } catch {
    // Private browsing can reject local storage. The banner will reappear.
  }
  listeners.forEach((listener) => listener());
}

export function legacyAdvertisingConsent(): boolean | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(LEGACY_CONSENT_STORAGE_KEY);
    if (value === "accepted") return true;
    if (value === "declined") return false;
  } catch {
    // Treat blocked storage as no saved choice.
  }
  return null;
}
