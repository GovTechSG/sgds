<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Mainnav/index.js";
import { useRoute, useData } from "vitepress";

const route = useRoute();
const { site } = useData();

const navItems = [
  { text: "Getting started", link: "/foundations/", activeMatch: "/getting-started"},
  { text: "Foundations", link: "/foundations/", activeMatch: "/foundations"},
  { text: "Components", link: "/components/data-display/accordion", activeMatch: "/components"},
  { text: "Patterns", link: "/foundations/", activeMatch: "/patterns"},
  { text: "Guidelines", link: "/foundations/", activeMatch: "/guidelines"},
  { text: "Resources", link: "/foundations/", activeMatch: "/resources"},
]
</script>

<template>
  <sgds-mainnav expand="lg">
    <a href="/" slot="brand">
      <img src="/logo.png" :alt="site.title" width="126" height="38">
    </a>

    <sgds-mainnav-item
      v-for="navItem in navItems"
      :key="navItem.link"
      expand="lg"
      :active="route.path.startsWith(navItem.activeMatch)"
    >
      <a :href="navItem.link">{{ navItem.text }}</a>
    </sgds-mainnav-item>
  </sgds-mainnav>
</template>

<style module>
    
</style>