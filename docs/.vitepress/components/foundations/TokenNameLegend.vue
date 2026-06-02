<script setup lang="ts">
type LegendItem = {
  number: string;
  label: string;
  description: string;
};

const items: LegendItem[] = [
  {
    number: "1",
    label: "Namespace",
    description:
      "The system name: `sgds` for the Singapore Government Design System.",
  },
  {
    number: "2",
    label: "Object",
    description:
      "The thing the token applies to: a group like `action`, a component like `btn`, or a context like `form`.",
  },
  {
    number: "3",
    label: "Base",
    description:
      "The design element or property: the role (`primary`, `danger`), the property (`bg`, `border`, `padding`), or the concept (`heading`, `body`).",
  },
  {
    number: "4",
    label: "Modifier",
    description:
      "The design attribute: emphasis (`default`, `muted`, `subtle`, `emphasis`), state (`hover`, `focus`), or scale (`md`, `lg`, `100`, `200`).",
  },
];

const descriptionParts = (description: string) =>
  description.split(/(`[^`]+`)/g).filter(Boolean).map((part) => ({
    text: part.replace(/^`|`$/g, ""),
    isCode: part.startsWith("`") && part.endsWith("`"),
  }));
</script>

<template>
  <ol class="tnl-list sgds:m-0 sgds:flex sgds:list-none sgds:flex-col sgds:gap-text-md sgds:p-0">
    <li
      v-for="item in items"
      :key="item.number"
      class="sgds:flex sgds:items-start sgds:gap-component-xs sgds:min-w-0"
    >
      <!-- Circle badge matches the PortalNumberedItem callout style. -->
      <div class="sgds:flex sgds:items-center sgds:justify-center sgds:bg-surface-inverse sgds:rounded-full sgds:flex-none sgds:h-6 sgds:w-6">
        <span
          class="sgds:text-inverse sgds:text-label-xs sgds:font-regular sgds:leading-3-xs sgds:tracking-normal sgds:text-center sgds:w-4"
          aria-hidden="true"
        >{{ item.number }}</span>
      </div>
      <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:flex-1 sgds:min-w-0">
        <span class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-default">
          {{ item.label }}
        </span>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default sgds:m-0">
          <template
            v-for="part in descriptionParts(item.description)"
            :key="`${item.number}-${part.text}`"
          >
            <code
              v-if="part.isCode"
              class="sgds:inline-block sgds:whitespace-nowrap sgds:rounded-sm sgds:bg-surface-raised sgds:px-1 sgds:py-0 sgds:font-mono sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal sgds:text-default"
            >{{ part.text }}</code>
            <span v-else>{{ part.text }}</span>
          </template>
        </p>
      </div>
    </li>
  </ol>
</template>
