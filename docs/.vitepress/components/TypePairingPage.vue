<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";

const pairingExamples = [
  {
    title: "Pairing example A",
    summary: "Display medium bold + Heading medium light (subheading)",
    formula: "48 / 4 = 12 px",
    variant: "a",
  },
  {
    title: "Pairing example B",
    summary: "Heading large bold + Body large regular",
    formula: "32 / 4 = 8 px",
    variant: "b",
  },
  {
    title: "Pairing example C",
    summary: "Subtitle medium semibold + Body small regular",
    formula: "20 / 4 = 5 px ≈ 4 px",
    variant: "c",
  },
  {
    title: "Pairing example D",
    summary: "Label medium semibold + Caption regular",
    formula: "16 / 4 = 4 px",
    variant: "d",
  },
] as const;
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <div class="typography-page-template__body">
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Spacing formula</h4>
            <div :class="$style.formulaChip">
              <span class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Font size / 4</span>
            </div>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Example: 28 / 4 = 7 ≈ 8 px (round up to nearest system spacing)
            </p>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card" :class="$style.demoCard">
              <div :class="$style.pairingCard">
                <div :class="$style.pairingBand"></div>
                <span :class="$style.fontSizeLabel">font size 28px</span>
                <span :class="$style.spacingLabel">8 px</span>

                <div :class="$style.pairingTextGroup">
                  <h3 :class="$style.headerText">This is a header</h3>
                  <p :class="$style.bodyText">This is a body</p>
                </div>

                <div :class="$style.spacingGuide"></div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="typography-page-template__section">
      <div class="typography-page-template__body">
        <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Type pairing example</h3>

        <article
          v-for="example in pairingExamples"
          :key="example.title"
          class="typography-page-template__split-row"
        >
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ example.title }}</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ example.summary }}</p>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ example.formula }}</p>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card" :class="$style.exampleDemoCard">
              <div :class="[$style.exampleCanvas, $style[`exampleCanvas${example.variant.toUpperCase()}`]]">
                <div :class="$style.exampleInner">
                  <div :class="[$style.exampleSpacingBand, $style[`exampleSpacingBand${example.variant.toUpperCase()}`]]"></div>
                  <span :class="[$style.exampleSpacingLabel, $style[`exampleSpacingLabel${example.variant.toUpperCase()}`]]">
                    {{ example.variant === "a" ? "12 px" : example.variant === "b" ? "8 px" : "4 px" }}
                  </span>
                  <div :class="[$style.exampleSpacingGuide, $style[`exampleSpacingGuide${example.variant.toUpperCase()}`]]"></div>

                  <div :class="[$style.exampleTextWrap, $style[`exampleTextWrap${example.variant.toUpperCase()}`]]">
                    <p :class="[$style.exampleHeading, $style[`exampleHeading${example.variant.toUpperCase()}`]]">Introduction</p>
                    <p :class="[$style.exampleBody, $style[`exampleBody${example.variant.toUpperCase()}`]]">
                      An agency should consider using the privacy statement template appended below, and to only deviate from it when there are good reasons to do so.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style module>
.demoCard {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 15rem;
  padding: var(--sgds-component-padding-xs);
}

.pairingCard {
  background: var(--sgds-surface-default);
  border-radius: calc(var(--sgds-border-radius-xl) - var(--sgds-border-width-1));
  min-height: 13.5rem;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.pairingBand {
  background: color-mix(in srgb, var(--sgds-border-color-default) 25%, transparent);
  height: 8px;
  left: 0;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-4px);
}

.pairingTextGroup {
  align-items: flex-start;
  color: var(--sgds-body-color-default);
  display: flex;
  flex-direction: column;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -34px);
  width: max-content;
}

.headerText {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-heading-md, 28px);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-md);
  margin: 0;
}

.bodyText {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-body-md, 16px);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
  margin: 8px 0 0;
}

.fontSizeLabel,
.spacingLabel {
  color: var(--sgds-label-color-default);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-0);
  font-weight: var(--sgds-font-weight-regular);
  line-height: var(--sgds-line-height-16);
  position: absolute;
  white-space: nowrap;
}

.fontSizeLabel {
  left: 16px;
  top: calc(50% - 20px);
}

.spacingLabel {
  left: calc(50% + 129px);
  top: calc(50% - 8px);
}

