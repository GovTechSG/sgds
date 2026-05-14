<script setup lang="ts">
import landingShowcaseSvg from "./assets/landing-showcase.svg?raw";
</script>

<template>
  <div
    aria-hidden="true"
    class="landing-workflow-visual sgds:w-full sgds:overflow-hidden sgds:rounded-[32px] sgds:bg-alternate"
    v-html="landingShowcaseSvg"
  ></div>
</template>

<style>
/* Global selector targets SVG markup injected by v-html, which cannot receive SGDS utility classes directly. */
.landing-workflow-visual svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
