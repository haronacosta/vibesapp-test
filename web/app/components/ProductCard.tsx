"use client";

import { Product } from "../../shared/types";
import OptimizedImage from "./OptimizedImage";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative w-full h-[200px] flex items-center justify-center bg-gray-100">
        <OptimizedImage
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
          sizes="200px"
        />
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-full font-medium ${
            product.isAvailable
              ? "bg-green-100 text-green-800"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {product.isAvailable ? "En stock" : "Sin stock"}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-[16px] font-semibold text-gray-800 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="text-[14px] font-bold text-blue-600 mb-1">
          ${product.price.toFixed(2)}
        </div>
        <Link
          href={`/products/${product.id}`}
          className={`block w-full text-center py-2 px-3 rounded-md border border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-colors duration-300 mt-auto`}
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
