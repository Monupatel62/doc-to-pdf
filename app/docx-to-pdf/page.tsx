import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Convert DOCX to PDF Online | Doc to PDF",
  description: "Convert modern Microsoft Word DOCX documents to PDF online. Upload a DOCX file up to 15 MB and download a PDF copy.",
  alternates: { canonical: "/docx-to-pdf" },
  openGraph: {
    title: "Convert DOCX to PDF Online",
    description: "Convert a Word DOCX document to a downloadable PDF in a few steps.",
    type: "website"
  }
};

export default function DocxToPdfPage() {
  return <main style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px", lineHeight: 1.7 }}>
    <nav><Link href="/">Doc to PDF home</Link></nav>
    <h1>Convert DOCX to PDF online</h1>
    <p>Turn a Microsoft Word DOCX document into a PDF with a simple upload workflow. Choose a DOCX file up to 15 MB, convert it on the server, and download the result.</p>
    <p><Link href="/">Open the DOCX to PDF converter →</Link></p>
    <h2>How to convert DOCX to PDF</h2>
    <ol><li>Select your .docx document on the converter page.</li><li>Start conversion and wait for the server to process the file.</li><li>Download the PDF and check page breaks, tables, images and fonts.</li></ol>
    <h2>When should you use PDF?</h2>
    <p>PDF is commonly used for distributing documents that need to be easy to view and print across devices. Always check the result when the original document uses complex layouts, embedded fonts, charts or unusual page settings.</p>
    <h2>Supported files and privacy</h2>
    <p>The converter accepts DOCX input up to 15 MB. Files are uploaded to the server for conversion, and temporary cleanup is best-effort. Please review the deployed service’s privacy information before uploading private or confidential content.</p>
    <p><Link href="/doc-to-pdf">Have an older DOC file?</Link> <Link href="/privacy">Read privacy information</Link>.</p>
  </main>;
}
