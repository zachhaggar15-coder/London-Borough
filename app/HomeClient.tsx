"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import ControlPanel from "@/components/ControlPanel";
import NeighbourhoodList from "@/components/NeighbourhoodList";
import ResultsSummaryPanel from "@/components/ResultsSummaryPanel";
import ShortlistPanel from "@/components/ShortlistPanel";
import DetailDrawer from "@/components/DetailDrawer";
import dynamic from "next/dynamic";

/**
 * MapLibre GL is by far the heaviest thing on this page. Loading it eagerly
 * made it the LCP element on mobile and pushed the whole bundle past the
 * point where the page felt responsive. Deferring it keeps the controls and
 * the server-rendered hero as the first paint, and the map arrives a beat
 * later into a reserved box, so nothing shifts.
 */
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full w-full items-center justify-center bg-slate-900"
      role="status"
      aria-label="Loading map"
    >
      <span className="text-sm text-slate-500">Loading map…</span>
    </div>
  ),
});
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import type { CommuteEstimate } from "@/lib/types";

export default function HomeClient() {
  const destination = useStore((s) => s.query.destination);
  const maxCommuteMinutes = useStore((s) => s.query.maxCommuteMinutes);
  const commute = useStore((s) => s.commute);
  const setCommute = useStore((s) => s.setCommute);
  const setCommuteSources = useStore((s) => s.setCommuteSources);
  const setLoadingCommute = useStore((s) => s.setLoadingCommute);
  const setIsochrone = useStore((s) => s.setIsochrone);
  const setLoadingIsochrone = useStore((s) => s.setLoadingIsochrone);

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.finderStarted);
  }, []);

  useEffect(() => {
    if (!destination) {
      setCommute({});
      setCommuteSources({});
      return;
    }
    let cancelled = false;
    setLoadingCommute(true);
    fetch("/api/commute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinationLatLng: destination.centroid }),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Commute API ${r.status}`);
        return r.json();
      })
      .then((data: {
        commute: Record<string, number>;
        estimates?: Record<string, CommuteEstimate>;
      }) => {
        if (cancelled) return;
        setCommute(data.commute ?? {});
        setCommuteSources(
          Object.fromEntries(
            Object.entries(data.estimates ?? {}).map(([id, estimate]) => [
              id,
              estimate.source,
            ]),
          ),
        );
        trackEvent(ANALYTICS_EVENTS.finderCompleted, {
          destination: destination.id,
          result_count: Object.keys(data.commute ?? {}).length,
        });
      })
      .catch((err) => {
        console.error("Commute fetch failed", err);
        if (!cancelled) {
          setCommute({});
          setCommuteSources({});
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingCommute(false);
      });
    return () => {
      cancelled = true;
    };
  }, [destination, setCommute, setCommuteSources, setLoadingCommute]);

  useEffect(() => {
    if (!destination) {
      setIsochrone(null);
      return;
    }
    let cancelled = false;
    setLoadingIsochrone(true);
    const reachable = NEIGHBOURHOODS.filter(
      (n) => (commute[n.id] ?? Infinity) <= maxCommuteMinutes,
    ).map((n) => ({
      centroid: n.centroid,
      commuteMinutes: commute[n.id],
    }));

    fetch("/api/isochrone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destinationLatLng: destination.centroid,
        maxMinutes: maxCommuteMinutes,
        fallbackReachable: reachable,
      }),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Isochrone API ${r.status}`);
        return r.json();
      })
      .then((data: { feature?: GeoJSON.Feature<GeoJSON.Polygon> }) => {
        if (cancelled) return;
        setIsochrone(data.feature ?? null);
      })
      .catch((err) => {
        console.error("Isochrone fetch failed", err);
        if (!cancelled) setIsochrone(null);
      })
      .finally(() => {
        if (!cancelled) setLoadingIsochrone(false);
      });
    return () => {
      cancelled = true;
    };
  }, [destination, maxCommuteMinutes, commute, setIsochrone, setLoadingIsochrone]);

  return (
    <main className="flex h-full w-full flex-col md:flex-row">
      <aside className="order-2 flex h-[45%] w-full min-w-0 flex-col border-t border-slate-800 bg-slate-950 md:order-1 md:h-full md:w-[380px] md:min-w-[380px] md:border-r md:border-t-0">
        <header className="border-b border-slate-800 px-5 py-4">
          <p className="text-lg font-semibold tracking-tight">
            Find where to live in London
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Compare neighbourhoods by commute, rent and everyday life.
          </p>
          <nav
            aria-label="Explore Where in London"
            className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs"
          >
            <Link
              href="/neighbourhoods"
              className="text-slate-300 transition-colors hover:text-white"
            >
              Area guides
            </Link>
            <Link
              href="/compare"
              className="text-slate-300 transition-colors hover:text-white"
            >
              Compare
            </Link>
            <Link
              href="/london-rent-index"
              className="text-slate-300 transition-colors hover:text-white"
            >
              Rent index
            </Link>
            <Link
              href="/methodology"
              className="text-slate-300 transition-colors hover:text-white"
            >
              How the data works
            </Link>
          </nav>
        </header>
        <div className="flex-1 overflow-y-auto">
          <ControlPanel />
          <ResultsSummaryPanel />
          <NeighbourhoodList />
          <ShortlistPanel />
        </div>
      </aside>

      <section className="relative order-1 min-h-[55%] flex-1 md:order-2 md:min-h-0">
        <Map />
        <DetailDrawer />
      </section>
    </main>
  );
}
