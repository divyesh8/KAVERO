import { MetadataRoute } from "next";
import { getAllProducts } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kavero-orcin.vercel.app";
  const products = getAllProducts();

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const staticUrls = [
    "",
    "/shop",
    "/our-story",
    "/our-estates",
    "/brew-guide",
    "/coffee-finder",
    "/contact",
    "/faq",
    "/shipping",
    "/returns",
    "/privacy",
    "/terms",
    "/cart",
    "/account",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...staticUrls, ...productUrls];
}
