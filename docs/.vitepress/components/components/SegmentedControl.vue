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

const wrapperRef = ref<HTMLElement | null>(null);
const tablistRef = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
const showGestureHint = ref(false);
const isCompactLayout = ref(false);

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
  isCompactLayout.value = (wrapperRef.value?.clientWidth ?? tablist.clientWidth) <= 560;
  const { scrollLeft, scrollWidth, clientWidth } = tablist;
  canScrollLeft.value = scrollLeft > 1;
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 1;
  showGestureHint.value = isCompactLayout.value && scrollWidth > clientWidth + 1;
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
  <div
    ref="wrapperRef"
    class="segmented-wrapper sgds:relative sgds:w-full"
    :class="{ 'segmented-wrapper-compact': isCompactLayout }"
  >
    <div
      ref="tablistRef"
      class="segmented-control sgds:self-start sgds:bg-default sgds:border sgds:border-muted sgds:rounded-md"
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
    <div v-show="canScrollLeft" class="scroll-fade scroll-fade-left" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" focusable="false">
        <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <div v-show="canScrollRight" class="scroll-fade scroll-fade-right" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" focusable="false">
        <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <p
      v-show="showGestureHint"
      class="sgds:flex sgds:items-center sgds:justify-center sgds:gap-[var(--sgds-gap-2-xs)] sgds:mt-[var(--sgds-gap-2-xs)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle"
      aria-hidden="true"
    >
      Swipe to view more
    </p>
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
  display: inline-flex;
  gap: var(--sgds-gap-2-xs);
  max-width: 100%;
  padding: var(--sgds-padding-2-xs);
  position: relative;
  touch-action: pan-x;
}

/* Compact mode is based on actual component width, not viewport width, so it
   works correctly inside narrow content columns too. */
.segmented-wrapper-compact .segmented-control {
  display: flex;
  width: 100%;
}

.segmented-wrapper-compact .segmented-control {
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.segmented-wrapper-compact .segmented-control::-webkit-scrollbar {
  display: none;
}

.segmented-wrapper-compact .segment {
  flex: 0 0 auto;
  max-width: calc(100% - (var(--sgds-padding-2-xs) * 2));
  overflow: hidden;
  text-overflow: ellipsis;
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

/* Mobile overflow affordance — edge fades with chevrons hint that the
   segmented control can be swiped horizontally. They are purely visual and
   don't intercept touch, so gesture scrolling still works normally. */
.scroll-fade {
  align-items: center;
  color: var(--sgds-color-default);
  display: none;
  height: calc(100% - (var(--sgds-padding-2-xs) * 2));
  justify-content: center;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: var(--sgds-dimension-40);
  z-index: 4;
}

.scroll-fade-left {
  left: var(--sgds-padding-2-xs);
  background: linear-gradient(90deg, var(--sgds-surface-default) 55%, transparent 100%);
}

.scroll-fade-right {
  right: var(--sgds-padding-2-xs);
  background: linear-gradient(270deg, var(--sgds-surface-default) 55%, transparent 100%);
}

.segmented-wrapper-compact .scroll-fade {
  display: inline-flex;
}
</style>
