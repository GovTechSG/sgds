<script setup lang="ts">
import { ref } from 'vue';
import { FoundationItem } from "../data/foundations";
import ComingSoonAnimation from "./ComingSoonAnimation.vue";

const {item, currentPhase} = defineProps<{
  item: FoundationItem;
  currentPhase: number;
}>();

const isPlaceholder = item.image === '' || item.image?.includes('placeholder') || item.image?.includes('coming-soon');

const showToast = ref(false);
let toastTimer: ReturnType<typeof setTimeout> | null = null;

function handleDisabledClick(e: MouseEvent) {
  e.preventDefault();
  if (showToast.value) return;
  showToast.value = true;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    showToast.value = false;
  }, 2200);
}
</script>

<template>
  <sgds-link
    :class="$style.item"
    class="sgds-col-4"
  >
    <a
      :href="item.status !== 'draft' ? item.url : 'javascript:void(0)'"
      :class="[$style.link, item.status === 'draft' ? $style.disabled : '']"
      @click="item.status === 'draft' ? handleDisabledClick($event) : undefined"
    >
      <div :class="$style['image-container']">
        <ComingSoonAnimation v-if="isPlaceholder" :phase="item.phase" />
        <img
          v-else
          :src="item.image"
          :alt="item.title"
          width="424"
          height="300"
          :class="$style.image"
        >
      </div>
      <div :class="$style['title-container']">
        <h4 :class="$style.title" class="sgds:text-4 sgds:font-semibold sgds:leading-32 sgds:tracking-tight">{{ item.title }}</h4>
        <sgds-icon v-if="item.status === 'stable'" name="arrow-right" size="2-xl" :class="$style.icon"></sgds-icon>
        <sgds-icon v-if="item.status === 'draft'" name="lock-fill" size="xl" :class="$style.icon"></sgds-icon>
      </div>
    </a>

    <Transition name="toast">
      <div v-if="showToast" :class="$style.toast">
        <sgds-icon name="emoji-smile" size="md"></sgds-icon>
        <span>don't ganjiong we already said coming soon!</span>
      </div>
    </Transition>
  </sgds-link>
</template>

<style module>
  .item {
    display: block;
    position: relative;
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
    width: 100%;
    aspect-ratio: 424 / 300;
    overflow: hidden;
    border-radius: 32px;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    align-items: center;
    gap: var(--sgds-gap-sm);
    width: 100%;
  }

  .title {
    flex: 1 1 auto;
    margin-bottom: var(--sgds-margin-none);
    text-align: left;
  }

  .icon {
    color: var(--sgds-color-default);
    flex-shrink: 0;
    margin-left: auto;
  }

  .toast {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--sgds-surface-inverse);
    color: var(--sgds-color-inverse);
    padding: var(--sgds-component-padding-xs) var(--sgds-component-padding-sm);
    border-radius: 999px;
    font-size: var(--sgds-font-size-1);
    font-weight: var(--sgds-font-weight-medium);
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: var(--sgds-gap-sm);
    pointer-events: none;
    z-index: 10;
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

<style>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}
.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
