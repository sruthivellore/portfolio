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
        <div className="ea-wrap">
          <div className="ea-degrees-row">
            <p className="ea-sub-label">Degrees</p>
            <div className="edu-col">
              {DATA.education.map((edu, i) => (
                <EduCard key={edu.school} edu={edu} delay={i + 1} />
              ))}
            </div>
          </div>
          <div className="ea-awards-row">
            <p className="ea-sub-label">Recognition</p>
            <div className="awards-col">
              {DATA.awards.map((award, i) => (
                <AwardCard key={award.title} award={award} delay={i + 1} />
              ))}
            </div>
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
      <div className="edu-card-top">
        <div className="edu-flag-wrap">
          <span className="edu-flag">{edu.flag}</span>
        </div>
        <div className="edu-gpa-badge">GPA {edu.gpa}</div>
      </div>
      <div className="edu-school">{edu.school}</div>
      <div className="edu-degree">{edu.degree}</div>
      <div className="edu-period-bar">
        <span className="edu-dot" />
        <span className="edu-meta">{edu.period}</span>
        {edu.location && <><span className="edu-sep">·</span><span className="edu-meta">📍 {edu.location}</span></>}
      </div>
      {edu.courses && (
        <div className="edu-courses">
          {edu.courses.map(c => (
            <span key={c} className="edu-course-chip">{c}</span>
          ))}
        </div>
      )}
    </div>
  )
}

function AwardCard({ award, delay }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`award-card reveal reveal-delay-${delay}`}>
      <div className="award-icon-wrap">
        <span className="award-icon">🏆</span>
      </div>
      <div className="award-body">
        <div className="award-title">{award.title}</div>
        <div className="award-detail">{award.detail} · Hitachi Vantara</div>
      </div>
      <span className="award-year">{award.year}</span>
    </div>
  )
}
