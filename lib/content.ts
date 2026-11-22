/** All copy lives here, not in JSX. */

export const links = {
  email: "varunsit01@gmail.com",
  github: "https://github.com/varuns636",
  linkedin: "https://www.linkedin.com/in/varuns636/",
  resume: "/varun-s-resume.pdf",
} as const;

export const profile = {
  name: "Varun",
  fullName: "Varun S",
  greeting: "Hello, I'm",
  tagline: "I build AI voice agents, RAG systems and privacy-first apps that run on local LLMs.",
  meta: [
    { k: "File", v: "VS / CSE / 05" },
    { k: "Inst", v: "Acharya Institute of Technology" },
    { k: "Loc", v: "Bengaluru, IN" },
  ],
  footnote: "5th sem / CSE / VTU",
} as const;

export const heroActions = [
  { code: "01", label: "View case files", href: "#projects" },
  { code: "02", label: "Open channel", href: "#contact" },
] as const;

/* ---------------------------------------------------------------- ABOUT */

export const about = {
  title: "Engineer by training. Builder by habit.",
  bio: [
    "I'm a Computer Science Engineering student at Acharya Institute of Technology, Bengaluru (VTU), currently in my 5th semester.",
    "Most of what I build sits where AI meets real constraints: a phone's memory, a hackathon deadline, a shelter that can't accept the wrong food.",
    "I care about privacy as much as capability, which is why so much of my work runs locally. Small models, honest answers, interfaces that stay out of the way.",
    "Right now I'm looking for internships where I can ship real things with a real team.",
  ],
  record: [
    { k: "Degree", v: "B.E. Computer Science & Engineering, 2024 to 2028" },
    { k: "Institute", v: "Acharya Institute of Technology, Bengaluru / VTU" },
    { k: "Languages", v: "English, Kannada, Hindi, Tamil" },
  ],
} as const;

export const recognition = [
  { date: "Nov 2026", title: "First place, Build With Sarvam", where: "24-hour AI hackathon, Vertex Club, REVA University. With Jodi, won Rs 13,000 in Sarvam API credits", tag: "Winner" },
  { date: "Sep 2026", title: "Best Team, Best Innovation", where: "Smart India Hackathon 2026, internal round, AIT. With BIS Assistant", tag: "Winner" },
  { date: "Nov 2026", title: "Code for INNOVEX '26", where: "24-hour national-level hackathon, NSS IT Wing, NMAMIT, at Nitte University, Mangaluru. Jan Setu track, built SETUNEX", tag: "Hackathon" },
  { date: "Oct 2026", title: "National Level Hackathon 3.0", where: "\"Innovate for Impact\", R R Institute of Technology, Bengaluru", tag: "Hackathon" },
  { date: "Oct 2026", title: "Cyber Sante: A week for Cyber Security", where: "Department of CSE, AIT, with Lakshya Student Forum", tag: "Event" },
  { date: "Jun 2025", title: "Ctrl + Alt + Compete", where: "Hackathon, RV College of Engineering, with IETE, IEEE Bangalore Section, IEEE SPS and IEEE CTSoc. Lead sponsor Synaptics", tag: "Hackathon" },
  { date: "May 2025", title: "Second place, Quantum Qriosity", where: "Quiz competition, Department of Physics, AIT", tag: "2nd place" },
  { date: "Mar 2025", title: "Promptathon 2025", where: "Simba GPT, Acharya AI Fest 2025, with IVIS Labs", tag: "Hackathon" },
  { date: "Mar 2025", title: "Build for Bengaluru", where: "12-hour hackathon, Sri Krishna Institute of Technology, with IEEE Bangalore Section", tag: "Hackathon" },
  { date: "2025", title: "Ignite O(1)", where: "Competition, Department of AI & ML, AIT", tag: "Competition" },
] as const;

/* ------------------------------------------------------------- PROJECTS */

export type Project = {
  slug: string;
  title: string;
  kind: string;
  status: string;
  oneLiner: string;
  summary: string;
  points: readonly string[];
  stack: readonly string[];
  links: readonly { label: string; href: string }[];
};

