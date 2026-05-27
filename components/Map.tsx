/**
 * The MapLibre canvas — satellite basemap, bounded to Greater London.
 *
 * Basemap selection:
 *   - If NEXT_PUBLIC_MAPTILER_KEY is set → MapTiler "Hybrid" (satellite + labels)
 *   - Otherwise → inline style with ESRI World Imagery (satellite, no key
 *     needed) plus ESRI Boundaries & Places for place labels.
 *
 * The map is hard-bounded to Greater London (maxBounds) so the user
 * physically can't pan into the open ocean.
 *
 * Renders, in stacking order from bottom to top:
 *   1. Satellite tiles (basemap)
 *   2. Labels overlay (place names)
 *   3. Isochrone polygon (the reachable area)
 *   4. Neighbourhood circles + labels
 *   5. Destination marker (Marker — DOM element on top of canvas)
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Map, {
  Layer,
  Marker,
  Source,
  type MapLayerMouseEvent,
  type MapRef,
} from "react-map-gl/maplibre";
import type { FilterSpecification, StyleSpecification } from "maplibre-gl";
import { useStore } from "@/lib/store";
import { NEIGHBOURHOODS } from "@/lib/data/neighbourhoods";
import {
  BOROUGH_BOUNDARY_ATTRIBUTION,
  BOROUGH_BOUNDARY_SOURCE_URL,
  BOROUGH_FILTER_NAMES,
  BOROUGH_NAME_FIELD,
} from "@/lib/data/borough-boundaries";
import { boroughSummaries, type BoroughSummary } from "@/lib/boroughs";
import { polygonForNeighbourhood } from "@/lib/data/polygons";
import { matchScoreHex, scoreAll } from "@/lib/scoring";
import BoroughSearch from "@/components/BoroughSearch";

/** Greater London bounding box (slightly generous). */
const LONDON_BOUNDS: [[number, number], [number, number]] = [
  [-0.6, 51.25], // SW
  [0.4, 51.75],  // NE
];

/**
 * Default inline style — satellite imagery with no API key required.
 * Uses ESRI's free public-use raster services.
 */
const FREE_SATELLITE_STYLE: StyleSpecification = {
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution:
        "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN",
    },
    "satellite-labels": {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: "Labels © Esri",
    },
  },
  layers: [
    { id: "satellite", type: "raster", source: "satellite" },
    {
      id: "satellite-labels",
      type: "raster",
      source: "satellite-labels",
      paint: { "raster-opacity": 0.85 },
    },
  ],
};

function getMapStyle(): string | StyleSpecification {
  const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;
  if (key) {
    // MapTiler "Hybrid" = satellite + labels, one request.
    return `https://api.maptiler.com/maps/hybrid/style.json?key=${key}`;
  }
  return FREE_SATELLITE_STYLE;
}

