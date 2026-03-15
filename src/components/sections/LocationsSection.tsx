// 'use client'

// import { useState, useRef } from 'react'
// import { motion, useInView } from 'framer-motion'
// import { LOCATIONS } from '@/data/siteData'

// export default function LocationsSection() {
//   const [active, setActive] = useState(0)
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-100px' })
//   const loc = LOCATIONS[active]

//   return (
//     <section
//       id="locations"
//       ref={ref}
//       style={{
//         padding: '100px 52px',
//         background: 'var(--bg3)',
//         position: 'relative',
//         zIndex: 2,
//       }}
//     >
//       <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 28 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7 }}
//           style={{ marginBottom: 40 }}
//         >
//           <div className="section-tag">
//             <span className="section-tag-dash" />
//             <span className="section-tag-label">Global Footprint · {LOCATIONS.length} Active Locations</span>
//           </div>
//           <h2 className="section-title">Deployed <em>Worldwide</em></h2>
//           <p className="section-sub">
//             Strategic presence across Europe, Middle East, and North America —
//             ready to deploy within hours, anywhere.
//           </p>
//         </motion.div>

//         {/* Map */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           style={{
//             border: '1px solid rgba(0,212,255,0.1)',
//             background: '#030710',
//             position: 'relative',
//             overflow: 'hidden',
//           }}
//         >
//           {/* Perspective grid floor */}
//           <div style={{
//             position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
//             backgroundImage: 'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
//             backgroundSize: '48px 48px',
//             transform: 'perspective(400px) rotateX(55deg)',
//             transformOrigin: 'bottom',
//             pointerEvents: 'none',
//           }} />

//           {/* SVG World Map */}
//           <svg viewBox="0 0 900 420" style={{ width: '100%', display: 'block' }}>
//             {/* Grid lines */}
//             <g stroke="#00D4FF" strokeWidth="0.3" opacity="0.05">
//               {[84,126,168,210,252,294,336].map(y => <line key={y} x1="0" y1={y} x2="900" y2={y}/>)}
//               {[100,200,300,400,500,600,700,800].map(x => <line key={x} x1={x} y1="0" x2={x} y2="420"/>)}
//             </g>

//             {/* Continent fills */}
//             <path d="M50,74 L150,64 L190,84 L210,124 L200,174 L180,214 L160,254 L130,274 L110,254 L90,234 L70,194 L50,154 L40,114 Z" fill="#0c1a2c" stroke="#00D4FF" strokeWidth="0.7" opacity="0.75"/>
//             <path d="M140,284 L190,274 L210,304 L200,354 L180,394 L150,414 L130,394 L120,354 L120,314 Z" fill="#0c1a2c" stroke="#00D4FF" strokeWidth="0.7" opacity="0.75"/>
//             <path d="M370,54 L440,49 L470,64 L480,94 L460,114 L430,124 L400,114 L380,94 L365,74 Z" fill="#0c1a2c" stroke="#00D4FF" strokeWidth="0.7" opacity="0.75"/>
//             <path d="M350,66 L365,62 L370,74 L360,82 L348,76 Z" fill="#112032" stroke="#00D4FF" strokeWidth="1" opacity="1"/>
//             <path d="M390,144 L450,134 L480,154 L490,214 L480,284 L450,324 L420,334 L390,304 L370,254 L370,194 L380,164 Z" fill="#0c1a2c" stroke="#00D4FF" strokeWidth="0.7" opacity="0.75"/>
//             <path d="M480,114 L550,104 L580,124 L580,164 L550,174 L510,169 L480,154 Z" fill="#112032" stroke="#00D4FF" strokeWidth="0.8" opacity="1"/>
//             <path d="M560,44 L750,34 L790,74 L790,154 L750,174 L690,184 L630,174 L580,164 L560,144 L550,104 L560,64 Z" fill="#0c1a2c" stroke="#00D4FF" strokeWidth="0.7" opacity="0.75"/>
//             <path d="M420,109 L435,104 L440,124 L430,139 L418,132 Z" fill="#112032" stroke="#00D4FF" strokeWidth="0.9" opacity="1"/>
//             <path d="M445,107 L455,104 L458,119 L450,124 L443,118 Z" fill="#112032" stroke="#00D4FF" strokeWidth="0.9" opacity="1"/>

