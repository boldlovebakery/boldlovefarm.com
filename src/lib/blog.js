import { getCollection } from "astro:content";

// Development previews include drafts; builds and RSS exclude them by default.
export async function getBlogPosts(includeDrafts = import.meta.env.DEV) {
  const posts = await getCollection("blog", ({ data }) => includeDrafts || !data.draft);
  return posts.sort((a, b) => b.data.publishDate - a.data.publishDate || a.id.localeCompare(b.id));
}

export function formatPostDate(date) {
  // Date-only frontmatter must not shift to the previous day in US time zones.
  return new Intl.DateTimeFormat("en-US", {
    month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(date);
}
