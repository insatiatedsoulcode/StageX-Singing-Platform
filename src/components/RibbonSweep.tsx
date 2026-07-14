'use client';

import React, { useEffect, useRef } from 'react';
import { getScrollState, subscribeScroll } from '@/lib/useScrollProgress';

/**
 * The page's closing note, in place of a footer.
 *
 * A glossy ribbon twists through 3D space and sweeps left → right along the
 * bottom of the viewport. It's pinned (fixed) and lives at a negative z-index:
 * above the waveform mesh at -z-10, but behind all page content — so the mesh
 * animates *below* the ribbon and content still paints cleanly on top.
 *
 * There's no WebGL here. The 3D read comes from shading each segment by how
 * edge-on it is: a ribbon rotating about its own axis foreshortens to a thin
 * line when its face turns away from you, and flares wide with a specular
 * highlight when it turns toward you. Cheap, and it sells the twist.
 */

// Brand ends of the ribbon's two faces.
const GOLD = [212, 175, 55] as const;
const PURPLE = [124, 58, 237] as const;

const SEGMENTS = 180;
/** Spatial frequency of the twist along the ribbon's length. */
const TWIST_FREQ = 2.4;
/** Spatial frequency of the ribbon's vertical undulation. */
const WAVE_FREQ = 1.6;
/** How fast the whole pattern travels left → right. */
const SPEED = 0.34;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Smooth 0→1 ramp, so the ribbon eases in rather than popping. */
const smoothstep = (edge0: number, edge1: number, v: number) => {
  const t = clamp01((v - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

export const RibbonSweep = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;

    // Eased toward the scroll-derived target each frame, so the reveal glides
    // instead of tracking the scrollbar 1:1.
    let reveal = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    /** Fully shown only once the reader has actually reached the bottom. */
    const targetReveal = () => {
      const { progress, runway } = getScrollState();
      // A page too short to scroll would otherwise never reveal it.
      if (runway <= 0.05) return 1;
      return smoothstep(0.82, 0.99, progress);
    };

    // Repaint on scroll even while paused, so the reveal still tracks.
    const unsubscribe = subscribeScroll(() => {
      if (!running) reveal = targetReveal();
    });

    const draw = (elapsed: number) => {
      const t = reduced ? 0 : elapsed * 0.001;

      reveal += (targetReveal() - reveal) * 0.08;

      ctx.clearRect(0, 0, width, height);

      if (reveal < 0.01) return;

      const baseY = height * 0.62;
      const amplitude = height * 0.14;
      const maxHalf = height * 0.17;

      ctx.globalAlpha = reveal;
      // The ribbon reads as emitted light, not paint — additive keeps it glowing
      // over the dark mesh rather than flatly occluding it.
      ctx.globalCompositeOperation = 'lighter';

      // Slide up into place as it fades in.
      ctx.save();
      ctx.translate(0, (1 - reveal) * height * 0.35);

      let prev: { x: number; top: number; bottom: number } | null = null;

      for (let i = 0; i <= SEGMENTS; i++) {
        const u = i / SEGMENTS;
        const x = u * width;

        // Subtracting time marches the pattern to the right.
        const phase = u * Math.PI * 2 * WAVE_FREQ - t * SPEED * Math.PI * 2;
        const twistPhase = u * Math.PI * 2 * TWIST_FREQ - t * SPEED * Math.PI * 1.4;

        // -1 = far face toward us, +1 = near face toward us, 0 = edge-on.
        const facing = Math.cos(twistPhase);
        const openness = Math.abs(facing);

        const centerY = baseY + Math.sin(phase) * amplitude;
        const halfW = maxHalf * (0.08 + 0.92 * openness);

        const top = centerY - halfW;
        const bottom = centerY + halfW;

        if (prev) {
          // Which face we're looking at drives the hue; how square-on it is
          // drives the brightness and the specular hit.
          const faceMix = (facing + 1) / 2;
          const r = lerp(PURPLE[0], GOLD[0], faceMix);
          const g = lerp(PURPLE[1], GOLD[1], faceMix);
          const b = lerp(PURPLE[2], GOLD[2], faceMix);

          const shade = 0.18 + 0.82 * openness;
          const specular = Math.pow(openness, 10);

          const grad = ctx.createLinearGradient(0, top, 0, bottom);
          const edge = `rgba(${r * shade * 0.45}, ${g * shade * 0.45}, ${b * shade * 0.45}, 0.55)`;
          const core = `rgba(${Math.min(255, r * shade + specular * 190)}, ${Math.min(255, g * shade + specular * 190)}, ${Math.min(255, b * shade + specular * 175)}, 0.95)`;

          grad.addColorStop(0, edge);
          grad.addColorStop(0.5, core);
          grad.addColorStop(1, edge);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.top);
          ctx.lineTo(x, top);
          ctx.lineTo(x, bottom);
          ctx.lineTo(prev.x, prev.bottom);
          ctx.closePath();
          ctx.fill();
        }

        prev = { x, top, bottom };
      }

      // A soft bloom pass along the crest, to bed the ribbon into the scene.
      ctx.globalAlpha = reveal * 0.32;
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
      ctx.filter = 'blur(6px)';
      ctx.beginPath();
      for (let i = 0; i <= SEGMENTS; i++) {
        const u = i / SEGMENTS;
        const x = u * width;
        const phase = u * Math.PI * 2 * WAVE_FREQ - t * SPEED * Math.PI * 2;
        const y = baseY + Math.sin(phase) * amplitude;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.filter = 'none';

      ctx.restore();
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);

    // Don't burn a rAF loop on a tab nobody is looking at.
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
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      unsubscribe();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // -z-[5] threads the needle: above the waveform mesh (-z-10), below every
      // page element, which paints in the normal (auto) layer.
      className="pointer-events-none fixed bottom-0 left-0 w-full h-[38vh] min-h-[220px] -z-[5]"
    />
  );
};
