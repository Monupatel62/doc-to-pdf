import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Document Conversion Guides & Articles | Doc to PDF",
  description: "Practical guides to converting Word documents to PDF, preserving formatting, mobile conversion and document privacy.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Doc to PDF Articles", description: "Practical guides for Word-to-PDF conversion and document handling.", type: "website" }
};

const posts = [
  {
    "slug": "convert-word-to-pdf-without-losing-formatting",
    "title": "How to Convert Word to PDF Without Losing Formatting: A Step-by-Step Guide",
    "description": "Learn how to convert DOC and DOCX files to PDF while preserving fonts, page layout, images, tables, headers and footers.",
    "date": "October 30, 2026"
  },
  {
    "slug": "why-pdf-is-useful-for-business-documents",
    "title": "Why PDF Is a Reliable Format for Business Documents in 2026",
    "description": "Understand why businesses use PDF for document sharing, approvals and records, plus its security limits and best practices.",
    "date": "October 30, 2026"
  },
  {
    "slug": "convert-doc-to-pdf-on-mobile",
    "title": "How to Convert DOC to PDF on Mobile Devices Quickly",
    "description": "A practical guide to converting Word DOC and DOCX files to PDF on Android and iPhone, with browser and app options.",
    "date": "October 30, 2026"
  },
  {
    "slug": "data-privacy-in-online-file-converters",
    "title": "The Importance of Data Privacy in Online File Converters",
    "description": "Learn what happens when you upload a document to an online converter and how to assess retention, HTTPS, logs and third-party access.",
    "date": "October 30, 2026"
  },
  {
    "slug": "fix-word-to-pdf-formatting-issues",
    "title": "How to Fix Common Formatting Issues When Saving Word Documents as PDF",
    "description": "Fix font changes, shifted tables, broken page breaks, missing images and other common Word-to-PDF conversion problems.",
    "date": "October 30, 2026"
  }
];

export default function BlogIndexPage() {
  return (
    <main style={{ maxWidth: 900, margin: "48px auto", padding: "0 24px", fontFamily: "Arial, sans-serif", lineHeight: 1.7 }}>
      <Link href="/">← Back to Doc to PDF</Link>
      <header style={{ margin: "32px 0" }}>
        <p>DOC TO PDF RESOURCE CENTRE</p>
        <h1>Document Conversion Guides & Articles</h1>
        <p>Practical help for converting Word documents, keeping formatting consistent and making informed decisions about document privacy.</p>
      </header>
      <section aria-label="Latest articles">
        {posts.map(post => (
          <article key={post.slug} style={{ borderTop: "1px solid #ddd", padding: "22px 0" }}>
            <p><time>{post.date}</time></p>
            <h2 style={{ margin: "6px 0" }}><Link href={"/blog/" + post.slug}>{post.title}</Link></h2>
            <p>{post.description}</p>
            <Link href={"/blog/" + post.slug}>Read article →</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
