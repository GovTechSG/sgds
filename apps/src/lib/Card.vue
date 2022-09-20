<template>
  <div class="sgds-card typography-no-margin">
    <slot name="header"></slot>
    <slot name="content">
      <div
        class="
          sgds-card-content sgds-card-content-space-between
          spacing-container-vertical spacing-16
        "
      >
        <div class="spacing-container-vertical spacing-16">
          <slot name="main-content"></slot>
        </div>
        <slot name="front-matter-attributes"></slot>
      </div>
    </slot>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
export default {};
</script>
