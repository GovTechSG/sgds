<script setup lang="ts">
import Section from "./Section.vue";

const swatches = [
  { name: "White", color: "#FFFFFF", bordered: true, tone: "light" },
  { color: "#F3F3F3" },
  { color: "#DFDFDF" },
  { color: "#C6C6C6" },
  { color: "#A5A5A5" },
  { color: "#868686" },
  { color: "#6B6B6B" },
  { color: "#525252" },
  { color: "#3B3B3B" },
  { color: "#2A2A2A" },
  { color: "#1A1A1A" },
  { name: "Black", color: "#0E0E0E", tone: "dark" },
] as const;

const topLevels = [
  { label: "3.28 A", left: 1, right: 5, offset: "0rem" },
  { label: "4.8 AA", left: 1, right: 6, offset: "1.5rem" },
  { label: "7.04 AAA", left: 1, right: 7, offset: "3rem" },
] as const;

const bottomLevels = [
  { label: "7.06 AAA", left: 4, right: 10, offset: "0rem" },
  { label: "4.78 AA", left: 5, right: 10, offset: "1.5rem" },
  { label: "3.26 A", left: 6, right: 10, offset: "3rem" },
] as const;

const systemSections = [
  {
    title: "Lightness",
    description:
      "SGDS’s greys follow a perceptually curved progression of lightness. The outcome is a progression of grey colour values that are optimal for SGDS’s usage of grey. Each lightness value was converted into a target contrast ratio, which follows a polynomial curve.",
    yAxis: ["100%", "50%", "0%"],
    xAxis: ["gray-100", "gray-1000"],
    curve:
      "M0.149465 0.988767C43.1495 7.48877 157.149 47.4888 246.149 87.5756C335.149 127.663 530.003 195.615 624.649 219.489",
  },
  {
    title: "Contrast",
    description:
      "Greys include contrast ratios above and below a 1:1 contrast with the background.",
    yAxis: ["20", "10", "0"],
    xAxis: ["gray-100", "gray-1000"],
    curve:
      "M0.36441 204.479C31.3564 204.393 127.29 202.189 224.672 185.822C346.4 165.359 416.939 131.153 444.399 115.5C545.715 57.759 623.636 0.5 623.636 0.5",
  },
  {
    title: "Chromatic luminance",
    description:
      "As colours increase in saturation, they appear to have a brighter luminosity (also known as the Helmholtz–Kohlrausch effect). This affects SGDS colours that differ in saturation levels.",
    yAxis: ["20", "10", "0"],
    xAxis: ["gray-100", "gray-1000"],
    curve:
      "M0.5 196.5C67.5 194.5 145.5 188.5 224.5 173.5C310.5 157.5 391.5 133.5 465.5 102.5C532.5 74.5 585.5 41.5 624.5 12.5",
  },
  {
    title: "Stevens' power law",
    description:
      "This law is an observation in the rate of change in a given stimulus, and it affects lightness scales for colour. Numerically even distributions of tints and shades in a perceptually uniform colour space will not appear to be equally distributed.",
    yAxis: ["100%", "50%", "0%"],
    xAxis: ["gray-100", "gray-1000"],
    curve:
      "M0.5 6.5C41.5 12.5 120.5 34.5 207.5 63.5C290.5 91.5 392.5 131.5 486.5 171.5C542.5 195.5 590.5 214.5 624.5 220.5",
  },
] as const;
</script>

