<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
import SectionHeader from "./foundations/SectionHeader.vue";


// ─── Primitive resolution map (mobile / tablet ≥1024px / desktop ≥1440px) ───
// Sourced from @govtechsg/sgds-web-component/themes/responsive.css.
type PrimitiveResolution = { mobile: number; tablet: number; desktop: number };

const tokenToPrimitive: Record<string, PrimitiveResolution> = {
  "--sgds-text-gap-2-xs": { mobile: 2, tablet: 2, desktop: 2 },
  "--sgds-text-gap-xs":   { mobile: 3, tablet: 3, desktop: 3 },
  "--sgds-text-gap-sm":   { mobile: 3, tablet: 4, desktop: 4 },
  "--sgds-text-gap-md":   { mobile: 4, tablet: 5, desktop: 5 },
  "--sgds-text-gap-lg":   { mobile: 5, tablet: 6, desktop: 6 },
  "--sgds-text-gap-xl":   { mobile: 6, tablet: 7, desktop: 7 },
  "--sgds-text-gap-2-xl": { mobile: 7, tablet: 8, desktop: 8 },

  "--sgds-layout-gap-2-xs": { mobile: 2, tablet: 4, desktop: 5 },
  "--sgds-layout-gap-xs":   { mobile: 3, tablet: 5, desktop: 6 },
  "--sgds-layout-gap-sm":   { mobile: 4, tablet: 6, desktop: 7 },
  "--sgds-layout-gap-md":   { mobile: 5, tablet: 7, desktop: 8 },
  "--sgds-layout-gap-lg":   { mobile: 6, tablet: 8, desktop: 9 },
  "--sgds-layout-gap-xl":   { mobile: 7, tablet: 9, desktop: 10 },

  "--sgds-component-gap-xs": { mobile: 3, tablet: 5, desktop: 6 },
  "--sgds-component-gap-sm": { mobile: 4, tablet: 6, desktop: 7 },
  "--sgds-component-gap-md": { mobile: 5, tablet: 7, desktop: 8 },
  "--sgds-component-gap-lg": { mobile: 6, tablet: 8, desktop: 9 },
  "--sgds-component-gap-xl": { mobile: 7, tablet: 9, desktop: 10 },

  "--sgds-component-padding-xs": { mobile: 5, tablet: 6, desktop: 7 },
  "--sgds-component-padding-sm": { mobile: 6, tablet: 7, desktop: 8 },
  "--sgds-component-padding-md": { mobile: 7, tablet: 8, desktop: 9 },
  "--sgds-component-padding-lg": { mobile: 8, tablet: 9, desktop: 10 },
  "--sgds-component-padding-xl": { mobile: 9, tablet: 10, desktop: 11 },

  "--sgds-layout-padding-xs": { mobile: 5, tablet: 6, desktop: 7 },
  "--sgds-layout-padding-sm": { mobile: 6, tablet: 7, desktop: 8 },
  "--sgds-layout-padding-md": { mobile: 7, tablet: 8, desktop: 9 },
  "--sgds-layout-padding-lg": { mobile: 8, tablet: 9, desktop: 10 },
  "--sgds-layout-padding-xl": { mobile: 9, tablet: 10, desktop: 11 },
};

const breakpointPrimitive = (token: string, breakpoint: "mobile" | "tablet" | "desktop"): string => {
  const r = tokenToPrimitive[token];
  if (!r) return "";
  return `sgds-spacer-${r[breakpoint]}`;
};

type SpacingTokenSection =
  | "spacer-scale"
  | "gap"
  | "text-gap"
  | "layout-gap"
  | "component-gap"
  | "padding"
  | "component-padding"
  | "layout-padding"
  | "margin";

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
type TokenAliasRow = { token: string; value: string; aliasToken: string };

const gapAliasRows: TokenAliasRow[] = [
  { token: "--sgds-gap-none", value: "0px", aliasToken: "--sgds-spacer-0" },
  { token: "--sgds-gap-2-xs", value: "4px", aliasToken: "--sgds-spacer-2" },
  { token: "--sgds-gap-xs", value: "8px", aliasToken: "--sgds-spacer-3" },
  { token: "--sgds-gap-sm", value: "12px", aliasToken: "--sgds-spacer-4" },
  { token: "--sgds-gap-md", value: "16px", aliasToken: "--sgds-spacer-5" },
  { token: "--sgds-gap-lg", value: "20px", aliasToken: "--sgds-spacer-6" },
  { token: "--sgds-gap-xl", value: "24px", aliasToken: "--sgds-spacer-7" },
  { token: "--sgds-gap-2-xl", value: "32px", aliasToken: "--sgds-spacer-8" },
  { token: "--sgds-gap-3-xl", value: "48px", aliasToken: "--sgds-spacer-9" },
  { token: "--sgds-gap-4-xl", value: "64px", aliasToken: "--sgds-spacer-10" },
];

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

