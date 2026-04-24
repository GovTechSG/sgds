<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import PortalNumberedItem from "./PortalNumberedItem.vue";
import type { ThemedImageAsset, AnatomyCallout } from "../../data/component-docs";

type AnatomyPart = {
  number: number;
  title: string;
  note?: string;
};

type CalloutPosition = {
  number: number;
  direction: "left" | "right" | "top" | "bottom";
  badgeLeft: number;
  badgeTop: number;
  strokeLeft: number;
  strokeTop: number;
  strokeWidth: number;
  strokeHeight: number;
};

const props = defineProps<{
  anatomyAsset?: ThemedImageAsset;
  anatomyPreviewMarkup: string;
  anatomyCallouts?: AnatomyCallout[];
  resolvedAnatomyParts: AnatomyPart[];
  numberedListGapClass?: string;
}>();

const anatomyCanvasRef = ref<HTMLElement | null>(null);
const anatomyScaleLayerRef = ref<HTMLElement | null>(null);
const anatomyCalloutPositions = ref<CalloutPosition[]>([]);
// Offset applied to the markup (via transform) and baked into every callout's
// left/top values. Ensures the combined bounding box of component + callouts
// sits at the scale-layer's centre, so the demo box's internal padding wraps
// the whole group symmetrically instead of just the component.
const anatomyGroupOffset = ref<{ x: number; y: number }>({ x: 0, y: 0 });
// Proportional scale applied to the whole anatomy group (component + callouts)
// when the natural content width exceeds the available canvas width. Keeps the
// component's layout intact at narrow widths — instead of the component
// reflowing internally and callouts overflowing, everything shrinks together
// as a single diagram.
const anatomyScale = ref(1);
let resizeObserver: ResizeObserver | null = null;

const getPointOnRect = (
  rect: DOMRect,
  x: "left" | "center" | "right" = "center",
  y: "top" | "center" | "bottom" = "center",
) => {
  const pointX = x === "left" ? rect.left : x === "right" ? rect.right : rect.left + rect.width / 2;
  const pointY = y === "top" ? rect.top : y === "bottom" ? rect.bottom : rect.top + rect.height / 2;
  return { x: pointX, y: pointY };
};

const resolveShadowTarget = (baseTarget: HTMLElement | null, shadowSelector?: string) => {
  if (!baseTarget || !shadowSelector) return baseTarget;

  const selectorChain = shadowSelector
    .split(">>>")
    .map((selector) => selector.trim())
    .filter(Boolean);

  let currentTarget: HTMLElement | null = baseTarget;

  for (const selector of selectorChain) {
    currentTarget = (currentTarget?.shadowRoot?.querySelector(selector) as HTMLElement | null) ?? null;
    if (!currentTarget) return null;
  }

  return currentTarget;
};

