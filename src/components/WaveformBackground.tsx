'use client';

import React, { useEffect, useRef } from 'react';
import { getScrollState, subscribeScroll } from '@/lib/useScrollProgress';

/**
 * The stage the whole site stands on.
 *
 * A perspective-projected wireframe terrain that behaves like a piece of music:
 * it pulses on a fixed tempo, throws up equaliser spikes on the downbeat, and
 * flies the camera through five states as the page scrolls — skim, rise,
 * fly-through, vortex, settle.
 *
 * Drawn back-to-front each frame:
 *   A. fog + horizon glow   (where the mesh recedes to)
 *   B. parallax dust motes  (cheap, sells depth harder than the mesh does)
 *   C. the mesh + EQ spikes (rendered offscreen so it can be bloomed)
 *   D. bloom                (quarter-res blurred copy composited back additively)
 */

type Wave = (x: number, z: number, t: number) => number;

const waves: Wave[] = [
  // Rolling sine — calm, horizontal swells
  (x, z, t) => Math.sin(x * 2.2 + t) * 0.18 + Math.sin(z * 1.6 - t * 0.6) * 0.06,
  // Radial ripple — pond rings pushing outward
  (x, z, t) => Math.sin(Math.hypot(x, z * 0.8) * 5 - t * 2) * 0.16,
  // Interference — two crossing waves, choppy
  (x, z, t) => Math.sin(x * 3.4 + t * 1.2) * Math.cos(z * 2.6 - t) * 0.2,
  // Spike train — sharp equaliser bars
  (x, z, t) => Math.pow(Math.abs(Math.sin(x * 5 + t * 0.8)), 6) * 0.34 - 0.1,
  // Vortex — twisting spiral
  (x, z, t) => Math.sin(Math.atan2(z, x) * 3 + Math.hypot(x, z) * 4 - t * 1.5) * 0.15,
];

/** The camera rig. Scroll progress interpolates between these five states. */
type Camera = {
  dist: number;   // how far back the camera sits
  lift: number;   // vertical offset of the surface (negative = mesh sits high)
  pitch: number;  // how much the far rows fall away
  roll: number;   // screen rotation — drives the vortex
  fov: number;
  amp: number;    // wave amplitude multiplier
  spike: number;  // EQ spike strength
  fog: number;    // horizon glow intensity
};

const RIG: { at: number; cam: Camera }[] = [
  // Skim: low and close over a calm swell, sitting behind the hero copy.
  { at: 0.0,  cam: { dist: 2.45, lift: -0.34, pitch: 0.02, roll:  0.00, fov: 330, amp: 0.85, spike: 0.00, fog: 0.50 } },
  // Rise: camera lifts, the mesh spreads out below.
  { at: 0.3,  cam: { dist: 2.00, lift: -0.14, pitch: 0.10, roll:  0.02, fov: 365, amp: 1.00, spike: 0.30, fog: 0.70 } },
  // Fly-through: dive between the equaliser spikes.
  { at: 0.55, cam: { dist: 1.30, lift:  0.06, pitch: 0.17, roll: -0.04, fov: 440, amp: 1.30, spike: 1.00, fog: 0.90 } },
  // Vortex: pull back and rotate.
  { at: 0.8,  cam: { dist: 2.65, lift:  0.18, pitch: 0.23, roll:  0.34, fov: 330, amp: 1.10, spike: 0.45, fog: 0.75 } },
  // Settle: wide and calm behind the footer.
  { at: 1.0,  cam: { dist: 3.40, lift:  0.10, pitch: 0.13, roll:  0.12, fov: 300, amp: 0.70, spike: 0.10, fog: 0.45 } },
];

