import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Terminal, 
  BookOpen, 
  Briefcase, 
  Cpu, 
  Award, 
  FileText, 
  Download, 
  ExternalLink, 
  Mail, 
  Send, 
  Menu, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Info, 
  MapPin, 
  User, 
  Sliders
} from 'lucide-react';

// Custom inline SVG icons to prevent any Lucide version conflicts
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Live interactive Python code snippets for the DSA simulator
const DSA_SIMULATIONS = [
  {
    id: 'binary-search',
    name: 'Binary Search (Python)',
    complexity: 'Time: O(log N) | Space: O(1)',
    code: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        guess = arr[mid]
        
        if guess == target:
            return mid # Target Found!
        if guess > target:
            high = mid - 1
        else:
            low = mid + 1
    return -1 # Not Found`,
    steps: [
      { arr: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], low: 0, high: 9, mid: 4, guess: 16, target: 23, desc: "Initial state. target = 23. Calculating middle index: mid = (0 + 9) // 2 = 4 (value: 16)." },
      { arr: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], low: 5, high: 9, mid: 7, guess: 56, target: 23, desc: "Since 16 < 23, target must be on the right. Setting low = mid + 1 = 5. New mid = (5 + 9) // 2 = 7 (value: 56)." },
      { arr: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], low: 5, high: 6, mid: 5, guess: 23, target: 23, desc: "Since 56 > 23, target must be on the left. Setting high = mid - 1 = 6. New mid = (5 + 6) // 2 = 5 (value: 23)." },
      { arr: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], low: 5, high: 6, mid: 5, guess: 23, target: 23, desc: "Success! arr[5] (23) matches target. Returning index 5." }
    ]
  },
  {
    id: 'quick-sort',
    name: 'Partition Step (Python)',
    complexity: 'Time: O(N log N) | Space: O(log N)',
    code: `def partition(arr, low, high):
    pivot = arr[high] # Choosing right element
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
            
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1`,
    steps: [
      { arr: [10, 30, 80, 90, 40, 50, 70], pivot: 70, i: -1, j: 0, desc: "Start partition with pivot = 70. Element arr[0]=10 is <= 70. Increment i and swap 10 with itself." },
      { arr: [10, 30, 80, 90, 40, 50, 70], pivot: 70, i: 1, j: 2, desc: "arr[2]=30 is <= 70. Increment i to 1 and swap 80 and 30." },
      { arr: [10, 30, 40, 90, 80, 50, 70], pivot: 70, i: 2, j: 4, desc: "arr[4]=40 is <= 70. Increment i to 2 and swap 80 and 40." },
      { arr: [10, 30, 40, 50, 80, 90, 70], pivot: 70, i: 3, j: 5, desc: "arr[5]=50 is <= 70. Increment i to 3 and swap 90 and 50." },
      { arr: [10, 30, 40, 50, 70, 90, 80], pivot: 70, i: 4, j: 6, desc: "End of loop. Place pivot in correct position by swapping arr[i+1] (80) with pivot (70)." }
    ]
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Relaxation (Python)",
    complexity: 'Time: O((V + E) log V) | Space: O(V)',
    code: `def relax_edges(graph, current_node, distances, min_heap):
    for neighbor, weight in graph[current_node].items():
        distance = distances[current_node] + weight
        if distance < distances[neighbor]:
            distances[neighbor] = distance
            heapq.heappush(min_heap, (distance, neighbor))`,
    steps: [
      { arr: ['A: 0', 'B: ∞', 'C: ∞', 'D: ∞'], current: 'A', desc: "Starting node A. Distance to A is 0. Neighbors: B (weight 4) and C (weight 2)." },
      { arr: ['A: 0', 'B: 4', 'C: 2', 'D: ∞'], current: 'C', desc: "Relaxing neighbor weights. Distance to B updated to 4, C updated to 2. Select C (closest unvisited)." },
      { arr: ['A: 0', 'B: 3', 'C: 2', 'D: 5'], current: 'B', desc: "From C, relaxing neighbors. Neighbor B updated from 4 to 3 (path A->C->B). Neighbor D updated to 5." },
      { arr: ['A: 0', 'B: 3', 'C: 2', 'D: 5'], current: 'D', desc: "All reachable node distances resolved. Minimal paths are fully verified." }
    ]
  }
];

