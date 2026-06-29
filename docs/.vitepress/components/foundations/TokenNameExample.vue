<script setup lang="ts">
type SegmentTone = "namespace" | "context" | "object" | "scale";

type ExampleSegment = {
  text: string;
  tone: SegmentTone;
  position: string;
};

type ExampleRow = {
  caption: string;
  segments: ExampleSegment[];
};

type ExampleCalloutGroup = {
  position: string;
  startIndex: number;
  segments: ExampleSegment[];
};

const rows: ExampleRow[] = [
  {
    caption: "Primitive token",
    segments: [
      { text: "sgds", tone: "namespace", position: "1" },
      { text: "purple", tone: "object", position: "3" },
      { text: "700", tone: "scale", position: "4" },
    ],
  },
  {
    caption: "Semantic token",
    segments: [
      { text: "sgds", tone: "namespace", position: "1" },
      { text: "primary", tone: "object", position: "3" },
      { text: "bg", tone: "object", position: "3" },
      { text: "emphasis", tone: "scale", position: "4" },
    ],
  },
  {
    caption: "Component token",
    segments: [
      { text: "sgds", tone: "namespace", position: "1" },
      { text: "btn", tone: "context", position: "2" },
      { text: "primary", tone: "object", position: "3" },
      { text: "hover", tone: "object", position: "3" },
      { text: "bg", tone: "object", position: "3" },
    ],
  },
];

const groupCallouts = (segments: ExampleSegment[]) =>
  segments.reduce<ExampleCalloutGroup[]>((groups, segment, segmentIndex) => {
    const previousGroup = groups.at(-1);

    if (previousGroup?.position === segment.position) {
      previousGroup.segments.push(segment);
      return groups;
    }

    groups.push({ position: segment.position, startIndex: segmentIndex, segments: [segment] });
    return groups;
  }, []);

const rowsWithCallouts = rows.map((row) => ({
  ...row,
  calloutGroups: groupCallouts(row.segments),
}));
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
    <h3 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0">
      Example breakdown
    </h3>

    <div class="sgds:flex sgds:flex-col sgds:gap-text-lg sgds:px-component-md sgds:py-component-xs">
      <div
        v-for="(row, rowIndex) in rowsWithCallouts"
        :key="rowIndex"
        class="sgds:flex sgds:flex-col sgds:gap-text-xs"
      >
        <span class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-default">
          {{ row.caption }}
        </span>

        <div
          :class="[
            'tne-token-grid',
            `tne-token-grid--${row.segments.length}`,
          ]"
        >
          <span
            v-for="(segment, segmentIndex) in row.segments"
            :key="`${rowIndex}-${segmentIndex}`"
            :class="[
              'tne-segment sgds:whitespace-nowrap sgds:rounded-full sgds:px-md sgds:py-2-xs sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-fixed-dark',
              `tne-segment--${segment.tone}`,
              `tne-segment-col-${segmentIndex + 1}`,
            ]"
          >
            {{ segment.text }}
          </span>

          <div
            v-for="(group, groupIndex) in row.calloutGroups"
            :key="`${rowIndex}-callout-${groupIndex}`"
            :class="[
              'tne-callout sgds:flex sgds:flex-col sgds:items-center',
              `tne-callout-start-${group.startIndex + 1}`,
              `tne-callout-span-${group.segments.length}`,
              group.segments.length > 1 ? 'tne-callout--grouped' : '',
            ]"
          >
            <span
              v-if="group.segments.length > 1"
              class="tne-callout-bracket"
            ></span>
            <span
              v-else
              class="sgds:block sgds:h-5 sgds:w-[var(--sgds-border-width-1)] sgds:bg-[var(--sgds-border-color-default)]"
            ></span>
            <span class="sgds:inline-flex sgds:h-6 sgds:min-w-6 sgds:flex-shrink-0 sgds:items-center sgds:justify-center sgds:rounded-full sgds:bg-surface-inverse sgds:text-label-xs sgds:font-regular sgds:leading-3-xs sgds:text-inverse">
              {{ group.position }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.tne-segment--namespace {
  background: var(--sgds-neutral-surface-muted);
}
.tne-segment--context {
  background: var(--sgds-accent-surface-muted);
}
.tne-segment--object {
  background: var(--sgds-primary-surface-muted);
}
.tne-segment--scale {
  background: var(--sgds-success-surface-muted);
}

.tne-token-grid {
  column-gap: var(--sgds-text-gap-xs);
  display: grid;
  inline-size: max-content;
  position: relative;
  row-gap: 0;
}

.tne-token-grid--3 {
  grid-template-columns: repeat(3, max-content);
}

.tne-token-grid--4 {
  grid-template-columns: repeat(4, max-content);
}

.tne-token-grid--5 {
  grid-template-columns: repeat(5, max-content);
}

.tne-segment {
  grid-row: 1;
  z-index: 1;
}

.tne-segment-col-1 {
  grid-column: 1;
}

.tne-segment-col-2 {
  grid-column: 2;
}

.tne-segment-col-3 {
  grid-column: 3;
}

.tne-segment-col-4 {
  grid-column: 4;
}

.tne-segment-col-5 {
  grid-column: 5;
}

.tne-callout {
  /* No gap between spacer, stroke, and badge. The stroke must run flush
     between the pill above and the badge below. */
  gap: 0;
  grid-row: 2;
  justify-self: stretch;
}

.tne-callout-start-1 {
  grid-column-start: 1;
}

.tne-callout-start-2 {
  grid-column-start: 2;
}

.tne-callout-start-3 {
  grid-column-start: 3;
}

.tne-callout-start-4 {
  grid-column-start: 4;
}

.tne-callout-start-5 {
  grid-column-start: 5;
}

.tne-callout-span-1 {
  grid-column-end: span 1;
}

.tne-callout-span-2 {
  grid-column-end: span 2;
}

.tne-callout-span-3 {
  grid-column-end: span 3;
}

.tne-callout-bracket {
  display: block;
  height: 1.25rem;
  position: relative;
  width: 100%;
}

.tne-callout-bracket::before {
  border-block-end: var(--sgds-border-width-1) solid var(--sgds-border-color-default);
  border-inline-end: var(--sgds-border-width-1) solid var(--sgds-border-color-default);
  border-inline-start: var(--sgds-border-width-1) solid var(--sgds-border-color-default);
  content: "";
  inset-block-start: 0;
  inset-inline: calc(var(--sgds-padding-md) + var(--sgds-padding-2-xs));
  position: absolute;
  height: 0.75rem;
}

.tne-callout-bracket::after {
  background: var(--sgds-border-color-default);
  content: "";
  height: 0.5rem;
  inset-block-end: 0;
  inset-inline-start: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: var(--sgds-border-width-1);
}

</style>
