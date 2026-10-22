# AdSense Readiness Improvement Plan

**Project:** PDF.wohotech.in — DOC/DOCX to PDF converter  
**Repository:** https://github.com/Monupatel62/doc-to-pdf  
**Implementation branch:** improve/adsense-readiness  
**Status:** Planning document created before implementation.  
**Important:** This plan improves site quality and policy readiness; it cannot guarantee Google AdSense approval.

## 1. Goal

Make the website genuinely useful, transparent, navigable, accessible, and technically consistent before an AdSense application. Do not add fake reviews, fabricated trust badges, copied filler, keyword stuffing, misleading claims, or artificial traffic.

## 2. Existing baseline recorded

Based on the current repository review:

- The core DOC/DOCX-to-PDF conversion flow exists and uses a server-side LibreOffice process.
- The upload endpoint enforces a 15 MB input limit, a 60 MB output limit, a limit of two active conversions, and an in-memory rate limit.
- The temporary working directory is cleaned up on a best-effort basis; the site must not promise guaranteed deletion unless implementation and hosting behavior support that claim.
- The homepage contains the converter, a short how-it-works section, FAQs, and links to the two conversion guides and privacy page.
- The DOC-to-PDF and DOCX-to-PDF pages have short, partly similar explanatory content.
- The privacy page says the operator should provide more complete information, including contact and processing/retention details.
- Sitemap and robots routes exist. The sitemap currently lists the homepage, two guide pages, and privacy page.
- Search-engine submission or indexing does not itself establish AdSense eligibility or approval.

This is a starting inventory, not a claim that every production deployment detail has been independently verified.

## 3. Required work, in order

### Phase A — Accuracy and privacy first

1. Review the upload API, conversion process, temporary-file cleanup, request limits, logging, and hosting configuration.
2. Make all privacy statements match verified behavior. Clearly explain that a document is uploaded to the server for conversion, describe actual retention/cleanup behavior, and avoid absolute security or deletion guarantees.
3. Add a readable privacy policy that identifies what is collected, why it is processed, how long it may remain, relevant service providers/cookies/analytics/advertising only when actually used, and how users can contact the operator.
4. Do not invent a legal company name, postal address, support email, analytics setup, advertising cookies, or retention period. Ask the owner for missing factual details before publishing them.
5. Explain that users should avoid uploading sensitive or confidential documents unless they are comfortable with the disclosed processing.

### Phase B — Useful original content

1. Improve the homepage so visitors understand the tool, supported file types, file-size limit, basic workflow, expected output, limitations, and troubleshooting before uploading.
2. Expand /doc-to-pdf with a distinct, practical guide: when to use DOC conversion, step-by-step instructions, layout/font checks, common errors, and relevant FAQs.
3. Expand /docx-to-pdf with its own DOCX-specific guidance rather than duplicating the DOC page.
4. Include only guidance that is technically accurate for the actual LibreOffice-based converter. Explain that complex layouts, embedded fonts, tracked changes, macros, or unsupported elements can render differently where applicable.
5. Avoid pages made mainly to target keywords. Each page must solve a different visitor need.

### Phase C — Site identity and contact

1. Add an About page that accurately describes the tool and its purpose without invented company credentials or claims.
2. Add a Contact page with a real, owner-approved support route. Do not deploy a placeholder or fabricated email address.
3. Add clear, consistent links to Home, DOC guide, DOCX guide, About, Contact, and Privacy in navigation/footer where appropriate.
4. Keep navigation usable on mobile and ensure all links work.

### Phase D — Technical and accessibility review

1. Verify canonical URLs, metadata titles/descriptions, sitemap entries, robots rules, and internal links for every public page.
2. Use semantic headings in order, descriptive link text, accessible form labels, keyboard operation, visible focus states, and understandable upload/error/success messages.
3. Check mobile layout, empty state, invalid file, unsupported file type, oversize upload, conversion failure, and successful download.
4. Check for broken links, console/runtime errors, and accidental exposure of secrets or uploaded file contents.
5. Do not add structured-data claims that cannot be substantiated.

### Phase E — Verification and release

1. Work only on improve/adsense-readiness; do not push changes directly to production/main.
2. Run available lint, TypeScript, tests, and production build; fix regressions.
3. Review the diff and test the deployment preview or staging URL if available.
4. Report what changed, what passed, what remains blocked, and any owner-supplied facts still needed.
5. Merge or deploy only after the owner explicitly approves the completed review.

## 4. Acceptance criteria

- [ ] Every privacy/security/data-handling claim matches code and verified deployment behavior.
- [ ] No fake testimonials, fake ratings, fabricated business details, or unsupported guarantees.
- [ ] Homepage clearly explains the tool, constraints, workflow, and common failure cases.
- [ ] DOC and DOCX guides are meaningfully different and helpful.
- [ ] About and Contact pages are present; Contact uses a real route supplied/approved by the owner.
- [ ] Public pages are linked through consistent navigation/footer.
- [ ] Sitemap includes all intended indexable public pages and excludes private/API routes.
- [ ] Metadata and canonical URLs use the production domain.
- [ ] Accessibility and mobile checks completed.
- [ ] Available quality checks and production build pass.
- [ ] Changes remain on the improvement branch until owner approval.

## 5. Facts needed from the owner

Before finalizing the Contact and Privacy pages, confirm:

- The support email address to publish.
- The operator/publisher name to display (for example, whether to identify the service as maintained by WoHoTech).
- Which analytics, advertising, or cookie tools are actually installed or planned.
- Any known retention/logging behavior configured by the hosting provider, beyond the app's best-effort temporary-directory cleanup.

If a fact is not confirmed, do not guess or present it as true.

## 6. Definition of success

Success means the site is more useful and transparent, the content is original and distinct, the implementation is tested, and the owner can make an informed AdSense application. Google independently evaluates the site and may still reject it; no document or code change can guarantee approval.
