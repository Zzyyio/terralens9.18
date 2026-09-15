import { Html, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, type ReactNode } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { cn } from "@/lib/utils";
import { useRockNormal } from "./materials";

export function Tag({
  pos,
  text,
  tone = "chalk",
  occlude = true,
  note,
}: {
  pos: [number, number, number];
  text: string;
  tone?: "chalk" | "glacier" | "magma" | "sandstone" | "ice" | "moss" | "fault";
  occlude?: boolean;
  /** Mechanism sentence. Makes the label a click-to-inspect hotspot. */
  note?: string;
}) {
  const labels = useLabControls((s) => s.labels);
  const layout = useLabControls((s) => s.layout);
  const inspect = useLabControls((s) => s.inspect);
  const setInspect = useLabControls((s) => s.setInspect);
  if (!labels) return null;
  const tones: Record<string, string> = {
    chalk: "text-chalk",
    glacier: "text-glacier",
    magma: "text-magma",
    sandstone: "text-sandstone",
    ice: "text-ice",
    moss: "text-moss",
    fault: "text-fault",
  };
  const name = text.split(" · ")[0] ?? text;
  const inspectNote =
    note ?? `${name} is a named part of this teaching model. Drive a slider or play; the geometry should change.`;
  const active = inspect?.name === name;
  return (
    <Html
      position={pos}
      center
      occlude={occlude ? "blending" : undefined}
      zIndexRange={layout === "projector" ? [20, 0] : [10, 0]}
      style={{ pointerEvents: "auto" }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setInspect(active ? null : { name, note: inspectNote });
        }}
        className={cn(
          "whitespace-nowrap rounded-full border bg-basalt/85 px-2.5 py-1 font-mono text-[11px] shadow-lg",
          tones[tone],
          active ? "border-glacier/60 text-glacier" : "border-white/15",
        )}
      >
        {text}
      </button>
    </Html>
  );
}

export function InspectHotspot({
  name,
  note,
  children,
}: {
  name: string;
  note: string;
  children: ReactNode;
}) {
  const setInspect = useLabControls((s) => s.setInspect);
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        setInspect({ name, note });
      }}
    >
      {children}
    </group>
  );
}

export function Readout({
  pos = [0, 2.2, 0],
  children,
}: {
  pos?: [number, number, number];
  children: ReactNode;
}) {
  const labels = useLabControls((s) => s.labels);
  if (!labels) return null;
  return (
    <Html position={pos} center style={{ pointerEvents: "none", width: 440 }}>
      <div className="rounded-[16px] border border-white/10 bg-basalt/80 px-3 py-2 text-center font-mono text-[11px] text-chalk backdrop-blur-md">
        {children}
      </div>
    </Html>
  );
}

export function SceneToggles({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-auto absolute right-3 top-[6.5rem] z-10 hidden flex-col gap-2 md:right-6 md:flex lg:top-[7.5rem]">
      {children}
    </div>
  );
}

export function SceneBtn({
  onClick,
  children,
  active,
}: {
  onClick: () => void;
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full border border-white/10 bg-basalt/70 px-3 py-2 text-left font-mono text-[11px] text-chalk backdrop-blur-xl",
        active && "border-glacier/40 text-glacier",
      )}
    >
      {children}
    </button>
  );
}

/** Key + fill + weak rim. Dark studio void, not a grey room. */
export function LabLights({
  ambient = 0.28,
  keyIntensity = 2.05,
}: {
  ambient?: number;
  keyIntensity?: number;
}) {
  return (
    <>
      <hemisphereLight args={["#9ec4d4", "#1c1814", 0.38]} />
      <ambientLight intensity={ambient} color="#c9d4d0" />
      <directionalLight
        position={[4.2, 5.8, 3.2]}
        intensity={keyIntensity}
        color="#fff4e0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.00025}
        shadow-camera-near={0.4}
        shadow-camera-far={28}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />
      <directionalLight position={[-3.4, 1.4, -2.4]} intensity={0.42} color="#7fd4ff" />
      <directionalLight position={[0.2, -2.4, 4]} intensity={0.22} color="#f4efe6" />
    </>
  );
}

