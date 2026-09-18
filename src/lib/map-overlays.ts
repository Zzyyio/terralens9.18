type Geom = { type: "LineString" | "Point" | "Polygon"; coordinates: number[] | number[][] | number[][][] };
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

function poly(name: string, kind: string, note: string, coordinates: number[][]): Feat {
  return {
    type: "Feature",
    properties: { name, kind, note, title: name },
    geometry: { type: "Polygon", coordinates: [coordinates] },
  };
}

/** Simplified plate polygons for classroom identification — not a research plate model. */
export const PLATE_POLYS: OverlayFC = {
  type: "FeatureCollection",
  features: [
    poly("Pacific plate", "plate", "The largest oceanic plate. Consumed at trenches around the Ring.", [
      [120, 50], [180, 50], [180, -60], [120, -60], [120, 50],
    ]),
    poly("North American plate", "plate", "Continent plus western Atlantic floor. San Andreas is its west edge.", [
      [-170, 72], [-50, 72], [-50, 15], [-120, 15], [-170, 50], [-170, 72],
    ]),
    poly("Eurasian plate", "plate", "A collage. The Himalaya is India arriving, not this plate growing.", [
      [-10, 72], [140, 72], [140, 35], [40, 28], [-10, 40], [-10, 72],
    ]),
    poly("African plate", "plate", "A continent with a rift. The east is splitting.", [
      [-20, 38], [50, 38], [50, -36], [-18, -36], [-20, 38],
    ]),
    poly("South American plate", "plate", "Continent plus a trench on the west. The Andes sit above the dive.", [
      [-80, 12], [-35, 12], [-35, -56], [-76, -56], [-80, 12],
    ]),
    poly("Indo-Australian plate", "plate", "India walked north. Australia is on the same slow conveyor.", [
      [60, 30], [150, 10], [150, -50], [70, -40], [60, 30],
    ]),
    poly("Antarctic plate", "plate", "Almost surrounded by ridges. New floor walks away from Antarctica.", [
      [-180, -60], [180, -60], [180, -89], [-180, -89], [-180, -60],
    ]),
    poly("Nazca plate", "plate", "A small oceanic plate diving under South America.", [
      [-90, 5], [-70, 5], [-76, -40], [-100, -40], [-90, 5],
    ]),
  ],
};

export const VOLCANOES: OverlayFC = {
  type: "FeatureCollection",
  features: [
    point("Fuji", "volcano", "Stratovolcano on a subduction arc. Sticky magma, steep cone.", 138.73, 35.36),
    point("St Helens", "volcano", "Cascadia arc. Not the San Andreas.", -122.19, 46.2),
    point("Vesuvius", "volcano", "A classic sticky-magma cone above a subduction hinge.", 14.43, 40.82),
    point("Etna", "volcano", "Europe’s most active. An arc cousin, not a hotspot shield.", 15.0, 37.75),
    point("Kīlauea", "volcano", "Hotspot shield. Runny basalt, not an island arc.", -155.29, 19.41),
    point("Mauna Loa", "volcano", "The type shield. Gentle slopes of stacked basalt.", -155.61, 19.48),
    point("Eyjafjallajökull", "volcano", "A ridge with ice on it. Iceland is not a subduction arc.", -19.62, 63.63),
    point("Nyiragongo", "volcano", "East African Rift. A continent splitting, not a trench.", 29.25, -1.52),
    point("Krakatau", "volcano", "Sunda arc. A volcanic island on a diving plate.", 105.42, -6.1),
    point("Pinatubo", "volcano", "Philippine arc. 1991 ash as a climate forcing.", 120.35, 15.14),
    point("Popocatépetl", "volcano", "Mexican volcanic belt. Subduction, a high city nearby.", -98.63, 19.02),
    point("Cotopaxi", "volcano", "Andean arc. Trench to the west, sticky magma here.", -78.44, -0.68),
    point("Ruapehu", "volcano", "Taupō volcanic zone. A dipping plate under New Zealand.", 175.56, -39.28),
    point("Bezymianny", "volcano", "Kamchatka arc. Pacific plate consumed.", 160.59, 55.98),
  ],
};

export const QUAKES: OverlayFC = {
  type: "FeatureCollection",
  features: [
    point("San Francisco 1906", "quake", "Transform. Shallow, a slide, not a volcanic arc.", -122.4, 37.8),
    point("Tohoku 2011", "quake", "Megathrust. Trench, tsunami, a diving Pacific plate.", 142.4, 38.3),
    point("Sumatra 2004", "quake", "Sunda megathrust. The Indian Ocean tsunami started here.", 95.9, 3.3),
    point("Haiti 2010", "quake", "Caribbean edge. A slide plus a small subduction bite.", -72.5, 18.5),
    point("Christchurch 2011", "quake", "A colliding edge under a city. Not a Hawaiian hotspot.", 172.64, -43.53),
    point("Kashmir 2005", "quake", "Continent–continent. The Himalaya wedge.", 73.6, 34.5),
    point("Mexico City 1985", "quake", "A subduction earthquake felt on lake sediments.", -99.1, 19.4),
    point("Lisbon 1755", "quake", "Atlantic margin. Tsunami in a European capital.", -10.0, 36.5),
    point("Anchorage 1964", "quake", "Aleutian megathrust. The largest US instrumented quake.", -147.4, 61.0),
    point("İzmit 1999", "quake", "North Anatolian Fault. A transform through Türkiye.", 30.0, 40.7),
  ],
};

