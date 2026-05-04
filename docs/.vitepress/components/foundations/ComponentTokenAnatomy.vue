<script setup lang="ts">
type SegmentTone = "namespace" | "context" | "object" | "scale";

type TokenSegment = {
  text: string;
  tone: SegmentTone;
};

type TokenExample = {
  caption?: string;
  description?: string;
  segments: TokenSegment[];
};

const examples: TokenExample[] = [
  {
    caption: "Component token",
    description:
      "Names a component, then the role, property, and emphasis scoped to that component.",
    segments: [
      { text: "sgds", tone: "namespace" },
      { text: "stepper", tone: "context" },
      { text: "visited", tone: "object" },
      { text: "border", tone: "object" },
      { text: "color", tone: "object" },
    ],
  },
  {
    segments: [
      { text: "sgds", tone: "namespace" },
      { text: "badge", tone: "context" },
      { text: "info", tone: "object" },
      { text: "outlined", tone: "object" },
      { text: "bg", tone: "object" },
    ],
  },
  {
    segments: [
      { text: "sgds", tone: "namespace" },
      { text: "btn", tone: "context" },
      { text: "label", tone: "object" },
      { text: "padding", tone: "object" },
      { text: "x", tone: "scale" },
    ],
  },
  {
    segments: [
      { text: "sgds", tone: "namespace" },
      { text: "btn", tone: "context" },
      { text: "md", tone: "object" },
      { text: "min", tone: "object" },
      { text: "width", tone: "object" },
    ],
  },
];
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
    <div
      v-for="(example, exampleIndex) in examples"
      :key="exampleIndex"
      class="sgds:flex sgds:flex-col sgds:gap-text-sm"
    >
      <div
        v-if="example.caption || example.description"
        class="sgds:flex sgds:flex-col sgds:gap-text-2-xs"
      >
        <h5
          v-if="example.caption"
          class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0"
        >
          {{ example.caption }}
        </h5>
        <p
          v-if="example.description"
          class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default sgds:m-0"
        >
          {{ example.description }}
        </p>
      </div>
      <div class="cta-row">
        <span
          v-for="(segment, segmentIndex) in example.segments"
          :key="`${exampleIndex}-${segmentIndex}`"
          :class="['cta-segment', `cta-segment--${segment.tone}`]"
        >
          {{ segment.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.cta-row {
  align-items: center;
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--sgds-text-gap-xs);
  max-width: max-content;
}

/* Pill text uses SGDS "label default" typography (label-md regular). Text
   is always fixed-dark so it stays legible on the pastel chips in both
   themes. */
.cta-segment {
  border-radius: var(--sgds-border-radius-full);
  color: var(--sgds-color-fixed-dark);
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
  padding: var(--sgds-padding-2-xs) var(--sgds-padding-md);
  white-space: nowrap;
}

.cta-segment--namespace {
  background: var(--sgds-neutral-surface-muted);
}

/* Component names, such as stepper, badge, and btn, use accent as a context segment. */
.cta-segment--context {
  background: var(--sgds-accent-surface-muted);
}

.cta-segment--object {
  background: var(--sgds-primary-surface-muted);
}

.cta-segment--scale {
  background: var(--sgds-success-surface-muted);
}
</style>
