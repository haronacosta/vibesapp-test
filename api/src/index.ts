
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productsRouter from './products.router';
import categoriesData from './data/categories.json';

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas

app.use('/api/products', productsRouter);

// Nueva ruta directa para categorías
app.get('/api/categories', (req, res) => {
  try {
    res.json({
      success: true,
      data: categoriesData,
      message: 'Categorías obtenidas exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: 'Error al obtener categorías'
    });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'API de Productos funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      productById: '/api/products/:id',
      productsByCategory: '/api/products/category/:category'
    }
  });
});

// Middleware de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});



// Solo iniciar el servidor si no estamos en test
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI || '', { dbName: process.env.MONGO_DB || 'test' })
    .then(() => {
      console.log('✅ Conectado a MongoDB');
      app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        console.log(`📱 API de productos disponible en http://localhost:${PORT}/api/products`);
      });
    })
    .catch((err: any) => {
      console.error('❌ Error al conectar a MongoDB:', err);
      process.exit(1);
    });
}

export default app;
