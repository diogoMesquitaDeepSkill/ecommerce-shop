import { getProducts } from "@/services/strapi";
import { FeaturedProductCard } from "./featured-product-card";

interface FeaturedProductsProps {
  locale: string;
}

export async function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const { t } = await import("@/app/i18n").then((m) =>
    m.useTranslation(locale, "translation")
  );

  try {
    const { data } = await getProducts(locale);

    // Get 4 random products
    const shuffled = data.sort(() => 0.5 - Math.random());
    const randomProducts = shuffled.slice(0, 4);

    return (
      <section className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("home.featured.title")}
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            {t("home.featured.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {randomProducts.map((product) => (
            <FeaturedProductCard
              key={product.documentId}
              product={product}
              locale={locale}
            />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return (
      <section className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("home.featured.title")}
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            {t("home.featured.description")}
          </p>
        </div>
        <div className="text-center text-muted-foreground">
          {t("product.loading")}
        </div>
      </section>
    );
  }
}
