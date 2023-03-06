import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  img: {
    type: String,
    require: true,
  },
  type: { type: String, require: true },
  subtype: { type: String, required: true },
  createdAt: { type: Date },
});

export default model('Product', ProductSchema);
