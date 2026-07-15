<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, onUpdated, ref } from "vue";
import type { BestPractice } from "../../data/component-docs";
import CodeToken from "../ui/CodeToken.vue";
import { textParts } from "../../utils/text-parts";
import { setupPortalSteppers } from "../../utils/portal-stepper";

const props = defineProps<{
  bestPractices: BestPractice[];
  showTitles?: boolean;
  iconsInBox?: boolean;
  titleTag?: "h3" | "h4" | "h5" | "h6";
  compactTitles?: boolean;
  compactSidePadding?: boolean;
}>();

const bestPracticeRows = computed(() => {
  const dos = props.bestPractices.filter((item) => item.tone === "do");
  const donts = props.bestPractices.filter((item) => item.tone === "dont");
  const rowCount = Math.max(dos.length, donts.length);

  return Array.from({ length: rowCount }, (_, index) => ({
    do: dos[index] ?? null,
    dont: donts[index] ?? null,
  }));
});

const sectionRef = ref<HTMLElement | null>(null);
const pinnedTooltips = new WeakSet<Element>();
const pinnedToasts = new WeakSet<Element>();
const observedMainnavWrappers = new WeakSet<Element>();
let mainnavResizeObserver: ResizeObserver | null = null;
let mainnavFitFrame = 0;

const pinIllustrativeTooltip = (tooltip: Element) => {
  if (pinnedTooltips.has(tooltip)) return;
  pinnedTooltips.add(tooltip);

  tooltip.addEventListener("sgds-hide", () => {
    window.setTimeout(() => {
      if (!tooltip.isConnected) return;
      if ("show" in tooltip && typeof tooltip.show === "function") {
        tooltip.show();
      }
    }, 0);
  });
};

const setElementBooleanProperty = (element: Element, property: string, value: boolean) => {
  if (property in element) {
    (element as Element & Record<string, unknown>)[property] = value;
  }
};

const injectShadowStyles = (host: Element, id: string, css: string) => {
  const root = host.shadowRoot;
  if (!root) return;
  if (root.querySelector(`style[data-demo-style="${id}"]`)) return;
  const style = document.createElement("style");
  style.setAttribute("data-demo-style", id);
  style.textContent = css;
  root.appendChild(style);
};

const compactIllustrativeQuantityToggle = async (quantityToggle: Element) => {
  await customElements.whenDefined("sgds-quantity-toggle");
  await (quantityToggle as HTMLElement & { updateComplete?: Promise<unknown> }).updateComplete;
  const isExplicitCompact = quantityToggle.classList.contains("portal-quantity-toggle-compact");
  injectShadowStyles(
    quantityToggle,
    isExplicitCompact ? "quantity-toggle-best-practice-explicit-compact" : "quantity-toggle-best-practice-compact",
    isExplicitCompact
      ? `:host {
           display: block !important;
           flex: 0 0 var(--sgds-dimension-192) !important;
           inline-size: var(--sgds-dimension-192) !important;
           max-inline-size: var(--sgds-dimension-192) !important;
         }
         .input-group {
           inline-size: var(--sgds-dimension-192) !important;
           max-inline-size: var(--sgds-dimension-192) !important;
         }`
      : `.input-group {
           max-width: var(--sgds-dimension-240) !important;
         }`,
  );
};

const restyleIllustrativeMasthead = async (masthead: Element) => {
  await customElements.whenDefined("sgds-masthead");
  await (masthead as HTMLElement & { updateComplete?: Promise<unknown> }).updateComplete;
  injectShadowStyles(
    masthead,
    "masthead-restyled-best-practice",
    `.banner,
     .panel {
       background: var(--sgds-primary-surface-default) !important;
     }
     .container {
       padding-block: var(--sgds-padding-sm) !important;
     }
     .sg-crest path {
       fill: var(--sgds-color-fixed-light) !important;
     }
     .masthead-text-layout,
     .sgds-masthead-button {
       color: var(--sgds-color-fixed-light) !important;
       font-weight: var(--sgds-font-weight-bold) !important;
     }
     .sgds-masthead-button {
       text-decoration: underline !important;
     }`,
  );
};

const setupIllustrativeSteppers = async () => {
  await setupPortalSteppers(sectionRef.value);
};