const updateCallouts = async () => {
  await nextTick();

  const canvas = anatomyCanvasRef.value;
  const scaleLayer = anatomyScaleLayerRef.value;
  const callouts = props.anatomyCallouts;
  if (!canvas || !scaleLayer || !callouts?.length) {
    anatomyCalloutPositions.value = [];
    anatomyGroupOffset.value = { x: 0, y: 0 };
    anatomyScale.value = 1;
    return;
  }

  // Strip the scale/translate transforms that were applied in the previous
  // pass so getBoundingClientRect returns natural (un-transformed) geometry.
  // Measuring post-transform would compound scale across re-measurements.
  // Also suspend the CSS transition on the scale-layer — without this, the
  // transform change animates over 200 ms and `getBoundingClientRect` during
  // that window returns the interpolated (not-yet-reset) rect, which breaks
  // every downstream coordinate calculation.
  const markupEl = scaleLayer.querySelector(".anatomy-demo-markup") as HTMLElement | null;
  const prevLayerTransition = scaleLayer.style.transition;
  scaleLayer.style.transition = "none";
  scaleLayer.style.transform = "none";
  if (markupEl) markupEl.style.transform = "none";
  // Force a synchronous layout flush so the cleared transforms take effect
  // before we read any rects.
  void scaleLayer.offsetWidth;

  const styles = getComputedStyle(canvas);
  const badgeSize = parseFloat(styles.getPropertyValue("--sgds-dimension-24")) || 24;
  const badgeRadius = badgeSize / 2;
  const canvasRect = canvas.getBoundingClientRect();
  const layerRect = scaleLayer.getBoundingClientRect();

  const basePositions = callouts
    .map((callout) => {
      const baseTarget = scaleLayer.querySelector(callout.targetSelector) as HTMLElement | null;
      const target = resolveShadowTarget(baseTarget, callout.targetShadowSelector);

      if (!target) return null;

      const targetRect = target.getBoundingClientRect();
      const point = getPointOnRect(targetRect, callout.targetX || "center", callout.targetY || "center");
      const stemLength = parseFloat(styles.getPropertyValue(callout.stemLengthToken || "--sgds-dimension-48")) || 48;
      const localX = point.x - layerRect.left + (callout.targetXOffset || 0);
      const localY = point.y - layerRect.top + (callout.targetYOffset || 0);

      if (callout.direction === "right") {
        return { number: callout.number, direction: callout.direction, badgeLeft: localX + stemLength + badgeRadius, badgeTop: localY, strokeLeft: localX, strokeTop: localY, strokeWidth: stemLength, strokeHeight: 0 };
      }
      if (callout.direction === "left") {
        return { number: callout.number, direction: callout.direction, badgeLeft: localX - stemLength - badgeRadius, badgeTop: localY, strokeLeft: localX - stemLength, strokeTop: localY, strokeWidth: stemLength, strokeHeight: 0 };
      }
      if (callout.direction === "top") {
        return { number: callout.number, direction: callout.direction, badgeLeft: localX, badgeTop: localY - stemLength - badgeRadius, strokeLeft: localX, strokeTop: localY - stemLength, strokeWidth: 0, strokeHeight: stemLength };
      }
      return { number: callout.number, direction: callout.direction, badgeLeft: localX, badgeTop: localY + stemLength + badgeRadius, strokeLeft: localX, strokeTop: localY, strokeWidth: 0, strokeHeight: stemLength };
    })
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  const positionByNumber = new Map(basePositions.map((position) => [position.number, position]));

  const alignedPositions = basePositions.map((position) => {
      const sourceCallout = callouts.find((callout) => callout.number === position.number);
      const alignedCalloutNumber = sourceCallout?.alignBadgeWithCallout;

      if (!alignedCalloutNumber) return position;

      const alignedPosition = positionByNumber.get(alignedCalloutNumber);

      if (!alignedPosition) return position;

      if (position.direction === "left") {
        const strokeLeft = alignedPosition.badgeLeft + badgeRadius;
        return {
          ...position,
          badgeLeft: alignedPosition.badgeLeft,
          strokeLeft,
          strokeWidth: Math.max(0, position.strokeLeft + position.strokeWidth - strokeLeft),
        };
      }

      if (position.direction === "right") {
        const strokeRight = alignedPosition.badgeLeft - badgeRadius;
        return {
          ...position,
          badgeLeft: alignedPosition.badgeLeft,
          strokeWidth: Math.max(0, strokeRight - position.strokeLeft),
        };
      }

      return {
        ...position,
        badgeLeft: alignedPosition.badgeLeft,
      };
    });

  // Build the combined bounding box (in layer-local coords) of the markup
  // plus every callout, then work out the offset needed to centre that box
  // inside the scale-layer. The markup gets shifted by the offset via CSS
  // transform, and the offset is baked into every callout's absolute left/top.
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  if (markupEl) {
    const markupRect = markupEl.getBoundingClientRect();
    minX = Math.min(minX, markupRect.left - layerRect.left);
    maxX = Math.max(maxX, markupRect.right - layerRect.left);
    minY = Math.min(minY, markupRect.top - layerRect.top);
    maxY = Math.max(maxY, markupRect.bottom - layerRect.top);
  }

  alignedPositions.forEach((position) => {
    minX = Math.min(minX, position.strokeLeft, position.badgeLeft - badgeRadius);
    maxX = Math.max(maxX, position.strokeLeft + position.strokeWidth, position.badgeLeft + badgeRadius);
    minY = Math.min(minY, position.strokeTop, position.badgeTop - badgeRadius);
    maxY = Math.max(maxY, position.strokeTop + position.strokeHeight, position.badgeTop + badgeRadius);
  });

  const hasBounds = Number.isFinite(minX) && Number.isFinite(minY) && Number.isFinite(maxX) && Number.isFinite(maxY);

  // If the natural content width (component + symmetric callout extensions)
  // exceeds the canvas width, scale the whole group down proportionally so
  // the diagram shrinks as a unit instead of the component reflowing while
  // callouts overflow. Never scale up.
  const naturalWidth = hasBounds ? maxX - minX : 0;
  const availableWidth = canvasRect.width;
  anatomyScale.value = naturalWidth > 0 && naturalWidth > availableWidth
    ? availableWidth / naturalWidth
    : 1;

  const groupOffsetX = hasBounds ? layerRect.width / 2 - (minX + maxX) / 2 : 0;
  const groupOffsetY = hasBounds ? layerRect.height / 2 - (minY + maxY) / 2 : 0;

  anatomyGroupOffset.value = { x: groupOffsetX, y: groupOffsetY };
  anatomyCalloutPositions.value = alignedPositions.map((position) => ({
    ...position,
    badgeLeft: position.badgeLeft + groupOffsetX,
    badgeTop: position.badgeTop + groupOffsetY,
    strokeLeft: position.strokeLeft + groupOffsetX,
    strokeTop: position.strokeTop + groupOffsetY,
  }));

  // Restore the CSS transition we suspended for measurement. Vue's next patch
  // will write the new `transform` value; that write now animates smoothly
  // (0.2 s ease) because the transition is back in place.
  scaleLayer.style.transition = prevLayerTransition;
};

