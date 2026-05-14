import { useState } from "react";
import { supabase } from "../supabase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const ALLOWED_EXTENSIONS = [".csv", ".json", ".txt"];

export default function FileUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (!selected) return;

    const ext = "." + selected.name.split(".").pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setFile(null);
      setStatus({ type: "error", msg: "❌ Formato no permitido. Solo se aceptan: CSV, JSON, TXT." });
      return;
    }
    setFile(selected);
    setStatus({ type: "info", msg: `📄 Archivo seleccionado: ${selected.name}` });
  }

  async function handleUpload() {
    if (!file) {
      setStatus({ type: "error", msg: "⚠️ No se seleccionó ningún archivo." });
      return;
    }

    setLoading(true);
    setStatus({ type: "info", msg: "⏳ Subiendo archivo..." });

    try {
      // 1. Subir a Supabase Storage
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("conversaciones")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Obtener URL pública
      const { data } = supabase.storage
        .from("conversaciones")
        .getPublicUrl(fileName);

      const downloadURL = data.publicUrl;

      // 3. Guardar metadatos en Firestore
      await addDoc(collection(db, "cargas"), {
        nombre: file.name,
        tipo: file.type || "desconocido",
        tamaño: file.size,
        fechaCarga: serverTimestamp(),
        responsable: "Grupo Everwood",
        estado: "cargado",
        observaciones: "Carga exitosa",
        url: downloadURL,
      });

      setStatus({ type: "success", msg: `✅ Archivo "${file.name}" cargado correctamente.` });
      setFile(null);
      document.getElementById("fileInput").value = "";
      onUploadSuccess();
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", msg: "❌ Error al cargar el archivo. Intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Cargar archivo de conversaciones</h2>
      <p style={styles.desc}>
        Sube un archivo con conversaciones históricas de Everwood en formato{" "}
        <strong>CSV, JSON o TXT</strong>.
      </p>

      <input
        id="fileInput"
        type="file"
        accept=".csv,.json,.txt"
        onChange={handleFileChange}
        style={styles.input}
      />

      {status && (
        <div style={{ ...styles.alert, ...styles[status.type] }}>
          {status.msg}
        </div>
      )}

      <button onClick={handleUpload} disabled={loading} style={styles.button}>
        {loading ? "Subiendo..." : "Subir archivo"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "28px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    marginBottom: "24px",
  },
  title: { margin: "0 0 8px", color: "#1e293b" },
  desc: { color: "#64748b", marginBottom: "20px" },
  input: { display: "block", marginBottom: "16px", fontSize: "1rem" },
  alert: {
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontWeight: "500",
  },
  success: { background: "#dcfce7", color: "#166534" },
  error: { background: "#fee2e2", color: "#991b1b" },
  info: { background: "#dbeafe", color: "#1e40af" },
  button: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "12px 28px",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "600",
  },
};