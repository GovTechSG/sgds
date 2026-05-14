---
layout: default
---

<script setup lang="ts">
import Hero, { Button } from "./.vitepress/components/landing/Hero.vue";
import ColourGridImage from "./.vitepress/components/landing/ColourGridImage.vue";
import LayoutGridImage from "./.vitepress/components/landing/LayoutGridImage.vue";
import LandingWorkflowVisual from "./.vitepress/components/landing/LandingWorkflowVisual.vue";
import PortalImageCard from "./.vitepress/components/landing/PortalImageCard.vue";
import { FoundationItem } from "./.vitepress/data/foundations";

const title = "Unifying Government through Design and\u00A0Code."

const buttons: Button = [
  {
    label: "Get started",
    link: "/get-started/",
    variant: "primary",
    tone: "neutral"
  }
]

const featureFoundations: FoundationItem[] = [
  {
    id: "colour-system",
    title: "Colour system",
    url: "/foundations/colour",
    image: "/landing/colour_system.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "icon-library",
    title: "Icon library",
    url: "/foundations/iconography/icon-library",
    image: "/landing/icon_library.png",
    phase: 1,
    status: "stable",
  },
  {
    id: "design-tokens",
    title: "Design tokens",
    url: "/foundations/design-tokens",
    image: "/landing/design_token.png",
    phase: 1,
    status: "stable",
  },
]

const contributors = [
  { name: "rav3", username: "rav3" },
  { name: "weijunyu", username: "weijunyu" },
  { name: "clukhei", username: "clukhei" },
  { name: "sophiaaachow", username: "sophiaaachow" },
  { name: "haphizi", username: "haphizi" },
  { name: "anzteng", username: "anzteng" },
  { name: "darenng", username: "darenng" },
  { name: "petrinetang", username: "petrinetang" },
  { name: "reedless", username: "reedless" },
  { name: "Sylphias", username: "Sylphias" },
  { name: "amandacxz", username: "amandacxz" },
  { name: "amandac628", username: "amandac628" },
  { name: "th-94", username: "th-94" },
  { name: "jmestxr", username: "jmestxr" },
  { name: "saiutkarsh33", username: "saiutkarsh33" },
  { name: "kaschew", username: "kaschew" },
  { name: "meanminmenace", username: "meanminmenace" },
  { name: "seng-siong", username: "seng-siong" },
  { name: "yang-lijia", username: "yang-lijia" },
  { name: "JohnsonKoh1110", username: "JohnsonKoh1110" },
  { name: "gt-angwl", username: "gt-angwl" },
  { name: "e111077", username: "e111077" },
  { name: "tang-jiaxi", username: "tang-jiaxi" },
  { name: "soedar", username: "soedar" },
  { name: "trungvose", username: "trungvose" },
  { name: "tonghauhive", username: "tonghauhive" },
  { name: "sylpharyon", username: "sylpharyon" },
]

const contributorCloud = Array.from({ length: 4 }, (_, groupIndex) =>
  contributors.map((contributor) => ({
    ...contributor,
    key: `${contributor.username}-${groupIndex}`,
  })),
).flat();

const currentPhase = 1;
const showCommunitySection = false;
</script>

