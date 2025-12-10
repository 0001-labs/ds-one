import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  server: {
    host: true,
    open: "/examples/",
  },
  build: {
    outDir: "dist",
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      "ds-one": "./DS1",
    },
  },
});
