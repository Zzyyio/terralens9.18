import { useEffect, useRef, useState } from "react";
import {
  attachStyleFallback,
  CARTO_VOYAGER_STYLE,
  ESRI_OCEAN_STYLE,
  FIORD,
  OSM_RASTER_STYLE,
  OSM_RELIEF_STYLE,
  type MapBasemap,
} from "@/lib/map-style";
import { plateColor } from "@/lib/map-overlays";

export { FIORD, LIBERTY } from "@/lib/map-style";

export type MapClick = { lat: number; lon: number };
export type MapFeatureHit = {
  title: string;
  note: string;
  kind: string;
  lat: number;
  lon: number;
};

export type Overlay = {
  id: string;
  data: { type: string; features: unknown[] };
  color: string;
  width?: number;
  circle?: boolean;
  /** data-driven plate kinds */
  plates?: boolean;
  /** settlements: hide small cities at world zoom */
  ranked?: boolean;
  /** translucent halo, e.g. atlas selection */
  fill?: boolean;
  labels?: boolean;
  /** overlay opacity 0–1 */
  opacity?: number;
  /** fill polygons (plate interiors) */
  polygon?: boolean;
};

type MapHandle = {
  remove: () => void;
  flyTo: (o: { center: [number, number]; zoom?: number; essential?: boolean }) => void;
  getCanvas: () => HTMLCanvasElement;
  loaded: () => boolean;
  isStyleLoaded?: () => boolean;
  setStyle: (s: unknown) => void;
  on: (ev: string, fn: (e?: unknown) => void) => void;
  off?: (ev: string, fn: (e?: unknown) => void) => void;
  getSource: (id: string) => unknown;
  getLayer?: (id: string) => unknown;
  addSource: (id: string, spec: unknown) => void;
  addLayer: (layer: unknown, before?: string) => void;
  removeLayer?: (id: string) => void;
  removeSource?: (id: string) => void;
  resize: () => void;
  zoomIn?: () => void;
  zoomOut?: () => void;
  queryRenderedFeatures?: (pt: unknown, opts?: { layers?: string[] }) => { properties?: Record<string, string>; geometry?: { type: string } }[];
};

const CREDIT: Record<MapBasemap, string> = {
  openfreemap: "OpenFreeMap vector · OpenStreetMap contributors",
  osm: "OpenStreetMap raster (fallback if vector tiles were silent)",
  carto: "OpenStreetMap data · CARTO Voyager (political outlines)",
  "natural-earth": "Natural Earth 110m land — offline fallback. Coastlines only.",
  relief: "OpenTopoMap relief · OSM / SRTM. Tibet, rifts and trenches as height.",
  bathymetry: "Esri Ocean / GEBCO. Seafloor as colour. Not a navigation chart.",
};

function meridians(): { type: string; features: unknown[] } {
  const features = [];
  for (let lon = -180; lon <= 180; lon += 30) {
    const coordinates = [];
    for (let lat = -80; lat <= 80; lat += 5) coordinates.push([lon, lat]);
    features.push({
      type: "Feature",
      properties: { name: `${Math.abs(lon)}°${lon < 0 ? "W" : lon > 0 ? "E" : ""}` },
      geometry: { type: "LineString", coordinates },
    });
  }
  for (let lat = -60; lat <= 60; lat += 15) {
    const coordinates = [];
    for (let lon = -180; lon <= 180; lon += 5) coordinates.push([lon, lat]);
    features.push({
      type: "Feature",
      properties: { name: `${Math.abs(lat)}°${lat < 0 ? "S" : lat > 0 ? "N" : ""}` },
      geometry: { type: "LineString", coordinates },
    });
  }
  return { type: "FeatureCollection", features };
}

