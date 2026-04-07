<script setup lang="ts">
import { useData } from "vitepress";

const { site } = useData()
</script>

<template>
  <sgds-footer>
    <h2 slot="title">{{ site.title }}</h2>
    <p slot="description">The Singapore Government Design System was developed to empower teams in creating fast, accessible and mobile-friendly digital services.</p>
    <div class="sgds:flex sgds:flex-wrap sgds:gap-component-sm">
      <a href="#" aria-label="Instagram">
        <span></span>
        <sgds-icon size="xl" name="instagram" class="sgds:text-fixed-light"></sgds-icon>
        <span></span>
      </a>
      <a href="#" aria-label="LinkedIn">
        <span></span>
        <sgds-icon size="xl" name="linkedin" class="sgds:text-fixed-light"></sgds-icon>
        <span></span>
      </a>
      <a href="#" aria-label="Youtube">
        <span></span>
        <sgds-icon size="xl" name="youtube" class="sgds:text-fixed-light"></sgds-icon>
        <span></span>
      </a>
    </div>
  </sgds-footer>
</template>
