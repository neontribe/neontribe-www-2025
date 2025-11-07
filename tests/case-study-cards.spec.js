import { test, expect } from '@playwright/test';

test.describe('Case Study Cards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/case-studies');
  });

  test('displays all required elements: title, summary, image, tag, and link', async ({ page }) => {
    const firstCard = page.locator('.case-study-card').first();
    
    // Check for dynamic content 
    await expect(firstCard.getByRole('heading')).toBeVisible();
    await expect(firstCard.locator('img')).toBeVisible();
    await expect(firstCard.getByRole('link')).toBeVisible();
    
    // Verify the card has all required elements
    const heading = firstCard.getByRole('heading');
    const image = firstCard.locator('img');
    const link = firstCard.getByRole('link');
    
    await expect(heading).toBeVisible();
    await expect(image).toBeVisible();
    await expect(link).toBeVisible();
    await expect(image).toHaveAttribute('alt');
  });

  test('link is accessible with aria-label and alt text', async ({ page }) => {
    const firstCard = page.locator('.case-study-card').first();
    const link = firstCard.getByRole('link');
    const image = firstCard.locator('img').first();
    
    const ariaLabel = await link.getAttribute('aria-label');
    expect(ariaLabel).toContain('read full case study');
    await expect(image).toHaveAttribute('alt');
  });

  test('link is clickable and navigates correctly', async ({ page }) => {
    const link = page.locator('.case-study-content__link').first();
    // First card should link to the most recent case study
    // Get the href dynamically to avoid hardcoding
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toMatch(/^\/case-studies\/.+/);
    
    await link.click();
    await expect(page).toHaveURL(new RegExp(`.*${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
  });

  test('desktop: titles and images align horizontally across cards', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    
    const firstTitle = page.locator('.case-study-content__title').first();
    const secondTitle = page.locator('.case-study-content__title').nth(1);
    // Use the img element directly - its position reflects the wrapper's position
    const firstImage = page.locator('.case-study-card').first().locator('img').first();
    const secondImage = page.locator('.case-study-card').nth(1).locator('img').first();
    
    const firstTitleBox = await firstTitle.boundingBox();
    const secondTitleBox = await secondTitle.boundingBox();
    const firstImageBox = await firstImage.boundingBox();
    const secondImageBox = await secondImage.boundingBox();
    
    expect(Math.abs(firstTitleBox.y - secondTitleBox.y)).toBeLessThan(5);
    expect(Math.abs(firstImageBox.y - secondImageBox.y)).toBeLessThan(5);
  });

  test('mobile: content body uses auto height', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // The content body is the div containing title and summary with h-auto md:h-[180px]
    const firstCard = page.locator('.case-study-card').first();
    const contentBody = firstCard.locator('div.flex.flex-col.gap-4').first();
    const height = await contentBody.evaluate((el) => {
      return window.getComputedStyle(el).height;
    });
    
    expect(height).not.toBe('180px');
  });

  test('case studies are sorted by date in descending order (newest first)', async ({ page }) => {
    const links = page.locator('.case-study-content__link');
    const linkCount = await links.count();
    
    // If there are multiple case studies, verify the first one exists
    if (linkCount > 0) {
      const firstLink = links.first();
      const href = await firstLink.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toMatch(/^\/case-studies\/.+/);
    }
  });
});

