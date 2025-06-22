"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderByAccessToken } from "@/services/strapi";
import { StrapiOrder } from "@/types/strapi";
import { Package, Truck, XCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function OrderCancelPage() {
  const params = useParams();
  const { t, i18n } = useTranslation();
  const [order, setOrder] = useState<StrapiOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentLanguage = i18n.language || "pt";
  const accessToken = params.accessToken as string;

  useEffect(() => {
    const fetchOrder = async () => {
      if (!accessToken) {
        setError("No access token provided");
        setLoading(false);
        return;
      }

      try {
        const result = await getOrderByAccessToken(accessToken);
        setOrder(result.order);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">{t("order.loading")}</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {t("order.error.title")}
          </h1>
          <p className="text-red-600 mb-6">
            {error || t("order.error.notFound")}
          </p>
          <Button asChild>
            <Link href={`/${currentLanguage}/products`}>
              {t("order.error.backToProducts")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-2xl mx-auto">
        {/* Cancel Header */}
        <div className="text-center mb-8">
          <XCircle className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-600 mb-2">
            {t("order.status.canceled.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("order.status.canceled.description")}
          </p>
        </div>

        {/* Status Alert */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <XCircle className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-600">
                {t("order.status.canceled.secondaryTitle")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t("order.status.canceled.secondaryDescription")}
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {t("order.details.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("order.details.orderNumber")}
                </p>
                <p className="font-medium">#{order.accessToken}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("order.details.date")}
                </p>
                <p className="font-medium">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("order.details.customer")}
                </p>
                <p className="font-medium">{order.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("order.details.email")}
                </p>
                <p className="font-medium">{order.email}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                {t("order.details.phone")}
              </p>
              <p className="font-medium">{order.phoneNumber}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                {t("order.details.shippingMethod")}
              </p>
              <p className="font-medium capitalize">{order.shippingMethod}</p>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("order.items.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("order.items.quantity")}: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>{t("order.items.total")}</span>
                <span>€{order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipment Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              {t("order.shipping.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Shipping Method */}
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <div>
                <p className="font-medium capitalize">{order.shippingMethod}</p>
                <p className="text-sm text-muted-foreground">
                  {t("order.shipping.method")}
                </p>
              </div>
            </div>

            {/* Shipping Address - Show for canceled orders */}
            {order.address && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {t("order.details.shippingAddress")}:
                </p>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.postalCode}
                  </p>
                  <p>{order.address.country}</p>
                  {order.address.notes && (
                    <p className="text-gray-600 mt-2">
                      <strong>{t("order.shipping.notes")}:</strong>{" "}
                      {order.address.notes}
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href={`/${currentLanguage}/products`}>
              {t("order.actions.continueShopping")}
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/${currentLanguage}/contact`}>
              {t("order.actions.contactSupport")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
