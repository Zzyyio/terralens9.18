import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3 } from "@/labs/shared/kit";
import { PBR, useSoilNormal } from "@/labs/shared/materials";
import { HeightField } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

function Cover({ count }: { count: number }) {
  const q = useQuality();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const segs = Math.max(12, Math.floor(q.lathe / 6));
  return (
    <instancedMesh
      args={[undefined, undefined, count]}
      castShadow
      ref={(mesh) => {
        if (!mesh) return;
        let i = 0;
        for (let x = 0; x < 5; x++) {
          for (let z = 0; z < 4; z++) {
            dummy.position.set(-0.85 + x * 0.42, 0.28, -0.62 + z * 0.4);
            dummy.rotation.set(0, (x * 5 + z) * 0.37, 0);
            dummy.scale.setScalar(0.72 + ((x * 3 + z) % 4) * 0.12);
            dummy.updateMatrix();
            mesh.setMatrixAt(i++, dummy.matrix);
          }
        }
        mesh.instanceMatrix.needsUpdate = true;
      }}
    >
      <coneGeometry args={[0.09, 0.44, segs]} />
      <meshStandardMaterial color="#4d6a42" roughness={0.9} metalness={0.02} />
    </instancedMesh>
  );
}

function RillField() {
  const q = useQuality();
  const t = useLabControls((s) => s.t);
  const tRef = useRef(t);
  tRef.current = t;
  const nrm = useSoilNormal();
  const nrmScale = useMemo(() => new THREE.Vector2(0.8, 0.8), []);
  const geom = useMemo(
    () => new THREE.PlaneGeometry(2.4, 2.1, Math.max(28, q.terrain / 5), Math.max(22, q.terrain / 6)),
    [q.terrain],
  );
  const orig = useMemo(() => Float32Array.from(geom.attributes.position.array as Float32Array), [geom]);
  useFrame(() => {
    const pos = geom.attributes.position;
    const storm = tRef.current;
    for (let i = 0; i < pos.count; i++) {
      const x = orig[i * 3]!;
      const y = orig[i * 3 + 1]!;
      const rill = Math.max(0, 0.38 - Math.abs(Math.sin(x * 5.4)));
      const channel = rill * storm * 0.28 * (0.55 + 0.45 * Math.cos(y * 3.1));
      const splash = storm * 0.025 * Math.sin(x * 16) * Math.sin(y * 14);
      pos.setZ(i, orig[i * 3 + 2]! + 0.14 - channel - splash);
    }
    pos.needsUpdate = true;
    geom.computeVertexNormals();
  });
  return (
    <mesh geometry={geom} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <meshStandardMaterial
        color={PBR.sand.color}
        roughness={0.92}
        metalness={0.02}
        normalMap={nrm}
        normalScale={nrmScale}
      />
    </mesh>
  );
}

function Splash() {
  const t = useLabControls((s) => s.t);
  const drops = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        x: -0.95 + (i % 6) * 0.38,
        z: -0.7 + Math.floor(i / 6) * 0.55,
        phase: i * 0.137,
      })),
    [],
  );
  return (
    <group>
      {drops.map((d, i) => {
        const u = (t * 2.4 + d.phase) % 1;
        const y = 1.05 * (1 - u) + (u > 0.82 ? Math.sin((u - 0.82) * 22) * 0.08 : 0);
        return (
          <mesh key={i} position={[d.x, Math.max(0.12, y), d.z]}>
            <sphereGeometry args={[0.028, 10, 10]} />
            <meshBasicMaterial color="#7FD4FF" />
          </mesh>
        );
      })}
    </group>
  );
}

function Model() {
  useLabTick(1 / 8);
  const t = useLabControls((s) => s.t);
  const q = useQuality();
  const nrm = useSoilNormal();
  const vegFn = useMemo(
    () => (x: number, y: number) => 0.16 + 0.03 * Math.sin(x * 3.2) * Math.cos(y * 2.4),
    [],
  );
  const vegColor = useMemo(() => {
    const c = new THREE.Color(PBR.crust.color);
    return () => c;
  }, []);
  return (
    <group>
      <StudioFloor size={12} />
      <group position={[-2.15, 0, 0]}>
        <RillField />
        <Splash />
        <Arrow3 from={[-1.15, 0.55, 0.2]} to={[1.05, 0.72, -0.15]} color="#E8B86D" radius={0.028} />
        <Tag pos={[0, 1.25, 0.85]} text="Splash" tone="ice" occlude={false} />
        <Tag pos={[0.15, 0.55, 0.2]} text="Rill" tone="sandstone" occlude={false} />
        <Tag pos={[0.85, 0.95, -0.2]} text="Wind" tone="sandstone" occlude={false} />
      </group>
      <group position={[2.15, 0, 0]}>
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[2.4, 0.12, 2.1, 12, 1, 12]} />
          <meshStandardMaterial
            color={PBR.soil.color}
            roughness={0.95}
            metalness={0.02}
            normalMap={nrm}
            normalScale={new THREE.Vector2(0.55, 0.55)}
          />
        </mesh>
        <HeightField
          fn={vegFn}
          width={2.4}
          depth={2.1}
          segX={Math.max(16, Math.floor(q.terrain / 8))}
          segZ={Math.max(14, Math.floor(q.terrain / 10))}
          colorFn={vegColor}
        />
        <Cover count={20} />
        <Tag pos={[0, 1.05, 0.9]} text="Cover" tone="moss" occlude={false} />
      </group>
      <Readout pos={[0, 2.35, 0]}>
        Storm {t.toFixed(2)} · bare rills · vegetated plot stays intact
      </Readout>
      <StepCamera positions={[[0, 3.3, 7.1], [-2.2, 2.1, 4.5], [2.2, 2.1, 4.5], [0, 4.8, 3.2]]} />
    </group>
  );
}

export default function SoilErosionScene() {
  const t = useLabControls((s) => s.t);
  return (
    <LabStudio
      slug="soil-erosion"
      title="Soil erosion"
      camera={{ position: [0, 3.3, 7.1], fov: 40 }}
      liveText={`Storm ${t.toFixed(2)}. Bare plot: splash, rill, wind. Vegetated plot holds the A horizon.`}
      exaggeration="Rill depth ×40. Real rills are centimetres."
      fallback={<GenericFallback slug="soil-erosion" title="Soil erosion" caption="Bare vs vegetated. Splash, rill, wind. Cover holds the A horizon." />}
      minDistance={2.8}
      maxDistance={14}
      target={[0, 0.3, 0]}
    >
      <Model />
    </LabStudio>
  );
}
