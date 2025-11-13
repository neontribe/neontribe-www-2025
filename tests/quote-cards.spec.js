import { test, expect } from '@playwright/test';

test.describe('QuoteCards', () => {
  test('homepage displays QuoteCards dynamically from case study frontmatter', async ({ page }) => {
    await page.goto('/');
    
    const quoteCards = page.locator('.quote-card');
    const count = await quoteCards.count();
    
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(3);
    
    // Verify quote text has quotation marks
    const firstQuoteText = await quoteCards.first().locator('.quote-text').textContent();
    expect(firstQuoteText?.trim()).toMatch(/^[""].*[""]$/);
    
  
    await expect(quoteCards.first().locator('.customer-name')).toBeVisible();
    await expect(quoteCards.first().locator('.customer-organisation')).toBeVisible();
  });

  test('case study detail page displays QuoteCard when quote exists', async ({ page }) => {
    await page.goto('/case-studies/momo');
    
    const quoteCard = page.locator('.quote-card');
    await expect(quoteCard).toBeVisible();
    
    // Verify "Client say:" heading
    const heading = page.locator('h3.quote-section-heading');
    await expect(heading).toBeVisible();
    expect(await heading.textContent()).toMatch(/say:/);
    
    // Verify quote text has quotation marks
    const quoteText = await quoteCard.locator('.quote-text').textContent();
    expect(quoteText?.trim()).toMatch(/^[""].*[""]$/);
  });

  test('case study detail page hides QuoteCard when no quote exists', async ({ page }) => {
    await page.goto('/case-studies/infosecurity');
    
    const quoteCard = page.locator('.quote-card');
    const heading = page.locator('h3.quote-section-heading');
    
    expect(await quoteCard.count()).toBe(0);
    expect(await heading.count()).toBe(0);
  });
});
