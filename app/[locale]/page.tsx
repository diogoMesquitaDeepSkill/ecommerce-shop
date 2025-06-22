"use client";

import { CategorySection } from "@/components/category-section";
import { FeaturedProducts } from "@/components/featured-products";
import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "pt";

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <div className="container px-4 py-12 mx-auto space-y-16">
        <CategorySection />
        <FeaturedProducts locale={currentLanguage} />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("home.hero.title")}
          </h2>
          <p className="max-w-[600px] text-muted-foreground">
            {t("home.hero.description")}
          </p>
          <Button asChild size="lg">
            <Link href={`/${currentLanguage}/products`}>
              <ShoppingBag className="w-4 h-4 mr-2" />
              {t("home.hero.shopNow")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
