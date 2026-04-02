<template>
  <div :class="$style.container">
    <div :class="$style.text">
      <span
        v-for="(char, i) in chars"
        :key="i"
        :class="[$style.char, char === ' ' ? $style.space : '']"
        :style="{ animationDelay: `${i * 0.08}s` }"
      >{{ char === ' ' ? '\u00A0' : char }}</span>
    </div>
    <div v-if="phase" :class="$style.phase">Phase {{ phase }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ phase?: number }>();
const chars = Array.from("COMING SOON");
</script>

<style module>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sgds-text-gap-sm);
  background: var(--sgds-surface-raised);
}

.text {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  user-select: none;
}

.char {
  display: inline-block;
  font-size: var(--sgds-font-size-4);
  font-weight: var(--sgds-font-weight-bold);
  color: var(--sgds-body-color-subtle);
  letter-spacing: 0.05em;
  animation: bounce 1.2s ease-in-out infinite;
}

.space {
  width: 0.4em;
}

.phase {
  font-size: var(--sgds-font-size-1);
  font-weight: var(--sgds-font-weight-medium);
  color: var(--sgds-body-color-subtle);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.6;
}

@keyframes bounce {
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