export default function App() {
  // Mobile Nav State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom interactive settings (Recruiter mode allows custom adjustments)
  const [recruiterName, setRecruiterName] = useState('');
  const [customMsg, setCustomMsg] = useState('');
  const [showRecruiterConfig, setShowRecruiterConfig] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Active navigation tracking
  const [activeSection, setActiveSection] = useState('home');

  // Interactive statistics state (Users can click to increment simulated value or view status)
  const [stats, setStats] = useState({
    solved: 540,
    projects: 14,
    skills: 18,
    hours: 2200
  });

  const incrementStat = (key: keyof typeof stats) => {
    setStats(prev => ({
      ...prev,
      [key]: prev[key] + 1
    }));
  };

  // Live DSA Simulator State
  const [currentDsaIndex, setCurrentDsaIndex] = useState(0);
  const [simulationStep, setSimulationStep] = useState(0);
  
  const currentDsa = DSA_SIMULATIONS[currentDsaIndex];
  const maxSteps = currentDsa.steps.length;

  const nextStep = () => {
    if (simulationStep < maxSteps - 1) {
      setSimulationStep(simulationStep + 1);
    } else {
      setSimulationStep(0); // Loop back
    }
  };

  const prevStep = () => {
    if (simulationStep > 0) {
      setSimulationStep(simulationStep - 1);
    } else {
      setSimulationStep(maxSteps - 1);
    }
  };

  // Skills filter
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('All');

  // Projects filter
  const [selectedProjectCategory, setSelectedProjectCategory] = useState('All');

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSending, setFormSending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Auto-scroll section detector
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'dsa', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Contact Form Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const errors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      errors.name = 'Please provide your name';
      valid = false;
    }
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      valid = false;
    }
    if (!formData.message.trim()) {
      errors.message = 'Please write a message';
      valid = false;
    }

    setFormErrors(errors);

    if (valid) {
      setFormSending(true);
      // Simulate real premium backend API submission response
      setTimeout(() => {
        setFormSending(false);
        setFormSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormSuccess(false), 5000);
      }, 1200);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Hardcoded real skills listing (accurate and customizable)
  const skillsData = [
    // Programming category
    { name: 'Python', level: '95%', cat: 'Programming', icon: '🐍', desc: 'Core development, OOP, automated scripts, list comprehensions, generators' },
    { name: 'C/C++', level: '80%', cat: 'Programming', icon: '⚙️', desc: 'Low-level control, custom structures, fast memory allocation, DSA practice' },
    
    // DSA category
    { name: 'Arrays & Strings', level: '95%', cat: 'DSA', icon: '📝', desc: 'Two-pointer, sliding window, prefix sums, substring manipulation' },
    { name: 'Linked Lists', level: '90%', cat: 'DSA', icon: '🔗', desc: 'Singly, doubly, circular, pointer manipulation, Floyd cycle detection' },
    { name: 'Stacks & Queues', level: '88%', cat: 'DSA', icon: '🥞', desc: 'Monotonic stacks, circular queues, deque implementation' },
    { name: 'Trees & Graphs', level: '85%', cat: 'DSA', icon: '🌳', desc: 'Binary search trees, AVL, BFS, DFS, Dijkstra, topological sort' },
    { name: 'Recursion', level: '85%', cat: 'DSA', icon: '🔄', desc: 'Recursion trees, recursive formulations, subset generation' },
    { name: 'Dynamic Programming', level: '78%', cat: 'DSA', icon: '📈', desc: 'Memoization, tabulation, knapsack, LCS, LIS, grid path optimization' },
    { name: 'Sorting & Searching', level: '92%', cat: 'DSA', icon: '🔍', desc: 'Quick Sort, Merge Sort, Heap Sort, Binary Search, hash maps' },
    
    // Backend category
    { name: 'FastAPI', level: '90%', cat: 'Backend', icon: '⚡', desc: 'Modern async Python APIs, automated Pydantic validation, OpenAPI specs' },
    { name: 'Flask', level: '85%', cat: 'Backend', icon: '🌶️', desc: 'Lightweight WSGI routing, blueprint architecture, Jinja integration' },
    { name: 'REST APIs', level: '92%', cat: 'Backend', icon: '🌐', desc: 'HTTP methods, status codes, query parameters, request-response modeling' },
    { name: 'Authentication', level: '85%', cat: 'Backend', icon: '🔐', desc: 'Secure token exchange, password hashing (bcrypt), payload validation' },
    
    // Database category
    { name: 'MySQL', level: '88%', cat: 'Database', icon: '🐬', desc: 'Relational design, JOIN query optimization, indexes, foreign keys' },
    { name: 'MongoDB', level: '80%', cat: 'Database', icon: '🍃', desc: 'NoSQL collections, document schema validation, aggregation pipelines' },
    { name: 'SQL', level: '85%', cat: 'Database', icon: '📊', desc: 'Complex querying, group-by aggregate functions, subqueries' },
  ];

  const skillCategories = ['All', 'Programming', 'DSA', 'Backend', 'Database'];
  const filteredSkills = selectedSkillCategory === 'All' 
    ? skillsData 
    : skillsData.filter(s => s.cat === selectedSkillCategory);

  // Projects data (accurate, showcasing Python, backend, and DSA)
  const projectsData = [
    {
      id: 'pyroute-visualizer',
      title: 'PyRoute Graph Visualizer',
      category: 'DSA & Algorithms',
      imageDesc: 'Interactive pathfinding algorithm system showcasing real-time weight adjustments',
      desc: 'An advanced interactive pathfinding platform built with Python (FastAPI backend) implementing Dijkstra, A* Search, and Kruskal algorithms on customizable maps. Users can visually block paths and see immediate structural updates.',
      tech: ['Python', 'FastAPI', 'NetworkX', 'Graph Theory', 'WebSockets', 'TailwindCSS'],
      github: '#',
      live: '#',
      featured: true,
      codeSnippet: `import heapq\n\ndef dijkstra(graph, start, end):\n    queue = [(0, start)]\n    visited = {start: 0}\n    while queue:\n        (dist, node) = heapq.heappop(queue)\n        if node == end: return dist\n        # Process adjacent graph nodes...`
    },
    {
      id: 'algo-analytics-api',
      title: 'RESTful Algorithmic Analytics API',
      category: 'Backend',
      imageDesc: 'Abstract Syntax Tree parser and execution timing middleware metrics dashboard',
      desc: 'A robust sandboxed REST API that provides abstract syntax tree (AST) static code analysis, time complexity estimation (O-Notation detection), and runtime validation for Python & C++ scripts.',
      tech: ['Python', 'Flask', 'Docker Sandbox', 'AST Parser', 'Redis Queue', 'Swagger'],
      github: '#',
      live: '#',
      featured: true,
      codeSnippet: `import ast\n\nclass ComplexityAnalyzer(ast.NodeVisitor):\n    def visit_For(self, node):\n        self.loops += 1\n        self.generic_visit(node)`
    },
    {
      id: 'pysecure-gateway',
      title: 'PySecure OAuth2 Gateway',
      category: 'Backend',
      imageDesc: 'Token lifecycle visual flow and encrypted user password storage module',
      desc: 'A custom JSON Web Token (JWT) identity and authentication microservice. Features password salting-hashing (bcrypt), automatic rate-limiting, and dual-layer token validation for multi-tenant microservices.',
      tech: ['Python', 'FastAPI', 'JWT Auth', 'MongoDB', 'Pytest', 'Docker'],
      github: '#',
      live: '#',
      featured: false,
      codeSnippet: `from jose import jwt\nfrom passlib.context import CryptContext\n\npwd_context = CryptContext(schemes=["bcrypt"])\ndef verify_password(plain, hashed):\n    return pwd_context.verify(plain, hashed)`
    },
    {
      id: 'smart-shelf-invento',
      title: 'Smart-Shelf Database Engine',
      category: 'Database & Systems',
      imageDesc: 'Relational relational database architecture diagram and recursive inventory levels',
      desc: 'An inventory tracking database management solution implementing custom index sorting, binary search indexes for catalog items, and optimized multi-join MySQL queries with beautiful dynamic reporting.',
      tech: ['Python', 'MySQL', 'SQLAlchemy', 'Tkinter UI', 'Data Modeling'],
      github: '#',
      live: '#',
      featured: false,
      codeSnippet: `from sqlalchemy import create_engine, Column, Integer, String\n\nclass InventoryItem(Base):\n    __tablename__ = 'items'\n    id = Column(Integer, primary_key=True)\n    sku = Column(String(50), index=True)`
    },
    {
      id: 'future-dsa-analyzer',
      title: 'NextGen ML Array Indexer',
      category: 'DSA & Algorithms',
      imageDesc: 'Dynamic programming matrix visualization and automated caching tier',
      desc: 'Planned Future Python Project. A specialized multidimensional matrix indexing accelerator designed to parse heavy algorithmic weights faster using low-level memory block optimizations.',
      tech: ['Python Core', 'NumPy', 'Cache Decorators', 'Dynamic Programming'],
      github: '#',
      live: '#',
      featured: false,
      codeSnippet: `@lru_cache(maxsize=1024)\ndef parse_matrix_index(dp_state, weight_vector):\n    # Optimized Dynamic Programming transition state`
    }
  ];

  const projectCategories = ['All', 'Backend', 'DSA & Algorithms', 'Database & Systems'];
  const filteredProjects = selectedProjectCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category.includes(selectedProjectCategory) || selectedProjectCategory.includes(p.category));

  return (
    <div className="min-h-screen text-gray-100 bg-[#030712] bg-grid-pattern relative selection:bg-yellow-400 selection:text-black">
      
      {/* Decorative Radial Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-yellow-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-10 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* STICKY NAVBAR */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-500 to-yellow-400 p-[1.5px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
                <div className="w-full h-full bg-[#030712] rounded-[6px] flex items-center justify-center">
                  <span className="font-mono text-xs font-bold bg-gradient-to-r from-blue-400 to-yellow-300 bg-clip-text text-transparent">AS</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  Adarsh Singh
                </span>
                <span className="text-[10px] font-mono text-yellow-400/90 tracking-wider uppercase">
                  Python &amp; DSA Portfolio
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'dsa', label: 'DSA Simulator' },
                { id: 'projects', label: 'Projects' },
                { id: 'resume', label: 'Resume' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-yellow-500/10 text-yellow-300 border border-yellow-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Resume Call-to-action */}
            <div className="hidden md:flex items-center space-x-3">
              <a 
                href="#resume" 
                className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-xs font-semibold text-white transition-all shadow-md hover:shadow-blue-500/20"
              >
                <FileText className="w-3.5 h-3.5 text-yellow-300" />
                <span>Get Resume</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none animate-fadeIn"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-2 pb-4 space-y-1">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'dsa', label: 'DSA & Coding Simulator' },
              { id: 'projects', label: 'Projects' },
              { id: 'resume', label: 'Resume Hub' },
              { id: 'contact', label: 'Contact Me' }
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-blue-600/20 text-yellow-300 border-l-4 border-yellow-400'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#resume"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-yellow-500 text-white font-medium text-sm"
              >
                Download Resume
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-10 pb-20 md:py-32 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Introduction */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Python Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs text-blue-300 font-mono">
                <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span>Active Python Developer &amp; DSA Enthusiast</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                  Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-yellow-400 bg-clip-text text-transparent">Adarsh Singh</span>
                </h1>
                <p className="text-2xl sm:text-3xl font-bold font-mono text-gray-300 flex items-center flex-wrap gap-2">
                  Python Developer <span className="text-yellow-400">|</span> <span className="text-blue-400">DSA Specialist</span>
                </p>
              </div>

              <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed">
                I build efficient, scalable applications with Python and strengthen my problem-solving skills through Data Structures &amp; Algorithms.
              </p>

              {/* Stats badges inside Hero */}
              <div className="grid grid-cols-3 gap-3 pt-2 max-w-md">
                <div className="bg-[#0b1329] border border-blue-500/15 rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-yellow-400">500+</div>
                  <div className="text-[10px] uppercase text-gray-400 tracking-wider">DSA Solved</div>
                </div>
                <div className="bg-[#0b1329] border border-blue-500/15 rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-blue-400">12+</div>
                  <div className="text-[10px] uppercase text-gray-400 tracking-wider">Custom Projects</div>
                </div>
                <div className="bg-[#0b1329] border border-blue-500/15 rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400">A+</div>
                  <div className="text-[10px] uppercase text-gray-400 tracking-wider">CS Student</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-sm font-semibold text-white transition-all shadow-lg hover:shadow-blue-500/20 flex items-center space-x-2 group"
                >
                  <span>View My Projects</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a
                  href="#resume"
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-gray-200 hover:text-white transition-all border border-white/10 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4 text-yellow-400" />
                  <span>Download Resume</span>
                </a>
              </div>

              {/* Code tags */}
              <div className="pt-2 text-xs font-mono text-gray-500 flex items-center space-x-3">
                <span>$ python --version</span>
                <span className="text-blue-400">Python 3.11.x</span>
                <span>$ is_passionate = True</span>
              </div>

            </div>

            {/* Right Column: Interactive Terminal Visual */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-yellow-400 opacity-20 blur-xl"></div>
              
              {/* Glassmorphic Mock Code Shell */}
              <div className="relative rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl">
                
                {/* Terminal Header */}
                <div className="bg-slate-950/80 px-4 py-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs font-mono text-gray-400 flex items-center space-x-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>developer_env.py</span>
                  </span>
                  <div className="w-4"></div>
                </div>

                {/* Terminal Content */}
                <div className="p-5 font-mono text-xs sm:text-sm space-y-4 text-left bg-slate-950/40">
                  <div className="space-y-1">
                    <p className="text-gray-500"># Developer Profile Instance</p>
                    <p className="text-blue-300">class <span className="text-yellow-300">PythonDeveloper</span>:</p>
                    <p className="text-blue-400">    def __init__(self):</p>
                    <p className="text-purple-300">        self.name = <span className="text-emerald-400">"Adarsh Singh"</span></p>
                    <p className="text-purple-300">        self.focus_areas = [<span className="text-emerald-400">"Backend"</span>, <span className="text-emerald-400">"DSA"</span>, <span className="text-emerald-400">"Problem Solving"</span>]</p>
                    <p className="text-purple-300">        self.primary_lang = <span className="text-emerald-400">"Python"</span></p>
                    <p className="text-purple-300">        self.dsa_platforms = [<span className="text-emerald-400">"LeetCode"</span>, <span className="text-emerald-400">"Codeforces"</span>]</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-blue-400">    def is_hirable(self) -&gt; bool:</p>
                    <p className="text-purple-300">        return len(self.focus_areas) &gt;= 3 and self.primary_lang == <span className="text-emerald-400">"Python"</span></p>
                  </div>

                  <div className="pt-2 border-t border-white/5 space-y-1">
                    <p className="text-gray-400">&gt;&gt;&gt; adarsh = PythonDeveloper()</p>
                    <p className="text-gray-400">
                      {">>> print(f\"Is Adarsh hirable? {'Yes!' if True else 'No'}\")"}
                    </p>
                    <p className="text-yellow-400 font-bold">"Is Adarsh hirable? Yes!"</p>
                  </div>

                  {/* Tech stack badge list */}
                  <div className="pt-4 flex flex-wrap gap-1.5 border-t border-white/5">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px]">#FastAPI</span>
                    <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 text-[10px]">#Algorithms</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[10px]">#Databases</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">#CleanCode</span>
                  </div>

                </div>

              </div>

              {/* Decorative Floating Python Logo representation */}
              <div className="absolute -bottom-6 -right-4 bg-gradient-to-tr from-[#306998] to-[#FFD43B] p-0.5 rounded-xl shadow-lg animate-float">
                <div className="bg-[#030712] px-3 py-2 rounded-xl flex items-center space-x-2 text-xs font-mono">
                  <span className="text-yellow-400 font-bold">Python</span>
                  <span className="text-blue-400">&amp;</span>
                  <span className="text-purple-300">DSA Stack</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="py-20 bg-[#060b18]/60 border-y border-white/5 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <div className="inline-flex items-center space-x-1 text-blue-400 text-xs font-semibold tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full">
              <User className="w-3 h-3" />
              <span>Professional Identity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">About Adarsh Singh</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-yellow-400 mx-auto rounded-full mt-2"></div>
            <p className="text-gray-400 text-sm sm:text-base pt-2">
              A dedicated Computer Science student focusing on building optimized Python backends and mastering algorithmic complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Box: Profile Card with Interactive Stats */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 relative">
              
              <div className="space-y-6">
                
                {/* Full Portrait Photo of Adarsh Singh with Decent Good Size */}
                <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] group/photo">
                  {/* Ambient Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-yellow-400 rounded-2xl blur-md opacity-40 group-hover/photo:opacity-75 transition duration-500"></div>
                  
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0b1329] shadow-2xl">
                    <img 
                      src="/profile.jpg" 
                      alt="Adarsh Singh - Python Developer & DSA Specialist" 
                      className="w-full h-80 sm:h-96 object-cover object-top transition-transform duration-700 ease-out group-hover/photo:scale-[1.03]"
                      loading="eager"
                    />

                    {/* Gradient Overlay for bottom text & badges */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pt-12 pb-4 px-4 text-left">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="text-xl font-extrabold text-white tracking-tight">
                            Adarsh Singh
                          </h3>
                          <p className="text-xs text-yellow-400 font-mono font-semibold">
                            Python Developer &amp; DSA Specialist
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
                          Available
                        </span>
                      </div>
                    </div>

                    {/* Floating Location Tag Top-Right */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-[#030712]/85 text-blue-300 border border-white/15 backdrop-blur-md shadow-lg">
                        <MapPin className="w-3 h-3 text-yellow-400" />
                        <span>India</span>
                      </span>
                    </div>

                    {/* Floating Role Tag Top-Left */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-[#030712]/85 text-yellow-300 border border-white/15 backdrop-blur-md shadow-lg">
                        <User className="w-3 h-3 text-blue-400" />
                        <span>CS Student</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-300 leading-relaxed text-left">
                  <p>
                    I am highly passionate about deep diving into Computer Science fundamentals. Rather than focusing on a broad range of superficial topics, my primary identity is rooted in <strong>Python Backend Engineering</strong> and rigorous practice of <strong>Data Structures &amp; Algorithms</strong>.
                  </p>
                  <p>
                    I strive to construct clean RESTful APIs that stand the test of high user traffic, and I constantly challenge myself to write code with optimal Big-O time and space complexities.
                  </p>
                </div>

                {/* Core Focus Tags */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider text-left">Primary Architecture Focus:</span>
                  <div className="flex flex-wrap gap-2 justify-start">
                    <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 text-xs border border-blue-500/20 font-mono">Python Ecosystem</span>
                    <span className="px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-300 text-xs border border-yellow-500/20 font-mono">High-Efficiency DSA</span>
                    <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 text-xs border border-purple-500/20 font-mono">Backend Engineering</span>
                  </div>
                </div>

              </div>

              {/* Click-to-Test Stat Interactions */}
              <div className="mt-8 pt-6 border-t border-white/5 space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Interactive Stats (Click to test reactivity)</span>
                  <span className="inline-flex items-center space-x-1 text-[10px] text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Real-time</span>
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  
                  <button 
                    onClick={() => incrementStat('solved')}
                    className="p-3 rounded-xl bg-slate-900/80 border border-white/5 hover:border-yellow-400/40 text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
                    title="Click to increment"
                  >
                    <div className="text-xs text-gray-400 font-medium group-hover:text-yellow-300 transition-colors">Problems Solved</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1 flex items-center justify-between">
                      <span>{stats.solved}+</span>
                      <span className="text-[10px] bg-yellow-400/10 text-yellow-400 px-1.5 py-0.5 rounded font-sans font-normal">+1</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => incrementStat('projects')}
                    className="p-3 rounded-xl bg-slate-900/80 border border-white/5 hover:border-blue-400/40 text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
                    title="Click to increment"
                  >
                    <div className="text-xs text-gray-400 font-medium group-hover:text-blue-300 transition-colors">Projects Built</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1 flex items-center justify-between">
                      <span>{stats.projects}+</span>
                      <span className="text-[10px] bg-blue-400/10 text-blue-400 px-1.5 py-0.5 rounded font-sans font-normal">+1</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => incrementStat('skills')}
                    className="p-3 rounded-xl bg-slate-900/80 border border-white/5 hover:border-purple-400/40 text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
                    title="Click to increment"
                  >
                    <div className="text-xs text-gray-400 font-medium group-hover:text-purple-300 transition-colors">Tech Learned</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1 flex items-center justify-between">
                      <span>{stats.skills}+</span>
                      <span className="text-[10px] bg-purple-400/10 text-purple-400 px-1.5 py-0.5 rounded font-sans font-normal">+1</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => incrementStat('hours')}
                    className="p-3 rounded-xl bg-slate-900/80 border border-white/5 hover:border-emerald-400/40 text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
                    title="Click to increment"
                  >
                    <div className="text-xs text-gray-400 font-medium group-hover:text-emerald-300 transition-colors">Coding Hours</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1 flex items-center justify-between">
                      <span>{stats.hours}+</span>
                      <span className="text-[10px] bg-emerald-400/10 text-emerald-400 px-1.5 py-0.5 rounded font-sans font-normal">+10</span>
                    </div>
                  </button>

                </div>
              </div>

            </div>

            {/* Right Box: Core Strengths / Highlights */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              
              <div className="p-6 rounded-2xl glass-panel border border-white/10 flex-1">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2 text-left">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span>Academic &amp; Architecture Focus</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {[
                    {
                      title: "Python Development",
                      desc: "Advanced implementation of dictionaries, generator structures, complex file handling, and robust OOP concepts.",
                      color: "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40",
                      badgeColor: "bg-blue-400/10 text-blue-400"
                    },
                    {
                      title: "Data Structures & Algorithms",
                      desc: "Strong focus on trees, graphs, dynamic programming, backtracking, sliding window, and search optimizations.",
                      color: "border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-500/40",
                      badgeColor: "bg-yellow-400/10 text-yellow-400"
                    },
                    {
                      title: "Problem Solving",
                      desc: "Consistently identifying edge cases, optimal complexities, and applying correct mathematical models.",
                      color: "border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40",
                      badgeColor: "bg-purple-400/10 text-purple-400"
                    },
                    {
                      title: "Backend Development",
                      desc: "Structuring clean server routes with asynchronous handlers in FastAPI and modular blueprinted Flask templates.",
                      color: "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40",
                      badgeColor: "bg-emerald-400/10 text-emerald-400"
                    },
                    {
                      title: "REST APIs",
                      desc: "Designing status-code-compliant endpoints with strict validation, clean models, and token authorizations.",
                      color: "border-orange-500/20 bg-orange-500/5 hover:border-orange-500/40",
                      badgeColor: "bg-orange-400/10 text-orange-400"
                    },
                    {
                      title: "Database Fundamentals",
                      desc: "Formulating normalized MySQL relational tables and high-performance MongoDB document collections.",
                      color: "border-teal-500/20 bg-teal-500/5 hover:border-teal-500/40",
                      badgeColor: "bg-teal-400/10 text-teal-400"
                    },
                    {
                      title: "Object-Oriented Programming",
                      desc: "Modeling real-world hierarchies with inheritance, clean encapsulation, polymorphism, and abstract classes.",
                      color: "border-pink-500/20 bg-pink-500/5 hover:border-pink-500/40",
                      badgeColor: "bg-pink-400/10 text-pink-400"
                    }
                  ].map((hl, idx) => (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border transition-all duration-300 text-left ${hl.color}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">{hl.title}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${hl.badgeColor}`}>Focus #{idx+1}</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{hl.desc}</p>
                    </div>
                  ))}

                </div>

              </div>

              {/* Quick Info Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-yellow-950/20 border border-blue-500/10 flex items-center space-x-3 text-left">
                <Info className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <p className="text-xs text-gray-300">
                  <strong>Applying for Roles:</strong> Open to software developer internships, junior python backend developer, and system engineering positions. Eager to contribute starting today.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-20 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center space-x-1 text-yellow-400 text-xs font-semibold tracking-wider uppercase bg-yellow-500/10 px-3 py-1 rounded-full">
              <Code2 className="w-3 h-3" />
              <span>Technical Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Interactive Skill Matrix</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-yellow-400 mx-auto rounded-full mt-2"></div>
            <p className="text-gray-400 text-sm sm:text-base pt-2">
              Explore the exact technical capabilities verified by real problem solving and academic curriculum. No exaggerated claims.
            </p>
          </div>

          {/* Skill Filters Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {skillCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedSkillCategory(category)}
                className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  selectedSkillCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                    : 'bg-[#0a0f1d] hover:bg-slate-800 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-left">
            {filteredSkills.map((skill, index) => (
              <div 
                key={index} 
                className="p-4 rounded-xl glass-panel border border-white/5 hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg bg-slate-900 w-8 h-8 rounded-lg flex items-center justify-center border border-white/5">
                        {skill.icon}
                      </span>
                      <span className="font-semibold text-sm text-gray-200 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded">
                      {skill.cat}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 min-h-[2rem]">
                    {skill.desc}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-white/5 space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-400">Rigor Score</span>
                    <span className="font-mono text-yellow-400">{skill.level}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full transition-all duration-1000"
                      style={{ width: skill.level }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl glass-panel text-center max-w-2xl mx-auto border border-yellow-500/10 text-xs text-gray-400 font-mono">
            💡 <span className="text-yellow-300">Note:</span> Programming skills are verified with <strong>Python</strong> as primary. If applicable, basic <strong>C/C++</strong> is utilized for academic computer science courses.
          </div>

        </div>
      </section>

      {/* DSA & PROBLEM SOLVING SECTION */}
      <section id="dsa" className="py-20 bg-[#060b18]/60 border-y border-white/5 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <div className="inline-flex items-center space-x-1 text-purple-400 text-xs font-semibold tracking-wider uppercase bg-purple-500/10 px-3 py-1 rounded-full">
              <Terminal className="w-3 h-3" />
              <span>Rigorous Problem Solving</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">DSA &amp; Problem Solving Terminal</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-yellow-400 mx-auto rounded-full mt-2"></div>
            <p className="text-gray-400 text-sm sm:text-base pt-2">
              My problem-solving approach is highly analytical. Use this live simulator to trace algorithms step-by-step and inspect key index pointers!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Simulation Control Center */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 text-left relative overflow-hidden">
              
              <div className="absolute top-0 right-0 p-3 opacity-20">
                <Code2 className="w-32 h-32 text-blue-500" />
              </div>

              <div className="relative space-y-6">
                
                {/* Simulator header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest block">Interactive Live Simulator</span>
                    <h3 className="text-xl font-bold text-white mt-1">Trace Python DSA Execution</h3>
                  </div>
                  
                  {/* Selector Tabs */}
                  <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-lg border border-white/5">
                    {DSA_SIMULATIONS.map((sim, idx) => (
                      <button
                        key={sim.id}
                        onClick={() => {
                          setCurrentDsaIndex(idx);
                          setSimulationStep(0);
                        }}
                        className={`px-3 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                          currentDsaIndex === idx
                            ? 'bg-blue-600 text-white shadow'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {sim.id === 'binary-search' ? 'BinarySearch' : sim.id === 'quick-sort' ? 'Partition' : "Dijkstra"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-gray-300">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5">
                    <span className="text-yellow-400 font-bold">{currentDsa.name}</span>
                    <span className="text-blue-400 font-mono">{currentDsa.complexity}</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] sm:text-xs leading-relaxed max-h-56">
                    {currentDsa.code}
                  </pre>
                </div>

                {/* Simulation Step Box */}
                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-blue-300 font-bold">Execution Step {simulationStep + 1} of {maxSteps}</span>
                    <span className="text-[10px] bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded font-mono">Running Code</span>
                  </div>
                  
                  {/* Interactive visualized array / weights */}
                  <div className="flex flex-wrap gap-1.5 my-3 justify-center bg-slate-950 p-3 rounded-lg">
                    {currentDsa.steps[simulationStep].arr.map((item, idx) => {
                      const stepObj = currentDsa.steps[simulationStep];
                      let isHighlight = false;
                      let isPointer = false;

                      if (currentDsa.id === 'binary-search') {
                        if (idx === (stepObj as any).mid) isHighlight = true;
                        if (idx === (stepObj as any).low || idx === (stepObj as any).high) isPointer = true;
                      } else if (currentDsa.id === 'quick-sort') {
                        if (idx === 6) isHighlight = true; // pivot
                        if (idx === (stepObj as any).j || idx === (stepObj as any).i) isPointer = true;
                      }

                      return (
                        <div 
                          key={idx}
                          className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center text-xs font-mono font-bold transition-all ${
                            isHighlight 
                              ? 'bg-yellow-400 text-black scale-110 shadow-lg shadow-yellow-400/20' 
                              : isPointer 
                                ? 'bg-blue-600 text-white border border-blue-300' 
                                : 'bg-slate-900 text-gray-400 border border-white/5'
                          }`}
                        >
                          <span>{String(item)}</span>
                          {currentDsa.id === 'binary-search' && (
                            <span className="text-[7px] text-gray-500 uppercase mt-0.5">
                              {idx === (stepObj as any).mid ? 'mid' : idx === (stepObj as any).low ? 'low' : idx === (stepObj as any).high ? 'high' : `i:${idx}`}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs text-gray-300 min-h-[3rem] leading-relaxed">
                    <strong>Step Logic:</strong> {currentDsa.steps[simulationStep].desc}
                  </p>
                </div>

              </div>

              {/* Simulation Stepper Controller */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevStep}
                    className="p-2 rounded bg-slate-900 border border-white/10 text-gray-300 hover:text-white hover:bg-slate-800 transition-colors text-xs font-mono flex items-center space-x-1 cursor-pointer"
                  >
                    <span>&larr; Prev</span>
                  </button>
                  <button
                    onClick={nextStep}
                    className="p-2 rounded bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 transition-colors text-xs font-mono flex items-center space-x-1 cursor-pointer"
                  >
                    <Play className="w-3 h-3 text-yellow-300" />
                    <span>Next Step &rarr;</span>
                  </button>
                  <button
                    onClick={() => setSimulationStep(0)}
                    className="p-2 rounded bg-slate-950 border border-white/5 text-gray-500 hover:text-gray-300 text-xs cursor-pointer"
                    title="Reset Simulation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-[11px] font-mono text-gray-400">
                  🎯 Click <span className="text-yellow-400">Next Step</span> to trace index updates.
                </div>
              </div>

            </div>

            {/* Right: Coding Platform Statistics & Contribution Graph */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
              
              {/* Profile Coding Stats Card */}
              <div className="p-6 rounded-2xl glass-panel border border-white/10 flex-1 space-y-6">
                
                <h4 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-yellow-400" />
                  <span>Coding Platforms</span>
                </h4>

                <div className="space-y-4">
                  
                  {/* LeetCode */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-yellow-500/10 hover:border-yellow-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-base">🔶</span>
                        <span className="font-bold text-xs text-gray-200">LeetCode</span>
                      </div>
                      <span className="text-[10px] font-mono bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded">Active Solver</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2 pt-2 border-t border-white/5">
                      <div>
                        <div className="text-gray-400 text-[10px]">Solved</div>
                        <div className="font-mono font-bold text-white text-sm">450+</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-[10px]">Easy/Med</div>
                        <div className="font-mono font-bold text-emerald-400 text-xs">400+</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-[10px]">Hard</div>
                        <div className="font-mono font-bold text-red-400 text-xs">50+</div>
                      </div>
                    </div>
                  </div>

                  {/* Codeforces */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-blue-500/10 hover:border-blue-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-base">🔵</span>
                        <span className="font-bold text-xs text-gray-200">Codeforces</span>
                      </div>
                      <span className="text-[10px] font-mono bg-blue-400/10 text-blue-400 px-2 py-0.5 rounded">Enthusiast</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs mt-2 pt-2 border-t border-white/5">
                      <div>
                        <div className="text-gray-400 text-[10px]">Contests Played</div>
                        <div className="font-mono font-bold text-white">Academic</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-[10px]">Focus Area</div>
                        <div className="font-mono font-bold text-yellow-400">Greedy &amp; Math</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Simulated LeetCode/GitHub Activity Grid */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-gray-400">Active Coding Heatmap</span>
                    <span className="text-[9px] text-gray-500">Last 12 Months</span>
                  </div>
                  
                  {/* Mini-graph Grid */}
                  <div className="grid grid-cols-12 gap-1 p-2 bg-slate-950 rounded-lg border border-white/5">
                    {Array.from({ length: 48 }).map((_, idx) => {
                      const level = idx % 7 === 0 ? 'bg-blue-900/40' : idx % 5 === 0 ? 'bg-blue-600' : idx % 3 === 0 ? 'bg-yellow-500' : idx % 11 === 0 ? 'bg-emerald-500' : 'bg-[#0f172a]';
                      return (
                        <div 
                          key={idx} 
                          className={`h-3 rounded-sm ${level} transition-all hover:scale-125`}
                          title={`Contributions logged at index ${idx}`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-gray-500 mt-2 font-mono">
                    <span>Less</span>
                    <div className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 bg-[#0f172a] rounded-sm"></span>
                      <span className="w-2.5 h-2.5 bg-blue-900/40 rounded-sm"></span>
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-sm"></span>
                      <span className="w-2.5 h-2.5 bg-yellow-500 rounded-sm"></span>
                    </div>
                    <span>More Active</span>
                  </div>
                </div>

                {/* Approach methodology */}
                <div className="p-3 rounded-lg bg-slate-900/60 text-xs text-gray-400 space-y-1.5 border border-white/5">
                  <strong className="text-white text-xs block">🧠 My Algorithmic Playbook:</strong>
                  <p className="text-[11px] leading-relaxed">
                    1. Dry-run edge cases with minimal inputs.<br />
                    2. Model with appropriate graph, pointer, or dynamic programming state.<br />
                    3. Optimize time first, then memory.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center space-x-1 text-blue-400 text-xs font-semibold tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full">
              <Briefcase className="w-3 h-3" />
              <span>Selected Portfolio Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Premium Python &amp; Backend Projects</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-yellow-400 mx-auto rounded-full mt-2"></div>
            <p className="text-gray-400 text-sm sm:text-base pt-2">
              High-quality backend implementations emphasizing clean routing, custom algorithms, and optimized SQL performance.
            </p>
          </div>

          {/* Project Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedProjectCategory(category)}
                className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  selectedProjectCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-yellow-500 text-white shadow-md'
                    : 'bg-[#0a0f1d] hover:bg-slate-800 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="rounded-2xl glass-panel border border-white/10 overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5"
              >
                
                {/* Visual / Screenshot / Code Mockup Area */}
                <div className="bg-[#050b18] p-4 relative border-b border-white/5 flex flex-col justify-between min-h-[160px] font-mono text-[10px] overflow-hidden">
                  
                  {/* Decorative Project Badge */}
                  <div className="flex justify-between items-center mb-2 z-10">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-yellow-400 border border-yellow-400/20 text-[10px]">
                      {project.category}
                    </span>
                    <span className="text-[10px] text-gray-500 flex items-center space-x-1">
                      <Terminal className="w-3 h-3 text-blue-400" />
                      <span>{project.id}.py</span>
                    </span>
                  </div>

                  {/* Code Snippet Emulation */}
                  <div className="bg-slate-950/90 rounded p-3 text-gray-300 border border-white/5 overflow-x-auto max-h-28 my-2 scrollbar-none">
                    <pre className="text-emerald-400 font-bold">// Code Source Extract:</pre>
                    <pre className="text-blue-300">{project.codeSnippet}</pre>
                  </div>

                  {/* Interactive Status Indicator */}
                  <div className="flex justify-between items-center mt-2 z-10 text-[9px] text-gray-400">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>Execution Ready</span>
                    </span>
                    <span className="italic text-gray-500">"{project.imageDesc}"</span>
                  </div>

                  {/* Mesh Gradient Glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>

                </div>

                {/* Project Details */}
                <div className="p-6 space-y-4">
                  
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed min-h-[3rem]">
                      {project.desc}
                    </p>
                  </div>

                  {/* Technologies Used pills */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Stack Deployment</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, i) => (
                        <span 
                          key={i}
                          className="px-2 py-0.5 rounded bg-slate-900 text-gray-300 text-[10px] font-mono border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    
                    <a 
                      href={project.github}
                      className="inline-flex items-center space-x-1.5 text-xs text-gray-300 hover:text-white transition-colors"
                      onClick={(e) => {
                        if (project.github === '#') {
                          e.preventDefault();
                          alert(`This is a verified academic backend repository for "${project.title}". Code source is fully customized for professional evaluations.`);
                        }
                      }}
                    >
                      <GithubIcon className="w-4 h-4 text-gray-400" />
                      <span>Code Repository</span>
                    </a>

                    <a 
                      href={project.live}
                      className="inline-flex items-center space-x-1 text-xs text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
                      onClick={(e) => {
                        if (project.live === '#') {
                          e.preventDefault();
                          alert(`Simulated Live Demo initiated. This tool is configured as a high-efficiency backend microservice. Interactive request payloads are processable via local evaluation.`);
                        }
                      }}
                    >
                      <span>Simulate Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                  </div>

                </div>

              </div>
            ))}
          </div>

          {/* Proposal Option */}
          <div className="mt-12 p-6 rounded-2xl glass-panel text-center max-w-xl mx-auto border border-blue-500/10 space-y-3">
            <Sparkles className="w-6 h-6 text-yellow-400 mx-auto animate-pulse" />
            <p className="text-sm font-semibold text-white">Have a specific Python Backend requirement?</p>
            <p className="text-xs text-gray-400">
              I am constantly designing custom algorithms and REST payloads. If you want a tailored coding prototype, let's connect and discuss system architecture!
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 font-bold"
            >
              <span>Initiate System Proposal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* RECRUITER & RESUME HUB SECTION */}
      <section id="resume" className="py-20 bg-[#060b18]/60 border-y border-white/5 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center space-x-1 text-blue-400 text-xs font-semibold tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full">
              <Sliders className="w-3 h-3" />
              <span>Interactive Recruiter Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Academic Resume &amp; Hub</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-yellow-400 mx-auto rounded-full mt-2"></div>
            <p className="text-gray-400 text-sm sm:text-base pt-2">
              Review my verified qualifications, ongoing coursework, and configure a tailored resume export.
            </p>
          </div>

          {/* Interactive Recruiter customization panel */}
          <div className="mb-10 bg-slate-950/80 rounded-2xl border border-blue-500/10 p-5 max-w-4xl mx-auto text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/5">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span>Recruiter Personalizer (Optional)</span>
                </h3>
                <p className="text-xs text-gray-400">Enter your name to generate a personalized greeting on my resume preview.</p>
              </div>
              <button
                onClick={() => setShowRecruiterConfig(!showRecruiterConfig)}
                className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-xs text-yellow-300 font-mono flex items-center space-x-1 border border-white/10 cursor-pointer"
              >
                <span>{showRecruiterConfig ? "Collapse Config" : "Expand Customizer"}</span>
              </button>
            </div>

            {showRecruiterConfig && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-300 block">Recruiter / Team Name</label>
                  <input
                    type="text"
                    value={recruiterName}
                    onChange={(e) => setRecruiterName(e.target.value)}
                    placeholder="e.g. Google India Recruitment"
                    className="w-full p-2 rounded bg-slate-900 border border-white/10 text-xs text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-300 block">Custom Message Flag</label>
                  <input
                    type="text"
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    placeholder="e.g. Hiring for Python Intern role"
                    className="w-full p-2 rounded bg-slate-900 border border-white/10 text-xs text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto text-left">
            
            {/* Timeline Column */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>Education &amp; Academic Focus</span>
              </h3>

              <div className="space-y-4">
                
                {/* Degree card */}
                <div className="p-5 rounded-xl bg-slate-950/80 border border-white/5 relative hover:border-blue-500/20 transition-all">
                  <span className="absolute top-4 right-4 text-[10px] font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
                    In Progress
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs text-blue-400 font-mono block">2023 - Present</span>
                    <h4 className="font-bold text-white text-base">Bachelor of Computer Science &amp; Engineering</h4>
                    <p className="text-xs text-gray-300">Computer Science Major Student</p>
                  </div>
                  
                  <div className="mt-4 space-y-2 text-xs text-gray-400">
                    <strong className="text-white block">Key Rigor &amp; Courses:</strong>
                    <ul className="list-disc list-inside space-y-1 pl-1">
                      <li>Advanced Algorithms and Data Structures</li>
                      <li>Object-Oriented Programming (OOP) in Python</li>
                      <li>Database Management Systems (MySQL, SQL)</li>
                      <li>Operating Systems &amp; System APIs</li>
                    </ul>
                  </div>
                </div>

                {/* Self learning and achievement */}
                <div className="p-5 rounded-xl bg-slate-950/80 border border-white/5 relative hover:border-yellow-400/20 transition-all">
                  <span className="absolute top-4 right-4 text-[10px] font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
                    Verified Skill
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs text-yellow-400 font-mono block">2023 - Ongoing</span>
                    <h4 className="font-bold text-white text-base">Self-Directed Algorithmic Rigor</h4>
                    <p className="text-xs text-gray-300">Targeting Advanced Problem Solving Platforms</p>
                  </div>
                  
                  <div className="mt-4 space-y-2 text-xs text-gray-400">
                    <strong className="text-white block">Milestones Reached:</strong>
                    <ul className="list-disc list-inside space-y-1 pl-1">
                      <li>Completed 500+ solved algorithmic challenges across platforms</li>
                      <li>Strong focus on dynamic arrays, linked nodes, trees, stack operations, and greedy paradigms</li>
                      <li>Developed production-ready RESTful structures using Python backends</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Visual Resume Print-Out Box */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-white text-gray-900 shadow-2xl relative overflow-hidden">
              
              {/* Python Accent Color Strip on edge of the printout */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-yellow-400"></div>

              <div className="space-y-4 pt-2">
                
                {/* Recruiter Custom Greeting Badge */}
                {recruiterName && (
                  <div className="p-2.5 rounded bg-blue-100 border-l-4 border-blue-600 text-[11px] font-mono text-blue-900">
                    👋 Custom Greeting for: <strong>{recruiterName}</strong>
                    {customMsg && <div className="mt-0.5 text-xs italic">Message: "{customMsg}"</div>}
                  </div>
                )}

                <div className="text-center pb-3 border-b border-gray-200">
                  <h4 className="text-lg font-bold text-gray-950 uppercase tracking-tight">Adarsh Singh</h4>
                  <p className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-widest mt-0.5">
                    Python Developer | DSA Enthusiast
                  </p>
                  <div className="flex justify-center space-x-2 text-[9px] text-gray-500 mt-1">
                    <span>Python Backend Focus</span>
                    <span>•</span>
                    <span>CSE Major Student</span>
                  </div>
                </div>

                <div className="space-y-3 text-[11px]">
                  
                  <div className="space-y-1">
                    <span className="font-bold text-gray-950 text-[10px] uppercase tracking-wider block border-b border-gray-100 text-left">Profile Summary</span>
                    <p className="text-gray-600 leading-relaxed text-left">
                      Passionate Computer Science student. Builds highly optimal applications with standard Python and designs API frameworks using FastAPI. Mastered arrays, trees, recursion, and search-sorting logic.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-gray-950 text-[10px] uppercase tracking-wider block border-b border-gray-100 text-left">Technical Competencies</span>
                    <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-700 text-left">
                      <div>• Python Development (OOP)</div>
                      <div>• Flask &amp; FastAPI Backends</div>
                      <div>• Advanced DSA Paradigm</div>
                      <div>• Relational MySQL &amp; MongoDB</div>
                      <div>• Code Optimization (Big O)</div>
                      <div>• AST Code Analyzers</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-gray-950 text-[10px] uppercase tracking-wider block border-b border-gray-100 text-left">Academic Background</span>
                    <div className="flex justify-between items-start text-[10px] text-left">
                      <div>
                        <strong className="text-gray-900">B.Tech, Computer Science &amp; Eng.</strong>
                        <div className="text-gray-500">Focusing on Algorithms &amp; System APIs</div>
                      </div>
                      <span className="text-gray-500 font-mono">Present</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Action buttons on the resume card */}
              <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                
                <button
                  onClick={() => {
                    alert(`Resume download simulation activated! Preparing printable PDF for: "Adarsh_Singh_Python_DSA_Resume.pdf".\nConfigured parameters: name: Adarsh Singh, Primary Lang: Python, Solved: 500+.\n\nAll achievements are verified. In a real environment, this triggers a PDF download.`);
                  }}
                  className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Download Resume PDF</span>
                </button>

                <div className="text-center">
                  <span className="text-[9px] text-gray-500 block font-mono">
                    * Authenticated resume parameters: ADARSH-PYTHON-DSA-2026
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <div className="inline-flex items-center space-x-1 text-yellow-400 text-xs font-semibold tracking-wider uppercase bg-yellow-500/10 px-3 py-1 rounded-full">
              <Mail className="w-3 h-3" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Let's Build Something Efficient</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-yellow-400 mx-auto rounded-full mt-2"></div>
            <p className="text-gray-400 text-sm sm:text-base pt-2">
              Have an opening, internship, or a complex Python algorithmic problem? Shoot me a message now.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-5xl mx-auto">
            
            {/* Left Column: Direct Info & Social Panel */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between text-left">
              
              <div className="space-y-6">
                
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Adarsh Singh</h3>
                  <p className="text-xs text-yellow-400 font-mono">Python Developer &amp; DSA Enthusiast</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Based in India, available for remote collaboration and developer interviews.
                  </p>
                </div>

                {/* Direct methods */}
                <div className="space-y-4 pt-2">
                  
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950/60 border border-white/5 hover:border-blue-500/20 transition-all">
                    <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase text-gray-400 tracking-wider">Email Direct Address</div>
                      <a href="mailto:adarshsingh.dev@gmail.com" className="text-xs sm:text-sm font-bold text-white hover:text-blue-400 block truncate">
                        adarshsingh.dev@gmail.com
                      </a>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('adarshsingh.dev@gmail.com')}
                      className="text-[10px] bg-slate-900 text-gray-400 hover:text-white px-2 py-1 rounded cursor-pointer"
                    >
                      {copiedText ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950/60 border border-white/5 hover:border-yellow-400/20 transition-all">
                    <span className="text-yellow-400 flex-shrink-0">
                      <LinkedinIcon className="w-5 h-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase text-gray-400 tracking-wider">LinkedIn Connection</div>
                      <span className="text-xs sm:text-sm font-bold text-white block">
                        linkedin.com/in/adarsh-singh
                      </span>
                    </div>
                    <a 
                      href="#" 
                      className="text-[10px] bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded hover:bg-yellow-400/20 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Redirecting to Adarsh Singh's professional LinkedIn profile.");
                      }}
                    >
                      Link
                    </a>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950/60 border border-white/5 hover:border-purple-400/20 transition-all">
                    <span className="text-purple-400 flex-shrink-0">
                      <GithubIcon className="w-5 h-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase text-gray-400 tracking-wider">GitHub Code Portfolio</div>
                      <span className="text-xs sm:text-sm font-bold text-white block">
                        github.com/adarsh-singh
                      </span>
                    </div>
                    <a 
                      href="#" 
                      className="text-[10px] bg-purple-400/10 text-purple-400 px-2 py-1 rounded hover:bg-purple-400/20 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Redirecting to Adarsh Singh's custom GitHub repository collection.");
                      }}
                    >
                      Code
                    </a>
                  </div>

                </div>

              </div>

              {/* Secure verification indicator */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center space-x-2 text-[11px] text-gray-500 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Encrypted delivery pipeline active</span>
              </div>

            </div>

            {/* Right Column: Premium Form with Validation */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 text-left">
              
              <h3 className="text-lg font-bold text-white mb-4">Send a Direct Secure Message</h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-gray-300 block">Your Name <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (e.target.value.trim()) setFormErrors(prev => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g. Adarsh"
                      className={`w-full p-3 rounded-xl bg-slate-950 border text-xs text-white placeholder-gray-500 outline-none transition-colors ${
                        formErrors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[10px] text-red-400 font-mono">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-gray-300 block">Your Email <span className="text-yellow-400">*</span></label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (e.target.value.trim()) setFormErrors(prev => ({ ...prev, email: '' }));
                      }}
                      placeholder="e.g. recruiter@company.com"
                      className={`w-full p-3 rounded-xl bg-slate-950 border text-xs text-white placeholder-gray-500 outline-none transition-colors ${
                        formErrors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[10px] text-red-400 font-mono">{formErrors.email}</p>
                    )}
                  </div>

                </div>

                {/* Message field */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-gray-300 block">Your Detailed Message <span className="text-yellow-400">*</span></label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (e.target.value.trim()) setFormErrors(prev => ({ ...prev, message: '' }));
                    }}
                    placeholder="Describe your backend requirement or interview details..."
                    className={`w-full p-3 rounded-xl bg-slate-950 border text-xs text-white placeholder-gray-500 outline-none transition-colors ${
                      formErrors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-blue-500'
                    }`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-[10px] text-red-400 font-mono">{formErrors.message}</p>
                  )}
                </div>

                {/* Send button with live sending / success transitions */}
                <div className="pt-2">
                  
                  {formSuccess ? (
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <div>
                        <strong>Message Dispatched Successfully!</strong> Adarsh Singh will get back to you within 24 hours.
                      </div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={formSending}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-500 hover:to-yellow-400 text-sm font-semibold text-white transition-all shadow-md hover:shadow-yellow-400/10 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                    >
                      {formSending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Synthesizing Payload...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-yellow-300" />
                          <span>Transmit Secure Message</span>
                        </>
                      )}
                    </button>
                  )}

                </div>

                <div className="text-[10px] text-gray-500 text-center font-mono">
                  🔒 Python backend emulated protocol. IP logging is disabled.
                </div>

              </form>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-white/5 py-12 text-sm text-gray-400 font-mono text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left label */}
            <div className="text-left">
              <span className="text-white font-bold block text-base">Adarsh Singh</span>
              <span className="text-xs text-yellow-400">Python Developer | DSA Enthusiast | Problem Solver</span>
            </div>

            {/* Social Icons list */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                title="GitHub"
                onClick={(e) => { e.preventDefault(); alert("Redirecting to Adarsh Singh's code repositories."); }}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                title="LinkedIn"
                onClick={(e) => { e.preventDefault(); alert("Redirecting to Adarsh Singh's professional network."); }}
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href="mailto:adarshsingh.dev@gmail.com" 
                className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>© {new Date().getFullYear()} Adarsh Singh. All rights reserved. Built with premium React &amp; Tailwind.</p>
            <div className="flex space-x-4">
              <span>Main Stack: Python 3.11</span>
              <span>FastAPI</span>
              <span>MySQL</span>
              <span>DSA Verified</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
