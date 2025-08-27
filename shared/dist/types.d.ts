export declare function getTopCheapestAvailable<T extends {
    price: number;
    isAvailable: boolean;
}>(products: T[], top?: number): T[];
export interface Product {
    id: string;
    name: string;
    price: number;
    isAvailable: boolean;
    category: string;
    image: string;
}
export interface Category {
    key: string;
    name: string;
}
export interface ProductResponse {
    success: boolean;
    data: Product[] | Product;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface ApiError {
    success: false;
    message: string;
    error?: any;
}
export interface ProductQueryParams {
    search?: string;
    sort?: 'price' | 'name';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
    available?: boolean;
    category?: string;
}
//# sourceMappingURL=types.d.ts.map