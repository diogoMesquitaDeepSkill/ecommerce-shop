"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StrapiCategory } from "@/types/strapi";
import { Filter, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CategoryFilterProps {
  categories: Array<{
    category: StrapiCategory;
    count: number;
  }>;
  selectedCategories: string[];
  onCategoryToggle: (categorySlug: string) => void;
  onClearFilters: () => void;
  currentCategorySlug?: string; // To hide current category on category pages
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearFilters,
  currentCategorySlug,
}: CategoryFilterProps) {
  const { t } = useTranslation();

  // Filter out the current category if we're on a category page
  const availableCategories = currentCategorySlug
    ? categories.filter(({ category }) => category.slug !== currentCategorySlug)
    : categories;

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <h3 className="font-semibold">{t("filters.categories")}</h3>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {selectedCategories.length}
            </Badge>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-6 px-2 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            {t("filters.clear")}
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {availableCategories.map(({ category, count }) => (
          <Button
            key={category.slug}
            variant={
              selectedCategories.includes(category.slug) ? "default" : "outline"
            }
            size="sm"
            onClick={() => onCategoryToggle(category.slug)}
            className="w-full justify-between h-auto py-2 px-3"
          >
            <span className="text-left">{category.name}</span>
            <Badge variant="secondary" className="ml-2 text-xs">
              {count}
            </Badge>
          </Button>
        ))}
      </div>

      {availableCategories.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          {t("filters.noCategories")}
        </p>
      )}
    </Card>
  );
}
