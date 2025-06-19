"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
      <div className="relative h-[70vh] flex items-center justify-start">
        <Image
          src="/shop.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="container px-4 mx-auto relative z-20">
          <div className="max-w-lg space-y-6 text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t("home.hero.mainTitle")}
            </h1>
            <p className="text-lg md:text-xl">
              {t("home.hero.mainDescription")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                <Link href={`/${locale}/products`}>
                  {t("home.hero.shopNow")}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                <Link href={`/${locale}/categories/wine`}>
                  {t("home.hero.featuredWines")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
