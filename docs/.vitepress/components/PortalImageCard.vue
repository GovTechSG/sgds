<script setup lang="ts">
import "@govtechsg/sgds-web-component/components/Link/index.js";
import "@govtechsg/sgds-web-component/components/Icon/index.js";
import { FoundationItem } from "../data/foundations";

const {item, currentPhase} = defineProps<{
  item: FoundationItem;
  currentPhase: number;
}>();
</script>

<template>
  <sgds-link
    :class="$style.item"
    class="sgds-col-4"
  >
    <a
      :href="item.status !== 'draft' ? item.url : 'javascript:void(0)'"
      :class="[$style.link, item.status === 'draft' ? $style.disabled : '']"
    >
      <div :class="$style['image-container']">
        <img
          :src="item.image !== '' ? item.image : '/foundations/placeholder.png'"
          :alt="item.title"
          width="424"
          height="300"
          :class="$style.image"
        >
        <span :class="$style['upcoming-phase']" v-if="item.phase > currentPhase">Coming up in PHASE {{ item.phase }}</span>
      </div>
      <div :class="$style['title-container']">
        <h4 :class="$style.title">{{ item.title }}</h4>
        <sgds-icon v-if="item.status === 'stable'" name="arrow-right" :class="$style.icon"></sgds-icon>
        <sgds-icon v-if="item.status === 'draft'" name="lock-fill" :class="$style.icon"></sgds-icon>
      </div>
    </a>
  </sgds-link>
</template>

<style module>
  .item {
    display: block;
  }

  .link {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-gap-xl);
  }
  
  .disabled {
    cursor: not-allowed;
  }

  .image-container {
    position: relative;
    display: flex;
  }

  .image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 32px;
  }

  .placeholder {
    width: 100%;
    height: 300px;
  }

  .upcoming-phase {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: var(--sgds-color-fixed-dark);
    font-size: var(--sgds-font-size-6);
    line-height: normal;
    font-weight: var(--sgds-font-weight-bold);
  }

  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--sgds-gap-sm);
  }

  .title {
    font-weight: var(--sgds-font-weight-semibold);
    margin-bottom: var(--sgds-margin-none);
  }
  
  .icon {
    color: var(--sgds-color-default);
  }

  @media (min-width: 512px) {
    .upcoming-phase {
      font-size: var(--sgds-font-size-3)
    }
  }

  @media (min-width: 768px) {
    .upcoming-phase {
      font-size: var(--sgds-font-size-5)
    }
  }

  @media (min-width: 1024px) {
    .upcoming-phase {
      font-size: var(--sgds-font-size-4)
    }
  }

  @media (min-width: 1280px) {
    .upcoming-phase {
      font-size: var(--sgds-font-size-6)
    }
  }
</style>