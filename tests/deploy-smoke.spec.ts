import { test, expect } from "@playwright/test";

test("deployment smoke: loads home and assets without errors", async ({ page }) => {
  const consoleErrors: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  const badResponses: string[] = [];
  page.on("response", (res) => {
    const status = res.status();
    if (status >= 400) {
      const req = res.request();
      badResponses.push(`${status} ${req.resourceType()} ${res.url()}`);
    }
  });

  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Matter Mystery" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Start" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();

  expect(badResponses, `Bad responses:\n${badResponses.join("\n")}`).toEqual([]);
});
