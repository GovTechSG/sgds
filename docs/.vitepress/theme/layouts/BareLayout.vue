<script setup>
import { Content } from "vitepress";
</script>

<template>
  <Content />
</template>

<style>
/* The bare layout is loaded inside an iframe to preview a page template at a
   given viewport width. Strip body margins so the template fills the iframe
   edge-to-edge. */
body {
  margin: 0;
}
</style>
