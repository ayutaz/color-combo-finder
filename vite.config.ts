import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/color-combo-finder/",
  build: {
    target: "es2022",
  },
  test: {
    globals: true,
    environment: "node",
  },
});
