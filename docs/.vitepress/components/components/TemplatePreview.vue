<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { withBase } from "vitepress";
import TemplatePreviewToolbar from "./TemplatePreviewToolbar.vue";
import { blockTemplateCategoryOrder, templateOverviewGroups } from "../../data/pattern-docs";
import { isDarkTheme } from "../../theme/composables/sgds-theming";
import { currentPaletteId } from "../../theme/composables/sgds-palette";

type Viewport = "mobile" | "tablet" | "desktop";

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

const viewport = ref<Viewport>("desktop");
const iframeRef = ref<HTMLIFrameElement | null>(null);
const iframeHeight = ref<number>(800);

const viewportWidth: Record<Viewport, string> = {
  mobile: "375px",
  tablet: "768px",
  desktop: "100%",
};

const frameStyle = computed(() => ({
  width: viewportWidth[viewport.value],
  maxWidth: "100%",
}));

const stagePadding = computed(() =>
  viewport.value === "desktop" ? "0" : "var(--sgds-spacing-layout-md)",
);

const docBasePath = computed(() =>
  props.kind === "block" ? "/blocks" : "/templates/page-templates",
);

const overviewHref = computed(() =>
  withBase(props.kind === "block" ? "/blocks/" : "/templates/"),
);

// The iframe loads a "bare" vitepress page that renders only the template (or
// block) markup. Each iframe gets its own viewport so the template's CSS
// @media queries fire against the iframe width, not the parent page width.
const iframeSrc = computed(() =>
  withBase(`${docBasePath.value}/preview/raw/${props.templateKey}`),
);

// Dropdown of every preview the toolbar can switch into. Page templates and
// block templates share one menu — the kind is used to derive the URL.
type DropdownOption = { key: string; title: string; kind: "template" | "block"; groupLabel?: string };

const templateOptions: DropdownOption[] = [
  { key: "about-us", title: "About us", kind: "template" },
  { key: "application-management", title: "Application management", kind: "template" },
  { key: "blog", title: "Blog", kind: "template" },
  { key: "catalogue", title: "Catalogue", kind: "template" },
  { key: "form-page", title: "Form page", kind: "template" },
  { key: "landing", title: "Landing page", kind: "template" },
  { key: "multi-step-form", title: "Multi-step form", kind: "template" },
  { key: "report-issue", title: "Report an issue", kind: "template" },
];

const getBlockCategoryOrder = (label: string) => {
  const index = blockTemplateCategoryOrder.indexOf(label);
  return index === -1 ? blockTemplateCategoryOrder.length : index;
};

const blockOverviewItems =
  templateOverviewGroups.find((templateGroup) => templateGroup.group === "block templates")?.items ?? [];

const blockOptions = [...blockOverviewItems]
  .sort((current, next) => getBlockCategoryOrder(current.groupLabel) - getBlockCategoryOrder(next.groupLabel))
  .map((item) => ({
    key: item.key,
    title: item.title,
    kind: "block" as const,
    groupLabel: item.groupLabel,
  }));

// Resize the iframe to match its content height so the iframe itself never
// scrolls. The parent page handles all scrolling. ResizeObserver inside the
// iframe document keeps the height in sync when the inner layout reflows.
let activeResizeObserver: ResizeObserver | null = null;

const measureContent = () => {
  const iframe = iframeRef.value;
  const doc = iframe?.contentDocument;
  if (!doc?.body) return;
  const next = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
  if (next > 0) iframeHeight.value = next;
};

// Mirror the parent's palette override <style> into the iframe's <head> so
// brand-colour swaps in the toolbar take effect on the rendered template.
const syncPaletteToIframe = () => {
  const iframe = iframeRef.value;
  const doc = iframe?.contentDocument;
  if (!doc) return;
  const parentStyle = document.getElementById("sgds-palette-override") as HTMLStyleElement | null;
  let mirror = doc.getElementById("sgds-palette-override") as HTMLStyleElement | null;

  if (!parentStyle) {
    mirror?.remove();
    return;
  }

  if (!mirror) {
    mirror = doc.createElement("style");
    mirror.id = "sgds-palette-override";
    doc.head.appendChild(mirror);
  }
  mirror.textContent = parentStyle.textContent;
};

const syncThemeToIframe = () => {
  const iframe = iframeRef.value;
  const doc = iframe?.contentDocument;
  if (!doc) return;
  doc.documentElement.classList.toggle("sgds-night-theme", isDarkTheme.value);
};

const handleIframeLoad = () => {
  const iframe = iframeRef.value;
  const doc = iframe?.contentDocument;
  if (!doc) return;

  syncThemeToIframe();
  syncPaletteToIframe();

  measureContent();
  activeResizeObserver?.disconnect();
  activeResizeObserver = new ResizeObserver(() => measureContent());
  activeResizeObserver.observe(doc.documentElement);
};

watch(isDarkTheme, syncThemeToIframe);
watch(currentPaletteId, syncPaletteToIframe);

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

onBeforeUnmount(() => {
  activeResizeObserver?.disconnect();
  activeResizeObserver = null;
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
          :title="kind === 'block' ? 'Back to blocks' : 'Back to templates'"
          @click="navigateToOverview"
        >
          <sgds-icon name="arrow-left" slot="leftIcon"></sgds-icon>
          Back
        </sgds-button>
      </div>

      <TemplatePreviewToolbar
        v-model:viewport="viewport"
        :template-options="templateOptions"
        :block-options="blockOptions"
        :active-key="templateKey"
        :active-kind="kind"
        @navigate="navigateToOption"
      />
    </header>

    <div class="template-preview-stage" :style="{ padding: stagePadding }">
      <div
        class="template-preview-frame"
        :class="{ 'template-preview-frame--framed': viewport !== 'desktop' }"
        :style="frameStyle"
      >
        <!-- Re-create the iframe when viewport changes so the inner page boots
             with the correct width. SGDS components (e.g. mainnav) latch their
             responsive state on first render and don't re-evaluate when only
             the iframe element resizes. -->
        <iframe
          ref="iframeRef"
          :key="`${templateKey}-${viewport}`"
          class="template-preview-iframe"
          :title="`${templateTitle} preview`"
          :src="iframeSrc"
          :style="{ height: `${iframeHeight}px` }"
          scrolling="no"
          @load="handleIframeLoad"
        ></iframe>
      </div>
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
  justify-content: center;
  align-items: flex-start;
}

.template-preview-frame {
  background: var(--sgds-surface-default);
  margin: 0 auto;
  display: block;
  transition: width 0.2s ease;
}

.template-preview-frame--framed {
  /* Drop a soft shadow when the iframe is framed in mobile/tablet so the
     device framing reads clearly against the raised stage background. */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.template-preview-iframe {
  width: 100%;
  border: 0;
  display: block;
  /* Height is set inline via JS to match the iframe document's content height
     so the iframe itself never scrolls — the parent page handles scrolling. */
}

@media (max-width: 640px) {
  .template-preview-sticky-bar {
    display: flex;
    overflow-x: auto;
  }
}
</style>
