"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function CartPage() {
  const { t, i18n } = useTranslation();
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } =
    useCart();

  const currentLanguage = i18n.language || "pt";

  if (cartItems.length === 0) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold">{t("cart.empty.title")}</h1>
          <p className="text-muted-foreground mt-2">
            {t("cart.empty.description")}
          </p>
          <Button asChild className="mt-6">
            <Link href={`/${currentLanguage}/products`}>
              {t("cart.empty.continueShopping")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t("cart.title")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-[120px] h-[120px]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedColor && `, Color: ${item.selectedColor}`}
                      </p>
                      <p className="font-bold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center mt-4 sm:mt-0">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 1) - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center">
                        {item.quantity || 1}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 1) + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={clearCart}>
              {t("cart.clearCart")}
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${currentLanguage}/products`}>
                {t("cart.empty.continueShopping")}
              </Link>
            </Button>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t("cart.orderSummary.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>{t("cart.orderSummary.subtotal")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("cart.orderSummary.shipping")}</span>
                <span>{t("cart.orderSummary.calculatedAtCheckout")}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("cart.orderSummary.tax")}</span>
                <span>{t("cart.orderSummary.calculatedAtCheckout")}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>{t("cart.orderSummary.total")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/${currentLanguage}/checkout`}>
                  {t("cart.checkout")}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
