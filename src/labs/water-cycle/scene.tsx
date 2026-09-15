import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR, useRockNormal, useSoilNormal } from "@/labs/shared/materials";
import { heightGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { CurveFlow } from "@/labs/shared/particles";

function landH(x: number, z: number) {
  const shore = 1 / (1 + Math.exp(-(x + 1.35) * 3.2));
  const mt = 1.95 * Math.exp(-((x - 2.55) ** 2 + (z + 0.85) ** 2) / 1.45);
  const hills = 0.16 * Math.sin(x * 1.15) * Math.sin(z * 1.35) * shore;
  const lake = -0.28 * Math.exp(-((x - 0.35) ** 2 + (z - 0.75) ** 2) / 0.42);
  const res = -0.22 * Math.exp(-((x - 1.45) ** 2 + (z - 1.4) ** 2) / 0.2);
  return shore * 0.32 + mt + hills + lake + res;
}

function Terrain() {
  const q = useQuality();
  const nrm = useSoilNormal();
  const rock = useRockNormal();
  const geom = useMemo(
    () =>
      heightGeometry(landH, {
        width: 10.4,
        depth: 6.6,
        segX: q.terrain,
        segZ: Math.floor(q.terrain / 2),
        colorFn: (h) => {
          const c = new THREE.Color();
          if (h < 0.08) c.set("#3d5340");
          else if (h < 0.65) c.set(PBR.crust.color);
          else if (h < 1.35) c.set("#8a7a48");
          else c.set("#d8d0c0");
          return c;
        },
      }),
    [q.terrain],
  );
  return (
    <mesh geometry={geom} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
      <meshStandardMaterial
        vertexColors
        roughness={0.92}
        metalness={0.02}
        normalMap={nrm}
        normalScale={new THREE.Vector2(0.55, 0.55)}
      />
      <mesh position={[2.55, 0.85, 1.55]} visible={false} material-normalMap={rock} />
    </mesh>
  );
}

function Stores() {
  const abs = useLabControls((s) => s.params.abstraction ?? 0);
  const basin = (useLabControls((s) => s.params.basin) ?? 0) > 0.5;
  const lakeH = 0.22 - abs * 0.08;
  const resH = 0.38 - abs * 0.32;
  const q = useQuality();
  const rock = useRockNormal();

  const evap = useMemo(
    () => [
      new THREE.Vector3(-3.15, 0.22, 0.15),
      new THREE.Vector3(-2.1, 1.35, 0.05),
      new THREE.Vector3(-0.4, 2.45, -0.15),
      new THREE.Vector3(0.6, 2.7, -0.2),
    ],
    [],
  );
  const precip = useMemo(
    () => [
      new THREE.Vector3(0.7, 2.65, -0.15),
      new THREE.Vector3(1.7, 2.4, -0.5),
      new THREE.Vector3(2.45, 2.05, -0.75),
    ],
    [],
  );
  const melt = useMemo(
    () => [
      new THREE.Vector3(2.2, 1.55, -0.45),
      new THREE.Vector3(1.5, 0.85, 0.15),
      new THREE.Vector3(0.45, 0.28, 0.7),
    ],
    [],
  );
  const infiltrate = useMemo(
    () => [
      new THREE.Vector3(0.4, 0.18, 0.7),
      new THREE.Vector3(0.15, -0.12, 0.55),
      new THREE.Vector3(-0.6, -0.28, 0.2),
    ],
    [],
  );
  const gw = useMemo(
    () => [
      new THREE.Vector3(-0.55, -0.28, 0.15),
      new THREE.Vector3(-1.6, -0.32, 0.05),
      new THREE.Vector3(-2.7, -0.18, 0.1),
      new THREE.Vector3(-3.1, 0.05, 0.12),
    ],
    [],
  );
  const transpire = useMemo(
    () => [
      new THREE.Vector3(2.05, 1.05, 1.15),
      new THREE.Vector3(1.4, 1.85, 0.55),
      new THREE.Vector3(0.55, 2.55, 0.05),
    ],
    [],
  );
  const runoff = useMemo(
    () => [
      new THREE.Vector3(1.45, 0.12 + resH, 1.35),
      new THREE.Vector3(0.9, 0.22, 1.0),
      new THREE.Vector3(0.4, 0.2, 0.75),
    ],
    [resH],
  );

  return (
    <group>
      {/* Ocean basin volume */}
      <mesh position={[-3.25, -0.42, 0.1]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[1.85, 2.05, 0.85, 32, 1, true]} />
        <meshStandardMaterial
          color={PBR.rock.color}
          roughness={0.94}
          metalness={0.04}
          side={THREE.DoubleSide}
          normalMap={rock}
          normalScale={new THREE.Vector2(0.7, 0.7)}
        />
      </mesh>
      <mesh position={[-3.25, -0.84, 0.1]}>
        <cylinderGeometry args={[2.05, 2.05, 0.08, 32]} />
        <meshStandardMaterial color={PBR.basalt.color} roughness={0.9} />
      </mesh>
      <mesh position={[-3.25, -0.18, 0.1]}>
        <cylinderGeometry args={[1.72, 1.72, 0.62, q.lathe]} />
        <meshStandardMaterial
          color={PBR.water.color}
          roughness={PBR.water.roughness}
          metalness={PBR.water.metalness}
          transparent
          opacity={0.86}
        />
      </mesh>

      {/* Atmosphere shell */}
      <mesh position={[0.2, 0.05, 0]}>
        <sphereGeometry args={[4.15, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        <meshStandardMaterial
          color="#7FD4FF"
          transparent
          opacity={0.07}
          roughness={0.15}
          metalness={0.02}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Ice sheet volume on the mountain */}
      <mesh position={[2.55, 1.72, -0.85]} rotation={[0.12, 0.2, -0.08]} castShadow>
        <sphereGeometry args={[0.62, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.72]} />
        <meshStandardMaterial
          color={PBR.ice.color}
          roughness={PBR.ice.roughness}
          metalness={PBR.ice.metalness}
          transparent
          opacity={0.58}
        />
      </mesh>
      <mesh position={[2.35, 1.35, -0.55]} rotation={[0.55, 0.1, 0]}>
        <cylinderGeometry args={[0.28, 0.42, 0.7, 12]} />
        <meshStandardMaterial
          color={PBR.ice.color}
          roughness={PBR.ice.roughness}
          metalness={PBR.ice.metalness}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Soil volume (cut face) */}
      <mesh position={[0.85, 0.02, 2.05]} castShadow>
        <boxGeometry args={[3.6, 0.22, 0.55]} />
        <meshStandardMaterial color={PBR.soil.color} roughness={PBR.soil.roughness} metalness={PBR.soil.metalness} />
      </mesh>

      {/* Groundwater block */}
      <mesh position={[0.55, -0.28, 1.55]}>
        <boxGeometry args={[3.2, 0.42, 1.4]} />
        <meshStandardMaterial
          color="#2a5a6a"
          roughness={0.35}
          metalness={0.06}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Lake volume */}
      <mesh position={[0.35, lakeH * 0.5, 0.75]}>
        <cylinderGeometry args={[0.62, 0.68, Math.max(0.06, lakeH), 24]} />
        <meshStandardMaterial
          color={PBR.water.color}
          roughness={PBR.water.roughness}
          metalness={PBR.water.metalness}
        />
      </mesh>

      {/* Reservoir volume — abstraction mines this local store */}
      <mesh position={[1.45, resH * 0.5 + 0.02, 1.38]}>
        <cylinderGeometry args={[0.42, 0.48, Math.max(0.05, resH), 20]} />
        <meshStandardMaterial
          color={PBR.water.color}
          roughness={PBR.water.roughness}
          metalness={PBR.water.metalness}
        />
      </mesh>
      <mesh position={[1.45, 0.01, 1.38]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.48, 0.56, 20]} />
        <meshStandardMaterial color="#8B9A97" side={THREE.DoubleSide} roughness={0.8} />
      </mesh>

      {/* Vegetation for transpiration */}
      <mesh position={[2.05, 0.55, 1.15]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.7, 6]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
      <mesh position={[2.05, 1.05, 1.15]} castShadow>
        <sphereGeometry args={[0.32, 12, 12]} />
        <meshStandardMaterial color="#3d6a40" roughness={0.85} />
      </mesh>

      {basin && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.85, 0.12, 0.55]}>
          <ringGeometry args={[0.35, 2.35, 48, 1, 0.15, Math.PI * 1.55]} />
          <meshStandardMaterial
            color="#3EE0C6"
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
            roughness={0.4}
            depthWrite={false}
          />
        </mesh>
      )}

      <CurveFlow pts={evap} color="#7FD4FF" count={12} radius={0.04} />
      <CurveFlow pts={precip} color="#F4EFE6" count={10} radius={0.04} />
      <CurveFlow pts={melt} color="#3EE0C6" count={8} radius={0.038} />
      <CurveFlow pts={infiltrate} color="#E8B86D" count={7} radius={0.035} />
      <CurveFlow pts={gw} color="#8B9A97" count={8} radius={0.035} />
      <CurveFlow pts={transpire} color="#7C9A6A" count={7} radius={0.032} />
      <CurveFlow pts={runoff} color="#7FD4FF" count={6} radius={0.032} />
    </group>
  );
}

