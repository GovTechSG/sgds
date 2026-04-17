<script setup lang="ts">
import { ref } from "vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

const tokenViewOptions = [
  { id: "css-variable", label: "CSS variable" },
  { id: "figma", label: "Figma token" },
] as const;
type TokenViewId = (typeof tokenViewOptions)[number]["id"];
const activeTokenViewId = ref<TokenViewId>("css-variable");
const copiedKey = ref<string | null>(null);

const onTokenViewShow = (event: Event) => {
  const nextView = (event as CustomEvent<{ name?: string }>).detail?.name as TokenViewId | undefined;
  if (nextView && tokenViewOptions.some((o) => o.id === nextView)) activeTokenViewId.value = nextView;
};

const copyTokenValue = async (key: string, text: string) => {
  await navigator.clipboard.writeText(text);
  copiedKey.value = key;
  setTimeout(() => { if (copiedKey.value === key) copiedKey.value = null; }, 2000);
};

// Tokens in this file always have the -- prefix
const getTokenValue = (token: string) => {
  if (activeTokenViewId.value === "css-variable") return token;
  return token.replace(/^--/, "");
};

type SpacingTokenSection =
  | "spacer-scale"
  | "text-gap"
  | "layout-gap"
  | "component-gap"
  | "component-padding"
  | "layout-padding";

const props = withDefaults(defineProps<{ section?: SpacingTokenSection }>(), {
  section: "spacer-scale",
});

// ─── Spacer scale ────────────────────────────────────────────────────────────

type SpacerRow = { index: number; rem: string; px: string; isBase?: boolean };

const spacerRows: SpacerRow[] = [
  { index: 0,  rem: "0rem",      px: "0px"   },
  { index: 1,  rem: "0.125rem",  px: "2px"   },
  { index: 2,  rem: "0.25rem",   px: "4px"   },
  { index: 3,  rem: "0.5rem",    px: "8px"   },
  { index: 4,  rem: "0.75rem",   px: "12px"  },
  { index: 5,  rem: "1rem",      px: "16px",  isBase: true },
  { index: 6,  rem: "1.25rem",   px: "20px"  },
  { index: 7,  rem: "1.5rem",    px: "24px"  },
  { index: 8,  rem: "2rem",      px: "32px"  },
  { index: 9,  rem: "3rem",      px: "48px"  },
  { index: 10, rem: "4rem",      px: "64px"  },
  { index: 11, rem: "6rem",      px: "96px"  },
  { index: 12, rem: "8rem",      px: "128px" },
];

// ─── Responsive token tables ──────────────────────────────────────────────────

type ResponsiveRow = { token: string; mobile: string; tablet: string; desktop: string; usage: string; isBase?: boolean };

const textGapRows: ResponsiveRow[] = [
  { token: "--sgds-text-gap-2-xs", mobile: "4px",  tablet: "4px",  desktop: "4px",  usage: "Tightest inline spacing, e.g. icon-and-label pairs"    },
  { token: "--sgds-text-gap-xs",   mobile: "8px",  tablet: "8px",  desktop: "8px",  usage: "Between labels, badges, or tag clusters"               },
  { token: "--sgds-text-gap-sm",   mobile: "8px",  tablet: "12px", desktop: "12px", usage: "Between a heading and its immediately following text"   },
  { token: "--sgds-text-gap-md",   mobile: "12px", tablet: "16px", desktop: "16px", usage: "Between related body paragraphs or list items",         isBase: true },
  { token: "--sgds-text-gap-lg",   mobile: "16px", tablet: "20px", desktop: "20px", usage: "Between a heading group and the content below"          },
  { token: "--sgds-text-gap-xl",   mobile: "20px", tablet: "24px", desktop: "24px", usage: "Between distinct content blocks within a prose section" },
  { token: "--sgds-text-gap-2-xl", mobile: "24px", tablet: "32px", desktop: "32px", usage: "Between major typographic groups on the same surface"   },
];

