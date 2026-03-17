"use client"
import { SITE_CONFIG } from '@/data/siteData'

export default function Footer() {
  return (
    <footer
      style={{
        padding: "clamp(24px,5vw,36px) clamp(16px,6vw,52px)",
        borderTop: "1px solid rgba(0,212,255,0.07)",
        background: "var(--bg)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Logo / Brand */}
      <div
        style={{
          fontFamily: "Orbitron, monospace",
          fontSize: "clamp(13px,2.5vw,12px)",
          fontWeight: 700,
          letterSpacing: "3px",
          color: "var(--text)",
        }}
      >
        <span style={{ color: "var(--c)" }}>{SITE_CONFIG.shortName}</span>
        {" · "}
        {SITE_CONFIG.name}
      </div>

      {/* Copyright */}
      <div
        style={{
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: "clamp(12px,2.5vw,9px)",
          letterSpacing: "2px",
          color: "var(--muted)",
          textTransform: "uppercase",
          textAlign: "center",
          flex: "1 1 200px",
        }}
      >
        © 2026 · All rights reserved · Licensed & Insured
      </div>

      {/* Links */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "18px",
          justifyContent: "center",
        }}
      >
        {["Privacy", "Terms", "Contact"].map((label) => (
          <a
            key={label}
            href={label === "Contact" ? "#contact" : "#"}
            style={{
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: "clamp(12px,2.5vw,9px)",
              letterSpacing: "1.5px",
              color: "var(--muted)",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "color 0.2s",
              cursor: "none",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--c)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--muted)")
            }
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}