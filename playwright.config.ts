import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    headless: true,
    baseURL: process.env.PW_BASE_URL ?? "http://127.0.0.1:4173/master-mystery/",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "chromium-system",
      use: { browserName: "chromium", channel: "chromium" },
    },
  ],
});
