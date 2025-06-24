import { useTranslation } from "@/app/i18n";
import { SearchResults } from "@/components/search-results";
import { getAllProductsForFiltering, searchProducts } from "@/services/strapi";
import { StrapiProduct } from "@/types/strapi";

interface ProductsPageProps {
  params: { locale: string };
  searchParams: { search?: string };
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const locale = params.locale;
  const searchQuery = searchParams.search;
  const { t } = await useTranslation(locale);

  let products: StrapiProduct[] = [];
  let allProducts: StrapiProduct[] = [];
  let error: string | null = null;

  try {
    if (searchQuery) {
      // If there's a search query, use search results for both products and allProducts
      const searchResults = await searchProducts(searchQuery, locale);
      products = searchResults.data;
      allProducts = searchResults.data; // Use search results as allProducts for filtering
    } else {
      // Fetch all products for filtering (1000 limit)
      const allProductsResponse = await getAllProductsForFiltering(locale);
      allProducts = allProductsResponse.data;
      // Take first 12 products from all products for initial display
      products = allProducts.slice(0, 12);
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
            ? t("products.searchResults", { query: searchQuery })
            : t("products.title")}
        </h1>
        <p className="text-muted-foreground mb-6">
          {t("products.description")}
        </p>
      </div>

      <SearchResults
        products={products}
        searchQuery={searchQuery}
        error={error}
        allProducts={allProducts}
      />
    </div>
  );
}
