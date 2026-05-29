import { useScrollReveal } from '../hooks/useScrollReveal'
import { DATA } from '../App'

export default function Skills() {
  const ref = useScrollReveal()

  return (
    <section id="skills">
      <div className="container">
        <div ref={ref} className="reveal">
          <span className="section-label">Tech Stack</span>
          <h2 className="section-title">What I <span className="gradient-text">work with</span></h2>
          <p className="section-sub">A broad stack built across 3+ years of production engineering, AI development, and cloud infrastructure.</p>
        </div>
        <div className="skills-grid">
          {DATA.skills.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i + 1} delay={(i % 3) + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ group, index, delay }) {
  const ref = useScrollReveal()
  const num = String(index).padStart(2, '0')

  return (
    <div
      ref={ref}
      className={`skill-card reveal reveal-delay-${delay}`}
      style={{ '--skill-color': group.color }}
      data-index={num}
    >
      <div className="skill-card-header">
        <div className="skill-icon">{group.icon}</div>
        <div className="skill-category">{group.category}</div>
      </div>
      <div className="skill-items">
        {group.items.map(item => (
          <span key={item} className="skill-chip">{item}</span>
        ))}
      </div>
    </div>
  )
}
