import { Product, ProductResponse, ApiError, ProductQueryParams } from '../../shared/types';

export type { Product, ProductResponse, ApiError, ProductQueryParams };

export interface CreateProductRequest {
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface ProductFilters {
  search?: string;
  sort?: 'price' | 'name';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  available?: boolean;
  category?: string;
}
