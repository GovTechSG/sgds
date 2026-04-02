import { execSync } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(new URL("..", import.meta.url).pathname);
const componentsDir = path.join(repoRoot, "docs/components");
const outputPath = path.join(repoRoot, "docs/.vitepress/data/generated-component-updates.json");

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

const componentKeys = readdirSync(componentsDir)
  .filter((entry) => entry.endsWith(".md"))
  .map((entry) => entry.replace(/\.md$/, ""))
  .sort();

const runGit = (args) =>
  execSync(`git -C ${JSON.stringify(repoRoot)} ${args}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();

const sentenceCase = (text) => {
  const cleaned = text
    .replace(/^merge pull request\s+#\d+\s+from\s+\S+\s*/i, "")
    .replace(/^merge branch\s+'.*?'\s*/i, "")
    .replace(/^[a-z-]+(?:\([^)]*\))?:\s*/i, "")
    .replace(/\(#\d+\)$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "";

  const lower = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return /[.!?]$/.test(lower) ? lower : `${lower}.`;
};

const formatDisplayDate = (date) => {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;

  const monthLabel = new Date(`${year}-${month}-01T00:00:00Z`).toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC",
  });

  return `${day} ${monthLabel} ${year}`;
};

const getVersionForCommit = (hash) => {
  try {
    const tags = runGit(`tag --contains ${hash} --sort=creatordate`);
    return tags.split("\n")[0] || "Unreleased";
  } catch {
    return "Unreleased";
  }
};

const getComponentRows = (key) => {
  const aliases = specialAliases[key] ?? [key, key.replace(/-/g, " ")];
  const grepPattern = aliases
    .map((alias) => {
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return /^[a-z]+$/i.test(alias)
        ? `(^|[^a-z-])${escaped}([^a-z-]|$)`
        : escaped;
    })
    .join("|");
  const raw = runGit(
    `log --date=short --pretty=format:%ad%x09%H%x09%s --all --extended-regexp --regexp-ignore-case --grep=${JSON.stringify(grepPattern)} -n 20`,
  );

  if (!raw) return [];

  const seenDescriptions = new Set();
  const rows = [];

  for (const line of raw.split("\n")) {
    const [date, hash, ...subjectParts] = line.split("\t");
    const subject = subjectParts.join("\t").trim();
    if (!subject || /^merge /i.test(subject)) continue;

    const description = sentenceCase(subject);
    if (!description || seenDescriptions.has(description.toLowerCase())) continue;

    seenDescriptions.add(description.toLowerCase());
    rows.push({
      Date: formatDisplayDate(date),
      Version: getVersionForCommit(hash),
      Description: description,
    });

    if (rows.length === 5) break;
  }

  return rows;
};

const output = Object.fromEntries(
  componentKeys.map((key) => [key, { rows: getComponentRows(key) }]),
);

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
