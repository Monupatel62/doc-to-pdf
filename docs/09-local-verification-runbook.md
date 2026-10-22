# Local Verification Runbook

The repository contains an initial application implementation. This runbook explains how to verify it in an environment that can install npm packages and run Docker.

## Required commands

Run from the repository root:

~~~sh
npm install
npm run lint
npx tsc --noEmit
npm run build
docker build -t doc-to-pdf .
docker run --rm -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 doc-to-pdf
~~~

Then open http://localhost:3000 and test harmless sample DOC and DOCX files.

## Test cases

- Valid DOCX produces a PDF that opens.
- Valid DOC produces a PDF that opens.
- Unsupported extension returns 415.
- Empty and malformed files are rejected.
- File larger than 15 MB is rejected.
- Converter unavailable returns a clear service error.
- Output is returned with application/pdf and a safe attachment filename.
- Temporary directory is removed after success and failure.
- /sitemap.xml responds with valid XML.
- /robots.txt has no stale placeholder production URL.
- /privacy is reachable and accurately describes the deployment.
- CI passes lint, TypeScript, build and Docker build.

## Verification rule

A GitHub file write is not a successful test run. Do not mark checks as passed until a CI run or local command output confirms them. The GitHub Actions workflow in .github/workflows/ci.yml runs automated checks on pushes and pull requests.
