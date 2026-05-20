<script setup lang="ts">
import Section from "./foundations/Section.vue";

const roleRows = [
  {
    title: "Background colour",
    paragraphs: [
      {
        label: "Default (pure white)",
        text: "serves as the primary background for most pages and sections. It provides a clean, high-contrast surface for content-heavy layouts such as dashboards and forms.",
      },
      {
        label: "Alternate (off-white)",
        text: "adds subtle contrast from the default background to help separate sections without needing strong dividers.",
      },
    ],
    chipTop: "sgds-bg-default",
    chipBottom: "sgds-bg-alternate",
    topSwatchClass: "uc-swatch-default",
    bottomSwatchClass: "uc-swatch-alternate",
    variant: "background",
  },
  {
    title: "Surface colour",
    paragraphs: [
      {
        label: "Surface default",
        text: "is used for containers such as cards, drawers, dialogs, and modals that need a distinct layer from the page background.",
      },
      {
        label: "Surface raised",
        text: "is used for components that need more emphasis, such as popovers, tooltips, or floating panels, where extra depth helps focus attention.",
      },
    ],
    chipTop: "sgds-surface-default",
    chipBottom: "sgds-surface-raised",
    topSwatchClass: "uc-swatch-surface-default",
    bottomSwatchClass: "uc-swatch-surface-raised",
    variant: "default",
  },
  {
    title: "Text and icon colour",
    paragraphs: [
      {
        label: "Default",
        text: "should be used for primary text and icons on light surfaces so the most important information stays clear and readable.",
      },
      {
        label: "Subtle",
        text: "works for supporting text and secondary icons where hierarchy matters, but readability still needs to be maintained.",
      },
    ],
    chipTop: "sgds-text-default",
    chipBottom: "sgds-text-subtle",
    topSwatchClass: "uc-swatch-text-default",
    bottomSwatchClass: "uc-swatch-text-subtle",
    variant: "default",
  },
] as const;
</script>

<template>
  <div class="uc-page">
    <div class="uc-section-stack">
      <div class="uc-page-section">
        <Section
          title="Semantic colour"
          description="Semantic colours should be reserved for meaning. Use them consistently for success, warning, danger, and information so users can recognise state and feedback quickly."
        >
          <div class="uc-demo-card uc-demo-card-inset">
            <div class="uc-semantic-demo">
              <div class="uc-semantic-alert uc-semantic-success"></div>
              <div class="uc-semantic-alert uc-semantic-warning"></div>
              <div class="uc-semantic-alert uc-semantic-danger"></div>
            </div>
          </div>
        </Section>
      </div>

      <div class="uc-page-section">
        <Section
          title="Colour roles"
          description="Colour roles help the same colour system behave consistently across backgrounds, surfaces, text, and icons. Instead of choosing colours ad hoc, apply the matching SGDS role token for the job."
        >
          <div class="uc-roles-stack">
            <article
              v-for="row in roleRows"
              :key="row.title"
              class="uc-role-row"
            >
              <div class="uc-role-copy">
                <h3 class="uc-role-title sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ row.title }}</h3>
                <div class="uc-role-paragraphs">
                  <p
                    v-for="paragraph in row.paragraphs"
                    :key="paragraph.label"
                    class="uc-role-text"
                  >
                    <span class="uc-role-label">{{ paragraph.label }}</span>
                    {{ ` ${paragraph.text}` }}
                  </p>
                </div>
              </div>
              <div class="uc-role-preview">
                <div class="uc-role-demo-card">
                  <div
                    v-if="row.variant === 'background'"
                    class="uc-role-canvas uc-background-canvas"
                  >
                    <div class="uc-background-scene">
                      <img
                        class="uc-background-image uc-background-image-light"
                        src="/foundations/colour/bg-colour.svg"
                        alt=""
                      />
                      <img
                        class="uc-background-image uc-background-image-dark"
                        src="/foundations/colour/bg-colour-dark.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    v-else
                    class="uc-role-canvas"
                  ></div>
                </div>
              </div>
            </article>
          </div>
        </Section>
      </div>

      <div class="uc-page-section">
        <Section
          title="Modes"
          description="Use the same semantic role structure across day and night modes so colour keeps its meaning even when the palette shifts. This helps products stay familiar and accessible in both themes."
        >
          <div class="uc-demo-card">
            <div class="uc-modes-demo">
              <span class="uc-mode-label">Live demo</span>
              <sgds-icon-button name="moon" variant="ghost" size="sm"></sgds-icon-button>
            </div>
          </div>
        </Section>
      </div>
    </div>
  </div>
