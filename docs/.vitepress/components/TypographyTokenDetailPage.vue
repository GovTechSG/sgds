<script setup lang="ts">
import { computed, ref } from "vue";
import { typographyTokenDocs } from "../data/typography-token-docs";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

const props = defineProps<{
  tokenKey: string;
}>();

const doc = computed(() => typographyTokenDocs[props.tokenKey]);
const isResponsive = computed(() => doc.value?.rows.some((r) => r.mobile !== undefined) ?? false);

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

const getTokenValue = (token: string) => {
  if (activeTokenViewId.value === "css-variable") return token;
  return token.replace(/^--/, "");
};

const copyTokenValue = async (key: string, text: string) => {
  await navigator.clipboard.writeText(text);
  copiedKey.value = key;
  setTimeout(() => { if (copiedKey.value === key) copiedKey.value = null; }, 2000);
};
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

          <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
            <sgds-tab v-for="opt in tokenViewOptions" :key="opt.id" :name="opt.id" :label="opt.label" :active="opt.id === 'css-variable' ? true : undefined" />
          </sgds-tab-group>
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
              <sgds-table-head class="typography-token-table__token-column">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
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
                  <sgds-tooltip v-if="activeTokenViewId === 'figma'" :content="getTokenValue(row.token)" placement="top">
                    <CodeToken :label="getTokenValue(row.token)" />
                  </sgds-tooltip>
                  <div v-else class="ts-snippet-row">
                    <code class="ts-snippet-code"><span>{{ getTokenValue(row.token) }}</span></code>
                    <button
                      :class="['ts-snippet-copy-btn', copiedKey === `${row.token}-${activeTokenViewId}` ? 'sgds:text-success-default' : 'sgds:text-default']"
                      :aria-label="copiedKey === `${row.token}-${activeTokenViewId}` ? 'Copied!' : 'Copy token'"
                      @click="copyTokenValue(`${row.token}-${activeTokenViewId}`, getTokenValue(row.token))"
                    >
                      <sgds-icon :name="copiedKey === `${row.token}-${activeTokenViewId}` ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
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

.ts-snippet-code span {
  align-self: flex-start;
  color: var(--sgds-body-color-default);
  white-space: nowrap;
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
