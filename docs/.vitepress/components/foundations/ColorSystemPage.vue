<script setup lang="ts">
import FoundationPrinciplesList from "./FoundationPrinciplesList.vue";
import FoundationRulesGuidanceList from "./FoundationRulesGuidanceList.vue";
import Section from "./Section.vue";
import SectionHeader from "./SectionHeader.vue";

const colourPrinciples = [
  {
    title: "Hierarchical",
    description:
      "Use colour to show interaction, relationships, and prominence.",
  },
  {
    title: "Legible",
    description: "Use colour combinations that meet legibility standards.",
  },
  {
    title: "Harmonious",
    description: "Use colour consistently so the interface feels unified.",
  },
] as const;

const colourRules = [
  {
    title: "Contrast",
    description:
      "Choose colour combinations with enough contrast for text, icons, and controls. This supports users with low vision, colour blindness, and other visual impairments.",
    demo: "colour-contrast",
  },
  {
    title: "Skip one colour step",
    description:
      "Skip at least one step in the colour scale when pairing foreground and background colours. This creates clearer separation between surfaces, text, and interactive elements.",
    demo: "colour-step",
  },
  {
    title: "Keep colour consistent",
    description:
      "Use the same colour for the same role across the interface. This helps users recognise repeated patterns and understand what each colour means.",
    demo: "colour-consistency",
  },
] as const;

const swatches = [
  { name: "White", color: "#FFFFFF", bordered: true, tone: "light" },
  { color: "#F3F3F3" },
  { color: "#DFDFDF" },
  { color: "#C6C6C6" },
  { color: "#A5A5A5" },
  { color: "#868686" },
  { color: "#6B6B6B" },
  { color: "#525252" },
  { color: "#3B3B3B" },
  { color: "#2A2A2A" },
  { color: "#1A1A1A" },
  { name: "Black", color: "#0E0E0E", tone: "dark" },
] as const;

const backgroundSwatches = [
  { label: "0", color: "#FFFFFF", tone: "light", topCaption: "Default /\nFixed light", bottomCaption: "Fixed light", bordered: true },
  { label: "100", color: "#F3F3F3", tone: "light", topCaption: "Alternate" },
  { label: "200", color: "#DFDFDF", tone: "light" },
  { label: "300", color: "#C6C6C6", tone: "light" },
  { label: "400", color: "#A5A5A5", tone: "light" },
  { label: "500", color: "#868686", tone: "light" },
  { label: "600", color: "#6B6B6B", tone: "dark" },
  { label: "700", color: "#525252", tone: "dark" },
  { label: "800", color: "#3B3B3B", tone: "dark" },
  { label: "900", color: "#2A2A2A", tone: "dark" },
  { label: "1000", color: "#1A1A1A", tone: "dark", bottomCaption: "Alternate" },
  { label: "1100", color: "#0E0E0E", tone: "dark", topCaption: "Fixed dark", bottomCaption: "Default /\nFixed dark" },
] as const;

const createSemanticSwatches = (
  overrides: Partial<(typeof backgroundSwatches)[number]>[] = [],
  options: { inheritCaptions?: boolean } = {}
) =>
  backgroundSwatches.map((swatch, index) => ({
    ...swatch,
    topCaption: options.inheritCaptions === false ? undefined : swatch.topCaption,
    bottomCaption: options.inheritCaptions === false ? undefined : swatch.bottomCaption,
    ...overrides[index],
  }));

