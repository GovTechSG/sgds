<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
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
// Canvas grows to fit content when the markup + callouts are taller than the
// default 320 px floor. Without this the dp anatomy mockup (~344 px) overflows
// the canvas and visually escapes the demo box.
const anatomyCanvasMinHeight = ref<number | null>(null);
let resizeObserver: ResizeObserver | null = null;

const anatomyPartColumns = computed(() => {
  const parts = props.resolvedAnatomyParts ?? [];
  const midpoint = Math.ceil(parts.length / 2);
  return [
    parts.slice(0, midpoint),
    parts.slice(midpoint),
  ].filter((column) => column.length > 0);
});

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
    const measuredMarkupTarget = markupEl.children.length === 1
      ? (markupEl.firstElementChild as HTMLElement | null) ?? markupEl
      : markupEl;
    const markupRect = measuredMarkupTarget.getBoundingClientRect();
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
  // Skip the update when the canvas hasn't been laid out yet — measuring
  // against a zero-width canvas collapses scale to 0 and leaves the diagram
  // invisible until the next mutation. Restore the transition we suspended
  // for measurement so future updates animate normally.
  if (availableWidth <= 0) {
    scaleLayer.style.transition = prevLayerTransition;
    return;
  }
  anatomyScale.value = naturalWidth > 0 && naturalWidth > availableWidth
    ? availableWidth / naturalWidth
    : 1;

  const groupOffsetX = 0;
  const groupOffsetY = 0;

  // Grow the canvas to fit content + callouts when the natural height (after
  // any width-based scaling) exceeds the 320 px default. Padding ensures the
  // top/bottom badges aren't flush against the box edge. Below 320 px we keep
  // the class-based min-h-320 floor by leaving the inline style unset.
  const naturalHeight = hasBounds ? maxY - minY : 0;
  const scaledHeight = naturalHeight * anatomyScale.value;
  const verticalPadding = 80;
  const computedMinHeight = scaledHeight > 0 ? Math.ceil(scaledHeight + verticalPadding) : 0;
  anatomyCanvasMinHeight.value = computedMinHeight > 320 ? computedMinHeight : null;

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

// Inject CSS into a Lit element's shadow root. Used to override popover-style
// rules (position: absolute, z-index, box-shadow) so the dropdown menus render
// inline within anatomy diagrams instead of escaping the demo box.
const injectShadowStyles = (host: HTMLElement, id: string, css: string) => {
  const root = host.shadowRoot;
  if (!root) return;
  if (root.querySelector(`style[data-anatomy-style="${id}"]`)) return;
  const style = document.createElement("style");
  style.setAttribute("data-anatomy-style", id);
  style.textContent = css;
  root.appendChild(style);
};

