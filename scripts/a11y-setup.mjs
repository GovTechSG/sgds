/**
 * Prepares oobee for running accessibility tests.
 *
 * Pins crawlee to ~3.17.0 because oobee passes an absolute path to
 * Dataset.open(), which crawlee 3.18+ rejects with its new
 * resolveWithinDirectory validation.
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const oobeeDir = resolve(__dirname, "../node_modules/@govtechsg/oobee");
const pkgPath = resolve(oobeeDir, "package.json");

// Pin crawlee to avoid breaking path validation in 3.18+
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
pkg.pnpm = { overrides: { crawlee: "~3.17.0" } };
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

// Install dependencies, build, and install Playwright
execSync("pnpm install && pnpm run build && pnpm exec playwright install chromium", {
  cwd: oobeeDir,
  stdio: "inherit",
});
