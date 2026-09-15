import { useMemo } from "react";
import * as THREE from "three";
import { EarthMesh, Atmosphere, Starfield } from "@/components/globe/earth";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StepCamera } from "@/labs/shared/kit";
import { PBR } from "@/labs/shared/materials";
import { tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { latLonToVector3 } from "@/lib/geo";

const SUN = new THREE.Vector3(3.2, 0.55, 2.1);
const LON_A = 18;
const LON_B = -162;

function ll(lat: number, lon: number, r: number): [number, number, number] {
  const v = latLonToVector3(lat, lon, r);
  return [v.x, v.y, v.z];
}

/** Closed meridional cell: aloft latA→latB, return at the surface. */
function meridCell(latA: number, latB: number, lon: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const n = 16;
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const lat = latA + (latB - latA) * u;
    pts.push(ll(lat, lon, 1.05 + 0.2 * Math.sin(u * Math.PI)));
  }
  for (let i = n; i >= 0; i--) {
    const u = i / n;
    const lat = latA + (latB - latA) * u;
    pts.push(ll(lat, lon, 1.03));
  }
  return pts;
}

function CellTube({
  pts,
  color,
  radius,
}: {
  pts: [number, number, number][];
  color: string;
  radius: number;
}) {
  const q = useQuality();
  const geom = useMemo(
    () => tubeGeometry(pts, radius, Math.max(48, q.sphere), 10),
    [pts, radius, q.sphere],
  );
  return (
    <mesh geometry={geom}>
      <meshStandardMaterial color={color} roughness={0.42} metalness={0.06} transparent opacity={0.78} />
    </mesh>
  );
}

function Cap({ lat }: { lat: number }) {
  const q = useQuality();
  const { pos, quat } = useMemo(() => {
    const p = latLonToVector3(lat, 0, 1.012);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      p.clone().normalize(),
    );
    return { pos: p, quat };
  }, [lat]);
  return (
    <mesh position={pos} quaternion={quat}>
      <circleGeometry args={[0.22, Math.max(20, q.sphere / 4)]} />
      <meshStandardMaterial
        color={PBR.ice.color}
        roughness={PBR.ice.roughness}
        metalness={PBR.ice.metalness}
        transparent
        opacity={0.55}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Cells() {
  useLabTick(1 / 22);
  const t = useLabControls((s) => s.t);
  const itcz = Math.round(Math.sin((t - 0.22) * Math.PI * 2) * 10);

  const nhH = useMemo(() => meridCell(itcz, 30, LON_A), [itcz]);
  const nhF = useMemo(() => meridCell(60, 30, LON_A), []);
  const nhP = useMemo(() => meridCell(60, 88, LON_A), []);
  const shH = useMemo(() => meridCell(itcz, -30, LON_A), [itcz]);
  const shF = useMemo(() => meridCell(-60, -30, LON_A), []);
  const shP = useMemo(() => meridCell(-60, -88, LON_A), []);
  const nhH2 = useMemo(() => meridCell(itcz, 30, LON_B), [itcz]);
  const shH2 = useMemo(() => meridCell(itcz, -30, LON_B), [itcz]);
  const nhF2 = useMemo(() => meridCell(60, 30, LON_B), []);
  const nhP2 = useMemo(() => meridCell(60, 88, LON_B), []);

  return (
    <group>
      <Starfield />
      <EarthMesh sunDirection={SUN} />
      <Atmosphere />
      <Cap lat={90} />
      <Cap lat={-90} />
      <CellTube pts={nhH} color="#FF6A3D" radius={0.022} />
      <CellTube pts={nhF} color="#E8B86D" radius={0.02} />
      <CellTube pts={nhP} color="#7FD4FF" radius={0.018} />
      <CellTube pts={shH} color="#FF6A3D" radius={0.022} />
      <CellTube pts={shF} color="#E8B86D" radius={0.02} />
      <CellTube pts={shP} color="#7FD4FF" radius={0.018} />
      <CellTube pts={nhH2} color="#FF6A3D" radius={0.018} />
      <CellTube pts={shH2} color="#FF6A3D" radius={0.018} />
      <CellTube pts={nhF2} color="#E8B86D" radius={0.016} />
      <CellTube pts={nhP2} color="#7FD4FF" radius={0.015} />

      <Tag pos={ll(itcz, 8, 1.55)} text="ITCZ" tone="moss" occlude={false} />
      <Tag pos={ll(16, 28, 1.58)} text="Hadley 0–30" tone="magma" occlude={false} />
      <Tag pos={ll(45, 28, 1.52)} text="Ferrel 30–60" tone="sandstone" occlude={false} />
      <Tag pos={ll(74, 20, 1.48)} text="Polar 60–90" tone="ice" occlude={false} />
      <Tag pos={ll(52, -8, 1.5)} text="surface westerlies" tone="glacier" occlude={false} />
      <Tag pos={ll(12, -20, 1.46)} text="NE trades" tone="magma" occlude={false} />
      <Readout pos={[0, 1.58, 0]}>
        Three cells per hemisphere · ITCZ {itcz >= 0 ? `${itcz}°N` : `${-itcz}°S`} · not a one-cell
        planet
      </Readout>
      <StepCamera
        positions={[
          [0.2, 0.35, 3.35],
          [1.6, 0.9, 2.4],
          [0.15, 1.85, 2.5],
          [0.2, 0.35, 3.35],
        ]}
      />
    </group>
  );
}

export default function ThreeCellScene() {
  const t = useLabControls((s) => s.t);
  const itcz = Math.round(Math.sin((t - 0.22) * Math.PI * 2) * 10);
  return (
    <LabStudio
      slug="three-cell"
      title="Three-cell circulation"
      camera={{ position: [0.2, 0.35, 3.35], fov: 40 }}
      liveText={`Hadley, Ferrel and Polar cells in both hemispheres. ITCZ near ${itcz}°. UK sits in the surface westerlies.`}
      exaggeration="Cells are school loops. Real midlatitudes are stormier than a clean Ferrel cell."
      fallback={
        <GenericFallback
          slug="three-cell"
          title="Three-cell circulation"
          caption="Hadley 0–30, Ferrel 30–60, Polar 60–90. The ITCZ walks with the seasons. One cell is the textbook error."
        />
      }
      minDistance={1.7}
      maxDistance={7}
      target={[0, 0, 0]}
    >
      <Cells />
    </LabStudio>
  );
}
