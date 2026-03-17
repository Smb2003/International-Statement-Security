'use client'

import { useRef, useEffect } from 'react'
import Owners  from "@/assets/Team_ISSS-removebg-preview.png"
// ── Animated particle canvas ──────────────────────────────
function ParticleBg() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number, w = 0, h = 0
    interface P { x: number; y: number; vx: number; vy: number; r: number; o: number }
    let pts: P[] = []

    const init = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      pts = Array.from({ length: 90 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * 0.35, vy: (Math.random() - .5) * 0.35,
        r: Math.random() * 1.6 + 0.5, o: Math.random() * 0.5 + 0.15,
      }))
    }

    const draw = () => {
      raf = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, w, h)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
      })
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(0,150,255,${0.11 * (1 - d / 120)})`; ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,190,255,${p.o})`; ctx.fill()
      })
      // static dot grid
      const gap = 26
      for (let gx = gap; gx < w; gx += gap)
        for (let gy = gap; gy < h; gy += gap) {
          ctx.beginPath(); ctx.arc(gx, gy, 0.8, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(0,120,220,0.09)'; ctx.fill()
        }
    }
    init(); window.addEventListener('resize', init); draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init) }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}

// ── Shield SVG icon ───────────────────────────────────────
const ShieldIcon = () => (
  <svg viewBox="0 0 50 56" width="40" height="46" fill="none">
    <path d="M25 2L46 10v18C46 44 35 52 25 54 15 52 4 44 4 28V10z" stroke="url(#sg)" strokeWidth="2"/>
    <path d="M19 27l5 5 10-12" stroke="#00aaff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0077ff"/><stop offset="1" stopColor="#00aaff"/></linearGradient></defs>
  </svg>
)

const TeamIcon = () => (
  <svg viewBox="0 0 56 48" width="46" height="40" fill="none">
    <defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0077ff"/><stop offset="1" stopColor="#00aaff"/></linearGradient></defs>
    <circle cx="14" cy="14" r="7" stroke="url(#tg)" strokeWidth="1.8"/>
    <path d="M4 38c0-5.523 4-10 10-10s10 4.477 10 10" stroke="url(#tg)" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="42" cy="14" r="7" stroke="url(#tg)" strokeWidth="1.8"/>
    <path d="M32 38c0-5.523 4-10 10-10s10 4.477 10 10" stroke="url(#tg)" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="28" cy="12" r="8" stroke="url(#tg)" strokeWidth="2"/>
    <path d="M16 42c0-6 5-12 12-12s12 6 12 12" stroke="url(#tg)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const GlobeIcon = () => (
  <svg viewBox="0 0 48 48" width="42" height="42" fill="none">
    <defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0077ff"/><stop offset="1" stopColor="#00aaff"/></linearGradient></defs>
    <circle cx="24" cy="24" r="20" stroke="url(#gg)" strokeWidth="2"/>
    <ellipse cx="24" cy="24" rx="10" ry="20" stroke="url(#gg)" strokeWidth="1.5"/>
    <line x1="4" y1="24" x2="44" y2="24" stroke="url(#gg)" strokeWidth="1.5"/>
    <line x1="8" y1="14" x2="40" y2="14" stroke="url(#gg)" strokeWidth="1" opacity=".7"/>
    <line x1="8" y1="34" x2="40" y2="34" stroke="url(#gg)" strokeWidth="1" opacity=".7"/>
  </svg>
)

// ── Corner brackets component ─────────────────────────────
const Brackets = ({ size = 32, color = '#00aaff', glow = '#0066cc' }: { size?: number; color?: string; glow?: string }) => {
  const s = size, sw = 2, r = `drop-shadow(0 0 4px ${glow})`
  const p = { fill: 'none' as const, stroke: color, strokeWidth: sw, strokeLinecap: 'round' as const }
  return (
    <>
      {[
        [`M3,${s*.55} L3,3 L${s*.55},3`, 'top-0 left-0'],
        [`M${s*.45},3 L${s-3},3 L${s-3},${s*.55}`, 'top-0 right-0'],
        [`M3,${s*.45} L3,${s-3} L${s*.55},${s-3}`, 'bottom-0 left-0'],
        [`M${s*.45},${s-3} L${s-3},${s-3} L${s-3},${s*.45}`, 'bottom-0 right-0'],
      ].map(([d, cls], i) => (
        <svg key={i} className={`absolute ${cls} pointer-events-none corner-svg`} width={s} height={s} style={{ filter: r }}>
          <path d={d as string} {...p} />
        </svg>
      ))}
    </>
  )
}

