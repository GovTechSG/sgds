<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import PortalNumberedItem from "./PortalNumberedItem.vue";
import SegmentedControl from "./SegmentedControl.vue";
import type { ThemedImageAsset, AnatomyCallout, AnatomyVariant } from "../../data/component-docs";

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
  anatomyVariants?: AnatomyVariant[];
  anatomyCallouts?: AnatomyCallout[];
  resolvedAnatomyParts: AnatomyPart[];
  numberedListGapClass?: string;
}>();

const selectedAnatomyVariant = ref(props.anatomyVariants?.[0]?.value ?? "");
const anatomyCanvasRef = ref<HTMLElement | null>(null);
const anatomyScaleLayerRef = ref<HTMLElement | null>(null);
const anatomyCalloutPositions = ref<CalloutPosition[]>([]);
// Offset applied to the markup (via transform) and baked into every callout's
// left/top values. Ensures the combined bounding box of component + callouts
// sits at the scale-layer's centre, so the demo box's internal padding wraps
// the whole group symmetrically instead of just the component.
const anatomyGroupOffset = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const anatomyScaleOrigin = ref<{ x: number; y: number }>({ x: 0, y: 0 });
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

const anatomyVariantOptions = computed(() =>
  (props.anatomyVariants ?? []).map((variant) => ({
    value: variant.value,
    label: variant.label,
  })),
);

const activeAnatomyVariant = computed(() => {
  const variants = props.anatomyVariants ?? [];
  return variants.find((variant) => variant.value === selectedAnatomyVariant.value) ?? variants[0] ?? null;
});

const activeAnatomyMarkup = computed(() =>
  activeAnatomyVariant.value?.markup ?? props.anatomyPreviewMarkup,
);

const isWideAnatomy = computed(() =>
  activeAnatomyMarkup.value.includes("portal-footer-anatomy") ||
  activeAnatomyMarkup.value.includes("portal-anatomy-datepicker") ||
  activeAnatomyMarkup.value.includes("portal-anatomy-masthead") ||
  activeAnatomyMarkup.value.includes("portal-anatomy-sidebar") ||
  activeAnatomyMarkup.value.includes("portal-anatomy-subnav") ||
  activeAnatomyMarkup.value.includes("portal-anatomy-system-banner"),
);

const isSidebarAnatomy = computed(() =>
  activeAnatomyMarkup.value.includes("portal-anatomy-sidebar"),
);

const isSidenavAnatomy = computed(() =>
  activeAnatomyMarkup.value.includes("portal-sidenav-anatomy-demo"),
);

const isSystemBannerAnatomy = computed(() =>
  activeAnatomyMarkup.value.includes("portal-anatomy-system-banner"),
);

const activeAnatomyCallouts = computed(() =>
  activeAnatomyVariant.value?.callouts ?? props.anatomyCallouts,
);

const buildAnatomyParts = (parts: AnatomyVariant["parts"]) =>
  parts.map((part, index) => ({
    number: index + 1,
    ...part,
  }));

const activeResolvedAnatomyParts = computed(() =>
  activeAnatomyVariant.value
    ? buildAnatomyParts(activeAnatomyVariant.value.parts)
    : props.resolvedAnatomyParts,
);

