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
            <SkillCard key={group.category} group={group} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ group, delay }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`skill-card reveal reveal-delay-${(delay % 4) + 1}`}>
      <div className="skill-category">{group.category}</div>
      <div className="skill-items">
        {group.items.map(item => (
          <span key={item} className="skill-chip">{item}</span>
        ))}
      </div>
    </div>
  )
}
