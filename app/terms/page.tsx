import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | Doc to PDF",
  description: "Terms for using the Doc to PDF online conversion tool."
};

export default function TermsPage() {
  return (
    <main style={{ maxWidth: 800, margin: "48px auto", padding: "0 24px", fontFamily: "Arial, sans-serif", lineHeight: 1.75 }}>
      <Link href="/">← Back to Doc to PDF</Link>
      <h1>Terms and Conditions</h1>
      <p><strong>Last updated: October 30, 2026</strong></p>
      <p>By accessing or using Doc to PDF, you agree to these terms. If you do not agree, do not use the service.</p>
      <h2>1. The service</h2>
      <p>Doc to PDF is a free, online utility that accepts supported DOC and DOCX files and attempts to convert them into PDF files. The service is provided on an as-available basis. We may change, suspend or discontinue features at any time.</p>
      <h2>2. Your files and responsibility</h2>
      <p>You are responsible for every document you upload and must have the rights, permissions and lawful authority needed to upload and convert it. You must not upload content that is unlawful, infringes another person's rights, contains malware, or violates applicable rules or court orders.</p>
      <p>You are responsible for keeping your own original files and checking the converted PDF before relying on it. Conversion can fail or change layout, fonts, images or other formatting.</p>
      <h2>3. Temporary processing and availability</h2>
      <p>Files are uploaded to the application server for conversion and are handled in temporary working storage. The application attempts to remove temporary files after each request, but cleanup is best-effort and may be affected by a crash or hosting failure. Do not treat this service as a backup or permanent storage service.</p>
      <h2>4. No warranty</h2>
      <p>The tool is provided “as is” and “as available”, without warranties to the extent permitted by law. We do not guarantee uninterrupted access, successful conversion, error-free output, compatibility with every document or preservation of the original formatting.</p>
      <h2>5. Limitation of liability and data loss</h2>
      <p>To the extent permitted by applicable law, the service operator is not liable for loss of data, lost documents, corrupted files, formatting changes, service interruptions or indirect or consequential losses arising from use of the tool. You should keep a separate copy of every original document and verify your downloads. Nothing in these terms excludes liability that cannot legally be excluded.</p>
      <h2>6. Acceptable use</h2>
      <p>You must not attempt to disrupt, overload, probe, reverse engineer or bypass the service's security or usage limits; upload malicious files; or use the service in a way that violates law or the rights of others. We may restrict access when we reasonably believe there is abuse or a security risk.</p>
      <h2>7. Privacy</h2>
      <p>Your use of the service is also subject to our <Link href="/privacy">Privacy Policy</Link>. Review it before uploading files.</p>
      <h2>8. Changes and governing law</h2>
      <p>We may revise these terms by publishing an updated version on this page. The applicable law and dispute forum depend on the service operator's legal identity and place of operation; those details should be completed by the operator before launch. Mandatory consumer rights under applicable law remain unaffected.</p>
      <h2>9. Contact</h2>
      <p>For questions about these terms, use the support contact published on the website once the operator has configured and verified it.</p>
    </main>
  );
}
