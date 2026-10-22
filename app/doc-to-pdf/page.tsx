import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Convert DOC to PDF Online | Doc to PDF",
  description: "Convert legacy Microsoft Word DOC files to PDF online. Upload a DOC document up to 15 MB and download a PDF copy.",
  alternates: { canonical: "/doc-to-pdf" },
  openGraph: {
    title: "Convert DOC to PDF Online",
    description: "A simple online workflow for converting Word DOC files to PDF.",
    type: "website"
  }
};

export default function DocToPdfPage() {
  return <main style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px", lineHeight: 1.7 }}>
    <nav><Link href="/">Doc to PDF home</Link></nav>
    <h1>Convert DOC to PDF online</h1>
    <p>Convert a Microsoft Word DOC document into a PDF using the online converter. The service accepts DOC files up to 15 MB and returns the converted PDF as a download.</p>
    <p><Link href="/">Open the DOC to PDF converter →</Link></p>
    <h2>How to convert a DOC file</h2>
    <ol><li>Open the converter and choose your .doc file.</li><li>Select “Convert to PDF” and wait for processing to finish.</li><li>Save the PDF downloaded by your browser and review its layout.</li></ol>
    <h2>Why use PDF?</h2>
    <p>PDF is useful for sharing a document when you want a consistent file to view or print. Layout can still vary depending on fonts and document features, so review the converted file before using it for important work.</p>
    <h2>File handling and limitations</h2>
    <p>The selected document is uploaded to the server for conversion. Temporary files are removed on a best-effort basis. Do not upload sensitive documents unless you have reviewed the deployed service’s privacy information.</p>
    <ul><li>Supported input: DOC</li><li>Maximum input size: 15 MB</li><li>Output: downloadable PDF</li><li>Conversion quality can differ from Microsoft Word for complex formatting.</li></ul>
    <p><Link href="/docx-to-pdf">Need to convert a DOCX file instead?</Link> Read our <Link href="/privacy">privacy information</Link>.</p>
  </main>;
}
