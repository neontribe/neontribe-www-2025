import { test, expect } from '@playwright/test';

test('case study markdown content renders correctly', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  await expect(page).toHaveTitle(/Helping Alexandra Rose Charity/);
  
  await expect(page.locator('h1')).toHaveText('Helping Alexandra Rose Charity support vulnerable families');
  
  // Verify that the markdown content is rendered
  await expect(page.locator('.markdown-content')).toBeVisible();
  
  // Check that the markdown content includes some expected text
  await expect(page.locator('.markdown-content')).toContainText('Introduction');
  await expect(page.locator('.markdown-content')).toContainText('Challenge');
  await expect(page.locator('.markdown-content')).toContainText('What we did');
});

test('case study page has proper layout structure', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('article')).toBeVisible();
  
  await expect(page.locator('h1')).toBeVisible();
  
  // Check that the content section is present
  await expect(page.locator('.markdown-content')).toBeVisible();
});

test('case study page uses correct meta tags', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  await expect(page).toHaveTitle(/Helping Alexandra Rose Charity support vulnerable families/);
  
  const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
  expect(metaDescription).toContain('The Alexandra Rose Charity needed to scale their service');
});

test('case study page renders hero image', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  // Check that hero image is present
  const heroImage = page.locator('img[alt*="Alexandra Rose Charity"]').first();
  await expect(heroImage).toBeVisible();
  
  const imageSrc = await heroImage.getAttribute('src');
  expect(imageSrc).toBeTruthy();
  
  const imageBox = await heroImage.boundingBox();
  expect(imageBox).toBeTruthy();
});
