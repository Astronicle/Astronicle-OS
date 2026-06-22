'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';

export function ShutdownScreen() {
  const { isShutdown, setShutdown } = useWindowStore();

  return (
    <AnimatePresence>
      {isShutdown && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          onClick={() => setShutdown(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9998, background: '#000',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: 64, marginBottom: 24 }}>🌌</div>
            <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>
              Thank you for visiting Abdul Rehman&apos;s Portfolio
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, margin: '0 0 32px' }}>
              Astronicle OS — Powered by curiosity and silly
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: 'rgba(255,255,255,0.25)', fontSize: 13,
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '8px 20px', borderRadius: 999,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', animation: 'pulse 2s infinite' }} />
              Click anywhere to restart
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