function paintCoast(
  canvas: HTMLCanvasElement,
  fc: { features: { geometry: { type: string; coordinates: unknown } }[] },
) {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx || w < 4 || h < 4) return;
  ctx.fillStyle = "#0e2a38";
  ctx.fillRect(0, 0, w, h);
  const project = (lon: number, lat: number) => [((lon + 180) / 360) * w, ((90 - lat) / 180) * h];
  ctx.fillStyle = "#7C9A6A";
  ctx.strokeStyle = "#F4EFE6";
  ctx.lineWidth = Math.max(0.6, w / 900);
  const ring = (coords: number[][]) => {
    ctx.beginPath();
    coords.forEach(([lon, lat], i) => {
      const [x, y] = project(lon, lat);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };
  const walk = (geom: { type: string; coordinates: unknown }) => {
    if (geom.type === "Polygon") (geom.coordinates as number[][][]).forEach(ring);
    else if (geom.type === "MultiPolygon") (geom.coordinates as number[][][][]).forEach((poly) => poly.forEach(ring));
  };
  for (const f of fc.features) walk(f.geometry);
}

function StaticCoast({ className, hidden }: { className: string; hidden: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const draw = (fc: { features: { geometry: { type: string; coordinates: unknown } }[] }) => {
      const parent = el.parentElement;
      const w = parent?.clientWidth || 640;
      const h = parent?.clientHeight || 360;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.max(2, Math.floor(w * dpr));
      el.height = Math.max(2, Math.floor(h * dpr));
      el.style.width = "100%";
      el.style.height = "100%";
      paintCoast(el, fc);
    };
    void fetch("/geo/ne_110m_land.geojson")
      .then((r) => r.json())
      .then((fc) => {
        if (cancelled) return;
        draw(fc);
        const ro = new ResizeObserver(() => draw(fc));
        if (el.parentElement) ro.observe(el.parentElement);
        (el as HTMLCanvasElement & { __ro?: ResizeObserver }).__ro = ro;
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      (el as HTMLCanvasElement & { __ro?: ResizeObserver }).__ro?.disconnect();
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden={hidden}
      style={{ position: "absolute", inset: 0, opacity: hidden ? 0 : 1, pointerEvents: "none" }}
    />
  );
}

function applyOverlays(m: MapHandle, overlays: Overlay[], prev: string[], graticule: boolean) {
  for (const id of prev) {
    if (id === "relief") continue;
    try {
      if (m.getLayer?.(`${id}-label`)) m.removeLayer?.(`${id}-label`);
      if (m.getLayer?.(`${id}-outline`)) m.removeLayer?.(`${id}-outline`);
      if (m.getLayer?.(id)) m.removeLayer?.(id);
      if (m.getSource(id)) m.removeSource?.(id);
    } catch {
      /* style swap */
    }
  }
  if (graticule) {
    try {
      if (!m.getSource("graticule")) {
        m.addSource("graticule", { type: "geojson", data: meridians() as never });
        m.addLayer({
          id: "graticule",
          type: "line",
          source: "graticule",
          paint: { "line-color": "#F4EFE6", "line-width": 0.6, "line-opacity": 0.35 },
        });
      }
    } catch {
      /* */
    }
  } else {
    try {
      if (m.getLayer?.("graticule")) m.removeLayer?.("graticule");
      if (m.getSource("graticule")) m.removeSource?.("graticule");
    } catch {
      /* */
    }
  }
  for (const ov of overlays) {
    if (m.getSource(ov.id)) continue;
    try {
      m.addSource(ov.id, { type: "geojson", data: ov.data as never });
      if (ov.fill && ov.circle) {
        m.addLayer({
          id: ov.id,
          type: "circle",
          source: ov.id,
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 22, 5, 52, 8, 90],
            "circle-color": ov.color,
            "circle-opacity": 0.22 * (ov.opacity ?? 1),
            "circle-stroke-color": ov.color,
            "circle-stroke-width": 2.2,
            "circle-stroke-opacity": 0.95,
          },
        });
      } else if (ov.polygon) {
        m.addLayer({
          id: ov.id,
          type: "fill",
          source: ov.id,
          paint: {
            "fill-color": ov.color,
            "fill-opacity": 0.14 * (ov.opacity ?? 1),
            "fill-outline-color": ov.color,
          },
        });
        m.addLayer({
          id: `${ov.id}-outline`,
          type: "line",
          source: ov.id,
          paint: {
            "line-color": ov.color,
            "line-width": 1.2,
            "line-opacity": 0.85 * (ov.opacity ?? 1),
          },
        });
      } else if (ov.plates) {
        m.addLayer({
          id: ov.id,
          type: "line",
          source: ov.id,
          paint: {
            "line-color": [
              "match",
              ["get", "kind"],
              "divergent",
              "#3EE0C6",
              "transform",
              "#E8B86D",
              "#FF6A3D",
            ],
            "line-width": ["interpolate", ["linear"], ["zoom"], 1, 2.2, 4, ov.width ?? 2.8, 8, 4.2],
            "line-opacity": ov.opacity ?? 1,
          },
        });
      } else if (ov.circle && ov.ranked) {
        m.addLayer({
          id: ov.id,
          type: "circle",
          source: ov.id,
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              1,
              ["case", ["==", ["get", "rank"], "capital"], 4.5, 0],
              3,
              ["case", ["==", ["get", "rank"], "capital"], 5.5, 3.5],
              6,
              7,
            ],
            "circle-color": ov.color,
            "circle-stroke-color": "#07090C",
            "circle-stroke-width": 1,
            "circle-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              1,
              ["case", ["==", ["get", "rank"], "capital"], 1, 0],
              2.4,
              1,
            ],
          },
        });
      } else if (ov.circle) {
        m.addLayer({
          id: ov.id,
          type: "circle",
          source: ov.id,
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 7, 4, 11],
            "circle-color": ["coalesce", ["get", "color"], ov.color],
            "circle-stroke-color": "#07090C",
            "circle-stroke-width": 1.2,
          },
        });
      } else {
        m.addLayer({
          id: ov.id,
          type: "line",
          source: ov.id,
          paint: {
            "line-color": ov.color,
            "line-width": ["interpolate", ["linear"], ["zoom"], 1, 1.4, 4, ov.width ?? 2.2, 8, 3.6],
            "line-opacity": ov.opacity ?? 1,
          },
        });
      }
      if (ov.labels !== false && !ov.fill) {
        try {
          m.addLayer({
            id: `${ov.id}-label`,
            type: "symbol",
            source: ov.id,
            layout: {
              "text-field": ov.circle
                ? ["coalesce", ["get", "letter"], ["get", "name"]]
                : ["get", "name"],
              "text-size": ["interpolate", ["linear"], ["zoom"], 1, 10, 6, 13],
              "text-font": ["Noto Sans Regular"],
              "text-offset": ov.circle ? [0, 1.05] : [0, 0],
              "text-anchor": ov.circle ? "top" : "center",
              "symbol-placement": ov.circle ? "point" : "line",
              "text-max-angle": 30,
              "text-optional": true,
            },
            paint: {
              "text-color": "#F4EFE6",
              "text-halo-color": "#07090C",
              "text-halo-width": 1.35,
            },
          });
        } catch {
          /* glyphs missing on this style */
        }
      }
    } catch {
      /* style not ready */
    }
  }
}

