import { useEffect, useRef, useState, useCallback } from 'react'

/* Knowledge base: keyword triggers -> answer (author-controlled HTML). */
const KB = [
  { id: 'whoami', keys: ['whoami', 'who are you', 'about you', 'summary', 'intro', 'yourself', 'bio'],
    a: "<b>Hemanth Sruthi Vellore</b>, a software engineer who builds full-stack products end to end, from distributed backends to the AI layer on top. Currently at <b>Circle Software</b> working on real-time telephony, multi-tenant access control, and an AI code-generation pipeline. Previously 3+ years at <b>Hitachi Vantara</b> (Intern to Software Engineer II). M.Sc. Computer Science, NJIT (3.9 GPA)." },

  { id: 'hireme', keys: ['why should i hire you', 'why hire you', 'hire you', 'why should we hire', 'sell yourself', 'pitch', 'convince me', 'value'],
    a: "<b>Why hire me:</b> I cover ground that usually takes two or three people. I've built multi-threaded backend services, real-time call and data pipelines, cloud infrastructure, and production LLM systems, and I own each of them from design through CI/CD to deployment. Three things I'd point at: at Circle I ship across all three tiers, a Python telephony service, a Node/TypeScript API and the React console on top; I shipped multi-tenant access control enforced per action server-side; and I built an AI pipeline that cut feature setup from hours to about 5 minutes, plus the 9-stage CI/CD pipeline the team now deploys through. I ship, I measure, and I stay for the operational part." },

  { id: 'circle', keys: ['circle', 'current', 'now', 'devassist', 'telephony', 'pbx', 'rbac'],
    a: "<b>Circle Software (Apr 2026 to present):</b> I work across all three tiers of a cloud call-center platform. <b>Telephony:</b> extended an existing PBX service (Python/FastAPI, FreeSWITCH) with call-queue and agent-status APIs and hardened its event pipeline into a reliable contract for the backend, covering hold, transfer and call-outcome tracking across concurrent calls. <b>Backend:</b> shipped multi-tenant access control with per-action authorization enforced server-side (Node/TypeScript, MongoDB), plus account and role management and OAuth 2.0 email integrations. <b>Frontend:</b> built the React admin console against those APIs. <b>Delivery:</b> replaced manual deploys with a 9-stage CI/CD pipeline, and built <b>DevAssist</b>, which turns a Jira ticket and Figma design into conformant code, cutting feature setup from hours to about 5 minutes." },

  { id: 'ai', keys: ['ai', 'llm', 'genai', 'agentic', 'mcp', 'prompt', 'ml', 'gpt', 'model'],
    a: "<b>AI and GenAI:</b> I build with LLMs in production, not just demos. LLM-agnostic architectures with automatic fallback (Groq, Gemini, Ollama), prompt caching, agentic pipelines, and MCP servers. At Cognida I built a multi-provider AI assistant with summarization, zero-shot intent classification, and voice I/O (Whisper and gTTS). At Circle, DevAssist generates project-conformant code from tickets and designs." },

  { id: 'backend', keys: ['backend', 'distributed', 'api', 'scale', 'system', 'systems', 'microservice', 'architecture'],
    a: "<b>Backend and distributed systems:</b> Multi-threaded REST APIs with Redis session caching and MySQL at Hitachi, tuned for latency and throughput under concurrent load. Real-time streaming pipelines to GCP IoT Core with BigQuery and Dataflow analytics. A serverless AWS backend (Lambda, DynamoDB, AppSync) handling 150+ concurrent writes at 0% throttle. Most recently, a telephony event pipeline delivering reliable call-lifecycle events to a product backend." },

  { id: 'frontend', keys: ['frontend', 'front end', 'front-end', 'react', 'ui', 'typescript', 'css', 'javascript', 'web', 'fullstack', 'full stack', 'full-stack'],
    a: "<b>Frontend:</b> React is where I started and I still ship it. At Hitachi I migrated an entire codebase from class components to <b>React Hooks, TypeScript and Material-UI v5</b>, then built and owned the centralized component library used as the single source of truth across the app. I tuned it too: code splitting, lazy loading, response caching and API batching to cut load times and memory. More recently, React 18 frontends for MemoMate and this portfolio, and the admin console at Circle, wired to real APIs." },

  { id: 'cloud', keys: ['cloud', 'aws', 'gcp', 'lambda', 'dynamodb', 's3', 'serverless', 'kubernetes'],
    a: "<b>Cloud and DevOps:</b> AWS (Lambda, DynamoDB, S3, CloudFront, ECR, EC2, EMR, Rekognition, Textract, SQS) and GCP (IoT Core, BigQuery, Dataflow). At Circle I replaced 100% manual deploys with a 9-stage GitLab CI pipeline shared across frontend and backend: secret detection, code quality, AI-assisted review, vulnerability scanning, versioned Docker image builds to ECR, gated multi-environment deploys, health checks and automated image cleanup." },

  { id: 'devops', keys: ['devops', 'ci/cd', 'ci cd', 'cicd', 'pipeline', 'deploy', 'deployment', 'release', 'jenkins', 'gitlab', 'infrastructure', 'docker', 'container'],
    a: "<b>DevOps and delivery:</b> At Circle I replaced 100% manual deploys with a 9-stage pipeline shared across frontend and backend: secret detection, code quality, AI-assisted code review, vulnerability scanning, versioned Docker image builds to <b>AWS ECR</b>, gated multi-environment deploys, post-deploy health checks and automated image cleanup. I also built <b>DevAssist</b>, which turns a Jira ticket and Figma design into convention-conforming code and opens the feature branch, cutting setup from hours to about 5 minutes. Both come from the same instinct as my Hitachi work, where I led the team that replaced daily manual SAP checks with a scheduled job (1000+ hours a year). Ask about <b>automation</b> for that thread." },

  { id: 'automation', keys: ['automation', 'sap', 'monitoring', 'alerting', 'man hours', 'man-hours', '1000 hours', 'saved time', 'operational', 'toil', 'repetitive'],
    a: "<b>Automating the boring parts</b> is a thread through my work: find the repetitive human step, turn it into a system.<br><br><b>At Hitachi:</b> engineers logged into each SAP system by hand, every day, to run the same health and query checks. Slow, repetitive, and easy to skip when busy, so issues sometimes sat unnoticed. Leading the in-house automation team, I replaced it with a scheduled Python and VBScript job that SSHes into every system, runs the checks unattended, and raises email and Slack alerts only when something is actually wrong. The manual pass disappeared (<b>1000+ hours a year</b>) and failures started surfacing on their own.<br><br><b>At Circle, same instinct, harder problem:</b> starting a feature meant reading the Jira ticket, opening the Figma design, and hand-scaffolding code to match project conventions. I built <b>DevAssist</b>, a pipeline that reads both and generates conforming code with prompt caching and LLM fallback, then opens the branch, taking setup from hours to about <b>5 minutes</b>. I also replaced manual deploys with a 9-stage CI/CD pipeline so releases stopped depending on someone remembering the steps." },

  { id: 'skills', keys: ['skills', 'stack', 'tools', 'tech', 'technologies', 'languages', 'programming'],
    a: "<b>Core stack:</b> Java, Python, JavaScript/TypeScript, SQL. React, Node.js, Express, FastAPI, Spring Boot, REST. LLM orchestration, prompt engineering, agentic AI, MCP. MongoDB, MySQL, PostgreSQL, Redis. AWS and GCP, Docker, GitLab CI/CD, Jenkins. Ask about <b>backend</b>, <b>frontend</b>, <b>ai</b>, <b>cloud</b> or <b>devops</b> for detail." },

  { id: 'experience', keys: ['experience', 'work', 'career', 'history', 'roles', 'job', 'hitachi', 'cognida'],
    a: "<b>Experience:</b> Circle Software, Full-Stack Software Engineer (2026 to present). Cognida.ai, AI Intern (2025). Hitachi Vantara, Software Engineer II to I to Intern (2019 to 2023), where I tuned REST APIs under concurrent load, modernized the React codebase, and led the in-house automation team that replaced daily manual SAP checks with a scheduled job, saving 1000+ hrs/yr. Ask about <b>automation</b> for that story. Full timeline: <a href='#experience'>#experience</a>." },

  { id: 'projects', keys: ['projects', 'built', 'portfolio', 'side project', 'case study', 'memomate', 'yogo'],
    a: "Highlights: <b>MemoMate</b>, an AI productivity platform on Gmail and Calendar with a multi-provider AI backend. <b>YoGo Social</b>, where I led 4 engineers on a serverless AWS backend with 96% sprint completion and a 1.8% defect rate. <b>PHP Dataset Pipeline</b>, 30K+ snippets through StarCoder via vLLM at 82.36% syntax validity. Plus a distributed <b>Driver License Extraction</b> pipeline on AWS. See <a href='#projects'>#projects</a>." },

  { id: 'education', keys: ['education', 'degree', 'school', 'university', 'njit', 'masters', 'gpa', 'college'],
    a: "<b>Education:</b> M.Sc. Computer Science, New Jersey Institute of Technology (3.9 GPA, 2024 to 2025). B.E. Computer Science, JNTU Hyderabad (2016 to 2020)." },

  { id: 'awards', keys: ['award', 'awards', 'recognition', 'honor', 'achievement', 'proud'],
    a: "<b>Recognition:</b> Hitachi <b>Bronze Award</b> for Outstanding Achievement (2023) and a Quarterly Performance Award for Innovation Excellence (2022), both for work on automation and platform reliability." },

  { id: 'different', keys: ['different', 'stand out', 'unique', 'special', 'best fit', 'strength'],
    a: "What's unusual is the <b>range held by one person</b>. I've shipped multi-threaded backend services, real-time data pipelines, cloud infrastructure, and production LLM systems, and I own them end to end, from design through CI/CD to deployment. I don't hand off the AI part or the ops part; I build both." },

  { id: 'contact', keys: ['contact', 'email', 'reach', 'linkedin', 'github', 'connect', 'available', 'hiring'],
    a: "<b>Get in touch:</b> <a href='mailto:sruthivellore99@gmail.com'>sruthivellore99@gmail.com</a> · <a href='https://linkedin.com/in/sruthi-vellore' target='_blank' rel='noopener'>LinkedIn</a> · <a href='https://github.com/sruthivellore' target='_blank' rel='noopener'>GitHub</a>." },

  { id: 'location', keys: ['location', 'based', 'where', 'relocation', 'remote', 'hybrid', 'availability'],
    a: "Based in <b>Jersey City, NJ</b>, open to remote or hybrid. Best way to start a conversation is <a href='mailto:sruthivellore99@gmail.com'>email</a> or <a href='https://linkedin.com/in/sruthi-vellore' target='_blank' rel='noopener'>LinkedIn</a>." },
]

