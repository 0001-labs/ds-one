import { defineConfig } from "vite";

export default defineConfig({
  root: "examples",
  server: {
    open: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      "ds-one": "../DS1",
    },
  },
  publicDir: "../DS1",
});