const semanticScaleSections = [
  { title: "Background", swatches: createSemanticSwatches() },
  {
    title: "Surfaces",
    swatches: createSemanticSwatches([
      { topCaption: "Default /\nFixed light", bottomCaption: "Inverse /\nFixed light" },
      { topCaption: "Raised" },
      {},
      {},
      {},
      {},
      {},
      {},
      { bottomCaption: "Raised" },
      { topCaption: "Inverse /\nFixed dark", bottomCaption: "Default /\nFixed dark" },
      {},
      {},
    ], { inheritCaptions: false }),
  },
  {
    title: "Text and icons",
    swatches: createSemanticSwatches([
      {},
      { topCaption: "Inverse /\nFixed light", bottomCaption: "Default /\nFixed light" },
      {},
      { topCaption: "Muted" },
      { bottomCaption: "Subtle" },
      {},
      {},
      { topCaption: "Subtle" },
      { bottomCaption: "Muted" },
      {},
      { topCaption: "Default /\nFixed dark", bottomCaption: "Inverse /\nFixed dark" },
      {},
    ], { inheritCaptions: false }),
  },
  {
    title: "Borders",
    swatches: createSemanticSwatches([
      { topCaption: "Fixed light", bottomCaption: "Fixed light" },
      {},
      { topCaption: "Muted", bottomCaption: "Emphasis" },
      {},
      {},
      { topCaption: "Default", bottomCaption: "Default" },
      {},
      {},
      { topCaption: "Emphasis", bottomCaption: "Muted" },
      {},
      { topCaption: "Fixed dark", bottomCaption: "Fixed dark" },
      {},
    ], { inheritCaptions: false }),
  },
] as const;

const topLevels = [
  { label: "3.28 A", left: 1, right: 5, offset: "0rem" },
  { label: "4.8 AA", left: 1, right: 6, offset: "1.5rem" },
  { label: "7.04 AAA", left: 1, right: 7, offset: "3rem" },
] as const;

const bottomLevels = [
  { label: "7.06 AAA", left: 4, right: 10, offset: "0rem" },
  { label: "4.78 AA", left: 5, right: 10, offset: "1.5rem" },
  { label: "3.26 A", left: 6, right: 10, offset: "3rem" },
] as const;

const systemSections = [
  {
    title: "Lightness",
    description:
      "SGDS’s greys follow a perceptually curved progression of lightness. The outcome is a progression of grey colour values that are optimal for SGDS’s usage of grey. Each lightness value was converted into a target contrast ratio, which follows a polynomial curve.",
    yAxis: ["100%", "50%", "0%"],
    xAxis: ["grey-100", "grey-1000"],
    curve:
      "M0.149465 0.988767C43.1495 7.48877 157.149 47.4888 246.149 87.5756C335.149 127.663 530.003 195.615 624.649 219.489",
  },
  {
    title: "Contrast",
    description:
      "Greys include contrast ratios above and below a 1:1 contrast with the background.",
    yAxis: ["20", "10", "0"],
    xAxis: ["grey-100", "grey-1000"],
    curve:
      "M0.36441 204.479C31.3564 204.393 127.29 202.189 224.672 185.822C346.4 165.359 416.939 131.153 444.399 115.5C545.715 57.759 623.636 0.5 623.636 0.5",
  },
  {
    title: "Chromatic luminance",
    description:
      "As colours increase in saturation, they appear to have a brighter luminosity (also known as the Helmholtz–Kohlrausch effect). This affects SGDS colours that differ in saturation levels.",
    yAxis: ["20", "10", "0"],
    xAxis: ["grey-100", "grey-1000"],
    curve:
      "M0.5 196.5C67.5 194.5 145.5 188.5 224.5 173.5C310.5 157.5 391.5 133.5 465.5 102.5C532.5 74.5 585.5 41.5 624.5 12.5",
  },
  {
    title: "Stevens' power law",
    description:
      "This law is an observation in the rate of change in a given stimulus, and it affects lightness scales for colour. Numerically even distributions of tints and shades in a perceptually uniform colour space will not appear to be equally distributed.",
    yAxis: ["100%", "50%", "0%"],
    xAxis: ["grey-100", "grey-1000"],
    curve:
      "M0.5 6.5C41.5 12.5 120.5 34.5 207.5 63.5C290.5 91.5 392.5 131.5 486.5 171.5C542.5 195.5 590.5 214.5 624.5 220.5",
  },
] as const;

