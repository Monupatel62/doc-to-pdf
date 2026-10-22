"use client";

import Link from "next/link";
import { DragEvent, useRef, useState } from "react";

type Result = { error?: string };
const MAX_BYTES = 15 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resultName, setResultName] = useState("");
  const [resultSize, setResultSize] = useState(0);

  function chooseFile(next: File | null) {
    setError("");
    setSuccess("");
    setResultName("");
    setResultSize(0);
    if (!next) { setFile(null); return; }
    const name = next.name.toLowerCase();
    if (!name.endsWith(".doc") && !name.endsWith(".docx")) {
      setFile(null); setError("Unsupported format. Choose a .doc or .docx Word document."); return;
    }
    if (next.size === 0) { setFile(null); setError("This file is empty. Choose a document with content."); return; }
    if (next.size > MAX_BYTES) {
      setFile(null); setError("This file is larger than 15 MB. Choose a smaller document."); return;
    }
    setFile(next);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    if (!busy) chooseFile(event.dataTransfer.files?.[0] || null);
  }

  async function convert() {
    if (!file || busy) return;
    setBusy(true); setError(""); setSuccess(""); setResultName(""); setResultSize(0);
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/convert", { method: "POST", body });
      if (!response.ok) {
        const result = await response.json().catch(() => ({} as Result));
        throw new Error(result.error || "Conversion failed. Please try again.");
      }
      const blob = await response.blob();
      if (!blob.size) throw new Error("The server returned an empty PDF. Please try again.");
      const url = URL.createObjectURL(blob);
      const name = file.name.replace(/\.docx?$/i, "") + ".pdf";
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      setResultName(name);
      setResultSize(blob.size);
      setSuccess("Your PDF is ready. The download has been requested by your browser.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="site-shell">
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Doc to PDF home"><span className="brand-mark">D</span><span>Doc<span className="brand-accent">Flow</span><small>WORD TO PDF</small></span></Link>
      <nav><a href="#how-it-works">How it works</a><Link href="/privacy">Privacy</Link><a className="nav-cta" href="#converter">Convert a file <span aria-hidden="true">↗</span></a></nav>
    </header>

    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> SIMPLE. SECURE. STRAIGHTFORWARD.</div>
        <h1>Your Word document.<br /><span>PDF-perfect.</span></h1>
        <p className="intro">Convert DOC and DOCX files into share-ready PDFs in seconds. No complicated settings. Just upload, convert, and download.</p>
        <div className="trust-points"><span><i>✓</i> DOC &amp; DOCX support</span><span><i>✓</i> Up to 15 MB</span><span><i>✓</i> No account needed</span></div>
      </div>

      <section className="converter-card" id="converter" aria-labelledby="converter-title">
        <div className="card-heading"><div><p className="card-kicker">ONLINE CONVERTER</p><h2 id="converter-title">Convert your document</h2></div><div className="file-badge" aria-hidden="true">PDF</div></div>
        <div className={`dropzone ${dragging ? "is-dragging" : ""} ${file ? "has-file" : ""}`} onDragOver={e => { e.preventDefault(); if (!busy) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop}>
          <input ref={inputRef} className="file-input" type="file" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e => chooseFile(e.target.files?.[0] || null)} aria-label="Choose a DOC or DOCX document" />
          <div className="upload-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 15.5v3A1.5 1.5 0 006.5 20h11a1.5 1.5 0 001.5-1.5v-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <h3>{file ? "Document selected" : "Drop your Word document here"}</h3>
          <p>{file ? "Your file passed the basic format and size checks." : "or choose a file from your device"}</p>
          <button type="button" className="choose-button" onClick={() => inputRef.current?.click()} disabled={busy}>{file ? "Choose a different file" : "Browse files"}</button>
          <p className="format-hint">DOC or DOCX <span>•</span> Maximum 15 MB</p>
        </div>

        {file && <div className="file-row">
          <div className="doc-icon" aria-hidden="true"><span>W</span></div>
          <div className="file-meta"><strong>{file.name}</strong><span>{formatBytes(file.size)} · Word document · Ready to convert</span></div>
          {!busy && <button type="button" className="remove-file" onClick={() => { chooseFile(null); if (inputRef.current) inputRef.current.value = ""; }} aria-label="Remove selected file">×</button>}
          {busy && <span className="mini-spinner" aria-label="Conversion in progress" />}
        </div>}

        <button className="convert-button" type="button" onClick={convert} disabled={!file || busy}>
          {busy ? <><span className="spinner" /> Converting document…</> : <>Convert to PDF <span aria-hidden="true">→</span></>}
        </button>
        {busy && <div className="processing" role="status" aria-live="polite"><span className="pulse-dot" /> Uploading and converting on the server. Please keep this page open.</div>}
        {error && <div className="notice notice-error" role="alert"><span>!</span><p><strong>Conversion couldn’t finish</strong>{error}</p></div>}
        {success && <div className="notice notice-success" role="status"><span>✓</span><div><strong>PDF created successfully</strong><p>{success}</p><div className="result-meta"><span>{resultName}</span><span>{formatBytes(resultSize)}</span></div><button className="again-button" type="button" onClick={() => { chooseFile(null); if (inputRef.current) inputRef.current.value = ""; }}>Convert another document</button></div></div>}
        <div className="secure-note"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 10V7a5 5 0 0110 0v3m-11 0h12a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8a1 1 0 011-1zm5 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg><span>File uploaded securely over HTTPS. Files are processed by the server.</span></div>
      </section>
    </section>

    <section className="assurance-strip" aria-label="Supported features"><div><span className="assurance-icon">↗</span><p><strong>Simple workflow</strong><small>Upload, convert, download</small></p></div><div><span className="assurance-icon">DOC</span><p><strong>Word file support</strong><small>DOC and DOCX formats</small></p></div><div><span className="assurance-icon">15</span><p><strong>15 MB limit</strong><small>Clear file-size guidance</small></p></div></section>

    <section className="how-section" id="how-it-works"><div className="section-heading"><p className="card-kicker">THREE SIMPLE STEPS</p><h2>From document to done.</h2><p>No software to install. Use the converter right in your browser.</p></div><div className="steps"><article><span className="step-number">01</span><div className="step-icon">↑</div><h3>Choose your file</h3><p>Select a DOC or DOCX document from your device, or drag it into the upload area.</p></article><article><span className="step-number">02</span><div className="step-icon">⟳</div><h3>Convert to PDF</h3><p>Your document is sent to the conversion server and processed into a PDF.</p></article><article><span className="step-number">03</span><div className="step-icon">↓</div><h3>Download the result</h3><p>When conversion succeeds, your browser receives the generated PDF file.</p></article></div></section>

    <section className="faq-section"><div className="section-heading"><p className="card-kicker">GOOD TO KNOW</p><h2>Questions, answered.</h2></div><div className="faq-list"><details><summary>Which file types can I convert?</summary><p>This tool currently accepts Microsoft Word DOC and DOCX files up to 15 MB.</p></details><details><summary>Does the progress indicator show real conversion progress?</summary><p>The converter shows a live processing state while the server works. The current API does not provide percentage-level progress, so no fabricated percentage is displayed.</p></details><details><summary>Are my files stored?</summary><p>Files are uploaded to the server for conversion. Temporary-file cleanup depends on the deployed server implementation. Avoid uploading sensitive documents unless you have reviewed the privacy policy and deployment configuration.</p></details><details><summary>Will the PDF look exactly like my Word file?</summary><p>Formatting may vary with fonts, embedded objects, and advanced Word features. Always review the PDF before sharing or printing it.</p></details></div></section>

    <footer className="footer"><Link className="footer-brand" href="/">DocFlow</Link><p>Document conversion, made simple.</p><div><Link href="/doc-to-pdf">DOC to PDF</Link><Link href="/docx-to-pdf">DOCX to PDF</Link><Link href="/privacy">Privacy</Link></div><small>© {new Date().getFullYear()} DocFlow. Please review converted files before use.</small></footer>
  </main>;
}
