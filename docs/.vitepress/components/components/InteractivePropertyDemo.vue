<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { ConfigurationDemo } from "../../data/component-docs";
import CardContentSlotsDemo from "./CardContentSlotsDemo.vue";
import CodeToken from "../ui/CodeToken.vue";
import SegmentedControl from "./SegmentedControl.vue";
import { textParts } from "../../utils/text-parts";

const props = defineProps<{ demo: ConfigurationDemo }>();

const rootRef = ref<HTMLElement | null>(null);
const responsiveRenderKey = ref(0);
const mobileBreadcrumbOverflowActive = ref(false);

let lastResponsiveBucket = "";
const MOBILE_BREADCRUMB_BREAKPOINT = 768;

const activeValue = ref<string>(
  props.demo.defaultValue || props.demo.options[0]?.value || "",
);

const activeOption = computed(() =>
  props.demo.options.find((option) => option.value === activeValue.value) ?? props.demo.options[0],
);

const renderRangeText = (text = "") =>
  text.replace(/\{\{value\}\}/g, activeValue.value);

const baseActiveMarkup = computed(() =>
  props.demo.controlType === "number"
    ? renderRangeText(activeOption.value?.markup ?? "")
    : activeOption.value?.markup ?? "",
);

const buildMobileBreadcrumbOverflowMarkup = (markup: string) => {
  if (!markup.trim() || typeof DOMParser === "undefined") return markup;

  const document = new DOMParser().parseFromString(`<div data-demo-root>${markup}</div>`, "text/html");
  const root = document.body.firstElementChild;
  const breadcrumb = root?.querySelector("sgds-breadcrumb");
  if (!root || !breadcrumb) return markup;

  const items = Array.from(breadcrumb.children)
    .filter((child) => child.tagName.toLowerCase() === "sgds-breadcrumb-item");
  if (items.length < 3) return markup;

  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  const overflowItem = document.createElement("sgds-breadcrumb-item");
  const overflowMenu = document.createElement("sgds-overflow-menu");
  overflowMenu.setAttribute("aria-haspopup", "menu");
  overflowMenu.setAttribute("size", "sm");

  items.slice(1, -1).forEach((item) => {
    const link = item.querySelector("a");
    if (!link) return;

    const dropdownItem = document.createElement("sgds-dropdown-item");
    (dropdownItem as any).ariaLabel = link.textContent?.trim() || "";
    dropdownItem.appendChild(link.cloneNode(true));
    overflowMenu.appendChild(dropdownItem);
  });

  if (!overflowMenu.children.length) return markup;

  overflowItem.classList.add("overflow-menu");
  overflowItem.appendChild(overflowMenu);
  breadcrumb.replaceChildren(firstItem, overflowItem, lastItem);

  return root.innerHTML;
};

const activeMarkup = computed(() =>
  baseActiveMarkup.value.includes("sgds-breadcrumb") && mobileBreadcrumbOverflowActive.value
    ? buildMobileBreadcrumbOverflowMarkup(baseActiveMarkup.value)
    : baseActiveMarkup.value,
);

const activeDescription = computed(() =>
  props.demo.controlType === "number"
    ? renderRangeText(activeOption.value?.description)
    : activeOption.value?.description,
);

const activeNote = computed(() =>
  props.demo.controlType === "number"
    ? renderRangeText(activeOption.value?.note)
    : activeOption.value?.note,
);

const ignoredMarkupAttributes = new Set([
  "aria-hidden",
  "aria-label",
  "class",
  "data-drawer-trigger",
  "href",
  "id",
  "rel",
  "role",
  "slot",
  "style",
  "target",
]);

