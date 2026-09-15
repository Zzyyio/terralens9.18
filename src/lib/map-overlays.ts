type Geom = { type: "LineString" | "Point"; coordinates: number[] | number[][] };
type Feat = {
  type: "Feature";
  properties: Record<string, string>;
  geometry: Geom;
};
export type OverlayFC = { type: "FeatureCollection"; features: Feat[] };

function line(name: string, kind: string, note: string, coordinates: number[][]): Feat {
  return {
    type: "Feature",
    properties: { name, kind, note, title: name },
    geometry: { type: "LineString", coordinates },
  };
}
function point(name: string, kind: string, note: string, lon: number, lat: number, extra: Record<string, string> = {}): Feat {
  return {
    type: "Feature",
    properties: { name, kind, note, title: name, ...extra },
    geometry: { type: "Point", coordinates: [lon, lat] },
  };
}

/** Divergent cyan, convergent magma, transform sandstone. */
export const PLATES: OverlayFC = {
  type: "FeatureCollection",
  features: [
    line("Mid-Atlantic Ridge", "divergent", "Divergent: new crust, a ridge, sometimes a country (Iceland).", [
      [-18, 66], [-30, 52], [-32, 40], [-28, 20], [-14, 0], [0, -20], [10, -40], [8, -54],
    ]),
    line("East Pacific Rise", "divergent", "Divergent: fast spreading. New ocean floor walks away from the axis.", [
      [-110, 10], [-105, 0], [-112, -20], [-112, -40], [-90, -55],
    ]),
    line("East African Rift", "divergent", "Divergent: a continent splitting. Kenya sits on the split.", [
      [36, 14], [36, 4], [35, -3], [34, -10],
    ]),
    line("Cascadia trench", "convergent", "Convergent: ocean plate dives. Trench, megathrust, volcanic arc.", [
      [-128, 50], [-124, 40], [-124, 32],
    ]),
    line("Andes trench", "convergent", "Convergent: Nazca dives under South America. Trench plus a volcanic cordillera.", [
      [-80, 8], [-78, 0], [-76, -18], [-74, -30], [-74, -42],
    ]),
    line("Japan–Kuril trench", "convergent", "Convergent: Pacific plate dives. Island arc, deep earthquakes, tsunami risk.", [
      [145, 44], [144, 40], [142, 35], [141, 30],
    ]),
    line("Sunda trench", "convergent", "Convergent: Indo-Australian plate dives under Indonesia. Arc volcanoes.", [
      [95, 6], [100, 0], [105, -8], [118, -10], [130, -8],
    ]),
    line("Himalaya collision", "convergent", "Convergent: continent–continent. Mountains, a root, no ocean trench here.", [
      [72, 35], [78, 32], [86, 28], [95, 28],
    ]),
    line("Tonga–Kermadec", "convergent", "Convergent: a deep trench. The seafloor is consumed.", [
      [-174, -14], [-175, -21], [-178, -28], [-178, -36],
    ]),
    line("San Andreas", "transform", "Transform: plates slide. Earthquakes, no volcanic arc.", [
      [-124.4, 40.3], [-122.4, 37.8], [-118.2, 34.0], [-116.5, 32.7],
    ]),
    line("Alpine Fault, NZ", "transform", "Transform: a slide that also lifts the Southern Alps.", [
      [166.5, -46], [170, -44], [172.8, -42], [174.5, -41],
    ]),
    line("North Anatolian Fault", "transform", "Transform: a slide through Türkiye. Earthquakes, not a volcanic chain.", [
      [26, 40.2], [30, 40.6], [36, 40.8], [40, 40.9],
    ]),
    line("Aleutian trench", "convergent", "Convergent: Pacific dives. A volcanic arc, not Florida ice.", [
      [-167, 53], [-160, 54], [-152, 54],
    ]),
    line("Caribbean plate edge", "transform", "Transform plus a small subduction bite. Haiti’s earthquakes live here.", [
      [-84, 16], [-76, 18], [-70, 19], [-62, 15],
    ]),
  ],
};

