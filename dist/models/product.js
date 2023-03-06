"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('Product', ProductSchema);
