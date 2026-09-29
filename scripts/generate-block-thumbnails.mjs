import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const chromePath = process.env.CHROME_PATH || undefined;
const outputDir = new URL("../docs/public/templates/thumbnails/", import.meta.url);
const outputDirPath = fileURLToPath(outputDir);
const storybookBase = "https://www.webcomponent.designsystem.tech.gov.sg";

const thumbWidth = 600;
const thumbHeight = 400;
const thumbnailInsetX = 72;
const thumbnailInsetY = 48;
const innerWidth = thumbWidth - thumbnailInsetX * 2;   // 456
const innerHeight = thumbHeight - thumbnailInsetY * 2;  // 304

// High-res capture viewport — same aspect ratio as the inner frame so
// cover/contain produce identical results (no cropping, no letterboxing).
const captureScale = 3;
const captureViewport = {
  width: innerWidth * captureScale,   // 1368
  height: innerHeight * captureScale, // 912
};

// ---------------------------------------------------------------------------
// Storybook story ID map (mirrors docs/.vitepress/data/storybook-ids.ts)
// ---------------------------------------------------------------------------

const storybookStoryIds = {
  // Page templates
  "about-us": "templates-about-us-basic--basic",
  "application-management": "templates-application-management-application-list--application-list",
  "application-shell-operational": "templates-application-shell-operational--operational-app-shell",
  "blog": "templates-blog-success-story--success-story",
  "catalogue": "templates-catalogue-search-filter--search-and-filter",
  "form-page": "templates-form-basic--basic",
  "landing": "templates-landing-basic--basic",
  "multi-step-form": "templates-form-multi-step-form--multi-step-form",
  "report-issue": "templates-form-report-issue--report-issue",
  // Blocks
  "cards-3-per-column": "blocks-cards--cards-3",
  "cards-4-per-column": "blocks-cards--cards-4",
  "cta-contained-primary-center": "blocks-call-to-action-contained-primary-center--default",
  "cta-contained-primary": "blocks-call-to-action-contained-primary--default",
  "cta-contained-raised-center": "blocks-call-to-action-contained-raised-center--default",
  "cta-contained-raised": "blocks-call-to-action-contained-raised--default",
  "cta-full-bleed-alternate-center": "blocks-call-to-action-full-bleed-alternate-center--default",
  "cta-full-bleed-alternate": "blocks-call-to-action-full-bleed-alternate--default",
  "cta-full-bleed-primary-center": "blocks-call-to-action-full-bleed-primary-center--default",
  "cta-full-bleed-primary": "blocks-call-to-action-full-bleed-primary--default",
  "feature-image-left-4-8": "blocks-feature--feature-image-left-48",
  "feature-image-right-4-8": "blocks-feature--feature-image-right-48",
  "feature-component-left-6-6": "blocks-feature--feature-component-left-66",
  "feature-component-right-6-6": "blocks-feature--feature-component-right-66",
  "feature-image-left-6-6": "blocks-feature--feature-image-left-66",
  "feature-image-right-6-6": "blocks-feature--feature-image-right-66",
  "feature-image-left-8-4": "blocks-feature--feature-image-left-84",
  "feature-image-right-8-4": "blocks-feature--feature-image-right-84",
  "feature-cards-below": "blocks-feature--feature-cards-below",
  "feature-no-image-center": "blocks-feature--feature-no-image-center",
  "feature-no-image-left": "blocks-feature--feature-no-image-left",
  "filter-checkboxes": "blocks-filter--filter-checkboxes",
  "form-all-types": "blocks-form--all-types",
  "form-basic-center": "blocks-form--basic-center",
  "form-basic-left": "blocks-form--basic-left",
  "form-basic-right": "blocks-form--basic-right",
  "form-fields-checkbox": "blocks-form--form-fields-checkbox",
  "form-fields-dates-quantities": "blocks-form--form-fields-dates-quantities",
  "form-fields-file-upload": "blocks-form--form-fields-file-upload",
  "form-fields-radio": "blocks-form--form-fields-radio",
  "form-fields-selects": "blocks-form--form-fields-selects",
  "form-fields-textarea": "blocks-form--form-fields-textarea",
  "form-multi-step": "blocks-form--form-multistep-stepper",
  "form-full-width-only": "blocks-form--fullwidth-only",
  "form-paired-only": "blocks-form--paired-only",
  "form-sections-single": "blocks-form--sections-single",
  "form-sections-three": "blocks-form--sections-three",
  "form-sections-two": "blocks-form--sections-two",
  "header-page-header-with-breadcrumb": "blocks-header--page-header-breadcrumb",
  "header-page-header": "blocks-header--page-header",
  "hero-background-image-light": "blocks-hero--hero-bg-image-light",
  "hero-background-image": "blocks-hero--hero-bg-image",
  "hero-center": "blocks-hero--hero-center",
  "hero-fullbleed": "blocks-hero--hero-fullbleed",
  "hero-image": "blocks-hero--hero-image",
  "hero-basic": "blocks-hero--hero",
  "stats-3-statistics": "blocks-stats--stats-3",
  "stats-4-statistics": "blocks-stats--stats-4",
  "stats-5-statistics": "blocks-stats--stats-5",
  "stats-right-6-column": "blocks-stats--stats-right-6",
  "stats-right-8-columns": "blocks-stats--stats-right-8",
};

// ---------------------------------------------------------------------------
// Env-based filtering
// ---------------------------------------------------------------------------

