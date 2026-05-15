/**
 * Build-time script that fetches GitHub releases from govtechsg/sgds-web-component
 * and generates a static JSON file for the component Updates tab.
 *
 * Usage:
 *   node scripts/generate-component-updates.mjs
 *
 * Supports optional GITHUB_TOKEN env var for higher rate limits (5000 req/hr vs 60).
 */

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(new URL("..", import.meta.url).pathname);
const outputPath = path.join(repoRoot, "docs/.vitepress/data/generated-component-updates.json");

// --- Alias maps (mirrored from component-aliases.ts) ---

const specialAliases = {
  accordion: ["accordion"],
  alert: ["alert", "alerts"],
  badge: ["badge"],
  breadcrumb: ["breadcrumb"],
  button: ["button"],
  card: ["card"],
  checkbox: ["checkbox"],
  "close-button": ["close button", "close-button"],
  "combo-box": ["combo box", "combo-box", "combobox"],
  datepicker: ["datepicker", "date picker"],
  "description-list": ["description list", "description-list"],
  divider: ["divider"],
  drawer: ["drawer"],
  dropdown: ["dropdown"],
  "file-upload": ["file upload", "file-upload"],
  footer: ["footer"],
  icon: ["icon"],
  "icon-button": ["icon button", "icon-button"],
  "icon-card": ["icon card", "icon-card"],
  "icon-list": ["icon list", "icon-list"],
  "image-card": ["image card", "image-card"],
  input: ["input"],
  link: ["link"],
  mainnav: ["mainnav", "main nav"],
  masthead: ["masthead"],
  modal: ["modal"],
  "overflow-menu": ["overflow menu", "overflow-menu"],
  pagination: ["pagination"],
  "progress-bar": ["progress bar", "progress-bar"],
  "quantity-toggle": ["quantity toggle", "quantity-toggle"],
  radio: ["radio"],
  select: ["select"],
  sidebar: ["sidebar", "side bar", "side-bar"],
  sidenav: ["sidenav", "side nav"],
  skeleton: ["skeleton"],
  spinner: ["spinner"],
  stepper: ["stepper"],
  subnav: ["subnav", "sub nav"],
  switch: ["switch"],
  "system-banner": ["system banner", "system-banner"],
  tab: ["tab", "tabs"],
  table: ["table"],
  "table-of-contents": ["table of contents", "table-of-contents"],
  textarea: ["textarea", "text area"],
  "thumbnail-card": ["thumbnail card", "thumbnail-card"],
  toast: ["toast"],
  tooltip: ["tooltip"],
};

const scopeToKey = {
  accordion: "accordion",
  alert: "alert",
  badge: "badge",
  breadcrumb: "breadcrumb",
  button: "button",
  card: "card",
  checkbox: "checkbox",
  "close-button": "close-button",
  closebutton: "close-button",
  "combo-box": "combo-box",
  combobox: "combo-box",
  datepicker: "datepicker",
  "description-list": "description-list",
  descriptionlist: "description-list",
  divider: "divider",
  drawer: "drawer",
  dropdown: "dropdown",
  "file-upload": "file-upload",
  fileupload: "file-upload",
  footer: "footer",
  icon: "icon",
  "icon-button": "icon-button",
  iconbutton: "icon-button",
  "icon-card": "icon-card",
  iconcard: "icon-card",
  "icon-list": "icon-list",
  iconlist: "icon-list",
  "image-card": "image-card",
  imagecard: "image-card",
  input: "input",
  link: "link",
  mainnav: "mainnav",
  masthead: "masthead",
  modal: "modal",
  "overflow-menu": "overflow-menu",
  overflowmenu: "overflow-menu",
  pagination: "pagination",
  "progress-bar": "progress-bar",
  progressbar: "progress-bar",
  "quantity-toggle": "quantity-toggle",
  quantitytoggle: "quantity-toggle",
  radio: "radio",
  select: "select",
  sidebar: "sidebar",
  sidenav: "sidenav",
  skeleton: "skeleton",
  spinner: "spinner",
  stepper: "stepper",
  subnav: "subnav",
  switch: "switch",
  "system-banner": "system-banner",
  systembanner: "system-banner",
  tab: "tab",
  table: "table",
  "table-of-contents": "table-of-contents",
  tableofcontents: "table-of-contents",
  textarea: "textarea",
  "thumbnail-card": "thumbnail-card",
  thumbnailcard: "thumbnail-card",
  toast: "toast",
  tooltip: "tooltip",
};

// --- Helpers ---

const PR_BASE = "https://github.com/GovTechSG/sgds-web-component/pull";

const formatDate = (iso) => {
  const d = new Date(iso);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" });
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
};

