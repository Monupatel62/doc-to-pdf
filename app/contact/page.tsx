import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Doc to PDF | WoHoTech",
  description: "Contact WoHoTech about the Doc to PDF conversion utility.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return <main className="guidePage">
    <nav aria-label="Breadcrumb"><Link href="/">Home</Link> / Contact</nav>
    <h1>Contact</h1>
    <p>Need to report a problem with the DOC or DOCX conversion tool? Contact the site operator using the details below. Please do not email confidential documents or sensitive personal information.</p>
    <h2>Email support</h2>
    <p><a href="mailto:wohotech@zohomail.in">wohotech@zohomail.in</a></p>
    <h2>Phone</h2>
    <p><a href="tel:+919288517867">+91 92885 17867</a></p>
    <p>When reporting a problem, describe what happened, which file type you tried, and the error message if one appeared. Do not attach private documents unless necessary and you have considered the privacy information.</p>
    <p>Read the <Link href="/privacy">privacy information</Link>, learn about the <Link href="/about">service</Link>, or return to the <Link href="/">converter</Link>.</p>
  </main>;
}