<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";

const scaleSteps = [
  { label: "14", className: "scaleStep14" },
  { label: "16", className: "scaleStep16" },
  { label: "20", className: "scaleStep20" },
  { label: "24", className: "scaleStep24" },
  { label: "28", className: "scaleStep28" },
  { label: "32", className: "scaleStep32" },
  { label: "40", className: "scaleStep40" },
  { label: "48", className: "scaleStep48" },
  { label: "56", className: "scaleStep56" },
] as const;

</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <div class="typography-page-template__body">
        <div class="typography-page-template__copy-block">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            The type system includes a range of contrasting styles that support the needs of your product and its content.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            The type scale is a combination of 40 styles that are supported by the type system. It contains reusable categories of text, each with an intended application and meaning.
          </p>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section">
      <div class="typography-page-template__body">
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Base size</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              The default text size in browsers is 16px/1rem.
            </p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card" :class="$style.demoCard">
              <div :class="$style.measureCard">
                <div :class="[$style.measureRule, $style.measureRuleTop]"></div>
                <div :class="[$style.measureRule, $style.measureRuleMiddle]"></div>
                <div :class="$style.measureWrap">
                  <span :class="$style.measureNumber">16</span>
                  <span :class="$style.measureGuide"></span>
                  <span :class="$style.measureLabel">16 px</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Type scale aspect ratio</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              The aspect ratio of the type system is minor third (1.200).
            </p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card" :class="$style.demoCard">
              <div :class="$style.scaleCard">
                <div :class="$style.scaleGroup">
                  <div
                    v-for="step in scaleSteps"
                    :key="step.label"
                    :class="[$style.scaleStep, $style[step.className]]"
                  >
                    {{ step.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Line height aspect ratio</h4>
            <div :class="$style.copyList">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                In the type system there are 2 aspect ratios for line height:
              </p>
              <ol class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal" :class="$style.orderedList">
                <li>Minor third (1.200) for displays, headings and subtitles</li>
                <li>Perfect fifth (1.500) for body text, labels, captions and overline</li>
              </ol>
            </div>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card" :class="$style.demoCard">
              <div :class="$style.lineHeightCard">
                <div :class="[$style.measureRule, $style.lineRuleTop]"></div>
                <div :class="[$style.measureRule, $style.lineRuleMiddle]"></div>
                <div :class="[$style.measureRule, $style.lineRuleBottom]"></div>

                <div :class="$style.headingMeasure">
                  <span :class="$style.headingBaseline">Baseline</span>
                  <span :class="$style.headingWord">Heading</span>
                  <span :class="$style.headingGuide"></span>
                  <span :class="$style.headingLabel">52 px</span>
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

.measureCard,
.scaleCard,
.lineHeightCard {
  background: var(--sgds-surface-default);
  border-radius: calc(var(--sgds-border-radius-xl) - var(--sgds-border-width-1));
  position: relative;
  width: 100%;
}

.measureCard,
.lineHeightCard {
  min-height: 13.5rem;
}

.measureRule {
  border-top: 1px dashed var(--sgds-border-color-emphasis);
  left: 0;
  position: absolute;
  right: 0;
}

.measureRuleTop {
  top: 50%;
  transform: translateY(-32px);
}

.measureRuleMiddle {
  top: 50%;
  transform: translateY(32px);
}

.measureWrap {
  align-items: center;
  color: var(--sgds-body-color-default);
  display: flex;
  inset: 0;
  justify-content: center;
  position: absolute;
}

.measureNumber {
  font-family: var(--sgds-font-family-brand);
  font-size: 80px;
  font-weight: var(--sgds-font-weight-bold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: 80px;
}

.measureGuide {
  align-self: center;
  border-left: 1px solid var(--sgds-border-color-emphasis);
  height: 64px;
  margin: 0 12px;
}

.measureLabel,
.headingLabel,
.headingBaseline {
  color: var(--sgds-label-color-default);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-0);
  font-weight: var(--sgds-font-weight-regular);
  line-height: var(--sgds-line-height-16);
}

.measureLabel {
  margin-top: -2px;
  white-space: nowrap;
}

.scaleCard {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 13.5rem;
  padding: var(--sgds-component-padding-sm);
  width: 100%;
}

.scaleGroup {
  align-items: flex-end;
  display: inline-flex;
  gap: var(--sgds-gap-sm);
  justify-content: center;
  width: 100%;
}

.scaleStep {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-brand);
  font-weight: var(--sgds-font-weight-bold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: 1;
  flex: 0 0 auto;
  display: flex;
  align-items: flex-end;
}

.scaleStep14 {
  font-size: var(--sgds-font-size-body-sm, 14px);
}

.scaleStep16 {
  font-size: var(--sgds-font-size-body-md, 16px);
}

.scaleStep20 {
  font-size: var(--sgds-font-size-body-lg, 20px);
}

.scaleStep24 {
  font-size: var(--sgds-font-size-heading-sm, 24px);
}

.scaleStep28 {
  font-size: var(--sgds-font-size-heading-md, 28px);
}

.scaleStep32 {
  font-size: var(--sgds-font-size-heading-lg, 32px);
}

.scaleStep40 {
  font-size: var(--sgds-font-size-display-sm, 40px);
}

.scaleStep48 {
  font-size: var(--sgds-font-size-display-md, 48px);
}

.scaleStep56 {
  font-size: var(--sgds-font-size-display-lg, 56px);
}

.lineRuleTop {
  top: 0;
}

.lineRuleMiddle {
  top: 65px;
}

.lineRuleBottom {
  top: 84px;
}

.headingMeasure {
  align-items: flex-end;
  color: var(--sgds-body-color-default);
  display: flex;
  justify-content: center;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -42px);
  width: max-content;
}

.headingBaseline {
  bottom: 19px;
  left: -50px;
  position: absolute;
}

.headingWord {
  font-family: var(--sgds-font-family-brand);
  font-size: 64px;
  font-weight: var(--sgds-font-weight-bold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: 84px;
  margin: 0;
}

.headingGuide {
  align-self: flex-end;
  border-left: 1px solid var(--sgds-border-color-emphasis);
  height: 84px;
  margin: 0 12px;
}

.headingLabel {
  margin-bottom: 34px;
  white-space: nowrap;
}

.copyList {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
}

.orderedList {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
  padding-left: 1.5rem;
}

@media (max-width: 1023px) {
  .demoCard {
    min-height: auto;
  }

  .measureCard,
  .scaleCard,
  .lineHeightCard {
    min-height: 12rem;
  }
}

@media (max-width: 767px) {
  .scaleCard {
    min-height: 12rem;
  }

  .scaleGroup {
    flex-wrap: wrap;
  }

  .headingMeasure {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -42px) scale(0.72);
    transform-origin: top left;
  }
}
</style>
