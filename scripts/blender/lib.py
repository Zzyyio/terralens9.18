"""TerraLens Blender 4.2 museum-model kit.

Named meshes + packed PBR + extras (tl_note, tl_rig, tl_exag) → glTF 2.0 .glb.
Blender is Z-up; export_yup converts to Three.js Y-up.

Export checklist (every lab):
- modifiers applied
- scale/rotation applied
- Shade Auto Smooth 30°
- albedo 1K–2K packed into the GLB
- no decimate of 20k–80k landforms
"""
from __future__ import annotations

import math
import os
from typing import Callable

import bmesh
import bpy
from mathutils import Vector

ROOT = "/workspace/public/models"
PREV = os.path.join(ROOT, "previews")
TEX = "/workspace/public/textures"
MAT: dict[str, bpy.types.Material] = {}


# ---------------------------------------------------------------------------
# Scene
# ---------------------------------------------------------------------------
def look_at(obj, target=(0, 0, 0.4)):
    direction = Vector(target) - obj.location
    if direction.length < 1e-8:
        return
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def reset_scene():
    """Wipe objects/datablocks without factory-reset (that kills glTF extras)."""
    if bpy.context.mode != "OBJECT":
        try:
            bpy.ops.object.mode_set(mode="OBJECT")
        except Exception:
            pass
    for obj in list(bpy.data.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    for coll in (
        bpy.data.meshes,
        bpy.data.curves,
        bpy.data.cameras,
        bpy.data.lights,
        bpy.data.materials,
        bpy.data.images,
        bpy.data.textures,
    ):
        for block in list(coll):
            try:
                coll.remove(block)
            except Exception:
                pass
    MAT.clear()
    try:
        bpy.ops.preferences.addon_enable(module="io_scene_gltf2")
    except Exception:
        pass

    world = bpy.data.worlds.get("World") or bpy.data.worlds.new("World")
    bpy.context.scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (0.10, 0.13, 0.16, 1)
        bg.inputs[1].default_value = 1.15

    cam_data = bpy.data.cameras.new("Cam")
    cam_data.lens = 38
    cam = bpy.data.objects.new("Camera", cam_data)
    cam.location = (5.2, -6.4, 3.4)
    bpy.context.collection.objects.link(cam)
    bpy.context.scene.camera = cam
    look_at(cam, (0, 0, 0.45))

    sun_data = bpy.data.lights.new("Sun", "SUN")
    sun_data.energy = 5.2
    sun_data.angle = 0.18
    sun_data.color = (1.0, 0.97, 0.92)
    sun = bpy.data.objects.new("Sun", sun_data)
    sun.location = (5.5, -7.0, 9.0)
    bpy.context.collection.objects.link(sun)
    look_at(sun, (0, 0, 0))

    fill_data = bpy.data.lights.new("Fill", "AREA")
    fill_data.energy = 140
    fill_data.size = 7
    fill_data.color = (0.72, 0.82, 1.0)
    fill = bpy.data.objects.new("Fill", fill_data)
    fill.location = (-5.5, -1.5, 4.8)
    bpy.context.collection.objects.link(fill)

    rim_data = bpy.data.lights.new("Rim", "AREA")
    rim_data.energy = 60
    rim_data.size = 4
    rim = bpy.data.objects.new("Rim", rim_data)
    rim.location = (0.5, 6.0, 3.2)
    bpy.context.collection.objects.link(rim)

    sc = bpy.context.scene
    sc.unit_settings.system = "METRIC"
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.render.resolution_x = 1280
    sc.render.resolution_y = 800
    sc.render.film_transparent = False
    sc.view_settings.view_transform = "Filmic"
    sc.view_settings.look = "Medium High Contrast"


# ---------------------------------------------------------------------------
# Materials
# ---------------------------------------------------------------------------
def _bsdf(mat):
    nt = mat.node_tree
    return nt.nodes.get("Principled BSDF")


def _set(inp, key, value):
    if key in inp:
        inp[key].default_value = value


def pbr(
    name,
    color,
    rough=0.62,
    metal=0.0,
    trans=0.0,
    emit=0.0,
    emit_col=None,
    ior=1.45,
    spec=0.5,
    sss=0.0,
    alpha=1.0,
):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = _bsdf(mat)
    inp = bsdf.inputs
    _set(inp, "Base Color", (*color, 1.0))
    _set(inp, "Roughness", rough)
    _set(inp, "Metallic", metal)
    _set(inp, "IOR", ior)
    _set(inp, "Specular IOR Level", spec)
    _set(inp, "Alpha", alpha)
    if "Transmission Weight" in inp:
        inp["Transmission Weight"].default_value = trans
    elif "Transmission" in inp:
        inp["Transmission"].default_value = trans
    if sss and "Subsurface Weight" in inp:
        inp["Subsurface Weight"].default_value = sss
        if "Subsurface Radius" in inp:
            inp["Subsurface Radius"].default_value = (0.6, 0.35, 0.25)
    if emit > 0:
        _set(inp, "Emission Color", (*(emit_col or color), 1.0))
        _set(inp, "Emission Strength", emit)
    if trans > 0.05 or alpha < 0.99:
        mat.blend_method = "BLEND"
        try:
            mat.use_screen_refraction = True
        except Exception:
            pass
    MAT[name] = mat
    return mat


def tex_mat(name, path, rough=0.52, size=(2048, 1024)):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    bsdf = _bsdf(mat)
    if os.path.isfile(path):
        img = bpy.data.images.load(path, check_existing=True)
        try:
            w, h = img.size
            if w > 2048 or h > 2048:
                img.scale(min(w, 2048), min(h, 2048))
        except Exception:
            pass
        tex = nt.nodes.new("ShaderNodeTexImage")
        tex.image = img
        tex.interpolation = "Smart"
        tex.location = (-320, 220)
        nt.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
        if "earth-day" in path and os.path.isfile(os.path.join(TEX, "earth-bump.jpg")):
            bump_img = bpy.data.images.load(os.path.join(TEX, "earth-bump.jpg"), check_existing=True)
            btex = nt.nodes.new("ShaderNodeTexImage")
            btex.image = bump_img
            btex.location = (-320, -40)
            bump = nt.nodes.new("ShaderNodeBump")
            bump.inputs["Strength"].default_value = 0.28
            nt.links.new(btex.outputs["Color"], bump.inputs["Height"])
            nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    else:
        bsdf.inputs["Base Color"].default_value = (0.18, 0.36, 0.58, 1)
    bsdf.inputs["Roughness"].default_value = rough
    MAT[name] = mat
    return mat


def pbr_tex(name, diff_path, nor_path=None, rough_path=None, color=(0.42, 0.40, 0.36), rough=0.7, scale=2.4):
    """Packed albedo + normal (Poly Haven 1K). Images travel inside the GLB."""
    mat = pbr(name, color, rough=rough)
    nt = mat.node_tree
    bsdf = _bsdf(mat)
    texcoord = nt.nodes.new("ShaderNodeTexCoord")
    mapping = nt.nodes.new("ShaderNodeMapping")
    mapping.inputs["Scale"].default_value = (scale, scale, scale)
    nt.links.new(texcoord.outputs["UV"], mapping.inputs["Vector"])
    if diff_path and os.path.isfile(diff_path):
        img = bpy.data.images.load(diff_path, check_existing=True)
        try:
            if img.size[0] > 2048:
                img.scale(2048, 2048)
        except Exception:
            pass
        tex = nt.nodes.new("ShaderNodeTexImage")
        tex.image = img
        tex.interpolation = "Smart"
        nt.links.new(mapping.outputs["Vector"], tex.inputs["Vector"])
        nt.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
    if nor_path and os.path.isfile(nor_path):
        nimg = bpy.data.images.load(nor_path, check_existing=True)
        ntex = nt.nodes.new("ShaderNodeTexImage")
        ntex.image = nimg
        try:
            ntex.image.colorspace_settings.name = "Non-Color"
        except Exception:
            pass
        nrm = nt.nodes.new("ShaderNodeNormalMap")
        nrm.inputs["Strength"].default_value = 0.72
        nt.links.new(mapping.outputs["Vector"], ntex.inputs["Vector"])
        nt.links.new(ntex.outputs["Color"], nrm.inputs["Color"])
        nt.links.new(nrm.outputs["Normal"], bsdf.inputs["Normal"])
    if rough_path and os.path.isfile(rough_path):
        rimg = bpy.data.images.load(rough_path, check_existing=True)
        rtex = nt.nodes.new("ShaderNodeTexImage")
        rtex.image = rimg
        try:
            rtex.image.colorspace_settings.name = "Non-Color"
        except Exception:
            pass
        nt.links.new(mapping.outputs["Vector"], rtex.inputs["Vector"])
        nt.links.new(rtex.outputs["Color"], bsdf.inputs["Roughness"])
    MAT[name] = mat
    return mat


def mats():
    MAT.clear()
    rock_d = os.path.join(TEX, "pbr", "rock_diff.jpg")
    rock_n = os.path.join(TEX, "pbr", "rock_nor.jpg")
    rock_r = os.path.join(TEX, "pbr", "rock_rough.jpg")
    sand_d = os.path.join(TEX, "pbr", "sand_diff.jpg")
    sand_n = os.path.join(TEX, "pbr", "sand_nor.jpg")
    pbr("chalk", (0.90, 0.87, 0.78), rough=0.78)
    pbr("basalt", (0.14, 0.14, 0.16), rough=0.72, spec=0.35)
    pbr("sand", (0.76, 0.64, 0.42), rough=0.88)
    pbr("sandstone", (0.72, 0.52, 0.34), rough=0.74)
    pbr("limestone", (0.82, 0.78, 0.68), rough=0.70)
    pbr("granite", (0.55, 0.50, 0.48), rough=0.55, spec=0.6)
    pbr("schist", (0.42, 0.40, 0.36), rough=0.48, spec=0.55)
    if os.path.isfile(rock_d):
        pbr_tex("chalk", rock_d, rock_n, rock_r, color=(0.90, 0.87, 0.78), rough=0.78, scale=3.2)
        pbr_tex("limestone", rock_d, rock_n, rock_r, color=(0.82, 0.78, 0.68), rough=0.70, scale=2.6)
        pbr_tex("granite", rock_d, rock_n, rock_r, color=(0.55, 0.50, 0.48), rough=0.55, scale=1.8)
        pbr_tex("sandstone", rock_d, rock_n, rock_r, color=(0.72, 0.52, 0.34), rough=0.74, scale=2.2)
        pbr_tex("basalt", rock_d, rock_n, rock_r, color=(0.14, 0.14, 0.16), rough=0.72, scale=2.8)
        pbr_tex("schist", rock_d, rock_n, rock_r, color=(0.42, 0.40, 0.36), rough=0.48, scale=2.0)
        pbr_tex("rock_bump", rock_d, rock_n, rock_r, color=(0.36, 0.34, 0.32), rough=0.7, scale=2.4)
        pbr_tex("crust", rock_d, rock_n, rock_r, color=(0.45, 0.38, 0.28), rough=0.70, scale=2.1)
    if os.path.isfile(sand_d):
        pbr_tex("sand", sand_d, sand_n, None, color=(0.76, 0.64, 0.42), rough=0.88, scale=4.0)
        pbr_tex("till", sand_d, sand_n, None, color=(0.48, 0.42, 0.32), rough=0.90, scale=3.2)
        pbr_tex("soilA", sand_d, sand_n, None, color=(0.32, 0.20, 0.10), rough=0.90, scale=3.4)
        pbr_tex("soilB", sand_d, sand_n, None, color=(0.55, 0.32, 0.16), rough=0.84, scale=2.8)
        pbr_tex("soilC", sand_d, sand_n, None, color=(0.58, 0.48, 0.34), rough=0.82, scale=2.2)
    pbr("grass", (0.22, 0.38, 0.16), rough=0.92)
    pbr("wood", (0.38, 0.24, 0.12), rough=0.80)
    if "till" not in MAT:
        pbr("till", (0.48, 0.42, 0.32), rough=0.90)
    if "soilO" not in MAT:
        pbr("soilO", (0.18, 0.12, 0.08), rough=0.95)
    if "soilA" not in MAT:
        pbr("soilA", (0.32, 0.20, 0.10), rough=0.90)
    if "soilE" not in MAT:
        pbr("soilE", (0.72, 0.66, 0.52), rough=0.86)
    if "soilB" not in MAT:
        pbr("soilB", (0.55, 0.32, 0.16), rough=0.84)
    if "soilC" not in MAT:
        pbr("soilC", (0.58, 0.48, 0.34), rough=0.82)
    pbr("soilR", (0.40, 0.38, 0.36), rough=0.62)
    pbr("oxisol", (0.62, 0.28, 0.12), rough=0.80)
    if "crust" not in MAT:
        pbr("crust", (0.45, 0.38, 0.28), rough=0.70)
    pbr("mantle", (0.62, 0.28, 0.14), rough=0.55)
    pbr("outer", (0.92, 0.55, 0.12), rough=0.22, metal=0.35, emit=0.15, emit_col=(1.0, 0.45, 0.05))
    pbr("inner", (0.95, 0.78, 0.35), rough=0.18, metal=0.85, emit=0.8, emit_col=(1.0, 0.7, 0.25))
    pbr("lava", (0.85, 0.18, 0.04), rough=0.35, emit=2.4, emit_col=(1.0, 0.28, 0.04))
    pbr("ash", (0.22, 0.20, 0.20), rough=0.90)
    pbr("snow", (0.92, 0.95, 0.98), rough=0.55, sss=0.15)
    pbr("ice", (0.78, 0.90, 0.96), rough=0.14, trans=0.18, ior=1.31, sss=0.12, spec=0.85)
    pbr("water", (0.07, 0.34, 0.48), rough=0.08, trans=0.18, ior=1.33, spec=0.95, alpha=0.92)
    pbr("cloud", (0.86, 0.90, 0.94), rough=0.85, trans=0.15, alpha=0.7)
    pbr("gold", (0.92, 0.72, 0.22), rough=0.28, metal=0.85)
    pbr("iron", (0.42, 0.44, 0.46), rough=0.35, metal=0.9)
    pbr("sun", (1.0, 0.85, 0.35), rough=0.4, emit=12.0, emit_col=(1.0, 0.82, 0.35))
    tex_mat("earth", os.path.join(TEX, "earth-day.jpg"), rough=0.48, size=(2048, 1024))
    tex_mat("moon", os.path.join(TEX, "moon.jpg"), rough=0.78, size=(2048, 1024))
    if "rock_bump" not in MAT:
        rock = pbr("rock_bump", (0.36, 0.34, 0.32), rough=0.7)
        npath = os.path.join(TEX, "rock-normal.png")
        if os.path.isfile(npath):
            nt = rock.node_tree
            img = bpy.data.images.load(npath, check_existing=True)
            tex = nt.nodes.new("ShaderNodeTexImage")
            tex.image = img
            nrm = nt.nodes.new("ShaderNodeNormalMap")
            nrm.inputs["Strength"].default_value = 0.55
            nt.links.new(tex.outputs["Color"], nrm.inputs["Color"])
            nt.links.new(nrm.outputs["Normal"], _bsdf(rock).inputs["Normal"])


def assign(obj, matname):
    mat = MAT.get(matname)
    if mat is None:
        mat = pbr(matname, (0.5, 0.5, 0.5))
    if obj.data:
        if obj.data.materials:
            obj.data.materials[0] = mat
        else:
            obj.data.materials.append(mat)
    obj.active_material = mat


# ---------------------------------------------------------------------------
# Noise
# ---------------------------------------------------------------------------
def _hash(p: Vector) -> float:
    n = math.sin(p.x * 127.1 + p.y * 311.7 + p.z * 74.7) * 43758.5453
    return n - math.floor(n)


def _noise(p: Vector) -> float:
    i = Vector((math.floor(p.x), math.floor(p.y), math.floor(p.z)))
    f = Vector((p.x - i.x, p.y - i.y, p.z - i.z))
    u = Vector((f.x * f.x * (3 - 2 * f.x), f.y * f.y * (3 - 2 * f.y), f.z * f.z * (3 - 2 * f.z)))

    def g(dx, dy, dz):
        return _hash(i + Vector((dx, dy, dz)))

    n0 = g(0, 0, 0) * (1 - u.x) + g(1, 0, 0) * u.x
    n1 = g(0, 1, 0) * (1 - u.x) + g(1, 1, 0) * u.x
    n2 = g(0, 0, 1) * (1 - u.x) + g(1, 0, 1) * u.x
    n3 = g(0, 1, 1) * (1 - u.x) + g(1, 1, 1) * u.x
    ny0 = n0 * (1 - u.y) + n1 * u.y
    ny1 = n2 * (1 - u.y) + n3 * u.y
    return ny0 * (1 - u.z) + ny1 * u.z


def fbm(p: Vector, octaves: int = 5) -> float:
    a = 0.0
    amp = 0.5
    f = 1.0
    for _ in range(octaves):
        a += amp * _noise(p * f)
        f *= 2.07
        amp *= 0.5
    return a


# ---------------------------------------------------------------------------
# Object helpers
# ---------------------------------------------------------------------------
def empty(name):
    obj = bpy.data.objects.new(name, None)
    obj.empty_display_size = 0.25
    bpy.context.collection.objects.link(obj)
    return obj


def tag(obj, note, rig=None, exag=None):
    obj["tl_note"] = note
    if rig:
        obj["tl_rig"] = rig
    if exag is not None:
        obj["tl_exag"] = float(exag)
    return obj


def parent(child, par):
    mw = child.matrix_world.copy()
    child.parent = par
    try:
        child.matrix_parent_inverse = par.matrix_world.inverted()
    except Exception:
        pass
    child.matrix_world = mw
    return child


def _link_mesh(name, bm, mat, loc=(0, 0, 0)):
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    obj.location = loc
    bpy.context.collection.objects.link(obj)
    assign(obj, mat)
    _shade(obj)
    return obj


def _shade(obj):
    """Shade Auto Smooth 30° so bevels stay sharp and rock reads as stone, not a faceted cage."""
    mesh = getattr(obj, "data", None)
    if mesh is None or not hasattr(mesh, "polygons"):
        return
    try:
        for p in mesh.polygons:
            p.use_smooth = True
    except Exception:
        pass
    try:
        bpy.ops.object.select_all(action="DESELECT")
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
        angle = math.radians(30)
        if hasattr(bpy.ops.object, "shade_smooth_by_angle"):
            bpy.ops.object.shade_smooth_by_angle(angle=angle, keep_sharp_edges=True)
        elif hasattr(bpy.ops.object, "shade_auto_smooth"):
            try:
                bpy.ops.object.shade_auto_smooth(angle=angle)
            except TypeError:
                bpy.ops.object.shade_auto_smooth(use_auto_smooth=True, angle=angle)
        else:
            split = obj.modifiers.new("AutoSmooth", "EDGE_SPLIT")
            split.split_angle = angle
            split.use_edge_angle = True
            try:
                bpy.ops.object.modifier_apply(modifier=split.name)
            except Exception:
                pass
            for p in mesh.polygons:
                p.use_smooth = True
    except Exception:
        pass


def _uv_grid(bm, sx, sy):
    uv = bm.loops.layers.uv.new("UVMap") if not bm.loops.layers.uv else bm.loops.layers.uv.active
    sx = sx or 1
    sy = sy or 1
    for f in bm.faces:
        for loop in f.loops:
            c = loop.vert.co
            loop[uv].uv = ((c.x / sx) + 0.5, (c.y / sy) + 0.5)


def _uv_sphere(bm):
    uv = bm.loops.layers.uv.new("UVMap") if not bm.loops.layers.uv else bm.loops.layers.uv.active
    for f in bm.faces:
        for loop in f.loops:
            x, y, z = loop.vert.co
            r = math.sqrt(x * x + y * y + z * z) or 1.0
            u = 0.5 + math.atan2(y, x) / (2 * math.pi)
            v = math.acos(max(-1.0, min(1.0, z / r))) / math.pi
            loop[uv].uv = (u, v)


def _floor_res(n, minimum):
    return max(int(n), int(minimum))


def grid(name, nx, ny, sx, sy, height_fn: Callable, mat="granite", loc=(0, 0, 0), center=True):
    area = abs(sx * sy)
    if area >= 20:
        nx, ny = _floor_res(nx, 128), _floor_res(ny, 88)
    elif area >= 10:
        nx, ny = _floor_res(nx, 112), _floor_res(ny, 80)
    elif area >= 4:
        nx, ny = _floor_res(nx, 64), _floor_res(ny, 48)
    nx, ny = max(nx, 8), max(ny, 8)
    bm = bmesh.new()
    bmesh.ops.create_grid(bm, x_segments=nx - 1, y_segments=ny - 1, size=1)
    for v in bm.verts:
        x = v.co.x * (sx * 0.5)
        y = v.co.y * (sy * 0.5)
        z = float(height_fn(x, y))
        v.co = Vector((x, y, z))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    _uv_grid(bm, sx, sy)
    obj = _link_mesh(name, bm, mat, loc)
    return obj


def box(name, sx, sy, sz, nx=8, ny=8, nz=8, mat="granite", loc=(0, 0, 0)):
    vol = abs(sx * sy * sz)
    if vol >= 4:
        nx, ny, nz = _floor_res(nx, 28), _floor_res(ny, 28), _floor_res(nz, 16)
    elif vol >= 1:
        nx, ny, nz = _floor_res(nx, 16), _floor_res(ny, 16), _floor_res(nz, 10)
    nx, ny, nz = max(nx, 2), max(ny, 2), max(nz, 2)
    bm = bmesh.new()
    bmesh.ops.create_grid(bm, x_segments=nx - 1, y_segments=ny - 1, size=1)
    for v in bm.verts:
        v.co.x *= sx * 0.5
        v.co.y *= sy * 0.5
        v.co.z = -sz / 2
    geom_faces = list(bm.faces)
    for _i in range(nz):
        ret = bmesh.ops.extrude_face_region(bm, geom=geom_faces)
        geom_faces = [g for g in ret["geom"] if isinstance(g, bmesh.types.BMFace)]
        verts = [g for g in ret["geom"] if isinstance(g, bmesh.types.BMVert)]
        bmesh.ops.translate(bm, verts=verts, vec=(0, 0, sz / nz))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    _uv_grid(bm, sx, sy)
    return _link_mesh(name, bm, mat, loc)


def uv_sphere(name, r, segs, rings, mat="earth", loc=(0, 0, 0), cut_theta=None):
    if r >= 0.18:
        segs, rings = _floor_res(segs, 128), _floor_res(rings, 80)
    elif r >= 0.08:
        segs, rings = _floor_res(segs, 64), _floor_res(rings, 40)
    segs, rings = max(segs, 16), max(rings, 10)
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=segs, v_segments=rings, radius=r)
    if cut_theta:
        start, width = cut_theta
        kill = []
        for f in bm.faces:
            c = f.calc_center_median()
            ang = math.atan2(c.y, c.x)
            d = (ang - start) % (2 * math.pi)
            if d < width:
                kill.append(f)
        if kill:
            bmesh.ops.delete(bm, geom=kill, context="FACES")
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    _uv_sphere(bm)
    return _link_mesh(name, bm, mat, loc)


