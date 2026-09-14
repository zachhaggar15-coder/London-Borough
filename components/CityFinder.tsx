"use client";

import { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useStore } from "@/lib/store";
import ControlPanel from "@/components/ControlPanel";
import NeighbourhoodList from "@/components/NeighbourhoodList";
import ResultsSummaryPanel from "@/components/ResultsSummaryPanel";
import ShortlistPanel from "@/components/ShortlistPanel";
import DetailDrawer from "@/components/DetailDrawer";
import { CityDataProvider, type CityData } from "@/components/CityDataProvider";
import {
  ANALYTICS_EVENTS,
  hasFinderStarted,
  trackEventOnce,
} from "@/lib/analytics";

/**
 * The interactive tool, for whichever city it is handed.
 *
 * MapLibre GL is by far the heaviest thing on the page. Loading it
 * eagerly made it the LCP element on mobile and pushed the bundle past
 * the point where the page felt responsive. Deferring it keeps the
 * controls as the first paint, and the map arrives a beat later into a
 * reserved box, so nothing shifts.
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

export default function CityFinder({ cityData }: { cityData: CityData }) {
  return (
    <CityDataProvider value={cityData}>
      <FinderShell cityData={cityData} />
    </CityDataProvider>
  );
}

function FinderShell({ cityData }: { cityData: CityData }) {
  const { city, destinations, labels, links, fetchCommute, fetchIsochrone } =
    cityData;

  const initCity = useStore((s) => s.initCity);
  const destination = useStore((s) => s.query.destination);
  const maxCommuteMinutes = useStore((s) => s.query.maxCommuteMinutes);
  const commute = useStore((s) => s.commute);
  const setCommute = useStore((s) => s.setCommute);
  const setCommuteSources = useStore((s) => s.setCommuteSources);
  const setLoadingCommute = useStore((s) => s.setLoadingCommute);
  const setIsochrone = useStore((s) => s.setIsochrone);
  const setLoadingIsochrone = useStore((s) => s.setLoadingIsochrone);
  const setShortlist = useStore((s) => s.setShortlist);
  const isPanelCollapsed = useStore((s) => s.isPanelCollapsed);
  const togglePanelCollapsed = useStore((s) => s.togglePanelCollapsed);

  // Point the shared store at this city before anything reads from it.
  // Runs during render rather than in an effect so the first paint never
  // shows the other city's destination.
  if (useStore.getState().cityId !== city.id) {
    initCity(city.id, destinations[0] ?? null);
  }

  useEffect(() => {
    if (city.id !== "london") return;
    const params = new URLSearchParams(window.location.search);
    const compared = (params.get("compare") ?? "")
      .split(",")
      .filter((id) => Boolean(cityData.neighbourhoodsById[id]))
      .slice(0, 4);
    if (compared.length >= 1) setShortlist(compared);
  }, [city.id, cityData.neighbourhoodsById, setShortlist]);

  useEffect(() => {
    if (!destination) {
      setCommute({});
      setCommuteSources({});
      return;
    }
    let cancelled = false;
    setLoadingCommute(true);
    fetchCommute(destination)
      .then(({ commute: minutes, sources }) => {
        if (cancelled) return;
        setCommute(minutes);
        setCommuteSources(sources);
        if (hasFinderStarted(city.id)) {
          trackEventOnce(
            ANALYTICS_EVENTS.finderCompleted,
            {
              surface: city.id,
              destination_type: destination.id.startsWith("custom-")
                ? "custom"
                : "preset",
              result_count: Object.keys(minutes).length,
            },
            `finder-completed:${city.id}:${destination.id}:${useStore.getState().query.maxCommuteMinutes}`,
          );
        }
      })
      .catch((err) => {
        console.error("Commute lookup failed", err);
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
  }, [
    city.id,
    destination,
    fetchCommute,
    setCommute,
    setCommuteSources,
    setLoadingCommute,
  ]);

  useEffect(() => {
    if (!destination) {
      setIsochrone(null);
      return;
    }
    let cancelled = false;
    setLoadingIsochrone(true);
    fetchIsochrone(destination, maxCommuteMinutes, commute)
      .then((feature) => {
        if (!cancelled) setIsochrone(feature);
      })
      .catch((err) => {
        console.error("Isochrone lookup failed", err);
        if (!cancelled) setIsochrone(null);
      })
      .finally(() => {
        if (!cancelled) setLoadingIsochrone(false);
      });
    return () => {
      cancelled = true;
    };
  }, [
    destination,
    maxCommuteMinutes,
    commute,
    fetchIsochrone,
    setIsochrone,
    setLoadingIsochrone,
  ]);

  return (
    <main className="flex h-full w-full flex-col md:flex-row">
      {/*
        The sidebar collapses so the map can take the whole frame. Done by
        conditionally rendering rather than by animating a width: the map
        has to resize either way, and an unmounted panel is one fewer
        subscriber re-scoring 57 areas on every slider drag.
      */}
      {!isPanelCollapsed && (
        <aside className="order-2 flex h-[45%] w-full min-w-0 flex-col border-t border-slate-800 bg-slate-950 md:order-1 md:h-full md:w-[380px] md:min-w-[380px] md:border-r md:border-t-0">
          <header className="border-b border-slate-800 px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-lg font-semibold tracking-tight">
                  {labels.panelTitle}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {labels.panelSubtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={togglePanelCollapsed}
                aria-expanded="true"
                className="shrink-0 rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              >
                Hide list
              </button>
            </div>
            <nav
              aria-label={`Explore ${city.brand}`}
              className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs"
            >
              {[
                { href: links.areaGuides, label: "Area guides" },
                { href: links.compare, label: "Compare" },
                { href: links.rentIndex, label: "Rent index" },
              ].map(
                (link) =>
                  link.href && (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-slate-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ),
              )}
              <Link
                href={links.methodology}
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
      )}

      <section className="relative order-1 min-h-[55%] flex-1 md:order-2 md:min-h-0">
        <Map />
        <DetailDrawer />
        {isPanelCollapsed && (
          <button
            type="button"
            onClick={togglePanelCollapsed}
            aria-expanded="false"
            className="absolute left-2 top-2 z-30 rounded-md border border-slate-700 bg-slate-950/90 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-lg backdrop-blur transition-colors hover:border-slate-500 md:left-4 md:top-4"
          >
            Show list
          </button>
        )}
      </section>
    </main>
  );
}
