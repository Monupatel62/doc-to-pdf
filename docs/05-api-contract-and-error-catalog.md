# API Contract and Error Catalog

**Status:** Proposed contract — adapt to the selected framework and deployment. No endpoints are implemented by this document.

## 1. API principles

- Use HTTPS only in production.
- Validate every request server-side.
- Treat filenames, MIME types, file contents and client-provided identifiers as untrusted.
- Keep uploaded documents private.
- Return stable machine-readable error codes and human-readable messages.
- Do not return stack traces, internal paths, command output, secrets or storage keys.
- Add rate limits and request-size limits at both edge and application layers where possible.

## 2. Proposed endpoints

The exact routes may change with the framework.

### Create conversion job
POST /api/conversions

Request: multipart form with a single file field.

Success response (example):
~~~json
{
  "jobId": "opaque-random-id",
  "status": "queued",
  "statusUrl": "/api/conversions/opaque-random-id"
}
~~~

Expected behavior:
- Reject missing, empty, unsupported or oversized uploads.
- Validate the actual document structure where practical.
- Store the file privately and create a job.
- Return an opaque identifier that does not expose storage paths.
- Apply rate and concurrency limits.

### Read job status
GET /api/conversions/{jobId}

Example response:
~~~json
{
  "jobId": "opaque-random-id",
  "status": "processing"
}
~~~

Only return information necessary for the client. Do not expose internal worker details or other users' job information.

### Download result
GET /api/conversions/{jobId}/download

Expected behavior:
- Authorize the request and confirm job status is succeeded.
- Confirm the output still exists and has not expired.
- Set a PDF content type and safe download disposition.
- Prevent cross-user access and stale result downloads.

### Delete/cancel job (optional)
Add only if cancellation semantics are supported and tested. Deletion must invalidate download access and trigger storage cleanup.

## 3. Error catalog

| HTTP status | Code | Meaning | Client action |
|---|---|---|---|
| 400 | MISSING_FILE | No file supplied | Select a file |
| 400 | INVALID_DOCUMENT | File is malformed or unreadable | Open and resave the document, then retry |
| 413 | FILE_TOO_LARGE | Upload exceeds configured limit | Choose a smaller file |
| 415 | UNSUPPORTED_FORMAT | Format not supported | Upload a supported DOC/DOCX file |
| 429 | RATE_LIMITED | Too many requests | Wait and retry later |
| 404 | JOB_NOT_FOUND | Job missing or expired | Start a new conversion |
| 409 | JOB_NOT_READY | Result not yet available | Poll status or wait |
| 422 | CONVERSION_FAILED | Converter could not process the document | Try resaving or simplifying the file |
| 503 | CONVERTER_BUSY | Service temporarily at capacity | Retry after a short delay |
| 500 | INTERNAL_ERROR | Unexpected server failure | Show a generic message and log a request ID |

Do not use 404 to reveal whether another user's private job exists. Responses should be consistent with the authorization design.

## 4. Status polling

- Poll with a bounded interval and a maximum total duration.
- Use backoff when a job remains queued or processing.
- Stop polling after terminal states.
- Never display fake progress percentages unless the worker can provide meaningful progress.
- Consider server-sent events or another method only if the hosting model supports it reliably.

## 5. Security checks

- Enforce upload size before buffering the full file where possible.
- Avoid command construction with user-controlled strings.
- Restrict worker filesystem and network access.
- Apply request timeouts and per-job execution limits.
- Avoid leaking internal error text in API responses.
- Add tests for unauthorised IDs, expired IDs, repeated requests and concurrent submissions.
