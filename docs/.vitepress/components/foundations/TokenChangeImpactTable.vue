<script setup lang="ts">
type TokenChange = {
  change: string;
  impact: string;
  risks: string;
  criteria: string;
  process: string;
};

const changes: TokenChange[] = [
  {
    change: "Adding tokens",
    impact:
      "Low to medium, depending on usage. New tokens increase the library's size and flexibility, but usually have little immediate impact until they are tied to components or styles.",
    risks:
      "Can lead to token bloat when added without a clear need. Teams also need guidance on when and how to use the new token.",
    criteria:
      "Check that the token solves a real design need, aligns with SGDS principles, and cannot be replaced by an existing token.",
    process:
      "Identify the gap, propose a name, value, and use case, submit it for review, then document and implement it after approval.",
  },
  {
    change: "Modifying tokens",
    impact:
      "High, especially for semantic or primitive tokens. Changing a token value affects every component, style, and interface that references it.",
    risks:
      "Can introduce visual bugs or inconsistencies if dependencies are unclear. Large changes may become breaking changes.",
    criteria:
      "Use this for accessibility improvements, performance improvements, or alignment with updated design guidance.",
    process:
      "Audit token usage across design and code, propose the change with reasoning and comparisons, test it in staging, then announce and release it with a migration plan.",
  },
  {
    change: "Removing tokens",
    impact:
      "Medium to high, depending on usage. Removing a token breaks any component or style that still relies on it.",
    risks:
      "Can cause production issues if the token is still active. Teams need deprecation warnings and clear alternatives.",
    criteria:
      "Remove a token only when it is unused, redundant, or no longer aligned with the system.",
    process:
      "Mark the token as deprecated, announce the deprecation with a transition period, then remove it only after no dependencies remain.",
  },
];

const fields = [
  { key: "impact", label: "Impact" },
  { key: "risks", label: "Risks" },
  { key: "criteria", label: "Criteria" },
  { key: "process", label: "Process" },
] as const;
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-text-lg">
    <section
      v-for="change in changes"
      :key="change.change"
      class="sgds:flex sgds:flex-col sgds:gap-text-sm"
    >
      <h5 class="sgds:m-0 sgds:text-heading-xs sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
        {{ change.change }}
      </h5>
      <ul class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-sm sgds:pl-[var(--sgds-padding-lg)]">
        <li
          v-for="field in fields"
          :key="field.key"
          class="sgds:m-0"
        >
          <span class="sgds:font-semibold">{{ field.label }}:</span>
          {{ change[field.key] }}
        </li>
      </ul>
    </section>
  </div>
</template>
