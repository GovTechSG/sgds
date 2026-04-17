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
  <div class="sgds:flex sgds:items-center sgds:justify-between sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-md sgds:min-h-12 sgds:px-component-xs sgds:py-2 sgds:gap-component-xs">
    <CodeToken :label="command" :surface="false" class="sgds:flex-1 sgds:min-w-0" />
    <button
      class="sgds:bg-transparent sgds:border-0 sgds:cursor-pointer sgds:text-default sgds:flex sgds:items-center sgds:p-1 sgds:rounded sgds:flex-shrink-0 sgds:hover:bg-muted"
      :aria-label="copied ? 'Copied!' : 'Copy to clipboard'"
      @click="copy"
    >
      <sgds-icon :name="copied ? 'check' : 'copy'" size="md"></sgds-icon>
    </button>
  </div>
</template>