const fitIllustrativeMainnavs = async () => {
  await nextTick();
  await customElements.whenDefined("sgds-mainnav");

  const navWrappers = Array.from(
    sectionRef.value?.querySelectorAll<HTMLElement>(".portal-demo-nav") ?? [],
  ).filter((wrapper) => wrapper.querySelector(":scope > sgds-mainnav"));

  for (const wrapper of navWrappers) {
    const mainnav = wrapper.querySelector(":scope > sgds-mainnav") as HTMLElement & {
      updateComplete?: Promise<unknown>;
    } | null;

    if (!mainnav) continue;

    wrapper.setAttribute("inert", "");
    wrapper.style.setProperty("--portal-mainnav-scale", "1");
    wrapper.style.setProperty("--portal-mainnav-width", "var(--sgds-dimension-768)");
    await mainnav.updateComplete;

    const availableWidth = wrapper.getBoundingClientRect().width;
    if (availableWidth <= 0) continue;

    const measuredRects = [
      mainnav.getBoundingClientRect(),
      ...Array.from(mainnav.children).map((child) => child.getBoundingClientRect()),
    ].filter((rect) => rect.width > 0 && rect.height > 0);

    const minLeft = Math.min(...measuredRects.map((rect) => rect.left));
    const maxRight = Math.max(...measuredRects.map((rect) => rect.right));
    const minTop = Math.min(...measuredRects.map((rect) => rect.top));
    const maxBottom = Math.max(...measuredRects.map((rect) => rect.bottom));
    const naturalWidth = Math.max(availableWidth, maxRight - minLeft);
    const naturalHeight = Math.max(80, maxBottom - minTop);
    const scale = naturalWidth > availableWidth
      ? Math.max(0.24, availableWidth / naturalWidth)
      : 1;

    wrapper.style.setProperty("--portal-mainnav-width", `${naturalWidth}px`);
    wrapper.style.setProperty("--portal-mainnav-height", `${naturalHeight}px`);
    wrapper.style.setProperty("--portal-mainnav-scale", String(scale));
  }
};

const scheduleFitIllustrativeMainnavs = () => {
  if (mainnavFitFrame) return;

  mainnavFitFrame = window.requestAnimationFrame(() => {
    mainnavFitFrame = 0;
    void fitIllustrativeMainnavs();
  });
};

const observeIllustrativeMainnavs = () => {
  if (typeof ResizeObserver === "undefined") return;

  mainnavResizeObserver ??= new ResizeObserver(scheduleFitIllustrativeMainnavs);

  Array.from(sectionRef.value?.querySelectorAll<HTMLElement>(".portal-demo-nav") ?? [])
    .filter((wrapper) => wrapper.querySelector(":scope > sgds-mainnav"))
    .forEach((wrapper) => {
      if (observedMainnavWrappers.has(wrapper)) return;
      observedMainnavWrappers.add(wrapper);
      mainnavResizeObserver?.observe(wrapper);
    });
};

const showIllustrativeToast = (toast: Element) => {
  toast.removeAttribute("autohide");
  toast.setAttribute("no-animation", "");
  toast.setAttribute("show", "");
  setElementBooleanProperty(toast, "autohide", false);
  setElementBooleanProperty(toast, "noAnimation", true);
  setElementBooleanProperty(toast, "show", true);
  toast.shadowRoot?.querySelector(".toast")?.classList.remove("d-none");
};

const pinIllustrativeToast = (toast: Element) => {
  showIllustrativeToast(toast);
  if (pinnedToasts.has(toast)) return;
  pinnedToasts.add(toast);

  toast.addEventListener("sgds-hide", () => {
    window.setTimeout(() => {
      if (!toast.isConnected) return;
      showIllustrativeToast(toast);
    }, 0);
  });

  toast.addEventListener("sgds-after-hide", () => {
    window.setTimeout(() => {
      if (!toast.isConnected) return;
      showIllustrativeToast(toast);
    }, 0);
  });
};

const showIllustrativeComponents = async () => {
  await nextTick();
  sectionRef.value
    ?.querySelectorAll("sgds-tooltip[open]")
    .forEach((tooltip) => {
      pinIllustrativeTooltip(tooltip);
      if ("show" in tooltip && typeof tooltip.show === "function") {
        tooltip.show();
      }
    });
  sectionRef.value
    ?.querySelectorAll("sgds-toast")
    .forEach(pinIllustrativeToast);
  sectionRef.value
    ?.querySelectorAll("sgds-quantity-toggle")
    .forEach((quantityToggle) => {
      void compactIllustrativeQuantityToggle(quantityToggle);
    });
  sectionRef.value
    ?.querySelectorAll("sgds-masthead.portal-masthead-restyled-demo")
    .forEach((masthead) => {
      void restyleIllustrativeMasthead(masthead);
    });
  await setupIllustrativeSteppers();
  observeIllustrativeMainnavs();
  await fitIllustrativeMainnavs();
};

