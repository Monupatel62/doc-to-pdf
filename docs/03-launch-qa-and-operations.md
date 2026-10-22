# Launch, QA and Operations Checklist

**Project:** Doc to PDF  
**Status:** Use as a staged checklist; no production app or deployment is implied by this document.

## Phase 1 — Decisions before coding

- [ ] Choose frontend framework and runtime.
- [ ] Choose conversion engine and confirm its license and maintenance status.
- [ ] Decide whether conversion runs in a container, worker service or other isolated environment.
- [ ] Document upload limits, queue behavior, timeouts and concurrent-job limits.
- [ ] Decide where temporary files live and how deletion is enforced.
- [ ] Write privacy and retention wording based on the actual data flow.
- [ ] Decide supported document formats, operating systems and expected output behavior.

## Phase 2 — Build and CI

- [ ] Add formatting, linting, type checks and automated tests.
- [ ] Add an isolated conversion worker with resource limits.
- [ ] Validate file size, extension, MIME hints and file structure server-side.
- [ ] Generate random job and file identifiers.
- [ ] Keep uploads and output files private.
- [ ] Add rate limiting and controlled error responses.
- [ ] Add automatic cleanup and a test that checks cleanup occurs.
- [ ] Add supported fonts and document any conversion limitations.
- [ ] Ensure logs do not contain document contents or secrets.
- [ ] Pin and regularly update dependencies and conversion engine images.

## Phase 3 — QA test matrix

### Functional test files
- [ ] Simple one-page DOCX.
- [ ] Multi-page document.
- [ ] Document with tables and headers/footers.
- [ ] Document with images and captions.
- [ ] Document with page breaks, lists and different fonts.
- [ ] Large file at the accepted limit.
- [ ] Empty file, truncated file, malformed document and unsupported extension.

### Expected behavior
- [ ] Converted PDF opens and can be downloaded.
- [ ] Formatting is visually compared against the source.
- [ ] Errors are understandable and allow a safe retry.
- [ ] Double-submit behavior is defined and tested.
- [ ] Timeouts, worker crash and queue saturation are handled.
- [ ] One user cannot view or download another user's files.
- [ ] Temporary files are removed after completion/expiry and on failure.
- [ ] Filename sanitisation and path traversal attempts are tested.
- [ ] Command injection payloads are treated as untrusted input.
- [ ] Mobile upload and download work in supported browsers.
- [ ] Keyboard and screen-reader workflows are tested.

## Phase 4 — Pre-launch SEO

- [ ] Confirm production domain and HTTPS.
- [ ] Redirect alternate hostnames and HTTP to the chosen canonical URL.
- [ ] Set correct titles, descriptions, canonical tags and language.
- [ ] Verify robots.txt does not block intended public pages.
- [ ] Generate sitemap with only canonical, indexable URLs.
- [ ] Exclude temporary download URLs, internal endpoints and private pages from the sitemap.
- [ ] Check HTTP status and canonical output for every intended landing page.
- [ ] Test the page on mobile and verify the main tool is usable without layout shifts.
- [ ] Add accurate social-sharing metadata.
- [ ] Validate structured data only if it matches visible content and current guidelines.
- [ ] Ensure the public landing page explains the product and limits.
- [ ] Remove placeholder content and unsupported claims.

## Phase 5 — Launch and indexing

- [ ] Deploy first to staging and run the entire QA matrix.
- [ ] Confirm backups or rollback method for configuration and code.
- [ ] Set up error reporting, uptime checks and conversion metrics.
- [ ] Publish the production release.
- [ ] Verify the domain in Google Search Console.
- [ ] Submit the sitemap and inspect the main landing page.
- [ ] Verify the site in Bing Webmaster Tools and submit the sitemap.
- [ ] Test key public URLs with live URL/fetch inspection tools.
- [ ] Check logs and error metrics after release.
- [ ] Do not consider a sitemap submission proof of indexing.

## Phase 6 — First 30 days

### Weekly
- [ ] Review conversion success/failure rate.
- [ ] Review the most common errors and file types.
- [ ] Check cleanup failures, worker resource use and security alerts.
- [ ] Check uptime and mobile performance.
- [ ] Review Search Console and Bing data for crawl/indexing issues.

### After enough data accumulates
- [ ] Identify queries with impressions but low CTR and improve page titles/snippets when justified.
- [ ] Improve pages receiving relevant visits but few completed conversions.
- [ ] Publish only content that answers real user questions.
- [ ] Compare metrics with a recorded baseline.
- [ ] Re-test converter quality after engine, font or runtime updates.

## Release gate

Do not launch publicly until all blocking items are complete:
- Conversion quality meets the agreed test criteria.
- Uploads and downloads are private and appropriately authorised.
- Resource limits, rate limiting and cleanup are tested.
- Privacy wording matches the implementation.
- Critical accessibility, security and functional defects are resolved.
- Canonical URLs, crawl controls and sitemap are verified.
- Basic monitoring and rollback are ready.

## Launch status template

Copy this section into a release issue and fill it in:

- Release/version:
- Production URL:
- Conversion engine/version:
- Supported formats and maximum file size:
- Conversion QA result:
- Security/privacy review:
- Cleanup/retention test:
- Mobile/accessibility checks:
- SEO crawl/sitemap checks:
- Google Search Console verification:
- Bing Webmaster verification:
- Monitoring/rollback:
- Known issues:
- Decision: GO / NO-GO
