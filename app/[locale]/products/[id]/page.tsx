"use client";

import { useCart } from "@/components/cart-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStrapiMediaUrl } from "@/lib/utils";
import { getProduct } from "@/services/strapi";
import { StrapiProduct } from "@/types/strapi";
import { ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface CartProduct {
  id: number;
  documentId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  categories: string[];
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<StrapiProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language || "pt";

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await getProduct(params.id as string);
      setProduct(data);
    };
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <h1 className="text-2xl font-bold">{t("product.loading")}</h1>
      </div>
    );
  }

  const imageUrl = product.media
    ? getStrapiMediaUrl(product.media[0]?.url)
    : "/placeholder.svg";
  const categories = product.categories.map((category) => category.name);

  const handleAddToCart = () => {
    const cartProduct: CartProduct = {
      id: product.id,
      documentId: product.documentId,
      name: product.name,
      price: product.price,
      image: imageUrl,
      quantity,
      categories,
    };
    addToCart(cartProduct);
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
        <Link href={`/${currentLanguage}`} className="hover:text-foreground">
          {t("header.home")}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/${currentLanguage}/products`}
          className="hover:text-foreground"
        >
          {t("header.allProducts")}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
            {categories.map((category) => (
              <Badge key={category} className="absolute top-4 right-4">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">
              {product.price.toFixed(2)}€
            </p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">{t("product.stock")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("product.stockAvailable", { count: product.stock })}
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">{t("product.quantity")}</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={handleAddToCart}>
            <ShoppingCart className="h-5 w-5 mr-2" />
            {t("home.featured.addToCart")}
          </Button>

          <Tabs defaultValue="details">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">
                {t("product.details")}
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">
                {t("product.shippingReturns")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">{t("product.categories")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {categories.join(", ")}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">{t("product.stock")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t("product.stockUnits", { count: product.stock })}
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="space-y-4 pt-4">
              <div>
                <h4 className="font-medium">{t("product.shipping")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("product.shippingDescription")}
                </p>
              </div>
              <div>
                <h4 className="font-medium">{t("product.returns")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("product.returnsDescription")}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
