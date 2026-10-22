import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Convert DOC to PDF Online | Doc to PDF",
  description: "A practical guide to converting older Word DOC documents to PDF, checking formatting, and troubleshooting common conversion issues.",
  alternates: { canonical: "/doc-to-pdf" },
  openGraph: { title: "Convert DOC to PDF Online", description: "Learn how to convert a DOC file and check the resulting PDF.", type: "website" }
};

export default function DocToPdfPage() {
  return <main className="guidePage">
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / DOC guide</nav>
    <h1>How to convert a DOC file to PDF</h1>
    <p>A DOC file is the older binary format used by Microsoft Word. Converting it to PDF can make a document easier to share and print without asking the recipient to edit the original Word file. This converter accepts DOC files up to 15 MB and returns a PDF download.</p>
    <p><Link className="guideCta" href="/">Open the DOC to PDF converter →</Link></p>
    <h2>Step-by-step instructions</h2>
    <ol>
      <li>Open the <Link href="/">converter page</Link> and choose your .doc file.</li>
      <li>Confirm that the selected filename is correct and that the file is no larger than 15 MB.</li>
      <li>Select “Convert to PDF” and wait while the server processes the document.</li>
      <li>Save the downloaded PDF, open it, and compare it with the original before relying on it.</li>
    </ol>
    <h2>Check these items after conversion</h2>
    <ul>
      <li><strong>Page breaks and margins:</strong> Look for headings or paragraphs pushed onto unexpected pages.</li>
      <li><strong>Fonts and symbols:</strong> Check special characters, bullets, equations, and non-Latin text.</li>
      <li><strong>Tables and images:</strong> Confirm that columns, borders, captions, and image placement remain readable.</li>
      <li><strong>Headers and footers:</strong> Review page numbers, dates, footnotes, and repeating content.</li>
    </ul>
    <h2>Common DOC conversion problems</h2>
    <h3>The file is rejected</h3><p>Check that it is a genuine DOC file rather than a renamed PDF or another format. Empty files and files over 15 MB are not accepted.</p>
    <h3>The conversion fails or takes too long</h3><p>The document may be damaged or contain elements the conversion engine cannot process. Try opening the file in a word processor and saving a fresh copy. If the service is busy, wait and retry.</p>
    <h3>The PDF layout differs from Word</h3><p>Word and LibreOffice do not always render every document identically. If the document uses unusual fonts, complex tables, floating objects, or intricate page layouts, inspect every page and adjust the source file if needed.</p>
    <h2>Why use PDF for sharing?</h2>
    <p>PDF is commonly used when recipients mainly need to view or print a document. It is not a substitute for keeping an editable source copy, so retain your original DOC file if you may need to revise the content later.</p>
    <h2>File handling</h2>
    <p>The selected document is uploaded to the server for conversion. The application attempts to remove temporary working files after processing, but cleanup is best-effort and should not be treated as a guarantee of secure erasure. Avoid uploading confidential material unless you accept the service's disclosed processing.</p>
    <h2>Frequently asked questions</h2>
    <h3>Can I upload a DOCX file here?</h3><p>Yes, the converter accepts DOC and DOCX. For DOCX-specific tips, read the <Link href="/docx-to-pdf">DOCX conversion guide</Link>.</p>
    <h3>Does conversion change the original DOC file?</h3><p>The converter returns a PDF download; it does not provide an edited Word document. Keep your original file as a separate copy.</p>
    <p>Read the <Link href="/privacy">privacy information</Link> or visit the <Link href="/about">About page</Link> to learn about this utility.</p>
  </main>;
}
