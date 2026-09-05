## Context

The site is an Astro 7 static build deployed by GitHub Actions to two GitHub Pages repositories. It uses shared Astro layouts and components, plain CSS, no frontend framework, and only third-party Plausible and Mailchimp browser scripts. The same generated files are currently served from `boldlovefarm.com` and `boldlovebakery.com`; the former is now the canonical origin, while the latter will redirect in a separate future change. See `proposal.md` for motivation and `specs/site-blog/spec.md` for the behavioral contract.

The maintainer is comfortable with repository workflows but prefers explicit, low-abstraction code and has limited JavaScript and TypeScript experience. Blog publishing therefore needs to remain understandable from the filesystem, build commands, and generated output.

## Goals / Non-Goals

**Goals:**

- Keep posts as ordinary Markdown and images in the repository.
- Validate metadata early enough that a malformed post cannot silently deploy.
- Generate the index, article pages, feed, and canonical metadata entirely at build time.
- Let drafts be reviewed locally while making their production exclusion difficult to bypass accidentally.
- Reuse the existing page shell, navigation, footer, CSS conventions, analytics, and deployment workflow.
- Keep the content and routing design small enough to maintain without specialized Astro knowledge.

**Non-Goals:**

- No CMS, database, authentication, comments, search, pagination, taxonomy pages, scheduled publication, or interactive article components.
- No MDX requirement; posts use standard Markdown.
- No automated cross-posting to social networks or Mailchimp campaigns.
- No HTTP redirect or DNS change for `boldlovebakery.com` in this change.
- No invented launch article; the blog can ship with an intentional empty state until approved copy is supplied.

## Decisions

### 1. Use an Astro content collection backed by local Markdown

Define a `blog` collection in a small `src/content.config.ts` file using Astro's built-in glob loader and schema validation. Store posts under `src/content/blog/` and use the entry identifier derived from the Markdown filename as the URL slug.

The schema will require:

- `title`: string
- `description`: string
- `publishDate`: date
- `draft`: explicit boolean
- `updatedDate`: optional date
- `featureImage`: optional collection image reference
- `featureImageAlt`: required whenever `featureImage` is present

Feature images will live under `src/assets/blog/` so Astro can optimize them at build time. Standard images within a Markdown body remain ordinary Markdown images and must carry meaningful alternative text as part of author review.

This choice provides a single source of truth, build-time validation, and static generation without a runtime content API. Direct Markdown files under `src/pages/` were considered but rejected because they make validation, sorting, draft filtering, and feed generation less coherent. A headless or Git-based CMS was rejected for the initial version because authentication, vendor configuration, build hooks, and browser editing are not currently required.

### 2. Use one explicit publication filter everywhere

Create a small, plainly named helper that returns the collection entries visible in the current environment:

- Production builds include only entries with `draft: false`.
- Local development includes valid drafts so their article routes can be reviewed.
- Draft summaries and articles receive a conspicuous local-only Draft label.

The blog index, static article paths, and RSS feed will all consume this shared filtering and sorting behavior rather than implementing separate rules. Production tests will assert that a known draft does not appear in output or RSS.

Alternatives included omitting draft routes in every environment, which prevents convenient preview, and using future dates as an implicit publication switch, which suggests scheduling that the deployment workflow does not provide. An explicit boolean is easier to audit.

### 3. Generate simple, stable blog routes

Add a static `/blog/` page that queries visible posts and orders them by descending `publishDate`. Add a rest-parameter article template under `/blog/` that uses `getStaticPaths()` to generate one route per visible entry and renders the Markdown through a dedicated article layout.

Routes use `/blog/<slug>/` without date segments. The publication date remains article metadata rather than URL structure, so correcting a date does not break inbound links. Custom frontmatter slugs are omitted to prevent the filename and public URL from drifting apart.

The index handles zero published posts with a designed empty state. No pagination is added; the initial collection is small, and pagination can be introduced later without changing existing article URLs.

### 4. Reuse the shared site shell and add article-specific presentation

Extend `SiteHeader` with a Blog item and use the existing current-page mechanism for both the index and article routes. Create a blog article layout that composes `BaseLayout`, `SiteHeader`, and `SiteFooter`, and add focused global CSS for:

