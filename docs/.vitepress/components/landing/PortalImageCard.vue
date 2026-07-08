<script setup lang="ts">
import { ref } from 'vue';
import { FoundationItem } from "../../data/foundations";
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
    class="sgds-col-4 sgds:block sgds:relative"
  >
    <a
      :href="item.status !== 'draft' ? item.url : undefined"
      :class="['sgds:group sgds:flex sgds:flex-col sgds:gap-6', item.status === 'draft' ? 'sgds:cursor-not-allowed' : '']"
      @click="item.status === 'draft' ? handleDisabledClick($event) : undefined"
    >
      <div
        :class="[
          'sgds:relative sgds:flex sgds:w-full sgds:aspect-[424/300] sgds:overflow-hidden sgds:rounded-[32px]',
          item.imageFit === 'contain' ? 'sgds:items-center sgds:justify-center sgds:bg-surface-raised' : '',
        ]"
      >
        <div
          v-if="isPlaceholder && item.status === 'stable'"
          class="sgds:absolute sgds:inset-0 sgds:flex sgds:flex-col sgds:items-center sgds:justify-center sgds:gap-text-sm sgds:bg-surface-raised sgds:p-layout-md sgds:text-center"
        >
          <sgds-icon name="image" size="2-xl" class="sgds:text-subtle"></sgds-icon>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            No image yet, but content is available
          </p>
        </div>
        <ComingSoonAnimation v-else-if="isPlaceholder" :phase="item.phase" />
        <img
          v-else
          :src="item.image"
          :alt="item.title"
          width="424"
          height="300"
          :class="item.imageFit === 'contain'
            ? [
              item.imageClass,
              'sgds:object-contain sgds:transition-transform sgds:duration-500 sgds:ease-in-out sgds:group-hover:-translate-y-2 sgds:group-hover:scale-[1.04] sgds:group-focus-visible:-translate-y-2 sgds:group-focus-visible:scale-[1.04] sgds:motion-reduce:transition-none sgds:motion-reduce:group-hover:translate-y-0 sgds:motion-reduce:group-hover:scale-100 sgds:motion-reduce:group-focus-visible:translate-y-0 sgds:motion-reduce:group-focus-visible:scale-100',
            ]
            : 'sgds:h-full sgds:w-full sgds:object-cover'"
        >
      </div>
      <div class="sgds:flex sgds:items-center sgds:gap-component-xs sgds:w-full">
        <h3 class="sgds:flex-1 sgds:m-0 sgds:text-left sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default">{{ item.title }}</h3>
        <sgds-icon v-if="item.status === 'stable'" name="arrow-right" size="2-xl" class="sgds:text-default sgds:flex-shrink-0 sgds:ml-auto"></sgds-icon>
        <sgds-icon v-if="item.status === 'draft'" name="lock-fill" size="xl" class="sgds:text-default sgds:flex-shrink-0 sgds:ml-auto"></sgds-icon>
      </div>
    </a>

    <Transition name="portal-toast">
      <div
        v-if="showToast"
        class="sgds:absolute sgds:left-1/2 sgds:-translate-x-1/2 sgds:bg-surface-inverse sgds:text-inverse sgds:px-component-sm sgds:py-component-xs sgds:rounded-full sgds:text-1 sgds:font-medium sgds:whitespace-nowrap sgds:flex sgds:items-center sgds:gap-component-xs sgds:pointer-events-none sgds:z-10 portal-toast-element"
      >
        <sgds-icon name="emoji-smile" size="md"></sgds-icon>
        <span>don't ganjiong we already said coming soon!</span>
      </div>
    </Transition>
  </sgds-link>
</template>

<style>
/* Vue Transition hook classes — required by <Transition name="portal-toast"> */
.portal-toast-enter-active,
.portal-toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.portal-toast-enter-from,
.portal-toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}
.portal-toast-enter-to,
.portal-toast-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Toast positioning requires bottom-relative calc not expressible as a utility */
.portal-toast-element {
  bottom: calc(100% + 8px);
}

</style>