export const RIVERS: OverlayFC = {
  type: "FeatureCollection",
  features: [
    line("Amazon", "river", "Largest discharge on Earth. A tropical basin, not a UK floodplain.", [
      [-73, -4], [-70, -4], [-60, -3], [-55, -2], [-50, -1.5], [-49, 0],
    ]),
    line("Nile", "river", "A desert with a river. Seasonal ITCZ headwaters, not a glacial melt pulse.", [
      [32.5, 15], [32.5, 22], [31.8, 26], [31.2, 30],
    ]),
    line("Mississippi", "river", "Interior continent to a sinking delta. Levées as national policy.", [
      [-93, 45], [-91, 38], [-90, 35], [-91, 30], [-89.2, 29.2],
    ]),
    line("Yangtze", "river", "Monsoon load from the plateau to a drowning delta.", [
      [100, 28], [105, 30], [112, 30.5], [118, 32], [121, 31.3],
    ]),
    line("Congo", "river", "Equatorial rainforest basin. A store of water and carbon.", [
      [25, 0], [18, -2], [16, -4], [12.5, -6],
    ]),
    line("Danube", "river", "A European collector from the Alps to a Black Sea delta.", [
      [10, 48.2], [16.4, 48.2], [20, 47], [26, 44.2], [29.6, 45.2],
    ]),
    line("Ganges–Brahmaputra", "river", "Collision-belt load. The monsoon plus a delta the size of a country.", [
      [78, 29], [82, 26], [88, 24], [90.5, 22],
    ]),
    line("Murray–Darling", "river", "An old, dry continent. Discharge is a drought story.", [
      [147, -36], [144, -35], [141, -34], [139, -35.5],
    ]),
    line("Rhine", "river", "Alpine melt to a North Sea delta. Levées as policy.", [
      [8, 46.6], [7.6, 48], [8.4, 50], [6.1, 52], [4.2, 51.9],
    ]),
    line("Colorado", "river", "A plateau river in a rain-shadow. Canyons, not a glacial U.", [
      [-111.5, 40], [-111.6, 36.9], [-114.7, 36], [-114.6, 32.7],
    ]),
    line("Thames", "river", "A drowned estuary more than a delta. Tides write the mouth.", [
      [-0.6, 51.4], [0.1, 51.48], [0.7, 51.45],
    ]),
    line("Mekong", "river", "A monsoon collector. Flood pulse writes the delta.", [
      [100, 20], [104, 16], [105, 12], [106.5, 10],
    ]),
    line("Indus", "river", "A collision-belt river through a rain-shadow. Irrigation is the hydrograph.", [
      [75, 35], [73, 32], [70, 28], [67.5, 24],
    ]),
    line("Volga", "river", "A continental interior collector to a closed sea.", [
      [37, 56], [44, 52], [48, 48], [49, 46],
    ]),
    line("Mackenzie", "river", "A north-flowing Arctic river. Ice, not a monsoon, writes the year.", [
      [-125, 60], [-128, 64], [-134, 68], [-135, 69],
    ]),
    line("Orinoco", "river", "A tropical collector east of the Andes.", [
      [-70, 5], [-66, 7], [-62, 8], [-60, 9],
    ]),
    line("Yellow River", "river", "Loess load. The channel sits above its plain.", [
      [110, 35], [114, 35], [118, 37.7],
    ]),
  ],
};

export const SETTLEMENTS: OverlayFC = {
  type: "FeatureCollection",
  features: (
    [
      ["London", 51.51, -0.13, "capital", "Drowned shelf, North Atlantic fetch, a till coast east."],
      ["Paris", 48.86, 2.35, "capital", "Temperate west-coast climate inland of a drowned shelf."],
      ["Berlin", 52.52, 13.41, "capital", "North European Plain. Ice wrote the ground."],
      ["Rome", 41.9, 12.5, "capital", "A colliding boot: volcanoes on a subduction story."],
      ["Cairo", 30.04, 31.24, "capital", "A desert with a river."],
      ["Nairobi", -1.29, 36.82, "capital", "Equator on a rift. ITCZ rains, not seasons of tilt."],
      ["Cape Town", -33.92, 18.42, "city", "Winter-rain Cape beside a cold current."],
      ["Lagos", 6.45, 3.4, "city", "ITCZ coast. Wet south of a drier Sahel."],
      ["New York", 40.71, -74.01, "city", "A drowned glacial harbour. A midlatitude west-coast cousin, not tropical."],
      ["Washington, D.C.", 38.91, -77.04, "capital", "Fall line between piedmont and coastal plain."],
      ["Mexico City", 19.43, -99.13, "capital", "A volcanic high. Height writes the air."],
      ["São Paulo", -23.55, -46.63, "city", "Brazilian plateau edge, not Amazonia."],
      ["Buenos Aires", -34.6, -58.38, "capital", "Humid Pampas. Andes rain-shadow is inland."],
      ["Lima", -12.05, -77.04, "capital", "Humboldt current: a desert coast beside a cold sea."],
      ["Tokyo", 35.68, 139.69, "capital", "Arc volcanoes on a subduction hinge."],
      ["Beijing", 39.9, 116.4, "capital", "A monsoon east, a dry west behind it."],
      ["New Delhi", 28.61, 77.21, "capital", "A continent that walked north; the Himalaya are the crumple."],
      ["Jakarta", -6.21, 106.85, "capital", "A warm-pool island arc."],
      ["Sydney", -33.87, 151.21, "city", "Temperate east coast of an old, dry shield."],
      ["Canberra", -35.28, 149.13, "capital", "Interior of a temperate east-coast belt."],
      ["Wellington", -41.29, 174.78, "capital", "A plate boundary with alps and a westerly fetch."],
      ["Reykjavík", 64.15, -21.94, "capital", "A ridge with a country on it."],
      ["Kathmandu", 27.72, 85.32, "capital", "The Himalaya wedge. Continent–continent convergence."],
      ["San Francisco", 37.77, -122.42, "city", "Transform plus fog. San Andreas is a slide, not an arc."],
      ["Honolulu", 21.31, -157.86, "city", "Hotspot island. Ages northwest along the chain."],
      ["Moscow", 55.76, 37.62, "capital", "Continental interior. Mercator lies about its size."],
      ["Singapore", 1.35, 103.82, "city", "Almost on the equator. Day length barely moves."],
      ["Mumbai", 19.08, 72.88, "city", "Monsoon west coast of the Indian plate."],
    ] as const
  ).map(([name, lat, lon, rank, note]) => point(name, "settlement", note, lon, lat, { rank })),
};

