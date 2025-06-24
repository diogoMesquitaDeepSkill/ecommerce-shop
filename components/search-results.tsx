"use client";

import { ProductGrid } from "@/components/product-grid";
import { SearchBar } from "@/components/search-bar";
import { StrapiProduct } from "@/types/strapi";
import { useTranslation } from "react-i18next";

interface SearchResultsProps {
  products: StrapiProduct[];
  searchQuery?: string;
  error?: string | null;
  isCategoryPage?: boolean;
  categorySlug?: string;
}

export function SearchResults({
  products,
  searchQuery,
  error,
  isCategoryPage = false,
  categorySlug,
}: SearchResultsProps) {
  const { t } = useTranslation();

  if (isCategoryPage) {
    return (
      <>
        <div className="w-full mb-6">
          <SearchBar
            defaultValue={searchQuery || ""}
            placeholder={t("header.searchPlaceholder")}
            isProductsPage={true}
            categorySlug={categorySlug}
          />
        </div>

        {error ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {t("search.error")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("search.errorDescription")}
            </p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">
          {searchQuery
            ? t("search.resultsFor", { query: searchQuery })
            : t("header.allProducts")}
        </h1>
        <div className="w-full">
          <SearchBar
            defaultValue={searchQuery || ""}
            placeholder={t("header.searchPlaceholder")}
            isProductsPage={true}
            categorySlug={categorySlug}
          />
        </div>
      </div>

      {error ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            {t("search.error")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t("search.errorDescription")}
          </p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
