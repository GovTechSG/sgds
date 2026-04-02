<script setup lang="ts">
import Section from "./Section.vue";
import lightnessSvg from "../assets/lightness.svg?raw";

const grayscaleContrastScale = "/colour-system/grayscale-contrast-scale.svg";
const risingCurve = "https://www.figma.com/api/mcp/asset/2376eb16-dc72-4952-bbfc-66c175bd1a36";

const chartSections = [
  {
    key: "lightness",
    title: "Lightness",
    description:
      "SGDS’s grays follow a perceptually curved progression of lightness. The outcome is a progression of gray color values that are optimal for SGDS’s usage of gray. Each lightness value was converted into a target contrast ratio, which follow a polynomial curve.",
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
  <div :class="$style.page">
    <div :class="$style.sectionStack">
      <div :class="$style.pageSection">
        <div :class="$style.introCard">
          <img
            :class="$style.introSvg"
            :src="grayscaleContrastScale"
            alt="Grayscale contrast scale from white to black with contrast threshold labels"
          />
        </div>
      </div>

      <div
        v-for="section in chartSections"
        :key="section.title"
        :class="$style.pageSection"
      >
        <Section :title="section.title" :description="section.description">
          <div :class="$style.chartCard">
            <div
              v-if="section.key === 'lightness'"
              :class="$style.lightnessChart"
              role="img"
              aria-label="Lightness chart from gray-100 to gray-1000 with 100 percent, 50 percent, and 0 percent markers"
              v-html="lightnessSvg"
            />
            <div v-else :class="$style.chartFrame">
              <div :class="[$style.axisLabel, $style.axisLabelTop]">{{ section.yTop }}</div>
              <div :class="[$style.axisLabel, $style.axisLabelMid]">{{ section.yMid }}</div>
              <div :class="[$style.axisLabel, $style.axisLabelBottom]">{{ section.yBottom }}</div>
              <div :class="[$style.axisLabel, $style.axisLabelLeftX]">gray-100</div>
              <div :class="[$style.axisLabel, $style.axisLabelRightX]">gray-1000</div>
              <img :class="$style.chartImage" :src="section.image" alt="" />
            </div>
          </div>
        </Section>
      </div>

      <div :class="$style.pageSection">
        <Section title="Resources">
          <div :class="$style.resourcesCard">
            <p :class="$style.resourcesText">Best practices and articles</p>
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
  gap: var(--sgds-layout-padding-xl);
}

.pageSection {
  display: flex;
  flex-direction: column;
}

.introCard,
.chartCard,
.resourcesCard {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  overflow: hidden;
  width: 100%;
}

.introCard {
  border-radius: var(--sgds-border-radius-2-xl);
  padding: var(--sgds-padding-none);
}

.introSvg {
  display: block;
  height: auto;
  width: 100%;
}

.chartCard {
  border-radius: var(--sgds-border-radius-xl);
  min-height: var(--sgds-dimension-480);
  padding: var(--sgds-padding-none);
}

.lightnessChart {
  box-sizing: border-box;
  padding: var(--sgds-component-padding-md);
  width: 100%;
}

.lightnessChart :global(svg) {
  display: block;
  height: auto;
  width: 100%;
}

.chartFrame {
  height: var(--sgds-dimension-480);
  position: relative;
}

.chartSvg {
  display: block;
  height: auto;
  width: 100%;
}

.chartImage {
  height: var(--sgds-dimension-256);
  left: 50%;
  object-fit: contain;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(100%, var(--sgds-dimension-640));
}

.axisLabel {
  color: var(--sgds-label-color-subtle);
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  position: absolute;
}

.axisLabelTop {
  left: var(--sgds-dimension-96);
  top: var(--sgds-dimension-24);
}

.axisLabelMid {
  left: var(--sgds-dimension-112);
  top: 50%;
  transform: translateY(-50%);
}

.axisLabelBottom {
  left: var(--sgds-dimension-128);
  bottom: var(--sgds-dimension-24);
}

.axisLabelLeftX {
  bottom: var(--sgds-dimension-24);
  left: var(--sgds-dimension-160);
}

.axisLabelRightX {
  bottom: var(--sgds-dimension-24);
  right: var(--sgds-dimension-160);
}

.resourcesCard {
  align-items: center;
  border-radius: var(--sgds-border-radius-2-xl);
  display: flex;
  justify-content: center;
  min-height: var(--sgds-dimension-320);
}

.resourcesText {
  color: var(--sgds-body-color-default);
  font-size: var(--sgds-font-size-3);
  font-weight: var(--sgds-font-weight-semibold);
  line-height: var(--sgds-line-height-24);
  margin: 0;
  text-align: center;
}

@media (max-width: 1023px) {
  .introCard,
  .chartCard {
    min-height: auto;
  }

  .lightnessChart :global(svg) {
    min-height: var(--sgds-dimension-256);
  }

  .chartImage {
    width: calc(100% - var(--sgds-dimension-96));
  }
}

@media (max-width: 767px) {
  .introCard,
  .resourcesCard {
    border-radius: var(--sgds-border-radius-xl);
  }

  .chartCard {
    padding: var(--sgds-padding-none);
  }

  .introCard {
    padding: var(--sgds-padding-none);
  }

  .chartFrame {
    min-height: var(--sgds-dimension-256);
  }

  .chartImage {
    width: calc(100% - var(--sgds-dimension-32));
  }

  .axisLabel {
    font-size: var(--sgds-font-size-1);
    line-height: var(--sgds-line-height-20);
  }

  .axisLabelTop {
    left: var(--sgds-dimension-20);
    top: var(--sgds-dimension-12);
  }

  .axisLabelMid {
    left: var(--sgds-dimension-28);
  }

  .axisLabelBottom {
    left: var(--sgds-dimension-36);
    bottom: var(--sgds-dimension-12);
  }

  .axisLabelLeftX {
    bottom: var(--sgds-dimension-12);
    left: var(--sgds-dimension-40);
  }

  .axisLabelRightX {
    bottom: var(--sgds-dimension-12);
    right: var(--sgds-dimension-24);
  }

}
</style>
