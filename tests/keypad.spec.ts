import { test, expect } from "@playwright/test";

const LOCALHOST_URL = "http://localhost:5173/master-mystery/";

test.describe("Keypad Component", () => {
  test("initial display shows underscores", async ({ page }) => {
    await page.goto(LOCALHOST_URL);
    await page.locator(".btnStart").click();
    await page.locator(".btnlever2").click();
    await expect(page.locator(".display")).toHaveText("___");
  });

  test("allows entering 3 digits", async ({ page }) => {
    await page.goto(LOCALHOST_URL);
    await page.locator(".btnStart").click();
    await page.locator(".btnlever2").click();

    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "3" }).click();

    await expect(page.locator(".display")).toHaveText("123");
  });

  test("does not allow more than 3 digits", async ({ page }) => {
    await page.goto(LOCALHOST_URL);
    await page.locator(".btnStart").click();
    await page.locator(".btnlever2").click();

    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "4" }).click();

    await expect(page.locator(".display")).toHaveText("234");
  });

  test("clear button resets display", async ({ page }) => {
    await page.goto(LOCALHOST_URL);
    await page.locator(".btnStart").click();
    await page.locator(".btnlever2").click();

    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "Clear" }).click();

    await expect(page.locator(".display")).toHaveText("___");
  });

  test("shows correct message for correct code", async ({ page }) => {
    await page.goto(LOCALHOST_URL);
    await page.locator(".btnStart").click();
    await page.locator(".btnlever2").click();

    await page.getByRole("button", { name: "5" }).click();
    await page.getByRole("button", { name: "0" }).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "Enter" }).click();

    await expect(page.locator(".display")).toHaveText("CORRECT");
  });

  test("shows incorrect message for wrong code", async ({ page }) => {
    await page.goto(LOCALHOST_URL);
    await page.locator(".btnStart").click();
    await page.locator(".btnlever2").click();

    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button", { name: "Enter" }).click();

    await expect(page.locator(".display")).toHaveText("INCORRECT");
  });

  test("keyboard input works", async ({ page }) => {
    await page.goto(LOCALHOST_URL);
    await page.locator(".btnStart").click();
    await page.locator(".btnlever2").click();

    await page.keyboard.press("1");
    await page.keyboard.press("2");
    await page.keyboard.press("3");

    await expect(page.locator(".display")).toHaveText("123");
  });

  test("shows correct message for keyboard input", async ({ page }) => {
    await page.goto(LOCALHOST_URL);
    await page.locator(".btnStart").click();
    await page.locator(".btnlever2").click();

    await page.keyboard.press("5");
    await page.keyboard.press("0");
    await page.keyboard.press("3");
    await page.keyboard.press("Enter");

    await expect(page.locator(".display")).toHaveText("CORRECT");
  });

  test("shows incorrect message for keyboard input", async ({ page }) => {
    await page.goto(LOCALHOST_URL);
    await page.locator(".btnStart").click();
    await page.locator(".btnlever2").click();

    await page.keyboard.press("9");
    await page.keyboard.press("9");
    await page.keyboard.press("9");
    await page.keyboard.press("Enter");

    await expect(page.locator(".display")).toHaveText("INCORRECT");
  });
});