export function StudioOrbit({
  minDistance = 1.4,
  maxDistance = 18,
  target = [0, 0.2, 0] as [number, number, number],
}) {
  const viewKey = useLabControls((s) => s.viewKey);
  return (
    <OrbitControls
      key={viewKey}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={minDistance}
      maxDistance={maxDistance}
      maxPolarAngle={Math.PI * 0.9}
      target={target}
      makeDefault
    />
  );
}

export function ExaggerationNote({ text }: { text: string }) {
  return (
    <p className="pointer-events-none absolute left-1/2 top-16 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-basalt/70 px-3 py-1 font-mono text-[10px] text-mist backdrop-blur-md md:top-auto md:bottom-24">
      {text}
    </p>
  );
}

/** Subtle studio ground so models sit, not float. */
export function StudioFloor({ size = 14 }: { size?: number }) {
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0e1412",
        roughness: 0.95,
        metalness: 0,
      }),
    [],
  );
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} material={mat} receiveShadow>
      <circleGeometry args={[size, 64]} />
    </mesh>
  );
}

export function StepCamera({
  positions,
}: {
  positions: [number, number, number][];
}) {
  const step = useLabControls((s) => s.step);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera }) => {
    const p = positions[Math.min(step, positions.length - 1)] ?? positions[0];
    if (!p) return;
    tmp.set(p[0], p[1], p[2]);
    camera.position.lerp(tmp, 0.04);
  });
  return null;
}

export function WaterSheet({
  width,
  depth,
  y = 0.018,
  color = "#1a4a6e",
  opacity = 0.78,
}: {
  width: number;
  depth: number;
  y?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} receiveShadow>
      <planeGeometry args={[width, depth, 48, 48]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.06}
        metalness={0.06}
        transmission={0.28}
        thickness={0.55}
        ior={1.333}
        transparent
        opacity={opacity}
        envMapIntensity={0.85}
      />
    </mesh>
  );
}

/** Ice with thickness and a wet look. Not a white sticker. */
export function IceVolume({
  size,
  position,
  rotation = [0, 0, 0],
}: {
  size: [number, number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[size[0], size[1], size[2], 10, 6, 8]} />
      <meshPhysicalMaterial
        color="#d5eaf4"
        roughness={0.12}
        transmission={0.42}
        thickness={1.15}
        ior={1.31}
        transparent
        opacity={0.88}
        clearcoat={0.35}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
}

/** Rounded crustal block — not a raw Box as landform. */
export function CrustalRaft({
  size,
  position,
  color = "#7C9A6A",
}: {
  size: [number, number, number];
  position: [number, number, number];
  color?: string;
}) {
  const nrm = useRockNormal();
  const nrmScale = useMemo(() => new THREE.Vector2(0.55, 0.55), []);
  return (
    <mesh position={position} castShadow receiveShadow>
      <cylinderGeometry args={[size[0] * 0.52, size[0] * 0.55, size[1], 28, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={0.9}
        metalness={0.03}
        normalMap={nrm}
        normalScale={nrmScale}
      />
    </mesh>
  );
}
export function Arrow3({
  from,
  to,
  color = "#3EE0C6",
  radius = 0.03,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color?: string;
  radius?: number;
}) {
  const { quat, mid, end, len } = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const finish = new THREE.Vector3(...to);
    const dir = finish.clone().sub(start);
    const length = Math.max(0.05, dir.length());
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return {
      quat: q,
      mid: start.clone().lerp(finish, 0.42),
      end: finish,
      len: length,
    };
  }, [from, to]);
  return (
    <group>
      <mesh position={mid} quaternion={quat}>
        <cylinderGeometry args={[radius, radius, len * 0.78, 12]} />
        <meshStandardMaterial color={color} roughness={0.42} metalness={0.08} />
      </mesh>
      <mesh position={end} quaternion={quat}>
        <coneGeometry args={[radius * 2.4, len * 0.2, 14]} />
        <meshStandardMaterial color={color} roughness={0.38} metalness={0.08} />
      </mesh>
    </group>
  );
}
