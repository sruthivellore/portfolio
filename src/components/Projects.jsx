import { useScrollReveal } from '../hooks/useScrollReveal'
import { DATA } from '../App'

const ICONS = {
  'MemoMate': '🧠',
  'DevAssist': '⚡',
  'YoGo Social': '🌐',
  'PHP Dataset Pipeline': '🔬',
  'Driver License Extraction': '🪪',
}

export default function Projects() {
  const ref = useScrollReveal()

  return (
    <section id="projects">
      <div className="container">
        <div ref={ref} className="reveal">
          <span className="section-label">Projects</span>
          <h2 className="section-title">Things I've <span className="gradient-text">built</span></h2>
          <p className="section-sub">Production-grade systems, AI pipelines, and full-stack products built from scratch.</p>
        </div>
        <div className="projects-bento">
          {DATA.projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, delay }) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`project-card reveal reveal-delay-${Math.min(delay, 4)}`}
      style={{ '--card-accent': project.color }}
    >
      <div className="project-icon" style={{ background: `${project.color}18`, borderColor: `${project.color}30` }}>
        {ICONS[project.name] || '🔧'}
      </div>
      <div className="project-name">{project.name}</div>
      <div className="project-subtitle">{project.subtitle}</div>
      <p className="project-desc">{project.description}</p>
      <div className="project-footer">
        <div className="project-tech">
          {project.tech.slice(0, project.featured ? 6 : 4).map(t => (
            <span key={t} className="project-tech-tag">{t}</span>
          ))}
        </div>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener" className="project-link">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            Code
          </a>
        )}
      </div>
    </div>
  )
}
