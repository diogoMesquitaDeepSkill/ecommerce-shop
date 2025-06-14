"use client";

import { getProduct } from "@/services/strapi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { StrapiProduct } from "@/types/strapi";

interface CartProduct {
  id: number;
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

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await getProduct(params.id as string);
      setProduct(data[0]);
    };
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  console.log(product)

  const imageUrl = product.media[0]?.url || "/placeholder.svg";
  const categories = product.categories.map(
    (category) => category.name
  );

  const handleAddToCart = () => {
    const cartProduct: CartProduct = {
      id: product.id,
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
        <Link href={`/${params.locale}`} className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/${params.locale}/products`} className="hover:text-foreground">
          Products
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
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Stock</h3>
              <p className="text-sm text-muted-foreground">
                {product.stock} units available
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
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

          <Button
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>

          <Tabs defaultValue="details">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">
                Details
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">
                Shipping & Returns
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Categories</h4>
                  <p className="text-sm text-muted-foreground">
                    {categories.join(", ")}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Stock</h4>
                  <p className="text-sm text-muted-foreground">
                    {product.stock} units
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="space-y-4 pt-4">
              <div>
                <h4 className="font-medium">Shipping</h4>
                <p className="text-sm text-muted-foreground">
                  Free standard shipping on all orders over $100. Delivery
                  within 3-5 business days.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Returns</h4>
                <p className="text-sm text-muted-foreground">
                  We accept returns within 30 days of delivery. Items must be
                  in original condition and packaging.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
