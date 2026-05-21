import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import FileUploader from "./components/fileuploader";
import UploadHistory from "./components/uploadhistory";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="page-bg">
      <Navbar />
      <main style={styles.main}>

        {/* Hero */}
        <div style={styles.hero}>
          <div style={styles.heroTag}>
            <span style={styles.heroDot} />
            Plataforma activa
          </div>
          <h1 style={styles.heroTitle}>
            Gestión de<br />
            <span style={styles.heroGradient}>conversaciones</span>
          </h1>
          <p style={styles.heroDesc}>
            Carga, organiza y consulta el historial de conversaciones de Everwood.
            Registra archivos de WhatsApp y otros canales para analizar FAQs
            y patrones de atención al cliente.
          </p>
          <div style={styles.heroStats}>
            <Stat label="Formatos" value="CSV · JSON · TXT" />
            <div style={styles.statDivider} />
            <Stat label="Almacenamiento" value="Supabase" />
            <div style={styles.statDivider} />
            <Stat label="Registro" value="Firebase" />
          </div>
        </div>

        {/* Uploader */}
        <FileUploader onUploadSuccess={() => setRefreshKey((k) => k + 1)} />

        {/* History */}
        <UploadHistory refresh={refreshKey} />

      </main>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={statStyles.wrap}>
      <span style={statStyles.label}>{label}</span>
      <span style={statStyles.value}>{value}</span>
    </div>
  );
}

const styles = {
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "48px 24px 80px",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  hero: {
    padding: "48px 40px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.07)",
    background: "linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(26,34,53,0.9) 100%)",
    position: "relative",
    overflow: "hidden",
  },
  heroTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    fontSize: "0.75rem",
    fontWeight: 500,
    color: "#34d399",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  heroDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#34d399",
    boxShadow: "0 0 6px #34d399",
    animation: "pulse 2s infinite",
    flexShrink: 0,
  },
  heroTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(2rem, 5vw, 3rem)",
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    color: "#e2e8f0",
    marginBottom: "16px",
  },
  heroGradient: {
    background: "linear-gradient(90deg, #38bdf8, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroDesc: {
    color: "#94a3b8",
    fontSize: "1rem",
    lineHeight: "1.7",
    maxWidth: "520px",
    marginBottom: "32px",
  },
  heroStats: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap",
  },
  statDivider: {
    width: "1px",
    height: "28px",
    background: "rgba(255,255,255,0.1)",
  },
};

const statStyles = {
  wrap: { display: "flex", flexDirection: "column", gap: "2px" },
  label: { fontSize: "0.7rem", color: "#64748b", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" },
  value: { fontSize: "0.85rem", color: "#cbd5e1", fontWeight: 600 },
};