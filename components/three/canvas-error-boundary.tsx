"use client"

import { Component, type ReactNode } from "react"

type Props = { fallback: ReactNode; children: ReactNode }
type State = { hasError: boolean }

export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    if (typeof console !== "undefined") {
      console.warn("[Shade3D] Canvas render failed, showing fallback:", error)
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}
