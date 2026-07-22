import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCountUp } from '../hooks/useCountUp'
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
          <span className="section-label">Who am I</span>
          <h2 className="section-title">Who <span className="gradient-text">am I</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-text reveal" ref={useScrollReveal()}>
            <p>
              I'm a full-stack engineer with 4+ years across backend services, real-time systems, cloud
              infrastructure, and applied AI. At Circle Software I work across all three tiers of a
              multi-tenant CRM and contact-center platform: a Python/FastAPI telephony service driving
              FreeSWITCH, a Node and TypeScript API on MongoDB, and the React admin console on top. I
              own multi-tenant access control with per-action authorization enforced server-side, the
              call-event contract the product backend builds against, and the 9-stage CI/CD pipeline
              that replaced 100% manual deploys.
            </p>
            <p>
              Before that, three years at Hitachi Vantara building multi-threaded REST APIs on Redis and
              MySQL, migrating an entire React codebase to Hooks and TypeScript, and leading the in-house
              automation team that replaced daily manual SAP checks with a scheduled job, removing 1000+
              hours of manual work a year. Earlier, a Java digital twin streaming fleet telemetry to GCP
              IoT Core with a BigQuery and Dataflow analytics pipeline behind it. M.Sc. in Computer
              Science from NJIT (3.9 GPA), two Hitachi performance awards.
            </p>
            <p>
              Outside the day job I build the same way. MemoMate, an AI productivity platform with a
              multi-provider LLM backend; DevAssist, a pipeline that turns a Jira ticket and Figma design
              into scaffolded code in about 5 minutes; and a 4-person capstone backend on AWS serverless
              that shipped 3 sprints at a 1.8% defect rate.
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

          <div className="about-visual reveal" ref={useScrollReveal()}>
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
  currentlyAt:<span class="str">"Circle Software"</span>,
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
