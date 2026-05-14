import { useState } from "react";
import Navbar from "./components/navbar";
import FileUploader from "./components/fileuploader";
import UploadHistory from "./components/uploadhistory";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.hero}>
          <h1 style={styles.h1}>Plataforma de gestión de conversaciones</h1>
          <p style={styles.p}>
            Carga, organiza y consulta el historial de conversaciones históricas
            de Everwood. Esta plataforma permite registrar archivos provenientes
            de canales como WhatsApp para facilitar el análisis de FAQs y
            patrones de atención al cliente.
          </p>
        </div>
        <FileUploader onUploadSuccess={() => setRefreshKey((k) => k + 1)} />
        <UploadHistory refresh={refreshKey} />
      </main>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#06417c", fontFamily: "sans-serif" },
  main: {  padding: "32px 16px" },
  hero: {
    background: "linear-gradient(135deg, #1a1a2e, #16213e)",
    borderRadius: "12px",
    padding: "32px",
    alignItems: "center",
    justifyContent:"center",
    marginBottom: "24px",
  },
  h1: { color: "#de4aa3", margin: "0 0 12px", fontSize: "1.6rem" },
  p: { color: "#cbd5e1", lineHeight: "1.6", margin: 0 },
};