// Components like sgds-combo-box and sgds-datepicker only show their dropdown
// menu after a click interaction; for anatomy diagrams we need it open from
// the start. We open the menu after any pending render + click events settle,
// then re-open it on any subsequent close so it stays anchored open while the
// user is on the anatomy view.
const openAnatomyDropdowns = async () => {
  await nextTick();
  const root = anatomyCanvasRef.value;
  if (!root) return;

  // Datepickers — open the calendar and force its dropdown menu to render
  // inline (position: relative, no shadow) so it sits inside the canvas.
  const datepickers = Array.from(
    root.querySelectorAll("sgds-datepicker") as NodeListOf<HTMLElement & {
      showMenu?: () => Promise<void> | void;
      hideMenu?: (isOutside?: boolean) => void;
      menuIsOpen?: boolean;
      updateComplete?: Promise<unknown>;
      _handleClickOutOfElement?: (e: Event) => void;
      _handleCloseMenu?: () => void;
      _handleOpenMenu?: () => void;
    }>,
  );
  for (const el of datepickers) {
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    injectShadowStyles(
      el,
      "datepicker-inline-menu",
      `:host {
         display: inline-block;
         width: var(--sgds-dimension-320);
       }
       .datepicker-container {
         flex-wrap: wrap !important;
       }
       :host([menuisopen]:not([disabled]):not([readonly])) .dropdown-menu {
         position: relative !important;
         inset: auto !important;
         transform: none !important;
         box-shadow: none !important;
         border: var(--sgds-border-width-1) solid var(--sgds-border-color-default) !important;
         margin-top: var(--sgds-margin-2-xs) !important;
         z-index: auto !important;
         max-height: none !important;
         flex-basis: 100% !important;
       }
       .datepicker-input-container { pointer-events: none; }
       sgds-icon-button { pointer-events: none; }`,
    );
    // Detach the document-level outside-click listener so the menu can't
    // close when the user clicks elsewhere on the page (e.g. configuration
    // demo controls). Without this, an outside click triggers hideMenu →
    // input.focus() → page scrolls back to the anatomy section.
    if (el._handleClickOutOfElement) {
      document.removeEventListener("click", el._handleClickOutOfElement);
    }
    // Replace sgds-show / sgds-hide handlers that focus the input/calendar
    // — those calls scroll the anatomy datepicker into view whenever any
    // click on the page settles, hijacking the user's scroll position.
    if (el._handleCloseMenu) {
      el.removeEventListener("sgds-hide", el._handleCloseMenu as EventListener);
    }
    if (el._handleOpenMenu) {
      el.removeEventListener("sgds-show", el._handleOpenMenu as EventListener);
    }
    // Make hideMenu a no-op so toggleMenu/keyboard escape can't close it
    // either; the calendar must stay open for the anatomy diagram.
    el.hideMenu = () => {};
    const open = async () => {
      if (typeof el.showMenu === "function" && !el.menuIsOpen) {
        try { await el.showMenu(); } catch { /* noop */ }
      }
    };
    // Wait one frame for any pending click-handler microtasks to settle
    // before opening so our show isn't immediately undone.
    await new Promise<void>((resolve) => setTimeout(resolve, 200));
    await open();
  }

  const comboBoxes = Array.from(
    root.querySelectorAll("sgds-combo-box") as NodeListOf<HTMLElement & {
      showMenu?: () => Promise<void> | void;
      menuIsOpen?: boolean;
      displayValue?: string;
      updateComplete?: Promise<unknown>;
      shadowRoot?: ShadowRoot | null;
    }>,
  );
  for (const el of comboBoxes) {
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    (el as HTMLElement & {
      noFlip?: boolean;
      drop?: string;
      floatingOpts?: { placement?: string; middleware?: unknown[] };
    }).noFlip = true;
    (el as HTMLElement & { drop?: string }).drop = "down";
    const displayValue = el.getAttribute("data-anatomy-display-value");
    const waitForAfterShow = () =>
      new Promise<void>((resolve) => {
        const handleAfterShow = () => {
          el.removeEventListener("sgds-after-show", handleAfterShow as EventListener);
          resolve();
        };
        el.addEventListener("sgds-after-show", handleAfterShow as EventListener, { once: true });
      });
    const open = async () => {
      if (typeof el.showMenu === "function" && !el.menuIsOpen) {
        try {
          const afterShow = waitForAfterShow();
          await el.showMenu();
          await afterShow;
          await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        } catch { /* noop */ }
      }
    };
    await open();
    if (displayValue) {
      el.displayValue = displayValue;
      await el.updateComplete;
      const input = el.shadowRoot?.querySelector("input.form-control") as HTMLInputElement | null;
      if (input) input.value = displayValue;
    }
    el.addEventListener("sgds-after-hide", () => {
      void open().then(() => updateCallouts());
    });
  }

  const tooltips = Array.from(
    root.querySelectorAll("sgds-tooltip") as NodeListOf<HTMLElement & {
      open?: boolean;
      show?: () => Promise<void> | void;
      updateComplete?: Promise<unknown>;
    }>,
  );
  for (const el of tooltips) {
    await customElements.whenDefined(el.localName);
    el.open = true;
    await el.updateComplete;
    injectShadowStyles(
      el,
      "tooltip-inline-anatomy",
      `:host {
         display: inline-flex !important;
       }
       .tooltip-placeholder {
         align-items: center !important;
         display: inline-flex !important;
         justify-content: center !important;
         max-width: none !important;
       }
       .tooltip-placeholder slot {
         display: none !important;
       }
       .tooltip {
         left: auto !important;
         position: static !important;
         top: auto !important;
         visibility: visible !important;
       }`,
    );
    if (typeof el.show === "function") {
      try { await el.show(); } catch { /* noop */ }
    }
  }
  await nextTick();
  void updateCallouts();
};

onMounted(() => {
  void updateCallouts();
  void openAnatomyDropdowns();

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
          :style="anatomyCanvasMinHeight ? { minHeight: `${anatomyCanvasMinHeight}px` } : undefined"
        >
          <div
            ref="anatomyScaleLayerRef"
            class="anatomy-scale-layer sgds:absolute sgds:inset-0 sgds:flex sgds:items-center sgds:justify-center"
            :style="{ transform: `scale(${anatomyScale})`, transformOrigin: 'center center' }"
          >
            <div
              class="anatomy-demo-markup sgds:inline-flex sgds:items-center sgds:justify-center sgds:min-w-0"
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
      <div
        v-for="(column, columnIndex) in anatomyPartColumns"
        :key="`anatomy-column-${columnIndex}`"
        class="sgds:flex sgds:flex-col sgds:gap-text-md"
      >
        <PortalNumberedItem
          v-for="part in column"
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
