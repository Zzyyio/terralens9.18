import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const EPIC: [number, number, number] = [0.22, 1.82, 0.12];

function SurfaceRipple() {
  const q = useQuality();
  const t = useLabControls((s) => s.t);
  const tRef = useRef(t);
  tRef.current = t;
  const { geom } = useMemo(() => {
    const geom = new THREE.PlaneGeometry(2.55, 1.85, Math.max(24, q.terrain / 6), Math.max(16, q.terrain / 10));
    const orig = Float32Array.from(geom.attributes.position.array as Float32Array);
    geom.userData.orig = orig;
    return { geom };
  }, [q.terrain]);
  useFrame(() => {
    const pos = geom.attributes.position;
    const orig = geom.userData.orig as Float32Array;
    const u = tRef.current;
    const amp = u > 0.32 ? Math.sin(Math.min(1, (u - 0.32) / 0.55) * Math.PI) * 0.09 : 0;
    for (let i = 0; i < pos.count; i++) {
      const x = orig[i * 3]! - 0.22;
      const y = orig[i * 3 + 1]! - 0.12;
      const r = Math.hypot(x, y);
      pos.setZ(i, orig[i * 3 + 2]! + amp * Math.sin(r * 16 - u * 26) * Math.exp(-r * 1.15));
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();
  });
  return (
    <mesh geometry={geom} rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.805, 0]}>
      <meshStandardMaterial
        color="#6a6258"
        roughness={0.9}
        metalness={0.04}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}

