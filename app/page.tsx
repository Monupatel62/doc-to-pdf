"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Result = { error?: string; filename?: string };

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function chooseFile(next: File | null) {
    setError(""); setSuccess("");
    if (!next) { setFile(null); return; }
    const name = next.name.toLowerCase();
    if (!name.endsWith(".doc") && !name.endsWith(".docx")) { setFile(null); setError("Choose a .doc or .docx file."); return; }
    if (next.size === 0) { setFile(null); setError("This file is empty."); return; }
    if (next.size > 15 * 1024 * 1024) { setFile(null); setError("Maximum file size is 15 MB."); return; }
    setFile(next);
  }

  async function convert() {
    if (!file || busy) return;
    setBusy(true); setError(""); setSuccess("");
    try {
      const body = new FormData(); body.set("file", file);
      const response = await fetch("/api/convert", { method: "POST", body });
      if (!response.ok) {
        const result = await response.json().catch(() => ({} as Result));
        throw new Error(result.error || "Conversion failed. Please try again.");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = file.name.replace(/\.docx?$/i, "") + ".pdf";
      document.body.appendChild(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setSuccess("Conversion finished. Your PDF download should begin shortly.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally { setBusy(false); }
  }

  return <main className="page">
    <header className="topbar"><Link className="brand" href="/">Doc to PDF</Link><nav aria-label="Main navigation"><a href="#how-it-works">How it works</a><Link href="/doc-to-pdf">DOC guide</Link><Link href="/docx-to-pdf">DOCX guide</Link></nav></header>
    <section className="hero">
      <p className="eyebrow">WORD DOCUMENT CONVERTER</p>
      <h1>Convert DOC and DOCX to PDF</h1>
      <p className="intro">Convert a Word document into a PDF in a few steps. Choose a supported file, start conversion, then review and download the result.</p>
      <div className="converter">
        <input ref={inputRef} className="fileInput" type="file" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e => chooseFile(e.target.files?.[0] || null)} aria-label="Choose a DOC or DOCX document" />
        <button className="choose" type="button" onClick={() => inputRef.current?.click()} disabled={busy}>Choose Word document</button>
        <p className="formats">Supported formats: DOC and DOCX · Maximum input size: 15 MB</p>
        {file && <p className="selected" aria-live="polite">Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>}
        <button className="convert" type="button" onClick={convert} disabled={!file || busy}>{busy ? "Converting…" : "Convert to PDF"}</button>
        {error && <p className="message error" role="alert">{error}</p>}
        {success && <p className="message success" role="status">{success}</p>}
      </div>
      <p className="privacyNote">Your document is uploaded to the server for conversion. The application attempts to remove its temporary working files when processing ends, but cleanup is best-effort. Do not upload confidential or sensitive files unless you are comfortable with this processing.</p>
    </section>
    <section className="info" id="how-it-works">
      <h2>How to convert a Word document</h2>
      <div className="steps"><article><span>01</span><h3>Choose a file</h3><p>Select a non-empty DOC or DOCX document that is no larger than 15 MB.</p></article><article><span>02</span><h3>Start conversion</h3><p>The file is sent to the server, where LibreOffice converts the document to PDF.</p></article><article><span>03</span><h3>Review your PDF</h3><p>Download the result and check page breaks, fonts, tables, images, and other important details.</p></article></div>
    </section>
    <section className="faq">
      <h2>Before you convert</h2>
      <h3>Which files can I upload?</h3><p>The converter accepts DOC and DOCX files up to 15 MB. Other formats, empty files, and files that fail basic format checks are rejected.</p>
      <h3>Will the PDF look exactly like the original?</h3><p>Not always. The conversion engine may render fonts, page breaks, charts, tables, or complex layouts differently from Microsoft Word. Always review the PDF before sharing or printing it.</p>
      <h3>Why might conversion fail?</h3><p>A file may be damaged, mislabeled, too complex, or incompatible with the conversion engine. Try opening it in a word processor, saving a fresh DOCX copy, and converting again. The service may also be temporarily busy.</p>
      <h3>How are uploaded files handled?</h3><p>The document is processed on the server. Temporary working files are removed on a best-effort basis; this is not a guarantee of secure erasure from every system or backup. Read the <Link href="/privacy">privacy information</Link> before uploading private content.</p>
      <h3>Which guide should I read?</h3><p>Read the <Link href="/doc-to-pdf">DOC conversion guide</Link> for older Word files or the <Link href="/docx-to-pdf">DOCX conversion guide</Link> for modern Word documents.</p>
    </section>
    <footer><p>Doc to PDF · A simple Word-document conversion utility</p><p><Link href="/doc-to-pdf">DOC guide</Link> · <Link href="/docx-to-pdf">DOCX guide</Link> · <Link href="/about">About</Link> · <Link href="/contact">Contact</Link> · <Link href="/privacy">Privacy</Link></p></footer>
  </main>;
}
