'use client';
import { useRef, useCallback, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import type { WindowState } from '@/types';

interface WindowProps { window: WindowState; children: React.ReactNode; }

const THEME_BG: Record<string, string> = {
  dark:     'rgba(16,16,18,0.96)',
  darker:   'rgba(8,8,10,0.98)',
  midnight: 'rgba(4,2,20,0.97)',
};

const THEME_BORDER: Record<string, string> = {
  dark:     'rgba(255,255,255,0.12)',
  darker:   'rgba(255,255,255,0.08)',
  midnight: 'rgba(120,80,255,0.2)',
};

export function Window({ window: win, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, settings } = useWindowStore();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, winX: 0, winY: 0 });
  const [titleHovered, setTitleHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  // Animate in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleTitleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    focusWindow(win.id);
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY, winX: win.position.x, winY: win.position.y });
    e.preventDefault();
  }, [focusWindow, win.id, win.position]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      updatePosition(win.id, {
        x: Math.max(0, dragStart.winX + e.clientX - dragStart.x),
        y: Math.max(0, dragStart.winY + e.clientY - dragStart.y),
      });
    };
    const onUp = () => setIsDragging(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
  }, [isDragging, dragStart, win.id, updatePosition]);

  const isMax = win.isMaximized;
  const animate = settings.animations;
  const bg = THEME_BG[settings.theme] ?? THEME_BG.dark;
  const border = THEME_BORDER[settings.theme] ?? THEME_BORDER.dark;

  const winStyle = isMax
    ? { left: 0, top: 0, width: '100vw', height: 'calc(100vh - 48px)' }
    : { left: win.position.x, top: win.position.y, width: win.size.width, height: win.size.height };

  if (win.isMinimized) return null;

  return (
    <div
      onClick={() => focusWindow(win.id)}
      style={{
        position: 'fixed', ...winStyle,
        zIndex: win.zIndex,
        borderRadius: isMax ? 0 : 14,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: win.isFocused
          ? `0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px ${border}`
          : '0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
        opacity: animate ? (visible ? 1 : 0) : 1,
        transform: animate ? (visible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(16px)') : 'none',
        transition: animate ? 'opacity 0.22s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
      }}
    >
      {/* Glass bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: bg,
        backdropFilter: 'blur(24px)',
        transition: 'background 0.3s',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Title bar */}
      <div
        onMouseDown={!isMax ? handleTitleMouseDown : undefined}
        onDoubleClick={() => maximizeWindow(win.id)}
        onMouseEnter={() => setTitleHovered(true)}
        onMouseLeave={() => setTitleHovered(false)}
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', alignItems: 'center',
          padding: '0 14px', height: 44,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          cursor: isMax ? 'default' : isDragging ? 'grabbing' : 'grab',
          flexShrink: 0, userSelect: 'none',
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, zIndex: 2 }}>
          {[
            { color: '#ff5f57', hover: '#ff3b30', label: '✕', action: () => closeWindow(win.id) },
            { color: '#febc2e', hover: '#e6a800', label: '−', action: () => minimizeWindow(win.id) },
            { color: '#28c840', hover: '#1db035', label: '⤢', action: () => maximizeWindow(win.id) },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); btn.action(); }}
              style={{
                width: 16, height: 16, borderRadius: '50%',
                background: btn.color, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 900,
                color: titleHovered ? 'rgba(0,0,0,0.65)' : 'transparent',
                transition: 'color 0.1s, transform 0.1s',
                flexShrink: 0,
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.18)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Title */}
        <div style={{ position: 'absolute', left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, pointerEvents: 'none' }}>
          <span style={{ fontSize: 14 }}>{win.icon}</span>
          <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: 13, fontWeight: 500 }}>{win.title}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, overflow: 'auto', minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
}
