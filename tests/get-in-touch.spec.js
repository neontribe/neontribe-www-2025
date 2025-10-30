import { test, expect } from '@playwright/test';

test('Get in touch CTA links to Talk to us', async ({ page }) => {
  await page.goto('/');
  const cta = page.getByRole('link', { name: /talk to us/i });
  await expect(cta).toHaveAttribute('href', '/talk-to-us');
});


