<script setup lang="ts">
import { computed } from "vue";
import { typographyTokenDocs } from "../data/typography-token-docs";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

const props = defineProps<{
  tokenKey: string;
}>();

const doc = computed(() => typographyTokenDocs[props.tokenKey]);
const isResponsive = computed(() => doc.value?.rows.some((r) => r.mobile !== undefined) ?? false);
</script>

<template>
  <TypographyPageTemplate>
    <section v-if="doc" class="typography-page-template__section">
      <div class="typography-page-template__body typography-page-template__body--prose">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ doc.title }}</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ doc.description }}</p>
          </div>

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
                {{ doc.key === 'letter-spacing' || doc.key === 'paragraph-spacing' ? 'Usage' : 'Example' }}
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
                  <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.mobile }}</span>
                </sgds-table-cell>
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.tablet }}</span>
                </sgds-table-cell>
                <sgds-table-cell class="typography-token-table__breakpoint-column">
                  <span class="typography-token-table__value-text sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.desktop }}</span>
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
        </article>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
.typography-token-default-row {
  background: var(--sgds-primary-surface-muted);
}

.typography-token-table__token-column,
.typography-token-table__value-column,
.typography-token-table__example-column {
  box-sizing: border-box;
  inline-size: 33.333%;
}

.typography-token-table__token-column {
  min-inline-size: 16rem;
}

.typography-token-table--paragraph-spacing .typography-token-table__token-column {
  inline-size: 45%;
  min-inline-size: 21rem;
}

.typography-token-table--paragraph-spacing .typography-token-table__value-column {
  inline-size: 20%;
}

.typography-token-table--paragraph-spacing .typography-token-table__example-column {
  inline-size: 35%;
}

.typography-token-table--letter-spacing .typography-token-table__value-column {
  inline-size: 12rem;
  min-inline-size: 12rem;
}

.typography-token-table--letter-spacing .typography-token-table__example-column {
  inline-size: 45%;
  min-inline-size: 18rem;
}

.typography-token-table__value-column {
  min-inline-size: 17rem;
}

.typography-token-table__breakpoint-column {
  box-sizing: border-box;
  inline-size: 10%;
  min-inline-size: 7rem;
}

.typography-token-table__example-column {
  min-inline-size: 14rem;
}

.typography-token-table__token-cell,
.typography-token-table__value-text {
  white-space: nowrap;
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
</style>
