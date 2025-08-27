import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }
});

export const ProductModel = mongoose.model('Product', ProductSchema, 'products');
