## Context

See `proposal.md` for motivation and the two delta specs for observable behavior. The site is currently a small Astro 7 static project with one page, one layout, one footer component, one global stylesheet, and generated-HTML tests. The homepage already establishes a warm cream panel over farm imagery with black, gold, serif, and rounded visual treatments. An active `refresh-homepage-messaging` change touches the same homepage and stylesheet, and its implemented state is the baseline this change must preserve.

The new pages contain very different content shapes: three short future narrative sections, a practical FAQ, and a long ordered purchasing guide. The implementation therefore needs a shared shell and visual vocabulary without hiding each page's straightforward HTML behind a generalized content system. The project remains static and intentionally uses no application-owned browser-side JavaScript.

## Goals / Non-Goals

**Goals:**

- Establish a simple shared header/navigation pattern that fits the existing homepage and all future content pages.
- Give each new page a deliberate composition suited to its content while making the pages feel like one site.
- Keep source templates explicit enough that final About and hours copy can be replaced directly by a Rails-oriented maintainer with limited JavaScript experience.
- Preserve semantic document structure, keyboard behavior, readable line lengths, and responsive layout using Astro, HTML, and CSS.
- Extend the existing generated-output test style to guard routes, content, links, metadata, and inherited homepage behavior.

**Non-Goals:**

- Building a CMS, Markdown content collection, data-driven page builder, or reusable FAQ/order-step schema.
- Inventing final About narratives or final business hours.
- Adding FAQ accordions, mobile-menu behavior, animation, a frontend framework, or a new dependency.
- Changing the GrownBy ordering system, Mailchimp configuration, deployment workflow, brand assets, or custom-domain behavior.
- Publishing the work to production as part of this change.

## Decisions

### Use shared navigation with page-appropriate branding and explicit page templates

Add a `SiteHeader.astro` component that renders normal HTML navigation links for Home, About, Products, and Contact Us. On information pages it also renders a logo-only brand link using a visually substantial 80-pixel version of the existing Bold Love logo rather than a separate invented badge or redundant adjacent brand copy. On the homepage, where the large logo and business name already establish the brand, render only the navigation, right-aligned directly beneath the product summary. Pass the current route as a simple string prop so the matching link can receive both visible current-page styling and `aria-current="page"`.

Keep the page bodies in `about.astro`, `contact.astro`, and `products.astro`. Each page has enough unique hierarchy that extracting content into arrays or a generalized renderer would make routine copy edits less direct.

Alternative considered: repeat the compact brand treatment at the top of the homepage. That duplicates the prominent hero identity and makes the navigation compete with the product message. A navigation-only variation retains the shared link behavior without adding another logo treatment.

On desktop, balance the homepage identity row as a one-third/two-thirds grid: the existing logo occupies the left third and the full business name uses the right two-thirds without the earlier narrow heading-width constraint. Retain the established stacked treatment below the desktop breakpoint.

### Extend the layout with plain metadata props

Give `BaseLayout.astro` simple optional `title` and `description` props, retaining the current Bold Love title as the homepage default. Each information page supplies a title in the form “Page Name | Bold Love Farm & Bakery” plus a concise description. Keep the existing global language, viewport, favicon, stylesheet, and Mailchimp integration intact.

Alternative considered: repeat `<head>` markup in every route. That invites metadata and integration drift as the site grows.

### Use a shared content-page shell but page-specific compositions

Reuse the existing background and panel tokens. Information pages use a wider, top-aligned content shell rather than vertically centering long pages. The shared hierarchy is: compact site header, page introduction, main content, and existing footer.

- About uses an editorial introduction followed by three ordered visual sections. Each section has its real heading and a restrained “story coming soon” message, making incompleteness look intentional rather than like missing content.
- Contact Us places the email in a prominent callout and renders the FAQ as visible question-and-answer groups. Answers stay expanded; semantic headings or a description list provide structure without an accordion.
- Products uses a strong full-width product-range hero that begins directly with the “Products” heading, an early GrownBy CTA, and a numbered order guide introduced directly by its “How to order” heading. The product-range summary uses the entire available content width rather than the narrower general introduction measure. Native ordered and nested lists preserve meaning, while CSS counters/card-like groupings can improve scanning. The offline billing-address quirk appears in a visually distinct note close to checkout guidance.

