import { useMemo } from "react";
import * as THREE from "three";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera } from "@/labs/shared/kit";
import { tubeGeometry } from "@/labs/shared/terrain";
import { GenericFallback } from "@/labs/shared/fallback";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";

const MARKS = [
  { ma: 4500, name: "Earth forms", tone: "sandstone" as const },
  { ma: 540, name: "Cambrian", tone: "glacier" as const },
  { ma: 250, name: "Pangaea", tone: "magma" as const },
  { ma: 66, name: "K–Pg", tone: "fault" as const },
  { ma: 0, name: "Now", tone: "ice" as const },
];

function logT(ma: number) {
  return Math.log10(ma + 1) / Math.log10(4501);
}

function helix(u: number): [number, number, number] {
  const turns = 3.2 * (1 - u);
  const r = 0.45 + 1.55 * u;
  return [Math.cos(turns * Math.PI * 2) * r, -1.6 + u * 3.4, Math.sin(turns * Math.PI * 2) * r];
}

function Model() {
  useLabTick(1 / 18);
  const t = useLabControls((s) => s.t);
  const pts = useMemo(() => {
    const a: [number, number, number][] = [];
    for (let i = 0; i <= 80; i++) a.push(helix(i / 80));
    return a;
  }, []);
  const tube = useMemo(() => tubeGeometry(pts, 0.045, 80, 8), [pts]);
  const u = 1 - t;
  const bead = helix(u);
  const ma = Math.pow(10, (1 - t) * Math.log10(4501)) - 1;
  return (
    <group>
      <StudioFloor size={10} />
      <mesh geometry={tube}>
        <meshStandardMaterial color="#3EE0C6" roughness={0.45} metalness={0.08} />
      </mesh>
      {MARKS.map((m) => {
        const p = helix(1 - logT(m.ma));
        return (
          <group key={m.name} position={p}>
            <mesh>
              <sphereGeometry args={[0.08, 20, 16]} />
              <meshStandardMaterial color="#F4EFE6" roughness={0.4} />
            </mesh>
            <Tag pos={[0.15, 0.18, 0]} text={`${m.name} · ${m.ma} Ma`} tone={m.tone} />
          </group>
        );
      })}
      <mesh position={bead}>
        <sphereGeometry args={[0.12, 24, 18]} />
        <meshStandardMaterial color="#FF6A3D" emissive="#FF6A3D" emissiveIntensity={0.35} />
      </mesh>
      <Readout pos={[0, 2.15, 0]}>
        Log spiral · {ma < 1 ? `${(ma * 1000).toFixed(0)} ka` : `${ma.toFixed(0)} Ma`} · life and continents are marks, not a parade.
      </Readout>
      <StepCamera positions={[[3.2, 1.6, 5.4], [0.4, 0.4, 3.2], [-1.6, 2.4, 4.2], [3.2, 1.6, 5.4]]} />
    </group>
  );
}

export default function GeologicTimeScene() {
  return (
    <LabStudio
      slug="geologic-time"
      title="Geologic time"
      camera={{ position: [3.2, 1.6, 5.4], fov: 40 }}
      liveText="A log spiral of time in Ma. Marks for Earth, Cambrian, Pangaea, K–Pg, now."
      fallback={
        <GenericFallback
          slug="geologic-time"
          title="Geologic time"
          caption="Spiral of Ma. Life and continents are marks, not a cartoon parade."
        />
      }
    >
      <Model />
    </LabStudio>
  );
}
