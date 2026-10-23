import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// The preloader covers the page until the hero assets are ready.
const open = async (page) => {
  await page.goto("/");
  await expect(page.locator(".preloader")).toHaveCount(0, { timeout: 10000 });
};

for (const width of [320, 375, 768, 1440]) {
  test(`layout, imagery and catalog at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await open(page);
    await expect(page.locator("h1")).toContainText("RESPEITA");
    await expect(page.locator(".product-card")).toHaveCount(6);
    await page.locator("#cardapio").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    await expect(page.locator(".product-card img").first()).toBeVisible();
    const missing = await page
      .locator(".product-card img")
      .evaluateAll(
        (imgs) => imgs.filter((i) => i.complete && !i.naturalWidth).length,
      );
    expect(missing).toBe(0);
    await page.locator(".combo-section").scrollIntoViewIfNeeded();
    const visual = await page.locator(".combo-visual").boundingBox();
    const copy = await page.locator(".combo-copy").boundingBox();
    if (width < 768) expect(visual.y).toBeGreaterThan(copy.y + copy.height - 1);
    expect(errors).toEqual([]);
  });
}

test("filters, product detail, quantity, demo order and focus restore", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page);
  await page.getByRole("button", { name: "Sem carne 01", exact: true }).click();
  await expect(page.locator(".product-card:visible")).toHaveCount(1);
  await expect(page.locator(".product-card:visible")).toContainText(
    "Verde de fome",
  );
  await page.getByRole("button", { name: "Todos 06", exact: true }).click();
  const trigger = page.getByRole("button", {
    name: "Ver detalhes de O Original",
    exact: true,
  });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "O Original" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Diminuir quantidade" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Aumentar quantidade" }).click();
  await expect(page.locator("#dialog-price")).toContainText("64,00");
  await page
    .getByRole("textbox", { name: "Algum recado pra cozinha?" })
    .fill("Sem picles");
  await page.getByRole("button", { name: "Pedir pelo WhatsApp" }).click();
  await expect(page.locator("#channels-dialog")).toBeVisible();
  await expect(page.locator(".channel-summary")).toContainText("2× O Original");
  await expect(page.locator("#channels-description")).toContainText(
    "demonstrativo",
  );
  await expect(page.locator("#channels-dialog a")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(page.locator("#channels-dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("mobile navigation supports keyboard and anchors", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page);
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await expect(page.locator("#mobile-nav a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .locator("#mobile-nav")
    .getByRole("link", { name: /O cardápio/ })
    .click();
  await expect(page).toHaveURL(/#cardapio$/);
  await expect(page.locator("#mobile-nav")).not.toBeVisible();
  await expect(page.locator("#cardapio")).toBeFocused();
  expect(
    await page.evaluate(() => document.body.classList.contains("menu-open")),
  ).toBe(false);
});

test("desktop smoother works with anchors, history and reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await open(page);
  await page.getByRole("link", { name: "Encontre seu burger" }).click();
  await expect(page).toHaveURL(/#cardapio$/);
  await expect
    .poll(async () => (await page.locator("#cardapio").boundingBox()).y)
    .toBeLessThan(100);
  await page.goBack();
  await expect
    .poll(async () => (await page.locator("#inicio").boundingBox()).y)
    .toBeGreaterThan(-20);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page
        .locator("#smooth-wrapper")
        .evaluate((el) => getComputedStyle(el).position),
    )
    .not.toBe("fixed");
});

test("page and dialog pass WCAG A/AA automated scan", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page);
  const scan = () =>
    new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
  expect((await scan()).violations).toEqual([]);
  await page
    .getByRole("button", { name: "Ver detalhes de O Original", exact: true })
    .click();
  expect((await scan()).violations).toEqual([]);
});
