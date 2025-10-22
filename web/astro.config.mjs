// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      fs: {
        // Allow serving files from parent directory
        allow: [".."],
      },
    },
  },
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
        Head: "./src/components/MyHead.astro",
        // Override the default Header component
        Header: "./src/components/MyHeader.astro",
        // Override the default PageFrame to use our custom layout
        PageFrame: "./src/layouts/Layout.astro",
      },
      customCss: [
        // Custom CSS file
        "./src/styles/custom.css",
      ],
      sidebar: [
        {
          label: "Start Here",
          items: [
            { label: "Introduction", slug: "getting-started/installation" },
            { label: "Manual Setup", slug: "getting-started/quick-start" },
          ],
        },
        {
          label: "Built-ins",
          items: [
            { label: "i18n", slug: "built-in/i18n" },
            { label: "Theming", slug: "built-in/theming" },
            { label: "Mobile Detection", slug: "built-in/mobile-detection" },
          ],
        },
        {
          label: "1 Root",
          items: [
            { label: "css", slug: "1-root/css" },
            { label: "Fonts", slug: "1-root/fonts" },
          ],
        },
        {
          label: "2 Core",
          items: [
            { label: "Button", slug: "components/button" },
            { label: "Text", slug: "components/text" },
            { label: "Link", slug: "components/link" },
            { label: "Icon", slug: "components/icon" },
            { label: "Tooltip", slug: "components/tooltip" },
          ],
        },
        {
          label: "3 Unit",
          items: [
            { label: "Navigation", slug: "3-unit/navigation" },
            { label: "List", slug: "3-unit/list" },
            { label: "Panel", slug: "3-unit/panel" },
            { label: "Card", slug: "3-unit/card" },
          ],
        },
        {
          label: "4 Page",
          items: [
            { label: "Layout", slug: "4-page/layout" },
            { label: "Grid", slug: "4-page/grid" },
          ],
        },
      ],
    }),
  ],
});
