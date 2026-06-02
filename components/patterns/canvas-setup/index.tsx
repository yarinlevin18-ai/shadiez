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
// The guard has three parts:
//   1. Gate the <Canvas> mount until our own host <div> has a non-zero box, so
//      r3f never initialises against a zero/undefined size.
//   2. An initial burst that dispatches window 'resize' until the canvas fills
//      the host — retried for a few seconds to beat the race where the first
//      nudge fires before r3f has attached its own resize listener.
//   3. Persistent ResizeObservers on BOTH the host and the canvas, so the fix is
//      self-healing: a late layout shift or the heavy GLB finishing its load
//      (slower over a CDN than from local disk) can re-render and reset the
//      canvas back to the default AFTER the burst ends — the canvas observer
//      catches that drift and re-nudges. This is the failure that showed up only
//      in production/CDN, where the model loads after the burst window closes.
//
// Sizing is compared with clientWidth/clientHeight (layout box), not
// getBoundingClientRect — the latter includes ancestor CSS transforms (scroll
// reveals, etc.) and would report a transformed size that never "matches",
// keeping the nudge running forever.
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

  // Nudge + self-heal: keep the canvas filling the host for the lifetime of the
  // component, correcting both the missed initial measure and any later reset.
  useEffect(() => {
    if (!ready) return;
    const host = hostRef.current;
    if (!host) return;

    let burstTimer = 0;
    let observingCanvas = false;
    const ro = new ResizeObserver(() => check());

    const matched = () => {
      const canvas = host.querySelector("canvas");
      return (
        !!canvas &&
        host.clientWidth > 0 &&
        Math.abs(canvas.clientWidth - host.clientWidth) <= 2 &&
        Math.abs(canvas.clientHeight - host.clientHeight) <= 2
      );
    };

    const check = () => {
      const canvas = host.querySelector("canvas");
      // Start watching the canvas itself as soon as it exists, so a later reset
      // back to the default size is caught and corrected.
      if (canvas && !observingCanvas) {
        ro.observe(canvas);
        observingCanvas = true;
      }
      if (!matched()) window.dispatchEvent(new Event("resize"));
    };

    // Initial burst — retry past the listener-attach race, then the observers
    // take over.
    const startedAt = performance.now();
    const burst = () => {
      check();
      if (!matched() && performance.now() - startedAt < 4000) {
        burstTimer = window.setTimeout(burst, 60);
      }
    };
    burst();
    ro.observe(host);

    return () => {
      window.clearTimeout(burstTimer);
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
