import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { HeightField, tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { CurveFlow } from "@/labs/shared/particles";

function hillH(x: number, y: number) {
  const slope = 0.62 - x * 0.1;
  const channel = 0.26 * Math.exp(-(y * y) / 0.11);
  const und = 0.07 * Math.sin(x * 1.7) * Math.cos(y * 2.1);
  return Math.max(0.03, slope + und - channel);
}

function hillColor(urban: number) {
  const rural = new THREE.Color(PBR.crust.color);
  const paved = new THREE.Color("#3a4044");
  return (h: number) => {
    const c = rural.clone().lerp(paved, urban);
    if (h < 0.22) c.lerp(new THREE.Color(PBR.water.color), 0.45);
    return c;
  };
}

function dischargeAt(u: number, urban: number, rain = 1) {
  const lag = 0.4 - urban * 0.2;
  const peak = (0.52 + urban * 1.08) * rain;
  if (u < 0.08) return 0.08;
  if (u < lag) {
    const k = (u - 0.08) / (lag - 0.08);
    return 0.08 + (peak - 0.08) * k ** 1.2;
  }
  return Math.max(0.08, peak * Math.exp(-(u - lag) * (2.05 - urban * 0.65)));
}

function Rain({ t, count }: { t: number; count: number }) {
  const seeds = useMemo(() => {
    const a: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      a.push([-1.55 + (i % 8) * 0.4, 2.15, -0.95 + Math.floor(i / 8) * 0.38]);
    }
    return a;
  }, [count]);
  if (t >= 0.35) return null;
  const fall = t / 0.35;
  return (
    <group>
      {seeds.map((p, i) => (
        <mesh key={i} position={[p[0], p[1] - fall * 1.85 - (i % 5) * 0.04, p[2]]}>
          <sphereGeometry args={[0.028, 10, 10]} />
          <meshBasicMaterial color="#7FD4FF" />
        </mesh>
      ))}
    </group>
  );
}

function Model() {
  useLabTick(1 / 8);
  const t = useLabControls((s) => s.t);
  const urban = useLabControls((s) => s.params.urban ?? 0.2);
  const rain = useLabControls((s) => s.params.rain ?? 1);
  const q = useQuality();
  const rock = useRockNormal();
  const lag = 0.4 - urban * 0.2;
  const peak = (0.52 + urban * 1.08) * rain;
  const qNow = dischargeAt(t, urban, rain);
  const colorFn = useMemo(() => hillColor(urban), [urban]);
  const segs = Math.max(32, Math.floor(q.terrain / 4));

  const channel = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 32; i++) {
      const u = i / 32;
      const x = -1.7 + u * 3.4;
      const z = Math.sin(u * 2.2) * 0.08;
      pts.push([x, hillH(x, z) + 0.04, z]);
    }
    return pts;
  }, []);
  const chTube = useMemo(() => tubeGeometry(channel, 0.045, 32, 10), [channel]);
  const chVec = useMemo(() => channel.map((p) => new THREE.Vector3(...p)), [channel]);

  const graph = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.04);
    for (let i = 0; i <= 48; i++) {
      const u = i / 48;
      shape.lineTo(u * 4.2, 0.04 + dischargeAt(u, urban, rain) * 1.35);
    }
    shape.lineTo(4.2, 0.04);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: 0.22, bevelEnabled: false, steps: 1 });
    g.translate(-2.1, 0, -0.11);
    g.computeVertexNormals();
    return g;
  }, [urban, rain]);

  const gx = -2.1 + t * 4.2;
  const gy = 0.04 + qNow * 1.35;

  return (
    <group>
      <StudioFloor size={12} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]} receiveShadow>
        <circleGeometry args={[7, q.lathe]} />
        <meshStandardMaterial color="#121814" roughness={0.96} normalMap={rock} />
      </mesh>
      <group position={[-1.15, 0, -0.35]}>
        <HeightField fn={hillH} width={4.2} depth={2.6} segX={segs} segZ={Math.floor(segs * 0.7)} colorFn={colorFn} />
        <mesh geometry={chTube}>
          <meshStandardMaterial color={PBR.water.color} roughness={PBR.water.roughness} metalness={PBR.water.metalness} />
        </mesh>
        <CurveFlow pts={chVec} color="#7FD4FF" count={8} radius={0.028} />
        <Rain t={t} count={Math.max(16, q.particles * 2)} />
        {urban > 0.5 &&
          ([-1.1, -0.35, 0.4] as const).map((x) => (
            <mesh key={x} position={[x, 0.42, 0.55]} castShadow>
              <boxGeometry args={[0.42, 0.38, 0.36]} />
              <meshStandardMaterial color="#2a3034" roughness={0.55} metalness={0.14} />
            </mesh>
          ))}
        {urban <= 0.5 &&
          ([-0.9, 0.15, 0.85] as const).map((x) => (
            <mesh key={x} position={[x, 0.48, 0.7]} castShadow>
              <coneGeometry args={[0.16, 0.48, 12]} />
              <meshStandardMaterial color="#3d6a40" roughness={0.86} />
            </mesh>
          ))}
      </group>
      <group position={[2.05, 0.15, 0.55]}>
        <mesh geometry={graph}>
          <meshStandardMaterial color="#3EE0C6" roughness={0.38} metalness={0.08} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[gx, gy + 0.08, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color="#FF6A3D" />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 4.4, 8]} />
          <meshStandardMaterial color="#8B9A97" />
        </mesh>
      </group>
      <Tag pos={[-2.1 + lag * 4.2 + 2.05, 0.2 + peak * 1.35, 0.7]} text="peak" tone="magma" note="Peak discharge after the rain has stopped. Urban cover raises and advances the peak." />
      <Tag pos={[-0.35, 0.55, 1.15]} text="rising limb" tone="glacier" note="The rising limb. Rain plus urban cover steepens it." />
      <Tag pos={[1.15, 0.42, 0.95]} text={`lag ${(lag * 12).toFixed(1)} h`} note="Lag from rain centroid to peak. Urban catchments lag less." />
      <Tag pos={[-2.2, 1.35, -0.2]} text={urban > 0.5 ? "impermeable roofs" : "vegetated hill"} tone="moss" note="Urban cover sheds water. Vegetation stores it. Rain slider is the input." />
      <Readout pos={[0, 2.65, 0]}>
        Urban {Math.round(urban * 100)}% · {t < 0.35 ? "rain falling" : "catchment draining"} · peak {urban > 0.5 ? "higher & earlier" : "later, lower"}
      </Readout>
      <StepCamera
        positions={[
          [0.5, 3.3, 7.3],
          [-2.4, 2.5, 5.1],
          [2.4, 2.2, 5.2],
          [0.5, 3.3, 7.3],
        ]}
      />
    </group>
  );
}

export default function HydrographScene() {
  const urban = useLabControls((s) => s.params.urban ?? 0.2);
  return (
    <LabStudio
      slug="hydrograph"
      title="Storm hydrograph"
      camera={{ position: [0.5, 3.3, 7.3], fov: 40 }}
      liveText={`Storm hydrograph. Urban cover ${Math.round(urban * 100)}%. Rising limb, peak, lag, falling limb.`}
      fallback={<GenericFallback slug="hydrograph" title="Hydrograph" caption="Rain is the input. The river replies after a lag." />}
      minDistance={3}
      maxDistance={14}
    >
      <fog attach="fog" args={["#07090C", 12, 24]} />
      <Model />
    </LabStudio>
  );
}