// ── Large security scene SVG ──────────────────────────────
const AgentScene = () => (
  <svg viewBox="0 0 400 280" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="abg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#0a1e35"/><stop offset="100%" stopColor="#020c18"/>
      </radialGradient>
      <linearGradient id="gnd" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0033aa" stopOpacity=".35"/><stop offset="100%" stopColor="transparent" stopOpacity="0"/>
      </linearGradient>
      <filter id="ag"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="400" height="280" fill="url(#abg)"/>
    {/* Ground */}
    <rect x="0" y="240" width="400" height="40" fill="#040c18"/>
    <rect x="0" y="238" width="400" height="6" fill="url(#gnd)"/>
    {/* BG car */}
    <rect x="240" y="130" width="160" height="68" rx="7" fill="#040d1a"/>
    <rect x="258" y="112" width="122" height="42" rx="5" fill="#050e1c"/>
    <ellipse cx="268" cy="200" rx="14" ry="14" fill="#020810" stroke="#0a1828" strokeWidth="2"/>
    <ellipse cx="372" cy="200" rx="14" ry="14" fill="#020810" stroke="#0a1828" strokeWidth="2"/>
    <rect x="252" y="140" width="28" height="16" rx="2" fill="#060f1e" opacity=".8"/>
    <rect x="308" y="140" width="28" height="16" rx="2" fill="#060f1e" opacity=".8"/>
    {/* Agent 1 */}
    <g filter="url(#ag)">
      <ellipse cx="95" cy="54" rx="26" ry="30" fill="#0c1e32"/>
      <rect x="67" y="82" width="56" height="120" rx="5" fill="#07101e"/>
      <path d="M79 84l16 18 16-18" fill="none" stroke="#0d1d2e" strokeWidth="3"/>
      <rect x="90" y="84" width="10" height="70" rx="2" fill="#1a1a2a"/>
      <rect x="70" y="198" width="20" height="48" rx="5" fill="#050d1a"/>
      <rect x="96" y="198" width="20" height="48" rx="5" fill="#050d1a"/>
      <ellipse cx="80" cy="246" rx="18" ry="7" fill="#030810"/>
      <ellipse cx="106" cy="246" rx="18" ry="7" fill="#030810"/>
      <path d="M67 88Q44 136 42 178" stroke="#07101e" strokeWidth="22" strokeLinecap="round" fill="none"/>
      <path d="M123 88Q144 136 142 178" stroke="#07101e" strokeWidth="22" strokeLinecap="round" fill="none"/>
      <ellipse cx="42" cy="180" rx="12" ry="10" fill="#060e1c"/>
      <ellipse cx="142" cy="180" rx="12" ry="10" fill="#060e1c"/>
      <rect x="76" y="46" width="14" height="9" rx="4" fill="#030810"/>
      <rect x="96" y="46" width="14" height="9" rx="4" fill="#030810"/>
      <line x1="90" y1="50" x2="96" y2="50" stroke="#0a1420" strokeWidth="2"/>
    </g>
    {/* Agent 2 */}
    <g transform="translate(155,20)" filter="url(#ag)">
      <ellipse cx="55" cy="46" rx="22" ry="26" fill="#0b1c2e"/>
      <rect x="31" y="70" width="48" height="110" rx="5" fill="#060f1c"/>
      <path d="M43 72l12 16 12-16" fill="none" stroke="#0c1a2a" strokeWidth="3"/>
      <rect x="38" y="178" width="18" height="46" rx="5" fill="#050c18"/>
      <rect x="62" y="178" width="18" height="46" rx="5" fill="#050c18"/>
      <ellipse cx="47" cy="224" rx="16" ry="7" fill="#030810"/>
      <ellipse cx="71" cy="224" rx="16" ry="7" fill="#030810"/>
      <path d="M31 74Q12 118 10 158" stroke="#060f1c" strokeWidth="20" strokeLinecap="round" fill="none"/>
      <path d="M79 74Q96 118 94 158" stroke="#060f1c" strokeWidth="20" strokeLinecap="round" fill="none"/>
    </g>
    {/* Reflection lines */}
    <line x1="60" y1="245" x2="200" y2="245" stroke="#0033aa" strokeWidth="0.5" opacity=".4"/>
  </svg>
)

