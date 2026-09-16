/** Basemaps: OpenFreeMap vector first, OSM raster if vector is silent, Carto, then Natural Earth. */

export const FIORD = "https://tiles.openfreemap.org/styles/fiord";
export const LIBERTY = "https://tiles.openfreemap.org/styles/liberty";

const GLYPHS = "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf";

function rasterStyle(
  id: string,
  tiles: string[],
  attribution: string,
  maxzoom = 19,
) {
  return {
    version: 8 as const,
    glyphs: GLYPHS,
    sources: {
      [id]: {
        type: "raster" as const,
        tiles,
        tileSize: 256,
        attribution,
        maxzoom,
      },
    },
    layers: [
      { id: "background", type: "background" as const, paint: { "background-color": "#0e2a38" } },
      { id, type: "raster" as const, source: id },
    ],
  };
}

export const OSM_RASTER_STYLE = rasterStyle(
  "osm",
  [
    "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
  ],
  "© OpenStreetMap contributors",
  19,
);

export const CARTO_VOYAGER_STYLE = rasterStyle(
  "carto",
  [
    "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
    "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
    "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
  ],
  "© OpenStreetMap contributors · CARTO",
  20,
);

export const OSM_RELIEF_STYLE = rasterStyle(
  "topo",
  [
    "https://a.tile.opentopomap.org/{z}/{x}/{y}.png",
    "https://b.tile.opentopomap.org/{z}/{x}/{y}.png",
    "https://c.tile.opentopomap.org/{z}/{x}/{y}.png",
  ],
  "© OpenStreetMap contributors, SRTM · OpenTopoMap (CC-BY-SA)",
  17,
);

export const OPEN_TOPO_TILES = [
  "https://a.tile.opentopomap.org/{z}/{x}/{y}.png",
  "https://b.tile.opentopomap.org/{z}/{x}/{y}.png",
  "https://c.tile.opentopomap.org/{z}/{x}/{y}.png",
];

export const NATURAL_EARTH_STYLE = {
  version: 8 as const,
  glyphs: GLYPHS,
  sources: {
    land: {
      type: "geojson" as const,
      data: "/geo/ne_110m_land.geojson",
    },
  },
  layers: [
    {
      id: "background",
      type: "background" as const,
      paint: { "background-color": "#0e2a38" },
    },
    {
      id: "land",
      type: "fill" as const,
      source: "land",
      paint: { "fill-color": "#7C9A6A", "fill-opacity": 0.92 },
    },
    {
      id: "land-line",
      type: "line" as const,
      source: "land",
      paint: { "line-color": "#F4EFE6", "line-width": 0.8, "line-opacity": 0.85 },
    },
  ],
};

export type MapBasemap = "openfreemap" | "osm" | "carto" | "natural-earth" | "relief";

type MapLike = {
  on: (ev: string, fn: (e?: { error?: { status?: number; message?: string }; sourceDataType?: string }) => void) => void;
  off?: (ev: string, fn: (e?: unknown) => void) => void;
  setStyle: (s: unknown) => unknown;
  loaded: () => boolean;
  isStyleLoaded?: () => boolean;
  resize?: () => void;
};

export function preferredRaster(relief?: boolean) {
  return relief ? OSM_RELIEF_STYLE : OSM_RASTER_STYLE;
}

export function attachStyleFallback(
  map: MapLike,
  opts: {
    relief?: boolean;
    start?: MapBasemap;
    onBasemap?: (b: MapBasemap) => void;
  } = {},
): () => void {
  let usedOsm = false;
  let usedCarto = false;
  let usedNe = false;
  let sawTile = false;
  const onBasemap = opts.onBasemap;
  const start = opts.start ?? "openfreemap";

  const toNe = () => {
    if (usedNe) return;
    usedNe = true;
    try {
      map.setStyle(NATURAL_EARTH_STYLE);
      onBasemap?.("natural-earth");
    } catch {
      /* tearing down */
    }
  };

  const toCarto = () => {
    if (usedCarto || usedNe) return;
    usedCarto = true;
    try {
      map.setStyle(CARTO_VOYAGER_STYLE);
      onBasemap?.("carto");
    } catch {
      toNe();
    }
  };

  const toOsm = () => {
    if (usedOsm || usedNe) return;
    usedOsm = true;
    try {
      map.setStyle(OSM_RASTER_STYLE);
      onBasemap?.("osm");
    } catch {
      toCarto();
    }
  };

  const onErr = (e?: { error?: { status?: number; message?: string } }) => {
    const msg = (e?.error?.message ?? "").toLowerCase();
    const status = e?.error?.status ?? 0;
    const fatal =
      status >= 400 ||
      /failed to fetch|load.*error|networkerror|webgl|source|403|429/i.test(msg);
    if (!fatal) return;
    if (start === "openfreemap" && !usedOsm) toOsm();
    else if (!usedCarto) toCarto();
    else toNe();
  };

  map.on("error", onErr);
  // Only a *tile* counts. Style JSON sourcedata used to mark the map "ready"
  // while OpenFreeMap vector tiles stayed silent — a blank or green canvas.
  map.on("sourcedata", (e?: { sourceDataType?: string }) => {
    if (e?.sourceDataType === "tile") sawTile = true;
  });
  map.on("load", () => {
    if (start === "openfreemap" && sawTile && !usedOsm) onBasemap?.("openfreemap");
    else if (usedOsm && !usedCarto) onBasemap?.("osm");
  });

  const t1 = window.setTimeout(() => {
    if (start === "openfreemap" && !sawTile) toOsm();
    else if (!map.loaded()) toCarto();
  }, 3000);
  const t2 = window.setTimeout(() => {
    if (!sawTile && !usedCarto) toCarto();
  }, 7000);
  const t3 = window.setTimeout(() => {
    if (!map.loaded() && !sawTile) toNe();
  }, 11000);

  return () => {
    window.clearTimeout(t1);
    window.clearTimeout(t2);
    window.clearTimeout(t3);
  };
}
