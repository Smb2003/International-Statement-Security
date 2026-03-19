'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import logo   from '@/assets/LogoISSS.png'
import footerBg from '@/assets/footer.webp'

// ── Icons ──────────────────────────────────────────────────
const LinkedInIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
const InstagramIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
const TwitterIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const PhoneIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="rgba(200,30,30,0.85)" strokeWidth="1.6" width="15" height="15" style={{flexShrink:0,marginTop:2}}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1C7.16 21 2 15.84 2 6a1 1 0 011-1z"/></svg>
const MailIcon      = () => <svg viewBox="0 0 24 24" fill="none" stroke="rgba(200,30,30,0.85)" strokeWidth="1.6" width="15" height="15" style={{flexShrink:0,marginTop:2}}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8l10 7 10-7"/></svg>
const PinIcon       = () => <svg viewBox="0 0 24 24" fill="none" stroke="rgba(200,30,30,0.85)" strokeWidth="1.6" width="15" height="15" style={{flexShrink:0,marginTop:2}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
const ClockIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="rgba(200,30,30,0.85)" strokeWidth="1.6" width="15" height="15" style={{flexShrink:0,marginTop:2}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

const SERVICES = ['Close Protection','VIP Security','Event Security','Residential Security','Secure Chauffeur']
const COMPANY  = [['About','/About'],['Operations','#'],['Partners','#'],['Careers','#'],['Contact','#']]
const SOCIALS  = [{ icon:<LinkedInIcon/>, href:'#', label:'LinkedIn' },{ icon:<InstagramIcon/>, href:'#', label:'Instagram' },{ icon:<TwitterIcon/>, href:'#', label:'Twitter' }]

// ── Stagger variants ───────────────────────────────────────
const wrap = { hidden:{}, show:{ transition:{ staggerChildren:0.1, delayChildren:0.1 } } }
const item = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0, transition:{ duration:0.6, ease:[0.22,1,0.36,1] as any } } }

// ── Animated link ──────────────────────────────────────────
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 6 }}
      transition={{ type:'spring', stiffness:320, damping:22 }}
      style={{ color:'#fcfcfc', textDecoration:'none', fontSize:15, display:'flex', alignItems:'center', gap:8 }}
      onMouseEnter={e=>(e.currentTarget.style.color='#ffffff')}
      onMouseLeave={e=>(e.currentTarget.style.color='#f6f9fb')}
    >
      <span style={{ width:5, height:5, borderRadius:'50%', background:'rgba(200,30,30,0.55)', flexShrink:0, boxShadow:'0 0 5px rgba(200,30,30,0.4)' }}/>
      {children}
    </motion.a>
  )
}

// ── Column heading ─────────────────────────────────────────
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom:16 }}>
      <h4 style={{ color:'#cc1a1a', fontSize:15, fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:8 }}>
        {children}
      </h4>
      <div style={{ width:28, height:1.5, background:'linear-gradient(90deg,rgba(200,30,30,0.7),transparent)' }}/>
    </div>
  )
}