onMounted(() => {
  void showIllustrativeComponents();
  window.addEventListener("resize", fitIllustrativeMainnavs);
});
onUpdated(showIllustrativeComponents);

onBeforeUnmount(() => {
  window.removeEventListener("resize", fitIllustrativeMainnavs);
  if (mainnavFitFrame) {
    window.cancelAnimationFrame(mainnavFitFrame);
    mainnavFitFrame = 0;
  }
  mainnavResizeObserver?.disconnect();
  mainnavResizeObserver = null;
});
</script>

<template>
  <div ref="sectionRef" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
    <div
      v-for="(row, index) in bestPracticeRows"
      :key="`best-practice-row-${index}`"
      class="best-practice-row"
    >
      <article v-if="row.do" :key="row.do.title" class="best-practice-card">
        <div :class="[
          'sgds:flex sgds:flex-col sgds:justify-center sgds:bg-alternate sgds:rounded-xl sgds:min-h-[var(--sgds-dimension-280)] sgds:relative sgds:overflow-hidden sgds:gap-[var(--sgds-gap-md)] sgds:py-component-md',
          compactSidePadding ? 'sgds:px-component-sm' : 'sgds:px-component-md',
        ]">
          <span
            v-if="iconsInBox"
            class="sgds:absolute sgds:top-component-xs sgds:right-component-xs sgds:z-[20] sgds:inline-flex sgds:items-center sgds:justify-center sgds:flex-none sgds:h-8 sgds:w-8 sgds:text-success-default"
          >
            <sgds-icon name="check-circle-fill" size="lg"></sgds-icon>
          </span>
          <div class="sgds:bg-transparent sgds:mx-auto sgds:max-w-[var(--sgds-dimension-512)] sgds:w-full">
            <div class="best-practice-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" inert v-html="row.do.markup"></div>
          </div>
        </div>
        <div :class="[
          iconsInBox ? 'sgds:flex sgds:flex-col sgds:gap-text-2-xs' : 'sgds:flex sgds:items-start sgds:gap-[var(--sgds-gap-xs)]',
          'sgds:min-w-0',
        ]">
          <span v-if="!iconsInBox" class="sgds:self-start sgds:inline-flex sgds:items-center sgds:justify-center sgds:flex-none sgds:h-8 sgds:w-8 sgds:text-success-default">
            <sgds-icon name="check-circle-fill" size="lg"></sgds-icon>
          </span>
          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <component
              :is="titleTag || 'h3'"
              v-if="showTitles"
              :class="[
                'sgds:text-heading-default sgds:m-0 sgds:font-semibold',
                compactTitles
                  ? 'sgds:text-subtitle-sm sgds:leading-2-xs sgds:tracking-normal'
                  : 'sgds:text-heading-sm sgds:leading-sm sgds:tracking-tight',
              ]"
            >{{ row.do.title }}</component>
            <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              <template
                v-for="(part, index) in textParts(row.do.description)"
                :key="`${part.text}-${index}`"
              >
                <CodeToken v-if="part.isCode" :label="part.text" />
                <template v-else>{{ part.text }}</template>
              </template>
            </p>
          </div>
        </div>
      </article>
      <div v-else class="sgds:max-md:hidden best-practice-placeholder sgds:min-w-0"></div>

      <article v-if="row.dont" :key="row.dont.title" class="best-practice-card">
        <div :class="[
          'sgds:flex sgds:flex-col sgds:justify-center sgds:bg-alternate sgds:rounded-xl sgds:min-h-[var(--sgds-dimension-280)] sgds:relative sgds:overflow-hidden sgds:gap-[var(--sgds-gap-md)] sgds:py-component-md',
          compactSidePadding ? 'sgds:px-component-sm' : 'sgds:px-component-md',
        ]">
          <span
            v-if="iconsInBox"
            class="sgds:absolute sgds:top-component-xs sgds:right-component-xs sgds:z-[20] sgds:inline-flex sgds:items-center sgds:justify-center sgds:flex-none sgds:h-8 sgds:w-8 sgds:text-danger-default"
          >
            <sgds-icon name="xcircle-fill" size="lg"></sgds-icon>
          </span>
          <div class="sgds:bg-transparent sgds:mx-auto sgds:max-w-[var(--sgds-dimension-512)] sgds:w-full">
            <div class="best-practice-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" inert v-html="row.dont.markup"></div>
          </div>
        </div>
        <div :class="[
          iconsInBox ? 'sgds:flex sgds:flex-col sgds:gap-text-2-xs' : 'sgds:flex sgds:items-start sgds:gap-[var(--sgds-gap-xs)]',
          'sgds:min-w-0',
        ]">
          <span v-if="!iconsInBox" class="sgds:self-start sgds:inline-flex sgds:items-center sgds:justify-center sgds:flex-none sgds:h-8 sgds:w-8 sgds:text-danger-default">
            <sgds-icon name="xcircle-fill" size="lg"></sgds-icon>
          </span>
          <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <component
              :is="titleTag || 'h3'"
              v-if="showTitles"
              :class="[
                'sgds:text-heading-default sgds:m-0 sgds:font-semibold',
                compactTitles
                  ? 'sgds:text-subtitle-sm sgds:leading-2-xs sgds:tracking-normal'
                  : 'sgds:text-heading-sm sgds:leading-sm sgds:tracking-tight',
              ]"
            >{{ row.dont.title }}</component>
            <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              <template
                v-for="(part, index) in textParts(row.dont.description)"
                :key="`${part.text}-${index}`"
              >
                <CodeToken v-if="part.isCode" :label="part.text" />
                <template v-else>{{ part.text }}</template>
              </template>
            </p>
          </div>
        </div>
      </article>
      <div v-else class="sgds:max-md:hidden best-practice-placeholder sgds:min-w-0"></div>
    </div>
  </div>
