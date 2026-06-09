"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   SandDrift — a single, page-wide canvas of fine wind-borne sand grains that sits
   behind every section (inside the fixed .v2-bg layer). The grains drift gently on
   a slow warm breeze; scroll MOVEMENT kicks them up — the live scroll velocity is
   read every frame and added to each grain's travel, so flicking down the page
   sends the sand streaming, and it settles back to a calm drift when you stop.

   Performance contract (mirrors SunMotes):
   - One pre-rendered soft grain sprite, blitted with drawImage (no per-frame
     gradients, no shadowBlur).
   - Count scales to canvas AREA and is capped, so it stays cheap on mobile.
   - The rAF loop pauses while the tab is hidden (visibilitychange).
   - Under prefers-reduced-motion (animate=false) one static frame is painted and
     no loop ever starts — and scroll velocity is ignored.
   ───────────────────────────────────────────────────────────────────────────── */

type Grain = { x: number; y: number; r: number; vx: number; vy: number; a: number; phase: number; amp: number };

export function SandDrift({
  className,
  velocity,
  animate = true,
}: {
  className?: string;
  /** Live scroll velocity (px/s) from useVelocity(scrollY); grains react to it. */
  velocity?: MotionValue<number>;
  /** False under prefers-reduced-motion → paints one static frame, no loop. */
  animate?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let grains: Grain[] = [];
    let raf = 0;
    let active = false;
    let last = 0;

    // Pre-rendered soft warm-sand grain — drawn once, reused for every grain.
    const SP = 24;
    const sprite = document.createElement("canvas");
    sprite.width = SP;
    sprite.height = SP;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const g = sctx.createRadialGradient(SP / 2, SP / 2, 0, SP / 2, SP / 2, SP / 2);
      g.addColorStop(0, "rgba(176,142,86,0.85)");
      g.addColorStop(0.55, "rgba(176,142,86,0.30)");
      g.addColorStop(1, "rgba(176,142,86,0)");
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, SP, SP);
    }

    const spawn = (seed: boolean): Grain => {
      const r = 0.5 + Math.random() * 1.7;
      return {
        x: Math.random() * w,
        y: seed ? Math.random() * h : h + r * 6,
        r,
        vx: (Math.random() - 0.5) * 7, // slow lateral breeze
        vy: 4 + Math.random() * 11, // px/sec, gentle upward drift
        a: 0.05 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        amp: (Math.random() - 0.5) * 12,
      };
    };

    const build = () => {
      const byArea = Math.round((w * h) / 13000);
      const count = Math.max(18, Math.min(150, byArea));
      grains = Array.from({ length: count }, () => spawn(true));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (!active) paintStatic();
    };

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      for (const p of grains) {
        const x = p.x + Math.sin(p.phase) * p.amp;
        const size = p.r * 7;
        ctx.globalAlpha = p.a;
        if (sctx) ctx.drawImage(sprite, x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const paintStatic = () => paint();

    const wrap = (p: Grain) => {
      if (p.y < -14) Object.assign(p, spawn(false), { y: h + 14 });
      else if (p.y > h + 18) Object.assign(p, spawn(false), { y: -14 });
      if (p.x < -16) p.x = w + 16;
      else if (p.x > w + 16) p.x = -16;
    };

    const loop = (t: number) => {
      if (!active) return;
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      // Scroll velocity (px/s) → a normalized "kick" that pushes grains along the
      // travel direction and speeds up their sway. Clamped so a fast flick can't
      // fling them off in one frame.
      const v = velocity ? velocity.get() : 0;
      const kick = Math.max(-1, Math.min(1, v / 2600));
      const swirl = 1 + Math.abs(kick) * 1.6;
      for (const p of grains) {
        p.y -= p.vy * dt; // calm upward drift
        p.x += p.vx * dt;
        p.y += kick * 130 * dt * (0.4 + p.r * 0.4); // scroll movement carries the sand
        p.phase += dt * 0.5 * swirl;
        wrap(p);
      }
      paint();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (active || !animate || document.hidden) return;
      active = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener("visibilitychange", onVis);

    if (animate) start();
    else paintStatic();

    return () => {
      stop();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [animate, velocity]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
