import { test, expect } from "@playwright/test";

test.describe("Keypad Component", () => {
  test("initial display shows underscores", async ({ page }) => {
    await page.goto("room2");
    await page.locator(".controlconsole").click();
    await expect(page.locator(".display")).toHaveText("____");
  });

  test("allows entering 4 digits", async ({ page }) => {
    await page.goto("room2");
    await page.locator(".controlconsole").click();

    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "4" }).click();

    await expect(page.locator(".display")).toHaveText("1234");
  });

  test("does not allow more than 4 digits", async ({ page }) => {
    await page.goto("room2");
    await page.locator(".controlconsole").click();

    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "4" }).click();
    await page.getByRole("button", { name: "5" }).click();

    await expect(page.locator(".display")).toHaveText("2345");
  });

  test("clear button resets display", async ({ page }) => {
    await page.goto("room2");
    await page.locator(".controlconsole").click();

    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "Clear" }).click();

    await expect(page.locator(".display")).toHaveText("____");
  });

  test("shows correct message for correct code", async ({ page }) => {
    await page.goto("room2");
    await page.locator(".controlconsole").click();

    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button", { name: "4" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "6" }).click();
    await page.getByRole("button", { name: "Enter" }).click();

    await expect(page.locator(".display")).toHaveText("CORRECT");
  });

  test("shows incorrect message for wrong code", async ({ page }) => {
    await page.goto("room2");
    await page.locator(".controlconsole").click();

    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button", { name: "Enter" }).click();

    await expect(page.locator(".display")).toHaveText("INCORRECT");
  });

  test("keyboard input works", async ({ page }) => {
    await page.goto("room2");
    await page.locator(".controlconsole").click();

    await page.keyboard.press("1");
    await page.keyboard.press("2");
    await page.keyboard.press("3");

    await expect(page.locator(".display")).toHaveText("123_");
  });

  test("shows correct message for keyboard input", async ({ page }) => {
    await page.goto("room2");
    await page.locator(".controlconsole").click();

    await page.keyboard.press("9");
    await page.keyboard.press("4");
    await page.keyboard.press("2");
    await page.keyboard.press("6");
    await page.keyboard.press("Enter");

    await expect(page.locator(".display")).toHaveText("CORRECT");
  });

  test("shows incorrect message for keyboard input", async ({ page }) => {
    await page.goto("room2");
    await page.locator(".controlconsole").click();

    await page.keyboard.press("9");
    await page.keyboard.press("9");
    await page.keyboard.press("9");
    await page.keyboard.press("9");
    await page.keyboard.press("Enter");

    await expect(page.locator(".display")).toHaveText("INCORRECT");
  });
});