def ico(name, r, subdiv, mat="granite", loc=(0, 0, 0)):
    subdiv = max(1, min(int(subdiv), 4))
    if r >= 0.25:
        subdiv = max(subdiv, 2)
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=subdiv, radius=r)
    _uv_sphere(bm)
    return _link_mesh(name, bm, mat, loc)


def cylinder(name, r, h, segs, mat="granite", loc=(0, 0, 0)):
    segs = max(8, int(segs))
    if r * h > 0.4:
        segs = max(segs, 24)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=segs, radius1=r, radius2=r, depth=h)
    _uv_grid(bm, r * 2, h)
    return _link_mesh(name, bm, mat, loc)


def cone(name, r1, r2, h, segs, mat="granite", loc=(0, 0, 0)):
    segs = max(12, int(segs))
    if max(r1, r2) * h > 0.3:
        segs = max(segs, 28)
    bm = bmesh.new()
    bmesh.ops.create_cone(
        bm, cap_ends=True, cap_tris=False, segments=segs, radius1=r1, radius2=r2, depth=h
    )
    return _link_mesh(name, bm, mat, loc)


def torus(name, r_maj, r_min, segs=48, rings=16, mat="cloud", loc=(0, 0, 0)):
    segs, rings = max(24, int(segs)), max(10, int(rings))
    if r_maj >= 0.4:
        segs, rings = max(segs, 96), max(rings, 28)
    bm = bmesh.new()
    verts = []
    for i in range(segs):
        a = i / segs * math.pi * 2
        cx = math.cos(a) * r_maj
        cy = math.sin(a) * r_maj
        row = []
        for j in range(rings):
            b = j / rings * math.pi * 2
            x = cx + math.cos(a) * math.cos(b) * r_min
            y = cy + math.sin(a) * math.cos(b) * r_min
            z = math.sin(b) * r_min
            row.append(bm.verts.new((x, y, z)))
        verts.append(row)
    for i in range(segs):
        i2 = (i + 1) % segs
        for j in range(rings):
            j2 = (j + 1) % rings
            try:
                bm.faces.new((verts[i][j], verts[i2][j], verts[i2][j2], verts[i][j2]))
            except Exception:
                pass
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return _link_mesh(name, bm, mat, loc)


