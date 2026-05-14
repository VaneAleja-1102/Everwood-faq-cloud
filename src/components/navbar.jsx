export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>Everwood FAQ Cloud</span>
      <span style={styles.subtitle}>Plataforma de gestión de conversaciones</span>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#1a1a2e",
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    gap: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  logo: { color: "#4ade80", fontWeight: "bold", fontSize: "1.3rem" },
  subtitle: { color: "#94a3b8", fontSize: "0.9rem" },
};