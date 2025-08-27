import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { ProductModel } from '../src/models/product.model';
import { CategoryModel } from '../src/models/category.model';

const productsPath = path.join(__dirname, '../src/data/products.json');
const categoriesPath = path.join(__dirname, '../src/data/categories.json');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || '', { dbName: process.env.MONGO_DB || 'test' });

  // Seed categories
  const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
  await CategoryModel.deleteMany({});
  await CategoryModel.insertMany(categories);
  console.log('Categories seeded');

  // Seed products
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  await ProductModel.deleteMany({});
  await ProductModel.insertMany(products);
  console.log('Products seeded');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
