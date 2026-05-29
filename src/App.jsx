import Navbar from './components/Navbar'
import Hero from './components/Hero'
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
  tagline: 'Building complete AI-powered products — from concept to production.',
  email: 'sruthivellore99@gmail.com',
  phone: '848-213-7659',
  location: 'Jersey City, NJ',
  linkedin: 'https://linkedin.com/in/sruthi-vellore',
  github: 'https://github.com/sruthivellore',

  skills: [
    { category: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Shell'] },
    { category: 'Frameworks', items: ['React', 'Node.js', 'Spring Boot', 'Gradio', 'Material-UI', 'REST'] },
    { category: 'AI / ML', items: ['LLM Orchestration', 'Prompt Engineering', 'Agentic AI', 'MCP', 'OpenAI Whisper', 'Intent Classification'] },
    { category: 'Databases', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Oracle', 'Hyperledger Fabric'] },
    { category: 'Cloud & DevOps', items: ['AWS (S3, ECR, EC2)', 'GCP', 'Docker', 'GitLab CI/CD', 'Jenkins', 'Trivy'] },
    { category: 'Integrations', items: ['Gmail API', 'Google Calendar', 'Zoom API', 'OAuth 2.0', 'Figma API', 'Jira API'] },
  ],

  experience: [
    {
      company: 'Circle Software',
      role: 'Full-Stack Software Engineer',
      period: 'Apr 2026 – Present',
      location: 'Boca Raton, FL',
      current: true,
      highlights: [
        'Built DevAssist: project-agnostic AI pipeline (Jira + Figma to conformant code) with confidence gating, prompt caching, and LLM fallback, cutting feature setup from hours to ~5 min',
        'Replaced 100% manual EC2 deployments with GitLab CI/CD across 4 environments; added Gitleaks, ESLint, Trivy gates; migrated frontend to AWS S3 + CloudFront',
        'Contributed to containerized case management platform with React, Node.js, MongoDB, Hyperledger Fabric via Docker Compose + Jenkins',
      ],
      tech: ['GitLab CI', 'React', 'Node.js', 'MongoDB', 'Docker', 'AWS', 'Jira API', 'Figma API'],
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
            'Led in-house automation team; responsible for SAP system monitoring, alert pipelines, and eliminating 1000+ hrs/yr of manual operational work',
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
      color: '#7c3aed',
    },
    {
      name: 'DevAssist',
      subtitle: 'AI Code Generation Pipeline',
      description: 'Production-grade GitLab CI pipeline: reads Jira + Figma, generates project-conformant code with confidence gating, prompt caching, delta detection, and LLM fallback. Auto-creates feature branch and posts Jira summary in ~5 min.',
      tech: ['GitLab CI', 'Node.js', 'Jira API', 'Figma API', 'LLM', 'Docker'],
      github: null,
      color: '#ec4899',
    },
    {
      name: 'YoGo Social',
      subtitle: 'Serverless Event Platform',
      description: 'Led 4-person team to deliver government-grade AWS serverless backend (Lambda, DynamoDB, AppSync/GraphQL, Cognito). 96% sprint completion, 1.8% defect rate, OWASP Top 10 compliant, 150+ concurrent DynamoDB writes at 0% throttle.',
      tech: ['AWS Lambda', 'DynamoDB', 'GraphQL', 'Cognito', 'TypeScript'],
      github: null,
      color: '#06b6d4',
    },
    {
      name: 'PHP Dataset Pipeline',
      subtitle: 'LLM Data Engineering',
      description: '3-phase pipeline generating PHP instruction-response datasets from 30K+ Hugging Face snippets. Tree-sitter + PHPStan filtering to 265 seeds; StarCoder via vLLM with 2000+ batched requests achieving 82.36% syntax validity.',
      tech: ['StarCoder', 'vLLM', 'Tree-sitter', 'PHPStan', 'Python'],
      github: 'https://github.com/sruthivellore',
      color: '#10b981',
    },
    {
      name: 'Driver License Extraction',
      subtitle: 'Distributed AWS Pipeline',
      description: 'Two-EC2 AWS pipeline: face detection via Rekognition on EC2-A, SQS FIFO coordination, structured text extraction via Textract on EC2-B. Supports parallel batch processing from S3.',
      tech: ['Java', 'AWS Rekognition', 'Textract', 'SQS FIFO', 'S3'],
      github: 'https://github.com/sruthivellore/DriverLicenseDetailsExtraction',
      color: '#f59e0b',
    },
    {
      name: 'Hand Gesture Mouse',
      subtitle: 'Computer Vision',
      description: 'Real-time virtual mouse using webcam hand tracking. Replaces physical mouse with two gestures: index finger raised moves the cursor, index + middle fingers pinched triggers a click. Built with OpenCV and MediaPipe.',
      tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
      github: 'https://github.com/sruthivellore/Real-Time-Hand-Gesture-Recognition-for-Mouse-Control',
      color: '#8b5cf6',
    },
    {
      name: 'CineCrate',
      subtitle: 'Full-Stack Movie Platform',
      description: 'Movie rental web app with real-time catalog from TMDB API, advanced search and filtering by genre/year/rating, user authentication, rental and return workflows, and a REST API backend. Deployed on Render with PostgreSQL.',
      tech: ['Django', 'PostgreSQL', 'REST API', 'TMDB API', 'Bootstrap'],
      github: 'https://github.com/sruthivellore/CineCrate',
      color: '#0ea5e9',
    },
    {
      name: 'Handwritten Character Recognition',
      subtitle: 'Deep Learning / OCR',
      description: 'OCR system recognizing handwritten English characters (A-Z, a-z, 0-9) using ANN and CNN on the EMNIST dataset (814K images, 62 classes). ANN achieved 85.2% test accuracy; CNN model trained with TensorFlow/Keras.',
      tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
      github: 'https://github.com/sruthivellore/HCR-Using-ANN',
      color: '#14b8a6',
    },
    {
      name: 'Energy Consumption Forecasting',
      subtitle: 'Distributed ML',
      description: 'Distributed energy consumption forecasting on Apache Spark (AWS EMR) using Gradient Boosted Tree regression. Containerized with Docker for reproducible deployment across environments.',
      tech: ['Apache Spark', 'AWS EMR', 'GBT Regression', 'Docker', 'Python'],
      github: 'https://github.com/sruthivellore/EnergyPredictSparkAWS',
      color: '#f97316',
    },
  ],

  education: [
    { school: 'New Jersey Institute of Technology', degree: 'M.Sc. Computer Science', period: '2024 – 2025', gpa: '3.9 / 4.0', flag: '🇺🇸' },
    { school: 'JNTU Hyderabad', degree: 'B.E. Computer Science', period: '2016 – 2020', gpa: '8.0 / 10', flag: '🇮🇳' },
  ],

  awards: [
    { title: 'Hitachi Bronze Award', detail: 'Outstanding Achievement', year: '2023' },
    { title: 'Quarterly Performance Award', detail: 'Innovation Excellence', year: '2022' },
  ],
}

export default function App() {
  return (
    <>
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
    </>
  )
}
