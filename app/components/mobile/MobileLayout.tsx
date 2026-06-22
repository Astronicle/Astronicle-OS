'use client';
import { motion } from 'framer-motion';
import { projects, skills, certifications } from '@/data';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
}

export function MobileLayout() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>
      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>🚀</span>
          <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.15em' }}>ASTRONICLE</span>
        </div>
        <span style={{ fontSize: 11, color: '#818cf8' }}>Portfolio</span>
      </nav>

      {/* Hero */}
      <section style={{ padding: '60px 20px 40px', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div style={{ width: 96, height: 96, borderRadius: 28, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 46, margin: '0 auto 24px', boxShadow: '0 12px 40px rgba(99,102,241,0.35)' }}>
            👨‍💻
          </div>
          <h1 style={{ margin: '0 0 8px', fontSize: 36, fontWeight: 800 }}>Astronicle</h1>
          <p style={{ margin: '0 0 16px', color: '#818cf8', fontSize: 16 }}>Full-Stack Software Developer</p>
          <p style={{ margin: '0 auto 28px', color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.6, maxWidth: 300 }}>
            Building scalable web apps with Java, Spring Boot, TypeScript & React
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            <a href="https://github.com/Astronicle" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>🐙 GitHub</a>
            <a href="mailto:astronicle78@gmail.com" style={{ padding: '10px 18px', borderRadius: 10, background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.35)', color: '#818cf8', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>📧 Contact</a>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, padding: '0 20px 40px' }}>
        {[{ v: '4+', l: 'Projects' },{ v: '15+', l: 'Repos' },{ v: '200+', l: 'LeetCode' },{ v: '2', l: 'AWS Certs' }].map(s => (
          <div key={s.l} style={{ textAlign: 'center', padding: '12px 4px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#818cf8' }}>{s.v}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Desktop hint */}
      <div style={{ margin: '0 20px 40px', padding: '12px 16px', borderRadius: 12, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>🖥️ Visit on desktop for the full OS experience</p>
      </div>

      {/* Projects */}
      <section style={{ padding: '0 20px 48px' }}>
        <p style={{ margin: '0 0 20px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#818cf8' }}>Projects</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {projects.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.05}>
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `${p.color}20`, border: `1px solid ${p.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{p.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: '#fff' }}>{p.name}</h3>
                    <p style={{ margin: '0 0 10px', fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{p.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {p.techStack.slice(0, 3).map(t => <span key={t} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: `${p.color}20`, color: p.color }}>{t}</span>)}
                    </div>
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding: '0 20px 48px' }}>
        <p style={{ margin: '0 0 20px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#818cf8' }}>Skills</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {skills.map((cat, ci) => (
            <FadeIn key={cat.category} delay={ci * 0.05}>
              <div>
                <p style={{ margin: '0 0 10px', fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{cat.icon}</span> {cat.category}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {cat.skills.map(skill => (
                    <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                      <span>{skill.icon}</span>
                      <span style={{ color: 'rgba(255,255,255,0.7)', flex: 1 }}>{skill.name}</span>
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontSize: 10 }}>{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section style={{ padding: '0 20px 48px' }}>
        <p style={{ margin: '0 0 20px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#818cf8' }}>Certifications</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {certifications.map((cert, i) => (
            <FadeIn key={cert.id} delay={i * 0.08}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${cert.badgeColor}20`, border: `1px solid ${cert.badgeColor}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{cert.icon}</div>
                <div>
                  <h3 style={{ margin: '0 0 3px', fontSize: 13, fontWeight: 600 }}>{cert.name}</h3>
                  <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{cert.issuer} · {cert.date}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: '0 20px 60px' }}>
        <p style={{ margin: '0 0 20px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#818cf8' }}>Contact</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { icon: '📧', label: 'Email', value: 'astronicle78@gmail.com', url: 'mailto:astronicle78@gmail.com' },
            { icon: '🔵', label: 'LinkedIn', value: 'linkedin.com/in/astronicle78', url: 'https://linkedin.com/in/astronicle78' },
            { icon: '🐙', label: 'GitHub', value: 'github.com/Astronicle', url: 'https://github.com/Astronicle' },
            { icon: '🟠', label: 'LeetCode', value: 'leetcode.com/Astronicle78', url: 'https://leetcode.com/Astronicle78' },
          ].map(c => (
            <a key={c.label} href={c.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none' }}>
              <span style={{ fontSize: 20 }}>{c.icon}</span>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{c.label}</p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#fff' }}>{c.value}</p>
              </div>
              <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.2)', fontSize: 16 }}>↗</span>
            </a>
          ))}
        </div>
      </section>

      <footer style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>Built with Next.js · Astronicle © 2026</p>
      </footer>
    </div>
  );
}
