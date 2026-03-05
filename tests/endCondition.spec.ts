import { test, expect } from "@playwright/test";

test.describe("End-condition triggers from Room1", () => {
  test("lever1 triggers success end page", async ({ page }) => {
    await page.goto("room1");

    await page.locator(".btnlever1").click();

    await expect(page).toHaveURL(/end-page/);
    await expect(page.getByRole("heading", { name: /Congrats/i })).toBeVisible();
  });

  test("lever2 triggers failure end page", async ({ page }) => {
    await page.goto("room1");

    await page.locator(".btnlever2").click();

    await expect(page).toHaveURL(/fail-page/);
    await expect(page.getByRole("heading", { name: /Ran Out of Time/i })).toBeVisible();
  });

  test("full flow: start -> room1 -> success end -> return home", async ({ page }) => {
    await page.goto("./");

    await page.getByRole("button", { name: "Start" }).click();
    await expect(page).toHaveURL(/room1/);

    await page.locator(".btnlever1").click();
    await expect(page).toHaveURL(/end-page/);

    await page.getByRole("button", { name: "Return" }).click();
    await expect(page).toHaveURL(/master-mystery/);
  });

  test("full flow: start -> room1 -> failure end -> return home", async ({ page }) => {
    await page.goto("./");

    await page.getByRole("button", { name: "Start" }).click();
    await expect(page).toHaveURL(/room1/);

    await page.locator(".btnlever2").click();
    await expect(page).toHaveURL(/fail-page/);

    await page.getByRole("button", { name: "Return" }).click();
    await expect(page).toHaveURL(/master-mystery/);
  });
});
