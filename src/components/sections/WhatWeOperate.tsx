import { useState, useEffect } from "react";

interface Location {
  id: number;
  city: string;
  country: string;
  service: string;
  tag: string;
  coords: string;
  image: string;
}

const locations: Location[] = [
  {
    id: 1,
    city: "QATAR",
    country: "DOHA",
    service: "Executive Protection & VIP Security",
    tag: "MIDDLE EAST",
    coords: "25.2854° N, 51.5310° E",
    image:
      "https://images.unsplash.com/photo-1566288623394-377af472d81b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    city: "DUBAI",
    country: "UAE",
    service: "High-Net-Worth Protection Unit",
    tag: "GULF REGION",
    coords: "25.2048° N, 55.2708° E",
    image:
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    city: "ABU DHABI",
    country: "UAE",
    service: "Government & VIP Security",
    tag: "GULF REGION",
    coords: "24.4539° N, 54.3773° E",
    image:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    city: "LONDON",
    country: "UNITED KINGDOM",
    service: "Executive & Diplomatic Protection",
    tag: "EUROPE",
    coords: "51.5074° N, 0.1278° W",
    image:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    city: "NEW YORK",
    country: "UNITED STATES",
    service: "Corporate Executive Security",
    tag: "AMERICAS",
    coords: "40.7128° N, 74.0060° W",
    image:
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    city: "TIRANA",
    country: "ALBANIA",
    service: "Strategic Security Operations",
    tag: "BALKANS",
    coords: "41.3275° N, 19.8187° E",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
  },
];

const CrosshairIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8" stroke="#00e5ff" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" stroke="#00e5ff" strokeWidth="1.5" />
  </svg>
);

export default function GlobalSecurityOps() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(145deg, #050d12 0%, #091520 50%, #050d12 100%)",
        minHeight: "100vh",
        fontFamily: "'Rajdhani', monospace",
        padding: "clamp(30px,6vw,60px) clamp(14px,5vw,24px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1
          style={{
            fontSize: "clamp(28px,5vw,52px)",
            color: "#e8f4f8",
            letterSpacing: "0.15em",
            fontFamily: "Orbitron, monospace",
          }}
        >
          GLOBAL SECURITY
          <span style={{ color: "#00e5ff" }}> OPERATIONS</span>
        </h1>

        <p
          style={{
            color: "#4a7a8a",
            fontSize: 13,
            letterSpacing: "0.25em",
            marginTop: 10,
          }}
        >
          ELITE EXECUTIVE PROTECTION & STRATEGIC SECURITY SERVICES
        </p>
      </div>

      {/* GRID */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {locations.map((loc) => {
          const isActive = activeId === loc.id;
          const isHovered = hoveredId === loc.id;
          const isHighlighted = isActive || isHovered;

          return (
            <div
              key={loc.id}
              onClick={() => setActiveId(isActive ? null : loc.id)}
              onMouseEnter={() => setHoveredId(loc.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "center",
                background: isHighlighted
                  ? "linear-gradient(90deg, rgba(0,229,255,0.08), rgba(0,229,255,0.02))"
                  : "rgba(255,255,255,0.03)",
                border: isHighlighted
                  ? "1px solid rgba(0,229,255,0.5)"
                  : "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(4px)",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: isHovered ? "translateX(6px)" : "translateX(0)",
                boxShadow: isHighlighted
                  ? "0 0 15px rgba(0,229,255,0.2)"
                  : "none",
                position: "relative",
              }}
            >
              {/* TEXT */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: isMobile ? "14px" : "18px",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    border: "1px solid #1a3a4a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CrosshairIcon />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: isMobile ? 15 : 18,
                      fontWeight: 700,
                      color: "#e8f4f8",
                      letterSpacing: "0.1em",
                      fontFamily: "Orbitron, monospace",
                    }}
                  >
                    {loc.city}{" "}
                    <span style={{ color: "#00e5ff" }}>— {loc.country}</span>
                  </div>

                  <p
                    style={{
                      fontSize: 13,
                      color: isHighlighted ? "#5ab8d0" : "#3a6070",
                      margin: 0,
                    }}
                  >
                    {loc.service}
                  </p>
                </div>
              </div>

              {/* IMAGE */}
              <div
                style={{
                  width: isMobile ? "100%" : "500px",
                  height: isMobile ? "130px" : "150px",
                  overflow: "hidden",
                  borderLeft: isMobile ? "none" : "1px solid #1a3a4a",
                }}
              >
                <img
                  src={loc.image}
                  alt={loc.city}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: isHighlighted ? "brightness(0.9)" : "brightness(0.7)",
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                    transition: "all 0.4s ease",
                  }}
                />
              </div>

              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: "#00e5ff",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "#1a3a4a",
            fontFamily: "Orbitron",
          }}
        >
          SECURE NETWORK ◈ ENCRYPTED CHANNEL ◈ AUTHORIZED PERSONNEL ONLY
        </p>
      </div>
    </div>
  );
}