import { useState, useEffect, useCallback } from 'react'

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Education',  href: '#education' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [active,    setActive]    = useState('hero')
  const [progress,  setProgress]  = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0)
      setScrolled(scrollY > 20)
      const sections = LINKS.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (href) => {
    const wasOpen = menuOpen
    setMenuOpen(false)
    const scroll = () => {
      const el = document.getElementById(href.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    // Delay scroll until mobile menu animation finishes (350ms)
    wasOpen ? setTimeout(scroll, 380) : scroll()
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); handleClick('#hero') }}>SV</a>

        <ul className="nav-links">
          {LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={`nav-link ${active === href.slice(1) ? 'nav-link-active' : ''}`}
                onClick={e => { e.preventDefault(); handleClick(href) }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className={`nav-mobile ${menuOpen ? 'nav-mobile-open' : ''}`}>
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="nav-mobile-link"
            onClick={e => { e.preventDefault(); handleClick(href) }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
