import { test, expect } from '@playwright/test';

test('case study markdown content renders correctly', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  await expect(page).toHaveTitle(/Helping Alexandra Rose Charity/);
  
  // Use getByRole to find the main heading
  await expect(page.getByRole('heading', { name: 'Helping Alexandra Rose Charity support vulnerable families' })).toBeVisible();
  
  // Verify that the markdown content is rendered
  await expect(page.locator('.markdown-content')).toBeVisible();
  
  // Check that the markdown content includes some expected text
  await expect(page.locator('.markdown-content')).toContainText('Challenge');
  await expect(page.locator('.markdown-content')).toContainText('What we did');
});

test('case study page has proper layout structure', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  await expect(page.locator('main')).toBeVisible();
  
  // Use getByRole to find the main heading
  await expect(page.getByRole('heading', { name: 'Helping Alexandra Rose Charity support vulnerable families' })).toBeVisible();
  
  // Check that the content section is present
  await expect(page.locator('.markdown-content')).toBeVisible();
});

test('case study page uses correct meta tags', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  await expect(page).toHaveTitle(/Helping Alexandra Rose Charity support vulnerable families/);
  
  const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
  expect(metaDescription).toContain('Scaling a voucher service');
});

test('case study page renders hero image', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  // Check that hero image is present (may be hidden on mobile, so check if it exists)
  const heroImage = page.locator('img[alt*="Alexandra Rose Charity"]').first();
  const imageCount = await heroImage.count();
  expect(imageCount).toBeGreaterThan(0);
  
  const imageSrc = await heroImage.getAttribute('src');
  expect(imageSrc).toBeTruthy();
});