export default function Footer() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, margin:'-50px' })

  return (
    <footer
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',           /* ← full screen width */
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        color: '#f6f8f9',
        boxSizing: 'border-box',
        background:"black"
      }}
    >

      {/* ── Background image — NEXT/IMAGE approach for Next.js ──
          We use a plain <img> with object-fit:cover so it never
          compresses or stretches regardless of screen size.         */}
      <img
        src={footerBg.src}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'fill',
          objectPosition: 'center',   /* show top = people visible */
          pointerEvents: 'none',
          zIndex: 1,
          display: 'block',
        }}
      />

      {/* ── Overlay layers ── */}
      {/* Base dark — lighter so bg image is visible */}
      <div style={{ position:'absolute', inset:0, background:'rgba(4,0,0,0.52)', zIndex:1, pointerEvents:'none' }}/>
      {/* Bottom fade */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'35%', background:'linear-gradient(to bottom, transparent, rgba(0,0,0,0.88))', zIndex:2, pointerEvents:'none' }}/>
      {/* Red top accent line */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(220,30,30,0.65),transparent)', zIndex:3 }}/>
      {/* Subtle red bottom glow */}
      <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'50%', height:120, background:'radial-gradient(ellipse,rgba(130,0,0,0.2) 0%,transparent 70%)', filter:'blur(18px)', zIndex:2, pointerEvents:'none' }}/>

      {/* ── Content ── */}
      <div style={{ position:'relative', zIndex:4, width:'100%', maxWidth:'100%', boxSizing:'border-box', padding:'clamp(48px,7vw,80px) clamp(20px,6vw,80px) 0' }}>

        {/* Top divider sweep */}
        <motion.div
          initial={{ scaleX:0, opacity:0 }}
          animate={inView?{scaleX:1, opacity:1}:{}}
          transition={{ duration:1, ease:'easeOut' }}
          style={{ height:1, originX:0, background:'linear-gradient(90deg,rgba(200,30,30,0.55),rgba(200,30,30,0.15),transparent)', marginBottom:'clamp(36px,5vw,56px)' }}
        />

        {/* 4-column grid */}
        <motion.div
          variants={wrap} initial="hidden" animate={inView?'show':'hidden'}
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(28px,4vw,52px)',
            alignItems: 'start',
            width: '100%',
          }}
        >

          {/* COL 1 — Brand */}
          <motion.div variants={item} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* Logo */}
            <div style={{ width:90, height:90, borderRadius:'50%', overflow:'hidden', border:'1.5px solid rgba(200,30,30,0.4)', boxShadow:'0 0 24px rgba(160,0,0,0.3)', flexShrink:0 }}>
              <img src={logo.src} alt="ISSS" style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'center', display:'block', background:'rgba(0,0,0,0.3)' }}/>
            </div>
            <p style={{ fontSize:13, lineHeight:1.65, color:'#ffffff' }}>
              Professional private security and close protection services operating globally
              with elite operators and strategic planning.
            </p>
            {/* Social row */}
            <div style={{ display:'flex', gap:10, marginTop:4 }}>
              {SOCIALS.map(({ icon, href, label }) => (
                <motion.a key={label} href={href} aria-label={label}
                  whileHover={{ scale:1.15, y:-2 }} whileTap={{ scale:.95 }}
                  style={{
                    width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center',
                    border:'1px solid rgba(200,30,30,0.3)', color:'#7a9aaa', textDecoration:'none',
                    clipPath:'polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))',
                    transition:'all .2s',
                  }}
                  onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(220,30,30,0.8)'; el.style.color='#ff3030'; el.style.background='rgba(160,0,0,0.15)' }}
                  onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(200,30,30,0.3)'; el.style.color='#7a9aaa'; el.style.background='transparent' }}
                >{icon}</motion.a>
              ))}
            </div>
          </motion.div>

          {/* COL 2 — Services */}
          <motion.div variants={item} style={{ display:'flex', flexDirection:'column' }}>
            <ColHeading>Services</ColHeading>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {SERVICES.map(s => <FooterLink key={s} href="#">{s}</FooterLink>)}
            </div>
          </motion.div>

          {/* COL 3 — Company */}
          <motion.div variants={item} style={{ display:'flex', flexDirection:'column' }}>
            <ColHeading>Company</ColHeading>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {COMPANY.map(([label,href]) => <FooterLink key={label} href={href}>{label}</FooterLink>)}
            </div>
          </motion.div>

          {/* COL 4 — Contact */}
          <motion.div variants={item} style={{ display:'flex', flexDirection:'column' }}>
            <ColHeading>Contact</ColHeading>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {[
                { icon:<ClockIcon/>, content:'24/7 Operations Center', isLink:false },
                { icon:<PhoneIcon/>, content:'+1 (631) 336-7291',      href:'tel:+16313367291' },
                { icon:<MailIcon/>,  content:'info@statementsecurity.com', href:'mailto:info@statementsecurity.com' },
                { icon:<PinIcon/>,   content:'New York · London · Dubai\n Abu Dhabi · Rome · Tirana · Doha', isLink:false, multi:true },
              ].map(({ icon, content, href, isLink, multi }, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:9 }}>
                  {icon}
                  {href ? (
                    <a href={href} style={{ color:'#ffffff', fontSize:15, textDecoration:'none', lineHeight:1.5, wordBreak:'break-all' }}
                       onMouseEnter={e=>(e.currentTarget.style.color='#fff')}
                       onMouseLeave={e=>(e.currentTarget.style.color='#7a9aaa')}>
                      {content}
                    </a>
                  ) : (
                    <p style={{ color:'#ffffff', fontSize:15, lineHeight:1.55, margin:0 }}>
                      {multi ? content.split('\n').map((l,i)=><span key={i} style={{display:'block'}}>{l}</span>) : content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ duration:.7, delay:.55 }}
          style={{
            marginTop: 'clamp(32px,4vw,52px)',
            paddingTop: 18,
            paddingBottom: 'clamp(20px,3vw,32px)',
            borderTop: '1px solid rgba(200,30,30,0.12)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <p style={{ fontSize:15, color:'#ffffff' }}>
            © {new Date().getFullYear()} International Statement Security Services. All rights reserved.
          </p>
          <div style={{ display:'flex', gap:20 }}>
            {['Privacy Policy','Terms of Service'].map(l=>(
              <a key={l} href="#" style={{ fontSize:15, color:'#ffffff', textDecoration:'none' }}
                 onMouseEnter={e=>(e.currentTarget.style.color='#ffffff')}
                 onMouseLeave={e=>(e.currentTarget.style.color='#ffffff')}>{l}</a>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Responsive breakpoints (CSS-in-JS via style tag) ── */}
      <style>{`
        /* Tablet: 2 columns */
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        /* Mobile: 1 column */
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </footer>
  )
}