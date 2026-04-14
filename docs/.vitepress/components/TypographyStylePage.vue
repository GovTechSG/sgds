<script setup lang="ts">
import { computed, ref } from "vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";

const codeExample = `:root {
  --sgds-font-size-heading-xl: 32px;
  --sgds-font-size-heading-lg: 28px;
  --sgds-font-size-heading-md: 24px;
  --sgds-font-size-heading-sm: 20px;
}

@media (min-width: 1024px) {
  :root {
    --sgds-font-size-heading-xl: 36px;
    --sgds-font-size-heading-lg: 30px;
    --sgds-font-size-heading-md: 28px;
    --sgds-font-size-heading-sm: 24px;
  }
}

@media (min-width: 1440px) {
  :root {
    --sgds-font-size-heading-xl: 40px;
    --sgds-font-size-heading-lg: 32px;
    --sgds-font-size-heading-md: 28px;
    --sgds-font-size-heading-sm: 24px;
  }
}`;

const displayMdBoldToggles = ref({
  fontSize: true,
  fontWeight: true,
  lineHeight: true,
  letterSpacing: true,
});

const displayMdBoldPreviewStyle = computed(() => ({
  fontSize: displayMdBoldToggles.value.fontSize ? "var(--sgds-font-size-display-md)" : "var(--sgds-font-size-body-md)",
  fontWeight: displayMdBoldToggles.value.fontWeight ? "var(--sgds-font-weight-bold)" : "var(--sgds-font-weight-regular)",
  lineHeight: displayMdBoldToggles.value.lineHeight ? "var(--sgds-line-height-2-xl)" : "var(--sgds-line-height-xs)",
  letterSpacing: displayMdBoldToggles.value.letterSpacing
    ? "var(--sgds-letter-spacing-tighter)"
    : "var(--sgds-letter-spacing-normal)",
}));

const updateDisplayMdBoldToggle = (
  key: keyof typeof displayMdBoldToggles.value,
  event: Event,
) => {
  const customEvent = event as CustomEvent<{ checked: boolean }>;
  displayMdBoldToggles.value[key] = Boolean(customEvent.detail?.checked);
};
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__copy-block">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            The SGDS typography system is responsive by default. Font sizes and line heights are defined through shared tokens so type scales consistently across mobile, tablet, and desktop layouts.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            This gives products a predictable hierarchy while reducing the need for custom breakpoint logic in individual pages and components.
          </p>
        </div>

        <div class="style-page__explainer">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            One typography style is made from a few variables applied together. For example,
            <CodeToken label="sgds-display-md-bold" />
            is built by combining the font size, weight, line height, and letter spacing variables below.
          </p>

          <div class="style-page__explainer-diagram">
            <div class="style-page__preview-pane">
              <p class="style-page__preview-text" :style="displayMdBoldPreviewStyle">
                Display medium bold
              </p>
            </div>

            <div class="style-page__utility-pane">
              <div class="style-page__variable-editor">
                <label class="style-page__variable-row">
                  <sgds-checkbox
                    :checked="displayMdBoldToggles.fontSize"
                    @sgds-change="updateDisplayMdBoldToggle('fontSize', $event)"
                  />
                  <span class="style-page__variable-row-text">
                    <span class="style-page__variable-row-prop">font-size</span>
                    <CodeToken label="var(--sgds-font-size-display-md)" :surface="false" />
                  </span>
                </label>
                <label class="style-page__variable-row">
                  <sgds-checkbox
                    :checked="displayMdBoldToggles.fontWeight"
                    @sgds-change="updateDisplayMdBoldToggle('fontWeight', $event)"
                  />
                  <span class="style-page__variable-row-text">
                    <span class="style-page__variable-row-prop">font-weight</span>
                    <CodeToken label="var(--sgds-font-weight-bold)" :surface="false" />
                  </span>
                </label>
                <label class="style-page__variable-row">
                  <sgds-checkbox
                    :checked="displayMdBoldToggles.lineHeight"
                    @sgds-change="updateDisplayMdBoldToggle('lineHeight', $event)"
                  />
                  <span class="style-page__variable-row-text">
                    <span class="style-page__variable-row-prop">line-height</span>
                    <CodeToken label="var(--sgds-line-height-2-xl)" :surface="false" />
                  </span>
                </label>
                <label class="style-page__variable-row">
                  <sgds-checkbox
                    :checked="displayMdBoldToggles.letterSpacing"
                    @sgds-change="updateDisplayMdBoldToggle('letterSpacing', $event)"
                  />
                  <span class="style-page__variable-row-text">
                    <span class="style-page__variable-row-prop">letter-spacing</span>
                    <CodeToken label="var(--sgds-letter-spacing-tighter)" :surface="false" />
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Responsive typography system</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__content-block">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            SGDS uses three primary breakpoints:
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <strong>Mobile</strong>: 0px and above. This is the default layer before any larger breakpoint overrides.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <strong>Tablet</strong>: 1024px and above. Type scales up selectively to preserve hierarchy and readability on wider layouts.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <strong>Desktop</strong>: 1440px and above. Larger display and heading styles expand again to suit large canvases and denser layouts.
          </p>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Key features</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__content-block">
          <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
            Automatic responsive scaling
          </h3>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Foundation typography scales with the viewport automatically. No additional per-component media queries are needed when you use the system tokens.
          </p>
        </div>

        <div class="typography-page-template__content-block">
          <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
            Consistent typography hierarchy
          </h3>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Headings keep a clear hierarchy across screen sizes. For example, H1 moves from 32px on mobile to 36px on tablet and 40px on desktop, while H2 moves from 28px to 30px and then 32px.
          </p>
        </div>

        <div class="typography-page-template__content-block">
          <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
            Body text handling
          </h3>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Smaller body sizes stay stable for comfortable reading. Larger body sizes increase only where extra emphasis is helpful, such as
            <CodeToken label="--sgds-font-size-body-lg" />
            scaling from 18px on mobile to 20px on tablet and desktop.
          </p>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Typography variables</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__content-block">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Typography variables are grouped by use case so they are easy to apply in both design and code.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <strong>Headings</strong> use tokens such as
            <CodeToken label="--sgds-font-size-heading-sm" />,
            <CodeToken label="--sgds-font-size-heading-md" />,
            <CodeToken label="--sgds-font-size-heading-lg" />,
            and
            <CodeToken label="--sgds-font-size-heading-xl" />.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <strong>Body text</strong> uses
            <CodeToken label="--sgds-font-size-body-sm" />,
            <CodeToken label="--sgds-font-size-body-md" />,
            and
            <CodeToken label="--sgds-font-size-body-lg" />.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <strong>Links</strong> use
            <CodeToken label="--sgds-font-size-link-xs" />,
            <CodeToken label="--sgds-font-size-link-sm" />,
            <CodeToken label="--sgds-font-size-link-md" />,
            and
            <CodeToken label="--sgds-font-size-link-lg" />.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <strong>Line heights</strong> are handled through
            <CodeToken label="--sgds-line-height-xs" />
            up to
            <CodeToken label="--sgds-line-height-3-xl" />,
            allowing larger text styles to keep comfortable reading rhythm as they scale.
          </p>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">How responsive typography works</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__copy-block">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Typography variables are defined at the root level with mobile defaults, then updated through media queries at each breakpoint. This keeps the system consistent while allowing the typography to scale without per-component overrides.
          </p>
        </div>

        <pre class="style-page__code-block"><code>{{ codeExample }}</code></pre>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
