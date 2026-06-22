'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import React from 'react';
import { useWindowStore } from '@/store/windowStore';

interface Line {
  type: 'input' | 'output' | 'error' | 'success' | 'ascii' | 'dim' | 'title' | 'subtitle';
  content: string;
}

const SPLASH: Array<{ text: string; type: Line['type'] }> = [
  { text: '    _    ____ _____ ____   ___  _   _ ___ ____ _     _____', type: 'ascii' },
  { text: '   / \\  / ___|_   _|  _ \\ / _ \\| \\ | |_ _/ ___| |   | ____|', type: 'ascii' },
  { text: '  / _ \\ \\___ \\ | | | |_) | | | |  \\| || | |   | |   |  _|', type: 'ascii' },
  { text: ' / ___ \\ ___) || | |  _ <| |_| | |\\  || | |___| |___| |___', type: 'ascii' },
  { text: '/_/   \\_\\____/ |_| |_| \\_\\\\___/|_| \\_|___\\____|_____|_____|', type: 'ascii' },
  { text: '', type: 'output' },
  { text: '  Astronicle OS v2.0.26  —  Abdul Rehman, Software Developer', type: 'title' },
  { text: '', type: 'output' },
  { text: '  ────────────────────────────────────────────────────────', type: 'dim' },
  { text: '', type: 'output' },
  { text: '  You can also browse this portfolio graphically using', type: 'output' },
  { text: '  the desktop environment behind this window.', type: 'output' },
  { text: '', type: 'output' },
  { text: '  Continue in terminal?', type: 'subtitle' },
];

