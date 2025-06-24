export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  formats: {
    thumbnail: { url: string };
    small: { url: string };
    medium: { url: string };
    large: { url: string };
  };
}

export interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  namePT: string;
  nameFR: string;
  slug: string;
}

export interface StrapiProduct {
  id: number;
  documentId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  media?: StrapiMedia[];
  categories: StrapiCategory[];
  localizations?: {
    id: number;
    documentId: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    locale: string;
  }[];
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiSocialMedia {
  id: number;
  platform: string;
  link: string;
  icon: string;
}

export interface StrapiContact {
  id: number;
  documentId: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  businessHours: string;
  socialMedia: StrapiSocialMedia[];
  localizations?: {
    id: number;
    documentId: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    businessHours: string;
    socialMedia: StrapiSocialMedia[];
    locale: string;
  }[];
}

export interface StrapiFAQ {
  id: number;
  documentId: string;
  description: string;
  entry: {
    id: number;
    question: string;
    answer: string;
    type:
      | "shopping"
      | "returns"
      | "account"
      | "general"
      | "shipping"
      | "payment";
  }[];
  localizations?: {
    id: number;
    documentId: string;
    description: string;
    entry: {
      id: number;
      question: string;
      answer: string;
      type:
        | "shopping"
        | "returns"
        | "account"
        | "general"
        | "shipping"
        | "payment";
    }[];
    locale: string;
  }[];
}

export interface StrapiStore {
  id: number;
  documentId: string;
  name: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  openingHours: string;
  mapsLink: string;
  media?: StrapiMedia[];
  localizations?: {
    id: number;
    documentId: string;
    name: string;
    description: string;
    address: string;
    email: string;
    phone: string;
    openingHours: string;
    mapsLink: string;
    media?: StrapiMedia[];
    locale: string;
  }[];
}

// Order-related interfaces
export interface StrapiOrderItem {
  product: string;
  quantity: number;
}

export interface StrapiOrderAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export interface StrapiCreateOrderData {
  name: string;
  email: string;
  phoneNumber: string;
  orderItems: StrapiOrderItem[];
  shippingMethod: string;
  address: StrapiOrderAddress;
}

export interface StrapiOrderProduct {
  id: number;
  documentId: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
}

export interface StrapiOrderItemWithProduct {
  id: number;
  quantity: number;
  product: StrapiOrderProduct;
}

export interface StrapiOrder {
  id: number;
  documentId: string;
  email: string;
  shippingMethod: string;
  standing:
    | "unpaid"
    | "paid"
    | "canceled"
    | "completed"
    | "shipped"
    | "problem";
  totalPrice: number;
  name: string;
  date: string;
  stripeId: string | null;
  trackingLink: string | null;
  accessToken: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  phoneNumber: string;
  orderItems: StrapiOrderItemWithProduct[];
  address: StrapiOrderAddress;
}

export interface StrapiOrderResponse {
  order: StrapiOrder;
  stripeUrl: string;
}

export interface StrapiTerm {
  id: number;
  documentId: string;
  content: StrapiBlock[];
  localizations?: {
    id: number;
    documentId: string;
    content: StrapiBlock[];
    locale: string;
  }[];
}

export interface StrapiBlock {
  type: string;
  level?: number;
  children?: StrapiBlockChild[];
}

export interface StrapiBlockChild {
  text: string;
  type: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  children?: StrapiBlockChild[];
}
