'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SITE_CONFIG, STATS, LOCATIONS } from '@/data/siteData'
import HeroImage from "@/assets/HEROO.webp"
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
        // width:"100vw",
        alignItems: 'center',
        padding: '120px clamp(0px, 6vw, 50px) 100px',
        overflow: 'hidden',
        backgroundImage: `url(${HeroImage.src})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "contain",
        backgroundRepeat: "no-repeat",
        // background:"red",
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
          top: 'clamp(70px, 8vw, 96px)',
          right: 'clamp(16px, 4vw, 32px)',
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
              fontSize: 16, letterSpacing: '2px',
              color: '#AF0A00', textTransform: 'uppercase', fontWeight:"bold"
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
        style={{ position: 'relative', zIndex: 5, maxWidth: 750 }}
      >
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          style={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 16, letterSpacing: '4px',
            color: '#ff0d00', textTransform: 'uppercase',
            marginBottom: 22,
            display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          <span style={{ width: 36, height: 1, background: '#ff0d00', display: 'block', flexShrink: 0 }} />
          Executive Protection · Global Operations · Est. {SITE_CONFIG.founded}
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(66px, 5vw, 54px)',
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: '-1px',
            marginBottom: 26,
          }}
        >
          <span style={{ color: 'var(--text)', display: 'block' }}>Elite</span>
          <span style={{ color: '#ff0d00', display: 'block' }}>SECURITY SERVICES.</span>
          <span style={{ color: 'var(--text)', fontSize: 'clamp(26px, 3.8vw, 46px)', display: 'block' }}>
            WORLDWIDE
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'clamp(20px, 5vw, 22px)', color: 'var(--muted)',
            lineHeight: 1.75, maxWidth: 600, marginBottom: 34,
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
                fontSize: 16, letterSpacing: '2px',
                color: '#ffffff',
                border: '1px solid #ff0d00',
                // border:'#5b0103b3',
                padding: '5px 13px', textTransform: 'uppercase',
                transition: 'all 0.2s', cursor: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#ff0d00'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.background = 'rgba(0,212,255,0.05)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#ff0d00'
                e.currentTarget.style.color = '#ff0d00'
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
          <a href="#contact" className="btn-primary hero-btn" style={{background:"#FF0D00"}}>▶ Request Consultation</a>
          <a href="#services" className="btn-secondary" style={{border:"1px solid #5B0102",color:"#FF0D00"}}>View Services</a>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 100,
          display: 'grid', gridTemplateColumns: `repeat(${STATS.length}, 1fr)`,
          background: 'rgba(3,7,15,0.88)', backdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(0,212,255,0.1)',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: '14px 28px', textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(0,212,255,0.08)' : 'none',
            }}
          >
            <div
              data-count={stat.value}
              data-suffix={stat.suffix}
              data-display={stat.display || ''}
              style={{
                fontFamily: 'sans-serif',
                fontSize: 32, fontWeight: 700, color: 'var(--text)', lineHeight: 1,
              }}
            >
              {stat.display || stat.value + stat.suffix}
            </div>
            <div style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 13, letterSpacing: '2px',
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
