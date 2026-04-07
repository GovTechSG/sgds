import { ref, onMounted } from "vue";
import { specialAliases, scopeToKey } from "../data/component-aliases";

export type UpdateRow = { Date: string; Version: string; Description: string };

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  body: string;
}

// Module-level cache shared across all component pages
const releaseMap = new Map<string, UpdateRow[]>();
let fetchPromise: Promise<void> | null = null;
let fetchFailed = false;

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" });
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
};

const PR_BASE = "https://github.com/GovTechSG/sgds-web-component/pull";

const sentenceCase = (text: string): string => {
  const cleaned = text
    .replace(/^[*\-]\s+/, "")
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\bby\s+@\S+/gi, "")
    .replace(/^[a-z-]+(?:\([^)]*\))?:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "";

  // Convert PR references to links — GitHub uses full URLs, "in #473", or "(#473)" formats
  const linked = cleaned
    .replace(
      /https:\/\/github\.com\/GovTechSG\/sgds-web-component\/pull\/(\d+)/gi,
      (_, num) => `<a href="${PR_BASE}/${num}" target="_blank" rel="noopener noreferrer">#${num}</a>`,
    )
    .replace(
      /\bin\s+#(\d+)/gi,
      (_, num) => `in <a href="${PR_BASE}/${num}" target="_blank" rel="noopener noreferrer">#${num}</a>`,
    )
    .replace(
      /\(#(\d+)\)/g,
      (_, num) => `(<a href="${PR_BASE}/${num}" target="_blank" rel="noopener noreferrer">#${num}</a>)`,
    );

  const result = linked.charAt(0).toUpperCase() + linked.slice(1);
  return /[.!?]$/.test(result) ? result : `${result}.`;
};

const isSkippable = (line: string): boolean => {
  const t = line.trim();
  if (!t.startsWith("*") && !t.startsWith("-")) return true;
  if (/\bdependabot\b|\bbump\b.+\bfrom\b/i.test(t)) return true;
  // Skip chore/ci/docs/build unless the scope is a known component
  const scopeMatch = t.match(/^[*\-]\s+(\w+)(?:\(([^)]+)\))?:/);
  if (scopeMatch) {
    const type = scopeMatch[1].toLowerCase();
    const scope = scopeMatch[2]?.toLowerCase() ?? "";
    const isChoreType = ["chore", "ci", "build", "style", "test"].includes(type);
    if (isChoreType && !scopeToKey[scope]) return true;
  }
  return false;
};

const findComponentKey = (line: string): string | null => {
  // Pass 1: conventional commit scope — fast and precise
  const scopeMatch = line.match(/^[*\-]\s+\w+\(([^)]+)\):/);
  if (scopeMatch) {
    const scope = scopeMatch[1].toLowerCase();
    if (scopeToKey[scope]) return scopeToKey[scope];
  }

  // Pass 2: keyword alias scan across the full line
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

const buildReleaseMap = (releases: GitHubRelease[]): void => {
  // Track row count per component to cap at 5
  const counts = new Map<string, number>();

  for (const release of releases) {
    if (!release.tag_name.startsWith("v3")) continue;
    if (!release.body) continue;
    const date = formatDate(release.published_at);
    const version = release.tag_name;

    for (const line of release.body.split("\n")) {
      if (isSkippable(line)) continue;

      const key = findComponentKey(line);
      if (!key) continue;

      const count = counts.get(key) ?? 0;
      if (count >= 5) continue;

      const description = sentenceCase(line);
      if (!description) continue;

      if (!releaseMap.has(key)) releaseMap.set(key, []);
      const rows = releaseMap.get(key)!;

      // Deduplicate by description
      if (rows.some((r) => r.Description.toLowerCase() === description.toLowerCase())) continue;

      rows.push({ Date: date, Version: version, Description: description });
      counts.set(key, count + 1);
    }
  }
};

const ensureFetched = (): Promise<void> => {
  if (fetchPromise) return fetchPromise;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  // Optional token for higher rate limits — set VITE_GITHUB_TOKEN in .env
  const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  fetchPromise = fetch(
    "https://api.github.com/repos/govtechsg/sgds-web-component/releases?per_page=50",
    { headers },
  )
    .then((r) => {
      if (!r.ok) throw new Error(`GitHub API ${r.status}`);
      return r.json() as Promise<GitHubRelease[]>;
    })
    .then((releases) => {
      console.log("[useComponentUpdates] GitHub releases:", releases);
      buildReleaseMap(releases);
    })
    .catch(() => {
      fetchFailed = true;
    });

  return fetchPromise;
};

export function useComponentUpdates(componentKey: string) {
  const rows = ref<UpdateRow[]>([]);
  const loading = ref(true);
  const error = ref(false);

  onMounted(async () => {
    await ensureFetched();
    if (fetchFailed) {
      error.value = true;
    } else {
      rows.value = releaseMap.get(componentKey) ?? [];
    }
    loading.value = false;
  });

  return { rows, loading, error };
}
