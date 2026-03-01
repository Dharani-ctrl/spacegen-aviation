# Content Integration & Testing Process

This document outlines the standard operating procedure (SOP) for integrating new content (text, images, videos) into the SpaceGen Aviation Research & Development (SARD) website and testing it to ensure a high-quality, error-free user experience.

## 1. Content Integration Workflow

Whenever new content is provided (e.g., from a brochure, marketing team, or client feedback), follow these steps:

### A. Asset Preparation
1. **Images/Videos:** Ensure all media files are optimized for the web. Place local assets directly into the `/public` directory.
2. **Naming Convention:** Use clear, descriptive names for assets (e.g., `hero-flight-sim.jpg` instead of `img1.jpg`).
3. **External Assets:** If using external URLs (like Unsplash), ensure the links are reliable and won't expire.

### B. Component Update
1. Open the relevant React component (e.g., `/components/sections/hero-space.tsx`).
2. Update the text strings, ensuring terminology matches the official SARD branding (e.g., using "SARD" instead of "SARDC").
3. Update image `src` paths and `alt` attributes. **Always provide descriptive `alt` text** for accessibility and SEO.

## 2. Manual Testing Checklist

Before committing any content changes, perform the following manual checks:

- [ ] **Content Accuracy:** Does the text exactly match the provided copy (e.g., the official brochure)? Are there any typographical errors?
- [ ] **Asset Loading:** Do all images and videos load correctly? Are there any broken image icons or `404` errors in the browser console?
- [ ] **Responsive Design:** 
  - Does the content look good on **Mobile** (375px)?
  - Does it look good on **Tablet** (768px)?
  - Does it look good on **Desktop** (1024px+)?
- [ ] **Theme Consistency:** Do the colors, gradients, and typography match the "Modern Light Theme" and aerospace aesthetic?
- [ ] **Link Verification:** Click all newly added links and buttons to ensure they route to the correct pages or external sites.

## 3. Automated Testing (Next Steps)

To ensure long-term stability as the website grows, we recommend implementing an automated testing suite. 

### Recommended Tools:
* **Playwright or Cypress:** For End-to-End (E2E) testing. These tools can automatically click through the website, take screenshots, and verify that critical content (like the "SARD" logo and Hero text) is visible on the screen.
* **Jest + React Testing Library:** For unit testing individual React components to ensure they render the correct props.

### Example Automated Content Test (Playwright)
Once Playwright is installed, a basic content test would look like this:
```javascript
test('homepage has correct SARD branding', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Check for the updated logo text
  await expect(page.locator('text="SPACEGEN AVIATION RESEARCH & DEVELOPMENT"')).toBeVisible();
  // Ensure there are no broken images
  const brokenImages = await page.evaluate(() => {
    return Array.from(document.images).filter(img => img.naturalWidth === 0).length;
  });
  expect(brokenImages).toBe(0);
});
```

## 4. Deployment Gate

Content should only be merged to the `main` branch and deployed to production *after* the Manual Testing Checklist has been completed.
