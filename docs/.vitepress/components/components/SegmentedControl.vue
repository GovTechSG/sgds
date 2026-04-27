<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";

type SegmentOption = { value: string; label: string };

const props = defineProps<{
  modelValue: string;
  options: readonly SegmentOption[];
  ariaLabel?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
}>();

const tablistRef = ref<HTMLElement | null>(null);

const indicatorStyle = ref<Record<string, string>>({
  transform: "translate3d(0, 0, 0)",
  width: "0px",
  height: "0px",
  opacity: "0",
});

const updateIndicator = () => {
  const tablist = tablistRef.value;
  if (!tablist) return;
  const activeBtn = tablist.querySelector<HTMLElement>(
    `[data-segment-value="${props.modelValue}"]`,
  );
  if (!activeBtn) return;
  indicatorStyle.value = {
    transform: `translate3d(${activeBtn.offsetLeft}px, ${activeBtn.offsetTop}px, 0)`,
    width: `${activeBtn.offsetWidth}px`,
    height: `${activeBtn.offsetHeight}px`,
    opacity: "1",
  };
};

// If the newly-active segment is partially (or fully) outside the scroll
// viewport, nudge it into view so the sliding indicator is always visible.
// No-op on desktop where the control isn't scrollable.
const scrollActiveIntoView = () => {
  const tablist = tablistRef.value;
  if (!tablist) return;
  const activeBtn = tablist.querySelector<HTMLElement>(
    `[data-segment-value="${props.modelValue}"]`,
  );
  if (!activeBtn) return;
  const buttonLeft = activeBtn.offsetLeft;
  const buttonRight = buttonLeft + activeBtn.offsetWidth;
  const viewLeft = tablist.scrollLeft;
  const viewRight = viewLeft + tablist.clientWidth;
  const margin = 16;
  if (buttonLeft < viewLeft) {
    tablist.scrollTo({ left: Math.max(0, buttonLeft - margin), behavior: "smooth" });
  } else if (buttonRight > viewRight) {
    tablist.scrollTo({ left: buttonRight - tablist.clientWidth + margin, behavior: "smooth" });
  }
};

let resizeObserver: ResizeObserver | null = null;

const onSegmentClick = (value: string) => {
  emit("update:modelValue", value);
  emit("change", value);
};

onMounted(() => {
  void nextTick(updateIndicator);
  if (tablistRef.value && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(tablistRef.value);
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
});

watch(() => props.modelValue, () => {
  void nextTick(() => {
    updateIndicator();
    scrollActiveIntoView();
  });
});

watch(() => props.options, () => {
  void nextTick(updateIndicator);
}, { deep: true });
</script>

<template>
  <div
    ref="tablistRef"
    class="segmented-control sgds:bg-default sgds:border sgds:border-muted sgds:rounded-md"
    role="tablist"
    :aria-label="ariaLabel"
  >
    <span
      class="segmented-indicator"
      aria-hidden="true"
      :style="indicatorStyle"
    ></span>
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="segment"
      :class="{ 'segment-active': opt.value === modelValue }"
      :data-segment-value="opt.value"
      role="tab"
      :aria-selected="opt.value === modelValue ? 'true' : 'false'"
      @click="onSegmentClick(opt.value)"
    >{{ opt.label }}</button>
  </div>
</template>

<style>
/* Segmented control container — uses SGDS spacing tokens (2-xs = 4px)
   that don't currently have direct Tailwind utility equivalents. The
   control is always inline-flex so it sizes to its content. overflow-x:
   auto enables native horizontal scroll if the consumer constrains its
   width; otherwise the control just expands. The scrollbar is hidden —
   the cropped next-segment at the edge is a sufficient affordance, and
   the active segment auto-scrolls into view when selected. The sliding
   indicator is absolutely positioned within this container and uses
   offsetLeft, which is stable relative to content (not the viewport) —
   so it keeps pointing at the correct segment even when the container
   scrolls. */
.segmented-control {
  align-self: start;
  box-sizing: border-box;
  display: inline-flex;
  gap: var(--sgds-gap-2-xs);
  max-width: 100%;
  padding: var(--sgds-padding-2-xs);
  position: relative;
  touch-action: pan-x;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.segmented-control::-webkit-scrollbar {
  display: none;
}

/* Sliding indicator pill — absolute-positioned sibling sized/positioned
   via JS to match the active segment; animated through transform + width
   so motion stays GPU-accelerated. */
.segmented-indicator {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  background: var(--sgds-surface-inverse);
  border-radius: var(--sgds-border-radius-md);
  transition:
    transform 260ms cubic-bezier(0.4, 0, 0.2, 1),
    width 260ms cubic-bezier(0.4, 0, 0.2, 1),
    height 260ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 140ms ease;
  will-change: transform, width;
}

@media (prefers-reduced-motion: reduce) {
  .segmented-indicator {
    transition: opacity 140ms ease;
  }

  .segmented-control {
    scroll-behavior: auto;
  }
}

/* Segment button — uses SGDS label small regular typography
   (font-size-label-sm / font-weight-regular / line-height-2-xs /
   tracking-normal) while keeping the compact segmented-control geometry. */
.segment {
  appearance: none;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--sgds-border-radius-md);
  color: var(--sgds-color-default);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  font-family: inherit;
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-regular);
  height: var(--sgds-dimension-40);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
  min-width: var(--sgds-dimension-80);
  padding: var(--sgds-padding-none) var(--sgds-padding-md);
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  white-space: nowrap;
  z-index: 1;
}

.segment.segment-active {
  color: var(--sgds-color-inverse);
}

.segment:focus {
  outline: none;
}

.segment:focus-visible {
  outline: var(--sgds-outline-focus);
  outline-offset: var(--sgds-outline-offset-focus);
}

@media (prefers-reduced-motion: reduce) {
  .segment {
    transition: none;
  }
}
</style>
