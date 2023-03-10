import { Schema, model } from 'mongoose';

export const productModel = {
  title: { type: String, required: true },
  price: { type: Number, required: true },
  img: {
    type: String,
    require: true,
  },
  type: { type: String, require: true },
  subtype: { type: String, required: true },
  createdAt: { type: Date },
};

const ProductSchema = new Schema(productModel);

export default model('Product', ProductSchema);
