// Solo tipos para frontend
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
