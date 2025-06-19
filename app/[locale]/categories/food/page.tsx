import { useTranslation } from "@/app/i18n";
import { ProductGrid } from "@/components/product-grid";
import { getProducts } from "@/services/strapi";
import { StrapiProduct } from "@/types/strapi";

export default async function FoodCategoryPage({
  params,
}: {
  params: { locale: string };
}) {
  const { t } = await useTranslation(params.locale, "translation");

  try {
    const { data } = await getProducts(params.locale);
    // Filter products by food category using slug
    const foodProducts = data.filter((product: StrapiProduct) =>
      product.categories.some((category) => category.slug === "food")
    );

    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {t("home.categories.food")}
          </h1>
          <p className="text-muted-foreground">
            {t("home.categories.description")}
          </p>
        </div>
        <ProductGrid products={foodProducts} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <h1 className="text-2xl font-bold">{t("product.loading")}</h1>
      </div>
    );
  }
}