export function LibreMap({
  center,
  zoom = 3,
  styleUrl,
  relief = false,
  baseMap = "vector",
  overlays = [],
  marker,
  markerB,
  onClick,
  onFeature,
  onMove,
  className = "h-[28rem] w-full overflow-hidden rounded-2xl border border-white/10 bg-trench",
  label,
  graticule = false,
  draggableMarker = false,
}: {
  center: [number, number];
  zoom?: number;
  styleUrl?: string;
  relief?: boolean;
  /** Classroom basemap. Vector first; relief / political / bathymetry on demand. */
  baseMap?: "vector" | "relief" | "political" | "bathymetry";
  overlays?: Overlay[];
  marker?: [number, number] | null;
  markerB?: [number, number] | null;
  onClick?: (c: MapClick) => void;
  onFeature?: (f: MapFeatureHit) => void;
  onMove?: (c: MapClick) => void;
  className?: string;
  label?: string;
  graticule?: boolean;
  draggableMarker?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapHandle | null>(null);
  const markerRef = useRef<{
    setLngLat: (p: [number, number]) => unknown;
    remove: () => void;
    getLngLat?: () => { lat: number; lng: number };
  } | null>(null);
  const markerBRef = useRef<{
    setLngLat: (p: [number, number]) => unknown;
    remove: () => void;
  } | null>(null);
  const clickRef = useRef(onClick);
  clickRef.current = onClick;
  const featRef = useRef(onFeature);
  featRef.current = onFeature;
  const moveRef = useRef(onMove);
  moveRef.current = onMove;
  const overlayKey = overlays.map((o) => `${o.id}:${o.opacity ?? 1}:${o.color}:${o.width ?? 0}`).join("|") + (graticule ? "|g" : "");
  const overlaysRef = useRef(overlays);
  overlaysRef.current = overlays;
  const overlayIdsRef = useRef<string[]>([]);
  const graticuleRef = useRef(graticule);
  graticuleRef.current = graticule;
  const reliefRef = useRef(relief);
  reliefRef.current = relief;
  const [basemap, setBasemap] = useState<MapBasemap | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let detach = () => undefined as void;
    const el = ref.current;
    if (!el) return;

    void (async () => {
      try {
        const maplibregl = await import("maplibre-gl");
        await import("maplibre-gl/dist/maplibre-gl.css");
        if (cancelled || !el) return;
        try {
          maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
        } catch {
          /* already set */
        }
        const startVector = !styleUrl;
        const style = styleUrl ?? FIORD;
        const m = new maplibregl.Map({
          container: el,
          style,
          center,
          zoom,
          attributionControl: { compact: true },
          pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
          doubleClickZoom: true,
          keyboard: true,
          dragRotate: false,
          pitchWithRotate: false,
        });
        m.addControl(new maplibregl.NavigationControl({ showCompass: false, visualizePitch: false }), "top-right");
        m.addControl(new maplibregl.ScaleControl({ maxWidth: 140, unit: "metric" }), "bottom-right");
        detach = attachStyleFallback(m as never, {
          relief: false,
          start: startVector ? "openfreemap" : "osm",
          onBasemap: (b) => {
            if (cancelled) return;
            setBasemap(b);
            if (b === "natural-earth") setFailed(true);
          },
        });
        const syncOverlays = () => {
          const next = overlaysRef.current;
          applyOverlays(m as unknown as MapHandle, next, overlayIdsRef.current, graticuleRef.current);
          overlayIdsRef.current = next.map((o) => o.id).concat(graticuleRef.current ? ["graticule"] : []);
          next.forEach((o) => {
            if (o.labels !== false && !o.fill) overlayIdsRef.current.push(`${o.id}-label`);
          });
        };
        m.on("load", () => {
          m.resize();
          setReady(true);
          syncOverlays();
        });
        m.on("style.load", syncOverlays);
        m.on("click", (e: { lngLat: { lat: number; lng: number }; point: { x: number; y: number } }) => {
          const layers = overlaysRef.current.map((o) => o.id);
          const hits =
            layers.length && m.queryRenderedFeatures
              ? m.queryRenderedFeatures(e.point as never, { layers })
              : [];
          const hit = hits[0];
          const props = hit?.properties;
          if (props?.name || props?.title) {
            featRef.current?.({
              title: props.title || props.name,
              note: props.note || "",
              kind: props.kind || "",
              lat: e.lngLat.lat,
              lon: e.lngLat.lng,
            });
            try {
              new maplibregl.Popup({ closeButton: true, maxWidth: "240px", className: "tl-popup" })
                .setLngLat(e.lngLat)
                .setHTML(
                  `<p style="font:500 13px Geist,sans-serif;margin:0 0 4px;color:#F4EFE6">${props.title || props.name}</p>
                   <p style="font:400 12px Geist,sans-serif;margin:0;color:#C4D0CC">${props.note || props.kind || ""}</p>`,
                )
                .addTo(m);
            } catch {
              /* */
            }
          }
          clickRef.current?.({ lat: e.lngLat.lat, lon: e.lngLat.lng });
        });
        m.on("mousemove", (e: { lngLat: { lat: number; lng: number } }) => {
          moveRef.current?.({ lat: e.lngLat.lat, lon: e.lngLat.lng });
        });
        if (clickRef.current) m.getCanvas().style.cursor = "crosshair";
        mapRef.current = m as unknown as MapHandle;
        if (marker) {
          const mk = new maplibregl.Marker({ color: "#3EE0C6", draggable: draggableMarker }).setLngLat(marker).addTo(m);
          if (draggableMarker) {
            mk.on("dragend", () => {
              const ll = mk.getLngLat();
              clickRef.current?.({ lat: ll.lat, lon: ll.lng });
            });
          }
          markerRef.current = mk;
        }
        if (markerB) {
          const mkB = new maplibregl.Marker({ color: "#FF6A3D" }).setLngLat(markerB).addTo(m);
          markerBRef.current = mkB;
        }
        const onKey = (ev: KeyboardEvent) => {
          if (ev.target instanceof HTMLInputElement || ev.target instanceof HTMLTextAreaElement) return;
          if (ev.key === "+" || ev.key === "=") m.zoomIn();
          if (ev.key === "-" || ev.key === "_") m.zoomOut();
        };
        window.addEventListener("keydown", onKey);
        const ro = new ResizeObserver(() => m.resize());
        ro.observe(el);
        const tResize = [50, 250, 800].map((ms) => window.setTimeout(() => m.resize(), ms));
        const prevDetach = detach;
        detach = () => {
          tResize.forEach((id) => window.clearTimeout(id));
          window.removeEventListener("keydown", onKey);
          ro.disconnect();
          prevDetach();
        };
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      detach();
      markerRef.current?.remove();
      markerRef.current = null;
      markerBRef.current?.remove();
      markerBRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
      overlayIdsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styleUrl, draggableMarker]);

  const reliefWas = useRef(false);
  const baseWas = useRef(baseMap);
  useEffect(() => {
    const m = mapRef.current;
    if (!m) return;
    if (baseMap !== baseWas.current) {
      try {
        if (baseMap === "relief") {
          m.setStyle(OSM_RELIEF_STYLE);
          setBasemap("relief");
        } else if (baseMap === "political") {
          m.setStyle(CARTO_VOYAGER_STYLE);
          setBasemap("carto");
        } else if (baseMap === "bathymetry") {
          m.setStyle(ESRI_OCEAN_STYLE);
          setBasemap("bathymetry");
        } else {
          m.setStyle(FIORD);
          setBasemap("openfreemap");
        }
      } catch {
        /* */
      }
      baseWas.current = baseMap;
    } else if (relief && !reliefWas.current) {
      try {
        m.setStyle(OSM_RELIEF_STYLE);
        setBasemap("relief");
      } catch {
        /* */
      }
    } else if (!relief && reliefWas.current && baseMap === "vector") {
      try {
        m.setStyle(FIORD);
        setBasemap("openfreemap");
      } catch {
        /* */
      }
    }
    reliefWas.current = relief;
    applyOverlays(m, overlays, overlayIdsRef.current, graticule);
    overlayIdsRef.current = overlays.map((o) => o.id).concat(graticule ? ["graticule"] : []);
    overlays.forEach((o) => {
      if (o.labels !== false && !o.fill) overlayIdsRef.current.push(`${o.id}-label`);
      if (o.polygon) overlayIdsRef.current.push(`${o.id}-outline`);
    });
  }, [overlayKey, graticule, relief, baseMap]);

  useEffect(() => {
    mapRef.current?.flyTo({ center, zoom, essential: true });
  }, [center[0], center[1], zoom]);

  useEffect(() => {
    if (!marker || !markerRef.current) return;
    markerRef.current.setLngLat(marker);
  }, [marker?.[0], marker?.[1]]);

  useEffect(() => {
    if (!markerB) {
      markerBRef.current?.remove();
      markerBRef.current = null;
      return;
    }
    if (markerBRef.current) {
      markerBRef.current.setLngLat(markerB);
      return;
    }
    const m = mapRef.current;
    if (!m) return;
    void import("maplibre-gl").then((maplibregl) => {
      if (!mapRef.current || markerBRef.current) return;
      const mkB = new maplibregl.Marker({ color: "#FF6A3D" }).setLngLat(markerB).addTo(m as never);
      markerBRef.current = mkB;
    });
  }, [markerB?.[0], markerB?.[1]]);

  const credit = basemap ? CREDIT[basemap] : null;

  return (
    <div className="relative">
      <div className={`relative min-h-[16rem] ${className}`}>
        <StaticCoast className="h-full w-full" hidden={ready && !failed} />
        <div ref={ref} className="absolute inset-0 h-full w-full min-h-[16rem]" role="img" aria-label={label ?? "Map"} />
      </div>
      {credit && (
        <p className="pointer-events-none absolute bottom-8 left-2 right-28 rounded-full border border-white/10 bg-basalt/85 px-3 py-1 font-mono text-[10px] text-mist backdrop-blur-md md:bottom-2">
          {credit}
        </p>
      )}
      {failed && (
        <p className="mt-2 text-sm text-sandstone">
          Online tiles did not load. Showing Natural Earth coastlines so the map is still usable.
          Pan, pinch, double-click zoom, and keyboard +/− still work. Overlays still draw.
        </p>
      )}
    </div>
  );
}

export { plateColor };
