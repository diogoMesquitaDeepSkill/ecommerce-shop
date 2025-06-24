"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  isProductsPage?: boolean;
  categorySlug?: string;
}

export function SearchBar({
  defaultValue = "",
  placeholder,
  className = "",
  isProductsPage = false,
  categorySlug,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(
    isProductsPage ? true : defaultValue ? true : false
  );
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language || "pt";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      // Search with query
      if (categorySlug) {
        // Stay within category
        const url = `/${currentLanguage}/categories/${categorySlug}?search=${encodeURIComponent(
          trimmedQuery
        )}`;
        router.push(url);
      } else {
        // Search all products
        const url = `/${currentLanguage}/products?search=${encodeURIComponent(
          trimmedQuery
        )}`;
        router.push(url);
      }
    } else {
      // Clear search - show all products in current context
      if (categorySlug) {
        const url = `/${currentLanguage}/categories/${categorySlug}`;
        router.push(url);
      } else {
        const url = `/${currentLanguage}/products`;
        router.push(url);
      }
    }

    if (!isProductsPage) {
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    if (isProductsPage) {
      // Clear search and show all products in current context
      if (categorySlug) {
        const url = `/${currentLanguage}/categories/${categorySlug}`;
        router.push(url);
      } else {
        const url = `/${currentLanguage}/products`;
        router.push(url);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Keep search bar open if there's text (only for header)
    if (value && !isOpen && !isProductsPage) {
      setIsOpen(true);
    }
  };

  // On products page, always show the search input
  if (isProductsPage) {
    return (
      <form
        onSubmit={handleSearch}
        className={`relative flex items-center ${className}`}
      >
        <Input
          type="search"
          placeholder={placeholder || t("header.searchPlaceholder")}
          value={query}
          onChange={handleInputChange}
          className="w-full [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none"
          autoFocus
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-8 h-8 w-8"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{t("header.clearSearch")}</span>
          </Button>
        )}
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-0 h-8 w-8"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">{t("header.search")}</span>
        </Button>
      </form>
    );
  }

  // On header, show toggle behavior
  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">{t("header.search")}</span>
      </Button>
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`relative flex items-center ${className}`}
    >
      <Input
        type="search"
        placeholder={placeholder || t("header.searchPlaceholder")}
        value={query}
        onChange={handleInputChange}
        className="w-[200px] md:w-[300px] pr-16 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none"
        autoFocus
      />
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-8 h-8 w-8"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">{t("header.clearSearch")}</span>
        </Button>
      )}
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0 h-8 w-8"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">{t("header.search")}</span>
      </Button>
    </form>
  );
}
