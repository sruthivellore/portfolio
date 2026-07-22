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
              I'm a software engineer who covers the whole stack of a problem: the distributed backend,
              the data pipeline feeding it, the cloud it runs on, and increasingly the AI layer on top.
              Four years in, that range is the thing I'd point at first.
            </p>
            <p>
              Right now at Circle Software I work across all three tiers of a cloud call-center platform:
              a Python telephony service driving the softswitch, a Node and TypeScript API on MongoDB,
              and the React admin console on top. I also replaced our manual deploys with a nine-stage
              CI/CD pipeline. Before that, three years at Hitachi Vantara tuning APIs under concurrent
              load and leading an automation team that cut 1000+ hours of manual work a year, then an
              M.Sc. in CS at NJIT.
            </p>
            <p>
              The part I care about is the distance between a demo and something you can actually run.
              Retries, auth, failure modes, CI/CD, the event that arrives twice or never. I like AI work
              for exactly that reason: the models are the easy part, and making them dependable is where
              the real engineering lives.
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
