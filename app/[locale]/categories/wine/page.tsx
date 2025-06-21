import { useTranslation } from "@/app/i18n";
import { ProductGrid } from "@/components/product-grid";
import { getProducts } from "@/services/strapi";
import { StrapiProduct } from "@/types/strapi";

export default async function WineCategoryPage({
  params,
}: {
  params: { locale: string };
}) {
  const { t } = await useTranslation(params.locale, "translation");

  try {
    const { data } = await getProducts(params.locale);
    // Filter products by wine category using slug
    const wineProducts = data.filter((product: StrapiProduct) =>
      product.categories.some((category) => category.slug === "wine")
    );

    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {t("home.categories.wine")}
          </h1>
          <p className="text-muted-foreground">
            {t("home.categories.description")}
          </p>
        </div>
        <ProductGrid products={wineProducts} />
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
