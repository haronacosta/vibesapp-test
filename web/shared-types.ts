// Algoritmo utilitario: obtener los N productos más baratos y disponibles
export function getTopCheapestAvailable<
  T extends { price: number; isAvailable: boolean },
>(products: T[], top: number = 3): T[] {
  return products
    .filter((p) => p.isAvailable)
    .sort((a, b) => a.price - b.price)
    .slice(0, top);
}
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

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductResponse {
  success: boolean;
  data: Product[] | Product;
  message?: string;
  pagination?: Pagination;
}

export interface ApiError {
  success: false;
  message: string;
  error?: unknown;
}

export interface ProductQueryParams {
  search?: string;
  sort?: "price" | "name";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  available?: boolean;
  category?: string;
}
