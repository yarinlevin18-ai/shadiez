"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   SunMotes — original warm "sun-dot" particle layer for the /v2 sun fields.
   Our analog to La Revoltosa's bubbles, drawn from scratch: soft warm light motes
   that drift upward and sway, parallaxed to scroll by an outer <Parallax> wrapper.

   Performance contract:
   - One pre-rendered radial glow sprite, blitted with drawImage (no per-frame
     gradients, no shadowBlur).
   - "lighter" compositing for an additive sun-glow look.
   - Count is capped and scaled to the canvas AREA, so small/mobile fields are cheap.
   - requestAnimationFrame loop pauses when the canvas scrolls out of view
     (IntersectionObserver) and never starts under prefers-reduced-motion — in that
     case a single sparse static frame is painted instead.
   ───────────────────────────────────────────────────────────────────────────── */

type Mote = { x: number; y: number; r: number; vy: number; amp: number; phase: number; a: number };

export function SunMotes({
  className,
  density = 1,
  animate = true,
}: {
  className?: string;
  /** Multiplier on the area-derived particle count (mobile fields stay cheap). */
  density?: number;
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
    let motes: Mote[] = [];
    let raf = 0;
    let active = false;
    let last = 0;

    // Pre-rendered soft glow sprite — drawn once, reused for every mote.
    const SP = 64;
    const sprite = document.createElement("canvas");
    sprite.width = SP;
    sprite.height = SP;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const g = sctx.createRadialGradient(SP / 2, SP / 2, 0, SP / 2, SP / 2, SP / 2);
      g.addColorStop(0, "rgba(255,250,236,0.95)");
      g.addColorStop(0.45, "rgba(255,238,198,0.40)");
      g.addColorStop(1, "rgba(255,238,198,0)");
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, SP, SP);
    }

    const spawn = (seed: boolean): Mote => {
      const r = 1 + Math.random() * 3.6;
      return {
        x: Math.random() * w,
        y: seed ? Math.random() * h : h + r * 8,
        r,
        vy: 7 + Math.random() * 18, // px/sec, upward
        amp: (Math.random() - 0.5) * 22, // horizontal sway amplitude
        phase: Math.random() * Math.PI * 2,
        a: 0.22 + Math.random() * 0.62,
      };
    };

    const build = () => {
      const byArea = Math.round((w * h) / 24000);
      const count = Math.max(8, Math.min(72, Math.round(byArea * density)));
      motes = Array.from({ length: count }, () => spawn(true));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (!animate) paintStatic();
    };

    const paint = (alphaScale: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of motes) {
        const x = p.x + Math.sin(p.phase) * p.amp;
        const size = p.r * 8;
        ctx.globalAlpha = p.a * alphaScale;
        if (sctx) ctx.drawImage(sprite, x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const paintStatic = () => paint(0.8);

    const loop = (t: number) => {
      if (!active) return;
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
      last = t;
      for (const p of motes) {
        p.y -= p.vy * dt;
        p.phase += dt * 0.7;
        if (p.y < -12) Object.assign(p, spawn(false));
      }
      paint(1);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (active || !animate) return;
      active = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    if (!animate) paintStatic();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [animate, density]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
