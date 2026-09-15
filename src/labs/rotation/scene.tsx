import { Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import {
  Atmosphere,
  AxisLine,
  CityMarker,
  EarthMesh,
  Graticule,
  Starfield,
} from "@/components/globe/earth";
import { useLabControls } from "@/lib/store/lab-controls";
import { useLabTick } from "@/labs/tick";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StepCamera, SceneToggles, SceneBtn } from "@/labs/shared/kit";
import { GenericFallback } from "@/labs/shared/fallback";
import { useQuality } from "@/labs/shared/perf";
import { CITIES, latLonToVector3 } from "@/lib/geo";

const CITIES_ROT = [
  CITIES.london,
  CITIES.cairo,
  CITIES.nairobi,
  CITIES.sydney,
  CITIES.sanFrancisco,
  CITIES.tokyo,
];

const TILT = THREE.MathUtils.degToRad(23.44);
const SUN = new THREE.Vector3(1, 0.04, 0).normalize();

function fmtHour(h: number) {
  const x = ((h % 24) + 24) % 24;
  const hh = Math.floor(x);
  const mm = Math.floor((x - hh) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function localHour(utc: number, lon: number) {
  return fmtHour(utc + lon / 15);
}

function TerminatorRing({ radius }: { radius: number }) {
  const q = useQuality();
  const pts = useMemo(() => {
    const s = SUN.clone().normalize();
    const up = Math.abs(s.y) < 0.85 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, 0, 1);
    const a = new THREE.Vector3().crossVectors(s, up).normalize();
    const b = new THREE.Vector3().crossVectors(s, a).normalize();
    const n = Math.max(96, q.sphere);
    const out: THREE.Vector3[] = [];
    for (let i = 0; i <= n; i++) {
      const th = (i / n) * Math.PI * 2;
      out.push(
        a
          .clone()
          .multiplyScalar(Math.cos(th) * radius)
          .add(b.clone().multiplyScalar(Math.sin(th) * radius)),
      );
    }
    return out;
  }, [radius, q.sphere]);
  return <Line points={pts} color="#F4EFE6" transparent opacity={0.92} lineWidth={1.6} />;
}

function ZoneMeridians() {
  const show = useLabControls((s) => (s.params.zones ?? 0) > 0.5);
  const geom = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let lon = -180; lon < 180; lon += 15) {
      for (let lat = -78; lat < 78; lat += 3) {
        pts.push(latLonToVector3(lat, lon, 1.012));
        pts.push(latLonToVector3(lat + 3, lon, 1.012));
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
  if (!show) return null;
  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial color="#E8B86D" transparent opacity={0.42} />
    </lineSegments>
  );
}

function HourTicks() {
  const q = useQuality();
  const pts = useMemo(() => {
    const a: THREE.Vector3[] = [];
    const n = Math.max(24, q.sphere / 4);
    for (let lon = -180; lon < 180; lon += 15) {
      const inner = latLonToVector3(0, lon, 1.02);
      const outer = latLonToVector3(0, lon, 1.08);
      a.push(inner, outer);
    }
    void n;
    return a;
  }, [q.sphere]);
  return (
    <lineSegments geometry={useMemo(() => new THREE.BufferGeometry().setFromPoints(pts), [pts])}>
      <lineBasicMaterial color="#3EE0C6" transparent opacity={0.55} />
    </lineSegments>
  );
}

function Globe() {
  useLabTick(1 / 24);
  const t = useLabControls((s) => s.t);
  const graticule = useLabControls((s) => s.graticule);
  const hour = t * 24;
  const rotY = t * Math.PI * 2;
  const sunDir = useMemo(() => SUN.clone(), []);

  return (
    <>
      <ambientLight intensity={0.055} color="#9bb0c8" />
      <directionalLight position={[8, 0.35, 0]} intensity={3.1} color="#fff4dc" />
      <directionalLight position={[-5, 0.2, 0]} intensity={0.08} color="#1a2a44" />
      <Starfield />
      <group rotation={[0, 0, TILT]}>
        <group rotation={[0, rotY, 0]}>
          <EarthMesh sunDirection={sunDir} clouds />
          <Atmosphere />
          <AxisLine tiltDeg={0} radius={1.26} />
          {graticule && <Graticule radius={1.018} />}
          <ZoneMeridians />
          <HourTicks />
          {CITIES_ROT.map((c) => (
            <group key={c.name}>
              <CityMarker lat={c.lat} lon={c.lon} />
              <Tag
                pos={latLonToVector3(c.lat, c.lon, 1.16).toArray() as [number, number, number]}
                text={`${c.name} · ${localHour(hour, c.lon)}`}
                occlude={false}
              />
            </group>
          ))}
        </group>
      </group>
      <TerminatorRing radius={1.035} />
      <Tag pos={[0, 0.15, 1.35]} text="Terminator · knife of dawn" tone="ice" occlude={false} />
      <Tag pos={[1.35, 0.2, 0]} text="Noon" tone="sandstone" occlude={false} />
      <Tag pos={[-1.35, 0.2, 0]} text="Midnight" occlude={false} />
      <Readout pos={[0, 1.62, 0]}>
        UTC {fmtHour(hour)} · 15° of longitude = 1 hour · west to east
      </Readout>
      <StepCamera
        positions={[
          [0, 0.45, 3.2],
          [2.4, 0.8, 2.6],
          [0, 2.2, 3.4],
          [0, 0.45, 3.2],
        ]}
      />
    </>
  );
}

export default function RotationScene() {
  const t = useLabControls((s) => s.t);
  const setGraticule = useLabControls((s) => s.setGraticule);
  const graticule = useLabControls((s) => s.graticule);
  const hour = t * 24;
  return (
    <>
      <LabStudio
        slug="rotation"
        title="Earth rotation and the terminator"
        camera={{ position: [0, 0.45, 3.2], fov: 42 }}
        liveText={`UTC ${fmtHour(hour)}. Earth turns west to east. The terminator is a sharp dawn line. Fifteen degrees of longitude is one hour.`}
        fallback={
          <GenericFallback
            slug="rotation"
            title="Earth rotation"
            caption="Earth turns west to east. 15° of longitude is one hour. Dawn is a terminator, not a jump."
          />
        }
        lights={false}
        minDistance={2.1}
        maxDistance={6.5}
      >
        <Globe />
      </LabStudio>
      <SceneToggles>
        <SceneBtn onClick={() => setGraticule(!graticule)} active={graticule}>
          Graticule {graticule ? "on" : "off"}
        </SceneBtn>
      </SceneToggles>
    </>
  );
}