export const projects: readonly Project[] = [
  {
    slug: "jodi",
    title: "Jodi",
    kind: "AI voice agent / HealthTech",
    status: "1st place, Build With Sarvam",
    oneLiner: "A 42-day voice care companion for mothers and newborns after childbirth.",
    summary:
      "Built in 24 hours at REVA University with team Return 0. Jodi calls the family on any phone, even a keypad phone, in Kannada first. Everyday speech becomes clinical facts, fixed rules flag mother and baby together as green, amber or red, and a red flag stays open until a human confirms they were reached.",
    points: [
      "Sarvam Voice Agent with Saaras speech-to-text, Bulbul v4 speech and mid-call tools",
      "Sarvam-105B structured outputs turn \"four cloths since morning\" into pads soaked = 4",
      "Versioned clinical rules, not AI, decide every red or amber flag",
      "Escalation tickets alert the family and the ASHA and close only when a human confirms contact",
      "Every record entry carries a source label and sits in a tamper-evident hash chain",
    ],
    stack: ["Python", "FastAPI", "SQLModel", "APScheduler", "React", "TypeScript", "Sarvam AI"],
    links: [{ label: "Source", href: "https://github.com/varuns636/jodi" }],
  },
  {
    slug: "setunex",
    title: "SETUNEX",
    kind: "GovTech / Web",
    status: "Code for INNOVEX '26",
    oneLiner: "A guided path through Karnataka government services, in Kannada or English.",
    summary:
      "Built in 24 hours for the Jan Setu track. Citizens find the services they can get, the documents they need and the exact steps to apply. Rules decide eligibility and every rule shows its official source. AI only explains, and blockers become steps instead of dead ends.",
    points: [
      "Tap-to-answer screening on a JSON rules engine, each rule with its source and review date",
      "Document upload with Tesseract OCR flags missing, expired or mismatched documents",
      "NetworkX dependency graph orders what to get first, like an income certificate before a scholarship",
      "Kannada voice through Sarvam AI. Gemini explains from verified guide passages but never decides eligibility",
      "Grievance filing with a reference ID and status timeline",
    ],
    stack: ["Python", "FastAPI", "React", "Vite", "SQLite", "NetworkX", "Tesseract OCR", "Sarvam AI", "Gemini API"],
    links: [
      { label: "Live demo", href: "https://setunex.vercel.app" },
      { label: "Source", href: "https://github.com/varuns636/SETUNEX" },
    ],
  },
  {
    slug: "annarelay",
    title: "AnnaRelay",
    kind: "AI voice agent / Web",
    status: "Hackathon",
    oneLiner: "Routes restaurant surplus food to shelters before it spoils.",
    summary:
      "Restaurants and shelters send voice notes in mixed languages. An LLM turns them into structured offers and needs, then AnnaRelay picks the collector most likely to show up and puts a backup on standby before anyone drops out.",
    points: [
      "LLM extracts quantities, times and diet constraints from free-form voice notes",
      "Bayesian reliability with Thompson sampling chooses the collector",
      "Risk model calls a backup before a dropout, not after",
      "Deadlines, food-safety windows and diet rules stay in plain, tested code",
    ],
    stack: ["TypeScript", "Next.js", "Express", "SQLite", "LLMs", "Telegram bot"],
    links: [{ label: "Source", href: "https://github.com/varuns636/AnnaRelay" }],
  },
  {
    slug: "bis-assistant",
    title: "BIS Standards Assistant",
    kind: "RAG / Local LLM",
    status: "SIH 2026 Best Innovation",
    oneLiner: "Answers questions about Indian Standards, cited to document and page.",
    summary:
      "A retrieval-augmented chatbot over Bureau of Indian Standards documents. Answers are grounded in the source PDFs and cite the document name and page. Runs fully locally: Gemma 3 4B through Ollama, no API key.",
    points: [
      "Ingestion recovers titles, IS numbers and document type from each PDF's heading",
      "Skips scanned or duplicate files with a reason and reports what was not searched",
      "Hybrid BM25 + vector search over ChromaDB",
      "Streamlit front end on a FastAPI backend, with multilingual input and speech",
    ],
    stack: ["Python", "FastAPI", "Streamlit", "LangChain", "ChromaDB", "Ollama", "Gemma 3 4B"],
    links: [{ label: "Source", href: "https://github.com/varuns636/bis-chatbot" }],
  },
  {
    slug: "vamb",
    title: "Vamb",
    kind: "Android / On-device AI",
    status: "In development",
    oneLiner: "A privacy-first voice assistant that thinks entirely on your phone.",
    summary:
      "Runs Qwen3-1.7B (GGUF, Q4_K_M) on the phone's CPU through llama.cpp. A deterministic brain handles common intents first; the local model is a fallback behind a strict-JSON safety gate. Zero bytes of your voice leave the device.",
    points: [
      "Model loads only for a request and unloads right after",
      "Inference guard stops the model when device limits are hit",
      "Calls and messages always need a spoken confirmation",
      "Local memory in Room that refuses to store passwords, PINs or card details",
    ],
    stack: ["Kotlin", "Jetpack Compose", "llama.cpp", "Qwen3-1.7B", "Room", "Android Speech"],
    links: [],
  },
  {
    slug: "audiosync",
    title: "AudioSync",
    kind: "Android / Audio",
    status: "v1.0.0 released",
    oneLiner: "One system-wide equalizer for every app, switched per output device.",
    summary:
      "A 10-band EQ (31 Hz to 16 kHz, ±12 dB) built on a single DynamicsProcessing effect on the global output mix, so YouTube, Spotify and browsers all pass through it without root. No internet permission.",
    points: [
      "Separate profiles for speaker, Bluetooth and wired outputs",
      "Switches automatically when the audio route changes",
      "Never guesses when the route is ambiguous",
    ],
    stack: ["Kotlin", "Jetpack Compose", "MVVM", "StateFlow", "Android Audio APIs"],
    links: [
      { label: "Download APK", href: "https://github.com/varuns636/AudioSync/releases/latest" },
      { label: "Source", href: "https://github.com/varuns636/AudioSync" },
    ],
  },
  {
    slug: "cinebook",
    title: "CineBook",
    kind: "Web / DBMS",
    status: "Mini project",
    oneLiner: "Movie ticket booking system in PHP and MySQL.",
    summary:
      "DBMS mini project covering shows, seats, customers and bookings, with a MySQL database behind a PHP front end.",
    points: ["Show, seat, customer and booking management", "Relational schema designed for the DBMS course"],
    stack: ["PHP", "MySQL"],
    links: [{ label: "Source", href: "https://github.com/varuns636/dbms-project" }],
  },
];


