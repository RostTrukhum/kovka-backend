import { Schema, model } from 'mongoose';

const ProductTypeSchema = new Schema({
  type: { type: String },
  title: { type: String },
  subtypes: [
    {
      subtype: { type: String },
      title: { type: String },
    },
  ],
});

export default model('ProductType', ProductTypeSchema);
