import { SITE_CONFIG } from '@/data/siteData'

export default function Footer() {
  return (
    <footer
      style={{
        padding: '36px 52px',
        borderTop: '1px solid rgba(0,212,255,0.07)',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '3px',
          color: 'var(--text)',
        }}
      >
        <span style={{ color: 'var(--c)' }}>{SITE_CONFIG.shortName}</span>
        {' · '}{SITE_CONFIG.name}
      </div>

      <div
        style={{
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: 9,
          letterSpacing: '2px',
          color: 'var(--muted)',
          textTransform: 'uppercase',
        }}
      >
        © 2026 · All rights reserved · Licensed & Insured
      </div>

      <div style={{ display: 'flex', gap: 22 }}>
        {['Privacy', 'Terms', 'Contact'].map(label => (
          <a
            key={label}
            href={label === 'Contact' ? '#contact' : '#'}
            style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: 9,
              letterSpacing: '1.5px',
              color: 'var(--muted)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
              cursor: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--c)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
