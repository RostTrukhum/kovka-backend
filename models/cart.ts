import { Schema, model } from 'mongoose';
import { productModel } from './product';

const CartSchema = new Schema({
  products: [
    { ...productModel, productId: { type: String }, count: { type: Number } },
  ],
  amount: { type: Number },
});

export default model('Cart', CartSchema);
