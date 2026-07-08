// https://vitepress.dev/guide/custom-theme

// Above-the-fold components (eagerly loaded for fast FCP/LCP)
import "@govtechsg/sgds-web-component/components/Masthead/index.js";
import "@govtechsg/sgds-web-component/components/Mainnav/index.js";
import "@govtechsg/sgds-web-component/components/IconButton/index.js";
import "@govtechsg/sgds-web-component/components/Button/index.js";

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

      // Lazy-load below-fold and interaction-only components after initial paint
      const idle = window.requestIdleCallback || ((cb: IdleRequestCallback) => setTimeout(cb, 1));
      idle(
        () => {
          import("@govtechsg/sgds-web-component/components/Footer/index.js");
          import("@govtechsg/sgds-web-component/components/Sidenav/index.js");
          import("@govtechsg/sgds-web-component/components/Icon/index.js");
          import("@govtechsg/sgds-web-component/components/Badge/index.js");
          import("@govtechsg/sgds-web-component/components/Drawer/index.js");
          import("@govtechsg/sgds-web-component/components/Link/index.js");
          import("@govtechsg/sgds-web-component/components/CloseButton/index.js");
          import("@govtechsg/sgds-web-component/components/Breadcrumb/index.js");
          import("@govtechsg/sgds-web-component/components/Divider/index.js");
          import("@govtechsg/sgds-web-component/components/Tooltip/index.js");
        },
        { timeout: 3000 }
      );
    }
  },
} satisfies Theme;
