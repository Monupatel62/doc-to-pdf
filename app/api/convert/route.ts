import { NextRequest, NextResponse } from "next/server";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { spawn } from "node:child_process";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BYTES = 15 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([".doc", ".docx"]);

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function runLibreOffice(inputPath: string, outputDir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const profile = "file://" + path.join(outputDir, "lo-profile");
    const child = spawn("libreoffice", [
      "-env:UserInstallation=" + profile,
      "--headless", "--convert-to", "pdf", "--outdir", outputDir, inputPath
    ], { stdio: ["ignore", "ignore", "pipe"], timeout: 45000 });
    let stderr = "";
    child.stderr?.on("data", (chunk: Buffer) => { stderr += chunk.toString().slice(0, 4000); });
    child.on("error", () => reject(new Error("CONVERTER_UNAVAILABLE")));
    child.on("close", code => {
      if (code === 0) resolve();
      else reject(new Error(stderr.includes("timed out") ? "CONVERSION_TIMEOUT" : "CONVERSION_FAILED"));
    });
  });
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BYTES + 1024 * 1024) return errorResponse("Maximum file size is 15 MB.", 413);

  let form: FormData;
  try { form = await request.formData(); }
  catch { return errorResponse("Upload could not be read.", 400); }

  const file = form.get("file");
  if (!(file instanceof File)) return errorResponse("Choose a DOC or DOCX file.", 400);
  if (file.size === 0) return errorResponse("The selected file is empty.", 400);
  if (file.size > MAX_BYTES) return errorResponse("Maximum file size is 15 MB.", 413);

  const extension = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(extension)) return errorResponse("Only DOC and DOCX files are supported.", 415);

  const bytes = Buffer.from(await file.arrayBuffer());
  if (extension === ".docx") {
    if (bytes.length < 4 || bytes.readUInt32LE(0) !== 0x04034b50) {
      return errorResponse("This does not appear to be a valid DOCX document.", 400);
    }
  } else if (bytes.length < 8 || bytes.subarray(0, 8).toString("hex") !== "d0cf11e0a1b11ae1") {
    return errorResponse("This does not appear to be a valid DOC document.", 400);
  }

  const workDir = await mkdtemp(path.join(tmpdir(), "doc-to-pdf-"));
  const safeBase = randomUUID();
  const inputPath = path.join(workDir, safeBase + extension);
  const outputPath = path.join(workDir, safeBase + ".pdf");

  try {
    await writeFile(inputPath, bytes, { mode: 0o600, flag: "wx" });
    await runLibreOffice(inputPath, workDir);
    const output = await readFile(outputPath);
    if (output.length < 5 || output.subarray(0, 5).toString("ascii") !== "%PDF-") {
      return errorResponse("The converter did not produce a valid PDF. Try another document.", 422);
    }
    const downloadName = file.name.replace(/\.(docx?)$/i, "").replace(/[\r\n"]/g, "_").slice(0, 120) + ".pdf";
    return new NextResponse(new Uint8Array(output), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=\"" + downloadName + "\"",
        "Cache-Control": "no-store, private",
        "X-Content-Type-Options": "nosniff",
        "Content-Length": String(output.length)
      }
    });
  } catch (error) {
    const code = error instanceof Error ? error.message : "";
    if (code === "CONVERTER_UNAVAILABLE") return errorResponse("The conversion engine is unavailable. Run the app with the provided Docker setup.", 503);
    if (code === "CONVERSION_TIMEOUT") return errorResponse("Conversion took too long. Try a smaller or simpler document.", 422);
    return errorResponse("Conversion failed. Please check the document and try again.", 422);
  } finally {
    await rm(workDir, { recursive: true, force: true }).catch(() => undefined);
  }
}
