# Security Threat Model and Privacy Requirements

**Status:** Working threat model. The implemented controls are useful baseline defenses, not a security certification.

## Assets
- Uploaded Word documents and generated PDFs
- Client IP / request metadata and temporary files
- Hosting credentials, deployment configuration and operational availability

## Current baseline controls
- Server-side 15 MB file-size check, DOC/DOCX extension and basic signature checks
- Random temporary file names and private file permissions
- Fixed LibreOffice process arguments without shell interpolation; process timeout
- Output PDF signature and size validation
- Best-effort temporary-directory cleanup
- In-memory per-process rate limit and concurrency cap
- Docker runtime uses the unprivileged Node user
- Basic security headers and private/no-store PDF responses
- CI dependency audit and container conversion smoke tests

## Threats and required controls

| Threat | Current mitigation | Remaining work |
|---|---|---|
| Malicious/malformed document | Basic signatures; conversion timeout | Isolate converter, restrict network, CPU/memory/PID limits, patch OS and LibreOffice |
| Oversized request | App file size check and Content-Length guard | Enforce request-body limits at proxy/hosting edge before multipart parsing |
| Repeated uploads | Per-process rate and concurrency limits | Distributed rate limiting, quotas and abuse monitoring |
| Spoofed client IP | Use last X-Forwarded-For entry when present | Configure and trust only the known reverse proxy; verify forwarded headers cannot be client-controlled |
| Path traversal / unsafe filename | Generated file names and fixed paths | Keep regression tests and inspect download header handling |
| Command injection | Spawn with fixed arguments and no shell | Maintain safe arguments and regression tests |
| Temporary file residue | Finally-block cleanup | Test crash/timeout cleanup and configure host temp storage lifecycle |
| Dependency / image vulnerability | Automated npm audit and CI | Regular updates, image scanning and OS patching |
| Resource exhaustion | Timeout, output cap, concurrency cap | Container/host resource limits, queueing and load testing |
| Privacy mismatch | Technical notice explains upload processing | Add operator identity, contact, retention, hosting and logging facts before launch |

## Privacy facts to confirm before launch
- Whether IP addresses and request metadata are logged
- Hosting and conversion providers and their data locations
- Temporary storage location, retention and deletion failure behavior
- Analytics/cookies and any third-party scripts
- Operator identity and a contact route for privacy requests

Do not promise local-only processing, zero storage, end-to-end encryption or instant deletion unless implemented and verified.

## Security release gate
- [ ] Hosting-edge request/body limits configured and tested.
- [ ] Distributed rate limiting and abuse monitoring configured.
- [ ] Container resource and network restrictions verified.
- [ ] DOC/DOCX malformed and hostile test corpus reviewed.
- [ ] Cleanup tested on success, conversion failure and timeout.
- [ ] Logs reviewed for filenames, contents and secrets.
- [ ] Privacy wording matches the real deployed data flow.
- [ ] External security review and load test completed.
