import { CategorySection } from "@/components/category-section";
import { FeaturedProducts } from "@/components/featured-products";
import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/app/i18n";

export default async function Home({
  params,
}: {
  params: { locale: string };
}) {
  const awaitedParams = await params;
  const locale = await awaitedParams.locale;
  const { t } = await useTranslation(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <div className="container px-4 py-12 mx-auto space-y-16">
        <CategorySection />
        <FeaturedProducts />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {t('home.hero.title')}
          </h2>
          <p className="max-w-[600px] text-muted-foreground">
            {t('home.hero.description')}
          </p>
          <Button asChild size="lg">
            <Link href={`/${locale}/products`}>
              <ShoppingBag className="w-4 h-4 mr-2" />
              {t('home.hero.shopNow')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
