import { test, expect } from '@playwright/test';

test('Get in touch CTA links to Talk to us', async ({ page }) => {
  await page.goto('/');
  // Get the link from GetInTouch section specifically (not header)
  const getInTouchSection = page.getByRole('heading', { name: /Get in touch/i }).locator('..');
  const cta = getInTouchSection.getByRole('link', { name: /talk to us|get in touch/i }).first();
  await expect(cta).toHaveAttribute('href', '/talk-to-us');
});


