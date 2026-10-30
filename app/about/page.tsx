import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us & Contact | Doc to PDF",
  description: "Learn about Doc to PDF and how to contact the service team."
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: 800, margin: "48px auto", padding: "0 24px", fontFamily: "Arial, sans-serif", lineHeight: 1.75 }}>
      <Link href="/">← Back to Doc to PDF</Link>
      <h1>About Doc to PDF</h1>
      <p>Doc to PDF is a simple online tool for converting Microsoft Word DOC and DOCX documents into PDF files. Our aim is to make everyday document conversion quick and easy, with a clear upload and download process and no account required.</p>
      <p>The service uses LibreOffice on the server to convert documents. Files are processed temporarily for each conversion request, and the application attempts to remove its temporary working files when processing ends. See our <Link href="/privacy">Privacy Policy</Link> for the current data-handling details and limitations.</p>
      <h2>What the tool supports</h2>
      <ul>
        <li>DOC and DOCX document uploads</li>
        <li>Files up to 15 MB</li>
        <li>PDF conversion and browser download</li>
        <li>Free access to the conversion tool</li>
      </ul>
      <h2>Contact and support</h2>
      <p>Need help with a conversion or want to report a problem? Use the support form or verified support email address configured by the site operator.</p>
      <section aria-label="Contact support" style={{ border: "1px solid #ddd", borderRadius: 8, padding: 20, marginTop: 16 }}>
        <h3>Contact form placeholder</h3>
        <p>A support contact form will be available here after its submission endpoint and privacy safeguards are configured.</p>
        <p><strong>Support email:</strong> [Add and verify your support email address before launch]</p>
      </section>
      <h2>Useful links</h2>
      <ul>
        <li><Link href="/privacy">Privacy Policy</Link></li>
        <li><Link href="/terms">Terms and Conditions</Link></li>
      </ul>
    </main>
  );
}
