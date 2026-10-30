import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const directory = path.join(process.cwd(), "content", "blog");
const slugs = [
  "convert-word-to-pdf-without-losing-formatting",
  "why-pdf-is-useful-for-business-documents",
  "convert-doc-to-pdf-on-mobile",
  "data-privacy-in-online-file-converters",
  "fix-word-to-pdf-formatting-issues"
];

function readPost(slug: string) {
  if (!slugs.includes(slug)) return null;
  const source = fs.readFileSync(path.join(directory, slug + ".md"), "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const fields: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const item = line.match(/^([a-z]+):\s*"(.*)"$/);
    if (item) fields[item[1]] = item[2];
  }
  return { ...fields, body: match[2].replace(/^# .+\n+/, "") };
}
export function generateStaticParams() { return slugs.map(slug => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = readPost(slug);
  if (!post) return {};
  return {
    title: post.title, description: post.description,
    keywords: post.keywords.split(",").map(value => value.trim()),
    alternates: { canonical: "/blog/" + slug },
    openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.date + "T00:00:00.000Z" }
  };
}
function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function inlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}
function renderMarkdown(markdown: string) {
  const lines = markdown.trim().split("\n");
  const output: string[] = [];
  let paragraph: string[] = [];
  let list: "ul" | "ol" | null = null;
  const flushParagraph = () => { if (paragraph.length) { output.push("<p>" + inlineMarkdown(paragraph.join(" ")) + "</p>"); paragraph = []; } };
  const closeList = () => { if (list) { output.push("</" + list + ">"); list = null; } };
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { flushParagraph(); closeList(); continue; }
    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph(); closeList();
      const level = heading[1].length;
      output.push("<h" + level + ">" + inlineMarkdown(heading[2]) + "</h" + level + ">");
      continue;
    }
    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const nextList = unordered ? "ul" : "ol";
      if (list !== nextList) { closeList(); list = nextList; output.push("<" + list + ">"); }
      output.push("<li>" + inlineMarkdown((unordered || ordered)[1]) + "</li>");
      continue;
    }
    closeList(); paragraph.push(trimmed);
  }
  flushParagraph(); closeList();
  return output.join("\n");
}
export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = readPost(slug);
  if (!post) notFound();
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: post.title, description: post.description,
    datePublished: post.date, dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": (process.env.NEXT_PUBLIC_SITE_URL || "") + "/blog/" + slug },
    publisher: { "@type": "Organization", name: "Doc to PDF" }
  };
  return (
    <main style={{ maxWidth: 820, margin: "40px auto", padding: "0 24px", fontFamily: "Arial, sans-serif", lineHeight: 1.8 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / <Link href="/blog">Articles</Link></nav>
      <article>
        <header style={{ margin: "28px 0" }}>
          <p>DOC TO PDF GUIDES · <time dateTime={post.date}>{post.date}</time></p>
          <h1 style={{ lineHeight: 1.25 }}>{post.title}</h1>
          <p>{post.description}</p>
        </header>
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />
      </article>
      <aside style={{ borderTop: "1px solid #ddd", marginTop: 40, paddingTop: 24 }}>
        <h2>Need to convert a Word document?</h2>
        <p>Use the free DOC and DOCX conversion tool, then review your PDF before sharing it.</p>
        <p><Link href="/">Open Doc to PDF converter</Link></p>
      </aside>
      <footer style={{ borderTop: "1px solid #ddd", marginTop: 36, paddingTop: 20 }}>
        <Link href="/blog">← All articles</Link> · <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms</Link>
      </footer>
    </main>
  );
}
