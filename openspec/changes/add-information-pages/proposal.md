## Why

The current site is a single homepage, so visitors cannot learn more about the farm and bakery, find practical ordering answers, or understand the online-store process without leaving the site. Adding a small set of intentionally designed information pages now establishes the site's long-term structure while allowing unfinished narrative copy to be added later.

## What Changes

- Add an About page with three ordered, clearly labeled sections: About the Farm, About the Bakery, and About Our Partners; use intentional placeholder treatment until final copy is supplied.
- Add a Contact Us page that makes `boldlove@boldlovefarm.com` directly usable and presents the supplied ordering, fulfillment, food-bank, and payment FAQs in an accessible, easy-to-scan format.
- Add a Products page with a product-range hero, a prominent route to the existing GrownBy online store, and the supplied step-by-step pickup, delivery, scheduling, cart, checkout, and offline-payment guidance.
- Add clear homepage navigation to About, Products, and Contact Us, plus consistent navigation from each new page back to the homepage and among the information pages.
- Extend the established Bold Love visual identity into reusable page structure that remains readable and usable on desktop and narrow mobile viewports.
- Keep all new content statically rendered with Astro, HTML, and CSS, without new frontend dependencies or application-owned client-side JavaScript.

## Capabilities

### New Capabilities

- `site-information-pages`: Defines the About, Contact Us, and Products routes, their required content and calls to action, shared navigation, responsive presentation, accessibility, and static generation.

### Modified Capabilities

- `astro-static-site`: Expands the homepage experience and generated-site verification to include navigation to the new information pages while preserving existing homepage behavior and integrations.

## Impact

- Adds Astro page templates under `src/pages/` and likely shared header/navigation components under `src/components/`.
- Updates the homepage template, shared layout metadata support, footer/navigation treatment, and global CSS.
- Extends build-output tests to cover all routes, internal and external destinations, required content, semantics, metadata, responsive structure, and preservation of existing homepage behavior.
- Reuses the existing GrownBy shop integration and local brand assets; no new dependencies, data stores, server runtime, deployment changes, or custom browser-side JavaScript are required.
