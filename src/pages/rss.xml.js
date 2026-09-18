import rss from "@astrojs/rss";
import { getBlogPosts } from "../lib/blog.js";

export async function GET(context) {
  // Feeds contain published posts even when previewing drafts locally.
  const posts = await getBlogPosts(false);
  return rss({
    title: "Bold Love Blog",
    description: "Stories from our farm, our bakery, and our community.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}/`,
    })),
    customData: "<language>en-us</language>",
  });
}
