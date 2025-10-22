import { test, expect } from '@playwright/test';

test('case study markdown content renders correctly', async ({ page }) => {
  // Navigate to the ARC case study page
  await page.goto('/case-studies/arc');
  
  // Check that the page loads successfully
  await expect(page).toHaveTitle(/Helping Alexandra Rose Charity/);
  
  // Verify the frontmatter data is displayed
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Helping Alexandra Rose Charity support vulnerable families');
  
  // Check that the description from frontmatter is shown
  await expect(page.locator('p.text-xl.text-gray-600')).toContainText('The Alexandra Rose Charity needed to scale their service');
  
  // Verify that the markdown content is rendered (not just the frontmatter)
  // The markdown content should be in the prose section
  await expect(page.locator('.prose')).toBeVisible();
  
  // Check that the markdown content includes some expected text
  // (This would be the actual markdown body content)
  await expect(page.locator('.prose')).toContainText('Introduction');
  await expect(page.locator('.prose')).toContainText('The Challenge');
  await expect(page.locator('.prose')).toContainText('What We Did');
});

test('case study page has proper layout structure', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  // Check that the main layout components are present
  await expect(page.locator('main.container')).toBeVisible();
  await expect(page.locator('article.max-w-4xl')).toBeVisible();
  
  // Verify the header section with title and description
  await expect(page.locator('header.mb-8')).toBeVisible();
  await expect(page.locator('h1.text-4xl')).toBeVisible();
  await expect(page.locator('p.text-xl.text-gray-600')).toBeVisible();
  
  // Check that the content section is present
  await expect(page.locator('div.prose.prose-lg')).toBeVisible();
});

test('case study page uses correct meta tags', async ({ page }) => {
  await page.goto('/case-studies/arc');
  
  // Check that the page title includes the case study title
  await expect(page).toHaveTitle(/Helping Alexandra Rose Charity support vulnerable families/);
  
  // Verify the meta description is set correctly
  const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
  expect(metaDescription).toContain('The Alexandra Rose Charity needed to scale their service');
});
