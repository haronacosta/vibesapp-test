import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true }
});

export const CategoryModel = mongoose.model('Category', CategorySchema, 'categories');
