"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { createOrder } from "@/services/strapi";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CheckoutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { t } = useTranslation();
  const { cartItems, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState("normal");
  const pathname = usePathname();

  const currentLanguage = pathname.split("/")[1] || "en";

  // Calculate shipping cost
  const shippingCost = shippingMethod === "express" ? 9.99 : 0;
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <h1 className="text-2xl font-bold">{t("checkout.emptyCart.title")}</h1>
        <p className="mt-4">{t("checkout.emptyCart.description")}</p>
        <Button asChild className="mt-6">
          <Link href={`/${currentLanguage}/products`}>
            {t("checkout.emptyCart.browseProducts")}
          </Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      console.log("cartItems", cartItems);
      // Filter out items without documentId
      const validCartItems = cartItems.filter((item) => item.documentId);

      if (validCartItems.length === 0) {
        throw new Error(
          "No valid products in cart. Please refresh and try again."
        );
      }

      // Prepare order data matching Strapi format
      const orderData = {
        name: `${formData.get("firstName")} ${formData.get("lastName")}`,
        email: formData.get("email") as string,
        phoneNumber: formData.get("phone") as string,
        orderItems: validCartItems.map((item) => ({
          product: item.documentId!, // Now we know documentId exists
          quantity: item.quantity || 1,
        })),
        shippingMethod: shippingMethod,
        address: {
          street: formData.get("address") as string,
          city: formData.get("city") as string,
          postalCode: formData.get("zip") as string,
          country: (formData.get("country") as string) || "Portugal",
          notes: (formData.get("notes") as string) || "",
        },
      };

      console.log("Sending order data:", JSON.stringify(orderData, null, 2));

      // Create order using Strapi service
      const result = await createOrder(orderData);
      console.log("Order created successfully:", result);

      // Store order info in localStorage
      localStorage.setItem("orderAccessToken", result.order.accessToken);
      localStorage.setItem(
        "orderInfo",
        JSON.stringify({
          id: result.order.id,
          totalPrice: result.order.totalPrice,
          date: new Date().toISOString(),
        })
      );

      // Clear cart after successful order creation
      clearCart();

      // Redirect to Stripe
      window.location.href = result.stripeUrl;
    } catch (err) {
      console.error("Order creation error:", err);
      setError(err instanceof Error ? err.message : "Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/${currentLanguage}/cart`}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t("checkout.backToCart")}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">{t("checkout.title")}</h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium mb-4">
                  {t("checkout.contactInfo.title")}
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        {t("checkout.contactInfo.firstName")}
                      </Label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {t("checkout.contactInfo.lastName")}
                      </Label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {t("checkout.contactInfo.email")}
                    </Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {t("checkout.contactInfo.phone")}
                    </Label>
                    <Input id="phone" name="phone" type="tel" required />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-lg font-medium mb-4">
                  {t("checkout.shippingAddress.title")}
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      {t("checkout.shippingAddress.address")}
                    </Label>
                    <Input id="address" name="address" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        {t("checkout.shippingAddress.city")}
                      </Label>
                      <Input id="city" name="city" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">
                        {t("checkout.shippingAddress.zipCode")}
                      </Label>
                      <Input id="zip" name="zip" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      defaultValue="Portugal"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Input
                      id="notes"
                      name="notes"
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-lg font-medium mb-4">
                  {t("checkout.shippingMethod.title")}
                </h2>
                <RadioGroup
                  value={shippingMethod}
                  onValueChange={setShippingMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal" className="flex-1">
                      <div className="flex justify-between">
                        <span>
                          {t("checkout.shippingMethod.standard.title")}
                        </span>
                        <span>€0.00</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {t("checkout.shippingMethod.standard.delivery")}
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1">
                      <div className="flex justify-between">
                        <span>
                          {t("checkout.shippingMethod.express.title")}
                        </span>
                        <span>€9.99</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {t("checkout.shippingMethod.express.delivery")}
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="lg:hidden">
                <OrderSummary
                  cartItems={cartItems}
                  subtotal={subtotal}
                  shippingCost={shippingCost}
                  total={total}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t("checkout.processing")}
                    </>
                  ) : (
                    <>{t("checkout.placeOrder")}</>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden lg:block">
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shippingCost={shippingCost}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

interface OrderSummaryProps {
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    categories: string[];
    selectedSize?: string;
    selectedColor?: string;
  }>;
  subtotal: number;
  shippingCost: number;
  total: number;
}

function OrderSummary({
  cartItems,
  subtotal,
  shippingCost,
  total,
}: OrderSummaryProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("checkout.orderSummary.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {item.quantity || 1} ×
                </span>
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-medium">
                €{(item.price * (item.quantity || 1)).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex justify-between">
          <span>{t("checkout.orderSummary.subtotal")}</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>{t("checkout.orderSummary.shipping")}</span>
          <span>€{shippingCost.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>{t("checkout.orderSummary.total")}</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
