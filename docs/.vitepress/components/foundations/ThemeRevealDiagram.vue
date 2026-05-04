<script setup lang="ts">
import { computed, ref } from "vue";
import dayThemeDiagram from "./assets/day.svg";
import nightThemeDiagram from "./assets/night.svg";

const reveal = ref(50);

const revealStyle = computed(() => ({
  clipPath: `inset(0 ${100 - reveal.value}% 0 0)`,
}));

const dividerStyle = computed(() => ({
  left: `${reveal.value}%`,
}));
</script>

<template>
  <figure class="sgds:m-0 sgds:block sgds:w-full sgds:max-w-full sgds:min-w-0" aria-label="Drag to compare SGDS day and night theme token output">
    <div class="sgds:box-border sgds:w-full sgds:max-w-full sgds:min-w-0 sgds:overflow-hidden">
      <div class="sgds:relative sgds:h-[320px] sgds:w-full sgds:overflow-hidden sgds:bg-fixed-dark">
        <span class="sgds:absolute sgds:inset-0 sgds:block sgds:bg-fixed-light" :style="revealStyle" aria-hidden="true"></span>
        <img
          :src="nightThemeDiagram"
          alt="Night theme token output"
          class="sgds:absolute sgds:left-1/2 sgds:top-1/2 sgds:block sgds:h-auto sgds:w-full sgds:max-w-[635px] sgds:-translate-x-1/2 sgds:-translate-y-1/2"
        />
        <div class="sgds:absolute sgds:inset-0 sgds:overflow-hidden" :style="revealStyle">
          <img
            :src="dayThemeDiagram"
            alt="Day theme token output"
            class="sgds:absolute sgds:left-1/2 sgds:top-1/2 sgds:block sgds:h-auto sgds:w-full sgds:max-w-[635px] sgds:-translate-x-1/2 sgds:-translate-y-1/2"
          />
        </div>

        <div
          class="sgds:pointer-events-none sgds:absolute sgds:top-0 sgds:bottom-0 sgds:w-[var(--sgds-border-width-2)] sgds:-translate-x-1/2 sgds:bg-border-default"
          :style="dividerStyle"
          aria-hidden="true"
        >
          <span class="sgds:absolute sgds:left-1/2 sgds:top-1/2 sgds:flex sgds:h-10 sgds:w-10 sgds:-translate-x-1/2 sgds:-translate-y-1/2 sgds:items-center sgds:justify-center sgds:rounded-full sgds:border sgds:border-default sgds:bg-default sgds:text-label-sm sgds:font-semibold sgds:text-default">
            ||
          </span>
        </div>

        <input
          v-model.number="reveal"
          class="sgds:absolute sgds:inset-0 sgds:z-10 sgds:h-full sgds:w-full sgds:cursor-ew-resize sgds:opacity-0"
          type="range"
          min="0"
          max="100"
          step="1"
          aria-label="Reveal day or night theme"
          :aria-valuetext="`${reveal}% day theme visible`"
        />
      </div>
    </div>
  </figure>
</template>
