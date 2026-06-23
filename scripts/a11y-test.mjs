import { spawn } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const PORT = process.env.A11Y_PORT || 4173;
const ENTRY_URL = `http://localhost:${PORT}`;

const COLORS = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  reset: "\x1b[0m",
};

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn("npx", ["vitepress", "preview", "docs", "--port", String(PORT)], {
      cwd: rootDir,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let started = false;

    server.stdout.on("data", (data) => {
      const output = data.toString();
      if (!started && output.includes("http://localhost")) {
        started = true;
        resolve(server);
      }
    });

    server.stderr.on("data", (data) => {
      const output = data.toString();
      if (!started && output.includes("http://localhost")) {
        started = true;
        resolve(server);
      }
    });

    server.on("error", reject);

    setTimeout(() => {
      if (!started) {
        server.kill();
        reject(new Error("Preview server failed to start within 30s"));
      }
    }, 30000);
  });
}

function runOobee() {
  return new Promise((resolve) => {
    const args = [
      "@govtechsg/oobee",
      "cli",
      "-c", "website",
      "-u", ENTRY_URL,
      "-k", process.env.OOBEE_NAME_EMAIL || "SGDS CI:sgds-ci@tech.gov.sg",
      "-h", "yes",
      "-g", "yes",
      "-i", "html-only",
      "-o", "a11y-results.zip",
    ];

    const oobee = spawn("npx", args, {
      cwd: rootDir,
      stdio: "inherit",
    });

    oobee.on("close", (code) => {
      resolve(code);
    });

    oobee.on("error", (err) => {
      console.error("Failed to run oobee:", err.message);
      resolve(1);
    });
  });
}

async function findResultsDir() {
  const resultsBase = join(rootDir, "results");

  try {
    const dirs = await readdir(resultsBase);
    const latestDir = dirs.sort().pop();
    if (!latestDir) return null;
    return join(resultsBase, latestDir);
  } catch {
    return null;
  }
}

