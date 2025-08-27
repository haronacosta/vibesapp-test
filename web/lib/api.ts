import {
  Product,
  ProductResponse,
  ProductQueryParams,
  Category,
} from "../../shared/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Obtener productos con filtros, ordenamiento y paginación
  async getProducts(
    params?: ProductQueryParams,
  ): Promise<{
    products: Product[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const queryParams = new URLSearchParams();

    if (params?.search) queryParams.append("search", params.search);
    if (params?.sort) queryParams.append("sort", params.sort);
    if (params?.order) queryParams.append("order", params.order);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.available !== undefined)
      queryParams.append("available", params.available.toString());
    if (params?.category) queryParams.append("category", params.category);

    const endpoint = `/api/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await this.request<ProductResponse>(endpoint);

    return {
      products: response.data as Product[],
      pagination: response.pagination,
    };
  }

  // Obtener producto por ID
  async getProduct(id: string): Promise<Product> {
    const response = await this.request<ProductResponse>(`/api/products/${id}`);
    return response.data as Product;
  }

  // Obtener productos por categoría
  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await this.request<ProductResponse>(
      `/api/products/category/${category}`,
    );
    return response.data as Product[];
  }

  // Obtener categorías disponibles
  async getCategories(): Promise<Category[]> {
    const response = await this.request<{
      success: boolean;
      data: Category[];
      message: string;
    }>("/api/categories");
    return response.data;
  }
}

// Instancia global del cliente API
export const apiClient = new ApiClient();
