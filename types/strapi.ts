export interface StrapiMedia {
    id: number;
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
    name: string;
    slug: string;
    
}

export interface StrapiProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    media: StrapiMedia[];
    categories: StrapiCategory[];
}

export interface StrapiResponse<T> {
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