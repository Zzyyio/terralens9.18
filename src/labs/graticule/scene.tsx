import { useMemo } from "react";
import * as THREE from "three";
import {
  Atmosphere,
  CityMarker,
  EarthMesh,
  Graticule,
  Starfield,
} from "@/components/globe/earth";
import { fmtLatLon, latLonToVector3 } from "@/lib/geo";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Arrow3, Readout, StepCamera, Tag } from "@/labs/shared/kit";
import { tubeGeometry } from "@/labs/shared/terrain";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

const SUN = new THREE.Vector3(3.2, 0.45, 1.6);

function ll(lat: number, lon: number, r: number): [number, number, number] {
  const v = latLonToVector3(lat, lon, r);
  return [v.x, v.y, v.z];
}

function Trace({
  lat0,
  lon0,
  lat1,
  lon1,
  radius,
  color,
  fat = 0.0055,
}: {
  lat0: number;
  lon0: number;
  lat1: number;
  lon1: number;
  radius: number;
  color: string;
  fat?: number;
}) {
  const geom = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 64; i++) {
      const u = i / 64;
      const lat = lat0 + (lat1 - lat0) * u;
      const lon = lon0 + (lon1 - lon0) * u;
      const v = latLonToVector3(lat, lon, radius);
      pts.push([v.x, v.y, v.z]);
    }
    return tubeGeometry(pts, fat, 64, 8);
  }, [lat0, lon0, lat1, lon1, radius, fat]);
  return (
    <mesh geometry={geom}>
      <meshStandardMaterial color={color} roughness={0.38} metalness={0.12} />
    </mesh>
  );
}

function ParallelRing({ lat, radius, color }: { lat: number; radius: number; color: string }) {
  const geom = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let lon = -180; lon <= 180; lon += 4) {
      const v = latLonToVector3(lat, lon, radius);
      pts.push([v.x, v.y, v.z]);
    }
    return tubeGeometry(pts, 0.006, 90, 8);
  }, [lat, radius]);
  return (
    <mesh geometry={geom}>
      <meshStandardMaterial color={color} roughness={0.36} metalness={0.1} />
    </mesh>
  );
}

function DenseGrid({ radius }: { radius: number }) {
  const q = useQuality();
  const obj = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const step = q.sphere >= 80 ? 2.5 : 4;
    for (let lat = -80; lat <= 80; lat += 10) {
      for (let lon = -180; lon < 180; lon += step) {
        pts.push(latLonToVector3(lat, lon, radius), latLonToVector3(lat, lon + step, radius));
      }
    }
    for (let lon = -180; lon < 180; lon += 15) {
      for (let lat = -80; lat < 80; lat += step) {
        pts.push(latLonToVector3(lat, lon, radius), latLonToVector3(lat + step, lon, radius));
      }
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    return new THREE.LineSegments(
      g,
      new THREE.LineBasicMaterial({ color: 0xc5d4d0, transparent: true, opacity: 0.45 }),
    );
  }, [radius, q.sphere]);
  return <primitive object={obj} />;
}

function Globe() {
  const lat = useLabControls((s) => s.params.lat ?? 51.5);
  const lon = useLabControls((s) => s.params.lon ?? -0.1);
  const hour = lon / 15;
  const marker = ll(lat, lon, 1.18);
  return (
    <>
      <Starfield />
      <EarthMesh sunDirection={SUN} />
      <Atmosphere />
      <Graticule radius={1.006} />
      <DenseGrid radius={1.012} />
      <ParallelRing lat={0} radius={1.02} color="#3EE0C6" />
      <ParallelRing lat={23.44} radius={1.018} color="#E8B86D" />
      <ParallelRing lat={66.56} radius={1.017} color="#7FD4FF" />
      <Trace lat0={-80} lon0={0} lat1={80} lon1={0} radius={1.021} color="#F4EFE6" fat={0.007} />
      <CityMarker lat={lat} lon={lon} radius={1.038} color="#E8B86D" />
      <Arrow3 from={ll(0, lon, 1.05)} to={ll(lat * 0.92, lon, 1.05)} color="#E8B86D" radius={0.012} />
      <Arrow3 from={ll(0, 0, 1.05)} to={ll(0, Math.max(18, Math.min(40, Math.abs(lon) || 25)), 1.05)} color="#3EE0C6" radius={0.012} />
      <Tag pos={ll(2, 28, 1.2)} text="Equator" tone="glacier" occlude={false} />
      <Tag pos={ll(10, 0, 1.22)} text="Greenwich 0°" occlude={false} />
      <Tag pos={ll(23.44, 48, 1.2)} text="Tropic of Cancer 23.44°N" tone="sandstone" occlude={false} />
      <Tag pos={ll(66.56, 8, 1.16)} text="Arctic Circle 66.56°N" tone="ice" occlude={false} />
      <Tag pos={marker} text={fmtLatLon(lat, lon, 1)} tone="sandstone" occlude={false} />
      <Readout pos={[0, 1.58, 0]}>
        Latitude from the equator · longitude from Greenwich · {fmtLatLon(lat, lon, 2)} ·{" "}
        {hour >= 0 ? "+" : ""}
        {hour.toFixed(1)} h · 15° of longitude = 1 hour
      </Readout>
      <StepCamera
        positions={[
          [0, 0.32, 3.35],
          [2.55, 0.45, 2.15],
          [0.4, 2.35, 2.6],
          [marker[0] * 2.1, marker[1] * 2.1 + 0.55, marker[2] * 2.1 + 1.2],
        ]}
      />
    </>
  );
}

export default function GraticuleScene() {
  const lat = useLabControls((s) => s.params.lat ?? 51.5);
  const lon = useLabControls((s) => s.params.lon ?? -0.1);
  return (
    <LabStudio
      slug="graticule"
      title="Graticule and coordinates"
      camera={{ position: [0, 0.32, 3.35], fov: 42 }}
      liveText={`Point at ${fmtLatLon(lat, lon, 1)}. Latitude is measured from the equator. Longitude is measured from Greenwich.`}
      fallback={
        <GenericFallback
          slug="graticule"
          title="Graticule and coordinates"
          caption="Latitude is how far from the equator. Longitude is how far from Greenwich. Together they are an address."
        />
      }
      minDistance={2}
      maxDistance={7}
    >
      <Globe />
    </LabStudio>
  );
}