def displace(obj, amount, scale):
    mesh = obj.data
    bm = bmesh.new()
    bm.from_mesh(mesh)
    bm.normal_update()
    for v in bm.verts:
        n = v.normal.copy()
        if n.length < 1e-8:
            continue
        n.normalize()
        v.co += n * amount * (fbm(Vector(v.co) * scale) - 0.32)
    bm.normal_update()
    bm.to_mesh(mesh)
    bm.free()
    mesh.update()
    _shade(obj)
    return obj


def joint_cuts(obj, depth=0.02, freq=6.0):
    mesh = obj.data
    bm = bmesh.new()
    bm.from_mesh(mesh)
    zs = [v.co.z for v in bm.verts] or [0]
    zmax = max(zs)
    zspan = (max(zs) - min(zs)) or 1
    for v in bm.verts:
        x, y, z = v.co
        gx = abs(math.sin(x * freq))
        gy = abs(math.sin(y * freq * 0.92))
        g = min(gx, gy)
        if g < 0.16 and (z > zmax - zspan * 0.65):
            v.co.z -= depth * (1 - g / 0.16)
    bm.to_mesh(mesh)
    bm.free()
    mesh.update()
    return obj


def apply_boolean(obj, cutter, op="DIFFERENCE"):
    bpy.context.view_layer.update()
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    mod = obj.modifiers.new("bool", "BOOLEAN")
    mod.operation = op
    mod.object = cutter
    used = False
    for solver in ("FAST", "EXACT"):
        try:
            mod.solver = solver
        except Exception:
            pass
        try:
            bpy.ops.object.modifier_apply(modifier=mod.name)
            used = True
            break
        except Exception:
            continue
    if not used:
        try:
            obj.modifiers.remove(mod)
        except Exception:
            pass
    try:
        bpy.data.objects.remove(cutter, do_unlink=True)
    except Exception:
        cutter.hide_render = True
        cutter.hide_viewport = True
    _shade(obj)
    return obj


