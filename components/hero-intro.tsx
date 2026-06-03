"use client"

/**
 * HeroIntro — first-load overlay that spins the SHADIEZ shade in, decelerates
 * it to its canonical angle, then dissolves to reveal the hero page underneath.
 *
 * Phases:
 *   "spin"   — fast Y rotation, ~1.6s
 *   "land"   — decelerate via maath/damp to BASE_ROTATION_Y over ~0.9s
 *   "fade"   — overlay opacity 1 → 0 over ~0.7s
 *   "gone"   — unmount
 *
 * Reuses the same lighting + camera framing as <Shade3D> so the visual reads
 * as the same product the hero will continue to show.
 *
 * Skipped automatically when:
 *   • prefers-reduced-motion is set
 *   • WebGL is unavailable
 *   • a sessionStorage flag indicates the user already saw it this session
 */

import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { damp } from "maath/easing"
import * as THREE from "three"
import { Model } from "@/components/patterns/glb-loader"
import { isWebGLAvailable } from "@/lib/webgl-detect"

const MODEL_URL = "/shadiez-shade-compressed.glb"
const SESSION_FLAG = "shadiez_intro_played"

// Matches Shade3D so the model lands at the same canonical 3/4 view.
const BASE_ROTATION_Y = THREE.MathUtils.degToRad(25)

// Phase durations (ms). Total ~3.2s — premium without being annoying on revisit.
const SPIN_MS = 1600
const LAND_MS = 900
const FADE_MS = 700

// Spin speed in rad/s during the "spin" phase. ~1 full revolution / second.
const SPIN_RAD_PER_S = Math.PI * 2

type Phase = "spin" | "land" | "fade" | "gone"

function SpinningShade({ phase }: { phase: Phase }) {
  const groupRef = useRef<THREE.Group>(null)
  const fitRef = useRef<THREE.Group>(null)

  // Normalize + recenter once, same routine as Shade3D, so the model sits at
  // origin and renders at a predictable size regardless of GLB units.
  useEffect(() => {
    const fit = fitRef.current
    if (!fit) return

    fit.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh) return
      const mat = mesh.material as THREE.MeshStandardMaterial | undefined
      if (!mat) return
      // Source GLB has metallicFactor=1.0 (CLAUDE.md). Wood + canvas are matte.
      mat.metalness = 0
      mat.roughness = 0.88
      mat.needsUpdate = true
    })

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
    const g = groupRef.current
    if (!g) return
    if (phase === "spin") {
      g.rotation.y += SPIN_RAD_PER_S * dt
    } else {
      // Once we leave "spin", ease toward the canonical resting rotation.
      // damp wraps cleanly across the modulo so it always picks the short way.
      const current = g.rotation.y
      // Normalize current to [-PI, PI] so damp doesn't unwind through 50 revs.
      const wrapped = Math.atan2(Math.sin(current), Math.cos(current))
      g.rotation.y = wrapped
      damp(g.rotation, "y", BASE_ROTATION_Y, 0.3, dt)
    }
  })

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      <group ref={fitRef}>
        <Model url={MODEL_URL} />
      </group>
    </group>
  )
}

export function HeroIntro() {
  const [phase, setPhase] = useState<Phase>("spin")
  const [shouldRender, setShouldRender] = useState(true)

  // Decide whether to play at all. Runs once on mount; if we bail, the overlay
  // never paints and the page is visible immediately.
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const alreadyPlayed =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(SESSION_FLAG) === "1"
    const noGl = !isWebGLAvailable()

    if (reduce || alreadyPlayed || noGl) {
      setShouldRender(false)
      return
    }

    // Mark as played NOW so a fast navigation back doesn't replay.
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_FLAG, "1")
    }
  }, [])

  // Phase machine. Each phase schedules the next; if the component unmounts
  // mid-flight (rare), the timers clean up.
  useEffect(() => {
    if (!shouldRender) return
    const timers: number[] = []
    timers.push(
      window.setTimeout(() => setPhase("land"), SPIN_MS),
      window.setTimeout(() => setPhase("fade"), SPIN_MS + LAND_MS),
      window.setTimeout(
        () => setPhase("gone"),
        SPIN_MS + LAND_MS + FADE_MS,
      ),
    )
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [shouldRender])

  if (!shouldRender || phase === "gone") return null

  const isFading = phase === "fade"

  return (
    <div
      aria-hidden
      // pointer-events-none lets the page below take clicks the instant fade
      // begins — feels responsive even before the overlay is fully gone.
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF5EC] ${
        isFading ? "pointer-events-none" : ""
      }`}
      style={{
        opacity: isFading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease-out`,
      }}
    >
      {/* Stage for the model — fixed box so the Canvas has measurable size. */}
      <div className="relative h-[40vh] w-full max-w-md">
        <Canvas
          frameloop="always"
          camera={{ position: [0, 0.3, 4.5], fov: 35 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.9,
          }}
        >
          {/* Same warm-apartment HDRI as the hero scene — keeps the canvas
              tone exactly matched to what the user sees post-intro. */}
          <Environment preset="apartment" environmentIntensity={0.55} />
          <ambientLight intensity={0.25} color="#f8f1e1" />
          <hemisphereLight args={["#f4e8d4", "#2a1f14", 0.2]} />
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
            <SpinningShade phase={phase} />
          </Suspense>
        </Canvas>
      </div>

      {/* Wordmark + tagline. Fade in once the canvas has mounted, fade out
          a beat before the overlay starts dissolving. */}
      <div
        className={`mt-6 text-center transition-opacity duration-500 ${
          phase === "fade" ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="font-serif text-base tracking-[0.32em] text-[#2B2723] md:text-lg">
          SHADIEZ
        </div>
        <div className="mt-1.5 font-serif text-[11px] italic text-[#2B2723]/55 md:text-xs">
          Something new under the sun
        </div>
      </div>
    </div>
  )
}

// Preload the model at module scope so the GLB starts fetching as early as
// possible — by the time HeroIntro mounts it should be cached and Suspense
// resolves on the first frame.
Model.preload(MODEL_URL)
