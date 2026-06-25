<script setup lang="ts">
import { ref } from "vue";
import Section from "./Section.vue";
import SectionHeader from "./SectionHeader.vue";
import ColourPalettePage from "../ColourPalettePage.vue";

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

type BrandColor = {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  background: string;
  textTone: "light" | "dark" | "fixed-light" | "fixed-dark";
  bordered?: boolean;
};

const brandColors: BrandColor[] = [
  {
    name: "Singapore Red",
    hex: "#F4333D",
    rgb: "244 / 51 / 61",
    cmyk: "0 / 79 / 75 / 4",
    background: "#F4333D",
    textTone: "fixed-light",
  },
  {
    name: "GovTech magenta",
    hex: "#BA2FA2",
    rgb: "186 / 47 / 162",
    cmyk: "0 / 75 / 13 / 27",
    background: "#BA2FA2",
    textTone: "fixed-light",
  },
  {
    name: "GovTech cyan",
    hex: "#00C0F3",
    rgb: "0 / 192 / 243",
    cmyk: "100 / 21 / 0 / 5",
    background: "#00C0F3",
    textTone: "fixed-dark",
  },
  {
    name: "White",
    hex: "#FFFFFF",
    rgb: "255 / 255 / 255",
    cmyk: "0 / 0 / 0 / 0",
    background: "#FFFFFF",
    textTone: "fixed-dark",
    bordered: true,
  },
  {
    name: "Black",
    hex: "#0E0E0E",
    rgb: "14 / 14 / 14",
    cmyk: "0 / 0 / 0 / 95",
    background: "#0E0E0E",
    textTone: "fixed-light",
  },
];

const extendedColors = [
  "#E02D78",
  "#F4333D",
  "#FF7605",
  "#FAC900",
  "#17C964",
  "#00C2C2",
  "#00C0F3",
  "#0278ED",
  "#6648E1",
  "#BA2FA2",
];

type PaletteRow = {
  label: string;
  colors: string[];
};

const accentSwatches = ["#FFFFFF", "#0E0E0E"];

