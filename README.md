# Doc to PDF

A document conversion web application focused on converting DOC/DOCX files to PDF with a clear user experience, secure file handling, fast performance, and discoverable public pages.

> **Status:** Planning/documentation stage. The repository started empty; this README describes the intended product and does not claim the converter is implemented.

## Project goals

- Let users convert supported Word documents to PDF through a simple, accessible workflow.
- Make upload limits, supported formats, processing behavior, and file-retention policies clear.
- Protect uploaded documents and avoid exposing files through public URLs.
- Build technically sound pages that search engines can crawl and index.
- Measure organic discovery and conversion success using webmaster and analytics tools.

## Documentation

- [Product and engineering blueprint](docs/01-product-engineering-blueprint.md)
- [SEO, keyword and content plan](docs/02-seo-keyword-content-plan.md)
- [Launch, QA and operations checklist](docs/03-launch-qa-and-operations.md)

## Intended core journey

1. User selects a DOC or DOCX document.
2. The app validates file type and size before processing.
3. The conversion worker converts the document to PDF.
4. The user receives a downloadable PDF.
5. Uploaded input and generated output are removed according to the documented retention policy.

The implementation must decide and document a concrete conversion engine and deployment model before launch. Conversion support must be tested with real-world files, fonts, tables, images, and malformed input.

## Initial SEO targets

Prioritize useful pages for queries such as:
- DOC to PDF
- DOCX to PDF
- Word to PDF converter
- convert Word document to PDF online
- DOC to PDF converter free

Search rankings and browser address-bar suggestions cannot be guaranteed. Focus on user value, accessibility, crawlability, performance, and real measurement.

## Before launch

Use the checklists in `docs/`. At minimum, verify functional conversion, security, mobile usability, accessibility, canonical URLs, robots rules, sitemap, structured data where appropriate, and Google Search Console/Bing Webmaster Tools setup.

## Contribution approach

Build in small, reviewable changes. Add automated tests for conversion, file validation, error handling, and retention cleanup before public release.
