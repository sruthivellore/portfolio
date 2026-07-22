import { useEffect, useRef, useState } from 'react'
import { VARIANTS } from './backgrounds'

/**
 * Hero background animation.
 * Strictly alternates between the variants on each page load,
 * so you always get the other one next time.
 */
const POOL = ['constellation', 'wireframe']

// Alternate across page loads via localStorage.
// The counter is bumped exactly once per load, guarded by a flag on
// `window` so StrictMode's double render and Vite HMR re-execution
// cannot advance it twice.
function pickVariant() {
  if (window.__svBg) return window.__svBg

  let n = 0
  try { n = parseInt(localStorage.getItem('sv_bg_n') || '0', 10) || 0 } catch { /* ignore */ }
  const chosen = POOL[n % POOL.length]
  try { localStorage.setItem('sv_bg_n', String((n + 1) % 1000)) } catch { /* ignore */ }

  window.__svBg = chosen
  // eslint-disable-next-line no-console
  console.log('[bg] load #' + n + ' ->', chosen)
  return chosen
}

export default function ThreeBackground() {
  const mountRef = useRef(null)
  const [variant] = useState(pickVariant)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Respect an explicit accessibility preference, always.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    // No canvas animation on phones: the per-frame cost (O(n^2) link
    // checks, shadowBlur glow, WebGL) drains battery and stutters on
    // mid-range devices. The CSS gradient blobs remain as the backdrop.
    if (window.matchMedia?.('(max-width: 820px)').matches) return

    const run = VARIANTS[variant]?.run
    if (!run) return

    const cleanup = run(mount)
    return () => { if (typeof cleanup === 'function') cleanup() }
  }, [variant])

  return <div ref={mountRef} className="three-bg" aria-hidden="true" />
}
