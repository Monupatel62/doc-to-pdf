# MVP Implementation Decisions and Known Limitations

## Implemented in the initial scaffold
- Next.js App Router landing page and responsive converter UI
- DOC/DOCX upload endpoint using the Node.js runtime
- File size and extension checks plus basic file-signature checks
- LibreOffice command launched with fixed arguments rather than a shell command
- Temporary working directory and cleanup in a finally block
- PDF response with no-store cache headers
- Basic security response headers
- Metadata, sitemap route, robots.txt and privacy information page
- Dockerfile that installs LibreOffice

## Important limitations — not production approved
- Conversion is synchronous and uses one request for the entire job; there is no queue or distributed worker.
- No authentication, quota system, distributed rate limiting, malware scanner, or abuse monitoring is included.
- The file-signature checks are basic validation, not a guarantee that documents are safe or valid.
- A serverless platform may not support LibreOffice, child processes, temporary storage or the required execution time. Use a compatible container host.
- The sample robots.txt and sitemap use example.com as a placeholder. Set NEXT_PUBLIC_SITE_URL and update robots.txt before launch.
- The privacy page is a draft notice, not final legal advice. It must reflect the actual deployment.
- Dependency versions and Docker build have not been installed, built or tested in this GitHub-only change.
- No search ranking or indexing result is guaranteed.

## Required next verification
1. Run npm install and commit the generated lockfile.
2. Run lint, type-check and production build.
3. Build the Docker image and confirm LibreOffice is available.
4. Test real DOC and DOCX fixtures, malformed files, file limits and cleanup.
5. Review worker isolation, request limits, timeouts, storage and privacy.
6. Replace example.com in SEO configuration and robots.txt with the production domain.
7. Deploy to staging and complete docs/03-launch-qa-and-operations.md before public launch.
