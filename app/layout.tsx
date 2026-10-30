import type { Metadata } from "next";
import "./globals.css";

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    absolute: "Free Doc to PDF Converter | Convert Word to PDF Online"
  },
  description:
    "Convert Word to PDF online with a free DOC and DOCX converter. Secure DOCX to PDF processing with clear file-handling information and a simple download workflow.",
  keywords: [
    "Free Doc to PDF Converter",
    "Convert Word to PDF Online",
    "Secure DOCX to PDF",
    "DOC to PDF",
    "DOCX to PDF converter",
    "Word document to PDF"
  ],
  applicationName: "Doc to PDF",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Doc to PDF",
    title: "Free Doc to PDF Converter | Convert Word to PDF Online",
    description:
      "Convert DOC and DOCX Word files to PDF online. Secure DOCX to PDF processing, clear file-handling details and easy downloads.",
    locale: "en_US"
  },
  twitter: {
    card: "summary",
    title: "Free Doc to PDF Converter | Convert Word to PDF Online",
    description:
      "Convert DOC and DOCX Word files to PDF online with clear file-handling information."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
