const { Schema, model } = require('mongoose');

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

module.exports = model('Product', ProductSchema);
