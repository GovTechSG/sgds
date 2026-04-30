<script setup lang="ts">
import {
  semanticColorSets,
  type SemanticColorItem,
} from "../../data/system-palette";
import Section from "./Section.vue";

const toRgb = (hex: string) => {
  const value = hex.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);

  return `${red} / ${green} / ${blue}`;
};

const toHsl = (hex: string) => {
  const value = hex.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16) / 255;
  const green = parseInt(value.slice(2, 4), 16) / 255;
  const blue = parseInt(value.slice(4, 6), 16) / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  const delta = max - min;

  if (delta === 0) return `0deg / 0% / ${Math.round(lightness * 100)}%`;

  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  let hue = 0;

  if (max === red) hue = ((green - blue) / delta) % 6;
  else if (max === green) hue = (blue - red) / delta + 2;
  else hue = (red - green) / delta + 4;

  return `${Math.round(hue * 60 < 0 ? hue * 60 + 360 : hue * 60)}deg / ${Math.round(saturation * 100)}% / ${Math.round(lightness * 100)}%`;
};

const getCardTone = (hex: string) => {
  const value = hex.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.62 ? "sgds:text-fixed-dark" : "sgds:text-fixed-light";
};

const isBordered = (hex: string) => ["#FFFFFF", "#F7F7F7", "#F4F2FE", "#FBF0FE", "#FCF1F1", "#FEF4CB", "#ECF5FE", "#E3F9ED", "#E0F7FC", "#F3F3F3"].includes(hex);

const tokenCardClass = (item: SemanticColorItem) => [
  "sgds-col-4 sgds-col-sm-4 sgds-col-lg-4 sgds:flex sgds:flex-col sgds:justify-between sgds:gap-[var(--sgds-gap-4-xl)] sgds:min-h-[var(--sgds-dimension-288)] sgds:p-[var(--sgds-padding-2-xl)] sgds:rounded-xl sgds:overflow-hidden",
  getCardTone(item.hex),
  isBordered(item.hex) ? "sgds:border sgds:border-muted" : "",
];
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <Section
      title="Semantic palettes"
      description="Semantic colour tokens name the role a colour plays in the interface. These values are resolved from the SGDS day theme in the current web component package."
    >
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
        <article
          v-for="set in semanticColorSets"
          :key="set.title"
          class="sgds:flex sgds:flex-col sgds:gap-layout-md"
        >
          <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
            <h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:m-0">{{ set.title }}</h3>
            <p class="sgds:text-body-md sgds:text-subtle sgds:max-w-[56rem] sgds:m-0">{{ set.description }}</p>
          </div>

          <div
            v-for="group in set.groups"
            :key="`${set.title}-${group.title}`"
            class="sgds:flex sgds:flex-col sgds:gap-md"
          >
            <h4 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-sm sgds:tracking-normal sgds:m-0">{{ group.title }}</h4>
            <div class="sgds-grid">
              <article
                v-for="item in group.items"
                :key="item.token"
                :class="tokenCardClass(item)"
                :style="{ backgroundColor: item.hex }"
              >
                <h5 class="sgds:text-[inherit] sgds:text-label-lg sgds:font-semibold sgds:leading-sm sgds:tracking-normal sgds:m-0">{{ item.label }}</h5>
                <dl class="sgds:grid sgds:grid-cols-[auto_1fr] sgds:gap-x-2-xs sgds:gap-y-2-xs sgds:text-[inherit] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:m-0">
                  <dt>HEX</dt>
                  <dd class="sgds:m-0">{{ item.hex }}</dd>
                  <dt>HSL</dt>
                  <dd class="sgds:m-0">{{ toHsl(item.hex) }}</dd>
                  <dt>RGB</dt>
                  <dd class="sgds:m-0">{{ toRgb(item.hex) }}</dd>
                </dl>
              </article>
            </div>
          </div>
        </article>
      </div>
    </Section>
  </div>
</template>
