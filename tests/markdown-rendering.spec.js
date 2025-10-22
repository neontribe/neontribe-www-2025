import { test, expect } from '@playwright/test';

test('case study markdown content renders correctly', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  await expect(page).toHaveTitle(/Helping Alexandra Rose Charity/);
  
  await expect(page.locator('h1.text-4xl')).toHaveText('Helping Alexandra Rose Charity support vulnerable families');
  
  await expect(page.locator('p.text-xl.text-gray-600')).toContainText('The Alexandra Rose Charity needed to scale their service');
  
  // Verify that the markdown content is rendered (not just the frontmatter)
  await expect(page.locator('.prose')).toBeVisible();
  
  // Check that the markdown content includes some expected text
  await expect(page.locator('.prose')).toContainText('Introduction');
  await expect(page.locator('.prose')).toContainText('The Challenge');
  await expect(page.locator('.prose')).toContainText('What We Did');
});

test('case study page has proper layout structure', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  
  await expect(page.locator('main.container')).toBeVisible();
  await expect(page.locator('article.max-w-4xl')).toBeVisible();
  

  await expect(page.locator('header.mb-8')).toBeVisible();
  await expect(page.locator('h1.text-4xl')).toBeVisible();
  await expect(page.locator('p.text-xl.text-gray-600')).toBeVisible();
  
  // Check that the content section is present
  await expect(page.locator('div.prose.prose-lg')).toBeVisible();
});

test('case study page uses correct meta tags', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  await expect(page).toHaveTitle(/Helping Alexandra Rose Charity support vulnerable families/);
  
  const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
  expect(metaDescription).toContain('The Alexandra Rose Charity needed to scale their service');
});