def _count(obj):
    if not obj.data or not hasattr(obj.data, "polygons"):
        return 0
    mesh = obj.data
    try:
        mesh.calc_loop_triangles()
        return len(mesh.loop_triangles)
    except Exception:
        return sum(max(0, len(p.vertices) - 2) for p in mesh.polygons)


def add_lod(obj, ratio=0.55):
    """LOD only for meshes well above the classroom budget. Never decimate a 20k–80k landform."""
    if not obj.data or not hasattr(obj.data, "polygons"):
        return None
    tris = _count(obj)
    if tris < 160000:
        return None
    lod = obj.copy()
    lod.data = obj.data.copy()
    lod.name = obj.name + "_LOD1"
    bpy.context.collection.objects.link(lod)
    lod.parent = obj.parent
    try:
        lod.matrix_parent_inverse = obj.matrix_parent_inverse.copy()
    except Exception:
        pass
    lod.location = obj.location.copy()
    lod.rotation_euler = obj.rotation_euler.copy()
    lod.scale = obj.scale.copy()
    for k in obj.keys():
        if k == "_RNA_UI":
            continue
        try:
            lod[k] = obj[k]
        except Exception:
            pass
    bpy.ops.object.select_all(action="DESELECT")
    lod.select_set(True)
    bpy.context.view_layer.objects.active = lod
    mod = lod.modifiers.new("lod", "DECIMATE")
    mod.ratio = ratio
    try:
        bpy.ops.object.modifier_apply(modifier="lod")
    except Exception:
        try:
            lod.modifiers.remove(mod)
        except Exception:
            pass
    _shade(lod)
    return lod