onMounted(() => {
  void updateCallouts();

  resizeObserver = new ResizeObserver(() => {
    void updateCallouts();
  });

  if (anatomyCanvasRef.value) {
    resizeObserver.observe(anatomyCanvasRef.value);
  }

  window.addEventListener("resize", updateCallouts);
});

watch(() => props.anatomyCallouts, () => {
  void updateCallouts();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  window.removeEventListener("resize", updateCallouts);
});
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xl)]">
    <div class="sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:px-component-lg sgds:py-component-lg sgds:max-md:px-component-md sgds:max-md:py-component-md">
      <div class="sgds:flex sgds:items-center sgds:justify-center sgds:relative sgds:w-full">
        <template v-if="anatomyAsset">
          <img
            class="sgds:block sgds:h-auto sgds:max-w-full sgds:w-[min(100%,var(--sgds-dimension-512))] anatomy-image-light"
            :src="anatomyAsset.lightSrc"
            :alt="anatomyAsset.alt"
          />
          <img
            class="sgds:hidden sgds:block sgds:h-auto sgds:max-w-full sgds:w-[min(100%,var(--sgds-dimension-512))] anatomy-image-dark"
            :src="anatomyAsset.darkSrc"
            :alt="`${anatomyAsset.alt} in dark mode`"
          />
        </template>
        <div
          v-else
          ref="anatomyCanvasRef"
          class="sgds:flex sgds:items-center sgds:justify-center sgds:mx-auto sgds:max-w-[var(--sgds-dimension-688)] sgds:min-h-[var(--sgds-dimension-320)] sgds:relative sgds:w-full"
        >
          <div
            ref="anatomyScaleLayerRef"
            class="anatomy-scale-layer sgds:absolute sgds:inset-0 sgds:flex sgds:items-center sgds:justify-center"
            :style="{ transform: `scale(${anatomyScale})`, transformOrigin: 'center center' }"
          >
            <div
              class="anatomy-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full"
              :style="{ transform: `translate(${anatomyGroupOffset.x}px, ${anatomyGroupOffset.y}px)` }"
              v-html="anatomyPreviewMarkup"
            ></div>
            <span
              v-for="callout in anatomyCalloutPositions"
              :key="`stroke-${callout.number}`"
              :class="[
                'sgds:bg-[var(--sgds-border-color-default)] sgds:pointer-events-none sgds:absolute',
                callout.direction === 'left' || callout.direction === 'right'
                  ? 'sgds:h-[var(--sgds-border-width-1)] sgds:-translate-y-1/2'
                  : 'sgds:-translate-x-1/2 sgds:w-[var(--sgds-border-width-1)]',
              ]"
              :style="{
                left: `${callout.strokeLeft}px`,
                top: `${callout.strokeTop}px`,
                width: callout.strokeWidth ? `${callout.strokeWidth}px` : undefined,
                height: callout.strokeHeight ? `${callout.strokeHeight}px` : undefined,
              }"
            ></span>
            <span
              v-for="callout in anatomyCalloutPositions"
              :key="`badge-${callout.number}`"
              class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:bg-surface-inverse sgds:rounded-full sgds:text-inverse sgds:text-label-xs sgds:font-regular sgds:leading-3-xs sgds:tracking-normal sgds:pointer-events-none sgds:absolute sgds:-translate-x-1/2 sgds:-translate-y-1/2 sgds:w-6 sgds:h-6 sgds:z-[1]"
              :style="{ left: `${callout.badgeLeft}px`, top: `${callout.badgeTop}px` }"
            >
              {{ callout.number }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="sgds:grid sgds:grid-cols-2 sgds:max-lg:grid-cols-1 sgds:gap-text-md">
      <PortalNumberedItem
        v-for="part in resolvedAnatomyParts"
        :key="part.number"
        :number="part.number"
        :title="part.title"
        :note="part.note"
      />
    </div>
  </div>
</template>

<style>
/* Dark theme image switching — requires global class selector */
.sgds-night-theme .anatomy-image-light { display: none; }
.sgds-night-theme .anatomy-image-dark { display: block !important; }

/* Scale-layer wrapping the anatomy markup + callouts. Scaled as a single
   unit so the component and its callouts shrink together when the canvas
   width is too narrow to fit the natural diagram (component + stem/badge
   extensions). Transition is applied here — not on the inner markup — so the
   whole group animates in sync. */
.anatomy-scale-layer {
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .anatomy-scale-layer {
    transition: none;
  }
}

/* Global selectors targeting slotted web component elements in v-html markup */
/* Anatomy previews are informational only — pointer events are disabled on the
   wrapper so no descendant `<sgds-*>` component can be toggled, clicked, hovered
   or focused from the anatomy canvas. The anatomy canvas is a reference diagram,
   not a live component playground. */
.anatomy-demo-markup {
  pointer-events: none;
}

.anatomy-demo-markup > sgds-accordion {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  display: block;
  overflow: hidden;
  width: 100%;
}

.anatomy-demo-markup > sgds-alert {
  display: block;
  max-width: var(--sgds-dimension-512);
  width: 100%;
}

.anatomy-demo-markup sgds-alert-link {
  vertical-align: baseline;
}
</style>
