import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, I as TubeGeometry, L as Vector2, O as PlaneGeometry, R as Vector3, f as BufferAttribute, g as Color, h as CatmullRomCurve3, y as LatheGeometry, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal } from "./perf-Cy1NcWbY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terrain-CZC6vZE1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function heightGeometry(fn, opts) {
	const g = new PlaneGeometry(opts.width, opts.depth, opts.segX, opts.segZ);
	const pos = g.attributes.position;
	const colors = new Float32Array(pos.count * 3);
	const c = new Color();
	const v = opts.vScale ?? 1;
	for (let i = 0; i < pos.count; i++) {
		const h = fn(pos.getX(i), pos.getY(i)) * v;
		pos.setZ(i, h);
		if (opts.colorFn) opts.colorFn(h / Math.max(.001, v)).toArray(colors, i * 3);
		else {
			c.set("#7C9A6A");
			colors[i * 3] = c.r;
			colors[i * 3 + 1] = c.g;
			colors[i * 3 + 2] = c.b;
		}
	}
	g.setAttribute("color", new BufferAttribute(colors, 3));
	g.computeVertexNormals();
	return g;
}
function HeightField({ fn, width, depth, segX, segZ, colorFn, position = [
	0,
	0,
	0
], receiveShadow = true, vScale = 1 }) {
	const geom = (0, import_react.useMemo)(() => heightGeometry(fn, {
		width,
		depth,
		segX,
		segZ,
		colorFn,
		vScale
	}), [
		fn,
		width,
		depth,
		segX,
		segZ,
		colorFn,
		vScale
	]);
	const nrm = useRockNormal();
	const nrmScale = (0, import_react.useMemo)(() => new Vector2(.55, .55), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geom,
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		position,
		receiveShadow,
		castShadow: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			vertexColors: true,
			roughness: .86,
			metalness: .03,
			normalMap: nrm,
			normalScale: nrmScale
		})
	});
}
/** Lathe a 2D profile (x=radius, y=height) into a solid of revolution. */
function latheGeometry(profile, segments) {
	const pts = profile.map(([x, y]) => new Vector2(Math.max(.001, x), y));
	const g = new LatheGeometry(pts, segments);
	g.computeVertexNormals();
	return g;
}
/**
* Viscosity 0 = shield (Mauna Loa), 0.5 = strato (Fuji), 1 = steep plug.
* Crater is always present. Fissure is a separate mesh.
*/
function volcanoProfile(visc) {
	const t = MathUtils.clamp(visc, 0, 1);
	const rBase = MathUtils.lerp(2.6, 1.05, t);
	const h = MathUtils.lerp(.72, 2.35, t);
	const craterR = MathUtils.lerp(.22, .18, t);
	const craterD = MathUtils.lerp(.06, .18, t);
	const shoulder = MathUtils.lerp(.55, .22, t);
	return [
		[.001, h - craterD],
		[craterR * .4, h - craterD * .7],
		[craterR, h],
		[rBase * shoulder, h * .55],
		[rBase * .82, h * .18],
		[rBase, .02],
		[rBase * 1.08, 0]
	];
}
function useVolcanoGeometry(visc, segments) {
	return (0, import_react.useMemo)(() => latheGeometry(volcanoProfile(visc), segments), [visc, segments]);
}
function tubeGeometry(pts, radius, tubular = 64, radial = 10) {
	const curve = new CatmullRomCurve3(pts.map((p) => new Vector3(...p)));
	const g = new TubeGeometry(curve, tubular, radius, radial, false);
	g.computeVertexNormals();
	return g;
}
//#endregion
export { useVolcanoGeometry as a, tubeGeometry as i, heightGeometry as n, volcanoProfile as o, latheGeometry as r, HeightField as t };
