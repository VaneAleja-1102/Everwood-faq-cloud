export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <div style={styles.brand}>
          <div style={styles.dot} />
          <span style={styles.logo}>Everwood</span>
          <span style={styles.logoAccent}>FAQ Cloud</span>
        </div>
        <span style={styles.badge}>Gestión de conversaciones</span>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(11,15,26,0.85)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  inner: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 24px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#34d399",
    boxShadow: "0 0 8px #34d399",
    flexShrink: 0,
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: "1.15rem",
    color: "#e2e8f0",
    letterSpacing: "-0.02em",
  },
  logoAccent: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 600,
    fontSize: "1.15rem",
    color: "#38bdf8",
    letterSpacing: "-0.02em",
  },
  badge: {
    fontSize: "0.72rem",
    fontWeight: 500,
    color: "#64748b",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "4px 10px",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.03)",
  },
};