const requestedKeys = new Set(
  (process.env.THUMBNAIL_KEYS ?? "").split(",").map((k) => k.trim()).filter(Boolean),
);
const requestedThemes = new Set(
  (process.env.THUMBNAIL_THEMES ?? "").split(",").map((t) => t.trim()).filter(Boolean),
);

const themes = [
  { name: "day", suffix: "", colorMode: "" },
  { name: "night", suffix: "-dark", colorMode: "&globals=colorMode:night" },
];

const thumbnailKeys = Object.keys(storybookStoryIds)
  .filter((key) => !requestedKeys.size || requestedKeys.has(key));
const themesToGenerate = themes.filter(
  (t) => !requestedThemes.size || requestedThemes.has(t.name) || requestedThemes.has(t.suffix.replace("-", "")),
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const roundedRect = (w, h, r, fill) => Buffer.from(
  `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" rx="${r}" fill="${fill}"/></svg>`,
);

const buildStorybookUrl = (storyId, colorMode) =>
  `${storybookBase}/iframe.html?id=${storyId}&viewMode=story${colorMode}`;

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  ...(chromePath ? { executablePath: chromePath } : {}),
});

try {
  const page = await browser.newPage({
    viewport: captureViewport,
    deviceScaleFactor: 1,
  });

  const innerMask = roundedRect(innerWidth, innerHeight, 14, "#fff");

  for (const theme of themesToGenerate) {
    for (const key of thumbnailKeys) {
      const storyId = storybookStoryIds[key];
      const url = buildStorybookUrl(storyId, theme.colorMode);

      // Navigate and wait for content
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(5000);

      // Remove Storybook padding/margin and min-height so content shrinks
      // to its natural height instead of filling the viewport.
      await page.evaluate(() => {
        const reset = "margin:0!important;padding:0!important;width:100%!important;overflow:hidden!important;min-height:0!important;";
        document.documentElement.style.cssText = reset;
        document.body.style.cssText = reset;
        // Storybook's .sb-main-centered wrapper uses min-height:100vh
        const sbMain = document.querySelector(".sb-show-main");
        if (sbMain) sbMain.style.cssText = "min-height:0!important;display:block!important;padding:0!important;";
        const root = document.getElementById("storybook-root");
        if (root) {
          root.style.cssText = "margin:0!important;padding:0!important;width:100%!important;";
          const child = root.firstElementChild;
          if (child) child.style.cssText += "margin:0!important;";
        }
        // Remove min-height:100vh from all descendants so blocks render
        // at their natural content height for the thumbnail.
        document.querySelectorAll("*").forEach((el) => {
          const style = getComputedStyle(el);
          if (style.minHeight === `${window.innerHeight}px` || style.minHeight === "100vh") {
            el.style.minHeight = "0px";
          }
        });
      });

      // Wait for fonts and web components
      await page.evaluate(async () => {
        await document.fonts?.ready;
        await new Promise((r) => requestAnimationFrame(() => r()));
      });

      // Wait for all images (including shadow DOM)
      await page.evaluate(async () => {
        const allImages = [
          ...document.querySelectorAll("img"),
          ...Array.from(document.querySelectorAll("*"))
            .filter((el) => el.shadowRoot)
            .flatMap((el) => [...el.shadowRoot.querySelectorAll("img")]),
        ];
        await Promise.all(
          allImages.map((img) => {
            if (img.complete && img.naturalWidth > 0) return;
            return new Promise((r) => {
              img.addEventListener("load", r, { once: true });
              img.addEventListener("error", r, { once: true });
            });
          }),
        );
      });

      // Measure the actual content height and shrink the viewport to fit
      // tightly around the content. This removes empty space from stories
      // that use min-height:100vh and makes the content fill the thumbnail.
      const contentHeight = await page.evaluate(() => {
        const el = document.querySelector("#storybook-root > *:first-child")
          ?? document.querySelector("#storybook-root");
        return el ? el.scrollHeight : document.documentElement.scrollHeight;
      });
      const vpWidth = captureViewport.width;
      await page.setViewportSize({ width: vpWidth, height: contentHeight || captureViewport.height });
      await page.waitForTimeout(500);

      const raw = await page.screenshot({ type: "png", fullPage: false });

      const rawMeta = await sharp(raw).metadata();
      const contentRatio = rawMeta.width / rawMeta.height;
      const frameRatio = innerWidth / innerHeight;

      // If content is taller than the frame, use cover + top to keep the
      // header visible. Otherwise use contain + centre.
      const isTall = contentRatio <= frameRatio;
      const fit = isTall ? "cover" : "contain";
      const position = isTall ? "top" : "centre";

      // Sample edge colour for the contain background
      const { data } = await sharp(raw).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const topLeftIdx = 0;
      const bgR = data[topLeftIdx], bgG = data[topLeftIdx + 1], bgB = data[topLeftIdx + 2];
      const fillBg = { r: bgR, g: bgG, b: bgB, alpha: 255 };

      const cropped = await sharp(raw)
        .resize(innerWidth, innerHeight, { fit, position, background: fillBg })
        .png()
        .toBuffer();

      // Apply rounded corner mask
      const innerImage = await sharp(cropped)
        .composite([{ input: innerMask, blend: "dest-in" }])
        .png()
        .toBuffer();

      // Place inside the 600x400 canvas
      await sharp({
        create: {
          width: thumbWidth,
          height: thumbHeight,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      })
        .composite([{ input: innerImage, left: thumbnailInsetX, top: thumbnailInsetY }])
        .webp({ quality: 85 })
        .toFile(`${outputDirPath}${key}${theme.suffix}.webp`);

      console.log(`Generated ${key}${theme.suffix}.webp`);
    }
  }
} finally {
  await browser.close();
}
