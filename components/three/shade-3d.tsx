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
import { useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import type { MotionValue } from "framer-motion"
import { damp } from "maath/easing"
import * as THREE from "three"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { isWebGLAvailable } from "@/lib/webgl-detect"
import { CanvasSetup } from "@/components/patterns/canvas-setup"
import { Model } from "@/components/patterns/glb-loader"
import { AssetBoundary } from "@/components/patterns/error-boundary"
import { CanvasErrorBoundary } from "./canvas-error-boundary"

// Compressed build of the GLB ships first; ~5% smaller and the source of truth for prod.
const MODEL_URL = "/shadiez-shade-compressed.glb"
const DEFAULT_FALLBACK_IMAGE = "/shade-hero.jpg"

// 3/4 view: gentle Y-only turn from flat side profile. Tune this single number if needed.
const BASE_ROTATION_Y = THREE.MathUtils.degToRad(25)

// Scroll-driven rotation arc. 0.30π ≈ 54° total turn from base — enough to feel alive
// without the model spinning past its photogenic 3/4-front quadrant.
const SCROLL_ROTATION_ARC = Math.PI * 0.30

// maath/damp smoothing time (s). Replaces the old hand-rolled lerp(…, 0.08); damp is
// framerate-independent so the follow feels identical at 60/120Hz. Lower = snappier.
const ROTATION_SMOOTH_TIME = 0.22

type DraggingRef = MutableRefObject<boolean>

function ShadeModel({
  progress,
  isDraggingRef,
  children,
}: {
  progress: MotionValue<number>
  isDraggingRef: DraggingRef
  children?: ReactNode
}) {
  // groupRef rotates (model + any hotspot children turn together). fitRef wraps ONLY
  // the model and carries the normalize/center transform — measuring it never picks
  // up hotspot markers, which would otherwise skew the bounding box.
  const groupRef = useRef<THREE.Group>(null)
  const fitRef = useRef<THREE.Group>(null)

  // Suspense (in the parent) guarantees the GLB has mounted by the time ShadeModel
  // commits, so a one-shot effect is enough — no need to poll in useFrame.
  useEffect(() => {
    const fit = fitRef.current
    if (!fit) return

    fit.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh) return
      const mat = mesh.material as THREE.MeshStandardMaterial | undefined
      if (!mat) return
      // glb still ships with metallicFactor=1.0 (CLAUDE.md). Wood + canvas are
      // non-metallic; roughness near full matte per the brief.
      mat.metalness = 0
      mat.roughness = 0.88
      mat.needsUpdate = true
    })

    // Normalize scale FIRST, then recenter — scaling around the un-centered local
    // origin would re-introduce a vertical offset (model floats off-center).
    const preBox = new THREE.Box3().setFromObject(fit)
    const size = preBox.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    if (maxDim > 0) fit.scale.setScalar(1.2 / maxDim)
    const postBox = new THREE.Box3().setFromObject(fit)
    const center = postBox.getCenter(new THREE.Vector3())
    fit.position.x -= center.x
    fit.position.y -= center.y
    fit.position.z -= center.z
  }, [])

  useFrame((_, dt) => {
    const group = groupRef.current
    if (!group) return
    // Rotation, paused while the user is actively dragging the camera. damp eases the
    // group's Y toward the scroll/idle target framerate-independently (replaces the
    // old hand-rolled lerp(…, 0.08)).
    if (!isDraggingRef.current) {
      const target = BASE_ROTATION_Y + progress.get() * SCROLL_ROTATION_ARC
      damp(group.rotation, "y", target, ROTATION_SMOOTH_TIME, dt)
    }
  })

  return (
    <group ref={groupRef} rotation={[0, BASE_ROTATION_Y, 0]}>
      <group ref={fitRef}>
        <Model url={MODEL_URL} />
      </group>
      {children}
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
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  fallbackAlt = "SHADIEZ wooden sun-shade with cream canvas",
  children,
}: {
  progress: MotionValue<number>
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
    // DOM-level boundary: if the whole Canvas / WebGL context throws, fall back to a
    // flat product image (AssetBoundary below only catches in-scene asset loads).
    <CanvasErrorBoundary
      fallback={
        <div className="relative h-full w-full">
          <FallbackImage src={fallbackSrc} alt={fallbackAlt} />
        </div>
      }
    >
      <CanvasSetup
        // Continuously animated (idle breathing + drag), so render every frame.
        frameloop="always"
        // Framing: pulled in + narrower fov so the shade fills ~2/3 of the square
        // instead of floating small. Camera (not model scale) is the lever here —
        // it magnifies the model AND its sibling hotspots together, keeping them
        // in sync. Narrower fov also flattens perspective for a cleaner hero look.
        camera={{ position: [0, 0.25, 3.4], fov: 30 }}
        dpr={[1, 2]}
        // alpha:true clears to transparent so the page/gradient behind shows through.
        // ACES tone mapping + exposure < 1 keeps the bright canvas from blowing out
        // under the HDRI and lends a filmic warmth.
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
      >
        {/* HDRI environment — single biggest upgrade for matte PBR materials.
            'apartment' gives soft warm indirect light that wraps the canvas and
            picks out the wood grain. Intensity stays modest so direct lights own
            the form. (Kept bespoke rather than three-lab's lighting-rig, whose
            cool key/rim three-point setup would fight the warm brand.) */}
        <Environment preset="apartment" environmentIntensity={0.55} />
        <ambientLight intensity={0.25} color="#f8f1e1" />
        <hemisphereLight args={["#f4e8d4", "#2a1f14", 0.2]} />
        <directionalLight position={[4, 2.8, 2.2]} intensity={0.65} color="#ffdcb0" />
        <directionalLight position={[-3, 1.6, 1.0]} intensity={0.35} color="#f8f3e8" />

        {/* AssetBoundary → Suspense → Model: a failed GLB/draco fetch shows the 3D
            fallback (and bubbles to the image fallback) instead of hanging Suspense. */}
        <AssetBoundary>
          <Suspense fallback={null}>
            <ShadeModel progress={progress} isDraggingRef={isDraggingRef}>
              {children}
            </ShadeModel>
          </Suspense>
        </AssetBoundary>

        {/* Grounding — soft contact shadow so the model doesn't float. */}
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
      </CanvasSetup>
    </CanvasErrorBoundary>
  )
}

Model.preload(MODEL_URL)
