"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartProductSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
    count: { type: Number },
});
exports.default = (0, mongoose_1.model)('CartProduct', CartProductSchema);
