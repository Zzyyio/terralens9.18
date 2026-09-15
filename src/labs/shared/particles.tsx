import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";

export function CurveFlow({
  pts,
  color,
  count = 10,
  radius = 0.045,
}: {
  pts: THREE.Vector3[];
  color: string;
  count?: number;
  radius?: number;
  rate?: number;
}) {
  const t = useLabControls((s) => s.t);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(pts), [pts]);
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const u = (t + i / count) % 1;
        const p = curve.getPoint(u);
        return (
          <mesh key={i} position={p}>
            <sphereGeometry args={[radius, 8, 8]} />
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
}
