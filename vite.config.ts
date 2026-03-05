// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],

// });

import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/master-mystery/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    exclude: [...configDefaults.exclude, "tests/**"], // Keep Playwright out!
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*"],
      exclude: ["src/main.tsx", "src/vite-env.d.ts"],
    },
  },
});
