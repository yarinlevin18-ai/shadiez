"use client"

import { useRef, type RefObject } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import type { MotionValue } from "framer-motion"

export type HotspotDef = {
  // Anchor point on the model in local (pre-rotation) coordinates.
  position: [number, number, number]
  label: string
  // Which side of the dot the leader + label extend to. Choose so the label lands
  // OFF the model silhouette in its screen quadrant.
  side: "left" | "right"
}

// Equal leader length across every hotspot — spec requirement.
const LEADER_LENGTH = 40

/**
 * Rendered INSIDE the Shade3D Canvas, as a child of the rotating model group.
 *
 * Each frame:
 *   - Reads the rotating group's world matrix (via `me.matrixWorld`).
 *   - For each hotspot: transforms the local anchor to a world position, computes a
 *     camera-facing dot product (back-side hotspots fade out), projects to screen.
 *   - Directly mutates ONE wrapper element per hotspot (transform + opacity). Inner
 *     dot/line/label positions are CSS-only — no per-frame writes for them.
 */
export function HotspotProjector({
  hotspots,
  wrappersRef,
  hotspotsOpacity,
}: {
  hotspots: HotspotDef[]
  wrappersRef: RefObject<(HTMLElement | null)[]>
  hotspotsOpacity?: MotionValue<number>
}) {
  const { camera, size } = useThree()
  const anchorRef = useRef<THREE.Group>(null)
  const v = useRef(new THREE.Vector3()).current

  useFrame(() => {
    const me = anchorRef.current
    if (!me) return
    // me has no local transform → me.matrixWorld === parent (rotating group) matrixWorld.

    // Camera direction in world space, from the model center (origin) toward the camera.
    const cx = camera.position.x
    const cy = camera.position.y
    const cz = camera.position.z
    const clen = Math.hypot(cx, cy, cz) || 1
    const cnx = cx / clen
    const cny = cy / clen
    const cnz = cz / clen

    const globalAlpha = hotspotsOpacity ? hotspotsOpacity.get() : 1
    const w = size.width
    const h = size.height

    for (let i = 0; i < hotspots.length; i++) {
      const def = hotspots[i]

      // Local → world.
      v.set(def.position[0], def.position[1], def.position[2])
      v.applyMatrix4(me.matrixWorld)

      // Camera-facing: (anchorDir) · (cameraDir). Positive = front, negative = back.
      const vlen = Math.hypot(v.x, v.y, v.z) || 1
      const facing = (v.x * cnx + v.y * cny + v.z * cnz) / vlen
      // smoothstep across the silhouette edge gives a soft fade through the grazing zone.
      const facingAlpha = THREE.MathUtils.smoothstep(facing, 0, 0.2)
      const opacity = facingAlpha * globalAlpha

      // World → NDC → pixel (destructive on v; world position no longer needed).
      v.project(camera)
      const screenX = (v.x * 0.5 + 0.5) * w
      const screenY = (-v.y * 0.5 + 0.5) * h

      const el = wrappersRef.current?.[i]
      if (el) {
        // One wrapper, one transform — dot/line/label are positioned via CSS inside.
        el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0)`
        el.style.opacity = `${opacity}`
        // Hide pointer-events when faded out so back-facing hotspots aren't clickable.
        el.style.pointerEvents = opacity > 0.5 ? "auto" : "none"
      }
    }
  })

  return <group ref={anchorRef} />
}

/**
 * DOM overlay rendered OUTSIDE the Canvas, stacked above the 3D layer. Per-hotspot
 * wrapper holds the dot + leader line + label, all positioned by CSS. The projector
 * mutates only the wrapper's transform + opacity each frame.
 *
 * Each wrapper is its own pointer-events target so hovering grows the dot and
 * brightens the label. The parent container stays pointer-events:none so empty space
 * between hotspots doesn't block drag-to-rotate.
 */
export function HotspotOverlay({
  hotspots,
  wrappersRef,
}: {
  hotspots: HotspotDef[]
  wrappersRef: RefObject<(HTMLElement | null)[]>
}) {
  return (
    <>
      {hotspots.map((h, i) => {
        const isLeft = h.side === "left"
        return (
          <div
            key={h.label}
            ref={(el) => {
              if (wrappersRef.current) wrappersRef.current[i] = el
            }}
            // Wrapper origin = the projected dot center. All inner positions are
            // measured from this origin via CSS, so side swap is a class toggle.
            className="group absolute left-0 top-0 h-0 w-0 will-change-transform"
            style={{ opacity: 0 }}
          >
            {/* Leader line — sits flush against the dot edge, extending toward the
                label. Height 1px, width = LEADER_LENGTH. */}
            <span
              aria-hidden
              className={`absolute top-1/2 h-px bg-ink/45 transition-colors duration-150 group-hover:bg-ink/75 ${
                isLeft ? "right-0 -translate-x-1" : "left-0 translate-x-1"
              }`}
              style={{ width: LEADER_LENGTH }}
            />

            {/* Dot. Slightly larger hit area than the visual dot via the wrapper's
                p-2 — a 28px hit target on a 6px dot reads as "interactive" without
                changing the silhouette. */}
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center"
            >
              <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-navy/30" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-navy ring-[2px] ring-cream transition-transform duration-150 group-hover:scale-150" />
            </span>

            {/* Label — anchored to the OUTSIDE end of the leader line. */}
            <span
              className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm bg-cream/95 px-2 py-[3px] font-sans text-[10px] uppercase tracking-[0.16em] text-ink/90 shadow-[0_1px_4px_rgba(40,30,20,0.15)] backdrop-blur-sm transition-[background-color,color,box-shadow] duration-150 group-hover:bg-cream group-hover:text-ink group-hover:shadow-[0_2px_10px_rgba(40,30,20,0.22)] md:text-[11px] ${
                isLeft ? "right-0 -translate-x-[calc(100%+8px)]" : "left-0 translate-x-[calc(100%+8px)]"
              }`}
            >
              {h.label}
            </span>
          </div>
        )
      })}
    </>
  )
}
