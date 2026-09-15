import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3, SceneToggles, SceneBtn } from "@/labs/shared/kit";
import { PBR } from "@/labs/shared/materials";
import { tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

function commaPts(): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= 32; i++) {
    const u = i / 32;
    const a = -0.35 + u * Math.PI * 1.42;
    const r = 0.42 + u * 1.72;
    pts.push([Math.cos(a) * r, 0.22 + (1 - u) * 0.16, Math.sin(a) * r]);
  }
  return pts;
}

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

function System() {
  useLabTick(1 / 12);
  const t = useLabControls((s) => s.t);
  const anti = (useLabControls((s) => s.params.anti) ?? 0) > 0.5;
  const q = useQuality();
  const segs = Math.max(20, Math.round(q.sphere / 3));
  const comma = useMemo(() => commaPts(), []);
  const commaGeom = useMemo(
    () => tubeGeometry(comma, 0.22, Math.max(40, q.sphere), 10),
    [comma, q.sphere],
  );
  const coldW = useWedge(1.55, 0.55, 0.85, 0.28);
  const warmW = useWedge(1.85, 0.38, 0.85, 1.25);
  const rot = t * Math.PI * 1.15;

  return (
    <group>
      <StudioFloor size={12} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[5.4, Math.max(32, q.sphere / 2)]} />
        <meshStandardMaterial color={PBR.water.color} roughness={0.28} metalness={0.08} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0.2, 0.12]} position={[-0.5, 0.04, 0.12]} scale={[0.7, 1.25, 1]}>
        <circleGeometry args={[0.48, segs]} />
        <meshStandardMaterial
          color={PBR.soil.color}
          roughness={PBR.soil.roughness}
          metalness={PBR.soil.metalness}
        />
      </mesh>
      <Tag pos={[-0.55, 0.22, 0.15]} text="UK" tone="moss" occlude={false} />
      <Tag pos={[1.6, 0.18, 1.1]} text="North Sea" tone="ice" occlude={false} />
      <Tag pos={[-2.1, 0.18, -1.4]} text="Atlantic" tone="glacier" occlude={false} />

      {!anti ? (
        <group rotation={[0, rot, 0]}>
          <mesh geometry={commaGeom}>
            <meshStandardMaterial
              color="#e8eef2"
              transparent
              opacity={0.42}
              roughness={0.9}
              depthWrite={false}
            />
          </mesh>
          <mesh geometry={coldW} position={[0.55, 0.02, 1.05]} rotation={[0, 0.85, 0]}>
            <meshStandardMaterial color="#4aa0d4" transparent opacity={0.8} roughness={0.5} />
          </mesh>
          <mesh geometry={warmW} position={[1.15, 0.02, -0.15]} rotation={[0, -0.35, 0]}>
            <meshStandardMaterial color="#E24B4B" transparent opacity={0.72} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.16, segs, segs]} />
            <meshStandardMaterial color="#7FD4FF" emissive="#3EE0C6" emissiveIntensity={0.35} />
          </mesh>
          <Tag pos={[0, 0.55, 0]} text="LOW" tone="ice" occlude={false} />
          <Tag pos={[0.9, 0.85, 1.35]} text="cold front" tone="ice" occlude={false} />
          <Tag pos={[1.6, 0.7, -0.2]} text="warm front" tone="magma" occlude={false} />
        </group>
      ) : (
        <group>
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[1.55, segs, segs, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
            <meshStandardMaterial
              color="#E8B86D"
              transparent
              opacity={0.16}
              roughness={0.35}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          <Arrow3 from={[0, 1.55, 0]} to={[0, 0.35, 0]} color="#E8B86D" radius={0.045} />
          <Arrow3 from={[0.7, 1.35, 0.4]} to={[0.35, 0.4, 0.2]} color="#E8B86D" radius={0.03} />
          <Arrow3 from={[-0.65, 1.35, -0.3]} to={[-0.3, 0.4, -0.15]} color="#E8B86D" radius={0.03} />
          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.18, segs, segs]} />
            <meshStandardMaterial color="#E8B86D" emissive="#E8B86D" emissiveIntensity={0.3} />
          </mesh>
          <Tag pos={[0, 0.55, 0]} text="HIGH" tone="sandstone" occlude={false} />
          <Tag pos={[0, 1.85, 0.2]} text="sinking · dry" tone="sandstone" occlude={false} />
        </group>
      )}

      {!anti && (
        <Tag pos={[0, 2.15, 0]} text="mid-latitude cyclone — not a hurricane" tone="fault" occlude={false} />
      )}
      <Readout pos={[0, 2.55, 0]}>
        {anti
          ? "Anticyclone: clockwise in the NH, sink, often clearer. A British winter high can still fog."
          : "UK depression: comma cloud, fronts on the arms, LOW in the centre. Not a tropical cyclone."}
      </Readout>
      <StepCamera
        positions={[
          [0.2, 3.5, 6.2],
          [-2.4, 2.2, 4.6],
          [2.6, 2.4, 4.4],
          [0.2, 3.5, 6.2],
        ]}
      />
    </group>
  );
}

export default function CycloneScene() {
  const anti = (useLabControls((s) => s.params.anti) ?? 0) > 0.5;
  const setParam = useLabControls((s) => s.setParam);
  return (
    <>
      <LabStudio
        slug="cyclone-anticyclone"
        title="Cyclone and anticyclone"
        camera={{ position: [0.2, 3.5, 6.2], fov: 40 }}
        liveText={
          anti
            ? "Anticyclone: a clear sinking dome. Dry. Not a guarantee of sunshine in a British winter fog."
            : "Mid-latitude cyclone — not a hurricane. Comma cloud, warm and cold fronts, LOW at the centre."
        }
        exaggeration="UK-honest: a depression is a frontal comma, not an eyewall."
        fallback={
          <GenericFallback
            slug="cyclone-anticyclone"
            title="Cyclone"
            caption="A mid-latitude cyclone is a spinning comma of fronts, not a hurricane."
          />
        }
      >
        <System />
      </LabStudio>
      <SceneToggles>
        <SceneBtn onClick={() => setParam("anti", anti ? 0 : 1)} active={anti}>
          {anti ? "Show cyclone" : "Show anticyclone"}
        </SceneBtn>
      </SceneToggles>
    </>
  );
}
