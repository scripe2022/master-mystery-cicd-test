import { test, expect } from "@playwright/test";

const GAME_RATIO = 1440 / 1024;

async function enterRoom2(page) {
  await page.goto("http://localhost:5173/master-mystery/");

  await page.waitForSelector(".btnStart", { timeout: 5000 });
  await page.click(".btnStart");

  await page.waitForSelector(".room1bkg", { timeout: 5000 });
  await page.click(".btnbook");

  await page.waitForSelector(".room2bkg", { timeout: 5000 });
}

async function rect(page, selector) {
  const el = await page.waitForSelector(selector, { timeout: 5000 });
  const box = await el.boundingBox();

  if (!box) {
    throw new Error(`No bounding box for ${selector}`);
  }

  return {
    left: box.x,
    top: box.y,
    width: box.width,
    height: box.height,
  };
}

async function relativeToGame(page, selector) {
  const game = await rect(page, ".game-scale");
  const el = await rect(page, selector);

  return {
    x: (el.left - game.left) / game.width,
    y: (el.top - game.top) / game.height,
    w: el.width / game.width,
    h: el.height / game.height,
  };
}

test("game preserves aspect ratio at different screen sizes", async ({ page }) => {
  await enterRoom2(page);

  await page.setViewportSize({ width: 1600, height: 900 });

  const g1 = await rect(page, ".game-scale");

  expect(g1.width / g1.height).toBeCloseTo(GAME_RATIO, 3);
  expect(g1.width).toBeLessThanOrEqual(1600);
  expect(g1.height).toBeLessThanOrEqual(900);

  await page.setViewportSize({ width: 800, height: 1400 });

  const g2 = await rect(page, ".game-scale");

  expect(g2.width / g2.height).toBeCloseTo(GAME_RATIO, 3);
  expect(g2.height).toBeLessThanOrEqual(1400);
  expect(g2.width).toBeLessThanOrEqual(800);
});

test("room 1 elements scale proportionally with the game frame", async ({ page }) => {
  await enterRoom2(page);

  // disable hover transforms which can cause small position changes and test instability
  await page.addStyleTag({
    content: `
      *:hover { transform: none !important; }
    `,
  });

  await page.setViewportSize({ width: 1440, height: 1024 });

  const baseline = {
    particlemovment: await relativeToGame(page, ".particlemovment"),
    energylvls: await relativeToGame(page, ".energylvls"),
    controlconsole: await relativeToGame(page, ".controlconsole"),
    plasmaplaque: await relativeToGame(page, ".plasmaplaque"),
    magnet: await relativeToGame(page, ".magnet"),
    energymeter: await relativeToGame(page, ".energymeter"),
    dectivationpzzle: await relativeToGame(page, ".dectivationpzzle"),
  };

  const viewports = [
    { width: 1440, height: 1024 }, // baseline
    { width: 800, height: 600 }, // 4:3
    { width: 1280, height: 720 }, // 16:9
    { width: 1920, height: 800 }, // 21:9
    { width: 900, height: 900 }, // 1:1
    { width: 375, height: 812 }, // mobile portrait
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    const current = {
      particlemovment: await relativeToGame(page, ".particlemovment"),
      energylvls: await relativeToGame(page, ".energylvls"),
      controlconsole: await relativeToGame(page, ".controlconsole"),
      plasmaplaque: await relativeToGame(page, ".plasmaplaque"),
      magnet: await relativeToGame(page, ".magnet"),
      energymeter: await relativeToGame(page, ".energymeter"),
      dectivationpzzle: await relativeToGame(page, ".dectivationpzzle"),
    };

    // screenshot in screenshot dir
    await page.screenshot({
      path: `tests/screenshots/room2-${viewport.width}x${viewport.height}.png`,
    });

    for (const key of Object.keys(baseline)) {
      expect(current[key].x).toBeCloseTo(baseline[key].x, 3);
      expect(current[key].y).toBeCloseTo(baseline[key].y, 3);
      expect(current[key].w).toBeCloseTo(baseline[key].w, 3);
      expect(current[key].h).toBeCloseTo(baseline[key].h, 3);
    }
  }
});