const paddingAliasRows: TokenAliasRow[] = [
  { token: "--sgds-padding-none", value: "0px", aliasToken: "--sgds-spacer-0" },
  { token: "--sgds-padding-3-xs", value: "2px", aliasToken: "--sgds-spacer-1" },
  { token: "--sgds-padding-2-xs", value: "4px", aliasToken: "--sgds-spacer-2" },
  { token: "--sgds-padding-xs", value: "8px", aliasToken: "--sgds-spacer-3" },
  { token: "--sgds-padding-sm", value: "12px", aliasToken: "--sgds-spacer-4" },
  { token: "--sgds-padding-md", value: "16px", aliasToken: "--sgds-spacer-5" },
  { token: "--sgds-padding-lg", value: "20px", aliasToken: "--sgds-spacer-6" },
  { token: "--sgds-padding-xl", value: "24px", aliasToken: "--sgds-spacer-7" },
  { token: "--sgds-padding-2-xl", value: "32px", aliasToken: "--sgds-spacer-8" },
  { token: "--sgds-padding-3-xl", value: "48px", aliasToken: "--sgds-spacer-9" },
  { token: "--sgds-padding-4-xl", value: "64px", aliasToken: "--sgds-spacer-10" },
  { token: "--sgds-padding-5-xl", value: "96px", aliasToken: "--sgds-spacer-11" },
];

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

// ─── Margin tokens ────────────────────────────────────────────────────────────

type MarginRow = { token: string; primitive: string; px: string; isBase?: boolean };

const marginRows: MarginRow[] = [
  { token: "--sgds-margin-none",  primitive: "--sgds-spacer-0",  px: "0px" },
  { token: "--sgds-margin-3-xs",  primitive: "--sgds-spacer-1",  px: "2px" },
  { token: "--sgds-margin-2-xs",  primitive: "--sgds-spacer-2",  px: "4px" },
  { token: "--sgds-margin-xs",    primitive: "--sgds-spacer-3",  px: "8px" },
  { token: "--sgds-margin-sm",    primitive: "--sgds-spacer-4",  px: "12px" },
  { token: "--sgds-margin-md",    primitive: "--sgds-spacer-5",  px: "16px", isBase: true },
  { token: "--sgds-margin-lg",    primitive: "--sgds-spacer-6",  px: "20px" },
  { token: "--sgds-margin-xl",    primitive: "--sgds-spacer-7",  px: "24px" },
  { token: "--sgds-margin-2-xl",  primitive: "--sgds-spacer-8",  px: "32px" },
  { token: "--sgds-margin-3-xl",  primitive: "--sgds-spacer-9",  px: "48px" },
  { token: "--sgds-margin-4-xl",  primitive: "--sgds-spacer-10", px: "64px" },
  { token: "--sgds-margin-5-xl",  primitive: "--sgds-spacer-11", px: "96px" },
];
</script>

