import { StrapiProduct, StrapiResponse } from "@/types/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error("STRAPI_URL environment variable is not defined");
}

export async function getProducts(): Promise<StrapiResponse<StrapiProduct>> {
  const response = await fetch(
    `${STRAPI_URL}/api/products?populate=*`,
    {
      next: {
        revalidate: 60, // Revalidate every minute
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  console.log(response)

  return response.json();
}

export async function getProduct(id: string): Promise<StrapiResponse<StrapiProduct>> {
  const response = await fetch(
    `${STRAPI_URL}/api/products/${id}?populate=*`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function getProductsByCategory(categorySlug: string): Promise<StrapiResponse<StrapiProduct>> {
  const response = await fetch(
    `${STRAPI_URL}/api/products?filters[categories][slug][$eq]=${categorySlug}&populate=*`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products by category");
  }

  return response.json();
} 