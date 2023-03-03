const { Schema, model } = require('mongoose');

const ProductTypeSchema = new Schema({
  type: { type: String },
  title: { type: String },
});

module.exports = model('ProductType', ProductTypeSchema);
