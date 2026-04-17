<script setup lang="ts">
import { computed } from "vue";

type Background = "default" | "tinted" | "primary";

const props = withDefaults(defineProps<{
  /** Main headline text */
  headline?: string;
  /** Optional overline label displayed above the headline */
  overline?: string;
  /** Optional description text displayed below the headline */
  description?: string;
  /**
   * Background variant.
   * - `default`: white page background (no-container centres content; container shows a white card)
   * - `tinted`: alternate grey background (no-container fills section; container shows a raised card)
   * - `primary`: brand purple background (no-container fills section; container shows a purple card)
   */
  background?: Background;
  /**
   * When true, content is placed inside a rounded card rather than
   * filling the full section background.
   */
  container?: boolean;
}>(), {
  headline: "Headline",
  background: "default",
  container: false,
});

/** Only the default/white + no-container variant centres its content */
const isCentered = computed(() => props.background === "default" && !props.container);

/** Primary background requires light text throughout */
const isOnDark = computed(() => props.background === "primary");

const outerBgClass = computed(() => {
  if (props.container) return ""; // card provides the colour
  if (props.background === "primary") return "sgds:bg-primary-default";
  if (props.background === "tinted") return "sgds:bg-alternate";
  return "sgds:bg-default";
});

const cardBgClass = computed(() => {
  if (props.background === "primary") return "sgds:bg-primary-surface-default";
  if (props.background === "tinted") return "sgds:bg-surface-raised";
  return "sgds:bg-surface-default";
});
</script>

<template>
  <div
    :class="[
      'sgds:w-full sgds:flex sgds:flex-col sgds:items-center',
      container ? 'sgds:py-layout-lg sgds:px-layout-lg' : 'sgds:py-layout-xl',
      outerBgClass,
    ]"
  >
    <!-- Inner: max-width container, card styling when container=true -->
    <div
      :class="[
        'sgds:w-full sgds:max-w-[1312px] sgds:flex sgds:flex-col sgds:gap-text-md',
        isCentered ? 'sgds:items-center sgds:text-center' : 'sgds:items-start',
        container ? ['sgds:p-layout-lg sgds:rounded-xl', cardBgClass] : 'sgds:px-layout-lg',
      ]"
    >
      <!-- Overline -->
      <p
        v-if="overline"
        :class="[
          'sgds:text-overline-md sgds:font-semibold sgds:leading-xs sgds:tracking-wide sgds:uppercase sgds:m-0',
          isOnDark ? 'sgds:text-fixed-light' : 'sgds:text-subtle',
        ]"
      >
        {{ overline }}
      </p>

      <!-- Headline -->
      <p
        :class="[
          'sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter sgds:m-0',
          isOnDark ? 'sgds:text-fixed-light' : '',
        ]"
      >
        {{ headline }}
      </p>

      <!-- Description -->
      <p
        v-if="description"
        :class="[
          'sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:max-w-[864px] sgds:m-0',
          isOnDark ? 'sgds:text-fixed-light' : 'sgds:text-subtle',
        ]"
      >
        {{ description }}
      </p>

      <!-- Action slot (buttons / CTAs) -->
      <div v-if="$slots.default" class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-component-sm sgds:min-h-12">
        <slot />
      </div>
    </div>
  </div>
</template>
