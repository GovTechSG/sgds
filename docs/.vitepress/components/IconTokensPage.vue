<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

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

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="icon-token-table-col">Token name</sgds-table-head>
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
                  <CodeToken :label="row.token" />
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
