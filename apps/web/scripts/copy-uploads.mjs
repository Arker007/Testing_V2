import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendRoot = path.resolve(__dirname, "..");
const primarySource = path.resolve(frontendRoot, "../..", "storage", "uploads");
const fallbackSource = path.resolve(frontendRoot, "../..", "uploads");
const source = fs.existsSync(primarySource) ? primarySource : fallbackSource;
const destination = path.resolve(frontendRoot, "dist", "uploads");

if (!fs.existsSync(source)) {
  console.warn("[copy-uploads] uploads folder not found; skipping copy.");
  process.exit(0);
}

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.cpSync(source, destination, { recursive: true });
console.log("[copy-uploads] Copied uploads to dist/uploads");
