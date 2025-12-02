import { test, expect } from '@playwright/test';

test('Footer displays all elements', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer.section.section-dark');
  
  await expect(footer).toBeVisible();
  await expect(footer.getByRole('link', { name: /Go to homepage/i })).toBeVisible();
  await expect(footer.getByRole('link', { name: /Neontribe Ltd/i })).toBeVisible();
  await expect(footer.getByRole('link', { name: /^blog$/i })).toHaveAttribute('href', '/blog');
  await expect(footer.getByRole('link', { name: /privacy policy/i })).toBeVisible();
});

test('Footer responsive layout', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer.section.section-dark');
  const container = footer.locator('div').first();
  
  // Mobile: vertical layout
  await page.setViewportSize({ width: 375, height: 667 });
  await page.reload();
  const mobileLayout = await container.evaluate((el) => window.getComputedStyle(el).flexDirection);
  expect(mobileLayout).toBe('column');
  
  // Desktop: horizontal layout
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.reload();
  const desktopLayout = await container.evaluate((el) => window.getComputedStyle(el).flexDirection);
  expect(desktopLayout).toBe('row');
});