// SVG layout constants for background swatch cards
const SVG_W = 976;
const SVG_H = 400;
const PAD_X = 48;
const SWATCH_GAP = 8;
const SWATCH_SIZE = (SVG_W - 2 * PAD_X - 11 * SWATCH_GAP) / 12;
const STRIDE = SWATCH_SIZE + SWATCH_GAP;
const CAPTION_H = 32;
const STAGE_GAP = 8;
const CONTENT_H = CAPTION_H + STAGE_GAP + SWATCH_SIZE + STAGE_GAP + CAPTION_H;
const START_Y = (SVG_H - CONTENT_H) / 2;
const TOP_CAP_CENTER = START_Y + CAPTION_H / 2;
const SWATCH_TOP = START_Y + CAPTION_H + STAGE_GAP;
const SWATCH_CENTER_Y = SWATCH_TOP + SWATCH_SIZE / 2;
const BOT_CAP_CENTER = SWATCH_TOP + SWATCH_SIZE + STAGE_GAP + CAPTION_H / 2;
const SWATCH_RX = Math.min(12, SWATCH_SIZE * 0.3);

const swatchX = (i: number) => PAD_X + i * STRIDE;
const swatchCX = (i: number) => swatchX(i) + SWATCH_SIZE / 2;
const captionLineY = (center: number, lineIdx: number, total: number) =>
  center + (lineIdx - (total - 1) / 2) * 16;

// Greyscale card SVG layout
const GS_W = 1040;
const GS_H = 400;
const GS_PAD = 48;
const GS_FRAME_W = GS_W - 2 * GS_PAD;
const GS_GAP = 8;
const GS_SWATCH = (GS_FRAME_W - 11 * GS_GAP) / 12;
const GS_STRIDE = GS_SWATCH + GS_GAP;
const GS_SWATCH_Y = (GS_H - GS_SWATCH) / 2;
const GS_SWATCH_RX = Math.min(12, GS_SWATCH * 0.3);
const GS_CONN_H = 40;
const GS_CONN_R = 12;

const gsSwatchX = (i: number) => GS_PAD + i * GS_STRIDE;
const gsSwatchCX = (i: number) => gsSwatchX(i) + GS_SWATCH / 2;

const gsConnLeft = (col: number) => GS_PAD + col * (GS_FRAME_W / 12 + GS_GAP);
const gsConnRight = (col: number) => GS_W - GS_PAD - col * (GS_FRAME_W / 12 + GS_GAP);

// Top connector arms touch swatch top, brackets extend upward
const gsTopPath = (left: number, right: number, offset: string) => {
  const x1 = gsConnLeft(left);
  const x2 = gsConnRight(11 - right);
  const armY = GS_SWATCH_Y; // arms touch swatch top
  const h = GS_CONN_H + parseFloat(offset) * 16; // taller with offset
  const y = armY - h; // bracket top
  const r = GS_CONN_R;
  return `M${x1},${armY} V${y + r} A${r},${r} 0 0 1 ${x1 + r},${y} H${x2 - r} A${r},${r} 0 0 1 ${x2},${y + r} V${armY}`;
};

// Bottom connector arms touch swatch bottom, brackets extend downward
const gsBotPath = (left: number, right: number, offset: string) => {
  const x1 = gsConnLeft(left);
  const x2 = gsConnRight(11 - right);
  const armY = GS_SWATCH_Y + GS_SWATCH; // arms touch swatch bottom
  const h = GS_CONN_H + parseFloat(offset) * 16; // taller with offset
  const botY = armY + h; // bracket bottom
  const r = GS_CONN_R;
  return `M${x1},${armY} V${botY - r} A${r},${r} 0 0 0 ${x1 + r},${botY} H${x2 - r} A${r},${r} 0 0 0 ${x2},${botY - r} V${armY}`;
};

const gsTopLabelY = (offset: string) => GS_SWATCH_Y - GS_CONN_H - parseFloat(offset) * 16 - 4;
const gsBotLabelY = (offset: string) => GS_SWATCH_Y + GS_SWATCH + GS_CONN_H + parseFloat(offset) * 16 + 12;
const gsLabelCX = (left: number, right: number) =>
  (gsConnLeft(left) + gsConnRight(11 - right)) / 2;
</script>

