"use client";

import { StrapiProduct } from "@/types/strapi";
import { useCallback, useEffect, useState } from "react";

interface UseProductPaginationProps {
  initialProducts: StrapiProduct[];
  allProducts: StrapiProduct[];
  pageSize?: number;
  currentCategorySlug?: string;
}

interface CategoryCount {
  category: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
  };
  count: number;
}

export function useProductPagination({
  initialProducts,
  allProducts,
  pageSize = 12,
  currentCategorySlug,
}: UseProductPaginationProps) {
  const [displayedProducts, setDisplayedProducts] =
    useState<StrapiProduct[]>(initialProducts);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Get all available categories with counts
  const getAvailableCategories = useCallback((): CategoryCount[] => {
    const categoryMap = new Map<string, { category: any; count: number }>();

    // If we're on a category page, we need to analyze only products that belong to that category
    let productsToAnalyze = allProducts;

    if (currentCategorySlug) {
      // Filter products to only those that belong to the current category
      productsToAnalyze = allProducts.filter((product) =>
        product.categories.some(
          (category) => category.slug === currentCategorySlug
        )
      );
    }

    // Now analyze the categories of these filtered products
    productsToAnalyze.forEach((product) => {
      product.categories.forEach((category) => {
        if (categoryMap.has(category.slug)) {
          categoryMap.get(category.slug)!.count++;
        } else {
          categoryMap.set(category.slug, { category, count: 1 });
        }
      });
    });

    return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);
  }, [allProducts, currentCategorySlug]);

  // Filter products based on selected categories
  const getFilteredProducts = useCallback((): StrapiProduct[] => {
    let filtered = allProducts;

    // If we're on a category page, filter by that category first
    if (currentCategorySlug) {
      filtered = filtered.filter((product) =>
        product.categories.some(
          (category) => category.slug === currentCategorySlug
        )
      );
    }

    // Then apply additional category filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.categories.some((category) =>
          selectedCategories.includes(category.slug)
        )
      );
    }

    return filtered;
  }, [allProducts, selectedCategories, currentCategorySlug]);

  // Update displayed products when filters change
  useEffect(() => {
    const filtered = getFilteredProducts();
    const paginated = filtered.slice(0, pageSize);

    setDisplayedProducts(paginated);
    setCurrentPage(1);
    setHasMore(filtered.length > pageSize);
  }, [selectedCategories, currentCategorySlug, getFilteredProducts, pageSize]);

  // Load more products from the already fetched data
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    setTimeout(() => {
      const filtered = getFilteredProducts();
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const newProducts = filtered.slice(startIndex, endIndex);

      setDisplayedProducts((prev) => [...prev, ...newProducts]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < filtered.length);
      setIsLoading(false);
    }, 300); // Simulate loading delay
  }, [currentPage, pageSize, getFilteredProducts, hasMore, isLoading]);

  // Toggle category filter
  const toggleCategory = useCallback((categorySlug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categorySlug)
        ? prev.filter((slug) => slug !== categorySlug)
        : [...prev, categorySlug]
    );
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  const availableCategories = getAvailableCategories();

  return {
    displayedProducts,
    availableCategories,
    selectedCategories,
    hasMore,
    isLoading,
    loadMore,
    toggleCategory,
    clearFilters,
  };
}
