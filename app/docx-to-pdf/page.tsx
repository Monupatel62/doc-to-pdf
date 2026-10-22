import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Convert DOCX to PDF Online | Doc to PDF",
  description: "Convert modern Word DOCX documents to PDF with practical steps for checking tables, fonts, page layout, and common conversion issues.",
  alternates: { canonical: "/docx-to-pdf" },
  openGraph: { title: "Convert DOCX to PDF Online", description: "A practical DOCX-to-PDF guide with formatting checks and troubleshooting.", type: "website" }
};

export default function DocxToPdfPage() {
  return <main className="guidePage">
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / DOCX guide</nav>
    <h1>How to convert a DOCX file to PDF</h1>
    <p>DOCX is the modern Office Open XML document format used by recent versions of Microsoft Word and many other word processors. A PDF is useful for sharing a final, viewable copy. This converter accepts DOCX files up to 15 MB and creates a downloadable PDF.</p>
    <p><Link className="guideCta" href="/">Open the DOCX to PDF converter →</Link></p>
    <h2>Convert a DOCX document in four steps</h2>
    <ol>
      <li>Open the <Link href="/">converter</Link> and select the correct .docx file.</li>
      <li>Check the filename and confirm that the file is within the 15 MB input limit.</li>
      <li>Start conversion and wait for the server response. Keep the page open until the download begins.</li>
      <li>Open the PDF and inspect it at normal size and in print preview if printing matters.</li>
    </ol>
    <h2>DOCX elements worth checking</h2>
    <ul>
      <li><strong>Tables:</strong> Wide tables may wrap or extend beyond a page. Check column widths and row breaks.</li>
      <li><strong>Images and shapes:</strong> Confirm that images, text boxes, diagrams, and captions are present and aligned.</li>
      <li><strong>Fonts and language:</strong> Missing fonts may be substituted, changing line lengths and pagination.</li>
      <li><strong>Track changes and comments:</strong> Review the exported PDF to ensure it presents the intended final content.</li>
      <li><strong>Links and page numbering:</strong> Check important hyperlinks, footnotes, headers, and page numbers.</li>
    </ul>
    <h2>Troubleshooting</h2>
    <h3>“This does not appear to be a valid DOCX document”</h3><p>Make sure the file is an actual DOCX document and not another file renamed with a .docx extension. If needed, open it in a word processor and save a new DOCX copy.</p>
    <h3>The PDF is missing content or has different spacing</h3><p>Conversion engines may handle unsupported features, fonts, floating objects, and complex layouts differently. Check the source document, simplify problematic layout elements where possible, and convert again.</p>
    <h3>The service says it is busy</h3><p>The converter limits concurrent processing. Wait briefly and retry. For large or complicated documents, a smaller or simpler source file may be easier to process.</p>
    <h2>DOCX or DOC: which should I use?</h2>
    <p>Use the format you already have; both DOC and DOCX are supported. DOCX is the newer format and is commonly used by current word processors. If you have an older .doc file, see the <Link href="/doc-to-pdf">DOC conversion guide</Link>.</p>
    <h2>Upload and privacy notes</h2>
    <p>Your selected file is uploaded to the server for conversion. Temporary working files are removed on a best-effort basis; this should not be understood as a guarantee of secure erasure from every system or backup. Do not upload sensitive documents unless you are comfortable with the service's processing practices described in the <Link href="/privacy">privacy information</Link>.</p>
    <h2>Frequently asked questions</h2>
    <h3>Can I edit the PDF with this tool?</h3><p>No. This utility converts a Word document to a PDF download; it does not provide PDF editing or reverse conversion.</p>
    <h3>Will every DOCX convert successfully?</h3><p>No conversion service can promise that every document will work. Damaged files, unsupported elements, resource limits, or temporary service issues can cause a failure.</p>
    <p>Learn more about the service on the <Link href="/about">About page</Link> or return to the <Link href="/">converter</Link>.</p>
  </main>;
}
