import { useEffect, useRef, useState, useCallback } from 'react'

const LINES = [
  "sruthi@portfolio:~$ ./init.sh",
  "[<span class='ok'> OK </span>] loading profile ............. Hemanth Sruthi Vellore",
  "[<span class='ok'> OK </span>] role ....................... Software Engineer · Full-Stack + AI",
  "[<span class='ok'> OK </span>] focus ...................... distributed systems · GenAI · cloud",
  "[<span class='ok'> OK </span>] currently .................. Circle Software · Boca Raton, FL",
  "[<span class='ok'> OK </span>] launching interface ...",
]

export default function BootSequence() {
  // decide once, before first paint, whether this load should boot
  // (plays on every reload; only reduced-motion users skip it)
  const [shouldBoot] = useState(() => {
    if (typeof window === 'undefined') return false
    return !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  })

  const [lines, setLines] = useState([])
  const [done, setDone] = useState(false)
  const [closing, setClosing] = useState(false)
  const timers = useRef([])
  const finished = useRef(false)

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    document.body.style.overflow = ''
    setClosing(true)
    setTimeout(() => setDone(true), 600)
  }, [])

  useEffect(() => {
    if (!shouldBoot) return

    document.body.style.overflow = 'hidden'

    let i = 0
    const step = () => {
      setLines(LINES.slice(0, i + 1))
      i++
      if (i < LINES.length) timers.current.push(setTimeout(step, 230))
      else timers.current.push(setTimeout(finish, 500))
    }
    timers.current.push(setTimeout(step, 180))

    // hard safety: never trap the visitor
    timers.current.push(setTimeout(finish, 4200))

    const onKey = () => finish()
    document.addEventListener('keydown', onKey, { once: true })

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [shouldBoot, finish])

  if (!shouldBoot || done) return null

  return (
    <div id="boot" className={closing ? 'done' : ''} onClick={finish}>
      <div className="boot-inner">
        <div className="boot-out">
          {lines.map((l, idx) => (
            <div className="boot-line" key={idx} dangerouslySetInnerHTML={{ __html: l }} />
          ))}
        </div>
        <div className="boot-skip">press any key or click to <b>skip</b></div>
      </div>
    </div>
  )
}
