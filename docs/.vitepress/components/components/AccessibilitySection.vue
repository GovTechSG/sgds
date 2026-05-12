<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import CodeToken from "../ui/CodeToken.vue";
import Section from "../foundations/Section.vue";
import type { AccessibilityContent } from "../../data/component-docs";
import { textParts } from "../../utils/text-parts";

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
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
    <article
      v-for="section in accessibility?.sections || []"
      :key="section.title"
      class="sgds:flex sgds:flex-col sgds:gap-component-sm sgds:max-w-[var(--sgds-container-max-width-md)]"
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
            <template
              v-for="(part, index) in textParts(paragraph)"
              :key="`${paragraph}-${index}`"
            >
              <CodeToken v-if="part.isCode" :label="part.text" />
              <template v-else>{{ part.text }}</template>
            </template>
          </p>
        </div>
        <ul v-if="section.items.length" class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
          <li v-for="item in section.items" :key="item" class="sgds:mt-0">
            <template
              v-for="(part, index) in textParts(item)"
              :key="`${item}-${index}`"
            >
              <CodeToken v-if="part.isCode" :label="part.text" />
              <template v-else>{{ part.text }}</template>
            </template>
          </li>
        </ul>
      </div>
    </article>

    <Section v-if="accessibility?.keyboardInteractions?.length" title="Keyboard interaction" gap="sgds:gap-[var(--sgds-gap-xl)]">
      <sgds-table tableBorder headerBackground>
        <sgds-table-row>
          <sgds-table-head class="sgds:whitespace-nowrap sgds:w-[1%]">Key</sgds-table-head>
          <sgds-table-head>Interaction</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row v-for="row in accessibility?.keyboardInteractions || []" :key="row.key">
          <sgds-table-cell class="sgds:whitespace-nowrap sgds:w-[1%]">
            <span class="sgds:inline-flex sgds:flex-nowrap sgds:items-center sgds:gap-text-2-xs sgds:whitespace-nowrap">
              <template v-for="(part, index) in formatKeyboardKey(row.key)" :key="`${row.key}-${index}-${part.label}`">
                <CodeToken v-if="part.type === 'key'" :label="part.label" />
                <span v-else class="sgds:text-subtle">{{ part.label }}</span>
              </template>
            </span>
          </sgds-table-cell>
          <sgds-table-cell>
            <template
              v-for="(part, index) in textParts(row.description)"
              :key="`${row.key}-desc-${index}`"
            >
              <CodeToken v-if="part.isCode" :label="part.text" />
              <template v-else>{{ part.text }}</template>
            </template>
          </sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    </Section>
    <Section v-else-if="accessibility?.keyboardNotes?.length" title="Keyboard interaction" gap="sgds:gap-[var(--sgds-gap-xl)]">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:max-w-[var(--sgds-container-max-width-md)]">
        <p class="sgds:text-subtle sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          This component does not have a separate keyboard interaction table because:
        </p>
        <ul class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
          <li v-for="note in accessibility.keyboardNotes" :key="note" class="sgds:mt-0">
            <template
              v-for="(part, index) in textParts(note)"
              :key="`${note}-${index}`"
            >
              <CodeToken v-if="part.isCode" :label="part.text" />
              <template v-else>{{ part.text }}</template>
            </template>
          </li>
        </ul>
      </div>
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
