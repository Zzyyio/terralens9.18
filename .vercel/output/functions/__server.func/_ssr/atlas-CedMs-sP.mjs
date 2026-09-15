import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as fmtLatLon } from "./geo-BTPpCsbm.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as atlasSearchText, i as atlasLabs, n as atlasGeo, r as atlasKindLabel, t as ATLAS } from "./atlas-data-DbTVdyCc.mjs";
import { t as MiniMap } from "./mini-map-Bxlqsa-r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas-CedMs-sP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "country",
		label: "World",
		kinds: ["country"]
	},
	{
		id: "uk",
		label: "UK",
		kinds: [
			"uk-nation",
			"uk-county",
			"uk-place"
		]
	},
	{
		id: "us",
		label: "US states",
		kinds: ["us-state"]
	}
];
function AtlasPage() {
	const [tab, setTab] = (0, import_react.useState)("country");
	const [q, setQ] = (0, import_react.useState)("");
	const kinds = TABS.find((t) => t.id === tab).kinds;
	const needle = q.trim().toLowerCase();
	const list = (0, import_react.useMemo)(() => {
		return (needle ? ATLAS : ATLAS.filter((p) => kinds.includes(p.kind))).filter((p) => needle ? atlasSearchText(p).includes(needle) : true);
	}, [kinds, needle]);
	const [sel, setSel] = (0, import_react.useState)(ATLAS[0]);
	const shown = list.find((p) => p.id === sel.id) ?? list[0] ?? sel;
	const geo = atlasGeo(shown);
	const labs = atlasLabs(shown);
	const zoom = shown.kind === "country" ? 4 : shown.kind === "us-state" ? 5 : 7;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[1200px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Atlas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl md:text-5xl",
				children: "Countries, nations, states."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-mist",
				children: "World countries, the UK’s constituent countries, and US states. Capital, coordinates, two or three physical sentences, and a lab that matches. Natural Earth positions; OpenStreetMap locators. Not a tracker."
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
						to: "/tools/live-weather",
						className: "text-ice hover:underline",
						children: "Live weather"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setTab(t.id);
						setQ("");
					},
					className: cn("h-9 rounded-full border px-3.5 text-sm", tab === t.id ? "border-glacier/40 bg-glacier text-basalt" : "border-white/10 bg-white/6 text-chalk hover:bg-white/10"),
					children: t.label
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-6 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Search atlas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Japan, Iceland, California, Holderness, Hawaii…",
					className: "h-11 w-full max-w-md rounded-[12px] border border-white/10 bg-white/6 px-3 text-chalk placeholder:text-mist/70",
					suppressHydrationWarning: true
				})]
			}),
			needle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-mono text-[11px] text-mist",
				children: [
					"Searching all tabs. ",
					list.length,
					" match",
					list.length === 1 ? "" : "es",
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-8 lg:grid-cols-[minmax(0,18rem)_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "max-h-[min(70vh,40rem)] overflow-y-auto rounded-2xl border border-white/10",
					children: [list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setSel(p);
							if (p.kind === "country") setTab("country");
							else if (p.kind === "us-state") setTab("us");
							else setTab("uk");
						},
						className: cn("flex w-full flex-col items-start px-4 py-3 text-left hover:bg-white/6", shown.id === p.id && "bg-white/8"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-chalk",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[11px] text-mist",
							children: [atlasKindLabel(p.kind), p.capital !== "—" ? ` · ${p.capital}` : ""]
						})]
					}) }, p.id)), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-4 py-6 text-sm text-mist",
						children: "Nothing matches."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniMap, {
					lat: shown.lat,
					lon: shown.lon,
					zoom,
					label: shown.name,
					className: "h-[min(56vh,32rem)] w-full min-h-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-trench"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-[0.14em] text-glacier",
							children: atlasKindLabel(shown.kind)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-3xl",
							children: shown.name
						}),
						shown.capital !== "—" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-mist",
							children: ["Capital ", shown.capital]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-sm text-ice",
							children: fmtLatLon(shown.lat, shown.lon, 2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3 leading-7 text-chalk/90",
							children: geo.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: s }, s.slice(0, 48)))
						}),
						labs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-label",
								children: "Related labs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 flex flex-wrap gap-2",
								children: labs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/lab/$slug",
									params: { slug: l.slug },
									className: "inline-flex h-9 items-center rounded-full border border-white/10 bg-white/6 px-3 text-sm text-ice hover:border-glacier/40",
									children: l.label
								}) }, l.slug))
							})]
						})
					]
				})] })]
			})
		]
	});
}
//#endregion
export { AtlasPage as component };
