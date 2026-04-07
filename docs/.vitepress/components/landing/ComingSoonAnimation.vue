<template>
  <div class="sgds:w-full sgds:h-full sgds:flex sgds:flex-col sgds:items-center sgds:justify-center sgds:gap-text-sm sgds:bg-surface-raised">
    <div class="sgds:flex sgds:items-end sgds:gap-[2px] sgds:select-none">
      <span
        v-for="(char, i) in chars"
        :key="i"
        :class="['sgds:inline-block sgds:text-4 sgds:font-bold sgds:text-subtle sgds:tracking-[0.05em] coming-soon-char', char === ' ' ? 'sgds:w-[0.4em]' : '']"
        :style="{ animationDelay: `${i * 0.08}s` }"
      >{{ char === ' ' ? '\u00A0' : char }}</span>
    </div>
    <div v-if="phase" class="sgds:text-1 sgds:font-medium sgds:text-subtle sgds:tracking-[0.1em] sgds:uppercase sgds:opacity-60">Phase {{ phase }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ phase?: number }>();
const chars = Array.from("COMING SOON");
</script>

<style>
/* @keyframes cannot be expressed as utility classes */
.coming-soon-char {
  animation: coming-soon-bounce 1.2s ease-in-out infinite;
}

@keyframes coming-soon-bounce {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0);
  }
  50% {
    transform: translateY(-10px);
    animation-timing-function: cubic-bezier(0.33, 1, 0.66, 1);
  }
}
</style>