const SUGGEST = ['whoami', 'why should I hire you', 'circle software', 'ai', 'backend', 'frontend', 'devops', 'projects', 'contact']

function answer(q) {
  const query = q.toLowerCase().trim()
  if (!query) return null
  if (query.startsWith('sudo')) return "Permission denied. Nice try. &#128274;"
  if (['hi', 'hello', 'hey'].includes(query)) return "Hey &#128075; ask me about Sruthi's work, or type <b>help</b>."
  if (query.includes('coffee')) return "&#9749; 418: I'm a teapot. (Sruthi runs on chai, though.)"
  if (query === 'help' || query === '?' || query === 'commands')
    return "Ask me about Sruthi. Try: <b>whoami</b>, <b>why should I hire you</b>, <b>circle software</b>, <b>ai</b>, <b>backend</b>, <b>frontend</b>, <b>cloud</b>, <b>devops</b>, <b>skills</b>, <b>experience</b>, <b>automation</b>, <b>projects</b>, <b>education</b>, <b>awards</b>, <b>contact</b>. Commands: <b>ls</b>, <b>clear</b>."
  if (query === 'ls')
    return "about.md  experience.log  circle/  ai/  backend/  frontend/  cloud/  projects/  skills.txt  contact.vcf"

  let best = null, bestScore = 0
  for (const e of KB) {
    let score = 0
    for (const k of e.keys) if (query.includes(k)) score += k.length
    query.split(/\s+/).forEach(w => {
      if (w.length > 2 && e.keys.some(kk => kk.includes(w))) score += 1
    })
    if (score > bestScore) { bestScore = score; best = e }
  }
  if (best && bestScore > 0) return best.a
  return "Not sure about that one. Type <b>help</b> for what I can answer, or ask about <b>backend</b>, <b>ai</b>, <b>cloud</b>, <b>projects</b>, or how to <b>contact</b> Sruthi."
}

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const [log, setLog] = useState([])
  const [value, setValue] = useState('')
  const greeted = useRef(false)
  const logRef = useRef(null)
  const inputRef = useRef(null)
  const typingRef = useRef(null)

  const push = useCallback((entry) => setLog(prev => [...prev, entry]), [])

  // typewriter for bot replies, preserving HTML tags
  const addBot = useCallback((html) => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const index = Date.now() + Math.random()
    if (reduce) { push({ kind: 'bot', html, id: index }); return }

    push({ kind: 'bot', html: '', id: index, typing: true })
    let i = 0, out = ''
    const tick = () => {
      if (i >= html.length) {
        setLog(prev => prev.map(l => l.id === index ? { ...l, html, typing: false } : l))
        return
      }
      if (html[i] === '<') { const j = html.indexOf('>', i); out += html.slice(i, j + 1); i = j + 1 }
      else { out += html[i]; i++ }
      setLog(prev => prev.map(l => l.id === index ? { ...l, html: out } : l))
      typingRef.current = setTimeout(tick, 6)
    }
    typingRef.current = setTimeout(tick, 6)
  }, [push])

  const run = useCallback((q) => {
    if (q.toLowerCase().trim() === 'clear') { setLog([]); greeted.current = false; return }
    push({ kind: 'user', text: q, id: Date.now() + Math.random() })
    const a = answer(q)
    if (a) setTimeout(() => addBot(a), 120)
  }, [push, addBot])

  // greet on first open
  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true
      push({ kind: 'sys', html: "sv-shell v1.0, type <b>help</b> or pick a topic:", id: 'sys' })
      addBot("Hi, I'm Sruthi's assistant. Ask me about her work, skills, or how to reach her.")
      push({ kind: 'chips', id: 'chips' })
    }
  }, [open, push, addBot])

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight }, [log])
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 80) }, [open])
  useEffect(() => () => clearTimeout(typingRef.current), [])

  // Esc to close, Ctrl/Cmd+K to toggle
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    const v = value
    setValue('')
    if (v.trim()) run(v)
  }

  return (
    <>
      <button
        id="sv-bot-toggle"
        aria-label="Open assistant"
        onClick={() => setOpen(o => !o)}
      >
        <span className="blip" /> ./ask-me
      </button>

      <div id="sv-bot" className={open ? 'open' : ''}>
        <div className="sv-bot-head">
          <span className="term-dot r" /><span className="term-dot y" /><span className="term-dot g" />
          <span className="term-title">sv-shell · ask about Sruthi</span>
          <button className="sv-bot-close" aria-label="Close" onClick={() => setOpen(false)}>×</button>
        </div>

        <div className="sv-bot-log" ref={logRef}>
          {log.map(l => {
            if (l.kind === 'user') return <div className="sv-line user" key={l.id}>{l.text}</div>
            if (l.kind === 'chips') return (
              <div className="sv-chips" key={l.id}>
                {SUGGEST.map(s => (
                  <span className="sv-chip" key={s} onClick={() => run(s)}>{s}</span>
                ))}
              </div>
            )
            return (
              <div
                className={`sv-line ${l.kind}`}
                key={l.id}
                dangerouslySetInnerHTML={{ __html: l.html + (l.typing ? "<span class='sv-cursor'></span>" : '') }}
              />
            )
          })}
        </div>

        <form className="sv-bot-form" onSubmit={submit} autoComplete="off">
          <span className="pmt">&gt;</span>
          <input
            ref={inputRef}
            className="sv-bot-input"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="ask me anything about Sruthi..."
            aria-label="Ask the assistant"
          />
        </form>
      </div>
    </>
  )
}
