import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { DATA } from '../App'

export default function About() {
  const ref = useScrollReveal()
  const [copied, setCopied] = useState(false)

  const handleTalk = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(DATA.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <section id="about">
      <div className="container">
        <div ref={ref} className="reveal">
          <span className="section-label">About Me</span>
          <h2 className="section-title">A little <span className="gradient-text">about me</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-text reveal" ref={useScrollReveal()}>
            <p>
              Originally from Hyderabad, India, I moved to the US for my Master's in CS at NJIT and
              never looked back. Before that, three years at Hitachi Vantara shipping enterprise software,
              leading automation teams, and getting comfortable with production-grade systems at scale.
            </p>
            <p>
              What gets me out of bed is building things that actually work in the real world. Not
              prototypes. Full products, with CI/CD, security gates, observability, and a real user at
              the end of it. That's why I gravitate toward AI tooling: the gap between a cool demo and
              something reliable is exactly where the interesting engineering happens.
            </p>
            <p>
              Always curious about what's next in agentic AI and the Model Context Protocol.
              When I'm not shipping at Circle Software, I'm building personal tools and exploring
              what LLMs can do when you go past the demo.
            </p>
            <button onClick={handleTalk} className={`btn about-cta ${copied ? 'contact-copied' : 'btn-primary'}`}>
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Email copied!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Let's talk
                </>
              )}
            </button>
          </div>
          <div className="about-cards">
            <AboutCard delay={1} emoji="✈️" title="Background" text="Hyderabad, India to Jersey City, NJ. Software built across two continents." />
            <AboutCard delay={2} emoji="🎓" title="Education" text="M.Sc. CS · NJIT, 3.9 GPA. B.E. CS · JNTU Hyderabad." />
            <AboutCard delay={3} emoji="⚡" title="Focus" text="End-to-end AI products. LLM pipeline to production deploy." />
            <AboutCard delay={4} emoji="🔭" title="Exploring" text="Agentic AI, Model Context Protocol, LLM orchestration." />
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutCard({ emoji, title, text, delay }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`about-card glass-card reveal reveal-delay-${delay}`}>
      <span className="about-card-emoji">{emoji}</span>
      <div className="about-card-title">{title}</div>
      <div className="about-card-text">{text}</div>
    </div>
  )
}
