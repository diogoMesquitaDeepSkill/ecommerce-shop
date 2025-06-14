export interface StrapiMedia {
    id: number;
    documentId: string;
    url: string;
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