<div>
  <div class="sgds:pb-layout-xl">
    <Hero
      :title
      :buttons
    />
  </div>
  <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-spacer-10)] sgds:lg:gap-[var(--sgds-spacer-12)]">
    <section class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
      <h2 class="sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter sgds:mb-0">
        Design once,<br>use everywhere.
      </h2>
      <div class="sgds-grid">
        <img
          src="/landing/placeholder1.png"
          alt="Placeholder 1"
          width="760"
          height="480"
          :class="$style.image"
          class="sgds-col-4 sgds-col-sm-5 sgds-col-lg-7 sgds:rounded-3-xl"
        >
        <img
          src="/landing/placeholder2.png"
          alt="Placeholder 2"
          width="512"
          height="480"
          :class="$style.image"
          class="sgds-col-4 sgds-col-sm-3 sgds-col-lg-5 sgds:rounded-3-xl"
        >
        <img
          src="/landing/placeholder3.png"
          alt="Placeholder 3"
          width="312"
          height="480"
          :class="$style.image"
          class="sgds-col-4 sgds-col-sm-2 sgds-col-lg-3 sgds:rounded-3-xl"
        >
        <img
          src="/landing/placeholder4.png"
          alt="Placeholder 4"
          width="960"
          height="480"
          :class="$style.image"
          class="sgds-col-4 sgds-col-sm-6 sgds-col-lg-9 sgds:rounded-3-xl"
        >
      </div>
    </section>
    <section class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
      <h2 class="sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter sgds:mb-0">
        Building together,<br>designing better.
      </h2>
      <div class="sgds-grid">
        <LandingWorkflowVisual class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-12" />
      </div>
    </section>
    <section class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
      <h2 class="sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter sgds:mb-0">
        Shared foundation,<br>stronger services.
      </h2>
      <div class="sgds-grid">
        <div
          class="sgds-col-4 sgds-col-sm-3 sgds-col-lg-5 sgds:flex sgds:flex-col sgds:gap-3-xl"
        >
          <p class="sgds:text-body-subtle sgds:text-body-lg sgds:leading-md sgds:mb-0">
            With a common foundation of colour, typography, and components, our design system helps teams create consistent, accessible, and reliable services across government.
          </p>
          <img
            src="/landing/placeholder7.png"
            alt="Placeholder 7"
            width="536"
            height="576"
            :class="$style.image"
          />
        </div>
        <div
          :class="$style.image"
          class="sgds-col-4 sgds-col-sm-5 sgds-col-lg-7 sgds:overflow-hidden"
        >
          <ColourGridImage />
        </div>
        <div
          :class="$style.image"
          class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-12 sgds:overflow-hidden"
        >
          <LayoutGridImage />
        </div>
      </div>
    </section>
    <section v-if="showCommunitySection" class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
      <h2 class="sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter sgds:mb-0">
        Built by the community
      </h2>
      <p class="sgds:text-body-subtle sgds:text-body-lg sgds:leading-md sgds:mb-0">
        SGDS is free and open-source, welcoming contributions from developers and designers across government and beyond.
      </p>
      <div class="sgds:flex sgds:w-full sgds:flex-wrap sgds:gap-xs">
        <a
          v-for="contributor in contributorCloud"
          :key="contributor.key"
          :href="`https://github.com/${contributor.username}`"
          :aria-label="`${contributor.name} on GitHub`"
          class="sgds:block sgds:size-10 sgds:overflow-hidden sgds:rounded-full sgds:bg-surface-default sgds:opacity-25 sgds:grayscale sgds:contrast-75 sgds:scale-75 sgds:[transition:opacity_1s_ease-out,scale_1s_ease-out,filter_1s_ease-out] sgds:hover:opacity-100 sgds:hover:grayscale-0 sgds:hover:contrast-100 sgds:hover:scale-125 sgds:hover:[transition:opacity_0s_ease-out,scale_0.05s_ease-out,filter_0s_ease-out] sgds:focus-visible:opacity-100 sgds:focus-visible:grayscale-0 sgds:focus-visible:contrast-100 sgds:focus-visible:scale-125 sgds:focus-visible:outline sgds:focus-visible:outline-2 sgds:focus-visible:outline-offset-2 sgds:focus-visible:outline-primary-default"
        >
          <img
            :src="`https://github.com/${contributor.username}.png?size=80`"
            :alt="contributor.name"
            width="40"
            height="40"
            loading="lazy"
            class="sgds:h-full sgds:w-full sgds:object-cover"
          >
        </a>
      </div>
    </section>
    <section class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
      <h2 class="sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter sgds:mb-0">
        Empowering teams,<br>transforming services.
      </h2>
      <div class="sgds-grid">
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
</div>

<style module>
  .homePage::before {
    background-color: var(--sgds-border-color-muted);
    content: "";
    height: min(2200px, 58%);
    left: 0;
    mask-composite: intersect;
    mask-image:
      url("/landing/background.svg"),
      linear-gradient(
      to bottom,
      transparent 0,
      black var(--sgds-dimension-144),
      black 68%,
      transparent 100%
    );
    mask-position: top center, top center;
    mask-repeat: no-repeat, no-repeat;
    mask-size: 100% auto, 100% 100%;
    opacity: 0.56;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    -webkit-mask-composite: source-in;
    -webkit-mask-image:
      url("/landing/background.svg"),
      linear-gradient(
      to bottom,
      transparent 0,
      black var(--sgds-dimension-144),
      black 68%,
      transparent 100%
    );
    -webkit-mask-position: top center, top center;
    -webkit-mask-repeat: no-repeat, no-repeat;
    -webkit-mask-size: 100% auto, 100% 100%;
    z-index: 0;
  }

  .homePage > * {
    position: relative;
    z-index: 1;
  }

  .feature-section {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-spacer-10);
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .description {
    font-size: var(--sgds-font-size-3);
    line-height: var(--sgds-line-height-32);
    margin-bottom: var(--sgds-margin-none);
  }
</style>
