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
