<script setup lang="ts">
import Section from "./Section.vue";

type BrandColor = {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  background: string;
  textTone: "light" | "dark";
  textTone: "light" | "dark" | "fixed-light" | "fixed-dark";
  bordered?: boolean;
};

type PaletteRow = {
  label: string;
  colors: string[];
};

const brandColors: BrandColor[] = [
  {
    name: "Singapore Red",
    hex: "#F4333D",
    rgb: "244 / 51 / 61",
    cmyk: "0 / 79 / 75 / 4",
    background: "#F4333D",
    textTone: "light",
  },
  {
    name: "GovTech Magenta",
    hex: "#BA2FA2",
    rgb: "186 / 47 / 162",
    cmyk: "0 / 75 / 13 / 27",
    background: "#BA2FA2",
    textTone: "light",
  },
  {
    name: "GovTech Cyan",
    hex: "#00C0F3",
    rgb: "0 / 192 / 243",
    cmyk: "100 / 21 / 0 / 5",
    background: "#00C0F3",
    textTone: "dark",
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
  <div :class="$style.page">
    <div :class="$style.sectionStack">
      <div :class="$style.pageSection">
        <Section title="GovTech colour palette">
          <div :class="$style.brandGrid">
            <article
              v-for="color in brandColors"
              :key="color.name"
              :class="[
                $style.brandCard,
                color.textTone === 'light'
                  ? $style.brandCardLight
                  : color.textTone === 'fixed-light'
                    ? $style.brandCardFixedLight
                    : color.textTone === 'fixed-dark'
                      ? $style.brandCardFixedDark
                      : $style.brandCardDark,
                color.bordered ? $style.brandCardBordered : '',
              ]"
              :style="{ backgroundColor: color.background }"
            >
              <h3 :class="$style.brandName">{{ color.name }}</h3>
              <div :class="$style.brandValues">
                <div :class="$style.brandLabels">
                  <span>HEX</span>
                  <span>RGB</span>
                  <span>CMYK</span>
                </div>
                <div :class="$style.brandDetails">
                  <span>{{ color.hex }}</span>
                  <span>{{ color.rgb }}</span>
                  <span>{{ color.cmyk }}</span>
                </div>
              </div>
            </article>
          </div>
        </Section>
      </div>

      <div :class="$style.pageSection">
        <Section
          title="Extended colours"
          description="Our colour system starts with three primary GovTech colours, which form the foundation of our visual identity. These core colours extend into ten colour families, providing flexibility for applications such as data visualisation, illustration and other expressive uses while maintaining harmony with our brand foundation."
        >
          <div :class="$style.showcaseCard">
            <div :class="$style.extendedRow" aria-label="Extended colour families">
              <span
                v-for="(color, index) in extendedColors"
                :key="color"
                :class="$style.extendedSwatch"
                :style="{ backgroundColor: color, '--swatch-index': index }"
              ></span>
            </div>
          </div>
        </Section>
      </div>

      <div :class="$style.pageSection">
        <Section
          title="Colour palette"
          description="Our colour palette consists of 11 colour families, including Neutral, each with 10 shades. In total, the palette includes 112 colours, comprising all shades plus white and black."
        >
          <div :class="[$style.showcaseCard, $style.paletteCard]">
            <div :class="$style.paletteGrid" aria-label="SGDS colour palette">
              <div :class="$style.accentRow">
                <span
                  v-for="color in accentSwatches"
                  :key="color"
                  :class="[$style.paletteSwatch, color === '#FFFFFF' ? $style.lightSwatch : '']"
                  :style="{ backgroundColor: color }"
                ></span>
              </div>
              <div
                v-for="row in paletteRows"
                :key="row.label"
                :class="$style.paletteRow"
                :aria-label="row.label"
              >
                <span
                  v-for="color in row.colors"
                  :key="`${row.label}-${color}`"
                  :class="[$style.paletteSwatch, color === '#FFFFFF' ? $style.lightSwatch : '']"
                  :style="{ backgroundColor: color }"
                ></span>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <div :class="$style.pageSection">
        <Section title="Resources">
          <div :class="[$style.showcaseCard, $style.resourcesCard]">
            <p :class="$style.resourcesText">Best practices and articles</p>
          </div>
        </Section>
      </div>
    </div>
  </div>
</template>

<style module>
.page {
  width: 100%;
}

.sectionStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.pageSection {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-md);
}

