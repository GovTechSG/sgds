<script setup lang="ts">
import { computed, ref } from "vue";
import { iconRegistry } from "@govtechsg/sgds-web-component/components/Icon/icon-registry.js";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

const searchQuery = ref("");
const copiedIcon = ref<string | null>(null);

type IconCategory = { id: string; label: string; icons: string[] };

const iconCategories: IconCategory[] = [
  {
    id: "general",
    label: "General",
    icons: [
      "archive", "bi-funnel", "bookmark", "bookmark-fill", "box-arrow-up-right", "box-seam",
      "building", "calculator", "camera", "check", "check-circle", "check-circle-fill",
      "cloud", "cloud-check", "cloud-download", "cloud-upload", "code-square", "coins-hand",
      "copy", "cross", "cursor", "cursor-fill", "dash", "dash-circle", "dash-square",
      "dataflow", "download", "edit",
      "exclamation-circle-fill", "exclamation-triangle-fill",
      "eye", "eye-fill", "eye-slash", "eye-slash-fill",
      "flash", "gear", "heart", "house", "house-door", "image",
      "info-circle", "info-circle-fill", "life-buoy", "link", "list",
      "login", "logout", "menu", "moon", "move", "pencil", "pending-circle",
      "pin", "placeholder", "plus", "plus-circle", "plus-square", "question-circle",
      "save", "search", "share", "slash-circle", "slash-divider", "sliders", "speedometer",
      "star", "star-ai", "star-fill", "stoplights", "sun",
      "three-dots", "three-dots-vertical", "toggle-off", "toggle-on",
      "translate", "trash", "trend-down", "trend-up",
      "upload", "xcircle", "xcircle-fill", "zoom-in", "zoom-out",
    ],
  },
  {
    id: "arrow",
    label: "Arrow",
    icons: [
      "arrow-circle-down", "arrow-circle-left", "arrow-circle-right", "arrow-circle-up",
      "arrow-clockwise", "arrow-down", "arrow-left", "arrow-repeat", "arrow-right",
      "arrow-square-down", "arrow-square-left", "arrow-square-right", "arrow-square-up",
      "arrow-up", "chevron-down", "chevron-left", "chevron-right",
      "chevron-selector-vertical", "chevron-up", "switch-horizontal", "switch-vertical",
    ],
  },
  {
    id: "users",
    label: "Users",
    icons: [
      "person", "person-dash", "person-plus", "person-x",
      "user-check", "user-circle", "user-pause", "user-square", "users",
    ],
  },
  {
    id: "communication",
    label: "Communication",
    icons: [
      "chat", "chat-dots", "chat-left-text", "in-box", "mail", "mail-open", "send", "telephone",
    ],
  },
  {
    id: "alerts",
    label: "Alerts & feedback",
    icons: [
      "announcement", "bell", "bell-slash",
      "exclamation", "exclamation-circle", "exclamation-triangle",
      "hand-thumbs-down", "hand-thumbs-up",
    ],
  },
  {
    id: "layout",
    label: "Layout",
    icons: [
      "arrow-bar-down", "arrow-bar-left", "arrow-bar-right", "arrow-bar-up",
      "grid-alt", "grid-fill", "layers", "layout",
      "layout-text-window", "layout-text-window-reverse",
      "sidebar-collapse", "sidebar-expand",
      "window", "window-dash", "window-desktop", "window-dock", "window-fullscreen",
      "window-plus", "window-sidebar", "window-split", "window-stack", "window-x",
    ],
  },
  {
    id: "finance",
    label: "Finance & eCommerce",
    icons: ["bank-fill"],
  },
  {
    id: "files",
    label: "Files",
    icons: [
      "file", "file-earmark-text", "file-pdf", "file-plus", "file-text", "files",
      "folder", "folder-check", "folder-minus", "folder-plus", "paperclip",
    ],
  },
  {
    id: "security",
    label: "Security",
    icons: [
      "fingerprint", "key", "lock", "lock-fill", "passcode", "shield-tick", "unlock",
    ],
  },
  {
    id: "media",
    label: "Media & devices",
    icons: [
      "cpu-chip-ai", "database", "hard-drive", "laptop", "laptop-gear",
      "lightbulb", "microphone", "monitor", "pause", "phone", "play",
      "printer", "tablet", "video-recorder", "volume-max", "volume-x",
    ],
  },
  {
    id: "time",
    label: "Time",
    icons: ["calendar", "calendar-check", "calendar-heart", "calendar-x", "clock"],
  },
  {
    id: "social",
    label: "Social media",
    icons: [
      "facebook", "google", "instagram", "linkedin", "meetup",
      "telegram", "twitter-x", "youtube",
    ],
  },
  {
    id: "logo",
    label: "Logo",
    icons: ["sg-crest"],
  },
  {
    id: "maps",
    label: "Maps & travel",
    icons: [
      "bus", "car", "compass", "geo", "geo-alt", "geo-fill", "globe", "globe-alt",
      "luggage", "map", "passport", "pin-map-fill", "plane", "rocket",
      "ticket", "train", "truck",
    ],
  },
];

