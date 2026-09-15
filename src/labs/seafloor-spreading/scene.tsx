import { useMemo } from "react";
import * as THREE from "three";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { HeightField } from "@/labs/shared/terrain";
import { PBR } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";

function ridgeFn(x: number, y: number) {
  const axial = Math.exp(-(x * x) / 0.12) * 0.55;
  const flanks = 0.18 * Math.exp(-((Math.abs(x) - 1.6) ** 2) / 2.8);
  const transform = 0.04 * Math.sin(y * 1.6) * Math.exp(-(x * x) / 0.8);
  return 0.12 + axial + flanks + transform;
}

function Model() {
  useLabTick(1 / 10);
  const t = useLabControls((s) => s.t);
  const q = useQuality();
  const colorFn = useMemo(() => {
    return (h: number, x?: number) => {
      const c = new THREE.Color();
      c.set(PBR.basalt.color);
      return c;
    };
  }, []);

  const stripes = useMemo(() => {
    const g = new THREE.PlaneGeometry(7.2, 4.6, 120, 8);
    const pos = g.attributes.position;
    const col = new Float32Array(pos.count * 3);
    const a = new THREE.Color("#1C2628");
    const b = new THREE.Color("#3EE0C6");
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const h = ridgeFn(x, y);
      pos.setZ(i, h + 0.02);
      const band = Math.floor((Math.abs(x) + (t * 0.42) % 0.42) / 0.42);
      const c = band % 2 ? b : a;
      c.toArray(col, i * 3);
    }
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    g.computeVertexNormals();
    return g;
  }, [t]);

  return (
    <group>
      <StudioFloor size={12} />
      <HeightField
        fn={ridgeFn}
        width={7.2}
        depth={4.6}
        segX={q.terrain}
        segZ={Math.floor(q.terrain / 2)}
        colorFn={colorFn}
      />
      <mesh geometry={stripes} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <meshStandardMaterial vertexColors roughness={0.78} metalness={0.06} transparent opacity={0.72} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.7, 16]} />
        <meshStandardMaterial
          color={PBR.magma.color}
          emissive={PBR.magma.emissive}
          emissiveIntensity={0.55}
          roughness={0.4}
        />
      </mesh>
      <Tag pos={[0, 1.15, 0]} text="Mid-Atlantic Ridge" tone="magma" />
      <Tag pos={[1.7, 0.55, 1.8]} text="Magnetic stripes" tone="glacier" />
      <Tag pos={[2.6, 0.4, -1.4]} text="Older crust" tone="sandstone" />
      <Readout pos={[0, 1.7, 0]}>Play: new crust at the axis, mirror image, age increases away. Like a tape recorder.</Readout>
      <StepCamera
        positions={[
          [0, 3.6, 6.2],
          [0, 1.8, 3.4],
          [2.8, 2.2, 4.4],
          [0, 3.6, 6.2],
        ]}
      />
    </group>
  );
}

export default function SpreadingScene() {
  return (
    <LabStudio
      slug="seafloor-spreading"
      title="Seafloor spreading"
      camera={{ position: [0, 3.6, 6.2], fov: 42 }}
      exaggeration="Vertical exaggeration ×12. The ridge is a mountain under the sea."
      liveText="Mid-ocean ridge. Magnetic stripes are a mirror. Crust ages away from the axis."
      fallback={
        <GenericFallback
          slug="seafloor-spreading"
          title="Seafloor spreading"
          caption="Ridge axis, magnetic stripes, age increasing away. A tape recorder in rock."
        />
      }
    >
      <Model />
    </LabStudio>
  );
}
