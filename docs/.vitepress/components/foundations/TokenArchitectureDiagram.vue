<script setup lang="ts"></script>

<template>
  <figure
    class="sgds:m-0 sgds:flex sgds:w-full sgds:justify-center sgds:overflow-hidden sgds:rounded-md sgds:bg-default"
    aria-label="Token architecture from raw value to component-specific token"
  >
    <svg
      class="sgds:hidden sgds:h-auto sgds:w-full sgds:md:block"
      viewBox="19 0 1012 196"
      role="img"
      aria-label="Token architecture flow"
    >
      <defs>
        <marker id="token-flow-arrow-desktop" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--sgds-border-color-default)" />
        </marker>
      </defs>

      <g fill="none" stroke="var(--sgds-border-color-default)" stroke-width="var(--sgds-border-width-1)" stroke-linecap="square">
        <path d="M66 62V78M20 78H112M20 78V90M112 78V90" />
        <path d="M232 62V78M142 78H322M142 78V90M322 78V90" />
        <path d="M467 62V78M352 78H582M352 78V90M582 78V90" />
        <path d="M742 62V78M612 78H872M612 78V90M872 78V90" />
        <path d="M961.5 62V78M902 78H1021M902 78V90M1021 78V90" />
      </g>

      <g fill="var(--sgds-color-default)" font-family="Inter, sans-serif" font-size="16" font-weight="600" text-anchor="middle">
        <text x="66" y="42">Raw value</text>
        <text x="232" y="42">Primitive</text>
        <text x="467" y="42">Simplified semantic</text>
        <text x="742" y="42">Granular semantic</text>
        <text x="961.5" y="32">
          <tspan x="961.5" dy="0">Component-</tspan>
          <tspan x="961.5" dy="20">specific</tspan>
        </text>
      </g>

      <g stroke="var(--sgds-border-color-default)" stroke-width="var(--sgds-border-width-1)" stroke-linecap="round" marker-end="url(#token-flow-arrow-desktop)">
        <line x1="112" y1="128" x2="142" y2="128" />
        <line x1="322" y1="128" x2="352" y2="128" />
        <line x1="582" y1="128" x2="612" y2="128" />
        <line x1="872" y1="128" x2="902" y2="128" />
      </g>

      <g>
        <rect x="20" y="104" width="92" height="48" rx="24" fill="var(--sgds-surface-raised)" />
        <text x="66" y="133" fill="var(--sgds-color-default)" font-family="var(--sgds-font-family-brand)" font-size="14" text-anchor="middle">#523ABC</text>

        <rect x="142" y="104" width="180" height="48" rx="24" fill="var(--sgds-surface-raised)" />
        <text x="232" y="133" fill="var(--sgds-color-default)" font-family="var(--sgds-font-family-brand)" font-size="14" text-anchor="middle">product-primary-700</text>

        <rect x="352" y="104" width="230" height="48" rx="24" fill="var(--sgds-surface-raised)" />
        <text x="467" y="133" fill="var(--sgds-color-default)" font-family="var(--sgds-font-family-brand)" font-size="14" text-anchor="middle">primary-surface-emphasis</text>

        <rect x="612" y="104" width="260" height="48" rx="24" fill="var(--sgds-surface-raised)" />
        <text x="742" y="133" fill="var(--sgds-color-default)" font-family="var(--sgds-font-family-brand)" font-size="14" text-anchor="middle">form-primary-surface-emphasis</text>

        <rect x="902" y="104" width="119" height="48" rx="24" fill="var(--sgds-surface-raised)" />
        <text x="961.5" y="133" fill="var(--sgds-color-default)" font-family="var(--sgds-font-family-brand)" font-size="14" text-anchor="middle">checkbox-bg</text>
      </g>
    </svg>

    <svg
      class="sgds:block sgds:h-auto sgds:w-full sgds:md:hidden"
      viewBox="0 0 360 500"
      role="img"
      aria-label="Token architecture flow stacked vertically"
    >
      <defs>
        <marker id="token-flow-arrow-mobile" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--sgds-border-color-default)" />
        </marker>
      </defs>

      <g fill="var(--sgds-color-default)" font-family="Inter, sans-serif" font-size="14" font-weight="600" text-anchor="middle">
        <text x="180" y="22">Raw value</text>
        <text x="180" y="130">Primitive</text>
        <text x="180" y="230">Simplified semantic</text>
        <text x="180" y="330">Granular semantic</text>
        <text x="180" y="430">Component-specific</text>
      </g>

      <g stroke="var(--sgds-border-color-default)" stroke-width="var(--sgds-border-width-1)" stroke-linecap="round" marker-end="url(#token-flow-arrow-mobile)">
        <line x1="180" y1="86" x2="180" y2="106" />
        <line x1="180" y1="186" x2="180" y2="206" />
        <line x1="180" y1="286" x2="180" y2="306" />
        <line x1="180" y1="386" x2="180" y2="406" />
      </g>

      <g>
        <rect x="136" y="36" width="88" height="40" rx="20" fill="var(--sgds-surface-raised)" />
        <text x="180" y="61" fill="var(--sgds-color-default)" font-family="var(--sgds-font-family-brand)" font-size="13" text-anchor="middle">#523ABC</text>

        <rect x="92" y="148" width="176" height="40" rx="20" fill="var(--sgds-surface-raised)" />
        <text x="180" y="173" fill="var(--sgds-color-default)" font-family="var(--sgds-font-family-brand)" font-size="13" text-anchor="middle">product-primary-700</text>

        <rect x="62" y="248" width="236" height="40" rx="20" fill="var(--sgds-surface-raised)" />
        <text x="180" y="273" fill="var(--sgds-color-default)" font-family="var(--sgds-font-family-brand)" font-size="13" text-anchor="middle">primary-surface-emphasis</text>

        <rect x="44" y="348" width="272" height="40" rx="20" fill="var(--sgds-surface-raised)" />
        <text x="180" y="373" fill="var(--sgds-color-default)" font-family="var(--sgds-font-family-brand)" font-size="13" text-anchor="middle">form-primary-surface-emphasis</text>

        <rect x="122" y="448" width="116" height="40" rx="20" fill="var(--sgds-surface-raised)" />
        <text x="180" y="473" fill="var(--sgds-color-default)" font-family="var(--sgds-font-family-brand)" font-size="13" text-anchor="middle">checkbox-bg</text>
      </g>
    </svg>
  </figure>
</template>
