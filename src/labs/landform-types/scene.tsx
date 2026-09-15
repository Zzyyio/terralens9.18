import { useMemo } from "react";
import * as THREE from "three";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR, useRockNormal, useSoilNormal } from "@/labs/shared/materials";
import { HeightField } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const tint = new THREE.Color();

function mountainFn(x: number, y: number) {
  const r = Math.hypot(x, y);
  const peak = 1.78 * Math.exp(-(r * r) / 0.2);
  const spur = 0.42 * Math.exp(-((x - 0.42) ** 2 + (y + 0.22) ** 2) / 0.12);
  const arête = 0.36 * Math.exp(-(y * y) / 0.045) * Math.exp(-(x * x) / 0.85);
  return Math.max(0.02, peak + spur + arête);
}

function hillFn(x: number, y: number) {
  const r = Math.hypot(x * 0.92, y * 1.05);
  return 0.07 + 0.58 * Math.exp(-(r * r) / 0.78);
}

function plateauFn(x: number, y: number) {
  const r = Math.hypot(x * 1.02, y * 0.96);
  const table = 0.5 * (1 + Math.tanh((0.95 - r) * 11));
  const cap = 0.04 * Math.exp(-(r * r) / 0.55);
  return 0.05 + 0.9 * table + cap;
}

function plainFn(x: number, y: number) {
  return 0.05 + 0.045 * Math.sin(x * 1.35) * Math.sin(y * 1.05) + 0.02 * Math.sin(x * 2.8 + y * 0.7);
}

function mountainColor(h: number) {
  if (h < 0.35) return tint.set(PBR.crust.color);
  if (h < 0.95) return tint.set(PBR.rock.color);
  return tint.set(PBR.granite.color);
}
function hillColor(h: number) {
  if (h < 0.25) return tint.set(PBR.soil.color);
  return tint.set(PBR.crust.color);
}
function plateauColor(h: number) {
  if (h < 0.25) return tint.set(PBR.soil.color);
  if (h < 0.7) return tint.set(PBR.sand.color);
  return tint.set(PBR.limestone.color);
}
function plainColor(h: number) {
  return h < 0.08 ? tint.set(PBR.soil.color) : tint.set(PBR.crust.color);
}

function Patch({
  fn,
  colorFn,
  position,
  segs,
}: {
  fn: (x: number, y: number) => number;
  colorFn: (h: number) => THREE.Color;
  position: [number, number, number];
  segs: number;
}) {
  return (
    <HeightField fn={fn} width={2.65} depth={2.65} segX={segs} segZ={segs} colorFn={colorFn} position={position} />
  );
}

function FootRing({
  x,
  rock,
  nrm,
}: {
  x: number;
  rock: THREE.Texture;
  nrm: THREE.Vector2;
}) {
  return (
    <mesh position={[x, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.28, 1.36, 40]} />
      <meshStandardMaterial color={PBR.rock.color} roughness={0.9} normalMap={rock} normalScale={nrm} />
    </mesh>
  );
}

function Model() {
  const q = useQuality();
  const rock = useRockNormal();
  const soil = useSoilNormal();
  const segs = Math.max(48, Math.floor(q.terrain * 0.42));
  const nrm = useMemo(() => new THREE.Vector2(0.55, 0.55), []);
  const xs = [-4.7, -1.55, 1.55, 4.7] as const;
  return (
    <group>
      <StudioFloor size={14} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[9.5, 48]} />
        <meshStandardMaterial
          color="#121814"
          roughness={0.96}
          metalness={0.02}
          normalMap={soil}
          normalScale={nrm}
        />
      </mesh>
      <Patch fn={mountainFn} colorFn={mountainColor} position={[xs[0], 0, 0]} segs={segs} />
      <Patch fn={hillFn} colorFn={hillColor} position={[xs[1], 0, 0]} segs={segs} />
      <Patch fn={plateauFn} colorFn={plateauColor} position={[xs[2], 0, 0]} segs={segs} />
      <Patch fn={plainFn} colorFn={plainColor} position={[xs[3], 0, 0]} segs={segs} />
      {xs.map((x) => (
        <FootRing key={x} x={x} rock={rock} nrm={nrm} />
      ))}
      <mesh position={[0, 0.04, 1.85]}>
        <boxGeometry args={[9.5, 0.02, 0.06]} />
        <meshStandardMaterial color="#3EE0C6" roughness={0.4} />
      </mesh>
      <Tag pos={[xs[0], 2.15, 0]} text="Mountain · steep relief" />
      <Tag pos={[xs[1], 1.05, 0]} text="Hill · rounded" tone="moss" />
      <Tag pos={[xs[2], 1.35, 0]} text="Plateau · flat top" tone="sandstone" />
      <Tag pos={[xs[3], 0.55, 0]} text="Plain · gentle" tone="moss" />
      <Tag pos={[0, 0.35, 2.05]} text="Same scale bar" tone="glacier" />
      <Readout pos={[0, 2.7, 0]}>Same scale, same ×8 exaggeration · height, slope, table, open</Readout>
      <StepCamera
        positions={[
          [xs[0], 2.9, 5.4],
          [xs[1], 2.2, 4.8],
          [xs[2], 2.5, 4.9],
          [xs[3], 1.8, 4.6],
        ]}
      />
    </group>
  );
}

export default function LandformTypesScene() {
  return (
    <LabStudio
      slug="landform-types"
      title="Landform types"
      camera={{ position: [0, 3.4, 9.2], fov: 40 }}
      exaggeration="Vertical exaggeration ×8 · four landforms, one scale"
      liveText="Mountain, hill, plateau, plain at the same vertical exaggeration ×8."
      fallback={
        <GenericFallback
          slug="landform-types"
          title="Landform types"
          caption="Four height fields: steep mountain, rounded hill, flat-top plateau, gentle plain."
        />
      }
      minDistance={3}
      maxDistance={16}
      target={[0, 0.4, 0]}
    >
      <fog attach="fog" args={["#07090C", 14, 28]} />
      <Model />
    </LabStudio>
  );
}
