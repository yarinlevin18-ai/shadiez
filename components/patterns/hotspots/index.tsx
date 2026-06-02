"use client";

// Hotspots — DOM markers anchored to 3D positions, with occlusion.
//
// drei's <Html> projects an HTML element to a point in the scene. The key prop
// is `occlude`: with raycast occlusion the marker fades out when geometry comes
// between it and the camera, so back-facing hotspots correctly hide as you
// orbit. We drive opacity from the onOcclude callback for a soft fade.
//
// Styles are inlined so the component is copy-paste portable (no external CSS).
//
// Usage:
//   <mesh>…</mesh>
//   <Hotspot position={[0, 1, 0.6]} label="Camera" occlude />
//   <Hotspot position={[-0.8, 0, -0.4]} label="Sensor" occlude />

import { type ReactNode, useState, type ComponentProps } from "react";
import { Html } from "@react-three/drei";
import type { Vector3Tuple } from "three";

export interface HotspotProps {
  position: Vector3Tuple;
  /** Short label shown next to the dot. */
  label?: string;
  /** Rich content instead of a plain label. */
  children?: ReactNode;
  /**
   * Occlusion mode. `true`/"raycast" hides the marker behind any geometry.
   * Pass an array of mesh refs to only test against those.
   */
  occlude?: ComponentProps<typeof Html>["occlude"];
  /** Accent color of the dot. */
  color?: string;
  /** Scale markers with distance to the camera. Default false (constant size). */
  distanceFactor?: number;
}

export function Hotspot({
  position,
  label,
  children,
  occlude = true,
  // SHADIEZ warm palette (was three-lab's #7c7cff purple) — deep navy accent.
  color = "#1F3A5F",
  distanceFactor,
}: HotspotProps) {
  const [hidden, setHidden] = useState(false);

  return (
    <Html
      position={position}
      occlude={occlude}
      onOcclude={setHidden}
      distanceFactor={distanceFactor}
      zIndexRange={[20, 0]}
      style={{
        transition: "opacity 0.2s ease",
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 0 4px ${color}33`,
            flex: "0 0 auto",
          }}
        />
        {(label || children) && (
          <span
            style={{
              // SHADIEZ warm/light token set (was three-lab's dark mono chip).
              fontFamily:
                "var(--font-sans, ui-sans-serif, system-ui, sans-serif)",
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#2B2723",
              background: "rgba(243,236,224,0.92)",
              border: "1px solid rgba(43,39,35,0.12)",
              borderRadius: 4,
              padding: "3px 9px",
              boxShadow: "0 6px 16px -8px rgba(43,39,35,0.45)",
              backdropFilter: "blur(4px)",
            }}
          >
            {children ?? label}
          </span>
        )}
      </div>
    </Html>
  );
}
