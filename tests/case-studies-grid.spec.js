import { test, expect } from '@playwright/test';

test.describe('Case Studies Grid Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/case-studies');
  });

  test('mobile: displays cards in single column layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const firstCard = page.locator('.case-study-card').first();
    const secondCard = page.locator('.case-study-card').nth(1);
    
    const firstBox = await firstCard.boundingBox();
    const secondBox = await secondCard.boundingBox();
    
    // Verify cards are stacked vertically
    expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height);
  });

  test('tablet: displays cards in two column layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const firstCard = page.locator('.case-study-card').first();
    const secondCard = page.locator('.case-study-card').nth(1);
    
    const firstBox = await firstCard.boundingBox();
    const secondBox = await secondCard.boundingBox();
    
    // Verify first two cards are in the same row
    expect(Math.abs(firstBox.y - secondBox.y)).toBeLessThan(10);
  });

  test('desktop: displays cards in three column layout', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    
    const firstCard = page.locator('.case-study-card').first();
    const secondCard = page.locator('.case-study-card').nth(1);
    const thirdCard = page.locator('.case-study-card').nth(2);
    
    const firstBox = await firstCard.boundingBox();
    const secondBox = await secondCard.boundingBox();
    const thirdBox = await thirdCard.boundingBox();
    
    // Verify first three cards are in the same row
    expect(Math.abs(firstBox.y - secondBox.y)).toBeLessThan(10);
    expect(Math.abs(secondBox.y - thirdBox.y)).toBeLessThan(10);
  });
});

