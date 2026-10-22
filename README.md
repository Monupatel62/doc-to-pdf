# Doc to PDF

A Next.js MVP for converting DOC and DOCX documents to PDF using LibreOffice in a Docker runtime.

## Current status

The initial application scaffold is committed, but **it has not yet been installed, built, tested or deployed**. Treat it as an implementation starting point, not a production-ready service.

## Features in this MVP

- Responsive upload interface for DOC and DOCX files
- 15 MB upload limit
- Server-side extension and basic signature validation
- PDF conversion through LibreOffice
- Temporary working directory cleanup after each request
- Basic security headers and no-store PDF responses
- SEO metadata, sitemap route, robots.txt and a privacy information page
- Dockerfile with LibreOffice Writer and common fonts

## Run locally

Requirements: Node.js 22+ and LibreOffice installed and available as `libreoffice` on PATH.

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open `http://localhost:3000`

For production-like use, build and run the provided Docker image:

```sh
docker build -t doc-to-pdf .
docker run --rm -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 doc-to-pdf
```

## Environment

Set `NEXT_PUBLIC_SITE_URL` to the real canonical origin in deployment. Update `public/robots.txt` to use the same origin before launch.

## Important limitations

- Conversion is synchronous; there is no queue or distributed worker.
- No authentication, distributed rate limiting, malware scanner, quota enforcement or abuse monitoring is included.
- Basic file signatures do not prove a file is safe.
- Hosting must support containers, LibreOffice, child processes, temporary storage and suitable memory/time limits.
- Temporary file cleanup is best-effort; configure and test storage lifecycle and cleanup monitoring.
- The privacy page is a draft notice, not a final legal policy.
- No production build or conversion tests have been run yet.
- Search indexing and rankings are not guaranteed.

## Documentation

- [Product and engineering blueprint](docs/01-product-engineering-blueprint.md)
- [SEO, keyword and content plan](docs/02-seo-keyword-content-plan.md)
- [Launch, QA and operations checklist](docs/03-launch-qa-and-operations.md)
- [Architecture and technology decisions](docs/04-architecture-and-technology-decisions.md)
- [API contract and error catalog](docs/05-api-contract-and-error-catalog.md)
- [Security threat model and privacy](docs/06-security-threat-model-and-privacy.md)
- [Test strategy and release gates](docs/07-test-strategy-and-release-gates.md)
- [MVP implementation decisions and limitations](docs/08-implementation-decisions-and-known-limitations.md)

## Before public launch

Run dependency installation, lint/type checks, production build, Docker build, real-file conversion tests, security and cleanup tests. Complete the launch checklist and replace all placeholder domains before deploying.
