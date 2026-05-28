<script setup lang="ts">
import { computed } from "vue";
import { typographyTokenDocs } from "../data/typography-token-docs";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
import SectionHeader from "./foundations/SectionHeader.vue";

const props = defineProps<{
  tokenKey: string;
}>();

const doc = computed(() => typographyTokenDocs[props.tokenKey]);
const isResponsive = computed(() => doc.value?.rows?.some((r) => r.mobile !== undefined) ?? false);
const hasWipBadge = computed(() => ["text-decoration", "text-transform"].includes(props.tokenKey));

const getResponsiveTokenValue = (token: string): string => {
  const value = token.match(/^--sgds-(?:font-size|line-height)-(.+)$/)?.[1];
  return value && /^\d+$/.test(value) ? `${value}px` : token;
};
</script>

<template>
  <TypographyPageTemplate>
    <section v-if="doc" class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-text-xs">
          <SectionHeader :title="doc.title" />
          <sgds-badge v-if="hasWipBadge" variant="accent" outlined>WIP</sgds-badge>
        </div>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">{{ doc.description }}</p>
      </div>
      <div class="typography-page-template__body typography-page-template__body--prose">
          <!-- Responsive font-size subgroups (e.g. Display / Heading / Body …). Renders one h5 + table per subgroup. -->
          <div
            v-for="subgroup in doc.responsiveFontSizeSubgroups"
            :key="`rfs-${subgroup.label}`"
            class="sgds:flex sgds:flex-col sgds:gap-layout-xs"
          >
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">{{ subgroup.label }}</h4>
            <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table typography-token-table">
              <sgds-table-row>
                <sgds-table-head class="typography-token-table__token-column">Token name</sgds-table-head>
                <sgds-table-head class="typography-token-table__breakpoint-column">Mobile</sgds-table-head>
                <sgds-table-head class="typography-token-table__breakpoint-column">Tablet</sgds-table-head>
                <sgds-table-head class="typography-token-table__breakpoint-column">Desktop</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row
                v-for="row in subgroup.rows"
                :key="`${subgroup.label}-${row.token}`"
                :class="row.isDefault ? 'typography-token-default-row' : undefined"
              >
                <sgds-table-cell class="typography-token-table__token-column">
                  <div class="typography-token-table__token-cell sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                    <CodeToken :label="row.token" />
                    <sgds-badge v-if="row.isDefault" variant="primary">Default</sgds-badge>
                  </div>
                </sgds-table-cell>
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <sgds-tooltip :content="row.mobile" placement="top">
                    <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ getResponsiveTokenValue(row.mobile) }}</span>
                  </sgds-tooltip>
                </sgds-table-cell>
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <sgds-tooltip :content="row.tablet" placement="top">
                    <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ getResponsiveTokenValue(row.tablet) }}</span>
                  </sgds-tooltip>
                </sgds-table-cell>
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <sgds-tooltip :content="row.desktop" placement="top">
                    <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ getResponsiveTokenValue(row.desktop) }}</span>
                  </sgds-tooltip>
                </sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </div>

          <div
            v-if="doc.rows && doc.rows.length"
            :class="doc.subgroupLabel ? 'sgds:flex sgds:flex-col sgds:gap-layout-xs' : null"
          >
          <h4
            v-if="doc.subgroupLabel"
            class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0"
          >{{ doc.subgroupLabel }}</h4>
          <sgds-table
            tableBorder
            headerBackground
            responsive="always"
            :class="[
              'typography-page-template__utility-table typography-token-table',
              doc.key === 'paragraph-spacing' ? 'typography-token-table--paragraph-spacing' : null,
              doc.key === 'letter-spacing' ? 'typography-token-table--letter-spacing' : null
            ]"
          >
            <sgds-table-row>
              <sgds-table-head class="typography-token-table__token-column">Token</sgds-table-head>
              <template v-if="isResponsive">
                <sgds-table-head class="typography-token-table__breakpoint-column">Mobile</sgds-table-head>
                <sgds-table-head class="typography-token-table__breakpoint-column">Tablet</sgds-table-head>
                <sgds-table-head class="typography-token-table__breakpoint-column">Desktop</sgds-table-head>
              </template>
              <sgds-table-head v-else class="typography-token-table__value-column">Value</sgds-table-head>
              <sgds-table-head class="typography-token-table__example-column">
                {{ doc.key === 'letter-spacing' || doc.key === 'paragraph-spacing' ? 'Usage' : 'Preview' }}
              </sgds-table-head>
            </sgds-table-row>

            <sgds-table-row
              v-for="row in doc.rows"
              :key="`${doc.key}-${row.token}-${row.value}-${row.exampleClass ?? ''}`"
              :class="row.note ? 'typography-token-default-row' : undefined"
            >
              <sgds-table-cell class="typography-token-table__token-column">
                <div class="typography-token-table__token-cell sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                  <CodeToken :label="row.token" />
                  <sgds-badge v-if="row.note" variant="primary">{{ row.note }}</sgds-badge>
                </div>
              </sgds-table-cell>
              <template v-if="isResponsive">
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <sgds-tooltip :content="row.mobile" placement="top">
                    <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ getResponsiveTokenValue(row.mobile) }}</span>
                  </sgds-tooltip>
                </sgds-table-cell>
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <sgds-tooltip :content="row.tablet" placement="top">
                    <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ getResponsiveTokenValue(row.tablet) }}</span>
                  </sgds-tooltip>
                </sgds-table-cell>
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <sgds-tooltip :content="row.desktop" placement="top">
                    <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ getResponsiveTokenValue(row.desktop) }}</span>
                  </sgds-tooltip>
                </sgds-table-cell>
              </template>
              <sgds-table-cell v-else class="typography-token-table__value-column">
                <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-token-table__example-column">
                <div v-if="doc.key === 'paragraph-spacing'" class="sgds:flex sgds:flex-col sgds:gap-text-xs">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.usage }}</span>
                  <div v-if="row.usageExampleItems?.length" class="typography-token-example-stack">
                    <p
                      v-for="item in row.usageExampleItems"
                      :key="`${row.token}-${item.text}`"
                      :class="['typography-token-example-text', 'sgds:mt-0', item.className, row.exampleClass]"
                    >
                      {{ item.text }}
                    </p>
                  </div>
                </div>
                <div
                  v-else-if="doc.key === 'letter-spacing' && row.usageExampleItems?.length"
                  class="sgds:flex sgds:flex-col sgds:gap-text-xs"
                >
                  <component
                    :is="item.href ? 'a' : 'p'"
                    v-for="item in row.usageExampleItems"
                    :key="`${row.token}-${item.text}`"
                    :href="item.href"
                    :class="['typography-token-example-text', 'sgds:m-0', item.className]"
                  >
                    {{ item.text }}
                  </component>
                </div>
                <p
                  v-else-if="doc.key === 'letter-spacing'"
                  :class="['typography-token-example-text', 'sgds:m-0', row.usageExampleClass ?? row.exampleClass]"
                >
                  {{ row.usage }}
                </p>
                <p
                  v-else
                  :class="['typography-token-example-text', 'sgds:m-0', row.exampleClass]"
                >
                  {{ row.exampleText ?? 'Typography example' }}
                </p>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
          </div>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
