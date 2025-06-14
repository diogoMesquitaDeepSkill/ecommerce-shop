"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Globe, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const languages = [
    { code: "pt", name: "Português", display: "PT" },
    { code: "en", name: "English", display: "EN" },
    { code: "fr", name: "Français", display: "FR" },
  ];

  useEffect(() => {
    // Update i18next language when path changes
    const locale = pathname.split("/")[1];
    if (locale && languages.some((lang) => lang.code === locale)) {
      i18n.changeLanguage(locale);
      setCurrentLanguage(locale);
    }
  }, [pathname, i18n]);

  const handleLanguageChange = (newLocale: string) => {
    setCurrentLanguage(newLocale);
    // Get the current path segments
    const segments = pathname.split("/");

    // Replace the locale segment or add it if it doesn't exist
    if (segments[1] && languages.some((lang) => lang.code === segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    // Construct the new path
    const newPath = segments.join("/");

    // Navigate to the new path
    router.push(newPath);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href={`/${currentLanguage}`} className="text-lg font-medium">
                Home
              </Link>
              <Link href={`/${currentLanguage}/products`} className="text-lg font-medium">
                All Products
              </Link>
              <Link href={`/${currentLanguage}/products/wine`} className="text-lg font-medium">
                Wine
              </Link>
              <Link href={`/${currentLanguage}/products/food`} className="text-lg font-medium">
                Food
              </Link>
              <Link href={`/${currentLanguage}/about`} className="text-lg font-medium">
                About
              </Link>
              <Link href={`/${currentLanguage}/contact`} className="text-lg font-medium">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="ml-4 md:ml-0 flex items-center gap-2">
          <span className="text-xl font-bold">StyleHub</span>
        </Link>

        <nav className="mx-6 hidden md:flex items-center gap-6 text-sm">
          <Link
            href={`/${currentLanguage}`}
            className="font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href={`/${currentLanguage}/products`}
            className="font-medium transition-colors hover:text-primary"
          >
            All Products
          </Link>
          <Link
            href={`/${currentLanguage}/products/wine`}
            className="font-medium transition-colors hover:text-primary"
          >
            Wine
          </Link>
          <Link
            href={`/${currentLanguage}/products/food`}
            className="font-medium transition-colors hover:text-primary"
          >
            Food
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative flex items-center">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] md:w-[300px]"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>

          <Link href={`/${currentLanguage}/cart`}>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          <div className="flex items-center gap-1">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Select
              value={currentLanguage}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-auto min-w-[60px] h-8 border-none bg-transparent px-2 py-0 font-medium text-sm flex justify-between items-center">
                <SelectValue className="text-left pr-2" />
              </SelectTrigger>
              <SelectContent align="end">
                {languages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
}
