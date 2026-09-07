"use client";

import dynamic from "next/dynamic";
import type { ContentCityId } from "@/lib/cities";

/**
 * The interactive tool, loaded per city.
 *
 * Each city's dataset — fifty-odd area profiles, a five-hundred-cell
 * commute matrix, rent and council tax tables — is a few hundred
 * kilobytes once it reaches the browser. Importing all four statically
 * would ship every city's data to every reader, so each is a separate
 * chunk and only the one being viewed is fetched.
 *
 * `ssr: false` because the map needs a real canvas; the placeholder
 * below is what the server renders, and it holds the same height so the
 * page does not jump when the map arrives.
 */
const LOADING = (
  <div className="flex h-full w-full items-center justify-center bg-slate-950 text-sm text-slate-500">
    Loading the map…
  </div>
);

const TOOLS: Record<ContentCityId, React.ComponentType> = {
  manchester: dynamic(() => import("@/components/city-tools/ManchesterTool"), {
    ssr: false,
    loading: () => LOADING,
  }),
  bristol: dynamic(() => import("@/components/city-tools/BristolTool"), {
    ssr: false,
    loading: () => LOADING,
  }),
  leeds: dynamic(() => import("@/components/city-tools/LeedsTool"), {
    ssr: false,
    loading: () => LOADING,
  }),
  edinburgh: dynamic(() => import("@/components/city-tools/EdinburghTool"), {
    ssr: false,
    loading: () => LOADING,
  }),
  geneva: dynamic(() => import("@/components/city-tools/GenevaTool"), {
    ssr: false,
    loading: () => LOADING,
  }),
  paris: dynamic(() => import("@/components/city-tools/ParisTool"), {
    ssr: false,
    loading: () => LOADING,
  }),
  barcelona: dynamic(() => import("@/components/city-tools/BarcelonaTool"), {
    ssr: false,
    loading: () => LOADING,
  }),
};

export default function CityToolClient({ city }: { city: ContentCityId }) {
  const Tool = TOOLS[city];
  return <Tool />;
}
