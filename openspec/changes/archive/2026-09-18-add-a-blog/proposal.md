## Why

Bold Love needs a durable place to publish farm, bakery, partner, and food stories that visitors can discover through the existing site and search engines. A repository-native blog preserves the site's static GitHub Pages architecture while keeping publishing simple, maintainable, and independent of a separate CMS.

## What Changes

- Add a Markdown-authored blog with a newest-first index at `/blog/` and stable post pages at `/blog/<slug>/`.
- Add validated post metadata for title, description, publication date, optional update date, optional feature image and alternative text, and draft state.
- Add Blog to the shared primary navigation once at least one post is published, keep the link hidden while the blog has no published posts, and identify Blog as the current section on blog pages when the link is shown.
- Give blog posts the established Bold Love presentation, responsive behavior, metadata, and a prominent path to the online store.
- Publish an RSS feed for non-draft posts and advertise it through document metadata.
- Establish `boldlovefarm.com` as the canonical origin for generated pages and blog feed URLs while both domains temporarily serve the same build.
- Keep the eventual HTTP 301 redirect from `boldlovebakery.com` to `boldlovefarm.com` outside this change.
- Keep initial publishing repository-based and omit a browser CMS, comments, search, pagination, tag archives, and scheduled publication.

## Capabilities

### New Capabilities
- `site-blog`: Markdown post authoring, blog index and post routes, drafts, article presentation and metadata, RSS publication, store navigation, and canonical-domain behavior.

### Modified Capabilities
- `astro-static-site`: Extend homepage navigation with the Blog destination after the first post is published.
- `site-information-pages`: Extend shared information-page navigation with the Blog destination after the first post is published.

## Impact

- Adds blog content configuration, Markdown content, a blog index, a static dynamic-route template, and an article layout under `src/`.
- Updates the shared header, document layout, site metadata configuration, global styling, generated-output tests, and maintainer documentation.
- Adds Astro's official RSS helper as a small build-time dependency.
- Continues producing static files through the existing GitHub Pages workflow with no application server, database, CMS, or new application-owned browser JavaScript.
- Uses the existing Plausible integration to observe blog pageviews and outbound online-store clicks.