const BPM = 124;
const BEAT = 60 / BPM;
const SPIKE_BARS = 15;
const DUST_COUNT = 150;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Blend the rig keyframes into a single camera for scroll position `p`. */
const cameraAt = (p: number): Camera => {
  let i = 0;
  while (i < RIG.length - 2 && p > RIG[i + 1].at) i++;

  const a = RIG[i];
  const b = RIG[i + 1];
  const span = b.at - a.at;
  const raw = span > 0 ? (p - a.at) / span : 0;
  // Smoothstep so the camera eases into each state rather than cornering.
  const k = clamp01(raw) * clamp01(raw) * (3 - 2 * clamp01(raw));

  return {
    dist: lerp(a.cam.dist, b.cam.dist, k),
    lift: lerp(a.cam.lift, b.cam.lift, k),
    pitch: lerp(a.cam.pitch, b.cam.pitch, k),
    roll: lerp(a.cam.roll, b.cam.roll, k),
    fov: lerp(a.cam.fov, b.cam.fov, k),
    amp: lerp(a.cam.amp, b.cam.amp, k),
    spike: lerp(a.cam.spike, b.cam.spike, k),
    fog: lerp(a.cam.fog, b.cam.fog, k),
  };
};

/** Fake spectrum — each bar has its own frequency, so the row never marches in lockstep. */
const bandLevel = (i: number, t: number) => {
  const fast = 0.5 + 0.5 * Math.sin(t * (1.3 + i * 0.37) + i * 2.1);
  const slow = 0.5 + 0.5 * Math.sin(t * (0.6 + i * 0.13) + i * 0.7);
  return (fast * 0.6 + slow * 0.4) ** 2;
};

const readRGB = (name: string, fallback: [number, number, number]): [number, number, number] => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = raw.split(/[\s,]+/).map(Number);
  return parts.length === 3 && parts.every((n) => Number.isFinite(n))
    ? [parts[0], parts[1], parts[2]]
    : fallback;
};