def water_volume(name, sx, sy, depth, wave, loc=(0, 0, 0)):
    nx, ny = (64, 40) if sx * sy > 12 else (48, 32)
    obj = box(name, sx, sy, depth, nx=nx, ny=ny, nz=5, mat="water", loc=loc)
    mesh = obj.data
    bm = bmesh.new()
    bm.from_mesh(mesh)
    zmax = max(v.co.z for v in bm.verts)
    thresh = zmax - depth * 0.22
    for v in bm.verts:
        if v.co.z > thresh:
            v.co.z += wave * (
                0.55 * math.sin(v.co.x * 2.3 + v.co.y * 0.4)
                + 0.28 * math.sin(v.co.x * 5.1 + v.co.y * 3.3)
                + 0.18 * math.cos(v.co.y * 1.9)
                + 0.35 * fbm(Vector((v.co.x, v.co.y, 2.2)))
            )
    bm.to_mesh(mesh)
    bm.free()
    mesh.update()
    _shade(obj)
    return obj


def ice_tongue(name, length, width, thick, loc=(0, 0, 0)):
    obj = box(name, width, length, thick, nx=40, ny=72, nz=8, mat="ice", loc=loc)
    mesh = obj.data
    bm = bmesh.new()
    bm.from_mesh(mesh)
    for v in bm.verts:
        t = (v.co.y + length / 2) / max(length, 1e-4)
        t = max(0.0, min(1.0, t))
        v.co.x *= 1.05 - 0.42 * t
        v.co.z *= 1.0 - 0.32 * t
        if v.co.z > 0:
            g = abs(math.sin(v.co.y * 8.5 + v.co.x * 1.4))
            if g < 0.38:
                v.co.z -= 0.28 * thick * (1 - g / 0.38) * (0.35 + 0.65 * (1 - t))
            v.co.z += 0.03 * thick * (fbm(Vector((v.co.x, v.co.y, 0)) * 3.2) - 0.4)
    bm.to_mesh(mesh)
    bm.free()
    mesh.update()
    _shade(obj)
    return obj


