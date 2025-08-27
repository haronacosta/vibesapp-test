
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../index';

describe('API Productos', () => {
  it('GET /api/products debe devolver productos', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/products/:id debe devolver 404 si no existe', async () => {
    const res = await request(app).get('/api/products/0');
    expect(res.statusCode).toBe(404);
  });
});

beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGO_URI environment variable is not defined');
    }
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
});
