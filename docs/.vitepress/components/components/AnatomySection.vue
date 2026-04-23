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
const anatomyCalloutPositions = ref<CalloutPosition[]>([]);
// Offset applied to the markup (via transform) and baked into every callout's
// left/top values. Ensures the combined bounding box of component + callouts
// sits at the canvas's centre, so the demo box's internal padding wraps the
// whole group symmetrically instead of just the component.
const anatomyGroupOffset = ref<{ x: number; y: number }>({ x: 0, y: 0 });
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

const updateCallouts = async () => {
  await nextTick();

  const canvas = anatomyCanvasRef.value;
  const callouts = props.anatomyCallouts;
  if (!canvas || !callouts?.length) {
    anatomyCalloutPositions.value = [];
    anatomyGroupOffset.value = { x: 0, y: 0 };
    return;
  }

  const styles = getComputedStyle(canvas);
  const badgeSize = parseFloat(styles.getPropertyValue("--sgds-dimension-24")) || 24;
  const badgeRadius = badgeSize / 2;
  const canvasRect = canvas.getBoundingClientRect();

  // The markup carries a translate transform from the previous pass; its rect
  // (and every descendant target rect) is therefore shifted by the stored
  // offset. Subtract it to work in "natural" coordinates and avoid cumulative
  // drift across re-measurements.
  const currentOffsetX = anatomyGroupOffset.value.x;
  const currentOffsetY = anatomyGroupOffset.value.y;

  const basePositions = callouts
    .map((callout) => {
      const baseTarget = canvas.querySelector(callout.targetSelector) as HTMLElement | null;
      const target = callout.targetShadowSelector
        ? ((baseTarget as HTMLElement | null)?.shadowRoot?.querySelector(callout.targetShadowSelector) as HTMLElement | null)
        : baseTarget;

      if (!target) return null;

      const targetRect = target.getBoundingClientRect();
      const point = getPointOnRect(targetRect, callout.targetX || "center", callout.targetY || "center");
      const stemLength = parseFloat(styles.getPropertyValue(callout.stemLengthToken || "--sgds-dimension-48")) || 48;
      const localX = point.x - canvasRect.left - currentOffsetX + (callout.targetXOffset || 0);
      const localY = point.y - canvasRect.top - currentOffsetY + (callout.targetYOffset || 0);

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

  // Build the combined bounding box (in natural canvas-local coords) of the
  // markup plus every callout, then work out the offset needed to centre that
  // box inside the canvas. The markup gets shifted by the offset via CSS
  // transform, and the offset is baked into every callout's absolute left/top.
  const markupEl = canvas.querySelector(".anatomy-demo-markup") as HTMLElement | null;
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  if (markupEl) {
    const markupRect = markupEl.getBoundingClientRect();
    minX = Math.min(minX, markupRect.left - canvasRect.left - currentOffsetX);
    maxX = Math.max(maxX, markupRect.right - canvasRect.left - currentOffsetX);
    minY = Math.min(minY, markupRect.top - canvasRect.top - currentOffsetY);
    maxY = Math.max(maxY, markupRect.bottom - canvasRect.top - currentOffsetY);
  }

  alignedPositions.forEach((position) => {
    minX = Math.min(minX, position.strokeLeft, position.badgeLeft - badgeRadius);
    maxX = Math.max(maxX, position.strokeLeft + position.strokeWidth, position.badgeLeft + badgeRadius);
    minY = Math.min(minY, position.strokeTop, position.badgeTop - badgeRadius);
    maxY = Math.max(maxY, position.strokeTop + position.strokeHeight, position.badgeTop + badgeRadius);
  });

  const hasBounds = Number.isFinite(minX) && Number.isFinite(minY) && Number.isFinite(maxX) && Number.isFinite(maxY);
  const groupOffsetX = hasBounds ? canvasRect.width / 2 - (minX + maxX) / 2 : 0;
  const groupOffsetY = hasBounds ? canvasRect.height / 2 - (minY + maxY) / 2 : 0;

  anatomyGroupOffset.value = { x: groupOffsetX, y: groupOffsetY };
  anatomyCalloutPositions.value = alignedPositions.map((position) => ({
    ...position,
    badgeLeft: position.badgeLeft + groupOffsetX,
    badgeTop: position.badgeTop + groupOffsetY,
    strokeLeft: position.strokeLeft + groupOffsetX,
    strokeTop: position.strokeTop + groupOffsetY,
  }));
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
    <div class="sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:px-component-lg sgds:py-component-lg max-md:sgds:px-component-md max-md:sgds:py-component-md">
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

    <div class="sgds:grid sgds:grid-cols-2 sgds:gap-x-8 sgds:gap-y-4 sgds:max-lg:grid-cols-1">
      <div :class="['sgds:flex sgds:flex-col', numberedListGapClass || 'sgds:gap-[var(--sgds-gap-md)]']">
        <PortalNumberedItem
          v-for="part in resolvedAnatomyParts.slice(0, Math.ceil(resolvedAnatomyParts.length / 2))"
          :key="part.number"
          :number="part.number"
          :title="part.title"
          :note="part.note"
        />
      </div>
      <div :class="['sgds:flex sgds:flex-col', numberedListGapClass || 'sgds:gap-[var(--sgds-gap-md)]']">
        <PortalNumberedItem
          v-for="part in resolvedAnatomyParts.slice(Math.ceil(resolvedAnatomyParts.length / 2))"
          :key="part.number"
          :number="part.number"
          :title="part.title"
          :note="part.note"
        />
      </div>
    </div>
  </div>
</template>

<style>
/* Dark theme image switching — requires global class selector */
.sgds-night-theme .anatomy-image-light { display: none; }
.sgds-night-theme .anatomy-image-dark { display: block !important; }

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
