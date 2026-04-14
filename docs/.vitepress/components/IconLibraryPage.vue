<script setup lang="ts">
import { computed, ref } from "vue";
import { iconRegistry } from "@govtechsg/sgds-web-component/components/Icon/icon-registry.js";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

const copiedIcon = ref<string | null>(null);

const iconNames = computed(() => Object.keys(iconRegistry).sort((a, b) => a.localeCompare(b)));

const iconExamples = [
  '<sgds-icon name="announcement"></sgds-icon>',
  '<sgds-icon name="arrow-right" size="sm"></sgds-icon>',
  '<sgds-icon name="star" size="xl"></sgds-icon>',
] as const;

const sizeGuidance = [
  { context: "Inline with small text", size: "xs or sm" },
  { context: "Inline with body text", size: "md" },
  { context: "Default standalone icon", size: "lg" },
  { context: "Prominent feature icon", size: "xl, 2-xl, or 3-xl" },
] as const;

const copyIconName = async (iconName: string) => {
  await navigator.clipboard.writeText(iconName);
  copiedIcon.value = iconName;
  setTimeout(() => {
    if (copiedIcon.value === iconName) copiedIcon.value = null;
  }, 2000);
};
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <div class="typography-page-template__copy-block">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Use <CodeToken :label="'<sgds-icon>'" /> to render SVG icons from the SGDS icon registry. Browse the
          library below and select any icon tile to copy its icon name.
        </p>
      </div>
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Using icons</h2>

      <div class="typography-page-template__body typography-page-template__body--prose">
        <article class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Basic usage</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Always provide the <CodeToken label="name" /> attribute. If the name is not found in the registry,
            the icon will not render.
          </p>
          <div :class="$style.codeExamples" aria-label="Icon usage examples">
            <code v-for="example in iconExamples" :key="example" :class="$style.codeExample">{{ example }}</code>
          </div>
        </article>

        <article class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
            Choosing icon size
          </h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Use the smallest size that keeps the icon clear in context. When an icon is placed inside
            <CodeToken :label="'<sgds-link>'" />, its size is managed by the link component.
          </p>

          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="typography-page-template__table-usage-column">Context</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-value-column">Size</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row v-for="item in sizeGuidance" :key="item.context">
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  {{ item.context }}
                </span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-value-column">
                <CodeToken :label="item.size" />
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>

        <article class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">API</h4>
          <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
            <sgds-table-row>
              <sgds-table-head class="typography-page-template__table-value-column">Attribute</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-usage-column">Type</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-value-column">Default</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-usage-column">Purpose</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row>
              <sgds-table-cell class="typography-page-template__table-value-column">
                <CodeToken label="name" />
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <CodeToken label="string" />
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-value-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Required</span>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  Icon name from the SGDS icon registry.
                </span>
              </sgds-table-cell>
            </sgds-table-row>

            <sgds-table-row>
              <sgds-table-cell class="typography-page-template__table-value-column">
                <CodeToken label="size" />
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <CodeToken label="xs | sm | md | lg | xl | 2-xl | 3-xl" />
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-value-column">
                <CodeToken label="lg" />
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  Rendered size of the icon.
                </span>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </article>
      </div>
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Icon library</h2>
      <div :class="$style.libraryHeader">
        <p class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">
          {{ iconNames.length }} icons
        </p>
        <p
          class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:m-0"
          role="status"
          aria-live="polite"
        >
          {{ copiedIcon ? `Copied ${copiedIcon}` : "Click any icon to copy its name" }}
        </p>
      </div>

      <div :class="$style.iconGrid">
        <button
          v-for="iconName in iconNames"
          :key="iconName"
          type="button"
          :class="[$style.iconTile, copiedIcon === iconName ? $style.iconTileCopied : '']"
          :aria-label="`Copy ${iconName} icon name`"
          @click="copyIconName(iconName)"
        >
          <span :class="$style.iconPreview">
            <sgds-icon :name="iconName" size="lg" />
          </span>
          <span :class="$style.iconName">{{ iconName }}</span>
          <span :class="$style.copyState" aria-hidden="true">
            <sgds-icon :name="copiedIcon === iconName ? 'check' : 'copy'" size="sm" />
          </span>
        </button>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style module>
.codeExamples {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-component-gap-xs);
}

.codeExample {
  background: var(--sgds-surface-raised);
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-md);
  color: var(--sgds-color-default);
  font-family: var(--sgds-font-family-mono);
  font-size: var(--sgds-font-size-14);
  line-height: var(--sgds-line-height-20);
  overflow-wrap: anywhere;
  padding: var(--sgds-component-padding-xs);
  white-space: normal;
}

.libraryHeader {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
}

.iconGrid {
  display: grid;
  gap: var(--sgds-component-gap-sm);
  grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
}

.iconTile {
  align-items: center;
  background: var(--sgds-surface-default);
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  color: var(--sgds-color-default);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-component-gap-xs);
  min-block-size: 9rem;
  min-width: 0;
  padding: var(--sgds-component-padding-sm);
  position: relative;
  text-align: center;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.iconTile:hover {
  border-color: var(--sgds-border-color-emphasis);
  transform: translateY(-0.125rem);
}

.iconTile:focus-visible {
  outline: var(--sgds-border-width-2) solid var(--sgds-focus-ring-color);
  outline-offset: var(--sgds-focus-ring-offset);
}

.iconTileCopied {
  border-color: var(--sgds-primary-border-color-default);
  color: var(--sgds-primary-color-default);
}

.iconPreview {
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  min-block-size: var(--sgds-dimension-48);
}

.iconName {
  color: inherit;
  font-family: var(--sgds-font-family-mono);
  font-size: var(--sgds-font-size-14);
  line-height: var(--sgds-line-height-20);
  max-inline-size: 100%;
  overflow-wrap: anywhere;
}

.copyState {
  inset-block-start: var(--sgds-spacer-3);
  inset-inline-end: var(--sgds-spacer-3);
  opacity: 0;
  position: absolute;
  transition: opacity 160ms ease;
}

.iconTile:hover .copyState,
.iconTile:focus-visible .copyState,
.iconTileCopied .copyState {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .iconTile {
    transition: none;
  }

  .iconTile:hover {
    transform: none;
  }
}
</style>
