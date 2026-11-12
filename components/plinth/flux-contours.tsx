"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  /** Contour levels. More levels draw more lines. */
  levels?: number
  /** Zoom of the pattern. Higher values give bigger, fewer shapes. */
  scale?: number
  /** How fast the field churns. 0 freezes it. */
  speed?: number
  /** Brightness of the lines. */
  glow?: number
  /** Thickness of the crisp core of each line, in pixels. */
  lineWidth?: number
  /** A press stirs the field into a short swirl. */
  clickSwirl?: boolean
  /** Fade in on mount. */
  intro?: boolean
}

/* Smooth value noise on an integer lattice, with a hash written for this file. */
const hash = (x: number, y: number, z: number) => {
  let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0
  h = (h ^ (h >>> 13)) * 1274126177
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}
const fade = (t: number) => t * t * (3 - 2 * t)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
function vnoise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
  const xf = fade(x - xi), yf = fade(y - yi), zf = fade(z - zi)
  const l = (dz: number) =>
    lerp(lerp(hash(xi, yi, zi + dz), hash(xi + 1, yi, zi + dz), xf), lerp(hash(xi, yi + 1, zi + dz), hash(xi + 1, yi + 1, zi + dz), xf), yf)
  return lerp(l(0), l(1), zf)
}

const GRID = 0.2 // field samples per CSS pixel (coarse)
const MAX_FINE = 760_000 // cap on drawn pixels, for speed

/**
 * Glowing contour lines of a churning, warped noise field.
 *
 * The field is evaluated on a coarse grid. Each drawn pixel then interpolates
 * the field value and its slope, so a line is placed where the value crosses
 * an evenly spaced level and its width is measured in real pixels. That keeps
 * every line the same thin width with a soft glow, instead of blurring a
 * low-resolution image. Color follows the element's text color, in light and
 * dark themes. Reduced motion draws one still frame.
 */
const VERT = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime, uScale, uLevels, uGlow, uLine, uIntro;
uniform vec3 uColor;
uniform vec4 uSwirl; // x, y in pixels, age 0..1, active
out vec4 outColor;

float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }

