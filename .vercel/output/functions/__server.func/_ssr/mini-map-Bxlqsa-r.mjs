import { i as __toESM } from "../_runtime.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as LibreMap } from "./libre-map-KeezkSLw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mini-map-Bxlqsa-r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MiniMap({ lat, lon, zoom = 7, label, className }) {
	const overlays = (0, import_react.useMemo)(() => [{
		id: "halo",
		color: "#3EE0C6",
		circle: true,
		fill: true,
		labels: false,
		data: {
			type: "FeatureCollection",
			features: [{
				type: "Feature",
				properties: {
					name: label ?? "",
					kind: "place",
					note: ""
				},
				geometry: {
					type: "Point",
					coordinates: [lon, lat]
				}
			}]
		}
	}], [
		lat,
		lon,
		label
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibreMap, {
		center: [lon, lat],
		zoom,
		marker: [lon, lat],
		overlays,
		label: label ? `Locator map for ${label}` : "Locator map",
		className: className ?? "h-[min(52vh,28rem)] w-full min-h-[20rem] overflow-hidden rounded-2xl border border-white/10 bg-trench"
	});
}
//#endregion
export { MiniMap as t };