// Catch any icons added to the registry that are not yet assigned a category.
const registryKeys = new Set(Object.keys(iconRegistry));
const allCategorized = new Set(iconCategories.flatMap((c) => c.icons));
const uncategorized = Object.keys(iconRegistry)
  .filter((n) => !allCategorized.has(n))
  .sort();
if (uncategorized.length > 0) {
  iconCategories.find((c) => c.id === "general")!.icons.push(...uncategorized);
}

const totalIcons = registryKeys.size;

const filteredCategories = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  return iconCategories
    .map((cat) => ({
      ...cat,
      // Only show icons that exist in the registry (Figma may list upcoming icons not yet shipped)
      icons: cat.icons.filter((name) => registryKeys.has(name) && (!q || name.includes(q))),
    }))
    .filter((cat) => cat.icons.length > 0);
});

const totalFiltered = computed(() =>
  filteredCategories.value.reduce((sum, cat) => sum + cat.icons.length, 0)
);

const isSearching = computed(() => searchQuery.value.trim().length > 0);

function onSearchInput(event: Event) {
  searchQuery.value = String((event.target as HTMLInputElement | null)?.value ?? "");
}

async function copyIconName(iconName: string) {
  await navigator.clipboard.writeText(iconName);
  copiedIcon.value = iconName;
  setTimeout(() => {
    if (copiedIcon.value === iconName) copiedIcon.value = null;
  }, 2000);
}
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <div class="typography-page-template__body typography-page-template__body--prose">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-md">

          <!-- Intro -->
          <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:m-0">
            Use <CodeToken label="&lt;sgds-icon&gt;" /> with the <CodeToken label="name" /> attribute to render any
            icon from the registry. Click a tile to copy the icon name to your clipboard.
          </p>

          <!-- API reference -->
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">
              Usage
            </h4>
            <p class="sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal sgds:m-0">
              Import the component and use the <CodeToken label="name" /> and optional <CodeToken label="size" /> attributes.
            </p>
            <pre class="il-code-block sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal sgds:rounded-lg sgds:m-0"><code>&lt;sgds-icon name="house" size="lg"&gt;&lt;/sgds-icon&gt;</code></pre>
          </div>

          <!-- Attributes table -->
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">
              Attributes
            </h4>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
              <sgds-table-row>
                <sgds-table-head class="il-api-col--name">Attribute</sgds-table-head>
                <sgds-table-head class="il-api-col--type">Type</sgds-table-head>
                <sgds-table-head class="il-api-col--default">Default</sgds-table-head>
                <sgds-table-head class="il-api-col--desc">Description</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell><CodeToken label="name" /></sgds-table-cell>
                <sgds-table-cell><span class="sgds:font-mono sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal">string</span></sgds-table-cell>
                <sgds-table-cell><span class="sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal">—</span></sgds-table-cell>
                <sgds-table-cell><span class="sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal">The name of the icon from the SGDS icon registry. Required.</span></sgds-table-cell>
              </sgds-table-row>
              <sgds-table-row>
                <sgds-table-cell><CodeToken label="size" /></sgds-table-cell>
                <sgds-table-cell><span class="sgds:font-mono sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal">"xs" | "sm" | "md" | "lg" | "xl" | "2-xl" | "3-xl"</span></sgds-table-cell>
                <sgds-table-cell><span class="sgds:font-mono sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal">"md"</span></sgds-table-cell>
                <sgds-table-cell><span class="sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal">Sets the icon size. Maps to the SGDS icon size token scale (12px–64px).</span></sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </div>

          <!-- Search + status row -->
          <div class="il-toolbar sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-component-sm sgds:justify-between">
            <div class="il-search-wrap">
              <sgds-input
                type="text"
                placeholder="Search icons…"
                :value="searchQuery"
                class="sgds:block sgds:w-full"
                aria-label="Search icons"
                @sgds-input="onSearchInput"
              />
            </div>
            <p
              class="sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal sgds:m-0 sgds:flex sgds:items-center sgds:gap-text-xs il-status"
              role="status"
              aria-live="polite"
            >
              <template v-if="copiedIcon">
                <sgds-icon name="check" size="sm" />
                "{{ copiedIcon }}" copied
              </template>
              <template v-else-if="isSearching">
                {{ totalFiltered }} result{{ totalFiltered === 1 ? "" : "s" }} for
                "{{ searchQuery }}"
              </template>
              <template v-else>
                {{ totalIcons }} icons in {{ iconCategories.length }} categories
              </template>
            </p>
          </div>

          <!-- Empty state -->
          <div
            v-if="filteredCategories.length === 0"
            class="il-empty sgds:flex sgds:flex-col sgds:items-center sgds:gap-text-sm sgds:py-layout-lg sgds:text-center"
          >
            <sgds-icon name="search" size="2-xl" class="sgds:opacity-40" aria-hidden="true" />
            <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:m-0">
              No icons found for <strong>"{{ searchQuery }}"</strong>
            </p>
          </div>

          <!-- Category sections -->
          <div v-else class="il-categories sgds:flex sgds:flex-col sgds:gap-layout-md">
            <div
              v-for="(category, index) in filteredCategories"
              :key="category.id"
              class="il-category sgds:flex sgds:flex-col sgds:gap-component-sm"
            >
              <div class="sgds:flex sgds:items-baseline sgds:gap-text-sm">
                <h4 class="sgds:text-heading-xs sgds:font-semibold sgds:leading-xs sgds:tracking-tight sgds:m-0">
                  {{ category.label }}
                </h4>
                <span class="il-category-count sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal">
                  {{ category.icons.length }}
                </span>
              </div>

              <div
                class="il-icon-grid sgds:grid sgds:gap-component-xs"
                role="list"
                :aria-label="`${category.label} icons`"
              >
                <button
                  v-for="iconName in category.icons"
                  :key="iconName"
                  type="button"
                  role="listitem"
                  class="il-tile sgds:flex sgds:flex-col sgds:items-center sgds:text-center sgds:relative sgds:min-w-0 sgds:rounded-lg sgds:bg-surface-default sgds:gap-text-2-xs sgds:py-3 sgds:px-2 sgds:cursor-pointer"
                  :class="copiedIcon === iconName ? 'il-tile--copied' : ''"
                  :aria-label="`${iconName}${copiedIcon === iconName ? ' — copied' : ' — click to copy'}`"
                  @click="copyIconName(iconName)"
                >
                  <span class="sgds:flex sgds:items-center sgds:justify-center sgds:min-h-10" aria-hidden="true">
                    <sgds-icon :name="iconName" size="xl" />
                  </span>
                  <span class="il-tile-name sgds:font-mono sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">
                    {{ iconName }}
                  </span>
                  <span class="il-tile-badge sgds:flex sgds:items-center sgds:justify-center sgds:rounded sgds:p-1 sgds:bg-surface-raised" aria-hidden="true">
                    <sgds-icon :name="copiedIcon === iconName ? 'check' : 'copy'" size="xs" />
                  </span>
                </button>
              </div>
            </div>
          </div>

        </article>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
