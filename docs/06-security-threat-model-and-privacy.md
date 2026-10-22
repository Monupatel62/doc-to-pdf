# Security Threat Model and Privacy Requirements

**Status:** Required design and review document. This is not a certification or claim that the future application is secure.

## 1. Assets to protect

- Uploaded DOC/DOCX documents and generated PDFs
- Job IDs, access tokens and download URLs
- User IP addresses and operational metadata
- Hosting credentials, signing keys and environment secrets
- Converter worker availability and infrastructure resources

## 2. Main threats

| Threat | Risk | Required controls |
|---|---|---|
| Malicious or malformed document | Worker compromise or resource exhaustion | Isolated worker, patched converter, CPU/memory/time limits |
| Oversized or repeated uploads | Cost spikes and denial of service | Request limits, quotas, rate limits, queue caps |
| Path traversal or unsafe filename | File overwrite or data exposure | Server-generated filenames, safe paths, no user-controlled paths |
| Command injection | Arbitrary command execution | Avoid shell interpolation; use safe process APIs and fixed arguments |
| Predictable job IDs | Other users access documents | Cryptographically random IDs plus authorization |
| Public or leaked storage URL | Private document disclosure | Private bucket, short-lived signed access if needed, no public listing |
| Retained temporary files | Data exposure after conversion | Automated TTL cleanup, cleanup monitoring, retention tests |
| Secrets in logs | Account or infrastructure compromise | Secret redaction, minimal logging, access controls |
| Dependency or image vulnerability | Service compromise | Pinned dependencies, regular updates and vulnerability review |
| Cross-site scripting or unsafe rendering | User/browser compromise | Escape output, safe headers, avoid rendering uploaded content as HTML |

## 3. File-handling rules

- Treat every upload as hostile input.
- Do not execute macros or active content from uploaded documents.
- Do not render the source document in the main application origin unless there is a strong, reviewed reason.
- Store files outside public web roots.
- Use generated storage keys unrelated to the original filename.
- Verify access on every status and download request.
- Do not rely on an unguessable ID alone if the product has user accounts or needs stronger access control.
- Keep conversion workers isolated from secrets and internal services.
- Apply a strict maximum file size, conversion timeout, output size and concurrency limit.

## 4. Privacy policy facts to determine

Before writing final public legal copy, record:
- Whether conversion is browser-side or server-side
- Which file types are accepted
- Maximum upload and output size
- Whether IP addresses or job metadata are logged
- Whether third-party storage or processing providers are involved
- Retention duration for inputs, outputs and job records
- How automatic deletion works and how failures are detected
- Whether analytics/cookies are used
- A support/contact route for privacy requests

Public wording must match the real system. Never promise local-only processing, zero storage, end-to-end encryption or instant deletion unless these are implemented and independently verified.

## 5. Operational controls

- Use separate development, staging and production secrets.
- Restrict access to deployment and storage consoles.
- Enable HTTPS and secure cookies where cookies are used.
- Configure appropriate security headers and a tested Content Security Policy.
- Keep dependencies and converter packages updated.
- Alert on unusual upload volume, high failure rates, worker restarts and cleanup failures.
- Have a documented incident response and rollback plan.
- Limit staff access to uploaded content; avoid manual inspection unless necessary and authorised.

## 6. Security release gate

Do not launch until:
- [ ] Access-control tests show users cannot fetch another user's file.
- [ ] Upload validation and size limits are enforced server-side.
- [ ] Worker isolation and resource limits are verified.
- [ ] Expiry and cleanup work for success, failure and timeout paths.
- [ ] Logs are checked for document contents, filenames and secrets.
- [ ] Dependency and container images have been reviewed.
- [ ] Privacy statements accurately describe processing and retention.
- [ ] A responsible contact and incident handling path are documented.
