<script setup lang="ts">
import CodeToken from './CodeToken.vue'
import { ref } from 'vue'

const props = defineProps<{ command: string }>()
const copied = ref(false)

function copy() {
  navigator.clipboard.writeText(props.command)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div :class="$style.wrapper">
    <CodeToken :label="command" :surface="false" :class="$style.command" />
    <button
      :class="$style.btn"
      :aria-label="copied ? 'Copied!' : 'Copy to clipboard'"
      @click="copy"
    >
      <sgds-icon :name="copied ? 'check' : 'copy'" size="md"></sgds-icon>
    </button>
  </div>
</template>

<style module>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: 6px;
  min-height: var(--sgds-dimension-48);
  padding: var(--sgds-padding-2-xs) var(--sgds-component-padding-xs);
  gap: var(--sgds-component-gap-sm);
}

.command {
  flex: 1;
  min-width: 0;
}

.btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--sgds-color-default);
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  flex-shrink: 0;
}

.btn:hover {
  background-color: var(--sgds-border-color-muted);
}
</style>
