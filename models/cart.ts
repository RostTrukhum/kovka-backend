import { Schema, model } from 'mongoose';

const CartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      count: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
  ],
});

export default model('Cart', CartSchema);
