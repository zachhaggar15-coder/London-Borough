/**
 * The single discovery page. Three regions:
 *   - Left sidebar: ControlPanel (inputs) + NeighbourhoodList (ranked)
 *   - Right: the MapLibre map
 *   - Bottom (conditional): DetailDrawer when a neighbourhood is selected
 *
 * State lives in the Zustand store (lib/store.ts). When the destination
 * or commute threshold changes, we re-fetch commute times from /api/commute.
 */

"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import ControlPanel from "@/components/ControlPanel";
import NeighbourhoodList from "@/components/NeighbourhoodList";
import ShortlistPanel from "@/components/ShortlistPanel";
import DetailDrawer from "@/components/DetailDrawer";
import Map from "@/components/Map";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";

export default function Page() {
  const destination = useStore((s) => s.query.destination);
  const maxCommuteMinutes = useStore((s) => s.query.maxCommuteMinutes);
  const commute = useStore((s) => s.commute);
  const setCommute = useStore((s) => s.setCommute);
  const setLoadingCommute = useStore((s) => s.setLoadingCommute);
  const setIsochrone = useStore((s) => s.setIsochrone);
  const setLoadingIsochrone = useStore((s) => s.setLoadingIsochrone);

  // 1. Fetch commute times whenever the destination changes.
  useEffect(() => {
    if (!destination) {
      setCommute({});
      return;
    }
    let cancelled = false;
    setLoadingCommute(true);
    // Always send lat/lng — works for both pre-seeded and custom (search)
    // destinations. The static provider snaps known coords back to the
    // pre-computed matrix; unknown coords get the distance heuristic.
    fetch("/api/commute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinationLatLng: destination.centroid }),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Commute API ${r.status}`);
        return r.json();
      })
      .then((data: { commute: Record<string, number> }) => {
        if (cancelled) return;
        setCommute(data.commute ?? {});
      })
      .catch((err) => {
        console.error("Commute fetch failed", err);
        if (!cancelled) setCommute({});
      })
      .finally(() => {
        if (!cancelled) setLoadingCommute(false);
      });
    return () => {
      cancelled = true;
    };
  }, [destination, setCommute, setLoadingCommute]);

  // 2. Fetch isochrone whenever destination, commute time, or commute
  //    matrix changes. The static provider needs the reachable centroids
  //    to shape its hull; ORS ignores them.
  useEffect(() => {
    if (!destination) {
      setIsochrone(null);
      return;
    }
    let cancelled = false;
    setLoadingIsochrone(true);
    // Pass each reachable neighbourhood with its commute time so the
    // static provider can stretch the polygon in directions of fast
    // transit (low commute / km ratio) and dent it inwards where there
    // is none.
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
      {/* Left rail */}
      <aside className="order-2 flex h-[45%] w-full min-w-0 flex-col border-t border-slate-800 bg-slate-950 md:order-1 md:h-full md:w-[380px] md:min-w-[380px] md:border-r md:border-t-0">
        <header className="border-b border-slate-800 px-5 py-4">
          <div className="text-lg font-semibold tracking-tight">
            Where in London
          </div>
          <div className="text-xs text-slate-400">
            Neighbourhood discovery for people moving to London
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          <ControlPanel />
          <NeighbourhoodList />
          <ShortlistPanel />
        </div>
      </aside>

      {/* Map */}
      <section className="relative order-1 min-h-[55%] flex-1 md:order-2 md:min-h-0">
        <Map />
        <DetailDrawer />
      </section>
    </main>
  );
}
