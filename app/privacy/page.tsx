import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Information | Doc to PDF",
  description: "Learn how uploaded documents are processed by Doc to PDF."
};

export default function PrivacyPage() {
  return <main style={{ maxWidth: 760, margin: "48px auto", padding: "0 24px", fontFamily: "Arial, sans-serif", lineHeight: 1.7 }}>
    <Link href="/">← Back to converter</Link>
    <h1>Privacy information</h1>
    <p>This MVP uploads the selected Word document to the server for conversion. The server creates temporary files while converting and attempts to remove the temporary working directory when processing ends.</p>
    <p>Temporary cleanup is best-effort in this initial implementation. Operators must also configure secure hosting, access restrictions, disk lifecycle controls and monitoring before accepting sensitive documents.</p>
    <p>Do not upload confidential or sensitive documents unless you trust the operator and have reviewed the deployed service&apos;s privacy practices.</p>
    <p>This page is a technical notice, not a substitute for a complete legal privacy policy. Before public launch, update it with the actual operator identity, contact details, hosting/processing providers, logging practices, retention periods and applicable legal requirements.</p>
  </main>;
}
