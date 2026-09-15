import { useMemo } from "react";
import * as THREE from "three";
import { Starfield } from "@/components/globe/earth";
import { latLonToVector3 } from "@/lib/geo";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Arrow3, Readout, StepCamera, Tag } from "@/labs/shared/kit";
import { PBR } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

type CDef = {
  name: string;
  color: string;
  pts: [number, number][];
  pangaea: [number, number];
  present: [number, number];
  yaw0: number;
  yaw1: number;
  fossils?: [number, number][];
};

const CONTINENTS: CDef[] = [
  {
    name: "S America",
    color: "#6f8f5e",
    pts: [[0.1, 0.42], [0.2, 0.18], [0.16, -0.12], [0.24, -0.48], [0.02, -0.58], [-0.18, -0.28], [-0.2, 0.08], [-0.08, 0.4]],
    pangaea: [2, -6],
    present: [-12, -58],
    yaw0: 0.15,
    yaw1: -0.35,
    fossils: [[0.16, 0.12], [0.18, -0.08], [0.14, -0.28]],
  },
  {
    name: "Africa",
    color: "#c4a05a",
    pts: [[0.04, 0.62], [0.26, 0.42], [0.22, 0.08], [0.3, -0.22], [0.12, -0.58], [-0.12, -0.5], [-0.24, -0.12], [-0.2, 0.28], [-0.06, 0.55]],
    pangaea: [4, 16],
    present: [2, 20],
    yaw0: 0,
    yaw1: 0.05,
    fossils: [[-0.2, 0.12], [-0.22, -0.08], [-0.18, -0.26]],
  },
  {
    name: "N America",
    color: "#7C9A6A",
    pts: [[-0.08, 0.48], [0.28, 0.42], [0.38, 0.08], [0.22, -0.18], [-0.02, -0.22], [-0.32, -0.02], [-0.3, 0.32]],
    pangaea: [28, -10],
    present: [44, -98],
    yaw0: 0.2,
    yaw1: -0.4,
  },
  {
    name: "Eurasia",
    color: "#8a7a5c",
    pts: [[-0.55, 0.22], [-0.1, 0.38], [0.42, 0.32], [0.62, 0.05], [0.28, -0.18], [-0.22, -0.12], [-0.58, 0.02]],
    pangaea: [32, 34],
    present: [50, 45],
    yaw0: -0.1,
    yaw1: 0.12,
  },
  {
    name: "Australia",
    color: "#3EE0C6",
    pts: [[-0.22, 0.12], [0.18, 0.16], [0.28, -0.02], [0.1, -0.18], [-0.2, -0.14], [-0.28, 0.02]],
    pangaea: [-18, 44],
    present: [-24, 134],
    yaw0: 0.3,
    yaw1: 0.05,
  },
];

function shapeGeom(pts: [number, number][]) {
  const s = new THREE.Shape();
  s.moveTo(pts[0]![0], pts[0]![1]);
  for (let i = 1; i < pts.length; i++) s.lineTo(pts[i]![0], pts[i]![1]);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.055, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3 });
  g.rotateX(-Math.PI / 2);
  g.computeVertexNormals();
  return g;
}

function Continent({ def, k, fossils }: { def: CDef; k: number; fossils: boolean }) {
  const geom = useMemo(() => shapeGeom(def.pts), [def.pts]);
  const lat = THREE.MathUtils.lerp(def.pangaea[0], def.present[0], k);
  const lon = THREE.MathUtils.lerp(def.pangaea[1], def.present[1], k);
  const yaw = THREE.MathUtils.lerp(def.yaw0, def.yaw1, k);
  const { pos, quat } = useMemo(() => {
    const p = latLonToVector3(lat, lon, 1.18);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize());
    const spin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    q.multiply(spin);
    return { pos: p, quat: q };
  }, [lat, lon, yaw]);
  return (
    <group position={pos} quaternion={quat}>
      <mesh geometry={geom} castShadow>
        <meshStandardMaterial color={def.color} roughness={0.86} metalness={0.04} />
      </mesh>
      {fossils &&
        def.fossils?.map((p, i) => (
          <mesh key={i} position={[p[0], 0.07, p[1]]}>
            <sphereGeometry args={[0.028, 14, 12]} />
            <meshStandardMaterial color="#F4EFE6" roughness={0.35} metalness={0.08} emissive="#F4EFE6" emissiveIntensity={0.35} />
          </mesh>
        ))}
      <Tag pos={[0, 0.22, 0]} text={def.name} occlude={false} />
    </group>
  );
}

function Drift() {
  useLabTick(1 / 16);
  const t = useLabControls((s) => s.t);
  const playing = useLabControls((s) => s.playing);
  const ageMa = useLabControls((s) => s.params.ageMa ?? 200);
  const fossils = (useLabControls((s) => s.params.fossils) ?? 0) > 0.5;
  const q = useQuality();
  const k = THREE.MathUtils.clamp(playing ? t : 1 - ageMa / 250, 0, 1);
  const age = Math.round((1 - k) * 250);
  const atlantic = k > 0.18;
  return (
    <>
      <Starfield />
      <mesh>
        <sphereGeometry args={[1.12, q.sphere, q.sphere]} />
        <meshStandardMaterial color={PBR.water.color} roughness={0.22} metalness={0.08} />
      </mesh>
      {CONTINENTS.map((c) => (
        <Continent key={c.name} def={c} k={k} fossils={fossils} />
      ))}
      {atlantic && (
        <Arrow3
          from={latLonToVector3(8, -12, 1.22).toArray() as [number, number, number]}
          to={latLonToVector3(8, 8, 1.22).toArray() as [number, number, number]}
          color="#7FD4FF"
          radius={0.018}
        />
      )}
      <Tag pos={latLonToVector3(12, 8, 1.55).toArray() as [number, number, number]} text={k < 0.22 ? "Pangaea 250 Ma" : "Atlantic opening"} tone={k < 0.22 ? "sandstone" : "glacier"} occlude={false} />
      {k < 0.22 && <Tag pos={latLonToVector3(-6, 6, 1.5).toArray() as [number, number, number]} text="Pangaea 250 Ma" tone="moss" occlude={false} />}
      {fossils && <Tag pos={latLonToVector3(4, 2, 1.48).toArray() as [number, number, number]} text="Matching fossils" tone="ice" occlude={false} />}
      <Readout pos={[0, 1.72, 0]}>
        {age < 4 ? "Present" : `${age} Ma`} · t=0 Pangaea, t=1 now · continents ride plates, they do not plough a static ocean
      </Readout>
      <StepCamera
        positions={[
          [0.2, 0.9, 3.6],
          [2.4, 0.6, 2.6],
          [-1.6, 1.4, 3.2],
          [0, 3.2, 2.4],
        ]}
      />
    </>
  );
}

export default function DriftScene() {
  const ageMa = useLabControls((s) => s.params.ageMa ?? 200);
  return (
    <LabStudio
      slug="continental-drift"
      title="Continental drift"
      camera={{ position: [0.2, 0.9, 3.6], fov: 42 }}
      liveText={`${Math.round(ageMa)} million years before present. At 250 Ma the pieces fit as Pangaea. Fossils agree across the young Atlantic.`}
      fallback={
        <GenericFallback
          slug="continental-drift"
          title="Continental drift"
          caption="250 Ma the pieces fit. Fossils match across South America and Africa. Plates are the mechanism."
        />
      }
      minDistance={2.2}
      maxDistance={8}
    >
      <Drift />
    </LabStudio>
  );
}
