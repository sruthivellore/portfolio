import { useScrollReveal } from '../hooks/useScrollReveal'
import { DATA } from '../App'

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about">
      <div className="container">
        <div ref={ref} className="reveal">
          <span className="section-label">About Me</span>
          <h2 className="section-title">The person <span className="gradient-text">behind the code</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-text reveal" ref={useScrollReveal()}>
            <p>
              I'm a software engineer based in Jersey City, NJ — originally from Hyderabad, India.
              After spending four years at Hitachi Vantara building enterprise platforms and leading automation
              teams, I moved to the US to pursue my Master's in Computer Science at NJIT, graduating with a 3.9 GPA.
            </p>
            <p>
              I'm obsessed with AI-powered products — the kind that actually ship, handle real edge cases,
              and make people's work meaningfully faster. Not prototypes. Not demos. Things that run in production
              with proper CI/CD, security scanning, and monitoring behind them.
            </p>
            <p>
              Currently I'm at Circle Software building agentic developer tooling and cloud infrastructure.
              On the side I built MemoMate, a full-stack AI productivity assistant that connects Gmail,
              Google Calendar, and multiple LLM providers — because I wanted to scratch my own itch.
            </p>
            <p>
              When I'm not shipping code, I'm exploring what's next in LLMs, agentic systems, and the
              Model Context Protocol. Always open to challenging problems and teams that care about craft.
            </p>
            <a href={`mailto:${DATA.email}`} className="btn btn-primary about-cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Let's talk
            </a>
          </div>
          <div className="about-cards">
            <AboutCard delay={1} emoji="🇮🇳→🇺🇸" title="Background" text="Hyderabad, India to Jersey City, NJ. Built software across two continents." />
            <AboutCard delay={2} emoji="🎓" title="Education" text="M.Sc. Computer Science · NJIT, 3.9 GPA. B.E. CS · JNTU Hyderabad." />
            <AboutCard delay={3} emoji="⚡" title="Focus" text="End-to-end AI products. From LLM pipeline to production deploy." />
            <AboutCard delay={4} emoji="🔭" title="Exploring" text="Agentic AI, Model Context Protocol, and LLM orchestration patterns." />
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
