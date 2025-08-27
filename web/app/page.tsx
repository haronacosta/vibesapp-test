import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Bienvenido a <span className="text-blue-600">Vibes Store</span>
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Descubre nuestra increíble colección de productos con la mejor calidad
          y precios competitivos. Nuestra plataforma está construida con las
          tecnologías más modernas.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/products"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Ver Productos
          </Link>

          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Ver API
          </a>
        </div>
      </div>
    </div>
  );
}
