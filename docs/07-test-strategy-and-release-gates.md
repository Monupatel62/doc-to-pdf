# Test Strategy and Release Gates

**Status:** Proposed test plan for implementation and continuous integration.

## 1. Test layers

### Unit tests
- File extension and size validation
- MIME and signature validation helpers
- Job-state transitions
- Authorization rules
- Expiry and retention calculations
- Filename and response-header sanitisation
- API error mapping

### Integration tests
- Upload to queue to worker to output
- Worker success, failure, timeout and crash
- Private storage permissions
- Status polling and download authorization
- Automatic cleanup of source and output files
- Rate limits and queue-capacity behavior

### End-to-end tests
- Select a DOCX, convert it and download a PDF
- Show helpful validation errors
- Handle refresh or navigation during processing
- Confirm a completed job can be downloaded only while valid
- Confirm expired or unauthorised jobs cannot be downloaded
- Test keyboard navigation and small-screen layout

## 2. Representative document fixtures

Maintain legally usable test files covering:
- Plain text and headings
- Lists and numbered sections
- Tables with borders and merged cells
- Images and captions
- Page breaks and multi-page layout
- Headers, footers and page numbers
- Hyperlinks and special characters
- Common fonts and fallback fonts
- Large but permitted documents
- Corrupt, truncated, empty and unsupported files

For each valid fixture, define expected outcomes and manually review visual output when conversion engine versions change. Avoid fixtures containing personal or confidential information.

## 3. Regression checks

- PDF opens with common readers.
- Output MIME type and file extension are correct.
- Text and page count are plausible.
- Images and tables are not silently omitted.
- The source and output do not leak through public paths.
- Temporary files are removed on all terminal paths.
- Errors do not expose stack traces or host filesystem paths.
- Repeated submissions cannot bypass limits.
- A worker crash does not leave a job permanently processing.
- Accessibility and responsive behavior remain usable.

## 4. CI checks

Required checks before merging:
- Formatting/lint
- Type checking
- Unit tests
- Integration tests with a test conversion engine
- Dependency/security scan appropriate to the stack
- Build
- Basic route and metadata checks

Run heavyweight conversion fixtures in a controlled CI job. Pin the engine version and make CI output reproducible.

## 5. Release gates

### Gate A — Developer ready
- Tests pass locally.
- Required environment variables are documented.
- No secrets are committed.
- Setup instructions work from a clean clone.

### Gate B — Staging ready
- Build and smoke tests pass.
- Conversion fixture suite passes.
- Privacy, retention and access control verified.
- Mobile and accessibility checks pass.
- SEO pages and crawl configuration reviewed.

### Gate C — Production ready
- Rollback path is tested.
- Monitoring and alerts are active.
- Production secrets are configured securely.
- Domain, HTTPS, redirects and canonical URL are verified.
- Search Console and Bing Webmaster Tools can verify ownership.
- No unresolved critical/high severity issue remains.

## 6. Defect severity

- **Critical:** cross-user file access, code execution, secret exposure, or major data loss — block release.
- **High:** conversion failure for common supported files, broken downloads, cleanup failure, or major security defect — block release.
- **Medium:** limited format issue with a clear workaround — assess and document before release.
- **Low:** minor visual or copy issue without a material user impact — schedule for follow-up.

## 7. Test report template

- Commit:
- Runtime and conversion engine versions:
- Build:
- Lint/typecheck:
- Unit tests:
- Integration tests:
- Fixture conversions:
- Security/privacy checks:
- Cleanup tests:
- Accessibility/mobile:
- SEO checks:
- Known defects:
- Release decision: GO / NO-GO
