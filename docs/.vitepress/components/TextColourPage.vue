<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
import { ref } from "vue";

const baseTokens = [
  { utilityClass: "sgds:text-default",     token: "--sgds-color-default",     day: "#1a1a1a", night: "#ffffff", usage: "Primary body text — main readable content"          },
  { utilityClass: "sgds:text-subtle",       token: "--sgds-color-subtle",       day: "#525252", night: "#c6c6c6", usage: "Secondary text — captions, helper text"             },
  { utilityClass: "sgds:text-muted",        token: "--sgds-color-muted",        day: "#c6c6c6", night: "#3b3b3b", usage: "Low-contrast text — metadata, decorative labels"    },
  { utilityClass: "sgds:text-inverse",      token: "--sgds-color-inverse",      day: "#f3f3f3", night: "#2a2a2a", usage: "Text on inverted surfaces"                          },
  { utilityClass: "sgds:text-fixed-light",  token: "--sgds-color-fixed-light",  day: "#f3f3f3", night: "#f3f3f3", usage: "Always light — use on fixed dark backgrounds"       },
  { utilityClass: "sgds:text-fixed-dark",   token: "--sgds-color-fixed-dark",   day: "#1a1a1a", night: "#1a1a1a", usage: "Always dark — use on fixed light backgrounds"       },
] as const;

const typographyRoleTokens = [
  { utilityClass: "sgds:text-display-default", token: "--sgds-display-color-default", day: "#1a1a1a", night: "#ffffff", usage: "Hero headlines, page-level display titles" },
  { utilityClass: "sgds:text-heading-default", token: "--sgds-heading-color-default", day: "#2a2a2a", night: "#f3f3f3", usage: "H1–H4 section titles"              },
  { utilityClass: "sgds:text-body-default",    token: "--sgds-body-color-default",    day: "#1a1a1a", night: "#ffffff", usage: "Paragraphs and descriptions"       },
  { utilityClass: "sgds:text-body-subtle",     token: "--sgds-body-color-subtle",     day: "#525252", night: "#c6c6c6", usage: "Secondary body — footnotes, meta"  },
  { utilityClass: "sgds:text-label-default",   token: "--sgds-label-color-default",   day: "#2a2a2a", night: "#f3f3f3", usage: "Form labels, table headers"        },
  { utilityClass: "sgds:text-link-default",    token: "--sgds-link-color-default",    day: "#0269d0", night: "#60aaf4", usage: "Links at rest"                     },
  { utilityClass: "sgds:text-link-emphasis",   token: "--sgds-link-color-emphasis",   day: "#0151a0", night: "#96c7f7", usage: "Links on hover or focus"           },
  { utilityClass: "sgds:text-accent-default",  token: "--sgds-accent-color-default",  day: "#0269d0", night: "#60aaf4", usage: "Informational — brand accent"      },
] as const;

const copiedKey = ref<string | null>(null);

const copyUtility = async (utilityClass: string) => {
  await navigator.clipboard.writeText(utilityClass);
  copiedKey.value = utilityClass;
  setTimeout(() => {
    if (copiedKey.value === utilityClass) copiedKey.value = null;
  }, 2000);
};
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <div class="typography-page-template__copy-block">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Text colour utilities apply semantic colour tokens to text. All tokens are theme-aware and automatically switch between day and night mode values — unless a <code>fixed</code> variant is used.
        </p>
      </div>
    </section>

    <section class="typography-page-template__section">
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Base</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">General-purpose hierarchy tokens. Use these when a specific typographic role (heading, label, link) does not apply.</p>
        </div>

        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head class="typography-page-template__table-utility-column">SGDS utility</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-value-column">Day</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-value-column">Night</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row v-for="t in baseTokens" :key="t.utilityClass">
            <sgds-table-cell class="typography-page-template__table-utility-column">
              <div class="typography-page-template__utility-copy">
                <CodeToken :label="t.utilityClass" />
                <button
                  :class="[
                    'typography-page-template__utility-copy-button',
                    copiedKey === t.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                  ]"
                  :aria-label="copiedKey === t.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                  @click="copyUtility(t.utilityClass)"
                >
                  <sgds-icon :name="copiedKey === t.utilityClass ? 'check' : 'copy'" size="md" />
                </button>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-value-column">
              <div class="text-colour-swatch-cell">
                <span class="text-colour-swatch" :style="{ background: t.day }" />
                <CodeToken :label="t.day" :surface="false" />
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-value-column">
              <div class="text-colour-swatch-cell">
                <span class="text-colour-swatch" :style="{ background: t.night }" />
                <CodeToken :label="t.night" :surface="false" />
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-usage-column">
              <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ t.usage }}</span>
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>

        <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Typography roles</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Purpose-specific tokens for structured document content. Prefer these over base tokens when the element has a clear typographic role.</p>
        </div>

        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head class="typography-page-template__table-utility-column">SGDS utility</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-value-column">Day</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-value-column">Night</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-usage-column">Usage</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row v-for="t in typographyRoleTokens" :key="t.utilityClass">
            <sgds-table-cell class="typography-page-template__table-utility-column">
              <div class="typography-page-template__utility-copy">
                <CodeToken :label="t.utilityClass" />
                <button
                  :class="[
                    'typography-page-template__utility-copy-button',
                    copiedKey === t.utilityClass ? 'sgds:text-success-default' : 'sgds:text-default'
                  ]"
                  :aria-label="copiedKey === t.utilityClass ? 'Copied!' : 'Copy SGDS utility'"
                  @click="copyUtility(t.utilityClass)"
                >
                  <sgds-icon :name="copiedKey === t.utilityClass ? 'check' : 'copy'" size="md" />
                </button>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-value-column">
              <div class="text-colour-swatch-cell">
                <span class="text-colour-swatch" :style="{ background: t.day }" />
                <CodeToken :label="t.day" :surface="false" />
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-value-column">
              <div class="text-colour-swatch-cell">
                <span class="text-colour-swatch" :style="{ background: t.night }" />
                <CodeToken :label="t.night" :surface="false" />
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-usage-column">
              <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ t.usage }}</span>
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
/* Swatch cell — inline flex with colour dot not expressible via SGDS utilities */
.text-colour-swatch-cell {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-xs);
}

.text-colour-swatch {
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  display: inline-block;
  flex-shrink: 0;
  height: 20px;
  width: 20px;
}

</style>
