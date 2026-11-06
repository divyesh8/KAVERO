import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/data/products";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductDetailClient } from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | KAVERO Coffee" };
  }

  return {
    title: `${product.name} — ${product.weight} | KAVERO Coffee`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Authentic Karnataka Coffee`,
      description: product.description,
      images: [{ url: product.image, alt: product.alt }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 3);

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: `https://kavero-orcin.vercel.app${product.image}`,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "KAVERO Coffee",
    },
    offers: {
      "@type": "Offer",
      url: `https://kavero-orcin.vercel.app/shop/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "KAVERO Coffee",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#140D09] text-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </div>
  );
}
