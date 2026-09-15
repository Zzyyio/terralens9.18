import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as seasonName, d as sunriseSunsetHours, i as fmtClock, l as solarDeclination, n as dayLengthHours, r as dayOfYearUTC, t as CITIES, u as solarNoonAltitude } from "./geo-BTPpCsbm.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools.earth-motion-Bk5jvMwi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRESETS = [
	{
		id: "london",
		...CITIES.london
	},
	{
		id: "newYork",
		...CITIES.newYork
	},
	{
		id: "sydney",
		...CITIES.sydney
	},
	{
		id: "nairobi",
		...CITIES.nairobi
	}
];
function EarthMotion() {
	const today = (0, import_react.useMemo)(() => {
		const d = /* @__PURE__ */ new Date();
		return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
	}, []);
	const [date, setDate] = (0, import_react.useState)(today);
	const [lat, setLat] = (0, import_react.useState)(51.51);
	const [lon, setLon] = (0, import_react.useState)(-.13);
	const [name, setName] = (0, import_react.useState)("London");
	const out = (0, import_react.useMemo)(() => {
		const d = /* @__PURE__ */ new Date(`${date}T12:00:00Z`);
		const doy = Number.isNaN(d.getTime()) ? 80 : dayOfYearUTC(d);
		const tilt = 23.44;
		const decl = solarDeclination(doy, tilt);
		const declDeg = MathUtils.radToDeg(decl);
		const noon = solarNoonAltitude(lat, decl);
		const ss = sunriseSunsetHours(lat, doy, lon, tilt);
		return {
			doy,
			declDeg,
			noon,
			length: dayLengthHours(lat, decl),
			season: seasonName(lat, doy, tilt),
			sunrise: ss.sunrise,
			sunset: ss.sunset,
			polar: ss.polar
		};
	}, [
		date,
		lat,
		lon
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[800px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Tool"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: "Earth-motion calculator"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-mist",
				children: "Date, latitude, longitude. Outputs: solar declination, noon altitude, sunrise/sunset, day length, season. School geometry — no equation of time, so clocks can be off by up to about 16 minutes. SI first. Not a navigation instrument."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setLat(p.lat);
						setLon(p.lon);
						setName(p.name);
					},
					className: "h-9 rounded-full border border-white/10 bg-white/6 px-3.5 text-sm text-chalk hover:bg-white/10",
					children: p.name
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "section-label",
							children: "Date (UTC)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value),
							className: "mt-2 h-11 w-full rounded-[10px] border border-white/10 bg-white/6 px-3 text-chalk",
							suppressHydrationWarning: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "section-label",
							children: "Latitude °"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							step: .01,
							min: -90,
							max: 90,
							value: lat,
							onChange: (e) => {
								setLat(Number(e.target.value));
								setName("Custom");
							},
							className: "mt-2 h-11 w-full rounded-[10px] border border-white/10 bg-white/6 px-3 text-chalk",
							suppressHydrationWarning: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "section-label",
							children: "Longitude °"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							step: .01,
							min: -180,
							max: 180,
							value: lon,
							onChange: (e) => {
								setLon(Number(e.target.value));
								setName("Custom");
							},
							className: "mt-2 h-11 w-full rounded-[10px] border border-white/10 bg-white/6 px-3 text-chalk",
							suppressHydrationWarning: true
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-mono text-sm text-glacier",
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Solar declination",
						v: `${out.declDeg.toFixed(2)}°`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Noon solar altitude",
						v: `${out.noon.toFixed(1)}°`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Day length",
						v: `${out.length.toFixed(2)} h`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Season (tilt, this latitude)",
						v: out.season
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Sunrise (local solar)",
						v: out.polar === "day" ? "Polar day" : out.polar === "night" ? "Polar night" : fmtClock(out.sunrise)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Sunset (local solar)",
						v: out.polar === "day" ? "Polar day" : out.polar === "night" ? "Polar night" : fmtClock(out.sunset)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Day of year",
						v: `${out.doy}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Axial tilt used",
						v: "23.44°"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-sm text-mist",
				children: [
					"Pair with the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/lab/$slug",
						params: { slug: "seasons" },
						className: "text-ice hover:underline",
						children: "seasons"
					}),
					" ",
					"and",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/lab/$slug",
						params: { slug: "solar-altitude" },
						className: "text-ice hover:underline",
						children: "solar altitude"
					}),
					" ",
					"labs. Formulae: NOAA solar geometry approximations as used in those labs."
				]
			})
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[16px] border border-white/10 bg-white/[0.04] px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "font-mono text-[11px] uppercase tracking-[0.12em] text-mist",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-2xl text-chalk",
			children: v
		})]
	});
}
//#endregion
export { EarthMotion as component };