/* ---------------------------------------------------------------- STACK */

export const stackGroups = [
  {
    code: "AI_ML",
    name: "AI & ML",
    note: "On-device LLMs, RAG pipelines, agents, Bayesian decision models.",
    items: ["llama.cpp", "Ollama", "LangChain", "ChromaDB", "Sentence-Transformers", "LLM APIs"],
  },
  {
    code: "MOBILE",
    name: "Mobile",
    note: "Native Android, audio internals, background services, local storage.",
    items: ["Kotlin", "Jetpack Compose", "Material 3", "Coroutines", "Room"],
  },
  {
    code: "WEB",
    name: "Web & Backend",
    note: "Full-stack apps, typed APIs, realtime sockets and bots.",
    items: ["TypeScript", "Next.js", "React", "Node.js", "Express", "FastAPI", "Streamlit", "Tailwind CSS"],
  },
  {
    code: "CORE",
    name: "Foundations",
    note: "Data structures, databases, systems programming, security basics.",
    items: ["Python", "C", "C++", "Java", "SQL", "PHP", "Git"],
  },
] as const;

export const techCount = stackGroups.reduce((n, g) => n + g.items.length, 0);

/* ---------------------------------------------------------------- STATS */

export const stats = [
  { value: projects.length, decimals: 0, suffix: "", label: "Case files on record" },
  { value: techCount, decimals: 0, suffix: "", label: "Technologies in the stack" },
  { value: recognition.length, decimals: 0, suffix: "", label: "Hackathons, contests & events" },
] as const;

/* -------------------------------------------------------------- CONTACT */

export const contact = {
  title: "Let's build something careful.",
  note: "Open to internships, research and collaborations in AI and software engineering.",
  channels: [
    { code: "01", k: "Email", v: links.email, href: `mailto:${links.email}`, external: false },
    { code: "02", k: "GitHub", v: "github.com/varuns636", href: links.github, external: true },
    { code: "03", k: "LinkedIn", v: "linkedin.com/in/varuns636", href: links.linkedin, external: true },
    { code: "04", k: "Résumé", v: "varun-s-resume.pdf", href: links.resume, external: true },
  ],
} as const;
