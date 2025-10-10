import { appendFile } from "fs/promises";
import { join } from "path";

const errorLogPath = join(process.cwd(), "error.log");

export async function logError(error: unknown, context?: string) {
  const timestamp = new Date().toISOString();
  const errorMessage = error instanceof Error ? error.message : String(error);
  const stackTrace = error instanceof Error ? error.stack : "";

  const logEntry = `
[${timestamp}] ${context ? `[${context}] ` : ""}
Error: ${errorMessage}
${stackTrace ? `Stack: ${stackTrace}` : ""}
${"=".repeat(80)}
`;

  try {
    await appendFile(errorLogPath, logEntry);
  } catch (err) {
    console.error("Failed to write to error log:", err);
  }

  // Also log to console for development
  console.error(logEntry);
}