// ── Small scene SVGs ──────────────────────────────────────
const SmallScene = ({ v }: { v: number }) => {
  const bgs = ['#08182c','#091520','#0a1828']
  const fc = ['#060f1c','#050d1a','#060e1c']
  return (
    <>
      { v === 0 && <>
        <img src={Owners.src} alt="" />
      </>}
      {v === 1 && <>
        <img src={Owners.src} alt="" />
      </>}
      {v === 2 && <>
        <img src={Owners.src} alt="" />
      </>
    }
    </>

  )
}

// ── HUD frame wrapper ─────────────────────────────────────
const HUDFrame = ({ children, small }: { children: React.ReactNode; small?: boolean }) => (
  <div className="hud-frame" style={{
    position: 'relative',
    borderRadius: small ? 8 : 10,
    padding: 2,
    background: 'linear-gradient(135deg,rgba(0,120,255,.5),rgba(0,60,160,.2),rgba(0,200,255,.4))',
  }}>
    <div style={{
      position: 'relative', borderRadius: small ? 6 : 8,
      overflow: 'hidden', background: '#040e1e',
    }}>
      {/* Scan lines */}
      <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', background:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,70,180,0.04) 3px,rgba(0,70,180,0.04) 4px)' }} />
      {/* Status dot */}
      {!small && <div style={{ position:'absolute', bottom:8, right:10, zIndex:3, width:7, height:7, borderRadius:'50%', background:'#00aaff', boxShadow:'0 0 8px #0077ff', animation:'twinkle 1.5s ease-in-out infinite' }} />}
      <Brackets size={small ? 22 : 36} color={small ? '#0088ff' : '#00aaff'} glow={small ? '#0055cc' : '#0077ff'} />
      <div style={{ position:'relative', zIndex:1 }}>{children}</div>
    </div>
  </div>
)

// ── Stats data ────────────────────────────────────────────
const stats = [
  { icon: <ShieldIcon />, value: '25+ YEARS', label: 'Of Experience' },
  { icon: <TeamIcon />,   value: 'ELITE',     label: 'Security Forces' },
  { icon: <GlobeIcon />,  value: 'GLOBAL',    label: 'Services' },
]

