'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import { DesktopIcon } from './DesktopIcon';
import { EasterEggOverlay, EasterEggData } from './EasterEggOverlay';
import { desktopIcons, wallpapers } from '@/data';
import React from 'react';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

// ── Easter egg content nodes ─────────────────────────────────────────────────

const KonamiContent = () => (
  <div>
    <div style={{ fontSize: 56, marginBottom: 16, filter: 'drop-shadow(0 0 24px #6366f1)' }}>🎮</div>
    <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#818cf8', letterSpacing: '0.1em', marginBottom: 8 }}>
      ↑ ↑ ↓ ↓ ← → ← → B A
    </p>
    <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 700 }}>Konami Code</h2>
    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
      Konami code was a classic cheat code that originated in 1986's Gradius, but gained mainstream popularity from its use in Contra to grant players 30 extra lives. It has since been referenced in countless games and media, becoming a symbol of gaming culture and nostalgia.
    </p>
  </div>
);

const ClockContent = ({ clicks }: { clicks: number }) => (
  <div>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      style={{ fontSize: 56, marginBottom: 16, display: 'inline-block', filter: 'drop-shadow(0 0 20px #f59e0b)' }}
    >⏰</motion.div>
    <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 700 }}>You clicked the clock {clicks} times.</h2>
    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
      It is still {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Good job not overclicking lol.
    </p>
  </div>
);

const SudoContent = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1400);
    const t3 = setTimeout(() => setStep(3), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const lines = [
    { text: '$ sudo hire astronicle', color: '#4ade80' },
    { text: '[sudo] password for recruiter: ••••••••', color: 'rgba(255,255,255,0.4)' },
    { text: 'Verifying credentials...', color: '#818cf8' },
    { text: 'Access granted. Good call.', color: '#facc15' },
  ];

  return (
    <div>
      <div style={{ fontSize: 44, marginBottom: 20 }}>💻</div>
      <div style={{
        background: '#0d1117', borderRadius: 10, padding: '16px 20px', textAlign: 'left',
        fontFamily: 'monospace', fontSize: 13, lineHeight: 2,
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: 4,
      }}>
        {lines.slice(0, step + 1).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: l.color }}>
            {l.text}
          </motion.div>
        ))}
      </div>
      {step >= 3 && (
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 16, marginBottom: 0 }}
        >
          astronicle78@gmail.com
        </motion.p>
      )}
    </div>
  );
};

export function Desktop() {
  const { settings } = useWindowStore();
  const wallpaper = wallpapers.find((w) => w.id === settings.wallpaper) || wallpapers[0];

  const [egg, setEgg] = useState<EasterEggData | null>(null);
  const clockClicksRef = useRef(0);

  // Konami
  useEffect(() => {
    let seq: string[] = [];
    const handler = (e: KeyboardEvent) => {
      seq = [...seq, e.key].slice(-KONAMI.length);
      if (seq.join(',') === KONAMI.join(',')) {
        seq = [];
        setEgg({ id: 'konami', content: <KonamiContent /> });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Clock easter egg — exposed via custom event from Taskbar
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const clicks = (e as CustomEvent<number>).detail;
      setEgg({ id: 'clock', content: <ClockContent clicks={clicks} /> });
    };
    window.addEventListener('clockEasterEgg' as any, handler);
    return () => window.removeEventListener('clockEasterEgg' as any, handler);
  }, []);

  // sudo — exposed via custom event from Terminal
  useEffect(() => {
    const handler = () => setEgg({ id: 'sudo', content: <SudoContent /> });
    window.addEventListener('sudoEasterEgg', handler);
    return () => window.removeEventListener('sudoEasterEgg', handler);
  }, []);

  // Theme tint overlay colours
  const themeTint: Record<string, string> = {
    dark:     'rgba(0,0,0,0.22)',
    darker:   'rgba(0,0,0,0.48)',
    midnight: 'rgba(5,0,30,0.55)',
  };

  return (
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 48,
          background: wallpaper.gradient,
          overflow: 'hidden',
          transition: 'background 0.6s ease',
        }}
      >
        {/* Theme overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: themeTint[settings.theme] ?? themeTint.dark,
          pointerEvents: 'none',
          transition: 'background 0.4s ease',
        }} />

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Icons */}
        <div style={{
          position: 'absolute', top: 12, left: 8, bottom: 8,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 72px)',
          gridAutoRows: 'max-content',
          gap: 2, alignContent: 'start',
          overflowY: 'auto', overflowX: 'hidden',
          scrollbarWidth: 'none', paddingBottom: 4,
        }}>
          {desktopIcons.map((icon, i) => (
            <motion.div
              key={icon.id}
              initial={settings.animations ? { opacity: 0, y: -10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 + i * 0.035 }}
            >
              <DesktopIcon icon={icon} size={settings.iconSize} />
            </motion.div>
          ))}
        </div>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          style={{ position: 'absolute', bottom: 12, right: 16, pointerEvents: 'none', textAlign: 'right' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: 11, margin: 0 }}>Double-click icons to open</p>
        </motion.div>
      </motion.div>

      <EasterEggOverlay egg={egg} onClose={() => setEgg(null)} />
    </>
  );
}
