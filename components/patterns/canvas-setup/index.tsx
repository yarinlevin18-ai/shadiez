"use client";

// Canvas Setup — the canonical react-three-fiber <Canvas> configuration.
//
// Defaults that matter:
//   • dpr={[1, 2]}            cap devicePixelRatio so retina screens don't
//                             render 4x the pixels and tank the framerate.
//   • frameloop="demand"      only render when something invalidates the frame
//                             (controls move, a value changes). Idle scenes
//                             cost 0 GPU. For continuously-animated scenes pass
//                             frameloop="always", or call invalidate() yourself.
//
// Usage:
//   <CanvasSetup>
//     <ambientLight intensity={0.6} />
//     <mesh>...</mesh>
//     <OrbitControls />
//   </CanvasSetup>

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";

export interface CanvasSetupProps extends Partial<CanvasProps> {
  children: ReactNode;
}

// The sizing problem this guards against:
//
// r3f sizes its canvas from a ResizeObserver (react-use-measure) on its own
// container. In this Next 16 / React 19 / r3f setup that initial measure never
// reaches the renderer on mount — the canvas stays pinned at THREE's 300×150
// default and renders the scene into a tiny letterbox, even when its container
// is already correctly sized. (Verified: canvas stuck at 300×150 inside a 523px
// square; gating the mount until the container was measured did NOT help.) The
// one thing that reliably forces r3f to re-measure is a window 'resize' event.
//
// So: (1) gate the <Canvas> mount until our own host <div> has a non-zero box,
// then (2) once mounted, dispatch window 'resize' until the canvas actually
// fills the host, and re-run that whenever the host is genuinely resized. Both
// run as plain DOM-level effects (reliable on every mount, unlike an r3f
// scene-graph child).
export function CanvasSetup({
  children,
  dpr = [1, 2],
  frameloop = "demand",
  camera = { position: [0, 0, 5], fov: 50, near: 0.1, far: 100 },
  gl = { antialias: true, alpha: true },
  ...rest
}: CanvasSetupProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Gate: don't mount the Canvas until the host has a real box.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const check = () => {
      const { width, height } = host.getBoundingClientRect();
      if (width > 0 && height > 0) setReady(true);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  // Nudge: after mount, push window 'resize' until the canvas fills the host.
  // Stops as soon as it matches (typically a few frames) or after a 3s cap, and
  // restarts on a genuine host resize so responsive layouts stay correct.
  useEffect(() => {
    if (!ready) return;
    const host = hostRef.current;
    if (!host) return;

    let timer = 0;
    const settle = () => {
      window.clearInterval(timer);
      const start = performance.now();
      timer = window.setInterval(() => {
        const canvas = host.querySelector("canvas");
        const h = host.getBoundingClientRect();
        const c = canvas?.getBoundingClientRect();
        const matched =
          !!c &&
          h.width > 0 &&
          Math.abs(c.width - h.width) < 2 &&
          Math.abs(c.height - h.height) < 2;
        if (matched || performance.now() - start > 3000) {
          window.clearInterval(timer);
          return;
        }
        window.dispatchEvent(new Event("resize"));
      }, 50);
    };

    settle();
    const ro = new ResizeObserver(settle);
    ro.observe(host);
    return () => {
      window.clearInterval(timer);
      ro.disconnect();
    };
  }, [ready]);

  return (
    <div ref={hostRef} style={{ width: "100%", height: "100%" }}>
      {ready && (
        <Canvas dpr={dpr} frameloop={frameloop} camera={camera} gl={gl} {...rest}>
          {children}
        </Canvas>
      )}
    </div>
  );
}
