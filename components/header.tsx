"use client";

import { useCart } from "@/components/cart-provider";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export function Header() {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "pt", name: "Português", display: "PT" },
    { code: "en", name: "English", display: "EN" },
    { code: "fr", name: "Français", display: "FR" },
  ];

  // Use useMemo to compute currentLanguage only when i18n.language changes
  const currentLanguage = useMemo(() => {
    return i18n.language || "pt";
  }, [i18n.language]);

  console.log(currentLanguage);

  const handleLanguageChange = (newLocale: string) => {
    // Prevent unnecessary language changes
    if (newLocale === currentLanguage) return;

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

    // Update i18n language
    i18n.changeLanguage(newLocale);

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
              <span className="sr-only">{t("header.toggleMenu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href={`/${currentLanguage}`}
                className="text-lg font-medium"
              >
                {t("header.home")}
              </Link>
              <Link
                href={`/${currentLanguage}/products`}
                className="text-lg font-medium"
              >
                {t("header.allProducts")}
              </Link>
              <Link
                href={`/${currentLanguage}/categories/wine`}
                className="text-lg font-medium"
              >
                {t("header.wine")}
              </Link>
              <Link
                href={`/${currentLanguage}/categories/food`}
                className="text-lg font-medium"
              >
                {t("header.food")}
              </Link>
              <Link
                href={`/${currentLanguage}/categories/spirits`}
                className="text-lg font-medium"
              >
                {t("header.spirits")}
              </Link>
              <Link
                href={`/${currentLanguage}/about`}
                className="text-lg font-medium"
              >
                {t("header.about")}
              </Link>
              <Link
                href={`/${currentLanguage}/contact`}
                className="text-lg font-medium"
              >
                {t("header.contact")}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          href={`/${currentLanguage}`}
          className="ml-4 md:ml-0 flex items-center gap-2"
        >
          <span className="text-xl font-bold">GourmetHub</span>
        </Link>

        <nav className="mx-6 hidden md:flex items-center gap-6 text-sm">
          <Link
            href={`/${currentLanguage}`}
            className="font-medium transition-colors hover:text-primary"
          >
            {t("header.home")}
          </Link>
          <Link
            href={`/${currentLanguage}/products`}
            className="font-medium transition-colors hover:text-primary"
          >
            {t("header.allProducts")}
          </Link>
          <Link
            href={`/${currentLanguage}/categories/wine`}
            className="font-medium transition-colors hover:text-primary"
          >
            {t("header.wine")}
          </Link>
          <Link
            href={`/${currentLanguage}/categories/food`}
            className="font-medium transition-colors hover:text-primary"
          >
            {t("header.food")}
          </Link>
          <Link
            href={`/${currentLanguage}/categories/spirits`}
            className="font-medium transition-colors hover:text-primary"
          >
            {t("header.spirits")}
          </Link>
          <Link
            href={`/${currentLanguage}/about`}
            className="font-medium transition-colors hover:text-primary"
          >
            {t("header.about")}
          </Link>
          <Link
            href={`/${currentLanguage}/stores`}
            className="font-medium transition-colors hover:text-primary"
          >
            {t("header.stores")}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchBar />

          <Link href={`/${currentLanguage}/cart`}>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">{t("header.cart")}</span>
            </Button>
          </Link>

          <div className="flex items-center gap-1">
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
