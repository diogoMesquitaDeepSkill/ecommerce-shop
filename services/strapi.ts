import {
  StrapiContact,
  StrapiCreateOrderData,
  StrapiFAQ,
  StrapiListResponse,
  StrapiOrderResponse,
  StrapiProduct,
  StrapiSingleResponse,
  StrapiStore,
  StrapiTerm,
} from "@/types/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error("STRAPI_URL environment variable is not defined");
}

// only used for featurd products component
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

export async function getAllProductsForFiltering(
  locale: string = "pt"
): Promise<StrapiListResponse<StrapiProduct>> {
  const response = await fetch(
    `${STRAPI_URL}/api/products?populate=*&locale=${locale}&pagination[pageSize]=1000`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch all products for filtering");
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

// Search products
export async function searchProducts(
  query: string,
  locale: string = "pt"
): Promise<StrapiListResponse<StrapiProduct>> {
  const response = await fetch(
    `${STRAPI_URL}/api/products?filters[$or][0][name][$containsi]=${encodeURIComponent(
      query
    )}&filters[$or][1][description][$containsi]=${encodeURIComponent(
      query
    )}&populate=*&locale=${locale}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  return response.json();
}

// Create order
export async function createOrder(
  orderData: StrapiCreateOrderData
): Promise<StrapiOrderResponse> {
  const response = await fetch(`${STRAPI_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: orderData }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Strapi error:", errorData);
    throw new Error("Failed to create order");
  }

  return response.json();
}

// Submit contact form
export async function submitContactForm(
  contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    subject: string;
    orderId?: string;
    message: string;
    locale: string;
  }
): Promise<any> {
  const response = await fetch(`${STRAPI_URL}/api/contact-form`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: contactData }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Strapi contact form error:", errorData);
    throw new Error("Failed to submit contact form");
  }

  return response.json();
}

// Get order by access token
export async function getOrderByAccessToken(
  accessToken: string
): Promise<{ order: StrapiOrderResponse["order"] }> {
  const response = await fetch(
    `${STRAPI_URL}/api/orders/token/${accessToken}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Order not found or access token invalid");
    }
    throw new Error("Failed to fetch order");
  }

  return response.json();
}

export async function getTerms(
  locale: string = "pt"
): Promise<StrapiSingleResponse<StrapiTerm>> {
  const response = await fetch(
    `${STRAPI_URL}/api/term?populate=*&locale=${locale}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch terms");
  }

  return response.json();
}
