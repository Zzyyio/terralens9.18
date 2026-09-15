//#region node_modules/.nitro/vite/services/ssr/assets/status-CNAXnHO9.js
/**
* Honesty layer. A slug is listed on Explore / home only if playable or complete.
* complete = projector-ready teaching model + full copy pack.
* shell is never shown.
*/
var LAB_STATUS = {
	seasons: "complete",
	rotation: "complete",
	"moon-phases": "complete",
	"earth-interior": "complete",
	"plate-boundaries": "complete",
	contours: "complete",
	rivers: "complete",
	"water-cycle": "complete",
	volcanoes: "complete",
	"soil-texture": "complete",
	"solar-system": "complete",
	tides: "complete",
	"seafloor-spreading": "complete",
	"atmosphere-layers": "complete",
	glaciers: "complete",
	"sun-earth": "complete",
	"solar-altitude": "complete",
	eclipses: "complete",
	"universe-scale": "complete",
	"geologic-time": "complete",
	"continental-drift": "complete",
	hotspots: "complete",
	earthquakes: "complete",
	tsunami: "complete",
	"tropical-cyclone": "complete",
	"energy-budget": "complete",
	"thermal-circulation": "complete",
	wind: "complete",
	"three-cell": "complete",
	fronts: "complete",
	"cyclone-anticyclone": "complete",
	"climate-types": "complete",
	enso: "complete",
	"drainage-basin": "complete",
	hydrograph: "complete",
	"river-hydrology": "complete",
	"ocean-currents": "complete",
	thermohaline: "complete",
	"carbon-cycle": "complete",
	"landform-types": "complete",
	"river-erosion": "complete",
	"river-deposition": "complete",
	"river-capture": "complete",
	coasts: "complete",
	karst: "complete",
	"folds-faults": "complete",
	aeolian: "complete",
	"rock-cycle": "complete",
	"soil-profile": "complete",
	weathering: "complete",
	"soil-erosion": "complete",
	graticule: "complete",
	"map-projections": "complete",
	"grid-references": "complete",
	"mass-movement": "complete",
	"rain-shadow": "complete",
	groundwater: "complete",
	isostasy: "complete",
	"wilson-cycle": "complete",
	"soil-catena": "complete",
	periglacial: "complete",
	"storm-surge": "complete"
};
function labStatus(slug) {
	return LAB_STATUS[slug] ?? "shell";
}
function isListed(slug) {
	const s = labStatus(slug);
	return s === "complete" || s === "playable";
}
function teacherScriptReady(script) {
	return script.trim().split(/\s+/).length >= 40;
}
//#endregion
export { labStatus as n, teacherScriptReady as r, isListed as t };
