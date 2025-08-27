"use client";

import { useEffect, useState } from "react";
import { Product, ProductQueryParams, Category } from "../../shared-types";
import { getTopCheapestAvailable } from "../../utils/products";
import { apiClient } from "../../lib/api";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [filters, setFilters] = useState<ProductQueryParams>({
    search: "",
    sort: "name",
    order: "asc",
    page: 1,
    limit: 12,
    available: undefined,
    category: undefined,
  });
  const [showCheapest, setShowCheapest] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      loadCategories();
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      loadProducts();
    }
  }, [filters, mounted]);

  const loadCategories = async () => {
    try {
      const categoriesData = await apiClient.getCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const loadProducts = async () => {
    try {
      const { products, pagination } = await apiClient.getProducts(filters);
      setProducts(products);
      setPagination(pagination ?? null);
      setError(null);
    } catch (err) {
      setError("Error al cargar los productos");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Productos</h1>
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="border rounded-md px-3 py-2 w-full text-gray-800"
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value, page: 1 }))
            }
          />
          <select
            className="border rounded-md px-3 py-2 w-full text-gray-800"
            value={filters.category || ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                category: e.target.value || undefined,
                page: 1,
              }))
            }
            title="Filtrar por categoría"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            className="border rounded-md px-3 py-2 w-full text-gray-800"
            value={
              filters.available === undefined
                ? ""
                : filters.available
                  ? "true"
                  : "false"
            }
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                available:
                  e.target.value === "" ? undefined : e.target.value === "true",
                page: 1,
              }))
            }
            title="Filtrar por disponibilidad"
          >
            <option value="">Todos</option>
            <option value="true">Disponibles</option>
            <option value="false">No disponibles</option>
          </select>
          <select
            className="border rounded-md px-3 py-2 w-full text-gray-800"
            value={filters.sort}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                sort: e.target.value as "name" | "price",
                page: 1,
              }))
            }
            title="Ordenar por"
          >
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
          </select>
          <select
            className="border rounded-md px-3 py-2 w-full text-gray-800"
            value={filters.order}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                order: e.target.value as "asc" | "desc",
                page: 1,
              }))
            }
            title="Dirección de orden"
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
        <button
          className="block w-full sm:w-auto bg-gray-50 border border-gray-300 text-gray-700 font-medium py-1.5 px-3 rounded-md mb-6 text-[0.95rem] transition-all duration-300 hover:bg-gray-400 hover:text-white hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
          onClick={() => setShowCheapest((prev) => !prev)}
        >
          {showCheapest
            ? "Ver todos los productos"
            : "Ver los más baratos disponibles"}
        </button>
        {loading && <p className="text-gray-500">Cargando...</p>}
        {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(showCheapest ? getTopCheapestAvailable(products, 3) : products)
            .length === 0 && !loading ? (
            <p className="col-span-full text-gray-500">
              No hay productos disponibles.
            </p>
          ) : (
            (showCheapest
              ? getTopCheapestAvailable(products, 3)
              : products
            ).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