export const KOPPEN: OverlayFC = {
  type: "FeatureCollection",
  features: [
    point("Af rainforest", "koppen", "A tropical: no real winter. Rain every month. Amazon sample.", -60, -3, { letter: "A", color: "#2d8a4e" }),
    point("Aw savanna", "koppen", "A tropical: a real dry season. ITCZ walks away.", 8, 12, { letter: "A", color: "#7C9A6A" }),
    point("BWh hot desert", "koppen", "B dry: evaporation beats rain. Sahara sample.", 10, 23, { letter: "B", color: "#E8B86D" }),
    point("BWk cold desert", "koppen", "B dry: rain-shadow or continentality. Central Asia sample.", 65, 42, { letter: "B", color: "#c4a574" }),
    point("Cfb London", "koppen", "C temperate: no dry season, warm summer. UK default.", 0, 51.5, { letter: "C", color: "#3EE0C6" }),
    point("Cfa humid subtropical", "koppen", "C temperate: hot summer. SE United States sample.", -85, 32, { letter: "C", color: "#7FD4FF" }),
    point("Csa Mediterranean", "koppen", "C temperate: dry summer. Not a UK year.", 15, 37, { letter: "C", color: "#E8B86D" }),
    point("Dfa continental", "koppen", "D continental: hot summer, hard winter. Great Plains sample.", -95, 45, { letter: "D", color: "#6aa0c8" }),
    point("Dfc subarctic", "koppen", "D continental: short cool summer. Boreal sample.", 28, 64, { letter: "D", color: "#4a6a88" }),
    point("ET tundra", "koppen", "E polar: plants as a slow thermometer. Greenland fringe.", -50, 70, { letter: "E", color: "#d5eaf4" }),
    point("EF ice cap", "koppen", "E polar: the ice is the climate. Interior ice sheet.", 0, -80, { letter: "E", color: "#F4EFE6" }),
  ],
};

export const SEARCH_POI: { name: string; lat: number; lon: number; zoom: number; note: string }[] = [
  { name: "Himalaya", lat: 28, lon: 86, zoom: 5, note: "Continent–continent convergence." },
  { name: "Andes", lat: -20, lon: -70, zoom: 4, note: "Trench plus a volcanic cordillera." },
  { name: "Alps", lat: 46.5, lon: 10, zoom: 6, note: "Collision mountains, U-troughs." },
  { name: "Rockies", lat: 40, lon: -110, zoom: 4, note: "A high dry interior range." },
  { name: "Tibetan Plateau", lat: 32, lon: 88, zoom: 4, note: "The crumpled roof. Relief is the point." },
  { name: "Mariana Trench", lat: 11.3, lon: 142.2, zoom: 5, note: "A convergent deep. Relief, not a river canyon." },
  { name: "Mid-Atlantic Ridge", lat: 30, lon: -40, zoom: 3, note: "Divergent: new crust." },
  { name: "East African Rift", lat: 0.5, lon: 36, zoom: 5, note: "A continent splitting." },
  { name: "Amazon", lat: -3, lon: -60, zoom: 4, note: "Largest discharge on Earth." },
  { name: "Nile", lat: 26, lon: 32, zoom: 5, note: "A desert with a river." },
  { name: "Mississippi", lat: 32, lon: -91, zoom: 5, note: "Interior continent to a sinking delta." },
  { name: "San Andreas", lat: 36, lon: -120.5, zoom: 6, note: "Transform slide. Not a volcanic arc." },
  { name: "Iceland", lat: 65, lon: -19, zoom: 5, note: "A ridge with a country on it." },
  { name: "Holderness", lat: 53.75, lon: -0.05, zoom: 8, note: "Till cliffs and Spurn Head." },
];

export const PLATE_LEGEND = [
  { kind: "divergent", color: "#3EE0C6", label: "Divergent", note: "Ridge or rift. New crust." },
  { kind: "convergent", color: "#FF6A3D", label: "Convergent", note: "Trench, arc, or collision mountains." },
  { kind: "transform", color: "#E8B86D", label: "Transform", note: "A slide. Earthquakes, not a volcanic arc." },
] as const;

export function plateColor(kind: string) {
  if (kind === "divergent") return "#3EE0C6";
  if (kind === "transform") return "#E8B86D";
  return "#FF6A3D";
}
