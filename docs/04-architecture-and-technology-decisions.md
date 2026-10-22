# Architecture and Technology Decisions

**Status:** Draft — confirm choices before implementation.  
**Purpose:** Prevent coding from starting with unclear conversion, hosting, and storage assumptions.

## 1. Decisions required

| Decision | Options to evaluate | Acceptance criteria |
|---|---|---|
| Web framework | Next.js, another maintained framework | SEO-friendly public pages, maintainable deployment |
| Conversion engine | LibreOffice headless or a maintained compatible alternative | Reliable DOC/DOCX rendering, acceptable license, supported runtime |
| Execution model | Isolated worker/container, managed job service | Resource limits, no arbitrary document execution in web process |
| Temporary storage | Ephemeral worker disk or private object storage | Private access, cleanup and lifecycle policy |
| Job state | Database or queue-backed state | Expiry, retry safety, authorization |
| Hosting | Platform supporting the chosen worker/runtime | Sufficient memory, CPU, execution time and disk |
| Monitoring | Hosted error reporting and metrics | No document content or secrets in telemetry |

Do not choose a provider solely on price before verifying its runtime, process, memory, storage and timeout limits.

## 2. Recommended logical components

- **Web UI:** upload form, format/size information, progress, error and download states.
- **API layer:** validates requests, creates jobs, enforces limits, authorizes status/download access.
- **Queue or job coordinator:** tracks queued, running, succeeded and failed jobs.
- **Conversion worker:** processes one document in an isolated environment with strict limits.
- **Private temporary storage:** stores input/output only for the required period.
- **Cleanup task:** removes expired files and job metadata according to the retention policy.
- **Metrics and alerts:** conversion success rate, duration, queue delay, timeout count and cleanup failures.

## 3. Job lifecycle

Use explicit states: created, queued, processing, succeeded, failed, expired.

- A job must not be downloadable before success.
- Repeated requests must not create uncontrolled duplicate work.
- A worker crash must leave a recoverable state and trigger cleanup.
- Download access must use an unguessable token or authenticated authorization.
- Expired jobs must not remain downloadable.
- State transitions should be validated on the server.

## 4. Conversion quality

Create a fixture set containing text, headings, tables, images, page breaks, headers/footers, hyperlinks and common fonts. Compare output PDFs visually and structurally after engine updates. Document unsupported features rather than claiming perfect fidelity.

## 5. Capacity and cost

Measure CPU time, peak memory, temporary disk, output size and duration for small, medium and maximum-size documents. Set limits from observed results. Load-test concurrent jobs and define a controlled response when capacity is reached.

## 6. Architecture decision record template

For every major decision, record:
- Decision and date
- Context/problem
- Options considered
- Chosen option and reason
- Security, privacy and license implications
- Costs and scaling limits
- Rejected alternatives
- Review trigger

## 7. Exit criteria

Implementation may begin when the framework, conversion engine, isolation model, file retention policy, hosting limits, and deployment/rollback plan have named owners and recorded decisions.
