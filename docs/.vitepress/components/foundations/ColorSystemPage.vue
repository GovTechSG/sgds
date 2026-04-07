<script setup lang="ts">
import Section from "./Section.vue";
import lightnessSvg from "../../assets/lightness.svg?raw";

const grayscaleContrastScale = "/colour-system/grayscale-contrast-scale.svg";
const risingCurve = "https://www.figma.com/api/mcp/asset/2376eb16-dc72-4952-bbfc-66c175bd1a36";

const chartSections = [
  {
    key: "lightness",
    title: "Lightness",
    description:
      "SGDS's grays follow a perceptually curved progression of lightness. The outcome is a progression of gray color values that are optimal for SGDS's usage of gray. Each lightness value was converted into a target contrast ratio, which follow a polynomial curve.",
  },
  {
    key: "contrast",
    title: "Contrast",
    description: "Grays include contrast ratios above and below a 1:1 contrast with the background.",
    image: risingCurve,
    yTop: "20",
    yMid: "10",
    yBottom: "0",
  },
  {
    key: "chromatic-luminance",
    title: "Chromatic luminance",
    description:
      "As colors increase in saturation, they appear to have a brighter luminosity (also known as the Helmholtz–Kohlrausch effect). This affects SGDS colors that differ in saturation levels.",
    image: risingCurve,
    yTop: "20",
    yMid: "10",
    yBottom: "0",
  },
  {
    key: "stevens-power-law",
    title: "Stevens' power law",
    description:
      "This law is an observation in the rate of change in a given stimulus, and it affects lightness scales for color. Numerically even distributions of tints and shades (in a perceptually uniform color space) will not appear to be equally distributed.",
    image: risingCurve,
    yTop: "20",
    yMid: "10",
    yBottom: "0",
  },
];
</script>

<template>
  <div class="sgds:w-full">
    <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-layout-padding-xl)]">
      <div class="sgds:flex sgds:flex-col">
        <div class="sgds:bg-surface-raised sgds:border sgds:border-muted sgds:overflow-hidden sgds:w-full sgds:rounded-[var(--sgds-border-radius-2-xl)] sgds:p-0">
          <img
            class="sgds:block sgds:h-auto sgds:w-full"
            :src="grayscaleContrastScale"
            alt="Grayscale contrast scale from white to black with contrast threshold labels"
          />
        </div>
      </div>

      <div
        v-for="section in chartSections"
        :key="section.title"
        class="sgds:flex sgds:flex-col"
      >
        <Section :title="section.title" :description="section.description">
          <div class="colour-chart-card sgds:bg-surface-raised sgds:border sgds:border-muted sgds:overflow-hidden sgds:w-full sgds:rounded-xl sgds:min-h-[var(--sgds-dimension-480)] sgds:p-0 sgds:max-lg:min-h-[auto]">
            <div
              v-if="section.key === 'lightness'"
              class="colour-lightness-chart sgds:box-border sgds:p-component-md sgds:w-full"
              role="img"
              aria-label="Lightness chart from gray-100 to gray-1000 with 100 percent, 50 percent, and 0 percent markers"
              v-html="lightnessSvg"
            />
            <div v-else class="colour-chart-frame sgds:h-[var(--sgds-dimension-480)] sgds:relative sgds:max-md:min-h-[var(--sgds-dimension-256)]">
              <div class="colour-axis-label colour-axis-label-top sgds:text-[color:var(--sgds-label-color-subtle)] sgds:text-2 sgds:font-regular sgds:tracking-normal sgds:leading-[24px] sgds:absolute">{{ section.yTop }}</div>
              <div class="colour-axis-label colour-axis-label-mid sgds:text-[color:var(--sgds-label-color-subtle)] sgds:text-2 sgds:font-regular sgds:tracking-normal sgds:leading-[24px] sgds:absolute">{{ section.yMid }}</div>
              <div class="colour-axis-label colour-axis-label-bottom sgds:text-[color:var(--sgds-label-color-subtle)] sgds:text-2 sgds:font-regular sgds:tracking-normal sgds:leading-[24px] sgds:absolute">{{ section.yBottom }}</div>
              <div class="colour-axis-label colour-axis-label-left-x sgds:text-[color:var(--sgds-label-color-subtle)] sgds:text-2 sgds:font-regular sgds:tracking-normal sgds:leading-[24px] sgds:absolute">gray-100</div>
              <div class="colour-axis-label colour-axis-label-right-x sgds:text-[color:var(--sgds-label-color-subtle)] sgds:text-2 sgds:font-regular sgds:tracking-normal sgds:leading-[24px] sgds:absolute">gray-1000</div>
              <img class="colour-chart-image sgds:h-[var(--sgds-dimension-256)] sgds:left-1/2 sgds:object-contain sgds:absolute sgds:top-1/2 sgds:-translate-x-1/2 sgds:-translate-y-1/2 sgds:w-[min(100%,var(--sgds-dimension-640))]" :src="section.image" alt="" />
            </div>
          </div>
        </Section>
      </div>

      <div class="sgds:flex sgds:flex-col">
        <Section title="Resources">
          <div class="sgds:flex sgds:items-center sgds:justify-center sgds:bg-surface-raised sgds:border sgds:border-muted sgds:overflow-hidden sgds:w-full sgds:rounded-[var(--sgds-border-radius-2-xl)] sgds:min-h-[var(--sgds-dimension-320)]">
            <p class="sgds:text-default sgds:text-3 sgds:font-semibold sgds:leading-[24px] sgds:m-0 sgds:text-center">Best practices and articles</p>
          </div>
        </Section>
      </div>
    </div>
  </div>