Alternative considered: give every page an identical grid of cards. The FAQ and sequential order guide need different reading patterns, and forcing them into one layout would weaken hierarchy.

### Keep all navigation visible without a scripted mobile menu

Let the short navigation list wrap cleanly within the panel at smaller widths, with generous touch targets and visible focus states. Do not add a hamburger menu. Four local destinations fit comfortably and remaining visible improves discoverability.

Alternative considered: collapse navigation behind a menu button on mobile. That adds JavaScript, state, and accessibility obligations for little space benefit.

### Normalize obvious copy errors without changing meaning

Render “About Our Partners,” pluralize “product” in the Products hero, and correct instructional typos. Interpret “Gym” as Blue Crab Fitness (Lisbon), because the Products pickup list supplies that proper name and location. Preserve supplied business facts, schedule details, account identifiers, phone number, food-bank wording, and the intentionally temporary hours answer.

Alternative considered: reproduce every typo and shorthand exactly. That would make the initial pages look unfinished in places unrelated to the deliberately deferred copy.

### Verify generated behavior and responsive presentation in two layers

Extend the current Node test file to load the three generated documents and assert route output, one `h1` per page, page-specific titles, required text, internal destinations, email link, store URL protections, current-page semantics, and preservation of homepage content and integrations. Then render representative desktop and narrow-mobile views for all four routes to inspect wrapping, content rhythm, focus treatment, CTA prominence, and horizontal overflow.

Alternative considered: rely only on source inspection. Generated HTML catches Astro/template mistakes, while visual review catches layout failures that string assertions cannot.

## Risks / Trade-offs

- [The temporary “blah, blah, blah” hours answer could be mistaken for final copy] → Style it as an explicit temporary-answer treatment and keep replacement as a clearly named task/documented follow-up.
- [Long Products content becomes visually exhausting] → Use a readable maximum line length, native ordered hierarchy, spacing between steps, and a distinct checkout note without hiding content.
- [The About page feels empty before final copy exists] → Use finished headings, intentional spacing, and short honest placeholder messages rather than large empty containers or fabricated prose.
- [Shared navigation disrupts the carefully balanced homepage hero] → Keep the header compact, place it at the top of the existing panel, and verify against the current desktop and mobile homepage before adjusting unrelated hero rules.
- [The active homepage change and this change overlap in `index.astro`, `global.css`, and tests] → Treat the current implemented homepage as the baseline, make additive edits around its classes, and rerun all existing assertions rather than replacing them wholesale.
- [Payment identifiers are sensitive to transcription errors] → Store them as direct page text and assert their exact generated values in tests.
- [A single global stylesheet grows as pages are added] → Group rules by shared shell and page type with clear class names; defer stylesheet splitting until the site has enough independent sections to justify it.

## Migration Plan

1. Confirm the current homepage change is present and the existing build/tests pass; capture desktop and narrow-mobile homepage baselines.
2. Add metadata support and the shared header, then integrate navigation into the homepage without changing its content hierarchy or external shop actions.
3. Add the three explicit page templates and shared content-page CSS, followed by page-specific About, FAQ, and Products rules.
4. Extend generated-output tests and run the complete production build/test workflow.
5. Render all four routes at representative desktop and narrow-mobile sizes, correct any overflow or hierarchy issues, and retain screenshots as implementation evidence rather than production assets.

Rollback: remove the three routes and shared header, revert the layout metadata and homepage navigation additions, and remove only the new CSS and test assertions. No data or external-system migration is involved.

## Open Questions

- Final narrative copy for the three About sections can replace the placeholders later without changing route structure or layout.
- Final hours can replace the explicit temporary FAQ answer later without changing FAQ semantics or navigation.