const anatomyPartColumns = computed(() => {
  const parts = activeResolvedAnatomyParts.value ?? [];
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

const alignCalloutBadges = (positions: CalloutPosition[], badgeRadius: number) => {
  const leftColumn = Math.min(...positions.filter((position) => position.direction === "left").map((position) => position.badgeLeft));
  const rightColumn = Math.max(...positions.filter((position) => position.direction === "right").map((position) => position.badgeLeft));
  const topRow = Math.min(...positions.filter((position) => position.direction === "top").map((position) => position.badgeTop));
  const bottomRow = Math.max(...positions.filter((position) => position.direction === "bottom").map((position) => position.badgeTop));

  return positions.map((position) => {
    if (position.direction === "left" && Number.isFinite(leftColumn)) {
      const targetX = position.strokeLeft + position.strokeWidth;
      const strokeLeft = leftColumn + badgeRadius;
      return {
        ...position,
        badgeLeft: leftColumn,
        strokeLeft,
        strokeWidth: Math.max(0, targetX - strokeLeft),
      };
    }

    if (position.direction === "right" && Number.isFinite(rightColumn)) {
      return {
        ...position,
        badgeLeft: rightColumn,
        strokeWidth: Math.max(0, rightColumn - badgeRadius - position.strokeLeft),
      };
    }

    if (position.direction === "top" && Number.isFinite(topRow)) {
      const targetY = position.strokeTop + position.strokeHeight;
      const strokeTop = topRow + badgeRadius;
      return {
        ...position,
        badgeTop: topRow,
        strokeTop,
        strokeHeight: Math.max(0, targetY - strokeTop),
      };
    }

    if (position.direction === "bottom" && Number.isFinite(bottomRow)) {
      return {
        ...position,
        badgeTop: bottomRow,
        strokeHeight: Math.max(0, bottomRow - badgeRadius - position.strokeTop),
      };
    }

    return position;
  });
};

const updateCallouts = async () => {
  await nextTick();

  const canvas = anatomyCanvasRef.value;
  const scaleLayer = anatomyScaleLayerRef.value;
  const callouts = activeAnatomyCallouts.value;
  if (!canvas || !scaleLayer || !callouts?.length) {
    anatomyCalloutPositions.value = [];
    anatomyGroupOffset.value = { x: 0, y: 0 };
    anatomyScaleOrigin.value = { x: 0, y: 0 };
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
  const visibleCanvasWidth = Math.max(
    0,
    Math.min(canvasRect.right, window.innerWidth) - Math.max(canvasRect.left, 0),
  );
  const availableCanvasWidth = visibleCanvasWidth > 0
    ? Math.min(canvasRect.width, visibleCanvasWidth)
    : canvasRect.width;
  const layerRect = scaleLayer.getBoundingClientRect();
  const visibleCanvasCenterX = (Math.max(canvasRect.left, 0) + Math.min(canvasRect.right, window.innerWidth)) / 2;
  const scaleOriginX = visibleCanvasWidth > 0
    ? visibleCanvasCenterX - layerRect.left
    : layerRect.width / 2;
  const scaleOriginY = layerRect.height / 2;
  const measuredMarkupTarget = markupEl?.children.length === 1
    ? (markupEl.firstElementChild as HTMLElement | null) ?? markupEl
    : markupEl;
  const markupRect = measuredMarkupTarget?.getBoundingClientRect();
  const componentBounds = markupRect
    ? {
        minX: markupRect.left - layerRect.left,
        maxX: markupRect.right - layerRect.left,
        minY: markupRect.top - layerRect.top,
        maxY: markupRect.bottom - layerRect.top,
      }
    : null;

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
        const badgeLeft = Math.max(localX + stemLength + badgeRadius, (componentBounds?.maxX ?? localX) + badgeRadius);
        return { number: callout.number, direction: callout.direction, badgeLeft, badgeTop: localY, strokeLeft: localX, strokeTop: localY, strokeWidth: Math.max(0, badgeLeft - badgeRadius - localX), strokeHeight: 0 };
      }
      if (callout.direction === "left") {
        const badgeLeft = Math.min(localX - stemLength - badgeRadius, (componentBounds?.minX ?? localX) - badgeRadius);
        const strokeLeft = badgeLeft + badgeRadius;
        return { number: callout.number, direction: callout.direction, badgeLeft, badgeTop: localY, strokeLeft, strokeTop: localY, strokeWidth: Math.max(0, localX - strokeLeft), strokeHeight: 0 };
      }
      if (callout.direction === "top") {
        const badgeTop = Math.min(localY - stemLength - badgeRadius, (componentBounds?.minY ?? localY) - badgeRadius);
        const strokeTop = badgeTop + badgeRadius;
        return { number: callout.number, direction: callout.direction, badgeLeft: localX, badgeTop, strokeLeft: localX, strokeTop, strokeWidth: 0, strokeHeight: Math.max(0, localY - strokeTop) };
      }
      const badgeTop = Math.max(localY + stemLength + badgeRadius, (componentBounds?.maxY ?? localY) + badgeRadius);
      return { number: callout.number, direction: callout.direction, badgeLeft: localX, badgeTop, strokeLeft: localX, strokeTop: localY, strokeWidth: 0, strokeHeight: Math.max(0, badgeTop - badgeRadius - localY) };
    })
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  const positionByNumber = new Map(basePositions.map((position) => [position.number, position]));

  const manuallyAlignedPositions = basePositions.map((position) => {
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

  // Keep callout labels tidy across every anatomy diagram:
  // left/right badges share side columns, while top/bottom badges share rows.
  const alignedPositions = alignCalloutBadges(manuallyAlignedPositions, badgeRadius);

  // Build the combined bounding box (in layer-local coords) of the markup
  // plus every callout, then work out the offset needed to centre that box
  // inside the scale-layer. The markup gets shifted by the offset via CSS
  // transform, and the offset is baked into every callout's absolute left/top.
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  if (componentBounds) {
    minX = Math.min(minX, componentBounds.minX);
    maxX = Math.max(maxX, componentBounds.maxX);
    minY = Math.min(minY, componentBounds.minY);
    maxY = Math.max(maxY, componentBounds.maxY);
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
  const naturalHeight = hasBounds ? maxY - minY : 0;
  const compactSidePadding = 12;
  const comfortableSidePadding = 24;
  const comfortableAvailableWidth = Math.max(0, availableCanvasWidth - comfortableSidePadding * 2);
  const compactAvailableWidth = Math.max(0, availableCanvasWidth - compactSidePadding * 2);
  // Skip the update when the canvas hasn't been laid out yet — measuring
  // against a zero-width canvas collapses scale to 0 and leaves the diagram
  // invisible until the next mutation. Restore the transition we suspended
  // for measurement so future updates animate normally.
  if (availableCanvasWidth <= 0) {
    scaleLayer.style.transition = prevLayerTransition;
    return;
  }

  if (isSidebarAnatomy.value && hasBounds && availableCanvasWidth < 640) {
    const mobilePadding = 16;
    const mobileAvailableWidth = Math.max(0, availableCanvasWidth - mobilePadding * 2);
    const mobileScale = naturalWidth > mobileAvailableWidth
      ? Math.max(0.1, mobileAvailableWidth / naturalWidth)
      : 1;
    const groupOffsetX = mobilePadding / mobileScale - minX;
    const groupOffsetY = mobilePadding / mobileScale - minY;
    const scaledHeight = naturalHeight * mobileScale;

    anatomyScale.value = mobileScale;
    anatomyScaleOrigin.value = { x: 0, y: 0 };
    anatomyGroupOffset.value = { x: groupOffsetX, y: groupOffsetY };
    anatomyCanvasMinHeight.value = Math.max(320, Math.ceil(scaledHeight + mobilePadding * 2));
    anatomyCalloutPositions.value = alignedPositions.map((position) => ({
      ...position,
      badgeLeft: position.badgeLeft + groupOffsetX,
      badgeTop: position.badgeTop + groupOffsetY,
      strokeLeft: position.strokeLeft + groupOffsetX,
      strokeTop: position.strokeTop + groupOffsetY,
    }));
    scaleLayer.style.transition = prevLayerTransition;
    return;
  }

  const availableWidth = naturalWidth <= comfortableAvailableWidth
    ? comfortableAvailableWidth
    : compactAvailableWidth;
  anatomyScale.value = naturalWidth > 0 && naturalWidth > availableWidth
    ? Math.max(0.1, availableWidth / naturalWidth)
    : 1;

  const boundsCenterX = hasBounds ? minX + naturalWidth / 2 : layerRect.width / 2;
  const boundsCenterY = hasBounds ? minY + naturalHeight / 2 : layerRect.height / 2;
  const groupOffsetX = scaleOriginX - boundsCenterX;
  const groupOffsetY = scaleOriginY - boundsCenterY;

  // Grow the canvas to fit content + callouts when the natural height (after
  // any width-based scaling) exceeds the 320 px default. Padding ensures the
  // top/bottom badges aren't flush against the box edge. Below 320 px we keep
  // the class-based min-h-320 floor by leaving the inline style unset.
  const scaledHeight = naturalHeight * anatomyScale.value;
  const verticalPadding = availableCanvasWidth < 520 ? 48 : 80;
  const computedMinHeight = scaledHeight > 0 ? Math.ceil(scaledHeight + verticalPadding) : 0;
  anatomyCanvasMinHeight.value = computedMinHeight > 320 ? computedMinHeight : null;

  anatomyGroupOffset.value = { x: groupOffsetX, y: groupOffsetY };
  anatomyScaleOrigin.value = { x: scaleOriginX, y: scaleOriginY };
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

  const selects = Array.from(
    root.querySelectorAll(".portal-anatomy-select") as NodeListOf<HTMLElement & {
      showMenu?: () => Promise<void> | void;
      hideMenu?: (isOutside?: boolean) => void;
      menuIsOpen?: boolean;
      updateComplete?: Promise<unknown>;
      _handleClickOutOfElement?: (e: Event) => void;
      _handleCloseMenu?: () => void;
      noFlip?: boolean;
      drop?: string;
    }>,
  );
  for (const el of selects) {
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    injectShadowStyles(
      el,
      "select-inline-anatomy",
      `:host {
         display: inline-block !important;
         pointer-events: none !important;
         width: var(--sgds-dimension-320) !important;
       }
       .select {
         overflow: visible !important;
       }
       .form-control-group {
         pointer-events: none !important;
       }
       .dropdown-menu {
         display: block !important;
         left: auto !important;
         max-height: none !important;
         position: relative !important;
         top: auto !important;
         transform: none !important;
         z-index: auto !important;
       }`,
    );
    if (el._handleClickOutOfElement) {
      document.removeEventListener("click", el._handleClickOutOfElement);
    }
    if (el._handleCloseMenu) {
      el.removeEventListener("sgds-hide", el._handleCloseMenu as EventListener);
    }
    el.noFlip = true;
    el.drop = "down";
    el.hideMenu = () => {};
    const open = async () => {
      if (typeof el.showMenu === "function" && !el.menuIsOpen) {
        try { await el.showMenu(); } catch { /* noop */ }
      }
    };
    await open();
    el.addEventListener("sgds-after-hide", () => {
      void open().then(() => updateCallouts());
    });
  }

  const dropdowns = Array.from(
    root.querySelectorAll(".portal-anatomy-dropdown") as NodeListOf<HTMLElement & {
      showMenu?: () => Promise<void> | void;
      hideMenu?: (isOutside?: boolean) => void;
      menuIsOpen?: boolean;
      updateComplete?: Promise<unknown>;
      _handleClickOutOfElement?: (e: Event) => void;
      _handleCloseMenu?: () => void;
    }>,
  );
  for (const el of dropdowns) {
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    injectShadowStyles(
      el,
      "dropdown-inline-anatomy",
      `:host {
         display: inline-block !important;
       }
       .dropdown {
         align-items: flex-start !important;
         flex-direction: column !important;
         gap: var(--sgds-gap-2-xs) !important;
       }
       .toggler-container {
         display: inline-flex !important;
       }
       .dropdown-menu {
         display: block !important;
         left: auto !important;
         max-height: none !important;
         min-width: var(--sgds-dimension-280) !important;
         position: relative !important;
         top: auto !important;
         transform: none !important;
         z-index: auto !important;
       }`,
    );
    if (el._handleClickOutOfElement) {
      document.removeEventListener("click", el._handleClickOutOfElement);
    }
    if (el._handleCloseMenu) {
      el.removeEventListener("sgds-hide", el._handleCloseMenu as EventListener);
    }
    el.hideMenu = () => {};
    const open = async () => {
      if (typeof el.showMenu === "function" && !el.menuIsOpen) {
        try { await el.showMenu(); } catch { /* noop */ }
      }
    };
    await open();
    el.addEventListener("sgds-after-hide", () => {
      void open().then(() => updateCallouts());
    });
  }

  const overflowMenus = Array.from(
    root.querySelectorAll(".portal-anatomy-overflow-menu") as NodeListOf<HTMLElement & {
      updateComplete?: Promise<unknown>;
      shadowRoot?: ShadowRoot | null;
    }>,
  );
  for (const el of overflowMenus) {
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    injectShadowStyles(
      el,
      "overflow-menu-inline-anatomy",
      `:host {
         pointer-events: none !important;
       }
       sgds-dropdown {
         display: inline-block !important;
       }
       .overflow-btn {
         background-color: var(--sgds-bg-translucent-subtle) !important;
         cursor: default !important;
       }`,
    );

    const dropdown = el.shadowRoot?.querySelector("sgds-dropdown") as HTMLElement & {
      showMenu?: () => Promise<void> | void;
      hideMenu?: (isOutside?: boolean) => void;
      menuIsOpen?: boolean;
      updateComplete?: Promise<unknown>;
      _handleClickOutOfElement?: (e: Event) => void;
      _handleCloseMenu?: () => void;
      noFlip?: boolean;
      drop?: string;
    } | null;
    if (!dropdown) continue;

    await customElements.whenDefined(dropdown.localName);
    await dropdown.updateComplete;
    injectShadowStyles(
      dropdown,
      "dropdown-inline-anatomy",
      `:host {
         display: inline-block !important;
       }
       .dropdown {
         align-items: flex-start !important;
         flex-direction: column !important;
         gap: var(--sgds-gap-2-xs) !important;
       }
       .toggler-container {
         display: inline-flex !important;
       }
       .dropdown-menu {
         display: block !important;
         left: auto !important;
         max-height: none !important;
         min-width: var(--sgds-dimension-280) !important;
         position: relative !important;
         top: auto !important;
         transform: none !important;
         z-index: auto !important;
       }`,
    );
    if (dropdown._handleClickOutOfElement) {
      document.removeEventListener("click", dropdown._handleClickOutOfElement);
    }
    if (dropdown._handleCloseMenu) {
      dropdown.removeEventListener("sgds-hide", dropdown._handleCloseMenu as EventListener);
    }
    dropdown.noFlip = true;
    dropdown.drop = "down";
    dropdown.hideMenu = () => {};
    const open = async () => {
      if (typeof dropdown.showMenu === "function" && !dropdown.menuIsOpen) {
        try { await dropdown.showMenu(); } catch { /* noop */ }
      }
    };
    await open();
    dropdown.addEventListener("sgds-after-hide", () => {
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

  const drawers = Array.from(
    root.querySelectorAll(".portal-anatomy-drawer") as NodeListOf<HTMLElement & {
      updateComplete?: Promise<unknown>;
    }>,
  );
  for (const el of drawers) {
    if (el.localName !== "sgds-drawer") continue;
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    injectShadowStyles(
      el,
      "drawer-contained-anatomy",
      `:host {
         display: block !important;
         height: 100% !important;
         width: var(--sgds-dimension-320) !important;
       }
       .drawer,
       .drawer-contained {
         height: 100% !important;
         inset: 0 !important;
         overflow: hidden !important;
         position: absolute !important;
         width: 100% !important;
       }
       .drawer-overlay {
         display: none !important;
       }
       .drawer-panel {
         height: 100% !important;
         inset: 0 !important;
         max-width: none !important;
         overflow: hidden !important;
         position: absolute !important;
         width: 100% !important;
      }`,
    );
  }

  const sidebars = Array.from(
    root.querySelectorAll(".portal-anatomy-sidebar") as NodeListOf<HTMLElement & {
      active?: string;
      collapsed?: boolean;
      _setNodesToDrawer?: (element: Element) => void;
      _showDrawer?: boolean;
      requestUpdate?: () => void;
      updateComplete?: Promise<unknown>;
    }>,
  );
  for (const el of sidebars) {
    if (el.localName !== "sgds-sidebar") continue;
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    injectShadowStyles(
      el,
      "sidebar-open-anatomy",
      `:host {
         --portal-sidebar-anatomy-main-width: var(--sgds-dimension-288);
         --portal-sidebar-anatomy-scrim-width: var(--sgds-dimension-96);
         display: block !important;
         pointer-events: none !important;
         width: calc(var(--portal-sidebar-anatomy-main-width) * 2 + var(--portal-sidebar-anatomy-scrim-width)) !important;
       }
       .sidebar {
         display: block !important;
         height: 100% !important;
         overflow: hidden !important;
         position: relative !important;
         width: calc(var(--portal-sidebar-anatomy-main-width) * 2 + var(--portal-sidebar-anatomy-scrim-width)) !important;
       }
       .sidebar-main {
         background: var(--sgds-surface-default) !important;
         display: block !important;
         height: 100% !important;
         inset: 0 auto auto 0 !important;
         left: 0 !important;
         opacity: 1 !important;
         overflow: hidden !important;
         position: relative !important;
         top: 0 !important;
         transform: none !important;
         translate: none !important;
         visibility: visible !important;
         width: var(--portal-sidebar-anatomy-main-width) !important;
         z-index: 3 !important;
       }
       .sidebar-wrapper {
         height: 100% !important;
         width: var(--portal-sidebar-anatomy-main-width) !important;
       }
       .sidebar-nested-overlay {
         height: 100% !important;
         left: var(--portal-sidebar-anatomy-main-width) !important;
         opacity: 1 !important;
         pointer-events: none !important;
         top: 0 !important;
         width: var(--portal-sidebar-anatomy-main-width) !important;
         z-index: 2 !important;
       }
       .sidebar--overlay {
         background-color: var(--sgds-bg-overlay) !important;
         height: 100% !important;
         inset: 0 auto auto 0 !important;
         opacity: 0.32 !important;
         pointer-events: none !important;
         position: absolute !important;
         width: calc(var(--portal-sidebar-anatomy-main-width) * 2 + var(--portal-sidebar-anatomy-scrim-width)) !important;
         z-index: 1 !important;
       }
       .sidebar--overlay.show {
         opacity: 0.32 !important;
       }`,
    );
    // Capture the active group's items BEFORE setting `el.active`, because
    // setting active triggers the sidebar's reactive lifecycle that moves
    // those items into shadow DOM. After they move, the group's children
    // collection is empty.
    const activeGroup = el.querySelector("sgds-sidebar-group[name='selected-label']") as HTMLElement | null;
    const capturedItemsHtml = activeGroup
      ? Array.from(activeGroup.children)
          .filter((child) => child.tagName.toLowerCase() === "sgds-sidebar-item")
          .map((child) => (child as HTMLElement).outerHTML)
          .join("")
      : "";

    el.active = "selected-label";
    el.collapsed = false;

    // Pin the drawer to its open state. The original click-outside handler
    // would otherwise close it the first time the user interacts with the
    // page, hiding the nested overlay we want the anatomy to keep showing.
    type SidebarPrivate = HTMLElement & {
      _isNarrowViewport?: boolean;
      _isOverlay?: boolean;
      _sidebarCollapsed?: boolean;
      _showDrawer?: boolean;
      _handleClickOutOfElement?: (e: Event) => void;
      requestUpdate?: () => void;
      updateComplete?: Promise<unknown>;
    };
    const sidebarPrivate = el as unknown as SidebarPrivate;
    if (typeof sidebarPrivate._handleClickOutOfElement === "function") {
      document.removeEventListener("click", sidebarPrivate._handleClickOutOfElement);
      sidebarPrivate._handleClickOutOfElement = () => {};
    }
    sidebarPrivate._isNarrowViewport = false;
    sidebarPrivate._isOverlay = false;
    sidebarPrivate._sidebarCollapsed = false;
    sidebarPrivate._showDrawer = true;
    sidebarPrivate.requestUpdate?.();
    await sidebarPrivate.updateComplete;

    // The sidebar's reactive `_handleActiveItem` may revert drawer items back
    // to the parent group whenever it re-evaluates, leaving the nested overlay
    // empty. Insert *clones* of the original items directly into the overlay
    // shadow DOM so they survive the sidebar's lifecycle, and refresh them on
    // each update via a MutationObserver.
    const overlayHost = el.shadowRoot?.querySelector(".sidebar-nested-overlay") as HTMLElement | null;
    if (overlayHost && capturedItemsHtml) {
      const ensureAnatomyItems = () => {
        if (overlayHost.querySelector('[data-anatomy-clone="sidebar-item"]')) return;
        const template = document.createElement("template");
        template.innerHTML = capturedItemsHtml.trim();
        Array.from(template.content.children).forEach((node) => {
          (node as HTMLElement).setAttribute("data-anatomy-clone", "sidebar-item");
          overlayHost.appendChild(node);
        });
      };
      ensureAnatomyItems();
      const observer = new MutationObserver(() => ensureAnatomyItems());
      observer.observe(overlayHost, { childList: true });
    }
  }

  const mastheads = Array.from(
    root.querySelectorAll(".portal-anatomy-masthead") as NodeListOf<HTMLElement & {
      toggleVisibility?: boolean;
      requestUpdate?: () => void;
      updateComplete?: Promise<unknown>;
    }>,
  );
  for (const el of mastheads) {
    if (el.localName !== "sgds-masthead") continue;
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    injectShadowStyles(
      el,
      "masthead-anatomy-spacing",
      `.container {
         padding-left: var(--sgds-padding-sm) !important;
         padding-right: var(--sgds-padding-sm) !important;
       }`,
    );
    el.toggleVisibility = true;
    el.requestUpdate?.();
    await el.updateComplete;
  }

  const steppers = Array.from(
    root.querySelectorAll(".portal-anatomy-stepper") as NodeListOf<HTMLElement & {
      updateComplete?: Promise<unknown>;
      shadowRoot?: ShadowRoot | null;
    }>,
  );
  for (const el of steppers) {
    if (el.localName !== "sgds-stepper") continue;
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    (el as HTMLElement & { activeStep?: number; steps?: unknown[] }).steps = [
      { stepHeader: "Start", component: "Step one" },
      { stepHeader: "Review", component: "Step two" },
      { stepHeader: "Confirm", component: "Step three" },
    ];
    (el as HTMLElement & { activeStep?: number; steps?: unknown[] }).activeStep = 0;
    await el.updateComplete;
    injectShadowStyles(
      el,
      "stepper-anatomy-width",
      `:host {
         display: block !important;
         width: var(--sgds-dimension-480) !important;
       }
       .stepper {
         width: var(--sgds-dimension-480) !important;
       }
       .stepper:not(.vertical) .stepper-detail {
         max-width: var(--sgds-dimension-192) !important;
       }
       .stepper-item-container:first-child .stepper-detail {
         align-items: center !important;
         display: flex !important;
         flex-direction: column !important;
         gap: var(--sgds-gap-2-xs) !important;
       }
       .portal-anatomy-stepper-label {
         display: block !important;
       }
       .portal-anatomy-stepper-slot {
         align-items: center !important;
         background: var(--sgds-surface-default) !important;
         border: var(--sgds-border-width-1) solid var(--sgds-border-color-muted) !important;
         border-radius: var(--sgds-border-radius-md) !important;
         color: var(--sgds-color-subtle) !important;
         display: inline-flex !important;
         font-size: var(--sgds-font-size-label-sm) !important;
         justify-content: center !important;
         line-height: var(--sgds-line-height-20) !important;
         margin-top: var(--sgds-margin-2-xs) !important;
         min-width: var(--sgds-dimension-112) !important;
         padding: var(--sgds-padding-3-xs) var(--sgds-padding-2-xs) !important;
       }`,
    );
    const firstDetail = el.shadowRoot?.querySelector(".stepper-item-container:first-child .stepper-detail") as HTMLElement | null;
    if (firstDetail && !firstDetail.querySelector(".portal-anatomy-stepper-slot")) {
      const labelText = firstDetail.textContent?.trim() || "Start";
      firstDetail.textContent = "";
      const label = document.createElement("span");
      label.className = "portal-anatomy-stepper-label";
      label.textContent = labelText;
      const slotContent = document.createElement("span");
      slotContent.className = "portal-anatomy-stepper-slot";
      slotContent.textContent = "Slot content";
      firstDetail.appendChild(label);
      firstDetail.appendChild(slotContent);
    }
  }

  const systemBanners = Array.from(
    root.querySelectorAll(".portal-anatomy-system-banner") as NodeListOf<HTMLElement & {
      updateComplete?: Promise<unknown>;
    }>,
  );
  for (const el of systemBanners) {
    if (el.localName !== "sgds-system-banner") continue;
    await customElements.whenDefined(el.localName);
    await el.updateComplete;
    injectShadowStyles(
      el,
      "system-banner-anatomy-padding",
      `.banner {
         min-height: var(--sgds-dimension-56) !important;
         padding: var(--sgds-padding-xs) var(--sgds-padding-md) !important;
       }`,
    );
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

watch(() => props.anatomyVariants, (variants) => {
  selectedAnatomyVariant.value = variants?.[0]?.value ?? "";
}, { deep: true });

watch(selectedAnatomyVariant, async () => {
  await nextTick();
  void openAnatomyDropdowns();
  void updateCallouts();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  window.removeEventListener("resize", updateCallouts);
});
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xl)]">
    <div
      :class="[
        'sgds:flex sgds:flex-col sgds:gap-component-md sgds:bg-alternate sgds:border sgds:border-muted sgds:rounded-xl',
        isSystemBannerAnatomy ? 'sgds:px-2xs sgds:py-2xs' : 'sgds:py-component-xs',
        isSystemBannerAnatomy ? '' : isSidebarAnatomy ? 'sgds:px-xs' : isSidenavAnatomy ? 'sgds:px-2xs' : 'sgds:px-component-xs',
        isSidebarAnatomy ? 'sgds:overflow-hidden' : '',
      ]"
    >
      <SegmentedControl
        v-if="anatomyVariantOptions.length > 1"
        v-model="selectedAnatomyVariant"
        :options="anatomyVariantOptions"
        aria-label="Anatomy variant"
      />
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
          :class="[
            'sgds:flex sgds:items-center sgds:justify-center sgds:mx-auto sgds:min-h-[var(--sgds-dimension-320)] sgds:relative sgds:w-full',
            isWideAnatomy ? 'sgds:max-w-[var(--sgds-dimension-1168)]' : 'sgds:max-w-[var(--sgds-dimension-688)]',
          ]"
          :style="anatomyCanvasMinHeight ? { minHeight: `${anatomyCanvasMinHeight}px` } : undefined"
        >
          <div
            ref="anatomyScaleLayerRef"
            class="anatomy-scale-layer sgds:absolute sgds:inset-0 sgds:flex sgds:items-center sgds:justify-center"
            :style="{
              transform: `scale(${anatomyScale})`,
              transformOrigin: `${anatomyScaleOrigin.x}px ${anatomyScaleOrigin.y}px`,
            }"
          >
            <div
              class="anatomy-demo-markup sgds:inline-flex sgds:items-center sgds:justify-center sgds:min-w-0"
              inert
              :style="{ transform: `translate(${anatomyGroupOffset.x}px, ${anatomyGroupOffset.y}px)` }"
              v-html="activeAnatomyMarkup"
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
