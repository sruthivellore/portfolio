/* ===========================================================
   Hero background variants. Each export takes a mount element
   and returns a cleanup function. Plain canvas 2D except
   `wireframe`, which uses three.js.
   =========================================================== */
import * as THREE from 'three'

const VIOLET = '#a78bfa'
const CYAN = '#22e6ff'

/* helper: set up a hidpi 2d canvas that tracks its mount size */
function makeCanvas(mount) {
  const canvas = document.createElement('canvas')
  canvas.style.display = 'block'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  mount.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2)

  const resize = () => {
    w = mount.clientWidth || window.innerWidth
    h = mount.clientHeight || window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  window.addEventListener('resize', resize)

  return {
    ctx,
    get w() { return w },
    get h() { return h },
    destroy() {
      window.removeEventListener('resize', resize)
      if (canvas.parentNode === mount) mount.removeChild(canvas)
    },
  }
}

/* shared raf loop with visibility pause */
function loop(draw) {
  let raf = null, running = true
  const tick = () => { if (!running) return; draw(); raf = requestAnimationFrame(tick) }
  tick()
  const onVis = () => {
    running = !document.hidden
    if (running && !raf) tick()
    if (!running && raf) { cancelAnimationFrame(raf); raf = null }
  }
  document.addEventListener('visibilitychange', onVis)
  return () => {
    running = false
    if (raf) cancelAnimationFrame(raf)
    document.removeEventListener('visibilitychange', onVis)
  }
}

/* ---------------- 1. Constellation network ---------------- */
export function constellation(mount) {
  const c = makeCanvas(mount)
  const small = c.w < 820
  // denser per-area on phones so the web still reads as connected
  const COUNT = small
    ? Math.max(26, Math.min(46, Math.round((c.w * c.h) / 7000)))
    : Math.min(90, Math.round((c.w * c.h) / 16000))
  const LINK = small ? 96 : 130
  const CURSOR_LINK = small ? 120 : 170
  const pts = Array.from({ length: COUNT }, () => ({
    x: Math.random() * c.w,
    y: Math.random() * c.h,
    vx: (Math.random() - 0.5) * 0.32,
    vy: (Math.random() - 0.5) * 0.32,
  }))
  const mouse = { x: -9999, y: -9999 }
  const onMove = (e) => {
    const pt = e.touches ? e.touches[0] : e
    if (!pt) return
    const r = mount.getBoundingClientRect()
    mouse.x = pt.clientX - r.left
    mouse.y = pt.clientY - r.top
  }
  const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('touchmove', onMove, { passive: true })
  window.addEventListener('touchend', onLeave, { passive: true })

  const stop = loop(() => {
    const { ctx, w, h } = c
    ctx.clearRect(0, 0, w, h)

    for (const p of pts) {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1
    }

    // links between nearby points
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
        const d = Math.hypot(dx, dy)
        if (d < LINK) {
          ctx.strokeStyle = VIOLET
          ctx.globalAlpha = (1 - d / LINK) * 0.55
          ctx.lineWidth = 1
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke()
        }
      }
      // link to cursor
      const mdx = pts[i].x - mouse.x, mdy = pts[i].y - mouse.y
      const md = Math.hypot(mdx, mdy)
      if (md < CURSOR_LINK) {
        ctx.strokeStyle = CYAN
        ctx.globalAlpha = (1 - md / CURSOR_LINK) * 0.85
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
      }
    }

    ctx.globalAlpha = 1
    ctx.fillStyle = CYAN
    ctx.shadowColor = CYAN
    ctx.shadowBlur = 8
    for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill() }
    ctx.shadowBlur = 0
  })

  return () => {
    stop()
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', onLeave)
    c.destroy()
  }
}

/* ---------------- 2. Matrix code rain ---------------- */
export function matrix(mount) {
  const c = makeCanvas(mount)
  const GLYPHS = '01{}[]<>/\\=+*abcdefABCDEF$#@'
  const SIZE = 15
  let cols = Math.ceil(c.w / SIZE)
  let drops = Array.from({ length: cols }, () => Math.random() * -50)
  let frame = 0

  const stop = loop(() => {
    const { ctx, w, h } = c
    // re-init if width changed
    const need = Math.ceil(w / SIZE)
    if (need !== cols) { cols = need; drops = Array.from({ length: cols }, () => Math.random() * -50) }

    // slow the fall without slowing the raf
    frame++
    ctx.fillStyle = 'rgba(10, 14, 20, 0.075)'
    ctx.fillRect(0, 0, w, h)
    if (frame % 2 !== 0) return

    ctx.font = `${SIZE}px 'JetBrains Mono', monospace`
    for (let i = 0; i < cols; i++) {
      const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0]
      const x = i * SIZE, y = drops[i] * SIZE
      const lead = Math.random() > 0.93
      ctx.fillStyle = lead ? '#d9fbff' : (Math.random() > 0.75 ? CYAN : VIOLET)
      ctx.globalAlpha = lead ? 1 : 0.7
      ctx.shadowColor = lead ? CYAN : VIOLET
      ctx.shadowBlur = lead ? 10 : 4
      ctx.fillText(ch, x, y)
      ctx.shadowBlur = 0
      if (y > h && Math.random() > 0.975) drops[i] = 0
      drops[i]++
    }
    ctx.globalAlpha = 1
  })

  return () => { stop(); c.destroy() }
}

