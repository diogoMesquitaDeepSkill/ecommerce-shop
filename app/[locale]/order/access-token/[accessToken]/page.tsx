"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderByAccessToken } from "@/services/strapi";
import { StrapiOrder } from "@/types/strapi";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
  Home,
  Loader2,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
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
      case "completed":
        return {
          icon: Home,
          iconColor: "text-purple-500",
          title: t("order.status.completed.title"),
          description: t("order.status.completed.description"),
          statusColor: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
        };
      case "problem":
        return {
          icon: AlertCircle,
          iconColor: "text-red-500",
          title: t("order.status.problem.title"),
          description: t("order.status.problem.description"),
          statusColor: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      case "canceled":
        return {
          icon: XCircle,
          iconColor: "text-gray-500",
          title: t("order.status.canceled.title"),
          description: t("order.status.canceled.description"),
          statusColor: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
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
                {t(
                  `order.status.${order.standing.toLowerCase()}.secondaryTitle`
                )}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t(
                  `order.status.${order.standing.toLowerCase()}.secondaryDescription`
                )}
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
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div>
                <p className="font-medium capitalize">{order.shippingMethod}</p>
                <p className="text-sm text-muted-foreground">
                  {t("order.shipping.method")}
                </p>
              </div>
            </div>

            {/* Tracking Link */}
            {order.trackingLink && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-blue-800">
                    {t("order.details.tracking")}:
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex items-center gap-2"
                  >
                    <a
                      href={order.trackingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("order.details.trackPackage")}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {/* Shipping Address - Show for specific statuses */}
            {["unpaid", "paid", "completed", "shipped", "problem"].includes(
              order.standing.toLowerCase()
            ) &&
              order.address && (
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

            {/* Status-specific messages */}
            {order.standing.toLowerCase() === "unpaid" && (
              <div className="p-3 bg-yellow-50 rounded-lg">
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
            {order.standing.toLowerCase() === "completed" && (
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <p className="text-sm font-medium text-purple-800">
                    {t("order.status.completed.message")}
                  </p>
                </div>
                <p className="text-sm text-purple-700 mt-1">
                  {t("order.status.completed.submessage")}
                </p>
              </div>
            )}
            {order.standing.toLowerCase() === "problem" && (
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm font-medium text-red-800">
                    {t("order.status.problem.message")}
                  </p>
                </div>
                <p className="text-sm text-red-700 mt-1">
                  {t("order.status.problem.submessage")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {order.standing.toLowerCase() === "problem" ? (
            <>
              <Button asChild variant="outline">
                <Link href={`/${locale}/products`}>
                  {t("order.actions.continueShopping")}
                </Link>
              </Button>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href={`/${locale}/contact`}>
                  {t("order.actions.contactSupport")}
                </Link>
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
