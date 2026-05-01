'use client'

export function triggerGlitch(callback) {
  // Dispatch a custom event that the GlitchOverlay component will listen for
  const event = new CustomEvent('trigger-glitch', { detail: { callback } })
  window.dispatchEvent(event)
}
