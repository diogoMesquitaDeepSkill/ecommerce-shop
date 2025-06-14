"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, CreditCard, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import { useTranslation } from "react-i18next"
import { usePathname } from "next/navigation"

export default function CheckoutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { t } = useTranslation()
  const { cartItems, subtotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const pathname = usePathname();

  const currentLanguage = pathname.split("/")[1] || "en";


  if (cartItems.length === 0 && !isComplete) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <h1 className="text-2xl font-bold">{t('checkout.emptyCart.title')}</h1>
        <p className="mt-4">{t('checkout.emptyCart.description')}</p>
        <Button asChild className="mt-6">
          <Link href={`/${currentLanguage}/products`}>{t('checkout.emptyCart.browseProducts')}</Link>
        </Button>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="container px-4 py-12 mx-auto max-w-md">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">{t('checkout.orderConfirmed.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{t('checkout.orderConfirmed.description')}</p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium">{t('checkout.orderConfirmed.orderNumber')}</p>
              <p className="text-sm text-muted-foreground">{t('checkout.orderConfirmed.emailSent')}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href={`/${currentLanguage}`}>{t('checkout.orderConfirmed.returnHome')}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
      clearCart()
    }, 2000)
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/${currentLanguage}/cart`}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t('checkout.backToCart')}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">{t('checkout.title')}</h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium mb-4">{t('checkout.contactInfo.title')}</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t('checkout.contactInfo.firstName')}</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t('checkout.contactInfo.lastName')}</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('checkout.contactInfo.email')}</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('checkout.contactInfo.phone')}</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-lg font-medium mb-4">{t('checkout.shippingAddress.title')}</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">{t('checkout.shippingAddress.address')}</Label>
                    <Input id="address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apartment">{t('checkout.shippingAddress.apartment')}</Label>
                    <Input id="apartment" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">{t('checkout.shippingAddress.city')}</Label>
                      <Input id="city" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">{t('checkout.shippingAddress.state')}</Label>
                      <Select defaultValue="">
                        <SelectTrigger>
                          <SelectValue placeholder={t('checkout.shippingAddress.selectState')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          <SelectItem value="fl">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">{t('checkout.shippingAddress.zipCode')}</Label>
                      <Input id="zip" required />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-lg font-medium mb-4">{t('checkout.paymentMethod.title')}</h2>
                <Tabs defaultValue="card">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">{t('checkout.paymentMethod.creditCard')}</TabsTrigger>
                    <TabsTrigger value="paypal">{t('checkout.paymentMethod.paypal')}</TabsTrigger>
                    <TabsTrigger value="cod">{t('checkout.paymentMethod.cashOnDelivery')}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">{t('checkout.paymentMethod.cardName')}</Label>
                      <Input id="cardName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">{t('checkout.paymentMethod.cardNumber')}</Label>
                      <div className="relative">
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                        <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">{t('checkout.paymentMethod.expiryDate')}</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">{t('checkout.paymentMethod.cvc')}</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="paypal" className="pt-4">
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="mb-4">{t('checkout.paymentMethod.paypalRedirect')}</p>
                      <Button type="button" className="w-full">
                        {t('checkout.paymentMethod.continueWithPaypal')}
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="cod" className="pt-4">
                    <div className="flex flex-col space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="font-medium mb-2">{t('checkout.paymentMethod.cashOnDelivery')}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t('checkout.paymentMethod.codDescription')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">{t('checkout.paymentMethod.secureAndConvenient')}</p>
                          <p className="text-muted-foreground">{t('checkout.paymentMethod.noPaymentDetails')}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">{t('checkout.paymentMethod.payOnReceive')}</p>
                          <p className="text-muted-foreground">{t('checkout.paymentMethod.inspectBeforePayment')}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <Separator />

              <div>
                <h2 className="text-lg font-medium mb-4">{t('checkout.shippingMethod.title')}</h2>
                <RadioGroup defaultValue="standard" className="space-y-3">
                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1">
                      <div className="flex justify-between">
                        <span>{t('checkout.shippingMethod.standard.title')}</span>
                        <span>{t('checkout.shippingMethod.standard.price')}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{t('checkout.shippingMethod.standard.delivery')}</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 space-y-0">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1">
                      <div className="flex justify-between">
                        <span>{t('checkout.shippingMethod.express.title')}</span>
                        <span>{t('checkout.shippingMethod.express.price')}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{t('checkout.shippingMethod.express.delivery')}</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="lg:hidden">
                <OrderSummary cartItems={cartItems} subtotal={subtotal} />
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? t('checkout.processing') : t('checkout.placeOrder')}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden lg:block">
          <OrderSummary cartItems={cartItems} subtotal={subtotal} />
        </div>
      </div>
    </div>
  )
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
}

function OrderSummary({ cartItems, subtotal }: OrderSummaryProps) {
  const { t } = useTranslation()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('checkout.orderSummary.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.quantity || 1} ×</span>
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-medium">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex justify-between">
          <span>{t('checkout.orderSummary.subtotal')}</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('checkout.orderSummary.shipping')}</span>
          <span>{t('checkout.shippingMethod.standard.price')}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('checkout.orderSummary.tax')}</span>
          <span>{t('checkout.orderSummary.calculatedAtCheckout')}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>{t('checkout.orderSummary.total')}</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
