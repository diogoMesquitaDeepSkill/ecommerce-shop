"use client";

import { useCart } from "@/components/cart-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getStrapiMediaUrl } from "@/lib/utils";
import { StrapiProduct } from "@/types/strapi";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  product: StrapiProduct;
  locale: string;
}

export function FeaturedProductCard({ product, locale }: ProductCardProps) {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  // Get properly formatted media URLs
  const mediaUrls = product.media?.map((media) =>
    getStrapiMediaUrl(media.url)
  ) || ["/placeholder.svg"];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: mediaUrls[0] || "/placeholder.svg",
      quantity: 1,
      categories: product.categories.map((cat) => cat.name),
    });
  };

  const productImage = mediaUrls[0] || "/placeholder.svg";

  return (
    <Card className="overflow-hidden group">
      <Link href={`/${locale}/products/${product.documentId}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.categories.some((cat) => cat.slug === "new") && (
            <Badge className="absolute top-2 right-2">
              {t("home.featured.new")}
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link
          href={`/${locale}/products/${product.documentId}`}
          className="hover:underline"
        >
          <h3 className="font-medium">{product.name}</h3>
        </Link>
        <p className="font-bold mt-1">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {t("home.featured.addToCart")}
        </Button>
      </CardFooter>
    </Card>
  );
}
