<script setup lang="ts">
import { useData } from "vitepress";
import "@govtechsg/sgds-web-component/components/Footer/index.js";
import "@govtechsg/sgds-web-component/components/Icon/index.js";

const { site } = useData()
</script>

<template>
  <sgds-footer>
    <h2 slot="title">{{ site.title }}</h2>
    <p slot="description">The Singapore Government Design System was developed to empower teams in creating fast, accessible and mobile-friendly digital services.</p>
    <div :class="$style['social-media']">
      <a href="#" aria-label="Instagram">
        <span></span>
        <sgds-icon size="xl" name="instagram"></sgds-icon>
        <span></span>
      </a>
      <a href="#" aria-label="LinkedIn">
        <span></span>
        <sgds-icon size="xl" name="linkedin"></sgds-icon>
        <span></span>
      </a>
      <a href="#" aria-label="Youtube">
        <span></span>
        <sgds-icon size="xl" name="youtube"></sgds-icon>
        <span></span>
      </a>
    </div>
  </sgds-footer>
</template>

<style module>
  .social-media {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sgds-gap-md);
  }

  .social-media sgds-icon {
    color: var(--sgds-color-fixed-light);
  }
</style>