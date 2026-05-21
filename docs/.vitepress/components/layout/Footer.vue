<script setup lang="ts">
import { useData } from "vitepress";

const { site } = useData()
</script>

<template>
  <sgds-footer privacyHref="/privacy" termsOfUseHref="/terms-of-use">
    <h2 slot="title">{{ site.title }}</h2>
    <p slot="description">The Singapore Government Design System was developed to empower teams in creating fast, accessible and mobile-friendly digital services.</p>
    <sgds-footer-item slot="items">
      <span slot="title">Past Versions</span>
      <sgds-link>
        <a href="https://v1.designsystem.tech.gov.sg/" target="_blank">SGDS v1</a>
      </sgds-link>
      <sgds-link>
        <a href="https://v2.designsystem.tech.gov.sg/" target="_blank">SGDS v2</a>
      </sgds-link>
    </sgds-footer-item>
  </sgds-footer>
</template>
