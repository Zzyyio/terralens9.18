import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Arrow3, Readout, StepCamera, StudioFloor, Tag } from "@/labs/shared/kit";
import { HeightField } from "@/labs/shared/terrain";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const BEDS = [
  { color: PBR.sand.color, name: "Sandstone", h: 0.13 },
  { color: PBR.limestone.color, name: "Limestone", h: 0.15 },
  { color: PBR.soil.color, name: "Shale", h: 0.12 },
  { color: PBR.granite.color, name: "Greywacke", h: 0.16 },
  { color: PBR.basalt.color, name: "Basalt", h: 0.18 },
];

function fold(x: number, y: number) {
  return Math.cos(x * 0.78) * 0.66 * (1 - (y * y) / 7.5);
}

const FNS = BEDS.map((_, i) => (x: number, y: number) => fold(x, y) + i * 0.128);
const COLFNS = BEDS.map((b) => {
  const c = new THREE.Color(b.color);
  return () => c;
});

function FoldStack() {
  const q = useQuality();
  return (
    <group>
      {BEDS.map((b, i) => (
        <HeightField
          key={b.name}
          fn={FNS[i]!}
          width={8.2}
          depth={3.4}
          segX={q.terrain}
          segZ={Math.max(24, Math.floor(q.terrain / 6))}
          colorFn={COLFNS[i]}
          position={[0, 0.04, 0]}
        />
      ))}
      <Tag pos={[0, 1.45, 0]} text="Anticline" tone="moss" occlude={false} />
      <Tag pos={[3.55, 0.55, 0]} text="Syncline" tone="sandstone" occlude={false} />
    </group>
  );
}

function Wall({ shift, nrm }: { shift: [number, number, number]; nrm: THREE.Texture }) {
  const placed = useMemo(() => {
    let acc = 0;
    return BEDS.map((b) => {
      const y = acc;
      acc += b.h;
      return { ...b, y };
    });
  }, []);
  return (
    <group position={shift}>
      {placed.map((b) => (
        <mesh key={b.name} position={[0, b.y + b.h / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.35, b.h, 1.7, 18, 4, 14]} />
          <meshStandardMaterial
            color={b.color}
            roughness={0.88}
            metalness={0.04}
            normalMap={nrm}
            normalScale={new THREE.Vector2(0.7, 0.7)}
          />
        </mesh>
      ))}
    </group>
  );
}

function Fault({
  kind,
  x,
  explode,
  nrm,
}: {
  kind: "normal" | "reverse" | "strike";
  x: number;
  explode: number;
  nrm: THREE.Texture;
}) {
  const dip = 0.95;
  const throwN = 0.12 + explode * 0.42;
  const gap = 0.08 + explode * 0.55;
  const left: [number, number, number] = [-0.7 - gap * 0.35, 0, 0];
  const right: [number, number, number] =
    kind === "normal"
      ? [0.7 + gap * 0.35, -throwN, 0]
      : kind === "reverse"
        ? [0.7 + gap * 0.25, throwN, 0]
        : [0.7 + gap * 0.2, 0, explode * 0.7];
  const label =
    kind === "normal" ? "Normal · hanging wall down" : kind === "reverse" ? "Reverse · hanging wall up" : "Strike-slip · lateral";
  const hwY = kind === "normal" ? 0.55 - throwN : kind === "reverse" ? 0.55 + throwN : 0.7;
  return (
    <group position={[x, 0.08, 3.35]}>
      <Wall shift={left} nrm={nrm} />
      <Wall shift={right} nrm={nrm} />
      <mesh position={[0.05, 0.45, 0]} rotation={[0, 0, kind === "strike" ? 0 : kind === "normal" ? -dip : dip]}>
        <planeGeometry args={[1.9, 1.35, 12, 8]} />
        <meshStandardMaterial color="#E24B4B" transparent opacity={0.28} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      {kind !== "strike" ? (
        <Arrow3
          from={[0.85, kind === "normal" ? 0.95 : 0.25, 0.2]}
          to={[0.85, kind === "normal" ? 0.25 : 1.05, 0.2]}
          color="#FF6A3D"
          radius={0.022}
        />
      ) : (
        <Arrow3 from={[0.4, 0.85, -0.4]} to={[0.4, 0.85, 0.85]} color="#E8B86D" radius={0.022} />
      )}
      <Tag pos={[0.9, hwY + 0.35, 0.2]} text="Hanging wall" tone="fault" occlude={false} />
      <Tag pos={[-0.85, 0.95, 0.2]} text="Footwall" occlude={false} />
      <Tag pos={[0, 1.45, 0]} text={label} tone={kind === "strike" ? "sandstone" : "magma"} occlude={false} />
    </group>
  );
}

function Stage() {
  const explode = useLabControls((s) => s.explode);
  const nrm = useRockNormal();
  return (
    <>
      <StudioFloor size={16} />
      <FoldStack />
      <Fault kind="normal" x={-3.3} explode={explode} nrm={nrm} />
      <Fault kind="reverse" x={0} explode={explode} nrm={nrm} />
      <Fault kind="strike" x={3.3} explode={explode} nrm={nrm} />
      <Readout pos={[0, 2.45, 0]}>
        Beds bend as a sine fold — anticline up, syncline down · explode the three slips: hanging wall down, up, or sideways
      </Readout>
      <StepCamera
        positions={[
          [0, 4.2, 9.2],
          [-3.2, 2.4, 7.4],
          [0.2, 2.5, 7.2],
          [3.4, 2.6, 7.4],
        ]}
      />
    </>
  );
}

export default function FoldsFaultsScene() {
  return (
    <LabStudio
      slug="folds-faults"
      title="Folds and faults"
      camera={{ position: [0, 4.2, 9.2], fov: 40 }}
      liveText="Stratified beds bend into an anticline and syncline. Normal: hanging wall down. Reverse: hanging wall up. Strike-slip: lateral."
      fallback={
        <GenericFallback
          slug="folds-faults"
          title="Folds and faults"
          caption="Rocks bend or they break. Anticline, syncline, then normal, reverse, and strike-slip."
        />
      }
      minDistance={3}
      maxDistance={16}
      target={[0, 0.4, 1.2]}
    >
      <Stage />
    </LabStudio>
  );
}
