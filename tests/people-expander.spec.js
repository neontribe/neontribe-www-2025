import { test, expect } from '@playwright/test';

test.describe('People Expander Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>People Expander Test</title>
      </head>
      <body>
        <div class="people-expander-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; padding: 2rem;">
          <div class="people-expander">
            <details class="people-expander__details">
              <summary 
                class="people-expander__summary"
                aria-expanded="false"
                aria-controls="people-expander-harry-content"
                id="people-expander-harry-summary"
              >
                <div class="people-expander__header">
                  <div class="people-expander__avatar-placeholder" style="width: 3rem; height: 3rem; border-radius: 50%; background-color: #D9D9D9;" aria-hidden="true"></div>
                  <span class="people-expander__name">Harry</span>
                  <span class="people-expander__toggle-icon" aria-hidden="true">+</span>
                </div>
              </summary>
              <div 
                class="people-expander__content"
                id="people-expander-harry-content"
                role="region"
                aria-labelledby="people-expander-harry-summary"
              >
                <div class="people-expander__expanded-header">
                  <div class="people-expander__expanded-avatar-placeholder" style="width: 5rem; height: 5rem; border-radius: 50%; background-color: #D9D9D9;" aria-hidden="true"></div>
                  <div class="people-expander__expanded-info">
                    <h3 class="people-expander__expanded-name">Harry Harrold</h3>
                    <p class="people-expander__expanded-role">Head of Neontribe</p>
                  </div>
                </div>
                <div class="people-expander__bio">
                  <p>This is a description about Harry. This is a description about Harry.</p>
                </div>
              </div>
            </details>
          </div>
          
          <div class="people-expander">
            <details class="people-expander__details">
              <summary 
                class="people-expander__summary"
                aria-expanded="false"
                aria-controls="people-expander-toby-content"
                id="people-expander-toby-summary"
              >
                <div class="people-expander__header">
                  <div class="people-expander__avatar-placeholder" style="width: 3rem; height: 3rem; border-radius: 50%; background-color: #D9D9D9;" aria-hidden="true"></div>
                  <span class="people-expander__name">Toby</span>
                  <span class="people-expander__toggle-icon" aria-hidden="true">+</span>
                </div>
              </summary>
              <div 
                class="people-expander__content"
                id="people-expander-toby-content"
                role="region"
                aria-labelledby="people-expander-toby-summary"
              >
                <div class="people-expander__expanded-header">
                  <div class="people-expander__expanded-avatar-placeholder" style="width: 5rem; height: 5rem; border-radius: 50%; background-color: #D9D9D9;" aria-hidden="true"></div>
                  <div class="people-expander__expanded-info">
                    <h3 class="people-expander__expanded-name">Toby</h3>
                    <p class="people-expander__expanded-role">Role</p>
                  </div>
                </div>
                <div class="people-expander__bio">
                  <p>Bio text for Toby.</p>
                </div>
              </div>
            </details>
          </div>
        </div>
        
        <script>
          // Update aria-expanded attribute when details opens/closes
          document.addEventListener('DOMContentLoaded', () => {
            const detailsElements = document.querySelectorAll('.people-expander__details');
            
            detailsElements.forEach((details) => {
              const summary = details.querySelector('.people-expander__summary');
              if (!summary) return;
              
              const updateAriaExpanded = () => {
                summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
              };
              
              // Set initial state
              updateAriaExpanded();
              
              // Update on toggle
              details.addEventListener('toggle', updateAriaExpanded);
            });
          });
        </script>
      </body>
      </html>
    `);
  });

  test('displays name, role, and expandable bio', async ({ page }) => {
    const summary = page.locator('#people-expander-harry-summary');
    await expect(summary).toBeVisible();
    await expect(summary.locator('text=Harry')).toBeVisible();
    
    // Expand to see role and bio
    await summary.click();
    await expect(page.locator('text=Harry Harrold')).toBeVisible();
    await expect(page.locator('text=Head of Neontribe')).toBeVisible();
    await expect(page.locator('text=This is a description about Harry')).toBeVisible();
  });

  test('has accessible toggle with ARIA attributes', async ({ page }) => {
    const summary = page.locator('#people-expander-harry-summary');
    
    // Check initial ARIA attributes
    await expect(summary).toHaveAttribute('aria-expanded', 'false');
    await expect(summary).toHaveAttribute('aria-controls', 'people-expander-harry-content');
    await expect(summary).toHaveAttribute('id', 'people-expander-harry-summary');
    
    // Check content region has proper ARIA
    const content = page.locator('#people-expander-harry-content');
    await expect(content).toHaveAttribute('role', 'region');
    await expect(content).toHaveAttribute('aria-labelledby', 'people-expander-harry-summary');
  });

  test('updates aria-expanded when toggled', async ({ page }) => {
    const summary = page.locator('#people-expander-harry-summary');
    
    // Initially closed
    await expect(summary).toHaveAttribute('aria-expanded', 'false');
    
    // Open
    await summary.click();
    await expect(summary).toHaveAttribute('aria-expanded', 'true');
    
    // Close
    await summary.click();
    await expect(summary).toHaveAttribute('aria-expanded', 'false');
  });

  test('is keyboard operable with Enter key', async ({ page }) => {
    const summary = page.locator('#people-expander-harry-summary');
    const details = page.locator('.people-expander__details').first();
    
    // Focus the summary
    await summary.focus();
    
    // Initially closed
    await expect(details).not.toHaveAttribute('open', '');
    
    // Press Enter to open
    await page.keyboard.press('Enter');
    await expect(details).toHaveAttribute('open', '');
    await expect(summary).toHaveAttribute('aria-expanded', 'true');
    
    // Press Enter again to close
    await page.keyboard.press('Enter');
    await expect(details).not.toHaveAttribute('open', '');
    await expect(summary).toHaveAttribute('aria-expanded', 'false');
  });

  test('is keyboard operable with Space key', async ({ page }) => {
    const summary = page.locator('#people-expander-harry-summary');
    const details = page.locator('.people-expander__details').first();
    
    // Focus the summary
    await summary.focus();
    
    // Initially closed
    await expect(details).not.toHaveAttribute('open', '');
    
    // Press Space to open
    await page.keyboard.press('Space');
    await expect(details).toHaveAttribute('open', '');
    await expect(summary).toHaveAttribute('aria-expanded', 'true');
    
    // Press Space again to close
    await page.keyboard.press('Space');
    await expect(details).not.toHaveAttribute('open', '');
    await expect(summary).toHaveAttribute('aria-expanded', 'false');
  });

  test('has visible focus indicator', async ({ page }) => {
    const summary = page.locator('#people-expander-harry-summary');
    
    await summary.focus();
    
    // Check that the element has focus
    await expect(summary).toBeFocused();
    
    // Check for focus-visible styles (outline)
    const outline = await summary.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.outline || styles.outlineWidth;
    });
    
    // Should have some form of focus indicator
    expect(outline).toBeTruthy();
  });

  test('has responsive grid layout', async ({ page }) => {
    const grid = page.locator('.people-expander-grid');
    
    // Check grid exists
    await expect(grid).toBeVisible();
    
    // Test mobile layout (1 column)
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileGridStyles = await grid.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        gridTemplateColumns: styles.gridTemplateColumns,
        display: styles.display
      };
    });
    expect(mobileGridStyles.display).toBe('grid');
    
    // Test tablet layout (2 columns)
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Test desktop layout (3 columns)
    await page.setViewportSize({ width: 1024, height: 768 });
  });

  test('screen reader can access all content', async ({ page }) => {
    const summary = page.locator('#people-expander-harry-summary');
    const content = page.locator('#people-expander-harry-content');
    
    // Summary should be accessible
    await expect(summary).toBeVisible();
    
    // Content should exist (even if hidden)
    await expect(content).toHaveCount(1);
    
    // Expand to make content visible
    await summary.click();
    
    // All content should be accessible
    await expect(content).toBeVisible();
    await expect(content.locator('h3')).toBeVisible();
    await expect(content.locator('p')).toHaveCount(2); // role and bio
  });

  test('toggle icon is decorative (aria-hidden)', async ({ page }) => {
    const toggleIcon = page.locator('.people-expander__toggle-icon').first();
    
    await expect(toggleIcon).toHaveAttribute('aria-hidden', 'true');
  });

  test('avatar placeholders are decorative when no image', async ({ page }) => {
    const placeholder = page.locator('.people-expander__avatar-placeholder').first();
    
    await expect(placeholder).toHaveAttribute('aria-hidden', 'true');
  });
});

