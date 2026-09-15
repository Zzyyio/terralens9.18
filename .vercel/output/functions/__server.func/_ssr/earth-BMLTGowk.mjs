import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, M as SRGBColorSpace, R as Vector3, S as LineSegments, b as Line, c as useFrame, f as BufferAttribute, p as BufferGeometry, r as useTexture, x as LineBasicMaterial, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, r as useCloudMap } from "./perf-Cy1NcWbY.mjs";
import { s as latLonToVector3 } from "./geo-BTPpCsbm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/earth-BMLTGowk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DAY = "/textures/earth-day.jpg";
var NIGHT = "/textures/earth-night.jpg";
var BUMP = "/textures/earth-bump.jpg";
var earthVert = `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vPosW = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;
var earthFrag = `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform sampler2D bumpMap;
  uniform vec3 sunDirection;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vec3 n = normalize(vNormalW);
    float ndl = dot(n, normalize(sunDirection));
    float dayF = smoothstep(-0.08, 0.22, ndl);
    vec3 day = texture2D(dayMap, vUv).rgb;
    vec3 night = texture2D(nightMap, vUv).rgb * 1.35;
    night *= (1.0 - dayF);
    vec3 color = mix(night, day, dayF);
    float bump = texture2D(bumpMap, vUv).r;
    color *= 0.88 + bump * 0.22;
    vec3 view = normalize(cameraPosition - vPosW);
    float fresnel = pow(1.0 - max(dot(n, view), 0.0), 2.2);
    color += vec3(0.28, 0.58, 0.9) * fresnel * 0.34;
    float spec = pow(max(dot(reflect(-normalize(sunDirection), n), view), 0.0), 22.0);
    color += vec3(0.6, 0.75, 0.95) * spec * dayF * 0.26;
    gl_FragColor = vec4(color, 1.0);
  }
`;
function EarthMesh({ sunDirection = new Vector3(4, .4, 2), radius = 1, segments, clouds = false }) {
	const dayMap = useTexture(DAY);
	const nightMap = useTexture(NIGHT);
	const bumpMap = useTexture(BUMP);
	const q = useQuality();
	const segs = segments ?? q.sphere;
	const mat = (0, import_react.useRef)(null);
	const sunRef = (0, import_react.useRef)(sunDirection);
	sunRef.current = sunDirection;
	(0, import_react.useMemo)(() => {
		dayMap.colorSpace = SRGBColorSpace;
		nightMap.colorSpace = SRGBColorSpace;
		dayMap.anisotropy = 16;
		nightMap.anisotropy = 16;
		bumpMap.anisotropy = 8;
	}, [
		dayMap,
		nightMap,
		bumpMap
	]);
	const uniforms = (0, import_react.useMemo)(() => ({
		dayMap: { value: dayMap },
		nightMap: { value: nightMap },
		bumpMap: { value: bumpMap },
		sunDirection: { value: sunDirection.clone() }
	}), [
		dayMap,
		nightMap,
		bumpMap
	]);
	useFrame(() => {
		if (mat.current) mat.current.uniforms.sunDirection.value.copy(sunRef.current);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
		radius,
		segs,
		segs
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
		ref: mat,
		vertexShader: earthVert,
		fragmentShader: earthFrag,
		uniforms
	})] }), clouds && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudLayer, { radius: radius * 1.012 })] });
}
function CloudLayer({ radius = 1.012 }) {
	const map = useCloudMap();
	const q = useQuality();
	const ref = (0, import_react.useRef)(null);
	useFrame((_, d) => {
		if (ref.current) ref.current.rotation.y += Math.min(d, .1) * .004;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			radius,
			q.sphere,
			q.sphere
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			map,
			transparent: true,
			opacity: .55,
			depthWrite: false,
			roughness: 1,
			metalness: 0
		})]
	});
}
function Atmosphere({ radius = 1.035 }) {
	const q = useQuality();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
		radius,
		q.sphere,
		q.sphere
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
		transparent: true,
		depthWrite: false,
		side: 1,
		vertexShader: `
          varying vec3 vNormal;
          varying vec3 vWorld;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 w = modelMatrix * vec4(position, 1.0);
            vWorld = w.xyz;
            gl_Position = projectionMatrix * viewMatrix * w;
          }
        `,
		fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vWorld;
          void main() {
            vec3 view = normalize(cameraPosition - vWorld);
            float f = pow(1.0 - max(dot(normalize(vNormal), view), 0.0), 2.6);
            gl_FragColor = vec4(0.32, 0.68, 1.0, clamp(f * 0.72, 0.0, 0.55));
          }
        `
	})] });
}
function AxisLine({ radius = 1.18, tiltDeg = 23.44 }) {
	const obj = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry().setFromPoints([new Vector3(0, -radius, 0), new Vector3(0, radius, 0)]);
		const m = new LineBasicMaterial({
			color: 16052198,
			transparent: true,
			opacity: .85
		});
		return new Line(g, m);
	}, [radius]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		rotation: [
			0,
			0,
			MathUtils.degToRad(tiltDeg)
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: obj }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				radius,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.028,
				16,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#7FD4FF" })]
		})]
	});
}
function CityMarker({ lat, lon, radius = 1.01, color = "#3EE0C6" }) {
	const pos = (0, import_react.useMemo)(() => latLonToVector3(lat, lon, radius), [
		lat,
		lon,
		radius
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: pos,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.016,
			12,
			12
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color })]
	});
}
function Graticule({ radius = 1.004 }) {
	const obj = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let lat = -60; lat <= 60; lat += 30) for (let lon = -180; lon < 180; lon += 3) {
			pts.push(latLonToVector3(lat, lon, radius));
			pts.push(latLonToVector3(lat, lon + 3, radius));
		}
		for (let lon = -180; lon < 180; lon += 30) for (let lat = -80; lat < 80; lat += 3) {
			pts.push(latLonToVector3(lat, lon, radius));
			pts.push(latLonToVector3(lat + 3, lon, radius));
		}
		const g = new BufferGeometry().setFromPoints(pts);
		const m = new LineBasicMaterial({
			color: 9149079,
			transparent: true,
			opacity: .32
		});
		return new LineSegments(g, m);
	}, [radius]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: obj });
}
function Starfield({ count }) {
	const q = useQuality();
	const n = count ?? q.stars;
	const positions = (0, import_react.useMemo)(() => {
		const a = new Float32Array(n * 3);
		for (let i = 0; i < n; i++) {
			const r = 28 + Math.random() * 40;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			a[i * 3] = r * Math.sin(phi) * Math.cos(theta);
			a[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
			a[i * 3 + 2] = r * Math.cos(phi);
		}
		return a;
	}, [n]);
	const geom = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		g.setAttribute("position", new BufferAttribute(positions, 3));
		return g;
	}, [positions]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
		geometry: geom,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			color: "#F4EFE6",
			size: .045,
			sizeAttenuation: true
		})
	});
}
//#endregion
export { EarthMesh as a, CloudLayer as i, AxisLine as n, Graticule as o, CityMarker as r, Starfield as s, Atmosphere as t };