const PROMPT_LINE = '  [ y ] Terminal mode      [ n ] Close & use desktop';

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    '╔════════════════════════════════════════════════════╗',
    '║   Abdul Rehman Portfolio — Astronicle OS  Help     ║',
    '╚════════════════════════════════════════════════════╝',
    '',
    '  about          → About me',
    '  projects       → List all projects',
    '  skills         → Tech skills',
    '  experience     → Experience & education',
    '  certifications → AWS certifications',
    '  contact        → Contact info',
    '  resume         → Open resume',
    '  github         → Open GitHub',
    '  linkedin       → Open LinkedIn',
    '  leetcode       → Open LeetCode',
    '  whoami         → Current user',
    '  history        → Command history',
    '  easteregg      → ???',
    '  clear          → Clear terminal',
    '',
  ],

  about: () => [
    '┌──────────────────────────────────────────┐',
    '│           ABDUL REHMAN                   │',
    '│       Software Developer                 │',
    '│       Lucknow, Uttar Pradesh             │',
    '└──────────────────────────────────────────┘',
    '',
    '  Results-driven developer building scalable apps,',
    '  backend systems, and automation tools with Java,',
    '  Python, JavaScript, and modern web technologies.',
    '',
    '  Education  : B.Tech IT — KIET, Ghaziabad (CGPA 9.13)',
    '  Community  : Member @ FOSSCU-K',
    '  Cloud      : 4x AWS Certified',
    '  Email      : astronicle78@gmail.com',
    '  GitHub     : github.com/Astronicle',
    '',
  ],

  whoami: () => [
    'Abdul Rehman (astronicle)',
    'B.Tech IT Student · Software Developer · 4x AWS Certified',
    '',
  ],

  projects: () => [
    'Projects (2):',
    '',
    '  📝 Barze   — Notes Companion',
    '     Cross-platform desktop note-taking app',
    '     Stack: React, Electron, JavaScript, Vite, Tailwind',
    '     github.com/Astronicle/barze',
    '',
    '  🤖 Kachina — Discord Utility & Automation Bot',
    '     Feature-rich Discord bot, 10+ commands, AsyncIO scheduler',
    '     Stack: Python, Flask, Discord.py, AsyncIO, Render',
    '     github.com/Astronicle/kachina',
    '',
    '  Tip: Double-click Projects on desktop for full details.',
    '',
  ],

  skills: () => [
    'Technical Skills:',
    '',
    '  Languages      : Java · Python · JavaScript · TypeScript · SQL',
    '',
    '  Frontend       : React · Next.js · Tailwind CSS · Electron · Vite',
    '',
    '  Backend        : Spring Boot · Flask · REST APIs',
    '',
    '  Cloud & DevOps : AWS · Docker · Kubernetes',
    '',
    '  Tools          : Git · GitHub · Postman · DBeaver',
    '',
  ],

  experience: () => [
    'Experience & Education:',
    '',
    '  🎓 2024–2028  B.Tech Information Technology',
    '               KIET Group of Institutions, Ghaziabad',
    '               CGPA: 9.13',
    '',
    '  🌍 2024–Now   Member @ FOSSCU-K',
    '               Organized 10+ workshops for 100+ participants',
    '               Open-source collaboration & community building',
    '',
    '  🚀 2025       Barze — Electron desktop note app (React/Vite)',
    '  🤖 2025       Kachina — Discord automation bot (Python/Flask)',
    '',
    '  ☁️  2025–2026  4x AWS Certifications earned',
    '',
    '  🏫 2023       Class XII ISC — CMS Lucknow — 98.25%',
    '  🏫 2021       Class X ICSE  — CMS Lucknow — 98.6%',
    '',
  ],

  certifications: () => [
    'AWS Certifications (4):',
    '',
    '  ☁️  Cloud Practitioner          Nov 2025  ✓  (Expires May 2029)',
    '  🤖  AI Practitioner             Dec 2025  ✓  (Expires Dec 2028)',
    '  ⚙️  CloudOps Engineer Assoc     May 2026  ✓  (Expires May 2029)',
    '  📊  Data Engineer Assoc         May 2026  ✓  (Expires May 2029)',
    '',
    '  Issuer: Amazon Web Services (AWS)',
    '',
  ],

  contact: () => [
    'Contact:',
    '',
    '  📧  astronicle78@gmail.com',
    '  🔵  linkedin.com/in/astronicle78',
    '  🐙  github.com/Astronicle',
    '  🟠  leetcode.com/Astronicle78',
    '  📞  +91 6388470933',
    '',
  ],

  resume: () => {
    if (typeof window !== 'undefined') window.open('/resume.pdf', '_blank');
    return [
      'Opening resume... 📄',
      'Or double-click Resume.pdf on the desktop.',
      '',
    ];
  },

  github: () => {
    if (typeof window !== 'undefined') window.open('https://github.com/Astronicle', '_blank');
    return ['Opening GitHub... 🐙', ''];
  },

  linkedin: () => {
    if (typeof window !== 'undefined') window.open('https://linkedin.com/in/astronicle78', '_blank');
    return ['Opening LinkedIn... 🔵', ''];
  },

  leetcode: () => {
    if (typeof window !== 'undefined') window.open('https://leetcode.com/Astronicle78', '_blank');
    return ['Opening LeetCode... 🟠', ''];
  },

  easteregg: () => [
    '🥚 Easter egg found!',
    '',
    '  Try these secrets:',
    '  → Type "sudo hire astronicle"',
    '  → Konami code on desktop (↑↑↓↓←→←→BA)',
    '  → Click the taskbar clock 10 times',
    '',
  ],
};

const COLOR_MAP: Record<Line['type'], string> = {
  input:    '#ffffff',
  output:   'rgba(200,210,220,0.78)',
  error:    '#f87171',
  success:  '#4ade80',
  ascii:    '#818cf8',
  dim:      'rgba(255,255,255,0.22)',
  title:    'rgba(255,255,255,0.92)',
  subtitle: 'rgba(255,255,255,0.6)',
};

type Phase = 'typing' | 'waiting' | 'active';