</template>

<style>
/* Global selector targeting SVG rendered via v-html in lightness chart */
.colour-lightness-chart svg {
  display: block;
  height: auto;
  width: 100%;
}

@media (max-width: 1023px) {
  .colour-lightness-chart svg {
    min-height: var(--sgds-dimension-256);
  }
}

/* Axis label positions — require precise absolute positioning with CSS variables */
.colour-axis-label-top {
  left: var(--sgds-dimension-96);
  top: var(--sgds-dimension-24);
}

.colour-axis-label-mid {
  left: var(--sgds-dimension-112);
  top: 50%;
  transform: translateY(-50%);
}

.colour-axis-label-bottom {
  left: var(--sgds-dimension-128);
  bottom: var(--sgds-dimension-24);
}

.colour-axis-label-left-x {
  bottom: var(--sgds-dimension-24);
  left: var(--sgds-dimension-160);
}

.colour-axis-label-right-x {
  bottom: var(--sgds-dimension-24);
  right: var(--sgds-dimension-160);
}

/* Chart image responsive width — requires calc() */
.colour-chart-image {
  width: min(100%, var(--sgds-dimension-640));
}

@media (max-width: 1023px) {
  .colour-chart-image {
    width: calc(100% - var(--sgds-dimension-96));
  }
}

@media (max-width: 767px) {
  .colour-chart-image {
    width: calc(100% - var(--sgds-dimension-32));
  }

  .colour-axis-label {
    font-size: var(--sgds-font-size-1);
    line-height: var(--sgds-line-height-20);
  }

  .colour-axis-label-top {
    left: var(--sgds-dimension-20);
    top: var(--sgds-dimension-12);
  }

  .colour-axis-label-mid {
    left: var(--sgds-dimension-28);
  }

  .colour-axis-label-bottom {
    left: var(--sgds-dimension-36);
    bottom: var(--sgds-dimension-12);
  }

  .colour-axis-label-left-x {
    bottom: var(--sgds-dimension-12);
    left: var(--sgds-dimension-40);
  }

  .colour-axis-label-right-x {
    bottom: var(--sgds-dimension-12);
    right: var(--sgds-dimension-24);
  }
}
</style>
