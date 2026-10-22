import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "About Doc to PDF", description: "Learn what the Doc to PDF converter does, which files it supports, and what to check after conversion.", alternates: { canonical: "/about" } };
export default function AboutPage() {
  return <main className="guidePage">
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / About</nav><h1>About Doc to PDF</h1>
    <p>Doc to PDF is a focused online utility for converting Microsoft Word DOC and DOCX documents into downloadable PDF files. It is designed for people who need a straightforward conversion workflow without installing a desktop conversion application.</p>
    <h2>What the tool does</h2><ul><li>Accepts DOC and DOCX input files.</li><li>Accepts files up to 15 MB.</li><li>Processes documents on the server using LibreOffice.</li><li>Returns the converted PDF to the user's browser as a download.</li></ul>
    <h2>What to know before using it</h2><p>Conversion results can differ from the original document, particularly when fonts, tables, images, page breaks, or complex formatting are involved. Open and review the PDF before relying on it.</p>
    <p>Uploaded documents are processed on the server. The application attempts to remove temporary working files, but cleanup is best-effort and is not a guarantee of secure erasure from every system or backup. Avoid uploading sensitive material unless you have reviewed the <Link href="/privacy">privacy information</Link> and decided the service is suitable for your needs.</p>
    <h2>Guides and help</h2><p>Read the <Link href="/doc-to-pdf">DOC conversion guide</Link> or the <Link href="/docx-to-pdf">DOCX conversion guide</Link>, or return to the <Link href="/">converter</Link>.</p>
    <p>This page describes the utility's purpose and implemented workflow; it does not claim certification, guaranteed conversion accuracy, or independent security auditing.</p>
  </main>;
}