/* ─── Search toolbar ────────────────────────────────────────────────────────── */

.il-search-wrap {
  flex: 1 1 20rem;
  max-inline-size: 28rem;
}

.il-status {
  /* Muted body text colour — no SGDS text-color utility available without theme files */
  color: var(--sgds-body-color-muted);
  white-space: nowrap;
}

/* ─── Empty state ───────────────────────────────────────────────────────────── */

.il-empty {
  color: var(--sgds-body-color-muted);
}

/* ─── Category sections ─────────────────────────────────────────────────────── */

.il-category-count {
  color: var(--sgds-body-color-muted);
  font-variant-numeric: tabular-nums;
}

/* ─── Icon grid ─────────────────────────────────────────────────────────────── */

.il-icon-grid {
  /* auto-fill grid cannot be expressed as an SGDS utility */
  grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
}

/* ─── Icon tile ─────────────────────────────────────────────────────────────── */

.il-tile {
  /* appearance:none required for button reset; no SGDS utility */
  appearance: none;
  /* transparent border preserves the space so tiles don't shift on hover */
  border: var(--sgds-border-width-1) solid transparent;
  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    color 120ms ease;
}

.il-tile:hover,
.il-tile--copied {
  background: var(--sgds-primary-surface-muted);
  border-color: var(--sgds-primary-border-color-default);
  color: var(--sgds-primary-color-default);
}

