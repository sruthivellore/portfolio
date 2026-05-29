import { useScrollReveal } from '../hooks/useScrollReveal'
import { DATA } from '../App'

export default function Experience() {
  const ref = useScrollReveal()

  return (
    <section id="experience">
      <div className="container">
        <div ref={ref} className="reveal">
          <span className="section-label">Career</span>
          <h2 className="section-title">Where I've <span className="gradient-text">worked</span></h2>
          <p className="section-sub">From internship to senior engineer, building products across AI, full-stack, and cloud infrastructure.</p>
        </div>
        <div className="exp-timeline">
          {DATA.experience.map((job, i) => (
            <ExpItem key={job.company} job={job} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExpItem({ job, delay }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`exp-item reveal reveal-delay-${Math.min(delay, 4)}`}>
      <div className={`exp-dot ${job.current ? 'exp-dot-current' : ''}`} />
      <div className="exp-card">
        <div className="exp-header">
          <div>
            <div className="exp-company">{job.company}</div>
            <div className="exp-role">{job.role}</div>
            <div className="exp-location">📍 {job.location}</div>
          </div>
          <span className="exp-period">{job.period}</span>
        </div>
        <ul className="exp-highlights">
          {job.highlights.map((h, i) => (
            <li key={i} className="exp-highlight">{h}</li>
          ))}
        </ul>
        <div className="exp-tech">
          {job.tech.map(t => (
            <span key={t} className="exp-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
