import { C as MathUtils, R as Vector3 } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/geo-BTPpCsbm.js
var CITIES = {
	london: {
		name: "London",
		lat: 51.51,
		lon: -.13
	},
	cairo: {
		name: "Cairo",
		lat: 30.04,
		lon: 31.24
	},
	nairobi: {
		name: "Nairobi",
		lat: -1.29,
		lon: 36.82
	},
	sydney: {
		name: "Sydney",
		lat: -33.87,
		lon: 151.21
	},
	ushuaia: {
		name: "Ushuaia",
		lat: -54.8,
		lon: -68.3
	},
	miami: {
		name: "Miami",
		lat: 25.76,
		lon: -80.19
	},
	newYork: {
		name: "New York",
		lat: 40.71,
		lon: -74.01
	},
	sanFrancisco: {
		name: "San Francisco",
		lat: 37.77,
		lon: -122.42
	},
	tokyo: {
		name: "Tokyo",
		lat: 35.68,
		lon: 139.65
	}
};
/** Sphere mapping used by the Blue Marble globe (lon +180, Y-up). */
function latLonToVector3(lat, lon, r = 1) {
	const phi = MathUtils.degToRad(90 - lat);
	const th = MathUtils.degToRad(lon + 180);
	return new Vector3(-r * Math.sin(phi) * Math.sin(th), r * Math.cos(phi), r * Math.sin(phi) * Math.cos(th));
}
function fmtLatLon(lat, lon, digits = 2) {
	const ns = lat >= 0 ? "N" : "S";
	const ew = lon >= 0 ? "E" : "W";
	return `${Math.abs(lat).toFixed(digits)}°${ns}  ${Math.abs(lon).toFixed(digits)}°${ew}`;
}
function dayOfYearUTC(d) {
	const start = Date.UTC(d.getUTCFullYear(), 0, 0);
	return Math.floor((d.getTime() - start) / 864e5);
}
/** Approximate solar declination in radians. Day 81 ≈ 22 March. */
function solarDeclination(dayOfYear, tiltDeg = 23.44) {
	return MathUtils.degToRad(tiltDeg) * Math.sin(2 * Math.PI * (dayOfYear - 81) / 365);
}
/** Noon solar altitude in degrees. */
function solarNoonAltitude(latDeg, declRad) {
	const lat = MathUtils.degToRad(latDeg);
	return 90 - Math.abs(MathUtils.radToDeg(lat - declRad));
}
function dayLengthHours(latDeg, declRad) {
	const lat = MathUtils.degToRad(latDeg);
	const arg = -Math.tan(lat) * Math.tan(declRad);
	if (arg <= -1) return 24;
	if (arg >= 1) return 0;
	return 2 * Math.acos(MathUtils.clamp(arg, -1, 1)) * 12 / Math.PI;
}
function formatDay(dayOfYear) {
	const d = new Date(Date.UTC(2026, 0, 1));
	d.setUTCDate(Math.max(1, Math.min(365, Math.floor(dayOfYear))));
	return d.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		timeZone: "UTC"
	});
}
function fmtClock(hours) {
	if (!Number.isFinite(hours)) return "—";
	const h = (hours % 24 + 24) % 24;
	const hh = Math.floor(h);
	const mm = Math.round((h - hh) * 60);
	if (mm === 60) return `${String((hh + 1) % 24).padStart(2, "0")}:00`;
	return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
function sunriseSunsetHours(latDeg, dayOfYear, lonDeg, tiltDeg = 23.44) {
	const decl = solarDeclination(dayOfYear, tiltDeg);
	const lat = MathUtils.degToRad(latDeg);
	const arg = -Math.tan(lat) * Math.tan(decl);
	const offset = lonDeg / 15;
	if (arg <= -1) return {
		sunrise: 0,
		sunset: 24,
		polar: "day"
	};
	if (arg >= 1) return {
		sunrise: 0,
		sunset: 0,
		polar: "night"
	};
	const half = Math.acos(MathUtils.clamp(arg, -1, 1)) * 12 / Math.PI;
	return {
		sunrise: 12 - half - offset,
		sunset: 12 + half - offset,
		polar: "none"
	};
}
function seasonName(latDeg, dayOfYear, tiltDeg = 23.44) {
	if (Math.abs(latDeg) < 12) return "Tropics — small seasonal swing";
	const decl = solarDeclination(dayOfYear, tiltDeg);
	const toward = latDeg >= 0 ? decl > .05 : decl < -.05;
	const away = latDeg >= 0 ? decl < -.05 : decl > .05;
	if (toward) return latDeg >= 0 ? "Northern summer" : "Southern summer";
	if (away) return latDeg >= 0 ? "Northern winter" : "Southern winter";
	return "Near equinox";
}
//#endregion
export { fmtLatLon as a, seasonName as c, sunriseSunsetHours as d, fmtClock as i, solarDeclination as l, dayLengthHours as n, formatDay as o, dayOfYearUTC as r, latLonToVector3 as s, CITIES as t, solarNoonAltitude as u };
