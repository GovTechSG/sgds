<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import CodeToken from "../ui/CodeToken.vue";
import Section from "../foundations/Section.vue";
import type { AccessibilityContent } from "../../data/component-docs";

const props = defineProps<{
  accessibility: AccessibilityContent;
}>();

const accessibilityCanvasRefs = ref<Record<string, HTMLElement | null>>({});
const accessibilityHighlightPositions = ref<Record<string, Array<{ key: string; left: number; top: number; width: number; height: number }>>>({});
let resizeObserver: ResizeObserver | null = null;
let mutationObservers: MutationObserver[] = [];

const formatKeyboardKey = (key: string) =>
  key
    .split(/(\s+\+\s+|\s+or\s+|\s*\/\s*)/i)
    .filter(Boolean)
    .map((part) => {
      const normalised = part.trim();
      if (normalised === "+") return { type: "connector", label: "+" };
      if (normalised === "/") return { type: "connector", label: "or" };
      if (normalised.toLowerCase() === "or") return { type: "connector", label: "or" };
      return { type: "key", label: normalised };
    });

const setCanvasRef = (title: string) => (el: Element | null) => {
  accessibilityCanvasRefs.value[title] = el as HTMLElement | null;
  if (el && resizeObserver) {
    resizeObserver.observe(el as HTMLElement);
  }
};

const updateHighlights = async () => {
  await nextTick();

  const sections = props.accessibility?.sections ?? [];
  const positions: Record<string, Array<{ key: string; left: number; top: number; width: number; height: number }>> = {};

  for (const section of sections) {
    const canvas = accessibilityCanvasRefs.value[section.title];
    if (!canvas || !section.highlights?.length) continue;

    const canvasRect = canvas.getBoundingClientRect();
    const sectionHighlights = section.highlights
      .map((highlight) => {
        const baseTarget = canvas.querySelector(highlight.selector) as HTMLElement | null;
        const target = highlight.targetShadowSelector
          ? ((baseTarget as HTMLElement | null)?.shadowRoot?.querySelector(highlight.targetShadowSelector) as HTMLElement | null)
          : baseTarget;

        if (!target) return null;

        const targetRect = target.getBoundingClientRect();

        return {
          key: highlight.key,
          left: targetRect.left - canvasRect.left,
          top: targetRect.top - canvasRect.top,
          width: targetRect.width,
          height: targetRect.height,
        };
      })
      .filter((value): value is NonNullable<typeof value> => Boolean(value));

    positions[section.title] = sectionHighlights;
  }

  accessibilityHighlightPositions.value = positions;
};

const bindMutationObservers = async () => {
  await nextTick();

  mutationObservers.forEach((observer) => observer.disconnect());
  mutationObservers = [];

  Object.values(accessibilityCanvasRefs.value).forEach((canvas) => {
    if (!canvas) return;

    const observer = new MutationObserver(() => {
      void updateHighlights();
    });

    observer.observe(canvas, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    mutationObservers.push(observer);
  });
};

onMounted(() => {
  void updateHighlights();
  void bindMutationObservers();

  resizeObserver = new ResizeObserver(() => {
    void updateHighlights();
  });

  Object.values(accessibilityCanvasRefs.value).forEach((canvas) => {
    if (canvas) resizeObserver?.observe(canvas);
  });

  window.addEventListener("resize", updateHighlights);
});

watch(() => props.accessibility, () => {
  void updateHighlights();
  void bindMutationObservers();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  mutationObservers.forEach((observer) => observer.disconnect());
  window.removeEventListener("resize", updateHighlights);
});
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
    <article
      v-for="section in accessibility?.sections || []"
      :key="section.title"
      :class="section.markup
        ? 'sgds:grid sgds:gap-layout-lg sgds:grid-cols-[minmax(0,3fr)_minmax(0,5fr)] sgds:max-xl:grid-cols-1'
        : 'sgds:flex sgds:flex-col sgds:gap-component-sm sgds:max-w-[var(--sgds-container-max-width-md)]'"
    >
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
          {{ section.title }}
        </h3>
        <div v-if="section.description?.length" class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-text-xs">
          <p
            v-for="paragraph in section.description"
            :key="paragraph"
            class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal"
          >
            {{ paragraph }}
          </p>
        </div>
        <ul v-if="section.items.length" class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
          <li v-for="item in section.items" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div v-if="section.markup" class="sgds:flex sgds:items-center sgds:justify-center sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:min-h-[var(--sgds-dimension-288)] sgds:p-component-md sgds:max-lg:min-h-[var(--sgds-dimension-320)]">
        <div v-if="section.markup" class="sgds:bg-transparent sgds:mx-auto sgds:max-w-[var(--sgds-dimension-512)] sgds:w-full">
          <div
            :ref="setCanvasRef(section.title)"
            class="sgds:relative sgds:w-full"
          >
            <span
              v-for="highlight in accessibilityHighlightPositions[section.title] || []"
              :key="`${section.title}-${highlight.key}`"
              class="sgds:absolute sgds:z-[2] sgds:pointer-events-none sgds:bg-[var(--sgds-primary-surface-translucent)] sgds:border sgds:border-dashed sgds:border-[var(--sgds-primary-border-color-default)]"
              :style="{
                left: `${highlight.left}px`,
                top: `${highlight.top}px`,
                width: `${highlight.width}px`,
                height: `${highlight.height}px`,
              }"
            ></span>
            <div class="accessibility-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="section.markup"></div>
          </div>
        </div>
      </div>
    </article>

    <Section v-if="accessibility?.keyboardInteractions?.length" title="Keyboard interaction" gap="sgds:gap-[var(--sgds-gap-xl)]">
      <sgds-table tableBorder headerBackground>
        <sgds-table-row>
          <sgds-table-head>Key</sgds-table-head>
          <sgds-table-head>Interaction</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row v-for="row in accessibility?.keyboardInteractions || []" :key="row.key">
          <sgds-table-cell>
            <span class="sgds:inline-flex sgds:flex-wrap sgds:items-center sgds:gap-text-2-xs">
              <template v-for="(part, index) in formatKeyboardKey(row.key)" :key="`${row.key}-${index}-${part.label}`">
                <CodeToken v-if="part.type === 'key'" :label="part.label" />
                <span v-else class="sgds:text-subtle">{{ part.label }}</span>
              </template>
            </span>
          </sgds-table-cell>
          <sgds-table-cell>{{ row.description }}</sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    </Section>
  </div>
</template>

<style>
/* Global selectors targeting slotted web component elements in v-html markup */
.accessibility-demo-markup > sgds-accordion {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  display: block;
  overflow: hidden;
  width: 100%;
}

.accessibility-demo-markup > sgds-alert {
  display: block;
  width: 100%;
}

.accessibility-demo-markup sgds-alert-link {
  vertical-align: baseline;
}
</style>
