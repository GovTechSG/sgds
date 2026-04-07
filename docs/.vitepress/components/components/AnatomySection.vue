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
}>();

const anatomyCanvasRef = ref<HTMLElement | null>(null);
const anatomyCalloutPositions = ref<CalloutPosition[]>([]);
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
    return;
  }

  const styles = getComputedStyle(canvas);
  const badgeSize = parseFloat(styles.getPropertyValue("--sgds-dimension-24")) || 24;
  const badgeRadius = badgeSize / 2;
  const canvasRect = canvas.getBoundingClientRect();

  anatomyCalloutPositions.value = callouts
    .map((callout) => {
      const baseTarget = canvas.querySelector(callout.targetSelector) as HTMLElement | null;
      const target = callout.targetShadowSelector
        ? ((baseTarget as HTMLElement | null)?.shadowRoot?.querySelector(callout.targetShadowSelector) as HTMLElement | null)
        : baseTarget;

      if (!target) return null;

      const targetRect = target.getBoundingClientRect();
      const point = getPointOnRect(targetRect, callout.targetX || "center", callout.targetY || "center");
      const stemLength = parseFloat(styles.getPropertyValue(callout.stemLengthToken || "--sgds-dimension-48")) || 48;
      const localX = point.x - canvasRect.left;
      const localY = point.y - canvasRect.top;

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
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <div class="sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:p-component-md">
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
          <div class="anatomy-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="anatomyPreviewMarkup"></div>
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
      <div class="sgds:flex sgds:flex-col sgds:gap-component-sm">
        <PortalNumberedItem
          v-for="part in resolvedAnatomyParts.slice(0, Math.ceil(resolvedAnatomyParts.length / 2))"
          :key="part.number"
          :number="part.number"
          :title="part.title"
          :note="part.note"
        />
      </div>
      <div class="sgds:flex sgds:flex-col sgds:gap-component-sm">
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
.anatomy-demo-markup > sgds-accordion {
  background: var(--sgds-surface-default);
  display: block;
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