const paletteRows: PaletteRow[] = [
  {
    label: "Neutral",
    colors: ["#F3F3F3", "#DFDFDF", "#C2C2C2", "#A5A5A5", "#868686", "#6B6B6B", "#525252", "#3D3D3D", "#2A2A2A", "#0E0E0E"],
  },
  {
    label: "Pink",
    colors: ["#FDF0F6", "#F9D6E5", "#F3AECB", "#ED84B0", "#E54D8C", "#C7286A", "#9A1F52", "#73173E", "#51102C", "#340A1C"],
  },
  {
    label: "Red",
    colors: ["#FEF0F1", "#FDD6D8", "#FBADB1", "#F88289", "#F5424B", "#CB2B33", "#9E2127", "#76191E", "#531115", "#350B0D"],
  },
  {
    label: "Orange",
    colors: ["#FFF2E7", "#FFD8B8", "#FFB171", "#FF831C", "#D96404", "#AD5003", "#853E03", "#642E02", "#452001", "#281603"],
  },
  {
    label: "Yellow",
    colors: ["#FEF3C8", "#FCDE64", "#EBBD00", "#C8A100", "#A28200", "#826800", "#645000", "#4A3C00", "#342900", "#1E1A00"],
  },
  {
    label: "Green",
    colors: ["#E3F9ED", "#B1EDCB", "#5CD992", "#16BD5E", "#129A4D", "#0E7C3D", "#0B5E2F", "#084623", "#063119", "#031F0F"],
  },
  {
    label: "Teal",
    colors: ["#E1F8F8", "#AAEBEB", "#4FD5D5", "#00B8B8", "#009696", "#007777", "#005C5C", "#004444", "#002F2F", "#021E1D"],
  },
  {
    label: "Cyan",
    colors: ["#E0F7FE", "#A7E9FB", "#47D1F6", "#00B3E2", "#0091B8", "#007493", "#005971", "#004355", "#002E3B", "#001D25"],
  },
  {
    label: "Blue",
    colors: ["#ECF5FE", "#C8E2FB", "#96C7F7", "#60AAF4", "#1E87EF", "#0269D0", "#0151A0", "#013C77", "#012A54", "#001B34"],
  },
  {
    label: "Purple",
    colors: ["#F4F2FD", "#E1DBF9", "#C6BAF4", "#AA99EE", "#8B74E8", "#6E51E2", "#533BB8", "#3E2C8A", "#2B1E5F", "#1F152E"],
  },
  {
    label: "Magenta",
    colors: ["#FBF2F9", "#F2D8ED", "#E5B2DC", "#D98BCB", "#C95EB7", "#B82EA0", "#8E247B", "#6A1B5D", "#4A1341", "#2F0C29"],
  },
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
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg sgds:pt-layout-sm">

            <!-- Brand palette cards: official identity colours with HEX, RGB, CMYK
                 for both digital and print reproduction. -->
            <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <Section
                title="GovTech colour"
                description="The five official brand colours, with values for both digital and print reproduction. Use CMYK when sending artwork to print suppliers."
              >
          <div class="sgds-grid">
            <article
              v-for="color in brandColors"
              :key="color.name"
              :class="[
                'sgds-col-4 sgds-col-sm-4 sgds-col-lg-4 our-colours-brand-card sgds:flex sgds:flex-col sgds:justify-between sgds:rounded-[var(--sgds-border-radius-2-xl)] sgds:min-h-[var(--sgds-dimension-288)] sgds:max-md:min-h-[15rem] sgds:p-[var(--sgds-padding-2-xl)] sgds:overflow-hidden',
                color.textTone === 'light' ? 'sgds:text-inverse' : '',
                color.textTone === 'dark' ? 'sgds:text-default' : '',
                color.textTone === 'fixed-light' ? 'sgds:text-fixed-light our-colours-brand-card-fixed-light' : '',
                color.textTone === 'fixed-dark' ? 'sgds:text-fixed-dark' : '',
                color.bordered ? 'sgds:border sgds:border-muted' : '',
              ]"
              :style="{ backgroundColor: color.background }"
            >
              <h3 class="sgds:text-[inherit] sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">{{ color.name }}</h3>
              <div class="sgds:flex sgds:items-start sgds:gap-[var(--sgds-gap-xl)] sgds:text-[inherit]">
                <div class="sgds:flex sgds:flex-col sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>HEX</span>
                  <span>RGB</span>
                  <span>CMYK</span>
                </div>
                <div class="sgds:flex sgds:flex-col sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>{{ color.hex }}</span>
                  <span>{{ color.rgb }}</span>
                  <span>{{ color.cmyk }}</span>
                </div>
              </div>
            </article>
          </div>
              </Section>
            </div>

            <!-- Extended palette: expressive families for marketing, illustration,
                 data visualisation, and other creative work where the brand is
                 on display. -->
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
              <Section
                title="Extended colours"
                description="Our colour system starts with three primary GovTech colours, which form the foundation of our visual identity. These core colours extend into ten colour families, providing flexibility for applications such as data visualisation, illustration, and other expressive uses while maintaining harmony with our brand foundation."
              >
                <div class="sgds:flex sgds:items-center sgds:justify-center sgds:bg-surface-default sgds:border sgds:border-muted sgds:rounded-[var(--sgds-border-radius-2-xl)] sgds:min-h-[20rem] sgds:p-layout-md sgds:max-lg:min-h-[auto]">
                  <div role="group" class="sgds:flex sgds:flex-wrap sgds:gap-[var(--sgds-gap-xs)] sgds:justify-center" aria-label="Extended colour families">
                    <span
                      v-for="(color, index) in extendedColors"
                      :key="color"
                      class="our-colours-extended-swatch sgds:rounded-xl sgds:block sgds:aspect-square sgds:w-[clamp(2.75rem,6vw,4rem)]"
                      :style="{ backgroundColor: color, '--swatch-index': index }"
                    ></span>
                  </div>
                </div>
              </Section>
            </div>

            <!-- Full colour palette: 11 families × 10 shades grid showing
                 every available colour value in the brand foundation. -->
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
              <Section
                title="Colour palette"
                description="Our colour palette consists of 11 colour families, including Neutral, each with 10 shades. In total, the palette includes 112 colours, comprising all shades plus white and black."
              >
                <div class="sgds:flex sgds:items-center sgds:justify-center sgds:bg-surface-default sgds:border sgds:border-muted sgds:rounded-[var(--sgds-border-radius-2-xl)] sgds:min-h-[var(--sgds-dimension-1024)] sgds:p-layout-md sgds:max-lg:min-h-[auto]">
                  <span class="sgds:sr-only">SGDS colour palette</span>
                  <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xs)] sgds:w-fit sgds:max-w-full sgds:max-lg:w-full">
                    <div class="sgds:flex sgds:gap-[var(--sgds-gap-xs)]">
                      <span
                        v-for="color in accentSwatches"
                        :key="color"
                        :class="['our-colours-palette-swatch sgds:rounded-[min(var(--sgds-border-radius-xl),30%)] sgds:block sgds:aspect-square sgds:w-[clamp(2rem,5.3vw,4rem)]', color === '#FFFFFF' ? 'sgds:border sgds:border-muted' : '']"
                        :style="{ backgroundColor: color }"
                      ></span>
                    </div>
                    <div
                      v-for="row in paletteRows"
                      :key="row.label"
                      class="sgds:flex sgds:gap-[var(--sgds-gap-xs)]"
                    >
                      <span class="sgds:sr-only">{{ row.label }}</span>
                      <span
                        v-for="color in row.colors"
                        :key="`${row.label}-${color}`"
                        :class="['our-colours-palette-swatch sgds:rounded-[min(var(--sgds-border-radius-xl),30%)] sgds:block sgds:aspect-square sgds:w-[clamp(2rem,5.3vw,4rem)]', color === '#FFFFFF' ? 'sgds:border sgds:border-muted' : '']"
                        :style="{ backgroundColor: color }"
                      ></span>
                    </div>
                  </div>
                </div>
              </Section>
            </div>

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

