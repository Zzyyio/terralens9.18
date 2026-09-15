import { useMemo } from "react";
import * as THREE from "three";
import { EarthMesh, Atmosphere, Starfield } from "@/components/globe/earth";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StepCamera } from "@/labs/shared/kit";
import { PBR } from "@/labs/shared/materials";
import { tubeGeometry } from "@/labs/shared/terrain";
import { GenericFallback } from "@/labs/shared/fallback";
import { CurveFlow } from "@/labs/shared/particles";
import { latLonToVector3 } from "@/lib/geo";
import { useQuality } from "@/labs/shared/perf";

function loopLatLon(lat: number, lon: number, rx: number, ry: number, n: number, r: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const v = latLonToVector3(lat + Math.sin(a) * ry, lon + Math.cos(a) * rx, r);
    pts.push([v.x, v.y, v.z]);
  }
  return pts;
}

function pathLatLon(coords: [number, number][], r: number): [number, number, number][] {
  return coords.map(([lat, lon]) => {
    const v = latLonToVector3(lat, lon, r);
    return [v.x, v.y, v.z];
  });
}

function WarmTube({
  pts,
  radius,
  color,
}: {
  pts: [number, number, number][];
  radius: number;
  color: string;
}) {
  const geom = useMemo(() => tubeGeometry(pts, radius, Math.max(32, pts.length * 2), 10), [pts, radius]);
  return (
    <mesh geometry={geom}>
      <meshStandardMaterial color={color} roughness={0.28} metalness={0.12} />
    </mesh>
  );
}

function Currents() {
  useLabTick(1 / 14);
  const q = useQuality();
  const r = q.particles > 12 ? 0.016 : 0.02;
  const nAtl = useMemo(() => loopLatLon(28, -42, 34, 14, 40, 1.038), []);
  const nPac = useMemo(() => loopLatLon(26, -165, 42, 16, 44, 1.038), []);
  const sAtl = useMemo(() => loopLatLon(-22, -18, 28, 14, 36, 1.036), []);
  const gulf = useMemo(
    () =>
      pathLatLon(
        [
          [24, -80],
          [27, -79],
          [31, -76],
          [35, -72],
          [38, -62],
          [42, -50],
          [48, -38],
          [52, -22],
          [55, -10],
        ],
        1.044,
      ),
    [],
  );
  const canary = useMemo(
    () =>
      pathLatLon(
        [
          [36, -18],
          [28, -22],
          [20, -24],
          [12, -22],
        ],
        1.04,
      ),
    [],
  );
  const gulfVec = useMemo(() => gulf.map((p) => new THREE.Vector3(...p)), [gulf]);
  const nAtlVec = useMemo(() => nAtl.map((p) => new THREE.Vector3(...p)), [nAtl]);
  const nPacVec = useMemo(() => nPac.map((p) => new THREE.Vector3(...p)), [nPac]);

  return (
    <group>
      <WarmTube pts={nAtl} radius={r} color="#3d7ea6" />
      <WarmTube pts={nPac} radius={r} color="#2f6f9e" />
      <WarmTube pts={sAtl} radius={r * 0.9} color="#2a628c" />
      <WarmTube pts={gulf} radius={r * 1.7} color="#e24b2a" />
      <WarmTube pts={canary} radius={r * 0.85} color="#7FD4FF" />
      <CurveFlow pts={gulfVec} color="#FF6A3D" count={12} radius={0.02} />
      <CurveFlow pts={nAtlVec} color="#E8B86D" count={8} radius={0.015} />
      <CurveFlow pts={nPacVec} color="#7FD4FF" count={8} radius={0.015} />
    </group>
  );
}

export default function OceanCurrentsScene() {
  const sun = useMemo(() => new THREE.Vector3(3, 0.45, 2), []);
  return (
    <LabStudio
      slug="ocean-currents"
      title="Ocean currents"
      camera={{ position: [0.15, 0.55, 3.35], fov: 40 }}
      liveText="Gyres as loops. Gulf Stream is a warm western-boundary ribbon — it helps Britain, it does not magically heat it alone."
      fallback={<GenericFallback slug="ocean-currents" title="Ocean currents" caption="Gyres as loops. Gulf Stream as a warm ribbon." />}
      minDistance={1.6}
      maxDistance={8}
      target={[0, 0, 0]}
    >
      <Starfield />
      <EarthMesh sunDirection={sun} />
      <Atmosphere />
      <Currents />
      <Tag
        pos={latLonToVector3(38, -62, 1.28).toArray() as [number, number, number]}
        text="Gulf Stream"
        tone="magma"
        occlude={false}
      />
      <Tag
        pos={latLonToVector3(28, -42, 1.26).toArray() as [number, number, number]}
        text="gyre · N Atlantic"
        tone="glacier"
        occlude={false}
      />
      <Tag
        pos={latLonToVector3(52, -8, 1.3).toArray() as [number, number, number]}
        text="helps — not a magic heater"
        tone="sandstone"
        occlude={false}
      />
      <Tag
        pos={latLonToVector3(26, -165, 1.26).toArray() as [number, number, number]}
        text="gyre · N Pacific"
        tone="ice"
        occlude={false}
      />
      <Readout pos={[0, 1.58, 0]}>
        Colour is temperature · the Gulf Stream helps the UK but does not magically heat Britain alone
      </Readout>
      <StepCamera
        positions={[
          [0.15, 0.55, 3.35],
          [1.55, 0.82, 2.4],
          [-0.4, 1.35, 2.55],
          [0.15, 0.55, 3.35],
        ]}
      />
      <mesh visible={false}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial color={PBR.water.color} roughness={PBR.water.roughness} />
      </mesh>
    </LabStudio>
  );
}
