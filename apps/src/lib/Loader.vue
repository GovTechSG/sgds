<template>
  <div :style="{ display: 'flex', justifyContent: 'center' }" v-if="active">
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    active: Boolean,
  },
};
</script>