.typography-token-default-row {
  background: var(--sgds-bg-translucent-subtle);
}

.typography-token-table__token-column,
.typography-token-table__value-column,
.typography-token-table__example-column {
  box-sizing: border-box;
  inline-size: max-content;
}

.typography-token-table__token-column {
  max-inline-size: 18rem;
  min-inline-size: 14rem;
}

.typography-token-table--paragraph-spacing .typography-token-table__token-column {
  max-inline-size: 21rem;
  min-inline-size: 18rem;
}

.typography-token-table--paragraph-spacing .typography-token-table__value-column {
  max-inline-size: 8rem;
}

.typography-token-table--paragraph-spacing .typography-token-table__example-column {
  max-inline-size: 24rem;
}

.typography-token-table--letter-spacing .typography-token-table__value-column {
  max-inline-size: 12rem;
  min-inline-size: 10rem;
}

.typography-token-table--letter-spacing .typography-token-table__example-column {
  max-inline-size: 24rem;
  min-inline-size: 18rem;
}

.typography-token-table__value-column {
  max-inline-size: 18rem;
  min-inline-size: 12rem;
}

.typography-token-table__breakpoint-column {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 8rem;
  min-inline-size: 6rem;
}

.typography-token-table__example-column {
  max-inline-size: 24rem;
  min-inline-size: 14rem;
}

.typography-token-table__token-cell {
  white-space: normal;
}

.typography-token-example-stack,
.typography-token-example-text {
  color: var(--sgds-body-color-default);
  white-space: pre-line;
}

.typography-token-example-stack .typography-token-example-text:first-child {
  margin-top: 0;
}

.typography-token-example-stack .typography-token-example-text:last-child {
  margin-bottom: 0;
}

/* Snippet row for copy-able token values */
.ts-snippet-row {
  align-items: flex-start;
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  display: flex;
  gap: var(--sgds-gap-2-xs);
  justify-content: space-between;
  padding: 0.375rem var(--sgds-padding-sm);
}

.ts-snippet-code {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: var(--sgds-font-family-mono, monospace);
  font-size: var(--sgds-font-size-body-sm);
  gap: var(--sgds-gap-2-xs);
  line-height: var(--sgds-line-height-xs);
  min-width: 0;
  overflow: visible;
  white-space: normal;
}

.ts-snippet-copy-btn {
  background: transparent;
  border: 0;
  border-radius: var(--sgds-border-radius-sm);
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  padding: var(--sgds-spacer-1);
}

.ts-snippet-copy-btn:hover {
  background: var(--sgds-bg-translucent-subtle);
}
</style>
