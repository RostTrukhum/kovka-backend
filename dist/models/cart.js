"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const product_1 = require("./product");
const CartSchema = new mongoose_1.Schema({
    products: [
        Object.assign(Object.assign({}, product_1.productModel), { productId: { type: String }, count: { type: Number } }),
    ],
    amount: { type: Number },
});
exports.default = (0, mongoose_1.model)('Cart', CartSchema);