const configurationCodeTerms = computed(() => {
  const terms = new Set<string>();
  const tagPattern = /<sgds-[\w-]+([^>]*)>/g;
  const attributePattern = /(?:^|\s)([A-Za-z_:][\w:.-]*)(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?/g;

  props.demo.options.forEach((option) => {
    option.markup.replace(tagPattern, (_, attributes: string) => {
      let attributeMatch: RegExpExecArray | null;
      while ((attributeMatch = attributePattern.exec(attributes)) !== null) {
        const attributeName = attributeMatch[1];
        if (
          attributeName &&
          !ignoredMarkupAttributes.has(attributeName) &&
          !attributeName.startsWith("data-") &&
          !attributeName.startsWith("aria-")
        ) {
          terms.add(attributeName);
        }
      }

      return "";
    });
  });

  return Array.from(terms).sort((current, next) => next.length - current.length);
});

const isWidePreview = computed(() =>
  activeOption.value?.markup.includes("sgds-footer") ||
  activeOption.value?.markup.includes("portal-masthead-width-demo") ||
  activeOption.value?.markup.includes("portal-mainnav-width-demo") ||
  activeOption.value?.markup.includes("portal-system-banner-width-demo") ||
  activeOption.value?.markup.includes("portal-demo-sidebar-open") ||
  activeOption.value?.markup.includes("portal-modal-preview-xl") ||
  activeOption.value?.markup.includes("portal-modal-preview-fullscreen") ||
  false,
);

const isFullscreenModalPreview = computed(() =>
  activeOption.value?.markup.includes("portal-modal-preview-fullscreen") ?? false,
);

const shouldRemountOnBreakpointChange = computed(() =>
  activeMarkup.value.includes("sgds-mainnav") ||
  activeMarkup.value.includes("sgds-sidebar"),
);

const previewWidthClass = computed(() => {
  return isWidePreview.value
    ? "sgds:max-w-[var(--sgds-dimension-1312)]"
    : "sgds:max-w-[var(--sgds-dimension-768)]";
});

const getResponsiveBucket = () => {
  if (typeof window === "undefined") return "";

  const width = window.innerWidth;

  if (width < 512) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  if (width < 1440) return "xl";

  return "2xl";
};

const syncResponsiveRenderKey = () => {
  const nextBucket = getResponsiveBucket();
  if (!nextBucket) return;

  if (!shouldRemountOnBreakpointChange.value) {
    lastResponsiveBucket = nextBucket;
    return;
  }

  if (lastResponsiveBucket && nextBucket !== lastResponsiveBucket) {
    responsiveRenderKey.value += 1;
  }

  lastResponsiveBucket = nextBucket;
};

const syncMobileBreadcrumbOverflow = async () => {
  if (!baseActiveMarkup.value.includes("sgds-breadcrumb") || typeof window === "undefined") {
    mobileBreadcrumbOverflowActive.value = false;
    return;
  }

  if (window.innerWidth >= MOBILE_BREADCRUMB_BREAKPOINT) {
    mobileBreadcrumbOverflowActive.value = false;
    return;
  }

  if (mobileBreadcrumbOverflowActive.value) return;

  await nextTick();
  const preview = rootRef.value?.querySelector(".behaviour-demo-markup") as HTMLElement | null;
  const breadcrumb = preview?.querySelector("sgds-breadcrumb") as HTMLElement | null;
  if (!preview || !breadcrumb) return;

  const items = Array.from(breadcrumb.children)
    .filter((child): child is HTMLElement => child instanceof HTMLElement && child.tagName.toLowerCase() === "sgds-breadcrumb-item");
  const hasTruncatedMiddleItem = items.slice(1, -1).some((item) => {
    const link = item.querySelector("a") as HTMLElement | null;
    return Boolean(link && link.scrollWidth > link.clientWidth + 1);
  });

  if (
    hasTruncatedMiddleItem ||
    preview.scrollWidth > preview.clientWidth + 1 ||
    breadcrumb.scrollWidth > breadcrumb.clientWidth + 1
  ) {
    mobileBreadcrumbOverflowActive.value = true;
  }
};

const handleWindowResize = () => {
  syncResponsiveRenderKey();
  mobileBreadcrumbOverflowActive.value = false;
  void syncMobileBreadcrumbOverflow();
};

const renderMarkup = (markup: string) => {
  if (!markup.includes("sgds-drawer") || !markup.includes("portal-demo-overlay")) {
    return markup;
  }

  return markup
    .replace(/\sopen(?=[\s>])/g, "")
    .replace(
      /<div class="portal-demo-overlay">/,
      `<div class="portal-demo-overlay">
        <div class="portal-demo-drawer-scrim" aria-hidden="true"></div>
        <div class="sgds:absolute sgds:left-1/2 sgds:top-1/2 sgds:z-[1] sgds:-translate-x-1/2 sgds:-translate-y-1/2">
          <sgds-button data-drawer-trigger ariaLabel="Click to open drawer demo">Click to open drawer demo</sgds-button>
        </div>`,
    );
};

// sgds-select emits `sgds-change` with the new value exposed on the element
// itself (event.target.value). Mirror that into activeValue so the rest of
// the demo (tabpanel visibility, state-effect application) reacts the same
// way it does for the segmented control.
const onSelectChange = (event: Event) => {
  const target = event.target as HTMLElement & { value?: string };
  if (typeof target.value === "string") {
    activeValue.value = target.value;
  }
};

const onNumberInput = (event: Event) => {
  const target = event.target as HTMLElement & { value?: string };
  const min = props.demo.range?.min ?? 0;
  const max = props.demo.range?.max ?? 100;
  const numericValue = Number(target.value);

  if (!Number.isFinite(numericValue)) return;

  activeValue.value = String(Math.min(max, Math.max(min, numericValue)));
};

const applyStateEffects = async () => {
  await nextTick();
  await customElements.whenDefined("sgds-accordion-item");

  const root = rootRef.value;
  if (!root) return;

  root.querySelectorAll<HTMLElement>("[data-state-effect]").forEach((panel) => {
    const effect = panel.dataset.stateEffect;
    const button = panel.querySelector("sgds-accordion-item")?.shadowRoot?.querySelector(".accordion-btn") as HTMLElement | null;
    if (!button || (effect !== "hover" && effect !== "focus")) return;

    button.style.backgroundColor = "var(--sgds-bg-translucent-subtle)";
    button.style.zIndex = effect === "focus" ? "3" : "2";

    if (effect === "focus") {
      button.style.outline = "var(--sgds-outline-focus)";
      button.style.outlineOffset = "var(--sgds-outline-offset-focus)";
    }
  });
};

const injectShadowStyles = (host: HTMLElement, id: string, css: string) => {
  const root = host.shadowRoot;
  if (!root) return;
  if (root.querySelector(`style[data-demo-style="${id}"]`)) return;
  const style = document.createElement("style");
  style.setAttribute("data-demo-style", id);
  style.textContent = css;
  root.appendChild(style);
};

const setupDrawerDemos = async () => {
  await nextTick();
  await customElements.whenDefined("sgds-drawer");

  const root = rootRef.value;
  if (!root) return;

  root.querySelectorAll<HTMLElement>(".portal-demo-overlay").forEach((overlay) => {
    const button = overlay.querySelector<HTMLElement>("[data-drawer-trigger]");
    const drawer = overlay.querySelector<HTMLElement & {
      open?: boolean;
      show?: () => Promise<void> | void;
      hide?: () => Promise<void> | void;
    }>("sgds-drawer");
    if (!button || !drawer || button.dataset.drawerTriggerReady === "true") return;

    button.dataset.drawerTriggerReady = "true";
    overlay.dataset.drawerOpen = "false";
    drawer.open = false;
    drawer.removeAttribute("open");

    button.addEventListener("click", async () => {
      overlay.dataset.drawerOpen = "true";
      await drawer.show?.();
    });

    drawer.addEventListener("sgds-request-close", () => {
      void drawer.hide?.();
      overlay.dataset.drawerOpen = "false";
    });

    drawer.addEventListener("sgds-after-hide", () => {
      overlay.dataset.drawerOpen = "false";
    });

    overlay.querySelector<HTMLElement>(".portal-demo-drawer-scrim")?.addEventListener("click", () => {
      void drawer.hide?.();
      overlay.dataset.drawerOpen = "false";
    });
  });
};

const setupOverflowMenuDemos = async () => {
  await nextTick();
  await customElements.whenDefined("sgds-overflow-menu");

  const root = rootRef.value;
  if (!root) return;

  const overflowMenus = Array.from(
    root.querySelectorAll(".portal-demo-overflow-active") as NodeListOf<HTMLElement & {
      updateComplete?: Promise<unknown>;
      shadowRoot?: ShadowRoot | null;
    }>,
  );

  for (const el of overflowMenus) {
    await el.updateComplete;
    injectShadowStyles(
      el,
      "overflow-menu-active-demo",
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
      "dropdown-active-demo",
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
      void open();
    });
  }
};

