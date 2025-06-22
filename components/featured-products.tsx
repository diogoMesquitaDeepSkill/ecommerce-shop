"use client";

import { getProducts } from "@/services/strapi";
import type { StrapiProduct } from "@/types/strapi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FeaturedProductCard } from "./featured-product-card";

interface FeaturedProductsProps {
  locale: string;
}

export function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const { t } = useTranslation();
  const [products, setProducts] = useState<StrapiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await getProducts(locale);

        // Get 4 random products
        const shuffled = data.sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 4);

        setProducts(randomProducts);
        setError(false);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [locale]);

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("home.featured.title")}
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            {t("home.featured.description")}
          </p>
        </div>
        <div className="text-center text-muted-foreground">
          {t("product.loading")}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("home.featured.title")}
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            {t("home.featured.description")}
          </p>
        </div>
        <div className="text-center text-muted-foreground">
          {t("product.loading")}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("home.featured.title")}
        </h2>
        <p className="text-muted-foreground max-w-[600px]">
          {t("home.featured.description")}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <FeaturedProductCard
            key={product.documentId}
            product={product}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
