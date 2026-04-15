<script setup lang="ts">
import { computed, ref } from "vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

const props = withDefaults(
  defineProps<{
    section?: "all" | "background" | "text";
  }>(),
  {
    section: "all",
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────

type BgColorToken = {
  utilityClass: string;
  usage: string;
  previewClass: string;
};

type BgColorGroup = {
  id: string;
  label: string;
  rows: BgColorToken[];
};

type TextColorToken = {
  utilityClass: string;
  day: string;
  night: string;
  usage: string;
};

type TextColorGroup = {
  id: string;
  label: string;
  rows: readonly TextColorToken[];
};

// ─── Background colour data ───────────────────────────────────────────────────

const foundationalBgColors: BgColorToken[] = [
  {
    utilityClass: "sgds:bg-default",
    usage: "Default page canvas. The base background for all standard layouts.",
    previewClass: "sgds:bg-default",
  },
  {
    utilityClass: "sgds:bg-alternate",
    usage: "Alternate background for zebra rows, secondary panels, and banded sections.",
    previewClass: "sgds:bg-alternate",
  },
  {
    utilityClass: "sgds:bg-overlay",
    usage: "Scrim background for modal and drawer backdrops.",
    previewClass: "sgds:bg-overlay",
  },
  {
    utilityClass: "sgds:bg-fixed-light",
    usage: "Always-light background. Stays light even in dark mode.",
    previewClass: "sgds:bg-fixed-light",
  },
  {
    utilityClass: "sgds:bg-fixed-dark",
    usage: "Always-dark background. Stays dark even in light mode.",
    previewClass: "sgds:bg-fixed-dark",
  },
  {
    utilityClass: "sgds:bg-translucent",
    usage: "Semi-transparent background for floating surfaces and popovers.",
    previewClass: "sgds:bg-translucent",
  },
  {
    utilityClass: "sgds:bg-translucent-subtle",
    usage: "Lighter semi-transparent variant for gentle layering effects.",
    previewClass: "sgds:bg-translucent-subtle",
  },
  {
    utilityClass: "sgds:bg-transparent",
    usage: "Explicit transparent fill. Use to reset inherited backgrounds.",
    previewClass: "sgds:bg-transparent",
  },
];

const surfaceBgColors: BgColorToken[] = [
  {
    utilityClass: "sgds:bg-surface-default",
    usage: "Default component surface — cards, panels, dropdowns.",
    previewClass: "sgds:bg-surface-default",
  },
  {
    utilityClass: "sgds:bg-surface-raised",
    usage: "Elevated surfaces like tooltips and floating menus.",
    previewClass: "sgds:bg-surface-raised",
  },
  {
    utilityClass: "sgds:bg-surface-inverse",
    usage: "Inverted surface for high-contrast callouts and dark chips.",
    previewClass: "sgds:bg-surface-inverse",
  },
  {
    utilityClass: "sgds:bg-surface-fixed-light",
    usage: "Always-light component surface.",
    previewClass: "sgds:bg-surface-fixed-light",
  },
  {
    utilityClass: "sgds:bg-surface-fixed-dark",
    usage: "Always-dark component surface.",
    previewClass: "sgds:bg-surface-fixed-dark",
  },
];

const primaryBgColors: BgColorToken[] = [
  {
    utilityClass: "sgds:bg-primary-default",
    usage: "Brand-coloured fill for primary buttons and active states.",
    previewClass: "sgds:bg-primary-default",
  },
  {
    utilityClass: "sgds:bg-primary-surface-default",
    usage: "Primary-tinted surface for selected items and active panels.",
    previewClass: "sgds:bg-primary-surface-default",
  },
  {
    utilityClass: "sgds:bg-primary-surface-muted",
    usage: "Subtle primary tint for highlighted rows and information banners.",
    previewClass: "sgds:bg-primary-surface-muted",
  },
];

const accentBgColors: BgColorToken[] = [
  {
    utilityClass: "sgds:bg-accent-default",
    usage: "Informational fill for accent badges and link-adjacent highlights.",
    previewClass: "sgds:bg-accent-default",
  },
  {
    utilityClass: "sgds:bg-accent-surface-default",
    usage: "Accent-tinted surface for informational panels.",
    previewClass: "sgds:bg-accent-surface-default",
  },
  {
    utilityClass: "sgds:bg-accent-surface-muted",
    usage: "Subtle accent tint for informational callouts.",
    previewClass: "sgds:bg-accent-surface-muted",
  },
];

const successBgColors: BgColorToken[] = [
  {
    utilityClass: "sgds:bg-success-default",
    usage: "Positive fill for success badges and confirmation states.",
    previewClass: "sgds:bg-success-default",
  },
  {
    utilityClass: "sgds:bg-success-surface-default",
    usage: "Success-tinted surface for completion panels.",
    previewClass: "sgds:bg-success-surface-default",
  },
  {
    utilityClass: "sgds:bg-success-surface-muted",
    usage: "Subtle success tint for positive feedback banners.",
    previewClass: "sgds:bg-success-surface-muted",
  },
];

const dangerBgColors: BgColorToken[] = [
  {
    utilityClass: "sgds:bg-danger-default",
    usage: "Error fill for destructive actions and invalid states.",
    previewClass: "sgds:bg-danger-default",
  },
  {
    utilityClass: "sgds:bg-danger-surface-default",
    usage: "Danger-tinted surface for error panels.",
    previewClass: "sgds:bg-danger-surface-default",
  },
  {
    utilityClass: "sgds:bg-danger-surface-muted",
    usage: "Subtle danger tint for error and destructive-action banners.",
    previewClass: "sgds:bg-danger-surface-muted",
  },
];

const warningBgColors: BgColorToken[] = [
  {
    utilityClass: "sgds:bg-warning-default",
    usage: "Caution fill for warning badges and attention-needed states.",
    previewClass: "sgds:bg-warning-default",
  },
  {
    utilityClass: "sgds:bg-warning-surface-default",
    usage: "Warning-tinted surface for caution panels.",
    previewClass: "sgds:bg-warning-surface-default",
  },
  {
    utilityClass: "sgds:bg-warning-surface-muted",
    usage: "Subtle warning tint for caution banners.",
    previewClass: "sgds:bg-warning-surface-muted",
  },
];

const neutralBgColors: BgColorToken[] = [
  {
    utilityClass: "sgds:bg-neutral-default",
    usage: "Neutral fill for tags and non-semantic groupings.",
    previewClass: "sgds:bg-neutral-default",
  },
  {
    utilityClass: "sgds:bg-neutral-surface-default",
    usage: "Neutral-tinted surface for equal-importance panels.",
    previewClass: "sgds:bg-neutral-surface-default",
  },
  {
    utilityClass: "sgds:bg-neutral-surface-muted",
    usage: "Subtle neutral tint for categorically grouped content.",
    previewClass: "sgds:bg-neutral-surface-muted",
  },
];

const purpleBgColors: BgColorToken[] = [
  {
    utilityClass: "sgds:bg-purple-default",
    usage: "Purple fill for visual differentiation without semantic meaning.",
    previewClass: "sgds:bg-purple-default",
  },
  {
    utilityClass: "sgds:bg-purple-surface-default",
    usage: "Purple-tinted surface for accent groupings.",
    previewClass: "sgds:bg-purple-surface-default",
  },
  {
    utilityClass: "sgds:bg-purple-surface-muted",
    usage: "Subtle purple tint for colour-coded sections.",
    previewClass: "sgds:bg-purple-surface-muted",
  },
];

const cyanBgColors: BgColorToken[] = [
  {
    utilityClass: "sgds:bg-cyan-default",
    usage: "Cyan fill for visual differentiation without semantic meaning.",
    previewClass: "sgds:bg-cyan-default",
  },
  {
    utilityClass: "sgds:bg-cyan-surface-default",
    usage: "Cyan-tinted surface for accent groupings.",
    previewClass: "sgds:bg-cyan-surface-default",
  },
  {
    utilityClass: "sgds:bg-cyan-surface-muted",
    usage: "Subtle cyan tint for colour-coded sections.",
    previewClass: "sgds:bg-cyan-surface-muted",
  },
];

const bgColorGroups: BgColorGroup[] = [
  { id: "foundational", label: "Grayscale", rows: foundationalBgColors },
  { id: "surface",      label: "Surface",      rows: surfaceBgColors },
  { id: "primary",      label: "Primary",      rows: primaryBgColors },
  { id: "accent",       label: "Accent",       rows: accentBgColors },
  { id: "success",      label: "Success",      rows: successBgColors },
  { id: "danger",       label: "Danger",       rows: dangerBgColors },
  { id: "warning",      label: "Warning",      rows: warningBgColors },
  { id: "neutral",      label: "Neutral",      rows: neutralBgColors },
  { id: "purple",       label: "Purple",       rows: purpleBgColors },
  { id: "cyan",         label: "Cyan",         rows: cyanBgColors },
];

const activeBgGroupId = ref("foundational");

const currentBgRows = computed(
  () => bgColorGroups.find((g) => g.id === activeBgGroupId.value)?.rows ?? foundationalBgColors,
);

const showBackgroundSection = computed(() => props.section === "all" || props.section === "background");
const showTextSection = computed(() => props.section === "all" || props.section === "text");

function onBgTabShow(e: Event) {
  activeBgGroupId.value = (e as CustomEvent).detail.name as string;
}

// ─── Text colour data ─────────────────────────────────────────────────────────

const baseTokens = [
  { utilityClass: "sgds:text-default",     day: "#1a1a1a", night: "#ffffff", usage: "Primary body text — main readable content"          },
  { utilityClass: "sgds:text-subtle",       day: "#525252", night: "#c6c6c6", usage: "Secondary text — captions, helper text"             },
  { utilityClass: "sgds:text-muted",        day: "#c6c6c6", night: "#3b3b3b", usage: "Low-contrast text — metadata, decorative labels"    },
  { utilityClass: "sgds:text-inverse",      day: "#f3f3f3", night: "#2a2a2a", usage: "Text on inverted surfaces"                          },
  { utilityClass: "sgds:text-fixed-light",  day: "#f3f3f3", night: "#f3f3f3", usage: "Always light — use on fixed dark backgrounds"       },
  { utilityClass: "sgds:text-fixed-dark",   day: "#1a1a1a", night: "#1a1a1a", usage: "Always dark — use on fixed light backgrounds"       },
] as const;

const typographyRoleTokens = [
  { utilityClass: "sgds:text-display-default", day: "#1a1a1a", night: "#ffffff", usage: "Hero headlines, page-level display titles" },
  { utilityClass: "sgds:text-heading-default", day: "#2a2a2a", night: "#f3f3f3", usage: "H1–H4 section titles"              },
  { utilityClass: "sgds:text-body-default",    day: "#1a1a1a", night: "#ffffff", usage: "Paragraphs and descriptions"       },
  { utilityClass: "sgds:text-body-subtle",     day: "#525252", night: "#c6c6c6", usage: "Secondary body — footnotes, meta"  },
  { utilityClass: "sgds:text-label-default",   day: "#2a2a2a", night: "#f3f3f3", usage: "Form labels, table headers"        },
  { utilityClass: "sgds:text-link-default",    day: "#0269d0", night: "#60aaf4", usage: "Links at rest"                     },
  { utilityClass: "sgds:text-link-emphasis",   day: "#0151a0", night: "#96c7f7", usage: "Links on hover or focus"           },
] as const;

const semanticTextTokens = [
  { utilityClass: "sgds:text-accent-default",   day: "#0269d0", night: "#60aaf4", usage: "Informational text — brand accent, link-adjacent labels" },
  { utilityClass: "sgds:text-accent-emphasis",  day: "#0151a0", night: "#96c7f7", usage: "Hover or active accent text"                             },
  { utilityClass: "sgds:text-success-default",  day: "#0e7c3d", night: "#16bd5e", usage: "Positive state — confirmed, saved, valid"                },
  { utilityClass: "sgds:text-success-emphasis", day: "#0b5e2f", night: "#62db96", usage: "Strong success emphasis"                                 },
  { utilityClass: "sgds:text-danger-default",   day: "#cf2323", night: "#e98b8b", usage: "Error state — invalid, destructive, failed"              },
  { utilityClass: "sgds:text-danger-emphasis",  day: "#a11b1b", night: "#f1b2b2", usage: "Critical error emphasis"                                 },
  { utilityClass: "sgds:text-warning-default",  day: "#7e6917", night: "#e5bf29", usage: "Caution state — requires attention"                      },
  { utilityClass: "sgds:text-warning-emphasis", day: "#605111", night: "#fcde63", usage: "Strong caution emphasis"                                 },
  { utilityClass: "sgds:text-purple-default",   day: "#ac1cdb", night: "#d983f6", usage: "Supplementary brand color — visual differentiation"      },
  { utilityClass: "sgds:text-purple-emphasis",  day: "#8516a9", night: "#e6adf9", usage: "Hover or active purple text"                             },
  { utilityClass: "sgds:text-cyan-default",     day: "#00758d", night: "#00b4da", usage: "Supplementary brand color — visual differentiation"      },
  { utilityClass: "sgds:text-cyan-emphasis",    day: "#005a6d", night: "#49d2ef", usage: "Hover or active cyan text"                               },
  { utilityClass: "sgds:text-neutral-default",  day: "#6b6b6b", night: "#a5a5a5", usage: "Non-semantic grey — tags, badges, disabled states"       },
  { utilityClass: "sgds:text-neutral-emphasis", day: "#525252", night: "#c6c6c6", usage: "Stronger neutral text emphasis"                          },
] as const;

const textColorGroups: TextColorGroup[] = [
  { id: "general-purpose",  label: "General purpose",  rows: baseTokens },
  { id: "typography-roles", label: "Typography roles", rows: typographyRoleTokens },
  { id: "semantic",         label: "Semantic",         rows: semanticTextTokens },
];

const activeTextGroupId = ref("general-purpose");

const currentTextRows = computed(
  () => textColorGroups.find((g) => g.id === activeTextGroupId.value)?.rows ?? baseTokens,
);

function onTextTabShow(e: Event) {
  activeTextGroupId.value = (e as CustomEvent).detail.name as string;
}

// ─── Shared copy-to-clipboard ─────────────────────────────────────────────────

const copiedKey = ref<string | null>(null);

const copyUtility = async (utilityClass: string) => {
  await navigator.clipboard.writeText(utilityClass);
  copiedKey.value = utilityClass;
  setTimeout(() => {
    if (copiedKey.value === utilityClass) copiedKey.value = null;
  }, 2000);
};
</script>

<template>
  <TypographyPageTemplate>

    <!-- ── Background colour ────────────────────────────────────────────────── -->
    <section v-if="showBackgroundSection" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="typography-page-template__content-block">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Background colour</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Background colour utilities follow the pattern <CodeToken label="sgds:bg-{semantic}-{modifier}" />.
          All tokens are theme-aware and automatically switch between day and night mode values unless a
          <CodeToken label="fixed" :surface="false" /> variant is used.
        </p>
      </div>

      <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <sgds-tab-group class="sgds:block sgds:w-full" variant="underlined" @sgds-tab-show="onBgTabShow">
            <sgds-tab
              v-for="group in bgColorGroups"
              :key="group.id"
              slot="nav"
              :panel="group.id"
              :active="activeBgGroupId === group.id || null"
            >{{ group.label }}</sgds-tab>
            <sgds-tab-panel
              v-for="group in bgColorGroups"
              :key="`bg-colour-panel-${group.id}`"
              :name="group.id"
            ></sgds-tab-panel>
          </sgds-tab-group>

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="typography-page-template__table-utility-column colour-utilities-utility-column">SGDS utility</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-preview-column colour-utilities-preview-column">Preview</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="item in currentBgRows" :key="item.utilityClass">
              <sgds-table-cell class="typography-page-template__table-utility-column colour-utilities-utility-column">
                <div class="typography-page-template__utility-copy">
                  <CodeToken :label="item.utilityClass" />
                  <button
                    :class="[
                      'typography-page-template__utility-copy-button',
                      copiedKey === item.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                    ]"
                    :aria-label="copiedKey === item.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                    @click="copyUtility(item.utilityClass)"
                  >
                    <sgds-icon :name="copiedKey === item.utilityClass ? 'check' : 'copy'" size="md" />
                  </button>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item.usage }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-preview-column colour-utilities-preview-column">
                <div class="sgds:flex sgds:justify-center sgds:min-h-[5rem]">
                  <div :class="['sgds:h-14 sgds:w-14 sgds:rounded-lg sgds:border sgds:border-muted', item.previewClass]"></div>
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>
      </div>
    </section>

    <!-- ── Text colour ───────────────────────────────────────────────────────── -->
    <section v-if="showTextSection" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="typography-page-template__content-block">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Text colour</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Text colour utilities apply semantic colour tokens to text. All tokens are theme-aware and automatically
          switch between day and night mode values — unless a <CodeToken label="fixed" :surface="false" /> variant is used.
        </p>
      </div>

      <div class="typography-page-template__body typography-page-template__body--prose">
        <sgds-tab-group class="sgds:block sgds:w-full" variant="underlined" @sgds-tab-show="onTextTabShow">
          <sgds-tab
            v-for="group in textColorGroups"
            :key="group.id"
            slot="nav"
            :panel="group.id"
            :active="activeTextGroupId === group.id || null"
          >{{ group.label }}</sgds-tab>
          <sgds-tab-panel
            v-for="group in textColorGroups"
            :key="`text-colour-panel-${group.id}`"
            :name="group.id"
          ></sgds-tab-panel>
        </sgds-tab-group>

        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head class="typography-page-template__table-utility-column colour-utilities-utility-column">SGDS utility</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-value-column">Day</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-value-column">Night</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row v-for="t in currentTextRows" :key="t.utilityClass">
            <sgds-table-cell class="typography-page-template__table-utility-column colour-utilities-utility-column">
              <div class="typography-page-template__utility-copy">
                <CodeToken :label="t.utilityClass" />
                <button
                  :class="[
                    'typography-page-template__utility-copy-button',
                    copiedKey === t.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                  ]"
                  :aria-label="copiedKey === t.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                  @click="copyUtility(t.utilityClass)"
                >
                  <sgds-icon :name="copiedKey === t.utilityClass ? 'check' : 'copy'" size="md" />
                </button>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-value-column">
              <div class="colour-utilities-swatch-cell">
                <span class="colour-utilities-swatch" :style="{ background: t.day }" />
                <CodeToken :label="t.day" :surface="false" />
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-value-column">
              <div class="colour-utilities-swatch-cell">
                <span class="colour-utilities-swatch" :style="{ background: t.night }" />
                <CodeToken :label="t.night" :surface="false" />
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-usage-column">
              <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ t.usage }}</span>
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </section>

  </TypographyPageTemplate>
</template>

<style>
/* Swatch cell — inline flex with colour dot not expressible via SGDS utilities */
.colour-utilities-swatch-cell {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-xs);
}

.colour-utilities-swatch {
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  display: inline-block;
  flex-shrink: 0;
  height: 20px;
  width: 20px;
}

.colour-utilities-preview-column {
  inline-size: 7.5rem;
  min-inline-size: 7.5rem;
}

.colour-utilities-utility-column {
  inline-size: 16rem;
  max-inline-size: 16rem;
  min-inline-size: 16rem;
}
</style>