.il-tile:focus-visible {
  outline: var(--sgds-outline-focus);
  outline-offset: var(--sgds-outline-offset-focus);
}

/* ─── Icon tile name (monospace, truncated) ─────────────────────────────────── */

.il-tile-name {
  /* text-overflow combo requires CSS; no SGDS utilities for overflow/ellipsis */
  max-inline-size: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

/* ─── Copy badge (top-right, revealed on hover/focus/copied) ────────────────── */

.il-tile-badge {
  /* Absolute inset values — no SGDS inset utility */
  inset-block-start: var(--sgds-spacer-2);
  inset-inline-end: var(--sgds-spacer-2);
  opacity: 0;
  position: absolute;
  transition: opacity 120ms ease;
}

.il-tile:hover .il-tile-badge,
.il-tile:focus-visible .il-tile-badge {
  opacity: 1;
}

.il-tile--copied .il-tile-badge {
  color: var(--sgds-success-color-default);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .il-tile,
  .il-tile-badge {
    transition: none;
  }
}

/* ─── Usage code block ──────────────────────────────────────────────────────── */

.il-code-block {
  /* background and border cannot be expressed as SGDS utilities in pre/code context */
  background: var(--sgds-surface-raised-color);
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
  overflow-x: auto;
  padding: var(--sgds-spacer-3) var(--sgds-spacer-4);
}

/* ─── API table columns ─────────────────────────────────────────────────────── */

.il-api-col--name   { inline-size: 10%; min-inline-size: 6rem; }
.il-api-col--type   { inline-size: 30%; min-inline-size: 12rem; }
.il-api-col--default { inline-size: 10%; min-inline-size: 5rem; }
.il-api-col--desc   { inline-size: 50%; min-inline-size: 14rem; }

@media (max-width: 639px) {
  .il-search-wrap {
    max-inline-size: none;
  }

  .il-icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
  }
}
</style>