//             {/* Arc connection lines from London */}
//             <g opacity="0.18">
//               {[
//                 "M355,68 Q255,34 155,140",
//                 "M355,68 Q415,44 481,99",
//                 "M355,68 Q440,44 520,124",
//                 "M355,68 Q390,54 428,111",
//                 "M355,68 Q400,49 451,110",
//               ].map((d, i) => (
//                 <path key={i} d={d} fill="none" stroke="#00D4FF" strokeWidth="0.8" strokeDasharray="3 5"/>
//               ))}
//             </g>

//             {/* Location nodes */}
//             {LOCATIONS.map((location, i) => (
//               <g
//                 key={location.id}
//                 onClick={() => setActive(i)}
//                 style={{ cursor: 'none' }}
//               >
//                 <circle cx={location.mapX} cy={location.mapY} r={i === active ? 16 : 12}
//                   fill="#00D4FF" fillOpacity={i === active ? 0.12 : 0.05}/>
//                 <circle cx={location.mapX} cy={location.mapY} r={i === active ? 6 : 4} fill="#00D4FF"/>
//                 <circle cx={location.mapX} cy={location.mapY} r={i === active ? 6 : 4}
//                   fill="#00D4FF" opacity="0.5">
//                   <animate attributeName="r" values={`${i===active?6:4};${i===active?18:13};${i===active?6:4}`} dur={`${2+i*0.3}s`} repeatCount="indefinite"/>
//                   <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2+i*0.3}s`} repeatCount="indefinite"/>
//                 </circle>
//                 <rect
//                   x={location.mapX - (location.city === 'Abu Dhabi' ? 30 : 22)}
//                   y={location.mapY - 22}
//                   width={location.city === 'Abu Dhabi' ? 60 : 44}
//                   height={14} rx={2}
//                   fill="#030710"
//                   stroke={i === active ? '#00D4FF' : '#00D4FF33'}
//                   strokeWidth={i === active ? 0.8 : 0.5}
//                 />
//                 <text
//                   x={location.mapX} y={location.mapY - 11}
//                   textAnchor="middle"
//                   fontFamily="'Share Tech Mono', monospace"
//                   fontSize={location.city.length > 6 ? 6.5 : 7.5}
//                   fill={i === active ? '#00D4FF' : '#00D4FF99'}
//                   letterSpacing="1"
//                 >
//                   {location.city.toUpperCase()}
//                 </text>
//               </g>
//             ))}

//             {/* HUD overlay text */}
//             <text x="14" y="17" fontFamily="'Share Tech Mono', monospace" fontSize="7.5" fill="#00D4FF40" letterSpacing="2">
//               GLOBAL OPERATIONS NETWORK
//             </text>
//             <path d="M882,8 L894,8 L894,20" fill="none" stroke="#00D4FF55" strokeWidth="1"/>
//             <path d="M6,412 L6,424 L18,424" fill="none" stroke="#00D4FF55" strokeWidth="1"/>
//           </svg>
//         </motion.div>

//         {/* Detail panel */}
//         <div style={{
//           borderTop: '1px solid rgba(0,212,255,0.1)',
//           padding: '26px 36px',
//           background: 'rgba(3,7,15,0.95)',
//           display: 'flex', alignItems: 'center',
//           justifyContent: 'space-between', gap: 20,
//           minHeight: 96,
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
//             <div style={{
//               fontFamily: 'Orbitron, monospace',
//               fontSize: 30, fontWeight: 700,
//               color: 'var(--c)', minWidth: 50,
//             }}>
//               {loc.id}
//             </div>
//             <div style={{ width: 1, height: 46, background: 'rgba(0,212,255,0.1)' }} />
//             <div>
//               <div style={{
//                 fontFamily: 'Orbitron, monospace', fontSize: 17,
//                 fontWeight: 600, color: 'var(--text)',
//               }}>
//                 {loc.city}, {loc.country}
//               </div>
//               <div style={{
//                 fontFamily: '"Share Tech Mono", monospace',
//                 fontSize: 10, letterSpacing: '2px',
//                 color: 'var(--muted)', textTransform: 'uppercase', marginTop: 4,
//               }}>
//                 {loc.region}
//               </div>
//             </div>
//             <div style={{ width: 1, height: 46, background: 'rgba(0,212,255,0.1)' }} />
//             <p style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 360, lineHeight: 1.6 }}>
//               {loc.description}
//             </p>
//           </div>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
//             {loc.tags.map(tag => (
//               <span key={tag} style={{
//                 fontFamily: '"Share Tech Mono", monospace',
//                 fontSize: 9, letterSpacing: '1.5px',
//                 color: 'var(--c)',
//                 border: '1px solid rgba(0,212,255,0.22)',
//                 padding: '5px 12px', textTransform: 'uppercase',
//               }}>
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Types ──────────────────────────────────────────────
interface Location {
  id: string
  city: string
  country: string
  region: string
  description: string
  tags: string[]
  mapX: number
  mapY: number
}