// ── Main export ───────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes twinkle {
          0%,100% { opacity:.15; transform:scale(.7); }
          50%      { opacity:1;  transform:scale(1.6); }
        }
        @keyframes hudGlow {
          0%,100% { box-shadow:0 0 22px rgba(0,100,220,.5),0 0 50px rgba(0,60,180,.3); }
          50%      { box-shadow:0 0 36px rgba(0,170,255,.75),0 0 80px rgba(0,100,220,.45); }
        }
        @keyframes cornerPulse {
          0%,100% { opacity:.8; }
          50%      { opacity:1; filter:drop-shadow(0 0 7px #00aaff); }
        }
        @keyframes btnGlow {
          0%,100% { box-shadow:0 0 14px rgba(0,100,220,.55),0 0 30px rgba(0,60,180,.3); }
          50%      { box-shadow:0 0 24px rgba(0,170,255,.8),0 0 50px rgba(0,100,220,.4); }
        }
        @keyframes scanMove {
          0%   { top:-4%; opacity:.8; }
          100% { top:110%; opacity:0; }
        }

        .hud-frame { animation: hudGlow 3.5s ease-in-out infinite; border-radius:10px; }
        .corner-svg { animation: cornerPulse 2.5s ease-in-out infinite; }

        .learn-btn {
          animation: btnGlow 2.5s ease-in-out infinite;
          transition: transform .2s, background .2s;
        }
        .learn-btn:hover {
          background: linear-gradient(90deg,#0055dd,#0088ff,#0055dd) !important;
          transform: translateY(-2px);
        }

        .stat-icon { transition: transform .3s, filter .3s; filter:drop-shadow(0 0 5px #0055cc); }
        .stat-card:hover .stat-icon { transform:scale(1.1); filter:drop-shadow(0 0 10px #00aaff); }

        /* ── About page section ── */
        .about-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(155deg,#020c1a 0%,#031525 45%,#051d35 75%,#020c1a 100%);
          padding: clamp(48px,7vw,96px) clamp(18px,5vw,60px);
          font-family: 'Barlow', sans-serif;
        }

        /* Perspective floor */
        .about-section::after {
          content:'';
          position:absolute; bottom:0; left:0; right:0; height:36%;
          background-image:
            linear-gradient(rgba(0,120,220,.055) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,120,220,.055) 1px,transparent 1px);
          background-size:50px 50px;
          transform:perspective(500px) rotateX(60deg);
          transform-origin:bottom;
          pointer-events:none; z-index:1;
        }

        .about-inner {
          position:relative; z-index:2;
          width:100%; max-width:1200px; margin:0 auto;
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:clamp(28px,5vw,60px);
          align-items:start;
        }

        @media(max-width:900px){
          .about-inner { grid-template-columns:1fr; gap:36px; }
          .right-col { order: -1; }
        }

        /* Left text */
        .tag-row { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
        .tag-dash { width:70px; height:1px; background:linear-gradient(90deg,#0066cc,transparent); }
        .tag-label { color:#5a80a0; font-size:15px; font-weight:700; letter-spacing:.22em; text-transform:uppercase; }

        .main-title {
          font-family:'Barlow Condensed',sans-serif;
          font-size:clamp(2rem,6vw,6rem);
          font-weight:900; line-height:1.02;
          margin-bottom:clamp(16px,2vw,24px);
        }
        .title-white { color:#fff; display:block; text-shadow:0 0 28px rgba(255,255,255,.18); }
        .title-blue  { color:#1a9fff; display:block; text-shadow:0 0 18px #0077ff,0 0 38px #0055cc,0 0 65px #003399; letter-spacing:-.01em; }

        .title-bar {
          width:56px; height:3px;
          background:linear-gradient(90deg,#0077ff,#00aaff);
          border-radius:2px; box-shadow:0 0 10px #0077ff;
          margin-bottom:clamp(18px,2.5vw,28px);
        }

        .stats-row {
          display:flex; gap:clamp(20px,4vw,48px);
          margin-bottom:clamp(18px,2.5vw,28px);
          flex-wrap:wrap;
        }
        .stat-card { display:flex; flex-direction:column; align-items:center; gap:5px; min-width:72px; cursor:default; }
        .stat-value {
          color:#1a9fff;
          font-family:'Barlow Condensed',sans-serif;
          font-weight:800; font-size:clamp(.8rem,1.8vw,1.95rem);
          letter-spacing:.06em;
          text-shadow:0 0 10px #0077ff;
        }
        .stat-label { color:#5a7a90; font-size:9px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; text-align:center; }

        .body-text { color:#8aaabf; font-size:clamp(13px,1.4vw,20px); line-height:1.7; margin-bottom:clamp(18px,2.5vw,28px); max-width:480px; }
        .body-text span.hl { color:#1a9fff; font-weight:700; text-shadow:0 0 8px #0066ff; }

        /* Right column images */
        .right-col { display:flex; flex-direction:column; gap:clamp(10px,1.5vw,16px); }
        .small-row { display:flex; gap:clamp(8px,1.2vw,14px); }
        .small-item { flex:1; }

        /* Circuit traces */
        .circuits {
          position:absolute; inset:0; pointer-events:none;
          z-index:1; opacity:.22;
        }
      `}</style>

      <section className="about-section">
        <ParticleBg />

        {/* Circuit traces */}
        <svg className="circuits" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="10%" x2="7%" y2="10%" stroke="#0077ff" strokeWidth="1"/>
          <circle cx="7%" cy="10%" r="2.5" fill="#00aaff"/>
          <line x1="7%" y1="10%" x2="7%" y2="22%" stroke="#0077ff" strokeWidth="1"/>
          <circle cx="7%" cy="22%" r="2" fill="#00aaff"/>
          <line x1="7%" y1="22%" x2="20%" y2="22%" stroke="#0077ff" strokeWidth="1"/>
          <line x1="0" y1="88%" x2="10%" y2="88%" stroke="#0077ff" strokeWidth="1"/>
          <circle cx="10%" cy="88%" r="2" fill="#00aaff"/>
          <line x1="10%" y1="88%" x2="10%" y2="76%" stroke="#0077ff" strokeWidth="1"/>
          <line x1="100%" y1="15%" x2="93%" y2="15%" stroke="#0077ff" strokeWidth="1"/>
          <circle cx="93%" cy="15%" r="2.5" fill="#00aaff"/>
          <line x1="93%" y1="15%" x2="93%" y2="28%" stroke="#0077ff" strokeWidth="1"/>
          <line x1="100%" y1="80%" x2="91%" y2="80%" stroke="#0077ff" strokeWidth="1"/>
          <circle cx="91%" cy="80%" r="2" fill="#00aaff"/>
          {[[3,45],[5,68],[14,92],[88,44],[96,60],[48,4],[72,94],[25,6]].map(([x,y],i)=>(
            <circle key={i} cx={`${x}%`} cy={`${y}%`} r="1.5" fill="#00ccff" opacity=".8"/>
          ))}
        </svg>

        {/* Ambient blobs */}
        {[{l:'8%',t:'50%',w:480,c:'#001d55'},{l:'75%',t:'35%',w:400,c:'#002e88'},{l:'50%',t:'88%',w:300,c:'#001133'}].map((b,i)=>(
          <div key={i} style={{ position:'absolute', left:b.l, top:b.t, width:b.w, height:b.w, borderRadius:'50%', background:`radial-gradient(circle,${b.c} 0%,transparent 70%)`, filter:'blur(65px)', opacity:.45, transform:'translate(-50%,-50%)', zIndex:0, pointerEvents:'none' }}/>
        ))}

        <div className="about-inner">

          {/* ── LEFT: text ── */}
          <div>
            <div className="tag-row">
              <span className="tag-label">About Us</span>
              <div className="tag-dash" />
            </div>

            <h1 className="main-title">
              <span className="title-white">We Are</span>
              <span className="title-blue">Statement</span>
              <span className="title-white">Security</span>
            </h1>
            <div className="title-bar" />

            {/* Stats */}
            <div className="stats-row">
              {stats.map((s, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-icon">{s.icon}</div>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <p className="body-text">
              The safety and security of our clients is our ultimate goal. International Statement Security Services was founded in 2012 by an ex-special forces soldier and is recognised as the best bodyguard service.
            </p>
            <p className="body-text">
              <span className="hl">With over 25 years</span> of experience in providing protection and bodyguard services, we also offer{' '}
              <span className="hl">private security, close protection, asset protection, and residential security teams.</span>
            </p>

            <button className="learn-btn" style={{
              background:'linear-gradient(90deg,#0033aa,#0055cc,#0033aa)',
              border:'1.5px solid #0077ff',
              borderRadius:6,
              padding:'12px 28px',
              color:'#fff',
              fontSize:13, fontWeight:700,
              fontFamily:"'Barlow Condensed',sans-serif",
              letterSpacing:'.16em',
              textTransform:'uppercase',
              cursor:'pointer',
              display:'flex', alignItems:'center', gap:10,
            }}>
              Learn More
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M2 2L7 7L2 12" stroke="#00aaff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 2L14 7L9 12" stroke="#00aaff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* ── RIGHT: images ── */}
          <div className="right-col">
            {/* Large */}
            <HUDFrame>
              <div style={{ aspectRatio:'16/11', background:'#040e1e' }}>
                {/* <AgentScene /> */}
                <img src={Owners?.src}/>
              </div>
            </HUDFrame>

            {/* Three small */}
            <div className="small-row">
              {[0,1,2].map(v => (
                <div key={v} className="small-item">
                  <HUDFrame small>
                    <div style={{ aspectRatio:'4/3', background:'#030c18' }}>
                      <SmallScene v={v} />
                    </div>
                  </HUDFrame>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}