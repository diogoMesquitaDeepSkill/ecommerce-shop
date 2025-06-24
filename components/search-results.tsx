"use client";

import { CategoryFilter } from "@/components/category-filter";
import { ProductGrid } from "@/components/product-grid";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { useProductPagination } from "@/hooks/useProductPagination";
import { StrapiProduct } from "@/types/strapi";
import { Loader2, Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface SearchResultsProps {
  products: StrapiProduct[];
  searchQuery?: string;
  error?: string | null;
  isCategoryPage?: boolean;
  categorySlug?: string;
  allProducts: StrapiProduct[]; // All products for filtering
}

export function SearchResults({
  products,
  searchQuery,
  error,
  isCategoryPage = false,
  categorySlug,
  allProducts,
}: SearchResultsProps) {
  const { t } = useTranslation();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    displayedProducts,
    availableCategories,
    selectedCategories,
    hasMore,
    isLoading,
    loadMore,
    toggleCategory,
    clearFilters,
  } = useProductPagination({
    initialProducts: products,
    allProducts,
    pageSize: 12,
    currentCategorySlug: categorySlug,
  });

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  if (error) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">
          {t("search.error.title")}
        </h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Results Header */}
      {searchQuery && (
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">
            {t("search.resultsFor", { query: searchQuery })}
          </h1>
          <p className="text-muted-foreground">
            {t("search.resultsCount", { count: displayedProducts.length })}
          </p>
        </div>
      )}

      {/* Search Bar */}
      <div className="w-full mb-6">
        <SearchBar
          defaultValue={searchQuery || ""}
          placeholder={t("header.searchPlaceholder")}
          isProductsPage={true}
          categorySlug={categorySlug}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Filter Sidebar */}
        <div className="lg:col-span-1">
          <CategoryFilter
            categories={availableCategories}
            selectedCategories={selectedCategories}
            onCategoryToggle={toggleCategory}
            onClearFilters={clearFilters}
            currentCategorySlug={categorySlug}
          />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {displayedProducts.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                {searchQuery
                  ? t("search.noResults.title")
                  : t("search.noProducts.title")}
              </h2>
              <p className="text-muted-foreground">
                {searchQuery
                  ? t("search.noResults.description")
                  : t("search.noProducts.description")}
              </p>
            </div>
          ) : (
            <>
              <ProductGrid products={displayedProducts} />

              {/* Load More Section */}
              {hasMore && (
                <div ref={loadMoreRef} className="text-center py-8">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{t("search.loading")}</span>
                    </div>
                  ) : (
                    <Button onClick={loadMore} variant="outline">
                      {t("search.loadMore")}
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
