import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a Strapi media URL to a complete URL by prefixing with the Strapi base URL
 * @param url - The relative URL from Strapi (e.g., "/uploads/image.jpg")
 * @returns The complete URL
 */
export function getStrapiMediaUrl(url: string): string {
  if (!url) return "/placeholder.svg";

  // If it's already a full URL, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If it's a placeholder or local asset (but not Strapi uploads), return as is
  if (
    url.startsWith("/placeholder") ||
    (url.startsWith("/") && !url.startsWith("/uploads/"))
  ) {
    return url;
  }

  // Prefix with Strapi URL
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!strapiUrl) {
    console.warn("NEXT_PUBLIC_STRAPI_URL is not defined");
    return url;
  }

  return `${strapiUrl}${url}`;
}
