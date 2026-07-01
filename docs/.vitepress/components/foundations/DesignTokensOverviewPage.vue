<script setup lang="ts">
import ComposedTypographyDiagram from "./ComposedTypographyDiagram.vue";
import DesignIntentDiagram from "./DesignIntentDiagram.vue";
import SectionHeader from "./SectionHeader.vue";
import SystemUpdateFlowDiagram from "./SystemUpdateFlowDiagram.vue";
import ThemeRevealDiagram from "./ThemeRevealDiagram.vue";
import CodeToken from "../ui/CodeToken.vue";
</script>

<template>
  <article class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <section class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <SectionHeader title="What are design tokens?" />
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Design tokens are shared names for the visual choices in SGDS. They cover things like colours, text sizes, spacing, border radius, and motion. When a team uses a token, they use the same design decision everywhere without needing to know or copy the raw value behind it.
        </p>
        <ul class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
          <li>
            <a href="/foundations/token-architecture" class="sgds:font-semibold sgds:underline">Token architecture</a>: how tokens are organised
          </li>
          <li>
            <a href="/foundations/token-naming" class="sgds:font-semibold sgds:underline">Token naming</a>: how each token name reads
          </li>
        </ul>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <SectionHeader title="Why SGDS uses tokens" />
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          SGDS uses tokens to keep products consistent as the system grows. Tokens give design and code a shared way to refer to visual decisions, such as colour, spacing, typography, and shape. Instead of recreating these decisions in each product or component, teams use the same token names across the system.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          This makes tokens useful in a few practical ways.
        </p>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Easier system updates</h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          When a token changes, every component that uses it can receive the update. This helps SGDS improve themes, accessibility, and brand styles without updating each component by hand.
        </p>
      </div>

      <SystemUpdateFlowDiagram />
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Clearer design intent</h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Tokens make each part of a component easier to understand. A button may look simple, but its fill, text colour, typography, padding, border, and shape are all controlled by named decisions.
        </p>
      </div>

      <DesignIntentDiagram />
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Theme switching without component changes</h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          A semantic token can resolve to different primitive colours in day and night themes. The component keeps the same token name, while the rendered value changes to suit the theme.
        </p>
      </div>

      <ThemeRevealDiagram />
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-layout-md">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Responsive scaling</h3>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Typography is more than choosing a size. A heading also needs the right weight, line height, and letter spacing to feel clear and balanced.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          SGDS stores these decisions as tokens so teams do not need to recreate them each time. Some typography tokens respond to screen size, helping the same heading stay proportional across mobile, tablet, and desktop.
        </p>
      </div>

      <ComposedTypographyDiagram />
    </section>

    <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
      Together, these qualities mean that improvements to SGDS reach every product that uses its tokens. If a colour value needs better contrast or a type scale needs refinement, updating the token once is enough — every component that uses it inherits the change without any local updates.
    </p>

  </article>
</template>
