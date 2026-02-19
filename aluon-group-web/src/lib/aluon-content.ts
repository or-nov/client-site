import fs from "node:fs";
import path from "node:path";

/**
 * Loads raw JSON from exports/aluon/content.json.
 * Use for normalization; for typed content use siteContent.
 */
export function loadAluonRaw(): unknown {
  const filePath = path.join(process.cwd(), "exports", "aluon", "content.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

/** @deprecated Prefer loadAluonRaw() + siteContent. Kept for backward compatibility. */
export function loadAluonContent(): Record<string, unknown> {
  return loadAluonRaw() as Record<string, unknown>;
}
