import { test, expect } from "@playwright/test";

test.describe("Browse → Reminders → Subscribe flow", () => {
  test("homepage loads and shows key sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByText("Browse Reminders")).toBeVisible();
    await expect(page.getByText("Browse by Topic").or(page.getByText("Coming soon"))).toBeVisible();
  });

  test("navigation to reminders page works", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Browse Reminders");
    await expect(page).toHaveURL("/reminders");
    await expect(page.locator("h1")).toContainText("Reminders");
  });

  test("newsletter form is visible and accepts input", async ({ page }) => {
    await page.goto("/");
    // Scroll to the newsletter section
    await page.locator("#newsletter").scrollIntoViewIfNeeded();
    const emailInput = page.locator('input[name="email"]').first();
    await expect(emailInput).toBeVisible();
    await emailInput.fill("test@example.com");
    await expect(emailInput).toHaveValue("test@example.com");
  });

  test("search page is reachable and functional", async ({ page }) => {
    await page.goto("/search");
    await expect(page.locator("h1")).toContainText("Search");
    const searchInput = page.locator('input[type="search"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill("prayer");
  });

  test("topics page shows content", async ({ page }) => {
    await page.goto("/topics");
    await expect(page.locator("h1")).toContainText("Topics");
  });
});
