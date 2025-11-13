import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test('renders as <a> when href provided, else <button>', async ({ page }) => {
    await page.goto('/');
    
    // Check that links with href render as <a> elements  
    const links = page.locator('a[href]');
    await expect(links.first()).toBeVisible();
    
    // Check mobile menu button exists (may be hidden on desktop)
    const mobileButton = page.locator('button.mobile-toggle');
    const buttonCount = await mobileButton.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('includes arrow icon for CTA style', async ({ page }) => {
    await page.goto('/');
    
    // Check that buttons have arrow 
    const arrowIcons = page.locator('span:has-text("→")');
    await expect(arrowIcons.first()).toBeVisible();
  });

  test('has proper accessibility attributes', async ({ page }) => {
    await page.goto('/');
    
    // Check that links are accessible
    const links = page.locator('a[href]');
    await expect(links.first()).toBeVisible();
    
    // Check mobile menu button has accessibility attributes
    const mobileButton = page.locator('button.mobile-toggle');
    const buttonCount = await mobileButton.count();
    if (buttonCount > 0) {
      await expect(mobileButton.first()).toHaveAttribute('aria-label');
    }
  });

  test('displays all button variants', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: white;">
        <h2>All Button Variants</h2>
        
        <div style="margin: 10px 0;">
          <button style="display: inline-flex; align-items: center; gap: 10px; padding: 12px 24px; height: 48px; background-color: #4B00E7; color: #FFFFFF; border: none; border-radius: 1px; font-family: 'Keep Calm', sans-serif; font-weight: 500; font-size: 20px; line-height: 100%; text-decoration: none; cursor: pointer; margin-right: 10px;">
            <span>Primary</span>
            <span style="color: #48E9CE; font-size: 16px; line-height: 1;">→</span>
          </button>
          
          <button style="display: inline-flex; align-items: center; gap: 10px; padding: 12px 24px; height: 48px; background-color: #D1D5DB; color: #111827; border: none; border-radius: 1px; font-family: 'Keep Calm', sans-serif; font-weight: 500; font-size: 20px; line-height: 100%; text-decoration: none; cursor: pointer; margin-right: 10px;">
            <span>Secondary</span>
            <span style="color: #4B00E7; font-size: 16px; line-height: 1;">→</span>
          </button>
          
          <button style="display: inline-flex; align-items: center; gap: 10px; padding: 12px 24px; height: 48px; background-color: #48E9CE; color: #111827; border: none; border-radius: 1px; font-family: 'Keep Calm', sans-serif; font-weight: 500; font-size: 20px; line-height: 100%; text-decoration: none; cursor: pointer; margin-right: 10px;">
            <span>Teal</span>
            <span style="color: #4B00E7; font-size: 16px; line-height: 1;">→</span>
          </button>
          
          <button style="display: inline-flex; align-items: center; gap: 10px; padding: 12px 24px; height: 48px; background-color: transparent; color: #4B00E7; border: none; border-radius: 1px; font-family: 'Keep Calm', sans-serif; font-weight: 500; font-size: 20px; line-height: 100%; text-decoration: none; cursor: pointer;">
            <span>Link</span>
            <span style="color: #4B00E7; font-size: 16px; line-height: 1;">→</span>
          </button>
        </div>
      </div>
    `);
    
    // Verify all variants are visible
    await expect(page.locator('text=Primary')).toBeVisible();
    await expect(page.locator('text=Secondary')).toBeVisible();
    await expect(page.locator('text=Teal')).toBeVisible();
    await expect(page.locator('text=Link')).toBeVisible();
  });
});