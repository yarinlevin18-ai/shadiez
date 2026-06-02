"use client"

import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react"
import Image from "next/image"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei"
import type { MotionValue } from "framer-motion"
import * as THREE from "three"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { isWebGLAvailable } from "@/lib/webgl-detect"
import { CanvasErrorBoundary } from "./canvas-error-boundary"

// Compressed build of the GLB ships first; ~5% smaller and the source of truth for prod.
const MODEL_URL = "/shadiez-shade-compressed.glb"
const DEFAULT_FALLBACK_IMAGE = "/shade-hero.jpg"

// 3/4 view: gentle Y-only turn from flat side profile. Tune this single number if needed.
const BASE_ROTATION_Y = THREE.MathUtils.degToRad(25)

// Scroll-driven rotation arc. 0.30π ≈ 54° total turn from base — enough to feel alive
// without the model spinning past its photogenic 3/4-front quadrant. Was 0.45π (~81°),
// which pushed it nearly head-on by the bottom of the section.
const SCROLL_ROTATION_ARC = Math.PI * 0.30

type DraggingRef = MutableRefObject<boolean>

function ShadeModel({
  progress,
  offsetY,
  scale,
  isDraggingRef,
  children,
}: {
  progress: MotionValue<number>
  offsetY?: MotionValue<number>
  scale?: MotionValue<number>
  isDraggingRef: DraggingRef
  children?: ReactNode
}) {
  const groupRef = useRef<THREE.Group>(null)
  const transformRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(MODEL_URL)

  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh) return
      const mat = mesh.material as THREE.MeshStandardMaterial | undefined
      if (!mat) return
      // glb still ships with metallicFactor=1.0 (CLAUDE.md). Wood + canvas are non-metallic.
      // Roughness pushed close to full matte — the brief is matte / no harsh specular.
      mat.metalness = 0
      mat.roughness = 0.88
      mat.needsUpdate = true
    })

    // Normalize scale FIRST, then recenter — otherwise scaling around the un-centered local
    // origin re-introduces a vertical offset (model floats off-center).
    const preBox = new THREE.Box3().setFromObject(scene)
    const size = preBox.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    if (maxDim > 0) {
      // Hero-product fit: generous negative space around the model on its stage.
      // 1.2 reads as a small physical object sitting back from camera, with clear
      // sky/cream above and sand below. Was 1.4; trimmed for a quieter, more
      // editorial hero presence — matches the warmer indirect lighting added below.
      scene.scale.setScalar(1.2 / maxDim)
    }
    const postBox = new THREE.Box3().setFromObject(scene)
    const center = postBox.getCenter(new THREE.Vector3())
    // eslint-disable-next-line react-hooks/immutability -- recentering the loaded glTF scene graph in place is the standard drei/useGLTF pattern; the Object3D is mutable by design.
    scene.position.x -= center.x
    scene.position.y -= center.y
    scene.position.z -= center.z
  }, [scene])

  useFrame(() => {
    // Inner group: rotation, paused while user is actively dragging the camera.
    if (groupRef.current && !isDraggingRef.current) {
      const target = BASE_ROTATION_Y + progress.get() * SCROLL_ROTATION_ARC
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        target,
        0.08,
      )
    }
    // Outer group: scroll-driven position + scale transition between scene stages.
    // Lerps separately so the easing stays smooth even when scroll is choppy.
    if (transformRef.current) {
      if (offsetY) {
        transformRef.current.position.y = THREE.MathUtils.lerp(
          transformRef.current.position.y,
          offsetY.get(),
          0.08,
        )
      }
      if (scale) {
        const next = THREE.MathUtils.lerp(
          transformRef.current.scale.x,
          scale.get(),
          0.08,
        )
        transformRef.current.scale.setScalar(next)
      }
    }
  })

  return (
    <group ref={transformRef}>
      <group ref={groupRef} rotation={[0, BASE_ROTATION_Y, 0]}>
        <primitive object={scene} />
        {children}
      </group>
    </group>
  )
}

function InteractiveControls({ isDraggingRef }: { isDraggingRef: DraggingRef }) {
  const ref = useRef<OrbitControlsImpl>(null)

  useEffect(() => {
    const ctrl = ref.current
    if (!ctrl) return
    const onStart = () => {
      isDraggingRef.current = true
    }
    const onEnd = () => {
      isDraggingRef.current = false
    }
    ctrl.addEventListener("start", onStart)
    ctrl.addEventListener("end", onEnd)
    return () => {
      ctrl.removeEventListener("start", onStart)
      ctrl.removeEventListener("end", onEnd)
    }
  }, [isDraggingRef])

  return (
    <OrbitControls
      ref={ref}
      // enableZoom={false} is load-bearing: leaves the wheel free for page scroll.
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.7}
      minPolarAngle={Math.PI * 0.3}
      maxPolarAngle={Math.PI * 0.62}
    />
  )
}

function FallbackImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 36rem, (min-width: 768px) 32rem, 28rem"
      priority
      className="object-contain"
    />
  )
}

type Status = "pending" | "available" | "unavailable"

export function Shade3D({
  progress,
  offsetY,
  scale,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  fallbackAlt = "SHADIEZ wooden sun-shade with cream canvas",
  children,
}: {
  progress: MotionValue<number>
  offsetY?: MotionValue<number>
  scale?: MotionValue<number>
  fallbackSrc?: string
  fallbackAlt?: string
  children?: ReactNode
}) {
  const [status, setStatus] = useState<Status>("pending")
  // Touch devices: skip OrbitControls entirely so drag-to-rotate can't hijack page scroll.
  const [allowDrag, setAllowDrag] = useState(false)
  const isDraggingRef = useRef(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- detecting WebGL + pointer capability is a one-shot read of an external system (the browser) that can't run during SSR/render; this is the intended effect use.
    setStatus(isWebGLAvailable() ? "available" : "unavailable")
    if (typeof window === "undefined") return
    const mql = window.matchMedia("(pointer: coarse)")
    const apply = () => setAllowDrag(!mql.matches)
    apply()
    mql.addEventListener("change", apply)
    return () => mql.removeEventListener("change", apply)
  }, [])

  if (status !== "available") {
    return (
      <div className="relative h-full w-full">
        <FallbackImage src={fallbackSrc} alt={fallbackAlt} />
      </div>
    )
  }

  return (
    <CanvasErrorBoundary
      fallback={
        <div className="relative h-full w-full">
          <FallbackImage src={fallbackSrc} alt={fallbackAlt} />
        </div>
      }
    >
      <Canvas
        camera={{ position: [0, 0.3, 4.5], fov: 35 }}
        dpr={[1, 2]}
        // alpha:true clears the canvas to transparent so anything behind in the DOM
        // (the beach video, the sand-bg) shows through under the model.
        // ACES tone mapping + exposure < 1 prevents the bright canvas from blowing out
        // under the HDRI; gives a slightly filmic warmth. Was implicit linear.
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
      >
        {/* HDRI environment — single biggest upgrade for matte PBR materials.
            'apartment' gives soft warm indirect light that wraps the canvas and picks
            out the wood grain without scenery. environmentIntensity stays modest so the
            direct lights still own the form. */}
        <Environment preset="apartment" environmentIntensity={0.55} />

        {/* Direct lights: warmer, more uniform fill so BOTH canvas faces (front seat
            panel + shadowed back panel) read cream. A gentle warm key from front-right
            gives the form; a cooler-warm fill from the opposite side lifts the back
            panel out of gray without producing harsh specular. With the HDRI doing the
            indirect lifting now, these are pulled back so nothing clips. */}
        <ambientLight intensity={0.25} color="#f8f1e1" />
        <hemisphereLight args={["#f4e8d4", "#2a1f14", 0.20]} />
        <directionalLight
          position={[4, 2.8, 2.2]}
          intensity={0.65}
          color="#ffdcb0"
        />
        <directionalLight
          position={[-3, 1.6, 1.0]}
          intensity={0.35}
          color="#f8f3e8"
        />
        <Suspense fallback={null}>
          <ShadeModel
            progress={progress}
            offsetY={offsetY}
            scale={scale}
            isDraggingRef={isDraggingRef}
          >
            {children}
          </ShadeModel>
        </Suspense>
        {/* Grounding — soft contact shadow under the model so it doesn't float. Fixed
            opacity reads the same in both Details and CTA states; the model still
            "settles" downward into the CTA via offsetY animation. */}
        <ContactShadows
          position={[0, -1.4, 0]}
          scale={5}
          far={2.5}
          blur={2.6}
          opacity={0.4}
          resolution={256}
          color="#1a0f06"
          frames={1}
        />
        {allowDrag && <InteractiveControls isDraggingRef={isDraggingRef} />}
      </Canvas>
    </CanvasErrorBoundary>
  )
}

useGLTF.preload(MODEL_URL)
