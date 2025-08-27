# Seed de la base de datos

Para cargar los datos iniciales en MongoDB ejecuta:

```sh
npx ts-node api/scripts/seed.ts
```

Esto poblará las colecciones `products` y `categories` en tu base de datos MongoDB usando los archivos JSON de la carpeta `api/src/data`.
# 🚀 Vibes Store - Proyecto Full Stack

Un proyecto completo de e-commerce construido con **Next.js 14 + TypeScript** para el frontend y **Node.js + Express + TypeScript** para el backend.

## 🏗️ Estructura del Proyecto

```text
vibes-test/
├── api/                    # Backend con Express + TypeScript
│   ├── src/
│   │   ├── index.ts       # Servidor principal
│   │   ├── products.router.ts  # Rutas de productos
│   │   ├── types.ts       # Tipos específicos del backend
│   │   └── data/
│   │       └── products.json   # Datos de ejemplo
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
├── web/                    # Frontend con Next.js + TypeScript
│   ├── app/
│   │   ├── page.tsx       # Página principal
│   │   └── products/
│   │       ├── page.tsx   # Lista de productos
│   │       └── [id]/
│   │           └── page.tsx   # Detalle de producto
│   ├── components/
│   │   └── ProductCard.tsx    # Componente de tarjeta de producto
│   ├── lib/
│   │   └── api.ts         # Cliente API
│   └── package.json
└── shared/                 # Tipos compartidos
    └── types.ts            # Interfaces TypeScript comunes
```

## 🛠️ Tecnologías Utilizadas

### Backend

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipado estático
- **CORS** - Middleware para CORS
- **dotenv** - Variables de entorno

### Frontend

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utilitario
- **React Hooks** - Estado y efectos

### Compartido

- **TypeScript** - Tipos compartidos entre frontend y backend

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd vibes-test
```


### 2. Configurar el Backend

```bash
cd api
npm install
# (Opcional, solo la primera vez o si cambian los datos)
npx ts-node scripts/seed.ts
```

### 3. Configurar el Frontend

```bash
cd ../web
npm install
```

## 🏃‍♂️ Ejecutar el Proyecto

### Backend (API)

```bash
cd api
npm run dev
```

El servidor estará disponible en: <http://localhost:3001>

### Frontend (Web)

```bash
cd web
npm run dev
```

La aplicación estará disponible en: <http://localhost:3000>

## 📡 Endpoints de la API

### Productos

- `GET /api/products` - Obtener productos con filtros, ordenamiento y paginación
  - **Parámetros de consulta:**
    - `search` - Búsqueda por nombre del producto
    - `sort` - Ordenar por `price` o `name`
    - `order` - Orden `asc` (ascendente) o `desc` (descendente)
    - `page` - Número de página (por defecto: 1)
    - `limit` - Productos por página (por defecto: 10)
    - `available` - Filtrar por disponibilidad (`true`/`false`)
    - `category` - Filtrar por categoría
  - **Ejemplo:** `GET /api/products?search=guantes&sort=price&order=asc&page=1&limit=5&available=true&category=gloves`

- `GET /api/products/:id` - Obtener producto por ID
- `GET /api/products/category/:category` - Obtener productos por categoría

### Ruta de prueba

- `GET /` - Información de la API

## 🎯 Características Implementadas

### Backend

- ✅ Servidor Express con TypeScript
- ✅ Router de productos con endpoints REST
- ✅ Manejo de errores
- ✅ CORS habilitado
- ✅ Datos de ejemplo en JSON
- ✅ Tipos TypeScript compartidos

### Frontend

- ✅ Página principal con landing page
- ✅ Lista de productos con filtros por categoría
- ✅ Página de detalle de producto
- ✅ Componente ProductCard reutilizable
- ✅ Cliente API con TypeScript
- ✅ Diseño responsive con Tailwind CSS
- ✅ Navegación entre páginas

### Compartido

- ✅ Interfaces TypeScript compartidas
- ✅ Consistencia de tipos entre frontend y backend

## 🔧 Scripts Disponibles

### Backend

```bash
npm run dev      # Desarrollo con nodemon
npm run build    # Compilar TypeScript
npm run start    # Ejecutar versión compilada
```

### Frontend

```bash
npm run dev      # Desarrollo
npm run build    # Build de producción
npm run start    # Ejecutar versión de producción
```

## 📱 Funcionalidades de la UI

- **Landing Page**: Página principal con información del proyecto
- **Catálogo de Productos**: Grid responsive de productos
- **Filtros por Categoría**: Botones para filtrar productos
- **Detalle de Producto**: Página individual con información completa
- **Navegación**: Breadcrumbs y enlaces de navegación
- **Diseño Responsive**: Adaptable a diferentes tamaños de pantalla

## 🎨 Estilos y Diseño

- **Tailwind CSS**: Framework CSS utilitario
- **Componentes Reutilizables**: ProductCard, layouts
- **Gradientes y Sombras**: Diseño moderno y atractivo
- **Iconos Emoji**: Elementos visuales divertidos
- **Paleta de Colores**: Azul como color principal

## 🚀 Próximos Pasos

- [ ] Autenticación de usuarios
- [ ] Carrito de compras
- [ ] Deploy en producción

## 📝 Notas de Desarrollo

- El proyecto usa **TypeScript estricto** para mejor calidad de código
- Los tipos están **compartidos** entre frontend y backend
- **CORS** está configurado para desarrollo local
- Las imágenes usan **Next.js Image** para optimización
- **Tailwind CSS** para estilos rápidos y consistentes
