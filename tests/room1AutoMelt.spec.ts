import { test, expect } from "@playwright/test";

test("room1 auto-melts at 503, but door requires correct keypad code", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Start" }).click();
  await expect(page.locator(".room1bkg")).toBeVisible();

  const pressurePlaque = page.locator(".case1PressurePlaque");

  for (let i = 0; i < 40; i += 1) {
    const text = await pressurePlaque.innerText();
    if (text.includes("503")) {
      break;
    }
    await page.locator(".btnlever1").click();
  }

  await expect(pressurePlaque).toHaveText("Pressure: 503 atm");
  await expect(page.locator(".imgcase1")).toHaveAttribute("src", /case2/);
  await expect(page.locator(".btndoor")).toHaveCount(0);

  await page.locator(".btnlever2").click();
  await page.getByRole("button", { name: "5" }).click();
  await page.getByRole("button", { name: "0" }).click();
  await page.getByRole("button", { name: "3" }).click();
  await page.getByRole("button", { name: "Enter" }).click();

  await expect(page.locator(".btndoor")).toBeVisible({ timeout: 3000 });
});
