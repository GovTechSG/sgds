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

const getTokenValue = (token: string) => {
  if (activeTokenViewId.value === "css-variable") return `--${token}`;
  return token;
};

const copyTokenValue = async (key: string, text: string) => {
  await navigator.clipboard.writeText(text);
  copiedKey.value = key;
  setTimeout(() => { if (copiedKey.value === key) copiedKey.value = null; }, 2000);
};

const iconSizeTokens = [
  { token: "sgds-icon-size-xs", value: "12/0.75", size: "12px" },
  { token: "sgds-icon-size-sm", value: "16/1", size: "16px" },
  { token: "sgds-icon-size-md", value: "20/1.25", size: "20px" },
  { token: "sgds-icon-size-lg", value: "24/1.5", size: "24px", note: "Base" },
  { token: "sgds-icon-size-xl", value: "32/2", size: "32px" },
  { token: "sgds-icon-size-2-xl", value: "48/3", size: "48px" },
  { token: "sgds-icon-size-3-xl", value: "64/4", size: "64px" },
] as const;
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Design token</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <article class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Icon size tokens</h4>
          </div>

          <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
            <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
            <sgds-tab-panel v-for="option in tokenViewOptions" :key="`tokens-${option.id}`" :name="option.id"></sgds-tab-panel>
          </sgds-tab-group>

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="icon-token-table-col">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
              <sgds-table-head class="icon-token-table-col">Value (px/rem)</sgds-table-head>
              <sgds-table-head class="icon-token-table-col">Example</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row
              v-for="row in iconSizeTokens"
              :key="row.token"
              :class="row.note ? 'icon-token-default-row' : undefined"
            >
              <sgds-table-cell class="icon-token-table-col">
                <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
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
              <sgds-table-cell class="icon-token-table-col">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="icon-token-table-col">
                <div class="sgds:flex sgds:items-center icon-token-preview-cell">
                  <span
                    class="icon-token-icon-preview"
                    :style="{ inlineSize: row.size, blockSize: row.size }"
                    aria-hidden="true"
                  />
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
.icon-token-table-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 16rem;
  min-inline-size: 7rem;
}

.icon-token-preview-cell {
  min-block-size: var(--sgds-dimension-64);
}

.icon-token-icon-preview {
  border: var(--sgds-border-width-1) dashed var(--sgds-border-color-emphasis);
  border-radius: var(--sgds-border-radius-circle);
  box-sizing: border-box;
  display: inline-block;
  flex: none;
}

.icon-token-default-row {
  background: var(--sgds-primary-surface-muted);
}
</style>
