import {
  StrapiContact,
  StrapiFAQ,
  StrapiListResponse,
  StrapiProduct,
  StrapiSingleResponse,
  StrapiStore,
} from "@/types/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error("STRAPI_URL environment variable is not defined");
}

export async function getProducts(
  locale: string = "pt"
): Promise<StrapiListResponse<StrapiProduct>> {
  const response = await fetch(
    `${STRAPI_URL}/api/products?populate=*&locale=${locale}`,
    {
      next: {
        revalidate: 60, // Revalidate every minute
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProduct(
  documentId: string
): Promise<StrapiSingleResponse<StrapiProduct>> {
  const response = await fetch(
    `${STRAPI_URL}/api/products/${documentId}?populate=*`,
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

export async function getProductsByCategory(
  categorySlug: string,
  locale: string = "pt"
): Promise<StrapiListResponse<StrapiProduct>> {
  const response = await fetch(
    `${STRAPI_URL}/api/products?filters[categories][slug][$eq]=${categorySlug}&populate=*&locale=${locale}`,
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

export async function getFAQs(
  locale: string = "pt"
): Promise<StrapiSingleResponse<StrapiFAQ>> {
  const response = await fetch(
    `${STRAPI_URL}/api/faq?populate=*&locale=${locale}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch FAQs");
  }

  return response.json();
}

export async function getContact(
  locale: string = "pt"
): Promise<StrapiSingleResponse<StrapiContact>> {
  const response = await fetch(
    `${STRAPI_URL}/api/contact?populate=*&locale=${locale}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch contact information");
  }

  return response.json();
}

export async function getStore(
  locale: string = "pt"
): Promise<StrapiSingleResponse<StrapiStore>> {
  const response = await fetch(
    `${STRAPI_URL}/api/store?populate=*&locale=${locale}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch store information");
  }

  return response.json();
}
