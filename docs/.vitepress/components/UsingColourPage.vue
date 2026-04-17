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
    topSwatchClass: "swatchDefault",
    bottomSwatchClass: "swatchAlternate",
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
    topSwatchClass: "swatchSurfaceDefault",
    bottomSwatchClass: "swatchSurfaceRaised",
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
    topSwatchClass: "swatchTextDefault",
    bottomSwatchClass: "swatchTextSubtle",
    variant: "default",
  },
] as const;
</script>

<template>
  <div :class="$style.page">
    <div :class="$style.sectionStack">
      <div :class="$style.pageSection">
        <Section
          title="Semantic colour"
          description="Semantic colours should be reserved for meaning. Use them consistently for success, warning, danger, and information so users can recognise state and feedback quickly."
        >
          <div :class="[$style.demoCard, $style.demoCardInset]">
            <div :class="$style.semanticDemo">
              <div :class="[$style.semanticAlert, $style.semanticSuccess]"></div>
              <div :class="[$style.semanticAlert, $style.semanticWarning]"></div>
              <div :class="[$style.semanticAlert, $style.semanticDanger]"></div>
            </div>
          </div>
        </Section>
      </div>

      <div :class="$style.pageSection">
        <Section
          title="Colour roles"
          description="Colour roles help the same colour system behave consistently across backgrounds, surfaces, text, and icons. Instead of choosing colours ad hoc, apply the matching SGDS role token for the job."
        >
          <div :class="$style.rolesStack">
            <article
              v-for="row in roleRows"
              :key="row.title"
              :class="$style.roleRow"
            >
              <div :class="$style.roleCopy">
                <h3 :class="[$style.roleTitle, 'sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">{{ row.title }}</h3>
                <div :class="$style.roleParagraphs">
                  <p
                    v-for="paragraph in row.paragraphs"
                    :key="paragraph.label"
                    :class="$style.roleText"
                  >
                    <span :class="$style.roleLabel">{{ paragraph.label }}</span>
                    {{ ` ${paragraph.text}` }}
                  </p>
                </div>
              </div>
              <div :class="$style.rolePreview">
                <div :class="$style.roleDemoCard">
                  <div
                    v-if="row.variant === 'background'"
                    :class="[$style.roleCanvas, $style.backgroundCanvas]"
                  >
                    <div :class="$style.backgroundScene">
                      <img
                        :class="[$style.backgroundImage, $style.backgroundImageLight]"
                        src="/foundations/colour/bg-colour.svg"
                        alt=""
                      />
                      <img
                        :class="[$style.backgroundImage, $style.backgroundImageDark]"
                        src="/foundations/colour/bg-colour-dark.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    v-else
                    :class="$style.roleCanvas"
                  ></div>
                </div>
              </div>
            </article>
          </div>
        </Section>
      </div>

      <div :class="$style.pageSection">
        <Section
          title="Modes"
          description="Use the same semantic role structure across day and night modes so colour keeps its meaning even when the palette shifts. This helps products stay familiar and accessible in both themes."
        >
          <div :class="$style.demoCard">
            <div :class="$style.modesDemo">
              <span :class="$style.modeLabel">Live demo</span>
              <sgds-icon-button name="moon" variant="ghost" size="sm"></sgds-icon-button>
            </div>
          </div>
        </Section>
      </div>
    </div>
  </div>
</template>

<style module>
.page {
  width: 100%;
}

.sectionStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.pageSection {
  display: flex;
  flex-direction: column;
}

.demoCard,
.roleDemoCard {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
}

.demoCard {
  min-height: var(--sgds-dimension-480);
  overflow: hidden;
  padding: 0 0 0 var(--sgds-component-padding-md);
  padding-top: var(--sgds-component-padding-md);
}

.demoCardInset {
  padding: var(--sgds-component-padding-md);
}

.semanticDemo,
.modesDemo {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
}

.semanticDemo {
  gap: var(--sgds-gap-md);
}

.semanticAlert {
  border-radius: var(--sgds-border-radius-lg);
  height: 9rem;
  width: min(100%, 10rem);
}

.semanticSuccess {
  background: var(--sgds-success-surface-muted);
  border: 1px solid var(--sgds-success-border-color-default);
}

.semanticWarning {
  background: var(--sgds-warning-surface-muted);
  border: 1px solid var(--sgds-warning-border-color-default);
}

.semanticDanger {
  background: var(--sgds-danger-surface-muted);
  border: 1px solid var(--sgds-danger-border-color-default);
}

.rolesStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.roleRow {
  display: grid;
  gap: var(--sgds-layout-gap-lg);
  grid-template-columns: minmax(0, 1fr);
}

.roleCopy {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
}

.roleTitle {
  margin: 0;
}

.roleParagraphs {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-md);
}

.roleText {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  margin: 0;
}

.roleLabel {
  color: var(--sgds-body-color-default);
  font-weight: var(--sgds-font-weight-semibold);
}

.rolePreview {
  min-width: 0;
}

.roleDemoCard {
  overflow: hidden;
  padding: 0 0 0 var(--sgds-component-padding-md);
  padding-top: var(--sgds-component-padding-md);
}

.roleCanvas {
  height: 100%;
  position: relative;
}

.backgroundCanvas {
  display: flex;
  justify-content: flex-end;
}

.backgroundScene {
  align-items: flex-end;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
}

.backgroundImage {
  display: block;
  height: auto;
  max-width: min(100%, 38rem);
  width: auto;
}

.backgroundImageDark {
  display: none;
}

:global(.sgds-night-theme) .backgroundImageLight {
  display: none;
}

:global(.sgds-night-theme) .backgroundImageDark {
  display: block;
}

.swatchDefault {
  background: var(--sgds-bg-color-default);
}

.swatchAlternate {
  background: var(--sgds-bg-color-alternate);
}

.swatchSurfaceDefault {
  background: var(--sgds-surface-default);
}

.swatchSurfaceRaised {
  background: var(--sgds-surface-raised);
}

.swatchTextDefault {
  background: var(--sgds-body-color-default);
}

.swatchTextSubtle {
  background: var(--sgds-body-color-subtle);
}

.modesDemo :global(sgds-icon-button) {
  position: absolute;
  right: 0;
  top: 0;
}

.modeLabel {
  color: var(--sgds-heading-color-default);
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
}

@media (max-width: 1023px) {
  .roleRow {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 767px) {
  .demoCard,
  .roleDemoCard {
    border-radius: var(--sgds-border-radius-xl);
  }

  .semanticDemo {
    flex-direction: column;
  }

  .semanticAlert {
    width: 100%;
  }

  .rolePage {
    max-width: none;
  }

  .roleChip {
    left: var(--sgds-gap-xs);
    transform: scale(0.94);
    transform-origin: left center;
  }

  .roleArrow {
    display: none;
  }
}
</style>