export function Terminal() {
  const closeWindow = useWindowStore((s) => s.closeWindow);

  const [phase, setPhase] = useState<Phase>('typing');
  const [splashDone, setSplashDone] = useState<Array<{ text: string; type: Line['type'] }>>([]);
  const [showPrompt, setShowPrompt] = useState(false);

  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [splashDone, showPrompt, lines]);

  useEffect(() => {
    if (phase === 'active') inputRef.current?.focus();
  }, [phase]);

  // Typewriter
  useEffect(() => {
    if (phase !== 'typing') return;
    let idx = 0;
    const tick = () => {
      if (idx >= SPLASH.length) {
        setShowPrompt(true);
        setPhase('waiting');
        return;
      }
      const item = SPLASH[idx];
      setSplashDone(prev => [...prev, item]);
      idx++;
      setTimeout(tick, item.text === '' ? 55 : 22);
    };
    const t = setTimeout(tick, 200);
    return () => clearTimeout(t);
  }, [phase]);

  // y/n handler
  useEffect(() => {
    if (phase !== 'waiting') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'y' || e.key === 'Y' || e.key === 'Enter') {
        setShowPrompt(false);
        setPhase('active');
        setLines([
          { type: 'output', content: '' },
          { type: 'dim',    content: '  Type "help" to see available commands.' },
          { type: 'output', content: '' },
        ]);
      } else if (e.key === 'n' || e.key === 'N') {
        closeWindow('terminal');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, closeWindow]);

  // Command runner
  const run = useCallback((cmd: string) => {
    const t = cmd.trim().toLowerCase();
    const newHist = [...history, cmd.trim()];
    setHistory(newHist);
    setHistIdx(-1);
    const inLine: Line = { type: 'input', content: cmd };

    if (!t) { setLines(l => [...l, inLine, { type: 'output', content: '' }]); return; }

    if (t === 'sudo hire astronicle') {
      window.dispatchEvent(new Event('sudoEasterEgg'));
      setLines(l => [...l, inLine,
        { type: 'dim', content: '  launching...' },
        { type: 'output', content: '' },
      ]); return;
    }
    if (t === 'history') {
      setLines(l => [...l, inLine,
        ...newHist.map((h, i) => ({ type: 'output' as const, content: `  ${i + 1}  ${h}` })),
        { type: 'output', content: '' },
      ]); return;
    }
    if (t === 'clear') { setLines([]); return; }

    const handler = COMMANDS[t];
    if (handler) {
      setLines(l => [...l, inLine, ...handler().map(o => ({ type: 'output' as const, content: o }))]);
    } else {
      setLines(l => [...l, inLine,
        { type: 'error',  content: `Command not found: "${t}". Type "help" for available commands.` },
        { type: 'output', content: '' },
      ]);
    }
  }, [history]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { run(input); setInput(''); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const ni = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(ni);
      setInput(history[history.length - 1 - ni] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const ni = Math.max(histIdx - 1, -1);
      setHistIdx(ni);
      setInput(ni === -1 ? '' : history[history.length - 1 - ni] || '');
    }
  };

  const base: React.CSSProperties = {
    height: '100%', display: 'flex', flexDirection: 'column',
    background: '#0d1117',
    fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
    fontSize: 13, lineHeight: 1.6,
  };

  const scroll: React.CSSProperties = {
    flex: 1, overflow: 'auto', padding: '20px 20px 12px',
    display: 'flex', flexDirection: 'column', gap: 0,
  };

  if (phase !== 'active') {
    return (
      <div style={base}>
        <div style={scroll}>
          {splashDone.map((item, i) => (
            <div key={i} style={{
              color: COLOR_MAP[item.type],
              whiteSpace: 'pre',
              fontSize: item.type === 'ascii' ? 12 : 13,
              marginBottom: item.text === '' ? 4 : 0,
              fontWeight: item.type === 'title' ? 600 : 400,
              letterSpacing: item.type === 'ascii' ? '0.02em' : 'normal',
            }}>
              {item.text || '\u00A0'}
            </div>
          ))}
          {showPrompt && (
            <div style={{ marginTop: 8 }}>
              <div style={{ color: '#facc15', whiteSpace: 'pre', fontWeight: 600, letterSpacing: '0.02em' }}>
                {PROMPT_LINE}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>press key</span>
                <span style={{ display: 'inline-block', width: 7, height: 14, background: '#facc15', borderRadius: 1, boxShadow: '0 0 6px rgba(250,204,21,0.6)' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => inputRef.current?.focus()} style={{ ...base, cursor: 'text' }}>
      <div style={scroll}>
        {lines.map((line, i) => (
          <div key={i} style={{ color: COLOR_MAP[line.type], whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {line.type === 'input' ? (
              <span>
                <span style={{ color: '#818cf8' }}>astronicle</span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>@</span>
                <span style={{ color: '#a855f7' }}>portfolio</span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>:~$ </span>
                <span style={{ color: '#fff' }}>{line.content}</span>
              </span>
            ) : (line.content || '\u00A0')}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#818cf8' }}>astronicle</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>@</span>
          <span style={{ color: '#a855f7' }}>portfolio</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>:~$ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 'inherit', caretColor: '#4ade80' }}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
