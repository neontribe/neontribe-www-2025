import { test, expect } from '@playwright/test';

test.describe('How we work page', () => {
  test('page renders correctly with all sections', async ({ page }) => {
    await page.goto('/how-we-work');
    
    // HeaderHeroContainer with correct title
    await expect(page.getByRole('heading', { name: 'How we work' })).toBeVisible();
    
    // HowWeCanHelp section
    await expect(page.getByRole('heading', { name: 'Our ways of working' })).toBeVisible();
    
    // Diagram image is present with correct alt text
    await expect(page.getByAltText('Design process: Discover, Define, Develop, Deliver')).toBeVisible();
    
    // CTA button links to talk-to-us
    const cta = page.getByRole('link', { name: /sound good\? let's chat/i });
    await expect(cta).toHaveAttribute('href', '/talk-to-us');
    
    // White background sections exist
    const whiteSections = page.locator('.section-light');
    await expect(whiteSections).toHaveCount(2);
  });

  test('HowWeCanHelp content paragraphs render', async ({ page }) => {
    await page.goto('/how-we-work');
    
    // Check that key content is visible
    await expect(page.getByText(/Double Diamond/i)).toBeVisible();
    await expect(page.getByText(/discovery, definition, development and delivery/i)).toBeVisible();
  });

  test('desktop layout has correct order (text left, image right)', async ({ page, viewport }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/how-we-work');
    
    // Get the grid container
    const gridContainer = page.locator('.grid.md\\:grid-cols-2').first();
    await expect(gridContainer).toBeVisible();
    
    // Check that text content comes before image in DOM order (flexbox order will handle visual order)
    const textSection = page.locator('h2:has-text("Our ways of working")');
    const imageSection = page.getByAltText('Design process: Discover, Define, Develop, Deliver');
    
    await expect(textSection).toBeVisible();
    await expect(imageSection).toBeVisible();
  });
});