- Index summaries and optional feature images
- Article header, dates, optional Draft label, and feature image
- A constrained prose measure with headings, lists, links, quotations, and images
- Blog-index and online-store actions
- Existing desktop and narrow responsive breakpoints

The implementation will remain Astro templates and CSS. It will not introduce a component framework or article-side JavaScript.

### 5. Establish canonical origin centrally

Set Astro's `site` configuration to `https://boldlovefarm.com`. Extend `BaseLayout` to derive an absolute canonical URL from that origin and the current public pathname, and to emit RSS auto-discovery and optional article social metadata. Existing pages inherit the canonical behavior automatically; blog pages supply article-specific title, description, type, and optional feature image.

The same built HTML deployed at `boldlovebakery.com` will therefore still point to the matching `boldlovefarm.com` URL. This reduces duplicate-content ambiguity before the future redirect without requiring domain-specific builds. The RSS feed also uses `Astro.site` so item URLs cannot diverge from document canonical URLs.

Separate builds with domain-specific canonical values were rejected because they would undermine the current single-history, identical-build deployment model. Omitting canonical metadata until the redirect was rejected because the blog increases the amount of duplicate indexable content.

### 6. Generate RSS with Astro's official helper

Add `@astrojs/rss` as the only new dependency. Generate `/rss.xml` from the same production-visible, newest-first post list used by the blog. Feed items include title, description, publication date, and canonical article URL; full article HTML is omitted initially to avoid relative-image and content-sanitization complexity.

Add RSS auto-discovery to `BaseLayout`. A hand-built XML implementation was considered but rejected because escaping, dates, and feed correctness are better handled by Astro's focused official package.

### 7. Keep verification focused on generated behavior

Extend the existing Node test suite rather than adding a test framework. Verification will cover:

- `/blog/index.html`, navigation, empty state, and responsive semantic structure
- Canonical URLs on the homepage, information pages, blog index, and any generated article fixture
- Required post metadata validation at the collection boundary
- Production exclusion of a known draft from routes, index, and RSS
- RSS structure, ordering, and canonical links
- Shared navigation and current-section semantics
- Article metadata, new-tab store protections, local assets, and horizontal-overflow checks during browser review

Keep an explicit draft example or documented post template in the repository so authors can copy the metadata shape without publishing placeholder content. If no approved published article exists during implementation, article-route rendering will be exercised with a temporary test fixture or added to the verification suite alongside the first approved post, without publishing invented copy.

## Risks / Trade-offs

- **[Risk] Draft filtering is implemented inconsistently and leaks a post** -> Centralize visibility and ordering, consume it from routes/index/feed, and test a known draft against all production surfaces.
- **[Risk] A feature image makes builds or the repository unnecessarily large** -> Keep originals in `src/assets/blog/`, use Astro optimization, and document practical image dimensions and file-size guidance.
- **[Risk] The same content remains reachable on two domains before the redirect** -> Emit `boldlovefarm.com` canonical URLs everywhere and use the same origin in RSS.
- **[Risk] A five-item navigation becomes crowded on narrow screens** -> Reuse the existing wrapping navigation, add focused responsive checks, and adjust only spacing needed for the new item.
- **[Risk] Repository editing is inconvenient for another future author** -> Keep Markdown and metadata intentionally simple; consider a CMS as a separate change only when a real browser-authoring requirement appears.
- **[Trade-off] No scheduled publication** -> A post becomes public only after `draft` is set to false and a build is deployed, which is explicit and predictable but requires a maintainer action.
- **[Trade-off] No initial pagination or taxonomy** -> The index stays simpler now; these can be added later without changing stable article routes.

## Migration Plan

1. Add the content collection, shared visibility logic, optional draft template, blog routes, article layout, styles, canonical metadata, and RSS feed.
2. Extend navigation, generated-output tests, and publishing documentation.
3. Run the existing build and tests, strict OpenSpec validation, and desktop/narrow browser review.
4. Deploy the identical build through the existing two-repository workflow when the broader branch is approved for production.
5. Confirm canonical metadata and Plausible pageviews on both domains, and confirm the RSS feed and GrownBy outbound click tracking on `boldlovefarm.com`.

Rollback is a normal revert of the implementation commit. The change does not migrate user data, alter stored records, or require cleanup outside the static deployment. The later 301 redirect will be planned and deployed separately.
