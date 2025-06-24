import { useTranslation } from "@/app/i18n";
import { SearchResults } from "@/components/search-results";
import { getProducts, searchProducts } from "@/services/strapi";
import { StrapiProduct } from "@/types/strapi";

interface WineCategoryPageProps {
  params: { locale: string };
  searchParams: { search?: string };
}

export default async function WineCategoryPage({
  params,
  searchParams,
}: WineCategoryPageProps) {
  const { t } = await useTranslation(params.locale, "translation");
  const searchQuery = searchParams.search;

  let products: StrapiProduct[] = [];
  let error: string | null = null;

  try {
    if (searchQuery) {
      // Search within wine category
      const searchResults = await searchProducts(searchQuery, params.locale);
      // Filter search results by wine category
      products = searchResults.data.filter((product: StrapiProduct) =>
        product.categories.some((category) => category.slug === "wine")
      );
    } else {
      // Get all products and filter by wine category
      const { data } = await getProducts(params.locale);
      products = data.filter((product: StrapiProduct) =>
        product.categories.some((category) => category.slug === "wine")
      );
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
              ` - ${t("home.categories.wine")}`
            : t("home.categories.wine")}
        </h1>
        <p className="text-muted-foreground mb-6">
          {t("home.categories.description")}
        </p>
        <div className="w-full">
          <SearchResults
            products={products}
            searchQuery={searchQuery}
            error={error}
            isCategoryPage={true}
            categorySlug="wine"
          />
        </div>
      </div>
    </div>
  );
}
