import { test, expect } from '@playwright/test';

test.describe('People Expander Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/how-we-work');
  });

  test('displays team member names in collapsed state', async ({ page }) => {
    await expect(page.locator('.people-expander__name:has-text("Harry")')).toBeVisible();
    await expect(page.locator('.people-expander__name:has-text("Toby")')).toBeVisible();
    await expect(page.locator('.people-expander__name:has-text("Neil")')).toBeVisible();
  });

  test('expands to show bio when clicked', async ({ page }) => {
    const harryButton = page.locator('button.people-expander__button:has-text("Harry")').first();
    
    // Click to expand
    await harryButton.click();
    
    // Check expanded content is visible
    const expandedCard = page.locator('.people-expander__expanded-card[aria-hidden="false"]');
    await expect(expandedCard).toBeVisible();
    await expect(expandedCard.locator('.people-expander__bio')).toBeVisible();
  });

  test('closes when close button is clicked', async ({ page }) => {
    const harryButton = page.locator('button.people-expander__button:has-text("Harry")').first();
    
    // Open
    await harryButton.click();
    await expect(page.locator('.people-expander__expanded-card[aria-hidden="false"]')).toBeVisible();
    
    // Close
    const closeButton = page.locator('button.people-expander__close-button[aria-label="Close"]').first();
    await closeButton.click();
    await expect(page.locator('.people-expander__expanded-card[aria-hidden="false"]')).not.toBeVisible();
  });

  test('Talk to us button appears after team profiles on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/how-we-work');
    
    // Mobile button should be visible
    const mobileButton = page.locator('.who-youll-be-working-with-button-mobile');
    await expect(mobileButton).toBeVisible();
    
    // Desktop button should be hidden
    const desktopButton = page.locator('.who-youll-be-working-with-button-desktop');
    await expect(desktopButton).not.toBeVisible();
  });

  test('Talk to us button appears in left column on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/how-we-work');
    
    // Desktop button should be visible
    const desktopButton = page.locator('.who-youll-be-working-with-button-desktop');
    await expect(desktopButton).toBeVisible();
    
    // Mobile button should be hidden
    const mobileButton = page.locator('.who-youll-be-working-with-button-mobile');
    await expect(mobileButton).not.toBeVisible();
  });
});
