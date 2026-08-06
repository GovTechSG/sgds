import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

// Set CRAWLEE_STORAGE_DIR so crawlee resolves storage paths correctly
process.env.CRAWLEE_STORAGE_DIR = resolve(rootDir, "results");

// Resolve playwright from oobee's nested node_modules
const require = createRequire(import.meta.url);
const oobeeDir = resolve(dirname(fileURLToPath(import.meta.url)), "../node_modules/@govtechsg/oobee");
const playwrightPath = require.resolve("playwright", { paths: [oobeeDir] });
const pw = await import(playwrightPath);
const chromium = pw.default?.chromium ?? pw.chromium;
const oobeeInit = (await import("@govtechsg/oobee")).default;
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

const THRESHOLDS = { mustFix: 0, goodToFix: undefined };
const VIEWPORT = { width: 1920, height: 1040 };

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn("npx", ["vitepress", "preview", "docs", "--port", String(PORT)], {
      cwd: rootDir,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let started = false;

    const checkOutput = (data) => {
      const output = data.toString();
      if (!started && (output.includes("http://localhost") || output.includes("Built site served"))) {
        started = true;
        resolve(server);
      }
    };

    server.stdout.on("data", checkOutput);
    server.stderr.on("data", checkOutput);

    server.on("error", reject);

    // Fallback: poll the port in case output detection fails
    const pollInterval = setInterval(async () => {
      if (started) { clearInterval(pollInterval); return; }
      try {
        const res = await fetch(`http://localhost:${PORT}`);
        if (res.ok || res.status < 500) {
          clearInterval(pollInterval);
          if (!started) { started = true; resolve(server); }
        }
      } catch {}
    }, 1000);

    setTimeout(() => {
      clearInterval(pollInterval);
      if (!started) {
        server.kill();
        reject(new Error("Preview server failed to start within 30s"));
      }
    }, 30000);
  });
}

async function discoverPages(browser, entryUrl) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const visited = new Set();
  const toVisit = [entryUrl];
  const baseUrl = new URL(entryUrl);

  while (toVisit.length > 0 && visited.size < 200) {
    const url = toVisit.pop();
    const normalized = new URL(url, entryUrl).href.split("#")[0];

    if (visited.has(normalized)) continue;
    visited.add(normalized);

    try {
      await page.goto(normalized, { waitUntil: "domcontentloaded", timeout: 15000 });

      const links = await page.evaluate((origin) => {
        const NON_HTML_EXT = /\.(md|json|txt|svg|pdf|png|jpg|xml)$/i;
        return [...document.querySelectorAll("a[href]")]
          .map((a) => a.href)
          .filter((href) => href.startsWith(origin) && !href.includes("#") && !NON_HTML_EXT.test(href));
      }, baseUrl.origin);

      for (const link of links) {
        const clean = link.split("#")[0];
        if (!visited.has(clean)) {
          toVisit.push(clean);
        }
      }
    } catch {
      // Skip pages that fail to load during discovery
    }
  }

  await context.close();
  return [...visited];
}

async function scanPage(browser, pageUrl, oobeeA11y) {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(pageUrl, { waitUntil: "networkidle", timeout: 30000 });

    // Wait for custom elements to be defined
    await page
      .waitForFunction(
        () => document.querySelectorAll(":not(:defined)").length === 0,
        { timeout: 10000 }
      )
      .catch(() => {});

    // Wait for Lit components to finish rendering
    await page
      .waitForFunction(
        async () => {
          const promises = [];
          for (const el of document.querySelectorAll("*")) {
            if (el.tagName.toLowerCase().startsWith("sgds-") && "updateComplete" in el) {
              promises.push(el.updateComplete);
            }
          }
          await Promise.all(promises);
          return true;
        },
        { timeout: 15000 }
      )
      .catch(() => {});

    // Inject axe-core and oobee scan functions
    await page.evaluate(oobeeA11y.getAxeScript());
    await page.evaluate(oobeeA11y.getOobeeFunctions());

    // Run scan
    const scanRes = await page.evaluate(async () => await runA11yScan());

    // Push results to oobee aggregator
    await oobeeA11y.pushScanResults(scanRes, undefined, undefined, page);

    const axeResults = scanRes.axeScanResults;
    const violations = axeResults?.violations ?? [];
    const passes = axeResults?.passes ?? [];

    let mustFix = 0;
    let goodToFix = 0;
    const mustFixRules = [];
    const goodToFixRules = [];

    for (const v of violations) {
      const count = v.nodes?.length ?? 1;
      const isMustFix = v.impact === "critical" || v.impact === "serious";

      const nodes = (v.nodes ?? []).map((n) => ({
        target: Array.isArray(n.target) ? n.target.join(" > ") : String(n.target ?? ""),
        html: n.html ?? "",
        failureSummary: n.failureSummary ?? "",
      }));

      const rule = {
        rule: v.id,
        description: v.description ?? v.help ?? "",
        impact: v.impact ?? "unknown",
        count,
        helpUrl: v.helpUrl ?? "",
        nodes,
      };

      if (isMustFix) {
        mustFix += count;
        mustFixRules.push(rule);
      } else {
        goodToFix += count;
        goodToFixRules.push(rule);
      }
    }

    return { page: pageUrl, mustFix, goodToFix, passed: passes.length, mustFixRules, goodToFixRules };
  } catch (err) {
    return { page: pageUrl, mustFix: 0, goodToFix: 0, passed: 0, mustFixRules: [], goodToFixRules: [], error: err.message };
  } finally {
    await context.close();
  }
}