const layoutGapRows: ResponsiveRow[] = [
  { token: "--sgds-layout-gap-2-xs", mobile: "4px",  tablet: "12px", desktop: "16px", usage: "Minimal separation between tightly related layout zones" },
  { token: "--sgds-layout-gap-xs",   mobile: "8px",  tablet: "16px", desktop: "20px", usage: "Compact layout regions, e.g. dense dashboards"           },
  { token: "--sgds-layout-gap-sm",   mobile: "12px", tablet: "20px", desktop: "24px", usage: "Small section gaps in constrained layouts"               },
  { token: "--sgds-layout-gap-md",   mobile: "16px", tablet: "24px", desktop: "32px", usage: "Standard gap between page sections or content areas",    isBase: true },
  { token: "--sgds-layout-gap-lg",   mobile: "20px", tablet: "32px", desktop: "48px", usage: "Large gaps between major page sections"                  },
  { token: "--sgds-layout-gap-xl",   mobile: "24px", tablet: "48px", desktop: "64px", usage: "Maximum layout gap for hero or feature sections"         },
];

const componentGapRows: ResponsiveRow[] = [
  { token: "--sgds-component-gap-xs", mobile: "8px",  tablet: "16px", desktop: "20px", usage: "Between tightly grouped elements inside a component"  },
  { token: "--sgds-component-gap-sm", mobile: "12px", tablet: "20px", desktop: "24px", usage: "Default gap for most component internals"              },
  { token: "--sgds-component-gap-md", mobile: "16px", tablet: "24px", desktop: "32px", usage: "Between larger sub-sections within a component",       isBase: true },
  { token: "--sgds-component-gap-lg", mobile: "20px", tablet: "32px", desktop: "48px", usage: "Spacious component layouts, e.g. card groups"          },
  { token: "--sgds-component-gap-xl", mobile: "24px", tablet: "48px", desktop: "64px", usage: "Maximum separation within expansive component regions" },
];

// ─── Responsive padding tables ────────────────────────────────────────────────

const componentPaddingRows: ResponsiveRow[] = [
  { token: "--sgds-component-padding-xs", mobile: "16px", tablet: "20px", desktop: "24px", usage: "Compact components, e.g. small cards or chips"           },
  { token: "--sgds-component-padding-sm", mobile: "20px", tablet: "24px", desktop: "32px", usage: "Default padding for interactive components"              },
  { token: "--sgds-component-padding-md", mobile: "24px", tablet: "32px", desktop: "48px", usage: "Standard content components, e.g. panels or modals",    isBase: true },
  { token: "--sgds-component-padding-lg", mobile: "32px", tablet: "48px", desktop: "64px", usage: "Spacious components, e.g. feature cards or callouts"    },
  { token: "--sgds-component-padding-xl", mobile: "48px", tablet: "64px", desktop: "96px", usage: "Maximum padding for hero blocks or full-bleed sections" },
];

const layoutPaddingRows: ResponsiveRow[] = [
  { token: "--sgds-layout-padding-xs", mobile: "16px", tablet: "20px", desktop: "24px", usage: "Minimal page-level inset for compact views"         },
  { token: "--sgds-layout-padding-sm", mobile: "20px", tablet: "24px", desktop: "32px", usage: "Default page margins on small screens"              },
  { token: "--sgds-layout-padding-md", mobile: "24px", tablet: "32px", desktop: "48px", usage: "Standard page inset padding",                       isBase: true },
  { token: "--sgds-layout-padding-lg", mobile: "32px", tablet: "48px", desktop: "64px", usage: "Generous page-level padding for spacious layouts"   },
  { token: "--sgds-layout-padding-xl", mobile: "48px", tablet: "64px", desktop: "96px", usage: "Maximum page inset for wide, focused content areas" },
];
</script>

