"use client";

/* ───────────────────────────────────────────────────────────────────────────
   SHADIEZ — /v3  ·  3D shade, BLENDED into the scene (not a product render)
   The brief: the shade should emerge from the warm light, not sit on the page
   like a floating 3D model. So:
     • scene <fog> in the page's warm sand tone fades the model's far edges into
       the background — no hard cut-out silhouette.
     • soft, low-contrast warm lighting (high ambient, gentle key) so it reads as
       atmosphere, not a studio render.
     • the page layers a bottom/edge haze + grain over the canvas (see v3.css) so
       the object dissolves into the surroundings.
   Architecture rules still hold: ONE shared scroll MotionValue drives rotation in
   useFrame (no drei ScrollControls), and the baked metallicFactor=1 is overridden
   to matte on load (wood + canvas are non-metallic).
   ─────────────────────────────────────────────────────────────────────────── */

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Float } from "@react-three/drei";
import { useReducedMotion, type MotionValue } from "framer-motion";
import * as THREE from "three";

const MODEL_URL = "/shadiez-shade-compressed.glb";
// Warm sand tone the model should dissolve into — close to the page's living bg.
const HAZE = "#EFE3C9";

function ShadeMesh({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && "metalness" in mat) {
          mat.metalness = 0;
          mat.roughness = 0.78;
          mat.needsUpdate = true;
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = progress.get();
    const targetY = reduce
      ? Math.PI * 0.1
      : p * Math.PI * 2.0 + Math.sin(state.clock.elapsedTime * 0.22) * 0.05;
    const targetX = reduce ? 0.02 : -0.04 + p * 0.16;
    const k = 1 - Math.pow(0.0016, delta);
    group.current.rotation.y += (targetY - group.current.rotation.y) * k;
    group.current.rotation.x += (targetX - group.current.rotation.x) * k;
  });

  return (
    <Float
      speed={reduce ? 0 : 1}
      rotationIntensity={0}
      floatIntensity={reduce ? 0 : 0.35}
      floatingRange={[-0.035, 0.035]}
    >
      <group ref={group} dispose={null}>
        <primitive object={scene} scale={1.45} position={[0, -0.25, 0]} />
      </group>
    </Float>
  );
}

export default function ShadeModel({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className={className} aria-hidden>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.3, 7.2], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={reduce ? "demand" : "always"}
      >
        {/* fog in the page tone → the model's far edges melt into the background */}
        <fog attach="fog" args={[HAZE, 6, 13]} />
        {/* soft, warm, low-contrast — atmosphere, not a studio render */}
        <ambientLight intensity={1.05} />
        <directionalLight position={[3, 5, 4]} intensity={1.05} color="#FFEAC8" castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-4, 2, -2]} intensity={0.35} color="#D8E2E6" />
        <Suspense fallback={null}>
          <ShadeMesh progress={progress} reduce={reduce} />
          <Environment preset="sunset" environmentIntensity={0.55} />
          <ContactShadows position={[0, -1.3, 0]} opacity={0.22} scale={10} blur={3.2} far={3} color="#6B4A2C" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
