// https://vitepress.dev/guide/custom-theme
import "@govtechsg/sgds-web-component";
import Layout from "./Layout.vue";
import SkillsTable from "../components/SkillsTable.vue";
import CopyCommand from "../components/CopyCommand.vue";
import PromptBox from "../components/PromptBox.vue";
import AiWorkflowPaths from "../components/AiWorkflowPaths.vue";
import PatternDesignPage from "../components/PatternDesignPage.vue";
import type { Theme } from "vitepress";
import "./style.css";
import { initializeTheme } from "./composables/sgds-theming";

export default {
  Layout,
  enhanceApp({ app }) {
    app.component("SkillsTable", SkillsTable);
    app.component("CopyCommand", CopyCommand);
    app.component("PromptBox", PromptBox);
    app.component("AiWorkflowPaths", AiWorkflowPaths);
    app.component("PatternDesignPage", PatternDesignPage);
    if (typeof window !== "undefined") {
      if (!document.querySelector('script[data-figma-capture="true"]')) {
        const captureScript = document.createElement("script");
        captureScript.async = true;
        captureScript.dataset.figmaCapture = "true";
        captureScript.src = "https://mcp.figma.com/mcp/html-to-design/capture.js";
        document.head.appendChild(captureScript);
      }
      initializeTheme();
    }
  },
} satisfies Theme;
