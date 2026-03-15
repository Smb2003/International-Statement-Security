'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SITE_CONFIG, STATS, LOCATIONS } from '@/data/siteData'

// Framer Motion variants for staggered entrance
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null)

  // Animate stat counters when they come into view
  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]')
            counters.forEach(el => {
              const target = parseFloat(el.getAttribute('data-count') || '0')
              const suffix = el.getAttribute('data-suffix') || ''
              const display = el.getAttribute('data-display') || ''
              if (display) return // skip custom display values
              let current = 0
              const step = target / 80
              const timer = setInterval(() => {
                current = Math.min(current + step, target)
                el.textContent = Math.floor(current) + suffix
                if (current >= target) clearInterval(timer)
              }, 16)
            })
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        width:"100vw",
        alignItems: 'center',
        padding: '120px clamp(0px, 6vw, 50px) 100px',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Scan line */}
      <div className="scan-line" />

      {/* HUD corner marks */}
      <div className="hud-corners">
        <div className="hud-corner-mark tl" />
        <div className="hud-corner-mark tr" />
        <div className="hud-corner-mark bl" />
        <div className="hud-corner-mark br" />
      </div>

      {/* Status badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{
          position: 'absolute',
          top: 'clamp(70px, 8vw, 86px)',
          right: 'clamp(16px, 4vw, 52px)',
          flexWrap: 'wrap',
          display: 'flex',
          gap: 10, 
          zIndex: 10,
        }}
      >
        {[
          { label: 'Systems Online', amber: false },
          { label: '8 Locations Active', amber: true },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span className={`blink-dot${s.amber ? ' amber' : ''}`} />
            <span style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 9, letterSpacing: '2px',
              color: 'rgba(0,212,255,0.55)', textTransform: 'uppercase',
            }}>
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ position: 'relative', zIndex: 5, maxWidth: 650 }}
      >
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 12, letterSpacing: '4px',
            color: 'var(--c)', textTransform: 'uppercase',
            marginBottom: 22,
            display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          <span style={{ width: 36, height: 1, background: 'var(--c)', display: 'block', flexShrink: 0 }} />
          Executive Protection · Global Operations · Est. {SITE_CONFIG.founded}
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(66px, 5vw, 64px)',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-1px',
            marginBottom: 26,
          }}
        >
          <span style={{ color: 'var(--text)', display: 'block' }}>Elite</span>
          <span style={{ color: 'var(--c)', display: 'block' }}>Protection.</span>
          <span style={{ color: 'var(--text)', fontSize: 'clamp(26px, 3.8vw, 46px)', display: 'block' }}>
            Global Reach.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'clamp(17px, 5vw, 17px)', color: 'var(--muted)',
            lineHeight: 1.75, maxWidth: 500, marginBottom: 34,
          }}
        >
          Tailored close protection and security services for VVIP clients, royal families,
          diplomats, and high-net-worth individuals — operating at the highest level across
          8 strategic locations worldwide.
        </motion.p>

        {/* Location pills */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 42 }}
        >
          {LOCATIONS.map(loc => (
            <span
              key={loc.id}
              style={{
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: 9, letterSpacing: '2px',
                color: 'rgba(0,212,255,0.65)',
                border: '1px solid rgba(0,212,255,0.18)',
                padding: '5px 13px', textTransform: 'uppercase',
                transition: 'all 0.2s', cursor: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--c)'
                e.currentTarget.style.color = 'var(--c)'
                e.currentTarget.style.background = 'rgba(0,212,255,0.05)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.18)'
                e.currentTarget.style.color = 'rgba(0,212,255,0.65)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {loc.city}{loc.country !== 'USA' && loc.country !== 'UK' ? ` · ${loc.country}` : `, ${loc.country}`}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap'
          }}>
          <a href="#contact" className="btn-primary hero-btn">▶ Request Consultation</a>
          <a href="#services" className="btn-secondary">View Services</a>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
          display: 'grid', gridTemplateColumns: `repeat(${STATS.length}, 1fr)`,
          background: 'rgba(3,7,15,0.88)', backdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(0,212,255,0.1)',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: '20px 28px', textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(0,212,255,0.08)' : 'none',
            }}
          >
            <div
              data-count={stat.value}
              data-suffix={stat.suffix}
              data-display={stat.display || ''}
              style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: 28, fontWeight: 700, color: 'var(--text)', lineHeight: 1,
              }}
            >
              {stat.display || stat.value + stat.suffix}
            </div>
            <div style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 9, letterSpacing: '2px',
              color: 'var(--muted)', textTransform: 'uppercase', marginTop: 5,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
