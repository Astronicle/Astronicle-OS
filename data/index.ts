import type { Project, SkillCategory, Experience, Education, Certification, RecycleItem, WallpaperOption, DesktopIcon } from '@/types';

export const projects: Project[] = [
  {
    id: 'barze',
    name: 'Barze',
    description: 'A cross-platform desktop note-taking app with Markdown support, Bar Mode quick capture, and local file-based storage.',
    longDescription: 'Barze is a cross-platform desktop note-taking application built with Electron. It features local file-based storage with no cloud dependency, full Markdown support, and handles 5+ file types (MD, TXT, JSON, and more). The signature "Bar Mode" keeps a minimal always-on-top capture UI available at all times, making it perfect for multitasking developers.',
    features: [
      'Cross-platform desktop app via Electron',
      'Local file-based storage — no cloud required',
      'Markdown support with live preview',
      'Handles 5+ file types: MD, TXT, JSON, etc.',
      '"Bar Mode" — always-on-top quick capture UI',
      'Responsive interface optimized with Vite builds',
    ],
    architecture: 'Built with Electron for cross-platform desktop support, React + Tailwind CSS for the UI layer, and Vite for fast development builds. All data is stored locally using the file system — no backend or database needed. Bar Mode runs as a separate lightweight renderer process.',
    techStack: ['React', 'Electron', 'JavaScript', 'Vite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Astronicle/barze',
    color: '#6366f1',
    emoji: '📝',
  },
  {
    id: 'kachina',
    name: 'Kachina',
    description: 'A feature-rich Discord utility and automation bot with 10+ commands, slash commands, and AsyncIO-based task scheduling.',
    longDescription: 'Kachina is a full-featured Discord bot built for server utility and automation. It supports 10+ commands, rich embeds, and slash commands. An AsyncIO-based scheduling engine handles 100+ automated reminders and timed tasks. The bot includes real-time presence tracking and event-driven notifications, deployed via a Flask keep-alive server for continuous uptime.',
    features: [
      '10+ commands with slash command support',
      'Rich embeds and interactive responses',
      'AsyncIO scheduling for 100+ automated tasks',
      'Automated reminders and timed notifications',
      'Real-time presence tracking & event monitoring',
      'Flask keep-alive server for continuous uptime',
    ],
    architecture: 'Python-based Discord bot using the discord.py library with AsyncIO for concurrent task handling. Deployed on Render with a Flask-based keep-alive server to prevent cold starts. Environment-based configuration for secure token management. Event-driven architecture for user activity monitoring.',
    techStack: ['Python', 'Flask', 'Discord.py', 'AsyncIO', 'Render'],
    githubUrl: 'https://github.com/Astronicle/kachina',
    color: '#8b5cf6',
    emoji: '🤖',
  },
];

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    icon: '💻',
    color: '#6366f1',
    skills: [
      { name: 'Java', level: 90, icon: '☕' },
      { name: 'Python', level: 85, icon: '🐍' },
      { name: 'JavaScript', level: 88, icon: '🟡' },
      { name: 'TypeScript', level: 82, icon: '🔷' },
      { name: 'SQL', level: 80, icon: '🗄️' },
    ],
  },
  {
    category: 'Frontend',
    icon: '🎨',
    color: '#8b5cf6',
    skills: [
      { name: 'React', level: 88, icon: '⚛️' },
      { name: 'Next.js', level: 82, icon: '▲' },
      { name: 'Tailwind CSS', level: 90, icon: '🌊' },
      { name: 'Electron', level: 78, icon: '⚡' },
      { name: 'Vite', level: 80, icon: '🔥' },
    ],
  },
  {
    category: 'Backend & Frameworks',
    icon: '⚙️',
    color: '#ef4444',
    skills: [
      { name: 'Spring Boot', level: 85, icon: '🍃' },
      { name: 'Flask', level: 80, icon: '🌶️' },
      { name: 'REST APIs', level: 88, icon: '🔌' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    color: '#f59e0b',
    skills: [
      { name: 'AWS', level: 88, icon: '☁️' },
      { name: 'Docker', level: 82, icon: '🐳' },
      { name: 'Kubernetes', level: 72, icon: '☸️' },
    ],
  },
  {
    category: 'Tools',
    icon: '🔧',
    color: '#10b981',
    skills: [
      { name: 'Git', level: 92, icon: '🌿' },
      { name: 'GitHub', level: 90, icon: '🐙' },
      { name: 'Postman', level: 85, icon: '📮' },
      { name: 'DBeaver', level: 78, icon: '🦫' },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: 'fosscu',
    title: 'Member — FOSSCU-K',
    subtitle: 'Free & Open Source Community, Ghaziabad',
    period: '2024 – Present',
    description: 'Organized and contributed to 10+ technical seminars and workshops on modern tech stacks, improving peer learning and engagement for 100+ participants. Worked with the free and open-source community, enhancing skills in version control, collaboration, and code quality practices. Strengthened technical and problem-solving skills through continuous learning and practical implementation. Engaged in networking and knowledge sharing, building connections in a collaborative tech environment.',
    tags: ['Open Source', 'Git', 'GitHub', 'Workshops', 'Community', 'Collaboration'],
    icon: '🌍',
    color: '#10b981',
  },
];

export const education: Education[] = [
  {
    id: 'kiet',
    institution: 'KIET Group of Institutions',
    degree: 'Bachelor of Technology (B.Tech), Information Technology',
    period: '2024 – 2028',
    grade: '9.13',
    gradeLabel: 'Current CGPA',
    location: 'Ghaziabad, Uttar Pradesh',
    icon: '🎓',
    color: '#6366f1',
    coursework: ['Data Structures', 'Algorithms Analysis', 'Database Management', 'Web Technology', 'Computer Networks', 'Operating Systems'],
  },
  {
    id: 'cms-xii',
    institution: 'City Montessori School',
    degree: 'Class XII — ISC Board',
    period: '2023',
    grade: '98.25%',
    gradeLabel: 'Percentage',
    location: 'Lucknow, Uttar Pradesh',
    icon: '🏫',
    color: '#8b5cf6',
  },
  {
    id: 'cms-x',
    institution: 'City Montessori School',
    degree: 'Class X — ICSE Board',
    period: '2021',
    grade: '98.6%',
    gradeLabel: 'Percentage',
    location: 'Lucknow, Uttar Pradesh',
    icon: '🏫',
    color: '#ef4444',
  },
];

export const certifications: Certification[] = [
  {
    id: 'clf',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    date: 'November 2025',
    expires: 'May 2029',
    badgeColor: '#f59e0b',
    icon: '☁️',
    detail: 'Validated foundational knowledge of AWS cloud concepts, core services, security, pricing, and support.',
    credentialUrl: 'https://aws.amazon.com/certification/',
  },
  {
    id: 'aif',
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    date: 'December 2025',
    expires: 'December 2028',
    badgeColor: '#8b5cf6',
    icon: '🤖',
    detail: 'Validated foundational understanding of AI and ML concepts, including practical awareness of AWS AI services.',
    credentialUrl: 'https://aws.amazon.com/certification/',
  },
  {
    id: 'cop',
    name: 'AWS Certified CloudOps Engineer – Associate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'May 2026',
    expires: 'May 2029',
    badgeColor: '#3b82f6',
    icon: '⚙️',
    detail: 'Validated expertise in monitoring, logging, deployment automation, reliability, networking, security, and operational best practices on AWS.',
    credentialUrl: 'https://aws.amazon.com/certification/',
  },
  {
    id: 'dea',
    name: 'AWS Certified Data Engineer – Associate',
    issuer: 'Amazon Web Services (AWS)',
    date: 'May 2026',
    expires: 'May 2029',
    badgeColor: '#10b981',
    icon: '📊',
    detail: 'Validated expertise in data ingestion, transformation, data store management, operations, and governance on AWS.',
    credentialUrl: 'https://aws.amazon.com/certification/',
  },
];

export const recycleItems: RecycleItem[] = [
  {
    id: 'duoaxiom',
    name: 'DuoAxiom',
    deletedDate: 'March 12, 2025',
    icon: '🗑️',
    message: 'A project that was started but never really took off. It was supposed to be a flashcard based learning app, but I got distracted by other ideas and never got to completing it.',
  },
  {
    id: 'claude',
    name: 'Claude prompts.docx',
    deletedDate: 'January 5, 2025',
    icon: '🤖',
    message: 'Claude kinda dumb without proper supervision and prompt engineering',
  },
  {
    id: 'centering',
    name: 'How_To_Center_A_Div.txt',
    deletedDate: 'November 30, 2024',
    icon: '📄',
    message: '47 different attempts at centering a div. margin: auto, text-align: center, position: absolute... I now use flexbox. I am healed.',
  },
  {
    id: 'css',
    name: 'CSS_Nightmares_v6.css',
    deletedDate: 'September 14, 2024',
    icon: '🎨',
    message: 'Goddamn SIX versions. This file contained !important after !important in a desperate attempt to override Bootstrap.',
  },
];

export const wallpapers: WallpaperOption[] = [
  {
    id: 'space',
    name: 'Space Theme',
    gradient: 'radial-gradient(ellipse at 20% 50%, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #533483 100%)',
    preview: 'linear-gradient(135deg, #1a1a2e 0%, #533483 100%)',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    gradient: 'radial-gradient(ellipse at 80% 20%, #0d0d0d 0%, #1a0033 40%, #00001a 70%, #0d0d0d 100%)',
    preview: 'linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)',
  },
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
    preview: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
  },
  {
    id: 'dev-setup',
    name: 'Developer Setup',
    gradient: 'radial-gradient(ellipse at 50% 100%, #0d1117 0%, #101820 40%, #0d1117 100%)',
    preview: 'linear-gradient(135deg, #0d1117 0%, #238636 100%)',
  },
  {
    id: 'abstract-neon',
    name: 'Abstract Neon',
    gradient: 'radial-gradient(ellipse at 30% 70%, #03001e 0%, #1b1b2f 30%, #0f0c29 60%, #302b63 100%)',
    preview: 'linear-gradient(135deg, #f72585 0%, #7209b7 50%, #3a0ca3 100%)',
  },
];

export const desktopIcons: DesktopIcon[] = [
  { id: 'projects',       label: 'Projects',        icon: '📁', type: 'folder', action: 'projects' },
  { id: 'skills',         label: 'Skills',          icon: '📁', type: 'folder', action: 'skills' },
  { id: 'experience',     label: 'Experience',      icon: '📁', type: 'folder', action: 'experience' },
  { id: 'education',      label: 'Education',       icon: '📁', type: 'folder', action: 'education' },
  { id: 'certifications', label: 'Certifications',  icon: '📁', type: 'folder', action: 'certifications' },
  { id: 'contact',        label: 'Contact',         icon: '📁', type: 'folder', action: 'contact' },
  { id: 'resume',         label: 'Resume.pdf',      icon: '📄', type: 'file',   action: 'resume' },
  { id: 'leetcode',       label: 'LeetCode.url',    icon: '🟠', type: 'link',   action: 'link', url: 'https://leetcode.com/Astronicle78' },
  { id: 'github',         label: 'GitHub.url',      icon: '🐙', type: 'link',   action: 'link', url: 'https://github.com/Astronicle' },
  { id: 'linkedin',       label: 'LinkedIn.url',    icon: '🔵', type: 'link',   action: 'link', url: 'https://linkedin.com/in/astronicle78' },
  { id: 'terminal',       label: 'Terminal',        icon: '💻', type: 'app',    action: 'terminal' },
  { id: 'settings',       label: 'Settings',        icon: '⚙️', type: 'app',    action: 'settings' },
  { id: 'recycle-bin',    label: 'Recycle Bin',     icon: '🗑️', type: 'app',    action: 'recycle-bin' },
];
