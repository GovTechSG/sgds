// https://vitepress.dev/guide/custom-theme
import "@govtechsg/sgds-web-component";
import Layout from "./Layout.vue";
import SkillsTable from "../components/ui/SkillsTable.vue";
import CopyCommand from "../components/ui/CopyCommand.vue";
import CodeToken from "../components/ui/CodeToken.vue";
import AiWorkflowPaths from "../components/ai/AiWorkflowPaths.vue";
import DesignPageWrapper from "../components/components/DesignPageWrapper.vue";
import CodeBlock from "../components/ui/CodeBlock.vue";
import type { Theme } from "vitepress";
import "./style.css";
import { initializeTheme } from "./composables/sgds-theming";

export default {
  Layout,
  enhanceApp({ app }) {
    app.component("SkillsTable", SkillsTable);
    app.component("CopyCommand", CopyCommand);
    app.component("CodeToken", CodeToken);
    app.component("AiWorkflowPaths", AiWorkflowPaths);
    app.component("DesignPageWrapper", DesignPageWrapper);
    app.component("CodeBlock", CodeBlock);
    if (typeof window !== "undefined") {
      if (import.meta.env.DEV && !document.querySelector('script[data-figma-capture="true"]')) {
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