.spacingGuide {
  border-left: 1px solid var(--sgds-border-color-emphasis);
  height: 8px;
  left: calc(50% + 108px);
  position: absolute;
  top: 50%;
  transform: translateY(-4px);
}

.formulaChip {
  align-items: center;
  align-self: flex-start;
  background: color-mix(in srgb, var(--sgds-border-color-default) 25%, transparent);
  border-radius: var(--sgds-border-radius-sm);
  display: inline-flex;
  padding: 8px 12px;
}

.exampleDemoCard {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 20rem;
  padding: var(--sgds-component-padding-xs);
}

.exampleCanvas {
  align-items: center;
  background: var(--sgds-surface-default);
  border-radius: calc(var(--sgds-border-radius-xl) - var(--sgds-border-width-1));
  display: flex;
  justify-content: center;
  min-height: 18rem;
  overflow: visible;
  position: relative;
  width: 100%;
}

.exampleInner {
  position: relative;
  width: 436px;
}

.exampleCanvasA {
  min-height: 20rem;
}

.exampleCanvasB,
.exampleCanvasC,
.exampleCanvasD {
  min-height: 17.5rem;
}

.exampleTextWrap {
  color: var(--sgds-body-color-default);
  position: relative;
  width: 100%;
}

.exampleHeading,
.exampleBody {
  color: var(--sgds-body-color-default);
  margin: 0;
}

.exampleHeadingA {
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-display-md, 48px);
  font-weight: var(--sgds-font-weight-bold);
  letter-spacing: var(--sgds-letter-spacing-tighter, -1px);
  line-height: var(--sgds-line-height-2-xl);
}

.exampleBodyA {
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-heading-md, 28px);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-md);
  margin-top: 12px;
}

.exampleHeadingB {
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-heading-lg, 32px);
  font-weight: var(--sgds-font-weight-bold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-lg);
}

.exampleBodyB {
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-body-lg, 20px);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-md);
  margin-top: 8px;
}

.exampleHeadingC {
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-subtitle-md, 20px);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.exampleBodyC {
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-body-sm, 14px);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
  margin-top: 4px;
}

.exampleHeadingD {
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-label-md, 16px);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.exampleBodyD {
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-caption-md, 14px);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
  margin-top: 4px;
}

.exampleSpacingBand {
  background: color-mix(in srgb, var(--sgds-border-color-default) 25%, transparent);
  left: 0;
  position: absolute;
  right: 0;
}

.exampleSpacingBandA {
  height: 12px;
  top: 50px;
}

.exampleSpacingBandB {
  height: 8px;
  top: 43px;
}

.exampleSpacingBandC,
.exampleSpacingBandD {
  height: 4px;
  top: 24px;
}

.exampleSpacingLabel {
  color: var(--sgds-label-color-default);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-0);
  font-weight: var(--sgds-font-weight-regular);
  line-height: var(--sgds-line-height-16);
  left: -38px;
  position: absolute;
  white-space: nowrap;
}

.exampleSpacingLabelA {
  top: 48px;
}

.exampleSpacingLabelB {
  left: -33px;
  top: 39px;
}

.exampleSpacingLabelC,
.exampleSpacingLabelD {
  left: -33px;
  top: 17px;
}

.exampleSpacingGuide {
  border-left: 1px solid var(--sgds-border-color-emphasis);
  left: 0;
  position: absolute;
}

.exampleSpacingGuideA {
  height: 12px;
  top: 50px;
}

.exampleSpacingGuideB {
  height: 8px;
  top: 43px;
}

.exampleSpacingGuideC,
.exampleSpacingGuideD {
  height: 4px;
  top: 24px;
}

@media (max-width: 1023px) {
  .demoCard {
    min-height: auto;
  }

  .pairingCard {
    min-height: 12rem;
  }

  .exampleDemoCard {
    min-height: auto;
  }
}

@media (max-width: 767px) {
  .pairingTextGroup {
    transform: translate(-50%, -30px) scale(0.88);
    transform-origin: center;
  }

  .fontSizeLabel {
    left: calc(50% - 126px);
  }

  .spacingGuide {
    left: calc(50% + 92px);
  }

  .spacingLabel {
    left: calc(50% + 110px);
  }

  .exampleInner {
    width: calc(100% - 2.5rem);
  }

  .exampleSpacingLabel {
    left: -1rem;
  }
}
</style>
