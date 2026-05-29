import { DATA } from '../App'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <span className="footer-logo">Sruthi Vellore</span>
          <span className="footer-copy">© {new Date().getFullYear()} · Built with React + Vite</span>
          <div className="footer-links">
            <a href={DATA.linkedin} target="_blank" rel="noopener" className="footer-link">LinkedIn</a>
            <a href={DATA.github} target="_blank" rel="noopener" className="footer-link">GitHub</a>
            <a href={`mailto:${DATA.email}`} className="footer-link">Email</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
