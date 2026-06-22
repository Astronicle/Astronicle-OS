'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export interface EasterEggData {
  id: string;
  content: React.ReactNode;
}

interface Props {
  egg: EasterEggData | null;
  onClose: () => void;
}

export function EasterEggOverlay({ egg, onClose }: Props) {
  useEffect(() => {
    if (!egg) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [egg, onClose]);

  return (
    <AnimatePresence>
      {egg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 9990,
            background: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'rgba(14,14,18,0.98)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              padding: '40px 48px',
              maxWidth: 480,
              width: '90vw',
              boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
              textAlign: 'center',
              color: '#fff',
              position: 'relative',
            }}
          >
            {egg.content}
            <button
              onClick={onClose}
              style={{
                marginTop: 28, padding: '9px 28px', borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
