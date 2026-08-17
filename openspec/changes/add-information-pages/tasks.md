## 1. Establish the Shared Site Structure

- [x] 1.1 Run the current production build and tests, then capture desktop and narrow-mobile homepage baselines before changing shared markup or styles.
- [x] 1.2 Extend `BaseLayout.astro` with simple page-title and description props while preserving the current homepage defaults, favicon, language, viewport, stylesheet, and Mailchimp loader.
- [x] 1.3 Add a compact `SiteHeader.astro` with Home, About, Products, and Contact Us links, visible focus treatment, and a simple current-page prop that renders `aria-current="page"`.
- [x] 1.4 Add the shared header to the homepage and verify that its existing product message, logo, GrownBy actions, story, footer, and responsive hierarchy remain intact.

## 2. Build and Style the Information Pages

- [x] 2.1 Add shared content-page shell styles for a top-aligned cream panel, readable content width, headings, links, calls to action, navigation wrapping, footer spacing, and narrow-viewport behavior.
- [x] 2.2 Create `/about/` with page-specific metadata, the “About Bold Love” heading, and intentional placeholder treatments for About the Farm, About the Bakery, and About Our Partners in the required order.
- [x] 2.3 Create `/contact/` with page-specific metadata, the linked `boldlove@boldlovefarm.com` address, and visibly expanded semantic FAQ groups containing the required hours placeholder, Products link, fulfillment schedules, Mount Airy Net support statement, and payment guidance.
- [x] 2.4 Create `/products/` with page-specific metadata, the product-range hero, prominent protected GrownBy store link, seven-step native ordered guide, nested pickup/delivery/scheduling/payment choices, exact Venmo and Zelle details, and the offline billing-address note.
- [x] 2.5 Refine page-specific About, FAQ, and Products styles so placeholders look intentional, questions and answers scan clearly, numbered steps remain easy to follow, and long text does not create horizontal overflow.

## 3. Verify Generated Behavior

- [x] 3.1 Extend generated-output tests to load `/about/`, `/contact/`, and `/products/` and verify each route's document title, single primary heading, core landmarks, internal navigation destinations, and current-page semantics.
- [x] 3.2 Add exact generated-content assertions for the About section order, email link, FAQ facts and Products link, product hero, pickup/delivery schedule, GrownBy destination and new-tab protections, payment identifiers, and offline billing-address disclosure.
- [x] 3.3 Update homepage assertions for the three new local navigation links while retaining all existing homepage copy, shop URL, Mailchimp, asset, metadata, and custom-domain coverage.
- [x] 3.4 Run the complete production build and automated test suite and correct any route, content, asset, integration, or regression failures.

## 4. Complete Responsive and Accessibility Review

- [x] 4.1 Render the homepage and all three information pages at representative desktop and narrow-mobile sizes and check visual hierarchy, readable line length, navigation wrapping, CTA prominence, and footer consistency.
- [x] 4.2 Check keyboard traversal, visible focus, current-page indication, heading order, link purpose, touch-target usability, and absence of horizontal overflow across all four routes.
- [x] 4.3 Confirm the final implementation added no dependency or application-owned client-side JavaScript, and record the About narratives and business hours as intentional copy follow-ups rather than incomplete implementation work.

## 5. Refine Navigation After Review

- [x] 5.1 Reduce the shared header’s visual weight while preserving clear current-page and keyboard-focus states.
- [x] 5.2 Re-run automated tests and compare the quieter navigation at desktop and narrow-mobile sizes.

## 6. Reposition Homepage Navigation After Review

- [x] 6.1 Remove the branded header from the top of the homepage and place a navigation-only variation directly beneath the product summary.
- [x] 6.2 Re-run automated tests and review the new homepage navigation position at desktop and narrow-mobile sizes.

## 7. Align Homepage Navigation After Review

- [x] 7.1 Right-align the homepage navigation beneath the product summary at desktop and narrow-mobile sizes.
- [x] 7.2 Re-run automated tests and confirm the right-aligned navigation remains readable without horizontal overflow.

## 8. Rebalance the Homepage Identity Row After Review

- [x] 8.1 Give the homepage name the full right two-thirds of the desktop logo-and-name row while preserving the stacked narrow layout.
- [x] 8.2 Re-run automated tests and visually review the revised identity balance at desktop and narrow-mobile sizes.

## 9. Use the Real Logo in Information-Page Headers

- [x] 9.1 Replace the invented compact brand badge with a small rendering of the existing Bold Love logo while preserving the accessible home link.
- [x] 9.2 Extend generated-output coverage and visually review the real-logo header at desktop and narrow-mobile sizes.

## 10. Simplify the Information-Page Brand Link

- [x] 10.1 Remove the redundant “Bold Love” copy beside the compact header logo while preserving its accessible home-link label and touch target.
- [x] 10.2 Update generated-output coverage and verify the logo-only header layout.

## 11. Increase the Information-Page Header Logo Size

- [x] 11.1 Increase the logo-only header link and image to 56 pixels so the real logo is easier to recognize.
- [x] 11.2 Re-run automated tests and visually verify the larger logo at desktop and narrow-mobile sizes.

## 12. Rebalance the Information-Page Header Logo

- [x] 12.1 Increase the logo-only header link and image to 80 pixels so it visually balances the navigation.
- [x] 12.2 Re-run automated tests and visually compare the rebalanced header at desktop and narrow-mobile sizes.

## 13. Simplify the Products Introduction

- [x] 13.1 Remove the “What’s in the shop” eyebrow from the Products page and guard its absence in generated output.

## 14. Simplify the Products Order Guide Heading

- [x] 14.1 Remove the “From cart to kitchen” eyebrow from the Products page and guard its absence in generated output.

## 15. Expand the Products Summary

- [x] 15.1 Remove the Products introduction and product-summary width limits so the product-range copy uses the full available content width.
- [x] 15.2 Re-run automated tests and visually verify the expanded summary at desktop and narrow-mobile sizes.
