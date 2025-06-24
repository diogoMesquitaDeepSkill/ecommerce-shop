import { useTranslation } from "@/app/i18n";
import { SearchResults } from "@/components/search-results";
import { getAllProductsForFiltering, searchProducts } from "@/services/strapi";
import { StrapiProduct } from "@/types/strapi";

interface FoodCategoryPageProps {
  params: { locale: string };
  searchParams: { search?: string };
}

export default async function FoodCategoryPage({
  params,
  searchParams,
}: FoodCategoryPageProps) {
  const { t } = await useTranslation(params.locale, "translation");
  const searchQuery = searchParams.search;

  let products: StrapiProduct[] = [];
  let allProducts: StrapiProduct[] = [];
  let error: string | null = null;

  try {
    // Fetch all products for filtering (1000 limit)
    const allProductsResponse = await getAllProductsForFiltering(params.locale);
    allProducts = allProductsResponse.data;

    if (searchQuery) {
      // Search within food category
      const searchResults = await searchProducts(searchQuery, params.locale);
      // Filter search results by food category
      products = searchResults.data.filter((product: StrapiProduct) =>
        product.categories.some((category) => category.slug === "food")
      );
    } else {
      // Filter all products by food category and take first 12
      const foodProducts = allProducts.filter((product: StrapiProduct) =>
        product.categories.some((category) => category.slug === "food")
      );
      products = foodProducts.slice(0, 12);
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Failed to load products";
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">
          {searchQuery
            ? t("search.resultsFor", { query: searchQuery }) +
              ` - ${t("home.categories.food")}`
            : t("home.categories.food")}
        </h1>
        <p className="text-muted-foreground mb-6">
          {t("home.categories.description")}
        </p>
      </div>

      <SearchResults
        products={products}
        searchQuery={searchQuery}
        error={error}
        isCategoryPage={true}
        categorySlug="food"
        allProducts={allProducts}
      />
    </div>
  );
}