/* ---------------- 3. Flowing particle field ---------------- */
export function flow(mount) {
  const c = makeCanvas(mount)
  const COUNT = 420
  const parts = Array.from({ length: COUNT }, () => ({
    x: Math.random() * c.w,
    y: Math.random() * c.h,
    life: Math.random() * 200,
  }))
  let t = 0

  // cheap curl-ish noise from layered sines
  const angleAt = (x, y) =>
    Math.sin(x * 0.0032 + t) * 1.6 +
    Math.cos(y * 0.0041 - t * 0.7) * 1.6 +
    Math.sin((x + y) * 0.0017 + t * 0.4) * 1.2

  const stop = loop(() => {
    const { ctx, w, h } = c
    ctx.fillStyle = 'rgba(10, 14, 20, 0.05)'
    ctx.fillRect(0, 0, w, h)
    t += 0.0016

    ctx.lineWidth = 1.3
    for (const p of parts) {
      const a = angleAt(p.x, p.y)
      const nx = p.x + Math.cos(a) * 0.85
      const ny = p.y + Math.sin(a) * 0.85

      ctx.strokeStyle = p.life % 3 === 0 ? CYAN : VIOLET
      ctx.globalAlpha = 0.5
      ctx.shadowColor = ctx.strokeStyle
      ctx.shadowBlur = 5
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke()

      ctx.shadowBlur = 0
      p.x = nx; p.y = ny; p.life--
      if (p.life < 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
        p.x = Math.random() * w; p.y = Math.random() * h; p.life = 200 + Math.random() * 200
      }
    }
    ctx.globalAlpha = 1
  })

  return () => { stop(); c.destroy() }
}

/* ---------------- 4. Perspective grid ---------------- */
export function grid(mount) {
  const c = makeCanvas(mount)
  let t = 0

  const stop = loop(() => {
    const { ctx, w, h } = c
    ctx.clearRect(0, 0, w, h)
    t += 0.008

    const horizon = h * 0.42
    ctx.lineWidth = 1

    // receding horizontal lines, spacing grows toward the viewer
    for (let i = 1; i <= 22; i++) {
      const p = ((i + (t % 1)) / 22) ** 2.4
      const y = horizon + p * (h - horizon)
      if (y > h) continue
      ctx.strokeStyle = VIOLET
      ctx.globalAlpha = 0.12 + p * 0.55
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
    }

    // vanishing-point verticals with a gentle wave
    const cx = w / 2
    for (let i = -14; i <= 14; i++) {
      const sway = Math.sin(t * 0.9 + i * 0.35) * 12
      const xBottom = cx + i * (w / 12) + sway
      ctx.strokeStyle = i % 4 === 0 ? CYAN : VIOLET
      ctx.globalAlpha = i % 4 === 0 ? 0.55 : 0.28
      ctx.beginPath(); ctx.moveTo(cx, horizon); ctx.lineTo(xBottom, h); ctx.stroke()
    }

    // horizon glow
    const g = ctx.createLinearGradient(0, horizon - 40, 0, horizon + 40)
    g.addColorStop(0, 'rgba(139,124,246,0)')
    g.addColorStop(0.5, 'rgba(167,139,250,0.4)')
    g.addColorStop(1, 'rgba(74,216,255,0)')
    ctx.globalAlpha = 1
    ctx.fillStyle = g
    ctx.fillRect(0, horizon - 40, w, 80)
  })

  return () => { stop(); c.destroy() }
}

/* ---------------- 5. Original wireframe spheres (three.js) ---------------- */
export function wireframe(mount) {
  let renderer
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }) } catch { return () => {} }

  let W = mount.clientWidth || window.innerWidth
  let H = mount.clientHeight || window.innerHeight
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(W, H)
  mount.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
  camera.position.z = 18

  const group = new THREE.Group()
  scene.add(group)
  const ico = new THREE.Mesh(
    new THREE.IcosahedronGeometry(6.2, 1),
    new THREE.MeshBasicMaterial({ color: 0x8b7cf6, wireframe: true, transparent: true, opacity: 0.16 })
  )
  const ico2 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(4.0, 1),
    new THREE.MeshBasicMaterial({ color: 0x4ad8ff, wireframe: true, transparent: true, opacity: 0.13 })
  )
  group.add(ico); group.add(ico2)

  const COUNT = 520, pos = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const r = 9 + Math.random() * 9
    const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1)
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th)
    pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
    pos[i * 3 + 2] = r * Math.cos(ph)
  }
  const pg = new THREE.BufferGeometry()
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const points = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xa78bfa, size: 0.085, transparent: true, opacity: 0.7 }))
  scene.add(points)

  let mx = 0, my = 0, tx = 0, ty = 0
  const onMove = (e) => { tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5 }
  window.addEventListener('mousemove', onMove, { passive: true })
  const onResize = () => {
    W = mount.clientWidth || window.innerWidth; H = mount.clientHeight || window.innerHeight
    camera.aspect = W / H; camera.updateProjectionMatrix(); renderer.setSize(W, H)
  }
  window.addEventListener('resize', onResize)

  const stop = loop(() => {
    group.rotation.y += 0.0016; group.rotation.x += 0.0008
    ico2.rotation.y -= 0.003; ico2.rotation.z += 0.002
    points.rotation.y += 0.0006
    mx += (tx - mx) * 0.04; my += (ty - my) * 0.04
    camera.position.x = mx * 6; camera.position.y = -my * 4
    camera.lookAt(scene.position)
    renderer.render(scene, camera)
  })

  return () => {
    stop()
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('resize', onResize)
    pg.dispose()
    ico.geometry.dispose(); ico.material.dispose()
    ico2.geometry.dispose(); ico2.material.dispose()
    points.material.dispose(); renderer.dispose()
    if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
  }
}

export const VARIANTS = {
  constellation: { label: 'Constellation', run: constellation },
  matrix:        { label: 'Matrix rain',   run: matrix },
  flow:          { label: 'Flow field',    run: flow },
  grid:          { label: 'Perspective grid', run: grid },
  wireframe:     { label: 'Wireframe (current)', run: wireframe },
}