<template>
  <div class="sgds:w-full">
    <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
      <FoundationPrinciplesList title="Colour principles" :principles="colourPrinciples" />

      <FoundationRulesGuidanceList title="Rules and guidelines" :rules="colourRules" />

      <section
        aria-labelledby="colour-system-title"
        class="sgds:flex sgds:flex-col sgds:gap-layout-lg"
      >
        <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
          <SectionHeader id="colour-system-title" title="Colour system" />
          <p class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:text-body-default sgds:m-0">
            SGDS uses 10 tints and shades of gray per color theme. These grays are neutral gray.
          </p>
        </div>

      <div
        v-for="(section, sectionIdx) in semanticScaleSections"
        :key="section.title"
        class="sgds:flex sgds:flex-col"
      >
        <Section :title="section.title" heading-level="h3" gap="sgds:gap-text-xl">
          <svg
            :viewBox="`0 0 ${SVG_W} ${SVG_H}`"
            xmlns="http://www.w3.org/2000/svg"
            class="sgds:block sgds:h-auto sgds:overflow-hidden sgds:w-full"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            :aria-label="`${section.title} colour scale`"
          >
            <defs>
              <clipPath :id="`card-clip-${sectionIdx}`">
                <rect x="0" y="0" :width="SVG_W" :height="SVG_H" rx="16" ry="16"/>
              </clipPath>
            </defs>

            <!-- Background halves -->
            <g :clip-path="`url(#card-clip-${sectionIdx})`">
              <rect x="0" y="0" :width="SVG_W" :height="SVG_H / 2" fill="var(--sgds-bg-fixed-light)"/>
              <rect x="0" :y="SVG_H / 2" :width="SVG_W" :height="SVG_H / 2" fill="var(--sgds-bg-fixed-dark)"/>
            </g>

            <!-- Card border -->
            <rect
              x="0.5" y="0.5"
              :width="SVG_W - 1" :height="SVG_H - 1"
              rx="16" ry="16"
              fill="none"
              stroke="var(--sgds-border-color-muted)"
              stroke-width="1"
            />

            <!-- Swatches and captions -->
            <g v-for="(swatch, i) in section.swatches" :key="`svg-${section.title}-${swatch.label}`">
              <!-- Top caption -->
              <template v-if="swatch.topCaption">
                <text
                  v-for="(line, li) in swatch.topCaption.split('\n')"
                  :key="`top-${swatch.label}-${li}`"
                  :x="swatchCX(i)"
                  :y="captionLineY(TOP_CAP_CENTER, li, swatch.topCaption.split('\n').length)"
                  text-anchor="middle"
                  dominant-baseline="central"
                  fill="var(--sgds-color-fixed-dark)"
                  font-size="var(--sgds-font-size-label-sm)"
                  font-weight="400"
                  font-family="var(--sgds-font-family-base, Inter, system-ui, sans-serif)"
                >{{ line }}</text>
              </template>

              <!-- Swatch square -->
              <rect
                :x="swatchX(i)"
                :y="SWATCH_TOP"
                :width="SWATCH_SIZE"
                :height="SWATCH_SIZE"
                :rx="SWATCH_RX"
                :ry="SWATCH_RX"
                :fill="swatch.color"
                :stroke="swatch.bordered ? 'var(--sgds-border-color-muted)' : 'none'"
                :stroke-width="swatch.bordered ? 1 : 0"
              />

              <!-- Swatch label -->
              <text
                :x="swatchCX(i)"
                :y="SWATCH_CENTER_Y"
                text-anchor="middle"
                dominant-baseline="central"
                :fill="swatch.tone === 'dark' ? 'var(--sgds-color-fixed-light)' : 'var(--sgds-color-fixed-dark)'"
                font-size="var(--sgds-font-size-label-sm)"
                font-weight="400"
                font-family="var(--sgds-font-family-base, Inter, system-ui, sans-serif)"
              >{{ swatch.label }}</text>

              <!-- Bottom caption -->
              <template v-if="swatch.bottomCaption">
                <text
                  v-for="(line, li) in swatch.bottomCaption.split('\n')"
                  :key="`bot-${swatch.label}-${li}`"
                  :x="swatchCX(i)"
                  :y="captionLineY(BOT_CAP_CENTER, li, swatch.bottomCaption.split('\n').length)"
                  text-anchor="middle"
                  dominant-baseline="central"
                  fill="var(--sgds-color-fixed-light)"
                  font-size="var(--sgds-font-size-label-sm)"
                  font-weight="400"
                  font-family="var(--sgds-font-family-base, Inter, system-ui, sans-serif)"
                >{{ line }}</text>
              </template>
            </g>
          </svg>
        </Section>
      </div>

      <div class="sgds:flex sgds:flex-col">
        <Section title="Greyscale" heading-level="h3" gap="sgds:gap-text-xl">
          <svg
            :viewBox="`0 0 ${GS_W} ${GS_H}`"
            xmlns="http://www.w3.org/2000/svg"
            class="sgds:block sgds:h-auto sgds:overflow-hidden sgds:w-full"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Greyscale contrast scale"
          >
            <!-- Card background and border -->
            <rect x="0" y="0" :width="GS_W" :height="GS_H" rx="16" ry="16" fill="var(--sgds-bg-default)"/>
            <rect x="0.5" y="0.5" :width="GS_W - 1" :height="GS_H - 1" rx="16" ry="16" fill="none" stroke="var(--sgds-border-color-muted)" stroke-width="1"/>

            <!-- Top connectors -->
            <g v-for="level in topLevels" :key="`top-conn-${level.label}`">
              <path
                :d="gsTopPath(level.left, level.right, level.offset)"
                fill="none"
                stroke="var(--sgds-border-color-muted)"
                stroke-width="1"
              />
              <!-- Label background -->
              <rect
                :x="gsLabelCX(level.left, level.right) - 30"
                :y="gsTopLabelY(level.offset) - 8"
                width="60" height="16" rx="2"
                fill="var(--sgds-surface-raised)"
              />
              <!-- Label text -->
              <text
                :x="gsLabelCX(level.left, level.right)"
                :y="gsTopLabelY(level.offset)"
                text-anchor="middle"
                dominant-baseline="central"
                fill="var(--sgds-body-color-default)"
                font-size="var(--sgds-font-size-label-sm)"
                font-weight="400"
                font-family="var(--sgds-font-family-base, Inter, system-ui, sans-serif)"
              >{{ level.label }}</text>
            </g>

            <!-- Swatches -->
            <g v-for="(swatch, i) in swatches" :key="`gs-swatch-${swatch.color}`">
              <rect
                :x="gsSwatchX(i)"
                :y="GS_SWATCH_Y"
                :width="GS_SWATCH"
                :height="GS_SWATCH"
                :rx="GS_SWATCH_RX"
                :ry="GS_SWATCH_RX"
                :fill="swatch.color"
                :stroke="swatch.bordered ? 'var(--sgds-border-color-muted)' : 'none'"
                :stroke-width="swatch.bordered ? 1 : 0"
              />
              <text
                v-if="swatch.name"
                :x="gsSwatchCX(i)"
                :y="GS_SWATCH_Y + GS_SWATCH / 2"
                text-anchor="middle"
                dominant-baseline="central"
                :fill="swatch.tone === 'dark' ? 'var(--sgds-color-fixed-light)' : 'var(--sgds-body-color-default)'"
                font-size="var(--sgds-font-size-label-sm)"
                font-weight="400"
                font-family="var(--sgds-font-family-base, Inter, system-ui, sans-serif)"
              >{{ swatch.name }}</text>
            </g>

            <!-- Bottom connectors -->
            <g v-for="level in bottomLevels" :key="`bot-conn-${level.label}`">
              <path
                :d="gsBotPath(level.left, level.right, level.offset)"
                fill="none"
                stroke="var(--sgds-border-color-muted)"
                stroke-width="1"
              />
              <!-- Label background -->
              <rect
                :x="gsLabelCX(level.left, level.right) - 30"
                :y="gsBotLabelY(level.offset) - 8"
                width="60" height="16" rx="2"
                fill="var(--sgds-surface-raised)"
              />
              <!-- Label text -->
              <text
                :x="gsLabelCX(level.left, level.right)"
                :y="gsBotLabelY(level.offset)"
                text-anchor="middle"
                dominant-baseline="central"
                fill="var(--sgds-body-color-default)"
                font-size="var(--sgds-font-size-label-sm)"
                font-weight="400"
                font-family="var(--sgds-font-family-base, Inter, system-ui, sans-serif)"
              >{{ level.label }}</text>
            </g>
          </svg>
        </Section>
      </div>

      <div
        v-for="section in systemSections"
        :key="section.title"
        class="sgds:flex sgds:flex-col"
      >
        <Section
          :title="section.title"
          :description="section.description"
          heading-level="h3"
          header-gap="sgds:gap-text-xs"
          gap="sgds:gap-text-xl"
        >
          <div class="cs-chartCard sgds:bg-surface-raised sgds:border-1 sgds:border-muted sgds:overflow-hidden">
            <div class="cs-chartFrame sgds:mx-auto sgds:w-full sgds:py-layout-md">
              <div class="cs-lightnessChart sgds:flex sgds:mx-auto sgds:w-full">
                <div class="cs-lightnessYAxis sgds:flex sgds:flex-col sgds:items-end sgds:justify-between sgds:shrink-0">
                  <span
                    v-for="label in section.yAxis"
                    :key="`${section.title}-${label}`"
                    class="cs-lightnessLabel sgds:text-label-md sgds:leading-xs sgds:tracking-normal sgds:whitespace-nowrap"
                  >
                    {{ label }}
                  </span>
                </div>
                <div class="sgds:flex-1 sgds:min-w-0">
                  <div class="cs-lightnessChartBox sgds:bg-surface-default sgds:border-1 sgds:border-muted sgds:relative sgds:w-full">
                    <div class="sgds:border-b sgds:border-muted sgds:h-1/2 sgds:w-full"></div>
                    <svg
                      class="sgds:block sgds:absolute sgds:top-0 sgds:left-0 sgds:w-full sgds:h-full"
                      preserveAspectRatio="none"
                      viewBox="0 0 624.894 220.458"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        :d="section.curve"
                        stroke="var(--sgds-body-color-subtle)"
                        stroke-width="2"
                        vector-effect="non-scaling-stroke"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <div class="sgds:flex sgds:justify-between sgds:mt-sm">
                    <span
                      v-for="label in section.xAxis"
                      :key="`${section.title}-${label}`"
                      class="cs-lightnessLabel sgds:text-label-md sgds:leading-xs sgds:tracking-normal sgds:whitespace-nowrap"
                    >
                      {{ label }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
      </section>
    </div>
  </div>
</template>

<style>
/* calc() padding values not expressible as utilities */
.cs-chartCard {
  border-radius: var(--sgds-border-radius-2-xl);
  padding-top: calc(var(--sgds-layout-padding-sm) + var(--sgds-padding-sm));
  padding-bottom: var(--sgds-layout-padding-sm);
  padding-inline: var(--sgds-component-padding-md);
}

/* non-standard max-width */
.cs-chartFrame {
  max-width: 84.5rem;
}

/* non-standard max-width and raw gap token */
.cs-lightnessChart {
  gap: var(--sgds-gap-xs);
  max-width: 36rem;
}

/* calc() padding and specific width */
.cs-lightnessYAxis {
  padding-bottom: calc(var(--sgds-line-height-24) + var(--sgds-gap-xs));
  width: 2rem;
}

/* color token without direct utility equivalent */
.cs-lightnessLabel {
  color: var(--sgds-label-color-subtle);
}

/* custom aspect ratio not expressible as utility */
.cs-lightnessChartBox {
  aspect-ratio: 624 / 252;
}


@media (max-width: 1023px) {
  .cs-chartCard {
    padding-top: calc(var(--sgds-layout-padding-sm) + var(--sgds-padding-xs));
    padding-bottom: var(--sgds-layout-padding-sm);
    padding-inline: var(--sgds-component-padding-sm);
  }
}

@media (max-width: 767px) {
  .cs-chartCard {
    border-radius: var(--sgds-border-radius-xl);
    padding-top: calc(var(--sgds-layout-padding-xs) + var(--sgds-padding-xs));
    padding-bottom: var(--sgds-layout-padding-xs);
    padding-inline: var(--sgds-component-padding-xs);
  }
}
</style>
