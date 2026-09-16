import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useLabControls } from "@/lib/store/lab-controls";
import { Tag, Readout } from "./kit";
import { useQuality } from "./perf";
import { useLabTick } from "@/labs/tick";

type RigCtx = {
  t: number;
  trueScale: boolean;
  explode: number;
  slice: number;
  playing: boolean;
  params: Record<string, number>;
  lod: boolean;
};

function num(v: unknown, d = 0) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : d;
}

const clipPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.15);

function applyRig(obj: THREE.Object3D, ctx: RigCtx) {
  const d = obj.userData as Record<string, unknown>;
  const rig = typeof d.tl_rig === "string" ? d.tl_rig : "";
  const name = obj.name || "";

  if (name === "Exag" || rig === "exag") {
    const f = num(d.tl_exag, 6) || 6;
    if (name === "Exag") {
      obj.scale.y = ctx.trueScale ? 1 / f : 1;
    } else {
      obj.scale.y = ctx.trueScale ? 1 / f : 1;
    }
  }
  if (rig === "true_fill") {
    const teach = num(d.tl_inner, 0.978);
    const real = num(d.tl_true, 0.9945);
    obj.scale.setScalar(ctx.trueScale ? real / teach : 1);
  }
  if (rig === "shell_true") {
    obj.scale.setScalar(ctx.trueScale ? num(d.tl_true, 0.97) : 1);
  }
  if (rig === "exag_crust") {
    // Crust outer radius stays 1. T thickens the mantle up into the teaching shell (true_fill).
  }
  if (rig === "spin") obj.rotation.y = ctx.t * Math.PI * 2;
  if (rig === "spin_slow") obj.rotation.y = ctx.t * Math.PI * 0.4;
  if (rig === "explode") obj.position.x = -ctx.explode * (0.35 + num(d.tl_exag, 0.2));
  if (rig.startsWith("visc_band:")) {
    const [, a, b] = rig.split(":");
    const v = ctx.params.visc ?? 0.25;
    obj.visible = v >= Number(a) && v < Number(b);
  }
  if (rig.startsWith("site_band:")) {
    const [, a, b] = rig.split(":");
    const v = ctx.params.site ?? 0;
    obj.visible = v >= Number(a) && v < Number(b);
  }
  if (rig.startsWith("stage_band:")) {
    const [, a, b] = rig.split(":");
    const v = ctx.params.stage ?? ctx.t * 5;
    obj.visible = v >= Number(a) && v < Number(b);
  }
  if (rig.startsWith("zoom_band:")) {
    const [, a, b] = rig.split(":");
    const v = ctx.params.zoom ?? 0;
    obj.visible = v >= Number(a) && v < Number(b);
  }
  if (rig.startsWith("show_stage:")) {
    const st = Number(rig.split(":")[1]);
    const cur = Math.round(ctx.params.stage ?? 1);
    obj.scale.setScalar(cur === st ? 1.08 : 1);
  }
  if (rig.startsWith("scale_t:")) {
    const axis = rig.split(":")[1] ?? "y";
    const s = 0.35 + ctx.t * 0.85;
    if (axis === "x") obj.scale.x = s;
    else if (axis === "z") obj.scale.z = s;
    else obj.scale.y = s;
  }
  if (rig.startsWith("loc_t:")) {
    const [, axis, amp] = rig.split(":");
    const a = Number(amp) || 1;
    const o = (ctx.t - 0.5) * a;
    if (axis === "x") obj.position.x = o;
    else if (axis === "y") obj.position.y = o;
    else obj.position.z = o;
  }
  if (rig.startsWith("param_z:")) {
    const [, key, lo, hi] = rig.split(":");
    const v = ctx.params[key ?? ""] ?? ctx.t;
    const z = THREE.MathUtils.lerp(Number(lo), Number(hi), v);
    obj.position.z = z;
  }
  if (rig === "slip_hang") {
    obj.position.x = -0.15 - ctx.t * 0.35;
    obj.position.z = 0.9 - ctx.t * 0.18;
  }
  if (rig === "discharge") {
    const q = ctx.params.discharge ?? 0.7;
    obj.scale.set(1 + q * 0.4, 1, 0.7 + q * 0.6);
  }
  if (rig === "texture_marker") {
    const sand = ctx.params.sand ?? 0.4;
    const clay = ctx.params.clay ?? 0.2;
    obj.position.x = (sand - 0.5) * 1.6;
    obj.position.y = (clay - 0.3) * 1.6;
  }
  if (rig === "profile_hide_e") {
    const profile = Math.round(ctx.params.profile ?? ctx.params.soil ?? 0);
    obj.visible = profile === 0;
  }
  if (rig.startsWith("show_if_param_gt:")) {
    const [, key, val] = rig.split(":");
    obj.visible = (ctx.params[key ?? ""] ?? ctx.t) > Number(val);
  }
  if (rig === "sun_path") {
    const lat = ((ctx.params.latitude ?? 51.5) * Math.PI) / 180;
    const day = ctx.params.day ?? ctx.t;
    const dec = 0.409 * Math.sin((day - 0.22) * Math.PI * 2);
    const alt = Math.PI / 2 - Math.abs(lat - dec);
    obj.position.set(Math.cos(alt) * 1.6, -Math.sin(ctx.t * Math.PI) * 0.4, Math.sin(Math.max(0.05, alt)) * 1.6);
  }

  const isLod = name.endsWith("_LOD1");
  if (isLod) {
    obj.visible = ctx.lod && obj.visible;
  } else {
    const lodSibling = obj.parent?.children.find((c) => c.name === `${name}_LOD1`);
    if (lodSibling && ctx.lod) obj.visible = false;
  }

  const mesh = obj as THREE.Mesh;
  if (mesh.isMesh && mesh.material) {
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    clipPlane.constant = 0.15 + ctx.slice * 1.4;
    for (const mat of mats) {
      const m = mat as THREE.MeshPhysicalMaterial;
      if (!m) continue;
      if (ctx.slice > 0.04) {
        m.clippingPlanes = [clipPlane];
        m.clipShadows = true;
      } else if (m.clippingPlanes?.length) {
        m.clippingPlanes = [];
      }
    }
  }

  for (const c of obj.children) applyRig(c, ctx);
}

