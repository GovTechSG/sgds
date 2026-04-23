<script setup lang="ts">
import { computed, ref } from "vue";
import type { ConfigurationDemo } from "../../data/component-docs";

const props = defineProps<{ demo: ConfigurationDemo }>();

const selectedSlots = ref(
  new Set(
    props.demo.options
      .filter((option) => option.selectedByDefault)
      .map((option) => option.value),
  ),
);

const hasSlot = (value: string) => selectedSlots.value.has(value);

const cardPreviewKey = computed(() =>
  props.demo.options
    .map((option) => `${option.value}:${hasSlot(option.value) ? "on" : "off"}`)
    .join("|"),
);

const toggleSlot = (value: string, event: Event) => {
  const checked = Boolean((event.target as { checked?: boolean } | null)?.checked);
  const nextSelected = new Set(selectedSlots.value);

  if (checked) {
    nextSelected.add(value);
  } else {
    nextSelected.delete(value);
  }

  selectedSlots.value = nextSelected;
};
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
    <div class="sgds:flex sgds:flex-wrap sgds:gap-component-md">
      <label
        v-for="option in demo.options"
        :key="option.value"
        class="sgds:flex sgds:items-center sgds:gap-component-2-xs"
      >
        <sgds-checkbox
          :checked="hasSlot(option.value) || null"
          @sgds-change="toggleSlot(option.value, $event)"
        />
        <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-default">
          {{ option.label }}
        </span>
      </label>
    </div>

    <div class="sgds:flex sgds:items-center sgds:justify-center">
      <div class="sgds:w-full sgds:max-w-[var(--sgds-dimension-560)] sgds:mx-auto">
        <div class="behaviour-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full">
          <sgds-card :key="cardPreviewKey" class="portal-demo-card">
            <div
              v-if="hasSlot('upper')"
              slot="upper"
              class="portal-slot-example sgds:w-full sgds:h-[var(--sgds-dimension-48)]"
            >
              <span>Upper slot content</span>
            </div>
            <span slot="title">Card title</span>
            <div
              v-if="hasSlot('default')"
              class="portal-slot-example sgds:w-full sgds:h-[var(--sgds-dimension-48)]"
            >
              <span>Default slot content</span>
            </div>
            <span slot="description">Supporting description for the card content.</span>
            <div
              v-if="hasSlot('lower')"
              slot="lower"
              class="portal-slot-example sgds:w-full sgds:h-[var(--sgds-dimension-48)]"
            >
              <span>Lower slot content</span>
            </div>
            <sgds-link slot="footer"><a href="#">View details</a></sgds-link>
          </sgds-card>
        </div>
      </div>
    </div>

    <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
      <p
        v-for="option in demo.options.filter((item) => hasSlot(item.value))"
        :key="option.value"
        class="sgds:m-0 sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle"
      >
        {{ option.description }}
      </p>
    </div>
  </div>
</template>
