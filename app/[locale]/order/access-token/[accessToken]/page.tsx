"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderByAccessToken } from "@/services/strapi";
import { StrapiOrder } from "@/types/strapi";
import { CheckCircle, Clock, Loader2, Package, Truck } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function OrderStatusPage() {
  const params = useParams();
  const { t } = useTranslation();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<StrapiOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const locale = params.locale as string;
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

        // Clear cart if this is a fresh payment (order was just created)
        // We can detect this by checking if the order was created recently
        const orderDate = new Date(result.order.date);
        const now = new Date();
        const timeDiff = now.getTime() - orderDate.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        if (hoursDiff < 1) {
          // If order was created less than 1 hour ago
          clearCart();
        }
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
            <Link href={`/${locale}/products`}>
              {t("order.error.backToProducts")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Determine order status and display appropriate content
  const getOrderStatus = () => {
    switch (order.standing.toLowerCase()) {
      case "paid":
        return {
          icon: CheckCircle,
          iconColor: "text-green-500",
          title: t("order.status.paid.title"),
          description: t("order.status.paid.description"),
          statusColor: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        };
      case "shipped":
        return {
          icon: Truck,
          iconColor: "text-blue-500",
          title: t("order.status.shipped.title"),
          description: t("order.status.shipped.description"),
          statusColor: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      case "unpaid":
      default:
        return {
          icon: Clock,
          iconColor: "text-yellow-500",
          title: t("order.status.pending.title"),
          description: t("order.status.pending.description"),
          statusColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
        };
    }
  };

  const orderStatus = getOrderStatus();
  const StatusIcon = orderStatus.icon;

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-2xl mx-auto">
        {/* Order Status Header */}
        <div className="text-center mb-8">
          <StatusIcon
            className={`h-16 w-16 mx-auto mb-4 ${orderStatus.iconColor}`}
          />
          <h1 className={`text-3xl font-bold mb-2 ${orderStatus.statusColor}`}>
            {orderStatus.title}
          </h1>
          <p className="text-muted-foreground">{orderStatus.description}</p>
        </div>

        {/* Status Alert */}
        <div
          className={`${orderStatus.bgColor} border ${orderStatus.borderColor} rounded-lg p-4 mb-6`}
        >
          <div className="flex items-center gap-3">
            <StatusIcon className={`h-5 w-5 ${orderStatus.iconColor}`} />
            <div>
              <p className={`font-medium ${orderStatus.statusColor}`}>
                {orderStatus.title}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {orderStatus.description}
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
                <p className="font-medium">#{order.id}</p>
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

        {/* Order Status Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              {t("order.status.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${orderStatus.iconColor.replace(
                  "text-",
                  "bg-"
                )}`}
              ></div>
              <div>
                <p className="font-medium capitalize">{order.standing}</p>
                <p className="text-sm text-muted-foreground">
                  {orderStatus.description}
                </p>
              </div>
            </div>
            {order.trackingLink && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">
                  {t("order.status.trackingCode")}: {order.trackingLink}
                </p>
              </div>
            )}
            {order.standing.toLowerCase() === "unpaid" && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
                  <p className="text-sm font-medium text-yellow-800">
                    {t("order.status.paymentProcessing")}
                  </p>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  {t("order.status.paymentProcessingDescription")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href={`/${locale}/products`}>
              {t("order.actions.continueShopping")}
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/${locale}/contact`}>
              {t("order.actions.contactSupport")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