<template>
  <TypographyPageTemplate>

    <!-- ── Spacer scale ──────────────────────────────────────────────────── -->
    <section v-if="props.section === 'spacer-scale'" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <SectionHeader title="Spacer scale tokens" />
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          The spacer scale is the primitive foundation of the SGDS spacing system. Semantic spacing tokens reference these
          values. Use the numbered spacer tokens only when no semantic token fits the context.
        </p>
      </div>

      <div class="typography-page-template__body typography-page-template__body--prose">
        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head class="st-token-col">Token</sgds-table-head>
            <sgds-table-head class="st-metric-col">rem</sgds-table-head>
            <sgds-table-head class="st-metric-col">px</sgds-table-head>
            <sgds-table-head class="st-swatch-col">Visual</sgds-table-head>
          </sgds-table-row>

        <sgds-table-row
          v-for="row in spacerRows"
          :key="row.index"
          :class="row.isBase ? 'st-base-row' : undefined"
        >
          <sgds-table-cell class="st-token-col">
            <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
              <CodeToken :label="`--sgds-spacer-${row.index}`" />
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
      </div>
    </section>

    <!-- ── Gap tokens ────────────────────────────────────────────────────── -->
    <section
      v-if="props.section === 'gap' || props.section === 'text-gap' || props.section === 'layout-gap' || props.section === 'component-gap'"
      class="typography-page-template__section typography-page-template__section--spaced"
    >
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

        <!-- Primitive gap -->
        <article v-if="props.section === 'gap'" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <SectionHeader title="Gap tokens" />
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              Gap tokens define the space between layout regions, component elements, and text content.
            </p>
          </div>
          <div class="typography-page-template__body typography-page-template__body--prose">
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="st-token-col">Token name</sgds-table-head>
              <sgds-table-head class="st-metric-col">Value</sgds-table-head>
              <sgds-table-head class="st-token-col">Alias token</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row
              v-for="row in gapAliasRows"
              :key="row.token"
            >
              <sgds-table-cell class="st-token-col">
                <CodeToken :label="row.token" />
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="st-token-col">
                <CodeToken :label="row.aliasToken" />
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
          </div>
        </article>

        <!-- Layout gap -->
        <article v-if="props.section === 'gap' || props.section === 'layout-gap'" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <SectionHeader title="Responsive layout gap tokens" />
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              Use for spacing between page sections and major layout regions. Utility: <CodeToken label="sgds:gap-layout-{size}" />.
            </p>
          </div>
          <div class="typography-page-template__body typography-page-template__body--prose">
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="st-token-col">Token</sgds-table-head>
              <sgds-table-head class="st-metric-col">Mobile</sgds-table-head>
              <sgds-table-head class="st-metric-col">Tablet</sgds-table-head>
              <sgds-table-head class="st-metric-col">Desktop</sgds-table-head>
              <sgds-table-head class="st-usage-col">Usage</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row
              v-for="row in layoutGapRows"
              :key="row.token"
              :class="row.isBase ? 'st-base-row' : undefined"
            >
              <sgds-table-cell class="st-token-col">
                <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                  <CodeToken :label="row.token" />
                  <sgds-badge v-if="row.isBase" variant="primary">Base</sgds-badge>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'mobile')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.mobile }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'tablet')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.tablet }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'desktop')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.desktop }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-usage-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
          </div>
        </article>

        <!-- Component gap -->
        <article v-if="props.section === 'gap' || props.section === 'component-gap'" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <SectionHeader title="Responsive component gap tokens" />
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              Use for spacing between elements within a component. Utility: <CodeToken label="sgds:gap-component-{size}" />.
            </p>
          </div>
          <div class="typography-page-template__body typography-page-template__body--prose">
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="st-token-col">Token</sgds-table-head>
              <sgds-table-head class="st-metric-col">Mobile</sgds-table-head>
              <sgds-table-head class="st-metric-col">Tablet</sgds-table-head>
              <sgds-table-head class="st-metric-col">Desktop</sgds-table-head>
              <sgds-table-head class="st-usage-col">Usage</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row
              v-for="row in componentGapRows"
              :key="row.token"
              :class="row.isBase ? 'st-base-row' : undefined"
            >
              <sgds-table-cell class="st-token-col">
                <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                  <CodeToken :label="row.token" />
                  <sgds-badge v-if="row.isBase" variant="primary">Base</sgds-badge>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'mobile')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.mobile }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'tablet')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.tablet }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'desktop')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.desktop }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-usage-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
          </div>
        </article>

        <!-- Text gap -->
        <article v-if="props.section === 'gap' || props.section === 'text-gap'" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <SectionHeader title="Responsive text gap tokens" />
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              Use for spacing between text elements and inline content. Utility: <CodeToken label="sgds:gap-text-{size}" />.
            </p>
          </div>
          <div class="typography-page-template__body typography-page-template__body--prose">
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="st-token-col">Token</sgds-table-head>
              <sgds-table-head class="st-metric-col">Mobile</sgds-table-head>
              <sgds-table-head class="st-metric-col">Tablet</sgds-table-head>
              <sgds-table-head class="st-metric-col">Desktop</sgds-table-head>
              <sgds-table-head class="st-usage-col">Usage</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row
              v-for="row in textGapRows"
              :key="row.token"
              :class="row.isBase ? 'st-base-row' : undefined"
            >
              <sgds-table-cell class="st-token-col">
                <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                  <CodeToken :label="row.token" />
                  <sgds-badge v-if="row.isBase" variant="primary">Base</sgds-badge>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'mobile')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.mobile }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'tablet')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.tablet }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'desktop')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.desktop }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-usage-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
          </div>
        </article>
      </div>
    </section>

    <!-- ── Padding tokens ─────────────────────────────────────────────────── -->
    <section
      v-if="props.section === 'padding' || props.section === 'component-padding' || props.section === 'layout-padding'"
      class="typography-page-template__section typography-page-template__section--spaced"
    >
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

        <!-- Primitive padding -->
        <article v-if="props.section === 'padding'" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <SectionHeader title="Padding tokens" />
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              Padding tokens map semantic padding sizes to the SGDS spacer scale.
            </p>
          </div>
          <div class="typography-page-template__body typography-page-template__body--prose">
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="st-token-col">Token name</sgds-table-head>
              <sgds-table-head class="st-metric-col">Value</sgds-table-head>
              <sgds-table-head class="st-token-col">Alias token</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row
              v-for="row in paddingAliasRows"
              :key="row.token"
            >
              <sgds-table-cell class="st-token-col">
                <CodeToken :label="row.token" />
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="st-token-col">
                <CodeToken :label="row.aliasToken" />
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
          </div>
        </article>

        <!-- Layout padding -->
        <article v-if="props.section === 'padding' || props.section === 'layout-padding'" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <SectionHeader title="Responsive layout padding tokens" />
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              Padding for page-level containers and layout regions. Utility: <CodeToken label="sgds:p-layout-{size}" />.
            </p>
          </div>
          <div class="typography-page-template__body typography-page-template__body--prose">
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="st-token-col">Token</sgds-table-head>
              <sgds-table-head class="st-metric-col">Mobile</sgds-table-head>
              <sgds-table-head class="st-metric-col">Tablet</sgds-table-head>
              <sgds-table-head class="st-metric-col">Desktop</sgds-table-head>
              <sgds-table-head class="st-usage-col">Usage</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row
              v-for="row in layoutPaddingRows"
              :key="row.token"
              :class="row.isBase ? 'st-base-row' : undefined"
            >
              <sgds-table-cell class="st-token-col">
                <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                  <CodeToken :label="row.token" />
                  <sgds-badge v-if="row.isBase" variant="primary">Base</sgds-badge>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'mobile')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.mobile }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'tablet')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.tablet }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'desktop')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.desktop }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-usage-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
          </div>
        </article>

        <!-- Component padding -->
        <article v-if="props.section === 'padding' || props.section === 'component-padding'" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <SectionHeader title="Responsive component padding tokens" />
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              Internal padding for UI components. Utility: <CodeToken label="sgds:p-component-{size}" />.
            </p>
          </div>
          <div class="typography-page-template__body typography-page-template__body--prose">
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="st-token-col">Token</sgds-table-head>
              <sgds-table-head class="st-metric-col">Mobile</sgds-table-head>
              <sgds-table-head class="st-metric-col">Tablet</sgds-table-head>
              <sgds-table-head class="st-metric-col">Desktop</sgds-table-head>
              <sgds-table-head class="st-usage-col">Usage</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row
              v-for="row in componentPaddingRows"
              :key="row.token"
              :class="row.isBase ? 'st-base-row' : undefined"
            >
              <sgds-table-cell class="st-token-col">
                <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                  <CodeToken :label="row.token" />
                  <sgds-badge v-if="row.isBase" variant="primary">Base</sgds-badge>
                </div>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'mobile')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.mobile }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'tablet')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.tablet }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-metric-col">
                <sgds-tooltip :content="breakpointPrimitive(row.token, 'desktop')" placement="top" trigger="hover focus">
                  <span tabindex="0" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.desktop }}</span>
                </sgds-tooltip>
              </sgds-table-cell>
              <sgds-table-cell class="st-usage-col"><span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span></sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
          </div>
        </article>
      </div>
    </section>

    <!-- ── Margin tokens ─────────────────────────────────────────────────── -->
    <section v-if="props.section === 'margin'" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <SectionHeader title="Margin tokens" />
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Margin tokens map directly to fixed spacer primitives. Unlike gap and padding tokens, margin values do not
          change across breakpoints.
        </p>
      </div>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head class="st-token-col">Token name</sgds-table-head>
            <sgds-table-head class="st-metric-col">Value</sgds-table-head>
            <sgds-table-head class="st-token-col">Alias token</sgds-table-head>
          </sgds-table-row>
          <sgds-table-row
            v-for="row in marginRows"
            :key="row.token"
            :class="row.isBase ? 'st-base-row' : undefined"
          >
            <sgds-table-cell class="st-token-col">
              <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                <CodeToken :label="row.token" />
                <sgds-badge v-if="row.isBase" variant="primary">Base</sgds-badge>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="st-metric-col">
              <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.px }}</span>
            </sgds-table-cell>
            <sgds-table-cell class="st-token-col">
              <CodeToken :label="row.primitive" />
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
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
  background: var(--sgds-neutral-surface-default);
  block-size: 1rem;
  border-radius: var(--sgds-border-radius-xs);
  display: block;
  max-inline-size: 8rem;
}

/* Base row highlight — applied to sgds-table-row host element */
.st-base-row {
  background: var(--sgds-primary-bg-translucent);
}



</style>