<template>
  <div :class="$style.page">
    <div :class="$style.sectionStack">
      <div :class="$style.pageSection">
        <div :class="$style.card">
          <div :class="$style.scaleFrame">
            <div
              v-for="level in topLevels"
              :key="level.label"
              :class="[$style.connector, $style.connectorTop]"
              :style="{
                left: `calc((100% / 12) * ${level.left} + var(--sgds-gap-xs) * ${level.left})`,
                right: `calc((100% / 12) * ${11 - level.right} + var(--sgds-gap-xs) * ${11 - level.right})`,
                top: level.offset,
              }"
            >
              <span :class="$style.connectorLabel">{{ level.label }}</span>
            </div>

            <div :class="$style.swatchRow" aria-label="Grayscale contrast scale">
              <div
                v-for="swatch in swatches"
                :key="swatch.name ?? swatch.color"
                :class="[
                  $style.swatch,
                  swatch.bordered ? $style.swatchBordered : '',
                  swatch.tone === 'dark' ? $style.swatchDark : '',
                ]"
                :style="{ backgroundColor: swatch.color }"
              >
                <span v-if="swatch.name" :class="$style.swatchLabel">{{ swatch.name }}</span>
              </div>
            </div>

            <div
              v-for="level in bottomLevels"
              :key="level.label"
              :class="[$style.connector, $style.connectorBottom]"
              :style="{
                left: `calc((100% / 12) * ${level.left} + var(--sgds-gap-xs) * ${level.left})`,
                right: `calc((100% / 12) * ${11 - level.right} + var(--sgds-gap-xs) * ${11 - level.right})`,
                bottom: level.offset,
              }"
            >
              <span :class="$style.connectorLabel">{{ level.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-for="section in systemSections"
        :key="section.title"
        :class="$style.pageSection"
      >
        <Section
          :title="section.title"
          :description="section.description"
        >
          <div :class="$style.chartCard">
            <div :class="$style.chartFrame">
              <div :class="$style.lightnessChart">
                <div :class="$style.lightnessYAxis">
                  <span
                    v-for="label in section.yAxis"
                    :key="`${section.title}-${label}`"
                    :class="$style.lightnessLabel"
                  >
                    {{ label }}
                  </span>
                </div>
                <div :class="$style.lightnessChartWrap">
                  <div :class="$style.lightnessChartBox">
                    <div :class="$style.lightnessChartHalf"></div>
                    <svg
                      :class="$style.lightnessCurve"
                      preserveAspectRatio="none"
                      viewBox="0 0 624.894 220.458"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        :d="section.curve"
                        stroke="var(--sgds-body-color-subtle)"
                        stroke-width="2"
                        vector-effect="non-scaling-stroke"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <div :class="$style.lightnessXAxis">
                    <span
                      v-for="label in section.xAxis"
                      :key="`${section.title}-${label}`"
                      :class="$style.lightnessLabel"
                    >
                      {{ label }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  </div>
</template>

<style module>
.page {
  width: 100%;
}

.sectionStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.pageSection {
  display: flex;
  flex-direction: column;
}

.card {
  background: var(--sgds-bg-color-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-2-xl);
  overflow: hidden;
  padding: var(--sgds-padding-3-xl);
}

.chartCard {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-2-xl);
  overflow: hidden;
  padding-top: calc(var(--sgds-layout-padding-sm) + var(--sgds-padding-sm));
  padding-bottom: var(--sgds-layout-padding-sm);
  padding-inline: var(--sgds-component-padding-md);
}

.scaleFrame {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
  margin: 0 auto;
  max-width: 61rem;
  padding-block: var(--sgds-padding-4-xl);
  position: relative;
}

.chartFrame {
  margin: 0 auto;
  max-width: 84.5rem;
  padding-block: var(--sgds-layout-gap-lg);
  width: 100%;
}

.lightnessChart {
  display: flex;
  gap: var(--sgds-gap-xs);
  margin: 0 auto;
  max-width: 36rem;
  width: 100%;
}

.lightnessYAxis {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
  padding-bottom: calc(var(--sgds-line-height-24) + var(--sgds-gap-xs));
  width: 2rem;
}

.lightnessLabel {
  color: var(--sgds-label-color-subtle);
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  white-space: nowrap;
}

.lightnessChartWrap {
  flex: 1;
  min-width: 0;
}

.lightnessChartBox {
  aspect-ratio: 624 / 252;
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
  position: relative;
  width: 100%;
}

.lightnessChartHalf {
  border-bottom: 1px solid var(--sgds-border-color-muted);
  height: 50%;
  width: 100%;
}

.lightnessCurve {
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.lightnessXAxis {
  display: flex;
  justify-content: space-between;
  margin-top: var(--sgds-gap-xs);
}

.swatchRow {
  align-items: center;
  display: grid;
  gap: var(--sgds-gap-xs);
  grid-template-columns: repeat(12, minmax(0, 1fr));
  position: relative;
  z-index: 2;
}

.swatch {
  align-items: center;
  aspect-ratio: 1;
  border-radius: var(--sgds-border-radius-xl);
  display: flex;
  justify-content: center;
  min-width: 0;
}

.swatchBordered {
  border: 1px solid var(--sgds-border-color-muted);
}

.swatchDark {
  color: var(--sgds-body-color-fixed-light);
}

.swatchLabel {
  color: inherit;
  font-size: var(--sgds-font-size-label-xs);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-16);
  text-align: center;
}

.connector {
  border-color: var(--sgds-border-color-muted);
  border-style: solid;
  border-width: 1px 1px 0;
  border-top-left-radius: var(--sgds-border-radius-xl);
  border-top-right-radius: var(--sgds-border-radius-xl);
  height: clamp(1.5rem, 4vw, 4rem);
  pointer-events: none;
  position: absolute;
  z-index: 1;
}

.connectorBottom {
  border-radius: 0 0 var(--sgds-border-radius-xl) var(--sgds-border-radius-xl);
  border-width: 0 1px 1px;
}

.connectorLabel {
  background: var(--sgds-surface-raised);
  color: var(--sgds-body-color-default);
  font-size: var(--sgds-font-size-label-xs);
  font-weight: var(--sgds-font-weight-regular);
  left: 50%;
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-16);
  padding-inline: var(--sgds-padding-xs);
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
}

.connectorTop .connectorLabel {
  top: -0.5rem;
}

.connectorBottom .connectorLabel {
  bottom: -0.5rem;
}

@media (max-width: 1023px) {
  .card {
    padding: var(--sgds-padding-2-xl);
  }

  .chartCard {
    padding-top: calc(var(--sgds-layout-padding-sm) + var(--sgds-padding-xs));
    padding-bottom: var(--sgds-layout-padding-sm);
    padding-inline: var(--sgds-component-padding-sm);
  }


}

@media (max-width: 767px) {
  .card {
    border-radius: var(--sgds-border-radius-xl);
    padding: var(--sgds-padding-xl);
  }

  .scaleFrame {
    gap: var(--sgds-layout-gap-md);
    padding-block: var(--sgds-padding-3-xl);
  }

  .chartCard {
    border-radius: var(--sgds-border-radius-xl);
    padding-top: calc(var(--sgds-layout-padding-xs) + var(--sgds-padding-xs));
    padding-bottom: var(--sgds-layout-padding-xs);
    padding-inline: var(--sgds-component-padding-xs);
  }

  .swatch {
    border-radius: var(--sgds-border-radius-lg);
  }

  .connectorLabel {
    font-size: var(--sgds-font-size-label-2-xs);
    line-height: var(--sgds-line-height-16);
  }
}
</style>