def volcano_edifice(name, visc, segs=80):
    visc = max(0.0, min(1.0, float(visc)))
    R = 4.5 - visc * 2.4
    H = 0.48 + visc * 1.95
    n = max(int(segs), 112)
    mat = "basalt" if visc < 0.45 else "ash"

    def h(x, y):
        r = math.hypot(x, y)
        t = min(1.0, r / max(R, 1e-4))
        expo = 0.48 + visc * 1.55
        z = H * (1 - t) ** expo
        crater = math.exp(-(r * r) / (0.06 + visc * 0.05)) * (0.18 + visc * 0.22)
        z -= crater
        z += 0.035 * fbm(Vector((x, y, visc)) * 0.7) * (1 - t)
        return max(0.02, z)

    obj = grid(name, n, n, R * 2.05, R * 2.05, h, mat)
    displace(obj, 0.02 + visc * 0.02, 2.6)
    return obj


def channel(name, pts, width, depth):
    curve = bpy.data.curves.new(name + "_crv", "CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = 12
    spline = curve.splines.new("POLY")
    spline.points.add(max(0, len(pts) - 1))
    for i, p in enumerate(pts):
        spline.points[i].co = (p.x, p.y, p.z, 1.0)
    curve.bevel_depth = max(width * 0.55, 0.02)
    curve.bevel_resolution = 6
    curve.use_fill_caps = True
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    try:
        bpy.ops.object.convert(target="MESH")
    except Exception:
        pass
    assign(obj, "water")
    _shade(obj)
    return obj


def doline(name, r, depth, loc=(0, 0, 0)):
    def h(x, y):
        d = math.hypot(x, y) / max(r, 1e-4)
        bowl = -depth * math.exp(-d * d * 2.1)
        rim = 0.04 * math.exp(-((d - 1.05) ** 2) / 0.08)
        return bowl + rim + 0.012 * fbm(Vector((x, y, 0)) * 2)

    return grid(name, 56, 56, r * 2.6, r * 2.6, h, "limestone", loc=loc)


def dripstone(name, h, r, down=True, loc=(0, 0, 0)):
    segs = 28
    obj = cone(name, r if down else r * 0.35, r * 0.35 if down else r, h, segs, "limestone", loc=loc)
    displace(obj, 0.012, 6.0)
    return obj


def barchan(name, size, loc=(0, 0, 0)):
    def h(x, y):
        xn = x / max(size, 1e-4)
        yn = y / max(size, 1e-4)
        body = math.exp(-(xn * xn) / 0.28 - ((yn + 0.15) ** 2) / 0.55)
        horns = math.exp(-((abs(xn) - 0.55) ** 2) / 0.08 - ((yn - 0.45) ** 2) / 0.18)
        lee = 1.0 if yn < 0.15 else max(0.15, 1 - (yn - 0.15) * 3.2)
        z = size * 0.42 * (0.85 * body + 0.45 * horns) * lee
        return max(0.0, z + 0.02 * fbm(Vector((x, y, 1)) * 1.4))

    obj = grid(name, 80, 80, size * 3.2, size * 3.2, h, "sand", loc=loc)
    return obj


def fold_bed(name, amp, thick, phase, offset, mat):
    def h(x, y):
        return amp * math.sin(x * 1.55 + phase) + offset + 0.015 * y + 0.01 * fbm(Vector((x, y, 0)))

    slab = grid(name, 96, 28, 4.8, 1.8, h, mat)
    bpy.ops.object.select_all(action="DESELECT")
    slab.select_set(True)
    bpy.context.view_layer.objects.active = slab
    solid = slab.modifiers.new("solid", "SOLIDIFY")
    solid.thickness = max(thick, 0.04)
    solid.offset = 0
    try:
        bpy.ops.object.modifier_apply(modifier="solid")
    except Exception:
        pass
    return slab


# ---------------------------------------------------------------------------
# Export / preview
# ---------------------------------------------------------------------------
def export_glb(slug):
    os.makedirs(ROOT, exist_ok=True)
    for obj in list(bpy.data.objects):
        if obj.type != "MESH":
            continue
        bpy.ops.object.select_all(action="DESELECT")
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
        for mod in list(obj.modifiers):
            try:
                bpy.ops.object.modifier_apply(modifier=mod.name)
            except Exception:
                try:
                    obj.modifiers.remove(mod)
                except Exception:
                    pass
        try:
            bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
        except Exception:
            pass
        _shade(obj)
    mains = [o for o in bpy.data.objects if o.type == "MESH" and not o.name.endswith("_LOD1")]
    for o in mains:
        add_lod(o, 0.55)
    path = os.path.join(ROOT, f"{slug}.glb")
    bpy.ops.object.select_all(action="DESELECT")
    bpy.ops.export_scene.gltf(
        filepath=path,
        export_format="GLB",
        export_draco_mesh_compression_enable=False,
        export_extras=True,
        export_yup=True,
        export_apply=True,
        export_cameras=False,
        export_lights=False,
        export_texcoords=True,
        export_normals=True,
        export_tangents=False,
        export_materials="EXPORT",
        export_image_format="JPEG",
        export_jpeg_quality=88,
        export_skins=False,
        export_animations=False,
        use_selection=False,
    )
    names = []
    total = 0
    n = 0
    for o in bpy.data.objects:
        if o.type != "MESH":
            continue
        if o.name.endswith("_LOD1"):
            continue
        tris = _count(o)
        names.append((o.name, tris))
        total += tris
        n += 1
    print(f"GLB {slug} meshes={n} tris={total} bytes={os.path.getsize(path)}")
    return path, n, total, names


def cycles_preview(slug: str, cam_loc=(5.2, -6.4, 3.4), look=(0, 0, 0.45)):
    """CPU Cycles stills — no EGL. Writes public/models/previews/{slug}-solid.jpg and -wire.jpg"""
    os.makedirs(PREV, exist_ok=True)
    for obj in bpy.data.objects:
        if obj.name.endswith("_LOD1"):
            obj.hide_render = True
            obj.hide_viewport = True
    scene = bpy.context.scene
    cam = scene.camera
    if cam:
        cam.location = cam_loc
        look_at(cam, look)
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = 8
    scene.cycles.use_denoising = False
    try:
        scene.cycles.use_adaptive_sampling = False
    except Exception:
        pass
    scene.render.resolution_x = 1280
    scene.render.resolution_y = 800
    scene.render.image_settings.file_format = "JPEG"
    scene.render.image_settings.quality = 84
    scene.render.filepath = os.path.join(PREV, f"{slug}-solid")
    bpy.ops.render.render(write_still=True)
    print(f"CYCLES solid {slug}")

    wires = []
    for obj in bpy.data.objects:
        if obj.type != "MESH" or obj.name.endswith("_LOD1"):
            continue
        mod = obj.modifiers.new("tl_wire", "WIREFRAME")
        mod.thickness = 0.012
        mod.use_replace = True
        wires.append((obj, mod))
    scene.render.filepath = os.path.join(PREV, f"{slug}-wire")
    try:
        bpy.ops.render.render(write_still=True)
        print(f"CYCLES wire {slug}")
    except Exception as e:
        print("WIRE_FAIL", slug, e)
    for obj, mod in wires:
        try:
            obj.modifiers.remove(mod)
        except Exception:
            pass
