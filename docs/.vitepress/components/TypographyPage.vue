<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Principle</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Legibility</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            The ease with which one letterform can be distinguished from the next. It feeds into, but is not the same as, readability.
          </p>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Readability</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Readability refers to the ease with which a block of text can be scanned by eye.
          </p>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Scannability</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Scannability is the aggregate effect of writing and formatting techniques.
          </p>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Rules and Guide</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Create contrast, skip one</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Contrast creates visual order, emphasis, and clarity. It should also be harmoniously different, different enough to create visual interest, but not compete with each other. To achieve that, skip at least one size, weight, and/or colour.
          </p>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Leading &amp; tracking</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            The larger and bolder the type, the smaller the tracking. Vice versa!
          </p>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Line length</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Line length is how many characters are on a single line of text. For longer body text, the ideal length is between 40 and 60 characters. For shorter lines of text, the ideal length is 20 to 40 characters.
          </p>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Alignment</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Left-aligned text is the most common setting for left-to-right languages such as English. The F-alignment describes the most common user eye-scanning pattern when it comes to blocks of content.
          </p>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Responsive typography system</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__copy-block">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            SGDS foundation styles include a responsive typography system that adapts font sizes and line heights across different screen sizes. All HTML elements such as headings, paragraphs and labels use CSS custom properties that scale at three primary breakpoints.
          </p>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Breakpoints</h4>
          <ul class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <li>Mobile: 0px and above</li>
            <li>Tablet: 1024px and above</li>
            <li>Desktop: 1440px and above</li>
          </ul>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Key features</h4>
          <div class="typography-page-template__content-block">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Automatic responsive scaling</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Foundation typography scales with the viewport size automatically. No additional media queries are needed.
            </p>
          </div>

          <div class="typography-page-template__content-block">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Consistent typography hierarchy</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Headings maintain a clear visual hierarchy across screen sizes:
            </p>
            <ul class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              <li>H1: 32px on mobile, 36px on tablet, 40px on desktop</li>
              <li>H2: 28px on mobile, 30px on tablet, 32px on desktop</li>
              <li>H3 to H6 continue the same responsive hierarchy</li>
            </ul>
          </div>

          <div class="typography-page-template__content-block">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Body text handling</h4>
            <ul class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              <li>Small and regular body text stay at 14px and 16px across viewports</li>
              <li>Large body text scales from 18px on mobile to 20px on tablet and desktop</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Typography variables</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__copy-block">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Font sizes for headings, body text, links and line heights automatically scale at different breakpoints.
          </p>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Headings</h4>
          <ul class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <li><CodeToken label="--sgds-font-size-heading-sm" />: responsive H4 sizing</li>
            <li><CodeToken label="--sgds-font-size-heading-md" />: responsive H3 sizing</li>
            <li><CodeToken label="--sgds-font-size-heading-lg" />: responsive H2 sizing</li>
            <li><CodeToken label="--sgds-font-size-heading-xl" />: responsive H1 sizing</li>
          </ul>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Body text</h4>
          <ul class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <li><CodeToken label="--sgds-font-size-body-sm" />: small body text at 14px on all viewports</li>
            <li><CodeToken label="--sgds-font-size-body-md" />: regular body text at 16px on all viewports</li>
            <li><CodeToken label="--sgds-font-size-body-lg" />: large body text from 18px on mobile to 20px on tablet and desktop</li>
          </ul>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Links</h4>
          <ul class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <li><CodeToken label="--sgds-font-size-link-xs" />: 12px on all viewports</li>
            <li><CodeToken label="--sgds-font-size-link-sm" />: 14px on all viewports</li>
            <li><CodeToken label="--sgds-font-size-link-md" />: 16px on all viewports</li>
            <li><CodeToken label="--sgds-font-size-link-lg" />: 18px on mobile, 20px on tablet and desktop</li>
          </ul>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Line heights</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Line height variables scale proportionally with font sizes for improved readability.
          </p>
          <ul class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <li><CodeToken label="--sgds-line-height-xs" /> through <CodeToken label="--sgds-line-height-3-xl" /></li>
            <li>Mobile examples include 24px and 28px values</li>
            <li>Tablet and desktop line heights increase where needed to maintain readability</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">How responsive typography works</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__copy-block">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Typography variables are defined at the root level with mobile defaults, then updated through media queries at each breakpoint. This keeps the system consistent while allowing the typography to scale without extra per-component overrides.
          </p>
        </div>
      </div>
    </section>
  </TypographyPageTemplate>
</template>