// ── Mock data (replace with your LOCATIONS import) ─────
const LOCATIONS: Location[] = [
  {
    id: '01',
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe · HQ',
    description: 'Primary operations hub for Europe and global coordination. Specialised diplomatic and executive protection units on permanent standby.',
    tags: ['Executive Protection', 'Diplomatic', 'HQ'],
    mapX: 355, mapY: 68,
  },
  {
    id: '02',
    city: 'New York',
    country: 'United States',
    region: 'North America',
    description: 'Corporate security operations serving Fortune 500 clients across the Eastern Seaboard with rapid deployment capability.',
    tags: ['Corporate', 'VIP Security', 'Rapid Deploy'],
    mapX: 155, mapY: 140,
  },
  {
    id: '03',
    city: 'Dubai',
    country: 'UAE',
    region: 'Gulf Region',
    description: 'High-net-worth protection and government liaison operations across the Gulf Cooperation Council states.',
    tags: ['HNW Protection', 'Government', 'Gulf'],
    mapX: 520, mapY: 138,
  },
  {
    id: '04',
    city: 'Doha',
    country: 'Qatar',
    region: 'Middle East',
    description: 'Elite VIP and executive protection services for royalty, dignitaries, and corporate principals throughout Qatar and the wider region.',
    tags: ['VIP', 'Royal Protection', 'Middle East'],
    mapX: 430, mapY: 124,
  },
  {
    id: '05',
    city: 'Abu Dhabi',
    country: 'UAE',
    region: 'Gulf Region',
    description: 'Government and institutional security services, including embassy protection and critical infrastructure advisory.',
    tags: ['Government', 'Embassy', 'Infrastructure'],
    mapX: 451, mapY: 135,
  },
  {
    id: '06',
    city: 'Tirana',
    country: 'Albania',
    region: 'Balkans · Europe',
    description: 'Strategic operations base for the Balkans region, supporting cross-border intelligence and mobile protection teams.',
    tags: ['Strategic Ops', 'Intelligence', 'Balkans'],
    mapX: 481, mapY: 99,
  },
]

