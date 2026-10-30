"use client";

import { useRef, useState } from "react";

type Result = { error?: string; filename?: string };

export default function Converter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function chooseFile(next: File | null) {
    setError("");
    setSuccess("");
    if (!next) { setFile(null); return; }
    const name = next.name.toLowerCase();
    if (!name.endsWith(".doc") && !name.endsWith(".docx")) {
      setFile(null); setError("Choose a .doc or .docx file."); return;
    }
    if (next.size === 0) { setFile(null); setError("This file is empty."); return; }
    if (next.size > 15 * 1024 * 1024) {
      setFile(null); setError("Maximum file size is 15 MB."); return;
    }
    setFile(next);
  }

  async function convert() {
    if (!file || busy) return;
    setBusy(true); setError(""); setSuccess("");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/convert", { method: "POST", body });
      if (!response.ok) {
        const result = await response.json().catch(() => ({} as Result));
        throw new Error(result.error || "Conversion failed. Please try again.");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name.replace(/\.docx?$/i, "") + ".pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setSuccess("Conversion finished. Your PDF download should begin shortly.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="converter">
      <input
        ref={inputRef}
        className="fileInput"
        type="file"
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={e => chooseFile(e.target.files?.[0] || null)}
        aria-label="Choose a DOC or DOCX document"
      />
      <button className="choose" type="button" onClick={() => inputRef.current?.click()} disabled={busy}>
        Choose Word document
      </button>
      <p className="formats">DOC or DOCX · Maximum 15 MB</p>
      {file && <p className="selected" aria-live="polite">Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>}
      <button className="convert" type="button" onClick={convert} disabled={!file || busy}>
        {busy ? "Converting…" : "Convert to PDF"}
      </button>
      <div className="security-note" role="note">
        <span className="security-icon" aria-hidden="true">🔒</span>
        <span><strong>Privacy-conscious file handling</strong><br />Files are processed for conversion. Temporary-file cleanup is best-effort after processing; see our <a href="/privacy">Privacy Policy</a>.</span>
      </div>
      {error && <p className="message error" role="alert">{error}</p>}
      {success && <p className="message success" role="status">{success}</p>}
    </div>
  );
}