<template>
  <TypographyPageTemplate>

    <!-- ── Spacer scale ──────────────────────────────────────────────────── -->
    <section v-if="props.section === 'spacer-scale'" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="typography-page-template__content-block">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Spacer scale</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          The spacer scale is the primitive foundation of the SGDS spacing system. Semantic spacing tokens reference these
          values. Use the numbered spacer tokens only when no semantic token fits the context.
        </p>
      </div>

      <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
        <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
        <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
      </sgds-tab-group>

      <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
        <sgds-table-row>
          <sgds-table-head class="st-token-col">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
          <sgds-table-head class="st-metric-col">rem</sgds-table-head>
          <sgds-table-head class="st-metric-col">px</sgds-table-head>
          <sgds-table-head class="st-swatch-col">Visual</sgds-table-head>
        </sgds-table-row>

        <sgds-table-row
          v-for="row in spacerRows"
          :key="row.index"
          :class="{ 'st-base-row': row.isBase }"
        >
          <sgds-table-cell class="st-token-col">
            <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
              <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(`--sgds-spacer-${row.index}`)" placement="top">
                <CodeToken :label="getTokenValue(`--sgds-spacer-${row.index}`)" />
              </sgds-tooltip>
              <div v-else class="ts-snippet-row">
                <code class="ts-snippet-code"><span>{{ getTokenValue(`--sgds-spacer-${row.index}`) }}</span></code>
                <button
                  :class="['ts-snippet-copy-btn', copiedKey === `spacer-${row.index}` ? 'sgds:text-success-default' : 'sgds:text-default']"
                  @click="copyTokenValue(`spacer-${row.index}`, getTokenValue(`--sgds-spacer-${row.index}`))"
                >
                  <sgds-icon :name="copiedKey === `spacer-${row.index}` ? 'check' : 'copy'" size="sm" />
                </button>
              </div>
              <sgds-badge v-if="row.isBase" variant="primary">Base</sgds-badge>
            </div>
          </sgds-table-cell>
          <sgds-table-cell class="st-metric-col">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.rem }}</span>
          </sgds-table-cell>
          <sgds-table-cell class="st-metric-col">
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.px }}</span>
          </sgds-table-cell>
          <sgds-table-cell class="st-swatch-col" aria-hidden="true">
            <span
              v-if="row.index > 0"
              class="st-spacer-bar"
              :style="{ inlineSize: `var(--sgds-spacer-${row.index})` }"
            ></span>
          </sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    </section>

    <!-- ── Gap tokens ────────────────────────────────────────────────────── -->
    <section
      v-if="props.section === 'text-gap' || props.section === 'layout-gap' || props.section === 'component-gap'"
      class="typography-page-template__section typography-page-template__section--spaced"
    >
      <div class="typography-page-template__content-block">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Gap tokens</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Gap tokens control spacing between flex and grid children. SGDS provides three semantic categories that scale
          responsively across breakpoints: text gap for typography, layout gap for page structure, and component gap
          for spacing inside components.
        </p>
      </div>

      <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">

        <!-- Text gap -->
        <article v-if="props.section === 'text-gap'" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <div class="typography-page-template__content-block">
            <h5 class="sgds-subtitle-md-semibold sgds:m-0">Text gap</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Use for spacing between text elements and inline content. Utility: <CodeToken label="sgds:gap-text-{size}" />.
            </p>
          </div>
          <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
            <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
            <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
          </sgds-tab-group>
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="st-token-col">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
              <sgds-table-head class="st-metric-col">Mobile</sgds-table-head>
              <sgds-table-head class="st-metric-col">≥ 1024px</sgds-table-head>
              <sgds-table-head class="st-metric-col">≥ 1440px</sgds-table-head>
              <sgds-table-head class="st-usage-col">Usage</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row
              v-for="row in textGapRows"
              :key="row.token"
              :class="{ 'st-base-row': row.isBase }"
            >
              <sgds-table-cell class="st-token-col">
                <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                  <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-tooltip>
                  <div v-else class="ts-snippet-row">
                    <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                    <button
                      :class="['ts-snippet-copy-btn', copiedKey === row.token ? 'sgds:text-success-default' : 'sgds:text-default']"
                      @click="copyTokenValue(row.token, getTokenValue(row.token))"
                    >
                      <sgds-icon :name="copiedKey === row.token ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
                  <sgds-badge v-if="row.isBase" variant="primary">Base</sgds-badge>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.mobile }}</span></sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.tablet }}</span></sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.desktop }}</span></sgds-table-cell>
              <sgds-table-cell class="st-usage-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>

        <!-- Layout gap -->
        <article v-if="props.section === 'layout-gap'" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <div class="typography-page-template__content-block">
            <h5 class="sgds-subtitle-md-semibold sgds:m-0">Layout gap</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Use for spacing between page sections and major layout regions. Utility: <CodeToken label="sgds:gap-layout-{size}" />.
            </p>
          </div>
          <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
            <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
            <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
          </sgds-tab-group>
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="st-token-col">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
              <sgds-table-head class="st-metric-col">Mobile</sgds-table-head>
              <sgds-table-head class="st-metric-col">≥ 1024px</sgds-table-head>
              <sgds-table-head class="st-metric-col">≥ 1440px</sgds-table-head>
              <sgds-table-head class="st-usage-col">Usage</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row
              v-for="row in layoutGapRows"
              :key="row.token"
              :class="{ 'st-base-row': row.isBase }"
            >
              <sgds-table-cell class="st-token-col">
                <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                  <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-tooltip>
                  <div v-else class="ts-snippet-row">
                    <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                    <button
                      :class="['ts-snippet-copy-btn', copiedKey === row.token ? 'sgds:text-success-default' : 'sgds:text-default']"
                      @click="copyTokenValue(row.token, getTokenValue(row.token))"
                    >
                      <sgds-icon :name="copiedKey === row.token ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
                  <sgds-badge v-if="row.isBase" variant="primary">Base</sgds-badge>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.mobile }}</span></sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.tablet }}</span></sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.desktop }}</span></sgds-table-cell>
              <sgds-table-cell class="st-usage-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>

        <!-- Component gap -->
        <article v-if="props.section === 'component-gap'" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <div class="typography-page-template__content-block">
            <h5 class="sgds-subtitle-md-semibold sgds:m-0">Component gap</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Use for spacing between elements within a component. Utility: <CodeToken label="sgds:gap-component-{size}" />.
            </p>
          </div>
          <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
            <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
            <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
          </sgds-tab-group>
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="st-token-col">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
              <sgds-table-head class="st-metric-col">Mobile</sgds-table-head>
              <sgds-table-head class="st-metric-col">≥ 1024px</sgds-table-head>
              <sgds-table-head class="st-metric-col">≥ 1440px</sgds-table-head>
              <sgds-table-head class="st-usage-col">Usage</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row
              v-for="row in componentGapRows"
              :key="row.token"
              :class="{ 'st-base-row': row.isBase }"
            >
              <sgds-table-cell class="st-token-col">
                <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                  <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-tooltip>
                  <div v-else class="ts-snippet-row">
                    <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                    <button
                      :class="['ts-snippet-copy-btn', copiedKey === row.token ? 'sgds:text-success-default' : 'sgds:text-default']"
                      @click="copyTokenValue(row.token, getTokenValue(row.token))"
                    >
                      <sgds-icon :name="copiedKey === row.token ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
                  <sgds-badge v-if="row.isBase" variant="primary">Base</sgds-badge>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.mobile }}</span></sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.tablet }}</span></sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.desktop }}</span></sgds-table-cell>
              <sgds-table-cell class="st-usage-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>
      </div>
    </section>

    <!-- ── Padding tokens ─────────────────────────────────────────────────── -->
    <section
      v-if="props.section === 'component-padding' || props.section === 'layout-padding'"
      class="typography-page-template__section typography-page-template__section--spaced"
    >
      <div class="typography-page-template__content-block">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Padding tokens</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Padding tokens define the internal spacing of components and layout regions. Like gap tokens, they scale
          responsively across breakpoints. Apply them with shorthand utilities such as
          <CodeToken label="sgds:p-component-md" />, <CodeToken label="sgds:px-component-sm" />,
          or <CodeToken label="sgds:py-layout-lg" />.
        </p>
      </div>

      <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">

        <!-- Component padding -->
        <article v-if="props.section === 'component-padding'" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <div class="typography-page-template__content-block">
            <h5 class="sgds-subtitle-md-semibold sgds:m-0">Component padding</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Internal padding for UI components. Utility: <CodeToken label="sgds:p-component-{size}" />.
            </p>
          </div>
          <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
            <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
            <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
          </sgds-tab-group>
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="st-token-col">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
              <sgds-table-head class="st-metric-col">Mobile</sgds-table-head>
              <sgds-table-head class="st-metric-col">≥ 1024px</sgds-table-head>
              <sgds-table-head class="st-metric-col">≥ 1440px</sgds-table-head>
              <sgds-table-head class="st-usage-col">Usage</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row
              v-for="row in componentPaddingRows"
              :key="row.token"
              :class="{ 'st-base-row': row.isBase }"
            >
              <sgds-table-cell class="st-token-col">
                <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                  <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-tooltip>
                  <div v-else class="ts-snippet-row">
                    <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                    <button
                      :class="['ts-snippet-copy-btn', copiedKey === row.token ? 'sgds:text-success-default' : 'sgds:text-default']"
                      @click="copyTokenValue(row.token, getTokenValue(row.token))"
                    >
                      <sgds-icon :name="copiedKey === row.token ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
                  <sgds-badge v-if="row.isBase" variant="primary">Base</sgds-badge>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.mobile }}</span></sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.tablet }}</span></sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.desktop }}</span></sgds-table-cell>
              <sgds-table-cell class="st-usage-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>

        <!-- Layout padding -->
        <article v-if="props.section === 'layout-padding'" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <div class="typography-page-template__content-block">
            <h5 class="sgds-subtitle-md-semibold sgds:m-0">Layout padding</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Padding for page-level containers and layout regions. Utility: <CodeToken label="sgds:p-layout-{size}" />.
            </p>
          </div>
          <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
            <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
            <sgds-tab-panel v-for="option in tokenViewOptions" :key="`panel-${option.id}`" :name="option.id"></sgds-tab-panel>
          </sgds-tab-group>
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="st-token-col">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
              <sgds-table-head class="st-metric-col">Mobile</sgds-table-head>
              <sgds-table-head class="st-metric-col">≥ 1024px</sgds-table-head>
              <sgds-table-head class="st-metric-col">≥ 1440px</sgds-table-head>
              <sgds-table-head class="st-usage-col">Usage</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row
              v-for="row in layoutPaddingRows"
              :key="row.token"
              :class="{ 'st-base-row': row.isBase }"
            >
              <sgds-table-cell class="st-token-col">
                <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                  <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-tooltip>
                  <div v-else class="ts-snippet-row">
                    <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                    <button
                      :class="['ts-snippet-copy-btn', copiedKey === row.token ? 'sgds:text-success-default' : 'sgds:text-default']"
                      @click="copyTokenValue(row.token, getTokenValue(row.token))"
                    >
                      <sgds-icon :name="copiedKey === row.token ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
                  <sgds-badge v-if="row.isBase" variant="primary">Base</sgds-badge>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.mobile }}</span></sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.tablet }}</span></sgds-table-cell>
              <sgds-table-cell class="st-metric-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.desktop }}</span></sgds-table-cell>
              <sgds-table-cell class="st-usage-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>
      </div>
    </section>

  </TypographyPageTemplate>
