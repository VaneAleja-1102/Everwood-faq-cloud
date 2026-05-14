import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";

export default function UploadHistory({ refresh }) {
  const [cargas, setCargas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCargas() {
      setLoading(true);
      const q = query(collection(db, "cargas"), orderBy("fechaCarga", "desc"));
      const snapshot = await getDocs(q);
      setCargas(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }
    fetchCargas();
  }, [refresh]);

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  }

  function formatDate(ts) {
    if (!ts) return "—";
    return new Date(ts.seconds * 1000).toLocaleString("es-CO");
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Historial de cargas</h2>
      {loading ? (
        <p style={styles.empty}>Cargando historial...</p>
      ) : cargas.length === 0 ? (
        <p style={styles.empty}>No hay archivos cargados aún.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Tipo</th>
                <th style={styles.th}>Tamaño</th>
                <th style={styles.th}>Fecha de carga</th>
                <th style={styles.th}>Responsable</th>
                <th style={styles.th}>Estado</th>
                <th style={styles.th}>Enlace</th>
              </tr>
            </thead>
            <tbody>
              {cargas.map((c) => (
                <tr key={c.id} style={styles.tr}>
                  <td style={styles.td}>{c.nombre}</td>
                  <td style={styles.td}>{c.tipo}</td>
                  <td style={styles.td}>{formatSize(c.tamaño)}</td>
                  <td style={styles.td}>{formatDate(c.fechaCarga)}</td>
                  <td style={styles.td}>{c.responsable}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{c.estado}</span>
                  </td>
                  <td style={styles.td}>
                    <a href={c.url} target="_blank" rel="noreferrer" style={styles.link}>
                      Ver archivo
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "28px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  title: { margin: "0 0 20px", color: "#1e293b" },
  empty: { color: "#94a3b8", fontStyle: "italic" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" },
  thead: { background: "#f1f5f9" },
  th: { padding: "10px 14px", textAlign: "left", color: "#475569" },
  tr: { borderBottom: "1px solid #e2e8f0" },
  td: { padding: "10px 14px", color: "#334155" },
  badge: {
    background: "#dcfce7",
    color: "#166534",
    padding: "3px 10px",
    borderRadius: "999px",
    fontWeight: "600",
    fontSize: "0.8rem",
  },
  link: { color: "#2563eb", textDecoration: "none" },
};