</template>

<style>
/* Utility gap: SGDS grid utilities do not provide subgrid. Best-practice pairs
   use subgrid so the demo panels stretch to the taller side while text remains
   visible and attached to its own card. */
.best-practice-row {
  align-items: stretch;
  column-gap: var(--sgds-gap-2-xl);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: minmax(var(--sgds-dimension-280), 1fr) auto;
  row-gap: var(--sgds-gap-component-sm);
}

.best-practice-card {
  display: grid;
  gap: var(--sgds-gap-component-sm);
  grid-row: span 2;
  grid-template-rows: subgrid;
  min-width: 0;
}

.best-practice-placeholder {
  grid-row: span 2;
}

@media (max-width: 767px) {
  .best-practice-row {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto;
    row-gap: var(--sgds-gap-2-xl);
  }

  .best-practice-card {
    grid-row: auto;
    grid-template-rows: minmax(var(--sgds-dimension-280), auto) auto;
  }

  .best-practice-placeholder {
    display: none;
  }
}

/* Global selectors targeting slotted web component elements in v-html markup */
.best-practice-demo-markup > sgds-accordion {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  display: block;
  overflow: hidden;
  width: 100%;
}

.best-practice-demo-markup > sgds-alert {
  display: block;
  width: 100%;
}

.best-practice-demo-markup > sgds-progress-bar {
  display: block;
  inline-size: min(100%, var(--sgds-dimension-384));
}

.best-practice-demo-markup > sgds-quantity-toggle.portal-quantity-toggle-compact {
  display: block;
  flex: 0 0 var(--sgds-dimension-192);
  inline-size: var(--sgds-dimension-192);
  max-inline-size: var(--sgds-dimension-192);
}

.best-practice-demo-markup sgds-alert-link {
  vertical-align: baseline;
}

/* Global selectors targeting v-html demos. Mainnav normally responds to the
   viewport, not the card container, so best-practice cards constrain it. */
.best-practice-demo-markup .portal-demo-nav {
  max-width: 100%;
  overflow: visible;
  pointer-events: none;
  width: 100%;
}

.best-practice-demo-markup sgds-mainnav {
  display: block;
  flex: 0 0 var(--portal-mainnav-width, var(--sgds-dimension-768));
  transform: scale(var(--portal-mainnav-scale, 1));
  transform-origin: center center;
  width: var(--portal-mainnav-width, var(--sgds-dimension-768));
}

.best-practice-demo-markup .portal-demo-nav:has(> sgds-mainnav) {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: calc(var(--portal-mainnav-height, 80px) * var(--portal-mainnav-scale, 1));
}
</style>
