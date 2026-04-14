<script setup lang="ts">
import TypographyStyleSectionPage from "./TypographyStyleSectionPage.vue";
import { typographyStyleSections } from "../data/typography-style-tokens";

const allSectionKeys = typographyStyleSections.map((s) => s.key);
</script>

<template>
  <TypographyStyleSectionPage :section-keys="allSectionKeys" />
</template>
