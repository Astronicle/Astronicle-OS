'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import { wallpapers } from '@/data';

type Tab = 'Wallpaper' | 'Theme' | 'Animations' | 'Desktop';

const TABS: Tab[] = ['Wallpaper', 'Theme', 'Animations', 'Desktop'];

export function SettingsWindow() {
  const { settings, updateSettings } = useWindowStore();
  const [activeTab, setActiveTab] = useState<Tab>('Wallpaper');

  return (
    <div style={{ height: '100%', display: 'flex', color: '#fff', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ width: 168, borderRight: '1px solid rgba(255,255,255,0.07)', padding: 10, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '9px 12px', borderRadius: 8, fontSize: 13, border: 'none', cursor: 'pointer',
              background: activeTab === tab ? 'rgba(99,102,241,0.18)' : 'transparent',
              color: activeTab === tab ? '#a5b4fc' : 'rgba(255,255,255,0.5)',
              fontWeight: activeTab === tab ? 600 : 400,
              textAlign: 'left', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (activeTab !== tab) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; } }}
            onMouseLeave={e => { if (activeTab !== tab) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; } }}
          >{tab}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>

        {/* ── Wallpaper ── */}
        {activeTab === 'Wallpaper' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)' }}>Wallpaper</p>
            <p style={{ margin: '0 0 16px', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Changes the desktop background immediately.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {wallpapers.map(wp => (
                <motion.button
                  key={wp.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => updateSettings({ wallpaper: wp.id })}
                  style={{
                    height: 72, borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                    background: wp.preview, position: 'relative',
                    border: `2px solid ${settings.wallpaper === wp.id ? '#6366f1' : 'rgba(255,255,255,0.08)'}`,
                    transition: 'border-color 0.2s', padding: 0,
                  }}
                >
                  {settings.wallpaper === wp.id && (
                    <div style={{ position: 'absolute', top: 6, right: 8, width: 18, height: 18, borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>✓</div>
                  )}
                  <p style={{ position: 'absolute', bottom: 5, left: 0, right: 0, textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.9)', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.9)', fontWeight: 500 }}>{wp.name}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Theme ── */}
        {activeTab === 'Theme' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)' }}>Window Theme</p>
              <p style={{ margin: '0 0 14px', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Changes the glass tint on all windows.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {([
                  { id: 'dark',     label: 'Dark',     desc: 'Default dark glass',           preview: 'rgba(16,16,18,0.96)' },
                  { id: 'darker',   label: 'Darker',   desc: 'Deep black, high contrast',    preview: 'rgba(4,4,5,0.99)' },
                  { id: 'midnight', label: 'Midnight', desc: 'Dark blue-violet tint',        preview: 'rgba(4,2,20,0.97)' },
                ] as const).map(t => (
                  <button
                    key={t.id}
                    onClick={() => updateSettings({ theme: t.id })}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '12px 14px', borderRadius: 12, border: 'none', cursor: 'pointer', textAlign: 'left',
                      background: settings.theme === t.id ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.03)',
                      outline: `1px solid ${settings.theme === t.id ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.07)'}`,
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: t.preview, border: '1px solid rgba(255,255,255,0.12)', flexShrink: 0 }} />
                    <div>
                      <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: '#fff' }}>{t.label}</p>
                      <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{t.desc}</p>
                    </div>
                    {settings.theme === t.id && <span style={{ marginLeft: 'auto', color: '#818cf8', fontSize: 16 }}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Animations ── */}
        {activeTab === 'Animations' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)' }}>Animations</p>
              <p style={{ margin: '0 0 16px', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Controls motion effects across the desktop.</p>
            </div>
            {[
              { key: 'animations' as const, label: 'Enable Animations', desc: 'Window open/close spring transitions and icon entrance effects' },
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ flex: 1, minWidth: 0, marginRight: 16 }}>
                  <p style={{ margin: '0 0 3px', fontSize: 13, fontWeight: 500 }}>{item.label}</p>
                  <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
                <button
                  onClick={() => updateSettings({ [item.key]: !settings[item.key] })}
                  style={{
                    width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
                    background: settings[item.key] ? '#6366f1' : 'rgba(255,255,255,0.1)',
                    position: 'relative', transition: 'background 0.25s', flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 4, width: 18, height: 18, borderRadius: '50%',
                    background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    left: settings[item.key] ? 26 : 4,
                  }} />
                </button>
              </div>
            ))}

            {!settings.animations && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.3)', padding: '10px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                Animations disabled. Windows will open and close instantly.
              </motion.p>
            )}
          </motion.div>
        )}

        {/* ── Desktop ── */}
        {activeTab === 'Desktop' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)' }}>Icon Size</p>
              <p style={{ margin: '0 0 14px', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Resizes all desktop icons.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {([
                  { id: 'small',  label: 'Small',  emoji: '28px' },
                  { id: 'medium', label: 'Medium', emoji: '34px' },
                  { id: 'large',  label: 'Large',  emoji: '42px' },
                ] as const).map(sz => (
                  <button
                    key={sz.id}
                    onClick={() => updateSettings({ iconSize: sz.id })}
                    style={{
                      padding: '14px 0', borderRadius: 12, cursor: 'pointer',
                      borderWidth: 1, borderStyle: 'solid',
                      borderColor: settings.iconSize === sz.id ? 'rgba(168,85,247,0.5)' : 'rgba(255,255,255,0.07)',
                      background: settings.iconSize === sz.id ? 'rgba(168,85,247,0.14)' : 'rgba(255,255,255,0.03)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize: sz.id === 'small' ? 20 : sz.id === 'medium' ? 26 : 34 }}>📁</span>
                    <span style={{ fontSize: 12, color: settings.iconSize === sz.id ? '#c4b5fd' : 'rgba(255,255,255,0.45)', fontWeight: settings.iconSize === sz.id ? 600 : 400 }}>{sz.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
