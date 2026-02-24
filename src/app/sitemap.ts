import type { MetadataRoute } from "next";
import { getBlogPosts } from "./[locale]/blog/utils";

export const baseUrl = 'https://0xslyv.space'

export default function sitemap(): MetadataRoute.Sitemap {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [
    {
    // Just an example of sitemap, change to current url
      url: "/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    
    // Add more pages here
    ...routes, ...blogs
  ];
}
