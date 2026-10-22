import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "DOC to PDF Converter | Convert Word Documents Online",
  description: "Convert DOC and DOCX Word documents to PDF with a simple upload workflow. Check supported formats and file handling before converting.",
  applicationName: "Doc to PDF",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "DOC to PDF Converter",
    description: "Convert Word documents to PDF in a few simple steps.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
