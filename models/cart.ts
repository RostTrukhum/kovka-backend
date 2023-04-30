import { Schema, model } from 'mongoose';

const CartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      markUpInProcents: { type: Number },
      count: { type: Number },
      width: { type: Number },
      height: { type: Number },
      class: { type: String },
      openingType: { type: String },
      indoorPad: { type: String },
      outsidePad: { type: String },
    },
  ],
});

export default model('Cart', CartSchema);