const setupDropdownDemos = async () => {
  await nextTick();
  await customElements.whenDefined("sgds-dropdown");

  const root = rootRef.value;
  if (!root) return;

  const dropdowns = Array.from(
    root.querySelectorAll(".portal-demo-dropdown-active") as NodeListOf<HTMLElement & {
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

  for (const dropdown of dropdowns) {
    await dropdown.updateComplete;
    injectShadowStyles(
      dropdown,
      "dropdown-standalone-active-demo",
      `:host {
         display: inline-block !important;
         pointer-events: none !important;
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
      void open();
    });
  }
};

const setupSidebarDemos = async () => {
  await nextTick();
  await customElements.whenDefined("sgds-sidebar");

  const root = rootRef.value;
  if (!root) return;

  const sidebars = Array.from(
    root.querySelectorAll("sgds-sidebar") as NodeListOf<HTMLElement & {
      collapsed?: boolean;
      _handleClickOutOfElement?: (e: Event) => void;
      _isNarrowViewport?: boolean;
      _isOverlay?: boolean;
      _sidebarCollapsed?: boolean;
      _showDrawer?: boolean;
      requestUpdate?: () => void;
      updateComplete?: Promise<unknown>;
    }>,
  );

  for (const el of sidebars) {
    await el.updateComplete;
    const isOpenOverlayDemo = el.classList.contains("portal-demo-sidebar-open");
    const shouldStayCollapsed = el.hasAttribute("collapsed") || el.collapsed === true;
    const hasScrim = el.hasAttribute("scrim");
    const viewportWidth = typeof window === "undefined" ? 1440 : window.innerWidth;
    const isMobileViewport = viewportWidth < 768;
    const variant = el.getAttribute("variant") || "collapsible";
    const previewCollapsed = isMobileViewport ? false : shouldStayCollapsed;
    const previewIsOverlay =
      variant === "overlay" ||
      (variant === "collapsible" && isMobileViewport);
    const defaultWidth = isOpenOverlayDemo
      ? `calc(var(--sgds-dimension-288)${hasScrim ? " + var(--sgds-dimension-96)" : ""})`
      : "var(--sgds-dimension-288)";
    injectShadowStyles(
      el,
      "sidebar-open-demo",
      `:host {
         display: block !important;
         max-width: 100% !important;
         pointer-events: none !important;
       }
       @media screen and (min-width: 768px) {
       :host {
         width: ${defaultWidth} !important;
       }
       .sidebar {
         display: block !important;
         height: 100% !important;
         overflow: hidden !important;
         position: relative !important;
         width: ${defaultWidth} !important;
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
         width: var(--sgds-dimension-288) !important;
         z-index: 3 !important;
       }
       .sidebar-wrapper {
         height: 100% !important;
         width: var(--sgds-dimension-288) !important;
       }
       .sidebar-nested-overlay {
         height: 100% !important;
         left: var(--sgds-dimension-288) !important;
         opacity: 1 !important;
         pointer-events: none !important;
         top: 0 !important;
         width: var(--sgds-dimension-288) !important;
         z-index: 2 !important;
       }
       .sidebar--overlay {
         background-color: var(--sgds-bg-overlay) !important;
         display: block !important;
         height: 100% !important;
         inset: 0 auto auto 0 !important;
         opacity: 0.32 !important;
         pointer-events: none !important;
         position: absolute !important;
         width: ${defaultWidth} !important;
         z-index: 1 !important;
       }
       .sidebar--overlay.show {
         opacity: 0.32 !important;
       }
       :host([collapsed]) {
         width: var(--sgds-dimension-72) !important;
       }
       :host([collapsed]) .sidebar,
       :host([collapsed]) .sidebar-main,
       :host([collapsed]) .sidebar-wrapper {
         width: var(--sgds-dimension-72) !important;
       }
       }
       @media screen and (max-width: 767px) {
       :host {
         width: var(--sgds-dimension-256) !important;
       }
       .sidebar {
         height: 100% !important;
         overflow: hidden !important;
         position: relative !important;
       }
       .sidebar-main {
         opacity: 1 !important;
         transform: none !important;
         translate: none !important;
         visibility: visible !important;
       }
       .sidebar--overlay {
         pointer-events: none !important;
         width: 100% !important;
       }
       }
       @media screen and (max-width: 511px) {
       :host {
         width: 100% !important;
       }
       .sidebar {
         position: relative !important;
         width: 100% !important;
       }
       .sidebar--overlay {
         display: none !important;
       }
       }`,
    );
    if (typeof el._handleClickOutOfElement === "function") {
      document.removeEventListener("click", el._handleClickOutOfElement);
      el._handleClickOutOfElement = () => {};
    }
    el.collapsed = previewCollapsed;
    el._isNarrowViewport = viewportWidth < 1280;
    el._isOverlay = previewIsOverlay || isOpenOverlayDemo;
    el._sidebarCollapsed = variant === "persistent" ? false : previewCollapsed;
    el._showDrawer = false;
    el.requestUpdate?.();
    await el.updateComplete;
  }
};

const setupStepperDemos = async () => {
  await nextTick();
  await customElements.whenDefined("sgds-stepper");

  const root = rootRef.value;
  if (!root) return;

  const stepperSteps: Record<string, unknown[]> = {
    default: [
      { stepHeader: "Start", component: "Step one" },
      { stepHeader: "Review", component: "Step two" },
      { stepHeader: "Confirm", component: "Step three" },
    ],
    icons: [
      { stepHeader: "Start", component: "Step one", iconName: "pencil" },
      { stepHeader: "Review", component: "Step two", iconName: "file-earmark-text" },
      { stepHeader: "Confirm", component: "Step three", iconName: "check" },
    ],
  };

  root.querySelectorAll<HTMLElement>("sgds-stepper[data-portal-stepper]").forEach((el) => {
    const variant = el.dataset.portalStepper || "default";
    const activeStep = Number(el.getAttribute("activeStep") ?? el.getAttribute("activestep") ?? el.dataset.portalActiveStep ?? 0);
    const stepper = el as HTMLElement & { activeStep?: number; steps?: unknown[] };
    stepper.steps = stepperSteps[variant] ?? stepperSteps.default;
    stepper.activeStep = Number.isFinite(activeStep) ? activeStep : 0;
  });
};

const setupTextareaDemos = async () => {
  await nextTick();
  await customElements.whenDefined("sgds-textarea");

  const root = rootRef.value;
  if (!root) return;

  for (const el of root.querySelectorAll<HTMLElement & {
    resize?: string;
    updateComplete?: Promise<unknown>;
  }>("sgds-textarea.portal-textarea-api-demo")) {
    await el.updateComplete;
    injectShadowStyles(
      el,
      "textarea-api-demo",
      `:host {
         display: block !important;
         width: var(--sgds-dimension-320) !important;
       }
       .form-control-container {
         width: 100% !important;
       }
       textarea.form-control-group {
         box-sizing: border-box !important;
         width: 100% !important;
       }
       textarea.form-control-group.textarea-resize-none,
       textarea.form-control-group.textarea-resize-vertical {
         height: auto !important;
       }`,
    );

    const textarea = el.shadowRoot?.querySelector("textarea.form-control-group") as HTMLTextAreaElement | null;
    if (!textarea || textarea.dataset.portalResizeReady === "true") continue;

    textarea.dataset.portalResizeReady = "true";

    const getResizeMode = () => (el.getAttribute("resize") || el.resize || "vertical").toLowerCase();
    const isInResizeGrip = (event: PointerEvent) => {
      const rect = textarea.getBoundingClientRect();
      return event.clientY >= rect.bottom - 18 && event.clientX >= rect.right - 28;
    };

    textarea.addEventListener("pointermove", (event) => {
      textarea.style.cursor = getResizeMode() === "vertical" && isInResizeGrip(event)
        ? "ns-resize"
        : "";
    });

    textarea.addEventListener("pointerleave", () => {
      textarea.style.cursor = "";
    });

    textarea.addEventListener("pointerdown", (event) => {
      if (getResizeMode() !== "vertical" || !isInResizeGrip(event)) return;

      event.preventDefault();
      event.stopPropagation();

      const startY = event.clientY;
      const startHeight = textarea.getBoundingClientRect().height;
      const minHeight = 136;
      const maxHeight = 320;

      const onPointerMove = (moveEvent: PointerEvent) => {
        const nextHeight = Math.min(
          maxHeight,
          Math.max(minHeight, startHeight + moveEvent.clientY - startY),
        );
        textarea.style.setProperty("height", `${nextHeight}px`, "important");
      };

      const onPointerUp = () => {
        window.removeEventListener("pointermove", onPointerMove);
        textarea.style.cursor = "";
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp, { once: true });
    });
  }
};

onMounted(() => {
  syncResponsiveRenderKey();
  window.addEventListener("resize", handleWindowResize);
  void applyStateEffects();
  void setupDrawerDemos();
  void setupDropdownDemos();
  void setupOverflowMenuDemos();
  void setupSidebarDemos();
  void setupStepperDemos();
  void setupTextareaDemos();
  void syncMobileBreadcrumbOverflow();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleWindowResize);
});

watch(baseActiveMarkup, () => {
  mobileBreadcrumbOverflowActive.value = false;
  void syncMobileBreadcrumbOverflow();
});

watch(activeMarkup, () => {
  lastResponsiveBucket = getResponsiveBucket();
  void syncMobileBreadcrumbOverflow();
});

watch([activeValue, responsiveRenderKey], () => {
  void applyStateEffects();
  void setupDrawerDemos();
  void setupDropdownDemos();
  void setupOverflowMenuDemos();
  void setupSidebarDemos();
  void setupStepperDemos();
  void setupTextareaDemos();
  void syncMobileBreadcrumbOverflow();
});
</script>

<template>
  <article ref="rootRef" class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
    <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
      <component :is="demo.titleTag || 'h3'" class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ demo.title }}</component>
      <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
        <template
          v-for="(part, index) in textParts(demo.description, configurationCodeTerms)"
          :key="`${part.text}-${index}`"
        >
          <CodeToken v-if="part.isCode" :label="part.text" />
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
    </div>

    <div
      class="interactive-demo sgds:flex sgds:flex-col sgds:min-h-[var(--sgds-dimension-320)] sgds:min-w-0 sgds:max-w-full sgds:border sgds:border-muted sgds:rounded-xl sgds:overflow-clip sgds:px-component-xs sgds:py-component-xs sgds:gap-component-md"
      :class="{ 'interactive-demo--fullscreen-modal': isFullscreenModalPreview }"
    >
      <CardContentSlotsDemo v-if="demo.interactionMode === 'content-slots'" :demo="demo" />
      <template v-else>
        <!-- Select variant: rendered when option count is too high for a
             comfortable segmented control (see ConfigurationDemo.controlType).
             Wrapped in a max-w container so the select stays compact and
             left-aligned instead of stretching across the demo width. No
             visible label — the aria-label carries the accessible name. -->
        <div
          v-if="demo.controlType === 'select'"
          class="sgds:max-w-[var(--sgds-dimension-120)]"
        >
          <sgds-select
            :value="activeValue"
            :label="demo.controlLabel || demo.title"
            @sgds-change="onSelectChange"
          >
            <sgds-select-option
              v-for="opt in demo.options"
              :key="opt.value"
              :value="opt.value"
              :selected="opt.value === activeValue ? 'true' : undefined"
            >{{ opt.label }}</sgds-select-option>
          </sgds-select>
        </div>
        <div
          v-else-if="demo.controlType === 'number'"
          class="sgds:flex sgds:w-full sgds:max-w-[var(--sgds-dimension-96)]"
        >
          <sgds-input
            class="sgds:w-full"
            type="number"
            suffix="%"
            :min="demo.range?.min ?? 0"
            :max="demo.range?.max ?? 100"
            :step="demo.range?.step ?? 1"
            :value="activeValue"
            :aria-label="`${demo.controlLabel || demo.title} typed value`"
            @sgds-input="onNumberInput"
          ></sgds-input>
        </div>
        <SegmentedControl
          v-else
          v-model="activeValue"
          :options="demo.options"
          :aria-label="demo.controlLabel || demo.title"
        />

        <div
          v-if="demo.controlType === 'number'"
          class="sgds:flex sgds:flex-1 sgds:min-w-0 sgds:w-full"
          role="tabpanel"
        >
          <div class="sgds:flex sgds:flex-1 sgds:min-w-0 sgds:w-full sgds:flex-col sgds:justify-center sgds:gap-component-md">
            <div class="sgds:flex sgds:flex-1 sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full">
              <div class="sgds:w-full sgds:min-w-0 sgds:max-w-full sgds:mx-auto sgds:max-w-[var(--sgds-dimension-768)]">
                <div
                  :key="`${activeValue}-${responsiveRenderKey}`"
                  class="behaviour-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full"
                  v-html="renderMarkup(activeMarkup)"
                ></div>
              </div>
            </div>
            <p v-if="activeDescription" class="sgds:m-0 sgds:max-w-full sgds:min-w-0 sgds:break-words sgds:text-center sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
              <template
                v-for="(part, index) in textParts(activeDescription, configurationCodeTerms)"
                :key="`${part.text}-${index}`"
              >
                <CodeToken v-if="part.isCode" :label="part.text" />
                <template v-else>{{ part.text }}</template>
              </template>
            </p>
            <p v-if="activeNote" class="sgds:m-0 sgds:max-w-full sgds:min-w-0 sgds:break-words sgds:text-center sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
              <template
                v-for="(part, index) in textParts(activeNote, configurationCodeTerms)"
                :key="`${part.text}-${index}`"
              >
                <CodeToken v-if="part.isCode" :label="part.text" />
                <template v-else>{{ part.text }}</template>
              </template>
            </p>
          </div>
        </div>
        <template v-else>
          <div
            v-if="activeOption"
            :key="activeOption.value"
            :data-state-effect="activeOption.stateEffect"
            class="sgds:flex sgds:flex-1 sgds:min-w-0 sgds:w-full"
            role="tabpanel"
          >
            <div class="sgds:flex sgds:flex-1 sgds:min-w-0 sgds:w-full sgds:flex-col sgds:justify-center sgds:gap-component-md">
              <div class="sgds:flex sgds:flex-1 sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full">
                <div
                  :class="[
                    'sgds:w-full sgds:min-w-0 sgds:max-w-full sgds:mx-auto',
                    previewWidthClass
                  ]"
                >
                  <div
                    :key="`${activeOption.value}-${responsiveRenderKey}`"
                    class="behaviour-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full"
                    v-html="renderMarkup(activeMarkup)"
                  ></div>
                </div>
              </div>
              <p v-if="activeOption.description" class="sgds:m-0 sgds:max-w-full sgds:min-w-0 sgds:break-words sgds:text-center sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
                <template
                  v-for="(part, index) in textParts(activeOption.description, configurationCodeTerms)"
                  :key="`${part.text}-${index}`"
                >
                  <CodeToken v-if="part.isCode" :label="part.text" />
                  <template v-else>{{ part.text }}</template>
                </template>
              </p>
              <p v-if="activeOption.note" class="sgds:m-0 sgds:max-w-full sgds:min-w-0 sgds:break-words sgds:text-center sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
                <template
                  v-for="(part, index) in textParts(activeOption.note, configurationCodeTerms)"
                  :key="`${part.text}-${index}`"
                >
                  <CodeToken v-if="part.isCode" :label="part.text" />
                  <template v-else>{{ part.text }}</template>
                </template>
              </p>
            </div>
          </div>
        </template>
      </template>
    </div>
  </article>
</template>

<style>
.interactive-demo {
  background: var(--sgds-bg-alternate);
}

/* Fullscreen modal markup is injected through v-html, so this preview needs global selectors. */
.interactive-demo--fullscreen-modal {
  background: var(--sgds-surface-default);
}

.interactive-demo--fullscreen-modal .behaviour-demo-markup,
.interactive-demo--fullscreen-modal .portal-modal-preview,
.interactive-demo--fullscreen-modal .portal-modal-panel {
  min-height: 100%;
}

.interactive-demo--fullscreen-modal .portal-modal-preview-fullscreen .portal-modal-panel {
  border-radius: 0;
}

/* Breadcrumb previews are injected through v-html and the SGDS breadcrumb
   internals use shadow DOM flex layout. These selectors keep long mobile
   trails inside the demo and let the current page item truncate. */
.behaviour-demo-markup > sgds-breadcrumb {
  max-width: 100%;
  min-width: 0;
  width: 100%;
}

.behaviour-demo-markup > sgds-breadcrumb sgds-breadcrumb-item:last-child {
  flex: 1 1 auto;
  min-width: 0;
}

.portal-demo-drawer-scrim {
  background: var(--sgds-bg-overlay);
  inset: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transition: opacity 250ms ease;
  z-index: 1;
}

.portal-demo-overlay[data-drawer-open="true"] .portal-demo-drawer-scrim {
  opacity: 1;
  pointer-events: auto;
}

.portal-demo-overlay[data-drawer-open="true"] [data-drawer-trigger] {
  visibility: hidden;
}

.portal-demo-overlay sgds-drawer {
  inset: 0;
  position: absolute;
  z-index: 0;
}

.portal-demo-overlay[data-drawer-open="true"] sgds-drawer {
  z-index: 2;
}

/* Global selectors targeting slotted web component elements in v-html markup.
   These SGDS web components are inline by default; force them to fill the demo
   wrapper so the max-width on the parent is respected. */
.behaviour-demo-markup > sgds-accordion {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  display: block;
  overflow: hidden;
  width: 100%;
}

.behaviour-demo-markup > sgds-alert {
  display: block;
  width: 100%;
}

.behaviour-demo-markup > sgds-input {
  display: block;
  width: var(--sgds-dimension-320);
}

.behaviour-demo-markup > sgds-textarea {
  display: block;
  width: var(--sgds-dimension-320);
}

.behaviour-demo-markup > sgds-file-upload {
  display: block;
  inline-size: fit-content;
  max-inline-size: 100%;
}

.behaviour-demo-markup > sgds-file-upload.portal-demo-file-upload-drag {
  inline-size: 100%;
  min-inline-size: min(var(--sgds-dimension-320), 100%);
}

.behaviour-demo-markup > sgds-progress-bar {
  display: block;
  max-width: var(--sgds-dimension-480);
  width: 100%;
}

.portal-masthead-width-demo {
  align-items: center;
  block-size: var(--sgds-dimension-144);
  display: flex;
  inline-size: 100%;
  justify-content: center;
  overflow: hidden;
}

.portal-masthead-width-demo__viewport {
  flex: 0 1 calc(var(--sgds-dimension-688) + var(--sgds-dimension-96));
  inline-size: min(100%, calc(var(--sgds-dimension-688) + var(--sgds-dimension-96)));
}

.portal-masthead-width-demo__viewport--fluid {
  flex-basis: 100%;
  inline-size: 100%;
}

.portal-masthead-width-demo .portal-masthead-mainnav-brand-slot {
  align-self: center;
  block-size: var(--sgds-dimension-48);
  display: flex;
  line-height: var(--sgds-line-height-24);
  padding-block: var(--sgds-padding-xs);
}

.portal-mainnav-width-demo {
  --sgds-mainnav-max-width: var(--sgds-dimension-480);
}

.portal-system-banner-width-demo {
  --sgds-mainnav-max-width: var(--sgds-dimension-480);
}

.behaviour-demo-markup sgds-alert-link {
  vertical-align: baseline;
}

</style>