const sentenceCase = (text) => {
  const cleaned = text
    .replace(/^[*\-]\s+/, "")
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\bby\s+@\S+/gi, "")
    .replace(/^[a-z-]+(?:\([^)]*\))?:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "";

  const linked = cleaned
    .replace(
      /https:\/\/github\.com\/GovTechSG\/sgds-web-component\/pull\/(\d+)/gi,
      (_, num) => `<a class="updates-source-link" href="${PR_BASE}/${num}" target="_blank" rel="noopener noreferrer">#${num}</a>`,
    )
    .replace(
      /\bin\s+#(\d+)/gi,
      (_, num) => `in <a class="updates-source-link" href="${PR_BASE}/${num}" target="_blank" rel="noopener noreferrer">#${num}</a>`,
    )
    .replace(
      /\(#(\d+)\)/g,
      (_, num) => `(<a class="updates-source-link" href="${PR_BASE}/${num}" target="_blank" rel="noopener noreferrer">#${num}</a>)`,
    );

  const result = linked.charAt(0).toUpperCase() + linked.slice(1);
  return /[.!?]$/.test(result) ? result : `${result}.`;
};

const getScopedKeys = (scope) =>
  scope
    .toLowerCase()
    .split(",")
    .map((part) => part.trim())
    .map((part) => scopeToKey[part])
    .filter((key) => Boolean(key));

const isSkippable = (line) => {
  const t = line.trim();
  if (!t.startsWith("*") && !t.startsWith("-") && !/^\w+(?:\([^)]+\))?:/.test(t)) return true;
  if (/\bdependabot\b|\bbump\b.+\bfrom\b/i.test(t)) return true;
  const scopeMatch = t.match(/^[*\-]\s+(\w+)(?:\(([^)]+)\))?:/);
  const directScopeMatch = t.match(/^(\w+)(?:\(([^)]+)\))?:/);
  const match = scopeMatch ?? directScopeMatch;
  if (match) {
    const type = match[1].toLowerCase();
    const scope = match[2] ?? "";
    const isChoreType = ["chore", "ci", "build", "style", "test"].includes(type);
    if (isChoreType && getScopedKeys(scope).length === 0) return true;
  }
  return false;
};

const findComponentKey = (line) => {
  const scopeMatch = line.match(/^(?:[*\-]\s+)?\w+\(([^)]+)\):/);
  if (scopeMatch) {
    const [key] = getScopedKeys(scopeMatch[1]);
    if (key) return key;
    return null;
  }

  const lower = line.toLowerCase();
  for (const [key, aliases] of Object.entries(specialAliases)) {
    for (const alias of aliases) {
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern =
        /^[a-z]+$/i.test(alias)
          ? new RegExp(`(^|[^a-z-])${escaped}([^a-z-]|$)`)
          : new RegExp(escaped);
      if (pattern.test(lower)) return key;
    }
  }

  return null;
};

// --- Main ---

async function main() {
  const headers = { Accept: "application/vnd.github+json" };

  const token = process.env.GITHUB_TOKEN;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  console.log("[generate-component-updates] Fetching releases from GitHub...");

  const response = await fetch(
    "https://api.github.com/repos/govtechsg/sgds-web-component/releases?per_page=50",
    { headers },
  );

  if (!response.ok) {
    const msg = `GitHub API responded with ${response.status}: ${response.statusText}`;
    console.warn(`[generate-component-updates] ${msg} — keeping existing JSON`);
    process.exit(0);
  }

  const releases = await response.json();
  console.log(`[generate-component-updates] Fetched ${releases.length} releases`);

  const releaseMap = {};
  const counts = {};

  for (const release of releases) {
    if (!release.tag_name.startsWith("v3")) continue;
    if (!release.body) continue;
    const date = formatDate(release.published_at);
    const version = release.tag_name;

    for (const line of release.body.split("\n")) {
      if (isSkippable(line)) continue;

      const key = findComponentKey(line);
      if (!key) continue;

      const count = counts[key] ?? 0;
      if (count >= 5) continue;

      const description = sentenceCase(line);
      if (!description) continue;

      if (!releaseMap[key]) releaseMap[key] = [];
      const rows = releaseMap[key];

      if (rows.some((r) => r.Description.toLowerCase() === description.toLowerCase())) continue;

      rows.push({ Date: date, Version: version, Description: description });
      counts[key] = count + 1;
    }
  }

  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(releaseMap, null, 2)}\n`);

  const componentCount = Object.keys(releaseMap).length;
  const rowCount = Object.values(releaseMap).reduce((sum, rows) => sum + rows.length, 0);
  console.log(`[generate-component-updates] Written ${rowCount} rows across ${componentCount} components → ${outputPath}`);
}

main();
