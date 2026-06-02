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

import { useEffect, type ReactNode } from "react";
import { Canvas, useThree, type CanvasProps } from "@react-three/fiber";

export interface CanvasSetupProps extends Partial<CanvasProps> {
  children: ReactNode;
}

// r3f derives the canvas size from a ResizeObserver (react-use-measure) on its
// container. When the Canvas mounts inside a parent whose box resolves a tick
// later (e.g. an aspect-ratio-sized column, or a section mounted far below the
// fold), that first measure can come back empty and the canvas stays pinned at
// THREE's 300×150 default — the scene renders into a tiny letterbox until a
// window resize happens to re-run r3f's own measurement.
//
// The reliable lever is a window 'resize' (which react-use-measure listens for),
// but a single one-shot on mount loses a race: it can fire before r3f has even
// attached that listener, and the container never changes size again to retry.
// So we run a short settle loop — re-dispatch each frame until the canvas box
// actually matches its container, then stop — and keep a ResizeObserver to
// restart it if the container is genuinely resized later.
function ContainerResizeFix() {
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    const canvas = gl.domElement;
    const parent = canvas.parentElement;
    if (!parent) return;

    let raf = 0;
    const settle = (deadline: number) => {
      const p = parent.getBoundingClientRect();
      const c = canvas.getBoundingClientRect();
      const matched =
        p.width > 0 &&
        Math.abs(c.width - p.width) < 2 &&
        Math.abs(c.height - p.height) < 2;
      if (matched) return;
      if (p.width > 0) window.dispatchEvent(new Event("resize"));
      if (performance.now() < deadline) {
        raf = requestAnimationFrame(() => settle(deadline));
      }
    };
    const run = () => {
      cancelAnimationFrame(raf);
      const deadline = performance.now() + 2000;
      raf = requestAnimationFrame(() => settle(deadline));
    };

    run();
    const ro = new ResizeObserver(run);
    ro.observe(parent);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [gl]);

  return null;
}

export function CanvasSetup({
  children,
  dpr = [1, 2],
  frameloop = "demand",
  camera = { position: [0, 0, 5], fov: 50, near: 0.1, far: 100 },
  gl = { antialias: true, alpha: true },
  ...rest
}: CanvasSetupProps) {
  return (
    <Canvas dpr={dpr} frameloop={frameloop} camera={camera} gl={gl} {...rest}>
      <ContainerResizeFix />
      {children}
    </Canvas>
  );
}
