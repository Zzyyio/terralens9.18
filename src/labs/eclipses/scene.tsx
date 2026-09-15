import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3 } from "@/labs/shared/kit";
import { PBR, useRockNormal } from "@/labs/shared/materials";
import { HeightField, latheGeometry, tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";
import { EarthMesh, Atmosphere, Starfield } from "@/components/globe/earth";
import { MoonMesh, SunMesh } from "@/components/globe/moon";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import * as THREE from "three";
import { useMemo } from "react";

const SUN_X = -5.35;
const SUN_R = 0.62;
const EARTH_R = 0.5;
const MOON_R = 0.18;
const MOON_A = 2.22;

function Model() {
  useLabTick(1 / 16);
  const t = useLabControls((s) => s.t);
  const align = (useLabControls((s) => s.params.align) ?? 0) > 0.5;
  const explode = useLabControls((s) => s.explode);
  const slice = useLabControls((s) => s.slice);
  const q = useQuality();
  const nrm = useRockNormal();
  const tiltDeg = align ? 0 : 5;
  const incl = THREE.MathUtils.degToRad(tiltDeg);
  const ang = t * Math.PI * 2;
  const moonA = MOON_A * (1 + explode * 0.28);
  const mx = Math.cos(ang) * moonA;
  const my = Math.cos(ang) * moonA * Math.sin(incl);
  const mz = Math.sin(ang) * moonA;
  const sunDir = useMemo(() => new THREE.Vector3(-1, 0, 0), []);

  const shadow = useMemo(() => {
    const moon = new THREE.Vector3(mx, my, mz);
    const sun = new THREE.Vector3(SUN_X, 0, 0);
    const dir = moon.clone().sub(sun).normalize();
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    return { quat, moon };
  }, [mx, my, mz]);

  const umbra = useMemo(
    () => latheGeometry([[0.16, 0], [0.11, 0.7], [0.045, 1.55], [0.001, 2.6]], Math.max(32, q.lathe / 2)),
    [q.lathe],
  );
  const penumbra = useMemo(
    () => latheGeometry([[0.2, 0], [0.36, 1.05], [0.58, 2.2], [0.82, 3.35]], Math.max(32, q.lathe / 2)),
    [q.lathe],
  );

  const orbitPts = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push([Math.cos(a) * moonA, Math.cos(a) * moonA * Math.sin(incl), Math.sin(a) * moonA]);
    }
    return pts;
  }, [moonA, incl]);
  const orbit = useMemo(() => tubeGeometry(orbitPts, 0.012, 96, 8), [orbitPts]);

  const ecliptic = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 80; i++) {
      const a = (i / 80) * Math.PI * 2;
      pts.push([Math.cos(a) * moonA, 0, Math.sin(a) * moonA]);
    }
    return tubeGeometry(pts, 0.007, 80, 8);
  }, [moonA]);

  const newMoon = Math.cos(ang) < -0.75;
  const fullMoon = Math.cos(ang) > 0.75;
  const miss = !align && (newMoon || fullMoon);

  return (
    <group>
      <ambientLight intensity={0.055} color="#9bb0c8" />
      <pointLight position={[SUN_X, 0, 0]} intensity={42} distance={24} color="#fff1c4" />
      <Starfield />
      <StudioFloor size={0.001} />
      <group visible={false}>
        <HeightField fn={() => 0} width={0.2} depth={0.2} segX={2} segZ={2} />
        <mesh>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color={PBR.basalt.color} roughness={0.9} normalMap={nrm} />
        </mesh>
      </group>
      <group position={[SUN_X, 0, 0]}>
        <SunMesh radius={SUN_R} />
      </group>
      <Arrow3 from={[SUN_X + SUN_R + 0.12, 0.2, 0]} to={[-EARTH_R - 0.15, 0.2, 0]} color="#E8B86D" radius={0.016} />
      <group>
        <EarthMesh sunDirection={sunDir} radius={EARTH_R} clouds />
        <Atmosphere radius={EARTH_R * 1.06} />
      </group>
      <mesh geometry={ecliptic}>
        <meshBasicMaterial color="#8B9A97" transparent opacity={0.28} />
      </mesh>
      <mesh geometry={orbit}>
        <meshBasicMaterial color="#7FD4FF" transparent opacity={0.55} />
      </mesh>
      <group position={shadow.moon.toArray() as [number, number, number]}>
        <MoonMesh radius={MOON_R} />
        <group quaternion={shadow.quat}>
          <mesh geometry={umbra} renderOrder={2}>
            <meshStandardMaterial
              color="#07090C"
              transparent
              opacity={0.55 * (1 - slice * 0.35)}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh geometry={penumbra} renderOrder={1}>
            <meshStandardMaterial
              color="#8B9A97"
              transparent
              opacity={0.16}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>
      <Tag pos={[SUN_X, SUN_R + 0.38, 0]} text="Sun" tone="sandstone" occlude={false} />
      <Tag pos={[0, EARTH_R + 0.38, 0]} text="Earth" tone="glacier" occlude={false} />
      <Tag pos={[mx, my + MOON_R + 0.28, mz]} text="Moon" occlude={false} />
      <Tag pos={[mx + 0.35, my - 0.15, mz]} text="umbra" occlude={false} />
      <Tag pos={[mx + 0.55, my + 0.45, mz]} text="penumbra" tone="sandstone" occlude={false} />
      <Tag
        pos={[0.2, 1.35, 1.4]}
        text={align ? "aligned · eclipse possible" : "orbit tilt 5° · most months miss"}
        tone={align ? "fault" : "ice"}
        occlude={false}
      />
      <Readout pos={[0, 2.15, 0]}>
        t = month · tilt {tiltDeg}° · {fullMoon ? "full" : newMoon ? "new" : "wax / wane"} · {miss ? "shadow misses Earth" : align ? "node + syzygy" : "wait for a node"}
      </Readout>
      <StepCamera
        positions={[
          [0.2, 2.15, 7.1],
          [-2.4, 0.7, 4.2],
          [0.1, 6.4, 0.6],
          [0.2, 2.15, 7.1],
        ]}
      />
    </group>
  );
}

export default function EclipsesScene() {
  const align = (useLabControls((s) => s.params.align) ?? 0) > 0.5;
  const t = useLabControls((s) => s.t);
  const phase = t < 0.15 || t > 0.85 ? "full" : t > 0.42 && t < 0.58 ? "new" : "other";
  return (
    <LabStudio
      slug="eclipses"
      title="Eclipses"
      camera={{ position: [0.2, 2.15, 7.1], fov: 40 }}
      liveText={`Moon orbit tilt ${align ? "0° — eclipse geometry" : "5° — most months miss"}. Phase ${phase}. Umbra is the dark cone; penumbra is the pale one.`}
      exaggeration="Sizes and distances are classroom-exaggerated. Nodes are the real rarity."
      fallback={<GenericFallback slug="eclipses" title="Eclipses" caption="Umbra and penumbra are cones. A 5° tilt is why most months miss." />}
      lights={false}
      minDistance={3}
      maxDistance={14}
      target={[0, 0, 0]}
    >
      <Model />
    </LabStudio>
  );
}
