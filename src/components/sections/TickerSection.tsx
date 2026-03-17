import { TRUSTED_BY } from '@/data/siteData'

export default function TickerSection() {
  // Duplicate array for seamless loop
  const items = [...TRUSTED_BY, ...TRUSTED_BY]

  return (
    <div
      style={{
        padding: '50px 0',
        background: 'var(--bg3)',
        borderTop: '1px solid rgba(0,212,255,0.07)',
        borderBottom: '1px solid rgba(0,212,255,0.07)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <p style={{
        textAlign: 'center',
        fontFamily: '"Share Tech Mono", monospace',
        fontSize: 9, letterSpacing: '3px',
        color: 'var(--muted)', textTransform: 'uppercase',
        marginBottom: 24,
      }}>
        Trusted by
      </p>

      <div style={{ overflow: 'hidden' }}>
        <div className="ticker-track">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: 13, letterSpacing: '4px',
                color: 'rgb(0, 213, 255)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: 56,
              }}
            >
              {item}
              <span style={{ color: 'var(--c)', fontSize: 22 }}>·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
