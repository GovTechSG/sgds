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
const canScrollLeft = ref(false);
const canScrollRight = ref(false);

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

// Scroll-state tracking for the overflow arrows. A small tolerance absorbs
// sub-pixel rounding so arrows don't flicker at the extremes. On desktop the
// control is inline-flex (no overflow), so scrollWidth === clientWidth and
// both flags stay false — arrows never render.
const updateScrollState = () => {
  const tablist = tablistRef.value;
  if (!tablist) return;
  const { scrollLeft, scrollWidth, clientWidth } = tablist;
  canScrollLeft.value = scrollLeft > 1;
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 1;
};

const scrollByDirection = (direction: 1 | -1) => {
  const tablist = tablistRef.value;
  if (!tablist) return;
  const amount = Math.max(tablist.clientWidth * 0.6, 120) * direction;
  tablist.scrollBy({ left: amount, behavior: "smooth" });
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

const refresh = () => {
  updateIndicator();
  updateScrollState();
};

let resizeObserver: ResizeObserver | null = null;

const onSegmentClick = (value: string) => {
  emit("update:modelValue", value);
  emit("change", value);
};

onMounted(() => {
  void nextTick(refresh);
  if (tablistRef.value && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(refresh);
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
    updateScrollState();
  });
});

watch(() => props.options, () => {
  void nextTick(refresh);
}, { deep: true });
</script>

<template>
  <div class="segmented-wrapper sgds:relative">
    <div
      ref="tablistRef"
      class="segmented-control sgds:inline-flex sgds:max-md:flex sgds:max-md:w-full sgds:self-start sgds:bg-default sgds:border sgds:border-muted sgds:rounded-md"
      role="tablist"
      :aria-label="ariaLabel"
      @scroll="updateScrollState"
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
    <button
      v-show="canScrollLeft"
      type="button"
      class="scroll-arrow scroll-arrow-left"
      aria-label="Scroll segments left"
      tabindex="-1"
      @click="scrollByDirection(-1)"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
        <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <button
      v-show="canScrollRight"
      type="button"
      class="scroll-arrow scroll-arrow-right"
      aria-label="Scroll segments right"
      tabindex="-1"
      @click="scrollByDirection(1)"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
        <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<style>
/* Segmented control container — uses SGDS spacing tokens (2-xs = 4px)
   that don't currently have direct Tailwind utility equivalents. The
   control is inline-flex on desktop (matches its prior layout — sizes to
   content, doesn't stretch) and switches to flex + full width below the md
   breakpoint (768px) so it fills the container on mobile. The sliding
   indicator is absolutely positioned within this container and uses
   offsetLeft, which is stable relative to content (not the viewport) —
   so it keeps pointing at the correct segment even when the container
   scrolls. */
.segmented-control {
  gap: var(--sgds-gap-2-xs);
  padding: var(--sgds-padding-2-xs);
  position: relative;
}

/* Mobile: let the segments scroll horizontally when their combined width
   exceeds the container. Tailwind v4 has no `scrollbar-hide` utility so
   the scrollbar-hiding rules live in CSS. Segments grow to share the
   available width (`flex: 1 0 auto`) but never shrink below their natural
   content size, so long labels trigger scroll rather than truncation. */
@media (max-width: 767.98px) {
  .segmented-control {
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .segmented-control::-webkit-scrollbar {
    display: none;
  }

  .segment {
    flex: 1 0 auto;
  }
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

/* Segment button — matches <sgds-button variant="primary" size="sm"> visually
   (font-size-14 / line-height-20 / dimension-40 / padding-md) but without the
   greyed hover-bg swap on focus. Only the focus ring remains on focus-visible. */
.segment {
  appearance: none;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--sgds-border-radius-md);
  color: var(--sgds-color-fixed-dark);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: var(--sgds-font-size-14);
  font-weight: var(--sgds-font-weight-regular);
  height: var(--sgds-dimension-40);
  line-height: var(--sgds-line-height-20);
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

/* Scroll affordance arrows — rendered only when the segments overflow in
   that direction (mobile only; desktop never triggers overflow). Overlaid
   at the left/right edges so showing/hiding them doesn't reflow the
   segmented control's width. */
.scroll-arrow {
  align-items: center;
  appearance: none;
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: 9999px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  color: var(--sgds-color-fixed-dark);
  cursor: pointer;
  display: inline-flex;
  height: var(--sgds-dimension-24, 24px);
  justify-content: center;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition:
    background-color 140ms ease,
    color 140ms ease;
  width: var(--sgds-dimension-24, 24px);
  z-index: 4;
}

.scroll-arrow-left {
  left: var(--sgds-dimension-4, 4px);
}

.scroll-arrow-right {
  right: var(--sgds-dimension-4, 4px);
}

.scroll-arrow:hover {
  background: var(--sgds-bg-translucent-subtle);
}

.scroll-arrow:focus {
  outline: none;
}

.scroll-arrow:focus-visible {
  outline: var(--sgds-outline-focus);
  outline-offset: var(--sgds-outline-offset-focus);
}
</style>
