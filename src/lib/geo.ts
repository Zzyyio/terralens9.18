import * as THREE from "three";

export type GeoPlace = { name: string; lat: number; lon: number };

export const CITIES = {
  london: { name: "London", lat: 51.51, lon: -0.13 },
  cairo: { name: "Cairo", lat: 30.04, lon: 31.24 },
  nairobi: { name: "Nairobi", lat: -1.29, lon: 36.82 },
  sydney: { name: "Sydney", lat: -33.87, lon: 151.21 },
  ushuaia: { name: "Ushuaia", lat: -54.8, lon: -68.3 },
  miami: { name: "Miami", lat: 25.76, lon: -80.19 },
  newYork: { name: "New York", lat: 40.71, lon: -74.01 },
  sanFrancisco: { name: "San Francisco", lat: 37.77, lon: -122.42 },
  tokyo: { name: "Tokyo", lat: 35.68, lon: 139.65 },
} as const satisfies Record<string, GeoPlace>;

/** Sphere mapping used by the Blue Marble globe (lon +180, Y-up). */
export function latLonToVector3(lat: number, lon: number, r = 1): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const th = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.sin(th),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.cos(th),
  );
}

/** Inverse of latLonToVector3. Accepts a point on or off the unit sphere. */
export function vector3ToLatLon(v: THREE.Vector3): { lat: number; lon: number } {
  const n = v.clone().normalize();
  const lat = 90 - THREE.MathUtils.radToDeg(Math.acos(THREE.MathUtils.clamp(n.y, -1, 1)));
  let lon = THREE.MathUtils.radToDeg(Math.atan2(-n.x, n.z)) - 180;
  if (lon <= -180) lon += 360;
  if (lon > 180) lon -= 360;
  return { lat, lon };
}

export function fmtLatLon(lat: number, lon: number, digits = 2): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(digits)}°${ns}  ${Math.abs(lon).toFixed(digits)}°${ew}`;
}

export function dayOfYearUTC(d: Date): number {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  return Math.floor((d.getTime() - start) / 86400000);
}

/** Approximate solar declination in radians. Day 81 ≈ 22 March. */
export function solarDeclination(dayOfYear: number, tiltDeg = 23.44): number {
  const tilt = THREE.MathUtils.degToRad(tiltDeg);
  return tilt * Math.sin((2 * Math.PI * (dayOfYear - 81)) / 365);
}

/** Noon solar altitude in degrees. */
export function solarNoonAltitude(latDeg: number, declRad: number): number {
  const lat = THREE.MathUtils.degToRad(latDeg);
  return 90 - Math.abs(THREE.MathUtils.radToDeg(lat - declRad));
}

export function dayLengthHours(latDeg: number, declRad: number): number {
  const lat = THREE.MathUtils.degToRad(latDeg);
  const arg = -Math.tan(lat) * Math.tan(declRad);
  if (arg <= -1) return 24;
  if (arg >= 1) return 0;
  return (2 * Math.acos(THREE.MathUtils.clamp(arg, -1, 1)) * 12) / Math.PI;
}

export function formatDay(dayOfYear: number): string {
  const d = new Date(Date.UTC(2026, 0, 1));
  d.setUTCDate(Math.max(1, Math.min(365, Math.floor(dayOfYear))));
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

export function fmtClock(hours: number): string {
  if (!Number.isFinite(hours)) return "—";
  const h = ((hours % 24) + 24) % 24;
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  if (mm === 60) return `${String((hh + 1) % 24).padStart(2, "0")}:00`;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function sunriseSunsetHours(
  latDeg: number,
  dayOfYear: number,
  lonDeg: number,
  tiltDeg = 23.44,
): { sunrise: number; sunset: number; polar: "none" | "day" | "night" } {
  const decl = solarDeclination(dayOfYear, tiltDeg);
  const lat = THREE.MathUtils.degToRad(latDeg);
  const arg = -Math.tan(lat) * Math.tan(decl);
  const offset = lonDeg / 15;
  if (arg <= -1) return { sunrise: 0, sunset: 24, polar: "day" };
  if (arg >= 1) return { sunrise: 0, sunset: 0, polar: "night" };
  const ha = Math.acos(THREE.MathUtils.clamp(arg, -1, 1));
  const half = (ha * 12) / Math.PI;
  return {
    sunrise: 12 - half - offset,
    sunset: 12 + half - offset,
    polar: "none",
  };
}

export function seasonName(latDeg: number, dayOfYear: number, tiltDeg = 23.44): string {
  if (Math.abs(latDeg) < 12) return "Tropics — small seasonal swing";
  const decl = solarDeclination(dayOfYear, tiltDeg);
  const toward = latDeg >= 0 ? decl > 0.05 : decl < -0.05;
  const away = latDeg >= 0 ? decl < -0.05 : decl > 0.05;
  if (toward) return latDeg >= 0 ? "Northern summer" : "Southern summer";
  if (away) return latDeg >= 0 ? "Northern winter" : "Southern winter";
  return "Near equinox";
}
