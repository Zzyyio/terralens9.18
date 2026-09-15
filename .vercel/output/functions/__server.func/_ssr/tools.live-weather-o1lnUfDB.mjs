import { i as __toESM } from "../_runtime.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as fmtLatLon } from "./geo-BTPpCsbm.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as nearestAtlasPlace } from "./atlas-data-DbTVdyCc.mjs";
import { t as LibreMap } from "./libre-map-KeezkSLw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools.live-weather-o1lnUfDB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WMO = {
	0: "Clear sky",
	1: "Mainly clear",
	2: "Partly cloudy",
	3: "Overcast",
	45: "Fog",
	48: "Depositing rime fog",
	51: "Light drizzle",
	53: "Drizzle",
	55: "Dense drizzle",
	61: "Light rain",
	63: "Rain",
	65: "Heavy rain",
	71: "Light snow",
	73: "Snow",
	75: "Heavy snow",
	80: "Rain showers",
	81: "Rain showers",
	82: "Violent rain showers",
	95: "Thunderstorm",
	96: "Thunderstorm with hail",
	99: "Thunderstorm with hail"
};
function compass(deg) {
	return [
		"N",
		"NNE",
		"NE",
		"ENE",
		"E",
		"ESE",
		"SE",
		"SSE",
		"S",
		"SSW",
		"SW",
		"WSW",
		"W",
		"WNW",
		"NW",
		"NNW"
	][Math.round((deg % 360 + 360) % 360 / 22.5) % 16];
}
function wmo(code) {
	return WMO[code] ?? `Weather code ${code}`;
}
var PRESETS = [
	{
		name: "London",
		lat: 51.51,
		lon: -.13
	},
	{
		name: "New York",
		lat: 40.71,
		lon: -74.01
	},
	{
		name: "Nairobi",
		lat: -1.29,
		lon: 36.82
	},
	{
		name: "Sydney",
		lat: -33.87,
		lon: 151.21
	},
	{
		name: "Tokyo",
		lat: 35.68,
		lon: 139.69
	},
	{
		name: "Reykjavík",
		lat: 64.15,
		lon: -21.94
	},
	{
		name: "Cairo",
		lat: 30.04,
		lon: 31.24
	},
	{
		name: "São Paulo",
		lat: -23.55,
		lon: -46.63
	}
];
/** Used only when Open-Meteo 429s. Round, labelled, not a forecast. */
var SAMPLE = {
	London: {
		temperature: 14,
		apparent: 12,
		wind: 3.5,
		windDir: 240,
		precip: .2,
		cloud: 70,
		humidity: 78,
		code: 3,
		time: "classroom sample",
		sample: true
	},
	"New York": {
		temperature: 18,
		apparent: 17,
		wind: 4,
		windDir: 210,
		precip: 0,
		cloud: 40,
		humidity: 62,
		code: 2,
		time: "classroom sample",
		sample: true
	},
	Nairobi: {
		temperature: 22,
		apparent: 21,
		wind: 2.5,
		windDir: 90,
		precip: 0,
		cloud: 25,
		humidity: 55,
		code: 1,
		time: "classroom sample",
		sample: true
	},
	Sydney: {
		temperature: 17,
		apparent: 16,
		wind: 5,
		windDir: 180,
		precip: .4,
		cloud: 55,
		humidity: 68,
		code: 61,
		time: "classroom sample",
		sample: true
	},
	Tokyo: {
		temperature: 21,
		apparent: 20,
		wind: 3,
		windDir: 80,
		precip: 0,
		cloud: 30,
		humidity: 60,
		code: 1,
		time: "classroom sample",
		sample: true
	},
	Reykjavík: {
		temperature: 8,
		apparent: 5,
		wind: 7,
		windDir: 270,
		precip: .6,
		cloud: 85,
		humidity: 82,
		code: 63,
		time: "classroom sample",
		sample: true
	},
	Cairo: {
		temperature: 28,
		apparent: 27,
		wind: 3.2,
		windDir: 10,
		precip: 0,
		cloud: 10,
		humidity: 35,
		code: 0,
		time: "classroom sample",
		sample: true
	},
	"São Paulo": {
		temperature: 20,
		apparent: 20,
		wind: 2.8,
		windDir: 140,
		precip: 1.2,
		cloud: 75,
		humidity: 80,
		code: 80,
		time: "classroom sample",
		sample: true
	}
};
function LiveWeather() {
	const [point, setPoint] = (0, import_react.useState)({
		lat: 51.51,
		lon: -.13,
		name: "London"
	});
	const [wx, setWx] = (0, import_react.useState)(null);
	const [hours, setHours] = (0, import_react.useState)([]);
	const [err, setErr] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		load(51.51, -.13, "London");
	}, []);
	async function load(lat, lon, name = "Dropped point") {
		setBusy(true);
		setErr(null);
		const near = name === "Dropped point" ? nearestAtlasPlace(lat, lon, 8) : null;
		const label = name === "Dropped point" && near ? near.name : name;
		setPoint({
			lat,
			lon,
			name: label
		});
		try {
			const url = new URL("https://api.open-meteo.com/v1/forecast");
			url.searchParams.set("latitude", lat.toFixed(3));
			url.searchParams.set("longitude", lon.toFixed(3));
			url.searchParams.set("current", "temperature_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,precipitation,cloud_cover,relative_humidity_2m,weather_code");
			url.searchParams.set("hourly", "temperature_2m,precipitation");
			url.searchParams.set("forecast_days", "2");
			url.searchParams.set("wind_speed_unit", "ms");
			const res = await fetch(url.toString());
			if (!res.ok) throw new Error("Open-Meteo did not answer.");
			const json = await res.json();
			setWx({
				temperature: json.current.temperature_2m,
				apparent: json.current.apparent_temperature,
				wind: json.current.wind_speed_10m,
				windDir: json.current.wind_direction_10m,
				precip: json.current.precipitation,
				cloud: json.current.cloud_cover,
				humidity: json.current.relative_humidity_2m,
				code: json.current.weather_code,
				time: json.current.time
			});
			const now = json.current.time;
			const idx = json.hourly.time.findIndex((t) => t >= now);
			const start = Math.max(0, idx);
			const slice = json.hourly.time.slice(start, start + 24).map((t, i) => ({
				t,
				temp: json.hourly.temperature_2m[start + i],
				precip: json.hourly.precipitation[start + i]
			}));
			setHours(slice);
		} catch {
			const sample = SAMPLE[label] ?? SAMPLE[name];
			if (sample) {
				setWx(sample);
				setHours(Array.from({ length: 24 }, (_, i) => ({
					t: `+${i}h`,
					temp: sample.temperature + Math.sin(i / 4) * 2,
					precip: i % 8 === 3 ? sample.precip : 0
				})));
				setErr("Open-Meteo did not answer (rate limit or network). Showing a labelled classroom sample so the desk is not empty. Not a forecast.");
			} else {
				setWx(null);
				setHours([]);
				setErr("Could not reach Open-Meteo. The map still works; the numbers will wait.");
			}
		} finally {
			setBusy(false);
		}
	}
	const f = wx ? wx.temperature * 9 / 5 + 32 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[1100px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Tools"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: "Live weather"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-mist",
				children: "Click the map or drag the pin. Open-Meteo returns temperature, wind, precipitation, humidity, and cloud. Educational, often delayed, not operational forecasting. Not a cockpit. No third-party weather branding."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-mist",
				children: [
					"Also:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/tools/map",
						className: "text-ice hover:underline",
						children: "World map studio"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/atlas",
						className: "text-ice hover:underline",
						children: "Atlas"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void load(p.lat, p.lon, p.name),
					className: "h-9 rounded-full border border-white/10 bg-white/6 px-3.5 text-sm text-chalk hover:bg-white/10",
					children: p.name
				}, p.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibreMap, {
					center: [point.lon, point.lat],
					zoom: 5,
					marker: [point.lon, point.lat],
					draggableMarker: true,
					onClick: (c) => void load(c.lat, c.lon),
					className: "h-[min(60vh,36rem)] w-full overflow-hidden rounded-2xl border border-white/10 bg-trench",
					label: "Live weather map"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.14em] text-glacier",
						children: point.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-sm text-ice",
						children: fmtLatLon(point.lat, point.lon, 2)
					}),
					busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-mist",
						children: "Asking Open-Meteo…"
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sandstone",
						children: err
					}),
					wx && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-3xl text-chalk",
						children: wmo(wx.code)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Air temperature",
								v: `${wx.temperature.toFixed(1)} °C`,
								sub: `(${f.toFixed(0)} °F)`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Apparent temperature",
								v: `${wx.apparent.toFixed(1)} °C`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Wind (10 m)",
								v: `${wx.wind.toFixed(1)} m s⁻¹ · ${wx.windDir.toFixed(0)}° ${compass(wx.windDir)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Precipitation",
								v: `${wx.precip.toFixed(1)} mm`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Cloud cover",
								v: `${wx.cloud.toFixed(0)} %`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Relative humidity",
								v: `${wx.humidity.toFixed(0)} %`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Observation time",
								v: wx.sample ? "classroom sample" : wx.time.replace("T", " ") + " (model)"
							})
						]
					})] })
				]
			}),
			hours.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] uppercase tracking-[0.14em] text-glacier",
					children: "Next 24 hours · educational / delayed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, { hours })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-mist",
				children: "Educational, often delayed, not operational forecasting. Not a cockpit. No third-party weather branding."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-mist",
				children: "Disclaimer: delayed model output for class, not a warning service."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-mist",
				children: [
					"Machinery behind a chart:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/lab/$slug",
						params: { slug: "wind" },
						className: "text-ice hover:underline",
						children: "Wind, PGF and Coriolis"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/lab/$slug",
						params: { slug: "fronts" },
						className: "text-ice hover:underline",
						children: "Fronts as wedges"
					})
				]
			})
		]
	});
}
function Spark({ hours }) {
	const temps = hours.map((h) => h.temp);
	const min = Math.min(...temps);
	const max = Math.max(...temps);
	const span = Math.max(1, max - min);
	const w = 640;
	const h = 88;
	const pts = hours.map((hr, i) => {
		return `${i / Math.max(1, hours.length - 1) * w},${8 + (1 - (hr.temp - min) / span) * 56}`;
	}).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${w} ${h}`,
			className: "h-24 w-full text-glacier",
			role: "img",
			"aria-label": "24-hour temperature and rain",
			children: [hours.map((hr, i) => {
				const x = i / Math.max(1, hours.length - 1) * w;
				const bh = Math.min(28, hr.precip * 8);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: x - 4,
					y: 84 - bh,
					width: 8,
					height: bh,
					fill: "#7FD4FF",
					opacity: .55
				}, hr.t);
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.4",
				points: pts
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 font-mono text-[11px] text-mist",
			children: [
				"Line: air temperature °C. Bars: precipitation mm. ",
				min.toFixed(0),
				"–",
				max.toFixed(0),
				" °C over 24 h."
			]
		})]
	});
}
function Row({ k, v, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[16px] border border-white/10 bg-white/[0.03] px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "font-mono text-[11px] uppercase tracking-[0.12em] text-mist",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
			className: "mt-1 font-display text-2xl text-chalk",
			children: [v, sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2 font-mono text-sm text-mist",
				children: sub
			})]
		})]
	});
}
//#endregion
export { LiveWeather as component };
