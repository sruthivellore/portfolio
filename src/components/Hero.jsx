import { useState } from 'react'
import { DATA } from '../App'
import { useCountUp } from '../hooks/useCountUp'

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const [iconCopied, setIconCopied] = useState(false)

  const handleContact = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(DATA.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const handleEmailIcon = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(DATA.email).then(() => {
      setIconCopied(true)
      setTimeout(() => setIconCopied(false), 2000)
    })
  }

  return (
    <section id="hero">
      <div className="container">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for new opportunities
            </div>
            <h1 className="hero-name">{DATA.shortName}<br />Vellore</h1>
            <p className="hero-title">{DATA.title}</p>
            <p className="hero-desc">
              Building complete AI-powered products from concept to production.
              3+ years shipping full-stack applications, agentic pipelines, and cloud-native systems.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                View Projects
              </a>
              <button className={`btn btn-outline contact-btn ${copied ? 'contact-copied' : ''}`} onClick={handleContact}>
                {copied ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Email Copied!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Contact Me
                  </>
                )}
              </button>
            </div>
            <div className="hero-socials">
              <a href={DATA.linkedin} target="_blank" rel="noopener" className="social-icon" title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href={DATA.github} target="_blank" rel="noopener" className="social-icon" title="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
              <button
                className={`social-icon social-icon-btn ${iconCopied ? 'social-icon-copied' : ''}`}
                onClick={handleEmailIcon}
                title={iconCopied ? 'Copied!' : 'Copy email'}
              >
                {iconCopied
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                }
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-big">
              <div className="code-header">
                <span className="code-dot dot-red" />
                <span className="code-dot dot-yellow" />
                <span className="code-dot dot-green" />
              </div>
              <pre
                className="hero-code"
                dangerouslySetInnerHTML={{ __html:
`<span class="cm">// what drives me</span>
<span class="kw">const</span> <span class="fn">passion</span> = {
  mission:    <span class="str">"turn ideas into shipped products"</span>,
  approach:   [<span class="str">"design"</span>, <span class="str">"build"</span>, <span class="str">"deploy"</span>, <span class="str">"repeat"</span>],
  superpower: <span class="str">"AI + full-stack in one person"</span>,
  exploring:  [<span class="str">"LLMs"</span>, <span class="str">"agentic AI"</span>, <span class="str">"MCP"</span>],
  openTo:     <span class="str">"great problems &amp; great teams"</span>,
}`
                }}
              />
            </div>
            <div className="hero-card-row">
              <StatCard target={3} suffix="+" label="Years experience" />
              <StatCard target={3.9} suffix="" label="M.Sc. GPA · NJIT" />
            </div>
            <div className="hero-card-row">
              <StatCard target={10} suffix="+" label="AI integrations" />
              <StatCard target={1} suffix="k+" label="Hours automated" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ target, suffix, label }) {
  const { ref, display } = useCountUp(target, suffix)
  return (
    <div ref={ref} className="hero-card-sm">
      <div className="hero-stat">{display}</div>
      <div className="hero-stat-label">{label}</div>
    </div>
  )
}
