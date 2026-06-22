'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences, certifications, recycleItems } from '@/data';

export function ExperienceExplorer() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', color: '#fff' }}>
      {/* Address bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        fontSize: 12, color: 'rgba(255,255,255,0.4)',
      }}>
        <span>📁</span><span>Desktop</span>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Experience</span>
        <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.3)' }}>{experiences.length} item{experiences.length !== 1 ? 's' : ''}</span>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '18px 20px 16px',
              background: `linear-gradient(135deg, ${exp.color}20 0%, ${exp.color}08 100%)`,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'flex-start', gap: 16,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: `${exp.color}25`, border: `1px solid ${exp.color}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              }}>
                {exp.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <h3 style={{ margin: '0 0 3px', fontSize: 15, fontWeight: 700 }}>{exp.title}</h3>
                    <p style={{ margin: 0, fontSize: 13, color: exp.color, fontWeight: 500 }}>{exp.subtitle}</p>
                  </div>
                  <span style={{
                    fontSize: 11, fontFamily: 'monospace', flexShrink: 0,
                    color: 'rgba(255,255,255,0.3)', padding: '3px 8px', borderRadius: 6,
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  }}>{exp.period}</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '14px 20px', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ margin: '0 0 12px', fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7 }}>
                {exp.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {exp.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 11, padding: '3px 9px', borderRadius: 6,
                    background: `${exp.color}15`, color: exp.color,
                    border: `1px solid ${exp.color}35`,
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function CertificationsExplorer() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', color: '#fff' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        fontSize: 12, color: 'rgba(255,255,255,0.4)',
      }}>
        <span>📁</span><span>Desktop</span>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Certifications</span>
        <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.3)' }}>{certifications.length} items</span>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            style={{
              borderRadius: 14, overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Header row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
              background: `linear-gradient(135deg, ${cert.badgeColor}18 0%, ${cert.badgeColor}06 100%)`,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: `${cert.badgeColor}22`, border: `1px solid ${cert.badgeColor}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              }}>{cert.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700 }}>{cert.name}</h3>
                <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{cert.issuer}</p>
              </div>
              <div style={{
                padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, flexShrink: 0,
                background: `${cert.badgeColor}20`, color: cert.badgeColor,
                border: `1px solid ${cert.badgeColor}40`,
              }}>✓ Active</div>
            </div>

            {/* Details */}
            <div style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 20, fontSize: 11 }}>
                <span style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Issued: <span style={{ color: cert.badgeColor, fontFamily: 'monospace', fontWeight: 600 }}>{cert.date}</span>
                </span>
                <span style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Expires: <span style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace' }}>{cert.expires}</span>
                </span>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                    style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.3)', fontSize: 11, textDecoration: 'none' }}>
                    Verify ↗
                  </a>
                )}
              </div>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                {cert.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ContactExplorer() {
  const contacts = [
    { icon: '📧', label: 'Email', value: 'astronicle78@gmail.com', url: 'mailto:astronicle78@gmail.com', color: '#ef4444' },
    { icon: '🔵', label: 'LinkedIn', value: 'linkedin.com/in/astronicle78', url: 'https://linkedin.com/in/astronicle78', color: '#0077b5' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/Astronicle', url: 'https://github.com/Astronicle', color: '#a855f7' },
    { icon: '🟠', label: 'LeetCode', value: 'leetcode.com/Astronicle78', url: 'https://leetcode.com/Astronicle78', color: '#ffa116' },
    { icon: '📞', label: 'Phone', value: '+91 6388470933', url: 'tel:+916388470933', color: '#10b981' },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', color: '#fff' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        fontSize: 12, color: 'rgba(255,255,255,0.4)',
      }}>
        <span>📁</span><span>Desktop</span>
        <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Contact</span>
      </div>
      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {contacts.map((c, i) => (
          <motion.a
            key={c.label} href={c.url} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 12,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.07)' } as never}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: `${c.color}20`, border: `1px solid ${c.color}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>{c.icon}</div>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{c.label}</p>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#fff' }}>{c.value}</p>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 16, color: 'rgba(255,255,255,0.2)' }}>↗</span>
          </motion.a>
        ))}
      </div>
      <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 11, color: 'rgba(255,255,255,0.28)', textAlign: 'center' }}>
        Click any contact to open
      </div>
    </div>
  );
}

export function RecycleBinExplorer() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', color: '#fff' }}>
      <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.4)' }}>
        <span>🗑️</span>
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Recycle Bin</span>
        <span style={{ marginLeft: 'auto' }}>{recycleItems.length} items</span>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {recycleItems.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
            <div
              onDoubleClick={() => setOpenItem(openItem === item.id ? null : item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                borderRadius: 9, cursor: 'pointer', transition: 'background 0.15s',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: '0 0 2px', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{item.name}</p>
                <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Deleted: {item.deletedDate}</p>
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>{openItem === item.id ? '▲' : '▼'}</span>
            </div>
            <AnimatePresence>
              {openItem === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ margin: '0 6px', padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderTop: 'none', borderRadius: '0 0 9px 9px', fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                    {item.message}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
