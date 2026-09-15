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
import { dayLengthHours, formatDay, solarDeclination, solarNoonAltitude } from "@/lib/geo";

const DOME = 2.35;
const GNOMON_H = 0.5;

function sunUnit(lat: number, decl: number, hourT: number, out: THREE.Vector3) {
  const H = (hourT - 0.5) * Math.PI * 2;
  out.set(
    -Math.cos(decl) * Math.sin(H),
    Math.sin(lat) * Math.sin(decl) + Math.cos(lat) * Math.cos(decl) * Math.cos(H),
    Math.cos(lat) * Math.sin(decl) - Math.sin(lat) * Math.cos(decl) * Math.cos(H),
  );
  return out;
}

function Model() {
  useLabTick(1 / 24);
  const t = useLabControls((s) => s.t);
  const latDeg = useLabControls((s) => s.params.latitude ?? 51.5);
  const explode = useLabControls((s) => s.explode);
  const slice = useLabControls((s) => s.slice);
  const q = useQuality();
  const nrm = useRockNormal();
  const day = useLabControls((s) => s.params.day ?? 172);
  const lat = THREE.MathUtils.degToRad(latDeg);
  const decl = solarDeclination(day, 23.44);
  const noon = solarNoonAltitude(latDeg, decl);
  const length = dayLengthHours(latDeg, decl);
  const segs = Math.max(64, q.sphere);
  const domeR = DOME + explode * 0.35;

  const tmp = useMemo(() => new THREE.Vector3(), []);
  const pathPts = useMemo(() => {
    const out: [number, number, number][] = [];
    for (let i = 0; i <= 72; i++) {
      sunUnit(lat, decl, i / 72, tmp);
      if (tmp.y > -0.03) out.push([tmp.x * domeR, tmp.y * domeR, tmp.z * domeR]);
    }
    return out;
    // tmp is a stable scratch vector
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, decl, domeR]);

  const path = useMemo(
    () => (pathPts.length >= 2 ? tubeGeometry(pathPts, 0.018, Math.max(48, pathPts.length), 10) : null),
    [pathPts],
  );

  sunUnit(lat, decl, t, tmp);
  const sunPos: [number, number, number] = [tmp.x * domeR, tmp.y * domeR, tmp.z * domeR];
  const up = tmp.y > 0.03;
  const k = up ? GNOMON_H / tmp.y : 0;
  const sx = up ? -tmp.x * k : 0;
  const sz = up ? -tmp.z * k : 0;
  const slen = Math.hypot(sx, sz);

  const haArg = -Math.tan(lat) * Math.tan(decl);
  const polar = haArg <= -1 ? "day" : haArg >= 1 ? "night" : "none";
  const ha = polar === "none" ? Math.acos(THREE.MathUtils.clamp(haArg, -1, 1)) : 0;
  const riseT = polar === "none" ? 0.5 - ha / (Math.PI * 2) : polar === "day" ? 0 : 0.5;
  const setT = polar === "none" ? 0.5 + ha / (Math.PI * 2) : polar === "day" ? 1 : 0.5;
  const rise = useMemo(() => sunUnit(lat, decl, riseT, new THREE.Vector3()).multiplyScalar(domeR), [lat, decl, riseT, domeR]);
  const noonP = useMemo(() => sunUnit(lat, decl, 0.5, new THREE.Vector3()).multiplyScalar(domeR), [lat, decl, domeR]);
  const setP = useMemo(() => sunUnit(lat, decl, setT, new THREE.Vector3()).multiplyScalar(domeR), [lat, decl, setT, domeR]);

  const landFn = useMemo(() => (x: number, y: number) => 0.012 + Math.sin(x * 1.3) * Math.cos(y * 1.1) * 0.018, []);
  const plinth = useMemo(() => latheGeometry([[0.16, 0], [0.14, 0.04], [0.08, 0.05], [0.05, 0.02]], 24), []);

  return (
    <group>
      <StudioFloor size={10} />
      <HeightField fn={landFn} width={5.2} depth={5.2} segX={q.terrain / 4} segZ={q.terrain / 4} position={[0, -0.02, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} receiveShadow>
        <circleGeometry args={[2.55, segs]} />
        <meshStandardMaterial
          color="#3d3a38"
          roughness={PBR.rock.roughness}
          metalness={PBR.rock.metalness}
          normalMap={nrm}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.014, 0]}>
        <ringGeometry args={[2.4, 2.48, segs]} />
        <meshBasicMaterial color="#8B9A97" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[domeR, segs, segs, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#7FD4FF" transparent opacity={0.09} side={THREE.BackSide} depthWrite={false} roughness={1} />
      </mesh>
      {tmp.y < 0.02 && <Starfield count={Math.max(400, q.stars / 2)} />}
      {path && (
        <mesh geometry={path}>
          <meshStandardMaterial color="#E8B86D" roughness={0.28} metalness={0.12} emissive="#E8B86D" emissiveIntensity={0.35} />
        </mesh>
      )}
      <group position={sunPos} visible={tmp.y > -0.15}>
        <SunMesh radius={0.14} />
      </group>
      {up && <Arrow3 from={sunPos} to={[0, GNOMON_H, 0]} color="#E8B86D" radius={0.012} />}
      <mesh geometry={plinth} position={[0, 0, 0]}>
        <meshStandardMaterial color={PBR.granite.color} roughness={0.78} metalness={0.06} normalMap={nrm} />
      </mesh>
      <mesh position={[0, GNOMON_H / 2, 0]} castShadow>
        <cylinderGeometry args={[0.028, 0.034, GNOMON_H, 16]} />
        <meshStandardMaterial color="#E8B86D" roughness={0.45} metalness={0.1} />
      </mesh>
      {up && slen > 0.04 && (
        <mesh position={[sx / 2, 0.012, sz / 2]} rotation={[0, Math.atan2(sx, sz), 0]}>
          <boxGeometry args={[0.07, 0.01, slen]} />
          <meshStandardMaterial color="#07090c" transparent opacity={0.5} depthWrite={false} />
        </mesh>
      )}
      <group visible={false}>
        <EarthMesh radius={0.05} />
        <Atmosphere radius={0.055} />
        <MoonMesh radius={0.02} />
      </group>
      <Tag pos={[0.12, 0.12, 2.15]} text="S" occlude={false} />
      <Tag pos={[0.12, 0.12, -2.15]} text="N" occlude={false} />
      {polar !== "night" && <Tag pos={[noonP.x, noonP.y + 0.16, noonP.z]} text="noon" tone="sandstone" occlude={false} />}
      {polar === "none" && <Tag pos={[rise.x, Math.max(0.2, rise.y + 0.12), rise.z]} text="sunrise" tone="glacier" occlude={false} />}
      {polar === "none" && <Tag pos={[setP.x, Math.max(0.2, setP.y + 0.12), setP.z]} text="sunset" tone="magma" occlude={false} />}
      <Readout pos={[0, 2.55 + explode * 0.2, 0]}>
        {formatDay(day)} · lat {latDeg.toFixed(1)}° · noon altitude {noon.toFixed(0)}° · day {length.toFixed(1)} h
        {slice > 0.5 ? " · winter-side note: formula 90° − |φ − δ|" : ""}
      </Readout>
      <StepCamera
        positions={[
          [0.15, 1.85, 5.4],
          [1.1, 0.85, 2.3],
          [-3.4, 1.55, 2.1],
          [0.2, 3.1, 4.2],
        ]}
      />
    </group>
  );
}

export default function SolarAltitudeScene() {
  const t = useLabControls((s) => s.t);
  const lat = useLabControls((s) => s.params.latitude ?? 51.5);
  const day = useLabControls((s) => s.params.day ?? 172);
  const decl = solarDeclination(day, 23.44);
  const noon = solarNoonAltitude(lat, decl);
  const hour = t * 24;
  return (
    <LabStudio
      slug="solar-altitude"
      title="Solar altitude and sun path"
      camera={{ position: [0.15, 1.85, 5.4], fov: 40 }}
      liveText={`Latitude ${lat.toFixed(1)}°. Noon altitude ${noon.toFixed(0)}°. Hour ${hour.toFixed(1)}. Path is today's arc, not a magnetic compass.`}
      exaggeration="Dome radius is a sky stand-in. Gnomon shadow is school geometry."
      fallback={<GenericFallback slug="solar-altitude" title="Solar altitude" caption="Noon altitude = 90° − |φ − δ|. The Sun is not overhead everywhere." />}
      minDistance={2}
      maxDistance={11}
      target={[0, 0.4, 0]}
    >
      <Model />
    </LabStudio>
  );
}
