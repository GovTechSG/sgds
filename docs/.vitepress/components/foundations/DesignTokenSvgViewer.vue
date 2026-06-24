<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const props = defineProps<{
  /** Raw SVG markup (already tokenized to SGDS theme variables). */
  svgSource: string;
  /** Title shown in the fullscreen modal header. */
  title: string;
  /** Original viewBox width — used to render at native size in fullscreen. */
  nativeWidth: number;
}>();

// Viewport SVG: stretch to fill, preserve native aspect ratio.
const viewportSvg = computed(() =>
  props.svgSource.replace(
    /<svg[^>]*>/,
    (match) =>
      match.replace(/\sclass="[^"]*"/, "").replace(
        /<svg/,
        '<svg class="dts-svg" role="img" aria-label="' + props.title + '" preserveAspectRatio="xMidYMid meet"',
      ),
  ),
);

// Fullscreen SVG: same content, different class so we can scale via CSS var.
const fullscreenSvg = computed(() =>
  props.svgSource.replace(
    /<svg[^>]*>/,
    (match) =>
      match.replace(/\sclass="[^"]*"/, "").replace(
        /<svg/,
        '<svg class="dts-svg dts-svg--fullscreen" role="img" aria-label="' + props.title + '" preserveAspectRatio="xMidYMid meet"',
      ),
  ),
);

// Track scroll position so the "scroll right" indicator only shows when
// there's more chart hidden to the right.
const scrollerRef = ref<HTMLElement | null>(null);
const canScrollRight = ref(false);

const updateScrollState = () => {
  const el = scrollerRef.value;
  if (!el) {
    canScrollRight.value = false;
    return;
  }
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
};

const scrollRight = () => {
  const el = scrollerRef.value;
  if (!el) return;
  el.scrollBy({ left: el.clientWidth * 0.8, behavior: "smooth" });
};

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  updateScrollState();
  if (scrollerRef.value && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(scrollerRef.value);
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
});

// Fullscreen modal + zoom controls.
const fullscreenOpen = ref(false);
const zoomLevel = ref(1);
const ZOOM_STEP = 0.25;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 4;

const openFullscreen = () => {
  zoomLevel.value = 1;
  fullscreenOpen.value = true;
};
const closeFullscreen = () => {
  fullscreenOpen.value = false;
};

const zoomIn = () => {
  zoomLevel.value = Math.min(ZOOM_MAX, +(zoomLevel.value + ZOOM_STEP).toFixed(2));
};
const zoomOut = () => {
  zoomLevel.value = Math.max(ZOOM_MIN, +(zoomLevel.value - ZOOM_STEP).toFixed(2));
};
const resetZoom = () => {
  zoomLevel.value = 1;
};

const zoomPercent = computed(() => `${Math.round(zoomLevel.value * 100)}%`);
const canZoomIn = computed(() => zoomLevel.value < ZOOM_MAX);
const canZoomOut = computed(() => zoomLevel.value > ZOOM_MIN);
</script>

<template>
  <figure class="dts-chart sgds:m-0">
    <div class="dts-viewport">
      <button
        ref="scrollerRef"
        type="button"
        class="dts-scroller"
        :aria-label="`Open ${title} at full size`"
        @scroll="updateScrollState"
        @click="openFullscreen"
        v-html="viewportSvg"
      ></button>

      <transition name="dts-fade">
        <sgds-icon-button
          v-if="canScrollRight"
          name="chevron-right"
          variant="primary"
          tone="neutral"
          size="md"
          class="dts-scroll-cue"
          :ariaLabel.prop="'Scroll right'"
          @click.stop="scrollRight"
        ></sgds-icon-button>
      </transition>

      <sgds-icon-button
        name="window-fullscreen"
        variant="primary"
        tone="neutral"
        size="md"
        class="dts-expand-cue"
        :ariaLabel.prop="'Open at full size'"
        @click.stop="openFullscreen"
      ></sgds-icon-button>
    </div>
  </figure>

  <sgds-modal
    :open="fullscreenOpen"
    size="fullscreen"
    @sgds-after-hide="closeFullscreen"
  >
    <div class="dts-fullscreen">
      <div class="dts-zoom-toolbar">
        <sgds-icon-button
          name="zoom-out"
          variant="ghost"
          tone="neutral"
          size="sm"
          :ariaLabel.prop="'Zoom out'"
          :disabled="!canZoomOut"
          @click="zoomOut"
        ></sgds-icon-button>
        <button
          type="button"
          class="dts-zoom-level sgds:text-label-md sgds:font-semibold"
          title="Reset zoom to 100%"
          @click="resetZoom"
        >
          {{ zoomPercent }}
        </button>
        <sgds-icon-button
          name="zoom-in"
          variant="ghost"
          tone="neutral"
          size="sm"
          :ariaLabel.prop="'Zoom in'"
          :disabled="!canZoomIn"
          @click="zoomIn"
        ></sgds-icon-button>
      </div>

      <div class="dts-fullscreen-canvas">
        <div
          class="dts-fullscreen-stage"
          :style="{ '--dts-zoom': zoomLevel }"
          v-html="fullscreenSvg"
        />
      </div>
    </div>
  </sgds-modal>
</template>

<style>
.dts-chart .dts-svg {
  display: block;
  height: auto;
  width: 100%;
}

.dts-viewport {
  position: relative;
}

.dts-scroller {
  background: transparent;
  border: 0;
  border-radius: var(--sgds-border-radius-md);
  color: inherit;
  cursor: zoom-in;
  display: block;
  font: inherit;
  margin: 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0;
  text-align: inherit;
  width: 100%;
}

.dts-scroller:focus-visible {
  outline: var(--sgds-outline-focus);
  outline-offset: var(--sgds-outline-offset-focus);
}

.dts-scroll-cue {
  position: absolute;
  right: var(--sgds-padding-md);
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.dts-expand-cue {
  position: absolute;
  right: var(--sgds-padding-md);
  bottom: var(--sgds-padding-md);
  z-index: 1;
}

.dts-fade-enter-active,
.dts-fade-leave-active {
  transition: opacity 150ms ease-out;
}
.dts-fade-enter-from,
.dts-fade-leave-to {
  opacity: 0;
}

.dts-fullscreen {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
  height: 100%;
  width: 100%;
}

.dts-zoom-toolbar {
  align-items: center;
  align-self: flex-end;
  background: var(--sgds-surface-raised);
  border: var(--sgds-border-width-1) solid var(--sgds-border-default);
  border-radius: var(--sgds-border-radius-full);
  display: inline-flex;
  gap: var(--sgds-text-gap-2-xs);
  padding: var(--sgds-padding-2-xs) var(--sgds-padding-xs);
}

.dts-zoom-level {
  background: transparent;
  border: 0;
  border-radius: var(--sgds-border-radius-sm);
  color: var(--sgds-text-default);
  cursor: pointer;
  min-width: 3rem;
  padding: var(--sgds-padding-2-xs) var(--sgds-padding-xs);
  text-align: center;
}
.dts-zoom-level:hover {
  background: var(--sgds-bg-default);
}

.dts-fullscreen-canvas {
  flex: 1;
  overflow: auto;
  width: 100%;
}

.dts-fullscreen-stage {
  width: calc(100% * var(--dts-zoom, 1));
}

.dts-fullscreen-stage .dts-svg--fullscreen {
  display: block;
  height: auto;
  width: 100%;
}
</style>
