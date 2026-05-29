import { useState, useEffect } from 'react'
import { DATA } from '../App'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Skills', 'Experience', 'Projects', 'Education']

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo">SV</a>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
            </li>
          ))}
          <li>
            <a href={`mailto:${DATA.email}`} className="nav-cta">Hire Me</a>
          </li>
        </ul>
        <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: 'rgba(8,8,15,0.97)', borderTop: '1px solid var(--border)', padding: '16px 24px', backdropFilter: 'blur(20px)' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ display: 'block', padding: '12px 0' }} onClick={() => setMenuOpen(false)}>
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
