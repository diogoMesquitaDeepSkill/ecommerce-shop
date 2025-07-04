"use client";

import { useCart } from "@/components/cart-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getLocalizedCategoryName, getStrapiMediaUrl } from "@/lib/utils";
import { StrapiProduct } from "@/types/strapi";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export function ProductGrid({ products }: { products: StrapiProduct[] }) {
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslation();

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          {t("search.noResults")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("search.noResultsDescription")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.documentId}
          product={product}
          locale={locale}
        />
      ))}
    </div>
  );
}

function ProductCard({
  product,
  locale,
}: {
  product: StrapiProduct;
  locale: string;
}) {
  const { addToCart } = useCart();
  const mediaUrls = product.media?.map((media) =>
    getStrapiMediaUrl(media.url)
  ) || ["/placeholder.svg"];
  const categories = product.categories.map((cat) =>
    getLocalizedCategoryName(cat, locale)
  );
  const { t } = useTranslation();

  const productData = {
    id: product.id,
    documentId: product.documentId,
    name: product.name,
    price: product.price,
    image: mediaUrls[0] || "/placeholder.svg",
    quantity: 1,
    categories,
  };

  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <Link href={`/${locale}/products/${product.documentId}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={mediaUrls[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {categories.map((category) => (
            <Badge key={category} className="absolute top-2 right-2">
              {category}
            </Badge>
          ))}
        </div>
      </Link>
      <CardContent className="p-4 flex-1 flex flex-col">
        <Link
          href={`/${locale}/products/${product.documentId}`}
          className="hover:underline"
        >
          <h3 className="font-medium">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 flex-1">
          {product.description}
        </p>
        <p className="font-bold mt-2">{product.price.toFixed(2)}€</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button
          className="w-full"
          size="sm"
          onClick={() => addToCart(productData)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {t("home.featured.addToCart")}
        </Button>
      </CardFooter>
    </Card>
  );
}