export const CURRENTS: OverlayFC = {
  type: "FeatureCollection",
  features: [
    line("Gulf Stream", "current", "A warm western-boundary current. Europe’s mild west coast.", [
      [-80, 25], [-76, 32], [-70, 38], [-50, 42], [-30, 50],
    ]),
    line("Kuroshio", "current", "The Pacific’s Gulf Stream cousin. Warm water along Japan.", [
      [122, 22], [130, 28], [140, 35], [145, 40],
    ]),
    line("Humboldt", "current", "A cold eastern-boundary current. The Atacama sits beside it.", [
      [-72, -40], [-76, -20], [-80, -8], [-82, 0],
    ]),
    line("Canary", "current", "Cold water south along NW Africa. Upwelling, dry coasts.", [
      [-12, 42], [-16, 32], [-18, 22], [-18, 14],
    ]),
    line("Agulhas", "current", "Warm water south along Africa, then a retroflection.", [
      [32, -28], [32, -34], [28, -38], [22, -40],
    ]),
    line("Antarctic Circumpolar", "current", "The only current that laps the world. No continent in the way.", [
      [-170, -56], [-90, -56], [-10, -56], [70, -56], [150, -56], [190, -56],
    ]),
  ],
};

/** Classroom-grade country outlines — not a border treaty. Click to name a state. */
export const BORDERS: OverlayFC = {
  type: "FeatureCollection",
  features: [
    line("United Kingdom", "border", "An island state. Holderness and the Jurassic Coast sit on it.", [
      [-5.7, 50.1], [-4.8, 50.3], [-5.0, 51.7], [-3.2, 53.4], [-4.8, 58.6], [-1.8, 57.7], [0.2, 52.9], [1.4, 52.6], [1.3, 51.4], [-0.3, 50.7], [-5.7, 50.1],
    ]),
    line("United States (CONUS)", "border", "A political outline on a spinning sphere. Time zones are bargains.", [
      [-124.7, 48.4], [-123.0, 46.2], [-124.4, 40.4], [-117.1, 32.5], [-97.1, 25.9], [-81.5, 25.2], [-80.0, 32.0], [-76.0, 35.2], [-67.0, 44.8], [-82.5, 41.7], [-83.0, 46.5], [-95.0, 49.0], [-123.0, 49.0], [-124.7, 48.4],
    ]),
    line("China", "border", "A large state. Loess Plateau, Huangpu, and a monsoon coast.", [
      [74, 40], [80, 42], [90, 45], [119, 53], [135, 48], [122, 31], [108, 21], [98, 24], [78, 32], [74, 40],
    ]),
    line("Japan", "border", "An island arc above a trench. Not a hotspot chain.", [
      [130.5, 31.5], [131.5, 33.5], [139.8, 35.4], [141.0, 38.2], [145.5, 43.4], [141.4, 43.0], [130.5, 31.5],
    ]),
    line("Iceland", "border", "A ridge with a country on it.", [
      [-24.5, 63.4], [-22.0, 64.5], [-14.5, 65.5], [-13.5, 65.1], [-18.0, 63.4], [-24.5, 63.4],
    ]),
    line("Australia", "border", "An old, dry continent. The Murray–Darling is a drought story.", [
      [115.0, -34.0], [129.0, -14.0], [142.0, -11.0], [153.5, -28.0], [146.0, -39.0], [115.0, -34.0],
    ]),
    line("India", "border", "A continent that walked. The Himalaya is the crumple.", [
      [68.2, 23.7], [72.8, 21.0], [80.3, 13.1], [80.2, 6.0], [88.4, 21.5], [97.4, 27.8], [78.0, 32.2], [68.2, 23.7],
    ]),
    line("Brazil", "border", "A tropical continent. The Amazon is a water and carbon store.", [
      [-51.0, 4.0], [-34.8, -7.0], [-39.0, -16.0], [-48.0, -28.0], [-53.5, -33.7], [-74.0, -7.0], [-60.0, 5.2], [-51.0, 4.0],
    ]),
  ],
};

/** Trenches: convergent slots. Ridges: divergent axes. Separate from plate polygons. */
export const TRENCHES: OverlayFC = {
  type: "FeatureCollection",
  features: PLATES.features.filter((f) => f.properties.kind === "convergent"),
};

