"use client";

// Asset Boundary — a Canvas-safe error boundary for async 3D content.
//
// <Suspense> alone is a trap: if a GLB 404s or the draco/HDRI fetch throws, the
// promise rejects and Suspense keeps showing the fallback FOREVER — silent hang,
// no error. An error boundary catches that rejection and renders a real
// fallback instead. Error boundaries must be class components; this one lives
// INSIDE the Canvas, so its fallback is 3D (default: a red wireframe box).
//
// Always wrap asset-loading subtrees: AssetBoundary → Suspense → Model.
//
// Usage:
//   <AssetBoundary>
//     <Suspense fallback={<Html center>Loading…</Html>}>
//       <Model url="/model.glb" />
//     </Suspense>
//   </AssetBoundary>

import { Component, type ReactNode } from "react";

export interface AssetBoundaryProps {
  children: ReactNode;
  /** 3D fallback shown when loading throws. Defaults to a red wireframe box. */
  fallback?: ReactNode;
  /** Called with the caught error (log it, report it, etc.). */
  onError?: (error: Error) => void;
}

interface AssetBoundaryState {
  error: Error | null;
}

export class AssetBoundary extends Component<
  AssetBoundaryProps,
  AssetBoundaryState
> {
  state: AssetBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): AssetBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#ff4d4d" wireframe />
          </mesh>
        )
      );
    }
    return this.props.children;
  }
}
