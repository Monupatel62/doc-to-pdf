import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Doc to PDF",
  description: "How Doc to PDF handles uploaded documents, technical data and advertising cookies."
};

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 800, margin: "48px auto", padding: "0 24px", fontFamily: "Arial, sans-serif", lineHeight: 1.75 }}>
      <Link href="/">← Back to Doc to PDF</Link>
      <h1>Privacy Policy</h1>
      <p><strong>Last updated: October 30, 2026</strong></p>
      <p>Doc to PDF is designed to make DOC and DOCX conversion straightforward while limiting the handling of your documents. This policy explains what the current application does. The actual practices of the hosting provider and any enabled third-party services may also apply.</p>
      <h2>1. Documents you upload</h2>
      <p>When you convert a document, your browser uploads it to our application server. The server temporarily writes the document to a private temporary working directory so LibreOffice can convert it. The application does not intentionally save uploaded documents to a user account, document library or permanent application database, and the conversion route does not intentionally log document contents.</p>
      <p>After the conversion request finishes—whether it succeeds or fails—the application attempts to delete the temporary working directory in its cleanup step. This is best-effort cleanup, not a guaranteed deletion service. A process crash, machine failure or hosting-provider backup or storage behavior may prevent immediate removal. We therefore cannot promise that every file is always deleted instantly or within one hour. Do not upload highly confidential or sensitive documents.</p>
      <p>The converted PDF is returned to your browser as a private, non-cacheable download response. We do not provide a permanent online document storage feature.</p>
      <h2>2. HTTPS and security</h2>
      <p>The production service is intended to be accessed over HTTPS. HTTPS encrypts data in transit between your browser and the service when it is correctly enabled on the deployed domain. Check that the address bar shows HTTPS before uploading a document. Security controls cannot eliminate every risk, and the hosting provider may process technical data needed to operate the service.</p>
      <h2>3. Technical information and logs</h2>
      <p>The application uses request metadata, including an observed client IP address, in memory to apply basic rate limits. The hosting platform, reverse proxy or infrastructure provider may independently collect access logs, IP addresses, timestamps, diagnostic information and security events under its own policies. We have not verified or configured all provider-level logging and retention settings. We do not claim that no technical logs are created.</p>
      <h2>4. Cookies and Google AdSense</h2>
      <p>The current application code does not itself establish Google AdSense cookies. If Google AdSense advertising is enabled on this website, Google and its advertising partners may use cookies or similar technologies to serve, measure and personalize ads, subject to your location, consent choices and Google's policies. These technologies may use information about visits to this and other websites. You can manage ad personalization and cookie choices through Google's available settings and your browser settings. This section should be updated if advertising providers or technologies change.</p>
      <h2>5. Third-party services</h2>
      <p>The website is hosted by a third-party infrastructure provider and uses LibreOffice on the application server for document conversion. Those providers may process technical information as necessary to provide their services. Review the relevant provider policies for details about their processing and retention.</p>
      <h2>6. Children and sensitive information</h2>
      <p>This tool is a general-purpose document converter and is not designed to collect personal information from children. Please avoid uploading identity documents, financial records, medical records or other sensitive material unless you have assessed the risks and are legally permitted to do so.</p>
      <h2>7. Changes and contact</h2>
      <p>We may update this policy when the service or its providers change. For privacy questions, use the support contact published on this website once a verified support address is configured. The operator's legal name and verified privacy contact details must be added before public launch.</p>
      <p>This policy is general information, not legal advice. The operator should review it against the actual hosting configuration, provider contracts, advertising setup and applicable law.</p>
    </main>
  );
}
