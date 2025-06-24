import { useTranslation } from "@/app/i18n";
import { SearchResults } from "@/components/search-results";
import { getAllProductsForFiltering, searchProducts } from "@/services/strapi";
import { StrapiProduct } from "@/types/strapi";

interface SpiritsCategoryPageProps {
  params: { locale: string };
  searchParams: { search?: string };
}

export default async function SpiritsCategoryPage({
  params,
  searchParams,
}: SpiritsCategoryPageProps) {
  const { t } = await useTranslation(params.locale, "translation");
  const searchQuery = searchParams.search;

  let products: StrapiProduct[] = [];
  let allProducts: StrapiProduct[] = [];
  let error: string | null = null;

  try {
    if (searchQuery) {
      // Search within spirits category
      const searchResults = await searchProducts(searchQuery, params.locale);
      // Filter search results by spirits category
      const spiritsSearchResults = searchResults.data.filter(
        (product: StrapiProduct) =>
          product.categories.some((category) => category.slug === "spirit")
      );
      products = spiritsSearchResults;
      allProducts = spiritsSearchResults; // Use filtered search results as allProducts
    } else {
      // Fetch all products for filtering (1000 limit)
      const allProductsResponse = await getAllProductsForFiltering(
        params.locale
      );
      allProducts = allProductsResponse.data;
      // Filter all products by spirits category and take first 12
      const spiritsProducts = allProducts.filter((product: StrapiProduct) =>
        product.categories.some((category) => category.slug === "spirit")
      );
      products = spiritsProducts.slice(0, 12);
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
              ` - ${t("home.categories.spirits")}`
            : t("home.categories.spirits")}
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
        categorySlug="spirit"
        allProducts={allProducts}
      />
    </div>
  );
}
