import { useMemo } from "react";
import * as THREE from "three";
import { Atmosphere, EarthMesh, Starfield } from "@/components/globe/earth";
import { latLonToVector3 } from "@/lib/geo";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Arrow3, Readout, StepCamera, Tag } from "@/labs/shared/kit";
import { PBR } from "@/labs/shared/materials";
import { latheGeometry, tubeGeometry, volcanoProfile } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const SUN = new THREE.Vector3(3.1, 0.55, 1.7);
const PLUME: [number, number] = [19.4, -155.3];
const YELLOW: [number, number] = [44.6, -110.6];
const AGES = [0, 1, 3, 5, 7, 10];

function ll(lat: number, lon: number, r: number): [number, number, number] {
  const v = latLonToVector3(lat, lon, r);
  return [v.x, v.y, v.z];
}

function orient(lat: number, lon: number, r: number) {
  const p = latLonToVector3(lat, lon, r);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize());
  return { p, q };
}

function Plume({ lat, lon, color }: { lat: number; lon: number; color: string }) {
  const { p, q } = useMemo(() => orient(lat, lon, 0.72), [lat, lon]);
  return (
    <group position={p} quaternion={q}>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.018, 0.045, 0.55, 20]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.038, 20, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.85} roughness={0.3} />
      </mesh>
    </group>
  );
}

function HawaiiPlate({ t }: { t: number }) {
  const q = useQuality();
  const young = useMemo(() => latheGeometry(volcanoProfile(0.28), q.lathe), [q.lathe]);
  const old = useMemo(() => latheGeometry(volcanoProfile(0.58), q.lathe), [q.lathe]);
  const { p, q: quat } = useMemo(() => orient(PLUME[0], PLUME[1], 1.018), []);
  const path = useMemo(() => {
    const pts: [number, number, number][] = AGES.map((_, i) => [-(i * 0.095), 0.012, -(i * 0.058)]);
    return tubeGeometry(pts, 0.006, 20, 8);
  }, []);
  return (
    <group position={p} quaternion={quat}>
      <group position={[-t * 0.32, 0, -t * 0.18]}>
        <mesh geometry={path}>
          <meshStandardMaterial color="#E8B86D" roughness={0.4} metalness={0.1} />
        </mesh>
        {AGES.map((age, i) => {
          const scale = THREE.MathUtils.lerp(0.055, 0.028, Math.min(1, age / 10));
          return (
            <group key={age} position={[-(i * 0.095), 0, -(i * 0.058)]}>
              <mesh geometry={age < 2 ? young : old} scale={scale} castShadow>
                <meshStandardMaterial
                  color={age >= 7 ? PBR.basalt.color : age === 0 ? PBR.magma.color : PBR.rock.color}
                  roughness={0.82}
                  metalness={0.06}
                  emissive={age === 0 ? PBR.magma.emissive : "#000000"}
                  emissiveIntensity={age === 0 ? 0.55 : 0}
                />
              </mesh>
              <Tag pos={[0, scale * 2.5, 0]} text={`${age} Ma`} tone={age === 0 ? "magma" : "sandstone"} occlude={false} />
            </group>
          );
        })}
      </group>
    </group>
  );
}

function Slab() {
  const q = useQuality();
  const { p, q: quat } = useMemo(() => orient(YELLOW[0], YELLOW[1], 1.045), []);
  const track = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const v = latLonToVector3(YELLOW[0] - i * 1.15, YELLOW[1] - i * 1.7, 1.05);
      pts.push([v.x, v.y, v.z]);
    }
    return tubeGeometry(pts, 0.01, 24, 8);
  }, []);
  return (
    <group>
      <group position={p} quaternion={quat}>
        <mesh castShadow>
          <boxGeometry args={[0.46, 0.045, 0.28, 14, 2, 10]} />
          <meshStandardMaterial color={PBR.crust.color} roughness={0.88} metalness={0.03} />
        </mesh>
        <mesh position={[0.1, 0.035, -0.03]}>
          <cylinderGeometry args={[0.04, 0.048, 0.035, Math.max(16, q.lathe / 4)]} />
          <meshStandardMaterial color={PBR.ash.color} roughness={0.8} metalness={0.04} />
        </mesh>
      </group>
      <mesh geometry={track}>
        <meshStandardMaterial color="#E8B86D" roughness={0.45} metalness={0.08} />
      </mesh>
      <Plume lat={YELLOW[0]} lon={YELLOW[1]} color="#FF6A3D" />
      <Tag pos={ll(YELLOW[0], YELLOW[1], 1.28)} text="Yellowstone plume" tone="magma" occlude={false} />
    </group>
  );
}

function Stage() {
  useLabTick(1 / 14);
  const t = useLabControls((s) => s.t);
  const hi = (useLabControls((s) => s.params.hawaii) ?? 1) > 0.5;
  const ye = (useLabControls((s) => s.params.yellowstone) ?? 0) > 0.5;
  return (
    <>
      <Starfield />
      <EarthMesh sunDirection={SUN} />
      <Atmosphere />
      {hi && (
        <>
          <HawaiiPlate t={t} />
          <Plume lat={PLUME[0]} lon={PLUME[1]} color="#FF8A3A" />
          <Arrow3 from={ll(22, -158, 1.12)} to={ll(26, -166, 1.12)} color="#7FD4FF" radius={0.014} />
          <Tag pos={ll(PLUME[0] - 4, PLUME[1], 1.26)} text="plume fixed" tone="magma" occlude={false} />
          <Tag pos={ll(24, -162, 1.28)} text="plate moves" tone="glacier" occlude={false} />
          <Tag pos={ll(26.5, -168, 1.24)} text="age direction NW" tone="sandstone" occlude={false} />
        </>
      )}
      {ye && <Slab />}
      <Readout pos={[0, 1.58, 0]}>
        Hawaii 0–10 Ma · plume stays, Pacific plate slides NW · Yellowstone is a second plume under a continent slab
      </Readout>
      <StepCamera
        positions={[
          ll(20, -158, 3.2),
          [0.4, 1.1, 3.4],
          ll(44, -112, 3.1),
          [0, 2.6, 3.4],
        ]}
      />
    </>
  );
}

export default function HotspotsScene() {
  return (
    <LabStudio
      slug="hotspots"
      title="Hotspots"
      camera={{ position: [0.4, 1.1, 3.4], fov: 42 }}
      liveText="Hawaii ages northwest. The plume is fixed; the Pacific plate moves. Yellowstone is a second, continental plume."
      fallback={
        <GenericFallback
          slug="hotspots"
          title="Hotspots"
          caption="Hawaii: young island, older seamounts northwest. The plume stays. The plate slides. Yellowstone is the continental analogue."
        />
      }
      minDistance={2.1}
      maxDistance={7}
    >
      <Stage />
    </LabStudio>
  );
}
