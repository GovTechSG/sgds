<script setup lang="ts">
import { ref } from "vue";
import SectionHeader from "./SectionHeader.vue";
import ColourPalettePage from "../ColourPalettePage.vue";
import {
  govtechColourPaletteGroups,
  type GovtechColourCard,
} from "../../data/govtech-colour-palette";

const tabGroupRef = ref<HTMLElement | null>(null);

const scrollToCustomHeading = () => {
  const target = document.getElementById("custom-colour");
  if (!target) return;
  // Use an instant scroll — smooth scroll gets cancelled by the layout shift
  // when the GovTech panel content is replaced by the shorter Custom panel.
  const top = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, top);
};

const switchToCustomTab = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  const group = tabGroupRef.value as (HTMLElement & { show?: (p: string) => void }) | null;
  if (!group) return;
  // Switching from the tall GovTech panel to the shorter Custom panel shrinks
  // the document; if scrollY > new maxScroll, the browser clamps. Scroll to the
  // top first so we're always within bounds, then switch tabs.
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  const onShow = () => {
    // Wait for the new panel to paint, then measure and smooth-scroll to the heading.
    setTimeout(scrollToCustomHeading, 50);
  };
  group.addEventListener("sgds-tab-show", onShow, { once: true });
  group.show?.("custom");
  // If already on custom tab, sgds-tab-show won't fire.
  const customPanel = group.querySelector('sgds-tab-panel[name="custom"]') as (HTMLElement & { active?: boolean }) | null;
  if (customPanel?.active) {
    group.removeEventListener("sgds-tab-show", onShow);
    setTimeout(scrollToCustomHeading, 50);
  }
};

const colourCardClass = (colour: GovtechColourCard) => [
  "sgds:h-[calc(var(--sgds-dimension-96)+var(--sgds-gap-2-xs))] sgds:w-full sgds:rounded-lg",
  colour.bordered ? "sgds:border sgds:border-muted" : "",
];
</script>

<template>
  <div class="sgds:w-full">
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">

      <sgds-tab-group ref="tabGroupRef">
        <sgds-tab slot="nav" panel="govtech" :ariaLabel.prop="'GovTech colour'">GovTech colour</sgds-tab>
        <sgds-tab slot="nav" panel="custom" :ariaLabel.prop="'Custom colour'">
          Custom colour
          <sgds-badge variant="accent" outlined size="sm">BETA</sgds-badge>
        </sgds-tab>

        <sgds-tab-panel name="govtech">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl sgds:pt-layout-sm">
            <section class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
              <SectionHeader title="GovTech colour palette" />
              <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
                <section
                  v-for="group in govtechColourPaletteGroups"
                  :key="group.title"
                  class="sgds:flex sgds:flex-col sgds:gap-text-sm"
                >
                  <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">
                    {{ group.title }}
                  </h3>
                  <div class="sgds-grid sgds:gap-layout-md">
                    <article
                      v-for="colour in group.colours"
                      :key="`${group.title}-${colour.name}`"
                      class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4 sgds:flex sgds:flex-col sgds:gap-text-sm sgds:min-w-0"
                    >
                      <div
                        :class="colourCardClass(colour)"
                        :style="{ backgroundColor: colour.hex }"
                        aria-hidden="true"
                      ></div>
                      <div class="sgds:flex sgds:flex-col sgds:gap-0">
                        <h4 class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default sgds:m-0">{{ colour.name }}</h4>
                        <dl class="sgds:grid sgds:grid-cols-[var(--sgds-dimension-52)_1fr] sgds:gap-x-component-sm sgds:gap-y-0 sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default sgds:m-0">
                          <dt>HEX</dt>
                          <dd class="sgds:m-0">{{ colour.hex }}</dd>
                          <dt>RGB</dt>
                          <dd class="sgds:m-0">{{ colour.rgb }}</dd>
                          <dt>CMYK</dt>
                          <dd class="sgds:m-0">{{ colour.cmyk }}</dd>
                        </dl>
                      </div>
                    </article>
                  </div>
                </section>
              </div>
            </section>

            <section class="sgds:flex sgds:flex-col sgds:gap-layout-md">
              <!-- Pre-approved GovTech primary palettes mapped onto SGDS
                   product-primary tokens. The h3 + framing paragraph sit
                   tightly together so they read as a single section intro
                   above the tables. -->
              <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
                <SectionHeader title="GovTech primary tokens" />
                <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                  The tables below map the GovTech brand onto SGDS primary tokens. These ship with the system by default, ready for any product to use as-is. If your product has its own brand colour, switch to the <a role="button" tabindex="0" @click="switchToCustomTab" @keydown.enter="switchToCustomTab" @keydown.space.prevent="switchToCustomTab" class="sgds:cursor-pointer">Custom colour</a> tab to generate the same primary structure from your hex value instead.
                </p>
              </div>
              <ColourPalettePage section="brand-govtech" />
            </section>
          </div>
        </sgds-tab-panel>

        <sgds-tab-panel name="custom">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md sgds:pt-layout-sm">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
              <SectionHeader id="custom-colour" title="Custom colour">
                <template #title-suffix>
                  <sgds-badge variant="accent" outlined size="sm">BETA</sgds-badge>
                </template>
              </SectionHeader>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
                Generate a custom primary palette from your agency's brand colour. Enter a hex value or use the colour picker, and the generator will produce the full <CodeToken label="--sgds-product-primary-100" /> through <CodeToken label="--sgds-product-primary-900" /> ramp aligned to the SGDS scale.
              </p>
            </div>
            <ColourPalettePage section="brand-custom" />
          </div>
        </sgds-tab-panel>
      </sgds-tab-group>

    </div>
  </div>
</template>
