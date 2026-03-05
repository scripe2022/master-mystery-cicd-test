import { test, expect } from "@playwright/test";

test.describe("End Page - Success", () => {
  test("displays congratulations message and Return button", async ({ page }) => {
    await page.goto("end-page");

    await expect(page.getByRole("heading", { name: /Congrats/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /YOU ESCAPED/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Return" })).toBeVisible();
  });

  test("Return button navigates back to home page", async ({ page }) => {
    await page.goto("end-page");

    await page.getByRole("button", { name: "Return" }).click();

    await expect(page).toHaveURL(/master-mystery/);
    await expect(page.getByRole("heading", { name: "Matter Mystery" })).toBeVisible();
  });
});

test.describe("End Page - Failure", () => {
  test("displays failure message and Return button", async ({ page }) => {
    await page.goto("fail-page");

    await expect(page.getByRole("heading", { name: /Ran Out of Time/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Maybe Next Time/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Return" })).toBeVisible();
  });

  test("Return button navigates back to home page", async ({ page }) => {
    await page.goto("fail-page");

    await page.getByRole("button", { name: "Return" }).click();

    await expect(page).toHaveURL(/master-mystery/);
    await expect(page.getByRole("heading", { name: "Matter Mystery" })).toBeVisible();
  });
});