function Model() {
  useLabTick(1 / 7);
  const t = useLabControls((s) => s.t);
  const depth = useLabControls((s) => s.params.depth ?? 0.45);
  const q = useQuality();
  const nrm = useRockNormal();
  const nrmScale = useMemo(() => new THREE.Vector2(0.85, 0.85), []);
  const segs = Math.max(16, Math.floor(q.sphere / 4));
  const focusY = THREE.MathUtils.lerp(1.58, 0.52, depth);
  const FOCUS: [number, number, number] = [0.22, focusY, 0.12];
  const pR = 0.06 + t * 2.65;
  const sR = t > 0.14 ? 0.06 + (t - 0.14) * 1.42 : 0;
  const shear = t > 0.14 ? Math.sin((t - 0.14) * 16) * 0.045 * Math.exp(-((t - 0.4) ** 2) / 0.07) : 0;
  const surfOn = t > 0.32;
  const damage = t > 0.52;
  return (
    <group>
      <StudioFloor size={12} />
      <mesh position={[0, 0.22, 0]} receiveShadow>
        <boxGeometry args={[3.6, 0.44, 2.6, segs, 2, segs]} />
        <meshStandardMaterial
          color={PBR.mantle.color}
          roughness={PBR.mantle.roughness}
          metalness={PBR.mantle.metalness}
        />
      </mesh>
      <group position={[0, 1.12, 0]} rotation={[0, 0, shear]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.55, 1.32, 1.85, segs, Math.max(8, segs / 2), segs]} />
          <meshStandardMaterial
            color={PBR.rock.color}
            roughness={PBR.rock.roughness}
            metalness={PBR.rock.metalness}
            normalMap={nrm}
            normalScale={nrmScale}
            transparent
            opacity={0.78}
            depthWrite={false}
          />
        </mesh>
      </group>
      <mesh position={FOCUS}>
        <sphereGeometry args={[0.07, q.sphere, q.sphere]} />
        <meshStandardMaterial
          color={PBR.magma.color}
          emissive={PBR.magma.emissive}
          emissiveIntensity={1.15}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[(FOCUS[0] + EPIC[0]) / 2, (FOCUS[1] + EPIC[1]) / 2, FOCUS[2]]}>
        <cylinderGeometry args={[0.012, 0.012, EPIC[1] - FOCUS[1], 12]} />
        <meshBasicMaterial color="#3EE0C6" transparent opacity={0.55} />
      </mesh>
      <mesh position={EPIC}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshStandardMaterial color="#3EE0C6" emissive="#3EE0C6" emissiveIntensity={0.7} roughness={0.28} />
      </mesh>
      <mesh position={FOCUS}>
        <sphereGeometry args={[pR, q.sphere, Math.max(16, q.sphere / 2)]} />
        <meshBasicMaterial color="#7FD4FF" transparent opacity={0.16} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      {sR > 0.08 && (
        <mesh position={FOCUS} scale={[1.15, 0.72, 1]}>
          <sphereGeometry args={[sR, q.sphere, Math.max(16, q.sphere / 2)]} />
          <meshBasicMaterial color="#E24B4B" transparent opacity={0.18} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      )}
      {surfOn && (
        <mesh position={[EPIC[0], 1.84, EPIC[2]]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(0.04, (t - 0.32) * 1.55 - 0.1), (t - 0.32) * 1.55 + 0.05, 48]} />
          <meshBasicMaterial color="#E8B86D" transparent opacity={0.55} side={THREE.DoubleSide} />
        </mesh>
      )}
      <SurfaceRipple />
      {damage && (
        <>
          <mesh position={[0.95, 1.95, 0.55]} rotation={[0, 0.2, 0.18 + shear * 2]}>
            <boxGeometry args={[0.18, 0.22, 0.16]} />
            <meshStandardMaterial color="#2a3234" roughness={0.85} />
          </mesh>
          <mesh position={[-0.85, 1.95, -0.5]} rotation={[0.12, -0.3, -0.2]}>
            <boxGeometry args={[0.16, 0.2, 0.14]} />
            <meshStandardMaterial color="#3a4038" roughness={0.85} />
          </mesh>
        </>
      )}
      <Tag pos={[FOCUS[0], FOCUS[1] - 0.22, FOCUS[2] + 0.55]} text="Focus" tone="magma" occlude={false} note="Hypocentre: slip starts in the rock. Depth slider moves this spark." />
      <Tag pos={[EPIC[0], EPIC[1] + 0.28, EPIC[2]]} text="Epicentre" tone="glacier" occlude={false} note="The map dot. Vertically above the focus, not a cave." />
      <Tag pos={[FOCUS[0] + pR * 0.55, FOCUS[1] + 0.15, FOCUS[2]]} text="P" tone="ice" occlude={false} note="Fastest. Compressional. Travels through solid and liquid." />
      {sR > 0.2 && <Tag pos={[FOCUS[0] - 0.15, FOCUS[1] + 0.35, FOCUS[2] + sR * 0.4]} text="S" tone="fault" occlude={false} note="Shear. Slower than P. Dies in liquid — the outer-core argument." />}
      {surfOn && <Tag pos={[0.9, 2.15, -0.4]} text="Surface" tone="sandstone" occlude={false} note="Love and Rayleigh. Arrive later. Often the damage in town." />}
      {damage && <Tag pos={[0.95, 2.28, 0.55]} text="Damage" tone="magma" occlude={false} note="Shallow focus plus surface waves. Deep quakes shake less at the desk." />}
      <Readout pos={[0, 2.85, 0]}>
        P through all · S shears the block · surface wave does the damage
      </Readout>
      <StepCamera positions={[[2.8, 2.1, 4.6], [0.55, 0.95, 2.35], [0.2, 4.4, 0.9], [3.1, 1.15, 1.5]]} />
    </group>
  );
}

export default function EarthquakesScene() {
  const t = useLabControls((s) => s.t);
  const phase = t < 0.14 ? "P-wave" : t < 0.32 ? "S-wave" : t < 0.52 ? "surface wave" : "damage";
  return (
    <LabStudio
      slug="earthquakes"
      title="Earthquakes"
      camera={{ position: [2.8, 2.1, 4.6], fov: 40 }}
      liveText={`Focus is inside the rock. Now ${phase}. Epicentre is the map dot on the top face.`}
      fallback={<GenericFallback slug="earthquakes" title="Earthquakes" caption="Focus in the rock. Epicentre on the surface. P, then S, then damage." />}
      minDistance={2.2}
      maxDistance={12}
      target={[0, 1.1, 0]}
    >
      <Model />
    </LabStudio>
  );
}
