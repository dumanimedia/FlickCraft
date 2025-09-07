import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.9,
    // },
    // {
    //   url: `${baseUrl}/services`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.9,
    // },
    // {
    //   url: `${baseUrl}/services/web-design`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/services/seo`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/portfolio`,
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.9,
    // },
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: new Date(),
    //   changeFrequency: "daily",
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/contact`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.7,
    // },
    // // Legal pages (lower priority)
    // {
    //   url: `${baseUrl}/privacy-policy`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.3,
    // },
    // {
    //   url: `${baseUrl}/terms-of-service`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.3,
    // },
  ];

  try {
    // Generate the sitemap for the dynamic pages if at all.
    return [...staticPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}
