# AdSense Readiness — Implementation Checklist

Use this checklist while implementing docs/ADSENSE_READINESS_PLAN.md. Mark an item complete only after checking the code or live preview.

## Content and trust
- [ ] Homepage explains supported DOC/DOCX formats, max input size, conversion steps, limitations, and troubleshooting.
- [ ] DOC guide contains distinct, actionable DOC-specific help.
- [ ] DOCX guide contains distinct, actionable DOCX-specific help.
- [ ] About page describes the actual service and owner-approved identity.
- [ ] Contact page includes a real, owner-approved support method.
- [ ] Privacy policy accurately covers upload processing, cleanup limitations, logs/retention, providers, and applicable analytics/ads only where verified.
- [ ] No fake reviews, fabricated credentials, or absolute privacy/security promises.

## Navigation and SEO
- [ ] Main navigation/footer links to the intended public pages.
- [ ] Each page has a unique title and useful meta description.
- [ ] Canonical URLs point to the production domain.
- [ ] Sitemap lists all intended public pages.
- [ ] Robots rules permit public pages and exclude private/API routes as intended.
- [ ] No broken internal links or placeholder content.

## Accessibility and reliability
- [ ] Upload control has an accessible label and clear instructions.
- [ ] Keyboard navigation and visible focus states work.
- [ ] Errors and successful downloads are announced clearly.
- [ ] Mobile layout is usable.
- [ ] Test valid DOC and DOCX files.
- [ ] Test invalid/unsupported files and input over 15 MB.
- [ ] Test conversion failures and successful output.
- [ ] Verify temporary-file cleanup behavior and describe it accurately.
- [ ] No uploaded file content or secrets appear in logs/client errors.

## Quality gates
- [ ] Lint passes.
- [ ] TypeScript check passes.
- [ ] Automated tests pass, if available.
- [ ] Production build passes.
- [ ] Preview/staging smoke test passes.
- [ ] Diff reviewed on improve/adsense-readiness.
- [ ] Owner explicitly approves before merge/deployment.
