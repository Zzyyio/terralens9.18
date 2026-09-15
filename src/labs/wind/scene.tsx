import { useMemo } from "react";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { LabStudio } from "@/labs/shared/studio";
import { Tag, Readout, StudioFloor, StepCamera, Arrow3, SceneToggles, SceneBtn } from "@/labs/shared/kit";
import { PBR } from "@/labs/shared/materials";
import { useQuality } from "@/labs/shared/perf";
import { GenericFallback } from "@/labs/shared/fallback";

function Column({
  x,
  label,
  color,
  high,
}: {
  x: number;
  label: string;
  color: string;
  high: boolean;
}) {
  const q = useQuality();
  const segs = Math.max(20, Math.round(q.lathe / 3));
  const h = high ? 1.85 : 1.15;
  return (
    <group position={[x, h / 2, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[high ? 0.38 : 0.32, high ? 0.42 : 0.36, h, segs]} />
        <meshStandardMaterial
          color={color}
          roughness={0.38}
          metalness={0.08}
          transparent
          opacity={0.82}
          emissive={color}
          emissiveIntensity={0.12}
        />
      </mesh>
      <Tag pos={[0, h / 2 + 0.28, 0]} text={label} tone={high ? "sandstone" : "ice"} occlude={false} />
    </group>
  );
}

function Wind() {
  const params = useLabControls((s) => s.params);
  const cor = (params.coriolis ?? 1) > 0.5;
  const fr = (params.friction ?? 0) > 0.5;
  const nh = (params.hemisphere ?? ((params.sh ?? 0) > 0.5 ? -1 : 1)) >= 0;
  const q = useQuality();

  const isobars = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pts: number[] = [];
    for (const x of [-1.2, -0.4, 0.4, 1.2]) {
      pts.push(x, 0.04, -1.7, x, 0.04, 1.7);
    }
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  // PGF is +X (H → L). NH right of +X (from above) is −Z; SH left is +Z.
  const turn = !cor ? 0 : fr ? 0.55 : 1.28;
  const sign = nh ? -1 : 1;
  const wx = Math.cos(turn);
  const wz = sign * Math.sin(turn);
  const windTo: [number, number, number] = [wx * 1.85, 0.55, wz * 1.85];
  const corTo: [number, number, number] = [
    (nh ? wz : -wz) * 1.15,
    0.7,
    (nh ? -wx : wx) * 1.15,
  ];

  return (
    <group>
      <StudioFloor size={12} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[4.6, Math.max(32, q.sphere / 2)]} />
        <meshStandardMaterial
          color={PBR.basalt.color}
          roughness={PBR.basalt.roughness}
          metalness={PBR.basalt.metalness}
        />
      </mesh>
      <lineSegments geometry={isobars}>
        <lineBasicMaterial color="#8B9A97" transparent opacity={0.55} />
      </lineSegments>

      <Column x={-2.05} label="H" color="#E8B86D" high />
      <Column x={2.05} label="L" color="#7FD4FF" high={false} />

      <Arrow3 from={[-1.15, 0.72, 0]} to={[1.05, 0.72, 0]} color="#E8B86D" radius={0.045} />
      <Tag pos={[0, 1.15, 0.15]} text="PGF" tone="sandstone" occlude={false} />

      {cor && (
        <>
          <Arrow3 from={[0.05, 0.7, 0.05]} to={corTo} color="#3EE0C6" radius={0.032} />
          <Tag
            pos={[corTo[0] * 0.7, 1.22, corTo[2] * 0.7]}
            text="Coriolis"
            tone="glacier"
            occlude={false}
          />
        </>
      )}

      <Arrow3 from={[0, 0.55, 0]} to={windTo} color="#7FD4FF" radius={0.05} />
      <Tag
        pos={[windTo[0] * 0.55, 0.28, windTo[2] * 0.55 + 0.15]}
        text={fr ? "friction" : cor ? (nh ? "NH right" : "SH left") : "along PGF"}
        tone={fr ? "fault" : "ice"}
        occlude={false}
      />
      {cor && (
        <Tag
          pos={[0, 2.05, 1.6]}
          text={nh ? "NH right" : "SH left"}
          tone="glacier"
          occlude={false}
        />
      )}
      {fr && (
        <Arrow3 from={[0.15, 0.38, wz * 0.4]} to={[1.25, 0.38, wz * 0.15]} color="#E24B4B" radius={0.028} />
      )}

      <Readout pos={[0, 2.55, 0]}>
        {nh ? "Northern hemisphere" : "Southern hemisphere"} · Coriolis {cor ? "on" : "off"} ·
        friction {fr ? "pulls across isobars toward L" : "off · geostrophic"}
      </Readout>
      <StepCamera
        positions={[
          [0, 3.4, 5.4],
          [-2.2, 2.2, 4.2],
          [2.4, 2.4, 4.0],
          [0, 3.4, 5.4],
        ]}
      />
    </group>
  );
}

export default function WindScene() {
  const params = useLabControls((s) => s.params);
  const setParam = useLabControls((s) => s.setParam);
  const fr = (params.friction ?? 0) > 0.5;
  const nh = (params.hemisphere ?? ((params.sh ?? 0) > 0.5 ? -1 : 1)) >= 0;
  return (
    <>
      <LabStudio
        slug="wind"
        title="Wind, PGF and Coriolis"
        camera={{ position: [0, 3.4, 5.4], fov: 40 }}
        liveText={`PGF from High to Low. ${nh ? "NH Coriolis deflects right." : "SH Coriolis deflects left."} Friction ${fr ? "on — surface wind cuts toward L." : "off."}`}
        exaggeration="Forces are arrows, not a forecast. Basin-scale sinks are not Coriolis."
        fallback={
          <GenericFallback
            slug="wind"
            title="Wind"
            caption="PGF points High to Low. Coriolis bends right in the NH, left in the SH. Friction lets the wind cut toward Low."
          />
        }
      >
        <Wind />
      </LabStudio>
      <SceneToggles>
        <SceneBtn
          onClick={() => {
            setParam("sh", nh ? 1 : 0);
            setParam("hemisphere", nh ? -1 : 1);
          }}
          active={!nh}
        >
          {nh ? "Switch to SH" : "Switch to NH"}
        </SceneBtn>
        <SceneBtn onClick={() => setParam("friction", fr ? 0 : 1)} active={fr}>
          Friction {fr ? "on" : "off"}
        </SceneBtn>
      </SceneToggles>
    </>
  );
}
