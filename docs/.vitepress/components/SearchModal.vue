<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vitepress';
import { searchItems, type SearchResult } from '../data/search-index';
import { data as contentPages } from '../data/search-content.data';

const categoryColorClass: Record<string, string> = {
  Component: 'sgds:text-primary-default',
  Foundation: 'sgds:text-success-default',
  Pattern: 'sgds:text-warning-default',
  Guideline: 'sgds:text-purple-default',
  AI: 'sgds:text-cyan-default',
};

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
      :class="$style.backdrop"
      @click.self="$emit('close')"
    >
      <div
        :class="$style.modal"
        class="sgds:bg-surface-default sgds:rounded-lg sgds:border sgds:border-muted sgds:shadow-4"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >

        <!-- Input row -->
        <div
          :class="$style.inputRow"
          class="sgds:flex sgds:items-center sgds:gap-component-sm sgds:border-b sgds:border-muted"
        >
          <sgds-icon name="search" size="lg" class="sgds:text-subtle sgds:flex-shrink-0" />
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            placeholder="Search components, foundations, patterns…"
            :class="$style.input"
            class="sgds:flex-1 sgds:font-sans"
            @keydown="onKeydown"
            autocomplete="off"
            spellcheck="false"
          />
          <button
            :class="$style.closeBtn"
            class="sgds:rounded-lg sgds:text-subtle"
            @click="$emit('close')"
            aria-label="Close search"
          >
            <sgds-icon name="x-lg" size="md" />
          </button>
        </div>

        <!-- Results list -->
        <ul v-if="results.length" :class="$style.results" role="listbox">
          <li
            v-for="(item, i) in results"
            :key="item.url"
            :class="[$style.resultItem, i === activeIndex ? $style.active : '']"
            class="sgds:flex sgds:items-center sgds:gap-component-sm"
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
                  <mark v-if="part.match" :class="$style.mark">{{ part.text }}</mark>
                  <span v-else>{{ part.text }}</span>
                </template>
              </div>
              <div v-if="item.excerpt" :class="$style.excerpt" class="sgds:text-label-xs sgds:font-regular sgds:text-muted sgds:leading-3-xs">
                <template v-for="(part, pi) in highlight(item.excerpt, query)" :key="pi">
                  <mark v-if="part.match" :class="$style.mark">{{ part.text }}</mark>
                  <span v-else>{{ part.text }}</span>
                </template>
              </div>
            </div>
            <sgds-icon name="arrow-right" size="sm" :class="$style.arrow" class="sgds:text-subtle sgds:flex-shrink-0" />
          </li>
        </ul>

        <!-- No results -->
        <div
          v-else-if="query"
          :class="$style.empty"
          class="sgds:flex sgds:flex-col sgds:items-center sgds:gap-text-xs sgds:text-subtle"
        >
          <sgds-icon name="search" size="2-xl" class="sgds:opacity-30" />
          <span class="sgds:text-body-md">No results for "<strong class="sgds:text-default">{{ query }}</strong>"</span>
        </div>

        <!-- Default hint -->
        <div
          v-else
          :class="$style.hint"
          class="sgds:text-subtle"
        >
          <sgds-icon name="keyboard" size="md" class="sgds:opacity-50" />
          <span class="sgds:text-caption-md">Type to search across all pages</span>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style module>
.backdrop {
  position: fixed;
  inset: 0;
  background: var(--sgds-bg-overlay);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 80px;
  z-index: 9999;
}

.modal {
  width: 100%;
  max-width: 560px;
  overflow: hidden;
}

.inputRow {
  padding: var(--sgds-component-padding-xs) var(--sgds-component-padding-sm);
}

.input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-regular);
  color: var(--sgds-body-color-default);
  font-family: inherit;
}

.input::placeholder {
  color: var(--sgds-form-color-subtle);
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-light);
}

.closeBtn {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: var(--sgds-padding-xs);
  flex-shrink: 0;
  transition: background 0.1s ease;
}

.closeBtn:hover {
  background: var(--sgds-surface-raised);
}

.results {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 380px;
  overflow-y: auto;
}

.resultItem {
  padding: var(--sgds-padding-sm) var(--sgds-component-padding-sm);
  cursor: pointer;
  transition: background 0.1s ease;
}

.resultItem:hover,
.resultItem.active {
  background: var(--sgds-surface-raised);
}

.mark {
  background: var(--sgds-warning-surface-muted);
  color: inherit;
  border-radius: var(--sgds-border-radius-sm);
  padding: 0 1px;
}

.excerpt {
  margin-top: var(--sgds-spacer-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: italic;
  max-width: 100%;
}

.arrow {
  opacity: 0;
  transition: opacity 0.1s ease;
}

.resultItem:hover .arrow,
.resultItem.active .arrow {
  opacity: 1;
}

.empty {
  padding: var(--sgds-component-padding-lg) var(--sgds-component-padding-md);
  text-align: center;
}

.hint {
  padding: var(--sgds-component-padding-lg) var(--sgds-component-padding-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sgds-component-gap-sm);
  text-align: center;
}
</style>

<style>
.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.2s ease;
}
.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}
</style>
