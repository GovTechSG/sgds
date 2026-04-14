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
          title="Colour pairing"
          description="Pair colour combinations deliberately so content remains readable and hierarchy stays clear. Start with high-contrast pairings, then introduce stronger colour only where it adds meaning or focus."
        >
          <div :class="[$style.demoCard, $style.demoCardInset]">
            <div :class="$style.pairingDemo">
              <div :class="$style.pairingScene">
                <div :class="$style.pairingShell">
                  <div :class="$style.pairingSidebar">
                    <div :class="$style.pairingAvatar"></div>
                    <div :class="$style.pairingSidebarLine"></div>
                    <div :class="$style.pairingSidebarLineShort"></div>
                  </div>
                  <div :class="$style.pairingMain">
                    <div :class="$style.pairingTopRow">
                      <div :class="$style.pairingTitleBlock">
                        <div :class="$style.pairingEyebrow"></div>
                        <div :class="$style.pairingTitle"></div>
                        <div :class="$style.pairingBodyLine"></div>
                      </div>
                      <div :class="$style.pairingAccentChip">Primary action</div>
                    </div>
                    <div :class="$style.pairingCards">
                      <div :class="$style.pairingCard">
                        <div :class="$style.pairingCardTitle"></div>
                        <div :class="$style.pairingCardBody"></div>
                        <div :class="$style.pairingCardBodyShort"></div>
                      </div>
                      <div :class="$style.pairingCard">
                        <div :class="$style.pairingCardTitle"></div>
                        <div :class="$style.pairingCardBody"></div>
                        <div :class="$style.pairingCardBodyShort"></div>
                      </div>
                    </div>
                    <div :class="$style.pairingFooter">
                      <div :class="$style.pairingMeta"></div>
                      <div :class="$style.pairingCta">Continue</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

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
              <sgds-icon-button name="brightness-high" variant="ghost" size="sm"></sgds-icon-button>
            </div>
          </div>
        </Section>
      </div>

      <div :class="$style.pageSection">
        <Section title="Resources">
          <div :class="$style.resourcesCard">
            <p :class="$style.resourcesText">Best practices and articles</p>
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
.roleDemoCard,
.resourcesCard {
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

.pairingDemo,
.semanticDemo,
.modesDemo {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
}

.pairingScene {
  display: flex;
  justify-content: center;
  width: 100%;
}

.pairingShell {
  background: var(--sgds-bg-color-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  display: flex;
  gap: var(--sgds-gap-lg);
  overflow: hidden;
  padding: var(--sgds-component-padding-sm);
  width: min(100%, 34rem);
}

.pairingSidebar {
  align-items: center;
  background: var(--sgds-bg-color-alternate);
  border-radius: var(--sgds-border-radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
  justify-content: flex-start;
  min-width: 4.5rem;
  padding: var(--sgds-component-padding-sm) var(--sgds-padding-sm);
}

.pairingAvatar,
.pairingSidebarLine,
.pairingSidebarLineShort,
.pairingEyebrow,
.pairingTitle,
.pairingBodyLine,
.pairingCardTitle,
.pairingCardBody,
.pairingCardBodyShort,
.pairingMeta {
  border-radius: var(--sgds-border-radius-pill);
}

.pairingAvatar {
  background: var(--sgds-primary-color-default);
  height: 2.25rem;
  width: 2.25rem;
}

.pairingSidebarLine {
  background: var(--sgds-body-color-subtle);
  height: 0.75rem;
  opacity: 0.5;
  width: 100%;
}

.pairingSidebarLineShort {
  background: var(--sgds-body-color-subtle);
  height: 0.75rem;
  opacity: 0.35;
  width: 70%;
}

.pairingMain {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  min-width: 0;
}

.pairingTopRow,
.pairingFooter {
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: var(--sgds-gap-md);
}

.pairingTitleBlock {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

.pairingEyebrow {
  background: var(--sgds-border-color-muted);
  height: 0.75rem;
  width: 4.5rem;
}

.pairingTitle {
  background: var(--sgds-body-color-default);
  height: 1.5rem;
  width: min(100%, 12rem);
}

.pairingBodyLine {
  background: var(--sgds-body-color-subtle);
  height: 0.875rem;
  opacity: 0.55;
  width: min(100%, 9rem);
}

.pairingAccentChip,
.pairingCta {
  align-items: center;
  display: inline-flex;
  font-size: var(--sgds-font-size-1);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-20);
  white-space: nowrap;
}

.pairingAccentChip {
  animation: pairingAccentPulse 2.8s ease-in-out infinite;
  background: var(--sgds-primary-surface-muted);
  border: 1px solid var(--sgds-primary-border-color-default);
  border-radius: var(--sgds-border-radius-pill);
  color: var(--sgds-primary-color-emphasis);
  padding: var(--sgds-padding-2-xs) var(--sgds-padding-sm);
}

.pairingCards {
  display: grid;
  gap: var(--sgds-gap-sm);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.pairingCard {
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
  min-height: 6.5rem;
  padding: var(--sgds-component-padding-sm);
}

.pairingCardTitle {
  background: var(--sgds-body-color-default);
  height: 1rem;
  width: 60%;
}

.pairingCardBody {
  background: var(--sgds-body-color-subtle);
  height: 0.75rem;
  opacity: 0.4;
  width: 100%;
}

.pairingCardBodyShort {
  background: var(--sgds-body-color-subtle);
  height: 0.75rem;
  opacity: 0.28;
  width: 72%;
}

.pairingMeta {
  background: var(--sgds-body-color-subtle);
  height: 0.75rem;
  opacity: 0.35;
  width: 6rem;
}

.pairingCta {
  animation: pairingCtaGlow 2.8s ease-in-out infinite;
  background: var(--sgds-primary-color-default);
  border-radius: var(--sgds-border-radius-pill);
  color: var(--sgds-color-fixed-light);
  padding: var(--sgds-padding-xs) var(--sgds-padding-md);
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
  grid-template-columns: minmax(0, 19rem) minmax(0, 1fr);
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

.resourcesCard {
  min-height: var(--sgds-dimension-320);
  padding: 0 0 0 var(--sgds-component-padding-md);
  padding-top: var(--sgds-component-padding-md);
}

.resourcesText {
  align-items: center;
  color: var(--sgds-body-color-default);
  display: flex;
  font-size: var(--sgds-font-size-3);
  font-weight: var(--sgds-font-weight-semibold);
  height: 100%;
  justify-content: center;
  line-height: var(--sgds-line-height-24);
  margin: 0;
  min-height: calc(var(--sgds-dimension-320) - (var(--sgds-component-padding-md) * 2));
  text-align: center;
}

@keyframes pairingAccentPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--sgds-primary-color-default) 0%, transparent);
    transform: translateY(0);
  }

  50% {
    box-shadow: 0 0 0 0.375rem color-mix(in srgb, var(--sgds-primary-color-default) 18%, transparent);
    transform: translateY(-0.125rem);
  }
}

@keyframes pairingCtaGlow {
  0%,
  100% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--sgds-primary-color-default) 0%, transparent);
  }

  50% {
    box-shadow: 0 0 0 0.5rem color-mix(in srgb, var(--sgds-primary-color-default) 16%, transparent);
  }
}

@media (max-width: 1023px) {
  .roleRow {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 767px) {
  .demoCard,
  .roleDemoCard,
  .resourcesCard {
    border-radius: var(--sgds-border-radius-xl);
  }

  .semanticDemo {
    flex-direction: column;
  }

  .semanticAlert {
    width: 100%;
  }

  .pairingShell {
    flex-direction: column;
  }

  .pairingSidebar {
    align-items: center;
    flex-direction: row;
    min-width: 0;
    width: 100%;
  }

  .pairingCards {
    grid-template-columns: minmax(0, 1fr);
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
