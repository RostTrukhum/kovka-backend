import { Schema, model } from 'mongoose';

const ProductSubtypeSchema = new Schema({
  subtype: { type: String },
  title: { type: String },
});

export default model('ProductSubtype', ProductSubtypeSchema);
