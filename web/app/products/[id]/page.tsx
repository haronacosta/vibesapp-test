"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "../../../shared-types";

import { apiClient } from "../../../lib/api";
// Update the import path to match the actual location and filename of OptimizedImage
import OptimizedImage from "../../components/OptimizedImage";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    Array<{ key: string; name: string }>
  >([]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const productData = await apiClient.getProduct(productId);
      setProduct(productData);
      setError(null);
    } catch (err) {
      setError("Error al cargar el producto");
      console.error("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const categoriesData = await apiClient.getCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  useEffect(() => {
    if (productId) {
      loadProduct();
      loadCategories();
    }
  }, [productId]);

  // Función para obtener el nombre en español de la categoría
  const getCategoryName = (key: string) => {
    const cat = categories.find((c) => c.key === key);
    return cat ? cat.name : key;
  };

  // Evitar renderizado hasta que el componente esté montado

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando producto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error || "Producto no encontrado"}
            </div>
            <Link
              href="/products"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Volver a Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-blue-600">
                Productos
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        {/* Botón de regreso fuera del card */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center px-3 py-2 border border-gray-600 text-gray-700 rounded-lg bg-transparent transition-colors duration-300 hover:bg-gray-600 hover:text-white"
            style={{ transitionProperty: "background, color, border-color" }}
          >
            ← Volver a Productos
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 flex flex-col lg:flex-row gap-8">
          {/* Imagen grande ocupando la mitad del card en desktop, full en móvil */}
          <div className="lg:w-1/2 w-full h-[480px] min-h-[320px] bg-gray-100 rounded-lg relative overflow-hidden flex items-center justify-center">
            <OptimizedImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Info */}
          <div className="flex-1 flex flex-col gap-6 justify-center">
            <h1 className="text-[20px] font-semibold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="text-[18px] font-bold text-blue-600 mb-2">
              ${product.price.toFixed(2)}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 text-xs rounded-full font-medium bg-gray-200 text-gray-700">
                {getCategoryName(product.category)}
              </span>
              {product.isAvailable ? (
                <span className="px-2 py-1 text-xs rounded-full font-medium bg-green-100 text-green-800">
                  En stock
                </span>
              ) : (
                <span className="px-2 py-1 text-xs rounded-full font-medium bg-gray-200 text-gray-500">
                  Sin stock
                </span>
              )}
            </div>
            <button className="flex items-center gap-2 border border-red-500 text-red-500 py-2 px-3 rounded-lg font-semibold bg-white hover:bg-red-500 hover:text-white transition-colors duration-300 w-fit group">
              <i className="fa-regular fa-heart text-[18px] text-red-500 group-hover:text-white transition-colors duration-300"></i>
              <span className="text-sm">Favorito</span>
            </button>
          </div>
        </div>

        {/* Botón de regreso eliminado de la parte inferior */}
      </div>
    </div>
  );
}
