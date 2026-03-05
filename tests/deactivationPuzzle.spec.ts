import { test, expect } from "@playwright/test";

test.describe("Deactivation Puzzle (Room 2)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("room2");
  });

  test("opens puzzle overlay and shows three metrics", async ({ page }) => {
    await page.locator(".dectivationpzzle").click();

    await expect(
      page.getByText("What should we deactivate to make the plasma back into gas?"),
    ).toBeVisible();
    await expect(page.getByTestId("metric-electricity")).toBeVisible();
    await expect(page.getByTestId("metric-magnetism")).toBeVisible();
    await expect(page.getByTestId("metric-heat")).toBeVisible();
  });

  test("correct answer: deactivate electricity and heat, keep magnetism", async ({ page }) => {
    await page.locator(".dectivationpzzle").click();

    await page.getByTestId("metric-electricity").click();
    await page.getByTestId("metric-heat").click();
    await page.getByTestId("deactivation-submit").click();

    await expect(page.getByTestId("deactivation-result")).toHaveText("CORRECT!");
  });

  test("incorrect answer shows TRY AGAIN", async ({ page }) => {
    await page.locator(".dectivationpzzle").click();

    await page.getByTestId("metric-electricity").click();
    await page.getByTestId("deactivation-submit").click();

    await expect(page.getByTestId("deactivation-result")).toHaveText("TRY AGAIN");
  });
});