function friendly(name: string) {
  return name.replace(/_LOD1$/, "").replace(/_/g, " ");
}

export function GlbRig({ slug, tick = 1 / 16 }: { slug: string; tick?: number }) {
  useLabTick(tick);
  const url = `/models/${slug}.glb`;
  const gltf = useGLTF(url);
  const q = useQuality();
  const root = useMemo(() => {
    const c = gltf.scene.clone(true);
    c.traverse((o) => {
      const d = o.userData as Record<string, unknown>;
      const extras = d.extras;
      if (extras && typeof extras === "object") Object.assign(d, extras);
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = q.shadows;
        m.receiveShadow = true;
        const mats = Array.isArray(m.material) ? m.material : [m.material];
        for (const mat of mats) {
          if (mat) {
            mat.side = THREE.DoubleSide;
            (mat as THREE.MeshPhysicalMaterial).clippingPlanes = [];
          }
        }
      }
    });
    return c;
  }, [gltf.scene, q.shadows]);

  const t = useLabControls((s) => s.t);
  const trueScale = useLabControls((s) => s.trueScale);
  const explode = useLabControls((s) => s.explode);
  const slice = useLabControls((s) => s.slice);
  const playing = useLabControls((s) => s.playing);
  const params = useLabControls((s) => s.params);
  const setInspect = useLabControls((s) => s.setInspect);
  const labels = useLabControls((s) => s.labels);

  const ctxRef = useRef<RigCtx>({ t, trueScale, explode, slice, playing, params, lod: !q.shadows });
  ctxRef.current = { t, trueScale, explode, slice, playing, params, lod: !q.shadows };

  useFrame(({ camera }) => {
    const dist = camera.position.length();
    ctxRef.current.lod = !q.shadows || dist > 11;
    applyRig(root, ctxRef.current);
  });
  useEffect(() => {
    applyRig(root, ctxRef.current);
  }, [root, t, trueScale, explode, slice, params]);

  const parts = useMemo(() => {
    const out: { name: string; note: string; pos: [number, number, number] }[] = [];
    const box = new THREE.Box3();
    const v = new THREE.Vector3();
    root.updateMatrixWorld(true);
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      if (m.name.endsWith("_LOD1")) return;
      if (m.name.startsWith("cut") || m.name.includes("_cut") || m.name.includes("notch")) return;
      if (m.name.endsWith("_crv")) return;
      const note = String((m.userData as { tl_note?: string }).tl_note ?? (m.parent as THREE.Object3D | null)?.userData?.tl_note ?? "");
      if (!m.name || m.name.startsWith("Cube") || m.name.startsWith("Sphere")) return;
      box.setFromObject(m);
      box.getCenter(v);
      v.y += Math.max(0.12, (box.max.y - box.min.y) * 0.55);
      out.push({ name: m.name, note: note || `${friendly(m.name)} is a named part of this teaching model.`, pos: [v.x, v.y, v.z] });
    });
    return out.slice(0, 14);
  }, [root]);

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        const o = e.object;
        const note =
          String((o.userData as { tl_note?: string }).tl_note || "") ||
          String((o.parent?.userData as { tl_note?: string } | undefined)?.tl_note || "") ||
          `${friendly(o.name)} is a named part.`;
        setInspect({ name: friendly(o.name), note });
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <primitive object={root} />
      {labels &&
        parts.map((p) => (
          <Tag key={p.name} pos={p.pos} text={friendly(p.name)} note={p.note} occlude={false} />
        ))}
      <Readout pos={[0, 2.4, 0]}>click the part · T true scale · Space play</Readout>
    </group>
  );
}

export function preloadGlb(slug: string) {
  useGLTF.preload(`/models/${slug}.glb`);
}