float vnoise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), u.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), u.x), u.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), u.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), u.x), u.y),
    u.z);
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  float ar = uRes.x / uRes.y;
  vec2 p = vec2(frag.x / uRes.x * ar, frag.y / uRes.y);

  if (uSwirl.w > 0.5) {
    vec2 c = vec2(uSwirl.x / uRes.x * ar, uSwirl.y / uRes.y);
    vec2 r = p - c;
    float a = max(0.0, 1.0 - length(r) / 0.5) * (1.0 - uSwirl.z) * 5.0;
    p = c + mat2(cos(a), -sin(a), sin(a), cos(a)) * r;
  }

  vec2 s = p * uScale * 2.2;
  // domain warp makes the loops churn and merge
  float wx = vnoise(vec3(s * 0.9 + vec2(3.1, 0.0), uTime * 0.35));
  float wy = vnoise(vec3(s * 0.9 + vec2(0.0, 7.7), uTime * 0.35 + 9.0));
  vec2 q = s + 3.4 * (vec2(wx, wy) - 0.5);
  float n = vnoise(vec3(q.x, q.y - uTime * 0.25, uTime * 0.2)) * 0.65
          + vnoise(vec3(q * 2.1 + vec2(4.0, 0.0), uTime * 0.3)) * 0.35;

  float lv = n * uLevels;
  float slope = fwidth(lv); // level change per pixel
  float dist = abs(lv - floor(lv + 0.5)) / max(slope, 1e-4); // pixels to the nearest line

  float crisp = 1.0 - smoothstep(uLine * 0.35, uLine * 1.15, dist);
  float halo = exp(-dist / (uLine * 3.4)) * 0.3;
  float br = vnoise(vec3(q * 1.4 + vec2(11.0, 0.0), uTime * 0.5));
  float strokes = smoothstep(0.28, 0.58, br); // lines break into separate strokes
  float gate = smoothstep(0.0, 0.006, slope); // fade lines where the field is flat

  float alpha = clamp((crisp + halo) * strokes * gate * uGlow * uIntro, 0.0, 1.0);
  outColor = vec4(uColor * alpha, alpha);
}`

/** True when this browser can compile the shader. Tested on a throwaway canvas. */
function gpuAvailable() {
  try {
    const gl = document.createElement("canvas").getContext("webgl2")
    if (!gl) return false
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src); gl.compileShader(sh)
      return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null
    }
    const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return false
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog)
    return !!gl.getProgramParameter(prog, gl.LINK_STATUS)
  } catch {
    return false
  }
}

export function FluxContours({ className, levels = 8, scale = 1.5, speed = 0.45, glow = 1, lineWidth = 1.1, clickSwirl = false, intro = true }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (gpuAvailable()) return startGpu(el, { levels, scale, speed, glow, lineWidth, clickSwirl, intro })
    return startCpu(el, { levels, scale, speed, glow, lineWidth, clickSwirl, intro })
  }, [levels, scale, speed, glow, lineWidth, clickSwirl, intro])

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none size-full text-foreground", className)} />
}

type Opts = Required<Omit<Props, "className">>

/** Full resolution on the GPU: the field is evaluated for every pixel and lines are anti-aliased with the pixel derivative. */
function startGpu(el: HTMLCanvasElement, o: Opts) {
  const gl = el.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false })
  if (!gl) return
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const mk = (type: number, src: string) => { const sh = gl.createShader(type)!; gl.shaderSource(sh, src); gl.compileShader(sh); return sh }
  const prog = gl.createProgram()!
  gl.attachShader(prog, mk(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog); gl.useProgram(prog)
  const U = (n: string) => gl.getUniformLocation(prog, n)
  const u = { res: U("uRes"), time: U("uTime"), scale: U("uScale"), levels: U("uLevels"), glow: U("uGlow"), line: U("uLine"), intro: U("uIntro"), color: U("uColor"), swirl: U("uSwirl") }
  gl.uniform1f(u.scale, o.scale); gl.uniform1f(u.levels, o.levels); gl.uniform1f(u.glow, o.glow)

  let w = 0, h = 0, dpr = 1, raf = 0, visible = true, t = Math.random() * 50
  const born = performance.now()
  let swirl: { x: number; y: number; at: number } | null = null

  const setColor = () => {
    const m = getComputedStyle(el).color.match(/[\d.]+/g)
    if (m && m.length >= 3) gl.uniform3f(u.color, Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255)
  }
  const resize = () => {
    const r = el.getBoundingClientRect()
    w = r.width; h = r.height
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    if (w * h * dpr * dpr > 4_400_000) dpr = Math.sqrt(4_400_000 / Math.max(1, w * h))
    el.width = Math.max(1, Math.round(w * dpr)); el.height = Math.max(1, Math.round(h * dpr))
    gl.viewport(0, 0, el.width, el.height)
    gl.uniform2f(u.res, el.width, el.height)
    gl.uniform1f(u.line, Math.max(0.5, o.lineWidth) * dpr)
  }
  const draw = (now: number) => {
    const age = swirl ? (now - swirl.at) / 1300 : 2
    if (age >= 1) swirl = null
    gl.uniform1f(u.time, t)
    gl.uniform1f(u.intro, o.intro && !still ? Math.min(1, (now - born) / 1400) : 1)
    gl.uniform4f(u.swirl, swirl ? swirl.x * dpr : 0, swirl ? swirl.y * dpr : 0, Math.min(1, age), swirl ? 1 : 0)
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  let frames = 0
  const tick = (now: number) => {
    raf = requestAnimationFrame(tick)
    if (!visible) return
    t += 0.012 * o.speed
    if (++frames % 60 === 0) setColor()
    draw(now)
  }

  resize(); setColor()
  const ro = new ResizeObserver(() => { resize(); if (still) draw(0) })
  ro.observe(el)
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
  io.observe(el)
  const mo = new MutationObserver(() => { setColor(); if (still) draw(0) })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] })
  const onDown = (e: PointerEvent) => {
    if (!o.clickSwirl || still) return
    const r = el.getBoundingClientRect()
    if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) swirl = { x: e.clientX - r.left, y: e.clientY - r.top, at: performance.now() }
  }
  window.addEventListener("pointerdown", onDown, { passive: true })

  if (still) draw(0)
  else raf = requestAnimationFrame(tick)

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect(); io.disconnect(); mo.disconnect()
    window.removeEventListener("pointerdown", onDown)
  }
}

/** Fallback for browsers without WebGL 2: the same field on a coarse grid, drawn on the CPU. */
function startCpu(el: HTMLCanvasElement, o: Opts) {
  const { levels, scale, speed, glow, lineWidth, clickSwirl, intro } = o
  {
    const ctx = el.getContext("2d")
    if (!ctx) return
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = document.createElement("canvas")
    const fg = fine.getContext("2d")!
    let w = 0, h = 0, fw = 0, fh = 0, gw = 0, gh = 0, ratio = 1
    let S = new Float32Array(0), M = new Float32Array(0), G = new Float32Array(0)
    let img: ImageData | null = null
    let raf = 0, visible = true, t = Math.random() * 50, frames = 0
    const born = performance.now()
    let swirl: { x: number; y: number; at: number } | null = null
    let rgb: [number, number, number] = [255, 255, 255]

    const readColor = () => {
      const m = getComputedStyle(el).color.match(/[\d.]+/g)
      if (m && m.length >= 3) rgb = [Number(m[0]), Number(m[1]), Number(m[2])]
    }

    const resize = () => {
      const r = el.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = r.width; h = r.height
      el.width = Math.max(1, Math.round(w * dpr)); el.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ratio = Math.min(1, dpr, Math.sqrt(MAX_FINE / Math.max(1, w * h)))
      fw = Math.max(32, Math.round(w * ratio)); fh = Math.max(20, Math.round(h * ratio))
      fine.width = fw; fine.height = fh
      img = fg.createImageData(fw, fh)
      gw = Math.ceil(w * GRID) + 3; gh = Math.ceil(h * GRID) + 3
      S = new Float32Array(gw * gh); M = new Float32Array(gw * gh); G = new Float32Array(gw * gh)
    }

    /** Evaluates the field on the coarse grid: level value, stroke mask and slope. */
    const field = (now: number) => {
      const ar = w / h
      const swirlAge = swirl ? (now - swirl.at) / 1300 : 2
      if (swirlAge >= 1) swirl = null
      for (let j = 0; j < gh; j++) {
        const v = (j - 1) / GRID / h
        for (let i = 0; i < gw; i++) {
          const u = (i - 1) / GRID / w
          let x = u * ar, y = v
          if (swirl) {
            const cx = (swirl.x / w) * ar, cy = swirl.y / h
            const rx = x - cx, ry = y - cy
            const a = Math.max(0, 1 - Math.hypot(rx, ry) / 0.5) * (1 - swirlAge) * 5
            x = cx + rx * Math.cos(a) - ry * Math.sin(a)
            y = cy + rx * Math.sin(a) + ry * Math.cos(a)
          }
          const sx = x * scale * 2.2, sy = y * scale * 2.2
          // domain warp makes the loops churn and merge
          const wx = vnoise(sx * 0.9 + 3.1, sy * 0.9, t * 0.35)
          const wy = vnoise(sx * 0.9, sy * 0.9 + 7.7, t * 0.35 + 9)
          const qx = sx + 3.4 * (wx - 0.5), qy = sy + 3.4 * (wy - 0.5)
          const n = vnoise(qx, qy - t * 0.25, t * 0.2) * 0.65 + vnoise(qx * 2.1 + 4, qy * 2.1, t * 0.3) * 0.35
          const idx = j * gw + i
          S[idx] = n * levels
          // shimmer: lines break into separate strokes
          const br = vnoise(qx * 1.4 + 11, qy * 1.4, t * 0.5)
          M[idx] = Math.min(1, Math.max(0, (br - 0.28) / 0.3))
        }
      }
      for (let j = 1; j < gh - 1; j++) {
        for (let i = 1; i < gw - 1; i++) {
          const idx = j * gw + i
          G[idx] = Math.hypot(S[idx + 1] - S[idx - 1], S[idx + gw] - S[idx - gw]) * 0.5 // level change per grid step
        }
      }
      // replicate edges so interpolation never reads empty slope
      for (let i = 0; i < gw; i++) { G[i] = G[gw + i]; G[(gh - 1) * gw + i] = G[(gh - 2) * gw + i] }
      for (let j = 0; j < gh; j++) { G[j * gw] = G[j * gw + 1]; G[j * gw + gw - 1] = G[j * gw + gw - 2] }
    }

    /** Draws the lines from the grid at near full resolution. */
    const paint = (now: number) => {
      if (!img) return
      const d = img.data
      const intro01 = intro && !still ? Math.min(1, (now - born) / 1400) : 1
      const step = GRID / ratio // grid cells per drawn pixel
      const pxPerCell = 1 / step // drawn pixels per grid cell
      const core = Math.max(0.4, lineWidth) * ratio
      for (let py = 0; py < fh; py++) {
        const gy = py * step + 1 // +1 for the padding ring
        const j0 = Math.min(gh - 2, Math.floor(gy)), fy = gy - j0
        for (let px = 0; px < fw; px++) {
          const gx = px * step + 1
          const i0 = Math.min(gw - 2, Math.floor(gx)), fx = gx - i0
          const a = j0 * gw + i0, b = a + 1, c = a + gw, e = c + 1
          const w00 = (1 - fx) * (1 - fy), w10 = fx * (1 - fy), w01 = (1 - fx) * fy, w11 = fx * fy
          const s = S[a] * w00 + S[b] * w10 + S[c] * w01 + S[e] * w11
          const g = G[a] * w00 + G[b] * w10 + G[c] * w01 + G[e] * w11
          const m = M[a] * w00 + M[b] * w10 + M[c] * w01 + M[e] * w11
          // distance to the nearest level, in drawn pixels
          const slope = g * step // level change per drawn pixel
          const dist = Math.abs(s - Math.round(s)) / Math.max(slope, 1e-4)
          const gate = Math.min(1, slope / 0.015) // fade lines where the field is flat
          const crisp = Math.max(0, 1 - dist / core)
          const halo = Math.exp(-dist / (core * 3.2)) * 0.32
          const alpha = Math.min(1, (crisp * crisp * (3 - 2 * crisp) + halo) * m * gate * glow * intro01)
          const o = (py * fw + px) * 4
          d[o] = rgb[0]; d[o + 1] = rgb[1]; d[o + 2] = rgb[2]; d[o + 3] = alpha * 255
        }
      }
      void pxPerCell
      fg.putImageData(img, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
      ctx.drawImage(fine, 0, 0, w, h)
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      t += 0.012 * speed
      if (++frames % 60 === 0) readColor()
      field(now); paint(now)
    }

    resize(); readColor()
    const ro = new ResizeObserver(() => { resize(); readColor(); if (still) { field(0); paint(0) } })
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)
    // repaint when the theme class changes
    const mo = new MutationObserver(() => { readColor(); if (still) paint(0) })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] })

    const onDown = (e: PointerEvent) => {
      if (!clickSwirl || still) return
      const r = el.getBoundingClientRect()
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) swirl = { x: e.clientX - r.left, y: e.clientY - r.top, at: performance.now() }
    }
    window.addEventListener("pointerdown", onDown, { passive: true })

    if (still) { field(0); paint(0) } else raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect(); mo.disconnect()
      window.removeEventListener("pointerdown", onDown)
    }
  }
}
