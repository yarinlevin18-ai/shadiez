"use client";

// GLB Loader — load a .glb/.gltf model with draco decompression, Suspense, and
// preloading. The three pieces that make this production-grade:
//
//   1. useGLTF(url, true)   the second arg enables the draco decoder (pulled
//                           from the gstatic CDN). Plain glbs still load fine.
//   2. scene.clone()        clone before rendering so the SAME model can be
//                           mounted in more than one place / Canvas without the
//                           cached object being yanked between parents.
//   3. Model.preload(url)   warm the cache (call at module scope) so the asset
//                           is fetched before the component mounts.
//
// Always render <Model> inside a <Suspense fallback={...}> — useGLTF suspends
// while the asset downloads.
//
// Usage:
//   <Suspense fallback={<LoadingFallback />}>
//     <Model url="/model.glb" scale={1.5} />
//   </Suspense>
//   Model.preload("/model.glb");

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

export interface ModelProps extends Omit<ThreeElements["primitive"], "object"> {
  url: string;
  /** Enable draco decompression (CDN decoder). Default true. */
  draco?: boolean;
}

export function Model({ url, draco = true, ...props }: ModelProps) {
  const { scene } = useGLTF(url, draco);
  // Clone so multiple mounts of the same url don't fight over one Object3D.
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={cloned} {...props} />;
}

Model.preload = (url: string, draco = true) => useGLTF.preload(url, draco);