export const WaveformBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Purple near the camera, gold toward the horizon — pulled from the CSS
    // tokens so the scene can never drift away from the brand palette.
    const near = readRGB('--scene-near', [124, 58, 237]);
    const far = readRGB('--scene-far', [212, 175, 55]);

    // The mesh renders here so it can be blurred and composited back as bloom.
    const scene = document.createElement('canvas');
    const sceneCtx = scene.getContext('2d');
    const bloom = document.createElement('canvas');
    const bloomCtx = bloom.getContext('2d');
    if (!sceneCtx || !bloomCtx) return;

    const canBlur = typeof sceneCtx.filter === 'string';

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let frame = 0;
    let running = true;

    // Dust motes, in world space. Projected through the same camera as the mesh,
    // so they parallax against it instead of sliding as a flat layer.
    // Hashed rather than Math.random() so the field is identical every mount.
    const hash = (i: number, seed: number) => {
      const v = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
      return v - Math.floor(v);
    };
    const dust = Array.from({ length: DUST_COUNT }, (_, i) => ({
      x: hash(i, 1) * 5 - 2.5,
      y: hash(i, 2) * 2.8 - 1.4,
      z: hash(i, 3) * 3.6,
      r: 0.4 + hash(i, 4) * 1.2,
      drift: 0.02 + hash(i, 5) * 0.06,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      // Thin the mesh out on small screens — same look, a third of the strokes.
      const dense = width >= 1024;
      cols = dense ? 60 : 38;
      rows = dense ? 36 : 24;
      px = new Float32Array(cols * rows);
      py = new Float32Array(cols * rows);

      for (const [c, cv] of [[canvas, ctx], [scene, sceneCtx]] as const) {
        c.width = width * dpr;
        c.height = height * dpr;
        cv.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      bloom.width = Math.max(1, Math.floor((width * dpr) / 4));
      bloom.height = Math.max(1, Math.floor((height * dpr) / 4));
    };

    // Eased scroll + mouse, so nothing in the scene ever snaps.
    let easedScroll = getScrollState().progress;
    let mouseX = 0;
    let mouseY = 0;
    let easedMouseX = 0;
    let easedMouseY = 0;

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const draw = (t: number, p: number) => {
      const cam = cameraAt(p);

      // Sharp attack once per beat — this is what makes the mesh read as musical
      // rather than as water.
      const beat = reduceMotion ? 0 : Math.abs(Math.sin(Math.PI * (t / BEAT))) ** 8;

      const cx = width / 2 + easedMouseX * 26;
      const cy = height * 0.54 + easedMouseY * 18;

      // Blend the two waveforms either side of the current scroll position.
      const slot = p * (waves.length - 1);
      const wi = Math.min(Math.floor(slot), waves.length - 2);
      const blend = slot - wi;
      const waveA = waves[wi];
      const waveB = waves[wi + 1];

      const amp = cam.amp * (1 + beat * 0.35);
      const roll = cam.roll + easedMouseX * 0.015;
      const sinR = Math.sin(roll);
      const cosR = Math.cos(roll);

      // ---- A. fog + horizon glow ----
      ctx.clearRect(0, 0, width, height);
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.7);
      const fogA = (0.1 + beat * 0.05) * cam.fog;
      glow.addColorStop(0, `rgba(${far[0]}, ${far[1]}, ${far[2]}, ${fogA * 0.5})`);
      glow.addColorStop(0.35, `rgba(${near[0]}, ${near[1]}, ${near[2]}, ${fogA * 0.7})`);
      glow.addColorStop(1, 'rgba(5, 8, 16, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Project a world point through the current camera.
      const project = (x: number, y: number, z: number) => {
        const zz = z + cam.dist;
        if (zz <= 0.15) return null;
        const s = cam.fov / zz;
        const sx = x * s;
        const sy = (y + cam.pitch * z) * s;
        return {
          x: cx + sx * cosR - sy * sinR,
          y: cy + sx * sinR + sy * cosR,
          s,
        };
      };

      // ---- B. parallax dust ----
      for (const d of dust) {
        const dy = reduceMotion ? d.y : d.y - ((t * d.drift) % 2.8);
        const wrapped = dy < -1.4 ? dy + 2.8 : dy;
        const pt = project(d.x, wrapped + cam.lift * 0.4, d.z);
        if (!pt) continue;
        const depth = clamp01(d.z / 3.6);
        const a = (1 - depth) * 0.35 + 0.05;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, (d.r * pt.s) / 320, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${lerp(near[0], far[0], depth) | 0}, ${lerp(near[1], far[1], depth) | 0}, ${lerp(near[2], far[2], depth) | 0}, ${a})`;
        ctx.fill();
      }

      // ---- C. the mesh, offscreen so it can bloom ----
      sceneCtx.clearRect(0, 0, width, height);
      sceneCtx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        const z = (r / (rows - 1)) * 3.6 - 0.6;
        for (let c = 0; c < cols; c++) {
          const x = (c / (cols - 1)) * 4 - 2;
          const y = lerp(waveA(x, z, t), waveB(x, z, t), blend) * amp + cam.lift;
          const pt = project(x, y, z);
          const idx = r * cols + c;
          if (!pt) {
            px[idx] = NaN;
            continue;
          }
          px[idx] = pt.x;
          py[idx] = pt.y;
        }
      }

      // Rows — the dominant read. Fade toward the horizon, purple → gold.
      for (let r = 0; r < rows; r++) {
        const depth = r / (rows - 1);
        const a = ((1 - depth) ** 1.6) * 0.5 * (0.85 + beat * 0.3) + 0.03;
        sceneCtx.strokeStyle = `rgba(${lerp(near[0], far[0], depth) | 0}, ${lerp(near[1], far[1], depth) | 0}, ${lerp(near[2], far[2], depth) | 0}, ${a})`;
        sceneCtx.beginPath();
        let pen = false;
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          if (Number.isNaN(px[idx])) {
            pen = false;
            continue;
          }
          if (!pen) {
            sceneCtx.moveTo(px[idx], py[idx]);
            pen = true;
          } else {
            sceneCtx.lineTo(px[idx], py[idx]);
          }
        }
        sceneCtx.stroke();
      }

      // Columns — every other one, faint. These are what turn stacked lines into
      // a surface you can read the depth of.
      for (let c = 0; c < cols; c += 2) {
        sceneCtx.strokeStyle = `rgba(${near[0]}, ${near[1]}, ${near[2]}, ${0.06 + beat * 0.04})`;
        sceneCtx.beginPath();
        let pen = false;
        for (let r = 0; r < rows; r++) {
          const idx = r * cols + c;
          if (Number.isNaN(px[idx])) {
            pen = false;
            continue;
          }
          if (!pen) {
            sceneCtx.moveTo(px[idx], py[idx]);
            pen = true;
          } else {
            sceneCtx.lineTo(px[idx], py[idx]);
          }
        }
        sceneCtx.stroke();
      }

      // EQ spikes — bars that punch up out of the terrain on the beat. Three
      // depth planes so you fly *between* them in the mid-scroll state.
      if (cam.spike > 0.01) {
        sceneCtx.lineWidth = 2;
        for (const [plane, zBar] of [0.35, 1.25, 2.3].entries()) {
          const planeFade = 1 - plane * 0.3;
          for (let i = 0; i < SPIKE_BARS; i++) {
            const x = (i / (SPIKE_BARS - 1)) * 4 - 2;
            const level = bandLevel(i + plane * 5, t);
            const h = level * (0.2 + beat * 0.4) * cam.spike;
            if (h < 0.01) continue;

            const base = lerp(waveA(x, zBar, t), waveB(x, zBar, t), blend) * amp + cam.lift;
            const foot = project(x, base, zBar);
            const head = project(x, base - h, zBar);
            if (!foot || !head) continue;

            const grad = sceneCtx.createLinearGradient(foot.x, foot.y, head.x, head.y);
            grad.addColorStop(0, `rgba(${near[0]}, ${near[1]}, ${near[2]}, 0)`);
            grad.addColorStop(1, `rgba(${far[0]}, ${far[1]}, ${far[2]}, ${(0.35 + beat * 0.4) * cam.spike * planeFade})`);
            sceneCtx.strokeStyle = grad;
            sceneCtx.beginPath();
            sceneCtx.moveTo(foot.x, foot.y);
            sceneCtx.lineTo(head.x, head.y);
            sceneCtx.stroke();
          }
        }
        sceneCtx.lineWidth = 1;
      }

      ctx.drawImage(scene, 0, 0, width, height);

      // ---- D. bloom ----
      // Quarter-res copy, blurred, composited back additively. Cheap enough to
      // run every frame; the downscale is doing most of the blurring for us.
      if (canBlur) {
        bloomCtx.setTransform(1, 0, 0, 1, 0, 0);
        bloomCtx.clearRect(0, 0, bloom.width, bloom.height);
        bloomCtx.filter = 'blur(3px)';
        bloomCtx.drawImage(scene, 0, 0, bloom.width, bloom.height);
        bloomCtx.filter = 'none';

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = 0.45 + beat * 0.2;
        ctx.drawImage(bloom, 0, 0, width, height);
        ctx.restore();
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Reduced motion: one static frame, no loop, no listeners. Nothing moves.
    if (reduceMotion) {
      draw(0, getScrollState().progress);
      const redraw = () => draw(0, getScrollState().progress);
      window.addEventListener('resize', redraw);
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('resize', redraw);
      };
    }

    window.addEventListener('mousemove', onMouse, { passive: true });
    const unsubscribe = subscribeScroll(() => {});

    const start = performance.now();
    const loop = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;

      const target = getScrollState();
      // Short pages (/booking, /events) barely scroll. Damp their progress so
      // they sit in the calm hero camera instead of snapping to the vortex.
      const reach = clamp01(target.runway / 2.5);
      easedScroll = lerp(easedScroll, target.progress * reach, 0.06);
      easedMouseX = lerp(easedMouseX, mouseX, 0.05);
      easedMouseY = lerp(easedMouseY, mouseY, 0.05);

      draw(t, easedScroll);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    // Don't burn a GPU thread animating a tab nobody is looking at.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        frame = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVisibility);
      unsubscribe();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
};
