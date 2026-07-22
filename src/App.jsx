import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BootSequence from './components/BootSequence'
import Assistant from './components/Assistant'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import EducationAwards from './components/EducationAwards'
import Footer from './components/Footer'

export const DATA = {
  name: 'Hemanth Sruthi Vellore',
  shortName: 'Sruthi',
  title: 'Full-Stack Software Engineer',
  tagline: 'Building complete AI-powered products, from concept to production.',
  email: 'sruthivellore99@gmail.com',
  phone: '848-213-7659',
  location: 'Jersey City, NJ',
  linkedin: 'https://linkedin.com/in/sruthi-vellore',
  github: 'https://github.com/sruthivellore',

  skills: [
    { category: 'Languages',        icon: '{ }', color: '#8b7cf6', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'SQL', 'Shell scripting'] },
    { category: 'Frameworks',       icon: '⚛',   color: '#4ad8ff', items: ['React', 'Node.js', 'Express', 'FastAPI', 'Spring Boot', 'Material-UI', 'Redux'] },
    { category: 'AI / ML',          icon: '🤖',  color: '#8b7cf6', items: ['LLM Orchestration', 'Prompt Engineering', 'Agentic AI', 'MCP', 'OpenAI Whisper', 'Intent Classification'] },
    { category: 'Databases',        icon: '🗄',  color: '#4ad8ff', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Oracle', 'Hyperledger Fabric'] },
    { category: 'Cloud & DevOps',   icon: '☁',  color: '#8b7cf6', items: ['AWS', 'GCP', 'Docker', 'GitLab CI/CD', 'Jenkins', 'Trivy'] },
    { category: 'Integrations',     icon: '🔌',  color: '#4ad8ff', items: ['FreeSWITCH', 'Twilio', 'socket.io', 'OAuth 2.0', 'Microsoft 365', 'Figma API', 'Jira API'] },
  ],

  experience: [
    {
      company: 'Circle Software',
      role: 'Full-Stack Software Engineer',
      period: 'Apr 2026 – Present',
      location: 'Boca Raton, FL',
      current: true,
      highlights: [
        'Telephony (Python/FastAPI, FreeSWITCH): extended an existing PBX service with call-queue and agent-status APIs, and hardened its event pipeline into a reliable contract for the backend, covering hold, transfer and call-outcome tracking across concurrent calls; added Twilio number provisioning scoped per tenant',
        'Backend (Node.js/TypeScript/MongoDB): shipped multi-tenant access control with per-action authorization enforced server-side, plus account and role management with tenant-scoped deletion, two-factor authentication, and single-use password-reset links',
        'Integrations: OAuth 2.0 email across Microsoft 365, Google Workspace and Gmail, and org-level campaign management with full lifecycle actions',
        'Frontend (React/MUI): built the admin console with permission-gated user and role administration, customer and campaign management, and account settings flows, using MUI DataGrid, Formik and Redux',
        'CI/CD: replaced 100% manual deploys with a 9-stage pipeline shared across frontend and backend, covering secret detection, code quality, AI-assisted review, vulnerability scanning, versioned image builds to ECR, gated multi-environment deploys and health checks',
        'Built DevAssist: project-agnostic AI pipeline (Jira + Figma to conformant code) with prompt caching and LLM fallback, cutting feature setup from hours to ~5 min',
      ],
      tech: ['Python', 'FastAPI', 'Node.js', 'TypeScript', 'React', 'MongoDB', 'PostgreSQL', 'FreeSWITCH', 'Twilio', 'Docker', 'AWS'],
    },
    {
      company: 'Cognida.ai',
      role: 'AI Intern',
      period: 'Jun 2025 – Sep 2025',
      location: 'USA',
      current: false,
      highlights: [
        'Built multi-provider AI assistant (Gmail, Outlook, Google Calendar, iCloud, Zoom) with LLM-powered email summarization, zero-shot intent classification, and multi-stage meeting scheduling',
        'Designed LLM-agnostic architecture (Groq, Gemini, Ollama); added voice I/O with OpenAI Whisper + gTTS; built MCP server prototype across 7 iterative cycles',
      ],
      tech: ['Python', 'Gradio', 'Groq', 'Gemini', 'OpenAI Whisper', 'OAuth 2.0', 'FastMCP'],
    },
    {
      company: 'Hitachi Vantara',
      role: 'Intern to Software Engineer II',
      period: 'Sep 2019 – Dec 2023',
      location: 'India',
      current: false,
      progression: [
        {
          role: 'Software Engineer II',
          period: 'Nov 2022 – Dec 2023',
          highlights: [
            'Owned backend API development and authentication using Redis and MySQL; responsible for query optimization and system reliability under peak load',
            'Led the in-house automation team: replaced daily manual per-system logins with a scheduled Python/VBScript job that SSHes into every SAP system, runs health and query checks unattended, and raises email and Slack alerts only on anomalies, removing 1000+ hrs/yr of manual work and surfacing failures without someone having to go looking',
          ],
        },
        {
          role: 'Software Engineer I',
          period: 'Nov 2020 – Nov 2022',
          highlights: [
            'Responsible for frontend codebase across all UI modules; owned migration from class components to React Hooks, TypeScript, and Material-UI v5',
            'Owned and maintained the centralized React component library used as the single source of truth across the application',
            'Responsible for frontend performance: code splitting, lazy loading, caching strategies, and API batching',
          ],
        },
        {
          role: 'Software Engineer Intern',
          period: 'Sep 2019 – Jan 2020',
          highlights: [
            'Developed a Java/Kura-based digital twin for fleet telematics simulation, responsible for streaming telemetry to GCP IoT Core',
            'Designed and built the analytics pipeline (BigQuery + Dataflow) for IIoT fleet monitoring and reporting',
          ],
        },
      ],
      tech: ['Java', 'Python', 'React', 'TypeScript', 'Redis', 'MySQL', 'GCP', 'BigQuery'],
    },
  ],

  projects: [
    {
      name: 'MemoMate',
      subtitle: 'AI Productivity Assistant',
      description: 'Full-stack platform integrating Gmail & Google Calendar. Read, compose, send, reply, and AI-draft emails; create meetings with Meet links; transcribe and summarize notes; extract tasks, all with a multi-provider AI backend (OpenAI, Gemini, Groq) and AES-256-GCM key storage.',
      tech: ['React 18', 'Node.js', 'MongoDB', 'Docker', 'AWS ECR', 'GitLab CI'],
      github: 'https://github.com/sruthivellore',
      color: '#8b7cf6',
    },
    {
      name: 'DevAssist',
      subtitle: 'AI Code Generation Pipeline',
      description: 'Production-grade GitLab CI pipeline: reads Jira + Figma, generates project-conformant code with confidence gating, prompt caching, delta detection, and LLM fallback. Auto-creates feature branch and posts Jira summary in ~5 min.',
      tech: ['GitLab CI', 'Node.js', 'Jira API', 'Figma API', 'LLM', 'Docker'],
      github: null,
      color: '#4ad8ff',
    },
    {
      name: 'YoGo Social',
      subtitle: 'Capstone · Serverless Event Platform',
      description: 'Led 4-person team to deliver government-grade AWS serverless backend (Lambda, DynamoDB, AppSync/GraphQL, Cognito). 96% sprint completion, 1.8% defect rate, OWASP Top 10 compliant, 150+ concurrent DynamoDB writes at 0% throttle.',
      tech: ['AWS Lambda', 'DynamoDB', 'GraphQL', 'Cognito', 'TypeScript'],
      github: null,
      color: '#8b7cf6',
    },
    {
      name: 'PHP Dataset Pipeline',
      subtitle: 'LLM Data Engineering',
      description: '3-phase pipeline generating PHP instruction-response datasets from 30K+ Hugging Face snippets. Tree-sitter + PHPStan filtering to 265 seeds; StarCoder via vLLM with 2000+ batched requests achieving 82.36% syntax validity.',
      tech: ['StarCoder', 'vLLM', 'Tree-sitter', 'PHPStan', 'Python'],
      github: 'https://github.com/sruthivellore',
      color: '#4ad8ff',
    },
    {
      name: 'Driver License Extraction',
      subtitle: 'Distributed AWS Pipeline',
      description: 'Two-EC2 AWS pipeline: face detection via Rekognition on EC2-A, SQS FIFO coordination, structured text extraction via Textract on EC2-B. Supports parallel batch processing from S3.',
      tech: ['Java', 'AWS Rekognition', 'Textract', 'SQS FIFO', 'S3'],
      github: 'https://github.com/sruthivellore/DriverLicenseDetailsExtraction',
      color: '#8b7cf6',
    },
    {
      name: 'Hand Gesture Mouse',
      subtitle: 'Computer Vision',
      description: 'Real-time virtual mouse using webcam hand tracking. Replaces physical mouse with two gestures: index finger raised moves the cursor, index + middle fingers pinched triggers a click. Built with OpenCV and MediaPipe.',
      tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
      github: 'https://github.com/sruthivellore/Real-Time-Hand-Gesture-Recognition-for-Mouse-Control',
      color: '#4ad8ff',
    },
    {
      name: 'CineCrate',
      subtitle: 'Full-Stack Movie Platform',
      description: 'Movie rental web app with real-time catalog from TMDB API, advanced search and filtering by genre/year/rating, user authentication, rental and return workflows, and a REST API backend. Deployed on Render with PostgreSQL.',
      tech: ['Django', 'PostgreSQL', 'REST API', 'TMDB API', 'Bootstrap'],
      github: 'https://github.com/sruthivellore/CineCrate',
      color: '#8b7cf6',
    },
    {
      name: 'Handwritten Character Recognition',
      subtitle: 'Deep Learning / OCR',
      description: 'OCR system recognizing handwritten English characters (A-Z, a-z, 0-9) using ANN and CNN on the EMNIST dataset (814K images, 62 classes). ANN achieved 85.2% test accuracy; CNN model trained with TensorFlow/Keras.',
      tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
      github: 'https://github.com/sruthivellore/HCR-Using-ANN',
      color: '#4ad8ff',
    },
    {
      name: 'Energy Consumption Forecasting',
      subtitle: 'Distributed ML',
      description: 'Distributed energy consumption forecasting on Apache Spark (AWS EMR) using Gradient Boosted Tree regression. Containerized with Docker for reproducible deployment across environments.',
      tech: ['Apache Spark', 'AWS EMR', 'GBT Regression', 'Docker', 'Python'],
      github: 'https://github.com/sruthivellore/EnergyPredictSparkAWS',
      color: '#8b7cf6',
    },
  ],

  education: [
    {
      school: 'New Jersey Institute of Technology',
      degree: 'M.Sc. Computer Science',
      period: '2024 – 2025',
      gpa: '3.9 / 4.0',
      flag: '🎓',
      location: 'Newark, NJ',
      courses: ['Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'Data Structures & Algorithms', 'Cloud Computing', 'Data Management Systems', 'Web Systems Development', 'Internet Protocols'],
    },
    {
      school: 'JNTU Hyderabad',
      degree: 'B.E. Computer Science',
      period: '2016 – 2020',
      gpa: '8.0 / 10',
      flag: '📚',
      location: 'Hyderabad, India',
      courses: ['Design & Analysis of Algorithms', 'Operating Systems', 'Object-Oriented Programming', 'Cryptography & Network Security', 'Data Mining', 'Computer Networks', 'Formal Languages & Automata', 'Compiler Design'],
    },
  ],

  awards: [
    { title: 'Hitachi Bronze Award', detail: 'Outstanding Achievement', year: '2023' },
    { title: 'Quarterly Performance Award', detail: 'Innovation Excellence', year: '2022' },
  ],
}

export default function App() {
  return (
    <>
      <BootSequence />
      <div className="blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <EducationAwards />
      </main>
      <Footer />
      <Assistant />
    </>
  )
}
