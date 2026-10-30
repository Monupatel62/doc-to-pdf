"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Result = { error?: string; filename?: string };

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/about#contact", label: "Contact" }
];

export default function Home() {
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
      link.download = file.name.replace(/\\.docx?$/i, "") + ".pdf";
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
    <main className="page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Doc to PDF home">Doc to PDF</Link>
        <nav className="primary-nav" aria-label="Main navigation">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </header>

      {/* Ad placement reserved for a future approved AdSense unit. No ad script is loaded here. */}
      <div id="adsense-header" className="ad-slot ad-slot-header" aria-hidden="true" />

      <section className="hero">
        <p className="eyebrow">WORD DOCUMENT CONVERTER</p>
        <h1>Convert DOC and DOCX to PDF</h1>
        <p className="intro">Turn a Word document into a PDF in a few simple steps. Check your file, convert it, and download the result.</p>

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
            <span><strong>Privacy-conscious file handling</strong><br />Files are processed for conversion. Temporary-file cleanup is best-effort after processing; see our <Link href="/privacy">Privacy Policy</Link>.</span>
          </div>

          {error && <p className="message error" role="alert">{error}</p>}
          {success && <p className="message success" role="status">{success}</p>}
        </div>
        <p className="privacyNote">Your document is uploaded to the server to create the PDF. Do not upload confidential files unless you have reviewed the service’s data-handling practices.</p>
      </section>

      {/* Reserved sidebar inventory; intentionally has no height until an ad unit is configured. */}
      <aside id="adsense-sidebar" className="ad-slot ad-slot-sidebar" aria-hidden="true" />

      <section className="info" id="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          <article><span>01</span><h3>Select a file</h3><p>Choose a Word document in DOC or DOCX format, up to 15 MB.</p></article>
          <article><span>02</span><h3>Convert</h3><p>The server uses LibreOffice to create a PDF from your document.</p></article>
          <article><span>03</span><h3>Download</h3><p>Your browser receives the converted PDF as a download.</p></article>
        </div>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <details><summary>Which formats are supported?</summary><p>The MVP accepts DOC and DOCX files up to 15 MB. Other formats are not supported.</p></details>
        <details><summary>Are files processed online?</summary><p>Yes. The file is uploaded to the server for conversion. Run this app only on a trusted deployment with appropriate access controls and cleanup settings.</p></details>
        <details><summary>Will the PDF look exactly like Word?</summary><p>Results can vary by fonts and document features. Review the output before using it for important documents.</p></details>
      </section>

      {/* Ad placement reserved for a future approved AdSense unit. */}
      <div id="adsense-footer" className="ad-slot ad-slot-footer" aria-hidden="true" />

      <footer className="site-footer">
        <p>Doc to PDF · Simple document conversion</p>
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/about#contact">Contact</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </footer>
    </main>
  );
}
