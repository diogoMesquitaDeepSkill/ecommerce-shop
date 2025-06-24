import { SearchResults } from "@/components/search-results";
import { getProducts, searchProducts } from "@/services/strapi";
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

  let products: StrapiProduct[] = [];
  let error: string | null = null;

  try {
    if (searchQuery) {
      const searchResults = await searchProducts(searchQuery, locale);
      products = searchResults.data;
    } else {
      const allProducts = await getProducts(locale);
      products = allProducts.data;
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Failed to load products";
  }

  return (
    <SearchResults
      products={products}
      searchQuery={searchQuery}
      error={error}
    />
  );
}
