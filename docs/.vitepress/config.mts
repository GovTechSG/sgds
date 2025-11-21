import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
import { fileSort } from "./data/file-management";

const vitePressConfig = {
  title: "Singapore Government Design System",
  description: "Unifying Government through Design and Code.",
  cleanUrls: true,
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith("sgds-"),
      },
    },
  },
};

function getMenu(folder: string) {
  return {
    documentRootPath: "docs",
    scanStartPath: folder,
    resolvePath: `/${folder}/`,
    hyphenToSpace: true,
    capitalizeEachWords: true,
    useTitleFromFrontmatter: true,
    manualSortFileNameByPriority: fileSort[folder],
  };
}

// https://vitepress.dev/reference/site-config
export default defineConfig(
  withSidebar(vitePressConfig, [getMenu("foundations"), getMenu("components")])
);
