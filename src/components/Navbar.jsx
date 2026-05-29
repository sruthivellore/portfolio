import { useState, useEffect } from 'react'
import { DATA } from '../App'

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Education',  href: '#education' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active,   setActive]     = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = LINKS.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (href) => {
    setMenuOpen(false)
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
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
          <li>
            <a href={`mailto:${DATA.email}`} className="nav-cta">Hire Me</a>
          </li>
        </ul>

        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

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
        <a href={`mailto:${DATA.email}`} className="nav-cta" style={{ marginTop: 8, display: 'inline-block' }}>
          Hire Me
        </a>
      </div>
    </nav>
  )
}
