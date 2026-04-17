<script setup lang="ts">
import FoundationPrinciplesList from "./FoundationPrinciplesList.vue";
import FoundationPrincipleTemplate from "./FoundationPrincipleTemplate.vue";
import Section from "./Section.vue";

const principles = [
  {
    title: "Visual hierarchy",
    body: "Elevation should clearly indicate the importance of elements, helping users prioritize content and navigate the interface effectively.",
  },
  {
    title: "Subtlety",
    body: "Elevation effects should be subtle and natural, adding depth without overwhelming the design or drawing unnecessary attention to themselves.",
  },
];
</script>

<template>
  <FoundationPrincipleTemplate>

    <!-- Principle -->
    <FoundationPrinciplesList :principles="principles" />

    <!-- Surface -->
    <Section
      title="Surface"
      description="Default elevation level that elevates navigation or information temporarily appearing in front of other surfaces, such as dropdown menu and tooltips. The elevation level is also applied to actionable elements after hovering over like cards and tiles."
    >
      <div class="ep-demo-card sgds:min-h-[18rem] sgds:max-md:min-h-[14rem]">
        <div class="ep-surface-row">
          <div class="ep-shadow-tile elevation-surface-1"></div>
          <div class="ep-shadow-tile elevation-surface-2"></div>
          <div class="ep-shadow-tile elevation-surface-3"></div>
          <div class="ep-shadow-tile elevation-surface-4"></div>
          <div class="ep-shadow-tile elevation-surface-5"></div>
        </div>
      </div>
    </Section>

    <!-- Edge -->
    <Section
      title="Edge"
      description="A drop shadow on the edge of a top or bottom component, allowing surfaces to move behind when scrolled such as header and action bar."
    >
      <div class="ep-demo-card sgds:min-h-[18rem] sgds:max-md:min-h-[14rem]">
        <div class="ep-edge-row">
          <div class="ep-edge-tile elevation-edge-top"></div>
          <div class="ep-edge-tile elevation-edge-bottom"></div>
        </div>
      </div>
    </Section>

    <!-- Opacities -->
    <Section
      title="Opacities"
      description="A opacity background can bring focus by increasing the visual contrast of a layered surface like modals and sheets."
    >
      <div class="ep-demo-card ep-opacities-scene sgds:min-h-[18rem] sgds:max-md:min-h-[14rem]">
        <!-- Content card sitting on the base surface, behind the scrim -->
        <div class="ep-opacity-content-card elevation-surface-1"></div>
        <!-- Dark overlay scrim on top of the base and content card -->
        <div class="ep-overlay-scrim"></div>
        <!-- Modal card elevated above the scrim -->
        <div class="ep-opacity-modal-card elevation-surface-4"></div>
      </div>
    </Section>

  </FoundationPrincipleTemplate>
</template>

<style>
/* Shared demo card container */
.ep-demo-card {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-2-xl);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ── Surface demo ─────────────────────────────────────────────────────────── */
.ep-surface-row {
  align-items: center;
  display: flex;
  gap: var(--sgds-component-gap-md);
  padding: var(--sgds-component-padding-md);
}

.ep-shadow-tile {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-xl);
  flex-shrink: 0;
  height: 5rem;
  width: 5rem;
}

/* ── Edge demo ────────────────────────────────────────────────────────────── */
.ep-edge-row {
  align-items: center;
  display: flex;
  gap: var(--sgds-component-gap-md);
  padding: var(--sgds-component-padding-md);
}

.ep-edge-tile {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-xl);
  flex-shrink: 0;
  height: 5rem;
  width: 5rem;
}

/* ── Opacities demo ───────────────────────────────────────────────────────── */

/* Override demo card to be a stacking context for absolute children */
.ep-opacities-scene {
  position: relative;
}

/* Content card sits on the base surface, behind the scrim */
.ep-opacity-content-card {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-lg);
  height: 40%;
  left: 30%;
  position: absolute;
  top: 30%;
  width: 40%;
  z-index: 1;
}

/* Semi-transparent scrim layered over the base and content card */
.ep-overlay-scrim {
  background: var(--sgds-bg-overlay, rgba(14, 14, 14, 0.5));
  inset: 0;
  position: absolute;
  z-index: 2;
}

/* Modal card elevated above the scrim */
.ep-opacity-modal-card {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-lg);
  height: 20%;
  left: 35%;
  position: absolute;
  top: 40%;
  width: 30%;
  z-index: 3;
}

/* Shadow tokens — applied via CSS variables, no sgds: utility equivalent exists */
.elevation-surface-1 { box-shadow: var(--sgds-elevation-surface-1); }
.elevation-surface-2 { box-shadow: var(--sgds-elevation-surface-2); }
.elevation-surface-3 { box-shadow: var(--sgds-elevation-surface-3); }
.elevation-surface-4 { box-shadow: var(--sgds-elevation-surface-4); }
.elevation-surface-5 { box-shadow: var(--sgds-elevation-surface-5); }
.elevation-edge-top    { box-shadow: var(--sgds-elevation-edge-top); }
.elevation-edge-bottom { box-shadow: var(--sgds-elevation-edge-bottom); }

@media (max-width: 767px) {
  .ep-demo-card {
    border-radius: var(--sgds-border-radius-xl);
  }

  .ep-shadow-tile {
    height: 3.5rem;
    width: 3.5rem;
  }
}
</style>
