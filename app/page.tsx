import Link from "next/link";
import Converter from "./components/converter";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/about#contact", label: "Contact" }
];

export default function Home() {
  return (
    <main className="page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Doc to PDF home">Doc to PDF</Link>
        <nav className="primary-nav" aria-label="Main navigation">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </header>

      {/* Reserved for a future approved ad unit; no ad script is loaded here. */}
      <div id="adsense-header" className="ad-slot ad-slot-header" aria-hidden="true" />

      <section className="hero">
        <p className="eyebrow">WORD DOCUMENT CONVERTER</p>
        <h1>Convert DOC and DOCX to PDF</h1>
        <p className="intro">Turn a Word document into a PDF in a few simple steps. Check your file, convert it, and download the result.</p>
        <Converter />
        <p className="privacyNote">Your document is uploaded to the server to create the PDF. Do not upload confidential files unless you have reviewed the service’s data-handling practices.</p>
      </section>

      {/* Reserved sidebar inventory; intentionally has no height until an ad unit is configured. */}
      <aside id="adsense-sidebar" className="ad-slot ad-slot-sidebar" aria-hidden="true" />

      <section className="info" id="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          <article><span>01</span><h3>Select a file</h3><p>Choose a Word document in DOC or DOCX format, up to 15 MB.</p></article>
          <article><span>02</span><h3>Convert</h3><p>The server uses LibreOffice to create a PDF from your document.</p></article>
          <article><span>03</span><h3>Download</h3><p>Your browser receives the converted PDF as a download.</p></article>
        </div>
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <details><summary>Which formats are supported?</summary><p>The MVP accepts DOC and DOCX files up to 15 MB. Other formats are not supported.</p></details>
        <details><summary>Are files processed online?</summary><p>Yes. The file is uploaded to the server for conversion. Run this app only on a trusted deployment with appropriate access controls and cleanup settings.</p></details>
        <details><summary>Will the PDF look exactly like Word?</summary><p>Results can vary by fonts and document features. Review the output before using it for important documents.</p></details>
      </section>

      {/* Reserved for a future approved ad unit. */}
      <div id="adsense-footer" className="ad-slot ad-slot-footer" aria-hidden="true" />

      <footer className="site-footer">
        <p>Doc to PDF · Simple document conversion</p>
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/about#contact">Contact</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </footer>
    </main>
  );
}
