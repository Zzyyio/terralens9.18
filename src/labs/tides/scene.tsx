import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StepCamera } from "@/labs/shared/kit";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { EarthMesh, Atmosphere, Starfield } from "@/components/globe/earth";
import { MoonMesh, SunMesh } from "@/components/globe/moon";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";

function WaterBulge() {
  const q = useQuality();
  const geom = useMemo(() => new THREE.SphereGeometry(1.045, q.sphere, q.sphere), [q.sphere]);
  const rest = useMemo(() => Float32Array.from(geom.attributes.position.array as Float32Array), [geom]);
  const mesh = useRef<THREE.Mesh>(null);
  const moonDir = useRef(new THREE.Vector3(1, 0, 0));
  const sunDir = useRef(new THREE.Vector3(1, 0.05, 0));
  const t = useLabControls((s) => s.t);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const nrm = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const m = mesh.current;
    if (!m) return;
    const ang = t * Math.PI * 2;
    moonDir.current.set(Math.cos(ang), 0.02, Math.sin(ang));
    sunDir.current.set(1, 0.04, 0).normalize();
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      nrm.set(rest[i * 3]!, rest[i * 3 + 1]!, rest[i * 3 + 2]!).normalize();
      const moon = 3 * Math.pow(nrm.dot(moonDir.current), 2) - 1;
      const sun = 1.4 * (3 * Math.pow(nrm.dot(sunDir.current), 2) - 1);
      const r = 1.045 + moon * 0.045 + sun * 0.018;
      tmp.copy(nrm).multiplyScalar(r);
      pos.setXYZ(i, tmp.x, tmp.y, tmp.z);
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();
  });

  return (
    <mesh ref={mesh} geometry={geom}>
      <meshPhysicalMaterial
        color="#1a4a6e"
        roughness={0.12}
        metalness={0.06}
        transparent
        opacity={0.55}
        transmission={0.15}
        thickness={0.4}
      />
    </mesh>
  );
}

function Model() {
  useLabTick(1 / 20);
  const t = useLabControls((s) => s.t);
  const ang = t * Math.PI * 2;
  const mx = Math.cos(ang) * 2.35;
  const mz = Math.sin(ang) * 2.35;
  const aligned = Math.abs(Math.cos(ang)) > 0.85;
  return (
    <group>
      <Starfield />
      <group position={[-4.6, 0.2, -1.2]} scale={0.55}>
        <SunMesh radius={0.42} />
      </group>
      <EarthMesh radius={1} clouds />
      <Atmosphere radius={1.05} />
      <WaterBulge />
      <group position={[mx, 0.05, mz]}>
        <MoonMesh radius={0.27} />
      </group>
      <Tag pos={[mx, 0.5, mz]} text="Moon" />
      <Tag pos={[1.25, 0.15, 0]} text="Tidal bulge" tone="ice" />
      <Tag pos={[-1.25, 0.15, 0]} text="Opposite bulge" tone="ice" />
      <Readout pos={[0, 1.7, 0]}>
        {aligned ? "Spring tide · Sun and Moon aligned · two bulges add" : "Neap · quadrature · bulges fight"}
        . Mesh is deformed, not a sticker.
      </Readout>
      <StepCamera
        positions={[
          [0, 1.6, 5.4],
          [2.8, 1.2, 3.2],
          [-1.4, 2.4, 4.6],
          [0, 1.6, 5.4],
        ]}
      />
    </group>
  );
}

export default function TidesScene() {
  return (
    <LabStudio
      slug="tides"
      title="Tides"
      camera={{ position: [0, 1.6, 5.4], fov: 40 }}
      exaggeration="Bulge height exaggerated × thousands. Two bulges: toward the Moon and opposite."
      liveText="Two tidal bulges. Spring when Sun and Moon align; neap at right angles. Water is a deformed mesh."
      fallback={
        <GenericFallback
          slug="tides"
          title="Tides"
          caption="Two bulges. Spring and neap. Alignment with the Sun, not the season named spring."
        />
      }
    >
      <Model />
    </LabStudio>
  );
}