export default function MapView() {
  const ref = useRef<MapRef | null>(null);
  const suppressNextSelectedFly = useRef(false);
  const [selectedBoroughId, setSelectedBoroughId] = useState<string | null>(
    null,
  );

  const query = useStore((s) => s.query);
  const commute = useStore((s) => s.commute);
  const selected = useStore((s) => s.selectedNeighbourhoodId);
  const selectNeighbourhood = useStore((s) => s.selectNeighbourhood);
  const isochrone = useStore((s) => s.isochrone);
  const topN = useStore((s) => s.topN);

  const scored = useMemo(
    () => scoreAll(NEIGHBOURHOODS, commute, query),
    [commute, query],
  );

  const boroughs = useMemo(() => boroughSummaries(scored), [scored]);
  const selectedBorough = useMemo(
    () => boroughs.find((b) => b.id === selectedBoroughId) ?? null,
    [boroughs, selectedBoroughId],
  );
  const selectedBoroughFilter = useMemo(
    () =>
      [
        "==",
        ["get", BOROUGH_NAME_FIELD],
        selectedBorough?.name ?? "__none__",
      ] as unknown as FilterSpecification,
    [selectedBorough],
  );

  // Only render the top-N reachable neighbourhoods on the map. The
  // others are still scored — they appear under "show more" in the
  // sidebar — but they don't clutter the canvas.
  // Plus: keep the currently-selected one visible even if it's outside
  // the top N (so clicking a card in "show all" still highlights on map).
  const visibleScored = useMemo(() => {
    const top = scored.filter((s) => !s.isExcluded).slice(0, topN);
    if (selected && !top.some((s) => s.neighbourhood.id === selected)) {
      const sel = scored.find((s) => s.neighbourhood.id === selected);
      if (sel) top.push(sel);
    }
    return top;
  }, [scored, topN, selected]);

  // Points layer — centroids, used for the score chip and click target.
  const geojson = useMemo(() => {
    return {
      type: "FeatureCollection" as const,
      features: visibleScored.map((s) => ({
        type: "Feature" as const,
        properties: {
          id: s.neighbourhood.id,
          name: s.neighbourhood.name,
          color: matchScoreHex(s.matchScore, s.isExcluded),
          opacity: s.isExcluded ? 0.35 : 0.95,
          selected: s.neighbourhood.id === selected,
          // Score pins stay compact so the area footprint, not the marker,
          // carries the neighbourhood shape.
          radius:
            s.neighbourhood.id === selected
              ? 16
              : s.isExcluded
              ? 5
              : 7 + s.matchScore * 4,
        },
        geometry: {
          type: "Point" as const,
          coordinates: [s.neighbourhood.centroid.lng, s.neighbourhood.centroid.lat],
        },
      })),
    };
  }, [visibleScored]);

  // Polygons layer: launch neighbourhood footprints under the centroids.
  // Explicit polygons on the neighbourhood record win; otherwise the
  // footprint is generated from the curated centre, transport zone, and
  // map scale in lib/data/polygons.ts.
  const polygonGeojson = useMemo(() => {
    const features = visibleScored.flatMap((s) => {
      const poly =
        s.neighbourhood.polygon ?? polygonForNeighbourhood(s.neighbourhood.id);
      if (!poly) return [];
      return [
        {
          type: "Feature" as const,
          properties: {
            id: s.neighbourhood.id,
            name: s.neighbourhood.name,
            color: matchScoreHex(s.matchScore, s.isExcluded),
            selected: s.neighbourhood.id === selected,
            opacity:
              s.neighbourhood.id === selected
                ? 0.44
                : s.isExcluded
                ? 0.08
                : 0.28,
          },
          geometry: poly,
        },
      ];
    });
    return { type: "FeatureCollection" as const, features };
  }, [visibleScored]);

  useEffect(() => {
    if (!selected || !ref.current) return;
    if (suppressNextSelectedFly.current) {
      suppressNextSelectedFly.current = false;
      return;
    }
    const target = NEIGHBOURHOODS.find((n) => n.id === selected);
    if (!target) return;
    ref.current.flyTo({
      center: [target.centroid.lng, target.centroid.lat],
      zoom: 13,
      duration: 800,
    });
  }, [selected]);

  function selectBorough(borough: BoroughSummary) {
    setSelectedBoroughId(borough.id);
    suppressNextSelectedFly.current = true;
    selectNeighbourhood(borough.bestMatch.neighbourhood.id);
    ref.current?.flyTo({
      center: [borough.centroid.lng, borough.centroid.lat],
      zoom: borough.scored.length > 2 ? 11.1 : 12,
      duration: 900,
    });
  }

  function onClick(e: MapLayerMouseEvent) {
    const feature = e.features?.[0];
    const id = feature?.properties?.id;
    if (typeof id === "string") {
      setSelectedBoroughId(null);
      selectNeighbourhood(id);
    } else {
      setSelectedBoroughId(null);
      selectNeighbourhood(null);
    }
  }

  return (
    <>
      {/* Floating legend — explains the shaded area. */}
      <div className="pointer-events-none absolute left-4 top-4 z-20 max-w-[260px] rounded-md bg-slate-950/85 px-3 py-2 text-[11px] leading-tight text-slate-200 shadow-lg ring-1 ring-slate-700 backdrop-blur">
        <div className="font-semibold text-sky-300">
          Reachable in ≤ {query.maxCommuteMinutes} min
        </div>
        <div className="mt-0.5 truncate text-slate-400">
          From {query.destination?.label ?? "—"} · public transport
        </div>
      </div>

      <BoroughSearch
        boroughs={boroughs}
        onSelect={selectBorough}
      />

      <Map
        ref={ref}
        mapStyle={getMapStyle()}
        initialViewState={{ longitude: -0.1, latitude: 51.51, zoom: 10.3 }}
        maxBounds={LONDON_BOUNDS}
        minZoom={9}
        maxZoom={16}
        interactiveLayerIds={[
          "neighbourhood-circles",
          "neighbourhood-polygon-fill",
        ]}
        onClick={onClick}
        cursor="default"
        style={{ width: "100%", height: "100%" }}
      >
        <Source
          id="borough-boundaries"
          type="geojson"
          data={BOROUGH_BOUNDARY_SOURCE_URL}
          attribution={BOROUGH_BOUNDARY_ATTRIBUTION}
        >
          <Layer
            id="selected-borough-fill"
            type="fill"
            filter={selectedBoroughFilter}
            paint={{
              "fill-color": "#fbbf24",
              "fill-opacity": selectedBorough ? 0.04 : 0,
            }}
          />
          <Layer
            id="borough-boundary-lines"
            type="line"
            filter={[
              "in",
              ["get", BOROUGH_NAME_FIELD],
              ["literal", BOROUGH_FILTER_NAMES],
            ] as unknown as FilterSpecification}
            paint={{
              "line-color": "#ffffff",
              "line-opacity": 0.24,
              "line-width": 0.9,
            }}
          />
          <Layer
            id="selected-borough-line"
            type="line"
            filter={selectedBoroughFilter}
            paint={{
              "line-color": "#fbbf24",
              "line-opacity": selectedBorough ? 0.72 : 0,
              "line-width": 1.8,
            }}
          />
        </Source>

        {/* Isochrone — declared first so it renders beneath neighbourhood
            circles. Higher opacity than before so it reads cleanly on
            satellite imagery. */}
        {isochrone && (
          <Source id="isochrone" type="geojson" data={isochrone}>
            <Layer
              id="isochrone-fill"
              type="fill"
              paint={{ "fill-color": "#38bdf8", "fill-opacity": 0.22 }}
            />
            <Layer
              id="isochrone-outline"
              type="line"
              paint={{
                "line-color": "#7dd3fc",
                "line-width": 2,
                "line-opacity": 0.85,
                "line-dasharray": [3, 2],
              }}
            />
          </Source>
        )}

        {/* Destination marker — DOM element, renders above the canvas. */}
        {query.destination && (
          <Marker
            longitude={query.destination.centroid.lng}
            latitude={query.destination.centroid.lat}
            anchor="bottom"
          >
            <div className="flex flex-col items-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              <div className="max-w-[180px] truncate rounded-full bg-sky-400 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-950 ring-2 ring-white">
                {query.destination.label}
              </div>
              <div className="-mt-1 h-3.5 w-3.5 rotate-45 bg-sky-400 ring-2 ring-white" />
            </div>
          </Marker>
        )}

        {/* Neighbourhood area polygons — declared BEFORE the centroid
            source so they render underneath the circles. Real LSOA
            shapes drop in via the optional `polygon` field on
            Neighbourhood; display shapes are derived from the curated centroid. */}
        <Source id="neighbourhood-polygons" type="geojson" data={polygonGeojson}>
          <Layer
            id="neighbourhood-polygon-fill"
            type="fill"
            paint={{
              "fill-color": ["get", "color"],
              "fill-opacity": ["get", "opacity"],
            }}
          />
          <Layer
            id="neighbourhood-polygon-outline"
            type="line"
            paint={{
              "line-color": ["get", "color"],
              "line-opacity": ["case", ["==", ["get", "selected"], true], 1, 0.9],
              "line-width": ["case", ["==", ["get", "selected"], true], 3.6, 1.2],
            }}
          />
          <Layer
            id="selected-neighbourhood-polygon-outline"
            type="line"
            filter={[
              "==",
              ["get", "selected"],
              true,
            ] as unknown as FilterSpecification}
            paint={{
              "line-color": "#e0f2fe",
              "line-opacity": 0.95,
              "line-width": 2,
              "line-dasharray": [2, 1.2],
            }}
          />
        </Source>

        {/* Neighbourhood circles + labels */}
        <Source id="neighbourhoods" type="geojson" data={geojson}>
          <Layer
            id="neighbourhood-circles"
            type="circle"
            paint={{
              "circle-radius": ["get", "radius"],
              "circle-color": ["get", "color"],
              "circle-opacity": ["get", "opacity"],
              "circle-stroke-color": [
                "case",
                ["==", ["get", "selected"], true],
                "#38bdf8",
                "#ffffff",
              ],
              "circle-stroke-width": [
                "case",
                ["==", ["get", "selected"], true],
                4,
                2,
              ],
              "circle-stroke-opacity": 0.95,
            }}
          />
        </Source>
      </Map>
    </>
  );
}
