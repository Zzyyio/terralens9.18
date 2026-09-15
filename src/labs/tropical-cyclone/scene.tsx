import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, SceneToggles, SceneBtn } from "@/labs/shared/kit";
import { PBR } from "@/labs/shared/materials";
import { latheGeometry, tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

function cycloneProfile(comma: number): [number, number][] {
  const h = THREE.MathUtils.lerp(1.42, 0.46, comma);
  const well = THREE.MathUtils.lerp(0.1, 0.2, comma);
  return [
    [0.001, well],
    [0.16, well * 0.8],
    [0.26, h],
    [0.5, h * 0.78],
    [1.05, h * 0.36],
    [1.72, h * 0.14],
    [2.2, 0.05],
  ];
}

function bandPts(arm: number, comma: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const off = (arm / 3) * Math.PI * 2;
  for (let i = 0; i <= 48; i++) {
    const u = i / 48;
    const a = off + u * Math.PI * (1.75 + comma * 0.5);
    const r = 0.5 + u * (1.85 + comma * 0.7);
    const y = 0.38 + (1 - u) * 0.58 * (1 - comma * 0.72);
    const cx = comma * u * u * 1.25;
    pts.push([Math.cos(a) * r + cx, y, Math.sin(a) * r * (1 + comma * 0.4)]);
  }
  return pts;
}

function Storm() {
  useLabTick(1 / 9);
  const t = useLabControls((s) => s.t);
  const uk = (useLabControls((s) => s.params.uk) ?? 0) > 0.5;
  const intensity = useLabControls((s) => s.params.intensity ?? 0.7);
  const slice = useLabControls((s) => s.slice);
  const q = useQuality();
  const comma = uk ? 1 : 0;
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(1, 0, 0), 0), []);
  plane.constant = (slice - 0.5) * 3.2;
  const clip = slice > 0.02 ? [plane] : [];
  const lathe = useMemo(() => latheGeometry(cycloneProfile(comma), q.lathe), [comma, q.lathe]);
  const bands = useMemo(
    () => [0, 1, 2].map((arm) => tubeGeometry(bandPts(arm, comma), 0.055 + intensity * 0.025, 64, 12)),
    [comma, intensity],
  );
  const frontCold = useMemo(
    () =>
      tubeGeometry(
        Array.from({ length: 18 }, (_, i) => {
          const u = i / 17;
          return [0.4 + u * 2.1, 0.22, -0.15 - u * 0.85] as [number, number, number];
        }),
        0.04,
        24,
        12,
      ),
    [],
  );
  const frontWarm = useMemo(
    () =>
      tubeGeometry(
        Array.from({ length: 18 }, (_, i) => {
          const u = i / 17;
          return [0.35 + u * 1.9, 0.2, 0.2 + u * 1.05] as [number, number, number];
        }),
        0.045,
        24,
        12,
      ),
    [],
  );
  return (
    <group>
      <StudioFloor size={12} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[3.4, q.lathe]} />
        <meshStandardMaterial
          color={PBR.water.color}
          roughness={PBR.water.roughness}
          metalness={PBR.water.metalness}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <circleGeometry args={[0.55, 32]} />
        <meshStandardMaterial
          color="#3EE0C6"
          emissive={uk ? "#1a4a6e" : "#ff6a3d"}
          emissiveIntensity={uk ? 0.05 : 0.55 + intensity * 0.35}
          roughness={0.2}
        />
      </mesh>
      <group rotation={[0, t * Math.PI * 2, 0]}>
        <mesh geometry={lathe} castShadow>
          <meshStandardMaterial
            color="#e8eef2"
            roughness={0.88}
            metalness={0.02}
            transparent
            opacity={0.78}
            side={THREE.DoubleSide}
            clippingPlanes={clip}
          />
        </mesh>
        {bands.map((g, i) => (
          <mesh key={i} geometry={g}>
            <meshStandardMaterial
              color="#cfd8de"
              roughness={0.86}
              transparent
              opacity={0.7}
              clippingPlanes={clip}
            />
          </mesh>
        ))}
      </group>
      {uk && (
        <>
          <mesh geometry={frontCold}>
            <meshStandardMaterial color="#7FD4FF" roughness={0.35} emissive="#7FD4FF" emissiveIntensity={0.2} />
          </mesh>
          <mesh geometry={frontWarm}>
            <meshStandardMaterial color="#FF6A3D" roughness={0.35} emissive="#FF6A3D" emissiveIntensity={0.2} />
          </mesh>
        </>
      )}
      <Tag pos={[0, uk ? 0.85 : 1.72, 0]} text={uk ? "not a hurricane" : "Eye"} tone={uk ? "sandstone" : "chalk"} occlude={false} note={uk ? "A UK winter storm is a midlatitude cyclone with fronts. Not Saffir–Simpson." : "Calm, warm, sinking air. The hole is not the damage."} />
      {!uk && <Tag pos={[0.55, 1.15, 0.2]} text="Eyewall" tone="fault" occlude={false} note="Ring of strongest wind and rain. Slice (X) to see the wall in section." />}
      {!uk && <Tag pos={[1.7, 0.75, 0.4]} text="Rainbands" tone="ice" occlude={false} note="Spiral feeder bands. Intensity slider tightens the comma." />}
      {!uk && <Tag pos={[0, 0.22, 0.9]} text="Warm sea = fuel" tone="magma" occlude={false} note="Warm ocean and low shear. Cut the heat and the machine dies." />}
      {uk && <Tag pos={[1.6, 0.55, -0.7]} text="Cold front" tone="ice" occlude={false} note="A wedge, not an eyewall. See the Fronts lab." />}
      {uk && <Tag pos={[1.5, 0.55, 0.9]} text="Warm front" tone="magma" occlude={false} note="Warm air overrunning. This is extra-tropical, not a tropical cyclone." />}
      <Readout pos={[0, 2.45, 0]}>
        {uk ? "Comma-shaped mid-latitude low · fronts, not an eyewall" : `Tropical cyclone · intensity ${intensity.toFixed(2)} · play spins the spiral`}
      </Readout>
      <StepCamera positions={[[0, 4.1, 6.2], [0.12, 0.85, 1.55], [1.35, 1.7, 3.2], [0, 3.5, 5.4]]} />
    </group>
  );
}

export default function TropicalCycloneScene() {
  const uk = (useLabControls((s) => s.params.uk) ?? 0) > 0.5;
  const setParam = useLabControls((s) => s.setParam);
  return (
    <>
      <LabStudio
        slug="tropical-cyclone"
        title="Tropical cyclone"
        camera={{ position: [0, 4.1, 6.2], fov: 40 }}
        liveText={uk ? "Not a hurricane: a comma-shaped mid-latitude low with fronts." : "Eye, eyewall, rainbands. Warm sea is the fuel."}
        fallback={<GenericFallback slug="tropical-cyclone" title="Tropical cyclone" caption="Eye, eyewall, spiral rainbands over a warm sea." />}
        minDistance={1.4}
        maxDistance={14}
        target={[0, 0.55, 0]}
      >
        <Storm />
      </LabStudio>
      <SceneToggles>
        <SceneBtn active={uk} onClick={() => setParam("uk", uk ? 0 : 1)}>
          {uk ? "UK low" : "Hurricane"}
        </SceneBtn>
      </SceneToggles>
    </>
  );
}
