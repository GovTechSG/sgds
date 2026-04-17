<script setup lang="ts">
import { computed, ref } from "vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

const props = defineProps<{
  section: "width" | "radius";
}>();

const isWidthPage = computed(() => props.section === "width");
const isRadiusPage = computed(() => props.section === "radius");

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

type BorderToken = {
  token: string;
  value: string;
  note?: string;
};

const borderWidthTokens: BorderToken[] = [
  { token: "sgds-border-width-0", value: "0" },
  { token: "sgds-border-width-1", value: "1/0.0625", note: "Default" },
  { token: "sgds-border-width-2", value: "2/0.125" },
  { token: "sgds-border-width-3", value: "3/0.1875" },
  { token: "sgds-border-width-4", value: "4/0.25" },
];

const borderRadiusTokens: BorderToken[] = [
  { token: "sgds-border-radius-none", value: "0" },
  { token: "sgds-border-radius-xs", value: "2/0.125" },
  { token: "sgds-border-radius-sm", value: "4/0.25" },
  { token: "sgds-border-radius-md", value: "8/0.5", note: "Default" },
  { token: "sgds-border-radius-lg", value: "12/0.75" },
  { token: "sgds-border-radius-xl", value: "16/1" },
  { token: "sgds-border-radius-2-xl", value: "24/1.5" },
  { token: "sgds-border-radius-3-xl", value: "32/2" },
  { token: "sgds-border-radius-full", value: "999" },
];
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Design token</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <article v-if="isWidthPage" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Border width tokens</h4>
          </div>

          <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
            <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
            <sgds-tab-panel v-for="option in tokenViewOptions" :key="`tokens-${option.id}`" :name="option.id"></sgds-tab-panel>
          </sgds-tab-group>

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="border-token-table-name-col">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
              <sgds-table-head class="border-token-table-value-col">Value (px/rem)</sgds-table-head>
              <sgds-table-head class="border-token-table-example-col">Example</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row
              v-for="row in borderWidthTokens"
              :key="row.token"
              :class="row.note ? 'border-token-default-row' : undefined"
            >
              <sgds-table-cell class="border-token-table-name-col">
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
              <sgds-table-cell class="border-token-table-value-col">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="border-token-table-example-col">
                <div class="sgds:flex sgds:items-center border-token-preview-cell">
                  <div
                    class="border-token-width-preview"
                    :style="{ borderWidth: `var(--${row.token})` }"
                  />
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>

        <article v-if="isRadiusPage" class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Border radius tokens</h4>
          </div>

          <sgds-tab-group class="sgds:block sgds:w-full ts-token-tab-group" variant="solid" density="compact" @sgds-tab-show="onTokenViewShow">
            <sgds-tab v-for="option in tokenViewOptions" :key="option.id" slot="nav" :panel="option.id" :active="activeTokenViewId === option.id || null">{{ option.label }}</sgds-tab>
            <sgds-tab-panel v-for="option in tokenViewOptions" :key="`tokens-${option.id}`" :name="option.id"></sgds-tab-panel>
          </sgds-tab-group>

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="border-token-table-name-col">{{ tokenViewOptions.find((o) => o.id === activeTokenViewId)?.label }}</sgds-table-head>
              <sgds-table-head class="border-token-table-value-col">Value (px/rem)</sgds-table-head>
              <sgds-table-head class="border-token-table-example-col">Example</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row
              v-for="row in borderRadiusTokens"
              :key="row.token"
              :class="row.note ? 'border-token-default-row' : undefined"
            >
              <sgds-table-cell class="border-token-table-name-col">
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
              <sgds-table-cell class="border-token-table-value-col">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
              </sgds-table-cell>
              <sgds-table-cell class="border-token-table-example-col">
                <div class="sgds:flex sgds:items-center border-token-preview-cell">
                  <div
                    class="border-token-radius-preview"
                    :style="{ borderRadius: `var(--${row.token})` }"
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
.border-token-table-name-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 18rem;
  min-inline-size: 14rem;
}

.border-token-table-value-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 10rem;
  min-inline-size: 8rem;
}

.border-token-table-example-col {
  box-sizing: border-box;
  inline-size: max-content;
  max-inline-size: 12rem;
  min-inline-size: 10rem;
}

.border-token-preview-cell {
  min-block-size: var(--sgds-dimension-64);
}

/* Border width preview: light tinted box showing the border thickness */
.border-token-width-preview {
  background: rgba(0, 0, 0, 0.05);
  border-color: var(--sgds-border-color-default);
  border-style: solid;
  block-size: 4rem;
  box-sizing: border-box;
  inline-size: 8rem;
}

/* Border radius preview: filled dark block showing the corner rounding */
.border-token-radius-preview {
  background: #222;
  block-size: 4rem;
  box-sizing: border-box;
  inline-size: 8rem;
}

.border-token-default-row {
  background: var(--sgds-primary-surface-muted);
}
</style>