export default function LocationsSection() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const loc = LOCATIONS[active]

  return (
    <section
      id="locations"
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 5vw, 52px)',
        background: 'var(--bg3, #06101a)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700&family=Rajdhani:wght@400;500;600&display=swap');

        /* Detail panel: horizontal on desktop, stacked on mobile */
        .loc-detail-panel {
          border-top: 1px solid rgba(0,212,255,0.1);
          padding: clamp(18px, 3vw, 26px) clamp(16px, 3vw, 36px);
          background: rgba(3,7,15,0.95);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          min-height: 96px;
          flex-wrap: wrap;
        }

        .loc-detail-left {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          flex: 1;
          min-width: 0;
        }

        .loc-divider {
          width: 1px;
          height: 46px;
          background: rgba(0,212,255,0.1);
          flex-shrink: 0;
        }

        .loc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .loc-tag-pill {
          font-family: 'Share Tech Mono', 'Courier New', monospace;
          font-size: 9px;
          letter-spacing: 1.5px;
          color: var(--c, #00d4ff);
          border: 1px solid rgba(0,212,255,0.22);
          padding: 5px 10px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .section-tag-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .stag-dash {
          display: inline-block;
          width: 28px; height: 1px;
          background: var(--c, #00d4ff);
          flex-shrink: 0;
        }

        .stag-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          letter-spacing: 0.25em;
          color: var(--c, #00d4ff);
          text-transform: uppercase;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .loc-detail-panel {
            flex-direction: column;
            align-items: flex-start;
          }
          .loc-divider { display: none; }
          .loc-detail-left { gap: 12px; }
          .loc-id-num { font-size: 22px !important; }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .loc-detail-left { flex-direction: column; align-items: flex-start; gap: 10px; }
          .loc-id-num { font-size: 20px !important; min-width: unset !important; }
          .loc-desc { font-size: 13px !important; }
          .loc-tag-pill { font-size: 8px; padding: 4px 8px; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 'clamp(28px, 4vw, 40px), display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column"' }}
        >
          <div className="section-tag-wrap">
            <span className="stag-dash" />
            <span className="stag-label">
              Global Footprint · {LOCATIONS.length} Active Locations
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 900,
              fontSize: 'clamp(22px, 3.5vw, 38px)',
              letterSpacing: '0.12em',
              color: '#cce8f4',
              margin: '0 0 14px',
              lineHeight: 1.2,
            }}
          >
            Deployed{' '}
            <em style={{ color: 'var(--c, #00d4ff)', fontStyle: 'normal' }}>Worldwide</em>
          </h2>

          <p
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: 'clamp(14px, 1.6vw, 16px)',
              color: '#3a6878',
              lineHeight: 1.7,
              maxWidth: 520,
              margin: 0,
            }}
          >
            Strategic presence across Europe, Middle East, and North America —
            ready to deploy within hours, anywhere.
          </p>
        </motion.div>

        {/* ── Map container ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            border: '1px solid rgba(0,212,255,0.1)',
            borderBottom: 'none',
            background: '#030710',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Perspective grid floor */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            transform: 'perspective(400px) rotateX(55deg)',
            transformOrigin: 'bottom',
            pointerEvents: 'none',
          }} />

          {/* SVG World Map */}
          <svg
            viewBox="0 0 900 420"
            style={{ width: '100%', display: 'block' }}
          >
            {/* Grid lines */}
            <g stroke="#00D4FF" strokeWidth="0.3" opacity="0.05">
              {[84,126,168,210,252,294,336].map(y => (
                <line key={y} x1="0" y1={y} x2="900" y2={y} />
              ))}
              {[100,200,300,400,500,600,700,800].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="420" />
              ))}
            </g>

            {/* Continent fills */}
            <path d="M50,74 L150,64 L190,84 L210,124 L200,174 L180,214 L160,254 L130,274 L110,254 L90,234 L70,194 L50,154 L40,114 Z" fill="#0c1a2c" stroke="#00D4FF" strokeWidth="0.7" opacity="0.75"/>
            <path d="M140,284 L190,274 L210,304 L200,354 L180,394 L150,414 L130,394 L120,354 L120,314 Z" fill="#0c1a2c" stroke="#00D4FF" strokeWidth="0.7" opacity="0.75"/>
            <path d="M370,54 L440,49 L470,64 L480,94 L460,114 L430,124 L400,114 L380,94 L365,74 Z" fill="#0c1a2c" stroke="#00D4FF" strokeWidth="0.7" opacity="0.75"/>
            <path d="M350,66 L365,62 L370,74 L360,82 L348,76 Z" fill="#112032" stroke="#00D4FF" strokeWidth="1" opacity="1"/>
            <path d="M390,144 L450,134 L480,154 L490,214 L480,284 L450,324 L420,334 L390,304 L370,254 L370,194 L380,164 Z" fill="#0c1a2c" stroke="#00D4FF" strokeWidth="0.7" opacity="0.75"/>
            <path d="M480,114 L550,104 L580,124 L580,164 L550,174 L510,169 L480,154 Z" fill="#112032" stroke="#00D4FF" strokeWidth="0.8" opacity="1"/>
            <path d="M560,44 L750,34 L790,74 L790,154 L750,174 L690,184 L630,174 L580,164 L560,144 L550,104 L560,64 Z" fill="#0c1a2c" stroke="#00D4FF" strokeWidth="0.7" opacity="0.75"/>
            <path d="M420,109 L435,104 L440,124 L430,139 L418,132 Z" fill="#112032" stroke="#00D4FF" strokeWidth="0.9" opacity="1"/>
            <path d="M445,107 L455,104 L458,119 L450,124 L443,118 Z" fill="#112032" stroke="#00D4FF" strokeWidth="0.9" opacity="1"/>

            {/* Arc connection lines */}
            <g opacity="0.18">
              {[
                "M355,68 Q255,34 155,140",
                "M355,68 Q415,44 481,99",
                "M355,68 Q440,44 520,124",
                "M355,68 Q390,54 428,111",
                "M355,68 Q400,49 451,110",
              ].map((d, i) => (
                <path key={i} d={d} fill="none" stroke="#00D4FF" strokeWidth="0.8" strokeDasharray="3 5"/>
              ))}
            </g>

            {/* Location nodes */}
            {LOCATIONS.map((location, i) => (
              <g
                key={location.id}
                onClick={() => setActive(i)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={location.mapX} cy={location.mapY}
                  r={i === active ? 16 : 12}
                  fill="#00D4FF"
                  fillOpacity={i === active ? 0.12 : 0.05}
                />
                <circle
                  cx={location.mapX} cy={location.mapY}
                  r={i === active ? 6 : 4}
                  fill="#00D4FF"
                />
                <circle
                  cx={location.mapX} cy={location.mapY}
                  r={i === active ? 6 : 4}
                  fill="#00D4FF"
                  opacity="0.5"
                >
                  <animate attributeName="r" values={`${i===active?6:4};${i===active?18:13};${i===active?6:4}`} dur={`${2+i*0.3}s`} repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2+i*0.3}s`} repeatCount="indefinite"/>
                </circle>
                <rect
                  x={location.mapX - (location.city.length > 6 ? 30 : 22)}
                  y={location.mapY - 22}
                  width={location.city.length > 6 ? 60 : 44}
                  height={14}
                  rx={2}
                  fill="#030710"
                  stroke={i === active ? '#00D4FF' : '#00D4FF33'}
                  strokeWidth={i === active ? 0.8 : 0.5}
                />
                <text
                  x={location.mapX} y={location.mapY - 11}
                  textAnchor="middle"
                  fontFamily="'Share Tech Mono', monospace"
                  fontSize={location.city.length > 6 ? 6.5 : 7.5}
                  fill={i === active ? '#00D4FF' : '#00D4FF99'}
                  letterSpacing="1"
                >
                  {location.city.toUpperCase()}
                </text>
              </g>
            ))}

            {/* HUD overlay */}
            <text x="14" y="17" fontFamily="'Share Tech Mono', monospace" fontSize="7.5" fill="#00D4FF40" letterSpacing="2">
              GLOBAL OPERATIONS NETWORK
            </text>
            <path d="M882,8 L894,8 L894,20" fill="none" stroke="#00D4FF55" strokeWidth="1"/>
            <path d="M6,412 L6,424 L18,424" fill="none" stroke="#00D4FF55" strokeWidth="1"/>
          </svg>
        </motion.div>

        {/* ── Location tabs (mobile-friendly pill row) ── */}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: 6,
            padding: '10px clamp(16px, 3vw, 36px)',
            background: 'rgba(3,7,15,0.9)',
            borderLeft: '1px solid rgba(0,212,255,0.1)',
            borderRight: '1px solid rgba(0,212,255,0.1)',
            scrollbarWidth: 'none',
          }}
        >
          {LOCATIONS.map((location, i) => (
            <button
              key={location.id}
              onClick={() => setActive(i)}
              style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: 9,
                letterSpacing: '0.12em',
                color: i === active ? '#00d4ff' : '#1e5060',
                border: `1px solid ${i === active ? 'rgba(0,212,255,0.45)' : 'rgba(0,212,255,0.1)'}`,
                background: i === active ? 'rgba(0,212,255,0.08)' : 'transparent',
                padding: '6px 14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              {location.city.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ── Detail panel ── */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="loc-detail-panel"
          style={{ border: '1px solid rgba(0,212,255,0.1)' }}
        >
          {/* Left block */}
          <div className="loc-detail-left">
            {/* ID number */}
            <div
              className="loc-id-num"
              style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--c, #00d4ff)',
                minWidth: 46,
                flexShrink: 0,
              }}
            >
              {loc.id}
            </div>

            <div className="loc-divider" />

            {/* City + region */}
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: 'clamp(13px, 1.6vw, 17px)',
                  fontWeight: 600,
                  color: 'var(--text, #cce8f4)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {loc.city}, {loc.country}
              </div>
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '2px',
                  color: 'var(--muted, #3a6878)',
                  textTransform: 'uppercase',
                  marginTop: 4,
                }}
              >
                {loc.region}
              </div>
            </div>

            <div className="loc-divider" />

            {/* Description */}
            <p
              className="loc-desc"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: 'clamp(12px, 1.3vw, 14px)',
                color: 'var(--muted, #3a6878)',
                maxWidth: 360,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {loc.description}
            </p>
          </div>

          {/* Tags */}
          <div className="loc-tags">
            {loc.tags.map(tag => (
              <span key={tag} className="loc-tag-pill">{tag}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}