</template>

<style>
/* Column widths — clamp() cannot be expressed as SGDS utilities */
.st-token-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: clamp(14rem, 24vw, 18rem);
  min-inline-size: 13rem;
}

.st-metric-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 7.5rem;
  min-inline-size: 5.5rem;
}

.st-swatch-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 9rem;
  min-inline-size: 6rem;
}

.st-usage-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: clamp(18rem, 30vw, 24rem);
  min-inline-size: 16rem;
}

/* Spacer visual bar — width set dynamically via :style binding (CSS var per row) */
.st-spacer-bar {
  background: var(--sgds-danger-surface-muted);
  block-size: 1rem;
  border-radius: var(--sgds-border-radius-xs);
  display: block;
  max-inline-size: 8rem;
  opacity: 0.65;
}

/* Base row highlight — applied to sgds-table-row host element */
.st-base-row {
  background: var(--sgds-primary-surface-muted);
}

/* ─── Token snippet row (copy-to-clipboard) ──────────────────────────────── */
.ts-snippet-row {
  align-items: center;
  background: var(--sgds-bg-muted);
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-md);
  display: inline-flex;
  gap: var(--sgds-gap-xs);
  max-inline-size: 100%;
  padding: var(--sgds-spacer-1) var(--sgds-spacer-3);
}

.ts-snippet-code {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-mono);
  font-size: var(--sgds-font-size-13);
  font-weight: var(--sgds-font-weight-regular);
  line-height: var(--sgds-line-height-20);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ts-snippet-code span {
  white-space: nowrap;
}

.ts-snippet-copy-btn {
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  flex: none;
  padding: 0;
}

.ts-snippet-copy-btn:hover {
  opacity: 0.7;
}

@media (max-width: 1023px) {
  .st-token-col,
  .st-metric-col,
  .st-swatch-col,
  .st-usage-col {
    inline-size: auto;
    max-inline-size: none;
    min-inline-size: 0;
  }
}
</style>
