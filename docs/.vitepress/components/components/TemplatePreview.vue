<script setup lang="ts">
import { computed, onMounted } from "vue";
import { withBase } from "vitepress";
import TemplatePreviewToolbar from "./TemplatePreviewToolbar.vue";
import {
  blockTemplateCategoryOrder,
  blockTemplateRecommendedOrder,
  pageTemplateRecommendedOrder,
  templateOverviewGroups,
} from "../../data/pattern-docs";
import { getStorybookIframeUrl } from "../../data/storybook-ids";

// Hidden for now — viewport controls may be re-enabled later.
// type Viewport = "mobile" | "tablet" | "desktop";

const props = withDefaults(
  defineProps<{
    templateKey: string;
    templateTitle: string;
    // "template" routes to /templates/page-templates/...; "block" routes to
    // /blocks/... — both share this preview shell.
    kind?: "template" | "block";
  }>(),
  { kind: "template" },
);

// Hidden for now — viewport controls may be re-enabled later.
// const viewport = ref<Viewport>("desktop");
// const viewportWidth: Record<Viewport, string> = {
//   mobile: "375px",
//   tablet: "768px",
//   desktop: "100%",
// };
// const frameStyle = computed(() => ({
//   width: viewportWidth[viewport.value],
//   maxWidth: "100%",
// }));
// const stagePadding = computed(() =>
//   viewport.value === "desktop" ? "0" : "var(--sgds-spacing-layout-md)",
// );

const overviewHref = computed(() =>
  withBase(props.kind === "block" ? "/blocks/" : "/templates/"),
);

// The iframe loads the Storybook story with its own toolbar (includes theme switching).
const iframeSrc = computed(() =>
  getStorybookIframeUrl(props.kind, props.templateKey),
);

// Dropdown of every preview the toolbar can switch into. Page templates and
// block templates share one menu — the kind is used to derive the URL.
type DropdownOption = { key: string; title: string; kind: "template" | "block"; groupLabel?: string };

const getPageTemplateOrder = (key: string) => {
  const index = pageTemplateRecommendedOrder.indexOf(key);
  return index === -1 ? pageTemplateRecommendedOrder.length : index;
};

const pageOverviewItems =
  templateOverviewGroups.find((templateGroup) => templateGroup.group === "page templates")?.items ?? [];

const templateOptions: DropdownOption[] = [...pageOverviewItems]
  .sort((current, next) => getPageTemplateOrder(current.key) - getPageTemplateOrder(next.key))
  .map((item) => ({
    key: item.key,
    title: item.title,
    kind: "template" as const,
    groupLabel: item.groupLabel,
  }));

const getBlockCategoryOrder = (label: string) => {
  const index = blockTemplateCategoryOrder.indexOf(label);
  return index === -1 ? blockTemplateCategoryOrder.length : index;
};

const getBlockTemplateOrder = (key: string) => {
  const index = blockTemplateRecommendedOrder.indexOf(key);
  return index === -1 ? blockTemplateRecommendedOrder.length : index;
};

const blockOverviewItems =
  templateOverviewGroups.find((templateGroup) => templateGroup.group === "block templates")?.items ?? [];

const blockOptions = [...blockOverviewItems]
  .sort((current, next) =>
    getBlockCategoryOrder(current.groupLabel) - getBlockCategoryOrder(next.groupLabel) ||
    getBlockTemplateOrder(current.key) - getBlockTemplateOrder(next.key),
  )
  .map((item) => ({
    key: item.key,
    title: item.title,
    kind: "block" as const,
    groupLabel: item.groupLabel,
  }));

const navigateToOption = (opt: DropdownOption) => {
  if (typeof window === "undefined") return;
  const base = opt.kind === "block" ? "/blocks" : "/templates/page-templates";
  window.location.href = withBase(`${base}/preview/${opt.key}`);
};

const navigateToOverview = () => {
  if (typeof window === "undefined") return;
  window.location.href = overviewHref.value;
};

onMounted(() => {
  if (typeof document !== "undefined") {
    document.title = `${props.templateTitle} preview · SGDS`;
  }
});
</script>

<template>
  <div class="template-preview-shell">
    <header class="template-preview-sticky-bar">
      <div class="template-preview-back-action">
        <sgds-button
          variant="ghost"
          tone="neutral"
          size="sm"
          :ariaLabel.prop="kind === 'block' ? 'Back to blocks' : 'Back to templates'"
          :title="kind === 'block' ? 'Back to blocks' : 'Back to templates'"
          @click="navigateToOverview"
        >
          <sgds-icon name="arrow-left" slot="leftIcon"></sgds-icon>
          Back
        </sgds-button>
      </div>

      <TemplatePreviewToolbar
        :template-options="templateOptions"
        :block-options="blockOptions"
        :active-key="templateKey"
        :active-kind="kind"
        @navigate="navigateToOption"
      />
    </header>

    <div class="template-preview-stage">
      <iframe
        :key="templateKey"
        class="template-preview-iframe"
        :title="`${templateTitle} preview`"
        :src="iframeSrc"
      ></iframe>
    </div>
  </div>
</template>

<style>
.template-preview-shell {
  background: var(--sgds-surface-raised);
  min-height: 100vh;
  position: relative;
}

.template-preview-sticky-bar {
  align-items: center;
  background: var(--sgds-surface-default);
  border-bottom: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
  box-shadow:
    0 2px 8px color-mix(in srgb, var(--sgds-color-fixed-dark) 8%, transparent);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: var(--sgds-gap-xs);
  padding: var(--sgds-padding-2-xs) var(--sgds-padding-xs);
  position: sticky;
  top: 0;
  z-index: 50;
}

.template-preview-back-action {
  justify-self: start;
}

.template-preview-stage {
  display: flex;
}

.template-preview-iframe {
  width: 100%;
  border: 0;
  display: block;
  /* Fill the remaining viewport height below the sticky toolbar so the
     Storybook content scrolls within the iframe. */
  height: calc(100vh - 57px);
}

@media (max-width: 640px) {
  .template-preview-sticky-bar {
    display: flex;
    overflow-x: auto;
  }
}
</style>