function printPageResult(result) {
  const status = result.error
    ? `${COLORS.red}ERROR${COLORS.reset}`
    : result.mustFix > 0
    ? `${COLORS.red}FAIL${COLORS.reset}`
    : result.goodToFix > 0
    ? `${COLORS.yellow}WARN${COLORS.reset}`
    : `${COLORS.green}PASS${COLORS.reset}`;

  const pagePath = result.page.replace(ENTRY_URL, "") || "/";
  console.log(
    `  ${status}  ${pagePath}  ${COLORS.dim}(mustFix: ${result.mustFix}, goodToFix: ${result.goodToFix}, passed: ${result.passed})${COLORS.reset}`
  );

  if (result.error) {
    console.log(`         ${COLORS.red}${result.error}${COLORS.reset}`);
    return;
  }

  for (const rule of result.mustFixRules) {
    console.log(
      `         ${COLORS.red}✗${COLORS.reset} ${rule.description} ${COLORS.dim}[${rule.rule}] (${rule.count} occurrences)${COLORS.reset}`
    );
    if (rule.helpUrl) {
      console.log(`           ${COLORS.dim}→ ${rule.helpUrl}${COLORS.reset}`);
    }
    for (const node of (rule.nodes || []).slice(0, 5)) {
      if (node.html) {
        const truncated = node.html.length > 150 ? node.html.slice(0, 150) + "..." : node.html;
        console.log(`           ${COLORS.dim}HTML: ${truncated}${COLORS.reset}`);
      }
      if (node.target) {
        console.log(`           ${COLORS.dim}Target: ${node.target}${COLORS.reset}`);
      }
    }
    if ((rule.nodes || []).length > 5) {
      console.log(`           ${COLORS.dim}... and ${rule.nodes.length - 5} more${COLORS.reset}`);
    }
  }

  for (const rule of result.goodToFixRules) {
    console.log(
      `         ${COLORS.yellow}!${COLORS.reset} ${rule.description} ${COLORS.dim}[${rule.rule}] (${rule.count} occurrences)${COLORS.reset}`
    );
    if (rule.helpUrl) {
      console.log(`           ${COLORS.dim}→ ${rule.helpUrl}${COLORS.reset}`);
    }
  }
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

  // Initialize oobee
  console.log("Initializing oobee...");
  const oobeeA11y = await oobeeInit({
    entryUrl: ENTRY_URL,
    testLabel: "SGDS Docs Portal A11y Scan",
    name: process.env.OOBEE_NAME || "SGDS CI",
    email: process.env.OOBEE_EMAIL || "sgds-ci@tech.gov.sg",
    includeScreenshots: false,
    viewportSettings: VIEWPORT,
    thresholds: THRESHOLDS,
    deviceChosen: "Desktop",
    zip: "a11y-results.zip",
  });

  // Launch browser
  const browser = await chromium.launch({ headless: true });

  // Discover all pages
  console.log("Discovering pages...");
  const pages = await discoverPages(browser, ENTRY_URL);
  console.log(`Found ${pages.length} pages to scan.\n`);

  // Scan each page
  const results = [];
  for (let i = 0; i < pages.length; i++) {
    const pagePath = pages[i].replace(ENTRY_URL, "") || "/";
    process.stdout.write(`  Scanning [${i + 1}/${pages.length}] ${pagePath}...\r`);
    const result = await scanPage(browser, pages[i], oobeeA11y);
    results.push(result);
  }
  console.log();

  // Close browser
  await browser.close();

  // Generate report
  await oobeeA11y.terminate();

  // Check thresholds
  let thresholdsPassed = true;
  try {
    oobeeA11y.testThresholds();
  } catch {
    thresholdsPassed = false;
  }

  // Kill preview server
  server.kill();

  // Print results
  console.log(`\n${COLORS.bold}Results:${COLORS.reset}\n`);
  for (const result of results) {
    printPageResult(result);
  }

  // Summary
  const totalMustFix = results.reduce((sum, r) => sum + r.mustFix, 0);
  const totalGoodToFix = results.reduce((sum, r) => sum + r.goodToFix, 0);
  const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
  const pagesWithErrors = results.filter((r) => r.error).length;
  const pagesFailing = results.filter((r) => r.mustFix > 0).length;
  const pagesPassing = results.filter((r) => !r.error && r.mustFix === 0).length;

  console.log(`\n${COLORS.bold}─── Summary ───${COLORS.reset}`);
  console.log(`  Pages scanned:    ${results.length}`);
  console.log(`  ${COLORS.green}Pages passing:    ${pagesPassing}${COLORS.reset}`);
  console.log(`  ${COLORS.red}Pages failing:    ${pagesFailing}${COLORS.reset}`);
  if (pagesWithErrors > 0) {
    console.log(`  ${COLORS.red}Pages with errors: ${pagesWithErrors}${COLORS.reset}`);
  }
  console.log();
  console.log(`  Total mustFix:    ${totalMustFix}`);
  console.log(`  Total goodToFix:  ${totalGoodToFix}`);
  console.log(`  Total passed:     ${totalPassed}`);
  console.log();
  console.log(
    `  Thresholds:       mustFix <= ${THRESHOLDS.mustFix}${THRESHOLDS.goodToFix !== undefined ? `, goodToFix <= ${THRESHOLDS.goodToFix}` : ""}`
  );
  console.log(
    `  Result:           ${thresholdsPassed ? `${COLORS.green}PASSED${COLORS.reset}` : `${COLORS.red}FAILED${COLORS.reset}`}`
  );
  console.log(`  Report:           results/`);
  console.log();

  process.exit(thresholdsPassed ? 0 : 1);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
