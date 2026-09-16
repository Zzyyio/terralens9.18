import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { latLonToXYZ } from "@/lib/geo";
import { useCloudMap } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";

const DAY = "/textures/earth-day.jpg";
const NIGHT = "/textures/earth-night.jpg";
const BUMP = "/textures/earth-bump.jpg";

const earthVert = /* glsl */ `
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

const earthFrag = /* glsl */ `
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

export function EarthMesh({
  sunDirection = new THREE.Vector3(4, 0.4, 2),
  radius = 1,
  segments,
  clouds = false,
}: {
  sunDirection?: THREE.Vector3;
  radius?: number;
  segments?: number;
  clouds?: boolean;
}) {
  const dayMap = useTexture(DAY);
  const nightMap = useTexture(NIGHT);
  const bumpMap = useTexture(BUMP);
  const q = useQuality();
  const segs = segments ?? q.sphere;
  const mat = useRef<THREE.ShaderMaterial>(null);
  const sunRef = useRef(sunDirection);
  sunRef.current = sunDirection;

  useMemo(() => {
    dayMap.colorSpace = THREE.SRGBColorSpace;
    nightMap.colorSpace = THREE.SRGBColorSpace;
    dayMap.anisotropy = 16;
    nightMap.anisotropy = 16;
    bumpMap.anisotropy = 8;
  }, [dayMap, nightMap, bumpMap]);

  const uniforms = useMemo(
    () => ({
      dayMap: { value: dayMap },
      nightMap: { value: nightMap },
      bumpMap: { value: bumpMap },
      sunDirection: { value: sunDirection.clone() },
    }),
    [dayMap, nightMap, bumpMap],
  );

  useFrame(() => {
    if (mat.current) {
      mat.current.uniforms.sunDirection.value.copy(sunRef.current);
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, segs, segs]} />
        <shaderMaterial
          ref={mat}
          vertexShader={earthVert}
          fragmentShader={earthFrag}
          uniforms={uniforms}
        />
      </mesh>
      {clouds && <CloudLayer radius={radius * 1.012} />}
    </group>
  );
}

export function CloudLayer({ radius = 1.012 }: { radius?: number }) {
  const map = useCloudMap();
  const q = useQuality();
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += Math.min(d, 0.1) * 0.004;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, q.sphere, q.sphere]} />
      <meshStandardMaterial
        map={map}
        transparent
        opacity={0.55}
        depthWrite={false}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

export function Atmosphere({ radius = 1.035 }: { radius?: number }) {
  const q = useQuality();
  return (
    <mesh>
      <sphereGeometry args={[radius, q.sphere, q.sphere]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        vertexShader={/* glsl */ `
          varying vec3 vNormal;
          varying vec3 vWorld;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 w = modelMatrix * vec4(position, 1.0);
            vWorld = w.xyz;
            gl_Position = projectionMatrix * viewMatrix * w;
          }
        `}
        fragmentShader={/* glsl */ `
          varying vec3 vNormal;
          varying vec3 vWorld;
          void main() {
            vec3 view = normalize(cameraPosition - vWorld);
            float f = pow(1.0 - max(dot(normalize(vNormal), view), 0.0), 2.6);
            gl_FragColor = vec4(0.32, 0.68, 1.0, clamp(f * 0.72, 0.0, 0.55));
          }
        `}
      />
    </mesh>
  );
}

export function AxisLine({
  radius = 1.18,
  tiltDeg = 23.44,
}: {
  radius?: number;
  tiltDeg?: number;
}) {
  const obj = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -radius, 0),
      new THREE.Vector3(0, radius, 0),
    ]);
    const m = new THREE.LineBasicMaterial({
      color: 0xf4efe6,
      transparent: true,
      opacity: 0.85,
    });
    return new THREE.Line(g, m);
  }, [radius]);
  return (
    <group rotation={[0, 0, THREE.MathUtils.degToRad(tiltDeg)]}>
      <primitive object={obj} />
      <mesh position={[0, radius, 0]}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color="#7FD4FF" />
      </mesh>
    </group>
  );
}

export function CityMarker({
  lat,
  lon,
  radius = 1.01,
  color = "#3EE0C6",
}: {
  lat: number;
  lon: number;
  radius?: number;
  color?: string;
}) {
  const pos = useMemo(() => latLonToXYZ(lat, lon, radius), [lat, lon, radius]);
  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.016, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export function Graticule({ radius = 1.004 }: { radius?: number }) {
  const obj = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      for (let lon = -180; lon < 180; lon += 3) {
        pts.push(new THREE.Vector3(...latLonToXYZ(lat, lon, radius)));
        pts.push(new THREE.Vector3(...latLonToXYZ(lat, lon + 3, radius)));
      }
    }
    for (let lon = -180; lon < 180; lon += 30) {
      for (let lat = -80; lat < 80; lat += 3) {
        pts.push(new THREE.Vector3(...latLonToXYZ(lat, lon, radius)));
        pts.push(new THREE.Vector3(...latLonToXYZ(lat + 3, lon, radius)));
      }
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const m = new THREE.LineBasicMaterial({
      color: 0x8b9a97,
      transparent: true,
      opacity: 0.32,
    });
    return new THREE.LineSegments(g, m);
  }, [radius]);
  return <primitive object={obj} />;
}

export function Starfield({ count }: { count?: number }) {
  const q = useQuality();
  const n = count ?? q.stars;
  const positions = useMemo(() => {
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
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);
  return (
    <points geometry={geom}>
      <pointsMaterial color="#F4EFE6" size={0.045} sizeAttenuation />
    </points>
  );
}
