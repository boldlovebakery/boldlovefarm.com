## 1. Content Foundation

- [ ] 1.1 Add the official `@astrojs/rss` dependency, set Astro's `site` origin to `https://boldlovefarm.com`, and verify a clean dependency install and production build succeed.
- [ ] 1.2 Define the local Markdown `blog` content collection with required title, description, publication date, and explicit draft metadata plus optional updated date and accessible feature image metadata; verify a valid draft is accepted and a controlled invalid entry produces an actionable build error.
- [ ] 1.3 Add one plainly named helper for environment-aware draft filtering and newest-first sorting, and verify production excludes a known draft while local development returns it with its draft state intact.
- [ ] 1.4 Add a non-published post template or documented draft example with the complete frontmatter shape, and verify authors can copy it without creating a production article route.

## 2. Canonical Metadata and Shared Navigation

- [ ] 2.1 Extend the shared base layout with absolute `boldlovefarm.com` canonical URLs, RSS auto-discovery, and optional article/social metadata, and verify generated metadata on the homepage and all existing information pages.
- [ ] 2.2 Add Blog to the shared primary navigation and current-section handling, and verify Home, About, Blog, Products, and Contact Us remain keyboard operable and fit without horizontal overflow at desktop and narrow widths.

## 3. Blog Pages and Presentation

- [ ] 3.1 Build the `/blog/` index with newest-first summaries, optional optimized feature images, links to articles, draft labels in development, and an intentional empty state; verify the production index excludes drafts and renders complete static HTML.
- [ ] 3.2 Build the static `/blog/<slug>/` route and article layout with publication/update dates, optional optimized feature image, rendered Markdown, local Draft indication, Blog return link, online-store action, shared header, and footer; verify a development draft route renders and a production draft route is absent.
- [ ] 3.3 Add focused CSS for blog summaries, article metadata, constrained prose, headings, lists, quotations, links, images, actions, and responsive behavior; verify representative long-form content is readable without horizontal overflow on desktop and narrow viewports.

## 4. RSS and Discovery

- [ ] 4.1 Generate `/rss.xml` from the same production-visible, newest-first post list with canonical `boldlovefarm.com` article URLs, and verify the feed is valid, omits drafts, and contains the required title, description, date, and link fields.
- [ ] 4.2 Verify blog index and article documents emit page-specific search and social metadata, including article type and an absolute feature-image URL when an image is supplied.

## 5. Verification and Maintainer Handoff

- [ ] 5.1 Extend the generated-output test suite for the blog index, five-item navigation, current Blog state, canonical URLs, draft exclusion, RSS output, store-link protections, and any available article fixture; verify the complete automated suite passes.
- [ ] 5.2 Update the README with Markdown authoring, required frontmatter, feature-image guidance, draft preview, validation, publishing, RSS, canonical-domain, and future-redirect notes; verify every documented command and referenced path matches the implementation.
- [ ] 5.3 Run `npm test`, `git diff --check`, and `openspec validate add-a-blog --type change --strict`, and resolve every failure before review.
- [ ] 5.4 Perform a browser review of the blog index and representative article/draft at desktop and narrow widths, verifying navigation, focus visibility, image alternative text, canonical/RSS metadata, Plausible loading, store-link behavior, and absence of horizontal overflow.