<style>
/* Brand card hover animation — requires custom cubic-bezier easing */
.our-colours-brand-card {
  transform-origin: center;
  transition: transform 260ms cubic-bezier(0.2, 0.9, 0.22, 1.35);
}

.our-colours-brand-card:hover {
  transform: translateY(-0.5rem);
}

/* Dark theme border for fixed-light (black) brand card */
.sgds-night-theme .our-colours-brand-card-fixed-light {
  border: 1px solid var(--sgds-border-color-muted);
}

/* Extended swatch animation — references @keyframes */
.our-colours-extended-swatch {
  animation: extendedSwatchReveal 560ms ease-out both;
  animation-delay: calc(var(--swatch-index, 0) * 60ms);
  transform-origin: center;
  transition: transform 260ms cubic-bezier(0.2, 0.9, 0.22, 1.35);
}

.our-colours-extended-swatch:hover {
  transform: translateY(-0.375rem) scale(1.04);
}

/* Palette swatch hover */
.our-colours-palette-swatch {
  transform-origin: center;
  transition: transform 260ms cubic-bezier(0.2, 0.9, 0.22, 1.35);
}

.our-colours-palette-swatch:hover {
  transform: translateY(-0.375rem) scale(1.04);
}

/* Reduced motion overrides */
@media (prefers-reduced-motion: reduce) {
  .our-colours-brand-card {
    transition: none;
  }

  .our-colours-brand-card:hover {
    transform: none;
  }

  .our-colours-extended-swatch {
    animation: none;
    transition: none;
  }

  .our-colours-extended-swatch:hover {
    transform: none;
  }

  .our-colours-palette-swatch {
    transition: none;
  }

  .our-colours-palette-swatch:hover {
    transform: none;
  }
}

@keyframes extendedSwatchReveal {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes swatchReveal {
  from {
    opacity: 0;
    transform: translateY(0.875rem) scale(0.92);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

</style>