export const RIDGES: OverlayFC = {
  type: "FeatureCollection",
  features: PLATES.features.filter((f) => f.properties.kind === "divergent"),
};

/** Short motion arrows at named plate edges — classroom schematic, not a GPS velocity field. */
export const PLATE_ARROWS: OverlayFC = {
  type: "FeatureCollection",
  features: [
    line("Pacific → trench (Japan)", "arrow", "Oceanic plate walks into a trench.", [
      [155, 34], [143, 35],
    ]),
    line("Nazca → Andes", "arrow", "Nazca dives. The Andes sit above the dive.", [
      [-88, -20], [-76, -20],
    ]),
    line("Away from MAR", "arrow", "New crust walks away from the ridge axis.", [
      [-28, 40], [-18, 40],
    ]),
    line("San Andreas slip", "arrow", "Pacific side slides northwest. A transform, not a trench.", [
      [-119.5, 34.2], [-122.2, 37.2],
    ]),
    line("India → Eurasia", "arrow", "A continent that still walks north.", [
      [80, 22], [82, 28],
    ]),
  ],
};

export const BASINS: OverlayFC = {
  type: "FeatureCollection",
  features: [
    line("Amazon basin divide (schematic)", "basin", "Largest discharge. A tropical store of water and carbon.", [
      [-74, 5], [-60, 5], [-50, 2], [-50, -12], [-70, -12], [-74, 5],
    ]),
    line("Nile corridor", "basin", "A desert with a river. Headwaters in the ITCZ, not a UK front.", [
      [30, 4], [33, 16], [32, 24], [31, 31],
    ]),
    line("Mississippi basin (schematic)", "basin", "Interior continent to a sinking delta.", [
      [-110, 48], [-82, 42], [-89, 29], [-95, 32], [-110, 48],
    ]),
    line("Yangtze corridor", "basin", "Monsoon load from the plateau to a drowning delta.", [
      [98, 28], [112, 31], [121, 31],
    ]),
    line("Ganges–Brahmaputra", "basin", "Collision-belt load. A delta the size of a country.", [
      [78, 30], [88, 26], [91, 22],
    ]),
    line("Congo basin (schematic)", "basin", "Equatorial rainforest. A carbon and water store.", [
      [12, 5], [28, 5], [28, -8], [12, -8], [12, 5],
    ]),
  ],
};

export const TEACHING_PRESETS: { name: string; lat: number; lon: number; zoom: number; note: string }[] = [
  { name: "Holderness", lat: 53.75, lon: -0.05, zoom: 9, note: "Till cliffs into the North Sea. Not chalk stacks." },
  { name: "Himalaya", lat: 28.0, lon: 86.9, zoom: 5, note: "Continent–continent. A crumple, not an arc." },
  { name: "Hawaii", lat: 19.6, lon: -155.5, zoom: 7, note: "Hotspot shields. Ages northwest." },
  { name: "Yellowstone", lat: 44.6, lon: -110.5, zoom: 7, note: "A continental hotspot. Geysers, not a trench." },
  { name: "San Andreas", lat: 36.0, lon: -120.5, zoom: 6, note: "A right-lateral transform. Not a volcanic arc." },
  { name: "Thingvellir", lat: 64.26, lon: -21.12, zoom: 8, note: "A ridge with a country on it." },
  { name: "Mississippi delta", lat: 29.2, lon: -89.2, zoom: 7, note: "A sinking bird-foot delta." },
  { name: "Grand Canyon", lat: 36.1, lon: -112.1, zoom: 8, note: "A river through stacked time." },
  { name: "Yosemite", lat: 37.74, lon: -119.6, zoom: 9, note: "A granite U-trough. Ice, not a young V." },
  { name: "Shanghai", lat: 31.23, lon: 121.47, zoom: 9, note: "A tidal river on a delta." },
  { name: "Hong Kong", lat: 22.3, lon: 114.17, zoom: 10, note: "Weathered granite, steep catchments." },
  { name: "Loess Plateau", lat: 36.6, lon: 109.2, zoom: 6, note: "Wind-laid silt, then water." },
  { name: "Cascadia", lat: 46.2, lon: -122.2, zoom: 6, note: "Trench plus an arc. St Helens sits here." },
  { name: "Mariana Trench", lat: 11.3, lon: 142.2, zoom: 5, note: "A convergent deep. Not a river canyon." },
  { name: "Greenwich", lat: 51.48, lon: 0.0, zoom: 8, note: "A political line on a spinning sphere." },
  { name: "Outer Banks", lat: 35.25, lon: -75.53, zoom: 8, note: "A sandy barrier, not a chalk cliff." },
  { name: "Jurassic Coast", lat: 50.62, lon: -2.27, zoom: 9, note: "Lias and limestone. Cave–arch–stack–stump." },
];