</template>

<style>
.uc-page {
  width: 100%;
}

.uc-section-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.uc-page-section {
  display: flex;
  flex-direction: column;
}

.uc-demo-card,
.uc-role-demo-card {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
}

.uc-demo-card {
  min-height: var(--sgds-dimension-480);
  overflow: hidden;
  padding: 0 0 0 var(--sgds-component-padding-md);
  padding-top: var(--sgds-component-padding-md);
}

.uc-demo-card-inset {
  padding: var(--sgds-component-padding-md);
}

.uc-semantic-demo,
.uc-modes-demo {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
}

.uc-semantic-demo {
  gap: var(--sgds-gap-md);
}

.uc-semantic-alert {
  border-radius: var(--sgds-border-radius-lg);
  height: 9rem;
  width: min(100%, 10rem);
}

.uc-semantic-success {
  background: var(--sgds-success-surface-muted);
  border: 1px solid var(--sgds-success-border-color-default);
}

.uc-semantic-warning {
  background: var(--sgds-warning-surface-muted);
  border: 1px solid var(--sgds-warning-border-color-default);
}

.uc-semantic-danger {
  background: var(--sgds-danger-surface-muted);
  border: 1px solid var(--sgds-danger-border-color-default);
}

.uc-roles-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.uc-role-row {
  display: grid;
  gap: var(--sgds-layout-gap-lg);
  grid-template-columns: minmax(0, 1fr);
}

.uc-role-copy {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
}

.uc-role-title {
  margin: 0;
}

.uc-role-paragraphs {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-md);
}

.uc-role-text {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  margin: 0;
}

.uc-role-label {
  color: var(--sgds-body-color-default);
  font-weight: var(--sgds-font-weight-semibold);
}

.uc-role-preview {
  min-width: 0;
}

.uc-role-demo-card {
  overflow: hidden;
  padding: 0 0 0 var(--sgds-component-padding-md);
  padding-top: var(--sgds-component-padding-md);
}

.uc-role-canvas {
  height: 100%;
  position: relative;
}

.uc-background-canvas {
  display: flex;
  justify-content: flex-end;
}

.uc-background-scene {
  align-items: flex-end;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
}

.uc-background-image {
  display: block;
  height: auto;
  max-width: min(100%, 38rem);
  width: auto;
}

.uc-background-image-dark {
  display: none;
}

/* Dark theme image switching — requires global class selector */
.sgds-night-theme .uc-background-image-light {
  display: none;
}

.sgds-night-theme .uc-background-image-dark {
  display: block;
}

.uc-swatch-default {
  background: var(--sgds-bg-color-default);
}

.uc-swatch-alternate {
  background: var(--sgds-bg-color-alternate);
}

.uc-swatch-surface-default {
  background: var(--sgds-surface-default);
}

.uc-swatch-surface-raised {
  background: var(--sgds-surface-raised);
}

.uc-swatch-text-default {
  background: var(--sgds-body-color-default);
}

.uc-swatch-text-subtle {
  background: var(--sgds-body-color-subtle);
}

/* Global selector targeting sgds-icon-button inside modes demo */
.uc-modes-demo sgds-icon-button {
  position: absolute;
  right: 0;
  top: 0;
}

.uc-mode-label {
  color: var(--sgds-heading-color-default);
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
}

@media (max-width: 1023px) {
  .uc-role-row {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 767px) {
  .uc-demo-card,
  .uc-role-demo-card {
    border-radius: var(--sgds-border-radius-xl);
  }

  .uc-semantic-demo {
    flex-direction: column;
  }

  .uc-semantic-alert {
    width: 100%;
  }
}
</style>
