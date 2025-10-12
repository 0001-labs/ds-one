// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "DS one",
      description:
        "A plug and play design system built with TypeScript and Lit",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/jo4712/ds-one",
        },
      ],
      components: {
        // Override the default Sidebar component
        Sidebar: "./src/components/MySidebar.astro",
        // Override the default Head component to load DS one from CDN
        Head: "./src/components/CustomHead.astro",
      },
      customCss: [
        // Custom CSS file
        "./src/styles/custom.css",
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Installation", slug: "getting-started/installation" },
            { label: "Quick Start", slug: "getting-started/quick-start" },
            { label: "Live Demo", slug: "demo" },
          ],
        },
        {
          label: "Built in",
          items: [
            { label: "i18n", slug: "built-in/i18n" },
            { label: "Theming", slug: "built-in/theming" },
            { label: "Mobile Detection", slug: "built-in/mobile-detection" },
          ],
        },
        {
          label: "Components",
          items: [
            { label: "Button", slug: "components/button" },
            { label: "Text", slug: "components/text" },
            { label: "Link", slug: "components/link" },
            { label: "Icon", slug: "components/icon" },
            { label: "Tooltip", slug: "components/tooltip" },
          ],
        },
        {
          label: "Advanced",
          items: [
            { label: "Theming", slug: "advanced/theming" },
            { label: "Internationalization", slug: "advanced/i18n" },
          ],
        },
      ],
    }),
  ],
});