.style-page__explainer {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-sm);
}

.style-page__explainer-diagram {
  align-items: center;
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
  box-sizing: border-box;
  display: grid;
  gap: var(--sgds-layout-gap-md);
  grid-template-columns: minmax(0, 4fr) minmax(0, 5fr);
  padding: var(--sgds-component-padding-md);
  width: 100%;
}

.style-page__preview-pane,
.style-page__utility-pane {
  min-width: 0;
}

.style-page__preview-pane {
  display: flex;
  justify-content: flex-start;
}

.style-page__preview-text {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-brand);
  margin: 0;
}

.style-page__variable-editor {
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
}

.style-page__variable-row {
  align-items: start;
  box-sizing: border-box;
  color: var(--sgds-body-color-default);
  display: grid;
  gap: var(--sgds-component-gap-sm);
  grid-template-columns: auto minmax(0, 1fr);
  padding: var(--sgds-component-padding-sm) var(--sgds-component-padding-md);
}

.style-page__variable-row + .style-page__variable-row {
  border-top: 1px solid var(--sgds-border-color-muted);
}

.style-page__variable-row sgds-checkbox {
  display: block;
  margin-top: 0.125rem;
}

.style-page__variable-row-text {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
}

.style-page__variable-row-prop {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-mono, var(--sgds-font-family-code, var(--sgds-font-family-brand)));
  font-size: var(--sgds-font-size-body-sm);
  line-height: var(--sgds-line-height-xs);
}

.style-page__code-block {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  box-sizing: border-box;
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-mono);
  font-size: var(--sgds-font-size-body-sm);
  line-height: var(--sgds-line-height-sm);
  margin: 0;
  max-inline-size: 100%;
  overflow-x: auto;
  padding: var(--sgds-component-padding-md);
  white-space: pre;
}

@media (max-width: 1023px) {
  .style-page__explainer-diagram {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
