import { useScrollReveal } from '../hooks/useScrollReveal'
import { DATA } from '../App'

export default function EducationAwards() {
  const ref = useScrollReveal()

  return (
    <section id="education">
      <div className="container">
        <div ref={ref} className="reveal">
          <span className="section-label">Background</span>
          <h2 className="section-title">Education & <span className="gradient-text">Awards</span></h2>
        </div>
        <div className="ea-grid">
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {DATA.education.map((edu, i) => (
                <EduCard key={edu.school} edu={edu} delay={i + 1} />
              ))}
            </div>
          </div>
          <div className="awards-col">
            <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 12 }}>Recognition</p>
            {DATA.awards.map((award, i) => (
              <AwardCard key={award.title} award={award} delay={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EduCard({ edu, delay }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`edu-card reveal reveal-delay-${delay}`}>
      <div className="edu-flag">{edu.flag}</div>
      <div className="edu-school">{edu.school}</div>
      <div className="edu-degree">{edu.degree}</div>
      <div className="edu-meta">{edu.period}</div>
      <span className="edu-gpa">GPA {edu.gpa}</span>
    </div>
  )
}

function AwardCard({ award, delay }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`award-card reveal reveal-delay-${delay}`}>
      <span className="award-icon">🏆</span>
      <div>
        <div className="award-title">{award.title}</div>
        <div className="award-detail">{award.detail} · Hitachi Vantara</div>
      </div>
      <span className="award-year">{award.year}</span>
    </div>
  )
}
