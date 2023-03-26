"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = require("mongoose");
exports.productModel = {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    img: {
        type: String,
        require: true,
    },
    type: { type: String, require: true },
    subtype: { type: String, required: true },
    description: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
    createdAt: { type: Date },
};
const ProductSchema = new mongoose_1.Schema(exports.productModel);
exports.default = (0, mongoose_1.model)('Product', ProductSchema);
