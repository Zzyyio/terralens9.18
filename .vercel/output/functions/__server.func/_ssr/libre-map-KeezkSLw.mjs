import { i as __toESM } from "../_runtime.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/libre-map-KeezkSLw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GLYPHS = "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf";
function rasterStyle(id, tiles, attribution, maxzoom = 19) {
	return {
		version: 8,
		glyphs: GLYPHS,
		sources: { [id]: {
			type: "raster",
			tiles,
			tileSize: 256,
			attribution,
			maxzoom
		} },
		layers: [{
			id: "background",
			type: "background",
			paint: { "background-color": "#0e2a38" }
		}, {
			id,
			type: "raster",
			source: id
		}]
	};
}
var OSM_RASTER_STYLE = rasterStyle("osm", [
	"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
	"https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
	"https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
], "© OpenStreetMap contributors", 19);
var CARTO_VOYAGER_STYLE = rasterStyle("carto", [
	"https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
	"https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
	"https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
], "© OpenStreetMap contributors · CARTO", 20);
var OPEN_TOPO_TILES = [
	"https://a.tile.opentopomap.org/{z}/{x}/{y}.png",
	"https://b.tile.opentopomap.org/{z}/{x}/{y}.png",
	"https://c.tile.opentopomap.org/{z}/{x}/{y}.png"
];
var NATURAL_EARTH_STYLE = {
	version: 8,
	glyphs: GLYPHS,
	sources: { land: {
		type: "geojson",
		data: "/geo/ne_110m_land.geojson"
	} },
	layers: [
		{
			id: "background",
			type: "background",
			paint: { "background-color": "#0e2a38" }
		},
		{
			id: "land",
			type: "fill",
			source: "land",
			paint: {
				"fill-color": "#7C9A6A",
				"fill-opacity": .92
			}
		},
		{
			id: "land-line",
			type: "line",
			source: "land",
			paint: {
				"line-color": "#F4EFE6",
				"line-width": .8,
				"line-opacity": .85
			}
		}
	]
};
function attachStyleFallback(map, opts = {}) {
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
		} catch {}
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
	const onErr = (e) => {
		const msg = (e?.error?.message ?? "").toLowerCase();
		if (!((e?.error?.status ?? 0) >= 400 || /failed to fetch|load.*error|networkerror|webgl|source|403|429/i.test(msg))) return;
		if (start === "openfreemap" && !usedOsm) toOsm();
		else if (!usedCarto) toCarto();
		else toNe();
	};
	map.on("error", onErr);
	map.on("sourcedata", (e) => {
		if (e?.sourceDataType === "tile") sawTile = true;
	});
	map.on("load", () => {
		if (start === "openfreemap" && sawTile && !usedOsm) onBasemap?.("openfreemap");
		else if (usedOsm && !usedCarto) onBasemap?.("osm");
	});
	const t1 = window.setTimeout(() => {
		if (start === "openfreemap" && !sawTile) toOsm();
		else if (!map.loaded()) toCarto();
	}, 3e3);
	const t2 = window.setTimeout(() => {
		if (!sawTile && !usedCarto) toCarto();
	}, 7e3);
	const t3 = window.setTimeout(() => {
		if (!map.loaded() && !sawTile) toNe();
	}, 11e3);
	return () => {
		window.clearTimeout(t1);
		window.clearTimeout(t2);
		window.clearTimeout(t3);
	};
}
var CREDIT = {
	openfreemap: "OpenFreeMap vector · OpenStreetMap contributors",
	osm: "OpenStreetMap raster (fallback if vector tiles were silent)",
	carto: "OpenStreetMap data · CARTO Voyager (second fallback)",
	"natural-earth": "Natural Earth 110m land — offline fallback. Coastlines only."
};
function meridians() {
	const features = [];
	for (let lon = -180; lon <= 180; lon += 30) {
		const coordinates = [];
		for (let lat = -80; lat <= 80; lat += 5) coordinates.push([lon, lat]);
		features.push({
			type: "Feature",
			properties: { name: `${Math.abs(lon)}°${lon < 0 ? "W" : lon > 0 ? "E" : ""}` },
			geometry: {
				type: "LineString",
				coordinates
			}
		});
	}
	for (let lat = -60; lat <= 60; lat += 15) {
		const coordinates = [];
		for (let lon = -180; lon <= 180; lon += 5) coordinates.push([lon, lat]);
		features.push({
			type: "Feature",
			properties: { name: `${Math.abs(lat)}°${lat < 0 ? "S" : lat > 0 ? "N" : ""}` },
			geometry: {
				type: "LineString",
				coordinates
			}
		});
	}
	return {
		type: "FeatureCollection",
		features
	};
}
function paintCoast(canvas, fc) {
	const w = canvas.width;
	const h = canvas.height;
	const ctx = canvas.getContext("2d");
	if (!ctx || w < 4 || h < 4) return;
	ctx.fillStyle = "#0e2a38";
	ctx.fillRect(0, 0, w, h);
	const project = (lon, lat) => [(lon + 180) / 360 * w, (90 - lat) / 180 * h];
	ctx.fillStyle = "#7C9A6A";
	ctx.strokeStyle = "#F4EFE6";
	ctx.lineWidth = Math.max(.6, w / 900);
	const ring = (coords) => {
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
	const walk = (geom) => {
		if (geom.type === "Polygon") geom.coordinates.forEach(ring);
		else if (geom.type === "MultiPolygon") geom.coordinates.forEach((poly) => poly.forEach(ring));
	};
	for (const f of fc.features) walk(f.geometry);
}
function StaticCoast({ className, hidden }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		let cancelled = false;
		const draw = (fc) => {
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
		fetch("/geo/ne_110m_land.geojson").then((r) => r.json()).then((fc) => {
			if (cancelled) return;
			draw(fc);
			const ro = new ResizeObserver(() => draw(fc));
			if (el.parentElement) ro.observe(el.parentElement);
			el.__ro = ro;
		}).catch(() => void 0);
		return () => {
			cancelled = true;
			el.__ro?.disconnect();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className,
		"aria-hidden": hidden,
		style: {
			position: "absolute",
			inset: 0,
			opacity: hidden ? 0 : 1,
			pointerEvents: "none"
		}
	});
}
function applyOverlays(m, overlays, prev, graticule) {
	for (const id of prev) {
		if (id === "relief") continue;
		try {
			if (m.getLayer?.(`${id}-label`)) m.removeLayer?.(`${id}-label`);
			if (m.getLayer?.(id)) m.removeLayer?.(id);
			if (m.getSource(id)) m.removeSource?.(id);
		} catch {}
	}
	if (graticule) try {
		if (!m.getSource("graticule")) {
			m.addSource("graticule", {
				type: "geojson",
				data: meridians()
			});
			m.addLayer({
				id: "graticule",
				type: "line",
				source: "graticule",
				paint: {
					"line-color": "#F4EFE6",
					"line-width": .6,
					"line-opacity": .35
				}
			});
		}
	} catch {}
	else try {
		if (m.getLayer?.("graticule")) m.removeLayer?.("graticule");
		if (m.getSource("graticule")) m.removeSource?.("graticule");
	} catch {}
	for (const ov of overlays) {
		if (m.getSource(ov.id)) continue;
		try {
			m.addSource(ov.id, {
				type: "geojson",
				data: ov.data
			});
			if (ov.fill && ov.circle) m.addLayer({
				id: ov.id,
				type: "circle",
				source: ov.id,
				paint: {
					"circle-radius": [
						"interpolate",
						["linear"],
						["zoom"],
						2,
						22,
						5,
						52,
						8,
						90
					],
					"circle-color": ov.color,
					"circle-opacity": .22,
					"circle-stroke-color": ov.color,
					"circle-stroke-width": 2.2,
					"circle-stroke-opacity": .95
				}
			});
			else if (ov.plates) m.addLayer({
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
						"#FF6A3D"
					],
					"line-width": [
						"interpolate",
						["linear"],
						["zoom"],
						1,
						2.2,
						4,
						ov.width ?? 2.8,
						8,
						4.2
					]
				}
			});
			else if (ov.circle && ov.ranked) m.addLayer({
				id: ov.id,
				type: "circle",
				source: ov.id,
				paint: {
					"circle-radius": [
						"interpolate",
						["linear"],
						["zoom"],
						1,
						[
							"case",
							[
								"==",
								["get", "rank"],
								"capital"
							],
							4.5,
							0
						],
						3,
						[
							"case",
							[
								"==",
								["get", "rank"],
								"capital"
							],
							5.5,
							3.5
						],
						6,
						7
					],
					"circle-color": ov.color,
					"circle-stroke-color": "#07090C",
					"circle-stroke-width": 1,
					"circle-opacity": [
						"interpolate",
						["linear"],
						["zoom"],
						1,
						[
							"case",
							[
								"==",
								["get", "rank"],
								"capital"
							],
							1,
							0
						],
						2.4,
						1
					]
				}
			});
			else if (ov.circle) m.addLayer({
				id: ov.id,
				type: "circle",
				source: ov.id,
				paint: {
					"circle-radius": [
						"interpolate",
						["linear"],
						["zoom"],
						1,
						7,
						4,
						11
					],
					"circle-color": [
						"coalesce",
						["get", "color"],
						ov.color
					],
					"circle-stroke-color": "#07090C",
					"circle-stroke-width": 1.2
				}
			});
			else m.addLayer({
				id: ov.id,
				type: "line",
				source: ov.id,
				paint: {
					"line-color": ov.color,
					"line-width": [
						"interpolate",
						["linear"],
						["zoom"],
						1,
						1.4,
						4,
						ov.width ?? 2.2,
						8,
						3.6
					]
				}
			});
			if (ov.labels !== false && !ov.fill) try {
				m.addLayer({
					id: `${ov.id}-label`,
					type: "symbol",
					source: ov.id,
					layout: {
						"text-field": ov.circle ? [
							"coalesce",
							["get", "letter"],
							["get", "name"]
						] : ["get", "name"],
						"text-size": [
							"interpolate",
							["linear"],
							["zoom"],
							1,
							10,
							6,
							13
						],
						"text-font": ["Noto Sans Regular"],
						"text-offset": ov.circle ? [0, 1.05] : [0, 0],
						"text-anchor": ov.circle ? "top" : "center",
						"symbol-placement": ov.circle ? "point" : "line",
						"text-max-angle": 30,
						"text-optional": true
					},
					paint: {
						"text-color": "#F4EFE6",
						"text-halo-color": "#07090C",
						"text-halo-width": 1.35
					}
				});
			} catch {}
		} catch {}
	}
}
function setReliefLayer(m, on) {
	try {
		if (on) {
			if (!m.getSource("relief")) m.addSource("relief", {
				type: "raster",
				tiles: OPEN_TOPO_TILES,
				tileSize: 256,
				maxzoom: 17,
				attribution: "© OpenStreetMap contributors, SRTM · OpenTopoMap (CC-BY-SA)"
			});
			if (!m.getLayer?.("relief")) {
				const before = m.getLayer?.("graticule") ? "graticule" : void 0;
				m.addLayer({
					id: "relief",
					type: "raster",
					source: "relief",
					paint: { "raster-opacity": .9 }
				}, before);
			}
		} else {
			if (m.getLayer?.("relief")) m.removeLayer?.("relief");
			if (m.getSource("relief")) m.removeSource?.("relief");
		}
	} catch {}
}
function LibreMap({ center, zoom = 3, styleUrl, relief = false, overlays = [], marker, onClick, onFeature, className = "h-[28rem] w-full overflow-hidden rounded-2xl border border-white/10 bg-trench", label, graticule = false, draggableMarker = false }) {
	const ref = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const markerRef = (0, import_react.useRef)(null);
	const clickRef = (0, import_react.useRef)(onClick);
	clickRef.current = onClick;
	const featRef = (0, import_react.useRef)(onFeature);
	featRef.current = onFeature;
	const overlayKey = overlays.map((o) => o.id).join("|") + (graticule ? "|g" : "");
	const overlaysRef = (0, import_react.useRef)(overlays);
	overlaysRef.current = overlays;
	const overlayIdsRef = (0, import_react.useRef)([]);
	const graticuleRef = (0, import_react.useRef)(graticule);
	graticuleRef.current = graticule;
	const reliefRef = (0, import_react.useRef)(relief);
	reliefRef.current = relief;
	const [basemap, setBasemap] = (0, import_react.useState)(null);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		let detach = () => void 0;
		const el = ref.current;
		if (!el) return;
		(async () => {
			try {
				const maplibregl = await import("../_libs/maplibre-gl.mjs").then((n) => n.t);
				await Promise.resolve({});
				if (cancelled || !el) return;
				try {
					maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
				} catch {}
				const startVector = !styleUrl;
				const style = styleUrl ?? "https://tiles.openfreemap.org/styles/fiord";
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
					pitchWithRotate: false
				});
				m.addControl(new maplibregl.NavigationControl({
					showCompass: false,
					visualizePitch: false
				}), "top-right");
				m.addControl(new maplibregl.ScaleControl({
					maxWidth: 140,
					unit: "metric"
				}), "bottom-right");
				detach = attachStyleFallback(m, {
					relief: false,
					start: startVector ? "openfreemap" : "osm",
					onBasemap: (b) => {
						if (cancelled) return;
						setBasemap(b);
						if (b === "natural-earth") setFailed(true);
					}
				});
				const syncOverlays = () => {
					const next = overlaysRef.current;
					applyOverlays(m, next, overlayIdsRef.current, graticuleRef.current);
					overlayIdsRef.current = next.map((o) => o.id).concat(graticuleRef.current ? ["graticule"] : []);
					next.forEach((o) => {
						if (o.labels !== false && !o.fill) overlayIdsRef.current.push(`${o.id}-label`);
					});
					setReliefLayer(m, reliefRef.current);
				};
				m.on("load", () => {
					m.resize();
					setReady(true);
					syncOverlays();
				});
				m.on("style.load", syncOverlays);
				m.on("click", (e) => {
					const layers = overlaysRef.current.map((o) => o.id);
					const props = (layers.length && m.queryRenderedFeatures ? m.queryRenderedFeatures(e.point, { layers }) : [])[0]?.properties;
					if (props?.name || props?.title) {
						featRef.current?.({
							title: props.title || props.name,
							note: props.note || "",
							kind: props.kind || "",
							lat: e.lngLat.lat,
							lon: e.lngLat.lng
						});
						try {
							new maplibregl.Popup({
								closeButton: true,
								maxWidth: "240px",
								className: "tl-popup"
							}).setLngLat(e.lngLat).setHTML(`<p style="font:500 13px Geist,sans-serif;margin:0 0 4px;color:#F4EFE6">${props.title || props.name}</p>
                   <p style="font:400 12px Geist,sans-serif;margin:0;color:#C4D0CC">${props.note || props.kind || ""}</p>`).addTo(m);
						} catch {}
					}
					clickRef.current?.({
						lat: e.lngLat.lat,
						lon: e.lngLat.lng
					});
				});
				if (clickRef.current) m.getCanvas().style.cursor = "crosshair";
				mapRef.current = m;
				if (marker) {
					const mk = new maplibregl.Marker({
						color: "#3EE0C6",
						draggable: draggableMarker
					}).setLngLat(marker).addTo(m);
					if (draggableMarker) mk.on("dragend", () => {
						const ll = mk.getLngLat();
						clickRef.current?.({
							lat: ll.lat,
							lon: ll.lng
						});
					});
					markerRef.current = mk;
				}
				const onKey = (ev) => {
					if (ev.target instanceof HTMLInputElement || ev.target instanceof HTMLTextAreaElement) return;
					if (ev.key === "+" || ev.key === "=") m.zoomIn();
					if (ev.key === "-" || ev.key === "_") m.zoomOut();
				};
				window.addEventListener("keydown", onKey);
				const ro = new ResizeObserver(() => m.resize());
				ro.observe(el);
				const tResize = [
					50,
					250,
					800
				].map((ms) => window.setTimeout(() => m.resize(), ms));
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
			mapRef.current?.remove();
			mapRef.current = null;
			overlayIdsRef.current = [];
		};
	}, [styleUrl, draggableMarker]);
	(0, import_react.useEffect)(() => {
		const m = mapRef.current;
		if (!m) return;
		applyOverlays(m, overlays, overlayIdsRef.current, graticule);
		overlayIdsRef.current = overlays.map((o) => o.id).concat(graticule ? ["graticule"] : []);
		overlays.forEach((o) => {
			if (o.labels !== false && !o.fill) overlayIdsRef.current.push(`${o.id}-label`);
		});
		setReliefLayer(m, relief);
	}, [
		overlayKey,
		graticule,
		relief
	]);
	(0, import_react.useEffect)(() => {
		mapRef.current?.flyTo({
			center,
			zoom,
			essential: true
		});
	}, [
		center[0],
		center[1],
		zoom
	]);
	(0, import_react.useEffect)(() => {
		if (!marker || !markerRef.current) return;
		markerRef.current.setLngLat(marker);
	}, [marker?.[0], marker?.[1]]);
	const credit = relief && basemap && basemap !== "natural-earth" ? `${CREDIT[basemap]} · OpenTopoMap relief overlay` : basemap ? CREDIT[basemap] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative min-h-[16rem] ${className}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaticCoast, {
					className: "h-full w-full",
					hidden: ready && !failed
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref,
					className: "absolute inset-0 h-full w-full min-h-[16rem]",
					role: "img",
					"aria-label": label ?? "Map"
				})]
			}),
			credit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute bottom-8 left-2 right-28 rounded-full border border-white/10 bg-basalt/85 px-3 py-1 font-mono text-[10px] text-mist backdrop-blur-md md:bottom-2",
				children: credit
			}),
			failed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-sandstone",
				children: "Online tiles did not load. Showing Natural Earth coastlines so the map is still usable. Pan, pinch, double-click zoom, and keyboard +/− still work. Overlays still draw."
			})
		]
	});
}
//#endregion
export { LibreMap as t };
