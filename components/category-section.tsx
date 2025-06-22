"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function CategorySection() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "pt";

  const categories = [
    {
      name: t("home.categories.wine"),
      image: "/wine.jpg",
      href: `/${currentLanguage}/categories/wine`,
    },
    {
      name: t("home.categories.food"),
      image: "/food.webp",
      href: `/${currentLanguage}/categories/food`,
    },
    {
      name: t("home.categories.spirits"),
      image: "/spirit.jpg",
      href: `/${currentLanguage}/categories/spirits`,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("home.categories.title")}
        </h2>
        <p className="text-muted-foreground max-w-[600px]">
          {t("home.categories.description")}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="overflow-hidden h-[300px] transition-all hover:shadow-lg">
              <CardContent className="p-0 h-full relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
