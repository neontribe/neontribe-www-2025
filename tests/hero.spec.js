import { test, expect } from '@playwright/test';

test('Hero section displays on homepage', async ({ page }) => {
  await page.goto('/');

  const heroHeading = page.getByRole('heading', { name: /We produce digital tools that help charities do more good/i });
  await expect(heroHeading).toBeVisible();
});

