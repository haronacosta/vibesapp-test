import { Router, Request, Response } from 'express';
import { Product, ProductResponse, ApiError, ProductQueryParams } from './types';
import { ProductModel } from './models/product.model';
import categoriesData from './data/categories.json';

const router = Router();

// Función para aplicar filtros y búsqueda
function filterAndSortProducts(products: Product[], filters: ProductQueryParams): { products: Product[], total: number } {
  let filteredProducts = [...products];


  if (filters.available !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.isAvailable === filters.available);
  }


  if (filters.category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }


  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm)
    );
  }

  
  if (filters.sort) {
    filteredProducts.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (filters.sort === 'price') {
        aValue = a.price;
        bValue = b.price;
      } else {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      }

      if (filters.order === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });
  }

  const total = filteredProducts.length;

  // Paginación
  if (filters.page && filters.limit) {
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    filteredProducts = filteredProducts.slice(startIndex, endIndex);
  }

  return { products: filteredProducts, total };
}

router.get('/', async (req: Request, res: Response<ProductResponse>) => {
  try {
    const filters: ProductQueryParams = {
      search: req.query.search as string,
      sort: req.query.sort as 'price' | 'name',
      order: req.query.order as 'asc' | 'desc',
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      available: req.query.available !== undefined ? req.query.available === 'true' : undefined,
      category: req.query.category as string
    };

    // Construir query de Mongo
    const query: any = {};
    if (filters.available !== undefined) query.isAvailable = filters.available;
    if (filters.category) query.category = filters.category;
    if (filters.search) query.name = { $regex: filters.search, $options: 'i' };

    let mongoQuery = ProductModel.find(query);
    if (filters.sort) {
      const sortField = filters.sort === 'price' ? 'price' : 'name';
      const sortOrder = filters.order === 'desc' ? -1 : 1;
      mongoQuery = mongoQuery.sort({ [sortField]: sortOrder });
    }
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    mongoQuery = mongoQuery.skip((page - 1) * limit).limit(limit);
    const products = await mongoQuery.exec();
    const total = await ProductModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: products,
      message: 'Productos obtenidos exitosamente',
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [] as Product[],
      message: 'Error al obtener productos'
    });
  }
});

// GET /api/products/:id - Obtener producto por ID
router.get('/:id', async (req: Request, res: Response<ProductResponse | ApiError>) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findOne({ id });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    res.json({
      success: true,
      data: product,
      message: 'Producto obtenido exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el producto'
    });
  }
});

// GET /api/products/category/:category - Obtener productos por categoría
router.get('/category/:category', async (req: Request, res: Response<ProductResponse>) => {
  try {
    const category = req.params.category;
    const filteredProducts = await ProductModel.find({ category });
    res.json({
      success: true,
      data: filteredProducts,
      message: `Productos de categoría ${category} obtenidos exitosamente`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [] as Product[],
      message: 'Error al obtener productos por categoría'
    });
  }
});


export default router;
