import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as fmtLatLon } from "./geo-BTPpCsbm.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as atlasGeo, o as nearestAtlasPlace, r as atlasKindLabel, t as ATLAS } from "./atlas-data-DbTVdyCc.mjs";
import { t as LibreMap } from "./libre-map-KeezkSLw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools.map-DXBCSksw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function line(name, kind, note, coordinates) {
	return {
		type: "Feature",
		properties: {
			name,
			kind,
			note,
			title: name
		},
		geometry: {
			type: "LineString",
			coordinates
		}
	};
}
function point(name, kind, note, lon, lat, extra = {}) {
	return {
		type: "Feature",
		properties: {
			name,
			kind,
			note,
			title: name,
			...extra
		},
		geometry: {
			type: "Point",
			coordinates: [lon, lat]
		}
	};
}
/** Divergent cyan, convergent magma, transform sandstone. */
var PLATES = {
	type: "FeatureCollection",
	features: [
		line("Mid-Atlantic Ridge", "divergent", "Divergent: new crust, a ridge, sometimes a country (Iceland).", [
			[-18, 66],
			[-30, 52],
			[-32, 40],
			[-28, 20],
			[-14, 0],
			[0, -20],
			[10, -40],
			[8, -54]
		]),
		line("East Pacific Rise", "divergent", "Divergent: fast spreading. New ocean floor walks away from the axis.", [
			[-110, 10],
			[-105, 0],
			[-112, -20],
			[-112, -40],
			[-90, -55]
		]),
		line("East African Rift", "divergent", "Divergent: a continent splitting. Kenya sits on the split.", [
			[36, 14],
			[36, 4],
			[35, -3],
			[34, -10]
		]),
		line("Cascadia trench", "convergent", "Convergent: ocean plate dives. Trench, megathrust, volcanic arc.", [
			[-128, 50],
			[-124, 40],
			[-124, 32]
		]),
		line("Andes trench", "convergent", "Convergent: Nazca dives under South America. Trench plus a volcanic cordillera.", [
			[-80, 8],
			[-78, 0],
			[-76, -18],
			[-74, -30],
			[-74, -42]
		]),
		line("Japan–Kuril trench", "convergent", "Convergent: Pacific plate dives. Island arc, deep earthquakes, tsunami risk.", [
			[145, 44],
			[144, 40],
			[142, 35],
			[141, 30]
		]),
		line("Sunda trench", "convergent", "Convergent: Indo-Australian plate dives under Indonesia. Arc volcanoes.", [
			[95, 6],
			[100, 0],
			[105, -8],
			[118, -10],
			[130, -8]
		]),
		line("Himalaya collision", "convergent", "Convergent: continent–continent. Mountains, a root, no ocean trench here.", [
			[72, 35],
			[78, 32],
			[86, 28],
			[95, 28]
		]),
		line("Tonga–Kermadec", "convergent", "Convergent: a deep trench. The seafloor is consumed.", [
			[-174, -14],
			[-175, -21],
			[-178, -28],
			[-178, -36]
		]),
		line("San Andreas", "transform", "Transform: plates slide. Earthquakes, no volcanic arc.", [
			[-124.4, 40.3],
			[-122.4, 37.8],
			[-118.2, 34],
			[-116.5, 32.7]
		]),
		line("Alpine Fault, NZ", "transform", "Transform: a slide that also lifts the Southern Alps.", [
			[166.5, -46],
			[170, -44],
			[172.8, -42],
			[174.5, -41]
		]),
		line("North Anatolian Fault", "transform", "Transform: a slide through Türkiye. Earthquakes, not a volcanic chain.", [
			[26, 40.2],
			[30, 40.6],
			[36, 40.8],
			[40, 40.9]
		]),
		line("Aleutian trench", "convergent", "Convergent: Pacific dives. A volcanic arc, not Florida ice.", [
			[-167, 53],
			[-160, 54],
			[-152, 54]
		]),
		line("Caribbean plate edge", "transform", "Transform plus a small subduction bite. Haiti’s earthquakes live here.", [
			[-84, 16],
			[-76, 18],
			[-70, 19],
			[-62, 15]
		])
	]
};
var RIVERS = {
	type: "FeatureCollection",
	features: [
		line("Amazon", "river", "Largest discharge on Earth. A tropical basin, not a UK floodplain.", [
			[-73, -4],
			[-70, -4],
			[-60, -3],
			[-55, -2],
			[-50, -1.5],
			[-49, 0]
		]),
		line("Nile", "river", "A desert with a river. Seasonal ITCZ headwaters, not a glacial melt pulse.", [
			[32.5, 15],
			[32.5, 22],
			[31.8, 26],
			[31.2, 30]
		]),
		line("Mississippi", "river", "Interior continent to a sinking delta. Levées as national policy.", [
			[-93, 45],
			[-91, 38],
			[-90, 35],
			[-91, 30],
			[-89.2, 29.2]
		]),
		line("Yangtze", "river", "Monsoon load from the plateau to a drowning delta.", [
			[100, 28],
			[105, 30],
			[112, 30.5],
			[118, 32],
			[121, 31.3]
		]),
		line("Congo", "river", "Equatorial rainforest basin. A store of water and carbon.", [
			[25, 0],
			[18, -2],
			[16, -4],
			[12.5, -6]
		]),
		line("Danube", "river", "A European collector from the Alps to a Black Sea delta.", [
			[10, 48.2],
			[16.4, 48.2],
			[20, 47],
			[26, 44.2],
			[29.6, 45.2]
		]),
		line("Ganges–Brahmaputra", "river", "Collision-belt load. The monsoon plus a delta the size of a country.", [
			[78, 29],
			[82, 26],
			[88, 24],
			[90.5, 22]
		]),
		line("Murray–Darling", "river", "An old, dry continent. Discharge is a drought story.", [
			[147, -36],
			[144, -35],
			[141, -34],
			[139, -35.5]
		]),
		line("Rhine", "river", "Alpine melt to a North Sea delta. Levées as policy.", [
			[8, 46.6],
			[7.6, 48],
			[8.4, 50],
			[6.1, 52],
			[4.2, 51.9]
		]),
		line("Colorado", "river", "A plateau river in a rain-shadow. Canyons, not a glacial U.", [
			[-111.5, 40],
			[-111.6, 36.9],
			[-114.7, 36],
			[-114.6, 32.7]
		]),
		line("Thames", "river", "A drowned estuary more than a delta. Tides write the mouth.", [
			[-.6, 51.4],
			[.1, 51.48],
			[.7, 51.45]
		]),
		line("Mekong", "river", "A monsoon collector. Flood pulse writes the delta.", [
			[100, 20],
			[104, 16],
			[105, 12],
			[106.5, 10]
		]),
		line("Indus", "river", "A collision-belt river through a rain-shadow. Irrigation is the hydrograph.", [
			[75, 35],
			[73, 32],
			[70, 28],
			[67.5, 24]
		]),
		line("Volga", "river", "A continental interior collector to a closed sea.", [
			[37, 56],
			[44, 52],
			[48, 48],
			[49, 46]
		]),
		line("Mackenzie", "river", "A north-flowing Arctic river. Ice, not a monsoon, writes the year.", [
			[-125, 60],
			[-128, 64],
			[-134, 68],
			[-135, 69]
		]),
		line("Orinoco", "river", "A tropical collector east of the Andes.", [
			[-70, 5],
			[-66, 7],
			[-62, 8],
			[-60, 9]
		]),
		line("Yellow River", "river", "Loess load. The channel sits above its plain.", [
			[110, 35],
			[114, 35],
			[118, 37.7]
		])
	]
};
var SETTLEMENTS = {
	type: "FeatureCollection",
	features: [
		[
			"London",
			51.51,
			-.13,
			"capital",
			"Drowned shelf, North Atlantic fetch, a till coast east."
		],
		[
			"Paris",
			48.86,
			2.35,
			"capital",
			"Temperate west-coast climate inland of a drowned shelf."
		],
		[
			"Berlin",
			52.52,
			13.41,
			"capital",
			"North European Plain. Ice wrote the ground."
		],
		[
			"Rome",
			41.9,
			12.5,
			"capital",
			"A colliding boot: volcanoes on a subduction story."
		],
		[
			"Cairo",
			30.04,
			31.24,
			"capital",
			"A desert with a river."
		],
		[
			"Nairobi",
			-1.29,
			36.82,
			"capital",
			"Equator on a rift. ITCZ rains, not seasons of tilt."
		],
		[
			"Cape Town",
			-33.92,
			18.42,
			"city",
			"Winter-rain Cape beside a cold current."
		],
		[
			"Lagos",
			6.45,
			3.4,
			"city",
			"ITCZ coast. Wet south of a drier Sahel."
		],
		[
			"New York",
			40.71,
			-74.01,
			"city",
			"A drowned glacial harbour. A midlatitude west-coast cousin, not tropical."
		],
		[
			"Washington, D.C.",
			38.91,
			-77.04,
			"capital",
			"Fall line between piedmont and coastal plain."
		],
		[
			"Mexico City",
			19.43,
			-99.13,
			"capital",
			"A volcanic high. Height writes the air."
		],
		[
			"São Paulo",
			-23.55,
			-46.63,
			"city",
			"Brazilian plateau edge, not Amazonia."
		],
		[
			"Buenos Aires",
			-34.6,
			-58.38,
			"capital",
			"Humid Pampas. Andes rain-shadow is inland."
		],
		[
			"Lima",
			-12.05,
			-77.04,
			"capital",
			"Humboldt current: a desert coast beside a cold sea."
		],
		[
			"Tokyo",
			35.68,
			139.69,
			"capital",
			"Arc volcanoes on a subduction hinge."
		],
		[
			"Beijing",
			39.9,
			116.4,
			"capital",
			"A monsoon east, a dry west behind it."
		],
		[
			"New Delhi",
			28.61,
			77.21,
			"capital",
			"A continent that walked north; the Himalaya are the crumple."
		],
		[
			"Jakarta",
			-6.21,
			106.85,
			"capital",
			"A warm-pool island arc."
		],
		[
			"Sydney",
			-33.87,
			151.21,
			"city",
			"Temperate east coast of an old, dry shield."
		],
		[
			"Canberra",
			-35.28,
			149.13,
			"capital",
			"Interior of a temperate east-coast belt."
		],
		[
			"Wellington",
			-41.29,
			174.78,
			"capital",
			"A plate boundary with alps and a westerly fetch."
		],
		[
			"Reykjavík",
			64.15,
			-21.94,
			"capital",
			"A ridge with a country on it."
		],
		[
			"Kathmandu",
			27.72,
			85.32,
			"capital",
			"The Himalaya wedge. Continent–continent convergence."
		],
		[
			"San Francisco",
			37.77,
			-122.42,
			"city",
			"Transform plus fog. San Andreas is a slide, not an arc."
		],
		[
			"Honolulu",
			21.31,
			-157.86,
			"city",
			"Hotspot island. Ages northwest along the chain."
		],
		[
			"Moscow",
			55.76,
			37.62,
			"capital",
			"Continental interior. Mercator lies about its size."
		],
		[
			"Singapore",
			1.35,
			103.82,
			"city",
			"Almost on the equator. Day length barely moves."
		],
		[
			"Mumbai",
			19.08,
			72.88,
			"city",
			"Monsoon west coast of the Indian plate."
		]
	].map(([name, lat, lon, rank, note]) => point(name, "settlement", note, lon, lat, { rank }))
};
var KOPPEN = {
	type: "FeatureCollection",
	features: [
		point("Af rainforest", "koppen", "A tropical: no real winter. Rain every month. Amazon sample.", -60, -3, {
			letter: "A",
			color: "#2d8a4e"
		}),
		point("Aw savanna", "koppen", "A tropical: a real dry season. ITCZ walks away.", 8, 12, {
			letter: "A",
			color: "#7C9A6A"
		}),
		point("BWh hot desert", "koppen", "B dry: evaporation beats rain. Sahara sample.", 10, 23, {
			letter: "B",
			color: "#E8B86D"
		}),
		point("BWk cold desert", "koppen", "B dry: rain-shadow or continentality. Central Asia sample.", 65, 42, {
			letter: "B",
			color: "#c4a574"
		}),
		point("Cfb London", "koppen", "C temperate: no dry season, warm summer. UK default.", 0, 51.5, {
			letter: "C",
			color: "#3EE0C6"
		}),
		point("Cfa humid subtropical", "koppen", "C temperate: hot summer. SE United States sample.", -85, 32, {
			letter: "C",
			color: "#7FD4FF"
		}),
		point("Csa Mediterranean", "koppen", "C temperate: dry summer. Not a UK year.", 15, 37, {
			letter: "C",
			color: "#E8B86D"
		}),
		point("Dfa continental", "koppen", "D continental: hot summer, hard winter. Great Plains sample.", -95, 45, {
			letter: "D",
			color: "#6aa0c8"
		}),
		point("Dfc subarctic", "koppen", "D continental: short cool summer. Boreal sample.", 28, 64, {
			letter: "D",
			color: "#4a6a88"
		}),
		point("ET tundra", "koppen", "E polar: plants as a slow thermometer. Greenland fringe.", -50, 70, {
			letter: "E",
			color: "#d5eaf4"
		}),
		point("EF ice cap", "koppen", "E polar: the ice is the climate. Interior ice sheet.", 0, -80, {
			letter: "E",
			color: "#F4EFE6"
		})
	]
};
var SEARCH_POI = [
	{
		name: "Himalaya",
		lat: 28,
		lon: 86,
		zoom: 5,
		note: "Continent–continent convergence."
	},
	{
		name: "Andes",
		lat: -20,
		lon: -70,
		zoom: 4,
		note: "Trench plus a volcanic cordillera."
	},
	{
		name: "Alps",
		lat: 46.5,
		lon: 10,
		zoom: 6,
		note: "Collision mountains, U-troughs."
	},
	{
		name: "Rockies",
		lat: 40,
		lon: -110,
		zoom: 4,
		note: "A high dry interior range."
	},
	{
		name: "Tibetan Plateau",
		lat: 32,
		lon: 88,
		zoom: 4,
		note: "The crumpled roof. Relief is the point."
	},
	{
		name: "Mariana Trench",
		lat: 11.3,
		lon: 142.2,
		zoom: 5,
		note: "A convergent deep. Relief, not a river canyon."
	},
	{
		name: "Mid-Atlantic Ridge",
		lat: 30,
		lon: -40,
		zoom: 3,
		note: "Divergent: new crust."
	},
	{
		name: "East African Rift",
		lat: .5,
		lon: 36,
		zoom: 5,
		note: "A continent splitting."
	},
	{
		name: "Amazon",
		lat: -3,
		lon: -60,
		zoom: 4,
		note: "Largest discharge on Earth."
	},
	{
		name: "Nile",
		lat: 26,
		lon: 32,
		zoom: 5,
		note: "A desert with a river."
	},
	{
		name: "Mississippi",
		lat: 32,
		lon: -91,
		zoom: 5,
		note: "Interior continent to a sinking delta."
	},
	{
		name: "San Andreas",
		lat: 36,
		lon: -120.5,
		zoom: 6,
		note: "Transform slide. Not a volcanic arc."
	},
	{
		name: "Iceland",
		lat: 65,
		lon: -19,
		zoom: 5,
		note: "A ridge with a country on it."
	},
	{
		name: "Holderness",
		lat: 53.75,
		lon: -.05,
		zoom: 8,
		note: "Till cliffs and Spurn Head."
	}
];
var PLATE_LEGEND = [
	{
		kind: "divergent",
		color: "#3EE0C6",
		label: "Divergent",
		note: "Ridge or rift. New crust."
	},
	{
		kind: "convergent",
		color: "#FF6A3D",
		label: "Convergent",
		note: "Trench, arc, or collision mountains."
	},
	{
		kind: "transform",
		color: "#E8B86D",
		label: "Transform",
		note: "A slide. Earthquakes, not a volcanic arc."
	}
];
var PRESETS = [
	{
		name: "London",
		lat: 51.51,
		lon: -.13,
		zoom: 6
	},
	{
		name: "New York",
		lat: 40.71,
		lon: -74.01,
		zoom: 6
	},
	{
		name: "Nairobi",
		lat: -1.29,
		lon: 36.82,
		zoom: 6
	},
	{
		name: "Sydney",
		lat: -33.87,
		lon: 151.21,
		zoom: 6
	},
	{
		name: "Tokyo",
		lat: 35.68,
		lon: 139.69,
		zoom: 6
	},
	{
		name: "Reykjavík",
		lat: 64.15,
		lon: -21.94,
		zoom: 6
	},
	{
		name: "Kathmandu",
		lat: 27.72,
		lon: 85.32,
		zoom: 6
	},
	{
		name: "San Francisco",
		lat: 37.77,
		lon: -122.42,
		zoom: 7
	}
];
function MapStudio() {
	const [relief, setRelief] = (0, import_react.useState)(false);
	const [rivers, setRivers] = (0, import_react.useState)(true);
	const [settlements, setSettlements] = (0, import_react.useState)(true);
	const [plates, setPlates] = (0, import_react.useState)(true);
	const [climate, setClimate] = (0, import_react.useState)(false);
	const [graticule, setGraticule] = (0, import_react.useState)(false);
	const [center, setCenter] = (0, import_react.useState)([10, 20]);
	const [zoom, setZoom] = (0, import_react.useState)(2);
	const [q, setQ] = (0, import_react.useState)("");
	const [hit, setHit] = (0, import_react.useState)(null);
	const [land, setLand] = (0, import_react.useState)(null);
	const overlays = (0, import_react.useMemo)(() => {
		const o = [];
		if (rivers) o.push({
			id: "rivers",
			data: RIVERS,
			color: "#7FD4FF",
			width: 2.2
		});
		if (plates) o.push({
			id: "plates",
			data: PLATES,
			color: "#FF6A3D",
			width: 2.8,
			plates: true
		});
		if (settlements) o.push({
			id: "towns",
			data: SETTLEMENTS,
			color: "#E8B86D",
			circle: true,
			ranked: true
		});
		if (climate) o.push({
			id: "koppen",
			data: KOPPEN,
			color: "#3EE0C6",
			circle: true
		});
		return o;
	}, [
		rivers,
		settlements,
		plates,
		climate
	]);
	const searchHits = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		if (needle.length < 2) return [];
		const fromAtlas = ATLAS.filter((p) => `${p.name} ${p.capital} ${p.hook} ${(p.alias ?? []).join(" ")}`.toLowerCase().includes(needle)).slice(0, 6);
		return [...SEARCH_POI.filter((p) => p.name.toLowerCase().includes(needle)).map((p) => ({
			name: p.name,
			lat: p.lat,
			lon: p.lon,
			zoom: p.zoom,
			note: p.note
		})), ...fromAtlas.map((p) => ({
			name: `${p.name} · ${p.capital}`,
			lat: p.lat,
			lon: p.lon,
			zoom: p.kind === "country" ? 4 : 7,
			note: p.hook
		}))].slice(0, 8);
	}, [q]);
	function go(lat, lon, z = 5, name = "", note = "") {
		setCenter([lon, lat]);
		setZoom(z);
		const near = nearestAtlasPlace(lat, lon, 4);
		setLand({
			lat,
			lon,
			name: name || near?.name || "Dropped point",
			notes: note ? [note] : near ? atlasGeo(near) : ["Click land for a country, or an overlay for a river, plate, or climate sample."],
			kind: near ? atlasKindLabel(near.kind) : "Locator"
		});
		setHit(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[1180px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Tools"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: "World map studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-mist",
				children: "A readable world map for class. OpenFreeMap vector when it answers; OpenStreetMap raster if it does not; Natural Earth coastlines if both are silent. Overlays are simplified for class, not a GIS desk. No Google."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-mist",
				children: [
					"Also:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/tools/live-weather",
						className: "text-ice hover:underline",
						children: "Live weather"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/atlas",
						className: "text-ice hover:underline",
						children: "Atlas"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: relief,
						set: setRelief,
						label: "Relief basemap"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: rivers,
						set: setRivers,
						label: "Rivers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: settlements,
						set: setSettlements,
						label: "Settlements"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: plates,
						set: setPlates,
						label: "Plate boundaries"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: climate,
						set: setClimate,
						label: "Köppen samples"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: graticule,
						set: setGraticule,
						label: "Graticule"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setCenter([10, 20]);
							setZoom(2);
							setHit(null);
							setLand(null);
						},
						className: "h-9 rounded-full border border-white/10 px-3.5 text-sm text-mist hover:text-chalk",
						children: "Reset view"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => go(p.lat, p.lon, p.zoom, p.name, ""),
					className: "h-9 rounded-full border border-white/10 bg-white/6 px-3 text-sm text-chalk hover:bg-white/10",
					children: p.name
				}, p.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative mt-4 block max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Search places"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Country, capital, Himalaya, Amazon, San Andreas…",
						className: "h-11 w-full rounded-[12px] border border-white/10 bg-white/6 px-3 text-chalk placeholder:text-mist/70",
						suppressHydrationWarning: true
					}),
					searchHits.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "absolute z-20 mt-1 w-full overflow-hidden rounded-2xl border border-white/10 bg-basalt/95 shadow-2xl",
						children: searchHits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "block w-full px-3 py-2.5 text-left text-sm text-chalk hover:bg-white/8",
							onClick: () => {
								go(h.lat, h.lon, h.zoom, h.name, h.note);
								setQ("");
							},
							children: h.name
						}) }, `${h.name}-${h.lat}`))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibreMap, {
					center,
					zoom,
					relief,
					overlays,
					graticule,
					onFeature: (f) => {
						setHit(f);
						setLand({
							lat: f.lat,
							lon: f.lon,
							name: f.title,
							notes: [f.note],
							kind: f.kind || "Overlay"
						});
					},
					onClick: (c) => {
						const near = nearestAtlasPlace(c.lat, c.lon);
						setLand({
							lat: c.lat,
							lon: c.lon,
							name: near ? near.name : "Dropped point",
							notes: near ? atlasGeo(near) : ["No named place within ~400 km. Read the overlays."],
							kind: near ? atlasKindLabel(near.kind) : "Locator"
						});
					},
					className: "h-[min(72vh,42rem)] w-full overflow-hidden rounded-2xl border border-white/10 bg-trench",
					label: "World map studio"
				})
			}),
			plates && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 flex flex-wrap gap-3 font-mono text-[11px] text-mist",
				children: PLATE_LEGEND.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "inline-flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block h-1.5 w-8 rounded-full",
							style: { background: l.color }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-chalk",
							children: l.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.note })
					]
				}, l.kind))
			}),
			climate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-mist",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-chalk",
						children: "A"
					}), " tropical — no real winter"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-chalk",
						children: "B"
					}), " dry — evaporation beats rain"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-chalk",
						children: "C"
					}), " temperate — mild winter"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-chalk",
						children: "D"
					}), " continental — hard winter"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-chalk",
						children: "E"
					}), " polar — too cold for trees"] })
				]
			}),
			land && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.14em] text-glacier",
						children: hit?.kind || land.kind
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl text-chalk",
						children: land.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-sm text-ice",
						children: fmtLatLon(land.lat, land.lon, 2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-2 leading-7 text-chalk/90",
						children: land.notes.filter(Boolean).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: n }, n.slice(0, 48)))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-[11px] text-mist",
				children: "Natural Earth positions. Overlays simplified for class. OpenFreeMap / OSM / OpenTopoMap. Pan, pinch, double-click zoom, keyboard +/−. Scale bar is metric."
			})
		]
	});
}
function Toggle({ on, set, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => set(!on),
		className: cn("h-9 rounded-full border px-3.5 text-sm", on ? "border-glacier/40 bg-glacier/15 text-glacier" : "border-white/10 text-mist hover:text-chalk"),
		children: label
	});
}
//#endregion
export { MapStudio as component };
