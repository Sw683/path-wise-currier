import { PlacedJourney } from '../types';

export const MOCK_JOURNEYS: PlacedJourney[] = [
  {
    id: 'journey-1',
    studentName: 'Rohan Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80',
    targetCompany: 'Razorpay',
    companyLogo: '💳',
    role: 'Software Development Engineer - 1',
    packageBracket: '₹28 LPA - ₹34 LPA Tier',
    universityName: 'BITS Pilani (Pilani Campus)',
    branch: 'B.E. Computer Science',
    graduationYear: '2026',
    title: 'How I Prepared for My First Software Engineering Offer: A 3-Year Blueprint',
    storySummary: 'Starting college with zero competitive programming background, I focused on deep systems fundamentals, consistent problem solving, and building two high-concurrency microservices instead of dozens of cloned tutorial apps.',
    journeyStages: [
      {
        stage: 'Year 1: Foundations',
        duration: 'Months 1 - 12',
        focus: 'Mastered C++ and core OOP concepts. Completed 150 easy/medium problems on basic data structures (arrays, strings, linked lists, trees). Joined the campus coding society to find accountability partners.',
      },
      {
        stage: 'Year 2: Depth & Dev',
        duration: 'Months 13 - 24',
        focus: 'Learned Golang and web protocols (HTTP/2, WebSockets, gRPC). Built an open-source Redis clone. Started participating in weekend Codeforces rounds to improve debugging speed under timed pressure.',
      },
      {
        stage: 'Year 3: Internships & System Design',
        duration: 'Months 25 - 36',
        focus: 'Secured a summer software engineering internship. Studied database internals (WAL, B-Trees, isolation levels) and distributed patterns (caching, queue workers). Solved 200+ LeetCode Medium/Hard questions focusing on graphs and dynamic programming.',
      },
      {
        stage: 'Year 4: Interview Sprints & Placement',
        duration: 'Final Semester',
        focus: 'Conducted 15 peer mock interviews. Deep-dived into resume project walkthroughs with edge cases and latency trade-offs. Successfully cleared 4 rounds at Razorpay.',
      },
    ],
    preparationRoadmap: [
      'Data Structures: Arrays, HashMaps, Two Pointers, Sliding Window, Trees, Graphs, Disjoint Set Union',
      'Algorithms: BFS/DFS, Dijkstra, Dynamic Programming on Trees/Subsequences, Binary Search variations',
      'Computer Science Fundamentals: OS (Process vs Thread, Mutex, Virtual Memory), DBMS (Indexing, ACID, Normalization), Networks (TCP vs UDP, DNS, TLS Handshake)',
      'System Design: Load Balancers, Redis Caching Strategies, Message Queues (Kafka/RabbitMQ), Database Sharding',
    ],
    keySkillsLearned: ['Golang', 'C++', 'System Design', 'PostgreSQL Internals', 'Redis', 'Docker', 'Mock Interviewing'],
    topProjectsBuilt: [
      'FinShield: High-throughput transaction anomaly screener processing 10k mock events/sec',
      'GoMemCache: Distributed in-memory LRU key-value store with consistent hashing ring',
    ],
    interviewExperience: 'The technical rounds spent 25 minutes on low-level concurrency and database write locks using my GitHub project as the basis. Being able to defend why I picked PostgreSQL read replicas over NoSQL was the clincher.',
    mistakesAndLessons: [
      'Mistake: Doing random questions across 5 different websites without topic grouping. Lesson: Master one pattern (e.g. Sliding Window) for 4 days before switching.',
      'Mistake: Tutorial hell without deployment. Lesson: Deploying one project on a cheap VPS taught me 10x more about real errors, logs, and DNS than localhost.',
      'Mistake: Neglecting soft skills and behavioral stories. Lesson: The STAR method for teamwork and conflict resolution is critical for senior-level interviewers.',
    ],
    recommendedResources: [
      { title: 'Designing Data-Intensive Applications (Martin Kleppmann)', type: 'Book' },
      { title: 'NeetCode 150 DSA Pattern Guide', type: 'Curated Sheet' },
      { title: 'CS61B: Data Structures & Algorithms (UC Berkeley)', type: 'Video Course' },
      { title: 'ByteByteGo System Design Newsletter', type: 'Architecture Guide' },
    ],
    isVerified: true,
  },
  {
    id: 'journey-2',
    studentName: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
    targetCompany: 'Microsoft Research & AI Labs',
    companyLogo: '🤖',
    role: 'Research Intern (Applied AI & Multimodal)',
    packageBracket: '₹1.5 Lakhs / Month Stipend',
    universityName: 'IIT Delhi',
    branch: 'Computer Science & Engineering',
    graduationYear: '2027',
    title: 'Cracking a Top Tier AI Research Internship: From First Paper to Selection',
    storySummary: 'How pursuing academic curiosity, reproducibility studies of top NeurIPS papers, and open-source contribution to HuggingFace ecosystem paved the path to a top research lab.',
    journeyStages: [
      {
        stage: 'Exploration',
        duration: '1st Year',
        focus: 'Built solid math grounding in linear algebra, multivariable calculus, and probability. Wrote simple neural networks from scratch in NumPy without high-level frameworks.',
      },
      {
        stage: 'Research Projects',
        duration: '2nd Year',
        focus: 'Approached faculty for undergraduate research projects. Re-implemented attention mechanisms and published benchmarking results on Indic NLP benchmarks.',
      },
      {
        stage: 'Applications & Research Proposal',
        duration: '3rd Year',
        focus: 'Drafted a 2-page research interest statement focusing on low-compute multi-modal reasoning. Interviewed with principal researchers discussing model interpretability.',
      },
    ],
    preparationRoadmap: [
      'Deep Learning Theory: Backpropagation mathematics, Transformers, Diffusion, Quantization & Pruning',
      'Frameworks: PyTorch, HuggingFace Transformers, Accelerate, DeepSpeed',
      'Research Practice: Reading 2 papers/week, writing reproducibility logs, presenting at campus reading groups',
    ],
    keySkillsLearned: ['PyTorch', 'Model Quantization', 'Linear Algebra', 'Transformers', 'FastAPI', 'Latex & Research Writing'],
    topProjectsBuilt: [
      'IndicLingua-Agent: 11-language speech and lecture subtitle synthesis',
      'MiniTransformer: Step-by-step educational GPT implementation from raw tensors',
    ],
    interviewExperience: 'The interviews were conversational yet deeply theoretical. We spent an entire hour dissecting the mathematical trade-offs between FlashAttention and standard multi-head attention.',
    mistakesAndLessons: [
      'Mistake: Relying on pre-trained models as black boxes. Lesson: Writing the backward pass once by hand permanently clarifies how gradients flow.',
      'Mistake: Not reaching out to authors. Lesson: Writing respectful polite emails to authors with constructive questions frequently opens research collaboration doors.',
    ],
    recommendedResources: [
      { title: 'Neural Networks: Zero to Hero (Andrej Karpathy)', type: 'Video Series' },
      { title: 'Mathematics for Machine Learning (Deisenroth et al.)', type: 'Textbook' },
      { title: 'HuggingFace NLP Course', type: 'Hands-on Course' },
    ],
    isVerified: true,
  },
];
