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

import { type ReactNode } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";

export interface CanvasSetupProps extends Partial<CanvasProps> {
  children: ReactNode;
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
      {children}
    </Canvas>
  );
}
