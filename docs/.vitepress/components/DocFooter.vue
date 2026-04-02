<script setup lang="ts">
import { usePrevNext } from '../theme/composables/usePrevNext';

const prevNext = usePrevNext();
</script>

<template>
  <nav :class="$style.pager">
    <a v-if="prevNext.prev" :href="prevNext.prev.link" :class="$style['pager-prev']">
      <sgds-icon name="arrow-circle-left" size="2-xl"></sgds-icon>
      <div :class="$style.content">
        <p :class="[$style.label, 'sgds:text-1 sgds:font-regular sgds:leading-20 sgds:tracking-normal']">Previous</p>
        <h5 :class="$style.title">{{ prevNext.prev.text }}</h5>
      </div>
    </a>
    
    <a v-if="prevNext.next" :href="prevNext.next.link" :class="$style['pager-next']">
      <div :class="$style.content">
        <p :class="[$style.label, 'sgds:text-1 sgds:font-regular sgds:leading-20 sgds:tracking-normal']">Next</p>
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
    align-items: flex-start;
    background-color: var(--sgds-surface-raised);
    border-radius: var(--sgds-border-radius-lg);
    color: var(--sgds-body-color-default);
    display: flex;
    gap: var(--sgds-gap-md);
    padding: var(--sgds-padding-xl);
    text-decoration: none;
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

  .content {
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    gap: var(--sgds-gap-2-xs);
    min-width: 0;
  }

  .label {
    margin-bottom: var(--sgds-margin-bottom-none);
  }

  .title {
    color: var(--sgds-heading-color-default);
    font-size: var(--sgds-font-size-3);
    font-weight: var(--sgds-font-weight-semibold);
    letter-spacing: var(--sgds-letter-spacing-normal);
    line-height: var(--sgds-line-height-24);
    margin-bottom: var(--sgds-margin-bottom-none);
  }

  @media (max-width: 767px) {
    .pager {
      grid-template-columns: 1fr;
    }

    .pager-next {
      grid-column: auto;
    }
  }
</style>