async function readJson(filePath) {
  try {
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function printIssues(issues, category, color) {
  if (!issues || issues.length === 0) return;

  for (const issue of issues) {
    console.log(
      `  ${color}${category === "mustFix" ? "✗" : "!"}${COLORS.reset} ${issue.description} ${COLORS.dim}[${issue.rule}] (${issue.totalItems} occurrences)${COLORS.reset}`
    );
    if (issue.helpUrl) {
      console.log(`    ${COLORS.dim}→ ${issue.helpUrl}${COLORS.reset}`);
    }

    const htmlGroups = issue.htmlGroups || {};
    const entries = Object.values(htmlGroups).slice(0, 5); // Show up to 5 examples
    for (const node of entries) {
      if (node.xpath) {
        console.log(`    ${COLORS.dim}Element:${COLORS.reset} ${node.xpath}`);
      }
      if (node.html) {
        const truncated = node.html.length > 120 ? node.html.slice(0, 120) + "..." : node.html;
        console.log(`    ${COLORS.dim}HTML:${COLORS.reset}    ${truncated}`);
      }
      if (node.message) {
        const lines = node.message.split("\n").filter(l => l.trim());
        for (const line of lines.slice(0, 3)) {
          console.log(`    ${color}${line.trim()}${COLORS.reset}`);
        }
      }
      if (node.pageUrls && node.pageUrls.length > 0) {
        console.log(`    ${COLORS.dim}Pages:${COLORS.reset}   ${node.pageUrls.slice(0, 3).join(", ")}${node.pageUrls.length > 3 ? ` (+${node.pageUrls.length - 3} more)` : ""}`);
      }
      console.log();
    }

    if (Object.keys(htmlGroups).length > 5) {
      console.log(`    ${COLORS.dim}... and ${Object.keys(htmlGroups).length - 5} more elements${COLORS.reset}\n`);
    }
  }
}

function printPageResults(pagesSummary) {
  if (!pagesSummary || !pagesSummary.pagesAffected) return;

  console.log(`\n${COLORS.bold}Per-Page Results:${COLORS.reset}\n`);

  for (const page of pagesSummary.pagesAffected) {
    const hasMustFix = page.totalOccurrencesMustFix > 0;
    const hasGoodToFix = page.totalOccurrencesGoodToFix > 0;
    const status = hasMustFix
      ? `${COLORS.red}FAIL${COLORS.reset}`
      : hasGoodToFix
      ? `${COLORS.yellow}WARN${COLORS.reset}`
      : `${COLORS.green}PASS${COLORS.reset}`;

    const pageName = page.pageTitle || page.url;
    console.log(
      `  ${status}  ${pageName}  ${COLORS.dim}(mustFix: ${page.totalOccurrencesMustFix}, goodToFix: ${page.totalOccurrencesGoodToFix}, passed: ${page.totalOccurrencesPassed})${COLORS.reset}`
    );
  }

  if (pagesSummary.pagesNotAffected && pagesSummary.pagesNotAffected.length > 0) {
    for (const url of pagesSummary.pagesNotAffected) {
      console.log(`  ${COLORS.green}PASS${COLORS.reset}  ${url}  ${COLORS.dim}(no issues)${COLORS.reset}`);
    }
  }
}

async function printResults(resultDir) {
  if (!resultDir) {
    console.warn("No results directory found — skipping detailed output");
    return { mustFix: 0, goodToFix: 0, exitCode: 0 };
  }

  const issuesSummary = await readJson(join(resultDir, "scanIssuesSummary.json"));
  const itemsSummary = await readJson(join(resultDir, "scanItemsSummary.json"));
  const pagesSummary = await readJson(join(resultDir, "scanPagesSummary.json"));

  const mustFixCount = itemsSummary?.mustFix?.totalItems ?? 0;
  const goodToFixCount = itemsSummary?.goodToFix?.totalItems ?? 0;
  const totalPagesScanned = itemsSummary?.totalPagesScanned ?? pagesSummary?.scannedPagesCount ?? 0;

  // Print per-page results
  printPageResults(pagesSummary);

  // Print mustFix violations
  if (issuesSummary?.mustFix?.length > 0) {
    console.log(`\n${COLORS.bold}${COLORS.red}Must Fix Issues:${COLORS.reset}\n`);
    printIssues(issuesSummary.mustFix, "mustFix", COLORS.red);
  }

  // Print goodToFix violations
  if (issuesSummary?.goodToFix?.length > 0) {
    console.log(`\n${COLORS.bold}${COLORS.yellow}Good To Fix Issues:${COLORS.reset}\n`);
    printIssues(issuesSummary.goodToFix, "goodToFix", COLORS.yellow);
  }

  // Print summary
  const pagesFailing = pagesSummary?.pagesAffected?.filter(p => p.totalOccurrencesMustFix > 0).length ?? 0;
  const pagesPassing = (pagesSummary?.pagesNotAffected?.length ?? 0) +
    (pagesSummary?.pagesAffected?.filter(p => p.totalOccurrencesMustFix === 0).length ?? 0);

  console.log(`\n${COLORS.bold}─── Summary ───${COLORS.reset}`);
  console.log(`  Pages scanned:    ${totalPagesScanned}`);
  console.log(`  ${COLORS.green}Pages passing:    ${pagesPassing}${COLORS.reset}`);
  console.log(`  ${COLORS.red}Pages failing:    ${pagesFailing}${COLORS.reset}`);
  console.log();
  console.log(`  Total mustFix:    ${mustFixCount}`);
  console.log(`  Total goodToFix:  ${goodToFixCount}`);
  console.log();

  let exitCode = 0;
  if (mustFixCount > 0) {
    console.log(`  Result:           ${COLORS.red}FAILED${COLORS.reset}`);
    exitCode = 1;
  } else {
    console.log(`  Result:           ${COLORS.green}PASSED${COLORS.reset}`);
  }
  console.log(`  Report:           ${resultDir}`);
  console.log();

  return { mustFix: mustFixCount, goodToFix: goodToFixCount, exitCode };
}

async function main() {
  console.log(`Starting preview server on port ${PORT}...`);
  let server;

  try {
    server = await startPreviewServer();
    console.log(`Preview server running at ${ENTRY_URL}`);
  } catch (err) {
    console.error("Failed to start preview server:", err.message);
    process.exit(1);
  }

  console.log("Running oobee accessibility scan...");
  await runOobee();

  // Kill the preview server
  server.kill();

  // Find and print results
  const resultDir = await findResultsDir();
  const { exitCode } = await printResults(resultDir);

  process.exit(exitCode);
}

main();
