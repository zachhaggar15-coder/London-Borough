/**
 * Zustand store — the single piece of client state.
 *
 * Pattern: keep the *query* in the store and *derive* the scored list
 * via a selector. The map, list, and detail drawer all read from
 * narrow slices, which prevents unnecessary re-renders.
 *
 * The store also holds the commute-time lookup we fetched from the
 * /api/commute route — refreshed whenever the destination changes.
 */

"use client";

import { create } from "zustand";
import type {
  CommuteEstimateSource,
  LifestyleScores,
  UserQuery,
  Destination,
  PersonalityKey,
  RentBasis,
} from "@/lib/types";
import { DESTINATIONS } from "@/lib/data/destinations";

type CommuteMap = Record<string, number>;
type CommuteSourceMap = Record<string, CommuteEstimateSource>;

type State = {
  query: UserQuery;
  commute: CommuteMap;
  commuteSources: CommuteSourceMap;
  isLoadingCommute: boolean;
  /** The reachable-area polygon. Null until fetched. */
  isochrone: GeoJSON.Feature<GeoJSON.Polygon> | null;
  isLoadingIsochrone: boolean;
  selectedNeighbourhoodId: string | null;
  shortlistedNeighbourhoodIds: string[];
  /** How many of the top-ranked neighbourhoods to show on map + list. */
  topN: number;
};

type Actions = {
  setDestination: (destination: Destination | null) => void;
  setMaxCommute: (minutes: number) => void;
  setSalary: (salary: number | null) => void;
  setRentBudget: (budget: number | null) => void;
  setRentBasis: (basis: RentBasis) => void;
  setRentBudgetShareOfTakeHome: (share: number) => void;
  setPersonality: (key: PersonalityKey | null) => void;
  setLifestyleWeight: (key: keyof LifestyleScores, value: number) => void;
  clearLifestyleWeights: () => void;
  setCommute: (commute: CommuteMap) => void;
  setCommuteSources: (sources: CommuteSourceMap) => void;
  setLoadingCommute: (loading: boolean) => void;
  setIsochrone: (feature: GeoJSON.Feature<GeoJSON.Polygon> | null) => void;
  setLoadingIsochrone: (loading: boolean) => void;
  selectNeighbourhood: (id: string | null) => void;
  toggleShortlist: (id: string) => void;
  removeFromShortlist: (id: string) => void;
  clearShortlist: () => void;
  setTopN: (n: number) => void;
};

const SHORTLIST_STORAGE_KEY = "where-in-london-shortlist";

export const useStore = create<State & Actions>((set) => ({
  query: {
    destination: DESTINATIONS[0],          // sensible default: Marylebone
    maxCommuteMinutes: 45,
    monthlyRentBudgetGbp: null,
    annualSalaryGbp: 50_000,
    rentBasis: "houseShareLowerEnd",
    rentBudgetShareOfTakeHome: 0.35,
    personality: "balanced",               // sensible default — no strong tilt
    lifestyleWeights: {},
  },
  commute: {},
  commuteSources: {},
  isLoadingCommute: false,
  isochrone: null,
  isLoadingIsochrone: false,
  selectedNeighbourhoodId: null,
  shortlistedNeighbourhoodIds: readShortlistFromStorage(),
  topN: 10,

  setDestination: (destination) =>
    set((s) => ({ query: { ...s.query, destination } })),
  setMaxCommute: (minutes) =>
    set((s) => ({ query: { ...s.query, maxCommuteMinutes: minutes } })),
  setSalary: (salary) =>
    set((s) => ({ query: { ...s.query, annualSalaryGbp: salary } })),
  setRentBudget: (budget) =>
    set((s) => ({ query: { ...s.query, monthlyRentBudgetGbp: budget } })),
  setRentBasis: (basis) =>
    set((s) => ({ query: { ...s.query, rentBasis: basis } })),
  setRentBudgetShareOfTakeHome: (share) =>
    set((s) => ({
      query: {
        ...s.query,
        rentBudgetShareOfTakeHome: Math.max(0, Math.min(1, share)),
      },
    })),
  setPersonality: (key) =>
    set((s) => ({ query: { ...s.query, personality: key } })),
  setLifestyleWeight: (key, value) =>
    set((s) => ({
      query: {
        ...s.query,
        personality: value > 0 ? null : s.query.personality,
        lifestyleWeights: { ...s.query.lifestyleWeights, [key]: value },
      },
    })),
  clearLifestyleWeights: () =>
    set((s) => ({ query: { ...s.query, lifestyleWeights: {} } })),
  setCommute: (commute) => set({ commute }),
  setCommuteSources: (sources) => set({ commuteSources: sources }),
  setLoadingCommute: (loading) => set({ isLoadingCommute: loading }),
  setIsochrone: (feature) => set({ isochrone: feature }),
  setLoadingIsochrone: (loading) => set({ isLoadingIsochrone: loading }),
  selectNeighbourhood: (id) => set({ selectedNeighbourhoodId: id }),
  toggleShortlist: (id) =>
    set((s) => {
      let next: string[];
      if (s.shortlistedNeighbourhoodIds.includes(id)) {
        next = s.shortlistedNeighbourhoodIds.filter((existing) => existing !== id);
      } else {
        next = [id, ...s.shortlistedNeighbourhoodIds].slice(0, 4);
      }
      writeShortlistToStorage(next);
      return { shortlistedNeighbourhoodIds: next };
    }),
  removeFromShortlist: (id) =>
    set((s) => {
      const next = s.shortlistedNeighbourhoodIds.filter(
        (existing) => existing !== id,
      );
      writeShortlistToStorage(next);
      return { shortlistedNeighbourhoodIds: next };
    }),
  clearShortlist: () => {
    writeShortlistToStorage([]);
    set({ shortlistedNeighbourhoodIds: [] });
  },
  setTopN: (n) => set({ topN: Math.max(1, Math.min(50, n)) }),
}));

function readShortlistFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SHORTLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string").slice(0, 4)
      : [];
  } catch {
    return [];
  }
}

function writeShortlistToStorage(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    SHORTLIST_STORAGE_KEY,
    JSON.stringify(ids.slice(0, 4)),
  );
}
