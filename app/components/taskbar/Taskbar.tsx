'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import { useOpenWindow } from '@/hooks/useOpenWindow';

export function Taskbar() {
  const { windows, restoreWindow, focusWindow, minimizeWindow, setShutdown } = useWindowStore();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [showStart, setShowStart] = useState(false);
  const [clockClicks, setClockClicks] = useState(0);
  const openWindow = useOpenWindow();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { month: 'short', day: 'numeric' }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  const handleClockClick = () => {
    const n = clockClicks + 1;
    setClockClicks(n);
    if (n >= 10) {
      setClockClicks(0);
      window.dispatchEvent(new CustomEvent('clockEasterEgg', { detail: 10 }));
    }
  };

  const open = (id: any, title: string, icon: string, comp: string) => {
    openWindow(id, title, icon, comp);
    setShowStart(false);
  };

  const startItems = [
    { icon: '👨‍💻', label: 'About Me',       action: () => open('about',          'About Me',       '👨‍💻', 'AboutWindow') },
    { icon: '📁',   label: 'Projects',       action: () => open('projects',       'Projects',       '📁', 'ProjectsExplorer') },
    { icon: '💡',   label: 'Skills',         action: () => open('skills',         'Skills',         '📁', 'SkillsExplorer') },
    { icon: '📋',   label: 'Experience',     action: () => open('experience',     'Experience',     '📁', 'ExperienceExplorer') },
    { icon: '🎓',   label: 'Education',      action: () => open('education',      'Education',      '📁', 'EducationExplorer') },
    { icon: '🏆',   label: 'Certifications', action: () => open('certifications', 'Certifications', '📁', 'CertificationsExplorer') },
    { icon: '📄',   label: 'Resume',         action: () => open('resume',         'Resume.pdf',     '📄', 'ResumeViewer') },
    { icon: '💻',   label: 'Terminal',       action: () => open('terminal',       'Terminal',       '💻', 'Terminal') },
    { icon: '⚙️',   label: 'Settings',       action: () => open('settings',       'Settings',       '⚙️', 'SettingsWindow') },
    { icon: '📬',   label: 'Contact',        action: () => open('contact',        'Contact',        '📁', 'ContactExplorer') },
  ];

  // Pinned shortcuts with real actions
  const pinnedItems = [
    { icon: '📁', label: 'Projects', action: () => open('projects', 'Projects', '📁', 'ProjectsExplorer') },
    { icon: '💻', label: 'Terminal', action: () => open('terminal', 'Terminal', '💻', 'Terminal') },
    { icon: '⚙️', label: 'Settings', action: () => open('settings', 'Settings', '⚙️', 'SettingsWindow') },
  ];

  const BAR: React.CSSProperties = {
    position: 'fixed', bottom: 0, left: 0, right: 0, height: 48,
    display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4,
    background: 'rgba(8,8,10,0.94)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    zIndex: 997,
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {showStart && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowStart(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 996 }}
          />
        )}
      </AnimatePresence>

      {/* Start menu */}
      <AnimatePresence>
        {showStart && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{
              position: 'fixed', bottom: 56, left: 8, zIndex: 998,
              width: 280, borderRadius: 16,
              background: 'rgba(14,14,18,0.97)',
              backdropFilter: 'blur(32px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🚀</div>
              <div>
                <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, margin: 0 }}>Abdul Rehman</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: 0 }}>Portfolio OS v2.0.26</p>
              </div>
            </div>
            <div style={{ padding: 8 }}>
              {startItems.map(item => (
                <button key={item.label} onClick={item.action} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent', color: '#fff', fontSize: 13, fontWeight: 500, transition: 'background 0.15s', textAlign: 'left' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontSize: 16, width: 22, textAlign: 'center' }}>{item.icon}</span>
                  <span style={{ color: 'rgba(255,255,255,0.82)' }}>{item.label}</span>
                </button>
              ))}
            </div>
            <div style={{ padding: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={() => { setShutdown(true); setShowStart(false); }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent', fontSize: 13, fontWeight: 500, textAlign: 'left', color: 'rgba(239,68,68,0.85)', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: 16, width: 22, textAlign: 'center' }}>🔴</span>
                Shut Down
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div style={BAR}>
        {/* Start button */}
        <motion.button
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
          onClick={() => setShowStart(s => !s)}
          style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, cursor: 'pointer', border: 'none',
            background: showStart ? 'rgba(255,255,255,0.15)' : 'transparent',
            color: '#fff',
          }}
        >🚀</motion.button>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)', margin: '0 4px', flexShrink: 0 }} />

        {/* Pinned items — now functional */}
        {pinnedItems.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            title={item.label}
            onClick={item.action}
            style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, cursor: 'pointer', border: 'none',
              background: 'transparent', color: '#fff', transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >{item.icon}</motion.button>
        ))}

        <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)', margin: '0 4px', flexShrink: 0 }} />

        {/* Open windows */}
        <div style={{ display: 'flex', gap: 3, flex: 1, overflow: 'hidden', alignItems: 'center' }}>
          <AnimatePresence>
            {windows.map(win => (
              <motion.button
                key={win.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={() => {
                  if (win.isMinimized) restoreWindow(win.id);
                  else if (win.isFocused) minimizeWindow(win.id);
                  else focusWindow(win.id);
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '4px 10px', borderRadius: 7, border: 'none', cursor: 'pointer',
                  maxWidth: 140, fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap',
                  overflow: 'hidden', transition: 'background 0.15s',
                  background: win.isFocused && !win.isMinimized ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.05)',
                  color: win.isFocused && !win.isMinimized ? '#fff' : 'rgba(255,255,255,0.5)',
                }}
              >
                <span style={{ fontSize: 13, flexShrink: 0 }}>{win.icon}</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{win.title}</span>
                {win.isMinimized && <span style={{ fontSize: 7, opacity: 0.5, flexShrink: 0 }}>▪</span>}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Clock */}
        <button onClick={handleClockClick}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '4px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', background: 'transparent', flexShrink: 0, transition: 'background 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <span style={{ color: '#fff', fontSize: 12, fontWeight: 500, fontFamily: 'monospace' }}>{time}</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>{date}</span>
        </button>
      </div>
    </>
  );
}
