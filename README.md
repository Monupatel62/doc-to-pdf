# Doc to PDF

A Next.js application that converts DOC and DOCX Word documents to PDF using LibreOffice inside a Docker container.

## Project status

The application, deployment container, SEO routes and GitHub Actions checks are committed. The CI pipeline runs lint, TypeScript checks, a production build, a Docker build, and container smoke tests that exercise a generated DOCX conversion. Check the [GitHub Actions runs](https://github.com/Monupatel62/doc-to-pdf/actions) for the latest result before treating a commit as verified.

A green smoke test does not replace broad conversion-quality, security, accessibility or production-load testing. The service is not production-ready until the launch checklist below is completed.

## Features

- Responsive DOC/DOCX upload and PDF download interface
- 15 MB upload limit and server-side file extension/signature checks
- PDF conversion through LibreOffice in the provided container
- Random temporary filenames and best-effort temporary directory cleanup
- Basic security response headers and private, non-cacheable PDF responses
- Health endpoint at `/api/health` and Docker health check
- Per-process conversion rate limiting and concurrency caps; run behind hosting-edge request limits
- Environment-aware sitemap and robots routes
- Canonical metadata, Open Graph basics, privacy information page
- CI for lint, type checking, production build, container startup and conversion smoke testing

## Run locally

Requirements: Node.js 22+ and LibreOffice installed and available as `libreoffice` on PATH.

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open `http://localhost:3000`

For production-like use, use Docker so the conversion engine is available:

```sh
docker build -t doc-to-pdf .
docker run --rm -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 doc-to-pdf
```

## Environment

Set `NEXT_PUBLIC_SITE_URL` to the real canonical origin (including HTTPS) in the deployment environment. The sitemap and robots routes intentionally avoid publishing placeholder sitemap URLs when the setting is absent or invalid.

## Important limitations

- Conversion is synchronous; there is no queue or distributed worker.
- No authentication, distributed rate limiting, malware scanner, quota enforcement or abuse monitoring is included.
- Basic file signatures do not prove that a document is safe.
- Hosting must support containers, LibreOffice, child processes, temporary storage and suitable memory/time limits.
- Temporary file cleanup is best-effort; configure and test storage lifecycle and cleanup monitoring.
- The privacy page is a technical draft, not a final legal policy.
- DOC/DOCX rendering can differ from Microsoft Word due to fonts and document features; test representative files.
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
- [Local verification runbook](docs/09-local-verification-runbook.md)

## Before public launch

1. Complete the full QA matrix, including real DOC and DOCX files with tables, images, headers/footers, page breaks and large documents.
2. Add effective rate limiting, request/body limits at the hosting edge, abuse monitoring and resource limits.
3. Review privacy, retention, security and legal wording for the actual operator and hosting provider.
4. Set the production domain and HTTPS, verify canonical URLs, robots and sitemap.
5. Deploy to staging, test mobile and accessibility workflows, and configure error reporting, uptime checks and rollback.
6. Verify the domain in Google Search Console and Bing Webmaster Tools, then submit the sitemap.

Do not treat successful CI as proof of production readiness or guaranteed search rankings.
