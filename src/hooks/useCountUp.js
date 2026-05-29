import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, suffix = '', duration = 1800) {
  const [display, setDisplay] = useState('0' + suffix)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const isDecimal = target % 1 !== 0
        const start = performance.now()

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          const value = target * ease
          setDisplay((isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, duration])

  return { ref, display }
}