.brandGrid {
  display: grid;
  gap: var(--sgds-gap-2-xl);
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.brandCard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--sgds-border-radius-2-xl);
  min-height: var(--sgds-dimension-288);
  padding: var(--sgds-padding-2-xl);
  transform-origin: center;
  transition: transform 260ms cubic-bezier(0.2, 0.9, 0.22, 1.35);
  overflow: hidden;
}

.brandCard:hover {
  transform: translateY(-0.5rem) scale(1.01);
}

.brandCardLight {
  color: var(--sgds-color-inverse);
}

.brandCardDark {
  color: var(--sgds-color-default);
}

.brandCardFixedLight {
  color: var(--sgds-color-fixed-light);
}

.brandCardFixedDark {
  color: var(--sgds-color-fixed-dark);
}

.brandCardBordered {
  border: 1px solid var(--sgds-border-color-muted);
}

:global(.sgds-night-theme) .brandCardFixedLight {
  border: 1px solid var(--sgds-border-color-muted);
}

.brandName {
  color: inherit;
  font-size: var(--sgds-font-size-3);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  margin: 0;
}

.brandValues {
  align-items: flex-start;
  display: flex;
  gap: var(--sgds-gap-xl);
  color: inherit;
}

.brandLabels,
.brandDetails {
  display: flex;
  flex-direction: column;
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  font-size: var(--sgds-font-size-1);
  line-height: var(--sgds-line-height-20);
  gap: 0;
}

.showcaseCard {
  align-items: center;
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-2-xl);
  display: flex;
  justify-content: center;
  min-height: 20rem;
  padding: var(--sgds-layout-padding-md);
}

.extendedRow {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sgds-gap-xs);
  justify-content: center;
}

.extendedSwatch {
  animation: extendedSwatchReveal 560ms ease-out both;
  animation-delay: calc(var(--swatch-index, 0) * 60ms);
  border-radius: var(--sgds-border-radius-xl);
  display: block;
  height: clamp(2.75rem, 6vw, 4rem);
  transform-origin: center;
  transition: transform 260ms cubic-bezier(0.2, 0.9, 0.22, 1.35);
  width: clamp(2.75rem, 6vw, 4rem);
}

.extendedSwatch:hover {
  transform: translateY(-0.375rem) scale(1.04);
}

.paletteCard {
  min-height: var(--sgds-dimension-1024);
}

.paletteGrid {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
  width: fit-content;
  max-width: 100%;
}

.accentRow,
.paletteRow {
  display: flex;
  gap: var(--sgds-gap-xs);
}

.paletteSwatch {
  border-radius: var(--sgds-border-radius-xl);
  display: block;
  height: clamp(2rem, 5.3vw, 4rem);
  transform-origin: center;
  transition: transform 260ms cubic-bezier(0.2, 0.9, 0.22, 1.35);
  width: clamp(2rem, 5.3vw, 4rem);
}

.paletteSwatch:hover {
  transform: translateY(-0.375rem) scale(1.04);
}

.lightSwatch {
  border: 1px solid var(--sgds-border-color-muted);
}

.resourcesCard {
  min-height: 12rem;
}

.resourcesText {
  color: var(--sgds-body-color-default);
  font-size: var(--sgds-font-size-3);
  font-weight: var(--sgds-font-weight-semibold);
  line-height: var(--sgds-line-height-24);
  margin: 0;
  text-align: center;
}

@media (max-width: 1023px) {
  .brandGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .showcaseCard,
  .paletteCard {
    min-height: auto;
  }

  .paletteGrid {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .brandGrid {
    grid-template-columns: minmax(0, 1fr);
  }

  .brandCard {
    min-height: 15rem;
  }

  .showcaseCard {
    padding: var(--sgds-padding-xl);
  }

  .extendedSwatch,
  .paletteSwatch {
    border-radius: var(--sgds-border-radius-lg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .brandCard {
    transition: none;
  }

  .brandCard:hover {
    transform: none;
  }

  .extendedSwatch {
    animation: none;
    transition: none;
  }

  .extendedSwatch:hover {
    transform: none;
  }

  .paletteSwatch {
    transition: none;
  }

  .paletteSwatch:hover {
    transform: none;
  }
}

@keyframes extendedSwatchReveal {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
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
