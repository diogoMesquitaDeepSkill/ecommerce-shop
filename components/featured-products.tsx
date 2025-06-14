"use client";

import { useCart } from "@/components/cart-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew: boolean;
  quantity: number;
  categories: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "wine",
    isNew: true,
    quantity: 1,
    categories: ["wine"]
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "wine",
    isNew: false,
    quantity: 1,
    categories: ["wine"]
  },
  {
    id: 3,
    name: "Summer Floral Dress",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "food",
    isNew: true,
    quantity: 1,
    categories: ["food"]
  },
  {
    id: 4,
    name: "Casual Hoodie",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "wine",
    isNew: false,
    quantity: 1,
    categories: ["wine"]
  },
];

export function FeaturedProducts() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t('home.featured.title')}</h2>
        <p className="text-muted-foreground max-w-[600px]">
          {t('home.featured.description')}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: Product;
  locale: string;
}

function ProductCard({ product, locale }: ProductCardProps) {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
      categories: product.categories
    });
  };

  return (
    <Card className="overflow-hidden group">
      <Link href={`/${locale}/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.isNew && (
            <Badge className="absolute top-2 right-2">{t('home.featured.new')}</Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/${locale}/products/${product.id}`} className="hover:underline">
          <h3 className="font-medium">{product.name}</h3>
        </Link>
        <p className="font-bold mt-1">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {t('home.featured.addToCart')}
        </Button>
      </CardFooter>
    </Card>
  );
}