function Model() {
  useLabTick(1 / 10);
  const abs = useLabControls((s) => s.params.abstraction ?? 0);
  const basin = (useLabControls((s) => s.params.basin) ?? 0) > 0.5;
  return (
    <group>
      <StudioFloor size={12} />
      <Terrain />
      <Stores />
      <Tag pos={[-3.25, 0.85, 0.2]} text="Ocean basin" tone="ice" />
      <Tag pos={[0.6, 3.05, -0.2]} text="Atmosphere shell" tone="glacier" />
      <Tag pos={[2.55, 2.45, -0.85]} text="Ice sheet" tone="ice" />
      <Tag pos={[0.55, 0.15, 2.15]} text="Groundwater" />
      <Tag pos={[0.85, 0.45, 2.05]} text="Soil" tone="sandstone" />
      <Tag pos={[0.35, 0.55, 0.75]} text="Lake" tone="glacier" />
      <Tag pos={[1.45, 0.7, 1.38]} text="Reservoir" tone="moss" />
      <Tag pos={[2.05, 1.55, 1.15]} text="Transpiration" tone="moss" />
      <Readout pos={[0, 3.45, 0]}>
        Closed globally · local deficit {Math.round(abs * 100)}%
        {basin ? " · basin overlay on" : ""}
      </Readout>
      <StepCamera
        positions={[
          [0.3, 3.8, 8.2],
          [-3.4, 2.2, 5.4],
          [2.4, 2.8, 5.6],
          [0.3, 3.8, 8.2],
        ]}
      />
    </group>
  );
}

export default function WaterCycleScene() {
  const abs = useLabControls((s) => s.params.abstraction ?? 0);
  return (
    <LabStudio
      slug="water-cycle"
      title="Water cycle stores and flows"
      camera={{ position: [0.3, 3.8, 8.2], fov: 40 }}
      liveText={`Water cycle. Abstraction ${Math.round(abs * 100)}% lowers the reservoir, not the ocean.`}
      fallback={<GenericFallback slug="water-cycle" title="Water cycle" caption="Stores as volumes. Abstraction mines the local reservoir." />}
      minDistance={3.2}
      maxDistance={16}
    >
      <fog attach="fog" args={["#07090C", 14, 28]} />
      <Model />
    </LabStudio>
  );
}
