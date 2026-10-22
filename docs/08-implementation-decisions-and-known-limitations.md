# MVP Implementation Decisions and Known Limitations

## Implemented
- Next.js App Router landing page and DOC/DOCX upload UI
- Server-side upload size, extension and basic signature checks
- LibreOffice conversion with fixed process arguments and a 45-second process timeout
- Random temporary filenames, private file permissions and best-effort cleanup
- PDF response with private/no-store headers and output-size validation
- Per-process request rate limit (10 requests per 10 minutes per observed client IP) and concurrency cap (2 conversions)
- Basic security response headers and a Docker image that runs the application as a non-root user
- Metadata, environment-aware sitemap/robots routes and privacy information draft
- GitHub Actions checks for lint, type checking, production build, dependency audit, Docker startup, DOCX conversion, invalid-file rejection and rate limiting

## Limitations — not yet production approved
- Rate limiting and concurrency limits are in-memory and per process; they are not distributed and may be bypassed by multiple instances or unreliable proxy IP configuration.
- A reverse proxy / hosting edge must enforce request-body limits before the application parses multipart form data.
- Conversion is synchronous. There is no queue, account system, quota system, malware scanner, distributed abuse detection or monitoring integration.
- Signature checks are not malware scanning and do not guarantee a document is valid or safe.
- LibreOffice conversion is not fully sandboxed by this application; review container hardening, seccomp, memory/CPU limits and network isolation before public launch.
- Temporary file cleanup is best-effort. A process crash or host failure can leave temporary files behind; configure storage lifecycle and monitoring.
- Real-world visual regression tests for complex DOC and DOCX documents, load testing, accessibility review and external security testing remain outstanding.
- The privacy page is a technical draft, not final legal advice. Update it with the real operator, contact route, providers, retention and logging practices.
- Production deployment, canonical domain configuration, HTTPS verification, Search Console/Bing verification and indexing checks have not been completed.
- Search rankings and indexing are not guaranteed.

## Verification
Latest successful CI run: https://github.com/Monupatel62/doc-to-pdf/actions/runs/39756650174

CI verifies code quality, dependency audit, production build, container startup, a minimal generated DOCX conversion, invalid upload rejection and the per-process rate limiter. It does not replace real-user-document QA, deployment checks or a security review.

## Remaining launch gates
1. Configure a production container host, canonical domain and HTTPS.
2. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin.
3. Add hosting-edge request/body limits and distributed rate limiting; configure container CPU/memory/PID limits and network restrictions.
4. Test representative DOC/DOCX documents and compare output formatting.
5. Review privacy/legal wording and retention behavior against the actual deployment.
6. Complete mobile/accessibility, load, security, monitoring and rollback checks.
7. Verify the site in Google Search Console and Bing Webmaster Tools and submit the sitemap.
