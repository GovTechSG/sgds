<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vitepress';
import { searchItems, categoryColorClass, type SearchResult } from '../../data/search-index';
import { data as contentPages } from '../../data/search-content.data';

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const router = useRouter();
const query = ref('');
const activeIndex = ref(-1);
const inputRef = ref<HTMLInputElement | null>(null);

const results = computed(() => searchItems(query.value, contentPages));

watch(() => props.open, (val) => {
  if (val) {
    query.value = '';
    activeIndex.value = -1;
    nextTick(() => inputRef.value?.focus());
  }
});

watch(query, () => {
  activeIndex.value = results.value.length > 0 ? 0 : -1;
});

function navigate(item: SearchResult) {
  router.go(item.url);
  emit('close');
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { emit('close'); return; }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex.value = Math.min(activeIndex.value + 1, results.value.length - 1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex.value = Math.max(activeIndex.value - 1, 0);
  } else if (e.key === 'Enter' && activeIndex.value >= 0 && results.value[activeIndex.value]) {
    navigate(results.value[activeIndex.value]);
  }
}

function highlight(text: string, q: string): Array<{ text: string; match: boolean }> {
  if (!q.trim()) return [{ text, match: false }];
  const escaped = q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.split(regex).map(part => ({
    text: part,
    match: part.toLowerCase() === q.trim().toLowerCase(),
  }));
}

function handleGlobalKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) emit('close');
}

onMounted(() => document.addEventListener('keydown', handleGlobalKeydown));
onUnmounted(() => document.removeEventListener('keydown', handleGlobalKeydown));
</script>

<template>
  <Transition name="search-modal">
    <div
      v-if="open"
      class="sgds:fixed sgds:inset-0 sgds:flex sgds:items-start sgds:justify-center sgds:z-[9999] sgds:pt-[80px] sgds:bg-[var(--sgds-bg-overlay)]"
      @click.self="$emit('close')"
    >
      <div
        class="sgds:bg-surface-default sgds:rounded-lg sgds:border sgds:border-muted sgds:shadow-4 sgds:w-full sgds:max-w-[560px] sgds:overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >

        <!-- Input row -->
        <div
          class="sgds:flex sgds:items-center sgds:gap-component-sm sgds:border-b sgds:border-muted sgds:px-component-sm sgds:py-component-xs"
        >
          <sgds-icon name="search" size="lg" class="sgds:text-subtle sgds:flex-shrink-0" />
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            placeholder="Search components, foundations, templates…"
            class="sgds:flex-1 sgds:font-sans sgds:bg-transparent sgds:border-0 sgds:outline-none sgds:w-full sgds:text-label-md sgds:font-regular sgds:text-default search-modal-input"
            @keydown="onKeydown"
            autocomplete="off"
            spellcheck="false"
          />
          <button
            class="sgds:rounded-lg sgds:text-subtle sgds:bg-transparent sgds:border-0 sgds:cursor-pointer sgds:flex sgds:items-center sgds:p-2 sgds:flex-shrink-0 sgds:transition sgds:duration-100 sgds:ease-in-out sgds:hover:bg-surface-raised"
            @click="$emit('close')"
            aria-label="Close search"
          >
            <sgds-icon name="cross" size="md" />
          </button>
        </div>

        <!-- Results list -->
        <ul v-if="results.length" class="sgds:list-none sgds:m-0 sgds:p-0 sgds:max-h-[380px] sgds:overflow-y-auto" role="listbox">
          <li
            v-for="(item, i) in results"
            :key="item.url"
            :class="[
              'sgds:flex sgds:items-center sgds:gap-component-sm sgds:px-component-sm sgds:py-3 sgds:cursor-pointer sgds:transition sgds:duration-100 sgds:ease-in-out sgds:group',
              i === activeIndex ? 'sgds:bg-surface-raised' : 'sgds:hover:bg-surface-raised'
            ]"
            role="option"
            :aria-selected="i === activeIndex"
            @click="navigate(item)"
            @mouseenter="activeIndex = i"
          >
            <div class="sgds:flex-1 sgds:min-w-0">
              <div :class="['sgds:text-label-xs sgds:font-regular sgds:uppercase sgds:tracking-wide sgds:leading-3-xs', categoryColorClass[item.category]]">
                {{ item.category }}
              </div>
              <div class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:text-label-default">
                <template v-for="(part, pi) in highlight(item.title, query)" :key="pi">
                  <mark v-if="part.match" class="sgds:bg-warning-surface-muted sgds:rounded-sm sgds:px-[1px]">{{ part.text }}</mark>
                  <span v-else>{{ part.text }}</span>
                </template>
              </div>
              <div v-if="item.excerpt" class="sgds:text-label-xs sgds:font-regular sgds:text-muted sgds:leading-3-xs sgds:mt-1 sgds:overflow-hidden sgds:text-ellipsis sgds:whitespace-nowrap sgds:italic sgds:max-w-full">
                <template v-for="(part, pi) in highlight(item.excerpt, query)" :key="pi">
                  <mark v-if="part.match" class="sgds:bg-warning-surface-muted sgds:rounded-sm sgds:px-[1px]">{{ part.text }}</mark>
                  <span v-else>{{ part.text }}</span>
                </template>
              </div>
            </div>
            <sgds-icon name="arrow-right" size="sm" class="sgds:text-subtle sgds:flex-shrink-0 sgds:opacity-0 sgds:transition-opacity sgds:duration-100 sgds:ease-in-out sgds:group-hover:opacity-100" :class="i === activeIndex ? 'sgds:opacity-100' : ''" />
          </li>
        </ul>

        <!-- No results -->
        <div
          v-else-if="query"
          class="sgds:flex sgds:flex-col sgds:items-center sgds:gap-text-xs sgds:text-subtle sgds:p-layout-md sgds:text-center"
        >
          <sgds-icon name="search" size="2-xl" class="sgds:opacity-30" />
          <span class="sgds:text-body-md">No results for "<strong class="sgds:text-default">{{ query }}</strong>"</span>
        </div>

        <!-- Default hint -->
        <div
          v-else
          class="sgds:text-subtle sgds:p-layout-md sgds:flex sgds:items-center sgds:justify-center sgds:gap-component-sm sgds:text-center"
        >
          <sgds-icon name="search" size="md" class="sgds:opacity-50" />
          <span class="sgds:text-caption-md">Type to search across all pages</span>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style>
/* Vue Transition hook classes — required by <Transition name="search-modal"> */
.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.2s ease;
}
.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}

/* Placeholder pseudo-element — cannot be expressed as a utility class */
.search-modal-input::placeholder {
  color: var(--sgds-form-color-subtle);
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-light);
}
</style>
