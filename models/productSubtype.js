const { Schema, model } = require('mongoose');

const ProductSubtypeSchema = new Schema({
  subtype: { type: String },
  title: { type: String },
});

module.exports = model('ProductSubtype', ProductSubtypeSchema);
