---
layout: default
---

<script setup lang="ts">
import Hero, { Button } from "./.vitepress/components/landing/Hero.vue";
import PortalImageCard from "./.vitepress/components/landing/PortalImageCard.vue";
import { FoundationItem } from "./.vitepress/data/foundations";

const title = "Unifying Government through Design and Code."

const buttons: Button = [
  {
    label: "Get started",
    link: "/get-started/",
    variant: "primary",
    tone: "neutral"
  }
]

const featureFoundations: FoundationItems[] = [
  {
    id: "colour-system",
    title: "Colour system",
    url: "/foundations/colour/colour-system",
    image: "/landing/colour_system.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "icon-library",
    title: "Icon library",
    url: "/foundations/colour/using-colour",
    image: "/landing/icon_library.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "design-tokens",
    title: "Design tokens",
    url: "/foundations/colour/best-practices",
    image: "/landing/design_token.png",
    phase: 1,
    status: "stable",
  },
]

const currentPhase = 1;
</script>

<div :class="$style.container">
  <Hero
    :title
    :buttons
  />
</div>
<div :class="$style['feature-container']">
  <section :class="$style['feature-section']">
    <h2 :class="$style.header">Design once,<br>use everywhere.</h2>
    <div :class="$style['feature-grid']" class="sgds-grid">
      <img
        src="/landing/placeholder1.png"
        alt="Placeholder 1"
        width="760"
        height="480"
        :class="$style.image"
        class="sgds-col-4 sgds-col-sm-5 sgds-col-lg-7"
      >
      <img
        src="/landing/placeholder2.png"
        alt="Placeholder 2"
        width="512"
        height="480"
        :class="$style.image"
        class="sgds-col-4 sgds-col-sm-3 sgds-col-lg-5"
      >
      <img
        src="/landing/placeholder3.png"
        alt="Placeholder 3"
        width="312"
        height="480"
        :class="$style.image"
        class="sgds-col-4 sgds-col-sm-2 sgds-col-lg-3"
      >
      <img
        src="/landing/placeholder4.png"
        alt="Placeholder 4"
        width="960"
        height="480"
        :class="$style.image"
        class="sgds-col-4 sgds-col-sm-6 sgds-col-lg-9"
      >
    </div>
  </section>
  <section :class="$style['feature-section']">
    <h2 :class="$style.header">Buiding together,<br>designing better.</h2>
    <div :class="$style['feature-grid']" class="sgds-grid">
      <img
        src="/landing/placeholder5.png"
        alt="Placeholder 5"
        width="872"
        height="752"
        :class="$style.image"
        class="sgds-col-4 sgds-col-sm-5 sgds-col-lg-8"
      >
      <img
        src="/landing/placeholder6.png"
        alt="Placeholder 6"
        width="400"
        height="752"
        :class="$style.image"
        class="sgds-col-4 sgds-col-sm-3 sgds-col-lg-4"
      >
    </div>
  </section>
  <section :class="$style['feature-section']">
    <h2 :class="$style.header">Buiding together,<br>designing better.</h2>
    <div :class="$style['feature-grid']" class="sgds-grid">
      <div
        :class="$style['description-container']"
        class="sgds-col-4 sgds-col-sm-3 sgds-col-lg-5"
      >
        <p :class="$style.description">With a common foundation of colour, typography, and components, our design system helps teams create consistent, accessible, and reliable services across government.</p>
        <img
          src="/landing/placeholder7.png"
          alt="Placeholder 7"
          width="536"
          height="576"
          :class="$style.image"
        >
      </div>
      <img
        src="/landing/placeholder8.png"
        alt="Placeholder 8"
        width="736"
        height="752"
        :class="$style.image"
        class="sgds-col-4 sgds-col-sm-5 sgds-col-lg-7"
      >
      <img
        src="/landing/placeholder9.png"
        alt="Placeholder 9"
        width="1320"
        height="752"
        :class="$style.image"
        class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-12"
      >
    </div>
  </section>
  <section :class="$style['feature-section']">
    <h2 :class="$style.header">Empowering teams,<br>transforming services.</h2>
    <div :class="$style['feature-grid']" class="sgds-grid">
      <PortalImageCard
        v-for="foundation in featureFoundations"
        :key="foundation.id"
        :item="foundation"
        :currentPhase
        class="sgds-col-4"
      >
      </PortalImageCard>
    </div>
  </section>
</div>

<style module>
  .container {
    padding-bottom: var(--sgds-dimension-144);
  }

  .feature-container {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-spacer-12);
  }

  .feature-section {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-spacer-10);
  }
  
  .header {
    font-size: var(--sgds-font-size-8);
    font-weight: var(--sgds-font-weight-light);
    line-height: var(--sgds-line-height-56);
    letter-spacing: var(--sgds-letter-spacing-tighter);
    margin-bottom: var(--sgds-margin-none);
  }

  .feature-grid {
    gap: var(--sgds-gap-3-xl);
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 32px;
  }

  .description-container {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-gap-3-xl);
  }

  .description {
    font-size: var(--sgds-font-size-3);
    line-height: var(--sgds-line-height-32);
    margin-bottom: var(--sgds-margin-none);
  }
</style>
