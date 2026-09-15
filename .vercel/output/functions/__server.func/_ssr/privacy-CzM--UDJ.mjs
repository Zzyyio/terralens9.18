import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-CzM--UDJ.js
var import_jsx_runtime = require_jsx_runtime();
function Privacy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[720px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Privacy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl text-chalk md:text-5xl",
				children: "No account. No tracker."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-5 text-[17px] leading-7 text-chalk/90",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "TerraLens is a free classroom studio. There is no login, no paywall, no advertising, and no sponsorship banner. We do not keep student work, scores, or class lists." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Lab state (tilt, date, viscosity, labels) lives in the page URL and in this browser only. Copy the link to share a setup. Closing the tab does not send that state to a server." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We do not track academic behaviour. There is no analytics SDK that scores a pupil’s clicks." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Hosting may set a Cloudflare bot-management cookie (",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono text-sm",
							children: "__cf_bm"
						}),
						"). That cookie is for abuse control, not classroom surveillance."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Maps request tiles from OpenFreeMap / OpenStreetMap and, on the live-weather tool, a forecast from Open-Meteo. Those requests carry an IP address to those services. If the tile network fails, the atlas falls back to a static Natural Earth coastline we ship with the app." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Type is currently loaded from Google Fonts (Fraunces, Geist). A future build may self-host the same faces. Until then, a font request leaves this origin." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Questions: open an issue on the project repository, or write from your school address. This page is the whole privacy notice. There is no hidden product." })
				]
			})
		]
	});
}
//#endregion
export { Privacy as component };
