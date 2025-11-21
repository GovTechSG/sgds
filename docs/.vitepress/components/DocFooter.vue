<script setup lang="ts">
import { usePrevNext } from '../theme/composables/usePrevNext';
import "@govtechsg/sgds-web-component/components/Icon/index.js";

const prevNext = usePrevNext();
</script>

<template>
  <nav :class="$style.pager">
    <a v-if="prevNext.prev" :href="prevNext.prev.link" :class="$style['pager-prev']">
      <sgds-icon name="arrow-circle-left" size="2-xl"></sgds-icon>
      <div>
        <p :class="$style.label">Previous</p>
        <h5 :class="$style.title">{{ prevNext.prev.text }}</h5>
      </div>
    </a>
    
    <a v-if="prevNext.next" :href="prevNext.next.link" :class="$style['pager-next']">
      <div>
        <p :class="$style.label">Next</p>
        <h5 :class="$style.title">{{ prevNext.next.text }}</h5>
      </div>
      <sgds-icon name="arrow-circle-right" size="2-xl"></sgds-icon>
    </a>
  </nav>
</template>

<style module>
  .pager {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sgds-gap-2-xl);
  }

  .pager-prev,
  .pager-next {
    display: flex;
    align-items: flex-start;
    gap: var(--sgds-gap-md);
    padding: var(--sgds-padding-xl);
    border-radius: var(--sgds-border-radius-xl);
    background-color: var(--sgds-surface-raised);
    text-decoration: none;
    color: var(--sgds-body-color-default);
  }

  .pager-prev:hover,
  .pager-next:hover,
  .pager-prev:focus,
  .pager-next:focus,
  .pager-prev:focus-visible,
  .pager-next:focus-visible {
    color: var(--sgds-body-color-default);
  }

  .pager-prev:focus-visible,
  .pager-next:focus-visible {
    outline: var(--sgds-outline-focus);
    outline-offset: var(--sgds-outline-offset-focus);
  }

  .pager-next {
    justify-content: space-between;
    grid-column: 2;
  }

  .label {
    font-size: var(--sgds-font-size-1);
    margin-bottom: var(--sgds-margin-bottom-none);
  }

  .title {
    margin-bottom: var(--sgds-margin-bottom-none);
  }
</style>