<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";

const glyphRows = [
  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
  ["M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X"],
  ["Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
  ["k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v"],
  ["w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7"],
  ["8", "9", "!", "?", "@", "#", "%", "&", "{", "}", "+", "="],
] as const;

const fontWeights = [
  {
    title: "Bold",
    description:
      "Inter Bold can be used for <strong>ALL</strong> displays and headings.",
    demo: "This is Inter Bold 700",
    weightClass: "fontWeightBold",
  },
  {
    title: "Semi Bold",
    description:
      "Inter Semi Bold can be used for subtitles, labels and buttons but should <strong>NEVER</strong> be used for body copy.",
    demo: "This is Inter Semi Bold 600",
    weightClass: "fontWeightSemibold",
  },
  {
    title: "Regular",
    description:
      "Inter Regular can be used for <strong>ALL</strong> body copy, long-form paragraph content, footnotes, captions and labels.",
    demo: "This is Inter Regular 400",
    weightClass: "fontWeightRegular",
  },
  {
    title: "Light",
    description:
      "Inter Light can be used for displays, headings, subtitles and placeholder text but should <strong>NEVER</strong> be used for body copy.",
    demo: "This is Inter Light 300",
    weightClass: "fontWeightLight",
  },
] as const;
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Inter</h2>
      <div class="typography-page-template__body">
        <div class="typography-page-template__copy-block">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Inter is a typeface carefully crafted and designed for computer screens. Inter features a tall x-height to aid in the readability of mixed-case and lower-case text.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Each set of weights serves a different purpose.
          </p>

          <p :class="$style.linkText">
            <a
              href="https://fonts.google.com/specimen/Inter"
              target="_blank"
              rel="noreferrer"
              :class="$style.link"
            >
              Download Inter
            </a>
          </p>
        </div>

        <div :class="$style.demoCard">
          <div :class="$style.glyphGrid">
            <template
              v-for="(row, rowIndex) in glyphRows"
              :key="`row-${rowIndex}`"
            >
              <div
                v-for="glyph in row"
                :key="`${rowIndex}-${glyph}`"
                :class="$style.glyphCell"
              >
                <span :class="$style.glyph">{{ glyph }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Font weight</h2>
      <div class="typography-page-template__body">
        <article
          v-for="item in fontWeights"
          :key="item.title"
          class="typography-page-template__split-row"
        >
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ item.title }}</h4>
            <p
              class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal"
              v-html="item.description"
            >
            </p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div :class="$style.weightCard">
              <p :class="[$style.weightDemoText, $style[item.weightClass]]">{{ item.demo }}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style module>
.demoCard {
  background: var(--sgds-surface-fixed-dark);
  border: 1px solid var(--sgds-border-color-default);
  border-radius: var(--sgds-border-radius-2-xl);
  box-sizing: border-box;
  overflow: hidden;
  padding: var(--sgds-component-padding-xs);
  width: 100%;
}

.glyphGrid {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(4.5rem, 1fr));
  min-width: 0;
}

.glyphCell {
  align-items: center;
  border-bottom: 1px solid color-mix(in srgb, var(--sgds-border-color-default) 64%, transparent);
  border-right: 1px solid color-mix(in srgb, var(--sgds-border-color-default) 64%, transparent);
  display: flex;
  justify-content: center;
  border-left: 1px solid color-mix(in srgb, var(--sgds-border-color-default) 64%, transparent);
  border-top: 1px solid color-mix(in srgb, var(--sgds-border-color-default) 64%, transparent);
  min-height: clamp(4rem, 8vw, 5.5rem);
}

.glyph {
  color: var(--sgds-color-fixed-light);
  font-family: var(--sgds-font-family-brand);
  font-size: clamp(2rem, 3vw, 2.5rem);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: -0.05rem;
  line-height: 1.3;
}

.link {
  color: var(--sgds-link-color-default);
}

.linkText {
  margin: 0;
}
.typography-page-template__copy-pane :global(strong) {
  font-weight: var(--sgds-font-weight-semibold);
}

.weightCard {
  align-items: center;
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  min-height: 12rem;
  padding-block: var(--sgds-component-padding-md);
  padding-inline: var(--sgds-component-padding-xs);
  width: 100%;
}

.weightDemoText {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-5);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-32);
  margin: 0;
  text-align: center;
}

.fontWeightBold {
  font-weight: var(--sgds-font-weight-bold);
}

.fontWeightSemibold {
  font-weight: var(--sgds-font-weight-semibold);
}

.fontWeightRegular {
  font-weight: var(--sgds-font-weight-regular);
}

.fontWeightLight {
  font-weight: var(--sgds-font-weight-light);
}

@media (max-width: 1023px) {
  .demoCard {
    padding: var(--sgds-component-padding-sm);
  }
}

@media (max-width: 767px) {
  .glyphGrid {
    grid-template-columns: repeat(auto-fit, minmax(3.75rem, 1fr));
  }
}
</style>
