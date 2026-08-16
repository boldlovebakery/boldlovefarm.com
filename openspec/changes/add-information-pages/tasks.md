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
