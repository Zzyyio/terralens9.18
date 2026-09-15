import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR } from "@/labs/shared/materials";
import { tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

function useWedge(run: number, height: number, width: number, lip: number) {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(run, 0);
    s.lineTo(lip, height);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: width, bevelEnabled: false, steps: 1 });
    g.translate(0, 0, -width / 2);
    g.computeVertexNormals();
    return g;
  }, [run, height, width, lip]);
}

function RainBand({
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
    () => tubeGeometry(pts, radius, Math.max(24, q.sphere / 3), 10),
    [pts, radius, q.sphere],
  );
  return (
    <mesh geometry={geom}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.4}
        roughness={0.85}
        depthWrite={false}
      />
    </mesh>
  );
}

const RAIN_COLD: [number, number, number][] = Array.from({ length: 15 }, (_, i) => [
  1.92,
  0.95,
  -1.45 + (i / 14) * 2.9,
]);
const RAIN_WARM: [number, number, number][] = Array.from({ length: 15 }, (_, i) => [
  -3.65,
  0.52,
  -1.45 + (i / 14) * 2.9,
]);

function Fronts() {
  useLabTick(1 / 14);
  const t = useLabControls((s) => s.t);
  const q = useQuality();
  const occ = t > 0.62;
  const coldX = -3.15 + t * 2.7;
  const warmX = 4.35 - t * 1.45;
  const lift = occ ? 0.38 + (t - 0.62) * 0.75 : 0;

  const coldGeom = useWedge(2.05, 1.18, 3.1, 0.38);
  const warmGeom = useWedge(3.4, 0.78, 3.1, 2.45);
  const coldAir = useWedge(3.2, 0.32, 3.1, 2.7);

  return (
    <group>
      <StudioFloor size={12} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[5.2, Math.max(32, q.sphere / 2)]} />
        <meshStandardMaterial color="#1C2628" roughness={0.94} metalness={0.02} />
      </mesh>

      <mesh geometry={coldAir} position={[warmX - 0.35, 0.02, 0]}>
        <meshStandardMaterial
          color={PBR.ice.color}
          transparent
          opacity={0.22}
          roughness={PBR.ice.roughness}
          depthWrite={false}
        />
      </mesh>

      <mesh geometry={coldGeom} position={[coldX, 0.02, 0]} castShadow>
        <meshStandardMaterial color="#4aa0d4" roughness={0.48} metalness={0.06} transparent opacity={0.9} />
      </mesh>
      <mesh geometry={warmGeom} position={[warmX, 0.02 + lift, 0]} rotation={[0, Math.PI, 0]} castShadow>
        <meshStandardMaterial color="#E24B4B" roughness={0.52} metalness={0.05} transparent opacity={0.78} />
      </mesh>

      <group position={[coldX, 0, 0]}>
        <RainBand pts={RAIN_COLD} color="#F4EFE6" radius={0.16} />
      </group>
      <group position={[warmX, lift, 0]}>
        <RainBand pts={RAIN_WARM} color="#c8d8e4" radius={0.13} />
      </group>

      {occ && (
        <mesh position={[(coldX + warmX) * 0.5 - 0.4, 1.12 + lift, 0]}>
          <sphereGeometry args={[0.42, Math.max(16, q.sphere / 4), Math.max(16, q.sphere / 4)]} />
          <meshStandardMaterial
            color="#E8B86D"
            transparent
            opacity={0.55}
            roughness={0.6}
            depthWrite={false}
          />
        </mesh>
      )}

      <Tag pos={[coldX + 0.7, 1.45, 1.7]} text="cold wedge" tone="ice" occlude={false} note="Denser cold air undercuts. The slope is the front, not a TV-map line." />
      <Tag pos={[warmX - 1.6, 1.15 + lift, -1.7]} text="warm overrunning" tone="magma" occlude={false} note="Warm air rides up the cold wedge. Rain sits on the slope." />
      <Tag pos={[coldX + 1.9, 1.28, 0.15]} text="rain" tone="glacier" occlude={false} note="Narrow, heavier band on the cold front. Broader drizzle on the warm." />
      {occ && <Tag pos={[0.2, 1.9, 0]} text="occlusion" tone="sandstone" occlude={false} note="The cold wedge has caught the warm. The warm sector lifts off the ground." />}
      <Readout pos={[0, 2.55, 0]}>
        Fronts are wedges, not TV-map lines · {occ ? "cold has caught the warm" : "play to occlude"}
      </Readout>
      <StepCamera
        positions={[
          [0.2, 2.6, 6.4],
          [-2.8, 1.6, 4.6],
          [3.0, 1.8, 4.8],
          [0.2, 2.6, 6.4],
        ]}
      />
    </group>
  );
}

export default function FrontsScene() {
  const t = useLabControls((s) => s.t);
  return (
    <LabStudio
      slug="fronts"
      title="Fronts as wedges"
      camera={{ position: [0.2, 2.6, 6.4], fov: 40 }}
      liveText={
        t > 0.62
          ? "Occlusion: the cold wedge has caught the warm ramp. Rain sits on the slopes."
          : "Cold air undercuts as a steep blue wedge. Warm air overruns on a gentle ramp."
      }
      exaggeration="Vertical ×40. A real cold front slope is ~1:50 to 1:100."
      fallback={
        <GenericFallback
          slug="fronts"
          title="Fronts"
          caption="A cold front is a dense blue wedge. A warm front is a gentle ramp. Rain lives on the slope."
        />
      }
    >
      <Fronts />
    </LabStudio>
  );
}
