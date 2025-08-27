// Cliente API para consumir endpoints del backend
import { Product, ProductQueryParams, Category, ProductResponse } from "../shared-types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

class ApiClient {
  baseUrl: string;
  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  }

  async getProducts(params?: ProductQueryParams): Promise<ProductResponse> {
    const queryParams = params ? `?${new URLSearchParams(params as any).toString()}` : "";
    return this.request<ProductResponse>(`/products${queryParams}`);
  }

  async getProduct(id: string): Promise<ProductResponse> {
    return this.request<ProductResponse>(`/products/${id}`);
  }

  async getCategories(): Promise<{ success: boolean; data: Category[] }> {
    return this.request<{ success: boolean; data: Category[] }>(`/categories`);
  }
}

export const apiClient = new ApiClient();
